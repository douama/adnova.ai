import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useCampaigns } from "../../lib/queries";
import { seedDemoData } from "../../lib/demoSeed";
import { useCurrentTenantId } from "../../stores/tenantStore";
import { useState } from "react";

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

function statusBadge(status: string | null) {
  const s = status ?? "draft";
  const styles: Record<string, string> = {
    live: "bg-emerald-100 text-emerald-700",
    scaling: "bg-emerald-100 text-emerald-700",
    paused: "bg-amber-100 text-amber-700",
    killed: "bg-slate-200 text-slate-600",
    draft: "bg-slate-100 text-slate-700",
    archived: "bg-slate-100 text-slate-500",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        styles[s] ?? "bg-slate-100 text-slate-700"
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
      console.error(e);
      alert("Erreur lors du seed. Voir console.");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Campagnes</CardTitle>
          <CardDescription>Vue d'ensemble · données live depuis Supabase</CardDescription>
        </div>
        {data && data.length > 0 ? (
          <Button onClick={refresh} className="text-xs">
            Rafraîchir
          </Button>
        ) : null}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center text-sm text-slate-500">Chargement…</div>
        ) : error ? (
          <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">Erreur : {error}</div>
        ) : !data || data.length === 0 ? (
          <div className="space-y-3 py-8 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              ∅
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Aucune campagne pour l'instant</p>
              <p className="mt-1 text-xs text-slate-500">
                Connecte une plateforme pub ou charge des données de démo pour explorer l'app.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <Button onClick={handleSeed} disabled={seeding}>
                {seeding ? "Génération…" : "Charger des données de démo"}
              </Button>
              <a
                href="/accounts"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Connecter une plateforme
              </a>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Nom</th>
                  <th className="px-4 py-3 font-medium">Plateforme</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                  <th className="px-4 py-3 font-medium text-right">Spend</th>
                  <th className="px-4 py-3 font-medium text-right">Revenue</th>
                  <th className="px-4 py-3 font-medium text-right">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => {
                  const spend = Number(c.spend_total ?? 0);
                  const revenue = Number(c.revenue_total ?? 0);
                  const roas = spend > 0 ? revenue / spend : 0;
                  return (
                    <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                          {platformLabel(c.platform)}
                        </span>
                      </td>
                      <td className="px-4 py-3">{statusBadge(c.status)}</td>
                      <td className="px-4 py-3 text-right text-slate-600 tabular-nums">{fmtUsd(spend)}</td>
                      <td className="px-4 py-3 text-right text-slate-600 tabular-nums">{fmtUsd(revenue)}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-900 tabular-nums">
                        {roas > 0 ? `${roas.toFixed(2)}×` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
