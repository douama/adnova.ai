// ─── generate-creative-video v1 ────────────────────────────────────────────
// Generates a video creative. Two modes :
//
//   1. PRODUCTION (RUNWAY_API_KEY env set) : calls Runway Gen-4 video API,
//      polls until ready, downloads bytes, uploads to Storage.
//
//   2. DEMO (no key) : picks a royalty-free Mixkit clip, copies it into
//      the tenant's Storage bucket. Lets the user see the full flow before
//      paying for Runway credits.
//
// In both modes : inserts a creatives row with generation_engine =
// "runway-gen4" (prod) or "demo-video" (demo), generation_meta.is_demo
// flag, and the actual storage_path of the served bytes.
//
// Auth : verify_jwt true ; tenant membership via my_tenants RPC.
//
// Body : { tenant_id, prompt, duration?: 4|8, aspect?: "16:9"|"9:16"|"1:1" }
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Royalty-free Mixkit clips (Mixkit license : free for personal + commercial,
// no attribution required). Short ~5-10s clips, ~1-3 MB each.
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

  let body: { tenant_id?: string; prompt?: string; duration?: number; aspect?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const tenantId = body.tenant_id;
  const prompt = body.prompt?.trim();
  const duration = body.duration === 8 ? 8 : 4;
  const aspect = ["16:9", "9:16", "1:1"].includes(body.aspect ?? "") ? body.aspect! : "16:9";

  if (!tenantId || typeof tenantId !== "string") return json({ error: "tenant_id required" }, 400);
  if (!prompt || prompt.length < 5) return json({ error: "prompt too short (min 5 chars)" }, 400);

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

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // Runway key : DB-stored credential first, env var fallback. If absent
  // entirely, the function still serves demo Mixkit clips.
  let runwayKey: string | null = null;
  try {
    const { data } = await adminClient.rpc("get_provider_credential", {
      p_provider: "runway",
    });
    if (typeof data === "string" && data.length > 10) runwayKey = data;
  } catch (_) { /* fall through */ }
  if (!runwayKey) runwayKey = Deno.env.get("RUNWAY_API_KEY") ?? null;

  const t0 = Date.now();
  let bytes: Uint8Array;
  let isDemo = false;
  let engine: string;
  let costUsd: number;
  let contentType = "video/mp4";

  if (runwayKey) {
    // ─── PRODUCTION : Runway Gen-4 video ────────────────────────────────
    // NOTE : Runway's exact API URL + polling pattern is subject to their
    // current API version. This is a sketch — adjust if Runway changes.
    engine = "runway-gen4";
    costUsd = duration === 8 ? 0.95 : 0.5; // approx Runway pricing

    try {
      const startRes = await fetch("https://api.runwayml.com/v1/text_to_video", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${runwayKey}`,
          "Content-Type": "application/json",
          "X-Runway-Version": "2024-09-13",
        },
        body: JSON.stringify({
          promptText: prompt,
          model: "gen4_turbo",
          duration,
          ratio: aspect.replace(":", "_"),
        }),
      });
      if (!startRes.ok) {
        const text = await startRes.text();
        return json(
          { error: `Runway ${startRes.status}`, detail: text.slice(0, 300) },
          502,
        );
      }
      const startJson = await startRes.json();
      const taskId = startJson.id as string | undefined;
      if (!taskId) return json({ error: "Runway returned no task id" }, 502);

      // Poll up to 5 minutes (Runway gen takes ~30-120s)
      let videoUrl: string | null = null;
      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, 5000));
        const pollRes = await fetch(`https://api.runwayml.com/v1/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${runwayKey}`,
            "X-Runway-Version": "2024-09-13",
          },
        });
        if (!pollRes.ok) continue;
        const pollJson = await pollRes.json();
        if (pollJson.status === "SUCCEEDED") {
          videoUrl = pollJson.output?.[0] ?? null;
          break;
        }
        if (pollJson.status === "FAILED") {
          return json({ error: "Runway generation failed", detail: pollJson.failure }, 502);
        }
      }
      if (!videoUrl) return json({ error: "Runway timed out (5 min)" }, 504);

      const downloadRes = await fetch(videoUrl);
      if (!downloadRes.ok) return json({ error: "Failed to download Runway video" }, 502);
      bytes = new Uint8Array(await downloadRes.arrayBuffer());
    } catch (e) {
      console.error("Runway call failed:", e);
      return json({ error: e instanceof Error ? e.message : "Runway failed" }, 502);
    }
  } else {
    // ─── DEMO : copy a Mixkit clip ──────────────────────────────────────
    isDemo = true;
    engine = "demo-video";
    costUsd = 0;
    const url = DEMO_VIDEOS[Math.floor(Math.random() * DEMO_VIDEOS.length)]!;
    const res = await fetch(url);
    if (!res.ok) return json({ error: `Demo video fetch failed: ${res.status}` }, 502);
    bytes = new Uint8Array(await res.arrayBuffer());
  }

  const durationMs = Date.now() - t0;

  // ─── Upload + insert ──────────────────────────────────────────────────
  const filename = `${isDemo ? "demo-video" : "ai-video"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.mp4`;
  const storagePath = `${tenantId}/${filename}`;

  const { error: upErr } = await adminClient.storage
    .from("creatives")
    .upload(storagePath, bytes, {
      contentType,
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
      type: "video",
      status: "draft",
      headline: prompt.slice(0, 80),
      storage_path: storagePath,
      generation_engine: engine,
      generation_prompt: prompt,
      generation_meta: {
        provider: isDemo ? "demo" : "runway",
        model: engine,
        duration_seconds: duration,
        aspect,
        cost_usd: costUsd,
        duration_ms: durationMs,
        bytes: bytes.length,
        is_demo: isDemo,
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
    prompt,
  });
});
