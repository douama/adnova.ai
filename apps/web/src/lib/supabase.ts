// ─── Supabase client (typed) ────────────────────────────────────────────────
// Singleton client typé sur Database (généré depuis le schéma Supabase).
// Session persistée dans localStorage sous "adnova.auth" + auto-refresh JWT.
//
// Usage :
//   const { data } = await supabase.from('campaigns').select('*')
//   const { data, error } = await supabase.auth.signInWithPassword({...})
//   await supabase.rpc('my_tenants')
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";
import type { Database } from "./database.types";

export const supabase: SupabaseClient<Database> = createClient<Database>(
  env.supabaseUrl,
  env.supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true, // pour magic links / OAuth callbacks
      storageKey: "adnova.auth",
      flowType: "pkce",
    },
  }
);

// ─── Helpers typés sur les enums du domaine ────────────────────────────────
export type TenantRole = Database["public"]["Enums"]["tenant_role"];
export type PlanTier = Database["public"]["Enums"]["plan_tier"];
export type AIMode = Database["public"]["Enums"]["ai_mode"];
export type CampaignStatus = Database["public"]["Enums"]["campaign_status"];
export type DecisionType = Database["public"]["Enums"]["decision_type"];
export type AdPlatform = Database["public"]["Enums"]["ad_platform"];

// Row types les plus utilisés côté UI
export type Tenant = Database["public"]["Tables"]["tenants"]["Row"];
export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
export type Creative = Database["public"]["Tables"]["creatives"]["Row"];
export type AIDecision = Database["public"]["Tables"]["ai_decisions"]["Row"];

// Type de retour de la RPC my_tenants() — pratique pour le tenant switcher
export type MyTenant = Database["public"]["Functions"]["my_tenants"]["Returns"][number];
