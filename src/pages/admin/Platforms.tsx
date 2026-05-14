import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { PLATFORMS } from "../../data/platforms";
import { PlatformIcon } from "../../components/ui/PlatformIcon";

type Stat = {
  platform: string;
  connections: number;
  campaigns: number;
  spend: number;
  revenue: number;
  roas: number;
};

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function AdminPlatforms() {
  const [stats, setStats] = useState<Record<string, Stat>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [connRes, campRes] = await Promise.all([
          supabase.from("platform_connections").select("platform, is_active"),
          supabase
            .from("campaigns")
            .select("platform, spend_total, revenue_total"),
        ]);
        if (cancelled) return;
        if (connRes.error) {
          setError(connRes.error.message);
          return;
        }
        if (campRes.error) {
          setError(campRes.error.message);
          return;
        }

        const map: Record<string, Stat> = {};
        for (const p of PLATFORMS) {
          map[p.id] = {
            platform: p.id,
            connections: 0,
            campaigns: 0,
            spend: 0,
            revenue: 0,
            roas: 0,
          };
        }
        for (const c of connRes.data ?? []) {
          const id = String(c.platform);
          if (map[id]) map[id].connections += c.is_active ? 1 : 0;
        }
        for (const c of campRes.data ?? []) {
          const id = String(c.platform);
          if (!map[id]) continue;
          map[id].campaigns += 1;
          map[id].spend += Number(c.spend_total ?? 0);
          map[id].revenue += Number(c.revenue_total ?? 0);
        }
        for (const id of Object.keys(map)) {
          const s = map[id];
          if (!s) continue;
          s.roas = s.spend > 0 ? s.revenue / s.spend : 0;
        }
        setStats(map);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalConnections = Object.values(stats).reduce((a, s) => a + s.connections, 0);
  const totalSpend = Object.values(stats).reduce((a, s) => a + s.spend, 0);
  const totalRevenue = Object.values(stats).reduce((a, s) => a + s.revenue, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Ad Platforms</h1>
        <p className="mt-1 text-sm text-muted-strong">
          9 platforms supported · cross-tenant aggregated stats from
          platform_connections + campaigns
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <KPI label="Connections" value={loading ? "—" : String(totalConnections)} sub="Active OAuth tokens" />
        <KPI label="Total spend" value={loading ? "—" : fmtUsd(totalSpend)} sub="All campaigns lifetime" highlight />
        <KPI label="Total revenue" value={loading ? "—" : fmtUsd(totalRevenue)} sub="Attributed" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-bold text-ink">Per-platform breakdown</h2>
          <p className="mt-0.5 text-xs text-muted">
            Click a platform on the tenant dashboard → Connect → OAuth flow ships with the
            real ad-platform integration phase.
          </p>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-bold">Platform</th>
              <th className="px-5 py-3 text-right font-bold">Connections</th>
              <th className="px-5 py-3 text-right font-bold">Campaigns</th>
              <th className="px-5 py-3 text-right font-bold">Spend</th>
              <th className="px-5 py-3 text-right font-bold">Revenue</th>
              <th className="px-5 py-3 text-right font-bold">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((p) => {
              const s = stats[p.id] ?? {
                platform: p.id,
                connections: 0,
                campaigns: 0,
                spend: 0,
                revenue: 0,
                roas: 0,
              };
              const winner = s.roas >= 3.5;
              return (
                <tr
                  key={p.id}
                  className="border-b border-border/60 last:border-0 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <PlatformIcon platform={p.id} className="h-8 w-8" />
                      <span className="font-medium text-ink">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-body">
                    {s.connections}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-body">
                    {s.campaigns}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-body">
                    {fmtUsd(s.spend)}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-body">
                    {fmtUsd(s.revenue)}
                  </td>
                  <td
                    className={`px-5 py-3.5 text-right font-bold tabular-nums ${winner ? "text-orange" : "text-muted-strong"}`}
                  >
                    {s.roas > 0 ? `${s.roas.toFixed(2)}×` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
  sub: string;
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
      <div className="mt-1 text-xs text-muted">{sub}</div>
    </div>
  );
}
