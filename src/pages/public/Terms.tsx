import { Container } from "../../components/ui/container";

export function TermsPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Legal</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink">
            Terms of <em>Service</em>.
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: May 14, 2026</p>

          <article className="prose-dark mt-10 space-y-8 text-sm leading-relaxed text-body">
            <section>
              <h2 className="text-xl font-bold text-ink">1. Acceptance</h2>
              <p className="mt-3">
                By creating an AdNova AI workspace you agree to these Terms of Service and to
                the Privacy Policy. If you don't agree, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">2. The service</h2>
              <p className="mt-3">
                AdNova AI is an autonomous advertising platform that connects to your ad
                accounts (Meta, Google, TikTok, LinkedIn, etc.) and optimizes campaigns on
                your behalf using AI. You retain full control: AI mode (Advisory / Guardrails
                / Autonomous) is configurable and reversible at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">3. Ad accounts</h2>
              <p className="mt-3">
                You are responsible for the ad accounts you connect, their billing and their
                compliance with the platforms' own terms. AdNova acts as a tool — your account
                relationships are with the platforms directly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">4. AI decisions</h2>
              <p className="mt-3">
                In Autonomous mode, AdNova may pause, kill, scale or reallocate budget on your
                campaigns within the guardrails you configure. We do not guarantee specific ROAS
                or business outcomes. AI decisions are logged in your Decision Log and
                reversible from there.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">5. Pricing &amp; billing</h2>
              <p className="mt-3">
                Subscriptions renew monthly unless canceled. You can cancel at any time from
                Settings; cancellation takes effect at end of the billing period. No refund on
                prepaid months unless required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">6. Liability</h2>
              <p className="mt-3">
                To the maximum extent permitted by law, AdNova's total liability is capped at
                the amount you paid in the 12 months preceding the claim. We are not liable
                for indirect or consequential damages, including lost ad spend or revenue.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">7. Termination</h2>
              <p className="mt-3">
                We may suspend a workspace that violates these Terms or the platforms' policies.
                You can delete your workspace at any time from Settings — we will purge
                personal data within 30 days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">8. Changes</h2>
              <p className="mt-3">
                We may update these Terms; the "last updated" date above reflects the current
                version. Material changes will be announced in-product 30 days before they take
                effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">9. Contact</h2>
              <p className="mt-3">
                Legal questions: <span className="text-orange">legal@adnova.ai</span>.
              </p>
            </section>
          </article>
        </div>
      </Container>
    </section>
  );
}
