// Decision Log live — every AI action on the current tenant. Realtime via
// useDecisionsFeed (postgres_changes on ai_decisions).
import { useDecisionsFeed } from "../../lib/queries";

const TYPE_LABEL: Record<string, string> = {
  scale: "Scale",
  kill: "Kill",
  create: "Create",
  budget_realloc: "Realloc",
  audience_expand: "Audience +",
  audience_narrow: "Audience −",
  bid_adjust: "Bid",
  pause: "Pause",
  resume: "Resume",
  guardrail_block: "Blocked",
};

const TYPE_TONE: Record<string, "orange" | "muted" | "muted-strong"> = {
  scale: "orange",
  resume: "orange",
  audience_expand: "orange",
  create: "orange",
  budget_realloc: "muted-strong",
  bid_adjust: "muted-strong",
  audience_narrow: "muted-strong",
  pause: "muted-strong",
  kill: "muted",
  guardrail_block: "muted",
};

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 60_000) return `${Math.max(1, Math.round(ms / 1000))}s ago`;
  if (ms < 3_600_000) return `${Math.round(ms / 60_000)}m ago`;
  if (ms < 86_400_000) return `${Math.round(ms / 3_600_000)}h ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

function fmtUsd(n: number | null) {
  if (n == null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n));
}

function TypePill({ type }: { type: string }) {
  const tone = TYPE_TONE[type] ?? "muted-strong";
  const styles =
    tone === "orange"
      ? "bg-orange/[0.08] text-orange border-orange/30"
      : tone === "muted-strong"
        ? "bg-white/[0.04] text-muted-strong border-border"
        : "bg-muted/[0.08] text-muted border-border";
  return (
    <span
      className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles}`}
    >
      {TYPE_LABEL[type] ?? type}
    </span>
  );
}

export function DecisionsPage() {
  const { data, loading, error } = useDecisionsFeed({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-ink">Decision Log</h1>
          <p className="mt-1 text-sm text-muted-strong">
            Every AI action · auditable · live · 1-click rollback
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/[0.08] px-3 py-1 text-xs font-bold text-orange">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
          Live · Realtime
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-bold text-ink">Recent activity</h2>
          <p className="mt-0.5 text-xs text-muted">Last 50 decisions on this workspace</p>
        </div>

        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-muted">Loading…</div>
        ) : error ? (
          <div className="m-5 rounded-lg border border-muted/20 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
            {error}
          </div>
        ) : !data || data.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted">
            No decisions yet. Switch to <strong className="text-ink">Autonomous</strong> mode
            or click <strong className="text-ink">Ask AI</strong> on the dashboard.
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {data.map((d) => (
              <li
                key={d.id ?? `${d.created_at}-${d.type}`}
                className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02]"
              >
                <TypePill type={d.type ?? ""} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-body">{d.reason}</p>
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                    <span>{d.created_at ? timeAgo(d.created_at) : "—"}</span>
                    {d.campaign_name ? (
                      <span>
                        · <span className="text-muted-strong">{d.campaign_name}</span>
                      </span>
                    ) : null}
                    {d.platform ? <span>· {d.platform}</span> : null}
                    {d.confidence != null ? (
                      <span>
                        · confidence{" "}
                        <span className="text-muted-strong">
                          {Math.round(Number(d.confidence) * 100)}%
                        </span>
                      </span>
                    ) : null}
                    {d.revenue_uplift_usd != null ? (
                      <span className="text-orange">
                        · +{fmtUsd(Number(d.revenue_uplift_usd))} revenue
                      </span>
                    ) : null}
                    {d.budget_saved_usd != null ? (
                      <span className="text-muted-strong">
                        · {fmtUsd(Number(d.budget_saved_usd))} saved
                      </span>
                    ) : null}
                  </div>
                  {d.tags && d.tags.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {d.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-border bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
