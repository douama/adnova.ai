import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { auth as authSchemas } from "@adnova/shared";
import { rateLimit } from "../middleware/rateLimit";
import { serviceClient } from "../lib/supabase";
import { slugify } from "../lib/slug";
import type { AppEnv } from "../types";

export const authRoutes = new Hono<AppEnv>();

const { registerSchema, loginSchema, refreshSchema } = authSchemas;

/**
 * POST /auth/register
 * Creates auth user + organization + owner profile in one transaction-ish flow.
 */
authRoutes.post(
  "/register",
  rateLimit({ max: 5, windowSec: 60, prefix: "auth:register" }),
  zValidator("json", registerSchema),
  async (c) => {
    const { email, password, fullName, organizationName } = c.req.valid("json");
    const supabase = serviceClient(c.env);

    // 1) Auth user
    const { data: signup, error: signupErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (signupErr || !signup.user) {
      return c.json({ error: "register_failed", detail: signupErr?.message }, 400);
    }
    const userId = signup.user.id;

    // 2) Organization — insert with retry on unique-violation (Postgres 23505).
    // Avoids the TOCTOU window of "select then insert".
    const baseSlug = slugify(organizationName);
    let org: { id: string; slug: string } | null = null;
    let lastErr: { code?: string; message?: string } | null = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      const slug = attempt === 0 ? baseSlug : `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
      const { data, error } = await supabase
        .from("organizations")
        .insert({ name: organizationName, slug })
        .select("id, slug")
        .single();
      if (!error && data) {
        org = data;
        break;
      }
      lastErr = error;
      if (error?.code !== "23505") break; // not a uniqueness conflict — fail fast
    }
    if (!org) {
      await supabase.auth.admin.deleteUser(userId);
      return c.json({ error: "org_create_failed", detail: lastErr?.message }, 500);
    }

    // 3) Link profile (auto-created by trigger) to org as owner
    const { error: profErr } = await supabase
      .from("profiles")
      .update({ organization_id: org.id, role: "owner", full_name: fullName })
      .eq("id", userId);
    if (profErr) {
      await supabase.from("organizations").delete().eq("id", org.id);
      await supabase.auth.admin.deleteUser(userId);
      return c.json({ error: "profile_link_failed", detail: profErr.message }, 500);
    }

    // 4) Sign in to return tokens
    const { data: session, error: signinErr } = await supabase.auth.signInWithPassword({ email, password });
    if (signinErr || !session.session) {
      return c.json({ error: "signin_after_register_failed", detail: signinErr?.message }, 500);
    }

    return c.json({
      user: { id: userId, email },
      organization: { id: org.id, slug: org.slug },
      session: {
        accessToken: session.session.access_token,
        refreshToken: session.session.refresh_token,
        expiresAt: session.session.expires_at,
      },
    });
  },
);

/**
 * POST /auth/login
 */
authRoutes.post(
  "/login",
  rateLimit({ max: 10, windowSec: 60, prefix: "auth:login" }),
  zValidator("json", loginSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");
    const supabase = serviceClient(c.env);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      return c.json({ error: "invalid_credentials" }, 401);
    }

    return c.json({
      user: { id: data.user.id, email: data.user.email },
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
      },
    });
  },
);

/**
 * POST /auth/refresh
 */
authRoutes.post(
  "/refresh",
  rateLimit({ max: 30, windowSec: 60, prefix: "auth:refresh" }),
  zValidator("json", refreshSchema),
  async (c) => {
    const { refreshToken } = c.req.valid("json");
    const supabase = serviceClient(c.env);

    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error || !data.session) {
      return c.json({ error: "invalid_refresh_token" }, 401);
    }

    return c.json({
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
      },
    });
  },
);

/**
 * POST /auth/logout
 */
authRoutes.post("/logout", async (c) => {
  const header = c.req.header("Authorization");
  if (header?.startsWith("Bearer ")) {
    const supabase = serviceClient(c.env);
    await supabase.auth.admin.signOut(header.slice(7));
  }
  return c.json({ ok: true });
});
