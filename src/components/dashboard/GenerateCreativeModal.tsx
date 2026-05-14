import { useState, useEffect } from "react";
import { Sparkles, X, Image as ImageIcon, Video, Camera } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useCurrentTenantId } from "../../stores/tenantStore";

type Engine = "image" | "video" | "ugc";
type Size = "1024x1024" | "1024x1536" | "1536x1024";

const STYLES = [
  { id: "photoreal", label: "Photoreal", hint: "Studio-quality product shot" },
  { id: "lifestyle", label: "Lifestyle", hint: "Person + product in context" },
  { id: "minimalist", label: "Minimalist", hint: "Clean background, single subject" },
  { id: "vibrant", label: "Vibrant", hint: "Bold colors, dynamic energy" },
  { id: "luxury", label: "Luxury", hint: "Dark moody, premium materials" },
];

const SIZES: Array<{ id: Size; label: string; desc: string }> = [
  { id: "1024x1024", label: "Square (1:1)", desc: "Instagram, Meta feed · $0.04" },
  { id: "1024x1536", label: "Portrait (2:3)", desc: "Stories, Reels, TikTok · $0.06" },
  { id: "1536x1024", label: "Landscape (3:2)", desc: "Banner, hero image · $0.06" },
];

export function GenerateCreativeModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const tenantId = useCurrentTenantId();
  const [engine, setEngine] = useState<Engine>("image");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<string>("photoreal");
  const [size, setSize] = useState<Size>("1024x1024");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ cost: number; duration: number } | null>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setError(null);
      setSuccess(null);
      setGenerating(false);
    }
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  async function generate() {
    if (!tenantId || prompt.trim().length < 5) return;
    setGenerating(true);
    setError(null);
    setSuccess(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke<{
        creative?: { id: string };
        cost_usd?: number;
        duration_ms?: number;
        error?: string;
        detail?: string;
      }>("generate-creative-image", {
        body: {
          tenant_id: tenantId,
          prompt: prompt.trim(),
          style: STYLES.find((s) => s.id === style)?.label,
          size,
        },
      });
      if (fnErr) {
        setError(fnErr.message);
        return;
      }
      if (!data) {
        setError("No response from function");
        return;
      }
      if (data.error) {
        setError(`${data.error}${data.detail ? ` · ${data.detail.slice(0, 100)}` : ""}`);
        return;
      }
      setSuccess({
        cost: data.cost_usd ?? 0,
        duration: (data.duration_ms ?? 0) / 1000,
      });
      onSuccess();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setGenerating(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={generating ? undefined : onClose}
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <Sparkles className="h-4 w-4 text-orange" strokeWidth={2} />
              Generate with AI
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              OpenAI gpt-image-1 · ~10-30s · stored in your workspace
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={generating}
            className="rounded-md p-1 text-muted-strong transition-colors hover:bg-white/[0.04] hover:text-ink disabled:opacity-40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Engine selector */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
              Engine
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <EngineBtn
                active={engine === "image"}
                onClick={() => setEngine("image")}
                icon={<ImageIcon className="h-4 w-4" strokeWidth={1.75} />}
                label="Image"
                sub="Live · OpenAI"
                live
              />
              <EngineBtn
                active={engine === "video"}
                onClick={() => setEngine("video")}
                icon={<Video className="h-4 w-4" strokeWidth={1.75} />}
                label="Video"
                sub="Roadmap · Runway"
              />
              <EngineBtn
                active={engine === "ugc"}
                onClick={() => setEngine("ugc")}
                icon={<Camera className="h-4 w-4" strokeWidth={1.75} />}
                label="UGC video"
                sub="Roadmap · HeyGen"
              />
            </div>
          </div>

          {engine !== "image" ? (
            <div className="rounded-xl border border-border bg-bg p-5 text-sm">
              <p className="font-bold text-ink">
                {engine === "video" ? "Video generation" : "UGC video generation"} coming soon
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Provider integrations require an account + API key. When you have one, drop the
                key into Supabase Edge Function secrets (
                <code className="rounded bg-card px-1 text-orange">
                  {engine === "video" ? "RUNWAY_API_KEY" : "HEYGEN_API_KEY"}
                </code>
                ) and we'll wire the Edge Function in 30 min.
              </p>
              <p className="mt-2 text-xs text-muted">
                Switch to <strong className="text-ink">Image</strong> above to generate a real
                creative right now.
              </p>
            </div>
          ) : (
            <>
              {/* Prompt */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
                  Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  placeholder="e.g. A minimalist white sneaker on a peach-colored background, soft natural light, professional product photography for a DTC brand."
                  className="field-input mt-2 resize-none"
                  disabled={generating}
                />
                <p className="mt-1 text-[10px] text-muted">
                  {prompt.length} / 1500 chars · be specific, mention colors, lighting, mood
                </p>
              </div>

              {/* Style */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
                  Style
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      disabled={generating}
                      className={`rounded-lg border px-3 py-1.5 text-xs transition-colors disabled:opacity-50 ${
                        style === s.id
                          ? "border-orange/40 bg-orange/[0.08] text-orange"
                          : "border-border bg-white/[0.03] text-body hover:border-border-strong"
                      }`}
                      title={s.hint}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
                  Format
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      disabled={generating}
                      className={`rounded-lg border p-3 text-left transition-colors disabled:opacity-50 ${
                        size === s.id
                          ? "border-orange/40 bg-orange/[0.08]"
                          : "border-border bg-white/[0.03] hover:border-border-strong"
                      }`}
                    >
                      <div className="text-xs font-bold text-ink">{s.label}</div>
                      <div className="mt-0.5 text-[10px] text-muted">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {error ? (
            <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="rounded-xl border border-orange/30 bg-orange/[0.08] px-4 py-3 text-sm text-orange">
              ✓ Generated in {success.duration.toFixed(1)}s · cost ~${success.cost.toFixed(2)}.
              Find it in the grid below.
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface px-6 py-4">
          <span className="text-[10px] text-muted">
            Cost billed to your Supabase OpenAI usage · stored in tenant Storage
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={generating}
              className="inline-flex h-10 items-center rounded-xl border border-border bg-white/[0.03] px-4 text-sm font-medium text-body transition-colors hover:border-border-strong disabled:opacity-50"
            >
              {success ? "Close" : "Cancel"}
            </button>
            <button
              onClick={generate}
              disabled={generating || engine !== "image" || prompt.trim().length < 5}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm disabled:opacity-55 disabled:cursor-not-allowed"
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              {generating ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EngineBtn({
  active,
  onClick,
  icon,
  label,
  sub,
  live = false,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub: string;
  live?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl border p-3 text-left transition-colors ${
        active
          ? "border-orange/40 bg-orange/[0.08]"
          : "border-border bg-white/[0.03] hover:border-border-strong"
      }`}
    >
      {live ? (
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
      ) : null}
      <div className={active ? "text-orange" : "text-muted-strong"}>{icon}</div>
      <div className="mt-2 text-xs font-bold text-ink">{label}</div>
      <div className="mt-0.5 text-[10px] text-muted">{sub}</div>
    </button>
  );
}
