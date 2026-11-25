export function initLanding(signal) {
  if (signal.aborted) return;
  const observers = [];
  const timeouts = [];
  const intervals = [];
  const rafs = [];
  const IO = window.IntersectionObserver;
  const RO = window.ResizeObserver;
  const MO = window.MutationObserver;
  const IntersectionObserver = class extends IO {
    constructor(cb, opts) {
      super(cb, opts);
      observers.push(this);
    }
  };
  const ResizeObserver = class extends RO {
    constructor(cb) {
      super(cb);
      observers.push(this);
    }
  };
  const MutationObserver = class extends MO {
    constructor(cb) {
      super(cb);
      observers.push(this);
    }
  };
  const setTimeout = (fn, ms, ...args) => {
    const id = window.setTimeout(fn, ms, ...args);
    timeouts.push(id);
    return id;
  };
  const setInterval = (fn, ms, ...args) => {
    const id = window.setInterval(fn, ms, ...args);
    intervals.push(id);
    return id;
  };
  const clearTimeout = (id) => window.clearTimeout(id);
  const clearInterval = (id) => window.clearInterval(id);
  const requestAnimationFrame = (fn) => {
    const id = window.requestAnimationFrame((t) => {
      if (!signal.aborted) fn(t);
    });
    rafs.push(id);
    return id;
  };
  const listen = (target, type, fn, opts) => {
    target.addEventListener(type, fn, opts);
    signal.addEventListener(
      "abort",
      () => target.removeEventListener(type, fn, opts),
      { once: true },
    );
  };
  const resetDom = () => {
    document.querySelectorAll(".stub-note").forEach((n) => n.remove());
    for (const id of ["deptPlot", "deptTip", "attPlot", "attTip", "salLegend", "empLegend"]) {
      document.getElementById(id)?.replaceChildren();
    }
    for (const id of ["salSvg", "empSvg"]) {
      document.getElementById(id)?.replaceChildren();
    }
    const track = document.querySelector(".marq-track");
    if (track) {
      track.classList.remove("run");
      track.querySelectorAll(".marq-set").forEach((set, i) => {
        if (i > 0) set.remove();
      });
    }
    const dash = document.getElementById("dash");
    const scale = document.getElementById("dashScale");
    if (dash) dash.style.transform = "";
    if (scale) scale.style.height = "";
    document.getElementById("mobileMenu")?.classList.remove("open");
    document.getElementById("attMenu")?.classList.remove("open");
    document.querySelectorAll("main > section, body > footer").forEach((s) => s.classList.remove("in"));
  };
  const stop = () => {
    timeouts.forEach((id) => window.clearTimeout(id));
    intervals.forEach((id) => window.clearInterval(id));
    rafs.forEach((id) => window.cancelAnimationFrame(id));
    observers.forEach((o) => o.disconnect());
    resetDom();
  };
  signal.addEventListener("abort", stop, { once: true });


  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // nav state + mobile menu
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); listen(window, 'scroll', onScroll, {passive:true});
  const menuBtn = document.getElementById('menuBtn'), menu = document.getElementById('mobileMenu');
  listen(menuBtn, 'click', () => { const o = menu.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
  menu.querySelectorAll('a').forEach(a => listen(a, 'click', () => { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }));

  // in-page links: offsetTop ignores the fade-in transform, and hash jumps are unreliable in data: previews
  document.querySelectorAll('a[href^="#"]:not([data-stub])').forEach(a => {
    const id = a.getAttribute('href').slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    listen(a, 'click', e => {
      e.preventDefault();
      let y = 0;
      for (let n = target; n; n = n.offsetParent) y += n.offsetTop;
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      window.scrollTo({top: id === 'top' ? 0 : Math.max(0, y - pad), behavior: reduce ? 'auto' : 'smooth'});
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
      try { history.pushState(null, '', '#' + id); } catch {}
    });
  });

  // theme toggle: explicit choice on html[data-theme], otherwise follow the system
  const root = document.documentElement, darkMq = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : darkMq.matches;
  const syncTheme = () => {
    const d = isDark();
    document.querySelectorAll('[data-theme-toggle]').forEach(b => {
      b.setAttribute('aria-label', d ? 'Switch to light theme' : 'Switch to dark theme');
      const t = b.querySelector('span'); if (t) t.textContent = d ? 'Light mode' : 'Dark mode';
    });
  };
  document.querySelectorAll('[data-theme-toggle]').forEach(b => listen(b, 'click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('goxhr-theme', next); } catch {}
    syncTheme();
  }));
  if (darkMq.addEventListener) listen(darkMq, 'change', syncTheme);
  new MutationObserver(syncTheme).observe(root, {attributes: true, attributeFilter: ['data-theme']});
  syncTheme();

  // stubbed links (prototype honesty)
  const stubNote = document.createElement('div');
  stubNote.className = 'stub-note'; stubNote.setAttribute('role', 'status'); stubNote.hidden = true;
  document.body.appendChild(stubNote);
  let stubTimer;
  document.querySelectorAll('[data-stub]').forEach(el => listen(el, 'click', e => {
    e.preventDefault();
    stubNote.textContent = 'Prototype note: ' + el.dataset.stub;
    stubNote.hidden = false;
    clearTimeout(stubTimer); stubTimer = setTimeout(() => { stubNote.hidden = true; }, 4000);
  }));

  // ---------- HERO: interactive admin dashboard ----------
  const dash = document.getElementById('dash'), scaleBox = document.getElementById('dashScale');
  const W = 1440, H = 1186;
  function fit(){ const k = scaleBox.clientWidth / W; dash.style.transform = 'scale(' + k + ')'; scaleBox.style.height = (H * k) + 'px'; }
  fit(); if ('ResizeObserver' in window) new ResizeObserver(fit).observe(scaleBox); else listen(window, 'resize', fit);

  // sidebar: hover handled in CSS; click moves the active state
  document.querySelectorAll('#dNav a').forEach(a => listen(a, 'click', () => {
    document.querySelectorAll('#dNav a').forEach(x => x.classList.remove('on')); a.classList.add('on');
  }));

  // KPI count-up
  const kpis = [...dash.querySelectorAll('[data-count]')];
  const money = v => '₦' + v.toLocaleString('en-NG', {minimumFractionDigits:2, maximumFractionDigits:2});
  function countUp(){
    const t0 = performance.now(), d = 1400;
    (function f(now){
      const p = Math.min((now - t0) / d, 1), e = 1 - Math.pow(1 - p, 3);
      kpis.forEach(el => { const v = parseFloat(el.dataset.count) * e; el.textContent = el.hasAttribute('data-money') ? money(v) : Math.round(v); });
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }

  // helpers
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  function gridLines(plot, max, steps, fmt){
    plot.querySelectorAll('.d-gl').forEach(n => n.remove());
    for (let i = 0; i <= steps; i++){
      const g = el('div', 'd-gl', '<span>' + fmt(max / steps * i) + '</span>');
      g.style.top = (100 - i / steps * 100) + '%'; plot.prepend(g);
    }
  }
  const PH = 216; // plot height in canvas px

  // ----- department chart -----
  const DEPT = [
    {n:'Customer care', c:72, m:42, f:30}, {n:'Engineers', c:72, m:44, f:28},
    {n:'Marketing', c:48, m:22, f:26}, {n:'IT', c:28, m:16, f:12}, {n:'Creative', c:100, m:54, f:46}];
  const deptPlot = document.getElementById('deptPlot'), deptTip = document.getElementById('deptTip');
  const DMAX = 120;
  gridLines(deptPlot, DMAX, 4, v => v);
  const dGroups = el('div', 'd-groups'); deptPlot.appendChild(dGroups);
  const deptBars = [];
  DEPT.forEach((d, i) => {
    const g = el('div', 'd-g');
    [['c','#3E8E7B'],['m','#F6DFB0'],['f','#FFC9C9']].forEach(([k, col]) => { const b = el('div', 'd-b'); b.style.background = col; b.dataset.v = d[k]; g.appendChild(b); deptBars.push(b); });
    g.appendChild(el('label', '', d.n));
    listen(g, 'mouseenter', () => showDeptTip(i));
    dGroups.appendChild(g);
  });
  listen(dGroups, 'mouseleave', () => showDeptTip(2));
  function showDeptTip(i){
    const d = DEPT[i];
    deptTip.innerHTML = '<b>' + d.n + '</b><div><i style="background:#3E8E7B"></i>Count: ' + d.c + '</div><div><i style="background:#FFC9C9"></i>Female: ' + d.f + '</div><div><i style="background:#F6DFB0"></i>Male: ' + d.m + '</div>';
    const g = dGroups.children[i], card = deptTip.parentElement;
    const gx = deptPlot.offsetLeft + g.offsetLeft + g.offsetWidth / 2;
    const top = deptPlot.offsetTop + PH - d.c / DMAX * PH;
    const w = 168, left = Math.max(12, Math.min(card.clientWidth - w - 12, gx - w / 2));
    deptTip.style.width = w + 'px'; deptTip.style.left = left + 'px'; deptTip.style.top = Math.max(40, top - 138) + 'px';
    deptTip.style.setProperty('--ax', (gx - left) + 'px'); deptTip.classList.add('show');
  }

  // ----- attendance chart -----
  const ATT = {
    today:{label:'Today', head:'Today: Mon, 28 Sep', v:[304, 8, 268, 36, 22]},
    week:{label:'This week', head:'This week: 28 Sep to 2 Oct', v:[1502, 38, 1310, 192, 96]},
    month:{label:'This month', head:'September 2026', v:[6210, 190, 5480, 730, 402]}};
  const ANAMES = ['Present','Absent','Ontime','Late','Overtime'], ACOL = ['#A8DCC9','#FAD4D4','#3FAF8E','#FBE3C4','#D6DDF7'], ADOT = ['#A8DCC9','#F8C9C9','#3FAF8E','#F6DDB8','#D2D9F5'];
  const attPlot = document.getElementById('attPlot'), attTip = document.getElementById('attTip');
  const aGroups = el('div', 'd-groups'); attPlot.appendChild(aGroups);
  const attBars = ANAMES.map((n, i) => { const g = el('div', 'd-g'); const b = el('div', 'd-b'); b.style.background = ACOL[i]; g.appendChild(b); g.appendChild(el('label', '', n)); aGroups.appendChild(g); listen(g, 'mouseenter', () => showAttTip(i)); return b; });
  listen(aGroups, 'mouseleave', () => showAttTip(2));
  let attKey = 'today', AMAX = 400;
  const niceMax = m => { const p = Math.pow(10, Math.floor(Math.log10(m))); const steps = [1, 2, 2.5, 4, 5, 10]; for (const s of steps) if (s * p >= m) return s * p; return 10 * p; };
  const kfmt = v => v >= 1000 ? (v / 1000).toFixed(v % 1000 ? 1 : 0) + 'k' : Math.round(v);
  function setAtt(key, animate){
    attKey = key; const vals = ATT[key].v; AMAX = niceMax(Math.max(...vals) * 1.08);
    gridLines(attPlot, AMAX, 4, kfmt);
    attBars.forEach((b, i) => { b.dataset.v = vals[i]; if (animate !== false) b.style.height = (vals[i] / AMAX * PH) + 'px'; });
    document.getElementById('attSelLabel').textContent = ATT[key].label;
    if (attTip.classList.contains('show')) showAttTip(2);
  }
  function showAttTip(i){
    const vals = ATT[attKey].v;
    attTip.innerHTML = '<b>' + ATT[attKey].head + '</b>' + ANAMES.map((n, k) => '<div' + (k === i ? ' class="hl"' : '') + '><i style="background:' + ADOT[k] + '"></i>' + n + ': ' + vals[k].toLocaleString() + '</div>').join('');
    const g = aGroups.children[i], card = attTip.parentElement;
    const gx = attPlot.offsetLeft + g.offsetLeft + g.offsetWidth / 2;
    const top = attPlot.offsetTop + PH - vals[i] / AMAX * PH;
    const w = 150, left = Math.max(12, Math.min(card.clientWidth - w - 12, gx - w / 2));
    attTip.style.width = w + 'px'; attTip.style.left = left + 'px'; attTip.style.top = Math.max(44, top - 142) + 'px';
    attTip.style.setProperty('--ax', (gx - left) + 'px'); attTip.classList.add('show');
  }
  setAtt('today', false);
  const attSel = document.getElementById('attSel'), attMenu = document.getElementById('attMenu');
  listen(attSel, 'click', e => { e.stopPropagation(); const o = attMenu.classList.toggle('open'); attSel.setAttribute('aria-expanded', o); });
  attMenu.querySelectorAll('button').forEach(b => listen(b, 'click', () => {
    attMenu.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on');
    attMenu.classList.remove('open'); attSel.setAttribute('aria-expanded', false); setAtt(b.dataset.k);
  }));
  listen(document, 'click', () => { attMenu.classList.remove('open'); attSel.setAttribute('aria-expanded', false); });

  // ----- donuts -----
  const NS = 'http://www.w3.org/2000/svg';
  const pt = (cx, cy, r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
  function sector(cx, cy, r0, r1, a0, a1){
    if (a1 - a0 < .05) return '';
    const L = a1 - a0 > 180 ? 1 : 0, [x0, y0] = pt(cx, cy, r1, a0), [x1, y1] = pt(cx, cy, r1, a1), [x2, y2] = pt(cx, cy, r0, a1), [x3, y3] = pt(cx, cy, r0, a0);
    return `M${x0} ${y0}A${r1} ${r1} 0 ${L} 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 ${L} 0 ${x3} ${y3}Z`;
  }
  function donut(cfg){
    const svg = cfg.svg, segs = cfg.segs, total = segs.reduce((a, s) => a + s.v, 0);
    let a = 0; segs.forEach(s => { s.a0 = a; a += s.v / total * 360; s.a1 = a; });
    const gap = 3.2;
    segs.forEach((s, i) => {
      s.path = document.createElementNS(NS, 'path'); s.path.setAttribute('fill', s.col); s.path.setAttribute('stroke', s.col); s.path.setAttribute('stroke-width', '6'); s.path.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(s.path);
      // leader + label
      const la = s.la != null ? s.la : (s.a0 + s.a1) / 2, ro = s.r1 + 4;
      const [sx, sy] = pt(cfg.cx, cfg.cy, ro, la), [ex, ey] = pt(cfg.cx, cfg.cy, ro + 16, la);
      const dir = Math.sin(la * Math.PI / 180) >= 0 ? 1 : -1, hx = ex + dir * 26;
      const pl = document.createElementNS(NS, 'polyline'); pl.setAttribute('points', `${sx},${sy} ${ex},${ey} ${hx},${ey}`); pl.setAttribute('stroke', s.col); svg.appendChild(pl);
      s.label.forEach((txt, k) => {
        const t = document.createElementNS(NS, 'text'); t.setAttribute('x', hx + dir * 6); t.setAttribute('y', ey + 4 + (k - (s.label.length - 1) / 2) * 18 - (s.label.length > 1 ? 8 : 0));
        t.setAttribute('text-anchor', dir > 0 ? 'start' : 'end'); t.setAttribute('font-size', cfg.lfs); t.setAttribute('fill', '#44524D'); t.textContent = txt; svg.appendChild(t);
      });
      listen(s.path, 'mouseenter', () => cfg.hover(i)); listen(s.path, 'mouseleave', () => cfg.hover(-1));
    });
    const c1 = document.createElementNS(NS, 'text'), c2 = document.createElementNS(NS, 'text');
    [c1, c2].forEach(t => { t.setAttribute('x', cfg.cx); t.setAttribute('text-anchor', 'middle'); svg.appendChild(t); });
    c1.setAttribute('y', cfg.cy - cfg.c1dy); c1.setAttribute('font-size', cfg.c1fs); c1.setAttribute('fill', '#7A8782');
    c2.setAttribute('y', cfg.cy + cfg.c2dy); c2.setAttribute('font-size', cfg.c2fs); c2.setAttribute('font-weight', '600'); c2.setAttribute('fill', '#1A2A25');
    cfg.setCenter = (a, b) => { c1.textContent = a; c2.textContent = b; };
    cfg.setCenter(cfg.center[0], cfg.center[1]);
    cfg.draw = sweep => segs.forEach(s => s.path.setAttribute('d', sector(cfg.cx, cfg.cy, s.r0, s.r1, s.a0 + gap / 2, Math.min(s.a1 - gap / 2, sweep))));
    cfg.draw(0);
    return cfg;
  }
  function wireHover(cfg, rows){
    cfg.hover = i => {
      cfg.svg.classList.toggle('hov', i >= 0);
      cfg.segs.forEach((s, k) => {
        const on = k === i; s.path.classList.toggle('hl', on); if (rows[k]) rows[k].classList.toggle('hl', on);
        const m = (s.a0 + s.a1) / 2 * Math.PI / 180; s.path.style.transform = on ? `translate(${Math.sin(m) * 6}px,${-Math.cos(m) * 6}px)` : '';
      });
      if (i < 0) cfg.setCenter(cfg.center[0], cfg.center[1]); else cfg.setCenter(cfg.segs[i].c[0], cfg.segs[i].c[1]);
    };
    rows.forEach((r, k) => { listen(r, 'mouseenter', () => cfg.hover(k)); listen(r, 'mouseleave', () => cfg.hover(-1)); });
  }

  const SAL = [
    {v:50, col:'#3E8E7B', r0:54, r1:106, label:['50%'], la:40, n:'160 Employees', rng:'(30,000 - 100,000)'},
    {v:10, col:'#1F5847', r0:54, r1:100, label:['10%'], n:'32 Employees', rng:'(600,000 - Above)'},
    {v:30, col:'#EDB85C', r0:54, r1:100, label:['30%'], n:'96 Employees', rng:'(150,000 - 300,000)'},
    {v:10, col:'#FF8A80', r0:54, r1:100, label:['10%'], n:'32 Employees', rng:'(350,000 - 600,000)'}];
  SAL.forEach(s => s.c = [s.v + '% of staff', s.n.replace(' Employees', ' employees')]);
  const salLegend = document.getElementById('salLegend');
  const salOrder = [0, 2, 3, 1];
  const salRows = [];
  salOrder.forEach(k => { const s = SAL[k]; const r = el('div', '', '<i style="background:' + s.col + '"></i><b>' + s.v + '%</b><span>' + s.n + '</span><span>' + s.rng + '</span>'); salLegend.appendChild(r); salRows[k] = r; });
  const salCfg = {svg:document.getElementById('salSvg'), cx:208, cy:122, segs:SAL, lfs:12, center:['Total salary (NGN)', '28,490,000'], c1dy:8, c1fs:10.5, c2dy:14, c2fs:16};
  salCfg.hover = () => {}; donut(salCfg); wireHover(salCfg, salRows);

  const EMP = [
    {v:160, col:'#3E8E7B', r0:70, r1:146, label:['Full Time Staff', '160 employees'], la:40},
    {v:45, col:'#1F5847', r0:78, r1:128, label:['Internship', '45 employees'], la:212},
    {v:70, col:'#EDB85C', r0:78, r1:128, label:['Part-time', '70 employees'], la:283},
    {v:45, col:'#FF8A80', r0:78, r1:128, label:['Contract Staff', '45 employees'], la:328}];
  EMP.forEach(s => s.c = [s.label[0], String(s.v)]);
  const empLegend = document.getElementById('empLegend'), empRows = [];
  [3, 0, 2, 1].forEach(k => { const s = EMP[k]; const pc = Math.round(s.v / 320 * 100); const li = el('li', '', '<i style="background:' + s.col + '"></i><b>' + pc + '%</b>' + (['Full Time Staff','Internship','Part Time','Contract Staff'][k])); empLegend.appendChild(li); empRows[k] = li; });
  const empCfg = {svg:document.getElementById('empSvg'), cx:258, cy:190, segs:EMP, lfs:12.5, center:['Total Staff', '320'], c1dy:18, c1fs:13, c2dy:28, c2fs:38};
  empCfg.hover = () => {}; donut(empCfg); wireHover(empCfg, empRows);

  // ----- entrance: one orchestrated sequence when the dashboard comes into view -----
  function grow(){
    deptBars.forEach((b, i) => { b.style.transitionDelay = (Math.floor(i / 3) * 70) + 'ms'; b.style.height = (b.dataset.v / DMAX * PH) + 'px'; });
    attBars.forEach((b, i) => { b.style.transitionDelay = (i * 70) + 'ms'; b.style.height = (b.dataset.v / AMAX * PH) + 'px'; });
    setTimeout(() => { deptBars.concat(attBars).forEach(b => b.style.transitionDelay = '0ms'); showDeptTip(2); showAttTip(2); }, 1100);
    const t0 = performance.now(), d = 1300;
    (function f(now){ const p = Math.min((now - t0) / d, 1), e = 1 - Math.pow(1 - p, 3); salCfg.draw(360 * e); empCfg.draw(360 * e); if (p < 1) requestAnimationFrame(f); })(t0);
    countUp();
  }
  if (reduce) {
    deptBars.forEach(b => b.style.height = (b.dataset.v / DMAX * PH) + 'px');
    attBars.forEach(b => b.style.height = (b.dataset.v / AMAX * PH) + 'px');
    salCfg.draw(360); empCfg.draw(360); showDeptTip(2); showAttTip(2);
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); setTimeout(grow, 250); } }, {threshold:.2});
    io.observe(scaleBox);
  } else grow();

  // ---------- section fade-in ----------
  if (document.documentElement.classList.contains('fx')) {
    const secIO = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); secIO.unobserve(e.target); }
    }), {rootMargin:'0px 0px -10% 0px'});
    document.querySelectorAll('main > section, body > footer').forEach(s => secIO.observe(s));
  }

  // ---------- logo marquee (4 identical sets, track shifts by one set) ----------
  const marqTrack = document.querySelector('.marq-track');
  if (marqTrack && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const set = marqTrack.querySelector('.marq-set');
    for (let i = 0; i < 3; i++) {
      const c = set.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.querySelectorAll('img').forEach(im => im.alt = '');
      marqTrack.appendChild(c);
    }
    marqTrack.classList.add('run');
  }

  // ---------- employee app phone ----------
  const appScr = document.querySelector('.app-scr');
  if (appScr) {
    const homeHot = appScr.querySelector('.app-home-hot');
    const showScreen = name => {
      appScr.querySelectorAll('.app-img').forEach(im => {
        const on = im.dataset.screen === name;
        im.classList.toggle('on', on);
        if (on) im.removeAttribute('aria-hidden'); else im.setAttribute('aria-hidden', 'true');
      });
      appScr.querySelectorAll('.app-tab').forEach(t => {
        if (t.dataset.go === name) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
      });
      document.querySelectorAll('.selfserve .ss').forEach(b => b.setAttribute('aria-pressed', b.dataset.go === name));
      homeHot.hidden = name !== 'home';
    };
    document.querySelectorAll('.app-hot, .selfserve .ss').forEach(b => listen(b, 'click', () => showScreen(b.dataset.go)));
  }

  // ---------- setup steps: rows complete one by one, progress line tracks them ----------
  const setup = document.querySelector('.setup');
  if (setup) {
    const STEP_MS = 900;
    const items = [...setup.querySelectorAll('.setup-item')];
    const sets = [...setup.querySelectorAll('.routine-set')];
    let timer = null;
    const finish = cap => { cap.textContent = 'Done'; cap.className = 'cap-state is-done'; };
    const play = (i, animate) => {
      clearInterval(timer);
      items.forEach((it, k) => {
        it.classList.toggle('on', k === i);
        it.querySelector('.setup-btn').setAttribute('aria-expanded', k === i);
        const p = it.querySelector('.setup-prog'); p.style.transition = 'none'; p.style.width = '0';
      });
      sets.forEach((st, k) => st.hidden = k !== i);
      const rows = [...sets[i].querySelectorAll('.rrow')], cap = sets[i].querySelector('.cap-state');
      const prog = items[i].querySelector('.setup-prog');
      if (!animate) { rows.forEach(r => r.className = 'rrow done'); finish(cap); prog.style.width = '100%'; return; }
      rows.forEach(r => r.className = 'rrow');
      cap.textContent = 'Running'; cap.className = 'cap-state shim';
      void prog.offsetWidth;
      prog.style.transition = 'width ' + (rows.length * STEP_MS) + 'ms linear'; prog.style.width = '100%';
      let n = 0;
      const tick = () => {
        if (n > 0) rows[n - 1].className = 'rrow done';
        if (n < rows.length) rows[n++].className = 'rrow run';
        else { clearInterval(timer); finish(cap); }
      };
      tick(); timer = setInterval(tick, STEP_MS);
    };
    items.forEach((it, k) => listen(it.querySelector('.setup-btn'), 'click', () => play(k, !reduce)));
    if (reduce || !('IntersectionObserver' in window)) play(0, false);
    else {
      const sio = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { sio.disconnect(); play(0, true); } }, {threshold: .35});
      sio.observe(setup.querySelector('.setup-stage'));
    }
  }

  // ---------- operations tabs ----------
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function select(t){
    tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; const p = document.getElementById(x.getAttribute('aria-controls')); p.hidden = !on; p.classList.toggle('on', on); });
    t.focus();
  }
  tabs.forEach((t, i) => {
    listen(t, 'click', () => select(t));
    listen(t, 'keydown', e => {
      if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length]);
      if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length]);
    });
  });

  // leave approvals in the tab
  const left = document.getElementById('leaveLeft');
  document.querySelectorAll('#p-leave .act').forEach(act => {
    listen(act, 'click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const ok = b.classList.contains('yes');
      act.innerHTML = ok ? '<span class="tag tag-green">Approved</span>' : '<span class="tag tag-coral">Declined</span>';
      const n = document.querySelectorAll('#p-leave .act button.yes').length;
      left.textContent = n ? n + ' waiting' : 'All caught up';
      left.className = n ? 'tag tag-grey' : 'tag tag-green';
    });
  });

  // demo form (stub) — only present when the page still uses an inline booking form
  const form = document.getElementById('demoForm'), msg = document.getElementById('formMsg');
  if (form && msg) {
    listen(form, 'submit', e => {
      e.preventDefault();
      const name = form.name.value.trim(), email = form.email.value.trim();
      if (!name || !/^\S+@\S+\.\S+$/.test(email)) { msg.textContent = 'Enter your name and a valid work email to book a demo.'; msg.style.background = 'var(--coral-50)'; msg.style.color = 'var(--coral)'; msg.classList.add('show'); return; }
      msg.style.background = ''; msg.style.color = '';
      msg.textContent = 'Thanks, ' + name.split(' ')[0] + '. In the live site, this books your demo and emails ' + email + '. This prototype does not send anything yet.';
      msg.classList.add('show');
    });
  }

}
