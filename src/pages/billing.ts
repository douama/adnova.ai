import type { Context } from 'hono'
import { shell } from '../lib/layout'

export const renderBilling = (c: Context) => {
  const content = `
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <!-- Current Plan -->
    <div class="lg:col-span-2 glass rounded-2xl p-6" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-1">Current Plan</div>
          <h2 class="text-3xl font-black text-white">Growth Plan</h2>
          <p class="text-slate-400 text-sm mt-1">$799/month · Billed monthly</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-black text-white">$799</div>
          <div class="text-xs text-slate-500">Next billing: Apr 1, 2026</div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4">
        ${usageItem('Ad Spend Managed', '$124,850', '$200,000', 62)}
        ${usageItem('AI Creatives', '142', '∞', 100)}
        ${usageItem('Active Campaigns', '47', '∞', 100)}
      </div>
      <div class="flex gap-3">
        <button class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
          Upgrade to Enterprise
        </button>
        <button class="glass hover:bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl text-sm transition-all">
          Manage Subscription
        </button>
      </div>
    </div>

    <!-- Usage Summary -->
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4">This Month</h3>
      <div class="space-y-3">
        ${billingStat('AI Creatives Generated', '142', 'fa-wand-magic-sparkles', 'purple')}
        ${billingStat('AI Decisions Made', '12,847', 'fa-brain', 'brand')}
        ${billingStat('Campaigns Managed', '47', 'fa-bullhorn', 'emerald')}
        ${billingStat('Budget Optimizations', '384', 'fa-dollar-sign', 'amber')}
        ${billingStat('Audiences Built', '12', 'fa-users', 'blue')}
      </div>
    </div>
  </div>

  <!-- Plans Comparison -->
  <div class="glass rounded-2xl p-5 mb-6">
    <h3 class="font-bold text-white mb-4">Plan Comparison</h3>
    <div class="grid grid-cols-3 gap-4">
      ${planCard('Starter', '$299', false, ['$50K ad spend', '5 campaigns', 'AI creative gen', 'Basic automation', 'Email support'])}
      ${planCard('Growth', '$799', true, ['$200K ad spend', 'Unlimited campaigns', 'Advanced AI engine', 'Full automation', 'Priority support', 'White-label reports', 'API access'])}
      ${planCard('Enterprise', 'Custom', false, ['Unlimited spend', 'Dedicated AI instance', 'Custom integrations', 'SLA guarantee', 'Dedicated CSM', 'On-premise option'])}
    </div>
  </div>

  <!-- Invoices -->
  <div class="glass rounded-2xl p-5">
    <h3 class="font-bold text-white mb-4">Billing History</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead><tr class="text-xs text-slate-500 border-b border-white/5">
          <th class="text-left pb-3">Date</th><th class="text-left pb-3">Description</th>
          <th class="text-right pb-3">Amount</th><th class="text-right pb-3">Status</th><th class="text-right pb-3"></th>
        </tr></thead>
        <tbody>
          ${invoiceRow('Mar 1, 2026', 'Growth Plan — Monthly', '$799.00', 'Paid')}
          ${invoiceRow('Feb 1, 2026', 'Growth Plan — Monthly', '$799.00', 'Paid')}
          ${invoiceRow('Jan 1, 2026', 'Growth Plan — Monthly', '$799.00', 'Paid')}
          ${invoiceRow('Dec 1, 2025', 'Starter Plan — Monthly', '$299.00', 'Paid')}
        </tbody>
      </table>
    </div>
  </div>
  `
  return c.html(shell('Billing', content, '/billing'))
}

function usageItem(label: string, used: string, max: string, pct: number): string {
  return `<div class="glass rounded-xl p-3">
    <div class="flex items-center justify-between mb-1">
      <span class="text-xs text-slate-500">${label}</span>
      <span class="text-xs text-slate-400">${used} / ${max}</span>
    </div>
    <div class="progress-bar"><div class="progress-fill ${pct >= 80 ? 'bg-amber-500' : 'bg-brand-500'}" style="width:${pct}%"></div></div>
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

function planCard(name: string, price: string, current: boolean, features: string[]): string {
  return `<div class="glass rounded-xl p-5 ${current ? 'border border-brand-500/40' : ''}">
    ${current ? '<div class="text-xs font-bold text-brand-400 mb-2">✓ CURRENT PLAN</div>' : ''}
    <h4 class="font-bold text-white text-lg">${name}</h4>
    <div class="text-2xl font-black text-white mb-4">${price}<span class="text-sm text-slate-500 font-normal">${price !== 'Custom' ? '/mo' : ''}</span></div>
    <ul class="space-y-2">
      ${features.map(f => `<li class="flex items-center gap-2 text-xs text-slate-400">
        <i class="fas fa-check text-emerald-400 text-xs"></i>${f}
      </li>`).join('')}
    </ul>
    ${!current ? `<button class="w-full mt-4 glass hover:bg-white/10 text-slate-400 text-xs py-2 rounded-lg transition-all">${price === 'Custom' ? 'Contact Sales' : 'Downgrade'}</button>` : ''}
  </div>`
}

function invoiceRow(date: string, desc: string, amount: string, status: string): string {
  return `<tr class="border-b border-white/5">
    <td class="py-3 text-slate-400 text-xs">${date}</td>
    <td class="py-3 text-slate-300 text-sm">${desc}</td>
    <td class="py-3 text-right font-semibold text-white">${amount}</td>
    <td class="py-3 text-right"><span class="badge-live text-xs px-2 py-1 rounded-full">${status}</span></td>
    <td class="py-3 text-right"><button class="text-xs text-brand-400 hover:text-brand-300"><i class="fas fa-download mr-1"></i>PDF</button></td>
  </tr>`
}
