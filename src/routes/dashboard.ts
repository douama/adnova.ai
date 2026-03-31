import { Hono } from 'hono'

export const dashboardRoutes = new Hono()

dashboardRoutes.get('/stats', (c) => {
  return c.json({
    totalSpend: 124850,
    totalRevenue: 601225,
    roas: 4.82,
    conversions: 8294,
    activeCampaigns: 47,
    scalingCampaigns: 12,
    aiDecisionsToday: 12847,
    creativeGenerated: 142,
    platformBreakdown: {
      facebook: { spend: 42350, roas: 4.1, campaigns: 18 },
      google: { spend: 35100, roas: 5.2, campaigns: 12 },
      instagram: { spend: 25200, roas: 3.8, campaigns: 22 },
      tiktok: { spend: 15400, roas: 4.6, campaigns: 8 },
      snapchat: { spend: 6800, roas: 2.1, campaigns: 4 }
    }
  })
})

dashboardRoutes.get('/ai-feed', (c) => {
  return c.json({
    actions: [
      { type: 'scale', campaign: 'Summer Collection', detail: 'Budget +10% — ROAS 5.26x', time: new Date(Date.now() - 120000).toISOString() },
      { type: 'kill', campaign: 'Product Launch', detail: 'Creative paused — CTR 0.31%', time: new Date(Date.now() - 480000).toISOString() },
      { type: 'create', campaign: 'Summer Collection', detail: '4 UGC videos generated', time: new Date(Date.now() - 900000).toISOString() },
    ]
  })
})
