# Bloom – Your Hygiene Guide

An installable, offline-capable PWA (plain HTML/CSS/JS, no build step) with a Hygiene-o-meter, 12 lessons, a product finder, a shelf tracker, a label decoder, a routine builder, backup/restore, a Find care page, a printable pocket guide, and badges with a completion certificate.

## Host it (needed for install and offline use)
PWAs only install from `https://` (or `localhost`). Pick one:

**Netlify Drop (easiest):** go to app.netlify.com/drop, drag this whole folder onto the page, and open the link it gives you.

**GitHub Pages:** create a repo, upload the folder contents (index.html at the top level), then Settings → Pages → deploy from the main branch. Your link will be `https://<you>.github.io/<repo>/`.

Any static host works. Keep all files together; paths are relative.

## Install on a phone
- **Android (Chrome):** open the link, tap the Install banner in the app, or Chrome menu → Install app.
- **iPhone (Safari):** Share → Add to Home Screen.

## Updating
Edit the files, then **change `VERSION` in `sw.js`** (for example `bloom-v6`) before re-uploading. Otherwise phones keep the old cached copy.

## Where things live
- `js/modules/m1.js … m12.js`: lesson content
- `js/content.js`: modules list, daily items, routine catalog, shelf types
- `js/care.js`: Find-care contacts (update when numbers change) and badge definitions
- `js/finder.js`, `js/labels.js`: product finder and label decoder
- `js/engine.js`: scoring, storage, backup
- `js/app.js`, `styles.css`: interface and theme

Data is stored only on the user's device (localStorage key `bloom.v1`).

## Before you publish
Have a qualified clinician review `CLINICAL-REVIEW.md`. If you add affiliate links or paid partnerships, change the "examples, not endorsements" wording in the Products section.

## Keeping contacts current
Edit `js/care.js` (and the "Get help" box in `viewCheatsheet` in `js/app.js`), update the `checked` date, bump `VERSION` in `sw.js`, and regenerate the PDF by opening `#/cheatsheet` and choosing Print → Save as PDF.

## App lock
Users can set a 4–6 digit PIN in My Meter → App lock. It is stored only as a salted hash on the phone (key `bloom.lock`), is asked for on opening and after 2 minutes away, and locks out briefly after 5 wrong tries. It is a privacy screen, not encryption, and cannot be recovered; "Forgot my PIN" erases the app's data. It needs https (or localhost). The Find care page and pocket guide stay available while locked.

## Resetting
My Meter → **Reset my progress** clears scores, quizzes, daily ticks, streaks and badges but keeps name, shelf, routine, season and product profile. Each finished module also has "Reset this module's score". **Clear all my data** erases everything.
