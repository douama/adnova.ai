import { publicHead, SHARED_CSS } from '../lib/pageLayout'

export function renderPrivacy(): string {
  const head = publicHead({
    title: 'Privacy Policy — AdNova AI',
    description: 'AdNova AI Privacy Policy. Learn how we collect, use, protect, and share your data. GDPR & CCPA compliant. SOC 2 Type II certified.',
    canonical: '/privacy',
  })

  return `${head}
<body class="dark">
<div class="page-bg-orb orb-1"></div>
<div class="page-bg-orb orb-2"></div>

<!-- NAV -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" style="height:64px">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center gap-2" aria-label="AdNova AI Home">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF4D00"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
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
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-slate-300 border border-slate-500/20 mb-6">
      <i class="fas fa-shield-alt text-slate-400"></i>
      Privacy First
    </div>
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">
      Privacy <span class="glow-text">Policy</span>
    </h1>
    <p class="text-slate-400 text-lg">Last updated: April 2, 2026 · Effective: April 2, 2026</p>

    <!-- Compliance Badges -->
    <div class="flex flex-wrap gap-3 mt-6">
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 border border-brand-500/30 text-brand-400"><i class="fas fa-check-circle"></i> GDPR Compliant</span>
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-500/10 border border-slate-500/30 text-slate-400"><i class="fas fa-check-circle"></i> CCPA Compliant</span>
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-500/10 border border-slate-500/30 text-slate-400"><i class="fas fa-check-circle"></i> SOC 2 Type II</span>
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 border border-brand-500/30 text-brand-400"><i class="fas fa-lock"></i> AES-256 Encryption</span>
    </div>
  </div>

  <!-- Summary Card -->
  <div class="glass-card rounded-2xl p-6 mb-10 border border-slate-500/20">
    <h2 class="text-white font-semibold mb-4 flex items-center gap-2"><i class="fas fa-bolt text-slate-400"></i> Privacy at a Glance</h2>
    <div class="grid md:grid-cols-2 gap-4 text-sm">
      <div class="flex gap-3"><i class="fas fa-check text-brand-400 mt-0.5 flex-shrink-0"></i><span class="text-slate-300">We <strong class="text-white">never sell</strong> your personal data to third parties.</span></div>
      <div class="flex gap-3"><i class="fas fa-check text-brand-400 mt-0.5 flex-shrink-0"></i><span class="text-slate-300">You can <strong class="text-white">delete your data</strong> at any time by contacting us.</span></div>
      <div class="flex gap-3"><i class="fas fa-check text-brand-400 mt-0.5 flex-shrink-0"></i><span class="text-slate-300">All data is <strong class="text-white">encrypted</strong> with AES-256 at rest and TLS 1.3 in transit.</span></div>
      <div class="flex gap-3"><i class="fas fa-check text-brand-400 mt-0.5 flex-shrink-0"></i><span class="text-slate-300">We collect <strong class="text-white">only what's necessary</strong> to provide the Service.</span></div>
      <div class="flex gap-3"><i class="fas fa-check text-brand-400 mt-0.5 flex-shrink-0"></i><span class="text-slate-300">Ad Platform data is <strong class="text-white">never shared</strong> with competitors.</span></div>
      <div class="flex gap-3"><i class="fas fa-check text-brand-400 mt-0.5 flex-shrink-0"></i><span class="text-slate-300">EU users have full <strong class="text-white">GDPR rights</strong> including data portability.</span></div>
    </div>
  </div>

  <!-- TOC -->
  <div class="glass-card rounded-2xl p-6 mb-10">
    <h2 class="text-white font-semibold mb-4 flex items-center gap-2"><i class="fas fa-list text-slate-400"></i> Table of Contents</h2>
    <ol class="grid md:grid-cols-2 gap-2 text-sm">
      ${[
        ['1', 'Who We Are'],
        ['2', 'Information We Collect'],
        ['3', 'How We Use Your Information'],
        ['4', 'Legal Basis for Processing (GDPR)'],
        ['5', 'How We Share Your Information'],
        ['6', 'Data Retention'],
        ['7', 'Your Rights & Choices'],
        ['8', 'GDPR Rights (EU/EEA Users)'],
        ['9', 'CCPA Rights (California Users)'],
        ['10', 'Cookies & Tracking Technologies'],
        ['11', 'Data Security'],
        ['12', 'International Data Transfers'],
        ['13', 'Children\'s Privacy'],
        ['14', 'Changes to This Policy'],
        ['15', 'Contact & DPO'],
      ].map(([n, t]) => `<li><a href="#p-section-${n}" class="text-slate-400 hover:text-slate-300 transition-colors">${n}. ${t}</a></li>`).join('')}
    </ol>
  </div>

  <!-- Sections -->
  <div class="space-y-10 text-slate-300 leading-relaxed">

    <section id="p-section-1">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">1</span> Who We Are</h2>
      <p class="mb-4">AdNova AI, Inc. ("AdNova AI," "we," "us," or "our") is the data controller responsible for your personal information. We operate the AdNova AI platform — an autonomous advertising intelligence service that helps businesses optimize their digital advertising across multiple platforms.</p>
      <div class="glass p-4 rounded-xl">
        <p class="text-sm"><strong class="text-white">Data Controller:</strong> AdNova AI, Inc.<br>
        <strong class="text-white">Address:</strong> 251 Little Falls Drive, Wilmington, DE 19808, USA<br>
        <strong class="text-white">DPO Email:</strong> <a href="mailto:privacy@adnova.ai" class="text-slate-400 hover:underline">privacy@adnova.ai</a></p>
      </div>
    </section>

    <section id="p-section-2">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">2</span> Information We Collect</h2>
      <h3 class="text-lg font-semibold text-white mb-3">2.1 Information You Provide</h3>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong class="text-white">Account Information:</strong> Name, email address, company name, job title, phone number, password (hashed), billing address.</li>
        <li><strong class="text-white">Payment Information:</strong> Credit card details (processed by Stripe; we store only last 4 digits and expiry), billing address.</li>
        <li><strong class="text-white">Ad Platform Credentials:</strong> OAuth tokens and API keys for connected advertising platforms (stored encrypted).</li>
        <li><strong class="text-white">Campaign Content:</strong> Ad creative assets, copy, images, videos, targeting configurations you upload or create.</li>
        <li><strong class="text-white">Support Communications:</strong> Messages, emails, and feedback you send to our support team.</li>
      </ul>
      <h3 class="text-lg font-semibold text-white mb-3">2.2 Information Collected Automatically</h3>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong class="text-white">Usage Data:</strong> Pages visited, features used, session duration, click patterns, error logs.</li>
        <li><strong class="text-white">Device Information:</strong> Browser type, operating system, screen resolution, device type.</li>
        <li><strong class="text-white">Log Data:</strong> IP address, timestamp, HTTP method, URL, response code, referrer URL.</li>
        <li><strong class="text-white">Performance Metrics:</strong> Page load times, Core Web Vitals scores (anonymized).</li>
        <li><strong class="text-white">Cookies:</strong> Session cookies, preference cookies, analytics cookies (see Section 10).</li>
      </ul>
      <h3 class="text-lg font-semibold text-white mb-3">2.3 Information from Ad Platforms</h3>
      <p class="mb-4">When you connect your advertising accounts, we receive and process:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Campaign performance data (impressions, clicks, conversions, spend, ROAS).</li>
        <li>Audience data (demographic insights, interest categories — aggregated, never individual PII).</li>
        <li>Account structure data (campaigns, ad sets, ads, budgets).</li>
        <li>Billing and invoice data from ad platforms.</li>
      </ul>
    </section>

    <section id="p-section-3">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">3</span> How We Use Your Information</h2>
      <p class="mb-4">We use the information we collect for the following purposes:</p>
      <div class="space-y-4">
        ${[
          ['fas fa-cogs', 'slate', 'Service Delivery', 'To provide, maintain, and improve the AdNova AI platform, including AI-powered optimization, campaign management, and reporting.'],
          ['fas fa-bell', 'brand', 'Communications', 'To send service notifications, billing receipts, security alerts, and support responses. Marketing emails are sent only with your consent.'],
          ['fas fa-chart-line', 'slate', 'Analytics & Improvement', 'To analyze usage patterns, improve AI model performance, and develop new features. Data is aggregated and anonymized where possible.'],
          ['fas fa-shield-alt', 'brand', 'Security & Fraud Prevention', 'To detect, investigate, and prevent fraudulent transactions, abuse, and security incidents.'],
          ['fas fa-balance-scale', 'brand', 'Legal Compliance', 'To comply with legal obligations, respond to lawful requests from authorities, and enforce our Terms of Service.'],
          ['fas fa-sync', 'brand', 'AI Model Training', 'Aggregated, anonymized performance data may be used to improve our AI optimization algorithms. No individual advertiser data is identifiable.'],
        ].map(([icon, color, title, desc]) => `
        <div class="flex gap-4 glass-card rounded-xl p-4">
          <div class="w-9 h-9 rounded-lg bg-${color}-500/15 flex items-center justify-center flex-shrink-0">
            <i class="${icon} text-${color}-400 text-sm"></i>
          </div>
          <div><div class="text-white font-medium mb-1">${title}</div><p class="text-sm text-slate-400">${desc}</p></div>
        </div>`).join('')}
      </div>
    </section>

    <section id="p-section-4">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">4</span> Legal Basis for Processing (GDPR)</h2>
      <p class="mb-4">For users in the EU/EEA, we process personal data under the following legal bases as defined by GDPR Article 6:</p>
      <ul class="list-disc pl-6 space-y-3">
        <li><strong class="text-white">Contract Performance (Art. 6(1)(b)):</strong> Processing necessary to fulfill our contractual obligations to you — providing the Service.</li>
        <li><strong class="text-white">Legitimate Interests (Art. 6(1)(f)):</strong> Improving the platform, fraud prevention, security monitoring, and analytics — where our interests don't override your rights.</li>
        <li><strong class="text-white">Legal Obligation (Art. 6(1)(c)):</strong> Compliance with applicable laws, tax requirements, and responses to legal requests.</li>
        <li><strong class="text-white">Consent (Art. 6(1)(a)):</strong> Marketing communications, optional analytics, and non-essential cookies — which you can withdraw at any time.</li>
      </ul>
    </section>

    <section id="p-section-5">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">5</span> How We Share Your Information</h2>
      <p class="mb-4">We <strong class="text-white">do not sell your personal data</strong>. We share information only in these limited circumstances:</p>
      <ul class="list-disc pl-6 space-y-3 mb-4">
        <li><strong class="text-white">Service Providers:</strong> Trusted third-party vendors who assist in delivering our Service (cloud hosting, payment processing, email delivery, customer support tools). All are bound by data processing agreements.</li>
        <li><strong class="text-white">Ad Platforms:</strong> Campaign instructions and creative assets are sent to Ad Platforms on your behalf as part of the Service.</li>
        <li><strong class="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of the transaction with appropriate notice.</li>
        <li><strong class="text-white">Legal Requirements:</strong> When required by law, subpoena, or other legal process, or when we believe disclosure is necessary to protect rights, property, or safety.</li>
        <li><strong class="text-white">With Your Consent:</strong> For any other purpose not listed here, with your explicit consent.</li>
      </ul>
      <p class="text-sm text-slate-400">Current sub-processors include: Stripe (payments), AWS (cloud infrastructure), Cloudflare (CDN & security), PostHog (analytics), Intercom (customer support). Full list available upon request.</p>
    </section>

    <section id="p-section-6">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">6</span> Data Retention</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="border-b border-white/10"><th class="text-left text-white py-2 pr-4">Data Type</th><th class="text-left text-white py-2 pr-4">Retention Period</th><th class="text-left text-white py-2">Reason</th></tr></thead>
          <tbody class="text-slate-400">
            <tr class="border-b border-white/5"><td class="py-2 pr-4">Account information</td><td class="py-2 pr-4">Duration of subscription + 90 days</td><td class="py-2">Service provision & data export</td></tr>
            <tr class="border-b border-white/5"><td class="py-2 pr-4">Campaign & performance data</td><td class="py-2 pr-4">Duration of subscription + 90 days</td><td class="py-2">Service provision & reporting</td></tr>
            <tr class="border-b border-white/5"><td class="py-2 pr-4">Billing records</td><td class="py-2 pr-4">7 years</td><td class="py-2">Legal & tax compliance</td></tr>
            <tr class="border-b border-white/5"><td class="py-2 pr-4">Security & access logs</td><td class="py-2 pr-4">12 months</td><td class="py-2">Security monitoring & fraud prevention</td></tr>
            <tr class="border-b border-white/5"><td class="py-2 pr-4">Support communications</td><td class="py-2 pr-4">3 years</td><td class="py-2">Service quality & dispute resolution</td></tr>
            <tr><td class="py-2 pr-4">Aggregated analytics</td><td class="py-2 pr-4">Indefinite</td><td class="py-2">Product improvement (anonymized)</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="p-section-7">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">7</span> Your Rights & Choices</h2>
      <p class="mb-4">Regardless of your location, you have the following rights:</p>
      <div class="grid md:grid-cols-2 gap-4">
        ${[
          ['fa-eye', 'Access', 'Request a copy of the personal data we hold about you.'],
          ['fa-edit', 'Correction', 'Request correction of inaccurate or incomplete data.'],
          ['fa-trash', 'Deletion', 'Request deletion of your personal data (subject to legal obligations).'],
          ['fa-download', 'Portability', 'Receive your data in a machine-readable format.'],
          ['fa-ban', 'Opt-Out', 'Unsubscribe from marketing emails at any time.'],
          ['fa-cookie-bite', 'Cookies', 'Manage cookie preferences via our cookie banner.'],
        ].map(([icon, title, desc]) => `
        <div class="glass p-4 rounded-xl flex gap-3">
          <i class="fas ${icon} text-slate-400 mt-0.5 flex-shrink-0"></i>
          <div><div class="text-white font-medium text-sm mb-1">${title}</div><p class="text-slate-400 text-xs">${desc}</p></div>
        </div>`).join('')}
      </div>
      <p class="mt-4 text-sm">To exercise any of these rights, email <a href="mailto:privacy@adnova.ai" class="text-slate-400 hover:underline">privacy@adnova.ai</a>. We respond to requests within 30 days.</p>
    </section>

    <section id="p-section-8">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">8</span> GDPR Rights (EU/EEA Users)</h2>
      <p class="mb-4">If you are located in the European Union or European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR):</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong class="text-white">Right to Restriction:</strong> Request restriction of processing in certain circumstances.</li>
        <li><strong class="text-white">Right to Object:</strong> Object to processing based on legitimate interests, including direct marketing.</li>
        <li><strong class="text-white">Right Not to be Subject to Automated Decisions:</strong> Request human review of significant automated decisions that affect you.</li>
        <li><strong class="text-white">Right to Lodge a Complaint:</strong> File a complaint with your local supervisory authority (e.g., CNIL in France, ICO in UK, BfDI in Germany).</li>
      </ul>
      <p>Our EU representative for GDPR purposes can be contacted at: <a href="mailto:gdpr@adnova.ai" class="text-slate-400 hover:underline">gdpr@adnova.ai</a></p>
    </section>

    <section id="p-section-9">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">9</span> CCPA Rights (California Users)</h2>
      <p class="mb-4">If you are a California resident, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) grant you additional rights:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong class="text-white">Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
        <li><strong class="text-white">Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions.</li>
        <li><strong class="text-white">Right to Opt-Out of Sale:</strong> We do not sell personal information. This right is already honored.</li>
        <li><strong class="text-white">Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
        <li><strong class="text-white">Right to Correct:</strong> Request correction of inaccurate personal information.</li>
      </ul>
      <p>To submit a CCPA request, email <a href="mailto:privacy@adnova.ai" class="text-slate-400 hover:underline">privacy@adnova.ai</a> with subject "CCPA Request." We will respond within 45 days.</p>
    </section>

    <section id="p-section-10">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">10</span> Cookies & Tracking Technologies</h2>
      <p class="mb-4">We use the following types of cookies:</p>
      <div class="space-y-3">
        ${[
          ['Essential', 'Required for the Service to function. Cannot be disabled.', 'Session ID, CSRF token, authentication cookies', 'Session'],
          ['Preferences', 'Store your language and display preferences.', 'adnova_lang, adnova_theme', '1 year'],
          ['Analytics', 'Help us understand how you use the Service (anonymized).', 'PostHog analytics, Google Analytics', '2 years'],
          ['Marketing', 'Used to measure ad campaign effectiveness (only with consent).', 'Google Ads, Meta Pixel (requires opt-in)', '90 days'],
        ].map(([name, desc, examples, duration]) => `
        <div class="glass-card rounded-xl p-4 text-sm">
          <div class="flex items-center justify-between mb-2">
            <span class="text-white font-medium">${name} Cookies</span>
            <span class="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded">${duration}</span>
          </div>
          <p class="text-slate-400 mb-1">${desc}</p>
          <p class="text-xs text-slate-500">Examples: ${examples}</p>
        </div>`).join('')}
      </div>
      <p class="mt-4 text-sm">You can manage cookies in your browser settings. Disabling essential cookies will affect Service functionality.</p>
    </section>

    <section id="p-section-11">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">11</span> Data Security</h2>
      <p class="mb-4">We implement comprehensive security measures to protect your data:</p>
      <div class="grid md:grid-cols-2 gap-4">
        ${[
          ['fa-lock', 'Encryption at Rest', 'AES-256 encryption for all stored data including Ad Platform credentials and campaign data.'],
          ['fa-shield-alt', 'Encryption in Transit', 'TLS 1.3 for all data transmission. HSTS enabled with 2-year preloading.'],
          ['fa-certificate', 'SOC 2 Type II', 'Annual third-party security audits covering security, availability, and confidentiality.'],
          ['fa-user-check', 'Access Controls', 'Role-based access, principle of least privilege, MFA for all internal systems.'],
          ['fa-eye-slash', 'Data Minimization', 'We only collect data necessary to provide the Service. Regular data audits.'],
          ['fa-bell', 'Breach Notification', 'GDPR-compliant breach notification within 72 hours of detection to authorities; 30 days to affected users.'],
        ].map(([icon, title, desc]) => `
        <div class="glass p-4 rounded-xl">
          <div class="flex items-center gap-2 mb-2"><i class="fas ${icon} text-brand-400 text-sm"></i><span class="text-white font-medium text-sm">${title}</span></div>
          <p class="text-slate-400 text-xs">${desc}</p>
        </div>`).join('')}
      </div>
    </section>

    <section id="p-section-12">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">12</span> International Data Transfers</h2>
      <p class="mb-4">AdNova AI is based in the United States. If you are located outside the US, your information will be transferred to and processed in the US. We ensure appropriate safeguards for international transfers including:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong class="text-white">EU-US Data Privacy Framework:</strong> We participate in the EU-US Data Privacy Framework for transfers from the EU/EEA to the US.</li>
        <li><strong class="text-white">Standard Contractual Clauses:</strong> For transfers to other countries, we rely on EU Standard Contractual Clauses (SCCs).</li>
        <li><strong class="text-white">UK IDTA:</strong> For UK users, we use the International Data Transfer Agreement (IDTA).</li>
      </ul>
      <p>Data is primarily processed in AWS US-East-1 (Virginia), with CDN edge nodes globally via Cloudflare.</p>
    </section>

    <section id="p-section-13">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">13</span> Children's Privacy</h2>
      <p>The Service is not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information, please contact us at <a href="mailto:privacy@adnova.ai" class="text-slate-400 hover:underline">privacy@adnova.ai</a> and we will take steps to delete such information.</p>
    </section>

    <section id="p-section-14">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">14</span> Changes to This Policy</h2>
      <p class="mb-4">We may update this Privacy Policy from time to time. When we make material changes, we will:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Update the "Last updated" date at the top of this policy.</li>
        <li>Send an email notification to registered users for significant changes.</li>
        <li>Display a notice in the Service dashboard for 30 days following the change.</li>
      </ul>
      <p>Your continued use of the Service after changes take effect constitutes acceptance of the updated Privacy Policy.</p>
    </section>

    <section id="p-section-15">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3"><span class="section-num">15</span> Contact & DPO</h2>
      <p class="mb-6">For privacy questions, requests, or concerns, contact our Data Protection Officer:</p>
      <div class="glass-card rounded-xl p-6 grid md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-10 h-10 rounded-full bg-slate-500/20 flex items-center justify-center mx-auto mb-2"><i class="fas fa-user-shield text-slate-400"></i></div>
          <div class="text-white font-medium text-sm mb-1">Data Protection Officer</div>
          <a href="mailto:privacy@adnova.ai" class="text-slate-400 hover:underline text-sm">privacy@adnova.ai</a>
        </div>
        <div class="text-center">
          <div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-2"><i class="fas fa-globe-europe text-brand-400"></i></div>
          <div class="text-white font-medium text-sm mb-1">GDPR Requests</div>
          <a href="mailto:gdpr@adnova.ai" class="text-slate-400 hover:underline text-sm">gdpr@adnova.ai</a>
        </div>
        <div class="text-center">
          <div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-2"><i class="fas fa-flag-usa text-brand-400"></i></div>
          <div class="text-white font-medium text-sm mb-1">CCPA Requests</div>
          <a href="mailto:privacy@adnova.ai" class="text-slate-400 hover:underline text-sm">privacy@adnova.ai</a>
        </div>
      </div>
      <p class="mt-4 text-sm text-slate-400">Response time: Within 30 days for most requests. Complex requests may take up to 90 days with notice.</p>
    </section>

  </div>

  <!-- Related Links -->
  <div class="mt-16 pt-10 border-t border-white/10">
    <h3 class="text-white font-semibold mb-4">Related Documents</h3>
    <div class="flex flex-wrap gap-3">
      <a href="/terms" class="glass px-4 py-2 rounded-lg text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2"><i class="fas fa-file-contract"></i> Terms of Service</a>
      <a href="/" class="glass px-4 py-2 rounded-lg text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2"><i class="fas fa-home"></i> Back to Home</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2"><i class="fas fa-rocket"></i> Start Free Trial</a>
    </div>
  </div>
</main>

<!-- FOOTER MINIMAL -->
<footer class="border-t border-white/10 py-8 text-center text-slate-500 text-sm">
  <p>© 2026 AdNova AI, Inc. All rights reserved. · <a href="/privacy" class="text-slate-400">Privacy Policy</a> · <a href="/terms" class="hover:text-slate-400 transition-colors">Terms of Service</a></p>
</footer>

<style>
.page-bg-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1}
.orb-1{width:600px;height:600px;top:-200px;right:-200px;background:radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)}
.orb-2{width:400px;height:400px;bottom:0;left:-100px;background:radial-gradient(circle,rgba(168,85,247,0.08),transparent 70%)}
.section-num{width:2rem;height:2rem;background:linear-gradient(135deg,#FF4D00,#a855f7);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;color:white;flex-shrink:0}
section{scroll-margin-top:80px}
table{border-collapse:collapse;width:100%}
</style>
</body>
</html>`
}
