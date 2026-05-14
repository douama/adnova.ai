import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";

type Row = {
  feature: string;
  smartly: "yes" | "no" | "partial";
  adnova: "yes" | "no" | "partial";
  note?: string;
};

const ROWS: Row[] = [
  { feature: "Multi-platform sync (Meta, Google, TikTok, LinkedIn…)", smartly: "yes", adnova: "yes" },
  { feature: "9 platforms native support", smartly: "partial", adnova: "yes", note: "+ Pinterest, Snapchat, X, Amazon, YouTube" },
  { feature: "AI creative generation (image)", smartly: "partial", adnova: "yes", note: "SDXL" },
  { feature: "AI creative generation (UGC video)", smartly: "no", adnova: "yes", note: "HeyGen/Runway" },
  { feature: "Autonomous bid optimization", smartly: "yes", adnova: "yes" },
  { feature: "Cross-run memory (compounding-safe)", smartly: "no", adnova: "yes", note: "pgvector recall" },
  { feature: "Decision log + replay", smartly: "no", adnova: "yes" },
  { feature: "1-click rollback", smartly: "no", adnova: "yes" },
  { feature: "Live activity feed (Realtime)", smartly: "no", adnova: "yes" },
  { feature: "Pricing transparency", smartly: "no", adnova: "yes", note: "$49–$499/mo" },
  { feature: "Annual contract required", smartly: "yes", adnova: "no", note: "Cancel anytime" },
  { feature: "Setup time", smartly: "partial", adnova: "yes", note: "30 sec, no demo call" },
  { feature: "% of ad spend pricing", smartly: "partial", adnova: "no", note: "Flat SaaS pricing" },
  { feature: "API access", smartly: "yes", adnova: "yes", note: "Agency plan and up" },
  { feature: "White-label option", smartly: "yes", adnova: "yes" },
  { feature: "Self-serve (no salescall to start)", smartly: "no", adnova: "yes" },
  { feature: "Open-source visibility / GitHub", smartly: "no", adnova: "yes", note: "Source available" },
  { feature: "Built on Claude", smartly: "no", adnova: "yes" },
];

function Cell({ value }: { value: Row["smartly"] }) {
  if (value === "yes") return <span className="text-xl text-orange">●</span>;
  if (value === "partial") return <span className="text-xl text-muted-strong">◐</span>;
  return <span className="text-xl text-muted">○</span>;
}

const USE_CASES = [
  {
    title: "Mid-market e-commerce",
    body: "200K-2M monthly spend across Meta + Google + TikTok. AdNova replaces a Smartly seat ($3K+/mo) at a fraction of the cost.",
  },
  {
    title: "Performance agency, 10-100 clients",
    body: "Run all client accounts from one workspace, white-label optional. Each client gets a tenant, AI runs separately per account.",
  },
  {
    title: "DTC brands scaling past $50K/mo",
    body: "You outgrew Boost / RetailX / Triple Whale but Smartly is overkill. AdNova hits the sweet spot at $149/mo.",
  },
];

export function VsSmartlyPage() {
  return (
    <>
      <section className="pt-20 pb-12 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Comparison
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink sm:text-6xl">
              AdNova vs <em>Smartly.io</em>.
            </h1>
            <p className="mt-5 text-base text-body sm:text-lg">
              Same surface area. Different design philosophy. Smartly built for enterprise.
              AdNova built for the next thousand mid-market brands.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-[1fr_auto_auto] gap-px bg-border text-sm">
              <div className="bg-surface px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-strong">
                Feature
              </div>
              <div className="bg-surface px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-muted-strong">
                Smartly
              </div>
              <div className="bg-surface px-8 py-4 text-center text-xs font-bold uppercase tracking-wider text-orange">
                AdNova
              </div>
              {ROWS.map((r) => (
                <div className="contents" key={r.feature}>
                  <div className="bg-card px-6 py-4 text-body">
                    {r.feature}
                    {r.note ? (
                      <div className="mt-0.5 text-xs text-muted">{r.note}</div>
                    ) : null}
                  </div>
                  <div className="bg-card px-8 py-4 text-center">
                    <Cell value={r.smartly} />
                  </div>
                  <div className="bg-card px-8 py-4 text-center">
                    <Cell value={r.adnova} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              Who switches <em>from Smartly</em>.
            </h2>
            <p className="mt-3 text-base text-body">
              Smartly is great for $50M+/year enterprise. Below that, AdNova does ~80% of the
              job at 5-10% of the cost.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="text-lg font-bold text-ink">{u.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{u.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
