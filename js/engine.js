/* Hygiene-o-meter engine: storage, scoring, streaks. No DOM here. */
(function () {
  var KEY = 'bloom.v1';
  var DIMS = window.BLOOM_DIMS, QS = window.BLOOM_QUESTIONS, MODS = window.BLOOM_MODULES;
  var LEVELS = window.BLOOM_LEVELS, DAILY = window.BLOOM_DAILY;

  var W_BASE = 0.5, W_MOD = 0.4, W_CONS = 0.1;

  function blank() {
    return { v: 1, name: '', onboarded: false, answers: {}, baseline: null,
             history: [], modules: {}, daily: {}, season: 'auto', profile: {}, shelf: [], routine: null, weekly: {}, installDismissed: false, badges: {}, bestStreak: 0, topLevel: 0, backedUp: false, created: Date.now() };
  }

  var state = blank();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var s = JSON.parse(raw); if (s && s.v === 1) state = Object.assign(blank(), s); }
    } catch (e) { /* storage unavailable: keep in memory */ }
    return state;
  }
  var newBadges = [], checking = false;
  function save() {
    if (!checking) checkBadges();
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  function earned(id) {
    var mods = state.modules || {}, ids = Object.keys(mods), n = ids.length;
    function best(i) { return mods[i] ? mods[i].best : -1; }
    switch (id) {
      case 'checkup':  return !!state.baseline;
      case 'lesson1':  return n >= 1;
      case 'half':     return n >= 6;
      case 'allmods':  return n >= MODS.length;
      case 'top':      return ids.some(function (i) { return mods[i].best >= 100; });
      case 'intimate': return best('m3') >= 70 && best('m10') >= 70 && best('m11') >= 70;
      case 'streak3':  return (state.bestStreak || 0) >= 3;
      case 'streak7':  return (state.bestStreak || 0) >= 7;
      case 'streak14': return (state.bestStreak || 0) >= 14;
      case 'routine':  return !!(state.routine && state.routine.length);
      case 'shelf':    return (state.shelf || []).length >= 3 && shelfDue().length === 0;
      case 'backup':   return !!state.backedUp;
      case 'lvl1': case 'lvl2': case 'lvl3': case 'lvl4': return (state.topLevel || 0) >= +id.slice(3);
    }
    return false;
  }
  function checkBadges() {
    if (!state.baseline) return;
    checking = true;
    try {
      state.badges = state.badges || {};
      var st = streak(); if (st > (state.bestStreak || 0)) state.bestStreak = st;
      var lv = level().index; if (lv > (state.topLevel || 0)) state.topLevel = lv;
      window.BLOOM_BADGES.forEach(function (b) {
        if (!state.badges[b.id] && earned(b.id)) { state.badges[b.id] = dateKey(); newBadges.push(b.id); }
      });
    } catch (e) { /* never block saving */ }
    checking = false;
  }
  function takeNewBadges() { var o = newBadges; newBadges = []; return o; }
  function certificate() {
    var mods = state.modules || {}, ids = MODS.map(function (m) { return m.id; });
    var done = ids.filter(function (i) { return mods[i]; }).length, sum = 0;
    ids.forEach(function (i) { sum += mods[i] ? mods[i].best : 0; });
    var avg = Math.round(sum / ids.length);
    return { done: done, total: ids.length, avg: avg, ok: done === ids.length && avg >= 70, level: LEVELS[state.topLevel || 0].name, score: overall() };
  }
  function reset() { state = blank(); try { localStorage.removeItem(KEY); } catch (e) {} return state; }

  function dateKey(d) {
    d = d || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  }

  /* ---------- check-up ---------- */
  function baselineFromAnswers(answers) {
    var out = {};
    DIMS.forEach(function (d) {
      var pts = 0, max = 0;
      QS.forEach(function (q) {
        if (q.dim !== d.id) return;
        var idx = answers[q.id];
        if (idx === undefined || idx === null) return;
        var o = q.opts[idx];
        if (!o || o.na) return;
        pts += o.p; max += 3;
      });
      out[d.id] = max ? Math.round(pts / max * 100) : null;   // null = not applicable
    });
    return out;
  }

  function submitCheckup(answers) {
    state.answers = answers;
    state.baseline = baselineFromAnswers(answers);
    state.onboarded = true;
    var isFirst = state.history.length === 0;
    snapshot();
    save();
    return isFirst;
  }

  /* ---------- modules ---------- */
  function completeModule(id, pct) {
    var prev = state.modules[id] ? state.modules[id].best : 0;
    state.modules[id] = { best: Math.max(prev, Math.max(0, Math.min(100, pct))), done: dateKey() };
    snapshot(); save();
  }
  /* Start over on scores while keeping the person's settings: name, profile, shelf, routine, season. */
  function resetProgress() {
    var keep = { name: state.name, profile: state.profile, shelf: state.shelf, routine: state.routine, season: state.season, installDismissed: state.installDismissed, created: state.created };
    state = Object.assign(blank(), keep);
    save();
  }
  function resetModule(id) { if (state.modules[id]) { delete state.modules[id]; snapshot(); save(); } }
  function modulesPct(dim) {
    var list = MODS.filter(function (m) { return m.dim === dim; });
    if (!list.length) return 0;
    var sum = 0;
    list.forEach(function (m) { sum += state.modules[m.id] ? state.modules[m.id].best : 0; });
    return sum / list.length;
  }

  /* ---------- routine & daily check-in ---------- */
  var RT = window.BLOOM_ROUTINE;
  function catalogStep(id) { return RT.steps.filter(function (x) { return x.id === id; })[0]; }
  function routineSteps() { return (state.routine && state.routine.length) ? state.routine : null; }
  function dailyList() {
    var r = routineSteps();
    if (!r) return DAILY;
    var d = r.filter(function (x) { return x.block !== 'weekly'; });
    return d.length ? d : DAILY;
  }
  function weeklyList() {
    var r = routineSteps();
    return r ? r.filter(function (x) { return x.block === 'weekly'; }) : [];
  }
  function inRoutine(id) { var r = routineSteps(); return !!(r && r.some(function (x) { return x.id === id; })); }
  function setRoutine(list) { state.routine = list; snapshot(); save(); }
  function presetSteps(pid) {
    var p = RT.presets.filter(function (x) { return x.id === pid; })[0];
    return p ? p.ids.map(catalogStep) : [];
  }
  function toggleRoutineStep(id) {
    var r = routineSteps() ? state.routine.slice() : presetSteps('essentials');
    var i = -1; r.forEach(function (x, k) { if (x.id === id) i = k; });
    if (i >= 0) r.splice(i, 1); else { var c = catalogStep(id); if (c) r.push({ id: c.id, t: c.t, block: c.block }); }
    setRoutine(r);
  }
  function addCustomStep(text, block) {
    text = String(text || '').trim().slice(0, 80);
    if (!text) return false;
    var r = routineSteps() ? state.routine.slice() : presetSteps('essentials');
    r.push({ id: 'c' + Date.now().toString(36), t: text, block: block, custom: true });
    setRoutine(r); return true;
  }
  function removeRoutineStep(id) {
    var r = (state.routine || []).filter(function (x) { return x.id !== id; });
    setRoutine(r.length ? r : null);
  }
  function resetRoutine() { setRoutine(null); }
  function dayItems(key) { return state.daily[key] || []; }
  function dayDone(key) {
    var ids = dailyList().map(function (x) { return x.id; });
    return dayItems(key).filter(function (i) { return ids.indexOf(i) >= 0; });
  }
  function toggleDaily(itemId, key) {
    key = key || dateKey();
    var arr = dayItems(key).slice(), i = arr.indexOf(itemId);
    if (i >= 0) arr.splice(i, 1); else arr.push(itemId);
    if (arr.length) state.daily[key] = arr; else delete state.daily[key];
    snapshot(); save();
  }
  function weekKey(d) {
    d = d || new Date();
    var off = (d.getDay() + 6) % 7;            // Monday start
    return dateKey(new Date(d.getFullYear(), d.getMonth(), d.getDate() - off));
  }
  function weeklyDone() { return (state.weekly || {})[weekKey()] || []; }
  function toggleWeekly(id) {
    state.weekly = state.weekly || {};
    var k = weekKey(), arr = (state.weekly[k] || []).slice(), i = arr.indexOf(id);
    if (i >= 0) arr.splice(i, 1); else arr.push(id);
    if (arr.length) state.weekly[k] = arr; else delete state.weekly[k];
    save();
  }
  function consistencyPct() {
    var total = 0, today = new Date(), n = dailyList().length;
    for (var i = 0; i < 14; i++) {
      var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      total += dayDone(dateKey(d)).length / n;
    }
    return total / 14 * 100;
  }
  function streakNeed() { return Math.min(3, dailyList().length); }
  function streak() {
    var today = new Date(), n = 0, i = 0, need = streakNeed();
    function ok(off) {
      var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - off);
      return dayDone(dateKey(d)).length >= need;
    }
    if (!ok(0)) i = 1;            // today still in progress: count from yesterday
    while (ok(i)) { n++; i++; }
    return n;
  }
  function last14() {
    var out = [], today = new Date();
    for (var i = 13; i >= 0; i--) {
      var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      var c = dayDone(dateKey(d)).length;
      out.push({ key: dateKey(d), count: c, today: i === 0 });
    }
    return out;
  }

  /* ---------- profile & shelf ---------- */
  function setProfile(k, v) { state.profile = state.profile || {}; state.profile[k] = v; save(); }
  function shelfType(id) { return window.BLOOM_SHELF_TYPES.filter(function (t) { return t.id === id; })[0]; }
  function parseKey(k) { var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function daysBetween(fromKey, toDate) {
    var a = parseKey(fromKey), b = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
    return Math.round((b - a) / 86400000);
  }
  function addShelf(typeId, name, daysAgo) {
    var d = new Date(); d.setDate(d.getDate() - (daysAgo || 0));
    state.shelf = state.shelf || [];
    state.shelf.push({ id: 's' + Date.now() + Math.floor(Math.random() * 1000), type: typeId, name: name || '', since: dateKey(d) });
    save();
  }
  function doneShelf(id) { (state.shelf || []).forEach(function (it) { if (it.id === id) it.since = dateKey(); }); save(); }
  function removeShelf(id) { state.shelf = (state.shelf || []).filter(function (it) { return it.id !== id; }); save(); }
  function shelfInfo(it) {
    var t = shelfType(it.type) || { name: 'Item', days: 30, verb: 'Replace', note: '' };
    var elapsed = daysBetween(it.since, new Date()), left = t.days - elapsed;
    return { type: t, elapsed: elapsed, left: left, overdue: left < 0, soon: left >= 0 && left <= Math.max(2, Math.round(t.days * 0.15)),
             pct: Math.max(0, Math.min(100, Math.round((1 - elapsed / t.days) * 100))) };
  }
  function shelfFreshness() {
    var list = state.shelf || [];
    if (!list.length) return null;
    var ok = list.filter(function (it) { return !shelfInfo(it).overdue; }).length;
    return Math.round(ok / list.length * 100);
  }
  function shelfDue() {
    return (state.shelf || []).filter(function (it) { var i = shelfInfo(it); return i.overdue || i.soon; });
  }

  /* ---------- scoring ---------- */
  function dimScore(dimId) {
    if (!state.baseline) return null;
    var b = state.baseline[dimId];
    if (b === null || b === undefined) return null;          // not applicable
    var cons = consistencyPct();
    if (dimId === 'home') { var f = shelfFreshness(); if (f !== null) cons = 0.5 * cons + 0.5 * f; }
    var s = W_BASE * b + W_MOD * modulesPct(dimId) + W_CONS * cons;
    return Math.round(Math.min(100, s));
  }
  function dimScores() { return DIMS.map(function (d) { return dimScore(d.id); }); }
  function overall() {
    var arr = dimScores().filter(function (s) { return s !== null; });
    if (!arr.length) return 0;
    return Math.round(arr.reduce(function (a, b) { return a + b; }, 0) / arr.length);
  }
  function levelIndex(score) {
    var idx = 0;
    LEVELS.forEach(function (l, i) { if (score >= l.min) idx = i; });
    return idx;
  }
  function level(score) {
    if (score === undefined) score = overall();
    var i = levelIndex(score), next = LEVELS[i + 1] || null;
    return { index: i, name: LEVELS[i].name, blurb: LEVELS[i].blurb,
             next: next ? next.name : null,
             toNext: next ? next.min - score : 0,
             progress: next ? (score - LEVELS[i].min) / (next.min - LEVELS[i].min) : 1 };
  }
  function snapshot() {
    if (!state.baseline) return;
    var key = dateKey(), score = overall();
    var h = state.history, last = h[h.length - 1];
    if (last && last.date === key) last.score = score; else h.push({ date: key, score: score });
    if (h.length > 400) h.shift();
  }
  function firstScore() { return state.history.length ? state.history[0].score : null; }

  function weakest() {
    var best = null;
    DIMS.forEach(function (d, i) {
      var s = dimScore(d.id);
      if (s === null) return;
      if (!best || s < best.score) best = { dim: d, score: s };
    });
    return best;
  }
  function strongest() {
    var best = null;
    DIMS.forEach(function (d) {
      var s = dimScore(d.id);
      if (s === null) return;
      if (!best || s > best.score) best = { dim: d, score: s };
    });
    return best;
  }

  /* ---------- season & tip of the day ---------- */
  function autoSeason(d) {
    var m = (d || new Date()).getMonth() + 1;     // 1-12
    if (m === 11 || m === 12 || m === 1 || m === 2) return 'harmattan';
    if (m === 3) return 'hot';
    return 'rainy';
  }
  function season() { return state.season === 'auto' ? autoSeason() : state.season; }
  function tipOfDay() {
    var tips = window.BLOOM_TIPS, s = season();
    var pool = tips[s].concat(tips.general);
    var d = new Date(), dayNum = Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / 86400000);
    return pool[dayNum % pool.length];
  }

  /* ---------- backup ---------- */
  function exportData() { state.backedUp = true; save(); return JSON.stringify({ bloomBackup: 1, exported: new Date().toISOString(), data: state }); }
  function importData(text) {
    var o;
    try { o = JSON.parse(text); } catch (e) { return false; }
    var s = o && o.bloomBackup === 1 ? o.data : o;
    if (!s || typeof s !== 'object' || s.v !== 1 || typeof s.modules !== 'object' || typeof s.daily !== 'object') return false;
    state = Object.assign(blank(), s);
    save(); return true;
  }

  window.BloomEngine = {
    get state() { return state; },
    load: load, save: save, reset: reset, dateKey: dateKey,
    baselineFromAnswers: baselineFromAnswers, submitCheckup: submitCheckup,
    completeModule: completeModule, modulesPct: modulesPct,
    dayItems: dayItems, dayDone: dayDone, toggleDaily: toggleDaily,
    dailyList: dailyList, weeklyList: weeklyList, routineSteps: routineSteps, inRoutine: inRoutine,
    toggleRoutineStep: toggleRoutineStep, addCustomStep: addCustomStep, removeRoutineStep: removeRoutineStep,
    resetRoutine: resetRoutine, presetSteps: presetSteps, setRoutine: setRoutine, streakNeed: streakNeed,
    weeklyDone: weeklyDone, toggleWeekly: toggleWeekly, exportData: exportData, importData: importData, consistencyPct: consistencyPct,
    streak: streak, last14: last14,
    dimScore: dimScore, dimScores: dimScores, overall: overall, level: level,
    firstScore: firstScore, weakest: weakest, strongest: strongest,
    autoSeason: autoSeason, season: season, tipOfDay: tipOfDay,
    setProfile: setProfile, addShelf: addShelf, doneShelf: doneShelf, removeShelf: removeShelf,
    shelfInfo: shelfInfo, shelfFreshness: shelfFreshness, shelfDue: shelfDue, shelfType: shelfType,
    resetProgress: resetProgress, resetModule: resetModule,
    badges: function () { return state.badges || {}; }, takeNewBadges: takeNewBadges, certificate: certificate, checkBadges: checkBadges,
    weights: { base: W_BASE, mod: W_MOD, cons: W_CONS }
  };
})();
