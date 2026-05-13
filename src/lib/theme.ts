/**
 * Shared design tokens + reusable HTML fragments for AdNova AI public pages.
 *
 * Color system — 3 brand colors only:
 *   #08080F  --bg       background
 *   #0A0A0A  ink        text (inverse: #F5F5FF on dark)
 *   #FF4D00  --orange   accent (CTAs, key numbers, "most popular", links)
 *
 * Typography:
 *   Geist     — variable sans (300..900), body + display
 *   Fraunces  — variable serif italic opsz 144, for editorial accents
 *
 * Usage:
 *   return `<!DOCTYPE html>
 *   <html lang="en">
 *   <head>
 *     ${themeMeta({ title: '...', description: '...', path: '/login' })}
 *     ${themeFontLinks()}
 *     <style>${themeBaseCss()} /* page-specific css * / </style>
 *   </head>
 *   <body>
 *     ${themeNav('/login')}
 *     <main>...</main>
 *     ${themeFooter()}
 *   </body>
 *   </html>`
 */

// ─── 3-color palette (white / black / orange) — May 2026 ──────────────────
// All semantic colors collapse onto these:
//   • Positive (was green)  → orange    (brand)
//   • Warning (was gold)    → orange2   (brand light)
//   • Negative (was red)    → muted     (grey — convey kill via icon/strike)
//   • Info (was blue)       → muted2    (lighter grey)
// Greys are derived from white at 0.3-0.7 opacity on black — still part of
// the white/black axis, just at lower intensity.
export const THEME = {
  bg: '#000000',         // pure black background
  surface: '#0A0A0A',    // surface slightly lifted from bg
  card: '#111111',       // card surface
  card2: '#1A1A1A',      // hover / inset
  border: 'rgba(255,255,255,0.08)',
  border2: 'rgba(255,255,255,0.14)',
  orange: '#FF4D00',     // brand accent (sole hue)
  orange2: '#FF6B2B',    // lighter orange — for warnings & hover states
  white: '#FFFFFF',      // pure white
  muted: '#7A7A7A',      // grey — neutral / negative / "killed" semantics
  muted2: '#A8A8A8',     // lighter grey — info / secondary text
  text: '#D4D4D4',       // body text on black
  green: '#FF4D00',      // alias → orange (back-compat for legacy --green)
  gold: '#FF6B2B',       // alias → orange2 (back-compat for legacy --gold)
} as const

export function themeMeta(opts: {
  title: string
  description?: string
  path?: string
  ogImage?: string
}): string {
  const desc = opts.description ?? 'Autonomous advertising for modern brands. Built on Claude.'
  const url = opts.path ? `https://adnova.ai${opts.path}` : 'https://adnova.ai/'
  return `
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
  <meta name="theme-color" content="#FF4D00"/>
  <title>${opts.title} — AdNova AI</title>
  <meta name="description" content="${desc}"/>
  <meta property="og:title" content="${opts.title} — AdNova AI"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="${url}"/>
  ${opts.ogImage ? `<meta property="og:image" content="${opts.ogImage}"/>` : ''}
  <link rel="icon" href="/favicon.svg"/>
  <link rel="canonical" href="${url}"/>`
}

export function themeFontLinks(): string {
  return `
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..900&family=Fraunces:ital,opsz,wght@1,144,300..500&display=swap" rel="stylesheet"/>`
}

/**
 * CSS reset + variables + base typography + a minimal component library
 * (buttons, inputs, glass cards). Inject as the first block in a page <style>.
 */
export function themeBaseCss(): string {
  return `
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --bg:${THEME.bg};--surface:${THEME.surface};--card:${THEME.card};--card2:${THEME.card2};
    --border:${THEME.border};--border2:${THEME.border2};
    --orange:${THEME.orange};--orange2:${THEME.orange2};
    --white:${THEME.white};--muted:${THEME.muted};--muted2:${THEME.muted2};--text:${THEME.text};
    --green:${THEME.green};--gold:${THEME.gold};
  }
  html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
  body{font-family:'Geist',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--white);overflow-x:hidden;font-feature-settings:"ss01","ss03","cv11";font-optical-sizing:auto;letter-spacing:-0.005em;line-height:1.55;min-height:100vh}
  h1,h2,h3,h4,h5{font-family:'Geist',system-ui,sans-serif;font-weight:700;letter-spacing:-0.025em;line-height:1.05}
  em{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;font-optical-sizing:auto;font-variation-settings:"opsz" 144;letter-spacing:-0.025em;color:var(--orange)}
  a{color:inherit;text-decoration:none}
  img{max-width:100%;display:block}
  button{font-family:inherit;cursor:pointer;border:none;background:none}
  input,textarea,select{font-family:inherit;color:inherit}
  ::selection{background:var(--orange);color:#fff}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation:none !important;transition:none !important}}

  /* ── Reusable components ───────────────────────────────────────── */
  .logo{font-weight:800;font-size:20px;color:var(--white);letter-spacing:-0.03em;text-decoration:none}
  .logo span{color:var(--orange)}
  .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 28px;border-radius:10px;font-size:15px;font-weight:700;background:var(--orange);color:#fff;transition:all 0.25s;text-decoration:none}
  .btn-primary:hover{background:var(--orange2);box-shadow:0 12px 36px rgba(255,77,0,0.4);transform:translateY(-1px)}
  .btn-primary:disabled{opacity:0.55;cursor:not-allowed;transform:none;box-shadow:none}
  .btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;border-radius:10px;font-size:15px;font-weight:500;border:1px solid var(--border2);background:rgba(255,255,255,0.03);color:var(--text);transition:all 0.25s;text-decoration:none}
  .btn-ghost:hover{border-color:rgba(255,255,255,0.25);color:var(--white);background:rgba(255,255,255,0.06)}
  .field{display:flex;flex-direction:column;gap:7px}
  .field label{font-size:13px;font-weight:500;color:var(--muted2);letter-spacing:-0.005em}
  .field input{width:100%;padding:12px 14px;border-radius:10px;background:var(--card);border:1px solid var(--border);color:var(--white);font-size:14px;letter-spacing:-0.005em;transition:all 0.2s}
  .field input::placeholder{color:var(--muted)}
  .field input:focus{outline:none;border-color:var(--orange);background:var(--card2);box-shadow:0 0 0 3px rgba(255,77,0,0.12)}
  .field-hint{font-size:12px;color:var(--muted)}
  .alert{padding:11px 14px;border-radius:10px;font-size:13px;line-height:1.5;letter-spacing:-0.005em;display:flex;align-items:flex-start;gap:8px}
  .alert-error{background:rgba(122,122,122,0.08);border:1px solid rgba(122,122,122,0.2);color:#A8A8A8}
  .alert-info{background:rgba(255,77,0,0.06);border:1px solid rgba(255,77,0,0.2);color:var(--orange2)}`
}

/**
 * Public nav (sticky, AdNova. logo + 4 links + Sign in + Start free CTA).
 * Pass the current path so the right link gets `.active` styling.
 */
export function themeNav(activePath = '/'): string {
  const isActive = (path: string) => activePath === path || activePath.startsWith(path + '/')
  const cls = (path: string) => isActive(path) ? ' active' : ''
  return `
  <header class="th-nav" id="thNav">
    <nav>
      <a href="/" class="logo">AdNova<span>.</span></a>
      <div class="th-nav-links">
        <a href="/#features"${cls('/#features')}>Features</a>
        <a href="/#hiw"${cls('/#hiw')}>How it works</a>
        <a href="/#pricing"${cls('/#pricing')}>Pricing</a>
        <a href="/customers"${cls('/customers')}>Customers</a>
      </div>
      <div class="th-nav-right">
        <a href="/login" class="th-nav-link${cls('/login')}">Sign in</a>
        <a href="/register" class="th-nav-cta">Start free →</a>
      </div>
    </nav>
  </header>
  <style>
  .th-nav{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(8,8,15,0.8);backdrop-filter:blur(28px);border-bottom:1px solid var(--border)}
  .th-nav nav{display:flex;align-items:center;justify-content:space-between;padding:0 52px;height:66px;max-width:1400px;margin:0 auto}
  .th-nav-links{display:flex;gap:34px}
  .th-nav-links a{color:var(--muted2);font-size:14px;transition:color 0.2s}
  .th-nav-links a:hover,.th-nav-links a.active{color:var(--white)}
  .th-nav-right{display:flex;gap:12px;align-items:center}
  .th-nav-link{padding:8px 14px;color:var(--muted2);font-size:14px;transition:color 0.2s}
  .th-nav-link:hover,.th-nav-link.active{color:var(--white)}
  .th-nav-cta{padding:9px 22px;border-radius:8px;font-size:14px;font-weight:700;background:var(--orange);color:#fff;transition:all 0.25s}
  .th-nav-cta:hover{background:var(--orange2);box-shadow:0 6px 24px rgba(255,77,0,0.35);transform:translateY(-1px)}
  @media(max-width:768px){.th-nav nav{padding:0 20px}.th-nav-links{display:none}}
  </style>`
}

export function themeFooter(): string {
  return `
  <footer class="th-ft">
    <div class="th-ft-top">
      <div class="th-ft-brand">
        <a href="/" class="logo">AdNova<span>.</span></a>
        <p>Autonomous advertising for modern brands. Built on Claude.</p>
      </div>
      <div class="th-ft-col"><h5>Product</h5><ul><li><a href="/#features">Features</a></li><li><a href="/#pricing">Pricing</a></li><li><a href="/customers">Customers</a></li><li><a href="/blog">Blog</a></li></ul></div>
      <div class="th-ft-col"><h5>Company</h5><ul><li><a href="/about">About</a></li><li><a href="/careers">Careers</a></li><li><a href="/partners">Partenaires</a></li><li><a href="/press-kit">Press Kit</a></li></ul></div>
      <div class="th-ft-col"><h5>Legal</h5><ul><li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li></ul></div>
    </div>
    <div class="th-ft-bottom">
      <p>© 2026 AdNova AI. All rights reserved.</p>
      <div class="th-ft-links"><a href="/login">Sign in</a><a href="/register">Get started</a></div>
    </div>
  </footer>
  <style>
  .th-ft{padding:56px 52px 32px;border-top:1px solid var(--border)}
  .th-ft-top{display:grid;grid-template-columns:1.6fr repeat(3,1fr);gap:48px;max-width:1200px;margin:0 auto 40px}
  .th-ft-brand p{font-size:13px;color:var(--muted);line-height:1.6;margin-top:14px;max-width:260px}
  .th-ft-col h5{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:18px;color:var(--white)}
  .th-ft-col ul{list-style:none;display:flex;flex-direction:column;gap:11px}
  .th-ft-col a{font-size:13px;color:var(--muted);transition:color 0.2s}
  .th-ft-col a:hover{color:var(--white)}
  .th-ft-bottom{max-width:1200px;margin:0 auto;border-top:1px solid var(--border);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
  .th-ft-bottom p{font-size:12px;color:var(--muted)}
  .th-ft-links{display:flex;gap:24px}
  .th-ft-links a{font-size:12px;color:var(--muted);transition:color 0.2s}
  .th-ft-links a:hover{color:var(--white)}
  @media(max-width:1100px){.th-ft-top{grid-template-columns:1fr 1fr}}
  @media(max-width:768px){.th-ft{padding:48px 24px 28px}.th-ft-top{grid-template-columns:1fr}}
  </style>`
}
