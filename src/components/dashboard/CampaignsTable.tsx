import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useCampaigns } from "../../lib/queries";
import { seedDemoData } from "../../lib/demoSeed";
import { useCurrentTenantId } from "../../stores/tenantStore";

function fmtUsd(n: number | null | undefined) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n));
}

function platformLabel(p: string | null): string {
  if (!p) return "—";
  return p.charAt(0).toUpperCase() + p.slice(1);
}

const STATUS_STYLES: Record<string, string> = {
  live: "bg-orange/10 text-orange",
  scaling: "bg-orange/10 text-orange",
  paused: "bg-muted/10 text-muted-strong",
  killed: "bg-muted/5 text-muted",
  draft: "bg-white/[0.03] text-muted-strong",
  archived: "bg-white/[0.03] text-muted",
};

function StatusBadge({ status }: { status: string | null }) {
  const s = status ?? "draft";
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
        STATUS_STYLES[s] ?? STATUS_STYLES.draft
      }`}
    >
      {s}
    </span>
  );
}

export function CampaignsTable() {
  const tenantId = useCurrentTenantId();
  const { data, loading, error, refresh } = useCampaigns({ limit: 20 });
  const [seeding, setSeeding] = useState(false);

  async function handleSeed() {
    if (!tenantId) return;
    setSeeding(true);
    try {
      await seedDemoData(tenantId);
      await refresh();
    } catch (e) {
      console.error("CampaignsTable seed:", e);
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-ink">Campaigns</h2>
          <p className="mt-0.5 text-xs text-muted">
            Live data from your connected ad accounts
          </p>
        </div>
        {data && data.length > 0 ? (
          <button
            onClick={refresh}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-border-strong hover:text-ink"
          >
            <RefreshCw className="h-3 w-3" strokeWidth={2} />
            Refresh
          </button>
        ) : null}
      </div>

      {loading ? (
        <div className="px-5 py-12 text-center text-sm text-muted">Loading…</div>
      ) : error ? (
        <div className="m-5 rounded-lg border border-muted/20 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {error}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="space-y-4 px-5 py-12 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-bg text-2xl text-muted">
            ∅
          </div>
          <div>
            <p className="text-sm font-bold text-ink">No campaigns yet</p>
            <p className="mt-1 text-xs text-muted">
              Connect a platform or load demo data to explore the dashboard.
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm hover:-translate-y-0.5 disabled:opacity-55"
            >
              {seeding ? "Loading demo data…" : "Load demo data"}
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-bold">Name</th>
                <th className="px-5 py-3 font-bold">Platform</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 text-right font-bold">Spend</th>
                <th className="px-5 py-3 text-right font-bold">Revenue</th>
                <th className="px-5 py-3 text-right font-bold">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => {
                const spend = Number(c.spend_total ?? 0);
                const revenue = Number(c.revenue_total ?? 0);
                const roas = spend > 0 ? revenue / spend : 0;
                const winner = roas >= 3.5;
                return (
                  <tr
                    key={c.id}
                    className="border-b border-border/60 last:border-0 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 font-medium text-ink">{c.name}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center rounded border border-border bg-white/[0.03] px-2 py-0.5 text-xs text-body">
                        {platformLabel(c.platform)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums text-body">
                      {fmtUsd(spend)}
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums text-body">
                      {fmtUsd(revenue)}
                    </td>
                    <td
                      className={`px-5 py-3.5 text-right font-bold tabular-nums ${
                        winner ? "text-orange" : "text-muted-strong"
                      }`}
                    >
                      {roas > 0 ? `${roas.toFixed(2)}×` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
