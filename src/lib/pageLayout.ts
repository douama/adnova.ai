// ── Shared layout helper for public pages ─────────────────────────────────
// Provides consistent nav, footer, styles across all public pages.

export function publicHead(opts: {
  title: string
  description: string
  canonical: string
  lang?: string
}): string {
  const { title, description, canonical, lang = 'en' } = opts
  const now = new Date().toISOString().split('T')[0]
  return `<!DOCTYPE html>
<html lang="${lang}" class="dark">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
<title>${title}</title>
<meta name="description" content="${description}"/>
<link rel="canonical" href="https://adnova.ai${canonical}"/>
<meta name="robots" content="index, follow"/>
<meta name="theme-color" content="#6366f1"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://adnova.ai${canonical}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:image" content="https://adnova.ai/og-image.png"/>
<meta property="og:site_name" content="AdNova AI"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@AdNovaAI"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${description}"/>
<meta name="twitter:image" content="https://adnova.ai/twitter-card.png"/>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"${title}","description":"${description}","url":"https://adnova.ai${canonical}","dateModified":"${now}","isPartOf":{"@type":"WebSite","name":"AdNova AI","url":"https://adnova.ai/"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AdNova AI","item":"https://adnova.ai/"},{"@type":"ListItem","position":2,"name":"${title.replace('AdNova AI — ', '')}","item":"https://adnova.ai${canonical}"}]}}</script>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="manifest" href="/manifest.json"/>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="anonymous"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin="anonymous"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet" media="print" onload="this.onload=null;this.media='all'"/>
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/></noscript>
<script>window.tailwind={config:{darkMode:'class',theme:{extend:{fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Space Grotesk','Inter','sans-serif']},colors:{brand:{50:'#f0f4ff',100:'#e0e9ff',200:'#c7d7fe',300:'#a5bbfc',400:'#8194f8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'},neon:{purple:'#a855f7',blue:'#3b82f6',pink:'#ec4899',cyan:'#06b6d4',green:'#10b981'}}}}}}</script>
<script src="https://cdn.tailwindcss.com" defer><\/script>
${SHARED_CSS}
</head>`
}

export const SHARED_CSS = `<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg-deep:#030512;
  --prism-line:linear-gradient(90deg,transparent 0%,rgba(168,85,247,0.85) 15%,rgba(99,102,241,0.95) 35%,rgba(6,182,212,0.75) 55%,rgba(236,72,153,0.65) 75%,transparent 100%);
  --lg-blur:saturate(2) blur(24px);
  --font-sans:'Inter','system-ui',sans-serif;
  --font-display:'Space Grotesk','Inter',sans-serif;
}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,rgba(99,102,241,0.5),rgba(168,85,247,0.4));border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:#6366f1}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{background:var(--bg-deep);font-family:var(--font-sans);overflow-x:hidden;color:#e2e8f0;min-height:100dvh}
body::after{content:'';position:fixed;inset:0;z-index:-2;background:radial-gradient(ellipse 80% 65% at 8% -5%,rgba(79,70,229,0.2) 0%,transparent 58%),radial-gradient(ellipse 65% 55% at 92% 28%,rgba(168,85,247,0.14) 0%,transparent 52%),radial-gradient(ellipse 55% 45% at 50% 95%,rgba(6,182,212,0.08) 0%,transparent 48%),#030512;pointer-events:none}
.glass{background:linear-gradient(145deg,rgba(255,255,255,0.058) 0%,rgba(255,255,255,0.022) 100%);backdrop-filter:var(--lg-blur);-webkit-backdrop-filter:var(--lg-blur);border:1px solid rgba(255,255,255,0.13);border-top-color:rgba(255,255,255,0.24);box-shadow:0 8px 32px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.12);position:relative}
.glass::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(108deg,rgba(255,255,255,0.075) 0%,transparent 40%,rgba(255,255,255,0.025) 100%)}
.glass-card{background:linear-gradient(148deg,rgba(255,255,255,0.058) 0%,rgba(255,255,255,0.02) 55%,rgba(99,102,241,0.032) 100%);backdrop-filter:saturate(1.9) blur(22px);-webkit-backdrop-filter:saturate(1.9) blur(22px);border:1px solid rgba(255,255,255,0.10);border-top-color:rgba(255,255,255,0.22);box-shadow:0 6px 28px rgba(0,0,0,0.48),inset 0 1px 0 rgba(255,255,255,0.11);transition:all .45s cubic-bezier(.22,.8,.22,1);position:relative;overflow:hidden}
.glass-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:var(--prism-line);opacity:0;transition:opacity .4s ease}
.glass-card::after{content:'';position:absolute;top:-45%;left:-70%;width:55%;height:190%;background:linear-gradient(108deg,transparent,rgba(255,255,255,0.065),transparent);transform:skewX(-15deg);transition:left .7s cubic-bezier(.22,.8,.22,1);pointer-events:none}
.glass-card:hover::before{opacity:1}
.glass-card:hover::after{left:130%}
.glass-card:hover{background:linear-gradient(148deg,rgba(255,255,255,0.088) 0%,rgba(99,102,241,0.065) 100%);border-color:rgba(99,102,241,0.38);border-top-color:rgba(168,85,247,0.55);transform:translateY(-5px);box-shadow:0 28px 56px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,0.15)}
.glass-neo{background:linear-gradient(162deg,rgba(255,255,255,0.062) 0%,rgba(255,255,255,0.026) 48%,rgba(99,102,241,0.042) 100%);backdrop-filter:saturate(2.1) blur(30px);-webkit-backdrop-filter:saturate(2.1) blur(30px);border:1px solid rgba(255,255,255,0.13);border-top-color:rgba(255,255,255,0.26);box-shadow:0 22px 65px rgba(0,0,0,0.52),inset 0 1px 0 rgba(255,255,255,0.15);position:relative;overflow:hidden}
.glass-neo::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:var(--prism-line)}
.nav-blur{backdrop-filter:saturate(2.2) blur(32px);-webkit-backdrop-filter:saturate(2.2) blur(32px);background:linear-gradient(180deg,rgba(3,5,18,0.88) 0%,rgba(3,5,18,0.78) 100%);border-bottom:1px solid rgba(255,255,255,0.07);box-shadow:0 4px 30px rgba(0,0,0,0.4)}
.glow-text{background:linear-gradient(135deg,#818cf8 0%,#a855f7 40%,#ec4899 70%,#f59e0b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.glow-text-2{background:linear-gradient(135deg,#06b6d4 0%,#818cf8 50%,#a855f7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.glow-text-3{background:linear-gradient(135deg,#10b981,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.btn-primary{background:linear-gradient(135deg,#4338ca 0%,#6d28d9 35%,#7c3aed 65%,#a855f7 100%);background-size:200% 200%;transition:transform .28s cubic-bezier(.22,.8,.22,1),box-shadow .28s ease;box-shadow:0 5px 32px rgba(99,102,241,0.58),inset 0 1px 0 rgba(255,255,255,0.22);animation:gradient-x 4.5s ease infinite}
.btn-primary:hover{transform:translateY(-2px) scale(1.025);box-shadow:0 14px 50px rgba(99,102,241,0.78),inset 0 1px 0 rgba(255,255,255,0.28)}
.btn-ghost{background:linear-gradient(148deg,rgba(255,255,255,0.058),rgba(255,255,255,0.022));border:1px solid rgba(255,255,255,0.13);border-top-color:rgba(255,255,255,0.22);backdrop-filter:blur(14px);box-shadow:0 2px 14px rgba(0,0,0,0.32),inset 0 1px 0 rgba(255,255,255,0.09);transition:all .3s cubic-bezier(.22,.8,.22,1)}
.btn-ghost:hover{background:linear-gradient(148deg,rgba(99,102,241,0.13),rgba(99,102,241,0.052));border-color:rgba(99,102,241,0.42);transform:translateY(-1px)}
.section-label{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:24px;background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.06));border:1px solid rgba(99,102,241,0.25);border-top-color:rgba(168,85,247,0.35);backdrop-filter:blur(10px);box-shadow:0 2px 12px rgba(99,102,241,0.1),inset 0 1px 0 rgba(255,255,255,0.06);font-size:11px;font-weight:700;color:#a5b4fc;text-transform:uppercase;letter-spacing:.12em}
.ai-dot{width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 12px rgba(16,185,129,1)}
.divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)}
.neon-line{height:1px;background:linear-gradient(90deg,transparent 0%,rgba(99,102,241,0.7) 25%,rgba(168,85,247,0.8) 50%,rgba(236,72,153,0.6) 75%,transparent 100%);box-shadow:0 0 12px rgba(99,102,241,0.3)}
.fade-up{opacity:0;transform:translateY(24px);transition:opacity .85s cubic-bezier(.25,.8,.25,1),transform .85s cubic-bezier(.25,.8,.25,1)}
.fade-up.visible{opacity:1;transform:translateY(0)}
.fade-in{opacity:0;transition:opacity .7s ease}
.fade-in.visible{opacity:1}
.nav-link{position:relative;transition:color .25s ease;color:#94a3b8}
.nav-link::after{content:'';position:absolute;bottom:-4px;left:50%;right:50%;height:1.5px;background:var(--prism-line);transition:left .35s cubic-bezier(.22,.8,.22,1),right .35s cubic-bezier(.22,.8,.22,1);border-radius:2px}
.nav-link:hover::after,.nav-link.active::after{left:0;right:0}
.nav-link:hover,.nav-link.active{color:#c7d2fe}
@keyframes gradient-x{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}
.blink{animation:blink 1.8s ease infinite}
#mobile-nav{transition:all .35s cubic-bezier(.25,.8,.25,1);max-height:0;overflow:hidden;opacity:0}
#mobile-nav.open{max-height:600px;opacity:1}
.prose-content h2{font-size:1.5rem;font-weight:800;color:#fff;margin:2.5rem 0 1rem;font-family:'Space Grotesk',sans-serif;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:.75rem}
.prose-content h3{font-size:1.1rem;font-weight:700;color:#c7d2fe;margin:1.75rem 0 .6rem}
.prose-content p{color:#94a3b8;line-height:1.85;margin-bottom:1rem;font-size:.95rem}
.prose-content ul{list-style:none;margin:.75rem 0 1rem 0;padding:0}
.prose-content ul li{color:#94a3b8;font-size:.9rem;line-height:1.8;padding:.2rem 0 .2rem 1.5rem;position:relative}
.prose-content ul li::before{content:'›';position:absolute;left:0;color:#6366f1;font-weight:700}
.prose-content a{color:#a5b4fc;text-decoration:underline;text-underline-offset:3px}
.prose-content a:hover{color:#c7d2fe}
.prose-content strong{color:#e2e8f0;font-weight:700}
.toc-link{display:block;padding:.35rem .75rem;border-radius:.5rem;font-size:.82rem;color:#64748b;transition:all .2s ease;border-left:2px solid transparent}
.toc-link:hover,.toc-link.active{color:#a5b4fc;background:rgba(99,102,241,0.07);border-left-color:#6366f1}
</style>`

export function publicNav(active = ''): string {
  return `
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" id="navbar">
  <div class="max-w-7xl mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between">
    <a href="/" class="flex items-center gap-3 group" aria-label="AdNova AI">
      <div class="relative">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          <i class="fas fa-bolt text-white text-sm"></i>
        </div>
      </div>
      <span class="font-black text-white text-[18px] tracking-tight">AdNova <span class="glow-text">AI</span></span>
    </a>
    <div class="hidden md:flex items-center gap-5">
      <a href="/about" class="nav-link text-sm font-medium ${active==='about'?'active':''}">About</a>
      <a href="/blog" class="nav-link text-sm font-medium ${active==='blog'?'active':''}">Blog</a>
      <a href="/customers" class="nav-link text-sm font-medium ${active==='customers'?'active':''}">Customers</a>
      <a href="/careers" class="nav-link text-sm font-medium ${active==='careers'?'active':''}">Careers</a>
      <a href="/#pricing" class="nav-link text-sm font-medium">Pricing</a>
    </div>
    <div class="hidden md:flex items-center gap-3">
      <a href="/login" class="btn-ghost text-sm text-slate-300 font-medium px-4 py-2 rounded-xl">Sign In</a>
      <a href="/register" class="btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2">
        <i class="fas fa-rocket text-xs"></i> Start Free Trial
      </a>
    </div>
    <button onclick="toggleMobileNav()" class="md:hidden glass rounded-xl w-10 h-10 flex items-center justify-center" aria-label="Menu">
      <i class="fas fa-bars text-slate-300 text-sm" id="mobile-icon"></i>
    </button>
  </div>
  <div id="mobile-nav" class="md:hidden border-t border-white/5 bg-black/85 backdrop-blur-2xl">
    <div class="px-5 py-4 space-y-1">
      <a href="/about" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5">About</a>
      <a href="/blog" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5">Blog</a>
      <a href="/customers" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5">Customers</a>
      <a href="/careers" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5">Careers</a>
      <a href="/#pricing" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5">Pricing</a>
      <div class="pt-3 flex flex-col gap-2 border-t border-white/5 mt-2">
        <a href="/login" class="btn-ghost text-sm text-center text-slate-300 px-4 py-2.5 rounded-xl">Sign In</a>
        <a href="/register" class="btn-primary text-white text-sm font-bold px-4 py-3 rounded-xl text-center flex items-center justify-center gap-2">
          <i class="fas fa-rocket text-xs"></i> Start Free Trial
        </a>
      </div>
    </div>
  </div>
</nav>`
}

export function publicFooter(): string {
  return `
<footer style="border-top:1px solid rgba(255,255,255,0.07);background:linear-gradient(180deg,rgba(3,5,18,0.95),rgba(2,3,12,0.98));backdrop-filter:blur(20px)">
  <div class="max-w-7xl mx-auto px-5 md:px-8 py-10">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
      <div class="col-span-2">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg">
            <i class="fas fa-bolt text-white text-sm"></i>
          </div>
          <span class="font-black text-white text-xl">AdNova <span class="glow-text">AI</span></span>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed max-w-xs">Autonomous advertising intelligence. 9 platforms. 487K decisions/hour.</p>
        <div class="flex items-center gap-2 mt-4">
          <div class="w-2 h-2 rounded-full bg-emerald-400 blink"></div>
          <span class="text-xs text-emerald-500 font-bold">All systems operational</span>
        </div>
        <div class="flex items-center gap-2 mt-4">
          <a href="#" class="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 transition-all"><i class="fab fa-x-twitter text-xs"></i></a>
          <a href="#" class="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 transition-all"><i class="fab fa-linkedin-in text-xs"></i></a>
          <a href="#" class="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 transition-all"><i class="fab fa-github text-xs"></i></a>
          <a href="#" class="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 transition-all"><i class="fab fa-youtube text-xs"></i></a>
        </div>
      </div>
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Product</div>
        <div class="space-y-2.5">
          <a href="/#features" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Features</a>
          <a href="/#pricing" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Pricing</a>
          <a href="/#use-cases" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Use Cases</a>
          <a href="/#case-studies" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Case Studies</a>
          <a href="/login" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Dashboard</a>
        </div>
      </div>
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Company</div>
        <div class="space-y-2.5">
          <a href="/about" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">About</a>
          <a href="/customers" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Customers</a>
          <a href="/blog" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Blog</a>
          <a href="/careers" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Careers</a>
          <a href="/press-kit" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Press Kit</a>
        </div>
      </div>
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Legal</div>
        <div class="space-y-2.5">
          <a href="/privacy" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Privacy Policy</a>
          <a href="/terms" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Terms of Service</a>
          <a href="/security" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Security</a>
          <a href="/admin/login" class="block text-sm text-slate-700 hover:text-slate-500 transition-colors">Admin →</a>
        </div>
      </div>
    </div>
    <div class="divider mb-4"></div>
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-xs text-slate-700">© 2026 AdNova AI. All rights reserved. Powered by Cloudflare Workers.</p>
      <div class="flex items-center gap-4 text-xs text-slate-700">
        <span class="flex items-center gap-1.5"><i class="fas fa-shield-halved text-emerald-600"></i> SOC2 Type II</span>
        <span class="flex items-center gap-1.5"><i class="fas fa-lock text-blue-600"></i> GDPR</span>
        <span class="flex items-center gap-1.5"><i class="fas fa-globe text-brand-600"></i> 9 Platforms</span>
      </div>
    </div>
  </div>
</footer>
<script>
function toggleMobileNav(){const n=document.getElementById('mobile-nav'),i=document.getElementById('mobile-icon');n.classList.toggle('open');i.className=n.classList.contains('open')?'fas fa-times text-slate-300 text-sm':'fas fa-bars text-slate-300 text-sm';}
const _obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');_obs.unobserve(e.target)}})},{threshold:0.06,rootMargin:'0px 0px -30px 0px'});
(typeof requestIdleCallback!=='undefined'?requestIdleCallback:setTimeout)(()=>{document.querySelectorAll('.fade-up,.fade-in').forEach(el=>_obs.observe(el))},50);
</script>`
}
