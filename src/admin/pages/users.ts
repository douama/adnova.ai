import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminUsers = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
    <div class="flex flex-wrap items-center gap-3">
      <div class="glass rounded-xl px-4 py-2 flex items-center gap-2">
        <i class="fas fa-search text-slate-500 text-xs"></i>
        <input placeholder="Rechercher utilisateur, email..." id="user-search" oninput="filterUsers()"
          class="bg-transparent text-slate-300 placeholder-slate-600 outline-none text-xs w-48"/>
      </div>
      <select id="user-role-filter" onchange="filterUsers()"
        class="glass rounded-xl px-3 py-2 text-xs text-slate-400 outline-none border-0 cursor-pointer bg-transparent">
        <option value="">Tous les rôles</option>
        <option value="superadmin">Super Admin</option>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="editor">Éditeur</option>
        <option value="viewer">Lecteur</option>
      </select>
      <select id="user-status-filter" onchange="filterUsers()"
        class="glass rounded-xl px-3 py-2 text-xs text-slate-400 outline-none border-0 cursor-pointer bg-transparent">
        <option value="">Tous statuts</option>
        <option value="active">Actifs</option>
        <option value="trial">Essai</option>
        <option value="suspended">Suspendus</option>
      </select>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="exportUsersCSV()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-2 rounded-xl flex items-center gap-1 transition-all">
        <i class="fas fa-download text-xs"></i> Export CSV
      </button>
      <button onclick="openUserModal()" class="bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg">
        <i class="fas fa-plus"></i> Créer utilisateur
      </button>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
    ${uStat('6,284', 'Total users', 'fa-users', 'orange', 'us-total')}
    ${uStat('4,820', 'Actifs', 'fa-circle-check', 'emerald', 'us-active')}
    ${uStat('2', 'Super Admin', 'fa-shield-halved', 'red', 'us-super')}
    ${uStat('2,412', 'Owners', 'fa-crown', 'amber', 'us-owners')}
    ${uStat('1,412', 'Membres équipe', 'fa-user-group', 'blue', 'us-members')}
  </div>

  <!-- Users Table -->
  <div class="glass rounded-2xl overflow-hidden">
    <div class="p-4 border-b border-white/5 flex items-center justify-between">
      <h3 class="font-bold text-white text-sm">
        Tous les utilisateurs
        <span class="text-slate-500 font-normal text-xs ml-1" id="users-count">(6,284)</span>
      </h3>
      <div class="flex items-center gap-2 text-xs text-slate-500">
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs" id="users-table">
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
        <tbody id="users-tbody">
          ${userRow('u1', 'Super Admin', 'superadmin@adnova.ai', 'superadmin', 'Plateforme AdNova', 'active', 'Il y a 5min', '1 jan 2025', 'SA', '#ef4444')}
          ${userRow('u2', 'John Doe', 'john@acmecorp.com', 'owner', 'Acme Corp', 'active', "Aujourd'hui 14:32", '12 jan 2026', 'JD', '#f97316')}
          ${userRow('u3', 'Sarah Kim', 'sarah@acmecorp.com', 'admin', 'Acme Corp', 'active', "Aujourd'hui 11:15", '12 jan 2026', 'SK', '#10b981')}
          ${userRow('u4', 'Mike Chen', 'mike@acmecorp.com', 'editor', 'Acme Corp', 'active', 'Hier 18:42', '15 jan 2026', 'MC', '#3b82f6')}
          ${userRow('u5', 'Emma Davis', 'emma@acmecorp.com', 'viewer', 'Acme Corp', 'active', '28 mar 2026', '20 jan 2026', 'ED', '#8b5cf6')}
          ${userRow('u6', 'Alex Turner', 'alex@apexmkt.com', 'owner', 'Apex Marketing', 'active', "Aujourd'hui 09:18", '15 jan 2026', 'AT', '#f97316')}
          ${userRow('u7', 'Spam User', 'spam@spamco.io', 'owner', 'SpamCo', 'suspended', 'Bloqué', '10 mar 2026', 'SU', '#ef4444')}
          ${userRow('u8', 'Marie Dupont', 'marie@fashionbrand.fr', 'owner', 'Fashion Brand', 'trial', '29 mar 2026', '29 mar 2026', 'MD', '#f59e0b')}
        </tbody>
      </table>
    </div>
    <div class="p-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-600">
      <span id="table-footer-count">Affichage 8 sur 6,284 utilisateurs</span>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 glass rounded-lg hover:bg-white/5 text-slate-400 transition-all">← Préc.</button>
        <span class="px-2 text-slate-500">Page 1</span>
        <button class="px-3 py-1 glass rounded-lg hover:bg-white/5 text-slate-400 transition-all">Suiv. →</button>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════ CREATE/EDIT USER MODAL ═══════════════════════ -->
  <div id="user-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fadeIn" style="border:1px solid rgba(249,115,22,0.3)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass rounded-t-2xl z-10">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <i class="fas fa-user-plus text-white text-sm" id="user-modal-icon"></i>
          </div>
          <div>
            <h2 class="font-bold text-white" id="user-modal-title">Créer un utilisateur</h2>
            <p class="text-xs text-slate-500">Remplir les informations ci-dessous</p>
          </div>
        </div>
        <button onclick="closeUserModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <input type="hidden" id="edit-user-id" value=""/>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Prénom</label>
            <input type="text" id="user-firstname" placeholder="John" class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all"/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Nom</label>
            <input type="text" id="user-lastname" placeholder="Doe" class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all"/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Email</label>
          <input type="email" id="user-email" placeholder="john@company.com" class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all"/>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Rôle</label>
            <select id="user-role" class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent">
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="editor">Éditeur</option>
              <option value="viewer">Lecteur</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Tenant / Client</label>
            <input type="text" id="user-tenant" placeholder="Acme Corp" class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all"/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block" id="password-label">Mot de passe temporaire</label>
          <div class="relative">
            <input type="password" id="user-password" placeholder="••••••••" class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all pr-10"/>
            <button onclick="togglePassword()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-all">
              <i class="fas fa-eye text-xs" id="pw-eye"></i>
            </button>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Statut</label>
          <div class="flex gap-2">
            ${statusRadio('active', 'Actif', 'emerald', true)}
            ${statusRadio('trial', 'Essai', 'amber', false)}
            ${statusRadio('suspended', 'Suspendu', 'red', false)}
          </div>
        </div>
        <div class="flex items-center gap-2 glass rounded-xl p-3">
          <input type="checkbox" id="user-send-invite" checked class="accent-orange-500 w-3.5 h-3.5"/>
          <label for="user-send-invite" class="text-xs text-slate-400">Envoyer un email d'invitation</label>
        </div>
        <div class="flex justify-end gap-3 pt-1">
          <button onclick="closeUserModal()" class="glass hover:bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl text-sm transition-all">Annuler</button>
          <button onclick="saveUser()" class="bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2">
            <i class="fas fa-save"></i> <span id="user-save-label">Créer</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Ban Confirm Modal -->
  <div id="ban-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-sm p-6 animate-fadeIn" style="border:1px solid rgba(239,68,68,0.3)">
      <div class="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-ban text-red-400 text-xl"></i>
      </div>
      <h3 class="font-bold text-white text-center mb-2" id="ban-modal-title">Suspendre l'utilisateur ?</h3>
      <p class="text-xs text-slate-400 text-center mb-5" id="ban-modal-desc">Cet utilisateur ne pourra plus se connecter.</p>
      <div class="flex gap-3">
        <button onclick="closeBanModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm transition-all">Annuler</button>
        <button onclick="confirmBan()" id="ban-confirm-btn" class="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all">Suspendre</button>
      </div>
    </div>
  </div>

  <!-- Reset Password Modal -->
  <div id="reset-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-sm p-6 animate-fadeIn" style="border:1px solid rgba(245,158,11,0.3)">
      <div class="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-key text-amber-400 text-xl"></i>
      </div>
      <h3 class="font-bold text-white text-center mb-2">Réinitialiser le mot de passe ?</h3>
      <p class="text-xs text-slate-400 text-center mb-5" id="reset-modal-name">Un email de réinitialisation sera envoyé.</p>
      <div class="flex gap-3">
        <button onclick="closeResetModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm transition-all">Annuler</button>
        <button onclick="confirmReset()" class="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all">Envoyer email</button>
      </div>
    </div>
  </div>

  <!-- Admin Toast -->
  <div id="admin-users-toast" class="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none"></div>

  <script>
  // ── Users data (simulate) ─────────────────────────────────────────────────
  const USERS_DATA = [
    { id:'u1', name:'Super Admin', email:'superadmin@adnova.ai', role:'superadmin', tenant:'Plateforme AdNova', status:'active' },
    { id:'u2', name:'John Doe', email:'john@acmecorp.com', role:'owner', tenant:'Acme Corp', status:'active' },
    { id:'u3', name:'Sarah Kim', email:'sarah@acmecorp.com', role:'admin', tenant:'Acme Corp', status:'active' },
    { id:'u4', name:'Mike Chen', email:'mike@acmecorp.com', role:'editor', tenant:'Acme Corp', status:'active' },
    { id:'u5', name:'Emma Davis', email:'emma@acmecorp.com', role:'viewer', tenant:'Acme Corp', status:'active' },
    { id:'u6', name:'Alex Turner', email:'alex@apexmkt.com', role:'owner', tenant:'Apex Marketing', status:'active' },
    { id:'u7', name:'Spam User', email:'spam@spamco.io', role:'owner', tenant:'SpamCo', status:'suspended' },
    { id:'u8', name:'Marie Dupont', email:'marie@fashionbrand.fr', role:'owner', tenant:'Fashion Brand', status:'trial' },
  ];

  // ── Filter ────────────────────────────────────────────────────────────────
  function filterUsers() {
    const search = document.getElementById('user-search').value.toLowerCase();
    const role = document.getElementById('user-role-filter').value;
    const status = document.getElementById('user-status-filter').value;
    let visible = 0;
    document.querySelectorAll('#users-tbody tr[data-user-id]').forEach(row => {
      const name = (row.dataset.userName||'').toLowerCase();
      const email = (row.dataset.userEmail||'').toLowerCase();
      const r = row.dataset.userRole || '';
      const s = row.dataset.userStatus || '';
      const matchSearch = !search || name.includes(search) || email.includes(search);
      const matchRole = !role || r === role;
      const matchStatus = !status || s === status;
      const show = matchSearch && matchRole && matchStatus;
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const count = document.getElementById('users-count');
    if (count) count.textContent = '(' + visible + ' affichés)';
    const footer = document.getElementById('table-footer-count');
    if (footer) footer.textContent = 'Affichage ' + visible + ' utilisateurs (filtrés)';
  }

  // ── Modal Open/Close ──────────────────────────────────────────────────────
  let editingUserId = null;
  function openUserModal(userId) {
    editingUserId = userId || null;
    document.getElementById('edit-user-id').value = userId || '';
    document.getElementById('user-modal-title').textContent = userId ? 'Modifier l\\'utilisateur' : 'Créer un utilisateur';
    document.getElementById('user-modal-icon').className = userId ? 'fas fa-pencil text-white text-sm' : 'fas fa-user-plus text-white text-sm';
    document.getElementById('user-save-label').textContent = userId ? 'Mettre à jour' : 'Créer';
    document.getElementById('password-label').textContent = userId ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe temporaire';
    if (userId) {
      const user = USERS_DATA.find(u => u.id === userId);
      if (user) {
        const parts = user.name.split(' ');
        document.getElementById('user-firstname').value = parts[0] || '';
        document.getElementById('user-lastname').value = parts.slice(1).join(' ') || '';
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-role').value = user.role;
        document.getElementById('user-tenant').value = user.tenant;
        const sr = document.querySelector('input[name="user-status"][value="'+user.status+'"]');
        if (sr) sr.checked = true;
      }
    } else {
      ['user-firstname','user-lastname','user-email','user-tenant','user-password'].forEach(id => {
        document.getElementById(id).value = '';
      });
    }
    document.getElementById('user-modal').classList.remove('hidden');
  }
  function closeUserModal() { document.getElementById('user-modal').classList.add('hidden'); }

  // ── Save user ─────────────────────────────────────────────────────────────
  function saveUser() {
    const first = document.getElementById('user-firstname').value.trim();
    const last = document.getElementById('user-lastname').value.trim();
    const email = document.getElementById('user-email').value.trim();
    if (!first || !email) {
      showAdminToast('Prénom et email sont requis', 'red');
      return;
    }
    const name = (first + ' ' + last).trim();
    if (editingUserId) {
      const row = document.querySelector('tr[data-user-id="'+editingUserId+'"]');
      if (row) {
        row.querySelector('.user-name-display').textContent = name;
        row.querySelector('.user-email-display').textContent = email;
        row.dataset.userName = name;
        row.dataset.userEmail = email;
      }
      showAdminToast('Utilisateur "' + name + '" mis à jour', 'emerald');
    } else {
      showAdminToast('Utilisateur "' + name + '" créé avec succès', 'emerald');
      // Could add new row dynamically here
    }
    closeUserModal();
  }

  // ── Ban/Unban ─────────────────────────────────────────────────────────────
  let banUserId = null;
  let banAction = 'ban';
  function requestBan(userId, name, isSuspended) {
    banUserId = userId;
    banAction = isSuspended ? 'unban' : 'ban';
    document.getElementById('ban-modal-title').textContent = isSuspended ? 'Réactiver l\\'utilisateur ?' : 'Suspendre l\\'utilisateur ?';
    document.getElementById('ban-modal-desc').textContent = isSuspended
      ? name + ' pourra à nouveau se connecter.'
      : name + ' ne pourra plus se connecter.';
    document.getElementById('ban-confirm-btn').textContent = isSuspended ? 'Réactiver' : 'Suspendre';
    document.getElementById('ban-confirm-btn').className = isSuspended
      ? 'flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all'
      : 'flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all';
    document.getElementById('ban-modal').classList.remove('hidden');
  }
  function closeBanModal() { document.getElementById('ban-modal').classList.add('hidden'); banUserId = null; }
  function confirmBan() {
    if (banUserId) {
      const row = document.querySelector('tr[data-user-id="'+banUserId+'"]');
      if (row) {
        const isNowActive = banAction === 'unban';
        row.dataset.userStatus = isNowActive ? 'active' : 'suspended';
        const statusBadge = row.querySelector('.status-badge');
        if (statusBadge) {
          statusBadge.textContent = isNowActive ? 'Actif' : 'Suspendu';
          statusBadge.className = 'status-badge text-xs px-2 py-0.5 rounded-full ' + (isNowActive ? 'badge-active' : 'badge-suspended');
        }
        const banBtn = row.querySelector('.ban-btn');
        if (banBtn) {
          banBtn.title = isNowActive ? 'Suspendre' : 'Réactiver';
          banBtn.querySelector('i').className = isNowActive ? 'fas fa-ban text-red-400 text-xs' : 'fas fa-rotate-left text-emerald-400 text-xs';
          banBtn.dataset.suspended = isNowActive ? 'false' : 'true';
        }
      }
      showAdminToast(banAction === 'unban' ? 'Utilisateur réactivé avec succès' : 'Utilisateur suspendu', banAction === 'unban' ? 'emerald' : 'amber');
    }
    closeBanModal();
  }

  // ── Reset password ────────────────────────────────────────────────────────
  let resetUserId = null;
  function requestResetPassword(userId, name) {
    resetUserId = userId;
    document.getElementById('reset-modal-name').textContent = 'Email de réinitialisation envoyé à ' + name;
    document.getElementById('reset-modal').classList.remove('hidden');
  }
  function closeResetModal() { document.getElementById('reset-modal').classList.add('hidden'); resetUserId = null; }
  function confirmReset() {
    closeResetModal();
    showAdminToast('Email de réinitialisation envoyé', 'amber');
  }

  // ── Password toggle ───────────────────────────────────────────────────────
  function togglePassword() {
    const pw = document.getElementById('user-password');
    const eye = document.getElementById('pw-eye');
    if (pw.type === 'password') {
      pw.type = 'text';
      eye.className = 'fas fa-eye-slash text-xs';
    } else {
      pw.type = 'password';
      eye.className = 'fas fa-eye text-xs';
    }
  }

  // ── Export CSV ────────────────────────────────────────────────────────────
  function exportUsersCSV() {
    const header = 'Name,Email,Role,Tenant,Status';
    const rows = USERS_DATA.map(u => [u.name,u.email,u.role,u.tenant,u.status].join(','));
    const csv = [header, ...rows].join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adnova-users-' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    showAdminToast('Export CSV téléchargé (' + USERS_DATA.length + ' utilisateurs)', 'brand');
  }

  // ── Toast ─────────────────────────────────────────────────────────────────
  function showAdminToast(msg, color='brand') {
    const colors = { brand:'bg-orange-500/90', emerald:'bg-emerald-500/90', amber:'bg-amber-500/90', red:'bg-red-500/90' };
    const t = document.createElement('div');
    t.className = (colors[color]||colors.brand) + ' text-white text-xs px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm pointer-events-auto flex items-center gap-2 animate-fadeIn';
    t.innerHTML = '<i class="fas fa-' + (color==='red'?'exclamation-circle':'check-circle') + '"></i> ' + msg;
    document.getElementById('admin-users-toast').appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }

  // Close on backdrop
  ['user-modal','ban-modal','reset-modal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
      if (e.target === this) this.classList.add('hidden');
    });
  });
  </script>
  `
  return c.html(adminShell('Utilisateurs Globaux', content, '/admin/users'))
}

function uStat(val: string, label: string, icon: string, color: string, id: string): string {
  return `<div class="glass rounded-xl p-3 flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas ${icon} text-${color}-400 text-xs"></i>
    </div>
    <div><div class="text-lg font-black text-white" id="${id}">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function statusRadio(value: string, label: string, color: string, checked: boolean): string {
  return `<label class="flex items-center gap-2 cursor-pointer glass rounded-lg px-3 py-2 border ${checked ? 'border-'+color+'-500/40' : 'border-white/10'} hover:border-${color}-500/40 transition-all">
    <input type="radio" name="user-status" value="${value}" ${checked ? 'checked' : ''} class="accent-${color}-500"/>
    <span class="text-xs text-slate-300">${label}</span>
  </label>`
}

function userRow(id: string, name: string, email: string, role: string, tenant: string, status: string, lastLogin: string, created: string, abbr: string, color: string): string {
  const roleColors: Record<string,string> = { superadmin:'red', owner:'orange', admin:'emerald', editor:'blue', viewer:'slate' }
  const roleLabels: Record<string,string> = { superadmin:'Super Admin', owner:'Owner', admin:'Admin', editor:'Éditeur', viewer:'Lecteur' }
  const rc = roleColors[role] || 'slate'
  const statusClass = status === 'active' ? 'badge-active' : status === 'trial' ? 'badge-trial' : 'badge-suspended'
  const statusLabel: Record<string,string> = { active:'Actif', trial:'Essai', suspended:'Suspendu' }
  const isSuspended = status === 'suspended'
  return `<tr class="table-row border-b border-white/5 transition-all" data-user-id="${id}" data-user-name="${name}" data-user-email="${email}" data-user-role="${role}" data-user-status="${status}">
    <td class="px-4 py-3">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style="background:${color}30;color:${color}">${abbr}</div>
        <div>
          <div class="font-semibold text-slate-200 user-name-display">${name}</div>
          <div class="text-slate-600 user-email-display">${email}</div>
        </div>
      </div>
    </td>
    <td class="px-4 py-3">
      <span class="text-xs px-2 py-0.5 rounded-full bg-${rc}-500/15 text-${rc}-400 font-bold">${roleLabels[role]}</span>
    </td>
    <td class="px-4 py-3 text-slate-400">${tenant}</td>
    <td class="px-4 py-3">
      <span class="status-badge ${statusClass} text-xs px-2 py-0.5 rounded-full">${statusLabel[status]}</span>
    </td>
    <td class="px-4 py-3 text-right text-slate-500">${lastLogin}</td>
    <td class="px-4 py-3 text-right text-slate-600">${created}</td>
    <td class="px-4 py-3 text-right">
      <div class="flex items-center justify-end gap-1">
        <button onclick="openUserModal('${id}')" class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all" title="Modifier">
          <i class="fas fa-pencil text-slate-400 text-xs"></i>
        </button>
        <button onclick="requestResetPassword('${id}','${name}')" class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all" title="Réinitialiser mot de passe">
          <i class="fas fa-key text-amber-400 text-xs"></i>
        </button>
        <button onclick="requestBan('${id}','${name}',${isSuspended})" class="ban-btn w-7 h-7 glass rounded-lg flex items-center justify-center transition-all ${isSuspended ? 'hover:bg-emerald-500/10' : 'hover:bg-red-500/10'}" data-suspended="${isSuspended}" title="${isSuspended ? 'Réactiver' : 'Suspendre'}">
          <i class="fas ${isSuspended ? 'fa-rotate-left text-emerald-400' : 'fa-ban text-red-400'} text-xs"></i>
        </button>
      </div>
    </td>
  </tr>`
}
