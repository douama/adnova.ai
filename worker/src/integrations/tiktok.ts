// Mock Integration for TikTok Ads
export class TikTokAdsIntegration {
  constructor(private accessToken: string) {}

  static getOAuthUrl(appId: string, redirectUri: string, state: string): string {
    return `https://business-api.tiktok.com/portal/auth?app_id=${appId}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  static async exchangeCodeForToken(code: string, appId: string, appSecret: string) {
    // MOCK
    return {
      access_token: `mock_tiktok_access_${code.substring(0, 10)}`,
      expires_in: 86400,
      token_type: "Bearer"
    };
  }

  static async getAdAccounts(accessToken: string) {
    // MOCK
    return [
      { id: "tt_987654", name: "TikTok Business US", currency: "USD", timezone: "America/New_York" }
    ];
  }

  async getCampaigns(advertiserId: string) {
    // MOCK
    return [
      { id: "tt_camp_1", name: "UGC Creators Test", status: "ENABLE", objective_type: "CONVERSIONS", budget: 200, budget_mode: "BUDGET_MODE_DAY" }
    ];
  }

  async getCampaignMetrics(advertiserId: string, campaignId: string, period: string) {
    // MOCK
    return {
      spend: Math.random() * 500 + 100,
      impressions: Math.floor(Math.random() * 100000) + 20000,
      clicks: Math.floor(Math.random() * 1000) + 200,
      conversions: Math.floor(Math.random() * 50) + 5,
      cpa: (Math.random() * 20 + 5).toFixed(2),
      cpc: (Math.random() * 0.5 + 0.1).toFixed(2),
      ctr: (Math.random() * 0.02 + 0.005).toFixed(4)
    };
  }
}
