import { Hono } from 'hono'

export const billingRoutes = new Hono()

billingRoutes.get('/plan', (c) => c.json({
  plan: 'growth', price: 799, currency: 'USD',
  features: ['$200K ad spend', 'Unlimited campaigns', 'Advanced AI engine'],
  nextBilling: '2026-04-01', status: 'active'
}))

billingRoutes.get('/usage', (c) => c.json({
  adSpend: { used: 124850, max: 200000 },
  campaigns: { used: 47, max: -1 },
  creatives: { used: 142, max: -1 },
  aiDecisions: { used: 12847, max: -1 }
}))

billingRoutes.get('/invoices', (c) => c.json({
  invoices: [
    { id: 'inv_001', date: '2026-03-01', amount: 799, status: 'paid', description: 'Growth Plan' },
    { id: 'inv_002', date: '2026-02-01', amount: 799, status: 'paid', description: 'Growth Plan' },
  ]
}))

billingRoutes.post('/upgrade', async (c) => {
  const { plan } = await c.req.json()
  return c.json({ success: true, newPlan: plan, message: 'Plan upgraded successfully' })
})
