import { Hono } from 'hono'

type Bindings = { DB: D1Database }

export const campaignRoutes = new Hono<{ Bindings: Bindings }>()

// ─── Auth helper ─────────────────────────────────────────────────────────────
async function getUserFromToken(db: D1Database | undefined, token: string): Promise<any | null> {
  if (!db) return { id: 'demo', tenant_id: 'demo', role: 'owner' }
  const session = await db.prepare(
    'SELECT s.user_id, s.expires_at, u.tenant_id, u.role FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP'
  ).bind(token).first()
  return session || null
}

function getToken(c: any): string | null {
  const auth = c.req.header('Authorization')
  return auth?.startsWith('Bearer ') ? auth.slice(7) : null
}

function generateId(): string {
  const a = new Uint8Array(16); crypto.getRandomValues(a)
  return Array.from(a).map(b => b.toString(16).padStart(2, '0')).join('')
}

// ─── GET /api/campaigns ───────────────────────────────────────────────────────
campaignRoutes.get('/', async (c) => {
  const token = getToken(c)
  if (!token) return c.json({ error: 'Unauthorized' }, 401)

  const db = c.env.DB
  const user = await getUserFromToken(db, token)
  if (!user) return c.json({ error: 'Session invalide.' }, 401)

  if (!db) {
    return c.json({ campaigns: getDemoCampaigns(), total: 3 })
  }

  const { results } = await db.prepare(
    'SELECT * FROM campaigns WHERE user_id = ? AND status != ? ORDER BY created_at DESC LIMIT 50'
  ).bind(user.user_id, 'archived').all()

  return c.json({ campaigns: results || [], total: results?.length || 0 })
})

// ─── GET /api/campaigns/:id ───────────────────────────────────────────────────
campaignRoutes.get('/:id', async (c) => {
  const token = getToken(c)
  if (!token) return c.json({ error: 'Unauthorized' }, 401)

  const db = c.env.DB
  const user = await getUserFromToken(db, token)
  if (!user) return c.json({ error: 'Session invalide.' }, 401)

  if (!db) {
    const demo = getDemoCampaigns().find(x => x.id === c.req.param('id'))
    return demo ? c.json(demo) : c.json({ error: 'Not found' }, 404)
  }

  const campaign = await db.prepare(
    'SELECT * FROM campaigns WHERE id = ? AND user_id = ?'
  ).bind(c.req.param('id'), user.user_id).first()

  return campaign ? c.json(campaign) : c.json({ error: 'Not found' }, 404)
})

// ─── POST /api/campaigns ──────────────────────────────────────────────────────
campaignRoutes.post('/', async (c) => {
  const token = getToken(c)
  if (!token) return c.json({ error: 'Unauthorized' }, 401)

  try {
    const db = c.env.DB
    const user = await getUserFromToken(db, token)
    if (!user) return c.json({ error: 'Session invalide.' }, 401)

    const body = await c.req.json()
    const { name, platform, budget, budgetType, objective, startDate, endDate } = body

    if (!name || !platform) return c.json({ error: 'Nom et plateforme requis.' }, 400)

    if (!db) {
      return c.json({ success: true, campaign: { id: generateId(), name, platform, budget: budget || 0, status: 'draft', roas: 0, spend: 0, ai_managed: 1, ...body } }, 201)
    }

    const id = generateId()
    await db.prepare(`
      INSERT INTO campaigns (id, user_id, tenant_id, name, platform, budget, budget_type, objective, start_date, end_date, status, ai_managed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', 1)
    `).bind(id, user.user_id, user.tenant_id, name, platform, budget || 0, budgetType || 'daily', objective || 'conversions', startDate || null, endDate || null).run()

    const campaign = await db.prepare('SELECT * FROM campaigns WHERE id = ?').bind(id).first()
    return c.json({ success: true, campaign }, 201)
  } catch (e: any) {
    return c.json({ error: e.message || 'Erreur serveur.' }, 500)
  }
})

// ─── PUT /api/campaigns/:id ───────────────────────────────────────────────────
campaignRoutes.put('/:id', async (c) => {
  const token = getToken(c)
  if (!token) return c.json({ error: 'Unauthorized' }, 401)

  try {
    const db = c.env.DB
    const user = await getUserFromToken(db, token)
    if (!user) return c.json({ error: 'Session invalide.' }, 401)

    const body = await c.req.json()
    if (!db) return c.json({ success: true, campaign: { id: c.req.param('id'), ...body } })

    const fields = Object.entries(body).filter(([k]) => ['name','status','budget','budget_type','objective'].includes(k))
    if (fields.length === 0) return c.json({ error: 'Aucun champ à mettre à jour.' }, 400)

    const sets = fields.map(([k]) => `${k} = ?`).join(', ')
    const values = fields.map(([, v]) => v)

    await db.prepare(`UPDATE campaigns SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`)
      .bind(...values, c.req.param('id'), user.user_id).run()

    const campaign = await db.prepare('SELECT * FROM campaigns WHERE id = ?').bind(c.req.param('id')).first()
    return c.json({ success: true, campaign })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// ─── POST /api/campaigns/:id/pause ───────────────────────────────────────────
campaignRoutes.post('/:id/pause', async (c) => {
  const token = getToken(c)
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  const db = c.env.DB
  const user = await getUserFromToken(db, token)
  if (!user) return c.json({ error: 'Session invalide.' }, 401)
  if (db) await db.prepare('UPDATE campaigns SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?').bind('paused', c.req.param('id'), user.user_id).run()
  return c.json({ success: true, message: 'Campaign paused', id: c.req.param('id') })
})

// ─── POST /api/campaigns/:id/activate ────────────────────────────────────────
campaignRoutes.post('/:id/activate', async (c) => {
  const token = getToken(c)
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  const db = c.env.DB
  const user = await getUserFromToken(db, token)
  if (!user) return c.json({ error: 'Session invalide.' }, 401)
  if (db) await db.prepare('UPDATE campaigns SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?').bind('active', c.req.param('id'), user.user_id).run()
  return c.json({ success: true, message: 'Campaign activated', id: c.req.param('id') })
})

// ─── DELETE /api/campaigns/:id ────────────────────────────────────────────────
campaignRoutes.delete('/:id', async (c) => {
  const token = getToken(c)
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  const db = c.env.DB
  const user = await getUserFromToken(db, token)
  if (!user) return c.json({ error: 'Session invalide.' }, 401)
  if (db) await db.prepare('UPDATE campaigns SET status = ? WHERE id = ? AND user_id = ?').bind('archived', c.req.param('id'), user.user_id).run()
  return c.json({ success: true, deleted: c.req.param('id') })
})

// ─── Demo data fallback ───────────────────────────────────────────────────────
function getDemoCampaigns() {
  return [
    { id: 'demo-1', name: 'Summer Sale 2026 — Facebook', platform: 'facebook', status: 'active', budget: 150, roas: 4.8, spend: 4200, revenue: 20160, impressions: 142000, clicks: 4260, conversions: 840, ctr: 3.0, cpc: 0.99, cpa: 5.0, ai_managed: 1 },
    { id: 'demo-2', name: 'Google Search — Brand Keywords', platform: 'google', status: 'active', budget: 200, roas: 6.2, spend: 6800, revenue: 42160, impressions: 84000, clicks: 6720, conversions: 1120, ctr: 8.0, cpc: 1.01, cpa: 6.07, ai_managed: 1 },
    { id: 'demo-3', name: 'TikTok UGC Awareness', platform: 'tiktok', status: 'active', budget: 80, roas: 3.1, spend: 2400, revenue: 7440, impressions: 320000, clicks: 9600, conversions: 240, ctr: 3.0, cpc: 0.25, cpa: 10.0, ai_managed: 1 },
  ]
}
