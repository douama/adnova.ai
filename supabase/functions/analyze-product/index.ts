// analyze-product v1 — given a product image OR a product URL, produce an
// ultra-detailed advertising prompt (>=1450 chars) and persist an ad_pack row.
//
// Two inputs are supported (one required):
//   - product_image_url: public/signed URL of a product photo (Claude Vision)
//   - product_url: e-commerce product page (fetched server-side, Claude reads HTML)
//
// Output:
//   - ad_pack_id (uuid) — caller passes it to generate-* functions to attach creatives
//   - prompt (>=1450 chars) — auto-filled in the UI textarea
//   - structured analysis (title, summary, audience, key_features, etc.)
//
// Quota enforcement:
//   - Calls ad_packs_quota_status RPC before creating the row.
//   - 402 if quota reached.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-6";
const MIN_PROMPT_CHARS = 1450;
const MAX_PROMPT_CHARS = 1500;

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

const ANALYSIS_TOOL = {
  name: "submit_product_analysis",
  description:
    "Submit a structured product analysis plus an ultra-detailed advertising prompt " +
    "ready to be passed to image / video / UGC generation engines. The prompt MUST be " +
    "between 1450 and 1500 characters long.",
  input_schema: {
    type: "object",
    properties: {
      product_title: { type: "string", description: "Concise product name (max 80 chars)." },
      product_summary: { type: "string", description: "One-paragraph summary (200-400 chars)." },
      product_category: { type: "string" },
      target_audience: { type: "string", description: "Specific buyer persona, not generic." },
      key_features: {
        type: "array",
        items: { type: "string" },
        description: "3-6 distinct selling points / materials / use cases.",
      },
      emotional_hook: { type: "string", description: "The feeling the ad should provoke." },
      ad_prompt: {
        type: "string",
        description:
          "Master advertising prompt of 1450-1500 chars. Must include: subject, composition, " +
          "camera angle, lighting, mood, color palette, background, props, art-direction notes, " +
          "and ad-specific cues (no on-image text unless requested, ad-platform safe, premium " +
          "aesthetic). Self-contained — usable as-is by image/video models.",
      },
    },
    required: [
      "product_title",
      "product_summary",
      "target_audience",
      "key_features",
      "emotional_hook",
      "ad_prompt",
    ],
  },
};

type AnalysisInput = {
  product_title: string;
  product_summary: string;
  product_category?: string;
  target_audience: string;
  key_features: string[];
  emotional_hook: string;
  ad_prompt: string;
};

// Strip script/style/nav/etc and collapse whitespace. Cheap server-side HTML
// distillation so we can fit the page into Claude's context.
function distillHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function extractOpenGraph(html: string): Record<string, string> {
  const og: Record<string, string> = {};
  const matches = html.matchAll(
    /<meta\s+(?:property|name)=["']([^"']+)["']\s+content=["']([^"']*)["']/gi,
  );
  for (const m of matches) {
    const key = m[1].toLowerCase();
    if (
      key.startsWith("og:") ||
      key.startsWith("twitter:") ||
      key === "description" ||
      key === "keywords"
    ) {
      og[key] = m[2];
    }
  }
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) og.title = titleMatch[1].trim();
  return og;
}

async function fetchProductPage(url: string): Promise<{ og: Record<string, string>; text: string } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (AdNovaBot/1.0; +https://adnova.ai/bot) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = (await res.text()).slice(0, 200_000);
    return { og: extractOpenGraph(html), text: distillHtml(html).slice(0, 6000) };
  } catch (e) {
    console.error("Failed to fetch product page:", e);
    return null;
  }
}

async function fetchImageAsBase64(url: string): Promise<{ data: string; mediaType: string } | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const mediaType = res.headers.get("content-type")?.split(";")[0]?.trim() ?? "image/jpeg";
    if (!mediaType.startsWith("image/")) return null;
    const buf = new Uint8Array(await res.arrayBuffer());
    if (buf.byteLength > 5 * 1024 * 1024) return null; // 5MB hard cap to avoid token blowup
    let binary = "";
    for (let i = 0; i < buf.length; i++) binary += String.fromCharCode(buf[i]);
    return { data: btoa(binary), mediaType };
  } catch (e) {
    console.error("Failed to fetch image:", e);
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: {
    tenant_id?: string;
    product_image_url?: string;
    product_url?: string;
    engine?: "image" | "video" | "ugc";
    requested_images?: number;
    requested_videos?: number;
    requested_ugc?: number;
  };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const tenantId = body.tenant_id;
  const imageUrl = body.product_image_url?.trim() || null;
  const pageUrl = body.product_url?.trim() || null;
  const engine = body.engine ?? "image";
  const reqImages = Math.max(0, Math.min(4, body.requested_images ?? 0));
  const reqVideos = Math.max(0, Math.min(2, body.requested_videos ?? 0));
  const reqUgc = Math.max(0, Math.min(1, body.requested_ugc ?? 0));

  if (!tenantId) return json({ error: "tenant_id required" }, 400);
  if (!imageUrl && !pageUrl) {
    return json({ error: "product_image_url or product_url required" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return json({ error: "Supabase env missing" }, 500);
  }
  if (!anthropicKey) return json({ error: "ANTHROPIC_API_KEY not set" }, 500);

  const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // ── Auth: membership check ────────────────────────────────────────
  const authHeader = req.headers.get("Authorization") ?? "";
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
  const { data: tenants, error: tErr } = await userClient.rpc("my_tenants");
  if (tErr) return json({ error: `Auth check failed: ${tErr.message}` }, 401);
  const member = (tenants ?? []).find((t: { tenant_id: string }) => t.tenant_id === tenantId);
  if (!member) return json({ error: "You are not a member of this tenant" }, 403);

  // ── Quota check ───────────────────────────────────────────────────
  const { data: quotaRow, error: qErr } = await adminClient
    .rpc("ad_packs_quota_status", { _tenant_id: tenantId })
    .single();
  if (qErr) return json({ error: `Quota check failed: ${qErr.message}` }, 500);
  const used = (quotaRow as { used: number; quota: number; unlimited: boolean; plan_id: string }).used;
  const quota = (quotaRow as { used: number; quota: number; unlimited: boolean; plan_id: string }).quota;
  const unlimited = (quotaRow as { used: number; quota: number; unlimited: boolean; plan_id: string }).unlimited;
  const planId = (quotaRow as { used: number; quota: number; unlimited: boolean; plan_id: string }).plan_id;

  if (!unlimited && used >= quota) {
    return json({
      error: "ad_pack_quota_reached",
      detail: `Plan ${planId} allows ${quota} ad packs/month. Used ${used}. Upgrade to continue.`,
      used,
      quota,
      plan_id: planId,
    }, 402);
  }

  // ── Build Claude content (image or URL) ──────────────────────────
  // deno-lint-ignore no-explicit-any
  const userContent: any[] = [];
  let sourceLabel = "";

  if (imageUrl) {
    const img = await fetchImageAsBase64(imageUrl);
    if (!img) return json({ error: "Failed to fetch product image (size, type or network)" }, 400);
    userContent.push({
      type: "image",
      source: { type: "base64", media_type: img.mediaType, data: img.data },
    });
    sourceLabel = "the product image attached";
  }

  let pageContext = "";
  if (pageUrl) {
    const page = await fetchProductPage(pageUrl);
    if (page) {
      const ogParts = Object.entries(page.og)
        .filter(([k]) => ["og:title", "og:description", "title", "description", "og:image", "twitter:title", "twitter:description"].includes(k))
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      pageContext =
        `## Product page metadata (URL: ${pageUrl})\n${ogParts}\n\n` +
        `## Page text excerpt\n${page.text}`;
      sourceLabel = imageUrl ? "the product image AND the page metadata below" : "the page metadata below";
    } else {
      pageContext = `## Product URL\n${pageUrl}\n(Page fetch failed — infer from URL slug)`;
      sourceLabel = imageUrl ? "the product image attached" : "the URL above";
    }
  }

  const userText =
    `Analyze the product based on ${sourceLabel}, then produce an ultra-precise ` +
    `advertising prompt of ${MIN_PROMPT_CHARS}-${MAX_PROMPT_CHARS} characters ready to ` +
    `drive image/video/UGC generation engines.\n\n` +
    `Target engine for this pack: ${engine.toUpperCase()}.\n\n` +
    `Requested asset counts: ${reqImages} images, ${reqVideos} videos, ${reqUgc} UGC.\n\n` +
    (pageContext ? pageContext + "\n\n" : "") +
    `Strict requirements for ad_prompt:\n` +
    `- Length between ${MIN_PROMPT_CHARS} and ${MAX_PROMPT_CHARS} chars (inclusive).\n` +
    `- Self-contained: model must produce a great ad without seeing the source.\n` +
    `- Cover: subject, framing, camera, lighting, color, mood, background, props, materials.\n` +
    `- Mention brand-safety, no offensive text, no celebrity likeness.\n` +
    `- No quotation marks of more than 3 words from any specific copyrighted source.\n` +
    `- Plain prose, no bullet lists or markdown.\n\n` +
    `Submit via the submit_product_analysis tool.`;

  userContent.push({ type: "text", text: userText });

  const systemPrompt =
    "You are AdNova's product-to-prompt agent. You convert a product (image or URL) into " +
    "a single dense advertising prompt that drives world-class creative generation. You are " +
    "obsessive about specificity — concrete materials, exact lighting, defined audience, " +
    "actionable composition. You write between 1450 and 1500 characters every time, no " +
    "fewer and no more. You never invent fake brand claims. You never include on-image text " +
    "unless explicitly asked. You return only via the submit_product_analysis tool.";

  // ── Call Claude ──────────────────────────────────────────────────
  const t0 = Date.now();
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
      tools: [ANALYSIS_TOOL],
      tool_choice: { type: "tool", name: "submit_product_analysis" },
      messages: [{ role: "user", content: userContent }],
    }),
  });
  const durationMs = Date.now() - t0;

  if (!anthropicRes.ok) {
    const text = await anthropicRes.text();
    // Return 200 so the JSON body is accessible in the browser (non-2xx responses
    // are wrapped opaquely by supabase-js invoke and the detail is lost).
    return json({ error: `Claude API ${anthropicRes.status}`, detail: text.slice(0, 400) });
  }
  const claudeJson = await anthropicRes.json();
  const usage = claudeJson.usage ?? {};
  const inputTokens =
    (usage.input_tokens ?? 0) +
    (usage.cache_creation_input_tokens ?? 0) +
    (usage.cache_read_input_tokens ?? 0);
  const outputTokens = usage.output_tokens ?? 0;

  const toolUse = (claudeJson.content ?? []).find((b: { type: string }) => b.type === "tool_use");
  if (!toolUse) return json({ error: "Claude did not return tool_use", raw: claudeJson }, 502);
  const analysis = toolUse.input as AnalysisInput;

  // Enforce prompt length range
  let prompt = (analysis.ad_prompt ?? "").trim();
  if (prompt.length < MIN_PROMPT_CHARS) {
    // Soft-pad with a safety clause to reach minimum without polluting style.
    const padding =
      " Maintain a premium advertising aesthetic across the whole frame: balanced negative space, " +
      "precise rim lighting, micro-contrast on edges, neutral but warm color grading, and a " +
      "composition that respects the rule of thirds while keeping the hero product perfectly centered " +
      "for any aspect-ratio crop. The final image must read as a finished campaign asset, not a stock photo.";
    prompt = (prompt + padding).slice(0, MAX_PROMPT_CHARS);
  }
  if (prompt.length > MAX_PROMPT_CHARS) prompt = prompt.slice(0, MAX_PROMPT_CHARS);

  // ── Persist ad_pack row ──────────────────────────────────────────
  const { data: pack, error: pErr } = await adminClient
    .from("ad_packs")
    .insert({
      tenant_id: tenantId,
      name: (analysis.product_title ?? "Untitled product").slice(0, 80),
      source_image_url: imageUrl,
      source_product_url: pageUrl,
      product_title: analysis.product_title ?? null,
      product_summary: analysis.product_summary ?? null,
      analysis_prompt: prompt,
      prompt_chars: prompt.length,
      analysis_meta: {
        category: analysis.product_category ?? null,
        target_audience: analysis.target_audience ?? null,
        key_features: analysis.key_features ?? [],
        emotional_hook: analysis.emotional_hook ?? null,
        model: CLAUDE_MODEL,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        duration_ms: durationMs,
      },
      status: "draft",
      engine,
      requested_images: reqImages,
      requested_videos: reqVideos,
      requested_ugc: reqUgc,
      created_by: member.user_id ?? null,
    })
    .select("id, name, analysis_prompt, prompt_chars, analysis_meta, engine, requested_images, requested_videos, requested_ugc")
    .single();

  if (pErr) return json({ error: `Failed to persist ad pack: ${pErr.message}` }, 500);

  return json({
    ad_pack: pack,
    quota: { used: used + 1, quota, unlimited, plan_id: planId },
    duration_ms: durationMs,
    model: CLAUDE_MODEL,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
  });
});
