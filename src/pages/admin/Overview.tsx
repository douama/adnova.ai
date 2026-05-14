import { useEffect, useState } from "react";
import { Building2, DollarSign, Sparkles, AlertCircle, Image as ImageIcon } from "lucide-react";
import { supabase } from "../../lib/supabase";

type Stats = {
  tenants: number;
  activeAutonomous: number;
  runs24h: number;
  cost24h: number;
  errors24h: number;
  aiCreatives24h: number;
  aiCreativesCost24h: number;
};

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const [tenants, autonomous, runs, errors, aiCreatives] = await Promise.all([
          supabase.from("tenants").select("id", { head: true, count: "exact" }),
          supabase
            .from("tenants")
            .select("id", { head: true, count: "exact" })
            .eq("ai_mode", "autonomous"),
          supabase
            .from("ai_run_log")
            .select("cost_usd_estimate", { count: "exact" })
            .gte("started_at", since),
          supabase
            .from("client_errors")
            .select("id", { head: true, count: "exact" })
            .gte("created_at", since),
          supabase
            .from("creatives")
            .select("generation_meta", { count: "exact" })
            .not("generation_engine", "is", null)
            .gte("created_at", since),
        ]);
        if (cancelled) return;
        const cost = (runs.data ?? []).reduce(
          (acc, r) => acc + Number(r.cost_usd_estimate ?? 0),
          0,
        );
        const creativeCost = (aiCreatives.data ?? []).reduce(
          (acc, c) => {
            const meta = c.generation_meta as { cost_usd?: number } | null;
            return acc + Number(meta?.cost_usd ?? 0);
          },
          0,
        );
        setStats({
          tenants: tenants.count ?? 0,
          activeAutonomous: autonomous.count ?? 0,
          runs24h: runs.count ?? 0,
          cost24h: cost,
          errors24h: errors.count ?? 0,
          aiCreatives24h: aiCreatives.count ?? 0,
          aiCreativesCost24h: creativeCost,
        });
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Admin Overview</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Cross-tenant operational snapshot · last 24h
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPI
          label="Total tenants"
          value={loading ? "—" : String(stats?.tenants ?? 0)}
          sub={`${stats?.activeAutonomous ?? 0} on autonomous`}
          icon={Building2}
        />
        <KPI
          label="Decision runs (24h)"
          value={loading ? "—" : String(stats?.runs24h ?? 0)}
          sub={`Cron + manual`}
          icon={Sparkles}
          highlight
        />
        <KPI
          label="AI creatives (24h)"
          value={loading ? "—" : String(stats?.aiCreatives24h ?? 0)}
          sub="OpenAI gpt-image-1"
          icon={ImageIcon}
        />
        <KPI
          label="Frontend errors (24h)"
          value={loading ? "—" : String(stats?.errors24h ?? 0)}
          sub="client_errors table"
          icon={AlertCircle}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-ink">AI cost breakdown (24h)</h2>
            <p className="mt-0.5 text-xs text-muted">
              By provider · billed to your Anthropic + OpenAI accounts
            </p>
          </div>
          <DollarSign className="h-4 w-4 text-orange" strokeWidth={1.75} />
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          <CostRow
            label="Claude Sonnet 4.5"
            sub="Decision engine (claude-decide)"
            cost={stats?.cost24h ?? 0}
            loading={loading}
          />
          <CostRow
            label="OpenAI gpt-image-1"
            sub="AI creative generation"
            cost={stats?.aiCreativesCost24h ?? 0}
            loading={loading}
          />
          <CostRow
            label="Total"
            sub={`${(stats?.runs24h ?? 0) + (stats?.aiCreatives24h ?? 0)} AI ops`}
            cost={(stats?.cost24h ?? 0) + (stats?.aiCreativesCost24h ?? 0)}
            loading={loading}
            highlight
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-bold text-ink">Admin actions</h2>
        <p className="mt-1 text-xs text-muted">
          Use the sidebar to drill into specific resources.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-body">
          <li>
            · <strong className="text-ink">Tenants</strong> — list, search, suspend, churn
          </li>
          <li>
            · <strong className="text-ink">Users</strong> — list users + grant super-admin
          </li>
          <li>
            · <strong className="text-ink">AI Monitor</strong> — live feed of all ai_run_log
            across tenants
          </li>
          <li>
            · <strong className="text-ink">Revenue</strong> — MRR / ARR from subscriptions
          </li>
          <li>
            · <strong className="text-ink">Errors</strong> — frontend exceptions captured via
            ErrorBoundary (Sentry-lite)
          </li>
        </ul>
      </div>
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
      <div className="mt-4 text-3xl font-bold tracking-tighter text-ink tabular-nums">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted">{sub}</div>
    </div>
  );
}

function CostRow({
  label,
  sub,
  cost,
  loading,
  highlight = false,
}: {
  label: string;
  sub: string;
  cost: number;
  loading: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`p-5 ${highlight ? "bg-orange/[0.04]" : "bg-card"}`}>
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
        {label}
      </div>
      <div
        className={`mt-3 text-2xl font-bold tracking-tighter tabular-nums ${highlight ? "text-orange" : "text-ink"}`}
      >
        {loading ? "—" : fmtUsd(cost)}
      </div>
      <div className="mt-0.5 text-xs text-muted">{sub}</div>
    </div>
  );
}
