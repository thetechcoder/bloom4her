window.BLOOM_LESSONS = window.BLOOM_LESSONS || {};
window.BLOOM_LESSONS.m1 = {
  mins: 8,
  intro: 'Before routines and products, you need the "why". This module explains how your skin, sweat and germs work, and why a hot, humid climate changes the rules. Everything else in Bloom builds on it.',
  cards: [
    { h: 'What hygiene really is',
      p: ['Hygiene is the set of habits that keeps you clean, comfortable and healthy. It is about **health first**: fewer harmful germs, fewer infections, less odour, more confidence.',
          'It is not about shame, perfume, or trying to erase every smell. A healthy body has a natural scent, and that is normal.'],
      tip: 'Think "care", not "cleanliness policing". You are looking after a body you will live in for decades.' },
    { h: 'Good germs and bad germs',
      p: ['Your skin, mouth, gut and vagina are home to trillions of microbes. Most are harmless, and many are **protective**: they crowd out harmful germs and keep your skin and body balanced.',
          'The goal of hygiene is to reduce harmful germs and wash away sweat and dirt, **not to sterilise yourself**. Over-cleaning with harsh products can kill the good ones and invite problems.'] },
    { h: 'How sweat and odour work',
      p: ['Sweat comes from two kinds of glands. **Eccrine glands** are all over your body and make watery sweat that cools you down. **Apocrine glands** sit mainly in the underarms and groin and make a thicker sweat.',
          'Fresh sweat has almost no smell. **Odour appears when skin bacteria break sweat down.** That is why washing, drying and clean clothes work: they remove the sweat and the bacteria feeding on it.'],
      list: ['More heat means more sweat.', 'More humidity means sweat stays on the skin longer.', 'Some people simply sweat more, because of genes and hormones. It does not mean they are dirty.'] },
    { h: 'Your skin barrier',
      p: ['The top layer of your skin is a protective barrier. It is slightly acidic, which helps keep harmful germs away, and it holds in moisture.',
          'Harsh soaps, hot water, hard scrubbing and strong chemicals strip this barrier. The result is dryness, itching, rashes, and skin that gets infected more easily.'],
      tip: 'Mild soap, lukewarm water, gentle hands, and moisturiser after bathing protect your barrier.' },
    { h: 'The tropical factor',
      p: ['Heat and humidity are the perfect home for bacteria and fungi. That is why skin folds, feet, the groin and the scalp need extra care in Nigeria. Each season adds its own challenge:'],
      list: ['**Harmattan:** dry air, dust, cracked skin, dry scalp and lips.', '**Hot and dry (March):** heavy sweating, heat rash, dehydration.', '**Rainy season:** damp clothes, damp bathrooms, fungal infections, and clothes that never quite dry.'],
      tip: 'Check the season setting in My Meter. Bloom changes its daily tips to match.' },
    { h: 'How germs travel',
      p: ['Germs move from person to person, and from surfaces to you, through a few main routes: **hands, water, food, shared items and surfaces.**',
          'Break the chain at those points: wash your hands, use safe clean water, keep personal items (towels, razors, toothbrushes, sponges) to yourself, and clean what you touch most.'] },
    { h: 'Clean, Dry, Breathe',
      p: ['One simple rule will carry you through this whole guide:'],
      list: ['**Clean:** wash sweat, dirt and germs away, gently.', '**Dry:** moisture is where fungus and bacteria grow. Dry thoroughly, especially skin folds and between toes.', '**Breathe:** loose, breathable fabrics and air let skin stay healthy.'],
      try: 'Tonight, notice one place where you rush the "Dry" step, such as between your toes or under your breasts. Spend 30 extra seconds there.' },
    { h: 'More is not always better',
      p: ['Bathing three times a day with strong soap, scrubbing hard, using antiseptic in the bath daily, and using heavily scented products can all backfire. They dry the skin, upset its balance and cause irritation.',
          'Aim for **enough**: clean, comfortable, and kind to your skin.'] }
  ],
  myths: [
    { myth: 'If I can’t smell anything, I’m clean.', truth: 'Your nose gets used to your own scent, so you often can’t smell yourself. Hygiene is about habits, not just smell.' },
    { myth: 'Stronger, antibacterial soap is always better.', truth: 'For healthy skin, mild soap and water do the job. Harsh and antibacterial products add little and can damage your skin barrier.' },
    { myth: 'Sweating means I’m dirty.', truth: 'Sweating is your body’s cooling system. It is the bacteria acting on sweat that creates odour, and washing and drying deal with that.' }
  ],
  redflags: [
    'A sudden, strong change in body odour that doesn’t improve with good hygiene.',
    'Drenching sweats that soak your clothes with no heat or exercise, or night sweats that keep happening.',
    'A rash that spreads, is painful, or has pus, especially with fever.',
    'Sores or skin patches that won’t heal.'
  ],
  takeaways: [
    'Hygiene protects health. It is not about shame.',
    'Odour = sweat + bacteria. Wash, dry, and wear clean clothes.',
    'Protect your skin barrier. Gentle beats harsh.',
    'In the tropics: Clean, Dry, Breathe.',
    'See a clinician early if something feels off.'
  ],
  scenarios: [
    { q: 'It’s 3pm, you’re sweaty from Lagos traffic, and you have a meeting in 20 minutes. What do you do?',
      opts: [
        { t: 'Spray plenty of perfume over it', p: 0, why: 'Perfume sits on top of sweat and bacteria. It masks the smell briefly, then mixes with it.' },
        { t: 'Wipe your underarms with a damp clean cloth or unscented wipe, dry them, reapply deodorant, and change your top if you can', p: 2, why: 'Removing the sweat, drying, then reapplying is the whole recipe: Clean, Dry, Breathe.' },
        { t: 'Wipe with a wet tissue and leave the skin damp', p: 1, why: 'Good start, but damp skin keeps bacteria busy. Dry before deodorant.' } ] },
    { q: 'A friend says you should add Dettol to your bath water every single day to be extra clean. What’s your response?',
      opts: [
        { t: 'Do it daily. More germs killed is better', p: 0, why: 'Daily antiseptic is unnecessary for healthy skin and can dry and irritate it.' },
        { t: 'Skip it. Mild soap and clean water are enough for daily bathing', p: 2, why: 'Correct. If you have a specific skin problem, ask a nurse or doctor what to use.' },
        { t: 'Use a lot of it, but only on weekends', p: 1, why: 'Less harmful than daily, but still not needed for healthy skin.' } ] },
    { q: 'It’s harmattan and your skin feels tight and flaky after bathing. Best move?',
      opts: [
        { t: 'Switch to hot water and scrub harder to remove the flakes', p: 0, why: 'Hot water and scrubbing strip the barrier and make dryness worse.' },
        { t: 'Skip moisturiser and dust on powder', p: 1, why: 'Powder doesn’t replace lost moisture. Dry skin needs moisturiser.' },
        { t: 'Bathe in lukewarm water, pat dry, and moisturise while skin is still slightly damp', p: 2, why: 'Moisturiser traps water in the skin. Doing it within a few minutes of bathing works best.' } ] },
    { q: 'In the rainy season your clothes are still damp after a day on the line. What should you do?',
      opts: [
        { t: 'Wear them anyway, they’ll dry on your body', p: 0, why: 'Damp clothes against skin invite fungus, rashes and odour.' },
        { t: 'Iron them dry before wearing', p: 2, why: 'Heat from the iron dries them fully and also kills tumbu fly eggs that can hide in damp-dried clothes.' },
        { t: 'Hang them indoors near a fan and wear them when mostly dry', p: 1, why: 'Better than wearing them damp. Make sure they are completely dry, especially underwear.' } ] },
    { q: 'You and your sister share one towel because "we’re family". What’s the healthiest approach?',
      opts: [
        { t: 'Keep sharing and wash it when it smells', p: 0, why: 'A damp shared towel passes skin bacteria and fungi between you.' },
        { t: 'Share but wash it weekly', p: 1, why: 'Better, but each of you should have your own so germs don’t move between you.' },
        { t: 'Each of you has your own towel, hung open to dry between uses', p: 2, why: 'Own towel, fully dried. Simple and effective.' } ] }
  ]
};
