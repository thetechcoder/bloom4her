window.BLOOM_LESSONS = window.BLOOM_LESSONS || {};
window.BLOOM_LESSONS.m8 = {
  mins: 11,
  intro: 'Your hygiene doesn’t stop at the front door. This module covers public toilets, danfos and buses, markets and street food, salons and piercings, the gym, and long trips, with realistic fixes for a busy Nigerian day.',
  cards: [
    { h: 'Public toilets',
      p: ['Your main risk in a public toilet isn’t the seat. It’s what your **hands** touch afterwards. Infections like STIs are not caught from toilet seats.'],
      list: ['Carry tissue, a small soap or sanitiser, and a small bottle of water.', 'If you want a clean seat, wipe it with tissue or cover it with paper.', 'Avoid hovering. It can stop your bladder emptying fully, which raises UTI risk. Wipe the seat instead.', 'Hang your bag on the hook, never on the floor.', 'Keep your phone in your bag.', 'Wash hands properly afterwards. If there is no water or soap, use sanitiser, then wash as soon as you can.'],
      try: 'Put a small hygiene pouch in your bag: tissue, sanitiser, a spare pad or liner, and a small plastic bag.' },
    { h: 'Danfos, buses, keke and okada',
      list: ['Sit with your hands in your lap. Hold poles and rails only when you need to, and **sanitise your hands afterwards**.', 'Don’t touch your face on the move.', 'Wear a breathable outfit and carry your freshen-up kit.', 'In dusty conditions, a scarf or mask helps your nose and lungs.', 'Shared helmets: a **clean cotton cap or scarf** underneath helps protect your scalp, and wash it often. Don’t skip the helmet itself. It saves lives.'] },
    { h: 'Markets and street food',
      list: ['Wash your hands before you eat, with soap and water if you can.', 'Choose food that is **freshly cooked, served hot and covered**. Avoid food sitting uncovered in the sun and flies.', 'Wash fruit and vegetables in clean water, and peel what you can.', 'Check sachet water: the **seal, the date and the NAFDAC number**. Avoid ice from unknown sources.', 'If you are unsure about water, boil it or use a trusted treatment method.'] },
    { h: 'Salons, spas and barbers',
      list: ['Towels, capes and robes should be **clean for each client**.', 'Combs, brushes and tools should be cleaned or sterilised between clients.', 'Wash basins should be rinsed and cleaned.', '**Piercing:** only a **new, sterile, single-use needle** or a sterile cartridge. Reused ear-piercing guns can spread infections.', 'Tattoos, microblading, and threading need the same: new needles or clean tools for every client.', 'If anything looks unclean, ask, or walk away.'],
      p2: ['After a piercing or tattoo, keep the area clean and dry. Redness that spreads, heat, pus, fever or increasing pain needs a clinician.'] },
    { h: 'Gyms and swimming',
      list: ['Wipe equipment before and after using it, and put a towel on benches.', 'Wear flip-flops in showers and changing rooms.', '**Shower soon after** exercising, then dry well and change into clean clothes.', 'Change out of wet swimwear quickly. Staying in it raises the risk of yeast infections and rashes.', 'Don’t swim with open wounds, and shower before and after the pool.'] },
    { h: 'Work, school, church and events',
      list: ['Wipe down your desk, keyboard and phone regularly.', 'Wash hands before eating, and after handshakes or hugging a crowd if you can.', 'Cover coughs and sneezes with your elbow, and stay home when you’re really unwell.', 'Long events in heavy or lace outfits: wear a cotton slip, freshen up midway, and change underwear afterwards.', 'Keep a spare pad, deodorant and a small towel in your bag.'] },
    { h: 'Long trips and road journeys',
      list: ['Drink water normally. Don’t cut your fluids to avoid toilet stops.', 'Plan toilet stops. **Holding urine for hours** raises your UTI risk.', 'Pack water, sanitiser, wipes, spare underwear, a spare pad and a small towel.', 'Change out of sweaty clothes at stops if you can.', 'Moisturise on flights, where the air is very dry, and sanitise your hands after touching shared surfaces.'] },
    { h: 'Things you should never share',
      list: ['Razors, toothbrushes and nail clippers', 'Towels, underwear and swimwear', 'Combs, brushes, wigs, caps and scarves', 'Lipstick, lip balm and eye makeup', 'Earphones that go in the ear canal, and anyone’s sweaty headgear'],
      tip: 'Sharing is caring, except for anything that touches your skin, mouth, eyes, hair or blood.' }
  ],
  myths: [
    { myth: 'You can catch an STI from a toilet seat.', truth: 'Extremely unlikely. STIs spread through sexual contact. The real risk in public toilets is germs on hands, so wash them.' },
    { myth: 'Hovering above the seat is the most hygienic option.', truth: 'It can tense your pelvic muscles and stop your bladder emptying fully. Wipe the seat or cover it with paper, and sit.' },
    { myth: 'Sachet water is always safe.', truth: 'Check the seal, the date and the NAFDAC number, and consider where it was stored. If in doubt, boil or treat it.' },
    { myth: 'Hand sanitiser kills every germ.', truth: 'It doesn’t work well on dirty or greasy hands, and some germs resist it. Soap and water is better.' }
  ],
  redflags: [
    'Diarrhoea or vomiting lasting more than 2 days, with blood, high fever or signs of dehydration like dizziness and very dark urine.',
    'Yellow eyes or skin, dark urine and pale stools (possible hepatitis).',
    'Redness, heat, swelling, pus or fever after a piercing, tattoo or waxing.',
    'Burning when you urinate after a long trip, especially with fever or back pain.',
    'A persistent itchy rash or peeling skin between the toes after using shared showers.'
  ],
  takeaways: [
    'Hands are the main risk in public toilets. Wash them.',
    'Carry a small hygiene pouch everywhere.',
    'Choose hot, freshly cooked food and check sachet water seals and NAFDAC numbers.',
    'Insist on sterile needles for piercings and tattoos.',
    'Shower and change soon after the gym or the pool, and never hold urine for hours.'
  ],
  scenarios: [
    { q: 'You used a public toilet with no soap, and there’s no water to wash with. What now?',
      opts: [
        { t: 'Wipe your hands on your clothes and move on', p: 0, why: 'This leaves germs on your hands and clothes.' },
        { t: 'Use an alcohol sanitiser (60% or more), and wash with soap and water at the first chance', p: 2, why: 'Sanitiser is a good stand-in until you can wash properly.' },
        { t: 'Rinse with a little water only', p: 1, why: 'Rinsing without soap removes little. Sanitiser is better.' } ] },
    { q: 'A salon offers to pierce your ears with a gun they use on every client. What do you do?',
      opts: [
        { t: 'Go ahead. It’s quick', p: 0, why: 'Reused piercing guns can pass on infections.' },
        { t: 'Ask them to wipe it with alcohol first', p: 1, why: 'Wiping isn’t the same as a sterile, single-use needle or cartridge.' },
        { t: 'Ask for a new, sterile, single-use needle or cartridge, or go to a licensed piercer', p: 2, why: 'Sterile equipment is the only safe option.' } ] },
    { q: 'You’re about to take a 6-hour road trip. What’s the healthiest plan?',
      opts: [
        { t: 'Plan toilet stops, drink water normally, and pack a small hygiene pouch', p: 2, why: 'This protects your bladder and keeps you fresh.' },
        { t: 'Drink almost nothing and stop only once', p: 1, why: 'Dehydration and holding urine raise your UTI risk.' },
        { t: 'Hold it as long as you can', p: 0, why: 'Holding urine for hours gives bacteria time to multiply.' } ] },
    { q: 'You’re hungry at a roadside stall. What do you do?',
      opts: [
        { t: 'Eat whatever is closest and just sanitise your hands', p: 0, why: 'Food sitting uncovered in the heat is a common source of stomach infections.' },
        { t: 'Eat the food but skip the water', p: 1, why: 'Skipping the water helps, but food safety matters too.' },
        { t: 'Wash your hands, choose hot, freshly cooked, covered food, and check the sachet water seal and NAFDAC number', p: 2, why: 'Hot food, clean hands and checked water cut your risk a lot.' } ] },
    { q: 'You finish a hard gym session and stay in your sweaty clothes for the rest of the afternoon. What’s better?',
      opts: [
        { t: 'Shower, dry well, and change into clean clothes. Wear flip-flops in the shower', p: 2, why: 'This prevents rashes, yeast infections and athlete’s foot.' },
        { t: 'Change your clothes but skip the shower', p: 1, why: 'Better than staying in sweat, but you still have sweat and bacteria on your skin.' },
        { t: 'Stay in them. You’ll sweat again anyway', p: 0, why: 'Trapped sweat is where fungus and irritation start.' } ] }
  ]
};
