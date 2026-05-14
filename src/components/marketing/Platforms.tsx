import { Container } from "../ui/container";
import { PLATFORMS } from "../../data/platforms";
import { PlatformIcon } from "../ui/PlatformIcon";

export function Platforms() {
  return (
    <section id="features" className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Every platform.
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            <em>One place</em>.
          </h2>
          <p className="mt-4 text-base text-body">
            Connect once, AdNova manages bids, budgets, creatives and audiences across all 9 — in
            real time.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className="group relative flex aspect-square items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-border-strong hover:-translate-y-0.5"
              title={p.name}
            >
              <PlatformIcon
                platform={p.id}
                className="h-12 w-12 transition-transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
