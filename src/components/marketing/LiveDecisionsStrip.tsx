import { Container } from "../ui/container";

const STATS = [
  { value: "+$12,840", label: "Revenue 24h", sub: "Maison Aubergine · Meta" },
  { value: "$284K", label: "Spend / month", sub: "Across 9 platforms" },
  { value: "$1.37M", label: "Revenue / month", sub: "From AI decisions" },
  { value: "4.82×", label: "Avg ROAS", sub: "Up from 2.1× before" },
];

export function LiveDecisionsStrip() {
  return (
    <section className="border-y border-border bg-surface/40 py-8">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card px-6 py-6">
              <div className="text-3xl font-bold tracking-tighter text-ink">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-strong">
                {s.label}
              </div>
              <div className="mt-2 text-xs text-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
