import { useEffect, useState } from "react";
import { useAuth } from "../stores/authStore";
import { api, ApiError } from "../lib/api";
import { MetricsOverview } from "../components/dashboard/MetricsOverview";
import { CampaignsTable } from "../components/dashboard/CampaignsTable";

type Me = { auth: { userId: string; orgId: string; role: string; email: string } };

export function DashboardPage() {
  const { session } = useAuth();
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    api<Me>("/api/me", { token: session.accessToken })
      .then((data) => {
        if (!cancelled) setMe(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.code : "fetch_failed");
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm mt-1 text-slate-500">Vue d'ensemble de vos campagnes (Phase 1)</p>
        </div>
      </div>
      
      {/* KPI Cards */}
      <MetricsOverview />
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <CampaignsTable />
        </div>
      </div>
    </div>
  );
}
