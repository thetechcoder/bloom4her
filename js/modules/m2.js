window.BLOOM_LESSONS = window.BLOOM_LESSONS || {};
window.BLOOM_LESSONS.m2 = {
  mins: 9,
  intro: 'Bathing sounds simple, but how often, in what order, and with what makes a real difference in a hot climate. This module also tackles body odour and the deodorant vs antiperspirant question.',
  cards: [
    { h: 'How often should you bathe?',
      p: ['In Nigerian weather, bathe **at least once a day**. In hot or humid weather, or after heavy sweating or exercise, a second wash or quick freshen-up keeps odour and skin problems away.',
          'Bathing doesn’t need to be long. Five to ten minutes is plenty.'] },
    { h: 'Water: temperature and safety',
      p: ['**Lukewarm water** is best. Very hot water strips natural oils, especially in harmattan.',
          'Bucket baths are completely fine. What matters is that the **water is clean**. Use a clean container and cup, not one that has been sitting uncovered or that others have dipped dirty hands into.'] },
    { h: 'Soap: what and how',
      p: ['Use a **mild soap or body wash** on your body. Keep strong, medicated or heavily scented products for specific skin problems, on advice.',
          'Body soap is for the body, not for inside the vagina, and not for your face. Use a gentle face cleanser on your face.'],
      list: ['Use your hands or a clean washcloth. A net sponge is optional.', 'Lather, wash, and **rinse well**. Leftover soap irritates skin, especially in folds.', 'Scrubbing hard doesn’t clean better. It damages the skin barrier.'] },
    { h: 'The zones that need extra attention',
      p: ['Sweat and bacteria collect in certain places. Wash these properly every day:'],
      list: ['**Underarms**', '**Under the breasts** and the **skin folds** of the belly and thighs', '**Groin and the outer genital area** (gently, with water or mild soap, outside only)', '**Between the buttocks**', '**Feet and between the toes**', '**Belly button, neck, behind the ears**'],
      tip: 'A simple order is face first, feet last. That way you don’t carry dirt back upwards.' },
    { h: 'Sponges, nets and towels',
      p: ['A wet sponge or net is a hotel for bacteria. Squeeze it out, hang it where **air can move** (not in the damp bathroom), and **replace it about every month**. Replace it sooner if it smells musty.',
          'Your towel should be yours alone. Hang it open to dry fully after each use and **wash it weekly**. A damp, balled-up towel grows bacteria and fungus.'] },
    { h: 'Body odour: what to do about it',
      p: ['Remember: odour comes from bacteria feeding on sweat. So you tackle it at three points:'],
      list: ['**Remove the sweat:** wash properly, especially underarms and groin.', '**Dry well:** bacteria thrive on damp skin.', '**Clean, breathable clothes:** synthetic fabrics hold on to odour. Cotton and other breathable fabrics let sweat evaporate. Wash worn clothes properly.'],
      p2: ['Trimming or removing underarm hair is optional. Hair can hold on to sweat, so some people find odour is less when it is shorter. It is your choice.'] },
    { h: 'Deodorant or antiperspirant?',
      p: ['They are not the same thing.'],
      list: ['**Deodorant** fights odour. It makes the skin less friendly to bacteria and adds fragrance.', '**Antiperspirant** reduces sweating itself, using aluminium-based ingredients that temporarily block sweat ducts.', 'Many products are both.'],
      p2: ['Apply to **clean, completely dry skin**. Antiperspirants can work even better when applied at night, then again in the morning if you like. If you get itching, burning or a rash, stop and try a different product.'],
      tip: 'Skip homemade mixes of lemon juice or baking soda on your underarms. They can burn or darken the skin.' },
    { h: 'Your freshen-up kit',
      p: ['Hot days and long days out are easier with a small kit in your bag:'],
      list: ['A small clean towel or cloth', 'Unscented wet wipes or a small bottle of water', 'Deodorant', 'Spare underwear', 'A spare pad if you menstruate, plus a small pouch for used ones'],
      try: 'Pack your kit tonight and keep it in your everyday bag so you never have to think about it.' },
    { h: 'A tropical-day routine',
      list: ['**Morning:** bathe, dry fully, deodorant or antiperspirant, clean cotton underwear, clean clothes.', '**Midday (if hot):** quick freshen-up with a wipe or damp cloth, dry, reapply deodorant if needed.', '**Evening:** bathe again if you sweated a lot, wash your face, dry between toes, and moisturise.', '**Weekly:** wash towels, replace or deep-clean your sponge, wash bedding.'] }
  ],
  myths: [
    { myth: 'Perfume or body spray can replace a bath.', truth: 'Perfume covers odour for a short while. It does not remove sweat or bacteria, and mixes with them.' },
    { myth: 'Lemon juice or baking soda is a natural deodorant.', truth: 'Both can irritate and burn the underarm skin, and can lead to dark patches. Safer options are available.' },
    { myth: 'Body odour means you are dirty.', truth: 'Genes, hormones, stress and food all affect how much you sweat and how it smells. A good routine helps, but odour alone is not a sign of being dirty.' }
  ],
  redflags: [
    'A new, strong odour that doesn’t improve with good hygiene, or a fruity or ammonia-like smell when you feel unwell.',
    'Heavy sweating that soaks clothes regularly with no heat or exercise, or drenching night sweats.',
    'Itchy bumps, boils or pus in the underarms or groin.',
    'Dark, thick, velvety patches that appear on the neck, underarms or groin. This can be linked to blood sugar and is worth a check-up.'
  ],
  takeaways: [
    'Bathe at least daily, and freshen up in hot weather.',
    'Lukewarm water, mild soap, rinse well.',
    'Replace sponges monthly and wash your towel weekly.',
    'Odour is sweat plus bacteria: wash, dry, wear breathable fabrics.',
    'Deodorant on clean, dry skin. Skip lemon and baking soda.'
  ],
  scenarios: [
    { q: 'You sweated heavily at an afternoon wedding and there’s an evening party next. What’s the best plan?',
      opts: [
        { t: 'Re-spray perfume and wear the same outfit', p: 0, why: 'You’d be layering perfume over sweat. It won’t last or smell right.' },
        { t: 'Freshen up: wash or wipe underarms and groin (outside), dry well, reapply deodorant, change into clean clothes', p: 2, why: 'Exactly right. Remove sweat, dry, then deodorant.' },
        { t: 'Just change your top', p: 1, why: 'Helpful, but the sweat and bacteria are still on your skin.' } ] },
    { q: 'A friend says to rub lemon juice and baking soda under your arms as a natural deodorant. You:',
      opts: [
        { t: 'Do it daily. Natural is safer', p: 0, why: 'Lemon is acidic and baking soda is alkaline. Both can burn and discolour the skin.' },
        { t: 'Politely skip it and use a regular deodorant on clean, dry skin', p: 2, why: 'Right. If a deodorant irritates you, try another type.' },
        { t: 'Try it once on a small patch first', p: 1, why: 'A patch test is sensible, but there are gentler and more reliable options.' } ] },
    { q: 'Your net sponge smells musty even after rinsing. What now?',
      opts: [
        { t: 'Keep using it. It still lathers', p: 0, why: 'A smelly sponge is full of bacteria, which go back onto your skin.' },
        { t: 'Wash it with soap and dry it in the sun, then keep using it', p: 1, why: 'Better than nothing, but a musty sponge is past its time.' },
        { t: 'Replace it, and hang the new one to dry in open air after each use', p: 2, why: 'Replace about monthly, and let air get to it.' } ] },
    { q: 'You’ve run out of deodorant and payday is days away. What do you do?',
      opts: [
        { t: 'Use plenty of perfume instead', p: 0, why: 'Perfume doesn’t stop odour at the source.' },
        { t: 'Wash underarms well with soap, dry fully, wear clean breathable tops, and freshen up midday with a damp cloth', p: 2, why: 'Good hygiene works even without product. Deodorant is a helper, not a substitute for washing.' },
        { t: 'Rub on a mix of lemon and baking soda', p: 0, why: 'This can burn the skin. Not worth the risk.' } ] },
    { q: 'You get out of a hot bath and apply antiperspirant straight away while still damp. What’s the issue?',
      opts: [
        { t: 'No issue, damp skin helps it spread', p: 0, why: 'Damp skin dilutes the product and it works less well. It can also irritate.' },
        { t: 'Wait until your skin is completely dry first', p: 2, why: 'Dry skin lets the product stay where it should. Night application can work even better.' },
        { t: 'Use twice as much to make up for it', p: 0, why: 'More product doesn’t fix damp skin and raises the chance of irritation.' } ] }
  ]
};
