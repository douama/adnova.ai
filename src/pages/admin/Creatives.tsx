import { useEffect, useMemo, useState } from "react";
import { Sparkles, Image as ImageIcon, Video } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../lib/database.types";

type Creative = Database["public"]["Tables"]["creatives"]["Row"] & {
  tenant_name?: string;
  signed_url?: string;
};

type EngineFilter = "all" | "ai-only" | "manual" | "demo";

function fmtUsd(n: number) {
  if (n < 0.01) return `<$0.01`;
  return `$${n.toFixed(2)}`;
}

export function AdminCreatives() {
  const [creatives, setCreatives] = useState<Creative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<EngineFilter>("ai-only");
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: rows, error } = await supabase
        .from("creatives")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (cancelled) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      const ids = [...new Set((rows ?? []).map((r) => r.tenant_id))];
      const { data: tenants } = await supabase
        .from("tenants")
        .select("id, name")
        .in("id", ids);
      const nameById = new Map((tenants ?? []).map((t) => [t.id, t.name]));
      if (cancelled) return;
      setCreatives(
        (rows ?? []).map((c) => ({
          ...c,
          tenant_name: nameById.get(c.tenant_id) ?? c.tenant_id.slice(0, 8),
        })),
      );
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sign URLs for thumbnails in batches
  useEffect(() => {
    if (creatives.length === 0) return;
    const paths = creatives
      .map((c) => c.storage_path)
      .filter((p): p is string => Boolean(p))
      .slice(0, 30); // sign first 30 for grid view
    if (paths.length === 0) return;
    (async () => {
      const { data } = await supabase.storage
        .from("creatives")
        .createSignedUrls(paths, 3600);
      const map: Record<string, string> = {};
      for (const item of data ?? []) {
        if (item.path && item.signedUrl) map[item.path] = item.signedUrl;
      }
      setSignedUrls(map);
    })();
  }, [creatives]);

  const filtered = useMemo(() => {
    if (filter === "all") return creatives;
    if (filter === "ai-only")
      return creatives.filter(
        (c) =>
          c.generation_engine &&
          !c.generation_engine.startsWith("demo-"),
      );
    if (filter === "demo")
      return creatives.filter((c) => c.generation_engine?.startsWith("demo-"));
    if (filter === "manual") return creatives.filter((c) => !c.generation_engine);
    return creatives;
  }, [creatives, filter]);

  const stats = useMemo(() => {
    const aiTotal = creatives.filter((c) => c.generation_engine).length;
    const demoTotal = creatives.filter((c) =>
      c.generation_engine?.startsWith("demo-"),
    ).length;
    const realAI = aiTotal - demoTotal;
    const cost = creatives.reduce((acc, c) => {
      const meta = c.generation_meta as { cost_usd?: number } | null;
      return acc + Number(meta?.cost_usd ?? 0);
    }, 0);
    return { aiTotal, demoTotal, realAI, cost };
  }, [creatives]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Creatives</h1>
        <p className="mt-1 text-sm text-muted-strong">
          {creatives.length} most-recent creatives across all tenants · gallery + filters
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KPI label="AI-generated" value={String(stats.realAI)} sub="Real provider calls" highlight />
        <KPI label="Demo creatives" value={String(stats.demoTotal)} sub="Mixkit clips, no API key" />
        <KPI label="Manual uploads" value={String(creatives.length - stats.aiTotal)} sub="User-uploaded" />
        <KPI label="AI gen cost" value={fmtUsd(stats.cost)} sub="From generation_meta" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(["all", "ai-only", "demo", "manual"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg border px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              filter === f
                ? "border-orange/40 bg-orange/[0.08] text-orange"
                : "border-border bg-white/[0.03] text-muted-strong hover:border-border-strong"
            }`}
          >
            {f === "ai-only" ? "AI Real" : f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center text-sm text-muted">
          Loading…
        </div>
      ) : error ? (
        <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center text-sm text-muted">
          No creatives matching this filter
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.slice(0, 30).map((c) => {
            const url = c.storage_path ? signedUrls[c.storage_path] : undefined;
            const isVideo = c.type === "video" || c.type === "ugc_video";
            const isDemo = c.generation_engine?.startsWith("demo-");
            const isAI = !!c.generation_engine && !isDemo;
            const meta = c.generation_meta as { cost_usd?: number } | null;

            return (
              <div
                key={c.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-bg transition-colors hover:border-border-strong"
              >
                {/* Top-left badge */}
                {isAI ? (
                  <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-md border border-orange/40 bg-orange/[0.12] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange backdrop-blur-sm">
                    <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
                    AI
                  </span>
                ) : isDemo ? (
                  <span className="absolute left-2 top-2 z-10 inline-flex items-center rounded-md border border-muted/40 bg-muted/[0.12] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-strong backdrop-blur-sm">
                    Demo
                  </span>
                ) : null}
                {/* Top-right type icon */}
                <span className="absolute right-2 top-2 z-10 grid h-5 w-5 place-items-center rounded bg-bg/80 text-muted backdrop-blur-sm">
                  {isVideo ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                </span>

                <div className="aspect-square bg-surface">
                  {url ? (
                    isVideo ? (
                      <video src={url} className="h-full w-full object-cover" muted playsInline />
                    ) : (
                      <img
                        src={url}
                        alt={c.headline ?? ""}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted">
                      {c.type}
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <div className="truncate text-xs font-medium text-ink" title={c.headline ?? ""}>
                    {c.headline ?? "(untitled)"}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-muted">
                    <span className="truncate">{c.tenant_name}</span>
                    {meta?.cost_usd != null ? (
                      <span className="font-bold text-body">
                        {fmtUsd(Number(meta.cost_usd))}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filtered.length > 30 ? (
        <p className="text-xs text-muted">
          Showing first 30 of {filtered.length} matching · refine the filter to narrow
        </p>
      ) : null}
    </div>
  );
}

function KPI({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
        {label}
      </div>
      <div
        className={`mt-3 text-2xl font-bold tracking-tighter tabular-nums ${highlight ? "text-orange" : "text-ink"}`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted">{sub}</div>
    </div>
  );
}
