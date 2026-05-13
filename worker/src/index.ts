import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { HTTPException } from "hono/http-exception";

import { corsMiddleware } from "./middleware/cors";
import { authMiddleware } from "./middleware/auth";
import { requestId } from "./middleware/requestId";
import { authRoutes } from "./routes/auth";
import { platformsRoutes } from "./routes/platforms";
import { serviceClient } from "./lib/supabase";
import { syncAllPlatforms } from "./services/syncService";
import type { AppEnv } from "./types";

const app = new Hono<AppEnv>();

app.use("*", requestId);
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", corsMiddleware());

// Public
app.get("/health", (c) =>
  c.json({ status: "ok", version: "1.0.0", env: c.env.ENVIRONMENT, ts: Date.now() }),
);

// Deep health — verifies external deps (Supabase + KV) are reachable.
// Use for uptime monitoring; do NOT poll from clients (hits the DB).
app.get("/health/deep", async (c) => {
  const checks: Record<string, { ok: boolean; latencyMs?: number; error?: string }> = {};

  let t = Date.now();
  try {
    await c.env.KV_CACHE.get("__health__");
    checks.kv = { ok: true, latencyMs: Date.now() - t };
  } catch (e) {
    checks.kv = { ok: false, error: (e as Error).message };
  }

  t = Date.now();
  try {
    const supabase = serviceClient(c.env);
    const { error } = await supabase
      .from("organizations")
      .select("id", { count: "exact", head: true })
      .limit(1);
    if (error) throw error;
    checks.supabase = { ok: true, latencyMs: Date.now() - t };
  } catch (e) {
    checks.supabase = { ok: false, error: (e as Error).message };
  }

  const allOk = Object.values(checks).every((x) => x.ok);
  return c.json({ status: allOk ? "ok" : "degraded", checks, ts: Date.now() }, allOk ? 200 : 503);
});

app.route("/auth", authRoutes);

// Protected
app.use("/api/*", authMiddleware);
app.get("/api/me", (c) => c.json({ auth: c.get("auth") }));
app.route("/api/platforms", platformsRoutes);

// Errors
app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse();
  const rid = c.get("requestId");
  console.error(JSON.stringify({ level: "error", requestId: rid, path: c.req.path, message: err.message, stack: err.stack }));
  return c.json({ error: "internal_error", requestId: rid }, 500);
});

app.notFound((c) => c.json({ error: "not_found", path: c.req.path, requestId: c.get("requestId") }, 404));

export default {
  fetch: app.fetch,
  async scheduled(_event: ScheduledController, _env: AppEnv["Bindings"], _ctx: ExecutionContext) {
    if (_event.cron === "*/15 * * * *") {
      _ctx.waitUntil(syncAllPlatforms(_env));
    }
  },
} satisfies ExportedHandler<AppEnv["Bindings"]>;
