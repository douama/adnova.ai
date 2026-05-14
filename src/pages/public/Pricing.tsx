import { Pricing } from "../../components/marketing/Pricing";
import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";

export function PricingPage() {
  return (
    <>
      <section className="pt-20 pb-8 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Transparent pricing
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink sm:text-6xl">
              Pricing that scales <em>with you</em>.
            </h1>
            <p className="mt-5 text-base text-body sm:text-lg">
              Every plan includes a 14-day free trial. No credit card. Cancel anytime.
              Upgrade or downgrade with one click.
            </p>
          </div>
        </Container>
      </section>

      <Pricing />

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tighter text-ink">
              Frequently <em>asked</em>.
            </h2>
            <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
              <Faq
                q="Is there a setup fee?"
                a="No. All plans are pure monthly subscription. You pay only what's on the pricing card."
              />
              <Faq
                q="Do you take a percentage of ad spend?"
                a="Never. AdNova is software pricing, not a percent-of-spend agency model. Your platform spend is yours."
              />
              <Faq
                q="What does the AI cost on top?"
                a="Around $1/day per tenant when in Autonomous mode (24h, every 30 min cron). Built-in to your plan ceiling — no metered surprise."
              />
              <Faq
                q="Can I cancel anytime?"
                a="Yes. One click in Settings, no phone call, no retention conversation. Pro-rated refund on remaining days."
              />
              <Faq
                q="Do you offer annual discounts?"
                a="Yes — 20% off for annual upfront on Starter, Pro and Agency. Contact sales for Enterprise."
              />
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group px-6 py-5">
      <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-bold text-ink">
        {q}
        <span className="text-muted-strong transition-transform group-open:rotate-45">＋</span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-body">{a}</p>
    </details>
  );
}
