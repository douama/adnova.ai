import type { Context } from 'hono'
import { themeMeta, themeFontLinks, themeBaseCss } from '../lib/theme'

export const renderRegister = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
${themeMeta({ title: 'Start free trial', description: 'Create your AdNova AI workspace in 30 seconds. No credit card required. 14-day free trial.', path: '/register' })}
${themeFontLinks()}
<style>
${themeBaseCss()}

.auth-shell{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden}
.auth-mesh{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 700px 400px at 50% -10%,rgba(255,77,0,0.10),transparent 70%),radial-gradient(ellipse 500px 300px at 20% 80%,rgba(255,77,0,0.05),transparent 65%)}
.auth-grid{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000 30%,transparent 100%)}
.auth-back{position:absolute;top:24px;left:24px;z-index:1;font-size:13px;color:var(--muted2);transition:color 0.2s;display:inline-flex;align-items:center;gap:6px}
.auth-back:hover{color:var(--white)}

.auth-card{position:relative;z-index:1;width:100%;max-width:480px}
.auth-brand{text-align:center;margin-bottom:32px}
.auth-brand .logo{font-size:22px;display:inline-block;margin-bottom:24px}
.auth-brand h1{font-size:34px;font-weight:800;letter-spacing:-0.035em;line-height:1;margin-bottom:10px}
.auth-brand h1 em{font-size:36px}
.auth-brand p{font-size:15px;color:var(--muted2);font-weight:400;letter-spacing:-0.005em}
.auth-box{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:32px}
.auth-form{display:flex;flex-direction:column;gap:16px}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.field-row .field{margin:0}
.terms-row{display:flex;align-items:flex-start;gap:9px;font-size:12px;color:var(--muted2);line-height:1.55;cursor:pointer;user-select:none}
.terms-row input{width:14px;height:14px;accent-color:var(--orange);cursor:pointer;flex-shrink:0;margin-top:1px}
.terms-row a{color:var(--orange2);transition:color 0.2s}
.terms-row a:hover{color:var(--orange)}
.auth-foot{text-align:center;margin-top:22px;font-size:13px;color:var(--muted)}
.auth-foot a{color:var(--orange2);font-weight:600;transition:color 0.2s}
.auth-foot a:hover{color:var(--orange)}

.perks{display:flex;justify-content:center;gap:24px;margin-top:18px;flex-wrap:wrap}
.perk{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--muted);letter-spacing:0.02em}
.perk-dot{width:5px;height:5px;border-radius:50%;background:var(--green)}

@media(max-width:480px){.field-row{grid-template-columns:1fr}}
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
      <h1>Start your <em>free trial.</em></h1>
      <p>Create your workspace in 30 seconds. No credit card.</p>
    </div>

    <div class="auth-box">
      <div id="auth-error" class="alert alert-error" style="display:none;margin-bottom:16px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
        <span id="auth-error-text">Something went wrong</span>
      </div>

      <form id="register-form" class="auth-form" onsubmit="handleRegister(event)">
        <div class="field-row">
          <div class="field">
            <label for="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" placeholder="Sarah" autocomplete="given-name" required/>
          </div>
          <div class="field">
            <label for="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Lin" autocomplete="family-name" required/>
          </div>
        </div>
        <div class="field">
          <label for="company">Company</label>
          <input type="text" id="company" name="company" placeholder="Your company name" autocomplete="organization" required/>
        </div>
        <div class="field">
          <label for="email">Work email</label>
          <input type="email" id="email" name="email" placeholder="you@company.com" autocomplete="email" required/>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="At least 8 characters" autocomplete="new-password" required minlength="8"/>
          <span class="field-hint">Minimum 8 characters. Use a mix of letters, numbers and symbols.</span>
        </div>
        <label class="terms-row">
          <input type="checkbox" id="terms" required/>
          <span>I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</span>
        </label>
        <button type="submit" id="register-btn" class="btn-primary" style="width:100%">
          <span id="register-text">Create account</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </form>

      <p class="auth-foot">Already have an account? <a href="/login">Sign in</a></p>
    </div>

    <div class="perks">
      <span class="perk"><span class="perk-dot"></span>14-day free trial</span>
      <span class="perk"><span class="perk-dot"></span>No credit card</span>
      <span class="perk"><span class="perk-dot"></span>Cancel anytime</span>
    </div>
  </div>
</div>

<script>
(function(){
  function showError(msg){
    var el = document.getElementById('auth-error');
    document.getElementById('auth-error-text').textContent = msg;
    el.style.display = 'flex';
  }
  function hideError(){ document.getElementById('auth-error').style.display = 'none'; }
  function setLoading(loading){
    var btn = document.getElementById('register-btn');
    var text = document.getElementById('register-text');
    btn.disabled = loading;
    text.textContent = loading ? 'Creating your workspace…' : 'Create account';
  }

  window.handleRegister = async function(e){
    e.preventDefault();
    hideError();
    var body = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      company: document.getElementById('company').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value,
    };
    if(!body.firstName || !body.lastName || !body.company || !body.email || !body.password){
      showError('Please fill in all fields.'); return;
    }
    if(body.password.length < 8){
      showError('Password must be at least 8 characters.'); return;
    }
    if(!document.getElementById('terms').checked){
      showError('Please accept the Terms of Service and Privacy Policy.'); return;
    }
    setLoading(true);
    try{
      var res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      var data = await res.json();
      if(res.ok && data.success){
        localStorage.setItem('adnova_token', data.token);
        localStorage.setItem('adnova_user', JSON.stringify(data.user));
        window.location.href = '/onboarding';
      } else {
        showError(data.error || 'Registration failed. Please try again.');
        setLoading(false);
      }
    } catch(err){
      showError('Connection error. Please try again.');
      setLoading(false);
    }
  };
})();
</script>
</body>
</html>`)
}
