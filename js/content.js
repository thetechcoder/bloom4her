/* Levels, modules, daily habits and tips */
window.BLOOM_LEVELS = [
  { name: 'Bud',     min: 0,  blurb: 'Every bloom starts here. You’ve taken the first step.' },
  { name: 'Petal',   min: 25, blurb: 'Foundations are forming. Keep going.' },
  { name: 'Bloom',   min: 50, blurb: 'Solid habits and real knowledge.' },
  { name: 'Radiant', min: 70, blurb: 'Confident, informed and consistent.' },
  { name: 'Velvet',  min: 90, blurb: 'Top of the class. You could teach this.' }
];

/* part, dim = which Hygiene-o-meter dimension the module feeds. available:false until built */
window.BLOOM_PARTS = [
  { id: 1, title: 'Part 1 · Foundations' },
  { id: 2, title: 'Part 2 · Cycle, hair and hands' },
  { id: 3, title: 'Part 3 · Everyday life' },
  { id: 4, title: 'Part 4 · Intimacy and every season' }
];

window.BLOOM_MODULES = [
  { id: 'm1',  n: 1,  part: 1, dim: 'habits',    title: 'Foundations',            blurb: 'How skin, sweat and germs work, and why the tropics change the rules.', available: true },
  { id: 'm2',  n: 2,  part: 1, dim: 'body',      title: 'Bathing & body odour',   blurb: 'How often, what to use, and a routine for hot weather.', available: true },
  { id: 'm3',  n: 3,  part: 1, dim: 'intimate',  title: 'Intimate health',        blurb: 'What’s normal, what’s not, and what to stop doing.', available: true },
  { id: 'm4',  n: 4,  part: 2, dim: 'menstrual', title: 'Menstrual hygiene',      blurb: 'Pads, tampons, cups, reusables, storage and disposal.', available: true },
  { id: 'm5',  n: 5,  part: 2, dim: 'skin',      title: 'Hair, scalp & skin',     blurb: 'Braids, weaves, wigs, shaving, waxing and skin fungus.', available: true },
  { id: 'm6',  n: 6,  part: 2, dim: 'habits',    title: 'Hands, nails, feet & mouth', blurb: 'Handwashing, salon safety, foot care and oral care.', available: true },
  { id: 'm7',  n: 7,  part: 3, dim: 'home',      title: 'Clothing & laundry',     blurb: 'Fabrics, bras, drying, ironing and shared items.', available: true },
  { id: 'm8',  n: 8,  part: 3, dim: 'home',      title: 'Public life & travel',   blurb: 'Public toilets, buses, markets, salons and gyms.', available: true },
  { id: 'm9',  n: 9,  part: 3, dim: 'home',      title: 'Home & water',           blurb: 'Safe water, bathrooms, towels and sponges.', available: true },
  { id: 'm10', n: 10, part: 4, dim: 'intimate',  title: 'Sexual health & hygiene',blurb: 'Before and after sex, condoms, STI prevention, screening.', available: true },
  { id: 'm11', n: 11, part: 4, dim: 'intimate',  title: 'Pregnancy, postpartum & contraception', blurb: 'Hygiene and what to expect.', available: true },
  { id: 'm12', n: 12, part: 4, dim: 'habits',    title: 'Every season of life',   blurb: 'Menopause, your personal routine, and when to see a doctor.', available: true }
];

window.BLOOM_DAILY = [
  { id: 'bath',  t: 'Bathed (and rinsed after heavy sweating)' },
  { id: 'undies',t: 'Put on fresh underwear' },
  { id: 'hands', t: 'Washed my hands at the key moments' },
  { id: 'teeth', t: 'Brushed my teeth morning and night' },
  { id: 'water', t: 'Drank plenty of water' }
];

window.BLOOM_SEASONS = {
  harmattan: { label: 'Harmattan', note: 'Dry, dusty air (Nov–Feb)' },
  hot:       { label: 'Hot & dry',  note: 'Peak heat (March)' },
  rainy:     { label: 'Rainy', note: 'Wet and humid (Apr–Oct)' }
};

window.BLOOM_TIPS = {
  general: [
    'Your vagina cleans itself. Wash only the outside, with warm water or a mild unscented wash.',
    'Wash your hands for 20 seconds with soap: palms, backs, between fingers and under nails.',
    'Change your pad every 4–6 hours, even if it doesn’t feel full.',
    'Wipe and wash from front to back, every time.',
    'Replace your toothbrush every 3 months, or after being ill.',
    'Cotton underwear lets your skin breathe. Change daily, and never wear them damp.',
    'Keep your own towel, and let it dry fully between uses.',
    'Don’t flush pads or tampons. Wrap them and use a covered bin.',
    'Early check-ups are cheaper and easier than late treatment. Don’t wait for it to get bad.'
  ],
  harmattan: [
    'Harmattan dries your skin. Moisturise within 3 minutes of bathing, while skin is still damp.',
    'Drink more water than usual. Dry air dehydrates you faster than you notice.',
    'Dust irritates eyes and noses. Rinse your face when you get home and keep lip balm close.',
    'Dry scalp? Cleanse gently and seal with a light oil. Don’t scratch with your nails.',
    'Lukewarm baths are kinder to harmattan skin than very hot ones.'
  ],
  hot: [
    'Heat rash loves sweat. Dry thoroughly, wear loose cotton and change out of damp clothes.',
    'A quick evening wash in hot weather beats sleeping in the day’s sweat.',
    'Carry a small towel or tissues, and change your pad more often when you sweat a lot.',
    'Apply deodorant to clean, dry skin. Applying it over sweat doesn’t work as well.',
    'Drink water before you feel thirsty. It helps your skin and your bladder.'
  ],
  rainy: [
    'Damp breeds fungus. Dry between your toes and skin folds fully every day.',
    'Iron clothes that dried outdoors, including underwear and towels, to kill tumbu fly eggs.',
    'Wet shoes and socks cause fungal infections. Change out of them as soon as you can.',
    'Bathrooms stay damp in the rains. Keep a window open and hang towels where air moves.',
    'Never wear underwear that’s not fully dry. Ironing finishes the job on rainy days.'
  ]
};

/* My Shelf: things that need replacing or washing on a schedule. days = how long between actions. */
window.BLOOM_SHELF_TYPES = [
  { id: 'sponge',    name: 'Bath sponge or net',          days: 30,  verb: 'Replace', done: 'Replaced today', note: 'Replace about monthly. Hang it to dry in open air.' },
  { id: 'towel',     name: 'Bath towel',                  days: 7,   verb: 'Wash', done: 'Washed today',    note: 'Wash weekly and dry fully between uses.' },
  { id: 'bedding',   name: 'Bed sheets and pillowcases',  days: 14,  verb: 'Wash', done: 'Washed today',    note: 'Wash every 1 to 2 weeks, more in hot weather.' },
  { id: 'toothbrush',name: 'Toothbrush',                  days: 90,  verb: 'Replace', done: 'Replaced today', note: 'Replace every 3 months, or after being ill.' },
  { id: 'razor',     name: 'Razor or blade',              days: 28,  verb: 'Replace', done: 'Replaced today', note: 'Replace after about 5 to 7 shaves, or when it tugs.' },
  { id: 'comb',      name: 'Combs and hair brushes',      days: 14,  verb: 'Wash', done: 'Washed today',    note: 'Wash every 1 to 2 weeks. Never share them.' },
  { id: 'wigcap',    name: 'Wig cap or hair scarf',       days: 7,   verb: 'Wash', done: 'Washed today',    note: 'Wash weekly, or sooner if you sweat a lot.' },
  { id: 'water',     name: 'Water storage container',     days: 14,  verb: 'Scrub', done: 'Scrubbed today',   note: 'Scrub regularly, keep covered, and use a clean tap or ladle.' },
  { id: 'deodorant', name: 'Deodorant or antiperspirant', days: 365, verb: 'Replace', done: 'Replaced today', note: 'Replace about a year after opening, or at the expiry date.' },
  { id: 'skincare',  name: 'Moisturiser or sunscreen',    days: 365, verb: 'Replace', done: 'Replaced today', note: 'Replace by the open-jar date or expiry, whichever comes first.' },
  { id: 'cup',       name: 'Menstrual cup',               days: 730, verb: 'Replace', done: 'Replaced today', note: 'Typically every 1 to 2 years. Check your brand’s guidance.' }
];

/* Routine builder catalog. Ids bath/undies/hands/teeth/water match the original Daily items so old ticks keep counting. */
window.BLOOM_ROUTINE = {
  blocks: [
    { id: 'morning', label: 'Morning', hint: 'Start the day fresh' },
    { id: 'midday',  label: 'Midday',  hint: 'Out and about' },
    { id: 'evening', label: 'Evening', hint: 'Wind down' },
    { id: 'weekly',  label: 'Weekly',  hint: 'Once a week. Ticked on the Daily tab, not scored' }
  ],
  steps: [
    { id: 'bath',    block: 'morning', t: 'Bathed (and rinsed after heavy sweating)' },
    { id: 'undies',  block: 'morning', t: 'Put on fresh underwear' },
    { id: 'teeth',   block: 'morning', t: 'Brushed my teeth morning and night' },
    { id: 'deo',     block: 'morning', t: 'Applied deodorant to clean, dry skin' },
    { id: 'skinam',  block: 'morning', t: 'Cleansed and moisturised my face (sunscreen if I use it)' },
    { id: 'hands',   block: 'midday',  t: 'Washed my hands at the key moments' },
    { id: 'water',   block: 'midday',  t: 'Drank plenty of water' },
    { id: 'freshen', block: 'midday',  t: 'Freshened up when sweaty (wipe, spare liner or pad)' },
    { id: 'wipe',    block: 'midday',  t: 'Wiped my phone' },
    { id: 'rinse',   block: 'evening', t: 'Rinsed off the day’s sweat and dust' },
    { id: 'skinpm',  block: 'evening', t: 'Cleansed and moisturised before bed' },
    { id: 'feet',    block: 'evening', t: 'Washed and dried my feet, between the toes too' },
    { id: 'hair',    block: 'evening', t: 'Covered my hair with a clean bonnet or scarf' },
    { id: 'sleepwear', block: 'evening', t: 'Changed into fresh, breathable sleepwear' },
    { id: 'wtowel',  block: 'weekly', t: 'Washed my towel' },
    { id: 'wbed',    block: 'weekly', t: 'Changed my bedding' },
    { id: 'wbath',   block: 'weekly', t: 'Cleaned the bathroom' },
    { id: 'wwater',  block: 'weekly', t: 'Scrubbed my water containers' },
    { id: 'wnails',  block: 'weekly', t: 'Checked and trimmed my nails' },
    { id: 'wsponge', block: 'weekly', t: 'Washed my sponge or scrub, and dried it' }
  ],
  presets: [
    { id: 'essentials', label: 'Essentials', note: 'The five basics', ids: ['bath', 'undies', 'teeth', 'hands', 'water'] },
    { id: 'busy',       label: 'Busy days',  note: 'Short and doable', ids: ['bath', 'undies', 'teeth', 'hands'] },
    { id: 'full',       label: 'Full care',  note: 'A thorough routine', ids: ['bath', 'undies', 'teeth', 'deo', 'skinam', 'hands', 'water', 'freshen', 'rinse', 'skinpm', 'feet', 'hair', 'wtowel', 'wbed', 'wbath', 'wwater', 'wnails', 'wsponge'] }
  ]
};
