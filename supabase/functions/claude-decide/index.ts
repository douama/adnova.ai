// ─── claude-decide v3 ──────────────────────────────────────────────────────
// AdNova's AI ops engine. Two modes :
//   - USER mode    : called by React client with a user JWT
//                    → verifies membership via my_tenants RPC
//                    → operates on body.tenant_id
//   - SERVICE mode : called by pg_cron with Bearer <service_role_key>
//                    → skips membership check
//                    → still verifies tenant exists + ai_mode='autonomous'
//                    → protection against infinite loop if tenant churned
//
// Auth detection : compare Bearer token to SUPABASE_SERVICE_ROLE_KEY.
// Exact match → service mode. Otherwise → user mode (verify_jwt server-side
// guarantees the JWT is valid).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-5";

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  let body: { tenant_id?: string };
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

  // ─── Auth mode detection ───────────────────────────────────────────────
  const authHeader = req.headers.get("Authorization") ?? "";
  const bearer = authHeader.replace(/^Bearer\s+/i, "").trim();
  const isServiceCall = bearer.length > 0 && bearer === serviceKey;

  let readClient: SupabaseClient;

  if (isServiceCall) {
    // SERVICE mode — check tenant exists + ai_mode=autonomous + not churned
    const { data: tenant, error: tErr } = await adminClient
      .from("tenants")
      .select("id, ai_mode, status")
      .eq("id", tenantId)
      .maybeSingle();

    if (tErr) {
      return jsonResponse({ error: `Tenant lookup failed: ${tErr.message}` }, 500);
    }
    if (!tenant) {
      return jsonResponse({ error: "Tenant not found" }, 404);
    }
    if (tenant.status === "churned") {
      return jsonResponse({ skipped: true, reason: "tenant churned" });
    }
    if (tenant.ai_mode !== "autonomous") {
      return jsonResponse({
        skipped: true,
        reason: `tenant ai_mode is '${tenant.ai_mode}', not 'autonomous'`,
      });
    }
    readClient = adminClient;
  } else {
    // USER mode — verify membership via my_tenants RPC
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const { data: tenants, error: tErr } = await userClient.rpc("my_tenants");
    if (tErr) {
      return jsonResponse({ error: `Auth check failed: ${tErr.message}` }, 401);
    }
    const isMember = (tenants ?? []).some(
      (t: { tenant_id: string }) => t.tenant_id === tenantId
    );
    if (!isMember) {
      return jsonResponse({ error: "You are not a member of this tenant" }, 403);
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
    return jsonResponse({ error: `Failed to fetch campaigns: ${cErr.message}` }, 500);
  }
  if (!campaigns || campaigns.length === 0) {
    return jsonResponse({
      decisions: [],
      mode: isServiceCall ? "cron" : "user",
      message: "No active campaigns to analyze.",
    });
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
    return jsonResponse(
      { error: `Claude API failed (${anthropicRes.status})`, detail: text.slice(0, 500) },
      502
    );
  }

  const claudeOutput = await anthropicRes.json();
  const toolUse = claudeOutput.content?.find((b: { type: string }) => b.type === "tool_use");
  if (!toolUse) {
    return jsonResponse({ error: "Claude did not return tool_use", raw: claudeOutput }, 502);
  }
  const proposedDecisions = (toolUse.input?.decisions ?? []) as ClaudeDecision[];
  if (proposedDecisions.length === 0) {
    return jsonResponse({
      decisions: [],
      mode: isServiceCall ? "cron" : "user",
      message: "Claude returned no decisions — all campaigns appear optimal.",
    });
  }

  // ─── Validate against tenant's actual campaigns ───────────────────────
  const tenantCampaignIds = new Set(campaigns.map((c) => c.id));
  const validDecisions = proposedDecisions.filter((d) => tenantCampaignIds.has(d.campaign_id));

  if (validDecisions.length === 0) {
    return jsonResponse({ decisions: [], message: "No valid decisions matched tenant's campaigns." });
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
    return jsonResponse({ error: `Failed to log decisions: ${insErr.message}` }, 500);
  }

  return jsonResponse({
    decisions: inserted ?? [],
    proposed_count: proposedDecisions.length,
    valid_count: validDecisions.length,
    mode: isServiceCall ? "cron" : "user",
    model: CLAUDE_MODEL,
  });
});
