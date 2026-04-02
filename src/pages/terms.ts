import { publicHead, SHARED_CSS } from '../lib/pageLayout'

export function renderTerms(): string {
  const head = publicHead({
    title: 'Terms of Service — AdNova AI',
    description: 'Read the Terms of Service for AdNova AI. Learn about your rights, responsibilities, and how we govern your use of our autonomous advertising intelligence platform.',
    canonical: '/terms',
  })

  return `${head}
<body class="dark">
<div class="page-bg-orb orb-1"></div>
<div class="page-bg-orb orb-2"></div>

<!-- NAV -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" style="height:64px">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center gap-2" aria-label="AdNova AI Home">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
      <span class="font-bold text-white text-lg" style="font-family:'Space Grotesk',sans-serif">AdNova AI</span>
    </a>
    <div class="flex items-center gap-4">
      <a href="/" class="text-slate-400 hover:text-white text-sm transition-colors">← Back to Home</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold">Start Free Trial</a>
    </div>
  </div>
</nav>

<!-- CONTENT -->
<main class="max-w-4xl mx-auto px-6 pt-28 pb-24">
  <!-- Header -->
  <div class="mb-12">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 border border-indigo-500/20 mb-6">
      <i class="fas fa-file-contract text-indigo-400"></i>
      Legal Document
    </div>
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">
      Terms of <span class="glow-text">Service</span>
    </h1>
    <p class="text-slate-400 text-lg">Last updated: April 2, 2026 · Effective: April 2, 2026</p>
    <div class="mt-6 p-4 rounded-xl glass border border-amber-500/20 flex gap-3">
      <i class="fas fa-info-circle text-amber-400 mt-0.5 flex-shrink-0"></i>
      <p class="text-slate-300 text-sm">Please read these Terms of Service carefully before using AdNova AI. By accessing or using our platform, you agree to be bound by these terms.</p>
    </div>
  </div>

  <!-- TOC -->
  <div class="glass-card rounded-2xl p-6 mb-10">
    <h2 class="text-white font-semibold mb-4 flex items-center gap-2"><i class="fas fa-list text-indigo-400"></i> Table of Contents</h2>
    <ol class="grid md:grid-cols-2 gap-2 text-sm">
      ${[
        ['1', 'Acceptance of Terms'],
        ['2', 'Description of Service'],
        ['3', 'Account Registration'],
        ['4', 'Subscription Plans & Billing'],
        ['5', 'Acceptable Use Policy'],
        ['6', 'Intellectual Property Rights'],
        ['7', 'Data Privacy & Security'],
        ['8', 'Ad Platform Integrations'],
        ['9', 'AI Engine & Automated Decisions'],
        ['10', 'Limitation of Liability'],
        ['11', 'Warranties & Disclaimers'],
        ['12', 'Indemnification'],
        ['13', 'Termination'],
        ['14', 'Governing Law'],
        ['15', 'Changes to Terms'],
        ['16', 'Contact Us'],
      ].map(([n, t]) => `<li><a href="#section-${n}" class="text-indigo-400 hover:text-indigo-300 transition-colors">${n}. ${t}</a></li>`).join('')}
    </ol>
  </div>

  <!-- Sections -->
  <div class="space-y-10 text-slate-300 leading-relaxed">

    <section id="section-1">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">1</span> Acceptance of Terms</h2>
      <p class="mb-4">These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "Customer," or "you") and AdNova AI, Inc. ("AdNova AI," "we," "us," or "our"), governing your access to and use of the AdNova AI platform, including all features, tools, APIs, and services (collectively, the "Service").</p>
      <p class="mb-4">By creating an account, clicking "I Agree," or otherwise accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you are accepting these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity.</p>
      <p>If you do not agree to these Terms, you may not access or use the Service. Your continued use of the Service after any modification to these Terms constitutes acceptance of the modified Terms.</p>
    </section>

    <section id="section-2">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">2</span> Description of Service</h2>
      <p class="mb-4">AdNova AI provides an autonomous artificial intelligence-powered advertising management platform that enables businesses to manage, optimize, and automate their digital advertising campaigns across multiple platforms including, but not limited to, Facebook, Google, TikTok, Instagram, LinkedIn, Pinterest, Snapchat, Amazon, and Twitter/X (collectively, "Ad Platforms").</p>
      <p class="mb-4">Key features of the Service include:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong class="text-white">AI-Powered Optimization:</strong> Automated bid management, budget allocation, and creative rotation based on performance data.</li>
        <li><strong class="text-white">Cross-Platform Management:</strong> Unified dashboard for managing campaigns across up to 9 ad platforms.</li>
        <li><strong class="text-white">Creative Generation:</strong> AI-assisted creation of ad copy, visuals, and UGC-style video content.</li>
        <li><strong class="text-white">Audience Intelligence:</strong> Lookalike audience building and advanced targeting optimization.</li>
        <li><strong class="text-white">Analytics & Reporting:</strong> Real-time performance tracking, attribution modeling, and custom reports.</li>
        <li><strong class="text-white">A/B Testing Automation:</strong> Automated split testing and winner selection.</li>
      </ul>
      <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice to affected users.</p>
    </section>

    <section id="section-3">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">3</span> Account Registration</h2>
      <p class="mb-4">To access the Service, you must create an account by providing accurate, complete, and current information. You agree to:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Provide truthful and complete registration information, including a valid business email address.</li>
        <li>Maintain and promptly update your account information to keep it accurate and current.</li>
        <li>Keep your login credentials confidential and not share your password with any third party.</li>
        <li>Notify us immediately of any unauthorized use of your account or any other breach of security.</li>
        <li>Accept responsibility for all activities that occur under your account.</li>
        <li>Ensure that you are at least 18 years of age or have obtained parental/guardian consent.</li>
      </ul>
      <p class="mb-4">Each account is for use by a single organization or individual. The number of permitted team member seats depends on your subscription plan. You may not use the Service to manage advertising campaigns for entities other than your organization without an appropriate reseller or agency agreement with AdNova AI.</p>
      <p>We reserve the right to suspend or terminate accounts that contain inaccurate, fraudulent, or misleading information.</p>
    </section>

    <section id="section-4">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">4</span> Subscription Plans & Billing</h2>
      <h3 class="text-lg font-semibold text-white mb-3">4.1 Subscription Plans</h3>
      <p class="mb-4">AdNova AI offers the following subscription tiers:</p>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="glass-card rounded-xl p-4">
          <div class="text-indigo-400 font-semibold mb-2">Starter</div>
          <div class="text-2xl font-bold text-white mb-1">$299<span class="text-sm text-slate-400">/mo</span></div>
          <ul class="text-sm text-slate-400 space-y-1">
            <li>10 campaigns</li><li>$10K ad spend/mo</li><li>2 platforms</li><li>2 team members</li>
          </ul>
        </div>
        <div class="glass-card rounded-xl p-4 border-indigo-500/30">
          <div class="text-orange-400 font-semibold mb-2">Growth</div>
          <div class="text-2xl font-bold text-white mb-1">$799<span class="text-sm text-slate-400">/mo</span></div>
          <ul class="text-sm text-slate-400 space-y-1">
            <li>50 campaigns</li><li>$100K ad spend/mo</li><li>9 platforms</li><li>10 team members</li>
          </ul>
        </div>
        <div class="glass-card rounded-xl p-4">
          <div class="text-emerald-400 font-semibold mb-2">Enterprise</div>
          <div class="text-2xl font-bold text-white mb-1">Custom</div>
          <ul class="text-sm text-slate-400 space-y-1">
            <li>Unlimited campaigns</li><li>Unlimited spend</li><li>All platforms</li><li>Unlimited seats</li>
          </ul>
        </div>
      </div>
      <h3 class="text-lg font-semibold text-white mb-3">4.2 Billing & Payment</h3>
      <p class="mb-4">All subscriptions are billed monthly or annually in advance. By providing payment information, you authorize AdNova AI to charge the applicable fees to your payment method. All fees are non-refundable except as expressly set forth in our Refund Policy.</p>
      <h3 class="text-lg font-semibold text-white mb-3">4.3 Free Trial</h3>
      <p class="mb-4">New users may be eligible for a 14-day free trial. No credit card is required to start the trial. At the end of the trial period, you must subscribe to a paid plan to continue using the Service. Trial accounts may have reduced feature access.</p>
      <h3 class="text-lg font-semibold text-white mb-3">4.4 Price Changes</h3>
      <p>We reserve the right to change our pricing with 30 days' advance notice. Price changes will take effect at the start of your next billing cycle following the notice period.</p>
    </section>

    <section id="section-5">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">5</span> Acceptable Use Policy</h2>
      <p class="mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to use the Service to:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Violate any applicable local, national, or international law or regulation.</li>
        <li>Promote, distribute, or engage in any form of misleading, deceptive, or fraudulent advertising.</li>
        <li>Advertise illegal products, services, or content including unlicensed drugs, weapons, or hate speech.</li>
        <li>Violate the advertising policies of any Ad Platform to which you connect your account.</li>
        <li>Engage in click fraud, impression fraud, or any other activity designed to inflate advertising metrics artificially.</li>
        <li>Attempt to gain unauthorized access to the Service, our servers, or any connected systems.</li>
        <li>Transmit viruses, malware, or any other harmful code.</li>
        <li>Scrape, reverse engineer, or otherwise extract proprietary algorithms or data from the Service.</li>
        <li>Resell or sublicense the Service without written authorization from AdNova AI.</li>
        <li>Use the Service to target protected classes in violation of fair lending or housing laws.</li>
      </ul>
      <p>Violation of this Acceptable Use Policy may result in immediate account suspension or termination without refund.</p>
    </section>

    <section id="section-6">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">6</span> Intellectual Property Rights</h2>
      <p class="mb-4">The Service, including all software, algorithms, user interfaces, designs, logos, and content (excluding User Content), is the exclusive property of AdNova AI and is protected by copyright, trademark, patent, and other intellectual property laws.</p>
      <p class="mb-4"><strong class="text-white">Your Content:</strong> You retain all ownership rights to advertising content, creative assets, campaign data, and other materials you upload or create using the Service ("User Content"). By using the Service, you grant AdNova AI a limited, non-exclusive license to use, process, and display your User Content solely to provide and improve the Service.</p>
      <p class="mb-4"><strong class="text-white">AI-Generated Content:</strong> Creative assets generated by our AI tools are licensed to you for use in your advertising campaigns. You represent that you have appropriate rights to any source materials used in AI generation.</p>
      <p><strong class="text-white">Feedback:</strong> Any feedback, suggestions, or ideas you provide regarding the Service may be used by AdNova AI without restriction or compensation to you.</p>
    </section>

    <section id="section-7">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">7</span> Data Privacy & Security</h2>
      <p class="mb-4">Your privacy is important to us. Our collection, use, and disclosure of personal information is governed by our <a href="/privacy" class="text-indigo-400 hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>
      <p class="mb-4"><strong class="text-white">Data Security:</strong> We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, SOC 2 Type II compliance, and GDPR compliance. However, no method of transmission over the Internet is 100% secure.</p>
      <p class="mb-4"><strong class="text-white">Ad Platform Data:</strong> When you connect Ad Platform accounts, you grant us access to campaign data, performance metrics, and audience information necessary to provide the Service. We do not sell this data to third parties.</p>
      <p><strong class="text-white">Data Retention:</strong> We retain your data for the duration of your subscription and for up to 90 days after termination to allow for data export. Some aggregated, anonymized data may be retained for longer periods to improve our AI models.</p>
    </section>

    <section id="section-8">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">8</span> Ad Platform Integrations</h2>
      <p class="mb-4">AdNova AI integrates with third-party Ad Platforms via their official APIs. By connecting your Ad Platform accounts, you:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Authorize AdNova AI to access and manage your ad accounts on your behalf.</li>
        <li>Agree to comply with each Ad Platform's own terms of service and advertising policies.</li>
        <li>Accept that AdNova AI is not responsible for changes to Ad Platform APIs, policies, or pricing.</li>
        <li>Acknowledge that spending limits and campaign performance depend on Ad Platform availability and your account standing.</li>
      </ul>
      <p>AdNova AI is not liable for ad spend that occurs due to automated decisions by our AI engine, provided such spending stays within the budgets and limits you have configured in the Service.</p>
    </section>

    <section id="section-9">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">9</span> AI Engine & Automated Decisions</h2>
      <p class="mb-4">The Service uses artificial intelligence and machine learning to make automated decisions regarding your advertising campaigns, including bid adjustments, budget reallocation, creative rotation, audience targeting, and campaign pausing or scaling.</p>
      <p class="mb-4"><strong class="text-white">You remain responsible</strong> for reviewing and approving campaign strategies, setting appropriate budget limits, and monitoring AI-generated recommendations. AdNova AI provides tools for you to set constraints on automated actions.</p>
      <p class="mb-4"><strong class="text-white">ROAS Guarantees:</strong> Any stated ROAS metrics (e.g., "4.82x ROAS") represent historical averages across our customer base and do not constitute a guarantee of individual results. Actual ROAS depends on industry, budget, creative quality, targeting, and market conditions.</p>
      <p>You acknowledge that AI systems can make errors and agree to maintain appropriate human oversight of your advertising campaigns.</p>
    </section>

    <section id="section-10">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">10</span> Limitation of Liability</h2>
      <p class="mb-4">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ADNOVA AI, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
        <li>Loss of profits, revenue, data, goodwill, or business opportunities.</li>
        <li>Damages arising from unauthorized access to or alteration of your data.</li>
        <li>Any advertising spend losses resulting from automated AI decisions within configured budget limits.</li>
        <li>Service interruptions, API failures, or Ad Platform policy changes.</li>
      </ul>
      <p class="mb-4">OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF: (A) THE AMOUNTS PAID BY YOU FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) $100 USD.</p>
      <p>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.</p>
    </section>

    <section id="section-11">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">11</span> Warranties & Disclaimers</h2>
      <p class="mb-4">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY.</p>
      <p class="mb-4">AdNova AI does not warrant that:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>The Service will be uninterrupted, error-free, or completely secure.</li>
        <li>Results obtained through the Service will be accurate or reliable.</li>
        <li>Any specific ROAS, conversion rate, or other advertising metric will be achieved.</li>
        <li>The Service will meet your specific business requirements or expectations.</li>
      </ul>
    </section>

    <section id="section-12">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">12</span> Indemnification</h2>
      <p class="mb-4">You agree to indemnify, defend, and hold harmless AdNova AI and its officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Your use of the Service or violation of these Terms.</li>
        <li>Your User Content, including any claim that it infringes third-party rights.</li>
        <li>Your advertising campaigns, including violations of Ad Platform policies or applicable law.</li>
        <li>Your violation of any third party's rights, including privacy, publicity, or intellectual property rights.</li>
      </ul>
    </section>

    <section id="section-13">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">13</span> Termination</h2>
      <p class="mb-4"><strong class="text-white">By You:</strong> You may cancel your subscription at any time through your account settings or by contacting our support team. Cancellation takes effect at the end of the current billing period. No refunds are issued for unused portions of prepaid subscriptions.</p>
      <p class="mb-4"><strong class="text-white">By AdNova AI:</strong> We reserve the right to suspend or terminate your account immediately and without notice if you: (a) violate these Terms or our Acceptable Use Policy, (b) engage in fraudulent or illegal activity, (c) fail to pay fees when due, or (d) in our judgment, your use of the Service poses a risk to us, other users, or third parties.</p>
      <p><strong class="text-white">Effect of Termination:</strong> Upon termination, your right to use the Service immediately ceases. We will provide you with a 30-day data export period during which you may download your campaign data and performance history.</p>
    </section>

    <section id="section-14">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">14</span> Governing Law</h2>
      <p class="mb-4">These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the federal and state courts located in Delaware.</p>
      <p>For users in the European Union, nothing in these Terms affects your rights under mandatory EU consumer protection law.</p>
    </section>

    <section id="section-15">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">15</span> Changes to Terms</h2>
      <p class="mb-4">We reserve the right to modify these Terms at any time. We will notify you of material changes by:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Sending an email to the address associated with your account.</li>
        <li>Displaying a prominent notice in the Service dashboard.</li>
        <li>Updating the "Last updated" date at the top of this page.</li>
      </ul>
      <p>Your continued use of the Service after the effective date of any changes constitutes acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using the Service and cancel your account.</p>
    </section>

    <section id="section-16">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">16</span> Contact Us</h2>
      <p class="mb-4">If you have any questions about these Terms of Service, please contact us:</p>
      <div class="glass-card rounded-xl p-6 grid md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-2">
            <i class="fas fa-envelope text-indigo-400"></i>
          </div>
          <div class="text-white font-medium text-sm">Email</div>
          <a href="mailto:legal@adnova.ai" class="text-indigo-400 hover:underline text-sm">legal@adnova.ai</a>
        </div>
        <div class="text-center">
          <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
            <i class="fas fa-building text-purple-400"></i>
          </div>
          <div class="text-white font-medium text-sm">Address</div>
          <p class="text-slate-400 text-sm">AdNova AI, Inc.<br>251 Little Falls Drive<br>Wilmington, DE 19808</p>
        </div>
        <div class="text-center">
          <div class="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-2">
            <i class="fas fa-headset text-cyan-400"></i>
          </div>
          <div class="text-white font-medium text-sm">Support</div>
          <a href="mailto:support@adnova.ai" class="text-indigo-400 hover:underline text-sm">support@adnova.ai</a>
        </div>
      </div>
    </section>

  </div>

  <!-- Related Links -->
  <div class="mt-16 pt-10 border-t border-white/10">
    <h3 class="text-white font-semibold mb-4">Related Legal Documents</h3>
    <div class="flex flex-wrap gap-3">
      <a href="/privacy" class="glass px-4 py-2 rounded-lg text-indigo-400 hover:text-white text-sm transition-colors flex items-center gap-2"><i class="fas fa-shield-alt"></i> Privacy Policy</a>
      <a href="/" class="glass px-4 py-2 rounded-lg text-indigo-400 hover:text-white text-sm transition-colors flex items-center gap-2"><i class="fas fa-home"></i> Back to Home</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2"><i class="fas fa-rocket"></i> Start Free Trial</a>
    </div>
  </div>
</main>

<!-- FOOTER MINIMAL -->
<footer class="border-t border-white/10 py-8 text-center text-slate-500 text-sm">
  <p>© 2026 AdNova AI, Inc. All rights reserved. · <a href="/privacy" class="hover:text-indigo-400 transition-colors">Privacy Policy</a> · <a href="/terms" class="text-indigo-400">Terms of Service</a></p>
</footer>

<style>
.page-bg-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1}
.orb-1{width:600px;height:600px;top:-200px;right:-200px;background:radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)}
.orb-2{width:400px;height:400px;bottom:0;left:-100px;background:radial-gradient(circle,rgba(168,85,247,0.08),transparent 70%)}
.section-num{width:2rem;height:2rem;background:linear-gradient(135deg,#6366f1,#a855f7);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;color:white;flex-shrink:0}
section{scroll-margin-top:80px}
</style>
</body>
</html>`
}
