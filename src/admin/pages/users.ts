import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminUsers = (c: Context) => {
  const content = `
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="glass rounded-xl px-4 py-2 flex items-center gap-2">
        <i class="fas fa-search text-slate-500 text-xs"></i>
        <input placeholder="Rechercher utilisateur, email..." class="bg-transparent text-slate-300 placeholder-slate-600 outline-none text-xs w-48"/>
      </div>
      <select class="glass rounded-xl px-3 py-2 text-xs text-slate-400 outline-none border-0 cursor-pointer">
        <option>Tous les rôles</option>
        <option>Super Admin</option><option>Owner</option><option>Admin</option><option>Editor</option><option>Viewer</option>
      </select>
    </div>
    <button class="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2">
      <i class="fas fa-plus"></i> Créer utilisateur
    </button>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
    ${uStat('6,284', 'Total users', 'fa-users', 'orange')}
    ${uStat('4,820', 'Actifs', 'fa-circle-check', 'emerald')}
    ${uStat('2', 'Super Admin', 'fa-shield-halved', 'red')}
    ${uStat('2,412', 'Owners', 'fa-crown', 'amber')}
    ${uStat('1,412', 'Membres équipe', 'fa-user-group', 'blue')}
  </div>

  <!-- Users Table -->
  <div class="glass rounded-2xl overflow-hidden">
    <div class="p-4 border-b border-white/5 flex items-center justify-between">
      <h3 class="font-bold text-white text-sm">Tous les utilisateurs <span class="text-slate-500 font-normal text-xs ml-1">(6,284)</span></h3>
      <button class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
        <i class="fas fa-download text-xs"></i> Export
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="text-slate-600 bg-white/2 border-b border-white/5">
            <th class="text-left px-4 py-3 font-semibold">Utilisateur</th>
            <th class="text-left px-4 py-3 font-semibold">Rôle</th>
            <th class="text-left px-4 py-3 font-semibold">Client/Tenant</th>
            <th class="text-left px-4 py-3 font-semibold">Statut</th>
            <th class="text-right px-4 py-3 font-semibold">Dernière connexion</th>
            <th class="text-right px-4 py-3 font-semibold">Inscrit</th>
            <th class="text-right px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${userRow('Super Admin', 'superadmin@adnova.ai', 'superadmin', 'Plateforme AdNova', 'active', 'Il y a 5min', '1 jan 2025', 'SA', '#ef4444')}
          ${userRow('John Doe', 'john@acmecorp.com', 'owner', 'Acme Corp', 'active', 'Aujourd\'hui 14:32', '12 jan 2026', 'JD', '#f97316')}
          ${userRow('Sarah Kim', 'sarah@acmecorp.com', 'admin', 'Acme Corp', 'active', 'Aujourd\'hui 11:15', '12 jan 2026', 'SK', '#10b981')}
          ${userRow('Mike Chen', 'mike@acmecorp.com', 'editor', 'Acme Corp', 'active', 'Hier 18:42', '15 jan 2026', 'MC', '#3b82f6')}
          ${userRow('Emma Davis', 'emma@acmecorp.com', 'viewer', 'Acme Corp', 'active', '28 mar 2026', '20 jan 2026', 'ED', '#8b5cf6')}
          ${userRow('Alex Turner', 'alex@apexmkt.com', 'owner', 'Apex Marketing', 'active', 'Aujourd\'hui 09:18', '15 jan 2026', 'AT', '#f97316')}
          ${userRow('Spam User', 'spam@spamco.io', 'owner', 'SpamCo', 'suspended', 'Bloqué', '10 mar 2026', 'SU', '#ef4444')}
          ${userRow('Marie Dupont', 'marie@fashionbrand.fr', 'owner', 'Fashion Brand', 'trial', '29 mar 2026', '29 mar 2026', 'MD', '#f59e0b')}
        </tbody>
      </table>
    </div>
  </div>
  `
  return c.html(adminShell('Utilisateurs Globaux', content, '/admin/users'))
}

function uStat(val: string, label: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-3 flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas ${icon} text-${color}-400 text-xs"></i>
    </div>
    <div><div class="text-lg font-black text-white">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function userRow(name: string, email: string, role: string, tenant: string, status: string, lastLogin: string, created: string, abbr: string, color: string): string {
  const roleColors: Record<string,string> = { superadmin:'red', owner:'orange', admin:'emerald', editor:'blue', viewer:'slate' }
  const roleLabels: Record<string,string> = { superadmin:'Super Admin', owner:'Owner', admin:'Admin', editor:'Éditeur', viewer:'Lecteur' }
  const rc = roleColors[role] || 'slate'
  const statusClass = status === 'active' ? 'badge-active' : status === 'trial' ? 'badge-trial' : 'badge-suspended'
  const statusLabel: Record<string,string> = { active:'Actif', trial:'Essai', suspended:'Suspendu' }
  return `<tr class="table-row border-b border-white/5 transition-all">
    <td class="px-4 py-3">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style="background:${color}30;color:${color}">${abbr}</div>
        <div>
          <div class="font-semibold text-slate-200">${name}</div>
          <div class="text-slate-600">${email}</div>
        </div>
      </div>
    </td>
    <td class="px-4 py-3">
      <span class="text-xs px-2 py-0.5 rounded-full bg-${rc}-500/15 text-${rc}-400 font-bold">${roleLabels[role]}</span>
    </td>
    <td class="px-4 py-3 text-slate-400">${tenant}</td>
    <td class="px-4 py-3"><span class="${statusClass} text-xs px-2 py-0.5 rounded-full">${statusLabel[status]}</span></td>
    <td class="px-4 py-3 text-right text-slate-500">${lastLogin}</td>
    <td class="px-4 py-3 text-right text-slate-600">${created}</td>
    <td class="px-4 py-3 text-right">
      <div class="flex items-center justify-end gap-1">
        <button class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
          <i class="fas fa-pencil text-slate-400 text-xs"></i>
        </button>
        <button class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
          <i class="fas fa-key text-amber-400 text-xs"></i>
        </button>
        ${status !== 'suspended' ? `<button class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-all">
          <i class="fas fa-ban text-red-400 text-xs"></i>
        </button>` : `<button class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-emerald-500/10 transition-all">
          <i class="fas fa-rotate-left text-emerald-400 text-xs"></i>
        </button>`}
      </div>
    </td>
  </tr>`
}
