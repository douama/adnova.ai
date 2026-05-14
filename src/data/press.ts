// Press releases, awards, and exec bios shown on /press-kit.
// Verbatim content extracted from legacy Hono SSR (branch: legacy-hono-ssr-snapshot).

export type PressRelease = {
  date: string; // ISO YYYY-MM-DD
  title: string;
  tag: string;
};

export type Award = {
  year: string;
  award: string;
  org: string;
};

export type Executive = {
  name: string;
  role: string;
  bio: string;
};

export const PRESS_RELEASES: PressRelease[] = [
  {
    date: "2026-03-15",
    title: "AdNova AI Surpasses 2,400 Active Brands, Reports $601K Daily Revenue Generation",
    tag: "Growth",
  },
  {
    date: "2026-02-28",
    title: "AdNova AI Launches Version 2.0 with Autonomous Campaign Management and UGC Video AI",
    tag: "Product",
  },
  {
    date: "2026-01-20",
    title: "AdNova AI Expands European Operations with New London Office",
    tag: "Expansion",
  },
  {
    date: "2025-11-08",
    title: "AdNova AI Achieves SOC 2 Type II Certification, Reinforcing Enterprise Security Standards",
    tag: "Security",
  },
  {
    date: "2025-09-15",
    title: "AdNova AI Raises $45M Series B Led by Tiger Global to Accelerate Global Expansion",
    tag: "Funding",
  },
  {
    date: "2025-06-22",
    title: "AdNova AI Launches Enterprise Tier, Onboards First Fortune 500 Customer",
    tag: "Product",
  },
  {
    date: "2024-12-05",
    title: "AdNova AI Reaches $10M ARR Milestone, Doubles Team to 90+ Employees",
    tag: "Milestone",
  },
  {
    date: "2024-09-18",
    title: "AdNova AI Launches AI Creative Studio — 1 Million Creatives Generated in First Week",
    tag: "Product",
  },
];

export const AWARDS: Award[] = [
  { year: "2026", award: "Best AI Marketing Platform", org: "MarTech Breakthrough Awards" },
  { year: "2026", award: "Top 50 AI Companies", org: "Forbes AI 50" },
  { year: "2025", award: "Product Hunt #1 Product of the Day", org: "Product Hunt" },
  { year: "2025", award: "Best AdTech Startup", org: "Digiday Technology Awards" },
  { year: "2025", award: "Innovation Award — Autonomous AI", org: "Advertising Week" },
  { year: "2024", award: "Startup to Watch", org: "TechCrunch" },
];

export const EXECUTIVES: Executive[] = [
  {
    name: "Marcus Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP Engineering at Meta Ads. Built AI bidding systems managing $2B+ in annual ad spend. Stanford CS PhD. Previously at Google and LinkedIn. Forbes 40 Under 40.",
  },
  {
    name: "Priya Nair",
    role: "CTO & Co-Founder",
    bio: "Ex-Google Brain researcher. Led ML infrastructure for Google Smart Campaigns. 12 patents in ad optimization. MIT PhD in Machine Learning. Previously at DeepMind.",
  },
  {
    name: "Sofia Rossi",
    role: "Chief Product Officer",
    bio: "Previously Head of Product at HubSpot Marketing Hub. Scaled product from 0 to 10M users. Forbes 30 Under 30. Angel investor in 15+ startups.",
  },
  {
    name: "James Okafor",
    role: "VP Sales",
    bio: "15 years in adtech sales. Built revenue teams at The Trade Desk and Criteo. $50M+ ARR closed in career. MBA from Wharton.",
  },
];
