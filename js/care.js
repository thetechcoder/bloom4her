/* Find-care data and badge definitions. Contact details last checked November 2026. */
window.BLOOM_CARE = {
  checked: 'November 2026',
  emergency: {
    title: 'In an emergency',
    body: 'Call **112**, Nigeria’s national emergency number. It is still being rolled out, so if it doesn’t connect, call your local emergency line (in Lagos, **767**) or go straight to the nearest hospital. Heavy bleeding, trouble breathing, fits, or severe pain are emergencies.'
  },
  where: [
    { t: 'Pharmacist', e: '💊', body: 'Good for first advice, condoms, emergency contraception, pregnancy tests, treatments for simple problems and “do I need a doctor?”. Choose a registered pharmacy and ask to speak with the pharmacist.' },
    { t: 'Primary health centre (PHC)', e: '🏥', body: 'Usually the nearest and lowest-cost option. Often offers antenatal care, immunisation, family planning and basic testing. A good first stop.' },
    { t: 'General or teaching hospital', e: '🩺', body: 'Doctors, labs and specialists such as gynaecologists. Usually the place for HIV testing and treatment, cervical screening, complications in pregnancy, and emergencies.' },
    { t: 'Private clinic or laboratory', e: '🔬', body: 'Often quicker and more private, but costs more. Ask the price before tests, and check that the doctor or lab is registered.' }
  ],
  ask: [
    'Services and prices change. Call ahead and ask: “Do you offer ___, what does it cost, and what hours are you open?”',
    'You can ask for a female clinician. You can bring a friend or relative.',
    'Be honest about sex, products and herbs you use. Clinicians are there to treat, not judge.',
    'Write down your symptoms and dates first (see module 12).'
  ],
  maps: [
    { t: 'Pharmacies near me', q: 'pharmacy near me' },
    { t: 'Primary health centres near me', q: 'primary health centre near me' },
    { t: 'Hospitals with a gynaecology unit', q: 'hospital gynaecology near me' },
    { t: 'HIV testing and counselling', q: 'HIV testing centre near me' }
  ],
  violence: {
    title: 'If you have been sexually assaulted or abused',
    intro: 'It is never your fault. You can get care and support, whether or not you decide to report. Treatments such as PEP (within 72 hours) and emergency contraception work best early.',
    items: [
      { t: 'Mirabel Centre, Lagos', body: 'Inside the Lagos State University Teaching Hospital (LASUTH), Ikeja. A sexual assault referral centre offering free medical care, counselling and legal support.' },
      { t: 'Lagos State Domestic and Sexual Violence Agency (DSVA)', body: '24-hour toll-free helpline **0800-333-333**, or dial **\*6820#** on MTN. Website: www.dsvrtlagos.org. Offers counselling, legal help and referrals.' },
      { t: 'Outside Lagos', body: 'Sexual assault referral centres now exist in other states. Ask any government hospital or the police to direct you to the nearest one.' }
    ]
  },
  mind: 'If low mood, anxiety or thoughts of harming yourself last more than a couple of weeks, tell a doctor or someone you trust. It is common and treatable. If you are in danger right now, call 112 or go to the nearest hospital.'
};

/* Badges: rule ids are evaluated in engine.js */
window.BLOOM_BADGES = [
  { id: 'checkup',  e: '🌱', name: 'First step',      desc: 'Finish your starting check-up.' },
  { id: 'lesson1',  e: '📖', name: 'First lesson',    desc: 'Finish a module quiz.' },
  { id: 'half',     e: '📚', name: 'Halfway there',   desc: 'Finish 6 modules.' },
  { id: 'allmods',  e: '🎓', name: 'Cover to cover',  desc: 'Finish all 12 modules.' },
  { id: 'top',      e: '⭐', name: 'Top marks',        desc: 'Score 100% on a module.' },
  { id: 'intimate', e: '🌺', name: 'Intimate-care scholar', desc: 'Score 70% or more on modules 3, 10 and 11.' },
  { id: 'streak3',  e: '🔥', name: '3-day streak',    desc: 'Keep a streak for 3 days.' },
  { id: 'streak7',  e: '🔥', name: '7-day streak',    desc: 'Keep a streak for 7 days.' },
  { id: 'streak14', e: '🔥', name: '14-day streak',   desc: 'Keep a streak for 14 days.' },
  { id: 'routine',  e: '🗓️', name: 'Routine builder', desc: 'Build your own routine.' },
  { id: 'shelf',    e: '🧴', name: 'Shelf keeper',    desc: 'Track 3 or more shelf items and have them all on time.' },
  { id: 'backup',   e: '💾', name: 'Safe and sound',  desc: 'Download a backup of your progress.' },
  { id: 'lvl1',     e: '🌸', name: 'Petal',           desc: 'Reach the Petal level.' },
  { id: 'lvl2',     e: '🌷', name: 'Bloom',           desc: 'Reach the Bloom level.' },
  { id: 'lvl3',     e: '✨', name: 'Radiant',         desc: 'Reach the Radiant level.' },
  { id: 'lvl4',     e: '👑', name: 'Velvet',          desc: 'Reach the Velvet level.' }
];
