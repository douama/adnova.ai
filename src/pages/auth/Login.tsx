import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../stores/authStore";
import { Logo } from "../../components/ui/logo";

export function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signIn, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!email.trim() || password.length < 8) {
      setError("Email valide + mot de passe ≥ 8 caractères requis.");
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function onMagicLink() {
    if (!email.trim()) {
      setError("Renseigne ton email d'abord.");
      return;
    }
    setError(null);
    setMagicLoading(true);
    try {
      await signInWithMagicLink(email.trim());
      setInfo(`Lien magique envoyé à ${email}. Vérifie ta boîte (et les spams).`);
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setMagicLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <BackgroundGrid />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12">
        <Logo />

        <h1 className="mt-12 text-center text-4xl font-bold tracking-tighter text-ink">
          {t("auth.login.title1")} <em>{t("auth.login.title2")}</em>.
        </h1>
        <p className="mt-3 text-center text-sm text-muted-strong">
          {t("auth.login.subtitle")}
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 w-full rounded-2xl border border-border bg-card p-7"
        >
          <div className="flex flex-col gap-5">
            <Field label={t("auth.login.email")}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder={t("auth.login.emailPlaceholder")}
                className="field-input"
              />
            </Field>
            <Field label={t("auth.login.password")}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                minLength={8}
                placeholder={t("auth.login.passwordPlaceholder")}
                className="field-input"
              />
            </Field>

            {error ? (
              <div className="rounded-xl border border-muted/20 bg-muted/[0.08] px-4 py-2.5 text-sm text-muted-strong">
                {error}
              </div>
            ) : null}
            {info ? (
              <div className="rounded-xl border border-orange/20 bg-orange/[0.06] px-4 py-2.5 text-sm text-orange-hover">
                {info}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {submitting ? t("auth.login.submitting") : t("auth.login.submit")}{" "}
              <span aria-hidden>→</span>
            </button>

            <button
              type="button"
              onClick={onMagicLink}
              disabled={magicLoading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border-strong bg-white/[0.03] text-sm font-medium text-body transition-all hover:border-white/25 hover:text-ink disabled:opacity-55"
            >
              {magicLoading ? "Sending…" : "Email me a magic link"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-strong">
          {t("auth.login.noAccount")}{" "}
          <Link to="/register" className="font-bold text-orange hover:text-orange-hover">
            {t("auth.login.register")}
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted-strong">{label}</span>
      {children}
    </label>
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
  if (err instanceof AuthError) {
    const code = err.code ?? "";
    const msg = err.message.toLowerCase();
    if (code === "email_not_confirmed" || msg.includes("email not confirmed")) {
      return "Email not confirmed yet — check your inbox (and spam) for the Supabase link.";
    }
    if (code === "invalid_credentials" || msg.includes("invalid login")) {
      return "Wrong email or password.";
    }
    if (err.status === 429 || code === "over_request_rate_limit") {
      return "Too many attempts. Try again in a few minutes.";
    }
    return err.message || "Sign-in failed.";
  }
  return "Network error. Try again.";
}
