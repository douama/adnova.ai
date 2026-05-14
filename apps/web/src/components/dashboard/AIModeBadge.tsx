// ─── AI Mode badge + dropdown ──────────────────────────────────────────────
// Affiche le mode IA actuel du tenant et permet de switcher entre :
//   • advisory   : Claude recommande, user valide chaque action
//   • guardrails : Claude exécute dans les bornes que tu fixes
//   • autonomous : Claude tourne en boucle (toutes les 30 min via pg_cron)
//
// Seuls owner/admin peuvent changer (vérifié côté RLS, mais on cache le bouton
// pour les viewers/editors via useIsCurrentTenantAdmin).
import { useState } from "react";
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
  advisory: "Vous validez chaque action",
  guardrails: "Bornes que vous fixez · IA exécute dedans",
  autonomous: "IA tourne 24/7 · décide seule · audit posteriori",
};

const MODE_COLOR: Record<AIMode, string> = {
  advisory: "bg-slate-100 text-slate-700 border-slate-200",
  guardrails: "bg-amber-50 text-amber-800 border-amber-200",
  autonomous: "bg-orange-50 text-orange-800 border-orange-300",
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

  async function switchMode(next: AIMode) {
    if (!tenantId || next === mode) {
      setOpen(false);
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      await updateTenantAiMode(tenantId, next);
      await loadTenants(); // refresh from server pour synchroniser le store
      setOpen(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Échec");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => isAdmin && setOpen((o) => !o)}
        disabled={!isAdmin || saving}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
          MODE_COLOR[mode]
        } ${isAdmin ? "hover:opacity-80 cursor-pointer" : "cursor-default opacity-90"}`}
        title={isAdmin ? "Changer le mode IA" : "Seuls owner/admin peuvent changer"}
      >
        {mode === "autonomous" ? (
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
        ) : null}
        Mode : {MODE_LABELS[mode]}
        {isAdmin ? <span className="text-[10px] opacity-60">▾</span> : null}
      </button>

      {open && isAdmin ? (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-md border border-slate-200 bg-white p-1 shadow-lg">
          {(Object.keys(MODE_LABELS) as AIMode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              disabled={saving}
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                m === mode ? "bg-slate-50" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">{MODE_LABELS[m]}</span>
                {m === mode ? <span className="text-xs text-emerald-600">✓ actuel</span> : null}
              </div>
              <div className="mt-0.5 text-xs text-slate-500">{MODE_SUBLABELS[m]}</div>
            </button>
          ))}
          {err ? (
            <div className="mt-1 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{err}</div>
          ) : null}
          <div className="mt-1 border-t border-slate-100 px-3 py-2 text-[11px] text-slate-500">
            <strong>Autonomous</strong> : l'IA appelle Claude toutes les 30 min sur tes
            campagnes actives. Coût Anthropic estimé : ~$0.50/jour par tenant.
          </div>
        </div>
      ) : null}
    </div>
  );
}
