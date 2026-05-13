import type { MiddlewareHandler } from "hono";
import type { AppEnv } from "../types";

/**
 * Attaches a stable request ID to every request — preferring Cloudflare's
 * `cf-ray` (already unique per request and visible in CF logs) and falling
 * back to a UUID. Exposed on response as `X-Request-Id` and available via
 * `c.var.requestId` for logging.
 */
export const requestId: MiddlewareHandler<AppEnv> = async (c, next) => {
  const id = c.req.header("cf-ray") ?? crypto.randomUUID();
  c.set("requestId", id);
  c.res.headers.set("X-Request-Id", id);
  await next();
};
