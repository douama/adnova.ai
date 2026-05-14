// Destination for magic links + OAuth providers. supabase-js detects the
// hash/query params automatically (detectSessionInUrl: true) and sets the
// session — we just wait for onAuthStateChange to emit and redirect.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/authStore";

export function AuthCallback() {
  const navigate = useNavigate();
  const session = useAuth((s) => s.session);
  const loading = useAuth((s) => s.loading);

  useEffect(() => {
    if (loading) return;
    if (session) {
      navigate("/dashboard", { replace: true });
    } else {
      const t = setTimeout(
        () => navigate("/login?error=callback_failed", { replace: true }),
        2000,
      );
      return () => clearTimeout(t);
    }
  }, [session, loading, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-bg">
      <div className="text-center">
        <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-border border-t-orange" />
        <p className="text-sm text-muted-strong">Verifying your link…</p>
      </div>
    </div>
  );
}
