import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "../ui/logo";
import { Container } from "../ui/container";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageToggle } from "../ui/LanguageToggle";

export function Nav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "/#features", label: t("nav.features") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/customers", label: t("nav.customers") },
    { href: "/vs-smartly", label: t("nav.vsSmartly") },
  ];

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

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle className="hidden sm:inline-flex" />
            <ThemeToggle className="hidden sm:inline-grid" />
            <Link
              to="/login"
              className="hidden text-sm text-muted-strong transition-colors hover:text-ink md:inline-block"
            >
              {t("nav.signIn")}
            </Link>
            <Link
              to="/register"
              className="inline-flex h-9 items-center gap-1 rounded-lg bg-orange px-4 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm hover:-translate-y-0.5 sm:px-5"
            >
              {t("nav.getStarted")} <span aria-hidden>→</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-white/[0.02] text-muted-strong transition-colors hover:border-border-strong hover:text-ink sm:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border py-4 sm:hidden">
            <nav className="flex flex-col gap-1">
              {LINKS.map((l) =>
                l.href.startsWith("/#") ? (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-body hover:bg-white/[0.04] hover:text-ink"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-body hover:bg-white/[0.04] hover:text-ink"
                  >
                    {l.label}
                  </Link>
                ),
              )}
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-body hover:bg-white/[0.04] hover:text-ink"
              >
                {t("nav.signIn")}
              </Link>
            </nav>
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
