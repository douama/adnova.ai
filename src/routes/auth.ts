import { Hono } from 'hono'

export const authRoutes = new Hono()

// ─── Demo users ────────────────────────────────────────────────────────────
const DEMO_USERS = [
  { id: '1', email: 'demo@adnova.ai', password: 'demo1234', name: 'John Doe', role: 'owner', company: 'Acme Corp', tenant: 'acme-corp' },
  { id: '2', email: 'admin@adnova.ai', password: 'admin1234', name: 'Admin User', role: 'admin', company: 'Acme Corp', tenant: 'acme-corp' },
]

authRoutes.post('/login', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password } = body
    if (!email || !password) {
      return c.json({ error: 'Email et mot de passe requis.' }, 400)
    }
    // Demo: accept any credentials for demo mode
    const user = DEMO_USERS.find(u => u.email === email && u.password === password)
    const demoUser = user || { id: Date.now().toString(), email, name: email.split('@')[0], role: 'owner', company: 'My Company', tenant: 'my-company' }
    const token = 'demo_token_' + Date.now() + '_' + Math.random().toString(36).slice(2)
    return c.json({
      success: true,
      token,
      user: {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
        company: (demoUser as any).company || 'My Company',
        tenant: (demoUser as any).tenant || 'my-company'
      }
    })
  } catch (e) {
    return c.json({ error: 'Invalid request body.' }, 400)
  }
})

authRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password, firstName, lastName, company } = body
    if (!email || !password) {
      return c.json({ error: 'Email et mot de passe requis.' }, 400)
    }
    if (password.length < 8) {
      return c.json({ error: 'Le mot de passe doit faire au moins 8 caractères.' }, 400)
    }
    const token = 'demo_token_' + Date.now() + '_' + Math.random().toString(36).slice(2)
    return c.json({
      success: true,
      token,
      user: {
        id: Date.now().toString(),
        email,
        name: [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0],
        role: 'owner',
        company: company || 'My Company',
        tenant: (company || 'my-company').toLowerCase().replace(/\s+/g, '-')
      }
    })
  } catch (e) {
    return c.json({ error: 'Invalid request body.' }, 400)
  }
})

authRoutes.post('/logout', (c) => {
  return c.json({ success: true, message: 'Logged out successfully.' })
})

authRoutes.get('/me', (c) => {
  const auth = c.req.header('Authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  return c.json({
    user: {
      id: '1',
      email: 'demo@adnova.ai',
      name: 'John Doe',
      role: 'owner',
      company: 'Acme Corp',
      tenant: 'acme-corp'
    }
  })
})

// ─── Admin Auth ─────────────────────────────────────────────────────────────
authRoutes.post('/admin/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    if (email === 'superadmin@adnova.ai' && password === 'superadmin2026') {
      return c.json({
        success: true,
        token: 'admin_token_' + Date.now(),
        admin: { email, role: 'superadmin', level: 5 }
      })
    }
    return c.json({ error: 'Identifiants incorrects.' }, 401)
  } catch (e) {
    return c.json({ error: 'Invalid request body.' }, 400)
  }
})
