import type { Context } from 'hono'

export const renderLogin = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sign In — AdNova AI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    body { background: #040812; font-family: 'Inter', sans-serif; }
    .glass { background:rgba(255,255,255,0.03); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.08); }
    .input-field { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#e2e8f0; transition:all 0.2s; width:100%; }
    .input-field:focus { outline:none; border-color:#6366f1; background:rgba(99,102,241,0.05); box-shadow:0 0 0 3px rgba(99,102,241,0.15); }
    .input-field::placeholder { color: #475569; }
    .btn-primary { background: linear-gradient(135deg,#6366f1,#8b5cf6); transition:all 0.2s; }
    .btn-primary:hover { opacity:0.9; transform:translateY(-1px); box-shadow:0 10px 30px rgba(99,102,241,0.4); }
    .btn-primary:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 0 30px rgba(99,102,241,0.2)} 50%{box-shadow:0 0 60px rgba(99,102,241,0.4)} }
    .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    .grid-bg { background-image: linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px); background-size: 50px 50px; }
    .error-msg { color:#f87171; font-size:12px; margin-top:4px; display:none; }
    .error-msg.show { display:block; }
  </style>
</head>
<body class="text-slate-200 min-h-screen grid-bg flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl pulse-glow">
          <i class="fas fa-bolt text-white text-xl"></i>
        </div>
        <span class="font-black text-white text-2xl">AdNova AI</span>
      </a>
      <h1 class="text-3xl font-black text-white">Welcome back</h1>
      <p class="text-slate-400 mt-2">Your AI is already working while you were away</p>
    </div>

    <!-- Card -->
    <div class="glass rounded-2xl p-8 pulse-glow">
      <div id="global-error" class="hidden mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
        <i class="fas fa-circle-exclamation"></i>
        <span id="global-error-text">Invalid credentials</span>
      </div>

      <form id="login-form" class="space-y-5" onsubmit="handleLogin(event)">
        <div>
          <label class="text-sm font-semibold text-slate-400 mb-2 block" for="email">Email Address</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"></i>
            <input type="email" id="email" name="email" value="demo@adnova.ai" placeholder="you@company.com"
              class="input-field rounded-xl px-4 py-3 pl-11 text-sm" autocomplete="email" required/>
          </div>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-400 mb-2 block" for="password">Password</label>
          <div class="relative">
            <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"></i>
            <input type="password" id="password" name="password" value="demo1234" placeholder="••••••••"
              class="input-field rounded-xl px-4 py-3 pl-11 pr-11 text-sm" autocomplete="current-password" required/>
            <button type="button" onclick="togglePass()" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
              <i class="fas fa-eye text-sm" id="eye-icon"></i>
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
            <input type="checkbox" id="remember" class="rounded border-slate-600 bg-transparent" checked/>
            Remember me
          </label>
          <a href="#" class="text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
        </div>
        <button type="submit" id="login-btn"
          class="btn-primary w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2">
          <i class="fas fa-sign-in-alt" id="login-icon"></i>
          <span id="login-text">Sign In to Dashboard</span>
        </button>
      </form>

      <div class="flex items-center gap-3 my-6">
        <div class="flex-1 h-px bg-white/10"></div>
        <span class="text-xs text-slate-500">OR</span>
        <div class="flex-1 h-px bg-white/10"></div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button onclick="socialLogin('google')" class="glass hover:bg-white/10 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-300 transition-all">
          <i class="fab fa-google text-red-400"></i> Google
        </button>
        <button onclick="socialLogin('microsoft')" class="glass hover:bg-white/10 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-300 transition-all">
          <i class="fab fa-microsoft text-blue-400"></i> Microsoft
        </button>
      </div>

      <p class="text-center text-sm text-slate-500 mt-6">
        Don't have an account?
        <a href="/register" class="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Start free trial</a>
      </p>
    </div>

    <!-- Demo notice -->
    <div class="mt-4 glass rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-slate-500">
      <i class="fas fa-circle-info text-indigo-400 flex-shrink-0"></i>
      <span>Mode démo — identifiants pré-remplis. Cliquez "Sign In" pour explorer la plateforme.</span>
    </div>

    <!-- Super Admin Link -->
    <div class="mt-3 text-center">
      <a href="/admin/login" class="text-xs text-slate-700 hover:text-orange-500 transition-all inline-flex items-center gap-1.5">
        <i class="fas fa-shield-halved text-xs"></i>
        Accès Super Admin
      </a>
    </div>
  </div>

  <script>
    function togglePass() {
      const p = document.getElementById('password');
      const icon = document.getElementById('eye-icon');
      if (p.type === 'password') {
        p.type = 'text';
        icon.className = 'fas fa-eye-slash text-sm';
      } else {
        p.type = 'password';
        icon.className = 'fas fa-eye text-sm';
      }
    }

    function setLoading(loading) {
      const btn = document.getElementById('login-btn');
      const icon = document.getElementById('login-icon');
      const text = document.getElementById('login-text');
      btn.disabled = loading;
      if (loading) {
        icon.className = 'fas fa-spinner fa-spin';
        text.textContent = 'Authenticating...';
      } else {
        icon.className = 'fas fa-sign-in-alt';
        text.textContent = 'Sign In to Dashboard';
      }
    }

    function showError(msg) {
      const el = document.getElementById('global-error');
      document.getElementById('global-error-text').textContent = msg;
      el.classList.remove('hidden');
    }

    function hideError() {
      document.getElementById('global-error').classList.add('hidden');
    }

    async function handleLogin(e) {
      e.preventDefault();
      hideError();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      if (!email || !password) { showError('Please fill in all fields.'); return; }
      setLoading(true);
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          localStorage.setItem('adnova_token', data.token);
          localStorage.setItem('adnova_user', JSON.stringify(data.user));
          window.location.href = '/dashboard';
        } else {
          showError(data.error || 'Invalid credentials. Please try again.');
          setLoading(false);
        }
      } catch (err) {
        showError('Connection error. Please try again.');
        setLoading(false);
      }
    }

    function socialLogin(provider) {
      // Demo: redirect directly
      localStorage.setItem('adnova_token', 'demo_social_' + provider);
      localStorage.setItem('adnova_user', JSON.stringify({ name: 'Demo User', email: 'demo@adnova.ai', role: 'owner' }));
      window.location.href = '/dashboard';
    }
  </script>
</body>
</html>`)
}
