// ─── /auth/callback ────────────────────────────────────────────────────────
// Destination des magic links + OAuth providers. Supabase-js détecte le
// hash/query params auto (detectSessionInUrl: true) et établit la session.
// On attend qu'onAuthStateChange émette puis on redirige.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";

export function AuthCallback() {
  const navigate = useNavigate();
  const session = useAuth((s) => s.session);
  const loading = useAuth((s) => s.loading);

  useEffect(() => {
    if (loading) return;
    if (session) {
      navigate("/", { replace: true });
    } else {
      // Pas de session après le callback = le lien a expiré ou est invalide
      const t = setTimeout(() => navigate("/login?error=callback_failed", { replace: true }), 2000);
      return () => clearTimeout(t);
    }
  }, [session, loading, navigate]);

  return (
    <div className="grid min-h-screen place-items-center text-slate-500">
      <div className="text-center">
        <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
        Vérification de ton lien…
      </div>
    </div>
  );
}
