import { Hono } from 'hono'

export const campaignRoutes = new Hono()

const mockCampaigns = [
  { id: '1', name: 'Summer Collection 2026', platforms: ['facebook','instagram'], status: 'scaling', spend: 18420, revenue: 96805, roas: 5.26, ctr: 4.2, impressions: 47852, clicks: 2018, scaleIn: 38 },
  { id: '2', name: 'Product Launch Q3', platforms: ['google','tiktok'], status: 'scaling', spend: 14200, revenue: 68160, roas: 4.80, ctr: 3.8, impressions: 38291, clicks: 1526, scaleIn: 52 },
  { id: '3', name: 'Brand Awareness Wave', platforms: ['facebook'], status: 'live', spend: 9800, revenue: 41160, roas: 4.20, ctr: 2.9, impressions: 82314, clicks: 2389, scaleIn: 16 },
  { id: '4', name: 'Retargeting Engine Pro', platforms: ['google'], status: 'live', spend: 7350, revenue: 29400, roas: 4.00, ctr: 6.1, impressions: 12043, clicks: 734, scaleIn: 28 },
  { id: '5', name: 'Holiday Flash Sale', platforms: ['tiktok','snapchat'], status: 'live', spend: 5200, revenue: 17680, roas: 3.40, ctr: 5.4, impressions: 28742, clicks: 1551, scaleIn: 61 },
  { id: '6', name: 'New User Acquisition', platforms: ['instagram'], status: 'paused', spend: 3100, revenue: 7750, roas: 2.50, ctr: 1.1, impressions: 14203, clicks: 156, scaleIn: 0 },
]

campaignRoutes.get('/', (c) => c.json({ campaigns: mockCampaigns, total: mockCampaigns.length }))
campaignRoutes.get('/:id', (c) => {
  const id = c.req.param('id')
  const campaign = mockCampaigns.find(x => x.id === id)
  return campaign ? c.json(campaign) : c.json({ error: 'Not found' }, 404)
})

campaignRoutes.post('/', async (c) => {
  const body = await c.req.json()
  const newCamp = { id: Date.now().toString(), status: 'draft', spend: 0, revenue: 0, roas: 0, ctr: 0, impressions: 0, clicks: 0, scaleIn: 72, ...body }
  return c.json({ success: true, campaign: newCamp }, 201)
})

campaignRoutes.put('/:id', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, campaign: { id: c.req.param('id'), ...body } })
})

campaignRoutes.delete('/:id', (c) => c.json({ success: true, deleted: c.req.param('id') }))

campaignRoutes.post('/:id/scale', (c) => {
  return c.json({ success: true, message: 'Campaign scaled +10%', newBudget: 11000 })
})

campaignRoutes.post('/:id/pause', (c) => {
  return c.json({ success: true, message: 'Campaign paused', status: 'paused' })
})
