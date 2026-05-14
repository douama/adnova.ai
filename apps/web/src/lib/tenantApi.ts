// ─── Tenant mutations ──────────────────────────────────────────────────────
// Helpers pour modifier le tenant courant (ai_mode, guardrails, etc.)
// RLS exige que l'user soit owner/admin du tenant pour UPDATE.
import { supabase } from "./supabase";
import type { Database } from "./database.types";

type AIMode = Database["public"]["Enums"]["ai_mode"];

export async function updateTenantAiMode(
  tenantId: string,
  mode: AIMode
): Promise<void> {
  const { error } = await supabase
    .from("tenants")
    .update({ ai_mode: mode })
    .eq("id", tenantId);
  if (error) throw new Error(error.message);
}
