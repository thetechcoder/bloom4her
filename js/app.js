/* Bloom UI. Vanilla JS, hash routing, event delegation. */
(function () {
  var E = window.BloomEngine;
  var DIMS = window.BLOOM_DIMS, QS = window.BLOOM_QUESTIONS, SECT = window.BLOOM_SECTIONS;
  var MODS = window.BLOOM_MODULES, PARTS = window.BLOOM_PARTS, DAILY = window.BLOOM_DAILY;
  var SEASONS = window.BLOOM_SEASONS;
  var app = document.getElementById('app');

  var ui = { qi: 0, answers: {}, deferredInstall: null, retake: false, unlocked: false, lockMode: null, hiddenAt: 0, lockMsg: '' };
  var LK = window.BloomLock;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function modById(id) { return MODS.filter(function (m) { return m.id === id; })[0]; }
  function dimById(id) { return DIMS.filter(function (d) { return d.id === id; })[0]; }
  function hexToRgb(h) { h = h.replace('#', ''); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function mix(a, b, t) {
    var A = hexToRgb(a), B = hexToRgb(b);
    return 'rgb(' + A.map(function (v, i) { return Math.round(v + (B[i] - v) * t); }).join(',') + ')';
  }
  function greeting() {
    var h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  }
  function band(score) {
    if (score === null) return { label: 'Not applicable', note: 'Left out of your score.' };
    if (score >= 75) return { label: 'Strong', note: 'Beautiful. Keep it consistent.' };
    if (score >= 50) return { label: 'Solid base', note: 'A few upgrades will lift this.' };
    if (score >= 25) return { label: 'Room to grow', note: 'Great place to focus next.' };
    return { label: 'Fresh start', note: 'Every point from here is progress.' };
  }
  var ICON = {
    home:  '<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    learn: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/><path d="M9 7h6"/></svg>',
    daily: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/></svg>',
    me:    '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
    products: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>',
    lock:  '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>',
    back:  '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>'
  };

  /* ---------- the Hygiene-o-meter flower ---------- */
  function flower(scores, centerText, k) {
    k = (k === undefined) ? 1 : k;
    var C = 150, OFF = 17, GH = 54, MINH = 14, RX = 21, out = '';
    out += '<svg viewBox="0 0 300 300" class="flower" role="img" aria-label="Hygiene-o-meter: ' + esc(centerText) + ' out of 100">';
    // ghost petals + labels
    DIMS.forEach(function (d, i) {
      var a = i * 60;
      out += '<ellipse cx="' + C + '" cy="' + (C - OFF - GH) + '" rx="' + RX + '" ry="' + GH +
             '" fill="none" stroke="#7B1E3C" stroke-opacity=".22" stroke-width="1.2" stroke-dasharray="3 4" transform="rotate(' + a + ' ' + C + ' ' + C + ')"/>';
    });
    DIMS.forEach(function (d, i) {
      var s = scores[i];
      if (s === null || s === undefined) return;
      var t = Math.max(0, Math.min(1, s / 100)) * k;
      var ry = MINH * k + (GH - MINH) * t;
      var fill = mix('#E7BCC2', '#7B1E3C', t);
      out += '<ellipse cx="' + C + '" cy="' + (C - OFF - ry) + '" rx="' + RX + '" ry="' + ry.toFixed(2) +
             '" fill="' + fill + '" fill-opacity=".92" transform="rotate(' + (i * 60) + ' ' + C + ' ' + C + ')"/>';
    });
    // labels
    DIMS.forEach(function (d, i) {
      var ang = i * 60 * Math.PI / 180, R = 133;
      var x = C + R * Math.sin(ang), y = C - R * Math.cos(ang);
      var anchor = Math.abs(Math.sin(ang)) < 0.2 ? 'middle' : (Math.sin(ang) > 0 ? 'start' : 'end');
      var dx = anchor === 'start' ? -10 : anchor === 'end' ? 10 : 0;
      var dy = Math.cos(ang) > 0.2 ? 14 : (Math.cos(ang) < -0.2 ? -2 : 5);
      out += '<text x="' + (x + dx).toFixed(1) + '" y="' + (y + dy).toFixed(1) + '" text-anchor="' + anchor + '" class="flabel">' + esc(d.short) + '</text>';
    });
    out += '<circle cx="' + C + '" cy="' + C + '" r="27" fill="#FBF5F3"/>' +
           '<text x="' + C + '" y="' + (C + 9) + '" text-anchor="middle" class="fscore">' + esc(centerText) + '</text></svg>';
    return out;
  }

  function tweenFlower(el, scores, finalScore, delay) {
    if (!el) return;
    if (reduceMotion) { el.innerHTML = flower(scores, String(finalScore), 1); return; }
    var start = null, dur = 1100;
    el.innerHTML = flower(scores, '0', 0);
    function step(ts) {
      if (!el.isConnected) return;
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = flower(scores, String(Math.round(finalScore * eased)), eased);
      if (p < 1) requestAnimationFrame(step);
    }
    setTimeout(function () { requestAnimationFrame(step); }, delay || 150);
  }

  /* ---------- shared fragments ---------- */
  function nav(active) {
    var items = [['home', 'Home'], ['learn', 'Learn'], ['products', 'Products'], ['daily', 'Daily'], ['me', 'My Meter']];
    return '<nav class="tabbar" aria-label="Main">' + items.map(function (it) {
      return '<a href="#/' + it[0] + '" class="tab' + (active === it[0] ? ' on' : '') + '"' + (active === it[0] ? ' aria-current="page"' : '') + '>' +
             ICON[it[0] === 'me' ? 'me' : it[0]] + '<span>' + it[1] + '</span></a>';
    }).join('') + '</nav>';
  }
  function topbar(title) {
    return '<header class="topbar"><img src="icons/mark.svg" alt="" class="mark"><span class="brand">Bloom</span>' +
           (title ? '<span class="topsub">' + esc(title) + '</span>' : '') + '</header>';
  }
  function dimBars(showNote) {
    return '<div class="bars">' + DIMS.map(function (d) {
      var s = E.dimScore(d.id), b = band(s);
      var w = s === null ? 0 : s;
      return '<div class="bar-row"><div class="bar-head"><span class="bar-name">' + esc(d.name) + '</span>' +
             '<span class="bar-val">' + (s === null ? '—' : s) + '</span></div>' +
             '<div class="bar"><i style="width:' + w + '%"></i></div>' +
             '<div class="bar-note">' + esc(b.label) + (showNote ? ' · ' + esc(d.blurb) : '') + '</div></div>';
    }).join('') + '</div>';
  }
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg; t.setAttribute('role', 'status');
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 2600);
  }

  /* ---------- views ---------- */
  function viewWelcome() {
    var st = E.state;
    return '<main class="screen welcome">' +
      '<img src="icons/icon.svg" alt="Bloom logo" class="logo-big">' +
      '<h1>Bloom</h1>' +
      '<p class="tagline">Your complete hygiene guide, from the basics to the top.</p>' +
      '<div class="card soft"><h3>Meet your Hygiene-o-meter</h3>' +
      '<p>A short, private check-up sets your starting point. Then every lesson, quiz and daily habit makes your bloom grow. Six petals, six parts of your life, one score.</p></div>' +
      '<label class="field"><span>What should we call you? <em>(optional)</em></span>' +
      '<input id="nameInput" type="text" maxlength="30" autocomplete="given-name" placeholder="Your first name" value="' + esc(st.name) + '"></label>' +
      '<button class="btn primary" data-action="begin">Begin my check-up</button>' +
      '<p class="fine">For adults, 20 and over. Written for women in Nigeria and the tropics.<br>Educational only, not a substitute for a doctor or nurse.<br>Your answers stay on this phone.</p>' +
      '<p class="fine"><a class="link" href="#/care">Find care</a> · <a class="link" href="#/cheatsheet">Pocket guide</a></p>' +
      '</main>';
  }

  function viewCheckup() {
    var q = QS[ui.qi], total = QS.length;
    var prevDim = ui.qi > 0 ? QS[ui.qi - 1].dim : null;
    var isFirstOfSection = q.dim !== prevDim;
    var picked = ui.answers[q.id];
    var has = picked !== undefined;
    var o = has ? q.opts[picked] : null;
    var sec = SECT[q.dim];
    var h = '<main class="screen checkup">' +
      '<div class="cu-top"><button class="iconbtn" data-action="cu-back" aria-label="Back">' + ICON.back + '</button>' +
      '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + (ui.qi + (has ? 1 : 0)) + '"><i style="width:' + ((ui.qi + (has ? 1 : 0)) / total * 100) + '%"></i></div>' +
      '<span class="count">' + (ui.qi + 1) + '/' + total + '</span></div>';
    h += '<div class="sect-tag">' + esc(sec.title) + '</div>';
    if (isFirstOfSection) h += '<p class="sect-intro">' + esc(sec.intro) + '</p>';
    h += '<h2 class="question">' + esc(q.q) + '</h2><div class="opts">';
    q.opts.forEach(function (op, i) {
      h += '<button class="opt' + (picked === i ? ' sel' : '') + (op.na ? ' na' : '') + '" data-action="pick" data-i="' + i + '"' + (has ? ' aria-pressed="' + (picked === i) + '"' : '') + '>' +
           '<span class="dot"></span><span>' + esc(op.t) + '</span></button>';
    });
    h += '</div>';
    if (has) {
      var head, cls = 'fb';
      if (o.na) { head = 'No problem, skipped.'; cls += ' neutral'; }
      else if (o.p >= 3) head = 'Lovely habit.';
      else if (o.p === 2) head = 'Nearly there.';
      else head = 'Room to grow. No judgement.';
      h += '<div class="' + cls + '"><strong>' + head + '</strong><p>' + esc(q.tip) + '</p></div>' +
           '<button class="btn primary" data-action="cu-next">' + (ui.qi === total - 1 ? 'See my Hygiene-o-meter' : 'Continue') + '</button>';
    }
    return h + '</main>';
  }

  function viewResults() {
    var score = E.overall(), lv = E.level(score), first = E.state.history.length <= 1;
    var w = E.weakest(), s = E.strongest();
    var h = '<main class="screen results">' +
      '<p class="eyebrow">' + (first ? 'Your starting point' : 'Your new check-up') + '</p>' +
      '<div class="flower-wrap" id="flowerMount"></div>' +
      '<div class="reveal"><div class="lvl-name">' + esc(lv.name) + '</div><p class="lvl-blurb">' + esc(lv.blurb) + '</p></div>' +
      '<div class="card"><h3>Your six petals</h3>' + dimBars(false) + '</div>';
    if (w && s) {
      h += '<div class="card soft"><p><strong>Strongest:</strong> ' + esc(s.dim.name) + ' (' + s.score + ')<br><strong>Focus next:</strong> ' + esc(w.dim.name) + ' (' + w.score + ')</p></div>';
    }
    h += '<p class="fine">This isn’t a grade. It’s a starting point. Your score grows with lessons, quizzes and daily habits.</p>' +
         '<button class="btn primary" data-action="to-home">Start my journey</button></main>';
    return h;
  }

  function isStandalone() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  }
  function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function installBanner() {
    if (isStandalone() || E.state.installDismissed) return '';
    if (ui.deferredInstall) {
      return '<section class="card install-banner"><div><div class="eyebrow">Install Bloom</div><p>Add Bloom to your home screen to open it like an app, even offline.</p></div>' +
        '<div class="ib-actions"><button class="btn small" data-action="install">Install</button><button class="linkbtn" data-action="install-dismiss">Not now</button></div></section>';
    }
    if (isIOS()) {
      return '<section class="card install-banner"><div><div class="eyebrow">Add to Home Screen</div><p>In Safari, tap the <strong>Share</strong> button, then <strong>Add to Home Screen</strong>. Bloom will open like an app.</p></div>' +
        '<div class="ib-actions"><button class="linkbtn" data-action="install-dismiss">Got it</button></div></section>';
    }
    return '';
  }

  function viewHome() {
    var st = E.state, score = E.overall(), lv = E.level(score), w = E.weakest();
    var se = E.season(), seInfo = SEASONS[se];
    var done = E.dayDone(E.dateKey()).length, strk = E.streak(), dTotal = E.dailyList().length;
    var pct = Math.round(lv.progress * 100);
    var h = topbar() + '<main class="screen home">' +
      '<p class="hello">' + greeting() + (st.name ? ', ' + esc(st.name) : '') + '</p>' +
      '<section class="card hero"><div class="flower-wrap" id="flowerMount"></div>' +
      '<div class="lvl-row"><span class="lvl-pill">' + esc(lv.name) + '</span><span class="lvl-score">' + score + '<small>/100</small></span></div>' +
      '<div class="progress thin"><i style="width:' + pct + '%"></i></div>' +
      '<p class="muted">' + (lv.next ? lv.toNext + ' point' + (lv.toNext === 1 ? '' : 's') + ' to ' + esc(lv.next) : 'You’ve reached the top level. Keep it blooming.') + '</p></section>';
    if (w) {
      var fm = MODS.filter(function (x) { return x.dim === w.dim.id && x.available && !E.state.modules[x.id]; })[0];
      h += '<section class="card focus"><div class="eyebrow">Focus next</div><h3>' + esc(w.dim.name) + ' <span class="muted">· ' + w.score + '</span></h3><p>' + esc(w.dim.blurb) + '.' +
           (fm ? '' : ' More lessons for this petal are on the way.') + '</p>' +
           (fm ? '<a class="link" href="#/module/' + fm.id + '">Start: ' + esc(fm.title) + ' →</a>' : '<a class="link" href="#/learn">See the guide →</a>') + '</section>';
    }
    h += installBanner();
    var due = E.shelfDue();
    if (due.length) h += '<section class="card daily-teaser"><div><div class="eyebrow">Shelf check</div><p><strong>' + due.length + ' thing' + (due.length === 1 ? '' : 's') + '</strong> due for replacing or washing</p></div><a class="btn small" href="#/shelf">Open shelf</a></section>';
    h += '<section class="card quick"><a class="btn ghost" href="#/care">Find care</a><a class="btn ghost" href="#/cheatsheet">Pocket guide</a><a class="btn ghost" href="#/badges">Badges</a></section>' +
         '<section class="card tip"><div class="eyebrow">Today’s tip · ' + esc(seInfo.label) + '</div><p>' + esc(E.tipOfDay()) + '</p></section>' +
         '<section class="card daily-teaser"><div><div class="eyebrow">Daily glow</div><p><strong>' + done + ' of ' + dTotal + '</strong> done today' + (strk ? ' · 🔥 ' + strk + '-day streak' : '') + '</p></div>' +
         '<a class="btn small" href="#/daily">Check in</a></section></main>' + nav('home');
    return h;
  }

  function viewLearn() {
    var h = topbar('Learn') + '<main class="screen learn"><h2 class="page-title">The guide</h2>' +
      '<p class="muted">12 modules in 4 parts. Each one ends with real-life scenarios that grow your petals.</p>';
    PARTS.forEach(function (p) {
      h += '<h3 class="part">' + esc(p.title) + '</h3>';
      MODS.filter(function (m) { return m.part === p.id; }).forEach(function (m) {
        var dim = DIMS.filter(function (d) { return d.id === m.dim; })[0];
        var done = E.state.modules[m.id];
        h += '<button class="mod' + (m.available ? '' : ' locked') + '" data-action="open-mod" data-id="' + m.id + '">' +
             '<span class="mod-n">' + m.n + '</span><span class="mod-body"><span class="mod-title">' + esc(m.title) + '</span>' +
             '<span class="mod-blurb">' + esc(m.blurb) + '</span>' +
             '<span class="mod-tags"><span class="tag">' + esc(dim.short) + ' petal</span>' +
             (done ? '<span class="tag ok">Done · ' + done.best + '%</span>' : (m.available ? '<span class="tag go">Start</span>' : '<span class="tag soon">Coming soon</span>')) + '</span></span>' +
             '<span class="mod-ic">' + (m.available ? '' : ICON.lock) + '</span></button>';
      });
    });
    return h + '</main>' + nav('learn');
  }

  function viewDaily() {
    var key = E.dateKey(), items = E.dayDone(key), strk = E.streak(), days = E.last14();
    var list = E.dailyList(), total = list.length, custom = !!E.routineSteps(), RT = window.BLOOM_ROUTINE;
    var h = topbar('Daily glow') + '<main class="screen daily"><h2 class="page-title">Today’s check-in</h2>' +
      '<p class="muted">Tick what you’ve done. Consistency over 14 days adds up to 10% of every petal.</p>' +
      '<div class="streak card"><div class="streak-n">' + strk + '</div><div><strong>day streak</strong><div class="muted">A streak day needs ' + E.streakNeed() + ' or more ticks.</div></div></div>';
    function checkBtn(it, on, act) {
      return '<button class="check' + (on ? ' on' : '') + '" role="checkbox" aria-checked="' + on + '" data-action="' + act + '" data-id="' + it.id + '"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span>' + esc(it.t) + '</span></button>';
    }
    if (custom) {
      RT.blocks.forEach(function (bk) {
        if (bk.id === 'weekly') return;
        var li = list.filter(function (x) { return x.block === bk.id; });
        if (!li.length) return;
        h += '<h3 class="part">' + esc(bk.label) + '</h3><div class="checks">';
        li.forEach(function (it) { h += checkBtn(it, items.indexOf(it.id) >= 0, 'toggle'); });
        h += '</div>';
      });
      var wl = E.weeklyList(), wd = E.weeklyDone();
      if (wl.length) {
        h += '<h3 class="part">This week</h3><p class="fine left">Weekly jobs reset every Monday and don’t count towards your score.</p><div class="checks">';
        wl.forEach(function (it) { h += checkBtn(it, wd.indexOf(it.id) >= 0, 'toggle-weekly'); });
        h += '</div>';
      }
    } else {
      h += '<div class="checks">';
      list.forEach(function (it) { h += checkBtn(it, items.indexOf(it.id) >= 0, 'toggle'); });
      h += '</div>';
    }
    h += '<a class="btn ghost" href="#/routine">' + (custom ? 'Edit my routine' : 'Build my own routine') + '</a>';
    h += '<h3 class="part">Last 14 days</h3><div class="dots">';
    days.forEach(function (d) {
      var r = d.count / total, lvl = d.count === 0 ? 0 : r < 0.5 ? 1 : r < 1 ? 2 : 3;
      h += '<span class="d l' + lvl + (d.today ? ' today' : '') + '" title="' + d.key + ': ' + d.count + '/' + total + '"></span>';
    });
    return h + '</div></main>' + nav('daily');
  }

  function viewRoutine() {
    var RT = window.BLOOM_ROUTINE, active = E.routineSteps(), cur = active || E.presetSteps('essentials');
    var dCount = cur.filter(function (x) { return x.block !== 'weekly'; }).length;
    var h = '<main class="screen routine"><div class="cu-top"><a class="iconbtn" href="#/daily" aria-label="Back">' + ICON.back + '</a><h2 class="page-title rt-title">My routine</h2></div>' +
      '<p class="muted">Pick the steps that fit your life. Your Daily glow list, streak and consistency score follow your choices. ' + (active ? '' : 'You’re using the Essentials for now.') + '</p>' +
      '<h3 class="part">Start from a preset</h3><div class="chips">';
    RT.presets.forEach(function (p) { h += '<button class="chip" data-action="rt-preset" data-id="' + p.id + '"><strong>' + esc(p.label) + '</strong><small>' + esc(p.note) + '</small></button>'; });
    h += '</div>';
    RT.blocks.forEach(function (bk) {
      h += '<h3 class="part">' + esc(bk.label) + '</h3><p class="fine left">' + esc(bk.hint) + '</p><div class="checks">';
      RT.steps.filter(function (x) { return x.block === bk.id; }).forEach(function (it) {
        var on = cur.some(function (x) { return x.id === it.id; });
        h += '<button class="check' + (on ? ' on' : '') + '" role="checkbox" aria-checked="' + on + '" data-action="rt-toggle" data-id="' + it.id + '"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span>' + esc(it.t) + '</span></button>';
      });
      cur.filter(function (x) { return x.custom && x.block === bk.id; }).forEach(function (it) {
        h += '<div class="check on custom"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span>' + esc(it.t) + '</span><button class="linkbtn" data-action="rt-remove" data-id="' + it.id + '" aria-label="Remove ' + esc(it.t) + '">Remove</button></div>';
      });
      h += '</div>';
    });
    h += '<section class="card"><h3>Add your own step</h3><label class="field"><input id="rtText" type="text" maxlength="80" placeholder="e.g. Oil my scalp"></label>' +
      '<label class="field"><select id="rtBlock">' + RT.blocks.map(function (b) { return '<option value="' + b.id + '">' + esc(b.label) + '</option>'; }).join('') + '</select></label>' +
      '<button class="btn ghost" data-action="rt-add">Add step</button></section>' +
      (dCount < 3 ? '<p class="fine">Tip: 3 or more daily steps makes streaks more meaningful.</p>' : '') +
      '<button class="btn ghost" data-action="rt-reset">Reset to the default five</button></main>' + nav('daily');
    return h;
  }

  function viewMe() {
    var st = E.state, score = E.overall(), lv = E.level(score), first = E.firstScore();
    var weights = E.weights;
    var h = topbar('My Meter') + '<main class="screen me">' +
      '<h2 class="page-title">My Hygiene-o-meter</h2>' +
      '<section class="card"><div class="lvl-row"><span class="lvl-pill">' + esc(lv.name) + '</span><span class="lvl-score">' + score + '<small>/100</small></span></div>' +
      (first !== null ? '<p class="muted">Started at ' + first + (score > first ? ' · up ' + (score - first) + ' points 🌸' : '') + '</p>' : '') +
      dimBars(true) +
      '<p class="fine left">How scores work: ' + Math.round(weights.base * 100) + '% your check-up, ' + Math.round(weights.mod * 100) + '% lessons and quizzes, ' + Math.round(weights.cons * 100) + '% daily consistency. Home &amp; Clothing also counts how fresh your shelf is. More lessons unlock as modules arrive.</p></section>' +
      '<section class="card"><h3>Badges &amp; certificate</h3><p class="muted">' + Object.keys(E.badges()).length + ' of ' + window.BLOOM_BADGES.length + ' badges earned.</p><a class="btn ghost" href="#/badges">See my badges</a></section>' +
      '<section class="card"><h3>Help &amp; pocket guide</h3><p class="muted">Where to get care, and a one-page guide to print or share.</p><a class="btn ghost" href="#/care">Find care</a><a class="btn ghost" href="#/cheatsheet">Pocket guide</a></section>' +
      '<section class="card"><h3>Season</h3><p class="muted">Tips change with the weather.</p><div class="seg">' +
      ['auto', 'harmattan', 'hot', 'rainy'].map(function (k) {
        var label = k === 'auto' ? 'Auto' : SEASONS[k].label;
        return '<button class="' + (st.season === k ? 'on' : '') + '" data-action="season" data-k="' + k + '">' + esc(label) + '</button>';
      }).join('') + '</div>' +
      '<p class="fine left">Now showing: ' + esc(SEASONS[E.season()].label) + ' · ' + esc(SEASONS[E.season()].note) + '</p></section>' +
      '<section class="card"><h3>Your check-up</h3><p class="muted">Habits change. Retake the check-up any time to refresh your baseline.</p>' +
      '<button class="btn ghost" data-action="retake">Retake the check-up</button></section>' +
      '<section class="card"><h3>Your name</h3><label class="field"><input id="nameEdit" type="text" maxlength="30" value="' + esc(st.name) + '" placeholder="Your first name"></label>' +
      '<button class="btn ghost" data-action="save-name">Save name</button></section>' +
      (ui.deferredInstall ? '<section class="card"><h3>Install Bloom</h3><p class="muted">Add it to your home screen and use it offline.</p><button class="btn primary" data-action="install">Install app</button></section>' : '') +
      '<section class="card"><h3>Back up my progress</h3><p class="muted">Download a file with your scores, notes and routine. You can restore it on this or another phone. Keep it somewhere safe, since it holds your private data.</p>' +
      '<button class="btn ghost" data-action="backup">Download backup</button>' +
      '<button class="btn ghost" data-action="restore">Restore from a backup file</button>' +
      '<input id="restoreFile" type="file" accept="application/json,.json" hidden></section>' +
      (!ui.deferredInstall && !isStandalone() && isIOS() ? '<section class="card"><h3>Install Bloom</h3><p class="muted">In Safari, tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</p></section>' : '') +
      '<section class="card"><h3>Reset my progress</h3><p class="muted">Start your scores over: check-up, quiz results, daily ticks, streaks and badges. Your name, shelf, routine, season and product profile are kept.</p>' +
      '<button class="btn ghost" data-action="reset-progress">Reset my progress</button></section>' +
      lockCard() +
      '<section class="card"><h3>Privacy</h3><p class="muted">Everything is saved only on this phone. Nothing is sent anywhere.</p>' +
      '<button class="btn danger" data-action="clear">Clear all my data</button></section>' +
      '<p class="fine">Bloom is educational and not a substitute for medical care. If something worries you, please see a nurse, pharmacist or doctor.</p>' +
      '</main>' + nav('me');
    return h;
  }

  /* ---------- modules ---------- */
  function lessonCard(c, i) {
    var h = '<article class="lesson"><div class="lnum">' + (i + 1) + '</div><h3>' + esc(c.h) + '</h3>';
    (c.p || []).forEach(function (t) { h += '<p>' + md(t) + '</p>'; });
    if (c.list) h += '<ul>' + c.list.map(function (li) { return '<li>' + md(li) + '</li>'; }).join('') + '</ul>';
    (c.p2 || []).forEach(function (t) { h += '<p>' + md(t) + '</p>'; });
    if (c.tip) h += '<div class="callout tip"><b>Good to know</b><p>' + md(c.tip) + '</p></div>';
    if (c.try) h += '<div class="callout try"><b>Try this</b><p>' + md(c.try) + '</p></div>';
    return h + '</article>';
  }

  function viewModule(id) {
    var m = modById(id), L = (window.BLOOM_LESSONS || {})[id];
    if (!m || !L) return viewLearn();
    var dim = dimById(m.dim), done = E.state.modules[id];
    var h = '<main class="screen module">' +
      '<div class="mod-top"><a class="iconbtn" href="#/learn" aria-label="Back to the guide">' + ICON.back + '</a>' +
      '<span class="eyebrow">Module ' + m.n + ' of ' + MODS.length + '</span></div>' +
      '<h1 class="mod-h1">' + esc(m.title) + '</h1>' +
      '<div class="mod-tags big"><span class="tag">' + esc(dim.short) + ' petal</span><span class="tag">About ' + L.mins + ' min</span>' +
      (done ? '<span class="tag ok">Best score ' + done.best + '%</span>' : '') + '</div>' +
      '<p class="lede">' + esc(L.intro) + '</p>';
    L.cards.forEach(function (c, i) { h += lessonCard(c, i); });

    h += '<section class="block"><h2 class="blk-title">Myth-buster</h2><p class="muted">Tap a myth to see the truth.</p>';
    L.myths.forEach(function (x) {
      h += '<details class="myth"><summary><span class="mk">Myth</span>' + esc(x.myth) + '</summary><p><span class="tk">Truth</span>' + esc(x.truth) + '</p></details>';
    });
    h += '</section>';

    h += '<section class="block redflag"><h2 class="blk-title">Red flags: see a clinician</h2><ul>' +
         L.redflags.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
         '<p class="fine left">If something worries you, a nurse, pharmacist or doctor is always the right first stop.</p></section>';

    h += '<section class="block"><h2 class="blk-title">Key takeaways</h2><ul class="takeaways">' +
         L.takeaways.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></section>';

    h += '<section class="card soft cta"><h3>Ready to practise?</h3><p>' + L.scenarios.length + ' real-life scenarios. Your score grows your <strong>' + esc(dim.name) + '</strong> petal.</p>' +
         '<button class="btn primary" data-action="start-practice" data-id="' + id + '">' + (done ? 'Practise again' : 'Start practice') + '</button>' + (done ? '<button class="linkbtn" data-action="reset-module" data-id="' + id + '">Reset this module’s score</button>' : '') + '</section></main>' + nav('learn');
    return h;
  }

  function viewPractice(id) {
    var m = modById(id), L = (window.BLOOM_LESSONS || {})[id];
    if (!m || !L) return viewLearn();
    var P = ui.prac;
    if (!P || P.id !== id) P = ui.prac = { id: id, qi: 0, picks: {}, done: false };
    var total = L.scenarios.length;

    if (P.done) {
      var r = P.result, nextMod = MODS.filter(function (x) { return x.n === m.n + 1 && x.available; })[0];
      var msg = r.pct >= 90 ? 'Outstanding.' : r.pct >= 70 ? 'Well done.' : r.pct >= 40 ? 'Good progress.' : 'A good start. Retake after re-reading the lessons.';
      var h = '<main class="screen results"><p class="eyebrow">' + esc(m.title) + '</p>' +
        '<div class="flower-wrap" id="flowerMount"></div>' +
        (r.up ? '<div class="levelup" role="status">🌸 Level up! You’re now <strong>' + esc(r.up) + '</strong></div>' : '') +
        '<div class="reveal"><div class="lvl-name small">' + r.pct + '%</div><p class="lvl-blurb">' + msg + '</p></div>' +
        '<div class="card"><p><strong>Hygiene-o-meter:</strong> ' + r.before + ' → <strong>' + r.after + '</strong>' +
        (r.after > r.before ? ' (+' + (r.after - r.before) + ')' : '') + '</p>' +
        '<p class="muted">Level: ' + esc(E.level(r.after).name) + '. Your best score for this module counts, so retaking can only help.</p></div>' +
        '<button class="btn primary" data-action="prac-again" data-id="' + id + '">Practise again</button>' +
        (nextMod ? '<button class="btn ghost" data-action="goto-mod" data-id="' + nextMod.id + '">Next: ' + esc(nextMod.title) + '</button>' : '') +
        '<a class="btn ghost" href="#/learn">Back to the guide</a></main>';
      return h;
    }

    var sc = L.scenarios[P.qi], picked = P.picks[P.qi], has = picked !== undefined, o = has ? sc.opts[picked] : null;
    var h2 = '<main class="screen checkup practice"><div class="cu-top"><a class="iconbtn" href="#/module/' + id + '" aria-label="Back to lessons">' + ICON.back + '</a>' +
      '<div class="progress"><i style="width:' + ((P.qi + (has ? 1 : 0)) / total * 100) + '%"></i></div><span class="count">' + (P.qi + 1) + '/' + total + '</span></div>' +
      '<div class="sect-tag">' + esc(m.title) + '</div><h2 class="question">' + esc(sc.q) + '</h2><div class="opts">';
    sc.opts.forEach(function (op, i) {
      var cls = 'opt' + (picked === i ? ' sel' : '');
      if (has) cls += op.p === 2 ? ' best' : '';
      h2 += '<button class="' + cls + '" data-action="prac-pick" data-i="' + i + '"' + (has ? ' disabled' : '') + '><span class="dot"></span><span>' + esc(op.t) + '</span></button>';
    });
    h2 += '</div>';
    if (has) {
      var head = o.p === 2 ? 'Best choice.' : o.p === 1 ? 'Partly right.' : 'Not the best choice.';
      var best = sc.opts.filter(function (x) { return x.p === 2; })[0];
      h2 += '<div class="fb' + (o.p === 2 ? '' : ' neutral') + '"><strong>' + head + '</strong><p>' + esc(o.why) + '</p>' +
            (o.p < 2 && best ? '<p class="muted"><strong>Best:</strong> ' + esc(best.t) + '. ' + esc(best.why) + '</p>' : '') + '</div>' +
            '<button class="btn primary" data-action="prac-next">' + (P.qi === total - 1 ? 'Finish' : 'Next scenario') + '</button>';
    }
    return h2 + '</main>';
  }


  /* ---------- products ---------- */
  var SKIN_NAMES = { dry: 'Dry', normal: 'Normal', combo: 'Combination', oily: 'Oily' };
  function finderCat(id) { return window.BLOOM_FINDER.cats.filter(function (c) { return c.id === id; })[0]; }
  function profileLine() {
    var pr = E.state.profile || {};
    if (!pr.skin) return null;
    return SKIN_NAMES[pr.skin] + (pr.sensitive === 'yes' ? ', sensitive' : '');
  }

  function viewProducts() {
    var cats = window.BLOOM_FINDER.cats.filter(function (c) { return c.id !== 'myskin'; });
    var pl = profileLine(), shelf = E.state.shelf || [], fresh = E.shelfFreshness(), due = E.shelfDue().length;
    var h = topbar('Products') + '<main class="screen products"><h2 class="page-title">Products</h2>' +
      '<p class="muted">Find what fits you, track what needs replacing, and learn to read a label.</p>' +
      '<section class="card soft"><div class="eyebrow">Your skin</div>' +
      (pl ? '<h3>' + esc(pl) + '</h3><p class="muted">Saved and used in the finders below.</p>' : '<h3>Not set yet</h3><p class="muted">Two quick questions, asked once.</p>') +
      '<button class="btn ghost" data-action="open-finder" data-id="myskin">' + (pl ? 'Change my skin type' : 'Find my skin type') + '</button></section>' +
      '<h3 class="part">Product Finder</h3><div class="cat-grid">';
    cats.forEach(function (c) {
      h += '<button class="cat" data-action="open-finder" data-id="' + c.id + '"><span class="cat-e">' + c.emoji + '</span><span class="cat-t">' + esc(c.title) + '</span><span class="cat-b">' + esc(c.blurb) + '</span></button>';
    });
    h += '</div><h3 class="part">My Shelf</h3><section class="card"><p>' +
      (shelf.length ? '<strong>' + shelf.length + ' item' + (shelf.length === 1 ? '' : 's') + '</strong> tracked' + (fresh !== null ? ' · ' + fresh + '% on time' : '') + (due ? ' · <span class="due">' + due + ' due</span>' : '') :
      'Track sponges, towels, toothbrushes and more, and get told when they’re due.') + '</p><a class="btn ghost" href="#/shelf">Open My Shelf</a></section>' +
      '<h3 class="part">Label reader</h3><section class="card"><p>What do "fragrance", "antibacterial" and "PA++++" actually mean?</p><a class="btn ghost" href="#/labels">Open label reader</a></section>' +
      '<section class="card soft"><h3>Buying safely</h3><ul class="plain">' +
      '<li>Buy from pharmacies, official brand stores and reputable retailers.</li>' +
      '<li>Check for a NAFDAC number, an intact seal and the expiry date.</li>' +
      '<li>Be wary of premium brands at suspiciously low prices. Fakes are common.</li>' +
      '<li>Patch test new products on your inner forearm for 24 hours.</li>' +
      '<li>Stop using anything that burns, swells or itches, and ask a pharmacist.</li></ul></section>' +
      '<p class="fine">Brand names shown in the finder are examples, not endorsements. Availability changes, so check what’s in stock near you. We show price bands rather than naira amounts because prices move quickly.</p></main>' + nav('products');
    return h;
  }

  function startFinder(catId) {
    var cat = finderCat(catId); if (!cat) return null;
    var pr = E.state.profile || {}, ans = {};
    ['skin', 'sensitive'].forEach(function (k) { if (pr[k]) ans[k] = pr[k]; });
    var steps = cat.steps.filter(function (st) { return cat.id === 'myskin' || !(st.profile && pr[st.profile]); });
    ui.finder = { cat: catId, qi: 0, ans: ans, steps: steps, done: false };
    return ui.finder;
  }

  function viewFinder(catId) {
    var cat = finderCat(catId);
    if (!cat) return viewProducts();
    var F = ui.finder;
    if (!F || F.cat !== catId) F = startFinder(catId);
    var total = F.steps.length;

    if (F.done) {
      var r = cat.build(F.ans, { season: E.season() }), pl = profileLine();
      var h = '<main class="screen result-page"><div class="mod-top"><a class="iconbtn" href="#/products" aria-label="Back to products">' + ICON.back + '</a><span class="eyebrow">Your match</span></div>' +
        '<h1 class="mod-h1">' + cat.emoji + ' ' + esc(cat.title) + '</h1>';
      if (r.safety) h += '<section class="block redflag"><h2 class="blk-title">Check this first</h2><p>' + esc(r.safety) + '</p></section>';
      if (pl && cat.id !== 'myskin' && cat.steps.some(function (st) { return st.profile; })) h += '<p class="muted">Using your skin profile: <strong>' + esc(pl) + '</strong>. <a href="#/products">Change it</a></p>';
      if (r.ranked) {
        h += '<section class="block"><h2 class="blk-title">Your ranking</h2>';
        r.ranked.forEach(function (x, i) {
          h += '<div class="rank r' + (i < 2 ? i + 1 : 0) + (x.tag === 'Not now' ? ' off' : '') + '"><div class="rank-top"><strong>' + esc(x.name) + '</strong><span class="tag' + (i === 0 ? ' go' : '') + '">' + esc(x.tag) + '</span></div><p>' + esc(x.why) + '</p></div>';
        });
        h += '</section>';
      }
      function list(title, arr, cls) {
        if (!arr || !arr.length) return '';
        return '<section class="card' + (cls ? ' ' + cls : '') + '"><h3>' + title + '</h3><ul class="plain">' + arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></section>';
      }
      h += list(cat.id === 'myskin' ? 'Your skin' : 'What to look for', r.look);
      h += list('How to use it well', r.how);
      h += list('Skip or avoid', r.avoid, 'avoidc');
      if (r.tiers) h += '<section class="card"><h3>Price guide</h3><div class="tiers"><div><b>Budget</b><span>' + esc(r.tiers.budget) + '</span></div><div><b>Mid-range</b><span>' + esc(r.tiers.mid) + '</span></div><div><b>Premium</b><span>' + esc(r.tiers.premium) + '</span></div></div></section>';
      if (r.examples && r.examples.length) h += '<section class="card"><h3>Examples sold in Nigeria</h3><div class="chips">' + r.examples.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div><p class="fine left">Examples, not endorsements. Check what’s in stock, buy from a reputable seller, and match the criteria above to the label.</p></section>';
      if (r.note) h += '<div class="callout tip"><b>Good to know</b><p>' + esc(r.note) + '</p></div>';
      if (r.shelf && r.shelf.length) {
        h += '<section class="card soft"><h3>Track it on My Shelf</h3><p class="muted">Get reminded when it’s due.</p>' +
             r.shelf.map(function (t) { var ty = E.shelfType(t); return '<button class="btn ghost" data-action="shelf-quick" data-t="' + t + '">Add: ' + esc(ty.name) + '</button>'; }).join('') + '</section>';
      }
      h += '<button class="btn ghost" data-action="fnd-restart" data-id="' + catId + '">Answer again</button><a class="btn primary" href="#/products">Back to products</a></main>';
      return h;
    }

    var st = F.steps[F.qi], picked = F.ans[st.id];
    var h2 = '<main class="screen checkup finder"><div class="cu-top"><button class="iconbtn" data-action="fnd-back" aria-label="Back">' + ICON.back + '</button>' +
      '<div class="progress"><i style="width:' + (F.qi / total * 100) + '%"></i></div><span class="count">' + (F.qi + 1) + '/' + total + '</span></div>' +
      '<div class="sect-tag">' + esc(cat.title) + '</div><h2 class="question">' + esc(st.q) + '</h2><div class="opts">';
    st.opts.forEach(function (op, i) {
      h2 += '<button class="opt' + (picked === op.v ? ' sel' : '') + '" data-action="fnd-pick" data-i="' + i + '"><span class="dot"></span><span>' + esc(op.t) + '</span></button>';
    });
    return h2 + '</div></main>';
  }

  function viewShelf() {
    var list = (E.state.shelf || []).slice(), fresh = E.shelfFreshness();
    list.sort(function (a, b) { return E.shelfInfo(a).left - E.shelfInfo(b).left; });
    var types = window.BLOOM_SHELF_TYPES;
    var h = topbar('My Shelf') + '<main class="screen shelf"><div class="mod-top"><a class="iconbtn" href="#/products" aria-label="Back to products">' + ICON.back + '</a><span class="eyebrow">Products</span></div>' +
      '<h2 class="page-title">My Shelf</h2><p class="muted">Things that need replacing or washing on a schedule. Keeping them on time helps your Home &amp; Clothing petal.</p>';
    if (fresh !== null) h += '<section class="card"><div class="lvl-row"><strong>Shelf freshness</strong><span class="lvl-score">' + fresh + '<small>%</small></span></div><div class="progress thin"><i style="width:' + fresh + '%"></i></div></section>';
    if (!list.length) h += '<section class="card soft"><h3>Start with the basics</h3><p>Add your sponge, towel and toothbrush in one tap. You can adjust the dates later.</p><button class="btn primary" data-action="shelf-starter">Add the starter three</button></section>';
    list.forEach(function (it) {
      var i = E.shelfInfo(it), status = i.overdue ? '<span class="tag over">Overdue by ' + (-i.left) + ' day' + (-i.left === 1 ? '' : 's') + '</span>' : i.soon ? '<span class="tag soonc">Due in ' + i.left + ' day' + (i.left === 1 ? '' : 's') + '</span>' : '<span class="tag ok">' + i.left + ' days left</span>';
      h += '<article class="shelf-item' + (i.overdue ? ' overdue' : '') + '"><div class="si-top"><div><strong>' + esc(it.name || i.type.name) + '</strong>' + (it.name ? '<div class="muted small">' + esc(i.type.name) + '</div>' : '') + '</div>' + status + '</div>' +
           '<div class="bar"><i style="width:' + i.pct + '%"></i></div><p class="muted small">' + esc(i.type.note) + '</p>' +
           '<div class="si-actions"><button class="btn small" data-action="shelf-done" data-id="' + it.id + '">' + esc(i.type.done) + '</button><button class="linkbtn" data-action="shelf-remove" data-id="' + it.id + '">Remove</button></div></article>';
    });
    h += '<section class="card"><h3>Add an item</h3><label class="field"><span>What is it?</span><select id="shType">' +
         types.map(function (t) { return '<option value="' + t.id + '">' + esc(t.name) + '</option>'; }).join('') + '</select></label>' +
         '<label class="field"><span>Nickname <em>(optional)</em></span><input id="shName" type="text" maxlength="30" placeholder="e.g. blue towel"></label>' +
         '<label class="field"><span>When did you last replace or wash it?</span><select id="shAgo"><option value="0">Today</option><option value="7">About a week ago</option><option value="14">About 2 weeks ago</option><option value="30">About a month ago</option><option value="90">About 3 months ago</option><option value="9999">Not sure (treat as due)</option></select></label>' +
         '<button class="btn primary" data-action="shelf-add">Add to My Shelf</button></section></main>' + nav('products');
    return h;
  }

  function viewLabels() {
    var vmap = { ok: ['Good', 'ok'], care: ['Use care', 'soonc'], avoid: ['Avoid', 'over'], info: ['Know this', ''] };
    var h = topbar('Label reader') + '<main class="screen labels"><div class="mod-top"><a class="iconbtn" href="#/products" aria-label="Back to products">' + ICON.back + '</a><span class="eyebrow">Products</span></div>' +
      '<h2 class="page-title">Label reader</h2><p class="muted">Tap a term to see what it means.</p>' +
      '<label class="field"><input id="labelQ" type="text" placeholder="Search, e.g. fragrance" autocomplete="off"></label><div id="labelList">';
    window.BLOOM_LABELS.forEach(function (x) {
      var v = vmap[x.v];
      h += '<details class="myth lab" data-q="' + esc((x.term + ' ' + x.what).toLowerCase()) + '"><summary><span class="tag ' + v[1] + '">' + v[0] + '</span> ' + esc(x.term) + '</summary><p>' + esc(x.what) + '</p><p class="muted"><strong>Tip:</strong> ' + esc(x.tip) + '</p></details>';
    });
    return h + '</div><p class="fine">General information, not medical advice. If a product irritates your skin, stop using it and ask a pharmacist.</p></main>' + nav('products');
  }


  /* ---------- find care, pocket guide, badges, certificate ---------- */
  function backBar(to, label) {
    return '<div class="mod-top"><a class="iconbtn" href="#/' + to + '" aria-label="Back">' + ICON.back + '</a><span class="eyebrow">' + esc(label) + '</span></div>';
  }
  function viewCare() {
    var C = window.BLOOM_CARE, V = C.violence;
    var h = topbar('Find care') + '<main class="screen care">' + backBar(E.state.onboarded ? 'me' : 'welcome', 'Help') +
      '<h2 class="page-title">Find care</h2><p class="muted">Where to go, what to ask for, and who can help.</p>' +
      '<section class="card alert"><h3>' + esc(C.emergency.title) + '</h3><p>' + md(C.emergency.body) + '</p></section>' +
      '<h3 class="part">Who to see</h3>';
    C.where.forEach(function (w) { h += '<section class="card"><h3><span class="cat-e">' + w.e + '</span> ' + esc(w.t) + '</h3><p>' + esc(w.body) + '</p></section>'; });
    h += '<h3 class="part">Find one near you</h3><section class="card"><p class="muted">These open a map search on your phone. You need internet for this.</p><div class="maplinks">';
    C.maps.forEach(function (m) {
      h += '<a class="btn ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(m.q) + '">' + esc(m.t) + '</a>';
    });
    h += '</div></section><section class="card"><h3>Before you go</h3><ul class="plain">' + C.ask.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></section>' +
      '<h3 class="part">' + esc(V.title) + '</h3><section class="card soft"><p>' + esc(V.intro) + '</p></section>';
    V.items.forEach(function (it) { h += '<section class="card"><h3>' + esc(it.t) + '</h3><p>' + md(it.body) + '</p></section>'; });
    h += '<h3 class="part">Your mind matters too</h3><section class="card"><p>' + esc(C.mind) + '</p></section>' +
      '<p class="fine">Contact details last checked ' + esc(C.checked) + ' and can change. If a number doesn’t connect, any hospital can point you to help. Bloom is educational and not a substitute for medical care.</p></main>' + nav('me');
    return h;
  }

  function viewCheatsheet() {
    var ST = window.BLOOM_SHELF_TYPES, pick = ['sponge', 'towel', 'bedding', 'toothbrush', 'razor', 'comb', 'wigcap', 'water'];
    function sec(t, items) { return '<section class="cs-sec"><h3>' + esc(t) + '</h3><ul>' + items.map(function (i) { return '<li>' + md(i) + '</li>'; }).join('') + '</ul></section>'; }
    var shelf = pick.map(function (id) {
      var t = ST.filter(function (x) { return x.id === id; })[0];
      var every = t.days === 7 ? 'weekly' : t.days === 14 ? 'every 1–2 weeks' : t.days === 28 ? 'about monthly' : t.days === 30 ? 'about monthly' : 'every 3 months';
      return '**' + t.name + ':** ' + t.verb.toLowerCase() + ' ' + every;
    });
    var h = '<style>@page{size:A4 portrait;margin:10mm}</style>' + topbar('Pocket guide') + '<main class="screen cheat">' +
      '<div class="noprint">' + backBar(E.state.onboarded ? 'me' : 'welcome', 'Pocket guide') +
      '<p class="muted">One page to print, save as PDF, or share. It works offline.</p><button class="btn primary" data-action="print">Print or save as PDF</button></div>' +
      '<div class="cs-sheet"><header class="cs-head"><img src="icons/mark.svg" alt="" class="cs-mark"><div><h2>Bloom pocket guide</h2><p>Clean · Dry · Breathe</p></div></header><div class="cs-cols">' +
      sec('Daily five', ['Bathe, and rinse after heavy sweating', 'Fresh underwear', 'Wash hands at the key moments', 'Brush teeth morning and night', 'Drink plenty of water']) +
      sec('Hygiene pouch', ['Tissue and a small soap or sanitiser (60% alcohol or more)', 'Small bottle of water, plastic bag', 'Spare pad or liner and spare underwear', 'Deodorant and a small towel']) +
      sec('Wash hands (20 seconds, soap)', ['Before eating, cooking and feeding a baby', 'After the toilet and after changing a pad', 'After handling raw meat or fish, bins and nappies', 'After coughing, sneezing or caring for someone ill']) +
      sec('Safe water', ['**Boil** at a rolling boil for at least 1 minute', 'Or use chlorine tablets exactly as the packet says', 'Store in covered containers and pour rather than dip', 'Scrub containers weekly, and tanks twice a year', 'Sachets: check the **seal, the date and the NAFDAC number**']) +
      sec('Replace or wash', shelf) +
      sec('Intimate care', ['Wash the outside only, with water. **No douching**', 'Wipe front to back, wear breathable cotton', 'Pads: change every 4–6 hours. Tampons: at most 8 hours', 'Pass urine after sex. Use condoms, and water- or silicone-based lube with latex']) +
      sec('Act fast', ['**HIV PEP:** start as soon as possible, within 72 hours', '**Emergency contraception:** the sooner the better. The pill works best within 72 hours, some types up to 5 days', 'Sexual assault: it is never your fault. Get care soon (see below)']) +
      sec('See a doctor if you have', ['Bleeding after sex, between periods, or after menopause', 'Foul-smelling discharge, sores, lumps or warts', 'Burning urine with fever or back pain', 'Severe pelvic pain, or heavy bleeding that soaks a pad every hour', 'Diarrhoea for over 2 days or with blood, or yellow eyes', 'A breast lump, or low mood that won’t lift']) +
      '</div><section class="cs-help"><h3>Get help</h3><p><strong>Emergency:</strong> 112 (Lagos 767) · <strong>Lagos DSVA:</strong> 0800-333-333 (toll-free, 24 hours) · <strong>Mirabel Centre:</strong> LASUTH, Ikeja, Lagos (free medical, counselling and legal support)</p></section>' +
      '<p class="cs-foot">Educational information, not medical advice. If something worries you, see a nurse, pharmacist or doctor. Bloom Hygiene Guide</p></div></main>' + nav('me');
    return h;
  }

  function viewBadges() {
    var B = window.BLOOM_BADGES, got = E.badges(), n = Object.keys(got).length, cert = E.certificate();
    var h = topbar('Badges') + '<main class="screen badges">' + backBar('me', 'My Meter') +
      '<h2 class="page-title">Badges</h2><p class="muted">' + n + ' of ' + B.length + ' earned</p>' +
      '<section class="card cert-card"><h3>Certificate of completion</h3>' +
      (cert.ok ? '<p>You finished every module with an average of ' + cert.avg + '%. Well done.</p><a class="btn primary" href="#/certificate">View my certificate</a>'
               : '<p class="muted">Finish all 12 modules with an average of 70% or more. You’re at <strong>' + cert.done + ' of ' + cert.total + '</strong> modules' + (cert.done ? ' with an average of ' + cert.avg + '%' : '') + '.</p><div class="progress thin"><i style="width:' + Math.round(cert.done / cert.total * 100) + '%"></i></div>') +
      '</section><div class="badge-grid">';
    B.forEach(function (b) {
      var on = !!got[b.id];
      h += '<div class="badge' + (on ? ' on' : '') + '"><span class="b-e" aria-hidden="true">' + (on ? b.e : '🔒') + '</span><strong>' + esc(b.name) + '</strong><small>' + esc(on ? 'Earned ' + got[b.id] : b.desc) + '</small></div>';
    });
    return h + '</div></main>' + nav('me');
  }

  function viewCertificate() {
    var cert = E.certificate();
    if (!cert.ok) return viewBadges();
    var name = E.state.name, today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    var last = Object.keys(E.state.modules).map(function (k) { return E.state.modules[k].done; }).sort().pop();
    var when = last ? new Date(last + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : today;
    return '<style>@page{size:A4 landscape;margin:8mm}</style>' + topbar('Certificate') + '<main class="screen certificate">' +
      '<div class="noprint">' + backBar('badges', 'Badges') +
      (name ? '' : '<label class="field"><span>Add your name to the certificate</span><input id="nameEdit" type="text" maxlength="40" placeholder="Your name"></label><button class="btn ghost" data-action="save-cert-name">Save name</button>') +
      '<button class="btn primary" data-action="print">Print or save as PDF</button></div>' +
      '<div class="cert"><div class="cert-in"><img src="icons/mark.svg" alt="" class="cert-mark"><p class="cert-eyebrow">Bloom Hygiene Guide</p><h2>Certificate of Completion</h2>' +
      '<p class="cert-line">This certifies that</p><p class="cert-name">' + esc(name || 'Your name') + '</p>' +
      '<p class="cert-line">completed all ' + cert.total + ' modules of the Bloom personal hygiene guide<br>with an average quiz score of <strong>' + cert.avg + '%</strong> and reached the <strong>' + esc(cert.level) + '</strong> level.</p>' +
      '<p class="cert-date">' + esc(when) + '</p><p class="cert-fine">A certificate of self-guided learning. It is not a medical qualification.</p></div></div></main>' + nav('me');
  }


  /* ---------- app lock ---------- */
  var lockTimer = null;
  function viewLock() {
    var w = LK.waitSecs();
    return '<main class="screen lockscreen"><img src="icons/icon.svg" alt="Bloom logo" class="logo-big"><h1>Bloom</h1>' +
      '<p class="muted">Enter your PIN to open.</p>' +
      '<form id="lockForm" autocomplete="off"><label class="field"><span class="sr">PIN</span>' +
      '<input id="lockPin" class="pin" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" placeholder="••••"' + (w ? ' disabled' : '') + '></label>' +
      '<p id="lockMsg" class="lock-msg" role="alert">' + (w ? 'Too many tries. Wait ' + w + ' seconds.' : esc(ui.lockMsg)) + '</p>' +
      '<button class="btn primary" type="submit"' + (w ? ' disabled' : '') + ' id="lockGo">Unlock</button></form>' +
      '<details class="myth"><summary>Forgot my PIN</summary><p>There is no way to reset a PIN, because your data stays only on this phone. You can erase Bloom’s data here and start again. If you have a backup file, you can restore it afterwards.</p>' +
      '<button class="btn ghost danger" data-action="lock-erase">Erase data and start over</button></details>' +
      '<p class="fine"><a class="link" href="#/care">Find care</a> · <a class="link" href="#/cheatsheet">Pocket guide</a></p></main>';
  }
  function startLockCountdown() {
    clearInterval(lockTimer);
    if (!LK.waitSecs()) return;
    lockTimer = setInterval(function () {
      var w = LK.waitSecs(), m = document.getElementById('lockMsg');
      if (!m) { clearInterval(lockTimer); return; }
      if (w) { m.textContent = 'Too many tries. Wait ' + w + ' seconds.'; return; }
      clearInterval(lockTimer); m.textContent = '';
      var i = document.getElementById('lockPin'), b = document.getElementById('lockGo');
      if (i) { i.disabled = false; i.focus(); } if (b) b.disabled = false;
    }, 1000);
  }
  function lockCard() {
    if (!LK.supported()) return '<section class="card"><h3>App lock</h3><p class="muted">App lock needs a secure (https) connection and a newer browser, so it isn’t available here.</p></section>';
    var on = LK.isSet(), m = ui.lockMode;
    var h = '<section class="card"><h3>App lock</h3>';
    function field(id, label) { return '<label class="field"><span>' + label + '</span><input id="' + id + '" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" placeholder="4 to 6 digits"></label>'; }
    if (!on && m !== 'set') {
      h += '<p class="muted">Ask for a PIN whenever Bloom opens on this phone. Good for privacy if others use your phone.</p><button class="btn ghost" data-action="lock-mode" data-id="set">Set a PIN</button>';
    } else if (!on) {
      h += field('lockNew', 'Choose a PIN') + field('lockConfirm', 'Type it again') + '<p id="lockFormMsg" class="lock-msg" role="alert">' + esc(ui.lockMsg) + '</p><button class="btn primary" data-action="lock-save">Turn on app lock</button><button class="linkbtn" data-action="lock-mode" data-id="">Cancel</button>';
    } else if (m === 'change') {
      h += field('lockCur', 'Current PIN') + field('lockNew', 'New PIN') + field('lockConfirm', 'New PIN again') + '<p id="lockFormMsg" class="lock-msg" role="alert">' + esc(ui.lockMsg) + '</p><button class="btn primary" data-action="lock-save">Change PIN</button><button class="linkbtn" data-action="lock-mode" data-id="">Cancel</button>';
    } else if (m === 'off') {
      h += field('lockCur', 'Current PIN') + '<p id="lockFormMsg" class="lock-msg" role="alert">' + esc(ui.lockMsg) + '</p><button class="btn primary" data-action="lock-save">Turn off app lock</button><button class="linkbtn" data-action="lock-mode" data-id="">Cancel</button>';
    } else {
      h += '<p><span class="tag ok">On</span> Bloom asks for your PIN when it opens, and again after being away for 2 minutes.</p>' +
        '<button class="btn ghost" data-action="lock-mode" data-id="change">Change PIN</button><button class="btn ghost" data-action="lock-mode" data-id="off">Turn off</button><button class="btn ghost" data-action="lock-now">Lock now</button>';
    }
    return h + '<p class="fine left">This hides the app from casual snooping. It doesn’t encrypt your data, so also use your phone’s own screen lock. Your PIN can’t be recovered.</p></section>';
  }

  /* ---------- router ---------- */
  function route() {
    var raw = (location.hash || '').replace(/^#\/?/, '') || (E.state.onboarded ? 'home' : 'welcome');
    var parts = raw.split('/'), r = parts[0], arg = parts[1];
    if (LK.isSet() && !ui.unlocked && ['care', 'cheatsheet'].indexOf(r) < 0) {
      app.innerHTML = viewLock(); window.scrollTo(0, 0); document.body.setAttribute('data-route', 'lock');
      startLockCountdown(); var li = document.getElementById('lockPin'); if (li && !li.disabled) li.focus();
      return;
    }
    var gated = ['home', 'learn', 'daily', 'me', 'module', 'practice', 'products', 'finder', 'shelf', 'labels', 'routine', 'badges', 'certificate'];
    if (!E.state.onboarded && gated.indexOf(r) >= 0) r = 'welcome';
    var html;
    switch (r) {
      case 'welcome': html = viewWelcome(); break;
      case 'checkup': html = viewCheckup(); break;
      case 'results': html = viewResults(); break;
      case 'learn':   html = viewLearn(); break;
      case 'daily':   html = viewDaily(); break;
      case 'me':      html = viewMe(); break;
      case 'module':  html = viewModule(arg); break;
      case 'practice': html = viewPractice(arg); break;
      case 'products': html = viewProducts(); break;
      case 'finder':   html = viewFinder(arg); break;
      case 'shelf':    html = viewShelf(); break;
      case 'labels':   html = viewLabels(); break;
      case 'routine':  html = viewRoutine(); break;
      case 'care':     html = viewCare(); break;
      case 'cheatsheet': html = viewCheatsheet(); break;
      case 'badges':   html = viewBadges(); break;
      case 'certificate': html = viewCertificate(); break;
      default: r = 'home'; html = viewHome();
    }
    app.innerHTML = html;
    window.scrollTo(0, 0);
    document.body.setAttribute('data-route', r);
    var nb = E.takeNewBadges();
    if (nb.length && r !== 'welcome' && r !== 'checkup') {
      var nm = nb.map(function (id) { return window.BLOOM_BADGES.filter(function (b) { return b.id === id; })[0]; }).filter(Boolean);
      if (nm.length) setTimeout(function () { toast('New badge: ' + nm[0].e + ' ' + nm[0].name + (nm.length > 1 ? ' (+' + (nm.length - 1) + ' more)' : '')); }, 600);
    }
    var mount = document.getElementById('flowerMount');
    if (mount) {
      var sc = E.dimScores();
      tweenFlower(mount, sc, E.overall(), r === 'results' ? 350 : 100);
    }
  }
  function go(r) { if (location.hash === '#/' + r) route(); else location.hash = '#/' + r; }

  /* ---------- actions ---------- */
  var actions = {
    'begin': function () {
      var inp = document.getElementById('nameInput');
      E.state.name = inp ? inp.value.trim() : '';
      E.save();
      ui.qi = 0; ui.answers = {};
      go('checkup');
    },
    'pick': function (el) {
      var q = QS[ui.qi];
      ui.answers[q.id] = parseInt(el.getAttribute('data-i'), 10);
      route();
      var fb = document.querySelector('.fb');
      if (fb) fb.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    },
    'cu-next': function () {
      if (ui.qi < QS.length - 1) { ui.qi++; route(); }
      else { E.submitCheckup(ui.answers); ui.retake = false; go('results'); }
    },
    'cu-back': function () {
      if (ui.qi > 0) { ui.qi--; route(); }
      else go(E.state.onboarded ? 'me' : 'welcome');
    },
    'to-home': function () { go('home'); },
    'toggle': function (el) { E.toggleDaily(el.getAttribute('data-id')); route(); },
    'open-mod': function (el) {
      var m = modById(el.getAttribute('data-id'));
      if (m.available) go('module/' + m.id);
      else toast('Module ' + m.n + ' is being written. It arrives in an upcoming build.');
    },
    'open-finder': function (el) { startFinder(el.getAttribute('data-id')); go('finder/' + el.getAttribute('data-id')); },
    'fnd-restart': function (el) { startFinder(el.getAttribute('data-id')); route(); },
    'fnd-back': function () {
      var F = ui.finder;
      if (F && F.qi > 0) { F.qi--; route(); } else go('products');
    },
    'fnd-pick': function (el) {
      var F = ui.finder, st = F.steps[F.qi], op = st.opts[parseInt(el.getAttribute('data-i'), 10)];
      F.ans[st.id] = op.v;
      if (st.profile) E.setProfile(st.profile, op.v);
      if (F.qi < F.steps.length - 1) F.qi++; else F.done = true;
      route();
    },
    'shelf-add': function () {
      var t = document.getElementById('shType').value, nm = document.getElementById('shName').value.trim();
      var ago = parseInt(document.getElementById('shAgo').value, 10), ty = E.shelfType(t);
      if (ago === 9999) ago = ty.days + 1;
      E.addShelf(t, nm, ago); route(); toast('Added to My Shelf.');
    },
    'shelf-quick': function (el) { E.addShelf(el.getAttribute('data-t'), '', 0); toast('Added to My Shelf. Starting today.'); },
    'shelf-starter': function () { ['sponge', 'towel', 'toothbrush'].forEach(function (t) { E.addShelf(t, '', 0); }); route(); },
    'shelf-done': function (el) { E.doneShelf(el.getAttribute('data-id')); route(); toast('Nice. Back on schedule.'); },
    'shelf-remove': function (el) { E.removeShelf(el.getAttribute('data-id')); route(); },
    'goto-mod': function (el) { go('module/' + el.getAttribute('data-id')); },
    'start-practice': function (el) {
      ui.prac = { id: el.getAttribute('data-id'), qi: 0, picks: {}, done: false };
      go('practice/' + el.getAttribute('data-id'));
    },
    'prac-again': function (el) { actions['start-practice'](el); },
    'prac-pick': function (el) {
      if (!ui.prac || ui.prac.picks[ui.prac.qi] !== undefined) return;
      ui.prac.picks[ui.prac.qi] = parseInt(el.getAttribute('data-i'), 10);
      route();
      var fb = document.querySelector('.fb');
      if (fb) fb.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    },
    'prac-next': function () {
      var P = ui.prac, L = window.BLOOM_LESSONS[P.id], n = L.scenarios.length;
      if (P.qi < n - 1) { P.qi++; route(); return; }
      var pts = 0;
      L.scenarios.forEach(function (sc, i) { pts += sc.opts[P.picks[i]].p; });
      var pct = Math.round(pts / (2 * n) * 100), before = E.overall(), lvBefore = E.level(before).index;
      E.completeModule(P.id, pct);
      P.done = true; P.result = { pct: pct, before: before, after: E.overall() };
      P.result.up = E.level(P.result.after).index > lvBefore ? E.level(P.result.after).name : '';
      route();
    },
    'season': function (el) { E.state.season = el.getAttribute('data-k'); E.save(); route(); },
    'retake': function () { ui.qi = 0; ui.answers = {}; ui.retake = true; go('checkup'); },
    'save-name': function () {
      var inp = document.getElementById('nameEdit');
      E.state.name = inp ? inp.value.trim() : ''; E.save(); toast('Saved.');
    },
    'reset-progress': function () {
      if (!window.confirm('Reset all your scores, daily ticks and badges? Your name, shelf and routine stay. Tip: download a backup first if you might want this progress back. This can’t be undone.')) return;
      E.resetProgress(); ui.answers = {}; ui.qi = 0; ui.retake = false; ui.lockMode = null;
      location.hash = '#/welcome'; route(); toast('Progress reset. Let’s begin again.');
    },
    'reset-module': function (el) {
      var id = el.getAttribute('data-id'), m = modById(id);
      if (!window.confirm('Reset your score for “' + (m ? m.title : 'this module') + '”? You can take the quiz again.')) return;
      E.resetModule(id); route(); toast('Module reset.');
    },
    'lock-mode': function (el) { ui.lockMode = el.getAttribute('data-id') || null; ui.lockMsg = ''; route(); },
    'lock-now': function () { ui.unlocked = false; route(); },
    'lock-erase': function () {
      if (window.confirm('Erase all Bloom data on this phone and remove the PIN? This can’t be undone.')) {
        LK.remove(); E.reset(); ui.unlocked = true; ui.answers = {}; ui.qi = 0; ui.lockMode = null; ui.lockMsg = ''; location.hash = '#/welcome'; route();
      }
    },
    'lock-save': function () {
      var mode = LK.isSet() ? ui.lockMode : 'set';
      function v(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }
      function fail(t) { var m = document.getElementById('lockFormMsg'); if (m) m.textContent = t; ui.lockMsg = t; }
      var cur = v('lockCur'), nw = v('lockNew'), cf = v('lockConfirm');
      function finish(msg) { ui.lockMode = null; ui.lockMsg = ''; route(); toast(msg); }
      function afterVerify(next) {
        if (!LK.isSet()) return next();
        return LK.verify(cur).then(function (r) { if (!r.ok) return fail(r.wait ? 'Too many tries. Wait ' + r.wait + ' seconds.' : 'That isn’t your current PIN.'); return next(); });
      }
      function validateNew() {
        if (!LK.validPin(nw)) { fail('Use 4 to 6 digits.'); return false; }
        if (LK.weakPin(nw)) { fail('Choose a PIN that’s harder to guess (not 1234 or 0000).'); return false; }
        if (nw !== cf) { fail('The two PINs don’t match.'); return false; }
        return true;
      }
      if (mode === 'off') return afterVerify(function () { LK.remove(); finish('App lock turned off.'); });
      if (!validateNew()) return;
      afterVerify(function () { return LK.set(nw).then(function () { ui.unlocked = true; finish(mode === 'change' ? 'PIN changed.' : 'App lock is on.'); }); });
    },
    'clear': function () {
      if (window.confirm('Clear all your Bloom data on this phone? This can’t be undone.')) {
        LK.remove(); E.reset(); ui.answers = {}; ui.qi = 0; location.hash = '#/welcome'; route();
      }
    },
    'print': function () { window.print(); },
    'save-cert-name': function () {
      var inp = document.getElementById('nameEdit'); if (!inp || !inp.value.trim()) { toast('Type your name first.'); return; }
      E.state.name = inp.value.trim(); E.save(); route();
    },
    'toggle-weekly': function (el) { E.toggleWeekly(el.getAttribute('data-id')); route(); },
    'rt-toggle': function (el) { E.toggleRoutineStep(el.getAttribute('data-id')); route(); },
    'rt-preset': function (el) { E.setRoutine(E.presetSteps(el.getAttribute('data-id'))); route(); toast('Routine set.'); },
    'rt-add': function () {
      var t = document.getElementById('rtText'), b = document.getElementById('rtBlock');
      if (E.addCustomStep(t.value, b.value)) { route(); toast('Step added.'); } else toast('Type a step first.');
    },
    'rt-remove': function (el) { E.removeRoutineStep(el.getAttribute('data-id')); route(); },
    'rt-reset': function () { E.resetRoutine(); route(); toast('Back to the default five.'); },
    'install-dismiss': function () { E.state.installDismissed = true; E.save(); route(); },
    'backup': function () {
      var blob = new Blob([E.exportData()], { type: 'application/json' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'bloom-backup-' + E.dateKey() + '.json';
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      toast('Backup downloaded.');
    },
    'restore': function () { var f = document.getElementById('restoreFile'); if (f) f.click(); },
    'install': function () {
      var p = ui.deferredInstall; if (!p) return;
      p.prompt(); p.userChoice.then(function () { ui.deferredInstall = null; route(); });
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var fn = actions[el.getAttribute('data-action')];
    if (fn) fn(el);
  });
  document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'labelQ') {
      var q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('#labelList .lab').forEach(function (d) { d.hidden = q && d.getAttribute('data-q').indexOf(q) < 0; });
    }
  });
  document.addEventListener('submit', function (e) {
    if (!e.target || e.target.id !== 'lockForm') return;
    e.preventDefault();
    var inp = document.getElementById('lockPin'), msg = document.getElementById('lockMsg');
    if (!inp || !inp.value) return;
    LK.verify(inp.value.trim()).then(function (r) {
      if (r.ok) { ui.unlocked = true; ui.lockMsg = ''; route(); return; }
      inp.value = '';
      if (r.wait) { msg.textContent = 'Too many tries. Wait ' + r.wait + ' seconds.'; inp.disabled = true; document.getElementById('lockGo').disabled = true; startLockCountdown(); }
      else msg.textContent = 'Wrong PIN. ' + r.left + ' ' + (r.left === 1 ? 'try' : 'tries') + ' left before a short wait.';
    });
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { ui.hiddenAt = Date.now(); return; }
    if (LK.isSet() && ui.unlocked && ui.hiddenAt && Date.now() - ui.hiddenAt > 120000) { ui.unlocked = false; route(); }
  });
  document.addEventListener('change', function (e) {
    if (!e.target || e.target.id !== 'restoreFile' || !e.target.files || !e.target.files[0]) return;
    var f = e.target.files[0], rd = new FileReader();
    rd.onload = function () {
      if (!window.confirm('Replace the progress on this phone with the backup file?')) return;
      if (E.importData(String(rd.result))) { toast('Backup restored.'); location.hash = '#/home'; route(); }
      else toast('That file isn’t a Bloom backup.');
    };
    rd.onerror = function () { toast('Couldn’t read that file.'); };
    rd.readAsText(f);
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); ui.deferredInstall = e;
    if (/^#\/(home)?$/.test(location.hash) && E.state.onboarded) route();
  });
  window.addEventListener('appinstalled', function () { ui.deferredInstall = null; E.state.installDismissed = true; E.save(); });

  /* ---------- boot ---------- */
  E.load();
  // restore partial check-up answers when retaking? keep it simple: start fresh
  if (!location.hash) location.hash = E.state.onboarded ? '#/home' : '#/welcome';
  route();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  window.Bloom = { ui: ui, route: route, go: go };
})();
