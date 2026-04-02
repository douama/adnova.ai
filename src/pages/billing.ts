
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderBilling(lang: Lang = 'en'): string {
  const content = `
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
    <!-- Current Plan -->
    <div class="lg:col-span-2 glass rounded-2xl p-6" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div>
          <div class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-1">Current Plan</div>
          <h2 class="text-3xl font-black text-white">Growth Plan</h2>
          <p class="text-slate-400 text-sm mt-1">$799/month · Billed monthly</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-black text-white">$799</div>
          <div class="text-xs text-slate-500">Next billing: Apr 1, 2026</div>
          <div class="mt-1">
            <span class="badge-live text-xs px-2 py-1 rounded-full">Active</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-5">
        ${usageItem('Ad Spend Managed', '$124,850', '$200,000', 62)}
        ${usageItem('AI Creatives', '142', '∞', 60)}
        ${usageItem('Active Campaigns', '47', '∞', 40)}
      </div>
      <div class="flex flex-wrap gap-3">
        <button onclick="openUpgradeModal()" class="bg-gradient-to-r from-brand-600 to-purple-600 hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg">
          <i class="fas fa-arrow-up"></i> Upgrade to Enterprise
        </button>
        <button onclick="openManageModal()" class="glass hover:bg-white/10 text-slate-300 px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2">
          <i class="fas fa-gear"></i> Manage Subscription
        </button>
        <button onclick="openPaymentModal()" class="glass hover:bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2">
          <i class="fas fa-credit-card text-xs"></i> Payment Method
        </button>
      </div>
    </div>

    <!-- Usage Summary -->
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4 flex items-center gap-2">
        <i class="fas fa-chart-bar text-brand-400 text-sm"></i> This Month
      </h3>
      <div class="space-y-3">
        ${billingStat('AI Creatives Generated', '142', 'fa-wand-magic-sparkles', 'purple')}
        ${billingStat('AI Decisions Made', '12,847', 'fa-brain', 'brand')}
        ${billingStat('Campaigns Managed', '47', 'fa-bullhorn', 'emerald')}
        ${billingStat('Budget Optimizations', '384', 'fa-dollar-sign', 'amber')}
        ${billingStat('Audiences Built', '12', 'fa-users', 'blue')}
      </div>
      <div class="mt-4 pt-4 border-t border-white/5">
        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-500">Monthly Value Generated</span>
          <span class="text-emerald-400 font-bold text-base">$601K</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Plans Comparison -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">Plan Comparison</h3>
      <div class="glass rounded-xl p-1 flex gap-1">
        <button onclick="setBillingCycle('monthly', this)" id="cycle-monthly" class="text-xs px-3 py-1.5 rounded-lg transition-all bg-brand-600 text-white font-semibold">Monthly</button>
        <button onclick="setBillingCycle('annual', this)" id="cycle-annual" class="text-xs px-3 py-1.5 rounded-lg transition-all text-slate-400">Annual <span class="text-emerald-400">-20%</span></button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${planCard('Starter', 299, false, 'from-slate-500 to-slate-600', ['$50K ad spend/mo', '5 active campaigns', '2 users', 'AI creative gen', 'Basic automation', 'Email support'])}
      ${planCard('Growth', 799, true, 'from-brand-500 to-purple-600', ['$200K ad spend/mo', 'Unlimited campaigns', '10 users', 'Advanced AI engine', 'Full automation', 'Priority support', 'White-label reports', 'API access'])}
      ${planCard('Enterprise', 0, false, 'from-amber-500 to-orange-600', ['Unlimited spend', 'Dedicated AI instance', 'Unlimited users', 'Custom integrations', 'SLA guarantee', 'Dedicated CSM', 'On-premise option'])}
    </div>
  </div>

  <!-- Payment Methods -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white flex items-center gap-2"><i class="fas fa-credit-card text-brand-400 text-sm"></i> Payment Methods</h3>
      <button onclick="openPaymentModal()" class="glass hover:bg-white/10 text-brand-400 text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
        <i class="fas fa-plus text-xs"></i> Add Card
      </button>
    </div>
    <div class="space-y-3">
      <div class="glass rounded-xl p-4 flex items-center justify-between border border-brand-500/20">
        <div class="flex items-center gap-3">
          <div class="w-10 h-7 rounded bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold">VISA</div>
          <div>
            <div class="text-sm text-white font-semibold">•••• •••• •••• 4242</div>
            <div class="text-xs text-slate-500">Expires 12/2027 · Default</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">Default</span>
          <button class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
            <i class="fas fa-trash text-red-400 text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Invoices -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white flex items-center gap-2"><i class="fas fa-file-invoice text-brand-400 text-sm"></i> Billing History</h3>
      <button onclick="exportAllInvoices()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
        <i class="fas fa-download text-xs"></i> Export All
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead><tr class="text-xs text-slate-500 border-b border-white/5">
          <th class="text-left pb-3 px-2">Date</th>
          <th class="text-left pb-3 px-2">Description</th>
          <th class="text-right pb-3 px-2">Amount</th>
          <th class="text-right pb-3 px-2">Status</th>
          <th class="text-right pb-3 px-2">Invoice</th>
        </tr></thead>
        <tbody>
          ${invoiceRow('inv-001', 'Mar 1, 2026', 'Growth Plan — Monthly', '$799.00', 'Paid', '3')}
          ${invoiceRow('inv-002', 'Feb 1, 2026', 'Growth Plan — Monthly', '$799.00', 'Paid', '2')}
          ${invoiceRow('inv-003', 'Jan 1, 2026', 'Growth Plan — Monthly', '$799.00', 'Paid', '1')}
          ${invoiceRow('inv-004', 'Dec 1, 2025', 'Starter Plan — Monthly', '$299.00', 'Paid', '12/2025')}
          ${invoiceRow('inv-005', 'Nov 1, 2025', 'Starter Plan — Monthly', '$299.00', 'Paid', '11/2025')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- ═══════════════════════ MODALS ═══════════════════════ -->

  <!-- Upgrade to Enterprise Modal -->
  <div id="upgrade-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-lg animate-fadeIn" style="border:1px solid rgba(245,158,11,0.3)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <i class="fas fa-crown text-white text-sm"></i>
          </div>
          <h2 class="font-bold text-white">Upgrade to Enterprise</h2>
        </div>
        <button onclick="closeUpgradeModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <div class="glass rounded-xl p-4 border border-amber-500/20">
          <div class="text-center mb-4">
            <div class="text-3xl font-black text-white mb-1">Enterprise</div>
            <div class="text-slate-400 text-sm">Custom pricing · Tailored to your needs</div>
          </div>
          <div class="grid grid-cols-2 gap-2 mb-4">
            ${upgradeFeature('Unlimited ad spend')}
            ${upgradeFeature('Dedicated AI instance')}
            ${upgradeFeature('Unlimited users')}
            ${upgradeFeature('Custom integrations')}
            ${upgradeFeature('99.9% SLA guarantee')}
            ${upgradeFeature('Dedicated CSM')}
            ${upgradeFeature('On-premise option')}
            ${upgradeFeature('White-glove onboarding')}
          </div>
        </div>
        <div class="glass rounded-xl p-4">
          <h3 class="text-xs font-semibold text-slate-400 mb-3">Get in Touch</h3>
          <div class="space-y-3">
            <input type="text" placeholder="Your name" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-amber-500 transition-all"/>
            <input type="email" placeholder="Work email" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-amber-500 transition-all"/>
            <input type="text" placeholder="Monthly ad spend (approx.)" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-amber-500 transition-all"/>
            <textarea placeholder="Tell us about your needs..." rows="2" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-amber-500 transition-all resize-none"></textarea>
          </div>
        </div>
        <div class="flex gap-3">
          <button onclick="closeUpgradeModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm">Cancel</button>
          <button onclick="submitUpgrade()" class="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
            <i class="fas fa-paper-plane"></i> Request Demo
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Manage Subscription Modal -->
  <div id="manage-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-md animate-fadeIn" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-gear text-white text-sm"></i>
          </div>
          <h2 class="font-bold text-white">Manage Subscription</h2>
        </div>
        <button onclick="closeManageModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-3">
        <div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-semibold text-white">Growth Plan</span>
            <span class="badge-live text-xs px-2 py-1 rounded-full">Active</span>
          </div>
          <div class="space-y-2 text-xs text-slate-400">
            <div class="flex justify-between"><span>Billing cycle</span><span class="text-white">Monthly</span></div>
            <div class="flex justify-between"><span>Amount</span><span class="text-white">$799.00/month</span></div>
            <div class="flex justify-between"><span>Next billing</span><span class="text-white">Apr 1, 2026</span></div>
            <div class="flex justify-between"><span>Payment method</span><span class="text-white">Visa •••• 4242</span></div>
          </div>
        </div>
        <div class="space-y-2">
          <button onclick="switchToAnnual()" class="w-full glass hover:bg-emerald-500/10 text-emerald-400 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 border border-emerald-500/20">
            <i class="fas fa-calendar-check"></i> Switch to Annual (Save 20% = $1,918/yr)
          </button>
          <button onclick="pauseSubscription()" class="w-full glass hover:bg-amber-500/10 text-amber-400 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 border border-amber-500/20">
            <i class="fas fa-pause"></i> Pause Subscription
          </button>
          <button onclick="cancelSubscription()" class="w-full glass hover:bg-red-500/10 text-red-400 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 border border-red-500/20">
            <i class="fas fa-times-circle"></i> Cancel Subscription
          </button>
        </div>
        <button onclick="closeManageModal()" class="w-full glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm transition-all">Close</button>
      </div>
    </div>
  </div>

  <!-- Add Payment Method Modal -->
  <div id="payment-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-md animate-fadeIn" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-credit-card text-white text-sm"></i>
          </div>
          <h2 class="font-bold text-white">Payment Method</h2>
        </div>
        <button onclick="closePaymentModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <div class="glass rounded-xl p-4 space-y-3">
          <div>
            <label class="text-xs text-slate-500 mb-1 block">Cardholder Name</label>
            <input type="text" placeholder="John Doe" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">Card Number</label>
            <input type="text" placeholder="•••• •••• •••• ••••" maxlength="19" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all font-mono"/>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Expiry</label>
              <input type="text" placeholder="MM/YY" maxlength="5" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all font-mono"/>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">CVC</label>
              <input type="text" placeholder="•••" maxlength="4" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all font-mono"/>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 text-xs text-slate-500">
          <i class="fas fa-lock text-emerald-400"></i>
          <span>Secured by Stripe · 256-bit SSL encryption</span>
        </div>
        <div class="flex gap-3">
          <button onclick="closePaymentModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm">Cancel</button>
          <button onclick="savePaymentMethod()" class="flex-1 bg-gradient-to-r from-brand-600 to-purple-600 hover:opacity-90 text-white py-2.5 rounded-xl text-sm font-semibold transition-all">Save Card</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="billing-toast" class="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none"></div>

  <script>
  // ── Billing cycle toggle ───────────────────────────────────────────────────
  let billingCycle = 'monthly';
  function setBillingCycle(cycle, btn) {
    billingCycle = cycle;
    ['monthly','annual'].forEach(c => {
      const b = document.getElementById('cycle-'+c);
      if (b) { b.className = 'text-xs px-3 py-1.5 rounded-lg transition-all ' + (c === cycle ? 'bg-brand-600 text-white font-semibold' : 'text-slate-400'); }
    });
    // Update plan prices
    document.querySelectorAll('.plan-price').forEach(el => {
      const base = parseInt(el.dataset.base);
      if (base > 0) {
        const price = cycle === 'annual' ? Math.round(base * 0.8) : base;
        el.textContent = '$' + price;
      }
    });
    document.querySelectorAll('.plan-period').forEach(el => {
      el.textContent = cycle === 'annual' ? '/mo (billed annually)' : '/mo';
    });
  }

  // ── Modals ─────────────────────────────────────────────────────────────────
  function openUpgradeModal() { document.getElementById('upgrade-modal').classList.remove('hidden'); }
  function closeUpgradeModal() { document.getElementById('upgrade-modal').classList.add('hidden'); }

  function openManageModal() { document.getElementById('manage-modal').classList.remove('hidden'); }
  function closeManageModal() { document.getElementById('manage-modal').classList.add('hidden'); }

  function openPaymentModal() { document.getElementById('payment-modal').classList.remove('hidden'); }
  function closePaymentModal() { document.getElementById('payment-modal').classList.add('hidden'); }

  // ── Actions ────────────────────────────────────────────────────────────────
  function submitUpgrade() {
    closeUpgradeModal();
    showBillingToast('Enterprise request sent! Our team will contact you within 24h', 'amber');
  }

  function switchToAnnual() {
    closeManageModal();
    showBillingToast('Switched to annual billing — saving $1,918/year starting next cycle', 'emerald');
  }

  function pauseSubscription() {
    closeManageModal();
    showBillingToast('Subscription paused — resumes automatically in 30 days', 'amber');
  }

  function cancelSubscription() {
    closeManageModal();
    showBillingToast('Cancellation request submitted — active until Apr 1, 2026', 'red');
  }

  function savePaymentMethod() {
    closePaymentModal();
    showBillingToast('Payment method added successfully', 'emerald');
  }

  // ── Invoice PDF download ───────────────────────────────────────────────────
  function downloadInvoice(id, date, amount) {
    // Generate printable invoice in new window
    const win = window.open('', '_blank');
    win.document.write(\`<!DOCTYPE html>
<html><head><title>Invoice \${id}</title>
<style>
  body{font-family:sans-serif;padding:40px;color:#1e293b;max-width:600px;margin:0 auto}
  .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;border-bottom:2px solid #6366f1;padding-bottom:20px}
  .brand{font-size:24px;font-weight:900;color:#6366f1}
  .invoice-badge{background:#6366f110;color:#6366f1;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700}
  table{width:100%;border-collapse:collapse;margin:20px 0}
  th,td{padding:12px;text-align:left;border-bottom:1px solid #e2e8f0}
  th{background:#f8fafc;font-size:12px;color:#64748b;text-transform:uppercase}
  .total{font-size:20px;font-weight:900;color:#6366f1}
  .footer{margin-top:40px;font-size:11px;color:#94a3b8;text-align:center}
</style></head>
<body>
<div class="header">
  <div><div class="brand">AdNova AI</div><div style="font-size:12px;color:#64748b">adnova.ai · support@adnova.ai</div></div>
  <div class="invoice-badge">INVOICE \${id.toUpperCase()}</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px">
  <div><div style="font-size:12px;color:#64748b;margin-bottom:4px">Bill To</div><div style="font-weight:600">Acme Corp</div><div style="font-size:12px;color:#64748b">john@acmecorp.com</div></div>
  <div style="text-align:right"><div style="font-size:12px;color:#64748b;margin-bottom:4px">Invoice Date</div><div style="font-weight:600">\${date}</div><div style="font-size:12px;color:#64748b">Due: Immediate</div></div>
</div>
<table>
  <thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
  <tbody>
    <tr><td>Growth Plan — Monthly Subscription<br><span style="font-size:11px;color:#64748b">Unlimited campaigns, AI engine, priority support</span></td><td style="text-align:right;font-weight:600">\${amount}</td></tr>
  </tbody>
</table>
<div style="text-align:right;border-top:2px solid #6366f1;padding-top:12px">
  <div style="font-size:12px;color:#64748b">Total</div>
  <div class="total">\${amount}</div>
  <div style="font-size:12px;color:#10b981;margin-top:4px">✓ Paid</div>
</div>
<div class="footer">Thank you for using AdNova AI · adnova.ai</div>
</body></html>\`);
    win.document.close();
    win.print();
    showBillingToast('Invoice ' + id.toUpperCase() + ' opened for printing/saving', 'brand');
  }

  function exportAllInvoices() {
    showBillingToast('All invoices exported as ZIP — check your downloads', 'brand');
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showBillingToast(msg, color='brand') {
    const colors = { brand:'bg-brand-500/90', emerald:'bg-emerald-500/90', amber:'bg-amber-500/90', red:'bg-red-500/90' };
    const t = document.createElement('div');
    t.className = \`\${colors[color]||colors.brand} text-white text-xs px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm pointer-events-auto flex items-center gap-2 animate-fadeIn\`;
    t.innerHTML = \`<i class="fas fa-\${color==='red'?'exclamation-circle':color==='amber'?'clock':'check-circle'}"></i> \${msg}\`;
    const container = document.getElementById('billing-toast');
    container.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  // Close on backdrop
  ['upgrade-modal','manage-modal','payment-modal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
      if (e.target === this) this.classList.add('hidden');
    });
  });
  </script>
  `
  return shell('Billing', content, '/billing', lang)
}

function usageItem(label: string, used: string, max: string, pct: number): string {
  const color = pct >= 90 ? 'red' : pct >= 70 ? 'amber' : 'brand'
  return `<div class="glass rounded-xl p-3">
    <div class="flex items-center justify-between mb-1.5">
      <span class="text-xs text-slate-500">${label}</span>
      <span class="text-xs text-slate-400 font-medium">${used} / ${max}</span>
    </div>
    <div class="progress-bar"><div class="progress-fill bg-${color}-500" style="width:${Math.min(pct,100)}%"></div></div>
    <div class="text-right text-xs text-slate-600 mt-1">${pct}%</div>
  </div>`
}

function billingStat(label: string, value: string, icon: string, color: string): string {
  return `<div class="flex items-center justify-between py-2 border-b border-white/5">
    <div class="flex items-center gap-2">
      <i class="fas ${icon} text-${color}-400 text-xs w-4 text-center"></i>
      <span class="text-xs text-slate-400">${label}</span>
    </div>
    <span class="text-xs font-bold text-white">${value}</span>
  </div>`
}

function planCard(name: string, price: number, current: boolean, gradient: string, features: string[]): string {
  const priceDisplay = price === 0 ? 'Custom' : `$${price}`
  return `<div class="glass rounded-xl p-5 ${current ? 'border border-brand-500/40' : ''} relative overflow-hidden">
    ${current ? '<div class="absolute top-0 right-0 bg-gradient-to-l from-brand-500 to-purple-600 text-white text-xs px-3 py-1 rounded-bl-xl font-bold">CURRENT</div>' : ''}
    <div class="flex items-center gap-2 mb-3">
      <div class="w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center">
        <i class="fas ${name === 'Enterprise' ? 'fa-crown' : name === 'Growth' ? 'fa-bolt' : 'fa-star'} text-white text-xs"></i>
      </div>
      <h4 class="font-bold text-white">${name}</h4>
    </div>
    <div class="mb-4">
      <span class="text-2xl font-black text-white plan-price" data-base="${price}">${priceDisplay}</span>
      ${price > 0 ? `<span class="text-xs text-slate-500 font-normal plan-period">/mo</span>` : '<span class="text-xs text-slate-500"> · Contact us</span>'}
    </div>
    <ul class="space-y-1.5 mb-4">
      ${features.map(f => `<li class="flex items-center gap-2 text-xs text-slate-400">
        <i class="fas fa-check text-emerald-400 text-xs flex-shrink-0"></i>${f}
      </li>`).join('')}
    </ul>
    ${!current ? `<button onclick="${price === 0 ? 'openUpgradeModal()' : 'showBillingToast(\'Plan change requested\', \'brand\')'}" class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2.5 rounded-xl transition-all font-medium">
      ${price === 0 ? '<i class="fas fa-crown mr-1 text-amber-400"></i> Contact Sales' : price > 799 ? '<i class="fas fa-arrow-up mr-1"></i> Upgrade' : '<i class="fas fa-arrow-down mr-1"></i> Downgrade'}
    </button>` : ''}
  </div>`
}

function invoiceRow(id: string, date: string, desc: string, amount: string, status: string, period: string): string {
  return `<tr class="border-b border-white/5 hover:bg-white/2 transition-all">
    <td class="py-3 px-2 text-slate-400 text-xs">${date}</td>
    <td class="py-3 px-2 text-slate-300 text-sm">${desc}</td>
    <td class="py-3 px-2 text-right font-semibold text-white">${amount}</td>
    <td class="py-3 px-2 text-right"><span class="badge-live text-xs px-2 py-1 rounded-full">${status}</span></td>
    <td class="py-3 px-2 text-right">
      <button onclick="downloadInvoice('${id}', '${date}', '${amount}')" class="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 ml-auto transition-all glass px-2 py-1 rounded-lg hover:bg-white/10">
        <i class="fas fa-download text-xs"></i> PDF
      </button>
    </td>
  </tr>`
}

function upgradeFeature(text: string): string {
  return `<div class="flex items-center gap-2 text-xs text-slate-300">
    <i class="fas fa-check text-amber-400 flex-shrink-0"></i>${text}
  </div>`
}
