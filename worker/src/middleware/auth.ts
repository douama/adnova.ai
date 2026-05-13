import type { MiddlewareHandler } from "hono";
import { createClient } from "@supabase/supabase-js";
import type { AppEnv, AuthContext } from "../types";

/**
 * Verifies Supabase access token (Bearer) and loads the caller's profile
 * (org_id + role) into `c.var.auth`.
 */
export const authMiddleware: MiddlewareHandler<AppEnv> = async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return c.json({ error: "missing_token" }, 401);
  }
  const token = header.slice(7);

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData.user) {
    return c.json({ error: "invalid_token" }, 401);
  }

  const { data: profile, error: profErr } = await supabase
    .from("profiles")
    .select("organization_id, role")
    .eq("id", userData.user.id)
    .single();

  if (profErr || !profile?.organization_id) {
    return c.json({ error: "no_organization" }, 403);
  }

  const auth: AuthContext = {
    userId: userData.user.id,
    orgId: profile.organization_id,
    role: profile.role as AuthContext["role"],
    email: userData.user.email ?? "",
  };
  c.set("auth", auth);

  await next();
};

/** Require one of the given roles. */
export const requireRole =
  (...roles: AuthContext["role"][]): MiddlewareHandler<AppEnv> =>
  async (c, next) => {
    const auth = c.get("auth");
    if (!auth || !roles.includes(auth.role)) {
      return c.json({ error: "forbidden" }, 403);
    }
    await next();
  };
