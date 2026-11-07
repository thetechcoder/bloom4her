/* Bloom app lock: a PIN that hides the app on this phone. The PIN is stored only as a salted PBKDF2 hash.
   This is a privacy screen, not encryption of the saved data. */
window.BloomLock = (function () {
  var KEY = 'bloom.lock', ITER = 150000;
  function supported() { return !!(window.crypto && crypto.subtle && crypto.getRandomValues && window.TextEncoder); }
  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function write(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); return true; } catch (e) { return false; } }
  function isSet() { var o = read(); return !!(o && o.hash && o.salt); }
  function b64(buf) { var a = new Uint8Array(buf), s = ''; for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]); return btoa(s); }
  function unb64(s) { var r = atob(s), a = new Uint8Array(r.length); for (var i = 0; i < r.length; i++) a[i] = r.charCodeAt(i); return a; }
  function derive(pin, salt, iter) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits'])
      .then(function (k) { return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: salt, iterations: iter }, k, 256); });
  }
  function same(a, b) { if (a.length !== b.length) return false; var d = 0; for (var i = 0; i < a.length; i++) d |= a[i] ^ b[i]; return d === 0; }
  function validPin(pin) { return /^\d{4,6}$/.test(pin); }
  function weakPin(pin) {
    if (/^(\d)\1+$/.test(pin)) return true;
    var asc = true, desc = true;
    for (var i = 1; i < pin.length; i++) {
      if (+pin[i] !== +pin[i - 1] + 1) asc = false;
      if (+pin[i] !== +pin[i - 1] - 1) desc = false;
    }
    return asc || desc;
  }
  function set(pin) {
    var salt = crypto.getRandomValues(new Uint8Array(16));
    return derive(pin, salt, ITER).then(function (h) {
      return write({ v: 1, iter: ITER, salt: b64(salt), hash: b64(h), fails: 0, until: 0 });
    });
  }
  function waitSecs() { var o = read(); return o && o.until > Date.now() ? Math.ceil((o.until - Date.now()) / 1000) : 0; }
  /* resolves { ok, wait, left } */
  function verify(pin) {
    var o = read();
    if (!o) return Promise.resolve({ ok: true, wait: 0 });
    var w = waitSecs();
    if (w) return Promise.resolve({ ok: false, wait: w });
    return derive(pin, unb64(o.salt), o.iter || ITER).then(function (h) {
      if (same(new Uint8Array(h), unb64(o.hash))) { o.fails = 0; o.until = 0; write(o); return { ok: true, wait: 0 }; }
      o.fails = (o.fails || 0) + 1;
      if (o.fails >= 5) o.until = Date.now() + Math.min(900, 30 * Math.pow(2, o.fails - 5)) * 1000;
      write(o);
      return { ok: false, wait: waitSecs(), left: Math.max(0, 5 - o.fails) };
    });
  }
  function remove() { try { localStorage.removeItem(KEY); } catch (e) {} }
  return { supported: supported, isSet: isSet, validPin: validPin, weakPin: weakPin, set: set, verify: verify, remove: remove, waitSecs: waitSecs };
})();
