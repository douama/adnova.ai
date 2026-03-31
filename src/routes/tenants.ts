import { Hono } from 'hono'

export const tenantRoutes = new Hono()

const tenants = [
  { id: 'acme-corp', name: 'Acme Corp', plan: 'growth', status: 'active', campaigns: 47, spend: 124850 },
  { id: 'techstart', name: 'TechStart Inc', plan: 'starter', status: 'active', campaigns: 12, spend: 28400 },
  { id: 'fashion-brand', name: 'Fashion Brand', plan: 'growth', status: 'active', campaigns: 31, spend: 87200 },
]

tenantRoutes.get('/', (c) => c.json({ tenants }))
tenantRoutes.get('/:id', (c) => {
  const t = tenants.find(x => x.id === c.req.param('id'))
  return t ? c.json(t) : c.json({ error: 'Not found' }, 404)
})
tenantRoutes.post('/', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, tenant: { id: body.name.toLowerCase().replace(/\s+/g, '-'), ...body } }, 201)
})
tenantRoutes.put('/:id', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, tenant: { id: c.req.param('id'), ...body } })
})
