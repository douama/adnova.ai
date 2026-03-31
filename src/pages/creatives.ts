import type { Context } from 'hono'
import { shell } from '../lib/layout'

export const renderCreatives = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <div class="flex items-center gap-3">
      <button class="creative-tab active-ct glass rounded-xl px-4 py-2 text-sm font-semibold transition-all" onclick="setCreativeTab('all',this)">All Creatives</button>
      <button class="creative-tab glass rounded-xl px-4 py-2 text-sm text-slate-400 transition-all" onclick="setCreativeTab('images',this)">Images</button>
      <button class="creative-tab glass rounded-xl px-4 py-2 text-sm text-slate-400 transition-all" onclick="setCreativeTab('videos',this)">Videos</button>
      <button class="creative-tab glass rounded-xl px-4 py-2 text-sm text-slate-400 transition-all" onclick="setCreativeTab('ugc',this)">UGC</button>
      <button class="creative-tab glass rounded-xl px-4 py-2 text-sm text-slate-400 transition-all" onclick="setCreativeTab('copy',this)">Ad Copy</button>
    </div>
    <button onclick="openGenerateModal()" class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all">
      <i class="fas fa-wand-magic-sparkles"></i> Generate with AI
    </button>
  </div>

  <!-- AI Generation Status Banner -->
  <div class="glass rounded-2xl p-4 mb-6 border border-purple-500/20 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
        <i class="fas fa-wand-magic-sparkles text-white"></i>
      </div>
      <div>
        <div class="font-semibold text-white text-sm">AI is generating 3 new creatives</div>
        <div class="text-xs text-slate-400">UGC-style video for "Summer Collection" · ETA 2 minutes</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="progress-bar w-32">
        <div class="progress-fill bg-gradient-to-r from-purple-500 to-pink-500" style="width:67%" id="gen-progress"></div>
      </div>
      <span class="text-xs text-purple-400 font-semibold">67%</span>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${creativeStat('142', 'Total Creatives', 'fa-photo-film', 'purple')}
    ${creativeStat('67', 'Active / Running', 'fa-play-circle', 'emerald')}
    ${creativeStat('38', 'In A/B Test', 'fa-flask', 'blue')}
    ${creativeStat('37', 'Killed by AI', 'fa-ban', 'red')}
  </div>

  <!-- Creatives Grid -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6" id="creatives-grid">
    ${creativeCard('Summer-Hero-V3', 'video', 6.2, 'active', 'Summer Collection', 'TikTok,Instagram', true, 98)}
    ${creativeCard('Product-Showcase-B', 'image', 4.8, 'active', 'Product Launch', 'Facebook,Google', true, 91)}
    ${creativeCard('UGC-Testimonial-V2', 'ugc', 4.1, 'active', 'Summer Collection', 'TikTok', false, 85)}
    ${creativeCard('Flash-Sale-Countdown', 'video', 3.9, 'active', 'Holiday Sale', 'Instagram', false, 78)}
    ${creativeCard('New-Look-Static', 'image', 3.4, 'testing', 'Brand Awareness', 'Facebook', false, 72)}
    ${creativeCard('Holiday-Banner-V2', 'image', 3.1, 'testing', 'Holiday Sale', 'Google', false, 65)}
    ${creativeCard('Story-Ad-V4', 'video', 2.8, 'testing', 'Product Launch', 'Instagram', false, 58)}
    ${creativeCard('Carousel-Blue', 'image', 1.9, 'testing', 'Brand Awareness', 'Facebook', false, 41)}
    ${creativeCard('Old-Promo-V1', 'video', 0.6, 'killed', 'Product Launch', 'TikTok', false, 12)}
    ${creativeCard('Banner-Static-01', 'image', 1.2, 'killed', 'Retargeting', 'Google', false, 28)}
    ${creativeCard('Retarget-Text-01', 'copy', 5.1, 'active', 'Retargeting Pro', 'Google,Facebook', true, 94)}
    ${creativeCard('Copy-Headline-B2', 'copy', 3.7, 'testing', 'Brand Awareness', 'Facebook', false, 71)}
  </div>

  <!-- A/B Test Panel -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <i class="fas fa-flask text-blue-400 text-sm"></i>
        </div>
        <div>
          <h3 class="font-bold text-white">Active A/B Tests</h3>
          <p class="text-xs text-slate-500">AI automatically picks the winner</p>
        </div>
      </div>
      <button onclick="openABTest()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg">
        + New Test
      </button>
    </div>
    <div class="space-y-4">
      ${abTestRow('Summer Collection Creative Test', 'Summer-Hero-V3', 'Summer-Hero-V4', 6.2, 4.8, 72, 'A winning', 'emerald')}
      ${abTestRow('Product Page Image vs Video', 'Product-Static-A', 'Product-Video-B', 3.1, 4.2, 45, 'B winning', 'blue')}
      ${abTestRow('Holiday Headline Test', 'Flash-Sale-Headline-A', 'Flash-Sale-Headline-B', 2.8, 2.9, 31, 'Too early', 'amber')}
    </div>
  </div>

  <!-- AI Generate Modal -->
  <div id="generate-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn" style="border:1px solid rgba(139,92,246,0.4)">
      <div class="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 glass z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <i class="fas fa-wand-magic-sparkles text-white"></i>
          </div>
          <div>
            <h2 class="font-bold text-white text-lg">AI Creative Generator</h2>
            <p class="text-xs text-slate-500">Powered by AdNova AI Engine v2</p>
          </div>
        </div>
        <button onclick="closeGenerateModal()" class="text-slate-500 hover:text-slate-300 text-xl"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-6 space-y-5">
        <!-- Type Selector -->
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-2 block">Creative Type</label>
          <div class="grid grid-cols-4 gap-2">
            ${genTypeBtn('fa-image', 'AI Image', 'purple', true)}
            ${genTypeBtn('fa-video', 'AI Video', 'pink', false)}
            ${genTypeBtn('fa-user-check', 'UGC Style', 'blue', false)}
            ${genTypeBtn('fa-pen', 'Ad Copy', 'emerald', false)}
          </div>
        </div>

        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Creative Brief / Prompt</label>
          <textarea id="gen-prompt" rows="4" placeholder="Describe what you want: product, mood, target audience, style, colors, key message...
Example: 'Young woman confidently wearing our summer dress at the beach, golden hour, vibrant colors, lifestyle photography style, for 18-35 female audience'"
            class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-purple-500 transition-all resize-none"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Platform Format</label>
            <select class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10">
              <option>📱 Square 1:1 (All platforms)</option>
              <option>📺 Landscape 16:9 (YouTube/FB)</option>
              <option>📱 Story 9:16 (IG/TikTok)</option>
              <option>🎞️ Portrait 4:5 (Instagram Feed)</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Style</label>
            <select class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10">
              <option>📸 Lifestyle Photography</option>
              <option>🎨 Illustration</option>
              <option>👔 Professional/Corporate</option>
              <option>🎭 UGC / Authentic</option>
              <option>✨ Luxury Premium</option>
              <option>🎉 Bold & Colorful</option>
            </select>
          </div>
        </div>

        <div>
          <label class="text-xs font-semibold text-slate-400 mb-2 block">Number of Variants</label>
          <div class="flex items-center gap-3">
            ${variantBtn(1)}&nbsp;${variantBtn(2)}&nbsp;${variantBtn(3, true)}&nbsp;${variantBtn(5)}&nbsp;${variantBtn(8)}
          </div>
        </div>

        <div class="glass rounded-xl p-4 border border-purple-500/20">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-brain text-purple-400 text-sm"></i>
            <span class="text-sm font-semibold text-white">AI Enhancements</span>
          </div>
          <div class="space-y-2">
            ${genToggle('Add headline overlay text', true)}
            ${genToggle('Add brand logo watermark', true)}
            ${genToggle('Auto-adapt for all selected platforms', true)}
            ${genToggle('Generate matching ad copy', true)}
            ${genToggle('Create A/B variant with color variation', false)}
          </div>
        </div>

        <button onclick="generateCreatives()" class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg">
          <i class="fas fa-wand-magic-sparkles"></i> Generate 3 Creatives Now
        </button>
      </div>
    </div>
  </div>

  <style>
    .creative-tab.active-ct { background:rgba(139,92,246,0.2); color:#c4b5fd; border-color:rgba(139,92,246,0.4); }
    .creative-tab { border:1px solid rgba(255,255,255,0.08); }
    .creative-card:hover .creative-overlay { opacity: 1; }
    .creative-overlay { opacity: 0; transition: opacity 0.2s; }
  </style>

  <script>
    function setCreativeTab(tab, btn) {
      document.querySelectorAll('.creative-tab').forEach(b => { b.classList.remove('active-ct'); b.style.color = ''; });
      btn.classList.add('active-ct');
    }
    function openGenerateModal() { document.getElementById('generate-modal').classList.remove('hidden'); }
    function closeGenerateModal() { document.getElementById('generate-modal').classList.add('hidden'); }
    function generateCreatives() {
      const btn = event.target.closest('button');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI is generating...';
      btn.disabled = true;
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 15;
        if (p >= 100) {
          clearInterval(interval);
          closeGenerateModal();
          showToast('✨ 3 creatives generated! Check the studio.', 'success');
          btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Generate 3 Creatives Now';
          btn.disabled = false;
        }
      }, 400);
    }
    function showToast(msg) {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-6 right-6 glass px-5 py-3 rounded-xl text-sm font-medium text-white z-50 animate-fadeIn border border-purple-500/30';
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }
    function openABTest() { showToast('🧪 A/B test setup coming soon'); }
    // Animate generation progress
    const prog = document.getElementById('gen-progress');
    if(prog) {
      let w = 67;
      setInterval(() => { w = Math.min(100, w + 0.5); prog.style.width = w + '%'; }, 2000);
    }
  </script>
  `
  return c.html(shell('Creative Studio', content, '/creatives'))
}

function creativeStat(val: string, label: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400"></i>
    </div>
    <div><div class="text-2xl font-black text-white">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function creativeCard(name: string, type: string, ctr: number, status: string, campaign: string, platforms: string, starred: boolean, score: number): string {
  const typeColors: Record<string, string> = { video: 'purple', image: 'blue', ugc: 'pink', copy: 'emerald' }
  const typeIcons: Record<string, string> = { video: 'fa-video', image: 'fa-image', ugc: 'fa-user-check', copy: 'fa-pen' }
  const statusBadge = status === 'active' ? 'badge-live' : status === 'testing' ? 'badge-scaling' : 'badge-killed'
  const color = typeColors[type] || 'blue'
  const icon = typeIcons[type] || 'fa-image'
  const scoreColor = score >= 80 ? 'emerald' : score >= 50 ? 'amber' : 'red'
  const gradients: Record<string, string> = {
    video: 'from-purple-900 to-purple-800', image: 'from-blue-900 to-blue-800',
    ugc: 'from-pink-900 to-pink-800', copy: 'from-emerald-900 to-emerald-800'
  }
  return `<div class="glass rounded-xl overflow-hidden card-hover cursor-pointer creative-card">
    <!-- Thumbnail -->
    <div class="bg-gradient-to-br ${gradients[type] || 'from-slate-800 to-slate-700'} aspect-square relative flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400 text-3xl opacity-40"></i>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <!-- Overlay actions -->
      <div class="creative-overlay absolute inset-0 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm">
        <button class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
          <i class="fas fa-eye text-white text-xs"></i>
        </button>
        <button class="w-8 h-8 rounded-lg bg-brand-600 hover:bg-brand-500 flex items-center justify-center transition-all">
          <i class="fas fa-paper-plane text-white text-xs"></i>
        </button>
        <button class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
          <i class="fas fa-copy text-white text-xs"></i>
        </button>
      </div>
      <!-- Top badges -->
      <div class="absolute top-2 left-2 flex items-center gap-1">
        <span class="text-xs px-1.5 py-0.5 rounded-md bg-${color}-500/80 text-white font-semibold capitalize">${type}</span>
        ${starred ? '<span class="text-xs px-1.5 py-0.5 rounded-md bg-amber-500/80 text-white"><i class="fas fa-star text-xs"></i></span>' : ''}
      </div>
      <!-- CTR badge -->
      <div class="absolute top-2 right-2">
        <span class="text-xs px-1.5 py-0.5 rounded-md bg-black/60 text-${scoreColor}-400 font-bold">${ctr}% CTR</span>
      </div>
    </div>
    <!-- Info -->
    <div class="p-3">
      <div class="text-xs font-semibold text-slate-200 truncate mb-1">${name}</div>
      <div class="text-xs text-slate-500 truncate mb-2">${campaign}</div>
      <div class="flex items-center justify-between">
        <span class="${statusBadge} text-xs px-1.5 py-0.5 rounded-full font-semibold capitalize">${status}</span>
        <div class="flex items-center gap-1">
          <div class="w-12 progress-bar">
            <div class="progress-fill bg-${scoreColor}-500" style="width:${score}%"></div>
          </div>
          <span class="text-xs text-${scoreColor}-400">${score}</span>
        </div>
      </div>
    </div>
  </div>`
}

function abTestRow(name: string, varA: string, varB: string, ctrA: number, ctrB: number, conf: number, winner: string, color: string): string {
  const aWin = ctrA > ctrB
  return `<div class="glass rounded-xl p-4">
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-semibold text-white">${name}</span>
      <span class="text-xs px-2 py-1 rounded-full bg-${color}-500/20 text-${color}-400">${winner}</span>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="glass rounded-lg p-3 ${aWin ? 'border border-emerald-500/30' : ''}">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold text-slate-300">Variant A</span>
          ${aWin ? '<span class="text-xs text-emerald-400"><i class="fas fa-trophy"></i></span>' : ''}
        </div>
        <div class="text-xs text-slate-500 truncate mb-1">${varA}</div>
        <div class="text-lg font-bold ${aWin ? 'text-emerald-400' : 'text-slate-300'}">${ctrA}% CTR</div>
      </div>
      <div class="glass rounded-lg p-3 ${!aWin && winner !== 'Too early' ? 'border border-blue-500/30' : ''}">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold text-slate-300">Variant B</span>
          ${!aWin && winner !== 'Too early' ? '<span class="text-xs text-blue-400"><i class="fas fa-trophy"></i></span>' : ''}
        </div>
        <div class="text-xs text-slate-500 truncate mb-1">${varB}</div>
        <div class="text-lg font-bold ${!aWin && winner !== 'Too early' ? 'text-blue-400' : 'text-slate-300'}">${ctrB}% CTR</div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-3">
      <div class="flex items-center gap-2 flex-1">
        <span class="text-xs text-slate-500">Confidence:</span>
        <div class="progress-bar flex-1">
          <div class="progress-fill bg-gradient-to-r from-${color}-500 to-${color}-400" style="width:${conf}%"></div>
        </div>
        <span class="text-xs text-${color}-400">${conf}%</span>
      </div>
    </div>
  </div>`
}

function genTypeBtn(icon: string, label: string, color: string, active: boolean): string {
  return `<button onclick="document.querySelectorAll('.gen-type-btn').forEach(b=>b.classList.remove('active-gen')); this.classList.add('active-gen')" 
    class="gen-type-btn glass hover:bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2 transition-all ${active ? 'active-gen border-purple-500/50 bg-purple-500/10' : ''}">
    <i class="fas ${icon} text-${color}-400 text-lg"></i>
    <span class="text-xs text-slate-400">${label}</span>
  </button>`
}

function variantBtn(n: number, active: boolean = false): string {
  return `<button onclick="document.querySelectorAll('.var-btn').forEach(b=>b.classList.remove('bg-brand-600')); this.classList.add('bg-brand-600')"
    class="var-btn w-10 h-10 rounded-lg glass flex items-center justify-center text-sm font-bold transition-all ${active ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-white/10'}">${n}</button>`
}

function genToggle(label: string, checked: boolean): string {
  return `<div class="flex items-center justify-between py-1.5">
    <span class="text-xs text-slate-400">${label}</span>
    <button onclick="this.classList.toggle('bg-purple-600'); this.classList.toggle('bg-white/10'); this.querySelector('div').classList.toggle('translate-x-4')"
      class="w-9 h-5 rounded-full relative transition-all flex-shrink-0 ${checked ? 'bg-purple-600' : 'bg-white/10'}">
      <div class="w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 left-0.5 transition-all ${checked ? 'translate-x-4' : ''}"></div>
    </button>
  </div>`
}
