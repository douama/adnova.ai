import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../lib/database.types";

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"] & {
  tenant_name?: string;
};

const STATUS_STYLES: Record<string, string> = {
  live: "border-orange/30 bg-orange/[0.08] text-orange",
  scaling: "border-orange/30 bg-orange/[0.08] text-orange",
  paused: "border-muted/30 bg-muted/[0.08] text-muted-strong",
  killed: "border-muted/30 bg-muted/[0.05] text-muted",
  draft: "border-border bg-white/[0.03] text-muted-strong",
  archived: "border-border bg-white/[0.03] text-muted",
};

function fmtUsd(n: number | null | undefined) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n));
}

export function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: rows, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(300);
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
      setCampaigns(
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

  const filtered = useMemo(() => {
    let arr = campaigns;
    if (statusFilter !== "all") arr = arr.filter((c) => c.status === statusFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.tenant_name?.toLowerCase().includes(q) ||
          c.platform?.toLowerCase().includes(q),
      );
    }
    return arr;
  }, [campaigns, query, statusFilter]);

  const stats = useMemo(() => {
    const totalSpend = campaigns.reduce((a, c) => a + Number(c.spend_total ?? 0), 0);
    const totalRevenue = campaigns.reduce((a, c) => a + Number(c.revenue_total ?? 0), 0);
    const live = campaigns.filter((c) => c.status === "live" || c.status === "scaling").length;
    return { totalSpend, totalRevenue, live };
  }, [campaigns]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-ink">Campaigns</h1>
          <p className="mt-1 text-sm text-muted-strong">
            {campaigns.length} campaigns across {new Set(campaigns.map((c) => c.tenant_id)).size}{" "}
            tenants
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <KPI label="Total spend" value={fmtUsd(stats.totalSpend)} />
        <KPI label="Total revenue" value={fmtUsd(stats.totalRevenue)} highlight />
        <KPI
          label="Live + scaling"
          value={String(stats.live)}
          sub={`${campaigns.length} total`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-64">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, tenant, platform…"
            className="field-input h-10 w-full pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["all", "live", "scaling", "paused", "killed", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg border px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                statusFilter === s
                  ? "border-orange/40 bg-orange/[0.08] text-orange"
                  : "border-border bg-white/[0.03] text-muted-strong hover:border-border-strong"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-muted">Loading…</div>
        ) : error ? (
          <div className="m-5 rounded-lg border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted">
            {query || statusFilter !== "all" ? "No match" : "No campaigns yet"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-bold">Name</th>
                  <th className="px-5 py-3 font-bold">Tenant</th>
                  <th className="px-5 py-3 font-bold">Platform</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 text-right font-bold">Spend</th>
                  <th className="px-5 py-3 text-right font-bold">Revenue</th>
                  <th className="px-5 py-3 text-right font-bold">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 200).map((c) => {
                  const spend = Number(c.spend_total ?? 0);
                  const revenue = Number(c.revenue_total ?? 0);
                  const roas = spend > 0 ? revenue / spend : 0;
                  const winner = roas >= 3.5;
                  return (
                    <tr
                      key={c.id}
                      className="border-b border-border/60 last:border-0 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3 font-medium text-ink">{c.name}</td>
                      <td className="px-5 py-3 text-xs text-body">{c.tenant_name}</td>
                      <td className="px-5 py-3 text-xs capitalize text-body">
                        {c.platform ?? "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            STATUS_STYLES[c.status] ?? STATUS_STYLES.draft
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-body">
                        {fmtUsd(spend)}
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-body">
                        {fmtUsd(revenue)}
                      </td>
                      <td
                        className={`px-5 py-3 text-right font-bold tabular-nums ${winner ? "text-orange" : "text-muted-strong"}`}
                      >
                        {roas > 0 ? `${roas.toFixed(2)}×` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length > 200 ? (
              <div className="border-t border-border bg-surface px-5 py-2 text-[10px] text-muted">
                Showing first 200 of {filtered.length} matching campaigns
              </div>
            ) : null}
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
