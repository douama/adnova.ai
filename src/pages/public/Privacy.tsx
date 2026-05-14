import { Container } from "../../components/ui/container";

export function PrivacyPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Legal</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink">
            Privacy <em>Policy</em>.
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: May 14, 2026</p>

          <article className="prose-dark mt-10 space-y-8 text-sm leading-relaxed text-body">
            <section>
              <h2 className="text-xl font-bold text-ink">What we collect</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Account info: email, full name, company (provided at signup).</li>
                <li>Campaign data: read from the ad accounts you connect via OAuth.</li>
                <li>Usage telemetry: page views, AI run logs (technical, no personal data).</li>
                <li>Frontend errors: stack traces captured by ErrorBoundary if a page crashes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">What we don't collect</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Third-party trackers (Facebook Pixel, GA, etc.) on this product.</li>
                <li>Sensitive personal data outside campaign context.</li>
                <li>Ad-account credentials — OAuth tokens are stored encrypted at rest.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">How we use it</h2>
              <p className="mt-3">
                Campaign data trains the per-tenant AI memory (cross-run recall) and powers
                the decision engine. We never train shared models with your data. Each tenant
                is fully isolated by Row-Level Security in Postgres.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">Who has access</h2>
              <p className="mt-3">
                You and your invited workspace members. Internally, only a small number of
                AdNova engineers with audit-logged access for support, with your explicit
                consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">Sub-processors</h2>
              <p className="mt-3">
                Anthropic (LLM), OpenAI (embeddings), Supabase (database + auth + storage),
                Vercel (hosting), Stripe (billing).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">Your rights (GDPR / CCPA)</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Request your data: export from Settings → Account.</li>
                <li>Delete your account: instantly via Settings, purge within 30 days.</li>
                <li>Correct your data: edit profile directly in-app.</li>
                <li>Object to processing: email <span className="text-orange">privacy@adnova.ai</span>.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">Retention</h2>
              <p className="mt-3">
                Active workspace : we keep data while you use it. Cancelled workspace : 30
                days then deletion. Billing records : 7 years per legal requirement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">Contact</h2>
              <p className="mt-3">
                Privacy questions: <span className="text-orange">privacy@adnova.ai</span>.
              </p>
            </section>
          </article>
        </div>
      </Container>
    </section>
  );
}
