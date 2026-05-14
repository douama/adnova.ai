import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "../../lib/i18n";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = SUPPORTED_LANGS.find((l) => l.code === i18n.resolvedLanguage)
    ?? SUPPORTED_LANGS[0]!;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.language")}
        title={t("nav.language")}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-white/[0.02] px-2.5 text-xs font-medium text-muted-strong transition-colors hover:border-border-strong hover:text-ink"
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />
        <span className="uppercase tracking-wider">{current.code}</span>
      </button>
      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-card"
        >
          {SUPPORTED_LANGS.map((l) => {
            const active = l.code === current.code;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  void i18n.changeLanguage(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? "bg-orange/[0.08] text-orange"
                    : "text-body hover:bg-white/[0.04] hover:text-ink"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden className="text-base leading-none">
                    {l.flag}
                  </span>
                  {l.label}
                </span>
                {active ? <Check className="h-3.5 w-3.5" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
