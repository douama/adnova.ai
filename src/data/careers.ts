// Open roles + benefits/perks shown on /careers.
// Verbatim content extracted from legacy Hono SSR (branch: legacy-hono-ssr-snapshot).

export type Job = {
  title: string;
  dept: string;
  loc: string;
  type: string;
  level: string;
  desc: string;
};

export type Perk = {
  icon: string; // FontAwesome class fragment (e.g. "fa-laptop-house")
  title: string;
  desc: string;
};

export const JOBS: Job[] = [
  {
    title: "Senior ML Engineer — Ad Bidding",
    dept: "Engineering",
    loc: "San Francisco / Remote",
    type: "Full-time",
    level: "Senior",
    desc: "Build and scale our core bidding algorithms that manage $2B+ in annual ad spend across 9 platforms.",
  },
  {
    title: "Staff Engineer — Data Infrastructure",
    dept: "Engineering",
    loc: "San Francisco / Remote",
    type: "Full-time",
    level: "Staff",
    desc: "Design and own the data pipeline that processes 100M+ events per day powering our AI optimization engine.",
  },
  {
    title: "Frontend Engineer — Dashboard",
    dept: "Engineering",
    loc: "Remote",
    type: "Full-time",
    level: "Senior",
    desc: "Build beautiful, performant dashboard experiences for 2,400+ brands using React and TypeScript.",
  },
  {
    title: "Research Scientist — LLM & Creative AI",
    dept: "AI Research",
    loc: "San Francisco",
    type: "Full-time",
    level: "Senior",
    desc: "Push the frontier of AI-generated advertising creative. Work with LLMs, diffusion models, and video generation.",
  },
  {
    title: "Product Manager — AI Engine",
    dept: "Product",
    loc: "San Francisco / Remote",
    type: "Full-time",
    level: "Senior",
    desc: "Own the roadmap for our core AI optimization engine — the technology that drives 4.82× average ROAS for our customers.",
  },
  {
    title: "Product Designer — Platform UX",
    dept: "Design",
    loc: "Remote",
    type: "Full-time",
    level: "Mid-Senior",
    desc: "Design the interfaces that 2,400+ growth marketers use daily to manage their ad campaigns.",
  },
  {
    title: "Enterprise Account Executive",
    dept: "Sales",
    loc: "New York / Remote",
    type: "Full-time",
    level: "Senior",
    desc: "Close $500K-$2M+ enterprise deals with CMOs, VPs Marketing, and Director-level buyers at Fortune 500 companies.",
  },
  {
    title: "Solutions Engineer — Pre-Sales",
    dept: "Sales",
    loc: "Remote",
    type: "Full-time",
    level: "Mid",
    desc: "Technical advisor to our sales team, helping enterprise prospects understand and evaluate AdNova AI's capabilities.",
  },
  {
    title: "Customer Success Manager — Strategic",
    dept: "Customer Success",
    loc: "Remote",
    type: "Full-time",
    level: "Senior",
    desc: "Own outcomes for our 50 largest customers. Be the trusted advisor that turns good results into exceptional ones.",
  },
  {
    title: "Head of EMEA Marketing",
    dept: "Marketing",
    loc: "London",
    type: "Full-time",
    level: "Director",
    desc: "Build and lead our European marketing strategy. Manage localization, demand generation, and partnerships across EU markets.",
  },
  {
    title: "Security Engineer",
    dept: "Engineering",
    loc: "Remote",
    type: "Full-time",
    level: "Senior",
    desc: "Own our security posture across infrastructure, application, and data layers. Lead SOC 2 and GDPR compliance programs.",
  },
  {
    title: "DevRel & API Ecosystem Lead",
    dept: "Engineering",
    loc: "Remote",
    type: "Full-time",
    level: "Senior",
    desc: "Build our developer community and partner ecosystem. Create documentation, SDKs, and integrations that make AdNova easy to connect.",
  },
];

export const PERKS: Perk[] = [
  {
    icon: "fa-laptop-house",
    title: "Remote-First",
    desc: "Work from anywhere. We have offices in SF, London, and Singapore, but 70% of the team is fully remote.",
  },
  {
    icon: "fa-dollar-sign",
    title: "Competitive Comp",
    desc: "Top-of-market salary + meaningful equity. We believe everyone who builds AdNova should share in its success.",
  },
  {
    icon: "fa-heartbeat",
    title: "Full Health Benefits",
    desc: "Comprehensive medical, dental, vision, and mental health coverage for you and your dependents.",
  },
  {
    icon: "fa-rocket",
    title: "$5K Learning Budget",
    desc: "Annual budget for courses, conferences, books, or any learning that helps you grow professionally.",
  },
  {
    icon: "fa-umbrella-beach",
    title: "Unlimited PTO",
    desc: "We trust you to take the time you need to recharge. Minimum 15 days encouraged. Company-wide breaks in December.",
  },
  {
    icon: "fa-baby",
    title: "16-Week Parental Leave",
    desc: "Fully paid parental leave for all parents — birth, adoption, or fostering. No distinction.",
  },
  {
    icon: "fa-chair",
    title: "$1K Home Office Setup",
    desc: "One-time budget to create an ergonomic, productive home workspace.",
  },
  {
    icon: "fa-dumbbell",
    title: "Wellness Stipend",
    desc: "$100/month for gym membership, fitness apps, meditation, or any wellness activity that works for you.",
  },
];
