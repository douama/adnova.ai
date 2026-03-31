import { Hono } from 'hono'

export const automationRoutes = new Hono()

const rules = [
  { id: '1', name: 'Auto-Scale Winners', active: true, trigger: 'ROAS >= 3.5x AND CTR >= 2%', action: 'Increase budget +10% every 72h', actionsToday: 38 },
  { id: '2', name: 'Kill Underperformers', active: true, trigger: 'CTR < 0.8% AND Impressions >= 500', action: 'Pause creative + reallocate budget', actionsToday: 3 },
  { id: '3', name: 'Budget Guardian', active: true, trigger: 'Daily spend >= 90% before 6PM', action: 'Reduce bids 20% OR pause low ROAS', actionsToday: 2 },
  { id: '4', name: 'Audience Expander', active: true, trigger: 'Frequency >= 3.5 OR CPM +30%', action: 'Expand lookalike to next tier', actionsToday: 1 },
  { id: '5', name: 'Creative Refresher', active: true, trigger: 'Campaign > 14d AND CTR declining 15%', action: 'Generate 3 new AI creatives', actionsToday: 0 },
]

automationRoutes.get('/', (c) => c.json({ rules, total: rules.length }))
automationRoutes.get('/:id', (c) => {
  const r = rules.find(x => x.id === c.req.param('id'))
  return r ? c.json(r) : c.json({ error: 'Not found' }, 404)
})
automationRoutes.post('/', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, rule: { id: Date.now().toString(), active: true, actionsToday: 0, ...body } }, 201)
})
automationRoutes.put('/:id', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, rule: { id: c.req.param('id'), ...body } })
})
automationRoutes.delete('/:id', (c) => c.json({ success: true, deleted: c.req.param('id') }))
automationRoutes.post('/:id/toggle', (c) => c.json({ success: true, message: 'Rule toggled' }))
