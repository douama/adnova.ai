import { useEffect, useMemo, useState } from "react";
import { Users, DollarSign, MousePointerClick, CheckCircle2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../lib/database.types";

type Affiliate = Database["public"]["Tables"]["affiliates"]["Row"];
type Referral = Database["public"]["Tables"]["referrals"]["Row"];
type Commission = Database["public"]["Tables"]["commission_earnings"]["Row"];
type Payout = Database["public"]["Tables"]["payouts"]["Row"];

type AffiliateRow = Affiliate & {
  clicks: number;
  signups: number;
  conversions: number;
  earnedUsd: number;
  paidUsd: number;
  pendingUsd: number;
};

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

const TIER_ACCENT: Record<string, string> = {
  bronze: "border-amber-700/40 bg-amber-700/[0.08] text-amber-400",
  silver: "border-slate-400/40 bg-slate-400/[0.08] text-slate-300",
  gold: "border-yellow-500/40 bg-yellow-500/[0.10] text-yellow-300",
  diamond: "border-cyan-400/40 bg-cyan-400/[0.10] text-cyan-300",
};

export function AdminAffiliates() {
  const [affiliates, setAffiliates] = useState<AffiliateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<"all" | "bronze" | "silver" | "gold" | "diamond">(
    "all",
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [affRes, refRes, comRes, payRes] = await Promise.all([
          supabase
            .from("affiliates")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("referrals")
            .select("affiliate_id, signed_up_at, converted_at"),
          supabase
            .from("commission_earnings")
            .select("affiliate_id, amount_usd, payout_id"),
          supabase
            .from("payouts")
            .select("affiliate_id, amount_usd, status"),
        ]);
        if (cancelled) return;
        if (affRes.error) {
          setError(affRes.error.message);
          return;
        }

        const refsByAff = new Map<string, Referral[]>();
        for (const r of (refRes.data ?? []) as Referral[]) {
          const arr = refsByAff.get(r.affiliate_id) ?? [];
          arr.push(r);
          refsByAff.set(r.affiliate_id, arr);
        }

        const comsByAff = new Map<string, Commission[]>();
        for (const c of (comRes.data ?? []) as Commission[]) {
          const arr = comsByAff.get(c.affiliate_id) ?? [];
          arr.push(c);
          comsByAff.set(c.affiliate_id, arr);
        }

        const paysByAff = new Map<string, Payout[]>();
        for (const p of (payRes.data ?? []) as Payout[]) {
          const arr = paysByAff.get(p.affiliate_id) ?? [];
          arr.push(p);
          paysByAff.set(p.affiliate_id, arr);
        }

        const rows: AffiliateRow[] = ((affRes.data ?? []) as Affiliate[]).map((a) => {
          const refs = refsByAff.get(a.id) ?? [];
          const coms = comsByAff.get(a.id) ?? [];
          const pays = paysByAff.get(a.id) ?? [];
          const earnedUsd = coms.reduce((s, c) => s + Number(c.amount_usd ?? 0), 0);
          const paidUsd = pays
            .filter((p) => p.status === "paid")
            .reduce((s, p) => s + Number(p.amount_usd ?? 0), 0);
          return {
            ...a,
            clicks: refs.length,
            signups: refs.filter((r) => r.signed_up_at).length,
            conversions: refs.filter((r) => r.converted_at).length,
            earnedUsd,
            paidUsd,
            pendingUsd: Math.max(0, earnedUsd - paidUsd),
          };
        });
        setAffiliates(rows);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (tierFilter === "all") return affiliates;
    return affiliates.filter((a) => a.tier === tierFilter);
  }, [affiliates, tierFilter]);

  const stats = useMemo(() => {
    const active = affiliates.filter((a) => a.is_active).length;
    const totalClicks = affiliates.reduce((s, a) => s + a.clicks, 0);
    const totalConv = affiliates.reduce((s, a) => s + a.conversions, 0);
    const totalEarned = affiliates.reduce((s, a) => s + a.earnedUsd, 0);
    const totalPaid = affiliates.reduce((s, a) => s + a.paidUsd, 0);
    return { active, totalClicks, totalConv, totalEarned, totalPaid };
  }, [affiliates]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Affiliates</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Partner program · 4-tier commissions (Bronze 20% → Diamond 40% lifetime)
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPI
          label="Active affiliates"
          value={loading ? "—" : String(stats.active)}
          sub={`${affiliates.length} total`}
          icon={Users}
        />
        <KPI
          label="Referral clicks"
          value={loading ? "—" : String(stats.totalClicks)}
          sub={`${stats.totalConv} converted`}
          icon={MousePointerClick}
        />
        <KPI
          label="Commissions earned"
          value={loading ? "—" : fmtUsd(stats.totalEarned)}
          sub="Lifetime, all tiers"
          icon={DollarSign}
          highlight
        />
        <KPI
          label="Payouts settled"
          value={loading ? "—" : fmtUsd(stats.totalPaid)}
          sub={`${fmtUsd(Math.max(0, stats.totalEarned - stats.totalPaid))} pending`}
          icon={CheckCircle2}
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(["all", "diamond", "gold", "silver", "bronze"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTierFilter(t)}
            className={`rounded-lg border px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              tierFilter === t
                ? "border-orange/40 bg-orange/[0.08] text-orange"
                : "border-border bg-white/[0.03] text-muted-strong hover:border-border-strong"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center text-sm text-muted">
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center text-sm text-muted">
          No affiliates yet · drive signups via{" "}
          <a href="/partners" className="text-orange hover:text-orange-hover">
            /partners
          </a>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-bold">Affiliate</th>
                <th className="px-5 py-3 font-bold">Code</th>
                <th className="px-5 py-3 font-bold">Tier</th>
                <th className="px-5 py-3 text-right font-bold">Clicks</th>
                <th className="px-5 py-3 text-right font-bold">Signups</th>
                <th className="px-5 py-3 text-right font-bold">Conv.</th>
                <th className="px-5 py-3 text-right font-bold">Earned</th>
                <th className="px-5 py-3 text-right font-bold">Pending</th>
                <th className="px-5 py-3 text-center font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const tierClass =
                  TIER_ACCENT[a.tier] ??
                  "border-muted/40 bg-muted/[0.08] text-muted-strong";
                const convRate = a.signups > 0 ? (a.conversions / a.signups) * 100 : 0;
                return (
                  <tr
                    key={a.id}
                    className="border-b border-border/60 last:border-0 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-ink">{a.display_name}</div>
                      <div className="mt-0.5 truncate text-[11px] text-muted">{a.email}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <code className="rounded-md border border-border bg-bg px-1.5 py-0.5 text-[11px] text-orange">
                        {a.code}
                      </code>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tierClass}`}
                      >
                        {a.tier}
                      </span>
                      <div className="mt-1 text-[10px] text-muted">
                        {Number(a.commission_pct)}% commission
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums text-body">
                      {a.clicks}
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums text-body">
                      {a.signups}
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums">
                      <span className="text-body">{a.conversions}</span>
                      {a.signups > 0 ? (
                        <span className="ml-1 text-[10px] text-muted">
                          ({convRate.toFixed(0)}%)
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums font-bold text-ink">
                      {fmtUsd(a.earnedUsd)}
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums text-orange">
                      {a.pendingUsd > 0 ? fmtUsd(a.pendingUsd) : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {a.is_active ? (
                        <span className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md border border-muted/30 bg-muted/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                          Paused
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-muted">
        Tier upgrades are automatic based on{" "}
        <strong className="text-body">monthly converted referrals</strong> · Bronze (0+),
        Silver (5+), Gold (15+), Diamond (40+). Payouts processed monthly via Stripe Connect.
      </p>
    </div>
  );
}

function KPI({
  label,
  value,
  sub,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
          {label}
        </div>
        <Icon
          className={`h-4 w-4 ${highlight ? "text-orange" : "text-muted"}`}
          strokeWidth={1.75}
        />
      </div>
      <div
        className={`mt-4 text-2xl font-bold tracking-tighter tabular-nums ${highlight ? "text-orange" : "text-ink"}`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted">{sub}</div>
    </div>
  );
}
