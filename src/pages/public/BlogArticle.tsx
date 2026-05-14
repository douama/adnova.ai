import { Link, useParams, Navigate } from "react-router-dom";
import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";
import { BLOG_ARTICLES } from "../../data/blog";

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <section className="pt-20 pb-12 sm:pt-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Link
                to="/blog"
                className="text-xs text-muted-strong transition-colors hover:text-ink"
              >
                ← All articles
              </Link>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-orange">
                <span>{article.category}</span>
                <span className="text-muted">·</span>
                <span className="text-muted-strong">{article.readTime}</span>
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tighter text-ink sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 text-lg text-body">{article.excerpt}</p>
              <div className="mt-6 flex items-center gap-3 text-sm">
                <span className="text-ink">{article.author}</span>
                <span className="text-muted">·</span>
                <span className="text-muted">{article.authorRole}</span>
                <span className="text-muted">·</span>
                <span className="text-muted">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Container>
        </section>

        {article.image ? (
          <section className="pb-10">
            <Container>
              <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-auto w-full"
                  loading="eager"
                />
              </div>
            </Container>
          </section>
        ) : null}

        <section className="pb-16">
          <Container>
            <div
              className="prose-dark mx-auto max-w-3xl text-base leading-relaxed text-body
                [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tighter [&_h2]:text-ink
                [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink
                [&_p]:mt-4
                [&_a]:text-orange [&_a:hover]:underline
                [&_strong]:text-ink
                [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
                [&_li]:marker:text-orange
                [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-orange [&_blockquote]:pl-5 [&_blockquote]:text-ink [&_blockquote]:italic
                [&_code]:rounded [&_code]:bg-surface [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-ink"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Container>
        </section>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-border py-16">
          <Container>
            <h2 className="text-2xl font-bold tracking-tighter text-ink">
              Keep <em>reading</em>.
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-border-strong hover:-translate-y-0.5"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-orange">
                    {a.category}
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug tracking-tight text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-body">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTA />
    </>
  );
}
