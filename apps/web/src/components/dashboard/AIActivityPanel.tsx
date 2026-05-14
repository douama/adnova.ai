// ─── AI Activity panel ─────────────────────────────────────────────────────
// Streams the last N invocations of claude-decide (cron + user-triggered) for
// the current tenant, with token usage, cost estimate, status and duration.
// Live-updated via the useAIRunLog hook (postgres_changes Realtime).
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

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  skipped: "bg-slate-50 text-slate-600 border-slate-200",
};

const TRIGGER_LABEL: Record<string, string> = {
  cron: "🤖 Cron",
  user: "👤 Manual",
  manual: "🔧 Test",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        STATUS_STYLES[status] ?? STATUS_STYLES.skipped
      }`}
    >
      {status === "pending" ? (
        <span className="mr-1 h-1 w-1 animate-pulse rounded-full bg-amber-500" />
      ) : null}
      {status}
    </span>
  );
}

function summarizeCost(runs: AIRunLog[]): {
  totalUsd: number;
  totalTokens: number;
  todayUsd: number;
  todayRuns: number;
} {
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
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">AI Activity</h2>
          <p className="text-xs text-slate-500">
            Live feed of Claude analyses · last 10 invocations
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Today</div>
          <div className="text-sm font-semibold tabular-nums text-slate-900">
            {formatCost(summary.todayUsd)} <span className="text-slate-400">·</span>{" "}
            <span className="text-slate-600">{summary.todayRuns} runs</span>
          </div>
        </div>
      </div>

      {loading && !runs ? (
        <div className="px-4 py-8 text-center text-sm text-slate-400">Loading…</div>
      ) : error ? (
        <div className="px-4 py-3 text-sm text-red-600">{error}</div>
      ) : !runs || runs.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-slate-400">
          Aucune invocation pour l'instant. Active le mode <strong>Autonomous</strong> ou
          clique <strong>Demander à l'IA</strong> pour générer le premier run.
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {runs.map((r) => {
            const tokens = (r.input_tokens ?? 0) + (r.output_tokens ?? 0);
            return (
              <li
                key={r.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 text-sm"
              >
                <div className="flex items-center gap-2">
                  <StatusBadge status={r.status} />
                  <span className="text-xs text-slate-500">
                    {TRIGGER_LABEL[r.trigger_source] ?? r.trigger_source}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs text-slate-600">
                    {r.status === "completed" ? (
                      <>
                        <strong className="text-slate-900">{r.decisions_count}</strong> decision
                        {r.decisions_count !== 1 ? "s" : ""} ·{" "}
                        <span className="tabular-nums">{tokens.toLocaleString()}</span> tokens ·{" "}
                        <span className="tabular-nums">
                          {r.duration_ms ? `${(r.duration_ms / 1000).toFixed(1)}s` : "—"}
                        </span>
                      </>
                    ) : r.status === "skipped" ? (
                      <span className="italic text-slate-500">
                        {r.error_message ?? "skipped"}
                      </span>
                    ) : r.status === "failed" ? (
                      <span className="text-red-600">{r.error_message ?? "error"}</span>
                    ) : (
                      <span className="italic text-amber-700">running…</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {formatRelative(r.started_at)}
                    {r.claude_model ? ` · ${r.claude_model}` : ""}
                  </div>
                </div>
                <div className="text-right text-xs tabular-nums text-slate-700">
                  {formatCost(Number(r.cost_usd_estimate))}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {runs && runs.length > 0 ? (
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
          Last {runs.length} runs · cumulative {formatCost(summary.totalUsd)} ·{" "}
          {summary.totalTokens.toLocaleString()} tokens · Sonnet 4.5 @ $3/$15 per Mtok
        </div>
      ) : null}
    </div>
  );
}
