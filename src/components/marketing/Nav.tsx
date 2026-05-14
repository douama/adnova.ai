import { Link, NavLink } from "react-router-dom";
import { Logo } from "../ui/logo";
import { Container } from "../ui/container";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/customers", label: "Customers" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-2xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden gap-8 md:flex">
            {LINKS.map((l) =>
              l.href.startsWith("/#") ? (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted-strong transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              ) : (
                <NavLink
                  key={l.href}
                  to={l.href}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${
                      isActive ? "text-ink" : "text-muted-strong hover:text-ink"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-sm text-muted-strong transition-colors hover:text-ink sm:inline-block"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex h-9 items-center gap-1 rounded-lg bg-orange px-5 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm hover:-translate-y-0.5"
            >
              Start free <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
