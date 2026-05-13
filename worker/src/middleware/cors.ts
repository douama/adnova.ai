import { cors } from "hono/cors";
import type { MiddlewareHandler } from "hono";
import type { AppEnv } from "../types";

export const corsMiddleware = (): MiddlewareHandler<AppEnv> => async (c, next) => {
  const allowed = c.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  return cors({
    origin: (origin) => (allowed.includes(origin) ? origin : null),
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })(c, next);
};
