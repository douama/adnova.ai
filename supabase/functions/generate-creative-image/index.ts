// ─── generate-creative-image v4 ────────────────────────────────────────────
// Generates an ad image creative with a provider cascade:
//   1. OpenAI gpt-image-1   (if OPENAI_API_KEY / DB credential configured)
//   2. Genspark image API   (if GENSPARK_API_KEY / DB credential configured)
//   3. Picsum placeholder   (demo fallback — always works, no key needed)
//
// Each provider is wrapped in try/catch so a network throw never crashes Deno.
//
// Auth : user JWT (verify_jwt = true). Tenant membership verified via my_tenants RPC.
//
// Body : { tenant_id, prompt, style?, size?, ad_pack_id?,
//          product_image_url?, product_url?, product_title?, product_description? }
// Returns : { creative, cost_usd, duration_ms, model, prompt, is_demo? }
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const OPENAI_IMAGES_URL = "https://api.openai.com/v1/images/generations";
const OPENAI_MODEL = "gpt-image-1";

const GENSPARK_IMAGE_URL = "https://api.genspark.ai/v1/images/generate";
const GENSPARK_MODEL = "genspark-image-1";

const COST: Record<string, number> = {
  "1024x1024": 0.04,
  "1024x1536": 0.06,
  "1536x1024": 0.06,
};

const GENSPARK_COST: Record<string, number> = {
  "1024x1024": 0.03,
  "1024x1792": 0.05,
  "1792x1024": 0.05,
};

// Picsum gives reliable placeholder images; random query makes each unique.
const DEMO_URL = "https://picsum.photos/1024/1024";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

// ─── Provider helpers — each returns bytes or null (never throws) ─────────

async function fetchUrl(url: string): Promise<Uint8Array | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return new Uint8Array(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function tryOpenAI(key: string, prompt: string, size: string): Promise<Uint8Array | null> {
  try {
    const res = await fetch(OPENAI_IMAGES_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: OPENAI_MODEL, prompt, n: 1, size }),
    });
    if (!res.ok) {
      console.error("OpenAI image error:", res.status, (await res.text()).slice(0, 200));
      return null;
    }
    const j = await res.json();
    const b64: string | undefined = j.data?.[0]?.b64_json;
    const url: string | undefined = j.data?.[0]?.url;
    if (b64) return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    if (url) return await fetchUrl(url);
    return null;
  } catch (e) {
    console.error("OpenAI image exception:", e);
    return null;
  }
}

async function tryGenspark(key: string, prompt: string, size: string): Promise<Uint8Array | null> {
  try {
    const res = await fetch(GENSPARK_IMAGE_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, size, n: 1, response_format: "b64_json" }),
    });
    if (!res.ok) {
      console.error("Genspark image error:", res.status, (await res.text()).slice(0, 200));
      return null;
    }
    const j = await res.json();
    const b64: string | undefined = j.data?.[0]?.b64_json;
    const url: string | undefined = j.data?.[0]?.url;
    if (b64) return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    if (url) return await fetchUrl(url);
    return null;
  } catch (e) {
    console.error("Genspark image exception:", e);
    return null;
  }
}

async function tryDemo(): Promise<Uint8Array | null> {
  return await fetchUrl(`${DEMO_URL}?r=${Math.floor(Math.random() * 10000)}`);
}

// ─── Main handler ─────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: {
    tenant_id?: string;
    prompt?: string;
    style?: string;
    size?: string;
    product_image_url?: string;
    product_url?: string;
    product_title?: string;
    product_description?: string;
    ad_pack_id?: string;
  };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const tenantId = body.tenant_id;
  const prompt = body.prompt?.trim();
  const style = body.style?.trim() ?? "";
  const size = (body.size && COST[body.size] ? body.size : "1024x1024") as keyof typeof COST;
  const productImageUrl = body.product_image_url?.trim() || null;
  const productUrl = body.product_url?.trim() || null;
  const productTitle = body.product_title?.trim() || null;
  const productDescription = body.product_description?.trim() || null;
  const adPackId = body.ad_pack_id?.trim() || null;

  if (!tenantId || typeof tenantId !== "string") return json({ error: "tenant_id required" }, 400);
  if (!prompt || prompt.length < 5) return json({ error: "prompt too short (min 5 chars)" }, 400);
  if (prompt.length > 1500) return json({ error: "prompt too long (max 1500 chars)" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) return json({ error: "Supabase env missing" }, 500);

  const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // ─── Resolve API keys ─────────────────────────────────────────────────
  let openaiKey: string | null = null;
  let gensparkKey: string | null = null;
  try {
    const [oRes, gRes] = await Promise.all([
      adminClient.rpc("get_provider_credential", { p_provider: "openai" }),
      adminClient.rpc("get_provider_credential", { p_provider: "genspark" }),
    ]);
    if (typeof oRes.data === "string" && oRes.data.length > 10) openaiKey = oRes.data;
    if (typeof gRes.data === "string" && gRes.data.length > 10) gensparkKey = gRes.data;
  } catch (_) { /* fall through */ }
  if (!openaiKey) openaiKey = Deno.env.get("OPENAI_API_KEY") ?? null;
  if (!gensparkKey) gensparkKey = Deno.env.get("GENSPARK_API_KEY") ?? null;

  // ─── Tenant membership check ──────────────────────────────────────────
  const authHeader = req.headers.get("Authorization") ?? "";
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
  const { data: tenants, error: tErr } = await userClient.rpc("my_tenants");
  if (tErr) return json({ error: `Auth check failed: ${tErr.message}` }, 401);
  const member = (tenants ?? []).find((t: { tenant_id: string }) => t.tenant_id === tenantId);
  if (!member) return json({ error: "You are not a member of this tenant" }, 403);

  // ─── Ad pack: validate ownership + per-pack limit (max 4 images) ──────
  if (adPackId) {
    const { data: pack, error: pErr } = await adminClient
      .from("ad_packs")
      .select("id, tenant_id, generated_images")
      .eq("id", adPackId)
      .maybeSingle();
    if (pErr) return json({ error: `Ad pack lookup failed: ${pErr.message}` }, 500);
    if (!pack) return json({ error: "Ad pack not found" }, 404);
    if (pack.tenant_id !== tenantId) return json({ error: "Ad pack belongs to another tenant" }, 403);
    if ((pack.generated_images ?? 0) >= 4) {
      return json({ error: "ad_pack_image_limit_reached", detail: "Max 4 images per ad pack." }, 402);
    }
  }

  // ─── Build enriched prompt ────────────────────────────────────────────
  const productContext = [
    productTitle ? `Product: ${productTitle}` : null,
    productDescription ? `Description: ${productDescription.slice(0, 400)}` : null,
    productUrl ? `Source: ${productUrl}` : null,
    productImageUrl ? `Reference image available — match the product appearance accurately.` : null,
  ].filter(Boolean).join("\n");

  const fullPrompt = [
    productContext,
    prompt,
    style ? `Style: ${style}.` : null,
    "High-quality advertising creative, clean composition, professional product photography aesthetic, no text overlay unless requested.",
  ].filter(Boolean).join("\n\n");

  // ─── Provider cascade: OpenAI → Genspark → demo ──────────────────────
  const t0 = Date.now();
  let bytes: Uint8Array | null = null;
  let isDemo = false;
  let engine = "demo";
  let costUsd = 0;

  if (openaiKey) {
    bytes = await tryOpenAI(openaiKey, fullPrompt, size);
    if (bytes) { engine = OPENAI_MODEL; costUsd = COST[size]; }
  }

  if (!bytes && gensparkKey) {
    bytes = await tryGenspark(gensparkKey, fullPrompt, size);
    if (bytes) { engine = GENSPARK_MODEL; costUsd = GENSPARK_COST[size] ?? 0.03; }
  }

  if (!bytes) {
    isDemo = true;
    engine = "demo";
    costUsd = 0;
    bytes = await tryDemo();
    if (!bytes) return json({ error: "All image providers failed (including demo fallback)" });
  }

  const durationMs = Date.now() - t0;

  // ─── Upload to Supabase Storage ───────────────────────────────────────
  const prefix = isDemo ? "demo" : engine.startsWith("genspark") ? "genspark" : "openai";
  const filename = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
  const storagePath = `${tenantId}/${filename}`;

  const { error: upErr } = await adminClient.storage
    .from("creatives")
    .upload(storagePath, bytes, {
      contentType: "image/png",
      cacheControl: "31536000",
      upsert: false,
    });
  if (upErr) {
    console.error("Storage upload failed:", upErr);
    return json({ error: `Upload failed: ${upErr.message}` });
  }

  // ─── Insert creative row ──────────────────────────────────────────────
  const { data: inserted, error: insErr } = await adminClient
    .from("creatives")
    .insert({
      tenant_id: tenantId,
      ad_pack_id: adPackId,
      type: "image",
      status: "draft",
      headline: prompt.slice(0, 80),
      storage_path: storagePath,
      generation_engine: engine,
      generation_prompt: prompt,
      generation_meta: {
        provider: isDemo ? "demo" : engine.startsWith("genspark") ? "genspark" : "openai",
        model: engine,
        size,
        style: style || null,
        cost_usd: costUsd,
        duration_ms: durationMs,
        bytes: bytes.length,
        is_demo: isDemo,
        product_url: productUrl,
        product_image_url: productImageUrl,
        product_title: productTitle,
      },
      created_by: member.user_id ?? null,
    })
    .select("id, storage_path, headline, status, created_at")
    .single();

  if (insErr) {
    await adminClient.storage.from("creatives").remove([storagePath]);
    console.error("Insert failed:", insErr);
    return json({ error: `Insert failed: ${insErr.message}` });
  }

  if (adPackId) {
    await adminClient.rpc("ad_pack_increment_generated", {
      _pack_id: adPackId,
      _kind: "image",
    });
  }

  return json({
    creative: inserted,
    ad_pack_id: adPackId,
    cost_usd: costUsd,
    duration_ms: durationMs,
    model: engine,
    is_demo: isDemo,
    size,
    prompt,
  });
});
