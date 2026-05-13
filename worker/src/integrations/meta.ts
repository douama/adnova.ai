// Mock Integration for Meta Ads
export class MetaAdsIntegration {
  constructor(private accessToken: string) {}

  static getOAuthUrl(appId: string, redirectUri: string): string {
    const scopes = ['ads_management', 'ads_read', 'business_management'].join(',');
    return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&response_type=code`;
  }

  static async exchangeCodeForToken(code: string, appId: string, appSecret: string, redirectUri: string) {
    // MOCK: returns a fake token
    return {
      access_token: `mock_meta_access_${code.substring(0, 10)}`,
      expires_in: 5184000, // 60 days
      token_type: "bearer"
    };
  }

  static async getAdAccounts(accessToken: string) {
    // MOCK
    return [
      { id: "act_1001", name: "Meta Ad Account 1", currency: "USD", timezone: "America/New_York" }
    ];
  }

  async getCampaigns(adAccountId: string) {
    // MOCK
    return [
      { id: "meta_camp_1", name: "Retargeting - Meta", status: "ACTIVE", objective: "CONVERSIONS", daily_budget: 5000, lifetime_budget: null, start_time: "2026-01-01T00:00:00Z", stop_time: null },
      { id: "meta_camp_2", name: "Cold Audience - Meta", status: "PAUSED", objective: "LINK_CLICKS", daily_budget: 10000, lifetime_budget: null, start_time: "2026-02-01T00:00:00Z", stop_time: null }
    ];
  }

  async getCampaignInsights(campaignId: string, period: string) {
    // MOCK
    return {
      data: [{
        spend: Math.random() * 1000 + 500,
        impressions: Math.floor(Math.random() * 50000) + 10000,
        clicks: Math.floor(Math.random() * 2000) + 500,
        actions: [{ action_type: "purchase", value: Math.floor(Math.random() * 100) + 10 }],
        roas: (Math.random() * 2 + 1).toFixed(2),
        ctr: (Math.random() * 0.05 + 0.01).toFixed(4),
        cpc: (Math.random() * 1 + 0.2).toFixed(2),
        cpm: (Math.random() * 10 + 5).toFixed(2),
        frequency: (Math.random() * 1 + 1).toFixed(2),
        reach: Math.floor(Math.random() * 40000) + 8000
      }]
    };
  }

  async updateCampaignBudget(campaignId: string, dailyBudget: number): Promise<void> {
    console.log(`[META MOCK] Updated campaign ${campaignId} budget to ${dailyBudget}`);
  }

  async pauseAd(adId: string): Promise<void> {
    console.log(`[META MOCK] Paused ad ${adId}`);
  }
}
