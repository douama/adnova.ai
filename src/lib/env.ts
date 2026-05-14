// ─── Vite env vars (graceful degradation) ──────────────────────────────────
// Toute clé Vite doit être préfixée VITE_ pour être exposée au bundle.
//
// Comportement v2 : ne plus throw au top-level — sinon page blanche en prod
// quand une env var manque (l'ErrorBoundary ne catche que les render React,
// pas les erreurs au module load). À la place on retourne `null`, et App.tsx
// affiche un écran "Configuration manquante" exploitable par l'utilisateur.

function readEnv(name: string): string | null {
  const v = (import.meta.env as Record<string, string | undefined>)[name];
  return v && v.length > 0 ? v : null;
}

function optional(value: string | undefined, fallback: string): string {
  return value && value.length > 0 ? value : fallback;
}

const supabaseUrl = readEnv("VITE_SUPABASE_URL");
const supabaseAnonKey = readEnv("VITE_SUPABASE_ANON_KEY");

export const env = {
  apiBaseUrl: optional(import.meta.env.VITE_API_BASE_URL, ""),

  // Supabase — quand manquant, supabaseUrl est null. App.tsx vérifie isConfigured
  // et affiche un écran d'erreur explicite plutôt qu'une page blanche.
  supabaseUrl: supabaseUrl ?? "",
  supabaseAnonKey: supabaseAnonKey ?? "",

  isConfigured: supabaseUrl !== null && supabaseAnonKey !== null,
  missingVars: [
    supabaseUrl ? null : "VITE_SUPABASE_URL",
    supabaseAnonKey ? null : "VITE_SUPABASE_ANON_KEY",
  ].filter((v): v is string => v !== null),

  isDev: import.meta.env.DEV,
} as const;
