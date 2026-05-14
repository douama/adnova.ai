import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";
import { JOBS, PERKS } from "../../data/careers";
import { Briefcase, MapPin, Clock } from "lucide-react";

export function CareersPage() {
  // Group jobs by department
  const byDept = JOBS.reduce<Record<string, typeof JOBS>>((acc, j) => {
    (acc[j.dept] ??= []).push(j);
    return acc;
  }, {});

  return (
    <>
      <section className="pt-20 pb-12 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Careers
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink sm:text-6xl">
              Build the <em>autonomous</em> ad ops engine.
            </h1>
            <p className="mt-5 text-base text-body sm:text-lg">
              {JOBS.length} open roles · remote-first · meaningful equity · ship to thousands
              of brands.
            </p>
          </div>
        </Container>
      </section>

      {PERKS.length > 0 ? (
        <section className="pb-16">
          <Container>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {PERKS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="h-8 w-8 rounded-md bg-orange/[0.12] text-orange grid place-items-center">
                    <Briefcase className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{p.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              Open <em>roles</em>.
            </h2>
          </div>

          <div className="mt-12 space-y-12">
            {Object.entries(byDept).map(([dept, jobs]) => (
              <div key={dept}>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
                  {dept}
                </h3>
                <ul className="mt-4 space-y-3">
                  {jobs.map((j) => (
                    <li
                      key={j.title}
                      className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border-strong"
                    >
                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-ink">{j.title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">{j.desc}</p>
                        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-muted">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" strokeWidth={2} />
                            {j.loc}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" strokeWidth={2} />
                            {j.type}
                          </span>
                          <span>· {j.level}</span>
                        </div>
                      </div>
                      <a
                        href="mailto:careers@adnova.ai?subject=Application"
                        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-border bg-white/[0.03] px-4 text-xs font-bold text-body transition-all hover:border-orange hover:text-orange"
                      >
                        Apply
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
