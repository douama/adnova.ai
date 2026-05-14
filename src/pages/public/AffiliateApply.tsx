import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/ui/container";
import { supabase } from "../../lib/supabase";
import { CheckCircle2, ArrowLeft } from "lucide-react";

type Submitted = {
  affiliate_id: string;
  code: string;
  tier: string;
  commission_pct: number;
  status?: string;
  duplicate?: boolean;
};

export function AffiliateApplyPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("youtube");
  const [channelUrl, setChannelUrl] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("stripe");
  const [payoutRef, setPayoutRef] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (displayName.trim().length < 2) {
      setError("Please enter your name or handle.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.rpc("apply_as_affiliate", {
        p_display_name: displayName.trim(),
        p_email: email.trim().toLowerCase(),
        p_channel: channel,
        p_channel_url: channelUrl.trim() || null,
        p_audience_size: audienceSize ? parseInt(audienceSize, 10) : null,
        p_payout_method: payoutMethod,
        p_payout_account_ref: payoutRef.trim() || null,
      });
      if (error) throw error;
      setSubmitted(data as unknown as Submitted);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-orange/[0.12]">
              <CheckCircle2 className="h-7 w-7 text-orange" strokeWidth={2} />
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
              {submitted.duplicate ? "Already in the program." : (
                <>
                  You're <em>in</em>.
                </>
              )}
            </h1>
            <p className="mt-4 text-base text-body">
              {submitted.duplicate
                ? "We already have an application on file for this email. Our team will email you with status."
                : "Welcome to the AdNova Partner program. Your application is pending review (typically &lt; 24h)."}
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-orange/30 bg-orange/[0.04] p-6 text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-orange">
                Your provisional code
              </div>
              <div className="mt-2 font-mono text-2xl font-bold text-ink">{submitted.code}</div>
              <p className="mt-3 text-xs text-muted">
                Goes live the moment your application is approved. You'll receive an email
                with your tracking link and login to your partner dashboard.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-orange/20 pt-3 text-xs text-body">
                <span>
                  Starting tier ·{" "}
                  <strong className="text-ink uppercase">{submitted.tier}</strong>
                </span>
                <span>
                  Commission ·{" "}
                  <strong className="text-orange">{submitted.commission_pct}%</strong>{" "}
                  lifetime
                </span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/partners"
                className="inline-flex items-center gap-1.5 text-sm text-muted-strong hover:text-orange"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to the partner program
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Apply · Partner program
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
              Earn <em>20%</em> on every brand you refer.
            </h1>
            <p className="mt-4 text-base text-body">
              All approved partners start at <strong className="text-ink">Bronze (20% lifetime)</strong>.
              Climb to Silver, Gold, then Diamond (up to 40%) based on monthly active referrals.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-12 space-y-5 rounded-2xl border border-border bg-card p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name or handle" required>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Sarah Marketing"
                  className="field-input"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="field-input"
                  autoComplete="email"
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Primary channel">
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="field-input"
                >
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="x">X / Twitter</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="podcast">Podcast</option>
                  <option value="agency">Agency / Consulting</option>
                  <option value="community">Community / Slack / Discord</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field label="Audience size (optional)">
                <input
                  type="number"
                  value={audienceSize}
                  onChange={(e) => setAudienceSize(e.target.value)}
                  min={0}
                  step={1000}
                  placeholder="e.g. 50000"
                  className="field-input"
                />
              </Field>
            </div>

            <Field label="Channel URL (optional)">
              <input
                type="url"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="https://youtube.com/@you"
                className="field-input"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Payout method">
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="field-input"
                >
                  <option value="stripe">Stripe Connect (recommended)</option>
                  <option value="paypal">PayPal</option>
                  <option value="sepa">SEPA (EU bank transfer)</option>
                  <option value="wise">Wise</option>
                </select>
              </Field>
              <Field label="Account reference (optional)">
                <input
                  type="text"
                  value={payoutRef}
                  onChange={(e) => setPayoutRef(e.target.value)}
                  placeholder="email / IBAN / Wise ID"
                  className="field-input"
                />
              </Field>
            </div>

            {error ? (
              <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange text-sm font-bold text-white transition-all hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-50 disabled:transform-none disabled:shadow-none"
            >
              {submitting ? "Submitting…" : "Apply — start at 20%"}{" "}
              <span aria-hidden>→</span>
            </button>

            <p className="text-center text-[11px] text-muted">
              Applications are reviewed within 24h. We approve creators, agencies, consultants,
              and community leaders who have genuine reach to brands and marketers.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-strong">
        {label}
        {required ? <span className="ml-0.5 text-orange">*</span> : null}
      </span>
      {children}
    </label>
  );
}
