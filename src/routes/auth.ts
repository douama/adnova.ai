import { Hono } from 'hono'

export const authRoutes = new Hono()

authRoutes.post('/login', async (c) => {
  const { email, password } = await c.req.json()
  if (!email || !password) return c.json({ error: 'Missing credentials' }, 400)
  return c.json({
    success: true,
    token: 'demo_token_' + Date.now(),
    user: { id: '1', email, name: 'John Doe', role: 'owner', tenant: 'acme-corp' }
  })
})

authRoutes.post('/register', async (c) => {
  const body = await c.req.json()
  return c.json({
    success: true,
    token: 'demo_token_' + Date.now(),
    user: { id: Date.now().toString(), ...body, role: 'owner' }
  })
})

authRoutes.post('/logout', (c) => c.json({ success: true }))

authRoutes.get('/me', (c) => c.json({
  user: { id: '1', email: 'john@acmecorp.com', name: 'John Doe', role: 'owner', tenant: 'acme-corp' }
}))
