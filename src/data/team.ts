// Team, company values, and milestone timeline shown on /about.
// Verbatim content extracted from legacy Hono SSR (branch: legacy-hono-ssr-snapshot).
// Note: legacy data only shipped `avatar` initials (no photo URLs). The optional
// `photo` field is reserved for real headshots when shot.

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar: string; // 2-letter initials, e.g. "MC"
  color: "slate" | "brand";
  twitter: string; // handle including the leading @
  linkedin: string; // bare URL (no protocol)
  photo?: string; // optional absolute URL for headshot (not provided in legacy)
};

export type Milestone = {
  year: string; // e.g. "2023 Q1"
  event: string;
};

export type Value = {
  icon: string; // FontAwesome class fragment (e.g. "fa-brain")
  color: "slate" | "brand";
  title: string;
  desc: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Marcus Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP Engineering at Meta Ads. Built AI bidding systems managing $2B+ in annual ad spend. Stanford CS PhD.",
    avatar: "MC",
    color: "slate",
    twitter: "@marcuschen",
    linkedin: "linkedin.com/in/marcuschen",
  },
  {
    name: "Priya Nair",
    role: "CTO & Co-Founder",
    bio: "Ex-Google Brain researcher. Led ML infrastructure for Google Smart Campaigns. 12 patents in ad optimization. MIT PhD.",
    avatar: "PN",
    color: "brand",
    twitter: "@priyanair",
    linkedin: "linkedin.com/in/priyanair",
  },
  {
    name: "Sofia Rossi",
    role: "CPO",
    bio: "Previously Head of Product at HubSpot Marketing Hub. Scaled product from 0 to 10M users. Forbes 30 Under 30.",
    avatar: "SR",
    color: "brand",
    twitter: "@sofiarossi",
    linkedin: "linkedin.com/in/sofiarossi",
  },
  {
    name: "James Okafor",
    role: "VP Sales",
    bio: "15 years in adtech sales. Built revenue teams at The Trade Desk and Criteo. $50M+ ARR closed in career.",
    avatar: "JO",
    color: "slate",
    twitter: "@jamesokafor",
    linkedin: "linkedin.com/in/jamesokafor",
  },
  {
    name: "Aisha Yamamoto",
    role: "Head of AI Research",
    bio: "PhD in Reinforcement Learning from Carnegie Mellon. Published 23 papers on multi-armed bandits and dynamic pricing.",
    avatar: "AY",
    color: "brand",
    twitter: "@aishayamamoto",
    linkedin: "linkedin.com/in/aishayamamoto",
  },
  {
    name: "Luca Ferretti",
    role: "VP Engineering",
    bio: "Former Staff Engineer at Stripe. Built distributed systems handling 10M+ API calls/second. Open source contributor.",
    avatar: "LF",
    color: "brand",
    twitter: "@lucaferretti",
    linkedin: "linkedin.com/in/lucaferretti",
  },
];

export const VALUES: Value[] = [
  {
    icon: "fa-brain",
    color: "slate",
    title: "AI-First",
    desc: "Every decision, feature, and workflow is designed with artificial intelligence at its core. We don't just add AI — it's in our DNA.",
  },
  {
    icon: "fa-handshake",
    color: "brand",
    title: "Customer Obsession",
    desc: "Our customers' growth is our growth. We measure our success by the ROAS improvements and time savings we deliver.",
  },
  {
    icon: "fa-chart-line",
    color: "slate",
    title: "Radical Transparency",
    desc: "We show exactly what our AI is doing and why. No black boxes. Full audit trails. You always know what's happening with your budget.",
  },
  {
    icon: "fa-shield-alt",
    color: "brand",
    title: "Security & Privacy",
    desc: "Advertising data is sensitive. We treat your data like it's our own — with enterprise-grade security and strict privacy controls.",
  },
  {
    icon: "fa-globe",
    color: "brand",
    title: "Global Mindset",
    desc: "Built for businesses everywhere. Our platform works across 9 platforms, 150+ countries, and 6 languages natively.",
  },
  {
    icon: "fa-rocket",
    color: "brand",
    title: "Move Fast, Ship Quality",
    desc: "We deploy improvements daily. But never at the expense of quality or stability — your campaigns are always running.",
  },
];

export const TIMELINE: Milestone[] = [
  { year: "2023 Q1", event: "AdNova AI founded by Marcus Chen and Priya Nair in San Francisco." },
  { year: "2023 Q2", event: "Seed round of $4.2M led by Sequoia Capital. Team grows to 8." },
  { year: "2023 Q3", event: "Private beta launched with 50 brands. Average ROAS improvement: +67%." },
  { year: "2023 Q4", event: "Public launch. 500 customers in first month. Series A: $18M." },
  { year: "2024 Q1", event: "Reached 1,000 active brands. Launched TikTok & LinkedIn integrations." },
  { year: "2024 Q2", event: "AI Creative Studio launched. 1M creatives generated in first week." },
  { year: "2024 Q3", event: "Series B: $45M. Opened offices in London and Singapore." },
  { year: "2024 Q4", event: "SOC 2 Type II certified. Reached $10M ARR milestone." },
  { year: "2025 Q1", event: "Launched Enterprise tier. First Fortune 500 customer onboarded." },
  { year: "2025 Q2", event: "2,000 brands milestone. Expanded to Amazon & Pinterest." },
  { year: "2025 Q4", event: "AdNova 2.0 launched with autonomous campaign management & UGC video AI." },
  { year: "2026 Q1", event: "2,412+ active brands. $601K average revenue generated daily across platform." },
];
