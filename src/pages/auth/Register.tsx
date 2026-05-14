import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";
import { useAuth } from "../../stores/authStore";
import { supabase } from "../../lib/supabase";
import { Logo } from "../../components/ui/logo";

export function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    password: "",
  });
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmRequired, setConfirmRequired] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function setField<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const { firstName, lastName, company, email, password } = form;

    if (!firstName.trim() || !lastName.trim() || !company.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!terms) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }

    setSubmitting(true);
    try {
      await signUp({
        email: email.trim(),
        password,
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        company: company.trim(),
      });

      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/onboarding", { replace: true });
      } else {
        setConfirmRequired(true);
      }
    } catch (err) {
      setError(mapSignupError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmRequired) {
    return <ConfirmEmailScreen email={form.email} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <BackgroundGrid />
      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-12">
        <Logo />

        <h1 className="mt-12 text-center text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
          Start your <em>free trial</em>.
        </h1>
        <p className="mt-3 text-center text-sm text-muted-strong">
          Create your workspace in 30 seconds. No credit card.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 w-full rounded-2xl border border-border bg-card p-7"
        >
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name">
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  autoComplete="given-name"
                  required
                  placeholder="Sarah"
                  className="field-input"
                />
              </Field>
              <Field label="Last name">
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  autoComplete="family-name"
                  required
                  placeholder="Lin"
                  className="field-input"
                />
              </Field>
            </div>

            <Field label="Company">
              <input
                type="text"
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                autoComplete="organization"
                required
                placeholder="Your company name"
                className="field-input"
              />
            </Field>

            <Field label="Work email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                autoComplete="email"
                required
                placeholder="you@company.com"
                className="field-input"
              />
            </Field>

            <Field label="Password">
              <input
                type="password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="field-input"
              />
              <p className="text-xs text-muted">
                Minimum 8 characters. Use a mix of letters, numbers and symbols.
              </p>
            </Field>

            <label className="flex items-start gap-2.5 text-xs text-body">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 cursor-pointer accent-orange"
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-orange hover:text-orange-hover">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-orange hover:text-orange-hover">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {error ? (
              <div className="rounded-xl border border-muted/20 bg-muted/[0.08] px-4 py-2.5 text-sm text-muted-strong">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {submitting ? "Creating account…" : "Create account"}{" "}
              <span aria-hidden>→</span>
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-strong">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-orange hover:text-orange-hover">
            Sign in
          </Link>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-orange" /> 14-day free trial
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-orange" /> No credit card
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-orange" /> Cancel anytime
          </span>
        </div>
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

function ConfirmEmailScreen({ email }: { email: string }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <BackgroundGrid />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12 text-center">
        <Logo />
        <h1 className="mt-12 text-4xl font-bold tracking-tighter text-ink">
          Check your <em>inbox</em>.
        </h1>
        <p className="mt-4 max-w-sm text-base text-body">
          We sent a confirmation link to <span className="font-bold text-ink">{email}</span>.
          Click it to activate your workspace.
        </p>
        <p className="mt-6 text-xs text-muted">
          Didn&apos;t get it? Check spam, or{" "}
          <Link to="/login" className="text-orange hover:text-orange-hover">
            sign in with a magic link
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function mapSignupError(err: unknown): string {
  if (err instanceof AuthError) {
    const code = err.code ?? "";
    const msg = err.message.toLowerCase();
    if (code === "user_already_exists" || msg.includes("already registered")) {
      return "This email is already used. Try signing in instead.";
    }
    if (code === "weak_password") {
      return "Password is too weak. Use a mix of letters, numbers and symbols.";
    }
    if (msg.includes("password should be at least")) {
      return "Password must be at least 8 characters.";
    }
    return err.message || "Sign-up failed.";
  }
  return "Network error. Try again.";
}
