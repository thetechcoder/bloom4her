window.BLOOM_LESSONS = window.BLOOM_LESSONS || {};
window.BLOOM_LESSONS.m12 = {
  mins: 11,
  intro: 'Your body and your life change over the years. This final module covers perimenopause and menopause, caring for yourself in later life, getting through low-energy days, regular check-ups, and building a routine that fits you.',
  cards: [
    { h: 'Perimenopause and menopause',
      p: ['Perimenopause is the years before your periods stop, often starting in the 40s. **Menopause** is when you haven’t had a period for 12 months. Hormone changes can bring hot flushes, night sweats, sleep trouble, mood changes, and changes in the vagina and bladder.'],
      list: ['Expect **more sweating**. Wear breathable cotton, layer clothes, use a fan, and keep a spare top.', 'Bathe or freshen up more often, and keep skincare gentle.', 'Periods may become irregular, lighter, heavier or further apart before they stop.', 'Doctors can help with symptoms. Ask about your options, including medicines.', 'Weight-bearing exercise, calcium and vitamin D help protect your bones.'] },
    { h: 'Vaginal dryness, UTIs and comfort',
      list: ['Lower oestrogen can cause **dryness, itching, burning and pain during sex**, and make urinary infections more likely.', 'A **water-based lubricant** and a vaginal moisturiser can help. Avoid scented products and douches.', 'Pass urine regularly, drink water, and wipe front to back.', 'Ask a clinician about local treatments if dryness persists. They are often very effective.', 'Pelvic floor exercises can help with leaking and support.'],
      tip: 'Don’t suffer in silence. These changes are common and treatable.' },
    { h: 'Bleeding after menopause is never normal',
      p: ['Any bleeding or spotting **after menopause** (12 months without periods) needs to be checked by a doctor, even if it is light or only happens once. It is often harmless, but it can be a sign of something serious that is easier to treat early.'] },
    { h: 'Caring for yourself in later life',
      list: ['Keep up daily washing. If standing or reaching is hard, use a **shower chair**, a handheld shower, grab bars and non-slip mats.', 'Dry skin folds well, and moisturise to prevent cracks. Check your feet every day, especially if you have diabetes.', 'Keep nails short and clean. Ask a podiatrist for foot problems rather than cutting corns yourself.', 'Brush or clean dentures daily, and remove them at night. See a dentist regularly.', 'Drink water through the day. Thirst fades with age.', 'If you leak urine, change pads often, wash the area with water, and pat dry. Barrier cream protects skin. A clinician can help treat the cause.', 'Ask a family member or carer for help without shame. Accepting help is a strength.'] },
    { h: 'Low-energy days: the minimum routine',
      p: ['Some days you’re ill, exhausted, grieving, low in mood, or caring for others. Your hygiene doesn’t need to be perfect. It needs to be **enough**.'],
      list: ['**Hands:** wash before eating and after the toilet.', '**Teeth:** brush once, even if brief.', '**Intimate area:** wash the outside with water. Change underwear.', '**Water:** drink a few glasses.', '**Body:** a quick wipe of the face, underarms and groin with a clean damp cloth if a shower feels like too much.', 'Do the rest when you have energy.'],
      tip: 'Long periods of low mood, losing interest in washing or eating, or feeling hopeless are worth talking to a doctor or someone you trust about.' },
    { h: 'Your regular check-up list',
      list: ['**Blood pressure and weight:** at least yearly.', '**Blood sugar and cholesterol:** ask your doctor how often.', '**Cervical screening:** ask your doctor when and how often.', '**Breast awareness:** know how your breasts normally look and feel, report any change, and ask your clinician about breast checks and screening.', '**STI and HIV testing:** after any new risk, and regularly if you have new or multiple partners.', '**Dental check-up:** every 6 to 12 months.', '**Eye test:** every 1 to 2 years, or as advised.', '**Vaccines:** ask what you’re due for, such as tetanus, hepatitis B, HPV or flu.', '**Mental health:** it counts as health. Ask for help early.'],
      try: 'Pick two items from this list that you’re overdue for and book them this month.' },
    { h: 'Getting the most from a doctor’s visit',
      list: ['Write down your **symptoms, when they started, what makes them better or worse**, and any medicines or herbs you take.', 'Note your last period date and cycle pattern.', 'Write down your questions and bring them.', 'Be honest about sex, products and habits. Clinicians have heard it before and are there to help, not judge.', 'Ask what the plan is, what to watch for, and when to come back.', 'Bring a trusted person if it helps, and ask for a female clinician if you prefer.'] },
    { h: 'Building your own routine',
      p: ['You have the knowledge. The goal now is a routine that fits **your** body, skin, climate, budget and schedule. The best routine is one you’ll actually do.'],
      list: ['Start small: a short morning, midday and evening routine.', 'Attach habits to things you already do, like brushing your teeth.', 'Use the **seasons** to adjust: richer moisturiser in harmattan, lighter and more frequent washing in heat and rain.', 'Check your **Shelf** for things that need replacing.', 'Review it every few months. Your life changes, and your routine can too.'],
      tip: 'Use the Routine builder in the Daily tab to set your own steps and watch your Hygiene-o-meter grow.' }
  ],
  myths: [
    { myth: 'Menopause means the end of your sex life and your vitality.', truth: 'Many women have healthy, active lives afterwards. Treatments for dryness and other symptoms work well.' },
    { myth: 'Light spotting after menopause is nothing to worry about.', truth: 'Any bleeding after menopause should be checked.' },
    { myth: 'Leaking urine is a normal part of ageing, and you must live with it.', truth: 'It is common but treatable. Pelvic floor exercises and medical care help many women.' },
    { myth: 'You only need a doctor when you’re sick.', truth: 'Regular check-ups find problems early, when they are easier to treat.' }
  ],
  redflags: [
    'Any bleeding or spotting after menopause.',
    'Very heavy bleeding, bleeding between periods, or periods lasting much longer than usual.',
    'A new breast lump, nipple discharge, skin changes or persistent breast pain.',
    'Persistent low mood, hopelessness, or thoughts of self-harm.',
    'Painful urination with fever, or repeated urinary infections.',
    'Sudden confusion, severe weakness, or new loss of bladder or bowel control.'
  ],
  takeaways: [
    'Menopause brings changes in sweating, sleep, mood and the vagina. Help is available.',
    'Any bleeding after menopause needs a doctor’s check.',
    'On low-energy days, the minimum routine (hands, teeth, groin wash, water) is enough.',
    'Book regular check-ups, including blood pressure, cervical screening, breast awareness and testing.',
    'Build a routine you’ll actually do, and review it as life changes.'
  ],
  scenarios: [
    { q: 'You are 54, haven’t had a period for 18 months, and notice light spotting. What do you do?',
      opts: [
        { t: 'Ignore it. It’s very light', p: 0, why: 'Bleeding after menopause always needs checking.' },
        { t: 'Book a doctor’s visit soon to have it checked', p: 2, why: 'Most causes are harmless, but early checking matters.' },
        { t: 'Try a herbal remedy first', p: 1, why: 'Delaying a check could hide something serious.' } ] },
    { q: 'You’re exhausted after a hard week and showering feels impossible. What’s a healthy compromise?',
      opts: [
        { t: 'Skip washing entirely until you feel better', p: 0, why: 'Skipping everything can lead to rashes and infections.' },
        { t: 'Do the minimum: wash hands, brush teeth once, quick wipe of key areas, change underwear, drink water', p: 2, why: 'A minimum routine keeps you healthy on hard days.' },
        { t: 'Force a full routine and feel awful', p: 1, why: 'Overdoing it isn’t necessary. Enough is enough.' } ] },
    { q: 'Since menopause, sex has become painful and dry. A friend says to just put up with it. What’s better?',
      opts: [
        { t: 'Put up with it. It’s part of ageing', p: 0, why: 'Pain is a signal. It’s common and treatable.' },
        { t: 'Try a water-based lubricant, avoid scented products and ask a clinician about treatments', p: 2, why: 'Simple measures and medical treatments work well.' },
        { t: 'Use perfumed soaps to feel fresher', p: 0, why: 'Scented products make irritation worse.' } ] },
    { q: 'You’re going to see a doctor about unusual periods. What helps most?',
      opts: [
        { t: 'Go with no notes and hope you remember', p: 1, why: 'You may forget important details.' },
        { t: 'Write down symptoms, dates, medicines and herbs you use, and your questions', p: 2, why: 'Clear information leads to better care.' },
        { t: 'Hide the herbal remedies in case the doctor judges', p: 0, why: 'Herbs can interact with treatment. Honesty is safer.' } ] },
    { q: 'Your 78-year-old mother leaks urine and is embarrassed to bathe. What’s the best support?',
      opts: [
        { t: 'Tell her to hide it and stay home', p: 0, why: 'Shame leads to skin problems and isolation.' },
        { t: 'Help her gently with washing, suitable pads and barrier cream, and encourage a medical check', p: 2, why: 'Dignity, comfort and treatment all matter.' },
        { t: 'Scold her to be more careful', p: 0, why: 'It’s not her fault. It’s a health issue.' } ] }
  ]
};
