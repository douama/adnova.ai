import { Hono } from 'hono'

export const platformRoutes = new Hono()

const PLATFORMS = [
  { id: 'facebook', name: 'Facebook Ads', spend: 42350, roas: 4.1, campaigns: 47, status: 'connected', accountId: 'act_1234567890', pixel: true, lastSync: new Date().toISOString() },
  { id: 'google', name: 'Google Ads', spend: 35100, roas: 5.2, campaigns: 12, status: 'connected', accountId: 'MCC-789-012-3456', pixel: true, lastSync: new Date().toISOString() },
  { id: 'instagram', name: 'Instagram Ads', spend: 25200, roas: 3.8, campaigns: 22, status: 'connected', accountId: 'ig_act_9876543', pixel: true, lastSync: new Date().toISOString() },
  { id: 'tiktok', name: 'TikTok Ads', spend: 15400, roas: 4.6, campaigns: 8, status: 'connected', accountId: 'TT-ADV-556677', pixel: true, lastSync: new Date().toISOString() },
  { id: 'snapchat', name: 'Snapchat Ads', spend: 6800, roas: 2.1, campaigns: 4, status: 'warning', accountId: 'SC-ADV-334455', pixel: false, lastSync: new Date(Date.now() - 7200000).toISOString() },
  { id: 'linkedin', name: 'LinkedIn Ads', spend: 8920, roas: 3.3, campaigns: 6, status: 'connected', accountId: 'LI-ADV-112233', pixel: true, lastSync: new Date().toISOString() },
  { id: 'youtube', name: 'YouTube Ads', spend: 11750, roas: 3.9, campaigns: 9, status: 'connected', accountId: 'YT-ADV-445566', pixel: true, lastSync: new Date().toISOString() },
  { id: 'twitter', name: 'X (Twitter) Ads', spend: 4200, roas: 2.8, campaigns: 3, status: 'connected', accountId: 'TW-ADV-778899', pixel: false, lastSync: new Date().toISOString() },
  { id: 'pinterest', name: 'Pinterest Ads', spend: 3150, roas: 3.1, campaigns: 5, status: 'connected', accountId: 'PI-ADV-223344', pixel: true, lastSync: new Date().toISOString() },
]

// GET /api/platforms — list all platforms
platformRoutes.get('/', (c) => {
  const total = PLATFORMS.reduce((s, p) => s + p.spend, 0)
  const avgRoas = (PLATFORMS.reduce((s, p) => s + p.roas, 0) / PLATFORMS.length).toFixed(2)
  const totalCampaigns = PLATFORMS.reduce((s, p) => s + p.campaigns, 0)
  return c.json({
    platforms: PLATFORMS,
    summary: {
      totalSpend: total,
      avgRoas: parseFloat(avgRoas),
      totalCampaigns,
      connectedCount: PLATFORMS.filter(p => p.status === 'connected').length,
      platformCount: PLATFORMS.length,
    },
    updatedAt: new Date().toISOString(),
  })
})

// GET /api/platforms/:id
platformRoutes.get('/:id', (c) => {
  const id = c.req.param('id')
  const platform = PLATFORMS.find(p => p.id === id)
  if (!platform) return c.json({ error: 'Platform not found' }, 404)
  return c.json({ platform, updatedAt: new Date().toISOString() })
})

// POST /api/platforms/:id/connect
platformRoutes.post('/:id/connect', async (c) => {
  const id = c.req.param('id')
  let body: Record<string, string> = {}
  try { body = await c.req.json() } catch {}
  if (!body.accessToken) return c.json({ error: 'accessToken is required' }, 400)
  const platform = PLATFORMS.find(p => p.id === id)
  return c.json({
    success: true,
    platform: id,
    status: 'connected',
    accountId: body.accountId || (platform?.accountId ?? `${id.toUpperCase()}-${Date.now()}`),
    connectedAt: new Date().toISOString(),
  })
})

// POST /api/platforms/:id/disconnect
platformRoutes.post('/:id/disconnect', (c) => {
  const id = c.req.param('id')
  return c.json({
    success: true,
    platform: id,
    status: 'disconnected',
    disconnectedAt: new Date().toISOString(),
  })
})

// POST /api/platforms/:id/sync
platformRoutes.post('/:id/sync', (c) => {
  const id = c.req.param('id')
  const platform = PLATFORMS.find(p => p.id === id)
  if (!platform) return c.json({ error: 'Platform not found' }, 404)

  // Simulate slight variation in metrics
  const roas = (platform.roas + (Math.random() * 0.2 - 0.1)).toFixed(2)
  const campaigns = platform.campaigns + Math.floor(Math.random() * 3 - 1)

  return c.json({
    success: true,
    platform: id,
    synced: true,
    metrics: {
      spend: platform.spend,
      roas: parseFloat(roas),
      campaigns: Math.max(1, campaigns),
    },
    syncedAt: new Date().toISOString(),
  })
})

// GET /api/platforms/:id/metrics — detailed metrics
platformRoutes.get('/:id/metrics', (c) => {
  const id = c.req.param('id')
  const platform = PLATFORMS.find(p => p.id === id)
  if (!platform) return c.json({ error: 'Platform not found' }, 404)

  return c.json({
    platform: id,
    metrics: {
      spend: platform.spend,
      revenue: Math.round(platform.spend * platform.roas),
      roas: platform.roas,
      campaigns: platform.campaigns,
      impressions: Math.round(platform.spend * 45),
      clicks: Math.round(platform.spend * 2.1),
      conversions: Math.round(platform.spend / 15),
      ctr: (2.1 + Math.random() * 2).toFixed(2),
      cpc: (platform.spend / (platform.spend * 2.1)).toFixed(2),
    },
    period: '30d',
    updatedAt: new Date().toISOString(),
  })
})
