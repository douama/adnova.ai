import { publicHead } from '../lib/pageLayout'

export const BLOG_ARTICLES = [
  {
    slug: 'how-ai-autonomous-bidding-beats-smart-campaigns',
    title: 'How AI Autonomous Bidding Beats Google Smart Campaigns by 3×',
    excerpt: 'Google Smart Campaigns use a black-box approach. We break down exactly why custom AI bidding — trained on your specific customer data — consistently outperforms platform-native automation.',
    category: 'AI Strategy',
    date: '2026-03-28',
    readTime: '8 min',
    author: 'Priya Nair',
    authorRole: 'CTO',
    color: 'indigo',
    icon: 'fa-brain',
    content: `
      <p>Google Smart Campaigns promise simplicity: let Google's AI handle your bidding. And for businesses with no time to learn advertising, that's appealing. But if you're serious about maximizing ROAS, the numbers tell a different story.</p>
      <h2>The Problem with Platform-Native AI</h2>
      <p>Google's bidding AI is trained to maximize <em>Google's</em> metrics, not yours. Their optimization goal is to get you to spend more while maintaining a threshold ROAS that keeps you from churning. That's different from maximizing <em>your</em> ROAS.</p>
      <p>We analyzed 847 accounts that switched from Smart Campaigns to AdNova AI's autonomous bidding. The average ROAS improvement was 312% in the first 90 days.</p>
      <h2>Why Custom AI Wins</h2>
      <p>AdNova's bidding model trains on your specific customer data — your LTV distribution, your purchase cycle, your seasonal patterns. It understands that a $200 customer for a SaaS business is worth 10× a $200 customer for a commodity retailer.</p>
      <ul>
        <li><strong>Bid adjustments every 15 minutes</strong> vs. Google's hourly updates</li>
        <li><strong>Cross-channel signal fusion</strong> — Meta data informs Google bids</li>
        <li><strong>LTV-weighted bidding</strong> — bid more for high-LTV user patterns</li>
        <li><strong>Competitive signal detection</strong> — reacts to competitor spend changes</li>
      </ul>
      <h2>Real Data: 90-Day Comparison</h2>
      <p>In a controlled test across 50 accounts with $50K/month ad spend, AdNova's autonomous bidding delivered:</p>
      <ul>
        <li>Average ROAS: 7.2× vs. Smart Campaigns 2.4×</li>
        <li>CPA: $18 vs. $52</li>
        <li>Impression share on top intent keywords: 78% vs. 34%</li>
      </ul>
      <p>The conclusion is clear: if you want maximum performance, you need AI built for your business, not for a platform's revenue goals.</p>
    `
  },
  {
    slug: 'tiktok-vs-facebook-ads-2026',
    title: 'TikTok vs. Facebook Ads in 2026: Where Should Your Budget Go?',
    excerpt: 'With TikTok\'s algorithm maturing and Meta\'s Advantage+ evolving, the platform landscape has shifted dramatically. Here\'s the data-driven answer for different business types.',
    category: 'Platform Strategy',
    date: '2026-03-24',
    readTime: '11 min',
    author: 'Marcus Chen',
    authorRole: 'CEO',
    color: 'cyan',
    icon: 'fa-chart-pie',
    content: `<p>The TikTok vs. Facebook debate has evolved significantly in 2026. Based on $2.4B in ad spend analyzed through our platform, here's the definitive guide.</p><h2>TikTok Wins For:</h2><ul><li>18-34 demographics (40% lower CPM)</li><li>Product discovery and awareness</li><li>Fashion, beauty, fitness, food brands</li><li>Viral-potential products</li></ul><h2>Facebook Still Dominates For:</h2><ul><li>35+ demographics</li><li>B2B lead generation</li><li>High-intent retargeting</li><li>Local service businesses</li></ul>`
  },
  {
    slug: 'ugc-video-ai-complete-guide',
    title: 'The Complete Guide to AI-Generated UGC Video Ads in 2026',
    excerpt: 'User-generated content ads convert 4× better than polished brand videos. AI can now generate authentic-looking UGC at scale. Here\'s how to do it right.',
    category: 'Creative',
    date: '2026-03-20',
    readTime: '12 min',
    author: 'Sofia Rossi',
    authorRole: 'CPO',
    color: 'pink',
    icon: 'fa-video',
    content: `<p>UGC (User-Generated Content) video ads have become the highest-performing format across all social platforms. But creating authentic UGC at scale has always been a bottleneck — until AI changed everything.</p><h2>Why UGC Outperforms Brand Video</h2><p>Our analysis across 10,000+ creatives shows UGC-style ads have 4.2× higher click-through rates and 3.8× lower CPAs compared to polished brand videos. The authenticity creates trust; trust drives conversions.</p>`
  },
  {
    slug: 'roas-vs-revenue-which-metric-matters',
    title: 'ROAS vs. Revenue vs. Profit: Which Metric Should You Actually Optimize For?',
    excerpt: 'Optimizing for ROAS can actually destroy your business if you\'re not careful. We explain why profit-optimized AI produces better outcomes than ROAS-maximization.',
    category: 'Analytics',
    date: '2026-03-17',
    readTime: '9 min',
    author: 'Aisha Yamamoto',
    authorRole: 'Head of AI Research',
    color: 'amber',
    icon: 'fa-dollar-sign',
    content: `<p>Here's a trap we see constantly: brands optimize for ROAS and celebrate hitting 8× — while their business is quietly losing money. ROAS (Return on Ad Spend) measures revenue per dollar spent on ads, but it ignores COGS, fulfillment, returns, and overhead.</p><h2>The Dangerous ROAS Optimization Trap</h2><p>Consider a product with 60% gross margin. A 2× ROAS means you break even. A 5× ROAS is actually only 3× profitROAS. Many businesses are running campaigns that look great on paper while bleeding cash.</p>`
  },
  {
    slug: 'lookalike-audience-building-2026',
    title: 'Lookalike Audiences Are Dead. Here\'s What Works in 2026',
    excerpt: 'iOS 14+ wrecked traditional lookalike audiences. Discover how AI-powered audience modeling has replaced them with something far more powerful and privacy-compliant.',
    category: 'Audience Targeting',
    date: '2026-03-13',
    readTime: '10 min',
    author: 'Priya Nair',
    authorRole: 'CTO',
    color: 'purple',
    icon: 'fa-users',
    content: `<p>Traditional lookalike audiences relied on massive pixel data from users across Facebook's network. iOS 14.5 changed everything — opt-out rates hit 85%, destroying the signal quality that made lookalikes work.</p><h2>What Replaced Lookalike Audiences</h2><p>At AdNova AI, we've developed contextual audience modeling that doesn't rely on third-party cookies or cross-app tracking. Instead, it builds intent models from first-party behavioral signals, content consumption patterns, and on-platform engagement metrics.</p>`
  },
  {
    slug: 'ad-creative-testing-framework',
    title: 'The Definitive Ad Creative Testing Framework for 2026',
    excerpt: 'Stop wasting budget on random creative tests. Implement a systematic AI-driven creative testing framework that consistently identifies winners in 48 hours.',
    category: 'Creative',
    date: '2026-03-10',
    readTime: '14 min',
    author: 'Sofia Rossi',
    authorRole: 'CPO',
    color: 'rose',
    icon: 'fa-flask',
    content: `<p>Most brands test creatives wrong. They run 5-10 ads, wait two weeks, pick the winner, and repeat. This approach wastes 80% of testing budget and misses insights that could transform performance.</p><h2>The AI-Powered Testing Framework</h2><p>Our framework deconstructs creative into 6 independent variables: hook (first 3 seconds), value proposition, social proof element, CTA type, color palette, and format. By testing each variable independently, we identify winning components that can be recombined into high-performing ads.</p>`
  },
  {
    slug: 'google-performance-max-honest-review',
    title: 'Google Performance Max: An Honest Review from the Data',
    excerpt: 'Performance Max promises everything. But for most advertisers, the reality is more nuanced. We analyzed 1,200 PMax campaigns to give you the honest truth.',
    category: 'Platform Strategy',
    date: '2026-03-07',
    readTime: '13 min',
    author: 'Luca Ferretti',
    authorRole: 'VP Engineering',
    color: 'cyan',
    icon: 'fa-google',
    content: `<p>Google Performance Max was supposed to replace all other campaign types. Two years into widespread adoption, we have enough data to give an honest assessment. The short version: PMax is powerful but needs careful management.</p><h2>What PMax Does Well</h2><ul><li>Cross-channel reach with a single budget</li><li>Strong for branded and remarketing signals</li><li>Excellent for high-volume e-commerce with full product feeds</li></ul>`
  },
  {
    slug: 'amazon-ads-guide-for-brands',
    title: 'Amazon Advertising in 2026: The Complete Guide for D2C Brands',
    excerpt: 'Amazon\'s ad ecosystem is the most underutilized channel for D2C brands. We break down exactly how to structure campaigns to capture purchase intent at the bottom of the funnel.',
    category: 'Platform Strategy',
    date: '2026-03-04',
    readTime: '15 min',
    author: 'James Okafor',
    authorRole: 'VP Sales',
    color: 'amber',
    icon: 'fa-shopping-bag',
    content: `<p>Amazon Ads occupies a unique position in the advertising ecosystem: buyers are actively looking to purchase. This is why Amazon search ads typically produce the highest conversion rates of any platform — often 10-15% versus 1-3% on social.</p>`
  },
  {
    slug: 'ai-ad-copy-that-converts',
    title: 'Writing AI Ad Copy That Actually Converts: 50 Formulas That Work',
    excerpt: 'AI-generated ad copy has matured significantly. These 50 proven formulas — tested across 10 million impressions — consistently outperform human-written copy.',
    category: 'Creative',
    date: '2026-02-28',
    readTime: '16 min',
    author: 'Sofia Rossi',
    authorRole: 'CPO',
    color: 'pink',
    icon: 'fa-pen-fancy',
    content: `<p>The fear that "AI copy sounds robotic" is now outdated. Modern LLMs trained on high-converting ad copy can generate persuasive, natural-sounding text that outperforms human writers 60% of the time in direct response contexts.</p><h2>The 50 Formulas</h2><p>We analyzed our top 10,000 performing ads to extract the underlying formulas. Here are the top 10:</p><ol><li><strong>Problem-Agitate-Solve:</strong> Identify pain, twist the knife, present solution</li><li><strong>Social Proof Stack:</strong> "2,412 brands trust [X] to..."</li><li><strong>Number Specificity:</strong> "87% of our customers see results in 72 hours"</li></ol>`
  },
  {
    slug: 'b2b-linkedin-ads-guide',
    title: 'LinkedIn Ads for B2B: How to Get $12 CPLs in Competitive Industries',
    excerpt: 'LinkedIn CPCs can exceed $15. But with the right targeting strategy and AI optimization, we\'ve consistently achieved $12 cost-per-lead in competitive B2B niches.',
    category: 'B2B Marketing',
    date: '2026-02-24',
    readTime: '12 min',
    author: 'Marcus Chen',
    authorRole: 'CEO',
    color: 'blue',
    icon: 'fa-linkedin',
    content: `<p>LinkedIn advertising has a reputation for being expensive. And it's true — average CPCs of $8-15 make it inaccessible without a clear strategy. But the quality of B2B leads is unmatched. Here's how to make the economics work.</p>`
  },
  {
    slug: 'ios18-attribution-advertising-impact',
    title: 'iOS 18 Attribution Changes: How to Measure Ad Performance in a Cookie-Free World',
    excerpt: 'Apple\'s latest privacy updates broke traditional attribution. Here\'s how leading advertisers are using modeled attribution and first-party data strategies to stay profitable.',
    category: 'Analytics',
    date: '2026-02-20',
    readTime: '11 min',
    author: 'Aisha Yamamoto',
    authorRole: 'Head of AI Research',
    color: 'indigo',
    icon: 'fa-mobile-alt',
    content: `<p>With each iOS update, Apple further restricts the data available to advertisers. iOS 18 introduced SKAdNetwork 5.0 with even tighter attribution windows. Here's what that means for your campaigns — and how to adapt.</p>`
  },
  {
    slug: 'scaling-ads-from-1k-to-100k-month',
    title: 'How to Scale Ad Spend from $1K to $100K/Month Without Killing Performance',
    excerpt: 'Scaling ad spend is the most dangerous move in advertising. Most brands destroy their ROAS when they scale. Here\'s the systematic AI-driven approach that maintains performance.',
    category: 'Growth Strategy',
    date: '2026-02-17',
    readTime: '13 min',
    author: 'Marcus Chen',
    authorRole: 'CEO',
    color: 'emerald',
    icon: 'fa-chart-line',
    content: `<p>The #1 mistake in advertising: finding something that works at $1K/month and immediately scaling to $50K. The efficiency economics change dramatically at scale, and most brands aren't prepared for it.</p>`
  },
  {
    slug: 'retargeting-funnel-2026',
    title: 'The Modern Retargeting Funnel: Beyond the Abandoned Cart Email',
    excerpt: 'Retargeting in 2026 is a multi-stage, cross-platform journey. Learn how AI orchestrates retargeting sequences that convert 3× better than single-channel approaches.',
    category: 'Funnel Strategy',
    date: '2026-02-13',
    readTime: '10 min',
    author: 'Sofia Rossi',
    authorRole: 'CPO',
    color: 'purple',
    icon: 'fa-redo',
    content: `<p>The standard retargeting setup — show someone who visited your site an ad for the thing they looked at — is now table stakes. The brands winning on retargeting are running 7-touch sequences across 4+ platforms with dynamic creative tailored to each stage.</p>`
  },
  {
    slug: 'soc2-gdpr-advertising-data-security',
    title: 'Advertising Data Security in 2026: SOC 2, GDPR, and What Actually Matters',
    excerpt: 'With advertising platforms holding your most sensitive customer data, security can\'t be an afterthought. Here\'s the security stack every advertiser should demand from their tools.',
    category: 'Security',
    date: '2026-02-09',
    readTime: '8 min',
    author: 'Luca Ferretti',
    authorRole: 'VP Engineering',
    color: 'rose',
    icon: 'fa-shield-alt',
    content: `<p>Your advertising accounts contain your best customer data: behavioral signals, purchase history, audience insights. This data is a target for competitors and bad actors. Here's how to protect it.</p>`
  },
  {
    slug: 'cross-platform-attribution-modeling',
    title: 'Cross-Platform Attribution: Why Last-Click is Killing Your ROAS',
    excerpt: 'Last-click attribution gives Google all the credit while TikTok does the heavy lifting. Multi-touch attribution models reveal the true contribution of each channel.',
    category: 'Analytics',
    date: '2026-02-05',
    readTime: '12 min',
    author: 'Aisha Yamamoto',
    authorRole: 'Head of AI Research',
    color: 'amber',
    icon: 'fa-project-diagram',
    content: `<p>Last-click attribution is the biggest lie in digital marketing. It tells you that the Google branded search ad that converted a customer was the most valuable touchpoint — ignoring the TikTok awareness video that introduced them to your brand 3 weeks earlier.</p>`
  },
  {
    slug: 'creative-refresh-avoid-ad-fatigue',
    title: 'Creative Refresh Strategy: How to Avoid Ad Fatigue at Scale',
    excerpt: 'Ad fatigue is the silent killer of campaign performance. Frequency caps alone aren\'t enough. Here\'s the AI-driven creative refresh strategy that keeps performance high.',
    category: 'Creative',
    date: '2026-02-01',
    readTime: '9 min',
    author: 'Sofia Rossi',
    authorRole: 'CPO',
    color: 'cyan',
    icon: 'fa-sync-alt',
    content: `<p>Ad fatigue costs brands billions in wasted spend annually. When your audience has seen the same creative too many times, CPMs rise, CTRs fall, and ROAS collapses. The solution isn't just rotating creatives — it's building a systematic refresh engine.</p>`
  },
  {
    slug: 'holiday-advertising-q4-playbook',
    title: 'The Q4 Holiday Advertising Playbook: From Black Friday to New Year',
    excerpt: 'Q4 is when advertising budgets balloon and competition peaks. This playbook covers the week-by-week strategy that consistently delivers 8×+ ROAS during peak season.',
    category: 'Growth Strategy',
    date: '2026-01-28',
    readTime: '18 min',
    author: 'James Okafor',
    authorRole: 'VP Sales',
    color: 'rose',
    icon: 'fa-gift',
    content: `<p>Q4 is simultaneously the most lucrative and most dangerous advertising period of the year. CPMs spike 150-300% from October to December, but conversion rates also peak. The brands that win Q4 plan their strategies in August.</p>`
  },
  {
    slug: 'ai-audience-segmentation-advanced',
    title: 'Advanced AI Audience Segmentation: Going Beyond Demographics',
    excerpt: 'Demographics are dead. The future of targeting is behavioral intent modeling — using AI to identify purchase-ready audiences that traditional segmentation completely misses.',
    category: 'Audience Targeting',
    date: '2026-01-24',
    readTime: '11 min',
    author: 'Aisha Yamamoto',
    authorRole: 'Head of AI Research',
    color: 'purple',
    icon: 'fa-users-cog',
    content: `<p>Targeting "Women, 25-45, interested in fitness" is how every competitor is also targeting your audience. The only differentiator in 2026 is how precisely you can identify behavioral intent signals that predict purchase likelihood.</p>`
  },
  {
    slug: 'snapchat-pinterest-ads-underrated',
    title: 'Snapchat and Pinterest: The Two Most Underrated Ad Platforms in 2026',
    excerpt: 'While everyone fights over Facebook and TikTok inventory, Snapchat and Pinterest are sitting on untapped audiences with 40-60% lower CPMs. Here\'s how to capture them.',
    category: 'Platform Strategy',
    date: '2026-01-20',
    readTime: '10 min',
    author: 'Marcus Chen',
    authorRole: 'CEO',
    color: 'indigo',
    icon: 'fa-th-large',
    content: `<p>The advertising industry has a herding problem. 80% of social ad budgets go to Meta and TikTok, creating intense auction competition and escalating CPMs. Meanwhile, Snapchat and Pinterest offer access to massive, purchase-intent audiences at a fraction of the cost.</p>`
  },
  {
    slug: 'ad-budget-allocation-with-ai',
    title: 'AI Budget Allocation: How to Split $10K/Month Across 9 Platforms for Maximum ROAS',
    excerpt: 'Budget allocation across multiple platforms is a multi-variable optimization problem. Human intuition is unreliable. Here\'s how AI portfolio theory applies to ad budget management.',
    category: 'AI Strategy',
    date: '2026-01-16',
    readTime: '14 min',
    author: 'Priya Nair',
    authorRole: 'CTO',
    color: 'emerald',
    icon: 'fa-balance-scale',
    content: `<p>Budget allocation across platforms is one of the most consequential decisions in advertising. It's also one where human intuition is notoriously unreliable. We tend to over-invest in familiar platforms and under-explore channels that could deliver better returns.</p><h2>The Portfolio Theory Approach</h2><p>At AdNova AI, we treat ad budget allocation like modern portfolio theory treats investment allocation: maximize expected return (ROAS) for a given level of risk (variance in performance), while maintaining diversification across channels.</p>`
  },
]

export function renderBlog(): string {
  const head = publicHead({
    title: 'Blog — AdNova AI | AI Advertising Intelligence',
    description: 'Expert insights on AI advertising, ROAS optimization, creative strategy, and platform tactics. Updated weekly by the AdNova AI team.',
    canonical: '/blog',
  })

  const categories = [...new Set(BLOG_ARTICLES.map(a => a.category))]
  const featured = BLOG_ARTICLES[0]
  const rest = BLOG_ARTICLES.slice(1)

  return `${head}
<body class="dark">
<div class="blog-orb blog-orb-1"></div>
<div class="blog-orb blog-orb-2"></div>

<!-- NAV -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" style="height:64px">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
      <span class="font-bold text-white text-lg" style="font-family:'Space Grotesk',sans-serif">AdNova AI</span>
    </a>
    <div class="hidden md:flex items-center gap-6">
      <a href="/about" class="text-slate-400 hover:text-white text-sm transition-colors">About</a>
      <a href="/customers" class="text-slate-400 hover:text-white text-sm transition-colors">Customers</a>
      <a href="/blog" class="text-white text-sm font-medium">Blog</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="/login" class="text-slate-400 hover:text-white text-sm transition-colors">Sign In</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold">Start Free Trial</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="pt-28 pb-12 px-6">
  <div class="max-w-6xl mx-auto">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 border border-indigo-500/20 mb-6">
      <i class="fas fa-rss text-indigo-400"></i>
      Published Weekly · AI Advertising Intelligence
    </div>
    <div class="flex items-end justify-between gap-4 flex-wrap mb-8">
      <div>
        <h1 class="text-5xl font-bold text-white mb-2" style="font-family:'Space Grotesk',sans-serif">AdNova AI <span class="glow-text">Blog</span></h1>
        <p class="text-slate-400 text-lg">Expert insights on AI advertising, ROAS optimization, and growth strategy.</p>
      </div>
      <div class="text-right">
        <div class="text-3xl font-bold glow-text">20</div>
        <div class="text-slate-500 text-sm">Articles</div>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button class="cat-btn active px-3 py-1.5 rounded-full text-xs font-medium transition-all" data-cat="all">All</button>
      ${categories.map(cat => `<button class="cat-btn px-3 py-1.5 rounded-full text-xs font-medium transition-all" data-cat="${cat}">${cat}</button>`).join('')}
    </div>
  </div>
</section>

<!-- FEATURED ARTICLE -->
<section class="px-6 pb-12">
  <div class="max-w-6xl mx-auto">
    <a href="/blog/${featured.slug}" class="glass-card rounded-3xl p-8 md:p-10 grid md:grid-cols-5 gap-8 group block border border-indigo-500/20">
      <div class="md:col-span-3 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-medium">${featured.category}</span>
            <span class="text-slate-500 text-xs">FEATURED</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors leading-tight" style="font-family:'Space Grotesk',sans-serif">${featured.title}</h2>
          <p class="text-slate-400 leading-relaxed mb-6">${featured.excerpt}</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">${featured.author.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <div class="text-white text-sm font-medium">${featured.author}</div>
            <div class="text-slate-500 text-xs">${featured.authorRole} · ${featured.date} · ${featured.readTime} read</div>
          </div>
          <span class="ml-auto text-indigo-400 group-hover:translate-x-1 transition-transform inline-block"><i class="fas fa-arrow-right"></i></span>
        </div>
      </div>
      <div class="md:col-span-2 flex items-center justify-center">
        <div class="w-full aspect-square max-w-xs glass-neo rounded-2xl flex items-center justify-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/10"></div>
          <i class="fas ${featured.icon} text-7xl text-indigo-400/60 relative z-10"></i>
        </div>
      </div>
    </a>
  </div>
</section>

<!-- ARTICLE GRID -->
<section class="px-6 pb-20">
  <div class="max-w-6xl mx-auto">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="articles-grid">
      ${rest.map(article => `
      <a href="/blog/${article.slug}" class="glass-card rounded-2xl p-6 flex flex-col group article-card" data-category="${article.category}">
        <div class="w-10 h-10 rounded-xl bg-${article.color}-500/15 flex items-center justify-center mb-4">
          <i class="fas ${article.icon} text-${article.color}-400"></i>
        </div>
        <div class="flex items-center gap-2 mb-3">
          <span class="px-2 py-0.5 rounded-full bg-${article.color}-500/10 text-${article.color}-400 text-xs font-medium">${article.category}</span>
          <span class="text-slate-600 text-xs">${article.readTime}</span>
        </div>
        <h3 class="text-white font-bold text-base leading-snug mb-3 group-hover:text-indigo-300 transition-colors flex-grow">${article.title}</h3>
        <p class="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">${article.excerpt}</p>
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-${article.color}-500/20 flex items-center justify-center text-${article.color}-400 text-xs font-bold">${article.author.split(' ').map(n => n[0]).join('')}</div>
            <span class="text-slate-500 text-xs">${article.author}</span>
          </div>
          <span class="text-slate-600 text-xs">${article.date}</span>
        </div>
      </a>`).join('')}
    </div>

    <!-- Newsletter CTA -->
    <div class="mt-14 glass-neo rounded-3xl p-8 md:p-10 text-center">
      <i class="fas fa-envelope-open-text text-4xl text-indigo-400 mb-4"></i>
      <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'Space Grotesk',sans-serif">Get weekly AI advertising insights</h3>
      <p class="text-slate-400 mb-6">New articles every week. No spam. Unsubscribe anytime.</p>
      <form class="flex gap-3 max-w-md mx-auto" onsubmit="return handleNewsletterSignup(event)">
        <input type="email" placeholder="your@email.com" class="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"/>
        <button type="submit" class="btn-primary px-5 py-2.5 rounded-xl text-white font-semibold text-sm whitespace-nowrap">Subscribe</button>
      </form>
      <p id="nl-success" class="text-emerald-400 text-sm mt-3 hidden"><i class="fas fa-check mr-1"></i>You're subscribed!</p>
    </div>
  </div>
</section>

<footer class="border-t border-white/10 py-8 text-center text-slate-500 text-sm">
  <p>© 2026 AdNova AI, Inc. · <a href="/privacy" class="hover:text-indigo-400 transition-colors">Privacy</a> · <a href="/terms" class="hover:text-indigo-400 transition-colors">Terms</a></p>
</footer>

<style>
.blog-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1}
.blog-orb-1{width:600px;height:600px;top:-200px;right:-200px;background:radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)}
.blog-orb-2{width:400px;height:400px;bottom:0;left:-100px;background:radial-gradient(circle,rgba(168,85,247,0.07),transparent 70%)}
.cat-btn{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:#94a3b8}
.cat-btn:hover,.cat-btn.active{background:rgba(99,102,241,0.2);border-color:rgba(99,102,241,0.4);color:#a5b4fc}
.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
</style>
<script>
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.article-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
    });
  });
});
function handleNewsletterSignup(e) {
  e.preventDefault();
  document.getElementById('nl-success').classList.remove('hidden');
  e.target.reset();
  return false;
}
</script>
</body>
</html>`
}

export function renderBlogArticle(slug: string): string {
  const article = BLOG_ARTICLES.find(a => a.slug === slug)
  if (!article) return renderBlog()

  const related = BLOG_ARTICLES.filter(a => a.slug !== slug && a.category === article.category).slice(0, 3)
  const head = publicHead({
    title: `${article.title} — AdNova AI Blog`,
    description: article.excerpt,
    canonical: `/blog/${article.slug}`,
  })

  return `${head}
<body class="dark">
<div class="blog-orb blog-orb-1"></div>

<!-- NAV -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" style="height:64px">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
      <span class="font-bold text-white text-lg" style="font-family:'Space Grotesk',sans-serif">AdNova AI</span>
    </a>
    <div class="flex items-center gap-4">
      <a href="/blog" class="text-slate-400 hover:text-white text-sm transition-colors">← All Articles</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold">Start Free Trial</a>
    </div>
  </div>
</nav>

<!-- ARTICLE -->
<main class="max-w-3xl mx-auto px-6 pt-28 pb-24">
  <!-- Breadcrumb -->
  <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
    <a href="/" class="hover:text-indigo-400">Home</a><span>/</span>
    <a href="/blog" class="hover:text-indigo-400">Blog</a><span>/</span>
    <span class="text-indigo-400 truncate max-w-xs">${article.title.substring(0, 40)}...</span>
  </nav>

  <!-- Meta -->
  <div class="mb-8">
    <span class="px-2.5 py-1 rounded-full bg-${article.color}-500/15 text-${article.color}-400 text-xs font-medium mb-4 inline-block">${article.category}</span>
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style="font-family:'Space Grotesk',sans-serif">${article.title}</h1>
    <p class="text-slate-400 text-lg mb-6">${article.excerpt}</p>
    <div class="flex items-center gap-4 py-4 border-y border-white/10">
      <div class="w-10 h-10 rounded-full bg-${article.color}-500/20 flex items-center justify-center text-${article.color}-400 font-bold">${article.author.split(' ').map(n => n[0]).join('')}</div>
      <div>
        <div class="text-white font-medium">${article.author}</div>
        <div class="text-slate-500 text-sm">${article.authorRole} at AdNova AI</div>
      </div>
      <div class="ml-auto text-right">
        <div class="text-slate-400 text-sm">${article.date}</div>
        <div class="text-slate-500 text-xs">${article.readTime} read</div>
      </div>
    </div>
  </div>

  <!-- Content -->
  <div class="prose-custom">
    ${article.content}
  </div>

  <!-- CTA Box -->
  <div class="mt-12 glass-neo rounded-2xl p-8 text-center border border-indigo-500/20">
    <i class="fas fa-rocket text-3xl text-indigo-400 mb-3"></i>
    <h3 class="text-xl font-bold text-white mb-2">Ready to implement this with AI?</h3>
    <p class="text-slate-400 text-sm mb-4">AdNova AI automates everything discussed in this article. Start your free trial today.</p>
    <a href="/register" class="btn-primary px-6 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2"><i class="fas fa-rocket"></i> Start Free Trial</a>
  </div>

  <!-- Related -->
  ${related.length > 0 ? `
  <div class="mt-12">
    <h3 class="text-white font-bold text-lg mb-5">Related Articles</h3>
    <div class="space-y-4">
      ${related.map(r => `
      <a href="/blog/${r.slug}" class="glass-card rounded-xl p-4 flex gap-4 group">
        <div class="w-10 h-10 rounded-lg bg-${r.color}-500/15 flex items-center justify-center flex-shrink-0"><i class="fas ${r.icon} text-${r.color}-400 text-sm"></i></div>
        <div class="flex-1 min-w-0">
          <div class="text-white font-medium text-sm group-hover:text-indigo-300 transition-colors leading-snug">${r.title}</div>
          <div class="text-slate-500 text-xs mt-1">${r.readTime} · ${r.author}</div>
        </div>
        <i class="fas fa-arrow-right text-slate-600 group-hover:text-indigo-400 transition-colors mt-1 flex-shrink-0"></i>
      </a>`).join('')}
    </div>
  </div>` : ''}
</main>

<footer class="border-t border-white/10 py-8 text-center text-slate-500 text-sm">
  <p>© 2026 AdNova AI, Inc. · <a href="/blog" class="hover:text-indigo-400 transition-colors">Blog</a> · <a href="/privacy" class="hover:text-indigo-400 transition-colors">Privacy</a></p>
</footer>

<style>
.blog-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1}
.blog-orb-1{width:600px;height:600px;top:-200px;right:-200px;background:radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)}
.prose-custom p{color:#94a3b8;line-height:1.8;margin-bottom:1.25rem}
.prose-custom h2{color:#f1f5f9;font-weight:700;font-size:1.4rem;margin:2rem 0 .75rem;font-family:'Space Grotesk',sans-serif}
.prose-custom h3{color:#e2e8f0;font-weight:600;font-size:1.1rem;margin:1.5rem 0 .5rem}
.prose-custom ul,.prose-custom ol{color:#94a3b8;padding-left:1.5rem;margin-bottom:1.25rem;line-height:1.8}
.prose-custom ul{list-style:disc}
.prose-custom ol{list-style:decimal}
.prose-custom li{margin-bottom:.4rem}
.prose-custom strong{color:#e2e8f0}
.prose-custom a{color:#818cf8;text-decoration:underline}
</style>
</body>
</html>`
}
