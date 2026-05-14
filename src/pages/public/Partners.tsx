import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  DollarSign,
  Zap,
  Shield,
  Award,
  Crown,
  LayoutDashboard,
  Palette,
  Link2,
  HeadphonesIcon,
  Sparkles,
  Infinity as InfinityIcon,
  Star,
  ArrowRight,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";

const ARPU = 200; // blended average MRR per paid referral

const TIERS = [
  {
    name: "Bronze",
    rev: 20,
    req: "1+ active referral",
    Icon: Award,
    perks: ["Real-time dashboard", "Marketing kit", "Email support"],
    featured: false,
  },
  {
    name: "Silver",
    rev: 25,
    req: "5+ active referrals",
    Icon: Star,
    perks: ["Everything in Bronze", "Co-branded landing pages", "Priority support"],
    featured: false,
  },
  {
    name: "Gold",
    rev: 30,
    req: "15+ active referrals",
    Icon: Crown,
    perks: ["Everything in Silver", "Dedicated partner manager", "Quarterly bonuses"],
    featured: true,
  },
  {
    name: "Diamond",
    rev: 40,
    req: "50+ active referrals",
    Icon: Sparkles,
    perks: ["Everything in Gold", "Custom revenue share deals", "Joint go-to-market"],
    featured: false,
  },
];

const BENEFITS = [
  {
    Icon: InfinityIcon,
    title: "Lifetime commissions",
    body: "Earn on every renewal, forever — as long as the brand stays subscribed. No cap, no expiry.",
  },
  {
    Icon: Zap,
    title: "Instant tracking",
    body: "60-day cookie window. Last-touch attribution with deep-link & email-match fallback so credit is never lost.",
  },
  {
    Icon: LayoutDashboard,
    title: "Real-time dashboard",
    body: "Clicks, signups, trials, MRR, churn and pending payout — refreshed live. Export to CSV anytime.",
  },
  {
    Icon: Palette,
    title: "Marketing kit",
    body: "Pre-built copy, landing pages, banners, demo videos and case studies — drop them into your funnels.",
  },
  {
    Icon: Link2,
    title: "Custom deep links",
    body: "Send traffic to any page (pricing, /onboarding, /agency) and we attribute it back to your account.",
  },
  {
    Icon: HeadphonesIcon,
    title: "Dedicated manager",
    body: "Gold and Diamond partners get a named manager who helps you scale — strategy calls, custom creatives.",
  },
];

const TOP_EARNERS = [
  {
    name: "Creator · marketing newsletter",
    tier: "Diamond",
    mrr: "$11,840",
    blurb: "Recommends AdNova as the autopilot for performance creators. Audience: 84K marketers.",
  },
  {
    name: "Agency owner · DTC growth",
    tier: "Gold",
    mrr: "$6,720",
    blurb: "Plugs AdNova into client retainers. We pay the commission, the agency keeps 100% of the fee.",
  },
  {
    name: "YouTube channel · e-com tips",
    tier: "Gold",
    mrr: "$4,920",
    blurb: "Single 12-min video drove 38 paid referrals in 60 days — and they're still compounding.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How long is the cookie window?",
    a: "60 days. We also fall back on email match and authenticated deep-link attribution so credit is preserved even if cookies are cleared.",
  },
  {
    q: "When am I paid?",
    a: "Every 1st of the month for the previous month's commission. We deduct churn from the same period and pay the net via Stripe Connect, PayPal, SEPA or Wise. $50 minimum payout — anything below rolls over.",
  },
  {
    q: "Is this recurring or one-time?",
    a: "Fully recurring. As long as the brand keeps paying, you keep earning — there is no 12-month cap.",
  },
  {
    q: "Can I refer my own clients (agencies)?",
    a: "Yes. Most agency partners run AdNova under their own brand and bill clients on top — we still pay you the affiliate commission on the AdNova subscription.",
  },
  {
    q: "Do I lose my tier if I have a slow month?",
    a: "No. Tier requirements are based on lifetime active referrals, not monthly performance. Once you reach Gold, you stay Gold.",
  },
];

function EarningsCalculator() {
  const [referrals, setReferrals] = useState(15);

  const tierIndex =
    referrals >= 50 ? 3 : referrals >= 15 ? 2 : referrals >= 5 ? 1 : 0;
  const tier = TIERS[tierIndex]!;
  const rate = tier.rev;
  const monthly = Math.round(referrals * ARPU * (rate / 100));
  const yearly = monthly * 12;

  return (
    <section className="pb-16">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="glass glass-highlight relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(closest-side at 100% 0%, rgba(255,77,0,0.45), transparent 60%)",
              }}
            />
            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
                  Earnings calculator
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
                  How much could <em>you</em> earn?
                </h2>
                <p className="mt-4 text-sm text-body sm:text-base">
                  Adjust the number of brands you'd refer per year. Based on{" "}
                  <strong className="text-ink">${ARPU}/mo</strong> blended ARPU across AdNova's
                  paid plans.
                </p>

                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-strong">
                      Active referrals
                    </label>
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => setReferrals(Math.max(1, referrals - 1))}
                        className="glass-soft inline-flex h-8 w-8 items-center justify-center rounded-lg text-body transition-colors hover:text-ink"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-12 text-center text-lg font-bold text-ink tabular-nums">
                        {referrals}
                      </span>
                      <button
                        onClick={() => setReferrals(Math.min(100, referrals + 1))}
                        className="glass-soft inline-flex h-8 w-8 items-center justify-center rounded-lg text-body transition-colors hover:text-ink"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={referrals}
                    onChange={(e) => setReferrals(Number(e.target.value))}
                    className="mt-3 w-full accent-orange"
                  />
                  <div className="mt-1.5 flex justify-between text-[10px] text-muted">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1.5 text-xs font-bold text-orange">
                  <tier.Icon className="h-3.5 w-3.5" />
                  {tier.name} tier · {rate}% commission
                </div>
              </div>

              <div className="grid gap-4">
                <div className="glass-strong rounded-2xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-strong">
                    Monthly recurring
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tighter text-orange tabular-nums">
                      ${monthly.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted">/ month</span>
                  </div>
                </div>
                <div className="glass-soft rounded-2xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-strong">
                    Year 1 projection
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tighter text-ink tabular-nums">
                      ${yearly.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted">/ year</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted">
                    Compounds with renewals — every active referral keeps paying year after year.
                  </p>
                </div>
                <Link
                  to="/affiliate/apply"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange text-sm font-bold text-white transition-all hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-glow"
                >
                  Apply to earn ${monthly.toLocaleString()}/mo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PartnersPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #FF4D00, transparent)" }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-strong">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
              </span>
              <span>Partners paid this month · $847,210</span>
            </div>

            <h1 className="mt-6 text-[clamp(2rem,7vw,2.75rem)] font-bold leading-[1.05] tracking-tighter text-ink sm:mt-8 sm:text-6xl md:text-7xl">
              Refer brands.
              <br />
              <em>Earn 40% for life</em>.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg">
              The highest-paying affiliate program in adtech. 20% to start, up to 40% recurring,
              paid monthly. No cap, no expiry, no clawback after 60 days.
            </p>

            <ul className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-strong sm:text-sm">
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-orange" strokeWidth={2.5} />
                Lifetime recurring
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-orange" strokeWidth={2.5} />
                60-day cookie
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-orange" strokeWidth={2.5} />
                Monthly payout
              </li>
            </ul>

            <div className="mt-9 flex flex-row items-stretch justify-center gap-2 sm:gap-3">
              <Link
                to="/affiliate/apply"
                className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-4 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5 sm:flex-none sm:px-8"
              >
                Apply now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#calculator"
                className="glass-soft inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-body transition-all hover:text-ink hover:-translate-y-0.5 sm:flex-none sm:px-7"
              >
                See what you'd earn
              </a>
            </div>

            <p className="mt-5 text-xs text-muted">
              Approval in 24h · No minimum traffic · Reject anytime
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-muted-strong sm:text-xs">
              <div className="inline-flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3 text-emerald-400" strokeWidth={2.5} />
                <span>
                  <strong className="text-ink">4,280+</strong> active partners
                </span>
              </div>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <div className="inline-flex items-center gap-1.5">
                <DollarSign className="h-3 w-3 text-emerald-400" strokeWidth={2.5} />
                <span>
                  <strong className="text-ink">$9.4M+</strong> paid out
                </span>
              </div>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <div className="inline-flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-emerald-400" strokeWidth={2.5} />
                <span>
                  <strong className="text-ink">Net-30</strong> never · paid monthly
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* EARNINGS CALCULATOR */}
      <div id="calculator">
        <EarningsCalculator />
      </div>

      {/* TIERS */}
      <section className="pb-16">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Four tiers
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              Scale your <em>commission</em>, not your effort.
            </h2>
            <p className="mt-4 text-sm text-body sm:text-base">
              Every paid signup counts toward your tier. Once you reach a level, you keep it for
              life — slow months don't bump you back down.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                  t.featured
                    ? "glass glass-highlight ring-2 ring-orange"
                    : "glass-soft"
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most chosen
                  </div>
                )}
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <t.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tighter text-ink">{t.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tighter text-orange tabular-nums">
                    {t.rev}%
                  </span>
                  <span className="text-xs text-muted">recurring</span>
                </div>
                <p className="mt-2 text-xs text-muted">{t.req}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-body">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" strokeWidth={2.5} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHAT YOU GET */}
      <section className="pb-16">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Built to scale
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              Everything you need to <em>compound</em> revenue.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="glass-soft rounded-2xl p-6 transition-all hover:-translate-y-1"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <b.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold tracking-tight text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{b.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="pb-16">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Three steps
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              <em>Live</em> in under 24 hours.
            </h2>
          </div>

          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            <Step
              n="01"
              title="Apply"
              body="2-minute form. We review within 24h — no minimum audience, no traffic floor."
            />
            <Step
              n="02"
              title="Share your link"
              body="Unique referral URL with deep-link support. Drop it in newsletters, videos, agency proposals."
            />
            <Step
              n="03"
              title="Get paid monthly"
              body="Every 1st of the month — we sum, deduct churn, pay net via Stripe / PayPal / SEPA / Wise."
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/affiliate/apply"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-glow"
            >
              Start earning today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* TOP EARNERS */}
      <section className="pb-16">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Top earners
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              They turned audience into <em>recurring revenue</em>.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {TOP_EARNERS.map((e) => (
              <div key={e.name} className="glass rounded-2xl p-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">
                  <Crown className="h-3 w-3" />
                  {e.tier}
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tighter text-ink tabular-nums">
                    {e.mrr}
                  </span>
                  <span className="text-xs text-muted">/ mo recurring</span>
                </div>
                <p className="mt-3 text-xs font-semibold text-muted-strong">{e.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-body">{e.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
                Partner FAQ
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
                Quick <em>answers</em>.
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <FaqRow key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="glass-soft rounded-2xl p-7 transition-all hover:-translate-y-1">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange/10 text-xs font-bold tracking-widest text-orange">
        {n}
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tighter text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-body">{body}</p>
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-soft overflow-hidden rounded-2xl">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="text-sm font-semibold text-ink sm:text-base">{q}</span>
        <span className="shrink-0 text-orange">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed text-body">{a}</div>
      )}
    </div>
  );
}
