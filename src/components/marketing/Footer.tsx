import { Link } from "react-router-dom";
import { Logo } from "../ui/logo";
import { Container } from "../ui/container";
import { AppStoreBadge, GooglePlayBadge } from "../ui/AppBadges";

type Col = { title: string; links: { to: string; label: string }[] };

const COLS: Col[] = [
  {
    title: "Product",
    links: [
      { to: "/#features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      { to: "/customers", label: "Customers" },
      { to: "/vs-smartly", label: "vs Smartly" },
      { to: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/careers", label: "Careers" },
      { to: "/partners", label: "Partners" },
      { to: "/affiliate/apply", label: "Become an affiliate" },
      { to: "/press-kit", label: "Press kit" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/terms", label: "Terms" },
      { to: "/privacy", label: "Privacy" },
    ],
  },
];

const SOCIAL: { label: string; href: string; svg: React.ReactNode }[] = [
  {
    label: "X (Twitter)",
    href: "https://x.com/adnovaai",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/adnova-ai",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@adnovaai",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/adnova-ai",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-.99-.02-1.94-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Subtle orange glow accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,77,0,0.35) 50%, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #FF4D00, transparent 70%)" }}
      />

      <Container>
        {/* App download band — premium hero strip */}
        <div className="relative -mx-4 mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent px-6 py-8 sm:mx-0 sm:px-10 sm:py-10">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #FF4D00, transparent 70%)" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
                Mobile app
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tighter text-ink sm:text-3xl">
                AdNova in <em>your pocket</em>.
              </h3>
              <p className="mt-2 max-w-md text-sm text-body">
                Push notifications on every AI decision. Approve / reject from your home
                screen. Native iOS + Android, launching Q3 2026.
              </p>
            </div>
            <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto sm:gap-3">
              <AppStoreBadge soon className="flex-1 sm:flex-none" />
              <GooglePlayBadge soon className="flex-1 sm:flex-none" />
            </div>
          </div>
        </div>

        {/* Main grid : brand block stacks on top of mobile;
            the 3 nav columns share one row at every breakpoint. */}
        <div className="mt-14 flex flex-col gap-10 md:grid md:grid-cols-[1.6fr_repeat(3,1fr)] md:gap-12">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Autonomous advertising for modern brands. Built on Claude.
            </p>

            {/* Status pill + socials : single row on mobile + desktop */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3 sm:mt-6">
              <a
                href="https://status.adnova.ai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] px-3 text-xs text-emerald-400 transition-colors hover:border-emerald-500/40"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="whitespace-nowrap">All systems operational</span>
              </a>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-white/[0.02] text-muted-strong transition-all hover:-translate-y-0.5 hover:border-orange/40 hover:bg-orange/[0.06] hover:text-orange"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav columns : forced 3-col on mobile so Product / Company / Legal
              stay on a single horizontal row; flow into the parent grid on md+. */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 md:contents">
            {COLS.map((col) => (
              <FooterCol key={col.title} col={col} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
            <span>© 2026 AdNova AI. All rights reserved.</span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span>Made with care · Paris × San Francisco</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/login"
              className="rounded-lg px-2.5 py-1.5 text-xs text-muted-strong transition-colors hover:bg-white/[0.04] hover:text-ink"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 rounded-lg border border-orange/40 bg-orange/[0.08] px-2.5 py-1.5 text-xs font-medium text-orange transition-colors hover:bg-orange/[0.14]"
            >
              Get started <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>

      <div className="h-14" />
    </footer>
  );
}

function FooterCol({ col }: { col: Col }) {
  return (
    <div>
      <h5 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
        {col.title}
      </h5>
      <ul className="flex flex-col gap-3">
        {col.links.map((l) =>
          l.to.startsWith("/#") ? (
            <li key={l.to}>
              <a
                href={l.to}
                className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
                <span
                  aria-hidden
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ↗
                </span>
              </a>
            </li>
          ) : (
            <li key={l.to}>
              <Link
                to={l.to}
                className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
                <span
                  aria-hidden
                  className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
