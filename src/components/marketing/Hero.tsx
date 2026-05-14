import { Link } from "react-router-dom";
import { Container } from "../ui/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Orange glow blob */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #FF4D00, transparent)" }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-muted-strong sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
            <span className="whitespace-nowrap">Live · 2,412 brands scaling on AdNova</span>
          </div>

          <h1 className="mt-5 text-[clamp(1.5rem,6.5vw,2.5rem)] font-bold leading-[1.1] tracking-tighter text-ink sm:mt-7 sm:text-6xl sm:leading-[1.05] md:text-7xl">
            <span className="whitespace-nowrap">Your acquisition lead,</span>
            <br />
            <em>in an API</em>.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body sm:mt-7 sm:text-lg md:text-xl">
            AdNova runs your campaigns across 9 platforms, generates creatives, optimizes
            spend and writes reports — while you sleep.{" "}
            <span className="text-ink font-medium">Average ROAS: 4.82×</span>.
          </p>

          <div className="mt-8 flex flex-row items-stretch justify-center gap-2 sm:mt-10 sm:gap-3">
            <Link
              to="/register"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-4 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5 sm:flex-none sm:px-8"
            >
              Start free trial <span aria-hidden>→</span>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border-strong bg-white/[0.03] px-4 text-sm font-medium text-body transition-all hover:border-white/25 hover:text-ink hover:bg-white/[0.06] sm:flex-none sm:px-7"
            >
              See how it works
            </a>
          </div>

          <p className="mt-6 text-xs text-muted">
            14-day free trial · No credit card · Cancel anytime
          </p>
        </div>
      </Container>
    </section>
  );
}
