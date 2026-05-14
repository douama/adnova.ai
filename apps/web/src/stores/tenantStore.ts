// ─── Tenant store (workspace selector) ──────────────────────────────────────
// Liste les tenants dont l'user est membre (via RPC my_tenants()) +
// expose le tenant "courant" persisté dans localStorage.
//
// Pattern : Slack-style — un user peut appartenir à N workspaces, switch
// rapide depuis le sidebar. Le tenant courant est utilisé pour toutes les
// requêtes data (RLS s'occupe de l'isolation côté Postgres).
import { create } from "zustand";
import { supabase, type MyTenant } from "../lib/supabase";

const CURRENT_TENANT_KEY = "adnova.currentTenantId";

type TenantState = {
  tenants: MyTenant[];
  currentTenantId: string | null;
  loading: boolean;
  loaded: boolean;        // false avant le 1er fetch — utile pour gating
  error: string | null;

  load: () => Promise<void>;
  setCurrent: (tenantId: string) => void;
  clear: () => void;
};

function loadCurrentTenantId(): string | null {
  try {
    return localStorage.getItem(CURRENT_TENANT_KEY);
  } catch {
    return null;
  }
}

function saveCurrentTenantId(id: string | null) {
  try {
    if (id) localStorage.setItem(CURRENT_TENANT_KEY, id);
    else localStorage.removeItem(CURRENT_TENANT_KEY);
  } catch {
    /* ignore — private mode */
  }
}

export const useTenants = create<TenantState>((set, get) => ({
  tenants: [],
  currentTenantId: loadCurrentTenantId(),
  loading: false,
  loaded: false,
  error: null,

  /**
   * Charge la liste des tenants de l'user courant via la RPC sécurisée.
   * À appeler après chaque login + au démarrage si session présente.
   * Si le currentTenantId stocké n'est plus dans la liste (user retiré du
   * workspace par un admin), bascule vers le premier de la liste.
   */
  load: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.rpc("my_tenants");
    if (error) {
      set({ loading: false, error: error.message, loaded: true });
      return;
    }

    const tenants = (data ?? []) as MyTenant[];
    const stored = get().currentTenantId;
    const validStored = stored && tenants.some((t) => t.tenant_id === stored);
    const next = validStored ? stored : tenants[0]?.tenant_id ?? null;

    if (next !== stored) saveCurrentTenantId(next);

    set({
      tenants,
      currentTenantId: next,
      loading: false,
      loaded: true,
    });
  },

  setCurrent: (tenantId) => {
    // Vérifier que le user est bien membre — défense en profondeur
    const valid = get().tenants.some((t) => t.tenant_id === tenantId);
    if (!valid) {
      console.warn("setCurrent: tenant non trouvé dans la liste user", tenantId);
      return;
    }
    saveCurrentTenantId(tenantId);
    set({ currentTenantId: tenantId });
  },

  clear: () => {
    saveCurrentTenantId(null);
    set({ tenants: [], currentTenantId: null, loaded: false });
  },
}));

// Hooks pratiques
export const useCurrentTenant = (): MyTenant | null => {
  return useTenants((s) => {
    if (!s.currentTenantId) return null;
    return s.tenants.find((t) => t.tenant_id === s.currentTenantId) ?? null;
  });
};

export const useCurrentTenantId = (): string | null =>
  useTenants((s) => s.currentTenantId);

export const useCurrentTenantRole = () => {
  const t = useCurrentTenant();
  return t?.role ?? null;
};

// Helper pour les routes admin-only côté UI
export const useIsCurrentTenantAdmin = () => {
  const role = useCurrentTenantRole();
  return role === "owner" || role === "admin";
};
