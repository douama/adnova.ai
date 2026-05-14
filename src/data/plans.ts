// Pricing source of truth. Aligned with admin/plans page so changes here
// propagate everywhere. Stripe price IDs live in subscriptions table.

export type Plan = {
  id: "starter" | "pro" | "agency" | "enterprise";
  name: string;
  price: number;
  period: string;
  popular: boolean;
  cta: string;
  summary: string;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    period: "month",
    popular: false,
    cta: "Start free trial",
    summary: "3 ad accounts · 20 creatives/mo",
    features: [
      "3 connected ad accounts",
      "20 AI creatives / month",
      "2 platforms (Meta + Google)",
      "Basic analytics dashboard",
      "Standard AI optimization",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 149,
    period: "month",
    popular: true,
    cta: "Start free trial",
    summary: "15 ad accounts · 100 creatives/mo",
    features: [
      "15 connected ad accounts",
      "100 AI creatives / month",
      "All 9 platforms",
      "Full AI engine (UGC video incl.)",
      "A/B testing automation",
      "Lookalike audience builder",
      "Advanced analytics + reports",
      "Priority support (4h)",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: 499,
    period: "month",
    popular: false,
    cta: "Start free trial",
    summary: "Unlimited · White-label · API",
    features: [
      "Unlimited ad accounts",
      "Unlimited AI creatives",
      "All platforms + custom integrations",
      "Unlimited team members",
      "White-label solution",
      "Private API access",
      "Dedicated CSM + custom reports",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    period: "",
    popular: false,
    cta: "Contact sales",
    summary: "SLA · Dedicated · Custom agents",
    features: [
      "Custom volume + 99.9% SLA",
      "Custom AI agents on your data",
      "Dedicated support team",
      "SSO + advanced security",
      "On-premise deployment option",
      "Quarterly business reviews",
    ],
  },
];
