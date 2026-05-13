// ─── Shared layout helper for public pages ─────────────────────────────────
// All 6 marketing pages (about, blog, careers, press-kit, terms, privacy) call
// `publicHead/publicNav/publicFooter` — this single file controls their design.
//
// 2026-05-13: rewritten to match the landing page design system:
//   • Geist (variable, 300-900) + Fraunces (italic opsz 144) — no more Inter/Space Grotesk
//   • Palette: #08080F bg + #FF4D00 orange accent (no more indigo/purple/pink)
//   • Class aliases preserved (.glass, .glow-text, .btn-primary, etc.) so existing
//     page bodies render in the new style without needing edits.
//   • Tailwind CDN kept (existing pages use utility classes heavily) but `brand-*`
//     colors remapped to the orange ramp.

import { themeMeta, themeFontLinks, themeBaseCss, themeNav, themeFooter } from './theme'

export function publicHead(opts: {
  title: string
  description: string
  canonical: string
  lang?: string
}): string {
  const { title, description, canonical, lang = 'en' } = opts
  const now = new Date().toISOString().split('T')[0]

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${themeMeta({ title, description, path: canonical })}
${themeFontLinks()}
<meta name="robots" content="index, follow"/>
<link rel="manifest" href="/manifest.json"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@AdNovaAI"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${description}"/>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"${title}","description":"${description}","url":"https://adnova.ai${canonical}","dateModified":"${now}","isPartOf":{"@type":"WebSite","name":"AdNova AI","url":"https://adnova.ai/"}}</script>
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="anonymous"/>
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/></noscript>
<script>window.tailwind={config:{darkMode:'class',theme:{extend:{fontFamily:{sans:['Geist','system-ui','sans-serif'],display:['Geist','system-ui','sans-serif']},colors:{brand:{50:'#FFF4ED',100:'#FFE6D5',200:'#FFCBA8',300:'#FFA876',400:'#FF8042',500:'#FF4D00',600:'#E64500',700:'#B83700',800:'#8A2A00',900:'#5C1C00'},neon:{purple:'#FF4D00',blue:'#FF6B2B',pink:'#FF4D00',cyan:'#FF4D00',green:'#FF4D00'}}}}}}</script>
<script src="https://cdn.tailwindcss.com" defer></script>
<style>
${themeBaseCss()}
${MARKETING_EXTRA_CSS}
</style>
</head>`
}

// ─── Legacy class aliases — let existing page bodies render with the new
// palette without needing per-page edits. ──────────────────────────────────
const MARKETING_EXTRA_CSS = `
/* ── Body / background — matches landing.ts hero mesh feel ── */
body{position:relative}
body::after{content:'';position:fixed;inset:0;z-index:-2;background:radial-gradient(ellipse 80% 65% at 8% -5%,rgba(255,77,0,0.10) 0%,transparent 58%),radial-gradient(ellipse 65% 55% at 92% 28%,rgba(255,77,0,0.06) 0%,transparent 52%),radial-gradient(ellipse 55% 45% at 50% 95%,rgba(255,77,0,0.04) 0%,transparent 48%),var(--bg);pointer-events:none}

/* ── Glass cards — keep names, restyle to flat dark + subtle border ── */
.glass{background:rgba(255,255,255,0.022);backdrop-filter:saturate(1.4) blur(14px);-webkit-backdrop-filter:saturate(1.4) blur(14px);border:1px solid var(--border);position:relative;color:var(--white)}
.glass-card{background:var(--surface);border:1px solid var(--border);transition:border-color 0.3s,transform 0.3s;position:relative;overflow:hidden;color:var(--white)}
.glass-card:hover{border-color:rgba(255,77,0,0.25);transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,0.45)}
.glass-neo{background:var(--surface);border:1px solid var(--border2);position:relative;overflow:hidden;color:var(--white)}

/* ── Glow text → orange gradient (single tone) ── */
.glow-text,.glow-text-2,.glow-text-3{background:linear-gradient(135deg,var(--orange) 0%,var(--orange2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* ── Buttons (keep names; restyle to orange accent) ── */
.btn-primary{background:var(--orange);color:#fff;font-weight:700;transition:all 0.25s;letter-spacing:-0.005em}
.btn-primary:hover{background:var(--orange2);transform:translateY(-1px);box-shadow:0 12px 32px rgba(255,77,0,0.4)}
.btn-ghost{background:rgba(255,255,255,0.03);border:1px solid var(--border2);color:var(--text);transition:all 0.25s}
.btn-ghost:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.25);color:var(--white)}

/* ── Nav blur (legacy class — themeNav supersedes when called) ── */
.nav-blur{background:rgba(8,8,15,0.85);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border-bottom:1px solid var(--border)}

/* ── Section label (used by sec-head in marketing pages) ── */
.section-label{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:100px;background:rgba(255,77,0,0.06);border:1px solid rgba(255,77,0,0.25);font-size:11px;font-weight:600;color:var(--orange2);text-transform:uppercase;letter-spacing:0.1em}

/* ── Decorative dots / dividers ── */
.ai-dot{width:7px;height:7px;border-radius:50%;background:var(--green);display:inline-block;box-shadow:0 0 12px rgba(255,77,0,0.5)}
.divider{height:1px;background:linear-gradient(90deg,transparent,var(--border2),transparent)}
.neon-line{height:1px;background:linear-gradient(90deg,transparent 0%,var(--orange) 50%,transparent 100%)}

/* ── Fade-up reveal animation ── */
.fade-up{opacity:0;transform:translateY(24px);transition:opacity 0.85s cubic-bezier(.25,.8,.25,1),transform 0.85s cubic-bezier(.25,.8,.25,1)}
.fade-up.visible{opacity:1;transform:translateY(0)}
.fade-in{opacity:0;transition:opacity 0.7s ease}
.fade-in.visible{opacity:1}

/* ── Nav link (used by legacy pages that don't switch to themeNav yet) ── */
.nav-link{position:relative;transition:color 0.25s ease;color:var(--muted2)}
.nav-link::after{content:'';position:absolute;bottom:-4px;left:50%;right:50%;height:1.5px;background:var(--orange);transition:left 0.35s ease,right 0.35s ease;border-radius:2px}
.nav-link:hover::after,.nav-link.active::after{left:0;right:0}
.nav-link:hover,.nav-link.active{color:var(--white)}

/* ── Blink animation (live indicators) ── */
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
.blink{animation:blink 1.8s ease infinite}

/* ── Mobile nav slide ── */
#mobile-nav{transition:all 0.35s cubic-bezier(0.25,0.8,0.25,1);max-height:0;overflow:hidden;opacity:0}
#mobile-nav.open{max-height:600px;opacity:1}

/* ── Prose content (terms, privacy, blog articles) ── */
.prose-content h2{font-size:1.5rem;font-weight:700;color:var(--white);margin:2.5rem 0 1rem;letter-spacing:-0.025em;border-bottom:1px solid var(--border);padding-bottom:0.75rem}
.prose-content h3{font-size:1.1rem;font-weight:700;color:var(--white);margin:1.75rem 0 0.6rem;letter-spacing:-0.02em}
.prose-content p{color:var(--muted2);line-height:1.75;margin-bottom:1rem;font-size:0.95rem;letter-spacing:-0.005em}
.prose-content ul{list-style:none;margin:0.75rem 0 1rem 0;padding:0}
.prose-content ul li{color:var(--muted2);font-size:0.9rem;line-height:1.75;padding:0.2rem 0 0.2rem 1.5rem;position:relative}
.prose-content ul li::before{content:'›';position:absolute;left:0;color:var(--orange);font-weight:700}
.prose-content a{color:var(--orange2);text-decoration:underline;text-underline-offset:3px;transition:color 0.2s}
.prose-content a:hover{color:var(--orange)}
.prose-content strong{color:var(--white);font-weight:600}

/* ── TOC link (used by legal pages sidebar) ── */
.toc-link{display:block;padding:0.35rem 0.75rem;border-radius:0.5rem;font-size:0.82rem;color:var(--muted);transition:all 0.2s ease;border-left:2px solid transparent;letter-spacing:-0.005em}
.toc-link:hover,.toc-link.active{color:var(--white);background:rgba(255,77,0,0.07);border-left-color:var(--orange)}

/* ── Gradient backgrounds (legacy from-brand-* utility classes via Tailwind) ── */
/* Tailwind CDN reads brand-500 → #FF4D00 via the config above, so existing  */
/* from-brand-500 / to-brand-600 utility classes pick up orange naturally. */

/* ── Scrollbar ── */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,77,0,0.35);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,77,0,0.65)}
`

// Expose SHARED_CSS for any legacy page that imports it directly (kept for
// backward compatibility; new code should use themeBaseCss + MARKETING_EXTRA_CSS).
export const SHARED_CSS = `<style>${themeBaseCss()}${MARKETING_EXTRA_CSS}</style>`

/**
 * Public nav — delegates to themeNav. Marketing pages call publicNav('about')
 * etc.; we map the active key to a path so themeNav highlights the right link.
 */
export function publicNav(active = ''): string {
  const map: Record<string, string> = {
    about: '/about',
    blog: '/blog',
    customers: '/customers',
    careers: '/careers',
    'press-kit': '/press-kit',
    pricing: '/#pricing',
    terms: '/terms',
    privacy: '/privacy',
  }
  return themeNav(map[active] ?? '/')
}

export function publicFooter(): string {
  return themeFooter()
}
