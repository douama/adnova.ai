import type { MiddlewareHandler } from "hono";
import type { AppEnv } from "../types";

type Options = {
  /** Max requests within the window */
  max: number;
  /** Window in seconds */
  windowSec: number;
  /** Key namespace, e.g. "auth:login" — prepended to the IP-derived bucket */
  prefix: string;
};

/**
 * Fixed-window rate limiter backed by Cloudflare KV.
 * Keys by (CF-Connecting-IP, prefix). Returns 429 when exceeded.
 *
 * Caveat: KV is eventually consistent across edge locations. Concurrent requests
 * from the same IP hitting different colos may each read a stale counter and
 * exceed `max` by a small factor (≈ N colos). Acceptable for /auth/login-class
 * endpoints with low `max`; migrate to Durable Objects for strict limits.
 */
export const rateLimit = (opts: Options): MiddlewareHandler<AppEnv> => async (c, next) => {
  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("X-Forwarded-For") ?? "unknown";
  const bucket = Math.floor(Date.now() / 1000 / opts.windowSec);
  const key = `rl:${opts.prefix}:${ip}:${bucket}`;

  const raw = await c.env.KV_CACHE.get(key);
  const count = raw ? parseInt(raw, 10) : 0;

  if (count >= opts.max) {
    return c.json({ error: "rate_limited", retryAfter: opts.windowSec }, 429);
  }

  await c.env.KV_CACHE.put(key, String(count + 1), { expirationTtl: opts.windowSec + 5 });
  await next();
};
