import { useState } from "react";
import { useCurrentTenant, useCurrentTenantId } from "../stores/tenantStore";
import { MetricsOverview } from "../components/dashboard/MetricsOverview";
import { CampaignsTable } from "../components/dashboard/CampaignsTable";
import { AIModeBadge } from "../components/dashboard/AIModeBadge";
import { Button } from "../components/ui/button";
import { supabase } from "../lib/supabase";

type DecideResponse = {
  decisions?: Array<{ id: string; type: string; reason: string }>;
  proposed_count?: number;
  valid_count?: number;
  model?: string;
  error?: string;
  message?: string;
  detail?: string;
};

export function DashboardPage() {
  const tenant = useCurrentTenant();
  const tenantId = useCurrentTenantId();
  const [running, setRunning] = useState(false);
  const [feedback, setFeedback] = useState<
    { kind: "ok" | "warn" | "err"; text: string } | null
  >(null);

  async function askAI() {
    if (!tenantId) return;
    setRunning(true);
    setFeedback(null);
    try {
      const { data, error } = await supabase.functions.invoke<DecideResponse>(
        "claude-decide",
        { body: { tenant_id: tenantId } }
      );

      if (error) {
        setFeedback({ kind: "err", text: error.message });
        return;
      }
      if (!data) {
        setFeedback({ kind: "err", text: "Pas de réponse de la fonction." });
        return;
      }
      if (data.error) {
        setFeedback({
          kind: "err",
          text: data.error + (data.detail ? ` · ${data.detail.slice(0, 120)}` : ""),
        });
        return;
      }
      const count = data.decisions?.length ?? 0;
      if (count === 0) {
        setFeedback({
          kind: "warn",
          text: data.message ?? "Claude n'a proposé aucune décision sur les campagnes actuelles.",
        });
        return;
      }
      setFeedback({
        kind: "ok",
        text: `${count} décision${count > 1 ? "s" : ""} générée${count > 1 ? "s" : ""} par ${
          data.model ?? "Claude"
        } · va sur /decisions pour voir le détail.`,
      });
    } catch (e) {
      setFeedback({ kind: "err", text: e instanceof Error ? e.message : "Erreur inconnue" });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            {tenant ? `Workspace : ${tenant.name} · plan ${tenant.plan}` : "Chargement du workspace…"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AIModeBadge />
          <Button onClick={askAI} disabled={running || !tenantId}>
            {running ? "Claude analyse…" : "Demander à l'IA"}
          </Button>
        </div>
      </div>

      {feedback ? (
        <div
          className={`rounded-md px-3 py-2 text-sm ${
            feedback.kind === "ok"
              ? "bg-emerald-50 text-emerald-800"
              : feedback.kind === "warn"
              ? "bg-amber-50 text-amber-800"
              : "bg-red-50 text-red-700"
          }`}
        >
          {feedback.text}
        </div>
      ) : null}

      <MetricsOverview />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-3">
          <CampaignsTable />
        </div>
      </div>
    </div>
  );
}
