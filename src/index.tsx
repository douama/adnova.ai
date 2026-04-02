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

// Middleware (must be registered before routes)
app.use('*', logger())
app.use('/api/*', cors())
app.use('/admin/api/*', cors())

// ─── Performance: cache headers + security ────────────────────────────────
app.use('*', async (c, next) => {
  await next()
  // Guard: don't touch headers on 204/205 (no-content responses)
  const status = c.res.status
  if (status === 204 || status === 205) return

  try {
    const url = c.req.url
    // Cache static assets aggressively
    if (url.endsWith('.svg') || url.endsWith('.png') || url.endsWith('.ico')) {
      c.res.headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
    }
    // Cache GET API responses briefly (not /api/track)
    if (url.includes('/api/') && c.req.method === 'GET' && !url.includes('/api/track')) {
      c.res.headers.set('Cache-Control', 'public, max-age=15, stale-while-revalidate=60')
    }
    // Security headers for all responses
    c.res.headers.set('X-Frame-Options', 'SAMEORIGIN')
    c.res.headers.set('X-Content-Type-Options', 'nosniff')
    c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  } catch (_) { /* headers already sent — ignore */ }
})

// ─── Health check ─────────────────────────────────────────────────────────
app.get('/health', (c) => c.json({ status: 'ok', version: '2.0', ts: Date.now() }))

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

// ─── Analytics tracking endpoint (replaces missing /api/track) ─────────────
// Accepts sendBeacon POST from frontend — always returns 204 No Content
app.post('/api/track', async (c) => {
  try {
    // Silently consume the body to drain the stream (required by Hono/Workers)
    await c.req.text()
  } catch (_) { /* ignore */ }
  return new Response(null, { status: 204 })
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

// ─── Global error handler ─────────────────────────────────────────────────
app.onError((err, c) => {
  console.error('[AdNova Error]', err.message, c.req.url)
  if (c.req.path.startsWith('/api/') || c.req.path.startsWith('/admin/api/')) {
    return c.json({ error: 'Internal server error', message: err.message }, 500)
  }
  return c.html(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Error — AdNova AI</title></head><body style="background:#030512;color:#e2e8f0;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0"><div style="text-align:center"><h1 style="font-size:2rem;color:#6366f1;margin-bottom:1rem">AdNova AI</h1><p style="color:#64748b;margin-bottom:1.5rem">Something went wrong on our end.</p><a href="/" style="background:#6366f1;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600">Return to homepage</a></div></body></html>`, 500)
})

// ─── 404 handler ──────────────────────────────────────────────────────────
app.notFound((c) => {
  if (c.req.path.startsWith('/api/') || c.req.path.startsWith('/admin/api/')) {
    return c.json({ error: 'Route not found', path: c.req.path }, 404)
  }
  // Redirect unknown pages to home
  return c.redirect('/', 302)
})

export default app
