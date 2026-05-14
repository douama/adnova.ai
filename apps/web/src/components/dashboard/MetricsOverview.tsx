import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
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
      title: "Total Spend",
      value: data ? fmtUsd(data.totalSpend) : "—",
      icon: DollarSign,
      sub: loading ? "Chargement…" : error ? "Erreur" : "Cumul vie du compte",
    },
    {
      title: "ROAS moyen",
      value: data ? `${data.avgRoas.toFixed(2)}×` : "—",
      icon: TrendingUp,
      sub: data && data.avgRoas >= 3.5 ? "Au-dessus du seuil" : "Sous le seuil 3.5×",
    },
    {
      title: "Conversions",
      value: data ? fmtNum(data.totalConversions) : "—",
      icon: Activity,
      sub: "Toutes campagnes",
    },
    {
      title: "Campagnes actives",
      value: data ? String(data.activeCampaigns) : "—",
      icon: Megaphone,
      sub: data ? "Live + Scaling" : "—",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="mt-1 text-xs text-slate-500">{metric.sub}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
