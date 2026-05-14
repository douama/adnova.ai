import { Container } from "../ui/container";

const STEPS = [
  {
    n: "01",
    title: "Connect",
    body:
      "Plug your ad accounts in 30 seconds. OAuth to Meta, Google, TikTok, LinkedIn, YouTube, Pinterest, Snapchat, X, Amazon — no SDK to install.",
  },
  {
    n: "02",
    title: "Train",
    body:
      "AdNova ingests your campaign history, learns what works for your brand, ICP and creative voice. Ready in under 10 minutes.",
  },
  {
    n: "03",
    title: "Scale",
    body:
      "The agent runs 24/7 — generates creatives, reallocates budget, kills losers, scales winners. You approve milestones, not micro-decisions.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Three steps.
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            Then it runs <em>itself</em>.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-border bg-card p-7 transition-all hover:border-border-strong hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="text-xs font-bold tracking-widest text-orange">{s.n}</div>
              <h3 className="mt-4 text-2xl font-bold tracking-tighter text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
