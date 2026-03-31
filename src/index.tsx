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

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('/api/*', cors())

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

// ─── Landing & Auth Pages ──────────────────────────────────────────────────
app.get('/', renderLanding)
app.get('/login', renderLogin)
app.get('/register', renderRegister)

// ─── Dashboard Pages ───────────────────────────────────────────────────────
app.get('/dashboard', renderDashboard)
app.get('/campaigns', renderCampaigns)
app.get('/creatives', renderCreatives)
app.get('/analytics', renderAnalytics)
app.get('/ai-engine', renderAIEngine)
app.get('/platforms', renderPlatforms)
app.get('/billing', renderBilling)
app.get('/audiences', renderAudiences)
app.get('/automation', renderAutomation)
app.get('/settings', renderSettings)

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

export default app
