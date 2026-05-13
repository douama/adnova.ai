// Mock Integration for Google Ads
export class GoogleAdsIntegration {
  constructor(private accessToken: string) {}

  static getOAuthUrl(clientId: string, redirectUri: string): string {
    const scopes = ['https://www.googleapis.com/auth/adwords'].join(' ');
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code&access_type=offline&prompt=consent`;
  }

  static async exchangeCodeForToken(code: string, clientId: string, clientSecret: string, redirectUri: string) {
    // MOCK
    return {
      access_token: `mock_google_access_${code.substring(0, 10)}`,
      refresh_token: `mock_google_refresh_${code.substring(0, 10)}`,
      expires_in: 3599,
      token_type: "Bearer"
    };
  }

  static async getAdAccounts(accessToken: string) {
    // MOCK
    return [
      { id: "123-456-7890", name: "Google Ads Main", currency: "USD", timezone: "America/Los_Angeles" }
    ];
  }

  async getCampaigns(customerId: string) {
    // MOCK
    return [
      { id: "gg_camp_1", name: "Search - Brand", status: "ENABLED", advertisingChannelType: "SEARCH", amountMicros: 20000000 },
      { id: "gg_camp_2", name: "PMax - All Products", status: "ENABLED", advertisingChannelType: "PERFORMANCE_MAX", amountMicros: 50000000 }
    ];
  }

  async getCampaignMetrics(customerId: string, campaignId: string, period: string) {
    // MOCK
    return {
      metrics: {
        costMicros: Math.floor(Math.random() * 1000000000) + 100000000,
        impressions: Math.floor(Math.random() * 50000) + 10000,
        clicks: Math.floor(Math.random() * 2000) + 500,
        conversions: Math.floor(Math.random() * 100) + 10,
        conversionsValue: Math.floor(Math.random() * 5000) + 500,
        ctr: Math.random() * 0.1,
        averageCpc: Math.random() * 2 + 0.5
      }
    };
  }
}
