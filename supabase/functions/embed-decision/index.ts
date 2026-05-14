// ─── embed-decision v1 ─────────────────────────────────────────────────────
// Fetches a decision's `reason`, calls OpenAI text-embedding-3-small (1536
// dims), and stores the vector on ai_decisions.embedding.
//
// Invoked async via DB trigger ai_decisions_embed → invoke_embed_decision()
// → pg_net.http_post. Service-role only (gated on JWT `role` claim).
//
// Graceful degradation : if OPENAI_API_KEY is not set on this Edge Function,
// returns {skipped: true} and leaves embedding null. claude-decide then
// falls back to rule-based recent context only (Phase 7a still works).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const OPENAI_EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings";
const EMBEDDING_MODEL = "text-embedding-3-small";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type",
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization") ?? "";
  const bearer = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (decodeJwtRole(bearer) !== "service_role") {
    return jsonResponse({ error: "Service-role required" }, 403);
  }

  let body: { decision_id?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }
  const decisionId = body.decision_id;
  if (!decisionId || typeof decisionId !== "string") {
    return jsonResponse({ error: "decision_id required" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return jsonResponse({ error: "Supabase env missing" }, 500);
  }

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // OpenAI key : DB-stored credential first, env var fallback. Graceful
  // skip if neither is configured (claude-decide falls back to rule-based).
  let openaiKey: string | null = null;
  try {
    const { data } = await adminClient.rpc("get_provider_credential", {
      p_provider: "openai",
    });
    if (typeof data === "string" && data.length > 10) openaiKey = data;
  } catch (_) {
    /* fall through */
  }
  if (!openaiKey) openaiKey = Deno.env.get("OPENAI_API_KEY") ?? null;
  if (!openaiKey) {
    return jsonResponse({ skipped: true, reason: "OpenAI key not configured" });
  }

  const { data: decision, error: dErr } = await adminClient
    .from("ai_decisions")
    .select("id, reason, type, tenant_id")
    .eq("id", decisionId)
    .maybeSingle();
  if (dErr) return jsonResponse({ error: `Lookup failed: ${dErr.message}` }, 500);
  if (!decision) return jsonResponse({ error: "Decision not found" }, 404);

  // Compose a rich input string so the embedding captures both the WHAT and
  // the WHY — semantic retrieval will work even when querying with a
  // situation summary rather than a verbatim past reason.
  const inputText = `[${decision.type}] ${decision.reason}`;

  const embRes = await fetch(OPENAI_EMBEDDINGS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: inputText, model: EMBEDDING_MODEL }),
  });
  if (!embRes.ok) {
    const text = await embRes.text();
    console.error("OpenAI embeddings error:", embRes.status, text);
    return jsonResponse(
      { error: `OpenAI ${embRes.status}`, detail: text.slice(0, 300) },
      502
    );
  }
  const embJson = await embRes.json();
  const vector = embJson.data?.[0]?.embedding as number[] | undefined;
  if (!vector || vector.length !== 1536) {
    return jsonResponse(
      { error: "OpenAI returned unexpected embedding shape", got_length: vector?.length },
      502
    );
  }

  // pgvector accepts the literal "[a,b,c,...]" via supabase-js.
  const vectorLiteral = `[${vector.join(",")}]`;
  const { error: uErr } = await adminClient
    .from("ai_decisions")
    .update({ embedding: vectorLiteral })
    .eq("id", decisionId);
  if (uErr) {
    console.error("Update embedding failed:", uErr);
    return jsonResponse({ error: `Update failed: ${uErr.message}` }, 500);
  }

  return jsonResponse({
    ok: true,
    decision_id: decisionId,
    model: EMBEDDING_MODEL,
    dims: vector.length,
  });
});
