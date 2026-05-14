import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, ExternalLink, Image as ImageIcon, Video, Camera, Sparkles } from "lucide-react";
import { supabase } from "../../lib/supabase";

type IntegrationStatus = "live" | "demo" | "missing-required";

type Integration = {
  id: string;
  name: string;
  provider: string;
  envVar: string;
  purpose: string;
  required: boolean;
  icon: React.ElementType;
  setupUrl: string;
  // Filled at runtime by counting recent rows
  recentCount?: number;
  recentCost?: number;
  status?: IntegrationStatus;
};

const INTEGRATIONS: Integration[] = [
  {
    id: "anthropic",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    envVar: "ANTHROPIC_API_KEY",
    purpose: "Decision engine (claude-decide) · the AI ops brain",
    required: true,
    icon: Sparkles,
    setupUrl: "https://console.anthropic.com/settings/keys",
  },
  {
    id: "openai-embed",
    name: "OpenAI Embeddings",
    provider: "OpenAI",
    envVar: "OPENAI_API_KEY",
    purpose: "Cross-run semantic memory (embed-decision)",
    required: false,
    icon: Sparkles,
    setupUrl: "https://platform.openai.com/api-keys",
  },
  {
    id: "openai-image",
    name: "OpenAI gpt-image-1",
    provider: "OpenAI",
    envVar: "OPENAI_API_KEY",
    purpose: "AI image creative generation",
    required: false,
    icon: ImageIcon,
    setupUrl: "https://platform.openai.com/api-keys",
  },
  {
    id: "runway",
    name: "Runway Gen-4",
    provider: "Runway",
    envVar: "RUNWAY_API_KEY",
    purpose: "AI video creative generation (4-8s clips)",
    required: false,
    icon: Video,
    setupUrl: "https://app.runwayml.com/account",
  },
  {
    id: "heygen",
    name: "HeyGen Avatar IV",
    provider: "HeyGen",
    envVar: "HEYGEN_API_KEY",
    purpose: "AI UGC video creative (talking-head avatar)",
    required: false,
    icon: Camera,
    setupUrl: "https://app.heygen.com/settings/api",
  },
];

const PROJECT_REF = "jrfxmgxtnftbcxoqzagz";
const SECRETS_URL = `https://supabase.com/dashboard/project/${PROJECT_REF}/functions/secrets`;

export function AdminIntegrations() {
  const [counts, setCounts] = useState<Record<string, { count: number; cost: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        // creatives.generation_engine + generation_meta.cost_usd
        const { data } = await supabase
          .from("creatives")
          .select("generation_engine, generation_meta")
          .not("generation_engine", "is", null)
          .gte("created_at", since);
        if (cancelled) return;
        const map: Record<string, { count: number; cost: number }> = {};
        for (const c of data ?? []) {
          const engine = c.generation_engine ?? "unknown";
          const meta = c.generation_meta as { cost_usd?: number } | null;
          const cost = Number(meta?.cost_usd ?? 0);
          if (!map[engine]) map[engine] = { count: 0, cost: 0 };
          map[engine].count += 1;
          map[engine].cost += cost;
        }
        setCounts(map);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">AI Integrations</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Manage the API keys that power AdNova's AI engines. Demo mode lets you preview the
          flow before paying.
        </p>
      </div>

      <div className="rounded-2xl border border-orange/30 bg-orange/[0.05] p-5">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink">
          <CheckCircle2 className="h-4 w-4 text-orange" strokeWidth={2} />
          How to switch from demo to production
        </h2>
        <ol className="mt-3 space-y-2 text-sm text-body">
          <li>
            <strong className="text-ink">1.</strong> Get an API key from the provider's
            dashboard (links below).
          </li>
          <li>
            <strong className="text-ink">2.</strong> Open{" "}
            <a
              href={SECRETS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-orange hover:underline"
            >
              Supabase → Edge Functions → Secrets
              <ExternalLink className="h-3 w-3" />
            </a>
            .
          </li>
          <li>
            <strong className="text-ink">3.</strong> Add a secret with the exact env var name
            (e.g. <code className="rounded bg-card px-1 text-orange">RUNWAY_API_KEY</code>).
          </li>
          <li>
            <strong className="text-ink">4.</strong> The Edge Function auto-detects the new
            key on the next call — no redeploy needed.
          </li>
        </ol>
      </div>

      <div className="grid gap-4">
        {INTEGRATIONS.map((it) => {
          const Icon = it.icon;
          // Engine name maps to creatives.generation_engine
          const engineMap: Record<string, string[]> = {
            "openai-image": ["gpt-image-1"],
            runway: ["runway-gen4", "demo-video"],
            heygen: ["heygen-avatar-iv", "demo-ugc"],
          };
          const engineKeys = engineMap[it.id] ?? [];
          const stats = engineKeys.reduce(
            (acc, key) => {
              const c = counts[key];
              if (c) {
                acc.count += c.count;
                acc.cost += c.cost;
              }
              return acc;
            },
            { count: 0, cost: 0 },
          );
          const hasDemoActivity = engineKeys.some((k) => k.startsWith("demo-") && counts[k]);
          const hasRealActivity = engineKeys.some(
            (k) => !k.startsWith("demo-") && counts[k],
          );

          return (
            <div
              key={it.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange/[0.12] text-orange">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-ink">{it.name}</h3>
                      {it.required ? (
                        <span className="rounded-md border border-muted/30 bg-muted/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                          Required
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-muted-strong">{it.provider}</p>
                    <p className="mt-2 text-sm text-body">{it.purpose}</p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-muted-strong">
                      env · <span className="text-orange">{it.envVar}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {hasRealActivity ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-orange/40 bg-orange/[0.08] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">
                      <CheckCircle2 className="h-3 w-3" />
                      Production
                    </span>
                  ) : hasDemoActivity ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-muted/40 bg-muted/[0.08] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      Demo mode
                    </span>
                  ) : it.required ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-muted/40 bg-muted/[0.12] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      <AlertCircle className="h-3 w-3" />
                      Configure
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-white/[0.03] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Not used
                    </span>
                  )}
                  <a
                    href={it.setupUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-orange"
                  >
                    Get API key
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {!loading && (stats.count > 0 || hasDemoActivity) ? (
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4 text-xs">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      Generations (24h)
                    </div>
                    <div className="mt-1 text-lg font-bold tabular-nums text-ink">
                      {stats.count}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      Cost (24h)
                    </div>
                    <div className="mt-1 text-lg font-bold tabular-nums text-ink">
                      ${stats.cost.toFixed(2)}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-base font-bold text-ink">Why demo mode exists</h2>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Letting users see the full creative-generation flow before plugging real provider
          credentials reduces friction during sales demos and team onboarding. Demo mode
          serves royalty-free Mixkit clips and stores them as normal creatives — they show up
          in the workspace grid, on campaigns, in the AI Activity feed. The only difference
          is the <code className="rounded bg-bg px-1 text-orange">is_demo</code> flag in{" "}
          <code className="rounded bg-bg px-1 text-orange">creatives.generation_meta</code>.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-body">
          When you set <code className="rounded bg-bg px-1 text-orange">RUNWAY_API_KEY</code>{" "}
          or <code className="rounded bg-bg px-1 text-orange">HEYGEN_API_KEY</code>, the
          corresponding Edge Function automatically calls the real provider on the next
          generation. No redeploy. No code change. The Production badge above will light up
          as soon as the first real generation lands.
        </p>
      </div>
    </div>
  );
}
