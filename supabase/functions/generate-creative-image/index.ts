// ─── generate-creative-image v1 ────────────────────────────────────────────
// Calls OpenAI Images API (gpt-image-1, formerly DALL-E 3) to generate an
// ad creative from a text prompt, uploads the bytes to the tenant's
// creatives bucket, and inserts a row in public.creatives.
//
// Auth : user JWT (verify_jwt = true). We verify tenant membership via the
// same `my_tenants` RPC pattern used by claude-decide.
//
// Body : { tenant_id: string, prompt: string, style?: string, size?: "1024x1024" | "1024x1536" | "1536x1024" }
// Returns : { creative: { id, storage_path, ... }, cost_usd, prompt }
//
// Cost (OpenAI Images pricing, as of late 2026) :
//   1024x1024 standard : ~$0.04 / image
//   1024x1536 or 1536x1024 standard : ~$0.06 / image
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const OPENAI_IMAGES_URL = "https://api.openai.com/v1/images/generations";
const MODEL = "gpt-image-1"; // OpenAI's latest image model (replaces dall-e-3)

const COST: Record<string, number> = {
  "1024x1024": 0.04,
  "1024x1536": 0.06,
  "1536x1024": 0.06,
};

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

  let body: { tenant_id?: string; prompt?: string; style?: string; size?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const tenantId = body.tenant_id;
  const prompt = body.prompt?.trim();
  const style = body.style?.trim() ?? "";
  const size = (body.size && COST[body.size] ? body.size : "1024x1024") as keyof typeof COST;

  if (!tenantId || typeof tenantId !== "string") return json({ error: "tenant_id required" }, 400);
  if (!prompt || prompt.length < 5) return json({ error: "prompt too short (min 5 chars)" }, 400);
  if (prompt.length > 1500) return json({ error: "prompt too long (max 1500 chars)" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return json({ error: "Supabase env missing" }, 500);
  }
  if (!openaiKey) {
    return json({ error: "OPENAI_API_KEY not configured on this Edge Function" }, 500);
  }

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

  // ─── Call OpenAI Images ───────────────────────────────────────────────
  const fullPrompt = style
    ? `${prompt}\n\nStyle: ${style}. High-quality advertising creative, clean composition, professional product photography aesthetic, no text overlay unless requested.`
    : `${prompt}\n\nHigh-quality advertising creative, clean composition, professional product photography aesthetic, no text overlay unless requested.`;

  const t0 = Date.now();
  const openaiRes = await fetch(OPENAI_IMAGES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: fullPrompt,
      n: 1,
      size,
      // gpt-image-1 returns base64 by default
    }),
  });

  if (!openaiRes.ok) {
    const text = await openaiRes.text();
    console.error("OpenAI image error:", openaiRes.status, text);
    return json(
      { error: `OpenAI ${openaiRes.status}`, detail: text.slice(0, 400) },
      502,
    );
  }
  const openaiJson = await openaiRes.json();
  const b64 = openaiJson.data?.[0]?.b64_json as string | undefined;
  const url = openaiJson.data?.[0]?.url as string | undefined;
  const durationMs = Date.now() - t0;

  // gpt-image-1 returns b64_json; dall-e-3 returns url. Handle both.
  let bytes: Uint8Array;
  if (b64) {
    bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  } else if (url) {
    const imgRes = await fetch(url);
    if (!imgRes.ok) return json({ error: "Failed to download image from OpenAI URL" }, 502);
    bytes = new Uint8Array(await imgRes.arrayBuffer());
  } else {
    return json({ error: "OpenAI returned no image data" }, 502);
  }

  // ─── Upload to Supabase Storage (creatives bucket) ────────────────────
  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const filename = `ai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
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
  const costUsd = COST[size];
  const { data: inserted, error: insErr } = await adminClient
    .from("creatives")
    .insert({
      tenant_id: tenantId,
      type: "image",
      status: "draft",
      headline: prompt.slice(0, 80),
      storage_path: storagePath,
      generation_engine: MODEL,
      generation_prompt: prompt,
      generation_meta: {
        provider: "openai",
        model: MODEL,
        size,
        style: style || null,
        cost_usd: costUsd,
        duration_ms: durationMs,
        bytes: bytes.length,
      },
      created_by: member.user_id ?? null,
    })
    .select("id, storage_path, headline, status, created_at")
    .single();

  if (insErr) {
    // Rollback storage on DB failure
    await adminClient.storage.from("creatives").remove([storagePath]);
    console.error("Insert failed:", insErr);
    return json({ error: `Insert failed: ${insErr.message}` }, 500);
  }

  return json({
    creative: inserted,
    cost_usd: costUsd,
    duration_ms: durationMs,
    model: MODEL,
    size,
    prompt,
  });
});
