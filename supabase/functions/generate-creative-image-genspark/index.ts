// ─── generate-creative-image-genspark v1 ────────────────────────────────────
// Calls Genspark image generation API to produce an ad creative from a text
// prompt, uploads the bytes to the tenant's creatives bucket, and inserts a
// row in public.creatives.
//
// If no Genspark key is configured (DB credential or env var), the function
// falls back to a free Unsplash Source placeholder so the ad-pack flow still
// works end-to-end in demo mode.
//
// Auth : user JWT (verify_jwt = true). Tenant membership verified via my_tenants RPC.
//
// Body : { tenant_id, prompt, size?, style?, ad_pack_id?,
//          product_image_url?, product_url?, product_title?, product_description? }
// Returns : { creative, cost_usd, duration_ms, model, prompt }
//
// Genspark API endpoint (confirm against their current docs) :
//   POST https://api.genspark.ai/v1/images/generate
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const GENSPARK_IMAGE_URL = "https://api.genspark.ai/v1/images/generate";
const MODEL = "genspark-image-1";

// Approximate Genspark pricing — update once official pricing is published.
const COST: Record<string, number> = {
  "1024x1024": 0.03,
  "1024x1792": 0.05,
  "1792x1024": 0.05,
};

// Unsplash Source URLs used as demo placeholders (no API key required).
const DEMO_IMAGES = [
  "https://source.unsplash.com/1024x1024/?advertising,product",
  "https://source.unsplash.com/1024x1024/?fashion,brand",
  "https://source.unsplash.com/1024x1024/?technology,marketing",
  "https://source.unsplash.com/1024x1024/?lifestyle,creative",
];

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

  // Resolve Genspark key : DB credential first, env var fallback.
  const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  let gensparkKey: string | null = null;
  try {
    const { data } = await adminClient.rpc("get_provider_credential", { p_provider: "genspark" });
    if (typeof data === "string" && data.length > 10) gensparkKey = data;
  } catch (_) { /* fall through */ }
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

  // ─── Ad pack: validate ownership + enforce per-pack limit (max 4 images) ──
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

  const t0 = Date.now();
  let bytes: Uint8Array;
  let isDemo = false;
  let engine: string;
  let costUsd: number;

  if (gensparkKey) {
    // ─── PRODUCTION : Genspark image generation ──────────────────────────
    engine = MODEL;
    costUsd = COST[size];

    const genRes = await fetch(GENSPARK_IMAGE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${gensparkKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        size,
        n: 1,
        response_format: "b64_json",
      }),
    });

    if (!genRes.ok) {
      const text = await genRes.text();
      console.error("Genspark image error:", genRes.status, text);
      return json({ error: `Genspark ${genRes.status}`, detail: text.slice(0, 400) }, 502);
    }

    const genJson = await genRes.json();
    const b64 = genJson.data?.[0]?.b64_json as string | undefined;
    const url = genJson.data?.[0]?.url as string | undefined;

    if (b64) {
      bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    } else if (url) {
      const imgRes = await fetch(url);
      if (!imgRes.ok) return json({ error: "Failed to download image from Genspark URL" }, 502);
      bytes = new Uint8Array(await imgRes.arrayBuffer());
    } else {
      return json({ error: "Genspark returned no image data" }, 502);
    }
  } else {
    // ─── DEMO : fetch an Unsplash placeholder ────────────────────────────
    isDemo = true;
    engine = "demo-genspark";
    costUsd = 0;
    const demoUrl = DEMO_IMAGES[Math.floor(Math.random() * DEMO_IMAGES.length)]!;
    const demoRes = await fetch(demoUrl);
    if (!demoRes.ok) return json({ error: `Demo image fetch failed: ${demoRes.status}` }, 502);
    bytes = new Uint8Array(await demoRes.arrayBuffer());
  }

  const durationMs = Date.now() - t0;

  // ─── Upload to Supabase Storage ───────────────────────────────────────
  const filename = `${isDemo ? "demo-genspark" : "genspark"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
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
    return json({ error: `Upload failed: ${upErr.message}` }, 500);
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
        provider: isDemo ? "demo" : "genspark",
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
    return json({ error: `Insert failed: ${insErr.message}` }, 500);
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
