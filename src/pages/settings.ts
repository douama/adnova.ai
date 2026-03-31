import type { Context } from 'hono'
import { shell } from '../lib/layout'

export const renderSettings = (c: Context) => {
  const content = `
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Settings Nav -->
    <div class="glass rounded-2xl p-3">
      <nav class="space-y-1">
        ${settingsNav('fa-building', 'Workspace', true)}
        ${settingsNav('fa-user', 'Profile', false)}
        ${settingsNav('fa-users', 'Team Members', false)}
        ${settingsNav('fa-bell', 'Notifications', false)}
        ${settingsNav('fa-shield-halved', 'Security', false)}
        ${settingsNav('fa-key', 'API Keys', false)}
        ${settingsNav('fa-webhook', 'Webhooks', false)}
        ${settingsNav('fa-palette', 'White Label', false)}
      </nav>
    </div>

    <!-- Settings Content -->
    <div class="lg:col-span-3 space-y-5">
      <!-- Workspace -->
      <div class="glass rounded-2xl p-5">
        <h3 class="font-bold text-white mb-4">Workspace Settings</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Workspace Name</label>
              <input value="Acme Corp" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Industry</label>
              <select class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10">
                <option selected>Fashion / Apparel</option>
                <option>E-commerce</option><option>Tech / SaaS</option><option>Health & Fitness</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Default Currency</label>
            <select class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10">
              <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option>
            </select>
          </div>
          <button class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">Save Changes</button>
        </div>
      </div>

      <!-- Team Members -->
      <div class="glass rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-white">Team Members</h3>
          <button class="text-xs bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg transition-all">Invite Member</button>
        </div>
        <div class="space-y-3">
          ${teamMember('John Doe', 'john@acmecorp.com', 'Owner', 'JD', 'from-brand-500 to-purple-600')}
          ${teamMember('Sarah Kim', 'sarah@acmecorp.com', 'Admin', 'SK', 'from-emerald-500 to-teal-600')}
          ${teamMember('Mike Chen', 'mike@acmecorp.com', 'Editor', 'MC', 'from-blue-500 to-cyan-600')}
          ${teamMember('Emma Davis', 'emma@acmecorp.com', 'Viewer', 'ED', 'from-pink-500 to-rose-600')}
        </div>
      </div>

      <!-- AI Preferences -->
      <div class="glass rounded-2xl p-5">
        <h3 class="font-bold text-white mb-4">AI Preferences</h3>
        <div class="space-y-3">
          ${prefToggle('Allow AI to autonomously scale budgets', true)}
          ${prefToggle('Allow AI to pause underperforming ads', true)}
          ${prefToggle('Allow AI to generate creatives without approval', false)}
          ${prefToggle('Send daily AI report emails', true)}
          ${prefToggle('Enable predictive budget forecasting', true)}
        </div>
      </div>

      <!-- API Keys -->
      <div class="glass rounded-2xl p-5">
        <h3 class="font-bold text-white mb-4">API Keys</h3>
        <div class="space-y-3">
          ${apiKeyRow('Production API Key', 'ank_prod_****************************3f9a', 'Active')}
          ${apiKeyRow('Development API Key', 'ank_dev_****************************8c2b', 'Active')}
        </div>
        <button class="mt-3 glass hover:bg-white/10 text-slate-400 text-xs px-4 py-2 rounded-lg transition-all">
          + Generate New Key
        </button>
      </div>
    </div>
  </div>
  `
  return c.html(shell('Settings', content, '/settings'))
}

function settingsNav(icon: string, label: string, active: boolean): string {
  return `<button class="w-full text-left sidebar-link ${active ? 'active' : ''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400">
    <i class="fas ${icon} w-4 text-center ${active ? 'text-brand-400' : ''}"></i>${label}
  </button>`
}

function teamMember(name: string, email: string, role: string, abbr: string, gradient: string): string {
  const roleColors: Record<string, string> = { Owner: 'brand', Admin: 'emerald', Editor: 'blue', Viewer: 'slate' }
  const c = roleColors[role] || 'slate'
  return `<div class="flex items-center gap-3 p-3 glass rounded-xl">
    <div class="w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0">${abbr}</div>
    <div class="flex-1 min-w-0">
      <div class="text-sm font-semibold text-white">${name}</div>
      <div class="text-xs text-slate-500">${email}</div>
    </div>
    <span class="text-xs px-2 py-1 rounded-full bg-${c}-500/20 text-${c}-400 font-semibold">${role}</span>
    ${role !== 'Owner' ? '<button class="text-slate-600 hover:text-slate-400 transition-colors ml-2"><i class="fas fa-ellipsis-vertical text-xs"></i></button>' : ''}
  </div>`
}

function prefToggle(label: string, checked: boolean): string {
  return `<div class="flex items-center justify-between py-2 border-b border-white/5">
    <span class="text-sm text-slate-300">${label}</span>
    <button onclick="this.classList.toggle('bg-brand-600'); this.classList.toggle('bg-white/10'); this.querySelector('div').classList.toggle('translate-x-4')"
      class="w-10 h-6 rounded-full relative transition-all flex-shrink-0 ${checked ? 'bg-brand-600' : 'bg-white/10'}">
      <div class="w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all ${checked ? 'translate-x-4' : ''}"></div>
    </button>
  </div>`
}

function apiKeyRow(label: string, key: string, status: string): string {
  return `<div class="glass rounded-xl p-3 flex items-center gap-3">
    <i class="fas fa-key text-brand-400 text-sm"></i>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-slate-300">${label}</div>
      <div class="text-xs text-slate-600 font-mono">${key}</div>
    </div>
    <span class="badge-live text-xs px-2 py-0.5 rounded-full">${status}</span>
    <button class="text-slate-500 hover:text-slate-300 transition-colors"><i class="fas fa-copy text-xs"></i></button>
  </div>`
}
