import { Container } from "../ui/container";
import { TESTIMONIALS } from "../../data/testimonials";

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Trusted by 2,412
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            <em>high-growth</em> brands.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 6).map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-border-strong"
            >
              <div className="text-sm tracking-widest text-orange">★★★★★</div>
              <p className="mt-3 text-sm leading-relaxed text-body">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-bold text-ink">{t.name}</div>
                  <div className="text-xs text-muted-strong">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
