import { Hono } from 'hono'

export const adminRoutes = new Hono()

// ─── Global Stats ─────────────────────────────────────────────────────────
adminRoutes.get('/stats', (c) => {
  return c.json({
    mrr: 1847200,
    arr: 22166400,
    arr_growth: 14.1,
    mrr_growth: 12.4,
    active_clients: 2412,
    trial_clients: 198,
    suspended_clients: 14,
    total_clients: 2624,
    churn_rate: 1.8,
    retention: 94.2,
    spend_managed: 847000000,
    spend_growth: 18.3,
    active_campaigns: 47284,
    creatives_generated: 12800000,
    creatives_today: 84200,
    uptime: 99.97,
    nps: 72,
    ai_decisions_hour: 487240,
    campaigns_scaled_24h: 1284,
    creatives_killed_24h: 8472,
    ai_accuracy: 94.2,
    active_models: 12,
    gpu_used: 48,
    gpu_total: 64,
    plan_distribution: {
      starter: 1240,
      growth: 892,
      enterprise: 280,
      trial: 198
    },
    platform_spend: {
      facebook: 312000000,
      google: 248000000,
      tiktok: 148000000,
      instagram: 97000000,
      snapchat: 42000000
    }
  })
})

// ─── Tenants ──────────────────────────────────────────────────────────────
adminRoutes.get('/tenants', (c) => {
  const tenants = [
    { id: 'T001', name: 'Apex Marketing', plan: 'Enterprise', status: 'active', spend: 312000, roas: 6.2, campaigns: 284, users: 18, mrr: 'Custom', joined: '2024-06-12', country: 'FR' },
    { id: 'T002', name: 'Mega Retail Co.', plan: 'Enterprise', status: 'active', spend: 284000, roas: 5.8, campaigns: 241, users: 24, mrr: 'Custom', joined: '2024-07-03', country: 'US' },
    { id: 'T003', name: 'LuxoGroup', plan: 'Growth', status: 'active', spend: 148500, roas: 4.9, campaigns: 127, users: 8, mrr: 799, joined: '2024-08-19', country: 'FR' },
    { id: 'T004', name: 'Digital Storm Agency', plan: 'Growth', status: 'active', spend: 84200, roas: 4.6, campaigns: 89, users: 12, mrr: 799, joined: '2026-03-31', country: 'CA' },
    { id: 'T005', name: 'FlashRetail Pro', plan: 'Growth', status: 'active', spend: 67800, roas: 5.1, campaigns: 72, users: 6, mrr: 799, joined: '2026-03-29', country: 'UK' },
    { id: 'T006', name: 'NovaBrand Inc.', plan: 'Starter', status: 'active', spend: 12400, roas: 3.8, campaigns: 18, users: 3, mrr: 299, joined: '2026-03-30', country: 'DE' },
    { id: 'T007', name: 'SportNation', plan: 'Starter', status: 'active', spend: 9100, roas: 2.9, campaigns: 12, users: 2, mrr: 299, joined: '2026-03-26', country: 'ES' },
    { id: 'T008', name: 'Trendy Store', plan: 'Trial', status: 'trial', spend: 0, roas: 0, campaigns: 2, users: 1, mrr: 0, joined: '2026-03-27', country: 'FR' },
    { id: 'T009', name: 'Promo Corp', plan: 'Starter', status: 'active', spend: 8200, roas: 3.1, campaigns: 9, users: 2, mrr: 299, joined: '2025-11-14', country: 'IT' },
    { id: 'T010', name: 'Fashion Brand', plan: 'Trial', status: 'trial', spend: 0, roas: 0, campaigns: 1, users: 1, mrr: 0, joined: '2026-03-29', country: 'FR' },
    { id: 'T011', name: 'TechStart Inc.', plan: 'Growth', status: 'active', spend: 42000, roas: 3.4, campaigns: 44, users: 5, mrr: 799, joined: '2025-12-08', country: 'US' },
    { id: 'T012', name: 'SpamCo', plan: 'Starter', status: 'suspended', spend: 0, roas: 0, campaigns: 0, users: 1, mrr: 0, joined: '2026-03-01', country: 'RU' },
  ]
  return c.json({ tenants, total: 2412, page: 1, per_page: 20 })
})

adminRoutes.get('/tenants/:id', (c) => {
  const id = c.req.param('id')
  return c.json({
    id, name: 'Apex Marketing', plan: 'Enterprise', status: 'active',
    spend: 312000, roas: 6.2, campaigns: 284, users: 18,
    mrr: 12000, joined: '2024-06-12', country: 'FR',
    contact_email: 'admin@apexmarketing.fr',
    total_spend_lifetime: 2840000,
    total_revenue_generated: 17608000,
    platforms: ['facebook', 'google', 'instagram', 'tiktok'],
    last_login: '2026-03-31T08:42:00Z',
    billing_status: 'paid',
    next_billing: '2026-04-12'
  })
})

adminRoutes.post('/tenants/:id/suspend', (c) => {
  return c.json({ success: true, message: 'Tenant suspendu avec succès' })
})

adminRoutes.post('/tenants/:id/reactivate', (c) => {
  return c.json({ success: true, message: 'Tenant réactivé avec succès' })
})

adminRoutes.put('/tenants/:id/plan', async (c) => {
  try {
    const body = await c.req.json()
    return c.json({ success: true, message: `Plan mis à jour: ${body.plan}` })
  } catch (_) { return c.json({ error: 'Invalid request body' }, 400) }
})

// ─── Users ────────────────────────────────────────────────────────────────
adminRoutes.get('/users', (c) => {
  const users = [
    { id: 'U001', name: 'Alexandre Martin', email: 'a.martin@apexmarketing.fr', tenant: 'Apex Marketing', role: 'Admin', last_login: '2026-03-31T08:42:00Z', status: 'active', mfa: true },
    { id: 'U002', name: 'Sophie Dubois', email: 's.dubois@digitalstorm.ca', tenant: 'Digital Storm Agency', role: 'Manager', last_login: '2026-03-31T09:12:00Z', status: 'active', mfa: true },
    { id: 'U003', name: 'Mehdi Benali', email: 'm.benali@luxogroup.fr', tenant: 'LuxoGroup', role: 'Admin', last_login: '2026-03-30T22:05:00Z', status: 'active', mfa: false },
    { id: 'U004', name: 'Clara Schmidt', email: 'c.schmidt@novabrands.de', tenant: 'NovaBrand Inc.', role: 'User', last_login: '2026-03-30T14:28:00Z', status: 'active', mfa: false },
    { id: 'U005', name: 'James Wilson', email: 'j.wilson@megaretail.com', tenant: 'Mega Retail Co.', role: 'Admin', last_login: '2026-03-31T07:55:00Z', status: 'active', mfa: true },
    { id: 'U006', name: 'Admin SuperAdmin', email: 'superadmin@adnova.ai', tenant: null, role: 'SuperAdmin', last_login: '2026-03-31T10:00:00Z', status: 'active', mfa: true },
    { id: 'U007', name: 'Suspect User', email: 'hacker@temp.com', tenant: 'SpamCo', role: 'User', last_login: '2026-03-01T03:22:00Z', status: 'suspended', mfa: false },
  ]
  return c.json({ users, total: 14280, page: 1, per_page: 20 })
})

adminRoutes.post('/users/:id/block', (c) => {
  return c.json({ success: true, message: 'Utilisateur bloqué' })
})

adminRoutes.post('/users/:id/reset-password', (c) => {
  return c.json({ success: true, message: 'Email de réinitialisation envoyé' })
})

// ─── Revenue ──────────────────────────────────────────────────────────────
adminRoutes.get('/revenue', (c) => {
  return c.json({
    mrr: 1847200,
    mrr_growth: 12.4,
    arr: 22166400,
    total_revenue_ytd: 4820000,
    stripe_balance: 284700,
    pending_payouts: 12400,
    failed_payments: 3,
    refunds_month: 2400,
    monthly: [
      { month: 'Avr 25', mrr: 980000, new_clients: 98, churned: 12 },
      { month: 'Mai 25', mrr: 1050000, new_clients: 112, churned: 10 },
      { month: 'Jun 25', mrr: 1120000, new_clients: 124, churned: 14 },
      { month: 'Jul 25', mrr: 1180000, new_clients: 136, churned: 11 },
      { month: 'Aoû 25', mrr: 1240000, new_clients: 148, churned: 9 },
      { month: 'Sep 25', mrr: 1310000, new_clients: 162, churned: 15 },
      { month: 'Oct 25', mrr: 1400000, new_clients: 178, churned: 13 },
      { month: 'Nov 25', mrr: 1490000, new_clients: 195, churned: 11 },
      { month: 'Déc 25', mrr: 1580000, new_clients: 210, churned: 18 },
      { month: 'Jan 26', mrr: 1640000, new_clients: 228, churned: 12 },
      { month: 'Fév 26', mrr: 1730000, new_clients: 248, churned: 10 },
      { month: 'Mar 26', mrr: 1847200, new_clients: 264, churned: 14 }
    ]
  })
})

// ─── AI Monitor ───────────────────────────────────────────────────────────
adminRoutes.get('/ai-monitor', (c) => {
  return c.json({
    models: [
      { name: 'PerformancePredictor v3.2', status: 'running', accuracy: 94.2, requests_hour: 124800, latency_ms: 18, gpu_pct: 42 },
      { name: 'CreativeGenerator v2.8', status: 'running', accuracy: 89.4, requests_hour: 8400, latency_ms: 840, gpu_pct: 78 },
      { name: 'BudgetOptimizer v4.1', status: 'running', accuracy: 96.8, requests_hour: 48200, latency_ms: 12, gpu_pct: 31 },
      { name: 'AudienceIntelligence v3.0', status: 'running', accuracy: 91.3, requests_hour: 22400, latency_ms: 28, gpu_pct: 38 },
      { name: 'CreativeKiller v2.4', status: 'running', accuracy: 97.6, requests_hour: 184200, latency_ms: 8, gpu_pct: 22 },
      { name: 'CopyEngine v3.6', status: 'running', accuracy: 88.9, requests_hour: 12400, latency_ms: 124, gpu_pct: 28 },
      { name: 'FraudDetector v1.8', status: 'running', accuracy: 99.1, requests_hour: 284000, latency_ms: 4, gpu_pct: 14 },
      { name: 'UGCVideoGen v1.2', status: 'training', accuracy: 82.4, requests_hour: 840, latency_ms: 4200, gpu_pct: 88 },
    ],
    total_requests_day: 11682400,
    total_decisions_day: 8472000,
    gpu_cluster: { total: 64, active: 48, training: 12, idle: 4 },
    queue_depth: 1284,
    avg_latency_ms: 24,
    error_rate: 0.003
  })
})

// ─── Logs ─────────────────────────────────────────────────────────────────
adminRoutes.get('/logs', (c) => {
  const logs = [
    { id: 'L001', level: 'error', service: 'api-gateway', message: 'Rate limit exceeded — tenant T011', timestamp: '2026-03-31T09:58:12Z', tenant: 'TechStart Inc.' },
    { id: 'L002', level: 'warn', service: 'ai-engine', message: 'GPU utilization above 85% threshold', timestamp: '2026-03-31T09:47:33Z', tenant: null },
    { id: 'L003', level: 'info', service: 'billing', message: 'Invoice generated — T004 — $799', timestamp: '2026-03-31T09:45:00Z', tenant: 'Digital Storm' },
    { id: 'L004', level: 'error', service: 'auth', message: 'Failed login attempt — IP: 185.234.12.44', timestamp: '2026-03-31T09:32:11Z', tenant: null },
    { id: 'L005', level: 'info', service: 'campaigns', message: 'Campaign scaled +10% — T002 — Camp #8492', timestamp: '2026-03-31T09:28:45Z', tenant: 'Mega Retail Co.' },
    { id: 'L006', level: 'warn', service: 'creatives', message: 'Creative killed — CTR below 0.8% threshold', timestamp: '2026-03-31T09:22:18Z', tenant: 'LuxoGroup' },
    { id: 'L007', level: 'info', service: 'platform-sync', message: 'Facebook token refreshed — T001', timestamp: '2026-03-31T09:15:00Z', tenant: 'Apex Marketing' },
    { id: 'L008', level: 'error', service: 'payments', message: 'Stripe charge failed — T009 — card declined', timestamp: '2026-03-31T08:54:21Z', tenant: 'Promo Corp' },
  ]
  return c.json({ logs, total: 284820, page: 1, per_page: 50 })
})

// ─── Security ─────────────────────────────────────────────────────────────
adminRoutes.get('/security', (c) => {
  return c.json({
    blocked_ips: ['185.234.12.44', '192.168.1.1', '10.0.0.254'],
    failed_logins_24h: 47,
    suspicious_activities: 3,
    mfa_adoption: 68.4,
    active_sessions: 1284,
    last_security_scan: '2026-03-31T06:00:00Z',
    vulnerabilities: 0,
    ssl_expiry: '2026-12-15',
    waf_blocks_24h: 1847
  })
})

adminRoutes.post('/security/block-ip', async (c) => {
  try {
    const body = await c.req.json()
    return c.json({ success: true, message: `IP ${body.ip || 'unknown'} bloquée` })
  } catch (_) { return c.json({ error: 'Invalid request body' }, 400) }
})

// ─── Configuration ────────────────────────────────────────────────────────
adminRoutes.get('/config', (c) => {
  return c.json({
    ai_scale_threshold: 3.5,
    ai_scale_pct: 10,
    ai_scale_interval_h: 72,
    ai_kill_ctr_threshold: 0.8,
    ai_kill_min_impressions: 1000,
    max_campaigns_starter: 10,
    max_campaigns_growth: 50,
    max_campaigns_enterprise: -1,
    max_creatives_starter: 50,
    max_creatives_growth: 500,
    max_creatives_enterprise: -1,
    trial_days: 14,
    maintenance_mode: false,
    api_rate_limit: 1000,
    webhook_secret: '***masked***',
    smtp_from: 'noreply@adnova.ai',
    support_email: 'support@adnova.ai'
  })
})

adminRoutes.put('/config', async (c) => {
  try {
    const body = await c.req.json()
    return c.json({ success: true, message: 'Configuration mise à jour', updated: Object.keys(body) })
  } catch (_) { return c.json({ error: 'Invalid request body' }, 400) }
})

// ─── Plans ────────────────────────────────────────────────────────────────
adminRoutes.get('/plans', (c) => {
  return c.json({
    plans: [
      {
        id: 'starter', name: 'Starter', price: 299, currency: 'USD', billing: 'monthly',
        limits: { campaigns: 10, creatives: 50, ad_spend: 10000, platforms: 2, users: 2, ai_decisions_day: 10000 },
        features: ['AI optimization', 'Facebook + Google', 'Basic analytics', 'Email support'],
        clients: 1240, mrr: 370760
      },
      {
        id: 'growth', name: 'Growth', price: 799, currency: 'USD', billing: 'monthly',
        limits: { campaigns: 50, creatives: 500, ad_spend: 100000, platforms: 5, users: 10, ai_decisions_day: 100000 },
        features: ['All Starter +', 'All 5 platforms', 'UGC video gen', 'A/B testing', 'Lookalike audiences', 'Priority support'],
        clients: 892, mrr: 713108
      },
      {
        id: 'enterprise', name: 'Enterprise', price: 0, currency: 'USD', billing: 'custom',
        limits: { campaigns: -1, creatives: -1, ad_spend: -1, platforms: 5, users: -1, ai_decisions_day: -1 },
        features: ['All Growth +', 'Unlimited everything', 'Custom AI models', 'Dedicated CSM', 'SLA 99.9%', 'White-label option'],
        clients: 280, mrr: 3360000
      }
    ]
  })
})

// ─── Global campaigns overview ────────────────────────────────────────────
adminRoutes.get('/campaigns', (c) => {
  return c.json({
    total: 47284,
    active: 44120,
    paused: 2418,
    ended: 746,
    total_spend_today: 2847000,
    total_revenue_today: 14240000,
    avg_roas: 5.0,
    scaled_today: 1284,
    killed_today: 8472,
    platform_breakdown: {
      facebook: { campaigns: 18420, spend: 1240000, roas: 4.8 },
      google: { campaigns: 12840, spend: 980000, roas: 5.4 },
      tiktok: { campaigns: 7420, spend: 420000, roas: 4.2 },
      instagram: { campaigns: 6280, spend: 148000, roas: 4.6 },
      snapchat: { campaigns: 2324, spend: 59000, roas: 3.8 }
    }
  })
})

// ─── Billing Admin ────────────────────────────────────────────────────────
adminRoutes.get('/billing', (c) => {
  return c.json({
    stripe_balance: 284700,
    pending_payouts: 12400,
    failed_charges: [
      { tenant: 'Promo Corp', amount: 299, date: '2026-03-28', reason: 'Card declined' },
      { tenant: 'SpamCo', amount: 299, date: '2026-03-01', reason: 'Fraudulent' },
    ],
    recent_invoices: [
      { tenant: 'Digital Storm', amount: 799, status: 'paid', date: '2026-03-31' },
      { tenant: 'LuxoGroup', amount: 799, status: 'paid', date: '2026-03-30' },
      { tenant: 'Apex Marketing', amount: 12000, status: 'paid', date: '2026-03-28' },
      { tenant: 'NovaBrand Inc.', amount: 299, status: 'paid', date: '2026-03-30' },
      { tenant: 'Promo Corp', amount: 299, status: 'failed', date: '2026-03-28' },
    ],
    mrr_breakdown: { starter: 370760, growth: 713108, enterprise: 3360000 }
  })
})
