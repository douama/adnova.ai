import type { Context } from 'hono'

export const renderRegister = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Start Free Trial — AdNova AI</title>
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
    .btn-primary:hover { background: linear-gradient(135deg,#4f46e5,#7c3aed); transform:translateY(-1px); }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 0 30px rgba(99,102,241,0.2)} 50%{box-shadow:0 0 60px rgba(99,102,241,0.4)} }
    .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    .grid-bg { background-image: linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px); background-size: 50px 50px; }
  </style>
</head>
<body class="text-slate-200 min-h-screen grid-bg py-12 px-4">
  <div class="max-w-lg mx-auto">
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl pulse-glow">
          <i class="fas fa-bolt text-white text-xl"></i>
        </div>
        <span class="font-black text-white text-2xl">AdNova AI</span>
      </a>
      <h1 class="text-3xl font-black text-white">Start Your Free Trial</h1>
      <p class="text-slate-400 mt-2">14 days free. No credit card required.</p>
    </div>

    <!-- Benefits -->
    <div class="grid grid-cols-3 gap-3 mb-6">
      ${regBenefit('fa-robot', 'AI-powered', 'campaigns')}
      ${regBenefit('fa-plug', '5 platforms', 'connected')}
      ${regBenefit('fa-shield-halved', 'SOC2', 'compliant')}
    </div>

    <div class="glass rounded-2xl p-8">
      <form id="register-form" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">First Name</label>
            <input type="text" placeholder="John" class="input-field w-full rounded-xl px-4 py-3 text-sm"/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Last Name</label>
            <input type="text" placeholder="Doe" class="input-field w-full rounded-xl px-4 py-3 text-sm"/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Work Email</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input type="email" placeholder="you@company.com" class="input-field w-full rounded-xl px-4 py-3 pl-11 text-sm"/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Company Name</label>
          <div class="relative">
            <i class="fas fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input type="text" placeholder="Acme Corp" class="input-field w-full rounded-xl px-4 py-3 pl-11 text-sm"/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Monthly Ad Spend</label>
          <select class="input-field w-full rounded-xl px-4 py-3 text-sm">
            <option>Less than $10K</option>
            <option>$10K - $50K</option>
            <option selected>$50K - $200K</option>
            <option>$200K - $1M</option>
            <option>$1M+</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Password</label>
          <div class="relative">
            <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input type="password" placeholder="Min. 8 characters" class="input-field w-full rounded-xl px-4 py-3 pl-11 text-sm"/>
          </div>
        </div>
        <div class="flex items-start gap-2 text-xs text-slate-400">
          <input type="checkbox" class="mt-0.5 rounded border-slate-600 text-indigo-500" checked/>
          <span>I agree to the <a href="#" class="text-indigo-400">Terms of Service</a> and <a href="#" class="text-indigo-400">Privacy Policy</a></span>
        </div>
        <button type="button" onclick="handleRegister()"
          class="btn-primary w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2">
          <i class="fas fa-rocket"></i> Create Free Account
        </button>
      </form>
      <p class="text-center text-sm text-slate-500 mt-4">
        Already have an account? <a href="/login" class="text-indigo-400 hover:text-indigo-300 font-semibold">Sign in</a>
      </p>
    </div>
  </div>
  <script>
    function handleRegister() {
      const btn = event.target.closest('button');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Setting up your account...';
      btn.disabled = true;
      setTimeout(() => { window.location.href = '/dashboard'; }, 1800);
    }
  </script>
</body>
</html>`)
}

function regBenefit(icon: string, title: string, sub: string): string {
  return `<div class="glass rounded-xl p-3 text-center">
    <i class="fas ${icon} text-indigo-400 mb-2 text-lg"></i>
    <div class="text-xs font-semibold text-white">${title}</div>
    <div class="text-xs text-slate-500">${sub}</div>
  </div>`
}
