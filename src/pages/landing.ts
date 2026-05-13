import type { Context } from 'hono'

// ─── Shared plan definitions (source of truth, also imported by admin) ─────
// Pricing model: Starter $49 / Pro $149 / Agency $499 / Enterprise custom.
// `adSpend`, `color`, `colorName` are kept for admin/pages/plans.ts backward-compat.
export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    period: 'month',
    color: '#0A0A0A',
    colorName: 'ink',
    popular: false,
    cta: 'Start free trial',
    summary: '3 ad accounts · 20 creatives/mo',
    adSpend: '$5K',
    campaigns: 10,
    platforms: 2,
    users: 2,
    creatives: 20,
    adAccounts: 3,
    features: [
      '3 connected ad accounts',
      '20 AI creatives / month',
      '2 platforms (Meta + Google)',
      'Basic analytics dashboard',
      'Standard AI optimization',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 149,
    period: 'month',
    color: '#FF4D00',
    colorName: 'signal',
    popular: true,
    cta: 'Start free trial',
    summary: '15 ad accounts · 100 creatives/mo',
    adSpend: '$50K',
    campaigns: 50,
    platforms: 9,
    users: 10,
    creatives: 100,
    adAccounts: 15,
    features: [
      '15 connected ad accounts',
      '100 AI creatives / month',
      'All 9 platforms',
      'Full AI engine (UGC video incl.)',
      'A/B testing automation',
      'Lookalike audience builder',
      'Advanced analytics + reports',
      'Priority support (4h)',
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 499,
    period: 'month',
    color: '#0A0A0A',
    colorName: 'ink',
    popular: false,
    cta: 'Start free trial',
    summary: 'Unlimited · White-label · API',
    adSpend: 'Unlimited',
    campaigns: 999,
    platforms: 9,
    users: 999,
    creatives: 999,
    adAccounts: 999,
    features: [
      'Unlimited ad accounts',
      'Unlimited AI creatives',
      'All platforms + custom integrations',
      'Unlimited team members',
      'White-label solution',
      'Private API access',
      'Dedicated CSM + custom reports',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    period: '',
    color: '#0A0A0A',
    colorName: 'ink',
    popular: false,
    cta: 'Contact sales',
    summary: 'SLA · Dedicated · Custom agents',
    adSpend: 'Custom',
    campaigns: 9999,
    platforms: 9,
    users: 9999,
    creatives: 9999,
    adAccounts: 9999,
    features: [
      'Custom volume + 99.9% SLA',
      'Custom AI agents on your data',
      'Dedicated support team',
      'SSO + advanced security',
      'On-premise deployment option',
      'Quarterly business reviews',
    ],
  },
]

// ─── Testimonials data + marquee renderer ─────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "AdNova went from zero to managing $2M of our monthly Meta spend in two weeks. ROAS jumped from 2.8× to 5.1× in the first month. I haven't opened Ads Manager since.",
    name: 'Sarah Lin',
    role: 'Head of Growth, Lemonade',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    quote: "The UGC generator alone saved us $40K in production costs last quarter. Our TikTok CPM dropped 42% and conversion rate doubled. This is the future of performance marketing.",
    name: 'Marcus Keller',
    role: 'CMO, Glossier',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    quote: "We manage 38 client accounts with a team of 3. AdNova handles the optimization — we focus on strategy. Revenue per head tripled in 6 months. Absolute game changer.",
    name: 'Amara Diallo',
    role: 'Founder, Waveform Agency',
    photo: 'https://randomuser.me/api/portraits/women/27.jpg',
  },
  {
    quote: "We cut Meta CAC by 47% in three months. The auto-budget reallocation alone paid for AdNova's annual contract in the first six weeks. Pricing is almost embarrassing.",
    name: 'Hiroshi Tanaka',
    role: 'Performance Marketing Lead, Notion',
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    quote: "What used to take two days — pulling reports, reconciling platforms, writing summaries — now lands in my inbox every Monday at 8am. Done. Better than what we used to write.",
    name: 'Priya Sharma',
    role: 'Director of Acquisition, Allbirds',
    photo: 'https://randomuser.me/api/portraits/women/86.jpg',
  },
  {
    quote: "Tried four other platforms before AdNova. This is the only one where the AI actually feels like a team member, not a feature. ROAS up 38%, headcount unchanged.",
    name: 'Daniel Costa',
    role: 'CEO, Patreon',
    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
]

function testimonialsMarqueeHtml(): string {
  const cardHtml = (t: typeof TESTIMONIALS[number]) => `
    <article class="testi-card">
      <div class="t-stars">★★★★★</div>
      <div class="t-quote">“${t.quote}”</div>
      <div class="t-who">
        <img class="t-photo" src="${t.photo}" alt="${t.name}" width="48" height="48" loading="lazy" decoding="async"/>
        <div>
          <div class="t-n">${t.name}</div>
          <div class="t-r">${t.role}</div>
        </div>
      </div>
    </article>`
  // Duplicate the set so the marquee loops seamlessly (translate -50%).
  const set = TESTIMONIALS.map(cardHtml).join('')
  return set + set
}

// ─── Pricing cards rendered from PLANS (keeps landing ↔ admin in sync) ─────
function pricingCardsHtml(): string {
  return PLANS.map((p, i) => {
    const rd = i > 0 ? ` rd${i}` : ''
    const featured = p.popular
    const cardCls = featured ? 'pr-card feat reveal' : 'pr-card reveal'
    const btnCls = featured ? 'pr-btn prim' : 'pr-btn'
    const badge = featured ? '<div class="pr-badge">Most Popular</div>' : ''
    const ctaHref = p.cta === 'Contact sales' ? '/about' : '/register'

    // Annual = 20% off the monthly rate, shown as the per-month equivalent.
    const monthly = p.price
    const annual = monthly ? Math.round(monthly * 0.8) : 0
    const yearlyTotal = annual * 12

    const priceBlock = monthly
      ? `<div class="pr-row">
           <span class="pr-dollar">$</span>
           <span class="pr-amount" data-monthly="${monthly}" data-annual="${annual}">${monthly}</span>
           <span class="pr-per">/mo</span>
         </div>
         <div class="pr-billed" data-monthly-label="Billed monthly" data-annual-label="$${yearlyTotal}/yr · billed annually">Billed monthly</div>`
      : `<div style="margin-bottom:18px"><span style="font-family:'Geist',system-ui,sans-serif;font-size:36px;font-weight:800;letter-spacing:-0.03em;color:var(--white)">Let's talk</span></div>
         <div class="pr-billed">Custom contract terms</div>`

    const features = p.features.map(f => `<li><div class="pfc">✓</div>${f}</li>`).join('')

    const buttonLabel = p.cta === 'Contact sales' ? 'Contact sales →' : 'Start free trial'

    return `
      <div class="${cardCls}${rd}">
        ${badge}
        <div class="pr-tier">${p.name}</div>
        ${priceBlock}
        <div class="pr-desc">${p.summary ?? ''}</div>
        <div class="pr-div"></div>
        <ul class="pr-feats">${features}</ul>
        <a href="${ctaHref}" style="text-decoration:none;display:block"><button class="${btnCls}">${buttonLabel}</button></a>
      </div>`
  }).join('')
}

// ─── "Beyond Attribution" comparison row helper ────────────────────────────
function beyondRow(label: string, legacy: boolean, adnova: boolean, legacyNote = '', adnovaNote = ''): string {
  const yes = '<span class="bt-yes">✓</span>'
  const no  = '<span class="bt-no">—</span>'
  const legacyCell = legacy
    ? `${yes}${legacyNote ? `<span class="bt-note">${legacyNote}</span>` : ''}`
    : `${no}${legacyNote ? `<span class="bt-note bt-note-dim">${legacyNote}</span>` : ''}`
  const adnovaCell = adnova
    ? `${yes}${adnovaNote ? `<span class="bt-note bt-note-on">${adnovaNote}</span>` : ''}`
    : no
  return `<div class="bt-row">
    <div class="bt-feat">${label}</div>
    <div class="bt-stack">${legacyCell}</div>
    <div class="bt-adnova">${adnovaCell}</div>
  </div>`
}

// ─── Full page ─────────────────────────────────────────────────────────────
function pageHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>AdNova AI — Autonomous advertising, real results</title>
<meta name="description" content="AdNova AI runs your campaigns across 9 platforms — generates creatives, optimizes spend, and writes reports while you sleep. 4.82× average ROAS." />
<meta name="theme-color" content="#FF4D00" />
<meta property="og:title" content="AdNova AI — Stop guessing. Start scaling." />
<meta property="og:description" content="Autonomous ad management for modern brands. Built on Claude." />
<meta property="og:type" content="website" />
<link rel="icon" href="/favicon.svg" />
<link rel="canonical" href="https://adnova.ai/" />
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..900&family=Fraunces:ital,opsz,wght@1,144,300..500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  /* 3-color palette: white / black / orange (May 2026) */
  --bg:#000000;--surface:#0A0A0A;--card:#111111;--card2:#1A1A1A;
  --border:rgba(255,255,255,0.08);--border2:rgba(255,255,255,0.14);
  --orange:#FF4D00;--orange2:#FF6B2B;--orangeGlow:rgba(255,77,0,0.18);
  --cyan:#FF6B2B;--white:#FFFFFF;--muted:#7A7A7A;--muted2:#A8A8A8;
  --text:#D4D4D4;--green:#FF4D00;--gold:#FF6B2B;
}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
body{font-family:'Geist',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--white);overflow-x:hidden;font-feature-settings:"ss01","ss03","cv11";font-optical-sizing:auto;letter-spacing:-0.005em}
h1,h2,h3,h4,h5{font-family:'Geist',system-ui,sans-serif;font-weight:700;letter-spacing:-0.02em}
em,.font-serif{font-family:'Fraunces',Georgia,serif;font-optical-sizing:auto;font-variation-settings:"opsz" 144}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 52px;height:66px;background:rgba(8,8,15,0.8);backdrop-filter:blur(28px);border-bottom:1px solid var(--border);transition:background 0.3s}
nav.scrolled{background:rgba(8,8,15,0.97)}
.logo{font-family:'Geist',system-ui,sans-serif;font-weight:800;font-size:20px;color:var(--white);letter-spacing:-0.5px;cursor:pointer;text-decoration:none}
.logo span{color:var(--orange)}
.nav-links{display:flex;gap:34px}
.nav-links a{color:var(--muted2);text-decoration:none;font-size:14px;transition:color 0.2s}
.nav-links a:hover{color:var(--white)}
.nav-right{display:flex;gap:12px;align-items:center}
.btn-ghost{padding:8px 18px;border:1px solid var(--border2);border-radius:8px;color:var(--muted2);font-size:14px;background:transparent;cursor:pointer;transition:all 0.2s;text-decoration:none;font-family:'Geist',system-ui,sans-serif}
.btn-ghost:hover{color:var(--white);border-color:rgba(255,255,255,0.25)}
.btn-nav{padding:9px 22px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;border:none;font-family:'Geist',system-ui,sans-serif;background:var(--orange);color:#fff;transition:all 0.25s;text-decoration:none}
.btn-nav:hover{background:var(--orange2);box-shadow:0 6px 24px rgba(255,77,0,0.35);transform:translateY(-1px)}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:130px 24px 60px;position:relative;overflow:hidden}
.hero-mesh{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 800px 500px at 50% -5%,rgba(255,77,0,0.11),transparent 70%),radial-gradient(ellipse 500px 300px at 15% 70%,rgba(0,212,255,0.04),transparent 65%),radial-gradient(ellipse 400px 250px at 85% 60%,rgba(255,77,0,0.05),transparent 60%)}
.hero-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:70px 70px;mask-image:radial-gradient(ellipse 75% 60% at 50% 30%,black 20%,transparent 100%)}
.hero-inner{position:relative;z-index:1;max-width:960px;width:100%}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px 6px 8px;border-radius:100px;border:1px solid rgba(255,77,0,0.25);background:rgba(255,77,0,0.06);font-size:12px;color:var(--orange2);font-weight:500;margin-bottom:40px;letter-spacing:0.04em;text-transform:uppercase}
.badge-dot{width:7px;height:7px;border-radius:50%;background:var(--orange);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(255,77,0,0.4)}70%{opacity:0.7;box-shadow:0 0 0 8px rgba(255,77,0,0)}}
.hero h1{font-size:clamp(54px,8.4vw,108px);font-weight:800;line-height:0.94;letter-spacing:-0.045em;margin-bottom:30px}
.hero h1 .line-white{display:block;color:var(--white)}
.hero h1 .line-serif{display:block;font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;color:var(--orange);font-size:clamp(60px,9vw,118px);letter-spacing:-0.025em;font-variation-settings:"opsz" 144;line-height:0.92}
.hero-sub{font-size:clamp(17px,1.9vw,21px);color:var(--muted2);font-weight:400;max-width:540px;line-height:1.65;margin:0 auto 48px;letter-spacing:-0.005em}
.hero-sub strong{color:var(--white);font-weight:500}
.hero-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:18px}
.btn-hero{padding:15px 34px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;border:none;font-family:'Geist',system-ui,sans-serif;background:var(--orange);color:#fff;transition:all 0.25s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.btn-hero:hover{background:var(--orange2);box-shadow:0 12px 48px rgba(255,77,0,0.4);transform:translateY(-2px)}
.btn-hero-ghost{padding:15px 30px;border-radius:10px;font-size:15px;cursor:pointer;border:1px solid var(--border2);background:rgba(255,255,255,0.03);color:var(--text);transition:all 0.25s;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-family:'Geist',system-ui,sans-serif}
.btn-hero-ghost:hover{border-color:rgba(255,255,255,0.25);color:var(--white);background:rgba(255,255,255,0.06)}
.hero-trust{font-size:12px;color:var(--muted);letter-spacing:0.04em;margin-bottom:14px}
.hero-vs{margin-bottom:60px}
.hero-vs a{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--orange2);font-weight:600;letter-spacing:-0.005em;border-bottom:1px solid rgba(255,107,43,0.25);padding-bottom:2px;transition:all 0.25s;text-decoration:none}
.hero-vs a:hover{color:var(--orange);border-bottom-color:var(--orange)}
.hero-vs-arr{transition:transform 0.25s}
.hero-vs a:hover .hero-vs-arr{transform:translateX(4px)}
.play-tri{display:inline-block;width:0;height:0;border-style:solid;border-width:6px 0 6px 9px;border-color:transparent transparent transparent var(--orange);margin-right:2px;vertical-align:middle}
.play-dur{display:inline-block;margin-left:8px;padding:2px 7px;border-radius:100px;background:rgba(255,77,0,0.10);color:var(--orange);font-size:11px;font-weight:700;letter-spacing:0.04em}

/* HERO VIDEO MODAL */
.hv-modal{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,0.85);backdrop-filter:blur(20px) saturate(1.4);display:none;align-items:center;justify-content:center;padding:30px;animation:hvFade 0.3s ease}
.hv-modal.open{display:flex}
@keyframes hvFade{from{opacity:0}to{opacity:1}}
.hv-shell{width:100%;max-width:1080px;display:flex;flex-direction:column;gap:14px}
.hv-close{position:absolute;top:24px;right:28px;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid var(--border2);color:#fff;font-size:18px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center}
.hv-close:hover{background:rgba(255,77,0,0.20);border-color:var(--orange);transform:rotate(90deg)}
.hv-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:18px;overflow:hidden;background:linear-gradient(135deg,rgba(255,77,0,0.08),rgba(8,8,15,0.85));border:1px solid rgba(255,77,0,0.25);box-shadow:0 30px 80px rgba(0,0,0,0.6),0 0 60px rgba(255,77,0,0.15)}
.hv-video{width:100%;height:100%;object-fit:cover;background:#08080F;display:block}
/* Fallback shown only when <video> tag has no playable source */
.hv-fallback{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;pointer-events:none}
.hv-fallback > *{pointer-events:auto}
.hv-video[src]:not([src=""]) ~ .hv-fallback,.hv-video:not([src=""]) ~ .hv-fallback{display:none}
.hv-fb-icon{font-size:54px;margin-bottom:14px;opacity:0.85}
.hv-fallback h3{font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.02em;margin-bottom:8px}
.hv-fallback p{color:var(--muted2);font-size:14px;max-width:420px;line-height:1.6;margin-bottom:18px}
.hv-fb-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:10px;background:var(--orange);color:#fff;font-weight:700;font-size:14px;text-decoration:none;transition:all 0.25s}
.hv-fb-cta:hover{background:var(--orange2);box-shadow:0 12px 36px rgba(255,77,0,0.4);transform:translateY(-2px)}
.hv-fb-script{margin-top:22px;color:var(--muted);font-size:11px;letter-spacing:0.02em;max-width:560px}
.hv-fb-script code{background:rgba(255,77,0,0.10);color:var(--orange);padding:2px 6px;border-radius:4px;font-family:'JetBrains Mono','Menlo',monospace;font-size:10.5px}
.hv-meta{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 18px;color:var(--muted);font-size:11px;letter-spacing:0.02em;padding:0 8px}
.hv-meta span{position:relative;padding-right:0}
@media(max-width:700px){.hv-modal{padding:14px}.hv-close{top:14px;right:18px;width:36px;height:36px}.hv-meta{display:none}.hv-fallback{padding:24px}.hv-fallback h3{font-size:18px}}

/* Live decision feed — under the dashboard preview */
.decisions-rail{position:relative;z-index:2;max-width:1180px;margin:46px auto 0;padding:0 24px}
.decisions-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px}
.decisions-title{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted2);letter-spacing:0.04em;text-transform:uppercase;font-weight:600}
.decisions-title .live-dot{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 12px var(--green);animation:blink 1.6s ease infinite}
.decisions-cta{font-size:12px;color:var(--muted);letter-spacing:0.04em}
.decisions-feed{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;list-style:none;padding:0;margin:0}
@media(max-width:900px){.decisions-feed{grid-template-columns:1fr}}
.decisions-feed li{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:12px;background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.015) 50%,rgba(255,255,255,0.03) 100%);backdrop-filter:blur(14px) saturate(1.4);border:1px solid rgba(255,255,255,0.08);border-top-color:rgba(255,255,255,0.16);position:relative;overflow:hidden;animation:decFade 0.5s ease}
.decisions-feed li::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;border-radius:2px 0 0 2px}
.decisions-feed li.dec-scale::before{background:var(--green);box-shadow:0 0 14px var(--green)}
.decisions-feed li.dec-kill::before{background:#7A7A7A;box-shadow:0 0 14px rgba(122,122,122,0.7)}
.decisions-feed li.dec-create::before{background:var(--orange);box-shadow:0 0 14px var(--orange)}
.decisions-feed li.dec-budget::before{background:#A8A8A8;box-shadow:0 0 14px rgba(168,168,168,0.6)}
.dec-icon{width:32px;height:32px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px}
.dec-scale .dec-icon{background:rgba(255,77,0,0.15);color:var(--green)}
.dec-kill .dec-icon{background:rgba(122,122,122,0.15);color:#7A7A7A}
.dec-create .dec-icon{background:rgba(255,77,0,0.15);color:var(--orange2)}
.dec-budget .dec-icon{background:rgba(168,168,168,0.15);color:#A8A8A8}
.dec-body{flex:1;min-width:0}
.dec-action{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;display:inline-block;margin-bottom:4px}
.dec-scale .dec-action{color:var(--green)}
.dec-kill .dec-action{color:#7A7A7A}
.dec-create .dec-action{color:var(--orange2)}
.dec-budget .dec-action{color:#A8A8A8}
.dec-text{font-size:13px;color:var(--white);font-weight:500;line-height:1.45;letter-spacing:-0.005em}
.dec-meta{font-size:11px;color:var(--muted);margin-top:5px;font-variant-numeric:tabular-nums}
@keyframes decFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* DASHBOARD FRAME */
.dash-preview{position:relative;z-index:1;max-width:920px;margin:0 auto;width:100%}
.dash-glow{position:absolute;top:-50px;left:50%;transform:translateX(-50%);width:700px;height:130px;z-index:0;background:radial-gradient(ellipse,rgba(255,77,0,0.14),transparent 70%);filter:blur(30px)}
.dash-frame{position:relative;z-index:1;border-radius:18px;border:1px solid var(--border2);background:var(--surface);overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,0.75),inset 0 1px 0 rgba(255,255,255,0.06)}
.dash-titlebar{background:var(--card);border-bottom:1px solid var(--border);padding:12px 20px;display:flex;align-items:center;justify-content:space-between}
.d-dots{display:flex;gap:6px}.d-dot{width:11px;height:11px;border-radius:50%}
.d1{background:#FF5F57}.d2{background:#FEBC2E}.d3{background:#28C840}
.d-url{flex:1;max-width:240px;margin:0 auto;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:6px;padding:5px 14px;font-size:11px;color:var(--muted2);text-align:center}
.dash-body{padding:20px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px}
.dash-kpi{background:var(--card2);border-radius:10px;padding:14px 16px;border:1px solid var(--border)}
.kpi-l{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px}
.kpi-v{font-family:'Geist',system-ui,sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.02em;color:var(--white)}
.kpi-c{font-size:11px;margin-top:4px}.up{color:var(--green)}.dn{color:#FF4466}
.dash-chart{margin:0 20px 20px;background:var(--card2);border-radius:10px;padding:16px 20px;border:1px solid var(--border)}
.ch-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.ch-title{font-size:12px;font-weight:600;color:var(--text)}
.ch-leg{display:flex;gap:14px}
.leg{font-size:11px;color:var(--muted2);display:flex;align-items:center;gap:5px}
.leg-dot{width:6px;height:6px;border-radius:50%}
.bars{display:flex;align-items:flex-end;gap:5px;height:70px}
.bg{flex:1;display:flex;gap:2px;align-items:flex-end}
.b{border-radius:3px 3px 0 0}.ba{background:var(--orange);opacity:0.85}.bb{background:rgba(0,212,255,0.45)}

/* FLOATING CARDS */
.float-card{position:absolute;background:var(--card2);border:1px solid var(--border2);border-radius:12px;padding:14px 18px;box-shadow:0 20px 60px rgba(0,0,0,0.5);z-index:10}
.fc-l{left:-148px;top:25%;animation:flt 4s ease-in-out infinite}
.fc-r{right:-128px;top:15%;animation:flt 5s ease-in-out infinite -1.5s}
.fc-b{right:-110px;bottom:8%;animation:flt 4.5s ease-in-out infinite -3s}
@keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.fc-t{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:6px}
.fc-v{font-family:'Geist',system-ui,sans-serif;font-size:22px;font-weight:800;color:var(--white)}
.fc-s{font-size:11px;color:var(--green);margin-top:3px}
.live-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:100px;background:rgba(255,77,0,0.1);border:1px solid rgba(255,77,0,0.2);font-size:10px;color:var(--green);font-weight:600;text-transform:uppercase;margin-bottom:8px}
.ld{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pd 1.5s infinite}
@keyframes pd{0%,100%{opacity:1}50%{opacity:0.3}}

/* TICKER */
.ticker-wrap{overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:14px 0;background:var(--surface)}
.ticker-inner{display:flex;white-space:nowrap;animation:tkr 28s linear infinite}
@keyframes tkr{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.ti{display:inline-flex;align-items:center;gap:10px;padding:0 32px;font-size:13px;color:var(--muted)}
.ti b{color:var(--white);font-weight:600}.ti-sep{color:rgba(255,255,255,0.15);font-size:18px}

/* STATS */
/* ── BEYOND ATTRIBUTION ─────────────────────────────────────────── */
.beyond-sec{padding:80px 52px 30px;max-width:1200px;margin:0 auto}
.beyond-wrap{margin-top:40px;border:1px solid var(--border);border-radius:20px;background:linear-gradient(180deg,rgba(255,77,0,0.025) 0%,rgba(255,255,255,0.012) 100%);overflow:hidden}
.beyond-table{display:flex;flex-direction:column}
.bt-row{display:grid;grid-template-columns:1.4fr 1fr 1fr;align-items:center;padding:18px 26px;border-bottom:1px solid var(--border)}
.bt-row:last-child{border-bottom:none}
.bt-row.bt-head{background:rgba(255,77,0,0.04);padding:22px 26px;border-bottom:1px solid rgba(255,77,0,0.18)}
.bt-feat{font-size:14px;color:var(--text);font-weight:500;letter-spacing:-0.005em}
.bt-head .bt-feat{font-size:11px;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.12em}
.bt-stack,.bt-adnova{font-size:14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.bt-head .bt-stack,.bt-head .bt-adnova{font-size:13px;font-weight:700;color:var(--white);flex-direction:column;align-items:flex-start;gap:2px}
.bt-head .bt-adnova{color:var(--orange)}
.bt-sub{font-size:10px;color:var(--muted);font-weight:500;text-transform:none;letter-spacing:0.02em}
.bt-yes{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:rgba(255,77,0,0.14);color:var(--green);font-weight:700;font-size:12px;border:1px solid rgba(255,77,0,0.30);flex-shrink:0}
.bt-adnova .bt-yes{background:rgba(255,77,0,0.16);color:var(--orange);border-color:rgba(255,77,0,0.34)}
.bt-no{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;color:var(--muted);font-weight:600;font-size:14px;flex-shrink:0}
.bt-note{font-size:12px;color:var(--muted2);letter-spacing:-0.005em}
.bt-note-dim{color:var(--muted)}
.bt-note-on{color:var(--orange2);font-weight:600}
.bt-row:hover{background:rgba(255,77,0,0.025)}
.bt-row.bt-head:hover{background:rgba(255,77,0,0.04)}

.beyond-foot{display:grid;grid-template-columns:1.7fr 1fr;gap:30px;padding:30px 26px;border-top:1px solid var(--border);align-items:center;background:rgba(255,77,0,0.025)}
.beyond-quote{display:flex;gap:14px;align-items:flex-start}
.bq-mark{font-family:'Fraunces',Georgia,serif;font-size:54px;color:var(--orange);line-height:0.7;font-style:italic}
.beyond-quote p{font-size:14px;color:var(--text);line-height:1.65;letter-spacing:-0.005em;margin-bottom:6px}
.bq-att{font-size:11px;color:var(--muted);font-weight:500;letter-spacing:0.02em}
.beyond-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:10px;border:1px solid var(--orange);background:rgba(255,77,0,0.06);color:var(--orange);font-size:13px;font-weight:600;letter-spacing:-0.005em;transition:all 0.25s;justify-self:end;text-decoration:none}
.beyond-cta:hover{background:var(--orange);color:#fff;box-shadow:0 8px 24px rgba(255,77,0,0.35)}
.beyond-cta span{transition:transform 0.25s}
.beyond-cta:hover span{transform:translateX(4px)}

@media(max-width:900px){
  .beyond-sec{padding:60px 24px 20px}
  .bt-row{grid-template-columns:1fr;gap:8px;padding:14px 18px}
  .bt-row.bt-head{display:none}
  .bt-feat{font-weight:700;color:var(--white);font-size:13px}
  .bt-stack::before{content:'Legacy stack: ';color:var(--muted);font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:4px;width:100%}
  .bt-adnova::before{content:'AdNova: ';color:var(--orange);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;display:block;margin-bottom:4px;width:100%}
  .beyond-foot{grid-template-columns:1fr;gap:20px;padding:24px 18px}
  .beyond-cta{justify-self:start}
}

.stats-sec{padding:80px 52px;max-width:1200px;margin:0 auto}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;border:1px solid var(--border);border-radius:20px;overflow:hidden;background:var(--border)}
.stat-block{background:var(--surface);padding:48px 32px;text-align:center;transition:background 0.3s;cursor:default}
.stat-block:hover{background:var(--card)}
.stat-num{font-family:'Geist',system-ui,sans-serif;font-size:54px;font-weight:800;letter-spacing:-0.04em;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,var(--white),var(--muted2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-num .hi{background:linear-gradient(135deg,var(--orange),var(--orange2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-lbl{font-size:13px;color:var(--muted)}

/* SECTION HEADER */
.sec-head{text-align:center;margin-bottom:72px}
.sec-tag{display:inline-block;padding:5px 14px;border-radius:100px;border:1px solid rgba(255,77,0,0.25);background:rgba(255,77,0,0.06);font-size:11px;color:var(--orange2);font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:22px}
.sec-head h2{font-size:clamp(36px,5.2vw,64px);font-weight:800;letter-spacing:-0.04em;line-height:1.02;margin-bottom:20px}
.sec-head h2 em{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;color:var(--orange);letter-spacing:-0.025em;font-variation-settings:"opsz" 144}
.sec-head p{font-size:18px;color:var(--muted2);max-width:540px;margin:0 auto;line-height:1.65;font-weight:400;letter-spacing:-0.005em}

/* FEATURES */
.feat-sec{padding:80px 52px;max-width:1200px;margin:0 auto}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.feat-card{padding:36px;border-radius:18px;background:var(--surface);border:1px solid var(--border);transition:all 0.35s;position:relative;overflow:hidden;cursor:default}
.feat-card::before{content:'';position:absolute;inset:0;border-radius:18px;background:linear-gradient(135deg,rgba(255,77,0,0.06),transparent 60%);opacity:0;transition:opacity 0.35s}
.feat-card:hover{border-color:rgba(255,77,0,0.25);transform:translateY(-6px);box-shadow:0 24px 80px rgba(0,0,0,0.4)}
.feat-card:hover::before{opacity:1}
.feat-icon{width:52px;height:52px;border-radius:14px;background:rgba(255,77,0,0.08);border:1px solid rgba(255,77,0,0.15);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:24px;position:relative;z-index:1}
.feat-card h3{font-size:20px;font-weight:700;margin-bottom:12px;letter-spacing:-0.022em;position:relative;z-index:1}
.feat-card p{font-size:15px;color:var(--muted2);line-height:1.65;font-weight:400;position:relative;z-index:1;letter-spacing:-0.003em}
.feat-lnk{display:inline-flex;align-items:center;gap:6px;margin-top:22px;font-size:13px;color:var(--orange2);font-weight:500;text-decoration:none;position:relative;z-index:1;transition:gap 0.2s}
.feat-card:hover .feat-lnk{gap:10px}

/* HOW IT WORKS */
.hiw-sec{padding:100px 52px;background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.hiw-inner{max-width:1200px;margin:0 auto}
.hiw-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border-radius:20px;overflow:hidden;margin-top:72px}
.hiw-step{background:var(--card);padding:48px 40px;position:relative;transition:background 0.3s}
.hiw-step:hover{background:var(--card2)}
.step-bg-num{font-family:'Geist',system-ui,sans-serif;font-size:80px;font-weight:800;letter-spacing:-0.05em;line-height:1;color:rgba(255,255,255,0.04);position:absolute;top:20px;right:20px}
.step-icon{width:56px;height:56px;border-radius:14px;background:rgba(255,77,0,0.1);border:1px solid rgba(255,77,0,0.2);display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:28px}
.step-lbl{font-size:11px;color:var(--orange2);font-weight:600;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px}
.hiw-step h3{font-size:26px;font-weight:700;letter-spacing:-0.028em;margin-bottom:14px}
.hiw-step p{font-size:15px;color:var(--muted2);line-height:1.65;font-weight:400;letter-spacing:-0.003em}

/* PLATFORMS */
.plat-sec{padding:80px 52px;max-width:1200px;margin:0 auto}
.plat-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px;margin-top:64px}
.plat-card{padding:28px 16px;border-radius:16px;background:var(--surface);border:1px solid var(--border);text-align:center;transition:all 0.3s;cursor:pointer}
.plat-card:hover{border-color:rgba(255,77,0,0.3);transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,0.4)}
.plat-logo{width:48px;height:48px;border-radius:13px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center}
.plat-logo svg{width:26px;height:26px;display:block}
.plat-name{font-size:12px;font-weight:600;color:var(--text);margin-bottom:4px}
.plat-sub{font-size:10px;color:var(--muted)}
.plat-ok{display:inline-flex;align-items:center;gap:3px;margin-top:8px;padding:2px 8px;border-radius:100px;background:rgba(255,77,0,0.1);font-size:9px;color:var(--green);font-weight:600;text-transform:uppercase;letter-spacing:0.05em}

/* CREATIVES */
.cr-sec{padding:100px 52px;background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.cr-inner{max-width:1200px;margin:0 auto}
.cr-layout{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;margin-top:72px}
.cr-frame{border-radius:18px;border:1px solid var(--border2);background:var(--card);overflow:hidden}
.cr-header{padding:12px 18px;border-bottom:1px solid var(--border);background:var(--card2);display:flex;align-items:center;gap:10px}
.cr-dots{display:flex;gap:5px}.cr-dot{width:9px;height:9px;border-radius:50%}
.cr-title-bar{font-size:12px;color:var(--muted2);margin-left:8px}
.cr-body{padding:20px}
.cr-prompt{background:rgba(255,77,0,0.04);border:1px solid rgba(255,77,0,0.15);border-radius:10px;padding:14px 16px;margin-bottom:16px}
.cr-pl{font-size:10px;color:var(--orange2);font-weight:600;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:8px}
.cr-pt{font-size:13px;color:var(--text);line-height:1.6}
.cr-params{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.cr-param{padding:4px 12px;border-radius:100px;border:1px solid var(--border2);font-size:11px;color:var(--muted2);background:var(--card2)}
.cr-status{display:flex;align-items:center;gap:10px;padding:10px 0;font-size:12px;color:var(--muted2);margin-bottom:16px}
.cr-spin{width:14px;height:14px;border:2px solid var(--border2);border-top-color:var(--orange);border-radius:50%;animation:spin 0.9s linear infinite;flex-shrink:0}
@keyframes spin{to{transform:rotate(360deg)}}
.cr-results{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.cr-img{border-radius:8px;aspect-ratio:1;border:1px solid var(--border);position:relative;overflow:hidden;cursor:pointer;transition:border-color 0.25s,transform 0.25s}
.cr-img:hover{border-color:rgba(255,77,0,0.45);transform:translateY(-2px)}
.cr-img-tag{position:absolute;top:8px;left:8px;z-index:2;padding:3px 8px;border-radius:100px;background:rgba(0,0,0,0.65);backdrop-filter:blur(6px);color:#fff;font-size:10px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.10)}
.cr-img-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.30) 0%,rgba(0,0,0,0.75) 100%);opacity:0;transition:opacity 0.2s;display:flex;align-items:flex-end;justify-content:flex-start;padding:12px;font-size:13px;color:#fff;font-weight:700;letter-spacing:-0.005em}
.cr-img:hover .cr-img-ov{opacity:1}
.cr-info h3{font-size:clamp(30px,3.2vw,46px);font-weight:800;letter-spacing:-0.035em;line-height:1.05;margin-bottom:20px}
.cr-info h3 em{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;color:var(--orange);letter-spacing:-0.025em;font-variation-settings:"opsz" 144}
.cr-info p{font-size:16px;color:var(--muted2);line-height:1.65;margin-bottom:32px;font-weight:400;letter-spacing:-0.005em}
.cr-types{display:flex;flex-direction:column;gap:12px}
.cr-type{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:12px;border:1px solid var(--border);background:var(--card2);transition:all 0.25s;cursor:pointer}
.cr-type:hover,.cr-type.active{border-color:rgba(255,77,0,0.3);background:rgba(255,77,0,0.05)}
.cr-type-icon{width:38px;height:38px;border-radius:10px;background:rgba(255,77,0,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.cr-type h4{font-size:14px;font-weight:600;margin-bottom:2px}
.cr-type p{font-size:12px;color:var(--muted2)}

/* AGENTS */
.ag-sec{padding:100px 52px;max-width:1200px;margin:0 auto}
.ag-layout{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:72px}
.ag-visual{position:relative;height:340px}
.ag-orb{width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,var(--orange),#FF8C42);display:flex;align-items:center;justify-content:center;font-size:42px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 70px rgba(255,77,0,0.3);animation:orb 3.5s ease-in-out infinite;z-index:2}
@keyframes orb{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-54%) scale(1.04)}}
.ag-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(255,77,0,0.18);animation:rp 3s ease-in-out infinite}
.ag-ring.r1{width:150px;height:150px}
.ag-ring.r2{width:200px;height:200px;animation-delay:0.5s;border-color:rgba(255,77,0,0.08)}
@keyframes rp{0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.05)}}
.ag-node{position:absolute;background:var(--card2);border:1px solid var(--border2);border-radius:14px;padding:14px 18px;z-index:3;box-shadow:0 10px 40px rgba(0,0,0,0.4);min-width:158px}
.ag-node.n1{top:0;left:0}.ag-node.n2{top:0;right:0}
.ag-node.n3{bottom:0;left:0}.ag-node.n4{bottom:0;right:0}
.ag-ni{font-size:20px;margin-bottom:6px}
.ag-node h5{font-size:13px;font-weight:700;margin-bottom:2px}
.ag-node p{font-size:11px;color:var(--muted2)}
.ag-info h3{font-size:clamp(30px,3.2vw,48px);font-weight:800;letter-spacing:-0.035em;line-height:1.05;margin-bottom:20px}
.ag-info h3 em{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;color:var(--orange);letter-spacing:-0.025em;font-variation-settings:"opsz" 144}
.ag-info p{font-size:16px;color:var(--muted2);line-height:1.65;margin-bottom:36px;font-weight:400;letter-spacing:-0.005em}
.ag-list{display:flex;flex-direction:column;gap:14px}
.ag-item{display:flex;align-items:flex-start;gap:16px;padding:18px 20px;border-radius:12px;border:1px solid var(--border);background:var(--surface);transition:all 0.25s}
.ag-item:hover{border-color:rgba(255,77,0,0.2);background:rgba(255,77,0,0.02)}
.ag-icon{width:40px;height:40px;border-radius:10px;background:rgba(255,77,0,0.08);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.ag-item h4{font-size:14px;font-weight:600;margin-bottom:4px}
.ag-item p{font-size:13px;color:var(--muted2);line-height:1.55}

/* PRICING */
.pr-sec{padding:100px 52px;background:var(--surface);border-top:1px solid var(--border)}
.pr-inner{max-width:1160px;margin:0 auto}
.pr-toggle{display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:56px;margin-top:16px}
.pr-tl{font-size:14px;color:var(--muted2)}
.toggle-sw{width:44px;height:24px;background:var(--card2);border-radius:100px;border:1px solid var(--border2);cursor:pointer;position:relative;transition:background 0.3s}
.toggle-sw.on{background:var(--orange)}
.toggle-kn{width:18px;height:18px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:transform 0.3s}
.toggle-sw.on .toggle-kn{transform:translateX(20px)}
.pr-save{padding:3px 10px;border-radius:100px;background:rgba(255,77,0,0.1);font-size:11px;color:var(--green);font-weight:600;text-transform:uppercase;letter-spacing:0.05em}
.pr-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.pr-card{border-radius:20px;padding:36px 28px;border:1px solid var(--border);background:var(--card);transition:transform 0.3s;position:relative}
.pr-card:hover{transform:translateY(-6px)}
.pr-card.feat{border-color:rgba(255,77,0,0.35);background:linear-gradient(160deg,rgba(255,77,0,0.06),var(--card));box-shadow:0 0 60px rgba(255,77,0,0.07)}
.pr-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);padding:5px 18px;background:var(--orange);border-radius:100px;font-size:11px;font-weight:700;color:#fff;font-family:'Geist',system-ui,sans-serif;text-transform:uppercase;letter-spacing:0.07em;white-space:nowrap}
.pr-tier{font-size:12px;font-weight:600;color:var(--muted2);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:18px}
.pr-row{display:flex;align-items:baseline;gap:3px;margin-bottom:6px}
.pr-dollar{font-size:20px;color:var(--muted2);align-self:flex-start;margin-top:10px}
.pr-amount{font-family:'Geist',system-ui,sans-serif;font-size:52px;font-weight:800;letter-spacing:-0.04em;color:var(--white)}
.pr-per{font-size:14px;color:var(--muted);margin-left:2px}
.pr-billed{font-size:11px;color:var(--muted);margin-top:2px;margin-bottom:18px;letter-spacing:-0.003em;font-weight:500;transition:color 0.25s}
.pr-card.annual .pr-billed{color:var(--green)}
.pr-desc{font-size:13px;color:var(--muted2);margin-bottom:26px;line-height:1.6}
.pr-amount{transition:color 0.2s}
.pr-div{height:1px;background:var(--border);margin-bottom:22px}
.pr-feats{list-style:none;display:flex;flex-direction:column;gap:11px;margin-bottom:28px}
.pr-feats li{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text)}
.pfc{width:18px;height:18px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;background:rgba(255,77,0,0.1);color:var(--orange2)}
.pr-btn{width:100%;padding:12px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Geist',system-ui,sans-serif;transition:all 0.25s;border:1px solid var(--border2);background:rgba(255,255,255,0.04);color:var(--text)}
.pr-btn:hover{border-color:rgba(255,255,255,0.25);color:var(--white)}
.pr-btn.prim{background:var(--orange);color:#fff;border:none}
.pr-btn.prim:hover{background:var(--orange2);box-shadow:0 8px 32px rgba(255,77,0,0.35)}

/* TESTIMONIALS — marquee */
.testi-sec{padding:80px 0 100px;max-width:1400px;margin:0 auto}
.testi-sec .sec-head{padding:0 52px}
.testi-marquee{position:relative;overflow:hidden;margin-top:64px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.testi-track{display:flex;width:max-content;animation:testi-scroll 80s linear infinite;will-change:transform}
.testi-marquee:hover .testi-track{animation-play-state:paused}
@keyframes testi-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.testi-card{flex-shrink:0;width:380px;margin-right:24px;padding:32px;border-radius:18px;background:var(--surface);border:1px solid var(--border);transition:border-color 0.3s,transform 0.3s;display:flex;flex-direction:column}
.testi-card:hover{border-color:rgba(255,77,0,0.25);transform:translateY(-4px)}
.t-stars{margin-bottom:18px;color:var(--gold);font-size:13px;letter-spacing:3px}
.t-quote{font-size:16px;color:var(--text);line-height:1.55;margin-bottom:24px;font-weight:400;font-style:italic;font-family:'Fraunces',Georgia,serif;font-variation-settings:"opsz" 144;letter-spacing:-0.005em;flex:1}
.t-who{display:flex;align-items:center;gap:14px}
.t-photo{width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;border:1px solid var(--border2)}
.t-n{font-size:14px;font-weight:600;letter-spacing:-0.01em}
.t-r{font-size:12px;color:var(--muted2);margin-top:2px}

/* CTA */
.cta-sec{position:relative;overflow:hidden;text-align:center;padding:120px 52px;background:var(--surface);border-top:1px solid var(--border)}
.cta-bg{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 700px 400px at 50% 50%,rgba(255,77,0,0.1),transparent 70%)}
.cta-inner{position:relative;z-index:1}
.cta-sec h2{font-size:clamp(42px,6.2vw,80px);font-weight:800;letter-spacing:-0.045em;line-height:0.98;margin-bottom:24px}
.cta-sec h2 em{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;color:var(--orange);letter-spacing:-0.025em;font-variation-settings:"opsz" 144}
.cta-sec p{font-size:19px;color:var(--muted2);max-width:480px;margin:0 auto 48px;line-height:1.55;font-weight:400;letter-spacing:-0.005em}
.cta-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.cta-note{margin-top:22px;font-size:12px;color:var(--muted)}

/* FOOTER */
footer{padding:60px 52px 36px;border-top:1px solid var(--border);background:var(--bg)}
.ft-top{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:52px;margin-bottom:52px}
.ft-brand .logo{font-size:18px;margin-bottom:16px;display:block}
.ft-brand p{font-size:13px;color:var(--muted);line-height:1.7;font-weight:300;max-width:240px}
.ft-col h5{font-size:11px;font-weight:700;color:var(--white);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:20px}
.ft-col ul{list-style:none;display:flex;flex-direction:column;gap:12px}
.ft-col a{font-size:13px;color:var(--muted);text-decoration:none;transition:color 0.2s;font-weight:300}
.ft-col a:hover{color:var(--white)}
.ft-bottom{border-top:1px solid var(--border);padding-top:28px;display:flex;justify-content:space-between;align-items:center}
.ft-bottom p{font-size:12px;color:var(--muted)}
.ft-links{display:flex;gap:24px}
.ft-links a{font-size:12px;color:var(--muted);text-decoration:none}
.ft-links a:hover{color:var(--white)}

/* REVEAL */
.reveal{opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.rd1{transition-delay:0.1s}.rd2{transition-delay:0.2s}.rd3{transition-delay:0.3s}

/* RESPONSIVE */
@media(max-width:1100px){
  .feat-grid,.pr-grid{grid-template-columns:repeat(2,1fr)}
  .ft-top{grid-template-columns:1fr 1fr}
  .ag-layout,.cr-layout{grid-template-columns:1fr}
  .hiw-steps{grid-template-columns:1fr}
  .fc-l,.fc-r,.fc-b{display:none}
  .plat-grid{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:768px){
  nav{padding:0 20px}
  .nav-links{display:none}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .feat-grid,.pr-grid,.testi-grid{grid-template-columns:1fr}
  .ft-top{grid-template-columns:1fr}
  .dash-body{grid-template-columns:repeat(2,1fr)}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none !important;animation:none !important}
}
::selection{background:#FF4D00;color:#fff}
</style>
</head>
<body>

<nav id="mainNav">
  <a href="/" class="logo">AdNova<span>.</span></a>
  <div class="nav-links">
    <a href="#features">Features</a>
    <a href="#hiw">How it works</a>
    <a href="#pricing">Pricing</a>
    <a href="/customers">Customers</a>
  </div>
  <div class="nav-right">
    <a href="/login" class="btn-ghost">Sign in</a>
    <a href="/register" class="btn-nav">Start free →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-mesh"></div>
  <div class="hero-grid"></div>
  <div class="hero-inner">
    <div class="hero-badge"><div class="badge-dot"></div>Autonomous Adtech · Built on Claude</div>
    <h1>
      <span class="line-white">Your acquisition lead,</span>
      <span class="line-serif">in an API.</span>
    </h1>
    <p class="hero-sub">AdNova ne vous montre pas vos campagnes — il les <strong>gère</strong>. Scaling auto sur les gagnants, créatifs killed avant qu'ils brûlent du budget, audiences expandées au bon moment. <strong>Vous validez. Le reste tourne.</strong></p>
    <div class="hero-actions">
      <a href="/register" class="btn-hero">Démarrer l'essai →</a>
      <button type="button" onclick="openHeroVideo()" class="btn-hero-ghost"><span class="play-tri"></span>&nbsp; Voir l'IA en action <span class="play-dur">60 s</span></button>
    </div>
    <p class="hero-trust">14 jours gratuits · Sans carte bancaire · Annulable à tout moment</p>
    <p class="hero-vs"><a href="/vs-smartly">Smartly facture $10K/m. AdNova : $799. <span class="hero-vs-arr">→</span></a></p>

    <!-- Dashboard preview -->
    <div class="dash-preview">
      <div class="dash-glow"></div>
      <div class="float-card fc-l">
        <div class="fc-t">Spend today</div>
        <div class="fc-v">$12,840</div>
        <div class="fc-s">↑ +18% vs yesterday</div>
      </div>
      <div class="float-card fc-r">
        <div class="live-badge"><div class="ld"></div>Live</div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:4px">Active campaigns</div>
        <div class="fc-v" style="font-size:28px">47</div>
      </div>
      <div class="float-card fc-b">
        <div class="fc-t">Avg ROAS</div>
        <div class="fc-v">4.82×</div>
        <div class="fc-s">↑ +0.3 this week</div>
      </div>
      <div class="dash-frame">
        <div class="dash-titlebar">
          <div class="d-dots"><div class="d-dot d1"></div><div class="d-dot d2"></div><div class="d-dot d3"></div></div>
          <div class="d-url">app.adnova.ai/dashboard</div>
          <div style="width:56px"></div>
        </div>
        <div class="dash-body">
          <div class="dash-kpi"><div class="kpi-l">Total Spend</div><div class="kpi-v">$284K</div><div class="kpi-c up">↑ +23.4% this month</div></div>
          <div class="dash-kpi"><div class="kpi-l">Revenue</div><div class="kpi-v">$1.37M</div><div class="kpi-c up">↑ +31.2% vs last</div></div>
          <div class="dash-kpi"><div class="kpi-l">Avg ROAS</div><div class="kpi-v">4.82×</div><div class="kpi-c up">↑ +0.6 vs target</div></div>
          <div class="dash-kpi"><div class="kpi-l">CPA</div><div class="kpi-v">$18.40</div><div class="kpi-c dn">↓ −12% (good)</div></div>
        </div>
        <div class="dash-chart">
          <div class="ch-head">
            <div class="ch-title">Revenue vs Spend — Last 7 days</div>
            <div class="ch-leg">
              <span class="leg"><span class="leg-dot" style="background:var(--orange)"></span>Revenue</span>
              <span class="leg"><span class="leg-dot" style="background:rgba(0,212,255,0.6)"></span>Spend</span>
            </div>
          </div>
          <div class="bars">
            <div class="bg"><div class="b ba" style="height:52%"></div><div class="b bb" style="height:30%"></div></div>
            <div class="bg"><div class="b ba" style="height:66%"></div><div class="b bb" style="height:38%"></div></div>
            <div class="bg"><div class="b ba" style="height:48%"></div><div class="b bb" style="height:27%"></div></div>
            <div class="bg"><div class="b ba" style="height:84%"></div><div class="b bb" style="height:46%"></div></div>
            <div class="bg"><div class="b ba" style="height:72%"></div><div class="b bb" style="height:41%"></div></div>
            <div class="bg"><div class="b ba" style="height:92%"></div><div class="b bb" style="height:52%"></div></div>
            <div class="bg"><div class="b ba" style="height:86%"></div><div class="b bb" style="height:47%"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- LIVE DECISIONS FEED — the AI acting in real time -->
  <div class="decisions-rail" id="decisions">
    <div class="decisions-head">
      <div class="decisions-title"><span class="live-dot"></span>Décisions IA · live</div>
      <span class="decisions-cta">Échantillon en direct sur 2 412 marques</span>
    </div>
    <ul class="decisions-feed" id="decisions-feed">
      <li class="dec-scale">
        <div class="dec-icon">↗</div>
        <div class="dec-body">
          <span class="dec-action">Scale +12%</span>
          <div class="dec-text">"Summer Hero" budget porté à $18,420 — ROAS 5.26×</div>
          <div class="dec-meta">il y a 4 s · Meta · Acme Corp</div>
        </div>
      </li>
      <li class="dec-kill">
        <div class="dec-icon">✕</div>
        <div class="dec-body">
          <span class="dec-action">Kill</span>
          <div class="dec-text">3 créas TikTok pausées — CTR 0.31% sous seuil 0.8%</div>
          <div class="dec-meta">il y a 11 s · TikTok · Luxo Group</div>
        </div>
      </li>
      <li class="dec-create">
        <div class="dec-icon">✨</div>
        <div class="dec-body">
          <span class="dec-action">Génère</span>
          <div class="dec-text">4 variantes vidéo UGC pour "Product Launch Q3"</div>
          <div class="dec-meta">il y a 18 s · Multi · Digital Storm</div>
        </div>
      </li>
    </ul>
  </div>
</section>

<!-- TICKER -->
<div class="ticker-wrap">
  <div class="ticker-inner">
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Avg ROAS across clients&nbsp; <b>4.82×</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Active brands&nbsp; <b>2,412+</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Ad platforms&nbsp; <b>9</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;AI agents 24/7&nbsp; <b>∞</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Creatives generated&nbsp; <b>840K+</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Spend managed monthly&nbsp; <b>$48M+</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Hours saved per brand&nbsp; <b>38h/mo</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Avg ROAS across clients&nbsp; <b>4.82×</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Active brands&nbsp; <b>2,412+</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Ad platforms&nbsp; <b>9</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;AI agents 24/7&nbsp; <b>∞</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Creatives generated&nbsp; <b>840K+</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Spend managed monthly&nbsp; <b>$48M+</b></span>
    <span class="ti"><span class="ti-sep">•</span>&nbsp;&nbsp;Hours saved per brand&nbsp; <b>38h/mo</b></span>
  </div>
</div>

<!-- BEYOND ENTERPRISE LOCK-IN — vs Smartly.io -->
<section class="beyond-sec reveal" id="beyond">
  <div class="sec-head reveal">
    <div class="sec-tag">Au-delà du contrat enterprise</div>
    <h2>Smartly le fait.<br>AdNova le fait <em>aussi.</em> Au tiers du prix.</h2>
    <p>Smartly.io est calibré pour Fortune 500 : $3-10K/mois, contrat annuel, 8 semaines d'onboarding. AdNova : même puissance d'exécution + créatifs gen, en self-serve, à $799/mois en mensuel.</p>
  </div>

  <div class="beyond-wrap reveal rd1">
    <div class="beyond-table">
      <div class="bt-row bt-head">
        <div class="bt-feat">Capacité</div>
        <div class="bt-stack">Smartly.io<div class="bt-sub">$3-10K/m · Contrat 12 mois</div></div>
        <div class="bt-adnova">AdNova<div class="bt-sub">$799/m · Mensuel · self-serve</div></div>
      </div>
      ${beyondRow('Multi-canal (Meta, Google, TikTok, LinkedIn…)', true, true)}
      ${beyondRow('Automation média-buying', true, true, 'Rules-based', 'Claude reasoning')}
      ${beyondRow('Génération créatifs (DCO)', true, true, 'Templates + DCO', 'SDXL · Runway · HeyGen')}
      ${beyondRow('Attribution multi-touch · CAPI', true, true, 'Via partenaires', 'Natif inclus')}
      ${beyondRow('AI chat conversationnel (raisonnement)', false, true, '—', 'Built on Claude')}
      ${beyondRow('Decision log + Replay (audit IA)', false, true, '—', 'Chaque action tracée · rollback 1-clic')}
      ${beyondRow('Pricing transparent affiché', false, true, '— Sales-led only', '$299 / $799 / Enterprise')}
      ${beyondRow('Setup time', false, true, '4-8 semaines', '24-72h')}
      ${beyondRow('Mensuel sans engagement', false, true, '— Annuel 12 mois', 'Annulable à tout moment')}
      ${beyondRow('14 jours d\'essai sans CB', false, true, '— Demo + RFP', 'Sign-up direct')}
      ${beyondRow('Plan pour < $1M ARR', false, true, '— Trop cher', 'Starter $299/m')}
      ${beyondRow('Hébergement EU · GDPR-native', false, true, '— Infra mixte US/EU', 'Cloudflare Paris/Francfort')}
      ${beyondRow('Programme partenaire 20% à vie', false, true, '—', 'Sans plafond')}
    </div>

    <div class="beyond-foot">
      <div class="beyond-quote">
        <div class="bq-mark">"</div>
        <p>On payait $7,500/mois à Smartly + agence. Migration AdNova en 6 jours, économies de €4,200/mois, et ROAS +34% en 6 mois. Le mode Autonomous bat les règles Smartly à plate couture.</p>
        <div class="bq-att">— Camille R., Head of Acquisition · DTC mode FR (€400K MRR)</div>
      </div>
      <a href="/vs-smartly" class="beyond-cta">Voir le comparatif détaillé vs Smartly <span>→</span></a>
    </div>
  </div>
</section>

<!-- STATS -->
<div class="stats-sec reveal">
  <div class="stats-grid">
    <div class="stat-block"><div class="stat-num"><span class="hi" data-count="4.82" data-dec="2">4.82</span>×</div><div class="stat-lbl">Average ROAS across all clients</div></div>
    <div class="stat-block"><div class="stat-num"><span class="hi" data-count="2412" data-format="comma">2,412</span></div><div class="stat-lbl">Active brands on the platform</div></div>
    <div class="stat-block"><div class="stat-num"><span class="hi" data-count="9">9</span></div><div class="stat-lbl">Ad platforms, one dashboard</div></div>
    <div class="stat-block"><div class="stat-num">24<span class="hi">/7</span></div><div class="stat-lbl">AI agents never stop optimizing</div></div>
  </div>
</div>

<!-- FEATURES -->
<section class="feat-sec" id="features">
  <div class="sec-head reveal">
    <div class="sec-tag">Capabilities</div>
    <h2>Everything your ad ops team<br>does, on <em>autopilot.</em></h2>
    <p>No more 11pm Excel exports. AdNova ships the work you used to do — plus the work you didn't have time for.</p>
  </div>
  <div class="feat-grid">
    <div class="feat-card reveal">
      <div class="feat-icon">🌐</div>
      <h3>Multi-platform sync</h3>
      <p>One dashboard for Meta, Google, TikTok, LinkedIn, Snapchat and X. Real-time metrics, unified naming, no spreadsheets.</p>
      <a href="#hiw" class="feat-lnk">Learn more →</a>
    </div>
    <div class="feat-card reveal rd1">
      <div class="feat-icon">🎨</div>
      <h3>AI creative generation</h3>
      <p>Images via SDXL, videos via Runway, UGC avatars via HeyGen. From brief to ad in minutes, on-brand, on budget.</p>
      <a href="#creatives" class="feat-lnk">Learn more →</a>
    </div>
    <div class="feat-card reveal rd2">
      <div class="feat-icon">⚡</div>
      <h3>Autonomous optimization</h3>
      <p>Agents bid, pause, scale and rebalance budget 24/7. You set the rules — Claude makes the call, logs every action.</p>
      <a href="#agents" class="feat-lnk">Learn more →</a>
    </div>
    <div class="feat-card reveal">
      <div class="feat-icon">📊</div>
      <h3>Reports that write themselves</h3>
      <p>Weekly performance summaries, anomaly alerts, executive-ready PDFs — drafted by Claude, signed by you.</p>
      <a href="#features" class="feat-lnk">Learn more →</a>
    </div>
    <div class="feat-card reveal rd1">
      <div class="feat-icon">🎯</div>
      <h3>Audience intelligence</h3>
      <p>AI-powered lookalike builder, interest clustering, and predictive lifetime value scoring baked into every campaign.</p>
      <a href="#features" class="feat-lnk">Learn more →</a>
    </div>
    <div class="feat-card reveal rd2">
      <div class="feat-icon">🔌</div>
      <h3>One-click integrations</h3>
      <p>Connect Shopify, WooCommerce, Stripe and your CRM in 30 seconds. Revenue data flows back into ad decisions.</p>
      <a href="#platforms" class="feat-lnk">Learn more →</a>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="hiw-sec" id="hiw">
  <div class="hiw-inner">
    <div class="sec-head reveal">
      <div class="sec-tag">How it works</div>
      <h2>Three steps.<br><em>Then it runs itself.</em></h2>
      <p>Most ad platforms make you do the work. AdNova learns your business and takes over.</p>
    </div>
    <div class="hiw-steps">
      <div class="hiw-step reveal">
        <div class="step-bg-num">01</div>
        <div class="step-icon">🔌</div>
        <div class="step-lbl">Step 01</div>
        <h3>Connect</h3>
        <p>OAuth into your ad accounts in 30 seconds. We pull historical performance, audiences and creative libraries across every platform instantly.</p>
      </div>
      <div class="hiw-step reveal rd1">
        <div class="step-bg-num">02</div>
        <div class="step-icon">🧠</div>
        <div class="step-lbl">Step 02</div>
        <h3>Train</h3>
        <p>AdNova learns your brand voice, winning creatives and ROAS targets from the first 48 hours of data. No manual configuration needed.</p>
      </div>
      <div class="hiw-step reveal rd2">
        <div class="step-bg-num">03</div>
        <div class="step-icon">🚀</div>
        <div class="step-lbl">Step 03</div>
        <h3>Scale</h3>
        <p>Agents take over optimization, generate new creatives and report back. You focus on strategy — AdNova handles execution 24/7.</p>
      </div>
    </div>
  </div>
</section>

<!-- PLATFORMS -->
<section class="plat-sec" id="platforms">
  <div class="sec-head reveal">
    <div class="sec-tag">Integrations</div>
    <h2>Every platform.<br><em>One place.</em></h2>
    <p>Connect your entire ad stack and see everything in a single, unified view in seconds.</p>
  </div>
  <div class="plat-grid">
    <div class="plat-card reveal">
      <div class="plat-logo" style="background:rgba(24,119,242,0.15)">
        <svg viewBox="0 0 24 24" fill="#A8A8A8" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854V15.564H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </div>
      <div class="plat-name">Meta Ads</div>
      <div class="plat-sub">Facebook · Instagram</div>
      <div class="plat-ok">✓ Connected</div>
    </div>
    <div class="plat-card reveal rd1">
      <div class="plat-logo" style="background:rgba(255,255,255,0.04)">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#A8A8A8" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      </div>
      <div class="plat-name">Google Ads</div>
      <div class="plat-sub">Search · Display · YT</div>
      <div class="plat-ok">✓ Connected</div>
    </div>
    <div class="plat-card reveal rd2">
      <div class="plat-logo" style="background:rgba(255,255,255,0.04)">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#FFFFFF" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
      </div>
      <div class="plat-name">TikTok Ads</div>
      <div class="plat-sub">Feed · TopView · Spark</div>
      <div class="plat-ok">✓ Connected</div>
    </div>
    <div class="plat-card reveal">
      <div class="plat-logo" style="background:rgba(10,102,194,0.15)">
        <svg viewBox="0 0 24 24" fill="#A8A8A8" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </div>
      <div class="plat-name">LinkedIn</div>
      <div class="plat-sub">Sponsored · Message</div>
      <div class="plat-ok">✓ Connected</div>
    </div>
    <div class="plat-card reveal rd1">
      <div class="plat-logo" style="background:#A8A8A8">
        <svg viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg"><path d="M12.166.001c-.171.001-1.504.026-2.842.86-1.486.928-2.07 2.402-2.13 2.555-.001.001-.073.156-.115.318C7.04 4 7 4.34 7 4.62v.039c0 .43.027.872.039 1.302.012.388.04.792.014 1.18-.03.418-.105.674-.18.93-.094.275-.207.563-.358.836a2.34 2.34 0 0 1-.395.504c-.225.243-.6.456-1.078.616-.474.16-1.066.246-1.747.355-.466.075-.85.18-1.158.367-.302.184-.534.443-.534.823 0 .395.265.71.585.892.32.183.74.31 1.213.418.474.108 1.018.205 1.547.41.527.205 1.04.516 1.476.96.345.353.514.685.661 1.013.13.293.255.604.475.835.245.257.566.343.917.343.346 0 .755-.082 1.302-.082.402 0 .833.058 1.397.358.563.3.881.677 1.193.964.31.286.654.502 1.225.502.583 0 .921-.217 1.231-.502.312-.287.63-.665 1.193-.964.564-.3.995-.358 1.397-.358.547 0 .956.082 1.302.082.351 0 .672-.086.917-.343.22-.231.345-.542.475-.835.147-.328.316-.66.661-1.013.436-.444.949-.755 1.476-.96.529-.205 1.073-.302 1.547-.41.473-.108.893-.235 1.213-.418.32-.182.585-.497.585-.892 0-.38-.232-.639-.534-.823-.308-.187-.692-.292-1.158-.367-.681-.109-1.273-.195-1.747-.355-.478-.16-.853-.373-1.078-.616a2.34 2.34 0 0 1-.395-.504c-.151-.273-.264-.561-.358-.836-.075-.256-.15-.512-.18-.93-.026-.388.002-.792.014-1.18.012-.43.039-.872.039-1.302v-.039c0-.28-.04-.62-.079-.886a3.36 3.36 0 0 0-.115-.318c-.06-.153-.644-1.627-2.13-2.555C13.504.027 12.171.002 12.001.001z"/></svg>
      </div>
      <div class="plat-name">Snapchat</div>
      <div class="plat-sub">Stories · Commercials</div>
      <div class="plat-ok">✓ Connected</div>
    </div>
    <div class="plat-card reveal rd2">
      <div class="plat-logo" style="background:rgba(255,255,255,0.04)">
        <svg viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </div>
      <div class="plat-name">X Ads</div>
      <div class="plat-sub">Promoted · Amplify</div>
      <div class="plat-ok">✓ Connected</div>
    </div>
  </div>
</section>

<!-- CREATIVES -->
<section class="cr-sec" id="creatives">
  <div class="cr-inner">
    <div class="sec-head reveal">
      <div class="sec-tag">AI Creatives</div>
      <h2>Brief in.<br><em>Ads out.</em></h2>
      <p>Generate images, videos and UGC avatars in minutes. No designer. No agency. No waiting.</p>
    </div>
    <div class="cr-layout">
      <div class="reveal">
        <div class="cr-frame">
          <div class="cr-header">
            <div class="cr-dots"><div class="cr-dot" style="background:#FF5F57"></div><div class="cr-dot" style="background:#FEBC2E"></div><div class="cr-dot" style="background:#28C840"></div></div>
            <div class="cr-title-bar">Image Generator — AdNova AI</div>
          </div>
          <div class="cr-body">
            <div class="cr-prompt">
              <div class="cr-pl">✨ Prompt</div>
              <div class="cr-pt">Nike Air Max sneaker, clean white studio background, lifestyle shot, woman running, motion blur, premium feel, 4K quality, high contrast lighting</div>
            </div>
            <div class="cr-params">
              <div class="cr-param">📐 4:5 Format</div>
              <div class="cr-param">🎨 Photorealistic</div>
              <div class="cr-param">✨ SDXL</div>
              <div class="cr-param">4 variations</div>
            </div>
            <div class="cr-status"><div class="cr-spin"></div>Claude is enhancing your prompt and generating variations…</div>
            <div class="cr-results">
              <div class="cr-img" style="background:url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&amp;fit=crop&amp;w=480&amp;q=80') center/cover #0A0A0A">
                <span class="cr-img-tag">Studio · 4:5</span>
                <div class="cr-img-ov">Use in ad →</div>
              </div>
              <div class="cr-img" style="background:url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&amp;fit=crop&amp;w=480&amp;q=80') center/cover #0A0A0A">
                <span class="cr-img-tag">Lifestyle · 4:5</span>
                <div class="cr-img-ov">Use in ad →</div>
              </div>
              <div class="cr-img" style="background:url('https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&amp;fit=crop&amp;w=480&amp;q=80') center/cover #0A0A0A">
                <span class="cr-img-tag">Macro · 4:5</span>
                <div class="cr-img-ov">Use in ad →</div>
              </div>
              <div class="cr-img" style="background:url('https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&amp;fit=crop&amp;w=480&amp;q=80') center/cover #0A0A0A">
                <span class="cr-img-tag">Action · 4:5</span>
                <div class="cr-img-ov">Use in ad →</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cr-info reveal rd2">
        <h3>Generate creatives that<br><em>actually convert.</em></h3>
        <p>AdNova doesn't just make pretty pictures. It studies your best-performing ads, learns your brand, and creates variations designed to beat your existing benchmarks.</p>
        <div class="cr-types">
          <div class="cr-type active"><div class="cr-type-icon">🖼️</div><div><h4>Image Ads</h4><p>4 variations per prompt via Stable Diffusion XL — 1:1, 4:5, 9:16, 16:9</p></div></div>
          <div class="cr-type"><div class="cr-type-icon">🎬</div><div><h4>Video Ads</h4><p>Animated product showcases &amp; branded videos via Runway ML</p></div></div>
          <div class="cr-type"><div class="cr-type-icon">🤖</div><div><h4>UGC Videos</h4><p>AI avatars deliver authentic testimonials via HeyGen — any language</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- AGENTS -->
<section class="ag-sec" id="agents">
  <div class="sec-head reveal">
    <div class="sec-tag">AI Agents</div>
    <h2>Your always-on<br><em>ad ops team.</em></h2>
    <p>Specialized agents work in concert, supervised by an orchestrator that plans, delegates and executes — powered by Claude.</p>
  </div>
  <div class="ag-layout">
    <div class="ag-visual reveal">
      <div class="ag-ring r1"></div>
      <div class="ag-ring r2"></div>
      <div class="ag-orb">🤖</div>
      <div class="ag-node n1"><div class="ag-ni">📊</div><h5>Analytics Agent</h5><p>Detects anomalies &amp; forecasts</p></div>
      <div class="ag-node n2"><div class="ag-ni">🎨</div><h5>Creative Agent</h5><p>Generates &amp; A/B tests creatives</p></div>
      <div class="ag-node n3"><div class="ag-ni">⚡</div><h5>Optimization Agent</h5><p>Bids, budgets &amp; pauses 24/7</p></div>
      <div class="ag-node n4"><div class="ag-ni">📋</div><h5>Reporting Agent</h5><p>Weekly summaries &amp; alerts</p></div>
    </div>
    <div class="ag-info reveal rd2">
      <h3>Agents that work.<br><em>Results you keep.</em></h3>
      <p>While you sleep, AdNova's agents monitor every metric, pause underperforming ads, scale winners, and prepare your morning briefing. You review. You approve. They execute.</p>
      <div class="ag-list">
        <div class="ag-item"><div class="ag-icon">🔔</div><div><h4>Real-time anomaly detection</h4><p>Instant alerts when ROAS drops 15%+ or spend spikes unexpectedly, with root cause analysis.</p></div></div>
        <div class="ag-item"><div class="ag-icon">💰</div><div><h4>Autonomous budget reallocation</h4><p>Agents shift spend to top performers based on your rules — max change limits you control.</p></div></div>
        <div class="ag-item"><div class="ag-icon">📈</div><div><h4>Predictive scaling</h4><p>Identifies upcoming high-intent windows and pre-scales budgets automatically before they hit.</p></div></div>
      </div>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="pr-sec" id="pricing">
  <div class="pr-inner">
    <div class="sec-head reveal">
      <div class="sec-tag">Pricing</div>
      <h2>Four plans.<br><em>Pick yours.</em></h2>
      <p>Every plan includes a 14-day free trial. No credit card required.</p>
    </div>
    <div class="pr-toggle reveal">
      <span class="pr-tl">Monthly</span>
      <div class="toggle-sw" id="pricingToggle"><div class="toggle-kn"></div></div>
      <span class="pr-tl">Annual</span>
      <span class="pr-save">Save 20%</span>
    </div>
    <div class="pr-grid">
      ${pricingCardsHtml()}
    </div>
  </div>
</section>

<!-- TESTIMONIALS — scrolling marquee, pause on hover -->
<section class="testi-sec" id="customers">
  <div class="sec-head reveal">
    <div class="sec-tag">Customers</div>
    <h2>Trusted by 2,412<br><em>high-growth brands.</em></h2>
  </div>
  <div class="testi-marquee" aria-label="Customer testimonials">
    <div class="testi-track">
      ${testimonialsMarqueeHtml()}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-sec">
  <div class="cta-bg"></div>
  <div class="cta-inner reveal">
    <h2>Ready to let AI<br><em>run your ads?</em></h2>
    <p>Join 2,400+ brands shipping more creatives, spending smarter and growing faster — without growing their team.</p>
    <div class="cta-actions">
      <a href="/register" class="btn-hero">Start free trial →</a>
      <a href="/customers" class="btn-hero-ghost">See case studies →</a>
    </div>
    <p class="cta-note">No credit card · 14-day trial · Cancel anytime</p>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ft-top">
    <div class="ft-brand">
      <a href="/" class="logo">AdNova<span>.</span></a>
      <p>Autonomous advertising for modern brands. Built on Claude — the world's most capable AI.</p>
    </div>
    <div class="ft-col"><h5>Product</h5><ul><li><a href="#features">Features</a></li><li><a href="#pricing">Pricing</a></li><li><a href="/customers">Customers</a></li><li><a href="/blog">Blog</a></li></ul></div>
    <div class="ft-col"><h5>Integrations</h5><ul><li><a href="#platforms">Meta Ads</a></li><li><a href="#platforms">Google Ads</a></li><li><a href="#platforms">TikTok Ads</a></li><li><a href="#platforms">LinkedIn</a></li><li><a href="#platforms">Snapchat</a></li></ul></div>
    <div class="ft-col"><h5>Company</h5><ul><li><a href="/about">About</a></li><li><a href="/careers">Careers</a></li><li><a href="/press-kit">Press Kit</a></li><li><a href="/about">Security</a></li></ul></div>
    <div class="ft-col"><h5>Legal</h5><ul><li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li><li><a href="/privacy">GDPR</a></li><li><a href="/privacy">Cookies</a></li></ul></div>
  </div>
  <div class="ft-bottom">
    <p>© 2026 AdNova AI. All rights reserved.</p>
    <div class="ft-links"><a href="/login">Sign in</a><a href="/register">Get started</a></div>
  </div>
</footer>

<script>
(function(){
  // Nav scroll
  var nav = document.getElementById('mainNav');
  window.addEventListener('scroll', function(){ nav.classList.toggle('scrolled', window.scrollY > 40); });

  // Reveal on scroll
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });

  // Counter animation
  function animNum(el, target, dec, fmt) {
    var start = null, dur = 1800;
    function step(ts) {
      if(!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      var val = ease * target;
      if(fmt === 'comma') el.textContent = Math.floor(val).toLocaleString();
      else el.textContent = dec > 0 ? val.toFixed(dec) : Math.floor(val);
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statObs = new IntersectionObserver(function(entries){
    if(!entries[0].isIntersecting) return;
    document.querySelectorAll('[data-count]').forEach(function(el){
      var t = parseFloat(el.dataset.count);
      var d = parseInt(el.dataset.dec || '0', 10);
      animNum(el, t, d, el.dataset.format);
    });
    statObs.disconnect();
  }, { threshold: 0.5 });
  var sg = document.querySelector('.stats-grid');
  if(sg) statObs.observe(sg);

  // Pricing toggle — Monthly ↔ Annual (-20%)
  var pt = document.getElementById('pricingToggle');
  if(pt) pt.addEventListener('click', function(){
    pt.classList.toggle('on');
    var annual = pt.classList.contains('on');
    document.querySelectorAll('.pr-amount[data-monthly]').forEach(function(el){
      var v = annual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
      if(v) el.textContent = v;
    });
    document.querySelectorAll('.pr-billed[data-monthly-label]').forEach(function(el){
      var v = annual ? el.getAttribute('data-annual-label') : el.getAttribute('data-monthly-label');
      if(v) el.textContent = v;
    });
    document.querySelectorAll('.pr-card').forEach(function(c){ c.classList.toggle('annual', annual); });
  });

  // Creative type tabs
  document.querySelectorAll('.cr-type').forEach(function(item){
    item.addEventListener('click', function(){
      document.querySelectorAll('.cr-type').forEach(function(i){ i.classList.remove('active'); });
      item.classList.add('active');
    });
  });

  // Hero video modal
  window.openHeroVideo = function(){
    var m = document.getElementById('heroVideoModal');
    if (!m) return;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
    var v = document.getElementById('heroVideo');
    if (v && v.querySelector('source') && v.querySelector('source').src && !v.querySelector('source').src.endsWith('hero-walkthrough.mp4')) {
      v.play().catch(function(){});
    }
  };
  window.closeHeroVideo = function(){
    var m = document.getElementById('heroVideoModal');
    if (!m) return;
    m.classList.remove('open');
    document.body.style.overflow = '';
    var v = document.getElementById('heroVideo');
    if (v) { try { v.pause(); v.currentTime = 0; } catch(e){} }
  };
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') window.closeHeroVideo();
  });

  // Live AI decisions feed — rotate through a deck so the hero feels alive
  var feed = document.getElementById('decisions-feed');
  if (feed) {
    var deck = [
      { type:'scale',  icon:'↗', action:'Scale +12%', text:'"Summer Hero" budget porté à $18,420 — ROAS 5.26×',           meta:'Meta · Acme Corp' },
      { type:'kill',   icon:'✕', action:'Kill',       text:'3 créas TikTok pausées — CTR 0.31% sous seuil 0.8%',          meta:'TikTok · Luxo Group' },
      { type:'create', icon:'✨', action:'Génère',     text:'4 variantes vidéo UGC pour "Product Launch Q3"',              meta:'Multi · Digital Storm' },
      { type:'budget', icon:'⇄', action:'Réalloue',   text:'$1,200 TikTok → Google — prédiction +23% ROAS',                meta:'Cross · Apex Mkt' },
      { type:'scale',  icon:'↗', action:'Scale +18%', text:'"Retargeting Pro" élargi à audiences lookalike 3%',           meta:'Meta · NovaBrand' },
      { type:'kill',   icon:'✕', action:'Kill',       text:'Bannière statique killed — CPA $89 vs cible $35',              meta:'Google · SkinKind' },
      { type:'create', icon:'✨', action:'Génère',     text:'12 visuels SDXL générés pour Black Friday',                    meta:'Multi · SportNation' },
      { type:'budget', icon:'⇄', action:'Réalloue',   text:'$800 FB → LinkedIn — segment B2B haut intent détecté',         meta:'Cross · TechStart' },
      { type:'scale',  icon:'↗', action:'Scale +9%',  text:'Audience expandée 1% → 3% — reach +2.1M projeté',              meta:'Meta · Fashion Brand' },
    ];
    var idx = 3;
    setInterval(function(){
      var item = deck[idx % deck.length];
      idx++;
      var li = document.createElement('li');
      li.className = 'dec-' + item.type;
      li.innerHTML = '<div class="dec-icon">' + item.icon + '</div>'
        + '<div class="dec-body"><span class="dec-action">' + item.action + '</span>'
        + '<div class="dec-text">' + item.text + '</div>'
        + '<div class="dec-meta">il y a 1 s · ' + item.meta + '</div></div>';
      feed.insertBefore(li, feed.firstChild);
      while (feed.children.length > 3) feed.removeChild(feed.lastChild);
    }, 3400);
  }
})();
</script>
<!-- HERO VIDEO MODAL -->
<div id="heroVideoModal" class="hv-modal" onclick="if(event.target===this) closeHeroVideo()">
  <div class="hv-shell">
    <button type="button" class="hv-close" onclick="closeHeroVideo()" aria-label="Fermer">✕</button>
    <div class="hv-frame">
      <video
        id="heroVideo"
        class="hv-video"
        controls
        playsinline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80">
        <!-- Replace src with your final 60-second walkthrough (MP4 H.264, 1080p, ~12-18 MB) -->
        <source src="/assets/hero-walkthrough.mp4" type="video/mp4"/>
        Votre navigateur ne supporte pas la vidéo HTML5. <a href="/register" style="color:var(--orange)">Démarrer l'essai →</a>
      </video>
      <div class="hv-fallback" id="hvFallback">
        <div class="hv-fb-icon">📽️</div>
        <h3>Walkthrough produit · 60 s</h3>
        <p>La vidéo de démo arrive bientôt. En attendant, lancez votre essai gratuit — pas de carte bancaire requise.</p>
        <a href="/register" class="hv-fb-cta">Démarrer l'essai · 14 jours →</a>
        <p class="hv-fb-script">📝 Producteurs vidéo : voir <code>docs/hero-video-script.md</code> dans le repo pour le storyboard détaillé (8 scènes, voix-off française, B-roll captures dashboard).</p>
      </div>
    </div>
    <div class="hv-meta">
      <span>Chapter 1 · Hook (0:00–0:08) · "Vos ads tournent — vous, vous dormez."</span>
      <span>Chapter 2 · Live decisions (0:08–0:25)</span>
      <span>Chapter 3 · Creative gen (0:25–0:40)</span>
      <span>Chapter 4 · Decision Log (0:40–0:52)</span>
      <span>Chapter 5 · CTA (0:52–1:00)</span>
    </div>
  </div>
</div>

</body>
</html>`
}

// ─── Handler ───────────────────────────────────────────────────────────────
export const renderLanding = (c: Context) => {
  c.header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
  c.header('X-Content-Type-Options', 'nosniff')
  return c.html(pageHtml())
}
