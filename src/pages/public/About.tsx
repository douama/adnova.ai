import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";
import { TEAM, TIMELINE, VALUES } from "../../data/team";

export function AboutPage() {
  return (
    <>
      <section className="pt-20 pb-12 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              About AdNova
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink sm:text-6xl">
              Built for <em>autonomy</em>.<br />Designed for the next thousand.
            </h1>
            <p className="mt-5 text-base text-body sm:text-lg">
              AdNova AI is rebuilding ad operations as a software discipline. We think the
              gap between a $50K/mo D2C brand and a $5M/mo enterprise should be tools, not a
              30-person growth team.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              The <em>team</em>.
            </h2>
            <p className="mt-3 text-base text-body">
              Distributed across Europe and North America. Backgrounds in performance
              marketing, ML, and platform engineering.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-strong"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-orange/[0.12] text-base font-bold text-orange">
                    {m.avatar}
                  </div>
                  <div>
                    <div className="text-base font-bold text-ink">{m.name}</div>
                    <div className="text-xs text-muted-strong">{m.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-body">{m.bio}</p>
                <div className="mt-4 flex gap-3 text-xs text-muted">
                  {m.twitter ? <span>{m.twitter}</span> : null}
                  {m.linkedin ? <span className="truncate">{m.linkedin}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {VALUES.length > 0 ? (
        <section className="py-16">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
                What we <em>believe</em>.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="text-orange text-xl">●</div>
                  <h3 className="mt-3 text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{v.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {TIMELINE.length > 0 ? (
        <section className="py-16">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
                <em>Milestones</em>.
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <ol className="space-y-3">
                {TIMELINE.map((m) => (
                  <li
                    key={m.year + m.event}
                    className="flex gap-4 rounded-xl border border-border bg-card p-4"
                  >
                    <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wider text-orange">
                      {m.year}
                    </span>
                    <span className="text-sm text-body">{m.event}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>
      ) : null}

      <CTA />
    </>
  );
}
