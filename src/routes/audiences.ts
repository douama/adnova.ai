import { Hono } from 'hono'

export const audienceRoutes = new Hono()

const audiences = [
  { id: '1', name: 'Top Converters Lookalike 1%', type: 'lookalike', size: 1200000, matchRate: 88, roas: 4.8, platforms: ['facebook','instagram'] },
  { id: '2', name: 'Retargeting — Cart Abandon', type: 'retargeting', size: 45200, matchRate: 97, roas: 7.2, platforms: ['facebook','google'] },
  { id: '3', name: 'Interest: Fashion Shoppers', type: 'interest', size: 3400000, matchRate: 71, roas: 3.1, platforms: ['facebook','instagram','tiktok'] },
  { id: '4', name: 'Website Visitors 14d', type: 'retargeting', size: 128400, matchRate: 95, roas: 5.1, platforms: ['facebook','google'] },
]

audienceRoutes.get('/', (c) => c.json({ audiences, total: audiences.length }))
audienceRoutes.get('/:id', (c) => {
  const a = audiences.find(x => x.id === c.req.param('id'))
  return a ? c.json(a) : c.json({ error: 'Not found' }, 404)
})
audienceRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json()
    return c.json({ success: true, audience: { id: Date.now().toString(), ...body } }, 201)
  } catch (_) { return c.json({ error: 'Invalid request body' }, 400) }
})
audienceRoutes.post('/build-lookalike', async (c) => {
  try {
    const body = await c.req.json()
    const { sourceAudienceId, percentage, platforms } = body
    return c.json({
      success: true,
      audience: {
        id: `la_${Date.now()}`, type: 'lookalike',
        sourceAudienceId: sourceAudienceId || null,
        percentage: percentage || 1,
        estimatedSize: Math.floor(Math.random() * 3000000 + 500000),
        status: 'building', eta: '5 minutes'
      }
    })
  } catch (_) { return c.json({ error: 'Invalid request body' }, 400) }
})
