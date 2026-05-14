// ─── generate-creative-ugc v1 ──────────────────────────────────────────────
// Generates a UGC-style video creative (avatar talking, lip-synced to a
// script). Two modes :
//
//   1. PRODUCTION (HEYGEN_API_KEY env set) : calls HeyGen Avatar IV API.
//   2. DEMO (no key) : copies a royalty-free talking-head Mixkit clip.
//
// Body : { tenant_id, script, avatar?: string, voice?: string }
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Royalty-free Mixkit clips of people talking to camera (UGC-style)
const DEMO_UGC = [
  "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-to-the-camera-in-the-park-42893-small.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-man-recording-himself-with-his-phone-1227-small.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-woman-explaining-something-while-recording-herself-42898-small.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-fashion-blogger-talking-on-camera-43617-small.mp4",
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
    script?: string;
    avatar?: string;
    voice?: string;
    product_image_url?: string;
    product_url?: string;
    product_title?: string;
    product_description?: string;
  };
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

  const tenantId = body.tenant_id;
  const script = body.script?.trim();
  const avatar = body.avatar ?? "default-female";
  const voice = body.voice ?? "default-en-us";
  const productImageUrl = body.product_image_url?.trim() || null;
  const productUrl = body.product_url?.trim() || null;
  const productTitle = body.product_title?.trim() || null;

  if (!tenantId || typeof tenantId !== "string") return json({ error: "tenant_id required" }, 400);
  if (!script || script.length < 5) return json({ error: "script too short (min 5 chars)" }, 400);
  if (script.length > 2000) return json({ error: "script too long (max 2000 chars)" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) return json({ error: "Supabase env missing" }, 500);

  // Tenant membership
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

  // HeyGen key : DB-stored credential first, env var fallback. Falls back
  // to demo Mixkit clips if neither is configured.
  let heygenKey: string | null = null;
  try {
    const { data } = await adminClient.rpc("get_provider_credential", {
      p_provider: "heygen",
    });
    if (typeof data === "string" && data.length > 10) heygenKey = data;
  } catch (_) { /* fall through */ }
  if (!heygenKey) heygenKey = Deno.env.get("HEYGEN_API_KEY") ?? null;

  const t0 = Date.now();
  let bytes: Uint8Array;
  let isDemo = false;
  let engine: string;
  let costUsd: number;

  if (heygenKey) {
    engine = "heygen-avatar-iv";
    // HeyGen pricing varies — rough estimate ~$0.30 per minute, scripts ~30s avg
    costUsd = 0.15;
    try {
      const startRes = await fetch("https://api.heygen.com/v2/video/generate", {
        method: "POST",
        headers: {
          "X-Api-Key": heygenKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_inputs: [
            {
              character: { type: "avatar", avatar_id: avatar, avatar_style: "normal" },
              voice: { type: "text", input_text: script, voice_id: voice },
              background: { type: "color", value: "#ffffff" },
            },
          ],
          dimension: { width: 1080, height: 1920 },
        }),
      });
      if (!startRes.ok) {
        const text = await startRes.text();
        return json({ error: `HeyGen ${startRes.status}`, detail: text.slice(0, 300) }, 502);
      }
      const startJson = await startRes.json();
      const videoId = startJson?.data?.video_id as string | undefined;
      if (!videoId) return json({ error: "HeyGen returned no video_id" }, 502);

      // Poll up to 10 min — HeyGen renders can be slow
      let videoUrl: string | null = null;
      for (let i = 0; i < 120; i++) {
        await new Promise((r) => setTimeout(r, 5000));
        const pollRes = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
          headers: { "X-Api-Key": heygenKey },
        });
        if (!pollRes.ok) continue;
        const pollJson = await pollRes.json();
        const status = pollJson?.data?.status;
        if (status === "completed") {
          videoUrl = pollJson?.data?.video_url ?? null;
          break;
        }
        if (status === "failed") {
          return json({ error: "HeyGen generation failed", detail: pollJson?.data?.error }, 502);
        }
      }
      if (!videoUrl) return json({ error: "HeyGen timed out (10 min)" }, 504);

      const dl = await fetch(videoUrl);
      if (!dl.ok) return json({ error: "Failed to download HeyGen video" }, 502);
      bytes = new Uint8Array(await dl.arrayBuffer());
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "HeyGen failed" }, 502);
    }
  } else {
    // DEMO : copy a Mixkit talking-head clip
    isDemo = true;
    engine = "demo-ugc";
    costUsd = 0;
    const url = DEMO_UGC[Math.floor(Math.random() * DEMO_UGC.length)]!;
    const res = await fetch(url);
    if (!res.ok) return json({ error: `Demo UGC fetch failed: ${res.status}` }, 502);
    bytes = new Uint8Array(await res.arrayBuffer());
  }

  const durationMs = Date.now() - t0;
  const filename = `${isDemo ? "demo-ugc" : "ai-ugc"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.mp4`;
  const storagePath = `${tenantId}/${filename}`;

  const { error: upErr } = await adminClient.storage.from("creatives").upload(storagePath, bytes, {
    contentType: "video/mp4",
    cacheControl: "31536000",
    upsert: false,
  });
  if (upErr) return json({ error: `Upload failed: ${upErr.message}` }, 500);

  const { data: inserted, error: insErr } = await adminClient
    .from("creatives")
    .insert({
      tenant_id: tenantId,
      type: "ugc_video",
      status: "draft",
      headline: script.slice(0, 80),
      primary_text: script,
      storage_path: storagePath,
      generation_engine: engine,
      generation_prompt: script,
      generation_meta: {
        provider: isDemo ? "demo" : "heygen",
        model: engine,
        avatar,
        voice,
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

  return json({
    creative: inserted,
    cost_usd: costUsd,
    duration_ms: durationMs,
    engine,
    is_demo: isDemo,
    script,
  });
});
