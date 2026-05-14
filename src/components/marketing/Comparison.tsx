import { Container } from "../ui/container";

type Row = { feature: string; smartly: "yes" | "no" | "partial"; adnova: "yes" | "no" | "partial"; note?: string };

const ROWS: Row[] = [
  { feature: "Multi-platform sync (9 platforms)", smartly: "yes", adnova: "yes" },
  { feature: "AI creative generation (UGC video incl.)", smartly: "partial", adnova: "yes", note: "Sonnet 4.5 + SDXL" },
  { feature: "Autonomous bid optimization", smartly: "yes", adnova: "yes" },
  { feature: "Cross-run memory (compounding-safe)", smartly: "no", adnova: "yes", note: "pgvector recall" },
  { feature: "Decision log + replay", smartly: "no", adnova: "yes" },
  { feature: "Pricing transparency", smartly: "no", adnova: "yes", note: "$49–$499/mo" },
  { feature: "Setup time", smartly: "partial", adnova: "yes", note: "30 sec, no demo call" },
  { feature: "Annual contract required", smartly: "yes", adnova: "no", note: "Cancel anytime" },
];

function Cell({ value }: { value: Row["smartly"] }) {
  if (value === "yes")
    return <span className="text-orange">●</span>;
  if (value === "partial")
    return <span className="text-muted-strong">◐</span>;
  return <span className="text-muted">○</span>;
}

export function Comparison() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Smartly le fait. AdNova le fait <em>aussi</em>.
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            Au tiers du prix.
          </h2>
          <p className="mt-4 text-base text-body">
            Same surface area. Cleaner agentic engine. No annual contract. No 30-min demo call to
            see pricing.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-[1fr_auto_auto] gap-px bg-border text-sm">
            <div className="bg-surface px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-strong">
              Feature
            </div>
            <div className="bg-surface px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-muted-strong">
              Smartly
            </div>
            <div className="bg-surface px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-orange">
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
                <div className="bg-card px-6 py-4 text-center text-lg">
                  <Cell value={r.smartly} />
                </div>
                <div className="bg-card px-6 py-4 text-center text-lg">
                  <Cell value={r.adnova} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
