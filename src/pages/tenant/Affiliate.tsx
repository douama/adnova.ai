import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Handshake,
  Copy,
  MousePointerClick,
  CheckCircle2,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../stores/authStore";
import type { Database } from "../../lib/database.types";

type Affiliate = Database["public"]["Tables"]["affiliates"]["Row"];
type Referral = Database["public"]["Tables"]["referrals"]["Row"];
type Commission = Database["public"]["Tables"]["commission_earnings"]["Row"];
type Payout = Database["public"]["Tables"]["payouts"]["Row"];

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

const TIER_COPY: Record<string, { color: string; next?: string; nextAt?: number; label: string }> = {
  bronze: {
    color: "border-amber-700/40 bg-amber-700/[0.08] text-amber-400",
    next: "Silver (25%)",
    nextAt: 5,
    label: "Bronze · 20%",
  },
  silver: {
    color: "border-slate-400/40 bg-slate-400/[0.08] text-slate-300",
    next: "Gold (30%)",
    nextAt: 15,
    label: "Silver · 25%",
  },
  gold: {
    color: "border-yellow-500/40 bg-yellow-500/[0.10] text-yellow-300",
    next: "Diamond (40%)",
    nextAt: 40,
    label: "Gold · 30%",
  },
  diamond: {
    color: "border-cyan-400/40 bg-cyan-400/[0.10] text-cyan-300",
    label: "Diamond · 40%",
  },
};

export function AffiliateDashboardPage() {
  const { user } = useAuth();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      // RLS allows reading affiliates row when user_id = auth.uid().
      // Some rows may pre-date login (user_id null) — fall back to email match.
      const { data: byUser } = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      let aff: Affiliate | null = byUser ?? null;
      if (!aff) {
        const { data: byEmail } = await supabase
          .from("affiliates")
          .select("*")
          .ilike("email", user.email)
          .maybeSingle();
        aff = byEmail ?? null;
      }
      setAffiliate(aff);

      if (aff) {
        const [refs, coms, pays] = await Promise.all([
          supabase
            .from("referrals")
            .select("*")
            .eq("affiliate_id", aff.id)
            .order("clicked_at", { ascending: false }),
          supabase
            .from("commission_earnings")
            .select("*")
            .eq("affiliate_id", aff.id)
            .order("period_start", { ascending: false }),
          supabase
            .from("payouts")
            .select("*")
            .eq("affiliate_id", aff.id)
            .order("created_at", { ascending: false }),
        ]);
        setReferrals(refs.data ?? []);
        setCommissions(coms.data ?? []);
        setPayouts(pays.data ?? []);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [user?.email, user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const clicks = referrals.length;
    const signups = referrals.filter((r) => r.signed_up_at).length;
    const conversions = referrals.filter((r) => r.converted_at).length;
    const earned = commissions.reduce((s, c) => s + Number(c.amount_usd ?? 0), 0);
    const paid = payouts
      .filter((p) => p.status === "paid")
      .reduce((s, p) => s + Number(p.amount_usd ?? 0), 0);
    return { clicks, signups, conversions, earned, paid, pending: Math.max(0, earned - paid) };
  }, [referrals, commissions, payouts]);

  const referralUrl = affiliate
    ? `${window.location.origin}/?ref=${affiliate.code}`
    : "";

  async function copyLink() {
    if (!referralUrl) return;
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center text-sm text-muted">
        Loading…
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-ink">Partner program</h1>
          <p className="mt-1 text-sm text-muted-strong">
            Refer brands to AdNova and earn 20-40% lifetime commission.
          </p>
        </div>
        <div className="rounded-2xl border border-orange/30 bg-orange/[0.04] p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-orange/[0.12]">
            <Handshake className="h-7 w-7 text-orange" strokeWidth={1.75} />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tighter text-ink">
            You're not in the partner program yet.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-body">
            Apply once and you'll get a unique referral code. Every brand that signs up via
            your link pays 20% of their subscription back to you, lifetime.
          </p>
          <Link
            to="/affiliate/apply"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-glow"
          >
            Apply now <span aria-hidden>→</span>
          </Link>
          <p className="mt-4 text-[11px] text-muted">
            Already applied? Updates are sent by email. Approval takes &lt; 24h.
          </p>
        </div>
      </div>
    );
  }

  const tierMeta = TIER_COPY[affiliate.tier] ?? TIER_COPY.bronze!;
  const nextTierProgress = tierMeta.nextAt
    ? Math.min(100, (stats.conversions / tierMeta.nextAt) * 100)
    : 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Your partner dashboard</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Track clicks, conversions, and payouts in real time.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {error}
        </div>
      ) : null}

      {/* Status + referral link */}
      <div className="rounded-2xl border border-orange/30 bg-orange/[0.04] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tierMeta.color}`}
              >
                {tierMeta.label}
              </span>
              {!affiliate.is_active ? (
                <span className="inline-flex items-center rounded-md border border-muted/30 bg-muted/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                  Pending review
                </span>
              ) : (
                <span className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Active
                </span>
              )}
            </div>
            <h2 className="mt-3 text-lg font-bold text-ink">{affiliate.display_name}</h2>
            <p className="text-xs text-muted">{affiliate.email}</p>
          </div>

          <div className="w-full max-w-sm">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
              Your referral link
            </div>
            <div className="mt-1.5 flex gap-2">
              <input
                type="text"
                readOnly
                value={referralUrl}
                className="field-input flex-1 truncate font-mono text-xs"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={copyLink}
                disabled={!affiliate.is_active}
                className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-orange/40 bg-orange/[0.08] px-3 text-xs font-bold text-orange transition-colors hover:bg-orange/[0.14] disabled:opacity-50"
              >
                {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            {!affiliate.is_active ? (
              <p className="mt-1.5 text-[11px] text-muted">
                Link activates after admin approval.
              </p>
            ) : null}
          </div>
        </div>

        {tierMeta.next && tierMeta.nextAt ? (
          <div className="mt-5 border-t border-orange/20 pt-5">
            <div className="flex items-center justify-between text-xs text-muted-strong">
              <span>
                Progress to <strong className="text-ink">{tierMeta.next}</strong>
              </span>
              <span>
                {stats.conversions} / {tierMeta.nextAt} conversions
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
              <div
                className="h-full rounded-full bg-orange transition-all"
                style={{ width: `${nextTierProgress}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPI label="Clicks" value={String(stats.clicks)} icon={MousePointerClick} sub="All-time" />
        <KPI label="Conversions" value={String(stats.conversions)} icon={CheckCircle2} sub={`${stats.signups} signups`} />
        <KPI
          label="Commissions earned"
          value={fmtUsd(stats.earned)}
          icon={DollarSign}
          sub={`${commissions.length} entries`}
          highlight
        />
        <KPI
          label="Paid out"
          value={fmtUsd(stats.paid)}
          icon={CheckCircle2}
          sub={`${fmtUsd(stats.pending)} pending`}
        />
      </div>

      {/* Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Recent referrals"
          empty={referrals.length === 0}
          emptyHint={
            affiliate.is_active
              ? "Share your link to get your first click."
              : "Your link goes live after approval."
          }
        >
          {referrals.slice(0, 8).map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between gap-3 border-b border-border/60 py-3 last:border-0 text-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-body">
                  {r.utm_source ?? "direct"}
                  {r.referrer_url ? (
                    <span className="ml-1 text-[11px] text-muted">
                      from {new URL(r.referrer_url).hostname}
                    </span>
                  ) : null}
                </div>
                <div className="text-[11px] text-muted">
                  {new Date(r.clicked_at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="text-right text-xs">
                {r.converted_at ? (
                  <span className="font-bold text-orange">
                    Converted · {r.converted_to_plan ?? ""}
                  </span>
                ) : r.signed_up_at ? (
                  <span className="text-body">Signed up</span>
                ) : (
                  <span className="text-muted">Clicked</span>
                )}
              </div>
            </div>
          ))}
        </Panel>

        <Panel
          title="Payouts"
          empty={payouts.length === 0}
          emptyHint="No payouts yet · first payout on the 1st of the next month with commissions."
        >
          {payouts.slice(0, 8).map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-3 border-b border-border/60 py-3 last:border-0 text-sm"
            >
              <div>
                <div className="font-medium text-ink">{fmtUsd(Number(p.amount_usd))}</div>
                <div className="text-[11px] text-muted">
                  {new Date(p.period_start).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  {" – "}
                  {new Date(p.period_end).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    p.status === "paid"
                      ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400"
                      : p.status === "failed"
                      ? "border-muted/30 bg-muted/[0.08] text-muted-strong"
                      : "border-orange/30 bg-orange/[0.06] text-orange"
                  }`}
                >
                  {p.status}
                </span>
                <div className="mt-1 text-[11px] text-muted uppercase tracking-wider">
                  via {p.payout_method}
                </div>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <p className="text-[11px] text-muted">
        Payouts are processed on the 1st of each month for the prior month's confirmed
        conversions, minus churn / chargebacks. See the{" "}
        <Link to="/partners" className="text-orange hover:underline inline-flex items-center gap-0.5">
          program terms <ExternalLink className="h-3 w-3" />
        </Link>
        .
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
        <Icon className={`h-4 w-4 ${highlight ? "text-orange" : "text-muted"}`} strokeWidth={1.75} />
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

function Panel({
  title,
  empty,
  emptyHint,
  children,
}: {
  title: string;
  empty: boolean;
  emptyHint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      {empty ? (
        <p className="mt-4 text-xs text-muted">{emptyHint}</p>
      ) : (
        <div className="mt-2">{children}</div>
      )}
    </div>
  );
}
