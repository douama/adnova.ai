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
import { renderRegister } from './pages/register'
import { renderLanding } from './pages/landing'

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

// ─── i18n detection ────────────────────────────────────────────────────────
import { detectLang } from './lib/i18n'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('/api/*', cors())
app.use('/admin/api/*', cors())

// ─── Performance: cache headers ───────────────────────────────────────────
app.use('*', async (c, next) => {
  await next()
  // Cache static assets aggressively
  const url = c.req.url
  if (url.endsWith('.svg') || url.endsWith('.png') || url.endsWith('.ico')) {
    c.res.headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  }
  // Cache API responses briefly
  if (url.includes('/api/') && c.req.method === 'GET') {
    c.res.headers.set('Cache-Control', 'public, max-age=15, stale-while-revalidate=60')
  }
  // Security headers for all responses
  c.res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  c.res.headers.set('X-Content-Type-Options', 'nosniff')
  c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
})

// ─── Favicon ──────────────────────────────────────────────────────────────
app.get('/favicon.ico', (c) => c.redirect('/favicon.svg', 301))
app.get('/favicon.svg', (c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#8b5cf6"/></linearGradient></defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <path d="M16 8 L10 22 L16 18 L22 22 Z" fill="white"/>
</svg>`
  return c.body(svg, 200, { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'max-age=86400' })
})

// ─── Language detection API ────────────────────────────────────────────────
app.get('/api/lang', (c) => {
  const lang = detectLang(c.req.raw)
  const country = c.req.raw.headers.get('CF-IPCountry') || 'US'
  return c.json({ lang, country })
})

// ─── Landing & Auth Pages ──────────────────────────────────────────────────
app.get('/', renderLanding)
app.get('/login', renderLogin)
app.get('/register', renderRegister)

// ─── Dashboard Pages (with i18n) ───────────────────────────────────────────
app.get('/dashboard', renderDashboard)
app.get('/campaigns', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderCampaigns(lang))
})
app.get('/creatives', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderCreatives(lang))
})
app.get('/analytics', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderAnalytics(lang))
})
app.get('/ai-engine', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderAIEngine(lang))
})
app.get('/platforms', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderPlatforms(lang))
})
app.get('/billing', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderBilling(lang))
})
app.get('/audiences', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderAudiences(lang))
})
app.get('/automation', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderAutomation(lang))
})
app.get('/settings', (c) => {
  const lang = detectLang(c.req.raw)
  return c.html(renderSettings(lang))
})

// ─── API Routes ────────────────────────────────────────────────────────────
app.route('/api/auth', authRoutes)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/campaigns', campaignRoutes)
app.route('/api/creatives', creativeRoutes)
app.route('/api/analytics', analyticsRoutes)
app.route('/api/ai', aiRoutes)
app.route('/api/platforms', platformRoutes)
app.route('/api/billing', billingRoutes)
app.route('/api/tenants', tenantRoutes)
app.route('/api/audiences', audienceRoutes)
app.route('/api/automation', automationRoutes)

// ─── Super Admin Pages ─────────────────────────────────────────────────────
app.get('/admin/login', renderAdminLogin)
app.get('/admin', renderAdminDashboard)
app.get('/admin/tenants', renderAdminTenants)
app.get('/admin/users', renderAdminUsers)
app.get('/admin/revenue', renderAdminRevenue)
app.get('/admin/ai-monitor', renderAdminAIMonitor)
app.get('/admin/logs', renderAdminLogs)
app.get('/admin/security', renderAdminSecurity)
app.get('/admin/config', renderAdminConfig)
app.get('/admin/plans', renderAdminPlans)
app.get('/admin/billing', renderAdminBilling)

// Redirects for admin shortlinks
app.get('/admin/campaigns', (c) => c.redirect('/admin', 302))
app.get('/admin/creatives', (c) => c.redirect('/admin', 302))
app.get('/admin/platforms', (c) => c.redirect('/admin/config', 302))

// ─── Super Admin API Routes ────────────────────────────────────────────────
app.route('/admin/api', adminRoutes)

export default app
