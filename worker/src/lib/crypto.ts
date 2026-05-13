/**
 * AES-GCM token encryption for at-rest secrets (OAuth access/refresh tokens
 * stored in `ad_accounts.access_token` / `refresh_token`).
 *
 * Key format: env.ENCRYPTION_KEY = base64-encoded 32 raw bytes.
 * Generate: `openssl rand -base64 32`
 *
 * Ciphertext format: base64( iv(12) ‖ ciphertext+tag(16) )
 * The IV is fresh per call (crypto.getRandomValues). Auth tag is appended by
 * WebCrypto inside the ciphertext (last 16 bytes).
 */

const IV_BYTES = 12;

function b64decode(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64encode(bytes: Uint8Array): string {
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin);
}

async function importKey(b64Key: string): Promise<CryptoKey> {
  const raw = b64decode(b64Key);
  if (raw.length !== 32) {
    throw new Error(`ENCRYPTION_KEY must decode to 32 bytes (got ${raw.length})`);
  }
  return crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

export async function encryptToken(plaintext: string, b64Key: string): Promise<string> {
  const key = await importKey(b64Key);
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext)),
  );
  const out = new Uint8Array(iv.length + ct.length);
  out.set(iv, 0);
  out.set(ct, iv.length);
  return b64encode(out);
}

export async function decryptToken(blob: string, b64Key: string): Promise<string> {
  const key = await importKey(b64Key);
  const buf = b64decode(blob);
  if (buf.length < IV_BYTES + 16) throw new Error("ciphertext too short");
  const iv = buf.subarray(0, IV_BYTES);
  const ct = buf.subarray(IV_BYTES);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return new TextDecoder().decode(pt);
}
