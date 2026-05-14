import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";
import { Shield } from "lucide-react";
import { useAuth } from "../../stores/authStore";
import { supabase } from "../../lib/supabase";
import { Logo } from "../../components/ui/logo";

// Dedicated admin entry point. Uses the same Supabase Auth backend as the
// tenant login but :
//  1. Requires the user_profiles.is_super_admin flag (verified via the
//     is_super_admin() RPC after signIn).
//  2. If the account is NOT super-admin, immediately signs them out and
//     shows a generic "Not authorized" error — we deliberately don't
//     differentiate "wrong password" from "not admin" here to avoid
//     leaking which emails belong to admins.
//  3. Once verified, jumps to /admin (overview).
//
// Already-logged-in super-admins land directly on /admin.

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { session, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If user is already logged in, check super-admin and redirect.
  useEffect(() => {
    let cancelled = false;
    if (!session) return;
    (async () => {
      const { data, error } = await supabase.rpc("is_super_admin");
      if (cancelled) return;
      if (error) {
        setError("Authorization check failed. Try signing in again.");
        return;
      }
      if (data) {
        navigate("/admin", { replace: true });
      } else {
        // Logged in but not admin — show non-leaky error
        setError("This account does not have admin access.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || password.length < 8) {
      setError("Enter a valid email and password.");
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      // signIn updates the session via onAuthStateChange ; the useEffect
      // above will pick it up and run the super-admin check + redirect.
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    setError(null);
    await signOut();
    setEmail("");
    setPassword("");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <BackgroundGrid />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="rounded-md border border-orange/30 bg-orange/[0.08] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange">
            Admin
          </span>
        </div>

        <h1 className="mt-12 flex items-center gap-3 text-center text-4xl font-bold tracking-tighter text-ink">
          <Shield className="h-7 w-7 text-orange" strokeWidth={1.75} />
          Admin <em>Console</em>
        </h1>
        <p className="mt-3 text-center text-sm text-muted-strong">
          Restricted access · super-admins only.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 w-full rounded-2xl border border-border bg-card p-7"
        >
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-strong">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="admin@adnova.ai"
                className="field-input"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-strong">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="field-input"
              />
            </label>

            {error ? (
              <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-2.5 text-sm text-muted-strong">
                {error}
              </div>
            ) : null}

            {session ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border-strong bg-white/[0.03] text-sm font-medium text-body transition-all hover:border-white/25 hover:text-ink"
              >
                Sign out &amp; try a different account
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {submitting ? "Verifying…" : "Sign in"} <span aria-hidden>→</span>
              </button>
            )}
          </div>
        </form>

        <p className="mt-6 max-w-sm text-center text-xs text-muted">
          Not an admin?{" "}
          <a
            href="/login"
            className="text-orange hover:text-orange-hover"
          >
            Go to the regular sign-in
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function BackgroundGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function mapAuthError(err: unknown): string {
  // Generic to avoid leaking which emails are admin
  if (err instanceof AuthError) {
    if (err.status === 429) return "Too many attempts. Try again later.";
    if (err.code === "email_not_confirmed") {
      return "Confirm your email first.";
    }
  }
  return "Invalid credentials.";
}
