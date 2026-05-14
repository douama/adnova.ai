import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../lib/database.types";

type Run = Database["public"]["Tables"]["ai_run_log"]["Row"] & {
  tenant_name?: string;
};

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

function fmtCost(usd: number | null): string {
  if (usd == null) return "—";
  if (usd < 0.01) return `<$0.01`;
  return `$${Number(usd).toFixed(usd < 1 ? 3 : 2)}`;
}

export function AdminAIMonitor() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data: rows, error: err } = await supabase
        .from("ai_run_log")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(100);
      if (cancelled) return;
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      // Lookup tenant names in one query
      const ids = [...new Set((rows ?? []).map((r) => r.tenant_id))];
      const { data: tenants } = await supabase
        .from("tenants")
        .select("id, name")
        .in("id", ids);
      const nameById = new Map((tenants ?? []).map((t) => [t.id, t.name]));
      if (cancelled) return;
      setRuns(
        (rows ?? []).map((r) => ({
          ...r,
          tenant_name: nameById.get(r.tenant_id) ?? r.tenant_id.slice(0, 8),
        })),
      );
      setLoading(false);
    }
    load();

    // Realtime — re-fetch on any change
    const channel = supabase
      .channel("admin_ai_run_log")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ai_run_log" },
        () => load(),
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const totalCost = runs.reduce((acc, r) => acc + Number(r.cost_usd_estimate ?? 0), 0);
  const totalDecisions = runs.reduce((acc, r) => acc + (r.decisions_count ?? 0), 0);
  const failed = runs.filter((r) => r.status === "failed").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-ink">AI Monitor</h1>
          <p className="mt-1 text-sm text-muted-strong">
            All claude-decide invocations, cross-tenant · last 100 · live
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/[0.08] px-3 py-1 text-xs font-bold text-orange">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
          Live · Realtime
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Runs (last 100)" value={String(runs.length)} />
        <Stat label="Cumulative cost" value={fmtCost(totalCost)} />
        <Stat label="Failed runs" value={String(failed)} highlight={failed > 0} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
          {totalDecisions} decisions inserted total
        </div>
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-muted">Loading…</div>
        ) : error ? (
          <div className="m-5 rounded-lg border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
            {error}
          </div>
        ) : runs.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted">No runs yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-bold">Tenant</th>
                  <th className="px-5 py-3 font-bold">Trigger</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 text-right font-bold">Decisions</th>
                  <th className="px-5 py-3 text-right font-bold">Tokens</th>
                  <th className="px-5 py-3 text-right font-bold">Cost</th>
                  <th className="px-5 py-3 text-right font-bold">Duration</th>
                  <th className="px-5 py-3 font-bold">When</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => {
                  const tokens = (r.input_tokens ?? 0) + (r.output_tokens ?? 0);
                  const s = STATUS_STYLES[r.status] ?? STATUS_STYLES.skipped!;
                  return (
                    <tr
                      key={r.id}
                      className="border-b border-border/60 last:border-0 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3 font-medium text-ink">
                        {r.tenant_name}
                      </td>
                      <td className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                        {TRIGGER_LABEL[r.trigger_source] ?? r.trigger_source}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}
                        >
                          {s.dot ? (
                            <span
                              className={`h-1 w-1 animate-pulse rounded-full ${s.dot}`}
                            />
                          ) : null}
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-body">
                        {r.decisions_count}
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-muted">
                        {tokens.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums text-ink">
                        {fmtCost(Number(r.cost_usd_estimate))}
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-muted">
                        {r.duration_ms ? `${(r.duration_ms / 1000).toFixed(1)}s` : "—"}
                      </td>
                      <td className="px-5 py-3 text-xs text-muted">
                        {formatRelative(r.started_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
        {label}
      </div>
      <div
        className={`mt-3 text-3xl font-bold tracking-tighter tabular-nums ${highlight ? "text-orange" : "text-ink"}`}
      >
        {value}
      </div>
    </div>
  );
}
