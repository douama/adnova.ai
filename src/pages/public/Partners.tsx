import { Link } from "react-router-dom";
import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";

const TIERS = [
  { name: "Bronze", rev: "20%", req: "1+ active referral", icon: "●" },
  { name: "Silver", rev: "25%", req: "5+ active referrals", icon: "●●" },
  { name: "Gold", rev: "30%", req: "15+ active referrals", icon: "●●●" },
  { name: "Diamond", rev: "40%", req: "50+ active referrals", icon: "●●●●" },
];

export function PartnersPage() {
  return (
    <>
      <section className="pt-20 pb-12 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Affiliate program
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink sm:text-6xl">
              Refer brands. <em>Earn 20-40%</em>.
            </h1>
            <p className="mt-5 text-base text-body sm:text-lg">
              20% lifetime commission on every paid plan from day one. Climb tiers and earn up
              to 40%. Cashout monthly via Stripe Connect, PayPal, SEPA or Wise.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/affiliate/apply"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-glow"
              >
                Apply now <span aria-hidden>→</span>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center rounded-xl border border-border-strong bg-white/[0.03] px-5 text-sm font-medium text-body transition-colors hover:border-white/25 hover:text-ink"
              >
                How it works
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-orange">
                  {t.icon}
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tighter text-ink">{t.name}</h3>
                <div className="mt-2 text-3xl font-bold tracking-tighter text-orange">
                  {t.rev}
                </div>
                <p className="mt-3 text-xs text-muted">{t.req}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              <em>How</em> it works.
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
            <Step
              n="01"
              title="Apply"
              body="Fill the partner form (under 2 min). Approved within 24h by our partnerships team."
            />
            <Step
              n="02"
              title="Share your link"
              body="Unique referral URL. Bake it into your newsletter, video description, agency proposal, anywhere."
            />
            <Step
              n="03"
              title="Get paid monthly"
              body="Every 1st of the month — we sum your commission, deduct churn, payout via your chosen method."
            />
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/affiliate/apply"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:-translate-y-0.5 hover:shadow-glow"
            >
              Start earning 20% <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7">
      <div className="text-xs font-bold tracking-widest text-orange">{n}</div>
      <h3 className="mt-4 text-2xl font-bold tracking-tighter text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-body">{body}</p>
    </div>
  );
}
