// App Store + Google Play badges. SVG glyphs are public marks (CC0 / fair-use
// reproduction for store linking). Both badges link to a "coming soon" anchor
// for now since the native apps ship in a later phase.
import { useTranslation } from "react-i18next";

type BadgeProps = {
  className?: string;
  href?: string;
  soon?: boolean;
};

export function AppStoreBadge({ className = "", href, soon = false }: BadgeProps) {
  const { t } = useTranslation();
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank" as const, rel: "noreferrer" }
    : {};
  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-black px-2.5 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:shadow-glow sm:gap-2.5 sm:px-3.5 ${className}`}
      aria-label="Download on the App Store"
    >
      <svg viewBox="0 0 384 512" className="h-5 w-5 shrink-0 text-white sm:h-6 sm:w-6" fill="currentColor" aria-hidden>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <div className="flex min-w-0 flex-col items-start leading-none">
        <span className="text-[8px] font-medium uppercase tracking-wider text-white/70 sm:text-[9px]">
          {soon ? t("footer.mobileApp.comingSoon") : "Download on the"}
        </span>
        <span className="text-sm font-semibold text-white sm:text-base">App Store</span>
      </div>
    </Wrapper>
  );
}

export function GooglePlayBadge({ className = "", href, soon = false }: BadgeProps) {
  const { t } = useTranslation();
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank" as const, rel: "noreferrer" }
    : {};
  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-black px-2.5 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:shadow-glow sm:gap-2.5 sm:px-3.5 ${className}`}
      aria-label="Get it on Google Play"
    >
      <svg viewBox="0 0 512 512" className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" aria-hidden>
        <path
          fill="#00D2FF"
          d="m31.6 32.9 245 245-245 245c-12-5.6-19.6-17.7-19.6-31.6V64.5c0-13.9 7.6-26 19.6-31.6z"
        />
        <path
          fill="#FFCE00"
          d="m358.6 209.6 67.4 38.9c19.1 11 19.1 38.5 0 49.5l-67.4 38.9-81.1-81.5z"
        />
        <path
          fill="#FF3A44"
          d="M276.6 277.9 31.6 522.9c5.5 2.5 11.7 3.1 17.5 3.1 8.4 0 16.7-2.2 24.1-6.4l284.4-164.1z"
        />
        <path
          fill="#00F076"
          d="M357.6 156.5 73.2 -7.6c-15-8.6-33.6-7.5-47.4 2.6l250.8 250.8z"
        />
      </svg>
      <div className="flex min-w-0 flex-col items-start leading-none">
        <span className="text-[8px] font-medium uppercase tracking-wider text-white/70 sm:text-[9px]">
          {soon ? t("footer.mobileApp.comingSoon") : "Get it on"}
        </span>
        <span className="text-sm font-semibold text-white sm:text-base">Google Play</span>
      </div>
    </Wrapper>
  );
}
