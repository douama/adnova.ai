import { Quote, Star, TrendingUp } from "lucide-react";
import { Container } from "../ui/container";
import { TESTIMONIALS } from "../../data/testimonials";

export function Testimonials() {
  const featured = TESTIMONIALS[0]!;
  const rest = TESTIMONIALS.slice(1, 5);

  return (
    <section className="pb-14 pt-6 sm:pb-20 sm:pt-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Trusted by 2,412
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            <em>High-growth</em> brands.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* Featured testimonial */}
          <div className="glass glass-highlight relative overflow-hidden rounded-3xl p-8 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-25 blur-3xl"
              style={{ background: "radial-gradient(circle, #FF4D00, transparent 70%)" }}
            />
            <Quote
              className="h-8 w-8 text-orange opacity-70"
              strokeWidth={1.5}
            />
            <blockquote className="relative mt-5 text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>

            <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={featured.photo}
                  alt={featured.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full ring-2 ring-orange/30"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-bold text-ink">{featured.name}</div>
                  <div className="text-xs text-muted-strong">{featured.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-1.5 text-xs text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>
                  ROAS <strong className="font-bold">6.4×</strong> after 90 days
                </span>
              </div>
            </div>
          </div>

          {/* Secondary stack */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <StatCard
              big="$1.37M"
              label="Monthly revenue routed"
              sub="Through AI decisions in the last 30 days."
            />
            <StatCard
              big="42 hrs"
              label="Saved per marketer / month"
              sub="Median across 2,412 active brands."
            />
          </div>
        </div>

        {/* 4 mini cards */}
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((t) => (
            <div
              key={t.name}
              className="glass flex flex-col rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-0.5 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-body">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2">
                <img
                  src={t.photo}
                  alt={t.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-bold text-ink">{t.name}</div>
                  <div className="truncate text-[10px] text-muted-strong">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatCard({
  big,
  label,
  sub,
}: {
  big: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="glass glass-highlight flex flex-col rounded-2xl p-6">
      <div className="text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
        {big}
      </div>
      <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-orange">
        {label}
      </div>
      <p className="mt-auto pt-3 text-xs text-muted">{sub}</p>
    </div>
  );
}
