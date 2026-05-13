import type { Context } from 'hono'
import { themeBaseCss, themeFontLinks, themeMeta } from '../../lib/theme'

export const renderAdminLogin = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
${themeMeta({ title: 'Super Admin · Sign in', description: 'AdNova AI Super Admin restricted access.', path: '/admin/login' })}
${themeFontLinks()}
<style>
${themeBaseCss()}

.auth-shell{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden}
.auth-mesh{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 700px 400px at 50% -10%,rgba(255,77,0,0.12),transparent 70%),radial-gradient(ellipse 500px 300px at 80% 80%,rgba(255,77,0,0.06),transparent 65%)}
.auth-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px);background-size:50px 50px;mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000 30%,transparent 100%)}
.auth-back{position:absolute;top:24px;left:24px;z-index:1;font-size:13px;color:var(--muted2);transition:color 0.2s;display:inline-flex;align-items:center;gap:6px}
.auth-back:hover{color:var(--white)}

.auth-card{position:relative;z-index:1;width:100%;max-width:440px}

.restricted{padding:9px 14px;border-radius:11px;background:rgba(122,122,122,0.06);border:1px solid rgba(122,122,122,0.18);font-size:12px;color:#A8A8A8;font-weight:500;letter-spacing:-0.005em;display:flex;align-items:center;gap:9px;margin-bottom:24px}
.restricted svg{flex-shrink:0;width:14px;height:14px}

.auth-brand{text-align:center;margin-bottom:32px}
.shield-orb{display:inline-flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:16px;background:linear-gradient(135deg,var(--orange),var(--orange2));margin-bottom:20px;box-shadow:0 0 50px rgba(255,77,0,0.35);animation:pulseOrb 3s ease infinite;position:relative;overflow:hidden}
.shield-orb svg{width:28px;height:28px;color:#fff;position:relative;z-index:1}
.shield-orb::after{content:'';position:absolute;top:0;left:0;right:0;height:30%;background:linear-gradient(180deg,rgba(255,255,255,0.18),transparent);animation:scan 3s linear infinite}
@keyframes pulseOrb{0%,100%{box-shadow:0 0 50px rgba(255,77,0,0.25)}50%{box-shadow:0 0 70px rgba(255,77,0,0.5)}}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(330%)}}
.auth-brand h1{font-size:30px;font-weight:800;letter-spacing:-0.035em;line-height:1;margin-bottom:8px}
.auth-brand h1 em{font-size:32px}
.auth-brand p{font-size:13px;color:var(--muted2);font-weight:400;letter-spacing:-0.005em}

.auth-box{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:28px}
.mfa-tag{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:10px;background:rgba(255,77,0,0.06);border:1px solid rgba(255,77,0,0.2);font-size:11px;color:var(--orange2);font-weight:500;margin-bottom:20px;letter-spacing:-0.005em}
.mfa-tag .tls{margin-left:auto;font-size:10px;color:var(--green);font-weight:600}
.mfa-tag svg{width:12px;height:12px;flex-shrink:0}

.auth-form{display:flex;flex-direction:column;gap:14px}
.pwd-wrap{position:relative}
.pwd-wrap input{padding-right:42px}
.eye-btn{position:absolute;right:10px;top:50%;transform:translateY(-50%);width:26px;height:26px;display:flex;align-items:center;justify-content:center;color:var(--muted);background:none;border:none;cursor:pointer;border-radius:6px;transition:color 0.2s,background 0.2s}
.eye-btn:hover{color:var(--white);background:rgba(255,255,255,0.05)}
.eye-btn svg{width:15px;height:15px}

.otp-row{display:flex;gap:7px}
.otp-digit{width:100%;padding:10px 0;text-align:center;border-radius:9px;background:var(--card);border:1px solid var(--border);color:var(--orange);font-size:16px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:0;transition:all 0.2s}
.otp-digit:focus{outline:none;border-color:var(--orange);box-shadow:0 0 0 3px rgba(255,77,0,0.12);background:rgba(255,77,0,0.04)}

.auth-foot{margin-top:18px;padding-top:14px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--muted);letter-spacing:0.02em}
.auth-foot span{display:inline-flex;align-items:center;gap:5px}
.auth-foot svg{width:11px;height:11px}

.session-info{margin-top:14px;font-size:11px;color:var(--muted);text-align:center;letter-spacing:0.02em}
.session-info a{color:var(--muted2);transition:color 0.2s}
.session-info a:hover{color:var(--white)}
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
    <div class="restricted">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      Restricted access zone — Authorized administrators only
    </div>

    <div class="auth-brand">
      <div class="shield-orb">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <h1>Super <em>Admin.</em></h1>
      <p>AdNova AI — Administration panel</p>
    </div>

    <div class="auth-box">
      <div class="mfa-tag">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Two-factor authentication required
        <span class="tls">TLS 1.3 ✓</span>
      </div>

      <form class="auth-form" id="admin-form" onsubmit="event.preventDefault();handleAdminLogin()">
        <div class="field">
          <label for="admin-email">Administrator email</label>
          <input type="email" id="admin-email" placeholder="admin@adnova.ai" autocomplete="email" required/>
        </div>
        <div class="field">
          <label for="admin-password">Password</label>
          <div class="pwd-wrap">
            <input type="password" id="admin-password" placeholder="••••••••" autocomplete="current-password" required/>
            <button type="button" class="eye-btn" onclick="togglePwd()" aria-label="Toggle password visibility">
              <svg id="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="field">
          <label>2FA code <span style="color:var(--muted);font-weight:400;font-size:11px">— demo: pre-filled</span></label>
          <div class="otp-row" id="otp-inputs">
            ${[8,4,2,1,9,3].map((d) => `<input type="text" maxlength="1" value="${d}" class="otp-digit" oninput="nextOtp(this)" onkeydown="prevOtp(event,this)" inputmode="numeric"/>`).join('')}
          </div>
        </div>
        <button type="submit" id="admin-btn" class="btn-primary" style="width:100%;margin-top:6px">
          <span id="admin-btn-text">Access Super Admin</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </form>

      <div class="auth-foot">
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Session: 4h max
        </span>
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          All actions audited
        </span>
      </div>
    </div>

    <p class="session-info">Need user access? <a href="/login">Sign in to the app →</a></p>
  </div>
</div>

<script>
(function(){
  window.togglePwd = function(){
    var p = document.getElementById('admin-password');
    p.type = p.type === 'password' ? 'text' : 'password';
  };
  window.nextOtp = function(input){
    input.value = input.value.replace(/[^0-9]/g, '');
    var inputs = document.querySelectorAll('.otp-digit');
    var arr = Array.prototype.slice.call(inputs);
    var idx = arr.indexOf(input);
    if(input.value && idx < arr.length - 1) arr[idx + 1].focus();
  };
  window.prevOtp = function(e, input){
    if(e.key === 'Backspace' && !input.value){
      var inputs = document.querySelectorAll('.otp-digit');
      var arr = Array.prototype.slice.call(inputs);
      var idx = arr.indexOf(input);
      if(idx > 0) arr[idx - 1].focus();
    }
  };
  window.handleAdminLogin = async function(){
    var btn = document.getElementById('admin-btn');
    var text = document.getElementById('admin-btn-text');
    var email = document.getElementById('admin-email').value.trim();
    var password = document.getElementById('admin-password').value;
    text.textContent = 'Verifying…';
    btn.disabled = true;
    try {
      var res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });
      var data = await res.json();
      if(res.ok && data.success){
        localStorage.setItem('adnova_admin_token', data.token);
        var isHttps = window.location.protocol === 'https:';
        document.cookie = 'adnova_admin_token=' + encodeURIComponent(data.token)
          + '; Path=/admin; Max-Age=28800; SameSite=Strict' + (isHttps ? '; Secure' : '');
        text.textContent = 'Authenticated — Redirecting…';
        setTimeout(function(){ window.location.href = '/admin'; }, 500);
      } else {
        text.textContent = 'Access Super Admin';
        btn.disabled = false;
        alert(data.error || 'Invalid credentials.');
      }
    } catch(err) {
      text.textContent = 'Access Super Admin';
      btn.disabled = false;
      alert('Network error. Please retry.');
    }
  };
})();
</script>
</body>
</html>`)
}
