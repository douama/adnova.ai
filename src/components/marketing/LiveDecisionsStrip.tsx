import { ArrowUp, Activity } from "lucide-react";
import { Container } from "../ui/container";

const STATS = [
  {
    value: "+$12,840",
    label: "Revenue · 24h",
    sub: "Maison Aubergine · Meta",
    delta: "+18.4%",
  },
  {
    value: "$284K",
    label: "Monthly spend",
    sub: "Across 9 platforms",
    delta: "+5.1%",
  },
  {
    value: "$1.37M",
    label: "Monthly revenue",
    sub: "From AI decisions",
    delta: "+22.7%",
  },
  {
    value: "4.82×",
    label: "Average ROAS",
    sub: "Up from 2.1× before AdNova",
    delta: "+129%",
  },
];

export function LiveDecisionsStrip() {
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <div className="glass glass-highlight overflow-hidden rounded-2xl p-1">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`relative px-5 py-5 sm:px-6 ${
                  i < STATS.length - 1
                    ? "border-b border-border md:border-b-0 md:border-r"
                    : ""
                } ${i % 2 === 0 ? "border-r md:border-r" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-2xl font-bold tracking-tighter text-ink sm:text-3xl">
                    {s.value}
                  </div>
                  <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                    <ArrowUp className="h-2.5 w-2.5" strokeWidth={2.5} />
                    {s.delta}
                  </span>
                </div>
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                  {s.label}
                </div>
                <div className="mt-0.5 text-xs text-muted">{s.sub}</div>
                {i === 0 ? (
                  <div className="absolute right-2 top-2 inline-flex items-center gap-1 text-[10px] text-orange">
                    <Activity className="h-3 w-3 animate-pulse" strokeWidth={2} />
                    <span className="font-bold uppercase tracking-wider">Live</span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
