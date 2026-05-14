import { Link } from "react-router-dom";
import { Logo } from "../ui/logo";
import { Container } from "../ui/container";

const COLS = [
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

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Autonomous advertising for modern brands. Built on Claude.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h5 className="mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) =>
                  l.to.startsWith("/#") ? (
                    <li key={l.to}>
                      <a
                        href={l.to}
                        className="text-sm text-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-xs text-muted">© 2026 AdNova AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/login" className="text-xs text-muted transition-colors hover:text-ink">
              Sign in
            </Link>
            <Link to="/register" className="text-xs text-muted transition-colors hover:text-ink">
              Get started
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
