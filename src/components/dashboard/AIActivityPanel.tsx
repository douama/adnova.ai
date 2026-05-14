// Streams the last N invocations of claude-decide (cron + user-triggered).
// Live-updated via useAIRunLog (postgres_changes Realtime).
import { useAIRunLog, type AIRunLog } from "../../lib/queries";

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function formatCost(usd: number | null): string {
  if (usd == null) return "—";
  if (usd < 0.01) return `<$0.01`;
  return `$${usd.toFixed(usd < 1 ? 3 : 2)}`;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; dot?: string }> = {
  pending: { bg: "bg-orange/[0.08]", text: "text-orange", dot: "bg-orange" },
  completed: { bg: "bg-orange/[0.08]", text: "text-orange" },
  failed: { bg: "bg-muted/[0.12]", text: "text-muted-strong" },
  skipped: { bg: "bg-white/[0.04]", text: "text-muted" },
};

const TRIGGER_LABEL: Record<string, string> = {
  cron: "Cron",
  user: "Manual",
  manual: "Test",
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.skipped!;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}
    >
      {s.dot ? <span className={`h-1 w-1 animate-pulse rounded-full ${s.dot}`} /> : null}
      {status}
    </span>
  );
}

function summarizeCost(runs: AIRunLog[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cutoff = today.getTime();

  let totalUsd = 0;
  let totalTokens = 0;
  let todayUsd = 0;
  let todayRuns = 0;
  for (const r of runs) {
    const cost = Number(r.cost_usd_estimate ?? 0);
    const tokens = Number(r.input_tokens ?? 0) + Number(r.output_tokens ?? 0);
    totalUsd += cost;
    totalTokens += tokens;
    if (new Date(r.started_at).getTime() >= cutoff) {
      todayUsd += cost;
      todayRuns += 1;
    }
  }
  return { totalUsd, totalTokens, todayUsd, todayRuns };
}

export function AIActivityPanel() {
  const { data: runs, loading, error } = useAIRunLog({ limit: 10 });
  const summary = summarizeCost(runs ?? []);

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-ink">AI Activity</h2>
          <p className="mt-0.5 text-xs text-muted">Live feed · last 10 runs</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Today
          </div>
          <div className="text-sm font-bold tabular-nums text-ink">
            {formatCost(summary.todayUsd)}
            <span className="ml-1 text-muted">· {summary.todayRuns} runs</span>
          </div>
        </div>
      </div>

      {loading && !runs ? (
        <div className="px-5 py-12 text-center text-sm text-muted">Loading…</div>
      ) : error ? (
        <div className="m-5 rounded-lg border border-muted/20 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {error}
        </div>
      ) : !runs || runs.length === 0 ? (
        <div className="space-y-2 px-5 py-12 text-center">
          <p className="text-sm font-bold text-ink">No AI runs yet</p>
          <p className="text-xs text-muted">
            Click <strong className="text-ink">Ask AI</strong> or switch to{" "}
            <strong className="text-ink">Autonomous</strong> mode to generate the first one.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border/60">
          {runs.map((r) => {
            const tokens = (r.input_tokens ?? 0) + (r.output_tokens ?? 0);
            return (
              <li key={r.id} className="px-5 py-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={r.status} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      {TRIGGER_LABEL[r.trigger_source] ?? r.trigger_source}
                    </span>
                  </div>
                  <div className="text-xs font-bold tabular-nums text-ink">
                    {formatCost(Number(r.cost_usd_estimate))}
                  </div>
                </div>

                <div className="mt-1 text-xs text-body">
                  {r.status === "completed" ? (
                    <>
                      <strong className="text-ink">{r.decisions_count}</strong> decision
                      {r.decisions_count !== 1 ? "s" : ""}
                      <span className="text-muted"> · </span>
                      <span className="tabular-nums">{tokens.toLocaleString()}</span> tokens
                      {r.duration_ms ? (
                        <>
                          <span className="text-muted"> · </span>
                          <span className="tabular-nums">
                            {(r.duration_ms / 1000).toFixed(1)}s
                          </span>
                        </>
                      ) : null}
                    </>
                  ) : r.status === "skipped" ? (
                    <span className="italic text-muted">
                      {r.error_message ?? "skipped"}
                    </span>
                  ) : r.status === "failed" ? (
                    <span className="text-muted-strong">
                      {r.error_message ?? "error"}
                    </span>
                  ) : (
                    <span className="italic text-orange">running…</span>
                  )}
                </div>

                <div className="mt-0.5 text-[10px] text-muted">
                  {formatRelative(r.started_at)}
                  {r.claude_model ? ` · ${r.claude_model}` : ""}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {runs && runs.length > 0 ? (
        <div className="border-t border-border bg-surface px-5 py-2 text-[10px] text-muted">
          {runs.length} runs · cumulative {formatCost(summary.totalUsd)} ·{" "}
          {summary.totalTokens.toLocaleString()} tokens · Sonnet 4.5 @ $3/$15 per Mtok
        </div>
      ) : null}
    </div>
  );
}
