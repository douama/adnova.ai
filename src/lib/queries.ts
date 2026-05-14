// ─── Tenant-scoped data hooks ───────────────────────────────────────────────
// Pattern : chaque hook prend implicitement le currentTenantId du tenantStore.
// RLS côté Postgres garantit déjà l'isolation, mais on filtre explicitement
// pour des raisons de perf (utilise l'index tenant_id) et de clarté.
//
// Convention de retour : { data, loading, error, refresh }
//   • data    — null tant que pas chargé, [] si vide
//   • loading — true pendant le 1er fetch
//   • error   — message ou null
//   • refresh — async () => void, déclenche un nouveau fetch
import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useCurrentTenantId } from "../stores/tenantStore";
import type { Database } from "./database.types";

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
type Creative = Database["public"]["Tables"]["creatives"]["Row"];
type AIDecisionFeed = Database["public"]["Views"]["ai_decisions_feed"]["Row"];
export type AIRunLog = Database["public"]["Tables"]["ai_run_log"]["Row"];

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

// ─── KPIs agrégés (Total Spend / Revenue / ROAS / Active Campaigns) ────────
export type TenantKpis = {
  totalSpend: number;
  totalRevenue: number;
  totalConversions: number;
  activeCampaigns: number;
  avgRoas: number;
};

export function useTenantKpis(): AsyncState<TenantKpis> {
  const tenantId = useCurrentTenantId();
  const [data, setData] = useState<TenantKpis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    setError(null);
    // On agrège côté SQL en passant par .select() avec un alias.
    // Pour Phase 3 on fait simple : 1 round-trip qui ramène tout campaign-level
    // et on agrège côté client. Si la table grossit, on migrera vers une view
    // matérialisée (refresh toutes les 5 min via pg_cron).
    const { data: rows, error: err } = await supabase
      .from("campaigns")
      .select("spend_total, revenue_total, conversions_total, status")
      .eq("tenant_id", tenantId);

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    const totals = (rows ?? []).reduce(
      (acc, r) => {
        acc.spend += Number(r.spend_total ?? 0);
        acc.revenue += Number(r.revenue_total ?? 0);
        acc.conv += Number(r.conversions_total ?? 0);
        if (r.status && ["live", "scaling"].includes(r.status)) acc.active += 1;
        return acc;
      },
      { spend: 0, revenue: 0, conv: 0, active: 0 }
    );

    setData({
      totalSpend: totals.spend,
      totalRevenue: totals.revenue,
      totalConversions: totals.conv,
      activeCampaigns: totals.active,
      avgRoas: totals.spend > 0 ? totals.revenue / totals.spend : 0,
    });
    setLoading(false);
  }, [tenantId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}

// ─── Campaigns list ────────────────────────────────────────────────────────
export function useCampaigns(opts?: { limit?: number; onlyActive?: boolean }): AsyncState<Campaign[]> {
  const tenantId = useCurrentTenantId();
  const [data, setData] = useState<Campaign[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = opts?.limit ?? 50;
  const onlyActive = opts?.onlyActive ?? false;

  const fetch = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    setError(null);
    let q = supabase
      .from("campaigns")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("updated_at", { ascending: false })
      .limit(limit);
    if (onlyActive) q = q.in("status", ["live", "scaling"]);

    const { data: rows, error: err } = await q;
    if (err) setError(err.message);
    else setData(rows as Campaign[]);
    setLoading(false);
  }, [tenantId, limit, onlyActive]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}

// ─── Creatives list ────────────────────────────────────────────────────────
export function useCreatives(opts?: { limit?: number }): AsyncState<Creative[]> {
  const tenantId = useCurrentTenantId();
  const [data, setData] = useState<Creative[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = opts?.limit ?? 50;

  const fetch = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    setError(null);
    const { data: rows, error: err } = await supabase
      .from("creatives")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (err) setError(err.message);
    else setData(rows as Creative[]);
    setLoading(false);
  }, [tenantId, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}

// ─── Decisions feed (with Realtime subscription) ──────────────────────────
// Utilise la view ai_decisions_feed (joint campaign/creative pour éviter le
// N+1 côté UI). Subscribe au channel Realtime pour push instantané.
export function useDecisionsFeed(opts?: { limit?: number }): AsyncState<AIDecisionFeed[]> {
  const tenantId = useCurrentTenantId();
  const [data, setData] = useState<AIDecisionFeed[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = opts?.limit ?? 50;

  const fetch = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    setError(null);
    const { data: rows, error: err } = await supabase
      .from("ai_decisions_feed")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (err) setError(err.message);
    else setData(rows as AIDecisionFeed[]);
    setLoading(false);
  }, [tenantId, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime — subscribe aux INSERT sur ai_decisions pour ce tenant
  useEffect(() => {
    if (!tenantId) return;
    const channel = supabase
      .channel(`ai_decisions:${tenantId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ai_decisions",
          filter: `tenant_id=eq.${tenantId}`,
        },
        () => {
          // Sur INSERT on relit la view (qui joint campaign/creative).
          // Refresh complet — cheap car LIMIT 50.
          fetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tenantId, fetch]);

  return { data, loading, error, refresh: fetch };
}

// ─── AI Run Log (observabilité de la boucle Claude) ───────────────────────
// Stream live des invocations claude-decide (cron + user-triggered).
// REPLICA IDENTITY FULL sur ai_run_log → on capte aussi les UPDATE
// (passage pending → completed) pour rafraîchir les métriques en direct.
export function useAIRunLog(opts?: { limit?: number }): AsyncState<AIRunLog[]> {
  const tenantId = useCurrentTenantId();
  const [data, setData] = useState<AIRunLog[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = opts?.limit ?? 10;

  const fetch = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    setError(null);
    const { data: rows, error: err } = await supabase
      .from("ai_run_log")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("started_at", { ascending: false })
      .limit(limit);
    if (err) setError(err.message);
    else setData(rows as AIRunLog[]);
    setLoading(false);
  }, [tenantId, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (!tenantId) return;
    const channel = supabase
      .channel(`ai_run_log:${tenantId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT (loop fires) + UPDATE (pending → completed)
          schema: "public",
          table: "ai_run_log",
          filter: `tenant_id=eq.${tenantId}`,
        },
        () => fetch()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tenantId, fetch]);

  return { data, loading, error, refresh: fetch };
}
