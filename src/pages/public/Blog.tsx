import { Link } from "react-router-dom";
import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";
import { BLOG_ARTICLES } from "../../data/blog";

export function BlogPage() {
  return (
    <>
      <section className="pt-20 pb-10 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Blog</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink sm:text-6xl">
              Field notes from the <em>ad ops</em> frontier.
            </h1>
            <p className="mt-5 text-base text-body sm:text-lg">
              Deep-dives on autonomous bidding, creative testing, multi-platform attribution,
              and what we learn running thousands of campaigns with AdNova AI.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_ARTICLES.map((a) => (
              <Link
                key={a.slug}
                to={`/blog/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border-strong hover:-translate-y-0.5"
              >
                <div className="aspect-[16/9] overflow-hidden bg-surface">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-orange">
                    <span>{a.category}</span>
                    <span className="text-muted">·</span>
                    <span className="text-muted-strong">{a.readTime}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold leading-snug tracking-tighter text-ink">
                    {a.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{a.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted">
                    <span>{a.author}</span>
                    <span>
                      {new Date(a.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
