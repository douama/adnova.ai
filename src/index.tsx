import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

// Import route handlers
import { authRoutes } from './routes/auth'
import { dashboardRoutes } from './routes/dashboard'
import { campaignRoutes } from './routes/campaigns'
import { creativeRoutes } from './routes/creatives'
import { analyticsRoutes } from './routes/analytics'
import { aiRoutes } from './routes/ai'
import { platformRoutes } from './routes/platforms'
import { billingRoutes } from './routes/billing'
import { tenantRoutes } from './routes/tenants'
import { audienceRoutes } from './routes/audiences'
import { automationRoutes } from './routes/automation'

// Import page handlers
import { renderLogin } from './pages/login'
import { renderDashboard } from './pages/dashboard'
import { renderCampaigns } from './pages/campaigns'
import { renderCreatives } from './pages/creatives'
import { renderAnalytics } from './pages/analytics'
import { renderAIEngine } from './pages/ai-engine'
import { renderPlatforms } from './pages/platforms'
import { renderBilling } from './pages/billing'
import { renderAudiences } from './pages/audiences'
import { renderAutomation } from './pages/automation'
import { renderSettings } from './pages/settings'
import { renderAffiliate } from './pages/affiliate'
import { renderDecisions } from './pages/decisions'
import { renderRegister } from './pages/register'
import { renderLanding } from './pages/landing'
import { renderTerms } from './pages/terms'
import { renderPrivacy } from './pages/privacy'
import { renderAbout } from './pages/about'
import { renderCustomers } from './pages/customers'
import { renderBlog, renderBlogArticle, BLOG_ARTICLES } from './pages/blog'
import { renderCareers } from './pages/careers'
import { renderPressKit } from './pages/press-kit'
import { renderPartners } from './pages/partners'
import { renderVsSmartly } from './pages/vs-smartly'
import { renderPricing } from './pages/pricing'

// ─── Super Admin imports ───────────────────────────────────────────────────
import { adminRoutes } from './admin/routes/admin'
import { renderAdminLogin } from './admin/pages/login'
import { renderAdminDashboard } from './admin/pages/dashboard'
import { renderAdminTenants } from './admin/pages/tenants'
import { renderAdminUsers } from './admin/pages/users'
import { renderAdminRevenue } from './admin/pages/revenue'
import { renderAdminAIMonitor } from './admin/pages/ai-monitor'
import { renderAdminLogs } from './admin/pages/logs'
import { renderAdminSecurity } from './admin/pages/security'
import { renderAdminConfig } from './admin/pages/config'
import { renderAdminPlans } from './admin/pages/plans'
import { renderAdminBilling } from './admin/pages/billing'
import { renderAdminAffiliates } from './admin/pages/affiliates'

// ─── i18n detection ────────────────────────────────────────────────────────
import { detectLang } from './lib/i18n'

// ─── Admin token verification ──────────────────────────────────────────────
import { verifyAdminToken } from './routes/auth'

// ═══════════════════════════════════════════════════════════════════════════
// RATE LIMITER — in-memory sliding window (per IP, resets on Worker restart)
// ═══════════════════════════════════════════════════════════════════════════
const rateMap = new Map<string, { count: number; reset: number }>()

function getRateKey(c: any): string {
  return (
    c.req.raw.headers.get('CF-Connecting-IP') ||
    c.req.raw.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs })
    // Cleanup old entries periodically (keep map small)
    if (rateMap.size > 5000) {
      for (const [k, v] of rateMap) { if (now > v.reset) rateMap.delete(k) }
    }
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

// ═══════════════════════════════════════════════════════════════════════════
// SECURITY HEADERS — Production-grade
// ═══════════════════════════════════════════════════════════════════════════
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), serial=()',
  'X-XSS-Protection': '0',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'X-DNS-Prefetch-Control': 'on',
  'Timing-Allow-Origin': 'https://adnova.ai',
  'NEL': '{"report_to":"default","max_age":31536000,"include_subdomains":true}',
}

// CSP — Tailwind CDN + Google Fonts + FA + inline styles + connect analytics.
// `worker-src 'self' blob:` is required because the Tailwind Play CDN spawns
// a Web Worker from a Blob URL to compile utility classes at runtime; without
// it, Tailwind silently fails and grid/flex utility classes never render.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' blob: https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdn.tailwindcss.com",
  "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:",
  "img-src 'self' data: blob: https: http: https://randomuser.me",
  "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://cdn.tailwindcss.com https://fonts.googleapis.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://adnova.ai",
  "upgrade-insecure-requests",
].join('; ')

// ═══════════════════════════════════════════════════════════════════════════
// HONO APP
// ═══════════════════════════════════════════════════════════════════════════
const app = new Hono()

// ─── CORS — restricted to own origin for API ──────────────────────────────
app.use('/api/*', cors({
  origin: ['https://adnova.ai', 'https://www.adnova.ai'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['X-RateLimit-Remaining'],
  maxAge: 600,
  credentials: true,
}))
app.use('/admin/api/*', cors({
  origin: ['https://adnova.ai', 'https://www.adnova.ai'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
  credentials: true,
}))

app.use('*', logger())

// ─── Security + Cache headers middleware ──────────────────────────────────
// Note: we access c.res only if the request was actually finalized by a
// downstream handler. Touching c.res prematurely would short-circuit
// app.notFound() (Hono's c.res getter creates an empty 200 response).
app.use('*', async (c, next) => {
  await next()
  if (!c.finalized) return // let app.notFound() handle unmatched routes
  const status = c.res.status
  if (status === 204 || status === 205) return
  try {
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
      c.res.headers.set(k, v)
    }
    const ct = c.res.headers.get('Content-Type') || ''
    if (ct.includes('text/html')) {
      c.res.headers.set('Content-Security-Policy', CSP)
    }
    const url = c.req.url
    if (url.endsWith('.svg') || url.endsWith('.png') || url.endsWith('.ico') || url.endsWith('.webp')) {
      c.res.headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=2592000')
    } else if (url.includes('/api/') && c.req.method === 'GET' && !url.includes('/api/track') && !url.includes('/api/lang')) {
      c.res.headers.set('Cache-Control', 'public, max-age=10, stale-while-revalidate=30')
    } else if (url === '/' || url.endsWith('/')) {
      c.res.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=300')
    }
  } catch (_) { /* already finalized */ }
})

// ─── Rate limiting middleware ─────────────────────────────────────────────
// Auth routes: 20 req/min; API routes: 120 req/min; Landing: 300 req/min
app.use('/api/auth/*', async (c, next) => {
  const ip = getRateKey(c)
  if (!checkRateLimit(`auth:${ip}`, 20, 60_000)) {
    return c.json({ error: 'Too many requests. Please wait 60s.' }, 429)
  }
  await next()
})
app.use('/api/*', async (c, next) => {
  if (c.req.path === '/api/track') { await next(); return }
  const ip = getRateKey(c)
  if (!checkRateLimit(`api:${ip}`, 120, 60_000)) {
    return c.json({ error: 'Rate limit exceeded.' }, 429)
  }
  await next()
})
app.use('/admin/api/*', async (c, next) => {
  const ip = getRateKey(c)
  if (!checkRateLimit(`admin:${ip}`, 60, 60_000)) {
    return c.json({ error: 'Rate limit exceeded.' }, 429)
  }
  await next()
})

// ─── Input size limit (prevent body flooding) ────────────────────────────
app.use('/api/*', async (c, next) => {
  const cl = parseInt(c.req.header('Content-Length') || '0', 10)
  if (cl > 512_000) {
    return c.json({ error: 'Request body too large (max 512 KB).' }, 413)
  }
  await next()
})

// ═══════════════════════════════════════════════════════════════════════════
// SEO ROUTES — sitemap.xml, robots.txt, manifest
// ═══════════════════════════════════════════════════════════════════════════
app.get('/sitemap.xml', (c) => {
  const now = new Date().toISOString().split('T')[0]
  const blogUrls = BLOG_ARTICLES.map(a => `  <url>
    <loc>https://adnova.ai/blog/${a.slug}</loc>
    <lastmod>${a.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- ══ Landing page — priorité maximale, multilingue ══ -->
  <url>
    <loc>https://adnova.ai/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://adnova.ai/"/>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://adnova.ai/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://adnova.ai/?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="fr-FR" href="https://adnova.ai/?lang=fr"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://adnova.ai/?lang=es"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://adnova.ai/?lang=de"/>
    <xhtml:link rel="alternate" hreflang="pt" href="https://adnova.ai/?lang=pt"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://adnova.ai/?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://adnova.ai/"/>
    <image:image>
      <image:loc>https://adnova.ai/og-image.png</image:loc>
      <image:title>AdNova AI — Autonomous Advertising Intelligence Dashboard</image:title>
      <image:caption>4.82x average ROAS across 2,412 active brands</image:caption>
    </image:image>
  </url>
  <!-- ══ Inscription — priorité très haute (conversion) ══ -->
  <url>
    <loc>https://adnova.ai/register</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://adnova.ai/register"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://adnova.ai/register"/>
  </url>
  <!-- ══ Connexion ══ -->
  <url>
    <loc>https://adnova.ai/login</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- ══ Pages marketing ══ -->
  <url><loc>https://adnova.ai/about</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
  <url><loc>https://adnova.ai/customers</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>
  <url><loc>https://adnova.ai/blog</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.80</priority></url>
  <url><loc>https://adnova.ai/careers</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.75</priority></url>
  <url><loc>https://adnova.ai/press-kit</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.65</priority></url>
  <url><loc>https://adnova.ai/terms</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.4</priority></url>
  <url><loc>https://adnova.ai/privacy</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.4</priority></url>
  <!-- ══ Articles de blog ══ -->
${blogUrls}
</urlset>`
  return c.body(xml, 200, {
    'Content-Type': 'application/xml; charset=UTF-8',
    'Cache-Control': 'public, max-age=43200, stale-while-revalidate=86400',
    'X-Robots-Tag': 'noindex',
  })
})

app.get('/robots.txt', (c) => {
  const txt = `User-agent: *
Allow: /
Allow: /register
Allow: /login
Allow: /about
Allow: /customers
Allow: /blog
Allow: /blog/
Allow: /careers
Allow: /press-kit
Allow: /terms
Allow: /privacy
Disallow: /admin
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard
Disallow: /campaigns
Disallow: /analytics
Disallow: /creatives
Disallow: /ai-engine
Disallow: /billing
Disallow: /settings
Disallow: /audiences
Disallow: /automation
Disallow: /platforms

# Sitemap
Sitemap: https://adnova.ai/sitemap.xml

# Crawl-delay for respectful bots
Crawl-delay: 1`
  return c.body(txt, 200, {
    'Content-Type': 'text/plain; charset=UTF-8',
    'Cache-Control': 'public, max-age=86400',
  })
})

app.get('/manifest.json', (c) => {
  return c.json({
    name: 'AdNova AI — Autonomous Advertising Intelligence',
    short_name: 'AdNova AI',
    description: 'AI manages your ads across 9 platforms autonomously. Average ROAS: 4.82x. Free 14-day trial.',
    start_url: '/?utm_source=pwa',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui', 'browser'],
    background_color: '#030512',
    theme_color: '#FF4D00',
    orientation: 'any',
    lang: 'en-US',
    dir: 'ltr',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
    ],
    screenshots: [
      {
        src: '/screenshot.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'AdNova AI Dashboard — 4.82x ROAS'
      }
    ],
    categories: ['business', 'productivity', 'finance'],
    related_applications: [],
    prefer_related_applications: false,
    shortcuts: [
      { name: 'Dashboard', short_name: 'Dashboard', description: 'View your ad performance', url: '/dashboard?utm_source=pwa-shortcut', icons: [{ src: '/favicon.svg', sizes: 'any' }] },
      { name: 'Start Free Trial', short_name: 'Free Trial', description: 'Start your 14-day free trial', url: '/register?utm_source=pwa-shortcut', icons: [{ src: '/favicon.svg', sizes: 'any' }] }
    ],
    share_target: {
      action: '/share',
      method: 'GET',
      params: { title: 'title', text: 'text', url: 'url' }
    }
  }, 200, { 'Cache-Control': 'public, max-age=86400' })
})

// ─── browserconfig.xml — Windows tiles ───────────────────────────────────────
app.get('/browserconfig.xml', (c) => {
  const xml = `<?xml version="1.0" encoding="utf-8"?><browserconfig><msapplication><tile><square150x150logo src="/favicon.svg"/><TileColor>#FF4D00</TileColor></tile></msapplication></browserconfig>`
  return c.body(xml, 200, { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' })
})

// ─── Favicon ──────────────────────────────────────────────────────────────
app.get('/favicon.ico', (c) => c.redirect('/favicon.svg', 301))
app.get('/favicon.svg', (c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF4D00"/>
      <stop offset="50%" style="stop-color:#8b5cf6"/>
      <stop offset="100%" style="stop-color:#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/>
  <path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/>
</svg>`
  return c.body(svg, 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=604800',
  })
})

// ─── Health check ─────────────────────────────────────────────────────────
app.get('/health', (c) => c.json({
  status: 'ok', version: '2.0',
  ts: Date.now(), uptime: (globalThis as any).process?.uptime?.() ?? 0,
}))

// ─── Language detection API ────────────────────────────────────────────────
app.get('/api/lang', (c) => {
  const lang = detectLang(c.req.raw)
  const country = c.req.raw.headers.get('CF-IPCountry') || 'US'
  return c.json({ lang, country }, 200, { 'Cache-Control': 'private, max-age=300' })
})

// ─── Translations API ──────────────────────────────────────────────────────
app.get('/api/lang/translations/:lang', async (c) => {
  try {
    const { getTranslations } = await import('./lib/i18n')
    const lang = c.req.param('lang') as any
    const translations = getTranslations(lang)
    return c.json(translations, 200, { 'Cache-Control': 'public, max-age=604800' })
  } catch (_) {
    return c.json({}, 200)
  }
})

// ─── Analytics tracking — 204 No Content (never logs errors) ─────────────
app.post('/api/track', async (c) => {
  try { await c.req.text() } catch (_) {}
  return new Response(null, { status: 204 })
})

// ═══════════════════════════════════════════════════════════════════════════
// PAGE ROUTES
// ═══════════════════════════════════════════════════════════════════════════
app.get('/', renderLanding)
app.get('/login', renderLogin)
app.get('/register', renderRegister)

// ─── Public Marketing Pages ────────────────────────────────────────────────
app.get('/terms',      (c) => c.html(renderTerms()))
app.get('/privacy',    (c) => c.html(renderPrivacy()))
app.get('/about',      (c) => c.html(renderAbout()))
app.get('/customers',  (c) => c.html(renderCustomers()))
app.get('/blog',       (c) => c.html(renderBlog()))
app.get('/blog/:slug', (c) => c.html(renderBlogArticle(c.req.param('slug'))))
app.get('/careers',    (c) => c.html(renderCareers()))
app.get('/press-kit',  (c) => c.html(renderPressKit()))
app.get('/partners',   (c) => c.html(renderPartners()))
app.get('/vs-smartly', (c) => c.html(renderVsSmartly()))
app.get('/vs-cometly', (c) => c.redirect('/vs-smartly', 301)) // SEO preservation
app.get('/pricing',    (c) => c.html(renderPricing()))

app.get('/dashboard', renderDashboard)
app.get('/campaigns',  (c) => c.html(renderCampaigns(detectLang(c.req.raw))))
app.get('/creatives',  (c) => c.html(renderCreatives(detectLang(c.req.raw))))
app.get('/analytics',  (c) => c.html(renderAnalytics(detectLang(c.req.raw))))
app.get('/ai-engine',  (c) => c.html(renderAIEngine(detectLang(c.req.raw))))
app.get('/platforms',  (c) => c.html(renderPlatforms(detectLang(c.req.raw))))
app.get('/billing',    (c) => c.html(renderBilling(detectLang(c.req.raw))))
app.get('/audiences',  (c) => c.html(renderAudiences(detectLang(c.req.raw))))
app.get('/automation', (c) => c.html(renderAutomation(detectLang(c.req.raw))))
app.get('/settings',   (c) => c.html(renderSettings(detectLang(c.req.raw))))
app.get('/affiliate',  (c) => c.html(renderAffiliate(detectLang(c.req.raw))))
app.get('/decisions',  (c) => c.html(renderDecisions(detectLang(c.req.raw))))

// ═══════════════════════════════════════════════════════════════════════════
// API ROUTES
// ═══════════════════════════════════════════════════════════════════════════
app.route('/api/auth',       authRoutes)
app.route('/api/dashboard',  dashboardRoutes)
app.route('/api/campaigns',  campaignRoutes)
app.route('/api/creatives',  creativeRoutes)
app.route('/api/analytics',  analyticsRoutes)
app.route('/api/ai',         aiRoutes)
app.route('/api/platforms',  platformRoutes)
app.route('/api/billing',    billingRoutes)
app.route('/api/tenants',    tenantRoutes)
app.route('/api/audiences',  audienceRoutes)
app.route('/api/automation', automationRoutes)

// ─── Super Admin guard — requires HMAC-signed token ───────────────────────
// Token sent either as `Authorization: Bearer <token>` (admin API) or
// `?t=<token>` query / `adnova_admin_token` cookie (HTML pages, since
// localStorage isn't available before page render — frontend should set cookie).
async function getAdminToken(c: any): Promise<string | null> {
  const auth = c.req.header('Authorization')
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  const q = c.req.query('t')
  if (q) return q
  const cookie = c.req.raw.headers.get('Cookie') || ''
  const m = cookie.match(/adnova_admin_token=([^;]+)/)
  return m ? decodeURIComponent(m[1]) : null
}

app.use('/admin/*', async (c, next) => {
  // Allow login page and login API without auth
  if (c.req.path === '/admin/login' || c.req.path === '/api/auth/admin/login') {
    return next()
  }
  const secret = (c.env as any)?.ADMIN_SESSION_SECRET as string | undefined
  if (!secret) {
    // Misconfigured environment — fail closed
    if (c.req.path.startsWith('/admin/api/')) {
      return c.json({ error: 'Admin auth not configured.' }, 503)
    }
    return c.redirect('/admin/login', 302)
  }
  const token = await getAdminToken(c)
  const payload = token ? await verifyAdminToken(secret, token) : null
  if (!payload || payload.role !== 'superadmin') {
    if (c.req.path.startsWith('/admin/api/')) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    return c.redirect('/admin/login', 302)
  }
  ;(c as any).set('admin', payload)
  await next()
})

// ─── Super Admin Pages ─────────────────────────────────────────────────────
app.get('/admin/login',      renderAdminLogin)
app.get('/admin',            renderAdminDashboard)
app.get('/admin/tenants',    renderAdminTenants)
app.get('/admin/users',      renderAdminUsers)
app.get('/admin/revenue',    renderAdminRevenue)
app.get('/admin/ai-monitor', renderAdminAIMonitor)
app.get('/admin/logs',       renderAdminLogs)
app.get('/admin/security',   renderAdminSecurity)
app.get('/admin/config',     renderAdminConfig)
app.get('/admin/plans',      renderAdminPlans)
app.get('/admin/billing',    renderAdminBilling)
app.get('/admin/affiliates', renderAdminAffiliates)

app.get('/admin/campaigns',  (c) => c.redirect('/admin', 302))
app.get('/admin/creatives',  (c) => c.redirect('/admin', 302))
app.get('/admin/platforms',  (c) => c.redirect('/admin/config', 302))

app.route('/admin/api', adminRoutes)

// ─── Explicit catch-all (Hono's notFound can be shadowed by wildcard
// middlewares that touch c.res; an explicit `all('*')` is more reliable). ──
app.all('*', (c) => {
  if (c.req.path.startsWith('/api/') || c.req.path.startsWith('/admin/api/')) {
    return c.json({ error: 'Not found', path: c.req.path }, 404)
  }
  return c.redirect('/', 302)
})

// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLERS
// ═══════════════════════════════════════════════════════════════════════════
app.onError((err, c) => {
  console.error('[AdNova]', c.req.method, c.req.path, err.message)
  if (c.req.path.startsWith('/api/') || c.req.path.startsWith('/admin/api/')) {
    return c.json({ error: 'Internal server error' }, 500)
  }
  return c.html(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Error — AdNova AI</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#030512;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}.card{text-align:center;padding:2rem;max-width:400px}h1{color:#FF4D00;font-size:1.8rem;margin-bottom:.75rem}p{color:#7A7A7A;margin-bottom:1.5rem}a{background:#FF4D00;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block}</style></head><body><div class="card"><h1>AdNova AI</h1><p>Something went wrong on our end. Our team has been notified.</p><a href="/">← Back to home</a></div></body></html>`, 500)
})

app.notFound((c) => {
  if (c.req.path.startsWith('/api/') || c.req.path.startsWith('/admin/api/')) {
    return c.json({ error: 'Not found', path: c.req.path }, 404)
  }
  return c.redirect('/', 302)
})

export default app
