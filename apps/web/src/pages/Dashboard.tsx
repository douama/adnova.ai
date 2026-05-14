import { useCurrentTenant } from "../stores/tenantStore";
import { MetricsOverview } from "../components/dashboard/MetricsOverview";
import { CampaignsTable } from "../components/dashboard/CampaignsTable";

export function DashboardPage() {
  const tenant = useCurrentTenant();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            {tenant ? `Workspace : ${tenant.name} · plan ${tenant.plan}` : "Chargement du workspace…"}
          </p>
        </div>
      </div>

      <MetricsOverview />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-3">
          <CampaignsTable />
        </div>
      </div>
    </div>
  );
}
