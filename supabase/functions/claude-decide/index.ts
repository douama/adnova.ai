// ─── claude-decide ──────────────────────────────────────────────────────────
// Le cœur de l'USP AdNova : Claude lit les KPIs des campagnes actives d'un
// tenant et produit des décisions structurées (scale / kill / budget_realloc /
// audience_expand). Chaque décision est tracée dans public.ai_decisions avec
// raison, signals, confidence, et tags — la base du Decision Log.
//
// Auth flow :
//   1. Frontend envoie le JWT user dans Authorization: Bearer <token>
//   2. verify_jwt=true côté Supabase garantit que le token est valide
//   3. On utilise le JWT user pour LIRE (RLS filtre par tenant)
//   4. On utilise le service_role pour ÉCRIRE (avec validation manuelle
//      du tenant_id en double sécurité)
//
// Secrets requis (Supabase Edge Function secrets) :
//   - ANTHROPIC_API_KEY  (à set via le dashboard ou supabase secrets set)
//   - Les ${SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
//     SUPABASE_DB_URL} sont auto-injectés par le runtime Supabase.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-5";

// ─── CORS helpers ───────────────────────────────────────────────────────────
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

// ─── Tool schema exposé à Claude pour qu'il renvoie des décisions structurées
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
            action: {
              type: "object",
              description:
                'Free-form action payload — e.g. {"op":"scale","pct":10,"new_budget":924}',
            },
            reason: {
              type: "string",
              description:
                "Human-readable explanation (1-3 sentences) of WHY this decision was made, citing the metrics.",
            },
            confidence: {
              type: "number",
              minimum: 0,
              maximum: 1,
              description: "How confident in this decision (0-1).",
            },
            tags: {
              type: "array",
              items: { type: "string" },
              description:
                "Short tags like 'rule:auto-scale', 'guardrail:roas-min-3.5', 'confidence:94%'.",
            },
            revenue_uplift_usd: {
              type: "number",
              description: "Estimated revenue uplift in USD (optional).",
            },
            budget_saved_usd: {
              type: "number",
              description: "Estimated budget saved in USD (optional).",
            },
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
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  // ─── 1. Parse + validate inputs ────────────────────────────────────────
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

  // ─── 2. Secrets ────────────────────────────────────────────────────────
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return jsonResponse({ error: "Server misconfigured (Supabase env missing)" }, 500);
  }
  if (!anthropicKey) {
    return jsonResponse(
      {
        error:
          "ANTHROPIC_API_KEY not set. Add via: supabase secrets set ANTHROPIC_API_KEY=sk-ant-...",
      },
      500
    );
  }

  // ─── 3. Verify tenant access via user JWT (RLS-gated read) ────────────
  const authHeader = req.headers.get("Authorization") ?? "";
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

  // ─── 4. Fetch campaigns to analyze ────────────────────────────────────
  const { data: campaigns, error: cErr } = await userClient
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
      message: "No active campaigns to analyze. Load demo data from the dashboard.",
    });
  }

  // ─── 5. Build prompt + call Claude ────────────────────────────────────
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
    "\nReturn 2-6 decisions max. Quality over quantity.";

  const userPrompt =
    `Tenant ID: ${tenantId}\n\n` +
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
    return jsonResponse(
      { error: "Claude did not return tool_use output", raw: claudeOutput },
      502
    );
  }
  const proposedDecisions = (toolUse.input?.decisions ?? []) as ClaudeDecision[];
  if (proposedDecisions.length === 0) {
    return jsonResponse({ decisions: [], message: "Claude returned no decisions." });
  }

  // ─── 6. Validate decisions against tenant's actual campaigns ──────────
  const tenantCampaignIds = new Set(campaigns.map((c) => c.id));
  const validDecisions = proposedDecisions.filter((d) => tenantCampaignIds.has(d.campaign_id));

  if (validDecisions.length === 0) {
    return jsonResponse({
      decisions: [],
      message: "Claude proposed decisions but none matched the tenant's campaigns.",
    });
  }

  // ─── 7. Insert decisions via service role (bypasses RLS — but we just
  //         validated tenant_id, so this is safe) ───────────────────────
  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

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
    executed_by: "ai",
    tags: d.tags,
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
    model: CLAUDE_MODEL,
  });
});
