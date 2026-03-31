import type { Context } from 'hono'

export const renderAdminLogin = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Super Admin — AdNova AI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <style>
    body { background: #06030a; font-family: 'Inter', sans-serif; }
    .grid-bg { background-image: linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px); background-size: 40px 40px; }
    .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.08); }
    .admin-glow { box-shadow: 0 0 50px rgba(249,115,22,0.25); }
    .input-field { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; transition: all .2s; }
    .input-field:focus { outline: none; border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.15); background: rgba(249,115,22,0.05); }
    .btn-admin { background: linear-gradient(135deg, #f97316, #dc2626); transition: all .25s; }
    .btn-admin:hover { background: linear-gradient(135deg, #ea580c, #b91c1c); transform: translateY(-1px); box-shadow: 0 12px 32px rgba(249,115,22,0.4); }
    @keyframes pulse-orange { 0%,100%{box-shadow:0 0 30px rgba(249,115,22,0.2)} 50%{box-shadow:0 0 60px rgba(249,115,22,0.5)} }
    .pulse-orange { animation: pulse-orange 3s ease-in-out infinite; }
    @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
    .scanline { animation: scanline 3s linear infinite; }
  </style>
</head>
<body class="text-slate-200 min-h-screen grid-bg flex items-center justify-center p-4">

  <!-- Background décoration -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
  </div>

  <div class="w-full max-w-md relative">
    <!-- Warning Banner -->
    <div class="glass rounded-xl px-4 py-2.5 mb-6 flex items-center gap-2 border border-red-500/20 bg-red-500/5">
      <i class="fas fa-triangle-exclamation text-red-400 text-xs"></i>
      <span class="text-xs text-red-300 font-medium">Zone d'accès restreint — Administrateurs autorisés uniquement</span>
    </div>

    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl pulse-orange mb-4 relative overflow-hidden">
        <i class="fas fa-shield-halved text-white text-2xl relative z-10"></i>
        <div class="absolute inset-0 bg-white/10 scanline h-8 w-full opacity-30"></div>
      </div>
      <h1 class="text-3xl font-black text-white">Super Admin</h1>
      <p class="text-slate-500 text-sm mt-1">AdNova AI — Panneau d'administration</p>
    </div>

    <!-- Card Login -->
    <div class="glass rounded-2xl p-8 pulse-orange admin-glow">
      <!-- MFA Badge -->
      <div class="flex items-center gap-2 p-3 rounded-xl mb-6 bg-orange-500/8 border border-orange-500/20">
        <i class="fas fa-lock text-orange-400 text-xs"></i>
        <span class="text-xs text-orange-300">Authentification à 2 facteurs requise</span>
        <span class="ml-auto text-xs text-slate-500">TLS 1.3 ✓</span>
      </div>

      <form class="space-y-4" id="admin-form">
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Email administrateur</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs"></i>
            <input type="email" id="admin-email" value="superadmin@adnova.ai"
              class="input-field w-full rounded-xl px-4 py-3 pl-10 text-sm"/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Mot de passe</label>
          <div class="relative">
            <i class="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs"></i>
            <input type="password" id="admin-password" value="superadmin2026"
              class="input-field w-full rounded-xl px-4 py-3 pl-10 pr-10 text-sm"/>
            <button type="button" onclick="togglePwd()" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">
              <i class="fas fa-eye text-xs"></i>
            </button>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Code 2FA</label>
          <div class="flex gap-2" id="otp-inputs">
            ${[1,2,3,4,5,6].map(i => `<input type="text" maxlength="1" value="${[8,4,2,1,9,3][i-1]}"
              class="input-field w-full rounded-lg p-2 text-center text-lg font-bold text-orange-300 otp-digit"
              oninput="nextOtp(this)" onkeydown="prevOtp(event,this)"/>`).join('')}
          </div>
        </div>

        <button type="button" onclick="handleAdminLogin()"
          class="btn-admin w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 mt-2">
          <i class="fas fa-shield-halved"></i> Accéder au Super Admin
        </button>
      </form>

      <div class="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-600">
        <span><i class="fas fa-clock mr-1"></i>Session: 4h max</span>
        <span><i class="fas fa-eye mr-1"></i>Audit: toutes actions loguées</span>
      </div>
    </div>

    <!-- Demo info -->
    <div class="mt-4 glass rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-slate-500 border border-orange-500/10">
      <i class="fas fa-circle-info text-orange-400"></i>
      Mode démo — Identifiants pré-remplis. Cliquez "Accéder".
    </div>
  </div>

  <script>
    function togglePwd() {
      const p = document.getElementById('admin-password');
      p.type = p.type === 'password' ? 'text' : 'password';
    }
    function nextOtp(input) {
      input.value = input.value.replace(/[^0-9]/g, '');
      const inputs = document.querySelectorAll('.otp-digit');
      const idx = Array.from(inputs).indexOf(input);
      if (input.value && idx < inputs.length - 1) inputs[idx + 1].focus();
    }
    function prevOtp(e, input) {
      if (e.key === 'Backspace' && !input.value) {
        const inputs = document.querySelectorAll('.otp-digit');
        const idx = Array.from(inputs).indexOf(input);
        if (idx > 0) inputs[idx - 1].focus();
      }
    }
    function handleAdminLogin() {
      const btn = event.target.closest('button');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification en cours...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Authentifié — Redirection...';
        setTimeout(() => { window.location.href = '/admin'; }, 600);
      }, 1500);
    }
  </script>
</body>
</html>`)
}
