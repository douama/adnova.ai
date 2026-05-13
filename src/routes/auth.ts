import { Hono } from 'hono'

// ─── Bindings type ────────────────────────────────────────────────────────────
type Bindings = {
  DB: D1Database
  ADMIN_EMAIL?: string
  ADMIN_PASSWORD_HASH?: string  // PBKDF2 hash, format: pbkdf2$iter$saltHex$hashHex
  ADMIN_SESSION_SECRET?: string // HMAC key for signing admin tokens (≥ 32 bytes)
}

export const authRoutes = new Hono<{ Bindings: Bindings }>()

// ─── Password hashing — PBKDF2-SHA256, 600k iterations, per-user random salt ─
// Storage format: "pbkdf2$<iterations>$<saltHex>$<hashHex>"
// Legacy format (SHA-256 + static salt) is detected and re-hashed transparently on next login.
const PBKDF2_ITERATIONS = 600_000
const PBKDF2_KEYLEN_BITS = 256

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}
function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2)
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16)
  return out
}

async function hashPassword(password: string, saltBytes?: Uint8Array): Promise<string> {
  const salt = saltBytes ?? crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), { name: 'PBKDF2' }, false, ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    PBKDF2_KEYLEN_BITS
  )
  return `pbkdf2$${PBKDF2_ITERATIONS}$${bytesToHex(salt)}$${bytesToHex(new Uint8Array(bits))}`
}

// Constant-time string equality (mitigate timing attacks)
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (stored.startsWith('pbkdf2$')) {
    const [, iterStr, saltHex, hashHex] = stored.split('$')
    const iterations = parseInt(iterStr, 10)
    const salt = hexToBytes(saltHex)
    const keyMaterial = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(password), { name: 'PBKDF2' }, false, ['deriveBits']
    )
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
      keyMaterial,
      hashHex.length * 4
    )
    return timingSafeEqual(bytesToHex(new Uint8Array(bits)), hashHex)
  }
  // Legacy: SHA-256 with static salt — for transparent migration on next login
  const data = new TextEncoder().encode(password + '_adnova_salt_2026')
  const buf = await crypto.subtle.digest('SHA-256', data)
  return timingSafeEqual(bytesToHex(new Uint8Array(buf)), stored)
}

function isLegacyHash(stored: string): boolean {
  return !stored.startsWith('pbkdf2$')
}

// ─── Utility: generate secure token ─────────────────────────────────────────
function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')
}

// ─── Utility: generate ID ────────────────────────────────────────────────────
function generateId(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')
}

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
authRoutes.post('/login', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password } = body

    if (!email || !password) {
      return c.json({ error: 'Email et mot de passe requis.' }, 400)
    }

    const db = c.env.DB

    // Demo mode fallback (no DB)
    if (!db) {
      const token = 'demo_token_' + Date.now() + '_' + Math.random().toString(36).slice(2)
      return c.json({
        success: true, token,
        user: { id: '1', email, name: email.split('@')[0], role: 'owner', company: 'My Company', tenant: 'my-company' }
      })
    }

    // Lookup user
    const user = await db.prepare('SELECT * FROM users WHERE email = ? AND status != ?').bind(email.toLowerCase().trim(), 'deleted').first() as any

    if (!user) {
      return c.json({ error: 'Identifiants incorrects.' }, 401)
    }

    // Check password (supports legacy SHA-256 hashes — auto-migrates to PBKDF2)
    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return c.json({ error: 'Identifiants incorrects.' }, 401)
    }
    if (isLegacyHash(user.password_hash)) {
      const upgraded = await hashPassword(password)
      await db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').bind(upgraded, user.id).run()
    }

    // Generate session token
    const token = generateToken()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days

    const ip = c.req.raw.headers.get('CF-Connecting-IP') || c.req.raw.headers.get('X-Forwarded-For') || 'unknown'
    const ua = c.req.raw.headers.get('User-Agent') || ''

    await db.prepare(
      'INSERT INTO sessions (id, user_id, token, expires_at, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(generateId(), user.id, token, expiresAt, ip, ua.slice(0, 200)).run()

    // Update last login
    await db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run()

    return c.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`.trim() || user.email.split('@')[0],
        role: user.role,
        company: user.company,
        tenant: user.tenant_id,
        plan: user.plan,
        trialEndsAt: user.trial_ends_at
      }
    })
  } catch (e: any) {
    console.error('Login error:', e.message)
    return c.json({ error: 'Erreur serveur.' }, 500)
  }
})

// ─── POST /api/auth/register ──────────────────────────────────────────────────
authRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password, firstName, lastName, company, adSpend } = body

    if (!email || !password) {
      return c.json({ error: 'Email et mot de passe requis.' }, 400)
    }
    if (password.length < 8) {
      return c.json({ error: 'Le mot de passe doit faire au moins 8 caractères.' }, 400)
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return c.json({ error: 'Email invalide.' }, 400)
    }

    const db = c.env.DB

    // Demo mode fallback
    if (!db) {
      const token = 'demo_token_' + Date.now() + '_' + Math.random().toString(36).slice(2)
      return c.json({
        success: true, token,
        user: {
          id: Date.now().toString(), email,
          name: [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0],
          role: 'owner', company: company || 'My Company',
          tenant: (company || 'my-company').toLowerCase().replace(/\s+/g, '-'),
          plan: 'trial'
        }
      })
    }

    // Check if email already exists
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email.toLowerCase().trim()).first()
    if (existing) {
      return c.json({ error: 'Cet email est déjà utilisé.' }, 409)
    }

    // Create user
    const userId = generateId()
    const tenantId = (company || email.split('@')[0]).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + userId.slice(0, 6)
    const passwordHash = await hashPassword(password)
    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days trial

    await db.prepare(`
      INSERT INTO users (id, email, password_hash, first_name, last_name, company, role, tenant_id, ad_spend_range, plan, trial_ends_at, status)
      VALUES (?, ?, ?, ?, ?, ?, 'owner', ?, ?, 'trial', ?, 'active')
    `).bind(
      userId,
      email.toLowerCase().trim(),
      passwordHash,
      firstName || '',
      lastName || '',
      company || '',
      tenantId,
      adSpend || '<10k',
      trialEndsAt
    ).run()

    // Seed initial data for new user (default automation rules, etc.)
    await seedUserData(db, userId, tenantId)

    // Generate session token
    const token = generateToken()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    const ip = c.req.raw.headers.get('CF-Connecting-IP') || 'unknown'
    const ua = (c.req.raw.headers.get('User-Agent') || '').slice(0, 200)

    await db.prepare(
      'INSERT INTO sessions (id, user_id, token, expires_at, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(generateId(), userId, token, expiresAt, ip, ua).run()

    return c.json({
      success: true,
      token,
      user: {
        id: userId,
        email: email.toLowerCase().trim(),
        name: [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0],
        role: 'owner',
        company: company || '',
        tenant: tenantId,
        plan: 'trial',
        trialEndsAt
      }
    }, 201)
  } catch (e: any) {
    console.error('Register error:', e.message)
    if (e.message?.includes('UNIQUE constraint')) {
      return c.json({ error: 'Cet email est déjà utilisé.' }, 409)
    }
    return c.json({ error: 'Erreur serveur.' }, 500)
  }
})

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
authRoutes.post('/logout', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth?.startsWith('Bearer ') && c.env.DB) {
    const token = auth.slice(7)
    await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run().catch(() => {})
  }
  return c.json({ success: true, message: 'Logged out successfully.' })
})

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
authRoutes.get('/me', async (c) => {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = auth.slice(7)
  const db = c.env.DB

  if (!db) {
    return c.json({ user: { id: '1', email: 'demo@adnova.ai', name: 'Demo User', role: 'owner', company: 'Acme Corp', tenant: 'acme-corp', plan: 'trial' } })
  }

  const session = await db.prepare(
    'SELECT s.*, u.email, u.first_name, u.last_name, u.role, u.company, u.tenant_id, u.plan, u.trial_ends_at FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP'
  ).bind(token).first() as any

  if (!session) {
    return c.json({ error: 'Session expirée ou invalide.' }, 401)
  }

  return c.json({
    user: {
      id: session.user_id,
      email: session.email,
      name: `${session.first_name} ${session.last_name}`.trim() || session.email?.split('@')[0],
      role: session.role,
      company: session.company,
      tenant: session.tenant_id,
      plan: session.plan,
      trialEndsAt: session.trial_ends_at
    }
  })
})

// ─── HMAC-signed admin session tokens ────────────────────────────────────────
// Token format: base64url(payload).base64url(hmacSignature)
// payload = JSON { sub, role, exp }   — exp is unix-seconds
const ADMIN_TOKEN_TTL_SECONDS = 8 * 60 * 60 // 8h

function b64urlEncode(bytes: Uint8Array): string {
  let s = ''
  for (const b of bytes) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function b64urlDecode(str: string): Uint8Array {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4))
  const s = atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad)
  const out = new Uint8Array(s.length)
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i)
  return out
}
async function hmacSign(secret: string, message: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return new Uint8Array(sig)
}
async function signAdminToken(secret: string, payload: object): Promise<string> {
  const body = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)))
  const sig = await hmacSign(secret, body)
  return `${body}.${b64urlEncode(sig)}`
}
export async function verifyAdminToken(
  secret: string,
  token: string
): Promise<{ sub: string; role: string; exp: number } | null> {
  try {
    const [body, sig] = token.split('.')
    if (!body || !sig) return null
    const expected = await hmacSign(secret, body)
    const got = b64urlDecode(sig)
    if (expected.length !== got.length) return null
    let diff = 0
    for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ got[i]
    if (diff !== 0) return null
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body)))
    if (typeof payload.exp !== 'number' || Date.now() / 1000 > payload.exp) return null
    return payload
  } catch { return null }
}

// ─── POST /api/auth/admin/login ───────────────────────────────────────────────
authRoutes.post('/admin/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    if (typeof email !== 'string' || typeof password !== 'string') {
      return c.json({ error: 'Identifiants incorrects.' }, 401)
    }

    const expectedEmail = c.env.ADMIN_EMAIL
    const expectedHash = c.env.ADMIN_PASSWORD_HASH
    const secret = c.env.ADMIN_SESSION_SECRET

    if (!expectedEmail || !expectedHash || !secret) {
      console.error('Admin login: missing ADMIN_EMAIL / ADMIN_PASSWORD_HASH / ADMIN_SESSION_SECRET env vars')
      return c.json({ error: 'Admin login not configured.' }, 503)
    }

    // Constant-time email comparison + PBKDF2 password verification
    const emailOk = timingSafeEqual(email.toLowerCase().trim(), expectedEmail.toLowerCase().trim())
    const passwordOk = await verifyPassword(password, expectedHash)

    // Always run both checks to avoid timing oracle on email existence
    if (!emailOk || !passwordOk) {
      return c.json({ error: 'Identifiants incorrects.' }, 401)
    }

    const exp = Math.floor(Date.now() / 1000) + ADMIN_TOKEN_TTL_SECONDS
    const token = await signAdminToken(secret, { sub: expectedEmail, role: 'superadmin', exp })

    return c.json({
      success: true,
      token,
      admin: { email: expectedEmail, role: 'superadmin', level: 5, expiresAt: exp }
    })
  } catch (e: any) {
    console.error('Admin login error:', e?.message)
    return c.json({ error: 'Invalid request body.' }, 400)
  }
})

// ─── Seed initial data for new user ──────────────────────────────────────────
async function seedUserData(db: D1Database, userId: string, tenantId: string) {
  try {
    const now = new Date()
    const generateId = () => {
      const a = new Uint8Array(16); crypto.getRandomValues(a)
      return Array.from(a).map(b => b.toString(16).padStart(2, '0')).join('')
    }

    // Seed automation rules
    const rules = [
      { name: 'Auto-Scale Winners', trigger: 'ROAS >= 3.5x AND CTR >= 2%', action: 'Increase budget +10% every 72h' },
      { name: 'Kill Underperformers', trigger: 'CTR < 0.8% AND Impressions >= 500', action: 'Pause creative + reallocate budget' },
      { name: 'Budget Guardian', trigger: 'Daily spend >= 90% before 6PM', action: 'Reduce bids 20% OR pause low ROAS' },
    ]
    for (const r of rules) {
      await db.prepare(
        'INSERT INTO automation_rules (id, user_id, tenant_id, name, active, trigger_condition, action) VALUES (?, ?, ?, ?, 1, ?, ?)'
      ).bind(generateId(), userId, tenantId, r.name, r.trigger, r.action).run()
    }

    // Seed sample campaigns
    const campaigns = [
      { name: 'Summer Sale 2026 — Facebook', platform: 'facebook', budget: 150, roas: 4.8, spend: 4200, revenue: 20160, impressions: 142000, clicks: 4260, conversions: 840, ctr: 3.0, cpc: 0.99, cpa: 5.0 },
      { name: 'Google Search — Brand Keywords', platform: 'google', budget: 200, roas: 6.2, spend: 6800, revenue: 42160, impressions: 84000, clicks: 6720, conversions: 1120, ctr: 8.0, cpc: 1.01, cpa: 6.07 },
      { name: 'TikTok UGC Awareness', platform: 'tiktok', budget: 80, roas: 3.1, spend: 2400, revenue: 7440, impressions: 320000, clicks: 9600, conversions: 240, ctr: 3.0, cpc: 0.25, cpa: 10.0 },
    ]
    for (const camp of campaigns) {
      const campId = generateId()
      await db.prepare(`
        INSERT INTO campaigns (id, user_id, tenant_id, name, status, platform, budget, roas, spend, revenue, impressions, clicks, conversions, ctr, cpc, cpa, ai_managed)
        VALUES (?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      `).bind(campId, userId, tenantId, camp.name, camp.platform, camp.budget, camp.roas, camp.spend, camp.revenue, camp.impressions, camp.clicks, camp.conversions, camp.ctr, camp.cpc, camp.cpa).run()
    }

    // Seed analytics for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const spend = 400 + Math.random() * 200
      const roas = 4 + Math.random() * 2
      await db.prepare(
        'INSERT INTO analytics_daily (id, user_id, tenant_id, date, spend, revenue, roas, impressions, clicks, conversions, ctr, cpc, cpa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        generateId(), userId, tenantId, dateStr,
        Math.round(spend * 100) / 100,
        Math.round(spend * roas * 100) / 100,
        Math.round(roas * 100) / 100,
        Math.floor(50000 + Math.random() * 30000),
        Math.floor(1500 + Math.random() * 1000),
        Math.floor(150 + Math.random() * 100),
        Math.round((2.5 + Math.random() * 1.5) * 100) / 100,
        Math.round((0.5 + Math.random() * 0.5) * 100) / 100,
        Math.round((10 + Math.random() * 10) * 100) / 100
      ).run()
    }
  } catch (e: any) {
    console.error('Seed error:', e.message)
  }
}
