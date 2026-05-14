// Dropdown to switch tenant AI mode : advisory / guardrails / autonomous.
// Only owner/admin can change (RLS guards this server-side too).
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  useCurrentTenant,
  useCurrentTenantId,
  useIsCurrentTenantAdmin,
  useTenants,
} from "../../stores/tenantStore";
import { updateTenantAiMode } from "../../lib/tenantApi";
import type { AIMode } from "../../lib/supabase";

const MODE_LABELS: Record<AIMode, string> = {
  advisory: "Advisory",
  guardrails: "Guardrails",
  autonomous: "Autonomous",
};

const MODE_SUBLABELS: Record<AIMode, string> = {
  advisory: "You approve every action",
  guardrails: "AI runs within bounds you set",
  autonomous: "AI runs 24/7 · audit-after",
};

export function AIModeBadge() {
  const tenant = useCurrentTenant();
  const tenantId = useCurrentTenantId();
  const isAdmin = useIsCurrentTenantAdmin();
  const loadTenants = useTenants((s) => s.load);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!tenant) return null;
  const mode = tenant.ai_mode as AIMode;
  const isAutonomous = mode === "autonomous";

  async function switchMode(next: AIMode) {
    if (!tenantId || next === mode) {
      setOpen(false);
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      await updateTenantAiMode(tenantId, next);
      await loadTenants();
      setOpen(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => isAdmin && setOpen((o) => !o)}
        disabled={!isAdmin || saving}
        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
          isAutonomous
            ? "border-orange/40 bg-orange/[0.08] text-orange"
            : "border-border bg-card text-body"
        } ${isAdmin ? "hover:border-border-strong cursor-pointer" : "cursor-default opacity-80"}`}
        title={isAdmin ? "Change AI mode" : "Owner/admin only"}
      >
        {isAutonomous ? (
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
        ) : null}
        Mode: {MODE_LABELS[mode]}
        {isAdmin ? <ChevronDown className="h-3 w-3 opacity-60" /> : null}
      </button>

      {open && isAdmin ? (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 z-20 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-card shadow-card">
            {(Object.keys(MODE_LABELS) as AIMode[]).map((m) => {
              const active = m === mode;
              return (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  disabled={saving}
                  className={`w-full px-4 py-3 text-left transition-colors ${
                    active ? "bg-white/[0.04]" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-ink">{MODE_LABELS[m]}</span>
                    {active ? <Check className="h-3.5 w-3.5 text-orange" /> : null}
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{MODE_SUBLABELS[m]}</p>
                </button>
              );
            })}
            {err ? (
              <div className="border-t border-border bg-muted/[0.08] px-4 py-2 text-xs text-muted-strong">
                {err}
              </div>
            ) : null}
            <div className="border-t border-border bg-surface px-4 py-2 text-[10px] leading-relaxed text-muted">
              <strong className="text-orange">Autonomous</strong> calls Claude every 30 min on
              your active campaigns. Estimated cost ~$1/day per tenant.
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
