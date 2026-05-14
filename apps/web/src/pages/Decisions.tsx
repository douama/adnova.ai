// ─── /decisions ────────────────────────────────────────────────────────────
// Decision Log live — chaque action IA prise sur le tenant courant.
// Realtime subscription : push instantané quand l'Edge Function insère
// une nouvelle décision (cf. queries.ts useDecisionsFeed).
import { useDecisionsFeed } from "../lib/queries";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

const TYPE_LABEL: Record<string, string> = {
  scale: "Scale",
  kill: "Kill",
  create: "Génère",
  budget_realloc: "Réalloue",
  audience_expand: "Audience +",
  audience_narrow: "Audience −",
  bid_adjust: "Bid",
  pause: "Pause",
  resume: "Resume",
  guardrail_block: "Bloqué",
};

const TYPE_ACCENT: Record<string, string> = {
  scale: "text-emerald-700 bg-emerald-50 border-emerald-200",
  kill: "text-slate-700 bg-slate-100 border-slate-300",
  create: "text-orange-700 bg-orange-50 border-orange-200",
  budget_realloc: "text-slate-700 bg-slate-100 border-slate-200",
  audience_expand: "text-emerald-700 bg-emerald-50 border-emerald-200",
  audience_narrow: "text-slate-700 bg-slate-100 border-slate-200",
  bid_adjust: "text-slate-700 bg-slate-100 border-slate-200",
  pause: "text-amber-700 bg-amber-50 border-amber-200",
  resume: "text-emerald-700 bg-emerald-50 border-emerald-200",
  guardrail_block: "text-amber-700 bg-amber-50 border-amber-300",
};

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 60_000) return `il y a ${Math.max(1, Math.round(ms / 1000))} s`;
  if (ms < 3_600_000) return `il y a ${Math.round(ms / 60_000)} min`;
  if (ms < 86_400_000) return `il y a ${Math.round(ms / 3_600_000)} h`;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function fmtUsd(n: number | null) {
  if (n == null) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n));
}

export function DecisionsPage() {
  const { data, loading, error } = useDecisionsFeed({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Decision Log</h1>
          <p className="mt-1 text-sm text-slate-500">
            Chaque action IA · auditable · live · rollback 1-clic
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live · Realtime
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>50 dernières décisions sur ce workspace</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-sm text-slate-500">Chargement…</div>
          ) : error ? (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">Erreur : {error}</div>
          ) : !data || data.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              Aucune décision encore. Lance ton mode Autonomous depuis le dashboard.
            </div>
          ) : (
            <ul className="space-y-2">
              {data.map((d) => (
                <li
                  key={d.id ?? `${d.created_at}-${d.type}`}
                  className="flex items-start gap-3 rounded-md border border-slate-100 bg-white p-3 hover:bg-slate-50/50"
                >
                  <span
                    className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      TYPE_ACCENT[d.type ?? ""] ?? "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {TYPE_LABEL[d.type ?? ""] ?? d.type}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-900">{d.reason}</p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span>{d.created_at ? timeAgo(d.created_at) : "—"}</span>
                      {d.campaign_name ? <span>· {d.campaign_name}</span> : null}
                      {d.platform ? <span>· {d.platform}</span> : null}
                      {d.confidence != null ? (
                        <span>· confiance {Math.round(Number(d.confidence) * 100)}%</span>
                      ) : null}
                      {d.revenue_uplift_usd != null ? (
                        <span className="font-medium text-emerald-700">
                          · +{fmtUsd(Number(d.revenue_uplift_usd))} revenue
                        </span>
                      ) : null}
                      {d.budget_saved_usd != null ? (
                        <span className="font-medium text-slate-700">
                          · {fmtUsd(Number(d.budget_saved_usd))} économisés
                        </span>
                      ) : null}
                    </div>
                    {d.tags && d.tags.length > 0 ? (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {d.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
