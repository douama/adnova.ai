import { useState, useEffect } from "react";
import { Sparkles, X, Image as ImageIcon, Video, Camera } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useCurrentTenantId } from "../../stores/tenantStore";

type Engine = "image" | "video" | "ugc";

const STYLES = [
  { id: "photoreal", label: "Photoreal", hint: "Studio-quality product shot" },
  { id: "lifestyle", label: "Lifestyle", hint: "Person + product in context" },
  { id: "minimalist", label: "Minimalist", hint: "Clean background, single subject" },
  { id: "vibrant", label: "Vibrant", hint: "Bold colors, dynamic energy" },
  { id: "luxury", label: "Luxury", hint: "Dark moody, premium materials" },
];

const SIZES = [
  { id: "1024x1024", label: "Square 1:1", desc: "Feed · $0.04" },
  { id: "1024x1536", label: "Portrait 2:3", desc: "Story · $0.06" },
  { id: "1536x1024", label: "Landscape 3:2", desc: "Banner · $0.06" },
] as const;

const ASPECTS = [
  { id: "16:9", label: "16:9", desc: "Landscape (YouTube)" },
  { id: "9:16", label: "9:16", desc: "Portrait (Reels/TikTok)" },
  { id: "1:1", label: "1:1", desc: "Square (Feed)" },
] as const;

const DURATIONS = [
  { id: 4, label: "4 sec", desc: "Quick — $0.50" },
  { id: 8, label: "8 sec", desc: "Standard — $0.95" },
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

  // Image
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<string>("photoreal");
  const [size, setSize] = useState<(typeof SIZES)[number]["id"]>("1024x1024");

  // Video
  const [videoPrompt, setVideoPrompt] = useState("");
  const [aspect, setAspect] = useState<(typeof ASPECTS)[number]["id"]>("9:16");
  const [duration, setDuration] = useState<4 | 8>(4);

  // UGC
  const [script, setScript] = useState("");

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    cost: number;
    duration: number;
    isDemo: boolean;
    engine: string;
  } | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setSuccess(null);
      setGenerating(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !generating) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, generating]);

  async function generate() {
    if (!tenantId) return;
    setGenerating(true);
    setError(null);
    setSuccess(null);

    try {
      let fnName: string;
      let body: Record<string, unknown>;

      if (engine === "image") {
        if (prompt.trim().length < 5) {
          setError("Prompt too short (min 5 chars).");
          return;
        }
        fnName = "generate-creative-image";
        body = {
          tenant_id: tenantId,
          prompt: prompt.trim(),
          style: STYLES.find((s) => s.id === style)?.label,
          size,
        };
      } else if (engine === "video") {
        if (videoPrompt.trim().length < 5) {
          setError("Prompt too short (min 5 chars).");
          return;
        }
        fnName = "generate-creative-video";
        body = {
          tenant_id: tenantId,
          prompt: videoPrompt.trim(),
          duration,
          aspect,
        };
      } else {
        if (script.trim().length < 5) {
          setError("Script too short (min 5 chars).");
          return;
        }
        fnName = "generate-creative-ugc";
        body = {
          tenant_id: tenantId,
          script: script.trim(),
        };
      }

      const { data, error: fnErr } = await supabase.functions.invoke<{
        creative?: { id: string };
        cost_usd?: number;
        duration_ms?: number;
        is_demo?: boolean;
        engine?: string;
        error?: string;
        detail?: string;
      }>(fnName, { body });

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
        isDemo: data.is_demo ?? false,
        engine: data.engine ?? "",
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
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-card max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <Sparkles className="h-4 w-4 text-orange" strokeWidth={2} />
              Generate with AI
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Image: OpenAI · Video: Runway · UGC: HeyGen · demo mode if API key absent
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
                sub="OpenAI gpt-image-1"
              />
              <EngineBtn
                active={engine === "video"}
                onClick={() => setEngine("video")}
                icon={<Video className="h-4 w-4" strokeWidth={1.75} />}
                label="Video"
                sub="Runway · 4-8s"
              />
              <EngineBtn
                active={engine === "ugc"}
                onClick={() => setEngine("ugc")}
                icon={<Camera className="h-4 w-4" strokeWidth={1.75} />}
                label="UGC video"
                sub="HeyGen avatar"
              />
            </div>
          </div>

          {/* IMAGE form */}
          {engine === "image" ? (
            <>
              <FormField label="Prompt">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  placeholder="A minimalist white sneaker on a peach-colored background, soft natural light, professional product photography."
                  className="field-input resize-none"
                  disabled={generating}
                />
                <p className="mt-1 text-[10px] text-muted">
                  {prompt.length} / 1500 chars
                </p>
              </FormField>

              <FormField label="Style">
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <PillBtn
                      key={s.id}
                      active={style === s.id}
                      onClick={() => setStyle(s.id)}
                      disabled={generating}
                    >
                      {s.label}
                    </PillBtn>
                  ))}
                </div>
              </FormField>

              <FormField label="Format">
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((s) => (
                    <ChoiceBtn
                      key={s.id}
                      active={size === s.id}
                      onClick={() => setSize(s.id)}
                      disabled={generating}
                      title={s.label}
                      desc={s.desc}
                    />
                  ))}
                </div>
              </FormField>
            </>
          ) : null}

          {/* VIDEO form */}
          {engine === "video" ? (
            <>
              <FormField label="Prompt">
                <textarea
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  rows={3}
                  placeholder="A camera slowly panning around a glass of red wine on a marble table, golden hour lighting."
                  className="field-input resize-none"
                  disabled={generating}
                />
                <p className="mt-1 text-[10px] text-muted">
                  Describe motion + subject. Be specific about camera angle and lighting.
                </p>
              </FormField>

              <FormField label="Aspect ratio">
                <div className="grid grid-cols-3 gap-2">
                  {ASPECTS.map((a) => (
                    <ChoiceBtn
                      key={a.id}
                      active={aspect === a.id}
                      onClick={() => setAspect(a.id)}
                      disabled={generating}
                      title={a.label}
                      desc={a.desc}
                    />
                  ))}
                </div>
              </FormField>

              <FormField label="Duration">
                <div className="grid grid-cols-2 gap-2">
                  {DURATIONS.map((d) => (
                    <ChoiceBtn
                      key={d.id}
                      active={duration === d.id}
                      onClick={() => setDuration(d.id as 4 | 8)}
                      disabled={generating}
                      title={d.label}
                      desc={d.desc}
                    />
                  ))}
                </div>
              </FormField>
            </>
          ) : null}

          {/* UGC form */}
          {engine === "ugc" ? (
            <>
              <FormField label="Script">
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  rows={5}
                  placeholder="Hey everyone, I just tried the new AdNova platform and honestly it saved me 10 hours a week on campaign management. Here's what surprised me…"
                  className="field-input resize-none"
                  disabled={generating}
                />
                <p className="mt-1 text-[10px] text-muted">
                  {script.length} / 2000 chars · spoken at ~150 wpm · keep it under 60s for
                  best engagement
                </p>
              </FormField>
              <div className="rounded-xl border border-border bg-bg p-3 text-xs text-muted">
                Avatar &amp; voice selection — coming soon. Default avatar (female, US English)
                is used. With HeyGen API key, you'll be able to pick from 100+ avatars + your
                own custom-trained ones.
              </div>
            </>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="space-y-1.5 rounded-xl border border-orange/30 bg-orange/[0.08] px-4 py-3 text-sm">
              <div className="font-bold text-orange">
                ✓ Generated in {success.duration.toFixed(1)}s
              </div>
              <div className="text-xs text-body">
                Engine: <strong className="text-ink">{success.engine}</strong>
                {" · "}
                Cost: <strong className="text-ink">${success.cost.toFixed(2)}</strong>
                {success.isDemo ? (
                  <>
                    {" · "}
                    <span className="rounded bg-orange/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange">
                      Demo
                    </span>
                  </>
                ) : null}
              </div>
              {success.isDemo ? (
                <p className="text-[10px] text-muted">
                  Demo mode is using a stock clip. Configure the provider API key in admin
                  settings to switch to real AI generation.
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-between border-t border-border bg-surface px-6 py-4">
          <span className="text-[10px] text-muted">Stored in your workspace · sync to ad platforms next</span>
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
              disabled={generating}
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

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function PillBtn({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border px-3 py-1.5 text-xs transition-colors disabled:opacity-50 ${
        active
          ? "border-orange/40 bg-orange/[0.08] text-orange"
          : "border-border bg-white/[0.03] text-body hover:border-border-strong"
      }`}
    >
      {children}
    </button>
  );
}

function ChoiceBtn({
  active,
  onClick,
  disabled,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border p-3 text-left transition-colors disabled:opacity-50 ${
        active
          ? "border-orange/40 bg-orange/[0.08]"
          : "border-border bg-white/[0.03] hover:border-border-strong"
      }`}
    >
      <div className="text-xs font-bold text-ink">{title}</div>
      <div className="mt-0.5 text-[10px] text-muted">{desc}</div>
    </button>
  );
}

function EngineBtn({
  active,
  onClick,
  icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-3 text-left transition-colors ${
        active
          ? "border-orange/40 bg-orange/[0.08]"
          : "border-border bg-white/[0.03] hover:border-border-strong"
      }`}
    >
      <div className={active ? "text-orange" : "text-muted-strong"}>{icon}</div>
      <div className="mt-2 text-xs font-bold text-ink">{label}</div>
      <div className="mt-0.5 text-[10px] text-muted">{sub}</div>
    </button>
  );
}
