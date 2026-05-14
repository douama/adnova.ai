import { Link } from "react-router-dom";
import { Container } from "../ui/container";

export function CTA() {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(closest-side at 50% 0%, rgba(255,77,0,0.6), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
              Ready to let AI <em>run your ads</em>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-body">
              Join 2,400+ brands shaving manual campaign work, spending smarter and scaling faster
              — powered by Claude.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange px-8 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5"
              >
                Start free trial <span aria-hidden>→</span>
              </Link>
              <Link
                to="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-white/[0.03] px-7 text-sm font-medium text-body transition-all hover:border-white/25 hover:text-ink hover:bg-white/[0.06]"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted">
              14-day free trial · No credit card · Cancel anytime
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
