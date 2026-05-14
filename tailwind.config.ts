import type { Config } from "tailwindcss";

// ─── AdNova design system (white + black + orange) ─────────────────────────
// Hard rule : only 3 hues (+ greys derived from white at lower opacity).
// CSS variables live in src/index.css and are surfaced as Tailwind classes
// here so `bg-bg`, `text-orange`, `border-border` work in JSX.

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Surfaces (black axis)
        bg: "var(--bg)",
        surface: "var(--surface)",
        card: "var(--card)",
        "card-hover": "var(--card2)",
        // Borders
        border: "var(--border)",
        "border-strong": "var(--border2)",
        // Brand
        orange: "var(--orange)",
        "orange-hover": "var(--orange2)",
        // Text on dark
        ink: "var(--white)", // pure white, headings
        body: "var(--text)", // body text grey
        muted: "var(--muted)",
        "muted-strong": "var(--muted2)",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        "tighter-1": "-0.025em",
        crisp: "-0.005em",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "pulse-slow": "pulse 3s infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        glow: "0 12px 36px rgba(255,77,0,0.4)",
        "glow-sm": "0 6px 24px rgba(255,77,0,0.35)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 32px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
} satisfies Config;
