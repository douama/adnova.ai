import { Hono } from 'hono'

export const analyticsRoutes = new Hono()

analyticsRoutes.get('/overview', (c) => {
  return c.json({
    totalRevenue: 601225, totalSpend: 124850, roas: 4.82, conversions: 8294,
    ctr: 3.01, cpc: 0.72, cpm: 52.30, impressions: 2400000,
    period: '30d',
    change: { revenue: 24.3, spend: 18.4, roas: 14.2, conversions: 22.1 }
  })
})

analyticsRoutes.get('/timeseries', (c) => {
  const range = c.req.query('range') || '30d'
  return c.json({
    range,
    labels: ['Week 1','Week 2','Week 3','Week 4'],
    revenue: [120000, 145000, 168000, 168225],
    spend: [28000, 30000, 33500, 33350],
    roas: [4.28, 4.83, 5.01, 5.04]
  })
})

analyticsRoutes.get('/platforms', (c) => {
  return c.json({
    platforms: [
      { name: 'Facebook', spend: 42350, revenue: 173635, roas: 4.10, ctr: 3.1, cpc: 0.84, cpa: 12.38, conversions: 3420 },
      { name: 'Google', spend: 35100, revenue: 182520, roas: 5.20, ctr: 4.8, cpc: 1.12, cpa: 12.49, conversions: 2810 },
      { name: 'Instagram', spend: 25200, revenue: 95760, roas: 3.80, ctr: 2.7, cpc: 0.71, cpa: 17.97, conversions: 1402 },
      { name: 'TikTok', spend: 15400, revenue: 70840, roas: 4.60, ctr: 8.2, cpc: 0.43, cpa: 36.84, conversions: 418 },
      { name: 'Snapchat', spend: 6800, revenue: 14280, roas: 2.10, ctr: 1.9, cpc: 0.36, cpa: 27.87, conversions: 244 }
    ]
  })
})

analyticsRoutes.get('/funnel', (c) => {
  return c.json({
    stages: [
      { name: 'Impressions', value: 2400000, rate: 100 },
      { name: 'Clicks', value: 72340, rate: 3.01 },
      { name: 'Landing Page', value: 58872, rate: 81.4 },
      { name: 'Add to Cart', value: 18438, rate: 31.3 },
      { name: 'Purchase', value: 8294, rate: 45.0 }
    ]
  })
})

analyticsRoutes.get('/ai-insights', (c) => {
  return c.json({
    insights: [
      { type: 'opportunity', title: 'TikTok Growth', detail: 'ROAS trending +18%, increase budget $5K/day for +$23K revenue' },
      { type: 'warning', title: 'Google CPC Rise', detail: 'CPC +12%, shift 15% budget to Instagram for better ROAS' },
      { type: 'creative', title: 'Video vs Static', detail: 'Videos 2.8x better CTR — convert 4 top static ads to video' }
    ]
  })
})
