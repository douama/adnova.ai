// ─── Vite env vars (validated at module load) ───────────────────────────────
// Toute clé Vite doit être préfixée VITE_ pour être exposée au bundle.
// `required()` fail-fast — pas d'erreurs runtime silencieuses sur clé manquante.
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing env var: ${name}. Check apps/web/.env (copy from .env.example).`
    );
  }
  return value;
}

function optional(value: string | undefined, fallback: string): string {
  return value && value.length > 0 ? value : fallback;
}

export const env = {
  // API base — seulement pour Phase 5+ quand on aura le worker Hono.
  // En Phase 2 on parle directement à Supabase, donc cette valeur peut être vide.
  apiBaseUrl: optional(import.meta.env.VITE_API_BASE_URL, ""),

  // Supabase — obligatoires
  supabaseUrl: required("VITE_SUPABASE_URL", import.meta.env.VITE_SUPABASE_URL),
  supabaseAnonKey: required(
    "VITE_SUPABASE_ANON_KEY",
    import.meta.env.VITE_SUPABASE_ANON_KEY
  ),

  // Mode (dev/prod) — utile pour conditionner logs verbeux
  isDev: import.meta.env.DEV,
} as const;
