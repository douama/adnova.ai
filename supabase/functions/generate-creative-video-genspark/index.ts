// ─── generate-creative-video-genspark v1 ────────────────────────────────────
// Generates a video ad creative via Genspark's video generation API.
// Two modes:
//
//   1. PRODUCTION (Genspark key configured) : calls Genspark video API,
//      polls until ready, downloads bytes, uploads to Storage.
//
//   2. DEMO (no key) : picks a royalty-free Mixkit clip — same fallback
//      used by generate-creative-video (Runway).
//
// Auth : verify_jwt true ; tenant membership via my_tenants RPC.
//
// Body : { tenant_id, prompt, duration?: 4|8, aspect?: "16:9"|"9:16"|"1:1",
//          product_image_url?, product_url?, product_title?, product_description?,
//          ad_pack_id? }
//
// Genspark API endpoint (confirm against their current docs) :
//   POST https://api.genspark.ai/v1/videos/generate
//   GET  https://api.genspark.ai/v1/videos/{task_id}
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const GENSPARK_VIDEO_URL = "https://api.genspark.ai/v1/videos/generate";
const GENSPARK_VIDEO_STATUS_URL = "https://api.genspark.ai/v1/videos/";

// Royalty-free Mixkit clips (same pool as generate-creative-video).
const DEMO_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-typing-on-laptop-aerial-view-9762-small.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-modern-business-buildings-from-bottom-up-view-43425-small.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-young-woman-using-her-mobile-while-browsing-online-43494-small.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-coffee-shop-customer-paying-with-card-43475-small.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-empty-modern-shopping-mall-corridor-9930-small.mp4",
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
    duration?: number;
    aspect?: string;
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
  const rawPrompt = body.prompt?.trim();
  const productImageUrl = body.product_image_url?.trim() || null;
  const productUrl = body.product_url?.trim() || null;
  const productTitle = body.product_title?.trim() || null;
  const productDescription = body.product_description?.trim() || null;
  const adPackId = body.ad_pack_id?.trim() || null;
  const prompt = [
    productTitle ? `Product: ${productTitle}.` : null,
    productDescription ? `${productDescription.slice(0, 250)}` : null,
    rawPrompt,
  ].filter(Boolean).join(" ");
  const duration = body.duration === 8 ? 8 : 4;
  const aspect = ["16:9", "9:16", "1:1"].includes(body.aspect ?? "") ? body.aspect! : "16:9";

  if (!tenantId || typeof tenantId !== "string") return json({ error: "tenant_id required" }, 400);
  if (!rawPrompt || rawPrompt.length < 5) return json({ error: "prompt too short (min 5 chars)" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) return json({ error: "Supabase env missing" }, 500);

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

  const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // ─── Ad pack: validate + enforce per-pack limit (max 2 videos) ──────
  if (adPackId) {
    const { data: pack, error: pErr } = await adminClient
      .from("ad_packs")
      .select("id, tenant_id, generated_videos")
      .eq("id", adPackId)
      .maybeSingle();
    if (pErr) return json({ error: `Ad pack lookup failed: ${pErr.message}` }, 500);
    if (!pack) return json({ error: "Ad pack not found" }, 404);
    if (pack.tenant_id !== tenantId) return json({ error: "Ad pack belongs to another tenant" }, 403);
    if ((pack.generated_videos ?? 0) >= 2) {
      return json({ error: "ad_pack_video_limit_reached", detail: "Max 2 videos per ad pack." }, 402);
    }
  }

  // Genspark key : DB credential first, env var fallback. Absent → demo mode.
  let gensparkKey: string | null = null;
  try {
    const { data } = await adminClient.rpc("get_provider_credential", { p_provider: "genspark" });
    if (typeof data === "string" && data.length > 10) gensparkKey = data;
  } catch (_) { /* fall through */ }
  if (!gensparkKey) gensparkKey = Deno.env.get("GENSPARK_API_KEY") ?? null;

  const t0 = Date.now();
  let bytes: Uint8Array;
  let isDemo = false;
  let engine: string;
  let costUsd: number;

  if (gensparkKey) {
    // ─── PRODUCTION : Genspark video generation ──────────────────────────
    // Approximate Genspark video pricing — update once official pricing is published.
    engine = "genspark-video";
    costUsd = duration === 8 ? 0.80 : 0.40;

    try {
      const startRes = await fetch(GENSPARK_VIDEO_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${gensparkKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          duration,
          aspect_ratio: aspect,
        }),
      });
      if (!startRes.ok) {
        const text = await startRes.text();
        return json({ error: `Genspark ${startRes.status}`, detail: text.slice(0, 300) }, 502);
      }
      const startJson = await startRes.json();
      const taskId = startJson.id ?? startJson.task_id as string | undefined;
      if (!taskId) return json({ error: "Genspark returned no task id" }, 502);

      // Poll up to 5 minutes (generation takes ~30-120s).
      let videoUrl: string | null = null;
      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, 5000));
        const pollRes = await fetch(`${GENSPARK_VIDEO_STATUS_URL}${taskId}`, {
          headers: { Authorization: `Bearer ${gensparkKey}` },
        });
        if (!pollRes.ok) continue;
        const pollJson = await pollRes.json();
        const status = (pollJson.status ?? pollJson.state ?? "").toUpperCase();
        if (status === "SUCCEEDED" || status === "COMPLETED" || status === "SUCCESS") {
          videoUrl = pollJson.output?.[0] ?? pollJson.url ?? pollJson.video_url ?? null;
          break;
        }
        if (status === "FAILED" || status === "ERROR") {
          return json({ error: "Genspark generation failed", detail: pollJson.failure ?? pollJson.error }, 502);
        }
      }
      if (!videoUrl) return json({ error: "Genspark timed out (5 min)" }, 504);

      const downloadRes = await fetch(videoUrl);
      if (!downloadRes.ok) return json({ error: "Failed to download Genspark video" }, 502);
      bytes = new Uint8Array(await downloadRes.arrayBuffer());
    } catch (e) {
      console.error("Genspark video call failed:", e);
      return json({ error: e instanceof Error ? e.message : "Genspark failed" }, 502);
    }
  } else {
    // ─── DEMO : copy a Mixkit clip ──────────────────────────────────────
    isDemo = true;
    engine = "demo-genspark";
    costUsd = 0;
    const url = DEMO_VIDEOS[Math.floor(Math.random() * DEMO_VIDEOS.length)]!;
    const res = await fetch(url);
    if (!res.ok) return json({ error: `Demo video fetch failed: ${res.status}` }, 502);
    bytes = new Uint8Array(await res.arrayBuffer());
  }

  const durationMs = Date.now() - t0;

  // ─── Upload + insert ──────────────────────────────────────────────────
  const filename = `${isDemo ? "demo-genspark-video" : "genspark-video"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.mp4`;
  const storagePath = `${tenantId}/${filename}`;

  const { error: upErr } = await adminClient.storage
    .from("creatives")
    .upload(storagePath, bytes, {
      contentType: "video/mp4",
      cacheControl: "31536000",
      upsert: false,
    });
  if (upErr) {
    console.error("Storage upload failed:", upErr);
    return json({ error: `Upload failed: ${upErr.message}` }, 500);
  }

  const { data: inserted, error: insErr } = await adminClient
    .from("creatives")
    .insert({
      tenant_id: tenantId,
      ad_pack_id: adPackId,
      type: "video",
      status: "draft",
      headline: prompt.slice(0, 80),
      storage_path: storagePath,
      generation_engine: engine,
      generation_prompt: prompt,
      generation_meta: {
        provider: isDemo ? "demo" : "genspark",
        model: engine,
        duration_seconds: duration,
        aspect,
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
    return json({ error: `Insert failed: ${insErr.message}` }, 500);
  }

  if (adPackId) {
    await adminClient.rpc("ad_pack_increment_generated", {
      _pack_id: adPackId,
      _kind: "video",
    });
  }

  return json({
    creative: inserted,
    ad_pack_id: adPackId,
    cost_usd: costUsd,
    duration_ms: durationMs,
    engine,
    is_demo: isDemo,
    prompt,
  });
});
