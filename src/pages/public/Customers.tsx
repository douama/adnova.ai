import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";
import { CUSTOMERS } from "../../data/customers";

export function CustomersPage() {
  return (
    <>
      <section className="pt-20 pb-12 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Customers
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink sm:text-6xl">
              How AdNova <em>scales</em> brands.
            </h1>
            <p className="mt-5 text-base text-body sm:text-lg">
              {CUSTOMERS.length} real workspaces · independently verified outcomes · no
              cherry-picked benchmarks.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="space-y-6">
            {CUSTOMERS.map((c) => (
              <article
                key={c.company + c.author}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="grid gap-px bg-border lg:grid-cols-[1fr_1.4fr]">
                  {/* Left : intro + metrics */}
                  <div className="bg-card p-7">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange/[0.12] text-base font-bold text-orange">
                        {c.initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink">{c.company}</h3>
                        <p className="text-xs text-muted">{c.industry}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <Metric label="Result" value={c.result} highlight />
                      <Metric label={c.metric2label} value={c.metric2} />
                      <Metric label={c.metric3label} value={c.metric3} />
                    </div>

                    {c.platforms.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {c.platforms.map((p) => (
                          <span
                            key={p}
                            className="rounded border border-border bg-white/[0.03] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-strong"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* Right : quote + story */}
                  <div className="bg-card p-7">
                    <blockquote className="text-base leading-relaxed text-body">
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                    <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
                      <img
                        src={c.authorPhoto}
                        alt={c.author}
                        className="h-10 w-10 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <div className="text-sm font-bold text-ink">{c.author}</div>
                        <div className="text-xs text-muted">{c.authorRole}</div>
                      </div>
                    </div>

                    {c.challenge || c.solution || c.results.length > 0 ? (
                      <div className="mt-6 space-y-4 border-t border-border/60 pt-5">
                        {c.challenge ? (
                          <Section title="Challenge" body={c.challenge} />
                        ) : null}
                        {c.solution ? (
                          <Section title="Solution" body={c.solution} />
                        ) : null}
                        {c.results.length > 0 ? (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                              Results
                            </div>
                            <ul className="mt-2 space-y-1 text-sm text-body">
                              {c.results.map((r) => (
                                <li key={r} className="flex gap-2">
                                  <span className="text-orange">·</span>
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}

function Metric({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div
        className={`text-2xl font-bold tracking-tighter tabular-nums ${highlight ? "text-orange" : "text-ink"}`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-strong">
        {label}
      </div>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
        {title}
      </div>
      <p className="mt-1 text-sm text-body">{body}</p>
    </div>
  );
}
