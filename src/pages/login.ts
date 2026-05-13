import type { Context } from 'hono'
import { themeMeta, themeFontLinks, themeBaseCss } from '../lib/theme'

export const renderLogin = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
${themeMeta({ title: 'Sign in', description: 'Sign in to AdNova AI. Your autonomous ad agents are already at work.', path: '/login' })}
${themeFontLinks()}
<style>
${themeBaseCss()}

.auth-shell{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden}
.auth-mesh{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 700px 400px at 50% -10%,rgba(255,77,0,0.10),transparent 70%),radial-gradient(ellipse 500px 300px at 80% 80%,rgba(255,77,0,0.05),transparent 65%)}
.auth-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000 30%,transparent 100%)}
.auth-back{position:absolute;top:24px;left:24px;z-index:1;font-size:13px;color:var(--muted2);transition:color 0.2s;display:inline-flex;align-items:center;gap:6px}
.auth-back:hover{color:var(--white)}

.auth-card{position:relative;z-index:1;width:100%;max-width:440px}
.auth-brand{text-align:center;margin-bottom:36px}
.auth-brand .logo{font-size:22px;display:inline-block;margin-bottom:24px}
.auth-brand h1{font-size:36px;font-weight:800;letter-spacing:-0.035em;line-height:1;margin-bottom:10px}
.auth-brand h1 em{font-size:38px}
.auth-brand p{font-size:15px;color:var(--muted2);font-weight:400;letter-spacing:-0.005em}
.auth-box{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:32px}
.auth-form{display:flex;flex-direction:column;gap:18px}
.auth-row-between{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--muted2)}
.auth-row-between a{color:var(--orange2);transition:color 0.2s}
.auth-row-between a:hover{color:var(--orange)}
.remember{display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none}
.remember input{width:14px;height:14px;accent-color:var(--orange);cursor:pointer}
.auth-divider{display:flex;align-items:center;gap:12px;margin:20px 0}
.auth-divider span{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.15em}
.auth-divider hr{flex:1;border:none;border-top:1px solid var(--border)}
.social-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.social-btn{padding:11px 14px;border-radius:10px;background:var(--card);border:1px solid var(--border);color:var(--text);font-size:13px;font-weight:500;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:all 0.2s;cursor:pointer}
.social-btn:hover{border-color:var(--border2);background:var(--card2);color:var(--white)}
.social-btn img{width:16px;height:16px}
.auth-foot{text-align:center;margin-top:24px;font-size:13px;color:var(--muted)}
.auth-foot a{color:var(--orange2);font-weight:600;transition:color 0.2s}
.auth-foot a:hover{color:var(--orange)}
.demo-notice{margin-top:14px;font-size:12px;color:var(--muted);text-align:center;letter-spacing:-0.005em}
.demo-notice strong{color:var(--text);font-weight:500}
.admin-link{margin-top:18px;text-align:center;font-size:11px;color:var(--muted);letter-spacing:0.04em}
.admin-link a{color:var(--muted);transition:color 0.2s}
.admin-link a:hover{color:var(--orange2)}
.eye-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:var(--muted);background:none;border:none;cursor:pointer;border-radius:6px;transition:color 0.2s,background 0.2s}
.eye-btn:hover{color:var(--white);background:rgba(255,255,255,0.05)}
.eye-btn svg{width:16px;height:16px}
.pwd-wrap{position:relative}
.pwd-wrap input{padding-right:44px}
</style>
</head>
<body>
<a href="/" class="auth-back">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
  Back to home
</a>

<div class="auth-shell">
  <div class="auth-mesh"></div>
  <div class="auth-grid"></div>

  <div class="auth-card">
    <div class="auth-brand">
      <a href="/" class="logo">AdNova<span>.</span></a>
      <h1>Welcome <em>back.</em></h1>
      <p>Your agents are already working while you were away.</p>
    </div>

    <div class="auth-box">
      <div id="auth-error" class="alert alert-error" style="display:none;margin-bottom:16px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
        <span id="auth-error-text">Invalid credentials</span>
      </div>

      <form id="login-form" class="auth-form" onsubmit="handleLogin(event)">
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" value="demo@adnova.ai" placeholder="you@company.com" autocomplete="email" required/>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <div class="pwd-wrap">
            <input type="password" id="password" name="password" value="demo1234" placeholder="••••••••" autocomplete="current-password" required/>
            <button type="button" class="eye-btn" onclick="togglePass()" aria-label="Toggle password visibility">
              <svg id="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="auth-row-between">
          <label class="remember"><input type="checkbox" id="remember" checked/>Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" id="login-btn" class="btn-primary" style="width:100%">
          <span id="login-text">Sign in</span>
          <svg id="login-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </form>

      <div class="auth-divider"><hr/><span>Or</span><hr/></div>

      <div class="social-row">
        <button class="social-btn" onclick="socialLogin('google')">
          <img src="https://cdn.simpleicons.org/google/4285F4" alt=""/>Google
        </button>
        <button class="social-btn" onclick="socialLogin('microsoft')">
          <img src="https://cdn.simpleicons.org/microsoft/00A4EF" alt=""/>Microsoft
        </button>
      </div>

      <p class="auth-foot">Don't have an account? <a href="/register">Start free trial</a></p>
    </div>

    <p class="demo-notice"><strong>Demo mode</strong> — credentials pre-filled. Click "Sign in" to explore.</p>
    <p class="admin-link"><a href="/admin/login">Super Admin access →</a></p>
  </div>
</div>

<script>
(function(){
  function showError(msg){
    var el = document.getElementById('auth-error');
    document.getElementById('auth-error-text').textContent = msg;
    el.style.display = 'flex';
  }
  function hideError(){
    document.getElementById('auth-error').style.display = 'none';
  }
  function setLoading(loading){
    var btn = document.getElementById('login-btn');
    var text = document.getElementById('login-text');
    btn.disabled = loading;
    text.textContent = loading ? 'Authenticating…' : 'Sign in';
  }
  window.togglePass = function(){
    var p = document.getElementById('password');
    p.type = p.type === 'password' ? 'text' : 'password';
  };
  window.handleLogin = async function(e){
    e.preventDefault();
    hideError();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    if(!email || !password){ showError('Please fill in all fields.'); return; }
    setLoading(true);
    try{
      var res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });
      var data = await res.json();
      if(res.ok && data.success){
        localStorage.setItem('adnova_token', data.token);
        localStorage.setItem('adnova_user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
      } else {
        showError(data.error || 'Invalid credentials. Please try again.');
        setLoading(false);
      }
    } catch(err){
      showError('Connection error. Please try again.');
      setLoading(false);
    }
  };
  window.socialLogin = function(provider){
    localStorage.setItem('adnova_token', 'demo_social_' + provider);
    localStorage.setItem('adnova_user', JSON.stringify({ name: 'Demo User', email: 'demo@adnova.ai', role: 'owner' }));
    window.location.href = '/dashboard';
  };
})();
</script>
</body>
</html>`)
}
