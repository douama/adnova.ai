import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/ui/logo";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  async function complete() {
    setSubmitting(true);
    try {
      // The tenant + subscription are already created by handle_new_user
      // trigger on signup. This is just preference collection — wire to DB later.
      navigate("/dashboard", { replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <BackgroundGrid />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12">
        <Logo />

        <h1 className="mt-12 text-center text-4xl font-bold tracking-tighter text-ink">
          Welcome to <em>AdNova</em>.
        </h1>
        <p className="mt-3 text-center text-sm text-muted-strong">
          Quick setup · step {step} of 2
        </p>

        <div className="mt-10 w-full rounded-2xl border border-border bg-card p-7">
          {step === 1 ? (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-muted-strong">
                What's your role?
              </label>
              <select className="field-input" defaultValue="marketer">
                <option value="marketer">Marketer</option>
                <option value="agency">Agency owner</option>
                <option value="founder">E-commerce founder</option>
                <option value="other">Other</option>
              </select>
              <p className="pt-2 text-xs text-muted">
                We'll tailor the onboarding tips. Skip if you'd rather just see the
                dashboard — you can come back any time from Settings.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-muted-strong">
                Connect your first platform
              </label>
              <div className="grid grid-cols-2 gap-3">
                <PlatformPlaceholder name="Meta Ads" />
                <PlatformPlaceholder name="Google Ads" />
              </div>
              <p className="pt-2 text-xs text-muted">
                OAuth flows are coming soon. You can already explore the dashboard with
                demo data — click "Load demo data" on the Campaigns card.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex h-10 items-center rounded-xl border border-border-strong bg-white/[0.03] px-5 text-sm font-medium text-body hover:border-white/25 hover:text-ink"
              >
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm hover:-translate-y-0.5"
              >
                Next <span aria-hidden>→</span>
              </button>
            ) : (
              <button
                disabled={submitting}
                onClick={complete}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm hover:-translate-y-0.5 disabled:opacity-55"
              >
                {submitting ? "Finishing…" : "Go to dashboard"}{" "}
                <span aria-hidden>→</span>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={complete}
          className="mt-6 text-xs text-muted transition-colors hover:text-ink"
        >
          Skip and go to dashboard →
        </button>
      </div>
    </div>
  );
}

function PlatformPlaceholder({ name }: { name: string }) {
  return (
    <button
      disabled
      className="rounded-xl border border-border bg-bg p-4 text-left transition-colors hover:border-border-strong disabled:opacity-60"
    >
      <div className="text-sm font-bold text-ink">{name}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted">Coming soon</div>
    </button>
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
