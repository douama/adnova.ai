import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../lib/database.types";

type Sub = Database["public"]["Tables"]["subscriptions"]["Row"];

const PLAN_PRICE: Record<string, number> = {
  trial: 0,
  starter: 49,
  growth: 149,
  enterprise: 499,
};

const STATUS_COLORS: Record<string, string> = {
  active: "border-orange/30 bg-orange/[0.08] text-orange",
  trialing: "border-border bg-white/[0.04] text-body",
  past_due: "border-muted/30 bg-muted/[0.12] text-muted-strong",
  canceled: "border-muted/30 bg-muted/[0.05] text-muted",
  incomplete: "border-muted/30 bg-muted/[0.05] text-muted",
  paused: "border-muted/30 bg-muted/[0.05] text-muted",
};

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function AdminRevenue() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else setSubs(data ?? []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeSubs = subs.filter((s) => s.status === "active");
  const mrr = activeSubs.reduce((acc, s) => acc + (PLAN_PRICE[s.plan] ?? 0), 0);
  const arr = mrr * 12;
  const trialing = subs.filter((s) => s.status === "trialing").length;
  const churned = subs.filter((s) => s.status === "canceled").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Revenue</h1>
        <p className="mt-1 text-sm text-muted-strong">
          MRR / ARR estimated from subscriptions table (price catalog hardcoded)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KPI label="MRR" value={fmtUsd(mrr)} highlight />
        <KPI label="ARR (est.)" value={fmtUsd(arr)} />
        <KPI label="Trialing" value={String(trialing)} sub="On trial now" />
        <KPI label="Churned" value={String(churned)} sub="Total all-time" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-bold text-ink">Subscriptions</h2>
          <p className="mt-0.5 text-xs text-muted">{subs.length} total</p>
        </div>
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-muted">Loading…</div>
        ) : error ? (
          <div className="m-5 rounded-lg border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
            {error}
          </div>
        ) : subs.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted">No subscriptions yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-bold">Tenant</th>
                  <th className="px-5 py-3 font-bold">Plan</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 text-right font-bold">Price/mo</th>
                  <th className="px-5 py-3 font-bold">Created</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-border/60 last:border-0 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3 font-mono text-[10px] text-muted">
                      {s.tenant_id.slice(0, 8)}…
                    </td>
                    <td className="px-5 py-3 capitalize text-ink">{s.plan}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          STATUS_COLORS[s.status] ?? STATUS_COLORS.incomplete
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums text-body">
                      {s.status === "active" ? fmtUsd(PLAN_PRICE[s.plan] ?? 0) : "—"}
                    </td>
                    <td className="px-5 py-3 text-xs text-muted">
                      {new Date(s.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
        {label}
      </div>
      <div
        className={`mt-4 text-3xl font-bold tracking-tighter tabular-nums ${highlight ? "text-orange" : "text-ink"}`}
      >
        {value}
      </div>
      {sub ? <div className="mt-1 text-xs text-muted">{sub}</div> : null}
    </div>
  );
}
