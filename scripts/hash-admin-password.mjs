#!/usr/bin/env node
// Generate a PBKDF2 hash for ADMIN_PASSWORD_HASH and a random ADMIN_SESSION_SECRET.
// Usage:  node scripts/hash-admin-password.mjs '<your-password>'
// Then:   npx wrangler pages secret put ADMIN_PASSWORD_HASH --project-name adnova-ai
//         npx wrangler pages secret put ADMIN_SESSION_SECRET --project-name adnova-ai
//         npx wrangler pages secret put ADMIN_EMAIL --project-name adnova-ai

import { webcrypto as crypto } from 'node:crypto'

const ITERATIONS = 600_000
const KEYLEN_BITS = 256

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/hash-admin-password.mjs <password>')
  process.exit(1)
}

const toHex = (bytes) => Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')

const salt = crypto.getRandomValues(new Uint8Array(16))
const keyMaterial = await crypto.subtle.importKey(
  'raw', new TextEncoder().encode(password),
  { name: 'PBKDF2' }, false, ['deriveBits']
)
const bits = await crypto.subtle.deriveBits(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  keyMaterial, KEYLEN_BITS
)
const hash = `pbkdf2$${ITERATIONS}$${toHex(salt)}$${toHex(new Uint8Array(bits))}`
const sessionSecret = toHex(crypto.getRandomValues(new Uint8Array(32)))

console.log('\nADMIN_PASSWORD_HASH=' + hash)
console.log('ADMIN_SESSION_SECRET=' + sessionSecret)
console.log('\nSet these as Cloudflare Pages secrets (do NOT commit):')
console.log('  npx wrangler pages secret put ADMIN_EMAIL --project-name adnova-ai')
console.log('  npx wrangler pages secret put ADMIN_PASSWORD_HASH --project-name adnova-ai')
console.log('  npx wrangler pages secret put ADMIN_SESSION_SECRET --project-name adnova-ai\n')
