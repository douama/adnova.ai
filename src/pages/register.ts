import type { Context } from 'hono'

export const renderRegister = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Start Free Trial — AdNova AI</title>
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
    .btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
    .btn-primary:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 0 30px rgba(99,102,241,0.2)} 50%{box-shadow:0 0 60px rgba(99,102,241,0.4)} }
    .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    .grid-bg { background-image: linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px); background-size: 50px 50px; }
    .strength-bar { height: 3px; border-radius: 2px; transition: width 0.3s, background 0.3s; }
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
      <div class="glass rounded-xl p-3 text-center">
        <i class="fas fa-robot text-indigo-400 mb-2 text-lg"></i>
        <div class="text-xs font-semibold text-white">AI-powered</div>
        <div class="text-xs text-slate-500">campaigns</div>
      </div>
      <div class="glass rounded-xl p-3 text-center">
        <i class="fas fa-plug text-indigo-400 mb-2 text-lg"></i>
        <div class="text-xs font-semibold text-white">5 platforms</div>
        <div class="text-xs text-slate-500">connected</div>
      </div>
      <div class="glass rounded-xl p-3 text-center">
        <i class="fas fa-shield-halved text-indigo-400 mb-2 text-lg"></i>
        <div class="text-xs font-semibold text-white">SOC2</div>
        <div class="text-xs text-slate-500">compliant</div>
      </div>
    </div>

    <div class="glass rounded-2xl p-8">
      <div id="global-error" class="hidden mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
        <i class="fas fa-circle-exclamation flex-shrink-0"></i>
        <span id="global-error-text">An error occurred.</span>
      </div>

      <form id="register-form" class="space-y-4" onsubmit="handleRegister(event)">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block" for="first-name">First Name</label>
            <input type="text" id="first-name" name="firstName" placeholder="John"
              class="input-field rounded-xl px-4 py-3 text-sm" required/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block" for="last-name">Last Name</label>
            <input type="text" id="last-name" name="lastName" placeholder="Doe"
              class="input-field rounded-xl px-4 py-3 text-sm" required/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block" for="reg-email">Work Email</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"></i>
            <input type="email" id="reg-email" name="email" placeholder="you@company.com"
              class="input-field rounded-xl px-4 py-3 pl-11 text-sm" autocomplete="email" required/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block" for="company">Company Name</label>
          <div class="relative">
            <i class="fas fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"></i>
            <input type="text" id="company" name="company" placeholder="Acme Corp"
              class="input-field rounded-xl px-4 py-3 pl-11 text-sm" required/>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block" for="adspend">Monthly Ad Spend</label>
          <select id="adspend" name="adSpend" class="input-field rounded-xl px-4 py-3 text-sm bg-transparent cursor-pointer">
            <option value="<10k">Less than $10K</option>
            <option value="10k-50k">$10K - $50K</option>
            <option value="50k-200k" selected>$50K - $200K</option>
            <option value="200k-1m">$200K - $1M</option>
            <option value="1m+">$1M+</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block" for="reg-password">Password</label>
          <div class="relative">
            <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"></i>
            <input type="password" id="reg-password" name="password" placeholder="Min. 8 characters"
              class="input-field rounded-xl px-4 py-3 pl-11 pr-11 text-sm" autocomplete="new-password"
              oninput="checkStrength(this.value)" required minlength="8"/>
            <button type="button" onclick="toggleRegPass()" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
              <i class="fas fa-eye text-sm" id="reg-eye"></i>
            </button>
          </div>
          <div class="mt-2 flex gap-1">
            <div class="flex-1 bg-white/10 rounded-full h-0.5 overflow-hidden"><div id="s1" class="strength-bar h-full"></div></div>
            <div class="flex-1 bg-white/10 rounded-full h-0.5 overflow-hidden"><div id="s2" class="strength-bar h-full"></div></div>
            <div class="flex-1 bg-white/10 rounded-full h-0.5 overflow-hidden"><div id="s3" class="strength-bar h-full"></div></div>
            <div class="flex-1 bg-white/10 rounded-full h-0.5 overflow-hidden"><div id="s4" class="strength-bar h-full"></div></div>
          </div>
          <div class="text-xs text-slate-600 mt-1" id="strength-label">Enter a password</div>
        </div>
        <label class="flex items-start gap-2 text-xs text-slate-400 cursor-pointer select-none">
          <input type="checkbox" id="terms" class="mt-0.5 rounded border-slate-600 bg-transparent flex-shrink-0" required/>
          <span>I agree to the <a href="#" class="text-indigo-400 hover:text-indigo-300">Terms of Service</a> and <a href="#" class="text-indigo-400 hover:text-indigo-300">Privacy Policy</a></span>
        </label>
        <button type="submit" id="register-btn"
          class="btn-primary w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2">
          <i class="fas fa-rocket" id="reg-icon"></i>
          <span id="reg-text">Create Free Account</span>
        </button>
      </form>
      <p class="text-center text-sm text-slate-500 mt-4">
        Already have an account?
        <a href="/login" class="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign in</a>
      </p>
    </div>
  </div>

  <script>
    function toggleRegPass() {
      const p = document.getElementById('reg-password');
      const icon = document.getElementById('reg-eye');
      p.type = p.type === 'password' ? 'text' : 'password';
      icon.className = p.type === 'password' ? 'fas fa-eye text-sm' : 'fas fa-eye-slash text-sm';
    }

    function checkStrength(val) {
      const s = [
        val.length >= 8,
        /[A-Z]/.test(val),
        /[0-9]/.test(val),
        /[^A-Za-z0-9]/.test(val)
      ];
      const score = s.filter(Boolean).length;
      const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
      const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
      for (let i = 1; i <= 4; i++) {
        document.getElementById('s' + i).style.background = i <= score ? colors[score] : 'transparent';
        document.getElementById('s' + i).style.width = i <= score ? '100%' : '0%';
      }
      document.getElementById('strength-label').textContent = val ? labels[score] : 'Enter a password';
      document.getElementById('strength-label').style.color = colors[score] || '#64748b';
    }

    function showError(msg) {
      const el = document.getElementById('global-error');
      document.getElementById('global-error-text').textContent = msg;
      el.classList.remove('hidden');
    }

    async function handleRegister(e) {
      e.preventDefault();
      document.getElementById('global-error').classList.add('hidden');
      const btn = document.getElementById('register-btn');
      const icon = document.getElementById('reg-icon');
      const text = document.getElementById('reg-text');
      btn.disabled = true;
      icon.className = 'fas fa-spinner fa-spin';
      text.textContent = 'Setting up your account...';
      const payload = {
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        email: document.getElementById('reg-email').value.trim(),
        company: document.getElementById('company').value.trim(),
        adSpend: document.getElementById('adspend').value,
        password: document.getElementById('reg-password').value,
      };
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          localStorage.setItem('adnova_token', data.token);
          localStorage.setItem('adnova_user', JSON.stringify(data.user));
          icon.className = 'fas fa-check';
          text.textContent = 'Account created! Redirecting...';
          setTimeout(() => { window.location.href = '/dashboard'; }, 800);
        } else {
          showError(data.error || 'Registration failed. Please try again.');
          btn.disabled = false;
          icon.className = 'fas fa-rocket';
          text.textContent = 'Create Free Account';
        }
      } catch (err) {
        showError('Connection error. Please try again.');
        btn.disabled = false;
        icon.className = 'fas fa-rocket';
        text.textContent = 'Create Free Account';
      }
    }
  </script>
</body>
</html>`)
}
