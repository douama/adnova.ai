import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useCurrentTenant, useCurrentTenantId } from "../../stores/tenantStore";
import { MetricsOverview } from "../../components/dashboard/MetricsOverview";
import { CampaignsTable } from "../../components/dashboard/CampaignsTable";
import { AIActivityPanel } from "../../components/dashboard/AIActivityPanel";
import { AIModeBadge } from "../../components/dashboard/AIModeBadge";
import { supabase } from "../../lib/supabase";

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
        { body: { tenant_id: tenantId } },
      );
      if (error) {
        setFeedback({ kind: "err", text: error.message });
        return;
      }
      if (!data) {
        setFeedback({ kind: "err", text: "No response from the function." });
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
          text: data.message ?? "AI returned no decisions — campaigns look optimal.",
        });
        return;
      }
      setFeedback({
        kind: "ok",
        text: `${count} decision${count > 1 ? "s" : ""} generated · check the Decisions tab.`,
      });
    } catch (e) {
      setFeedback({ kind: "err", text: e instanceof Error ? e.message : "Unknown error" });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-strong">
            {tenant
              ? `${tenant.name} · ${tenant.plan ?? "trial"} plan`
              : "Loading workspace…"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AIModeBadge />
          <button
            onClick={askAI}
            disabled={running || !tenantId}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm hover:-translate-y-0.5 disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            {running ? "Analyzing…" : "Ask AI"}
          </button>
        </div>
      </div>

      {feedback ? (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            feedback.kind === "ok"
              ? "border-orange/30 bg-orange/[0.08] text-orange"
              : feedback.kind === "warn"
                ? "border-muted/30 bg-muted/[0.08] text-muted-strong"
                : "border-muted/30 bg-muted/[0.12] text-body"
          }`}
        >
          {feedback.text}
        </div>
      ) : null}

      <MetricsOverview />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CampaignsTable />
        </div>
        <div className="lg:col-span-1">
          <AIActivityPanel />
        </div>
      </div>
    </div>
  );
}
