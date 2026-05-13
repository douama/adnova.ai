import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminBilling = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-xl font-black text-white">Facturation Globale</h2>
      <p class="text-xs text-slate-500 mt-0.5">Gestion des paiements, factures et Stripe</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="admin-glass text-xs px-4 py-2 rounded-lg text-orange-400 hover:bg-orange-500/10 transition-all border border-orange-500/20">
        <i class="fas fa-download mr-1.5"></i> Export CSV
      </button>
      <a href="https://dashboard.stripe.com" target="_blank" class="admin-glass text-xs px-4 py-2 rounded-lg text-brand-400 hover:bg-brand-500/10 transition-all border border-brand-500/20">
        <i class="fab fa-stripe mr-1.5"></i> Stripe Dashboard
      </a>
    </div>
  </div>

  <!-- KPIs -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    ${billKpi('Balance Stripe', '$284,700', 'brand', 'fa-dollar-sign')}
    ${billKpi('En attente (payout)', '$12,400', 'brand', 'fa-clock')}
    ${billKpi('Paiements échoués', '3', 'slate', 'fa-credit-card')}
    ${billKpi('Remboursements/mois', '$2,400', 'orange', 'fa-rotate-left')}
  </div>

  <!-- Factures récentes -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">Factures Récentes</h3>
      <input placeholder="Rechercher..." class="glass text-xs px-3 py-1.5 rounded-lg text-slate-300 outline-none w-48 border border-white/8 focus:border-orange-500/30"/>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="text-slate-600 border-b border-white/5">
            <th class="text-left pb-3 font-semibold">Invoice #</th>
            <th class="text-left pb-3 font-semibold">Client</th>
            <th class="text-left pb-3 font-semibold">Plan</th>
            <th class="text-right pb-3 font-semibold">Montant</th>
            <th class="text-center pb-3 font-semibold">Statut</th>
            <th class="text-right pb-3 font-semibold">Date</th>
            <th class="text-right pb-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceRow('INV-2026-0842', 'Digital Storm Agency', 'Growth', 799, 'paid', '31 mars 2026')}
          ${invoiceRow('INV-2026-0841', 'LuxoGroup', 'Growth', 799, 'paid', '30 mars 2026')}
          ${invoiceRow('INV-2026-0840', 'Apex Marketing', 'Enterprise', 12000, 'paid', '28 mars 2026')}
          ${invoiceRow('INV-2026-0839', 'NovaBrand Inc.', 'Starter', 299, 'paid', '30 mars 2026')}
          ${invoiceRow('INV-2026-0838', 'Promo Corp', 'Starter', 299, 'failed', '28 mars 2026')}
          ${invoiceRow('INV-2026-0837', 'TechStart Inc.', 'Growth', 799, 'paid', '27 mars 2026')}
          ${invoiceRow('INV-2026-0836', 'Mega Retail Co.', 'Enterprise', 18000, 'paid', '26 mars 2026')}
          ${invoiceRow('INV-2026-0835', 'SportNation', 'Starter', 299, 'paid', '26 mars 2026')}
          ${invoiceRow('INV-2026-0834', 'FlashRetail Pro', 'Growth', 799, 'paid', '25 mars 2026')}
          ${invoiceRow('INV-2026-0833', 'OldBrand Corp', 'Starter', 299, 'refunded', '24 mars 2026')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Paiements échoués -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center gap-2 mb-4">
      <div class="w-8 h-8 rounded-lg bg-slate-500/20 flex items-center justify-center">
        <i class="fas fa-credit-card text-slate-400 text-sm"></i>
      </div>
      <h3 class="font-bold text-white">Paiements Échoués — Action Requise</h3>
      <span class="text-xs bg-slate-500/20 text-slate-400 px-2 py-0.5 rounded-full ml-auto">3 en attente</span>
    </div>
    <div class="space-y-3">
      ${failedPayment('Promo Corp', 299, 'Carte refusée', '28 mars 2026', 2)}
      ${failedPayment('RetailCo Test', 799, 'Fonds insuffisants', '25 mars 2026', 1)}
      ${failedPayment('NewBrand Ltd', 299, 'Carte expirée', '22 mars 2026', 3)}
    </div>
  </div>
  `
  return c.html(adminShell('Facturation', content, '/admin/billing'))
}

function billKpi(label: string, value: string, color: string, icon: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-9 h-9 rounded-xl bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas ${icon} text-${color}-400 text-sm"></i>
    </div>
    <div>
      <div class="text-xl font-black text-white">${value}</div>
      <div class="text-xs text-slate-500">${label}</div>
    </div>
  </div>`
}

function invoiceRow(id: string, client: string, plan: string, amount: number, status: string, date: string): string {
  const st: Record<string,string> = { paid: 'badge-active', failed: 'badge-inactive', refunded: 'badge-suspended', pending: 'badge-trial' }
  const stLabel: Record<string,string> = { paid: 'Payé', failed: 'Échoué', refunded: 'Remboursé', pending: 'En attente' }
  return `<tr class="table-row border-b border-white/5">
    <td class="py-2.5 font-mono text-slate-500">${id}</td>
    <td class="py-2.5 font-semibold text-slate-200">${client}</td>
    <td class="py-2.5"><span class="text-xs text-orange-400">${plan}</span></td>
    <td class="py-2.5 text-right font-bold text-white">$${amount.toLocaleString()}</td>
    <td class="py-2.5 text-center"><span class="${st[status]} text-xs px-2 py-0.5 rounded-full">${stLabel[status]}</span></td>
    <td class="py-2.5 text-right text-slate-600">${date}</td>
    <td class="py-2.5 text-right">
      <button class="text-xs text-slate-500 hover:text-orange-400 transition-all px-2 py-1 glass rounded">
        <i class="fas fa-download"></i>
      </button>
    </td>
  </tr>`
}

function failedPayment(client: string, amount: number, reason: string, date: string, attempts: number): string {
  return `<div class="flex items-center justify-between p-4 glass rounded-xl border border-slate-500/10">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-slate-500/15 flex items-center justify-center">
        <i class="fas fa-credit-card text-slate-400 text-xs"></i>
      </div>
      <div>
        <div class="text-sm font-semibold text-slate-200">${client}</div>
        <div class="text-xs text-slate-500">${reason} — ${attempts} tentative${attempts > 1 ? 's' : ''}</div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-right">
        <div class="text-sm font-bold text-slate-400">$${amount}</div>
        <div class="text-xs text-slate-600">${date}</div>
      </div>
      <div class="flex gap-2">
        <button class="text-xs text-brand-400 border border-brand-500/30 px-3 py-1.5 rounded-lg hover:bg-brand-500/10 transition-all">Relancer</button>
        <button class="text-xs text-slate-400 border border-slate-500/30 px-3 py-1.5 rounded-lg hover:bg-slate-500/10 transition-all">Annuler</button>
      </div>
    </div>
  </div>`
}
