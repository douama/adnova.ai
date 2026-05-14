// ─── claude-decide v5 ──────────────────────────────────────────────────────
// AdNova's AI ops engine. Two modes :
//   - USER mode    : called by React client with a user JWT
//                    → verifies membership via my_tenants RPC
//                    → creates its own ai_run_log row (trigger_source='user')
//   - SERVICE mode : called by pg_cron with Bearer <service_role_key>
//                    → skips membership check
//                    → expects body.run_id from invoke_claude_decide()
//                    → still verifies tenant exists + ai_mode='autonomous'
//
// Observability : every invocation finalises an ai_run_log row with
// status, http_status_code, decisions_count, input_tokens, output_tokens,
// cost_usd_estimate (Sonnet 4.5 pricing), claude_model, duration_ms.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-5";

// Sonnet 4.5 pricing (per 1M tokens) — keep in sync with anthropic.com/pricing
const PRICE_INPUT_PER_MTOK = 3;
const PRICE_OUTPUT_PER_MTOK = 15;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function decodeJwtRole(jwt: string): string | null {
  if (!jwt) return null;
  const parts = jwt.split(".");
  if (parts.length !== 3) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    return typeof payload?.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
}

function estimateCost(input_tokens: number, output_tokens: number): number {
  return (
    (input_tokens * PRICE_INPUT_PER_MTOK + output_tokens * PRICE_OUTPUT_PER_MTOK) /
    1_000_000
  );
}

const DECISION_TOOL = {
  name: "submit_decisions",
  description:
    "Submit a batch of optimization decisions for the campaigns analyzed. " +
    "Each decision must include type, action, reason, confidence (0-1), and tags.",
  input_schema: {
    type: "object",
    properties: {
      decisions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            campaign_id: { type: "string", description: "UUID of the target campaign" },
            type: {
              type: "string",
              enum: [
                "scale",
                "kill",
                "create",
                "budget_realloc",
                "audience_expand",
                "audience_narrow",
                "bid_adjust",
                "pause",
                "resume",
              ],
            },
            action: { type: "object", description: 'e.g. {"op":"scale","pct":10}' },
            reason: { type: "string" },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            tags: { type: "array", items: { type: "string" } },
            revenue_uplift_usd: { type: "number" },
            budget_saved_usd: { type: "number" },
          },
          required: ["campaign_id", "type", "action", "reason", "confidence", "tags"],
        },
      },
    },
    required: ["decisions"],
  },
};

type ClaudeDecision = {
  campaign_id: string;
  type: string;
  action: Record<string, unknown>;
  reason: string;
  confidence: number;
  tags: string[];
  revenue_uplift_usd?: number;
  budget_saved_usd?: number;
};

type FinalizeOpts = {
  status: "completed" | "failed" | "skipped";
  http_status: number;
  decisions_count?: number;
  error_message?: string | null;
  input_tokens?: number | null;
  output_tokens?: number | null;
  cost_usd?: number | null;
  model?: string | null;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const startedAt = Date.now();

  let body: { tenant_id?: string; run_id?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }
  const tenantId = body.tenant_id;
  if (!tenantId || typeof tenantId !== "string") {
    return jsonResponse({ error: "tenant_id required" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return jsonResponse({ error: "Server misconfigured (Supabase env missing)" }, 500);
  }
  if (!anthropicKey) {
    return jsonResponse({ error: "ANTHROPIC_API_KEY not set" }, 500);
  }

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const authHeader = req.headers.get("Authorization") ?? "";
  const bearer = authHeader.replace(/^Bearer\s+/i, "").trim();
  const isServiceCall = decodeJwtRole(bearer) === "service_role";

  // ─── Ensure ai_run_log row exists ──────────────────────────────────────
  // For cron: run_id comes from invoke_claude_decide (pre-created row).
  // For user: we create it here once we know the tenant.
  let runId: string | null = typeof body.run_id === "string" ? body.run_id : null;
  if (!runId) {
    const { data: row, error: rErr } = await adminClient
      .from("ai_run_log")
      .insert({
        tenant_id: tenantId,
        trigger_source: isServiceCall ? "cron" : "user",
        status: "pending",
      })
      .select("id")
      .single();
    if (rErr) {
      console.error("ai_run_log insert failed:", rErr);
    } else {
      runId = row?.id ?? null;
    }
  }

  async function finalize(opts: FinalizeOpts, responseBody: unknown, responseStatus = 200) {
    if (runId) {
      await adminClient
        .from("ai_run_log")
        .update({
          status: opts.status,
          http_status_code: opts.http_status,
          decisions_count: opts.decisions_count ?? 0,
          error_message: opts.error_message ?? null,
          input_tokens: opts.input_tokens ?? null,
          output_tokens: opts.output_tokens ?? null,
          cost_usd_estimate: opts.cost_usd ?? null,
          claude_model: opts.model ?? null,
          duration_ms: Date.now() - startedAt,
          completed_at: new Date().toISOString(),
        })
        .eq("id", runId);
    }
    return jsonResponse(responseBody, responseStatus);
  }

  let readClient: SupabaseClient;

  if (isServiceCall) {
    const { data: tenant, error: tErr } = await adminClient
      .from("tenants")
      .select("id, ai_mode, status")
      .eq("id", tenantId)
      .maybeSingle();

    if (tErr) {
      return finalize(
        { status: "failed", http_status: 500, error_message: `Tenant lookup failed: ${tErr.message}` },
        { error: `Tenant lookup failed: ${tErr.message}` },
        500
      );
    }
    if (!tenant) {
      return finalize(
        { status: "failed", http_status: 404, error_message: "Tenant not found" },
        { error: "Tenant not found" },
        404
      );
    }
    if (tenant.status === "churned") {
      return finalize(
        { status: "skipped", http_status: 200, error_message: "tenant churned" },
        { skipped: true, reason: "tenant churned" }
      );
    }
    if (tenant.ai_mode !== "autonomous") {
      return finalize(
        {
          status: "skipped",
          http_status: 200,
          error_message: `tenant ai_mode is '${tenant.ai_mode}', not 'autonomous'`,
        },
        {
          skipped: true,
          reason: `tenant ai_mode is '${tenant.ai_mode}', not 'autonomous'`,
        }
      );
    }
    readClient = adminClient;
  } else {
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const { data: tenants, error: tErr } = await userClient.rpc("my_tenants");
    if (tErr) {
      return finalize(
        { status: "failed", http_status: 401, error_message: `Auth check failed: ${tErr.message}` },
        { error: `Auth check failed: ${tErr.message}` },
        401
      );
    }
    const isMember = (tenants ?? []).some(
      (t: { tenant_id: string }) => t.tenant_id === tenantId
    );
    if (!isMember) {
      return finalize(
        { status: "failed", http_status: 403, error_message: "Not a member" },
        { error: "You are not a member of this tenant" },
        403
      );
    }
    readClient = userClient;
  }

  // ─── Fetch campaigns ───────────────────────────────────────────────────
  const { data: campaigns, error: cErr } = await readClient
    .from("campaigns")
    .select(
      "id, name, platform, status, daily_budget_usd, spend_total, revenue_total, impressions_total, clicks_total, conversions_total, roas, ctr, cpa"
    )
    .eq("tenant_id", tenantId)
    .in("status", ["live", "scaling", "paused"])
    .order("updated_at", { ascending: false })
    .limit(20);

  if (cErr) {
    return finalize(
      { status: "failed", http_status: 500, error_message: `Failed to fetch campaigns: ${cErr.message}` },
      { error: `Failed to fetch campaigns: ${cErr.message}` },
      500
    );
  }
  if (!campaigns || campaigns.length === 0) {
    return finalize(
      { status: "skipped", http_status: 200, error_message: "no active campaigns" },
      {
        decisions: [],
        mode: isServiceCall ? "cron" : "user",
        message: "No active campaigns to analyze.",
      }
    );
  }

  // ─── Call Claude ───────────────────────────────────────────────────────
  const campaignsBrief = campaigns.map((c) => ({
    id: c.id,
    name: c.name,
    platform: c.platform,
    status: c.status,
    daily_budget_usd: c.daily_budget_usd,
    spend_total: c.spend_total,
    revenue_total: c.revenue_total,
    roas: c.roas,
    ctr: c.ctr,
    cpa: c.cpa,
    impressions: c.impressions_total,
    clicks: c.clicks_total,
    conversions: c.conversions_total,
  }));

  const systemPrompt =
    "You are AdNova's AI ad ops engine. You analyze campaign performance and propose " +
    "surgical optimization decisions. You are RUTHLESS about killing underperformers and " +
    "AGGRESSIVE about scaling winners. You always justify decisions with the exact metrics. " +
    "\n\nGuardrails (hard rules):\n" +
    "- Don't scale a campaign with ROAS < 3.5×\n" +
    "- Don't scale by more than 15% per 24h\n" +
    "- Kill creatives/campaigns with CTR < 0.8% after 500+ impressions\n" +
    "- Reallocate budget from low-ROAS campaigns to high-ROAS ones (cross-platform OK)\n" +
    "- Confidence must be honest — low if the data is thin (<1000 impressions or <30 conversions)\n" +
    "\nReturn 2-6 decisions max. Quality over quantity. If nothing meaningful to do, return empty array.";

  const userPrompt =
    `Tenant ID: ${tenantId}\n` +
    `Mode: ${isServiceCall ? "AUTONOMOUS LOOP (no user reviewing)" : "USER-TRIGGERED"}\n\n` +
    `Active campaigns (${campaigns.length}):\n` +
    JSON.stringify(campaignsBrief, null, 2) +
    "\n\nAnalyze these campaigns and submit your decisions via the submit_decisions tool.";

  const anthropicRes = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      system: systemPrompt,
      tools: [DECISION_TOOL],
      tool_choice: { type: "tool", name: "submit_decisions" },
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!anthropicRes.ok) {
    const text = await anthropicRes.text();
    console.error("Anthropic API error:", anthropicRes.status, text);
    return finalize(
      {
        status: "failed",
        http_status: 502,
        error_message: `Claude API ${anthropicRes.status}: ${text.slice(0, 200)}`,
        model: CLAUDE_MODEL,
      },
      { error: `Claude API failed (${anthropicRes.status})`, detail: text.slice(0, 500) },
      502
    );
  }

  const claudeOutput = await anthropicRes.json();
  const usage = claudeOutput.usage ?? {};
  const inputTokens = (usage.input_tokens ?? 0) +
    (usage.cache_creation_input_tokens ?? 0) +
    (usage.cache_read_input_tokens ?? 0);
  const outputTokens = usage.output_tokens ?? 0;
  const costUsd = estimateCost(inputTokens, outputTokens);

  const toolUse = claudeOutput.content?.find((b: { type: string }) => b.type === "tool_use");
  if (!toolUse) {
    return finalize(
      {
        status: "failed",
        http_status: 502,
        error_message: "Claude did not return tool_use",
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        cost_usd: costUsd,
        model: CLAUDE_MODEL,
      },
      { error: "Claude did not return tool_use", raw: claudeOutput },
      502
    );
  }
  const proposedDecisions = (toolUse.input?.decisions ?? []) as ClaudeDecision[];
  if (proposedDecisions.length === 0) {
    return finalize(
      {
        status: "completed",
        http_status: 200,
        decisions_count: 0,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        cost_usd: costUsd,
        model: CLAUDE_MODEL,
      },
      {
        decisions: [],
        mode: isServiceCall ? "cron" : "user",
        message: "Claude returned no decisions — all campaigns appear optimal.",
      }
    );
  }

  // ─── Validate against tenant's actual campaigns ───────────────────────
  const tenantCampaignIds = new Set(campaigns.map((c) => c.id));
  const validDecisions = proposedDecisions.filter((d) => tenantCampaignIds.has(d.campaign_id));

  if (validDecisions.length === 0) {
    return finalize(
      {
        status: "completed",
        http_status: 200,
        decisions_count: 0,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        cost_usd: costUsd,
        model: CLAUDE_MODEL,
      },
      { decisions: [], message: "No valid decisions matched tenant's campaigns." }
    );
  }

  // ─── Insert via service role ───────────────────────────────────────────
  const inserts = validDecisions.map((d) => ({
    tenant_id: tenantId,
    campaign_id: d.campaign_id,
    type: d.type,
    action: d.action,
    reason: d.reason,
    confidence: Math.max(0, Math.min(1, d.confidence)),
    ai_mode: "autonomous" as const,
    status: "executed" as const,
    executed_at: new Date().toISOString(),
    executed_by: isServiceCall ? "cron" : "ai",
    tags: [...d.tags, isServiceCall ? "trigger:cron" : "trigger:user"],
    revenue_uplift_usd: d.revenue_uplift_usd ?? null,
    budget_saved_usd: d.budget_saved_usd ?? null,
  }));

  const { data: inserted, error: insErr } = await adminClient
    .from("ai_decisions")
    .insert(inserts)
    .select("id, campaign_id, type, reason, confidence, created_at");

  if (insErr) {
    console.error("Insert failed:", insErr);
    return finalize(
      {
        status: "failed",
        http_status: 500,
        error_message: `Insert failed: ${insErr.message}`,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        cost_usd: costUsd,
        model: CLAUDE_MODEL,
      },
      { error: `Failed to log decisions: ${insErr.message}` },
      500
    );
  }

  return finalize(
    {
      status: "completed",
      http_status: 200,
      decisions_count: inserted?.length ?? 0,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost_usd: costUsd,
      model: CLAUDE_MODEL,
    },
    {
      decisions: inserted ?? [],
      proposed_count: proposedDecisions.length,
      valid_count: validDecisions.length,
      mode: isServiceCall ? "cron" : "user",
      model: CLAUDE_MODEL,
      run_id: runId,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost_usd_estimate: costUsd,
    }
  );
});
