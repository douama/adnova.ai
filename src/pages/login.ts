import type { Context } from 'hono'

export const renderLogin = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sign In — AdNova AI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    body { background: #040812; font-family: 'Inter', sans-serif; }
    .gradient-text { background: linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .glass { background:rgba(255,255,255,0.03); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.08); }
    .input-field { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#e2e8f0; transition:all 0.2s; }
    .input-field:focus { outline:none; border-color:#6366f1; background:rgba(99,102,241,0.05); box-shadow:0 0 0 3px rgba(99,102,241,0.15); }
    .btn-primary { background: linear-gradient(135deg,#6366f1,#8b5cf6); transition:all 0.2s; }
    .btn-primary:hover { background: linear-gradient(135deg,#4f46e5,#7c3aed); transform:translateY(-1px); box-shadow:0 10px 30px rgba(99,102,241,0.4); }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 0 30px rgba(99,102,241,0.2)} 50%{box-shadow:0 0 60px rgba(99,102,241,0.4)} }
    .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    .grid-bg { background-image: linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px); background-size: 50px 50px; }
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
      <form id="login-form" class="space-y-5">
        <div>
          <label class="text-sm font-semibold text-slate-400 mb-2 block">Email Address</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input type="email" id="email" value="demo@adnova.ai" placeholder="you@company.com"
              class="input-field w-full rounded-xl px-4 py-3 pl-11 text-sm"/>
          </div>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-400 mb-2 block">Password</label>
          <div class="relative">
            <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input type="password" id="password" value="demo1234" placeholder="••••••••"
              class="input-field w-full rounded-xl px-4 py-3 pl-11 pr-11 text-sm"/>
            <button type="button" onclick="togglePass()" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <i class="fas fa-eye text-sm"></i>
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-slate-400 cursor-pointer">
            <input type="checkbox" checked class="rounded border-slate-600 text-indigo-500 focus:ring-indigo-500"/>
            Remember me
          </label>
          <a href="#" class="text-indigo-400 hover:text-indigo-300">Forgot password?</a>
        </div>
        <button type="button" onclick="handleLogin()" 
          class="btn-primary w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2">
          <i class="fas fa-sign-in-alt"></i> Sign In to Dashboard
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center gap-3 my-6">
        <div class="flex-1 h-px bg-white/10"></div>
        <span class="text-xs text-slate-500">OR CONTINUE WITH</span>
        <div class="flex-1 h-px bg-white/10"></div>
      </div>

      <!-- Social Login -->
      <div class="grid grid-cols-2 gap-3">
        <button class="glass hover:bg-white/10 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-300 transition-all">
          <i class="fab fa-google text-red-400"></i> Google
        </button>
        <button class="glass hover:bg-white/10 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-300 transition-all">
          <i class="fab fa-microsoft text-blue-400"></i> Microsoft
        </button>
      </div>

      <p class="text-center text-sm text-slate-500 mt-6">
        Don't have an account? 
        <a href="/register" class="text-indigo-400 hover:text-indigo-300 font-semibold">Start free trial</a>
      </p>
    </div>

    <!-- Demo notice -->
    <div class="mt-4 glass rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-slate-400">
      <i class="fas fa-info-circle text-indigo-400"></i>
      Demo mode: credentials pre-filled. Click "Sign In" to explore the full platform.
    </div>

    <!-- Super Admin Link -->
    <div class="mt-3 text-center">
      <a href="/admin/login" class="text-xs text-slate-700 hover:text-orange-500 transition-all flex items-center justify-center gap-1.5">
        <i class="fas fa-shield-halved text-orange-600/50 text-xs"></i>
        Accès Super Admin
      </a>
    </div>
  </div>

  <script>
    function togglePass() {
      const p = document.getElementById('password');
      p.type = p.type === 'password' ? 'text' : 'password';
    }
    function handleLogin() {
      const btn = event.target.closest('button');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
      btn.disabled = true;
      setTimeout(() => { window.location.href = '/dashboard'; }, 1200);
    }
  </script>
</body>
</html>`)
}
