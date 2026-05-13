import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Bindings } from "../types";

/** Service-role client (full access — never expose to clients). */
export function serviceClient(env: Bindings): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Anon client scoped to the caller's JWT (RLS enforced). */
export function userClient(env: Bindings, accessToken: string): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}
