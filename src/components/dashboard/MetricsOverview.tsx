import { TrendingUp, Megaphone, DollarSign, Activity } from "lucide-react";
import { useTenantKpis } from "../../lib/queries";

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtNum(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

export function MetricsOverview() {
  const { data, loading, error } = useTenantKpis();

  const metrics = [
    {
      title: "Total spend",
      value: data ? fmtUsd(data.totalSpend) : "—",
      icon: DollarSign,
      sub: loading ? "Loading…" : error ? "Error" : "Lifetime",
    },
    {
      title: "Avg ROAS",
      value: data ? `${data.avgRoas.toFixed(2)}×` : "—",
      icon: TrendingUp,
      sub:
        data && data.avgRoas >= 3.5
          ? "Above 3.5× threshold"
          : "Below threshold",
      highlight: data ? data.avgRoas >= 3.5 : false,
    },
    {
      title: "Conversions",
      value: data ? fmtNum(data.totalConversions) : "—",
      icon: Activity,
      sub: "All campaigns",
    },
    {
      title: "Active campaigns",
      value: data ? String(data.activeCampaigns) : "—",
      icon: Megaphone,
      sub: "Live + scaling",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.title}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border-strong"
          >
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
                {m.title}
              </div>
              <Icon
                className={`h-4 w-4 ${m.highlight ? "text-orange" : "text-muted"}`}
                strokeWidth={1.75}
              />
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tighter text-ink tabular-nums">
              {m.value}
            </div>
            <div className="mt-1 text-xs text-muted">{m.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
