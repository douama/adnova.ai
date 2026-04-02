import { Hono } from 'hono'

export const creativeRoutes = new Hono()

const mockCreatives = [
  { id: '1', name: 'Summer-Hero-V3.mp4', type: 'video', ctr: 6.2, status: 'active', score: 98, campaign: 'Summer Collection' },
  { id: '2', name: 'Product-Showcase-B.jpg', type: 'image', ctr: 4.8, status: 'active', score: 91, campaign: 'Product Launch' },
  { id: '3', name: 'UGC-Testimonial-V2.mp4', type: 'ugc', ctr: 4.1, status: 'active', score: 85, campaign: 'Summer Collection' },
  { id: '4', name: 'Old-Promo-V1.mp4', type: 'video', ctr: 0.6, status: 'killed', score: 12, campaign: 'Product Launch' },
]

creativeRoutes.get('/', (c) => c.json({ creatives: mockCreatives, total: mockCreatives.length }))
creativeRoutes.get('/:id', (c) => {
  const creative = mockCreatives.find(x => x.id === c.req.param('id'))
  return creative ? c.json(creative) : c.json({ error: 'Not found' }, 404)
})

creativeRoutes.post('/generate', async (c) => {
  try {
    const body = await c.req.json()
    const { prompt, type, variants, platform } = body
    if (!prompt) return c.json({ error: 'Prompt is required' }, 400)
    const generated = Array.from({ length: variants || 3 }, (_, i) => ({
      id: `gen_${Date.now()}_${i}`,
      name: `AI-Generated-${type || 'image'}-${i + 1}`,
      type: type || 'image',
      prompt,
      platform: platform || 'all',
      status: 'generating',
      eta: '2 minutes',
      score: null
    }))
    return c.json({ success: true, jobId: `job_${Date.now()}`, creatives: generated, estimatedTime: '2 minutes' }, 202)
  } catch (_) {
    return c.json({ error: 'Invalid request body' }, 400)
  }
})

creativeRoutes.get('/generate/:jobId', (c) => {
  return c.json({
    jobId: c.req.param('jobId'),
    status: 'completed',
    progress: 100,
    creatives: [
      { id: 'gen_1', name: 'AI-Image-V1.jpg', type: 'image', status: 'ready', ctr: null, score: null }
    ]
  })
})

creativeRoutes.post('/:id/pause', (c) => c.json({ success: true, status: 'paused' }))
creativeRoutes.post('/:id/activate', (c) => c.json({ success: true, status: 'active' }))

creativeRoutes.post('/ab-test', async (c) => {
  try {
    const body = await c.req.json()
    const { variantA, variantB, campaignId } = body
    return c.json({ success: true, testId: `ab_${Date.now()}`, variantA, variantB, campaignId, status: 'running' })
  } catch (_) {
    return c.json({ error: 'Invalid request body' }, 400)
  }
})
