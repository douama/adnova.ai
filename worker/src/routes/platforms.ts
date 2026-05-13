import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { MetaAdsIntegration } from "../integrations/meta";
import { GoogleAdsIntegration } from "../integrations/google";
import { TikTokAdsIntegration } from "../integrations/tiktok";
import { encryptToken } from "../lib/crypto";
import { serviceClient } from "../lib/supabase";
import { adAccounts } from "../db/schema";
import type { AppEnv } from "../types";

const platformsRoutes = new Hono<AppEnv>();

platformsRoutes.get("/connect/:platform", async (c) => {
  const platform = c.req.param("platform");
  const redirectUri = `${new URL(c.req.url).origin}/api/platforms/callback/${platform}`;
  
  let url = "";
  if (platform === "meta") {
    url = MetaAdsIntegration.getOAuthUrl(c.env.META_APP_ID || "mock_id", redirectUri);
  } else if (platform === "google") {
    url = GoogleAdsIntegration.getOAuthUrl(c.env.GOOGLE_CLIENT_ID || "mock_id", redirectUri);
  } else if (platform === "tiktok") {
    url = TikTokAdsIntegration.getOAuthUrl(c.env.TIKTOK_APP_ID || "mock_id", redirectUri, "mock_state");
  } else {
    return c.json({ error: "Platform not supported" }, 400);
  }

  return c.redirect(url);
});

platformsRoutes.get("/callback/:platform", async (c) => {
  const platform = c.req.param("platform");
  const code = c.req.query("code");
  const auth = c.get("auth"); // from authMiddleware
  const redirectUri = `${new URL(c.req.url).origin}/api/platforms/callback/${platform}`;
  
  if (!code) return c.json({ error: "No code provided" }, 400);

  let accountsToSave: any[] = [];
  
  if (platform === "meta") {
    const tokenData = await MetaAdsIntegration.exchangeCodeForToken(code, "mock", "mock", redirectUri);
    const accounts = await MetaAdsIntegration.getAdAccounts(tokenData.access_token);
    accountsToSave = accounts.map(acc => ({
      organizationId: auth.orgId,
      platform: "meta",
      externalAccountId: acc.id,
      accountName: acc.name,
      currency: acc.currency,
      timezone: acc.timezone,
      accessToken: tokenData.access_token,
      status: "active"
    }));
  } else if (platform === "google") {
    const tokenData = await GoogleAdsIntegration.exchangeCodeForToken(code, "mock", "mock", redirectUri);
    const accounts = await GoogleAdsIntegration.getAdAccounts(tokenData.access_token);
    accountsToSave = accounts.map(acc => ({
      organizationId: auth.orgId,
      platform: "google",
      externalAccountId: acc.id,
      accountName: acc.name,
      currency: acc.currency,
      timezone: acc.timezone,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      status: "active"
    }));
  } else if (platform === "tiktok") {
    const tokenData = await TikTokAdsIntegration.exchangeCodeForToken(code, "mock", "mock");
    const accounts = await TikTokAdsIntegration.getAdAccounts(tokenData.access_token);
    accountsToSave = accounts.map(acc => ({
      organizationId: auth.orgId,
      platform: "tiktok",
      externalAccountId: acc.id,
      accountName: acc.name,
      currency: acc.currency,
      timezone: acc.timezone,
      accessToken: tokenData.access_token,
      status: "active"
    }));
  }

  const supabase = serviceClient(c.env);
  
  // Encrypt tokens and save to DB
  for (const acc of accountsToSave) {
    if (acc.accessToken) acc.accessToken = await encryptToken(acc.accessToken, c.env.ENCRYPTION_KEY || "dummykeydummykeydummykeydummykey");
    if (acc.refreshToken) acc.refreshToken = await encryptToken(acc.refreshToken, c.env.ENCRYPTION_KEY || "dummykeydummykeydummykeydummykey");
    
    // Check if exists
    const { data: existing } = await supabase
      .from("ad_accounts")
      .select("id")
      .eq("organization_id", acc.organizationId)
      .eq("platform", acc.platform)
      .eq("external_account_id", acc.externalAccountId)
      .single();

    if (existing) {
      await supabase.from("ad_accounts").update(acc).eq("id", existing.id);
    } else {
      await supabase.from("ad_accounts").insert(acc);
    }
  }

  return c.redirect("/accounts?success=true");
});

platformsRoutes.get("/accounts", async (c) => {
  const auth = c.get("auth");
  const supabase = serviceClient(c.env);
  
  const { data, error } = await supabase
    .from("ad_accounts")
    .select("id, platform, account_name, status, created_at, external_account_id")
    .eq("organization_id", auth.orgId);
    
  if (error) return c.json({ error: error.message }, 500);
  
  return c.json({ data });
});

export { platformsRoutes };
