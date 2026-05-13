import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminSecurity = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-xl font-black text-white">Sécurité & Accès</h2>
      <p class="text-xs text-slate-500 mt-0.5">Surveillance en temps réel — Dernière analyse: aujourd'hui 06:00</p>
    </div>
    <div class="flex items-center gap-2">
      <span class="flex items-center gap-1.5 text-xs text-brand-400 bg-brand-500/10 px-3 py-1.5 rounded-lg border border-brand-500/20">
        <i class="fas fa-shield-check"></i> Système sécurisé
      </span>
    </div>
  </div>

  <!-- Security Stats -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    ${secStat('Tentatives échouées (24h)', '47', 'brand', 'fa-user-xmark')}
    ${secStat('IPs bloquées', '128', 'slate', 'fa-ban')}
    ${secStat('Sessions actives', '1,284', 'brand', 'fa-users')}
    ${secStat('Adoption 2FA', '68.4%', 'slate', 'fa-lock')}
  </div>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    ${secStat('Blocages WAF (24h)', '1,847', 'orange', 'fa-shield-halved')}
    ${secStat('Vulnérabilités', '0', 'brand', 'fa-bug')}
    ${secStat('SSL expire', '257 jours', 'slate', 'fa-certificate')}
    ${secStat('Activités suspectes', '3', 'slate', 'fa-triangle-exclamation')}
  </div>

  <!-- Main Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Blocked IPs -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">IPs Bloquées</h3>
        <button onclick="showBlockIP()" class="text-xs text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg hover:bg-orange-500/15 transition-all border border-orange-500/20">
          <i class="fas fa-plus mr-1"></i> Bloquer IP
        </button>
      </div>
      <div class="space-y-2">
        ${ipBlock('185.234.12.44', 'Brute force — 3 tentatives', 'Auto-bloquée', 'rouge', '2026-03-31 09:32')}
        ${ipBlock('91.121.44.199', 'Scan de ports suspect', 'Manuelle', 'rouge', '2026-03-29 14:12')}
        ${ipBlock('103.82.54.12', 'Abus API rate limit', 'Auto-bloquée', 'orange', '2026-03-28 08:44')}
        ${ipBlock('192.168.40.22', 'Test de pénétration', 'Manuelle', 'orange', '2026-03-27 16:30')}
        ${ipBlock('45.33.12.148', 'Credentials stuffing', 'Auto-bloquée', 'rouge', '2026-03-25 11:18')}
      </div>
    </div>

    <!-- Active Sessions -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">Sessions Actives (Top)</h3>
        <button class="text-xs text-slate-400 bg-slate-500/10 px-3 py-1.5 rounded-lg hover:bg-slate-500/15 transition-all border border-slate-500/20">
          <i class="fas fa-power-off mr-1"></i> Tout déconnecter
        </button>
      </div>
      <div class="space-y-2">
        ${sessionRow('Alexandre Martin', 'Apex Marketing', '185.92.12.44', 'Paris, FR', '2h 14min')}
        ${sessionRow('Sophie Dubois', 'Digital Storm', '72.229.12.8', 'Toronto, CA', '48min')}
        ${sessionRow('Mehdi Benali', 'LuxoGroup', '88.163.44.12', 'Lyon, FR', '1h 32min')}
        ${sessionRow('James Wilson', 'Mega Retail', '54.210.12.99', 'New York, US', '3h 01min')}
        ${sessionRow('SuperAdmin', 'AdNova AI', '127.0.0.1', 'Serveur', '12min')}
      </div>
    </div>
  </div>

  <!-- Activity Log -->
  <div class="glass rounded-2xl p-5 mb-6">
    <h3 class="font-bold text-white mb-4">Événements Sécurité Récents</h3>
    <div class="space-y-2">
      ${secEvent('fa-user-xmark', 'slate', 'Tentative de connexion échouée (3/3) — IP bloquée automatiquement', '185.234.12.44', '09:32:11')}
      ${secEvent('fa-shield-halved', 'orange', 'WAF a bloqué 847 requêtes malformées en 1 heure', 'API Gateway', '09:15:00')}
      ${secEvent('fa-lock', 'slate', 'Super Admin — connexion réussie + 2FA validé', 'superadmin@adnova.ai', '08:42:00')}
      ${secEvent('fa-ban', 'slate', 'Compte SpamCo suspendu pour activité frauduleuse', 'Admin action', '07:18:44')}
      ${secEvent('fa-certificate', 'brand', 'Certificat SSL renouvelé avec succès — validité +365j', 'system', '06:00:00')}
      ${secEvent('fa-database', 'slate', 'Backup chiffré AES-256 complété — 284GB', 'system', '05:48:21')}
    </div>
  </div>

  <!-- Security Config -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">Paramètres Sécurité</h3>
      <button class="text-xs text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-lg hover:bg-orange-500/10 transition-all">
        <i class="fas fa-save mr-1"></i> Sauvegarder
      </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Authentification</h4>
        ${secToggle('Forcer 2FA pour admins', true)}
        ${secToggle('2FA obligatoire (tous users)', false)}
        ${secToggle('Vérif email nouvelle IP', true)}
        ${secToggle('Session expiry 4h', true)}
      </div>
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Rate Limiting</h4>
        ${secToggle('WAF activé', true)}
        ${secToggle('Auto-block brute force', true)}
        ${secToggle('DDoS protection', true)}
        ${secToggle('API rate limiting', true)}
      </div>
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Audit & Compliance</h4>
        ${secToggle('Audit log complet', true)}
        ${secToggle('RGPD: anonymisation auto', true)}
        ${secToggle('Alertes email sécurité', true)}
        ${secToggle('PCI-DSS mode', false)}
      </div>
    </div>
  </div>

  <!-- Block IP Modal -->
  <div id="block-ip-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-md border border-orange-500/20">
      <h3 class="font-bold text-white mb-4"><i class="fas fa-ban text-slate-400 mr-2"></i>Bloquer une IP</h3>
      <input placeholder="Adresse IP (ex: 192.168.1.1)" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 mb-3 outline-none border border-white/10 focus:border-orange-500/50" id="block-ip-input"/>
      <input placeholder="Raison" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 mb-4 outline-none border border-white/10 focus:border-orange-500/50"/>
      <div class="flex gap-3">
        <button onclick="hideBlockIP()" class="flex-1 glass py-2.5 rounded-xl text-sm text-slate-400 hover:bg-white/5 transition-all">Annuler</button>
        <button onclick="blockIP()" class="flex-1 bg-gradient-to-r from-slate-600 to-orange-500 py-2.5 rounded-xl text-sm text-white font-bold hover:opacity-90 transition-all">
          <i class="fas fa-ban mr-1"></i> Bloquer
        </button>
      </div>
    </div>
  </div>

  <script>
  function showBlockIP() { document.getElementById('block-ip-modal').classList.remove('hidden'); }
  function hideBlockIP() { document.getElementById('block-ip-modal').classList.add('hidden'); }
  function blockIP() {
    const ip = document.getElementById('block-ip-input').value;
    if(ip) { hideBlockIP(); alert('IP ' + ip + ' bloquée avec succès.'); }
  }
  </script>
  `
  return c.html(adminShell('Sécurité', content, '/admin/security'))
}

function secStat(label: string, value: string, color: string, icon: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-9 h-9 rounded-xl bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas ${icon} text-${color}-400 text-sm"></i>
    </div>
    <div>
      <div class="text-lg font-black text-white">${value}</div>
      <div class="text-xs text-slate-500">${label}</div>
    </div>
  </div>`
}

function ipBlock(ip: string, reason: string, type: string, severity: string, date: string): string {
  const c = severity === 'rouge' ? 'slate' : 'brand'
  return `<div class="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/3 transition-all">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-${c}-500/15 flex items-center justify-center">
        <i class="fas fa-ban text-${c}-400 text-xs"></i>
      </div>
      <div>
        <div class="text-xs font-mono font-bold text-slate-200">${ip}</div>
        <div class="text-xs text-slate-600">${reason}</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-xs text-slate-700">${date}</span>
      <button class="text-xs text-brand-400 hover:text-brand-300 transition-all" title="Débloquer">
        <i class="fas fa-unlock"></i>
      </button>
    </div>
  </div>`
}

function sessionRow(user: string, tenant: string, ip: string, location: string, duration: string): string {
  return `<div class="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/3 transition-all">
    <div class="flex items-center gap-3">
      <div class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500/30 to-slate-500/30 flex items-center justify-center text-xs font-bold text-orange-300">
        ${user.charAt(0)}
      </div>
      <div>
        <div class="text-xs font-semibold text-slate-200">${user}</div>
        <div class="text-xs text-slate-600">${tenant} — ${location}</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-xs font-mono text-slate-600">${ip}</span>
      <span class="text-xs text-brand-400">${duration}</span>
      <button class="text-xs text-slate-400 hover:text-slate-300 transition-all" title="Déconnecter">
        <i class="fas fa-power-off"></i>
      </button>
    </div>
  </div>`
}

function secEvent(icon: string, color: string, message: string, source: string, time: string): string {
  return `<div class="flex items-start gap-3 p-3 glass rounded-xl hover:bg-white/3 transition-all">
    <div class="w-7 h-7 rounded-lg bg-${color}-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
      <i class="fas ${icon} text-${color}-400 text-xs"></i>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-xs text-slate-300">${message}</p>
      <p class="text-xs text-slate-600 mt-0.5 font-mono">${source}</p>
    </div>
    <span class="text-xs text-slate-700 flex-shrink-0">${time}</span>
  </div>`
}

function secToggle(label: string, enabled: boolean): string {
  return `<div class="flex items-center justify-between">
    <span class="text-xs text-slate-400">${label}</span>
    <button class="relative w-10 h-5 rounded-full transition-all ${enabled ? 'bg-orange-500' : 'bg-slate-700'}" onclick="this.classList.toggle('bg-orange-500');this.classList.toggle('bg-slate-700');">
      <div class="absolute top-0.5 ${enabled ? 'right-0.5' : 'left-0.5'} w-4 h-4 bg-white rounded-full shadow transition-all"></div>
    </button>
  </div>`
}
