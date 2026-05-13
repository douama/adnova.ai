import { describe, expect, it } from "vitest";
import { encryptToken, decryptToken } from "./crypto";

// 32 bytes of zeros, base64-encoded. Test-only key.
const TEST_KEY = btoa("\0".repeat(32));

describe("crypto (AES-GCM)", () => {
  it("round-trips plaintext", async () => {
    const plain = "EAAJZA...meta-access-token-with-symbols/+=";
    const blob = await encryptToken(plain, TEST_KEY);
    const out = await decryptToken(blob, TEST_KEY);
    expect(out).toBe(plain);
  });

  it("produces a different ciphertext each call (fresh IV)", async () => {
    const a = await encryptToken("same", TEST_KEY);
    const b = await encryptToken("same", TEST_KEY);
    expect(a).not.toBe(b);
  });

  it("fails to decrypt under a different key", async () => {
    const blob = await encryptToken("secret", TEST_KEY);
    const otherKey = btoa("\x01".repeat(32));
    await expect(decryptToken(blob, otherKey)).rejects.toThrow();
  });

  it("rejects a wrong key size", async () => {
    const shortKey = btoa("short");
    await expect(encryptToken("x", shortKey)).rejects.toThrow(/32 bytes/);
  });

  it("rejects truncated ciphertext", async () => {
    await expect(decryptToken("AAAA", TEST_KEY)).rejects.toThrow(/too short/);
  });
});
