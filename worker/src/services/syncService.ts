import { serviceClient } from "../lib/supabase";
import type { AppEnv } from "../types";
import { MetaAdsIntegration } from "../integrations/meta";
import { GoogleAdsIntegration } from "../integrations/google";
import { TikTokAdsIntegration } from "../integrations/tiktok";
import { decryptToken } from "../lib/crypto";

export async function syncAllPlatforms(env: AppEnv["Bindings"]) {
  console.log("[SYNC] Starting platform sync...");
  const supabase = serviceClient(env);
  
  const { data: accounts, error } = await supabase
    .from("ad_accounts")
    .select("*")
    .eq("status", "active");

  if (error || !accounts) {
    console.error("[SYNC] Error fetching accounts", error);
    return;
  }

  const secretKey = env.ENCRYPTION_KEY || "dummykeydummykeydummykeydummykey";

  for (const account of accounts) {
    try {
      console.log(`[SYNC] Syncing ${account.platform} account ${account.account_name}`);
      let accessToken = account.access_token;
      if (accessToken) {
        accessToken = await decryptToken(accessToken, secretKey);
      }

      if (account.platform === "meta") {
        const meta = new MetaAdsIntegration(accessToken!);
        const campaigns = await meta.getCampaigns(account.external_account_id);
        await saveCampaigns(supabase, account, campaigns);
      } else if (account.platform === "google") {
        const google = new GoogleAdsIntegration(accessToken!);
        const campaigns = await google.getCampaigns(account.external_account_id);
        await saveCampaigns(supabase, account, campaigns);
      } else if (account.platform === "tiktok") {
        const tiktok = new TikTokAdsIntegration(accessToken!);
        const campaigns = await tiktok.getCampaigns(account.external_account_id);
        await saveCampaigns(supabase, account, campaigns);
      }

      await supabase
        .from("ad_accounts")
        .update({ last_sync_at: new Date().toISOString() })
        .eq("id", account.id);

    } catch (e) {
      console.error(`[SYNC] Failed to sync account ${account.id}`, e);
    }
  }
  
  console.log("[SYNC] Finished platform sync.");
}

async function saveCampaigns(supabase: any, account: any, campaigns: any[]) {
  // Mock save function
  for (const camp of campaigns) {
    const payload = {
      organization_id: account.organization_id,
      ad_account_id: account.id,
      external_campaign_id: camp.id,
      name: camp.name,
      status: camp.status,
      last_synced_at: new Date().toISOString()
    };
    
    // Check exists
    const { data: existing } = await supabase
      .from("campaigns")
      .select("id")
      .eq("ad_account_id", account.id)
      .eq("external_campaign_id", camp.id)
      .single();

    if (existing) {
      await supabase.from("campaigns").update(payload).eq("id", existing.id);
    } else {
      await supabase.from("campaigns").insert(payload);
    }
  }
}
