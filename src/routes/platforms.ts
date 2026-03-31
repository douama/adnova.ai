import { Hono } from 'hono'

export const platformRoutes = new Hono()

const platforms = [
  { id: 'facebook', name: 'Facebook Ads', status: 'connected', spend: 42350, roas: 4.1, campaigns: 18 },
  { id: 'google', name: 'Google Ads', status: 'connected', spend: 35100, roas: 5.2, campaigns: 12 },
  { id: 'instagram', name: 'Instagram Ads', status: 'connected', spend: 25200, roas: 3.8, campaigns: 22 },
  { id: 'tiktok', name: 'TikTok Ads', status: 'connected', spend: 15400, roas: 4.6, campaigns: 8 },
  { id: 'snapchat', name: 'Snapchat Ads', status: 'warning', spend: 6800, roas: 2.1, campaigns: 4 },
]

platformRoutes.get('/', (c) => c.json({ platforms }))
platformRoutes.get('/:id', (c) => {
  const p = platforms.find(x => x.id === c.req.param('id'))
  return p ? c.json(p) : c.json({ error: 'Not found' }, 404)
})
platformRoutes.post('/:id/connect', async (c) => {
  const { accessToken, accountId } = await c.req.json()
  return c.json({ success: true, status: 'connected', platformId: c.req.param('id') })
})
platformRoutes.post('/:id/disconnect', (c) => c.json({ success: true, status: 'disconnected' }))
platformRoutes.post('/:id/sync', (c) => c.json({ success: true, synced: true, lastSync: new Date().toISOString() }))
