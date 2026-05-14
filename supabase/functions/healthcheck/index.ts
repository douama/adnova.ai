// ─── healthcheck v1 ────────────────────────────────────────────────────────
// Public, unauthenticated probe that returns the operational status of the
// system's external dependencies. Useful for :
//   - uptime monitors (UptimeRobot, BetterUptime, Pingdom)
//   - Cloudflare Pages deploy gating
//   - status page widget on the marketing site
//
// Returns 200 with full breakdown when *core* deps are up (DB + Anthropic).
// Returns 503 when at least one core dep is down. Optional deps (OpenAI)
// report status but never fail the overall check.
//
// Note : verify_jwt is disabled for this function so monitors can hit it
// without credentials. Add `?fast=1` to skip Anthropic + OpenAI pings and
// only check the DB (cheaper, sub-100ms).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Cache-Control": "no-store",
};

type CheckResult = {
  status: "ok" | "down" | "skipped";
  latency_ms?: number;
  detail?: string;
};

async function checkDb(): Promise<CheckResult> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return { status: "down", detail: "env missing" };

  const t0 = Date.now();
  try {
    const client = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });
    // Cheapest possible round-trip : count one trivial row.
    const { error } = await client.from("tenants").select("id", { head: true, count: "exact" });
    if (error) return { status: "down", latency_ms: Date.now() - t0, detail: error.message };
    return { status: "ok", latency_ms: Date.now() - t0 };
  } catch (e) {
    return {
      status: "down",
      latency_ms: Date.now() - t0,
      detail: e instanceof Error ? e.message : "unknown",
    };
  }
}

async function lookupProviderKey(provider: string): Promise<string | null> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return null;
  try {
    const client = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });
    const { data } = await client.rpc("get_provider_credential", { p_provider: provider });
    return typeof data === "string" && data.length > 10 ? data : null;
  } catch {
    return null;
  }
}

async function checkAnthropic(): Promise<CheckResult> {
  const key =
    (await lookupProviderKey("anthropic")) ?? Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) return { status: "down", detail: "Anthropic key not configured (DB or env)" };

  // Models list endpoint — cheap, doesn't consume credits.
  const t0 = Date.now();
  try {
    const res = await fetch("https://api.anthropic.com/v1/models", {
      method: "GET",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
    });
    const latency_ms = Date.now() - t0;
    if (!res.ok) return { status: "down", latency_ms, detail: `HTTP ${res.status}` };
    return { status: "ok", latency_ms };
  } catch (e) {
    return {
      status: "down",
      latency_ms: Date.now() - t0,
      detail: e instanceof Error ? e.message : "unknown",
    };
  }
}

async function checkOpenAI(): Promise<CheckResult> {
  const key =
    (await lookupProviderKey("openai")) ?? Deno.env.get("OPENAI_API_KEY");
  if (!key) return { status: "skipped", detail: "OpenAI key not configured (semantic memory disabled)" };

  const t0 = Date.now();
  try {
    const res = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: { Authorization: `Bearer ${key}` },
    });
    const latency_ms = Date.now() - t0;
    if (!res.ok) return { status: "down", latency_ms, detail: `HTTP ${res.status}` };
    return { status: "ok", latency_ms };
  } catch (e) {
    return {
      status: "down",
      latency_ms: Date.now() - t0,
      detail: e instanceof Error ? e.message : "unknown",
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });

  const url = new URL(req.url);
  const fast = url.searchParams.get("fast") === "1";

  const checks = await (async () => {
    if (fast) {
      return { db: await checkDb() };
    }
    const [db, anthropic, openai] = await Promise.all([
      checkDb(),
      checkAnthropic(),
      checkOpenAI(),
    ]);
    return { db, anthropic, openai };
  })();

  // Core deps that must be up for the system to function.
  const coreDown =
    checks.db.status !== "ok" ||
    ("anthropic" in checks && checks.anthropic?.status !== "ok");

  const overall = coreDown ? "down" : "ok";
  const status = coreDown ? 503 : 200;

  return new Response(
    JSON.stringify(
      {
        status: overall,
        timestamp: new Date().toISOString(),
        checks,
      },
      null,
      2
    ),
    {
      status,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
});
