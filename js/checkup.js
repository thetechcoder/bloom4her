/* Check-up questions. p = points (0-3). na:true = skipped, not counted. */
window.BLOOM_DIMS = [
  { id: 'body',     name: 'Body',            short: 'Body',      blurb: 'Bathing, sweat and body odour' },
  { id: 'intimate', name: 'Intimate',        short: 'Intimate',  blurb: 'Vaginal, urinary and sexual health' },
  { id: 'menstrual',name: 'Menstrual',       short: 'Period',    blurb: 'Period care and cycle awareness' },
  { id: 'skin',     name: 'Hair & Skin',     short: 'Skin & Hair', blurb: 'Scalp, hair removal and skin folds' },
  { id: 'home',     name: 'Home & Clothing', short: 'Home',      blurb: 'Clothes, towels and water at home' },
  { id: 'habits',   name: 'Habits & Mindset',short: 'Habits',    blurb: 'Hands, teeth and acting early' }
];

window.BLOOM_SECTIONS = {
  body:      { title: 'Your body', intro: 'Let’s start with the everyday basics.' },
  intimate:  { title: 'Intimate health', intro: 'Private, judgement-free. You can skip anything you prefer not to answer.' },
  menstrual: { title: 'Your period', intro: 'If you don’t have periods right now, just choose “Not applicable”.' },
  skin:      { title: 'Hair & skin', intro: 'Scalp, shaving and sweaty skin in a hot climate.' },
  home:      { title: 'Home & clothing', intro: 'What touches your skin every day.' },
  habits:    { title: 'Habits & mindset', intro: 'The small things that make everything else work.' }
};

window.BLOOM_QUESTIONS = [
  /* BODY */
  { id: 'b1', dim: 'body', q: 'How often do you bathe?',
    opts: [
      { t: 'A few times a week', p: 0 },
      { t: 'Once a day, though I skip some days', p: 1 },
      { t: 'Once every day', p: 2 },
      { t: 'Twice a day, or after heavy sweating', p: 3 } ],
    tip: 'In Nigerian heat, sweat meeting bacteria on your skin is what creates body odour. A daily bath is the minimum. A second quick wash after heavy sweating, or before bed in hot weather, keeps you fresh.' },
  { id: 'b2', dim: 'body', q: 'How do you handle underarm sweat and odour?',
    opts: [
      { t: 'I only use perfume or body spray', p: 0 },
      { t: 'Deodorant or antiperspirant, often over sweaty skin', p: 1 },
      { t: 'Nothing, but I wash my underarms well with soap', p: 2 },
      { t: 'Deodorant or antiperspirant on clean, completely dry skin', p: 3 } ],
    tip: 'Perfume covers odour, it doesn’t stop it. Wash with soap, dry fully, then apply deodorant or antiperspirant. Antiperspirants also work well when applied at night.' },
  { id: 'b3', dim: 'body', q: 'What do you do about your bath sponge or net?',
    opts: [
      { t: 'I’ve never thought about it', p: 0 },
      { t: 'I use it until it falls apart', p: 1 },
      { t: 'I rinse it, but it stays damp in the bathroom', p: 2 },
      { t: 'I squeeze it out, hang it where air moves, and replace it about monthly', p: 3 } ],
    tip: 'Wet sponges and nets hold dead skin and bacteria. Hang them to dry in open air and replace them every 3–4 weeks. A clean washcloth or your hands work just as well.' },

  /* INTIMATE */
  { id: 'i1', dim: 'intimate', q: 'What do you use to clean your vaginal area?',
    opts: [
      { t: 'Strong soap, disinfectant or antiseptic, sometimes inside', p: 0 },
      { t: 'My regular body soap, including inside', p: 1 },
      { t: 'Mild soap, on the outside only', p: 2 },
      { t: 'Plain warm water or a gentle unscented wash, outside only', p: 3 } ],
    tip: 'The vagina cleans itself. Only the outside (the vulva) needs washing. Disinfectants, strong soaps, douching and “tightening” products upset the healthy bacteria that protect you, and can lead to infections like BV and thrush.' },
  { id: 'i2', dim: 'intimate', q: 'After using the toilet, how do you wipe or wash?',
    opts: [
      { t: 'Back to front, or I’ve never thought about it', p: 0 },
      { t: 'It depends, sometimes one way and sometimes the other', p: 1 },
      { t: 'Always front to back, with tissue or water', p: 3 } ],
    tip: 'Front to back keeps bacteria from the anus away from the urethra and vagina. This one small habit lowers your risk of urinary tract infections. Pat dry instead of rubbing.' },
  { id: 'i3', dim: 'intimate', q: 'Which statement about vaginal discharge is closest to the truth?',
    opts: [
      { t: 'Any discharge means I have an infection', p: 0 },
      { t: 'I’m not sure what’s normal', p: 1 },
      { t: 'Some discharge is normal, but I don’t know when to worry', p: 2 },
      { t: 'Clear or milky discharge is normal and changes through the month. Itching, a strong smell or an unusual colour needs a check-up', p: 3 } ],
    tip: 'Normal discharge can be clear, white or creamy and changes with your cycle. See a clinician if you notice itching, burning, a strong fishy or foul smell, green, yellow or frothy discharge, or pain. Please don’t self-treat with drugs or herbal mixtures put inside the vagina.' },
  { id: 'i4', dim: 'intimate', q: 'How often do you go for sexual health check-ups (STI tests, cervical screening)?',
    opts: [
      { t: 'Never', p: 0 },
      { t: 'Only when I have a problem', p: 1 },
      { t: 'Occasionally', p: 2 },
      { t: 'Regularly, as advised for my age and situation', p: 3 },
      { t: 'I’d rather skip this one', na: true } ],
    tip: 'Many infections have no symptoms, so a test is the only way to know. Get tested with a new partner, or if a partner may have had others. Ask your doctor when cervical screening (Pap smear or HPV test) should start for you, and how often. The HPV vaccine is also worth asking about.' },

  /* MENSTRUAL */
  { id: 'm1', dim: 'menstrual', q: 'How often do you change your pad or tampon on a normal day of your period?',
    opts: [
      { t: 'Once or twice a day', p: 0 },
      { t: 'When it feels full or leaks, sometimes after 8+ hours', p: 1 },
      { t: 'Every 6–8 hours', p: 2 },
      { t: 'Every 4–6 hours, more often on heavy days', p: 3 },
      { t: 'Not applicable to me right now', na: true } ],
    tip: 'Blood sitting on a pad for hours grows bacteria, causing odour, rashes and infections. Change pads every 4–6 hours even if they don’t feel full. A tampon should never stay in longer than 8 hours. Wash your hands before and after.' },
  { id: 'm2', dim: 'menstrual', q: 'What do you do with used pads or tampons?',
    opts: [
      { t: 'Flush them down the toilet', p: 0 },
      { t: 'Throw them in an open bin or outside, unwrapped', p: 1 },
      { t: 'Wrap them well and put them in a covered bin', p: 3 },
      { t: 'Not applicable to me right now', na: true } ],
    tip: 'Pads and tampons block pipes and septic tanks, so never flush them. Wrap them (the wrapper from the new pad works well), use a covered bin, and wash your hands afterwards.' },
  { id: 'm3', dim: 'menstrual', q: 'Do you keep track of your cycle?',
    opts: [
      { t: 'No', p: 0 },
      { t: 'I roughly remember the dates', p: 1 },
      { t: 'I note the start date, flow and symptoms in a notebook or app', p: 3 },
      { t: 'Not applicable to me right now', na: true } ],
    tip: 'Tracking helps you learn your normal and spot changes early. See a doctor if you soak through a pad every hour, bleed for more than 7 days, have pain that stops your day, or your periods stop without a clear reason.' },

  /* SKIN & HAIR */
  { id: 's1', dim: 'skin', q: 'How do you care for your scalp and hair?',
    opts: [
      { t: 'I rarely wash it, sometimes weeks or months in one style', p: 0 },
      { t: 'I wash it occasionally', p: 1 },
      { t: 'I wash it every 2–4 weeks', p: 2 },
      { t: 'I cleanse my scalp every 1–2 weeks (even in braids or weaves) and keep wigs, caps and combs clean', p: 3 } ],
    tip: 'A sweaty, dirty scalp gets itchy, flaky and infected, even under braids or weaves. A diluted shampoo in a nozzle bottle cleans braids well. Dry fully, wash wig caps and scarves, and never share combs or brushes.' },
  { id: 's2', dim: 'skin', q: 'Which best describes how you remove body hair?',
    opts: [
      { t: 'I don’t remove body hair', p: 3 },
      { t: 'My own clean, sharp razor on wet soapy skin, or a salon using fresh wax sticks and new strips', p: 3 },
      { t: 'I dry shave, or use an old razor', p: 1 },
      { t: 'I share razors, or salons re-dip used wax sticks', p: 0 } ],
    tip: 'Bumps, cuts and infections usually come from dry shaving, old blades or shared tools. Shave on wet, soapy skin, with your own razor, and replace it often. At salons, check for a fresh stick every time and clean equipment. Not removing hair is perfectly healthy.' },
  { id: 's3', dim: 'skin', q: 'How do you care for sweaty skin folds (under breasts, groin, thighs, between toes)?',
    opts: [
      { t: 'I just rinse when I bathe', p: 0 },
      { t: 'I rinse, then dust powder over skin that’s still damp', p: 1 },
      { t: 'I dry thoroughly after bathing', p: 2 },
      { t: 'I dry thoroughly, wear breathable fabrics and change out of sweaty clothes quickly', p: 3 } ],
    tip: 'Trapped sweat is where fungal rashes love to grow. Dry fully after bathing, especially in folds and between toes, wear loose breathable fabrics, and change out of damp clothes fast. Avoid talc around the genital area.' },

  /* HOME & CLOTHING */
  { id: 'h1', dim: 'home', q: 'What’s your underwear routine?',
    opts: [
      { t: 'The same pair for 2+ days, or tight synthetic/lace all day', p: 0 },
      { t: 'Fresh daily, but mostly synthetic', p: 1 },
      { t: 'Fresh daily, cotton some of the time', p: 2 },
      { t: 'Fresh daily (more in hot weather), breathable cotton, washed well, dried fully in sun or ironed', p: 3 } ],
    tip: 'Cotton breathes, synthetics trap moisture. Sunlight is a natural disinfectant, and ironing clothes that dried outside (underwear and towels too) kills tumbu fly eggs, a common problem in Nigeria. Never wear damp underwear.' },
  { id: 'h2', dim: 'home', q: 'What about your bath towel?',
    opts: [
      { t: 'I share it and rarely wash it', p: 0 },
      { t: 'My own, washed about monthly', p: 1 },
      { t: 'My own, washed every 2 weeks', p: 2 },
      { t: 'My own, dried fully between uses, washed weekly', p: 3 } ],
    tip: 'Damp towels grow bacteria and fungus. Keep your own, hang it open to dry fully after use, and wash it weekly. Wash it more often if you’re prone to skin infections.' },
  { id: 'h3', dim: 'home', q: 'How is the water you use at home stored?',
    opts: [
      { t: 'In open containers, source unknown', p: 0 },
      { t: 'Covered containers that are rarely cleaned', p: 1 },
      { t: 'Covered and cleaned now and then', p: 2 },
      { t: 'Covered, scrubbed regularly, taken out with a clean tap or ladle, and drinking water is treated or from a safe source', p: 3 } ],
    tip: 'Contaminated water spreads typhoid, cholera and diarrhoea. Use clean, covered containers with a tap or a ladle used only for that purpose. Scrub containers regularly and treat or filter drinking water if you’re unsure of the source.' },

  /* HABITS */
  { id: 'a1', dim: 'habits', q: 'When do you wash your hands with soap?',
    opts: [
      { t: 'When they look dirty', p: 0 },
      { t: 'After the toilet, mostly', p: 1 },
      { t: 'After the toilet and before eating', p: 2 },
      { t: 'After the toilet, before eating or cooking, after public places, money and bins, and sanitiser when there’s no water', p: 3 } ],
    tip: 'Wash for about 20 seconds: palms, backs, between fingers, thumbs and under nails. Key moments are after the toilet, before eating or cooking, after bins, money and public surfaces, and when caring for someone sick. Sanitiser is a back-up, not a replacement.' },
  { id: 'a2', dim: 'habits', q: 'How do you care for your teeth and mouth?',
    opts: [
      { t: 'I brush occasionally', p: 0 },
      { t: 'Once a day', p: 1 },
      { t: 'Twice a day', p: 2 },
      { t: 'Twice a day with fluoride toothpaste, I clean my tongue, and replace my brush every 3 months', p: 3 } ],
    tip: 'Brush for two minutes, morning and night, with fluoride toothpaste. Clean your tongue, replace your toothbrush every 3 months or after an illness, and see a dentist yearly. Never share toothbrushes.' },
  { id: 'a3', dim: 'habits', q: 'When something feels off (itching, odour, pain, unusual discharge), what do you usually do?',
    opts: [
      { t: 'Ignore it and hope it passes', p: 0 },
      { t: 'Try a drug or herbal mixture from a shop without a check-up', p: 1 },
      { t: 'Search online or ask friends first', p: 2 },
      { t: 'See a nurse, pharmacist or doctor early', p: 3 } ],
    tip: 'Early care is cheaper, easier and safer. Self-treating with unknown drugs or herbal mixtures often hides the real problem or makes it worse. Your local clinic, a pharmacist or a trusted doctor are all good first stops.' }
];
