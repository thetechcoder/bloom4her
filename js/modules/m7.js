window.BLOOM_LESSONS = window.BLOOM_LESSONS || {};
window.BLOOM_LESSONS.m7 = {
  mins: 11,
  intro: 'What you wear sits against your skin for hours, in the heat. This module covers fabrics, underwear, bras, washing, drying and ironing (with a Nigeria-specific warning about tumbu flies), and how to handle second-hand clothes.',
  cards: [
    { h: 'Why clothing matters for hygiene',
      p: ['Clothes soak up sweat, skin cells and bacteria. If they stay damp, aren’t washed properly or aren’t fully dried, they become the source of odour, rashes and fungal infections, no matter how well you bathe.'] },
    { h: 'Choosing fabrics for the tropics',
      list: ['**Best for daily wear:** cotton, linen and other breathable natural fabrics.', '**Be careful with:** polyester, nylon, lace and other synthetics worn tightly all day. They trap heat and moisture.', '**Sports fabrics** that wick sweat are fine for exercise. Change and wash them afterwards.', '**Tight shapewear and waist trainers:** limit the hours, and avoid wearing them in the heat for long. They trap sweat and can cause rashes and irritation.'],
      tip: 'For fitted or lace outfits, wear a cotton slip or lining, and change as soon as the event ends.' },
    { h: 'Underwear',
      list: ['Change **every day**, and again after heavy sweating or exercise.', 'Choose underwear with a **cotton crotch lining**.', 'Never wear damp underwear, and never share it.', 'Wash it with detergent, rinse well, and **dry fully in the sun**. Iron it if it dried outdoors or inside on a damp day.', 'Wash underwear **separately** from towels and cleaning cloths.', 'Replace it when the elastic is gone, it is worn thin, or stains won’t come out.', 'Sleeping in loose cotton, or giving your skin air at night, is a good habit.'] },
    { h: 'Bras',
      list: ['A bra that fits well and has a cotton lining is more comfortable in the heat.', 'Wash after **1 to 3 wears**, and after every sports session or very sweaty day.', 'Rotate at least **2 or 3 bras** so each can dry out.', 'Dry the skin under your breasts fully before you put one on.', 'Replace when the band stretches or the cups lose their shape, usually every 6 to 12 months.'] },
    { h: 'How to wash clothes properly',
      list: ['Sort: underwear and light items separate from towels and heavily soiled clothes.', 'Use enough detergent, and soak heavily sweaty items first.', '**Rinse until the water is clear.** Leftover soap irritates skin.', 'Don’t overload the machine.', 'Remove washing from the machine promptly. Wet laundry left in the drum goes sour fast.', 'If someone in the house has a skin infection, scabies or a stomach bug, wash their clothes and towels separately and, if possible, in hot water.', 'Wash your hands after handling soiled laundry.'] },
    { h: 'Drying, ironing and tumbu flies',
      p: ['**Sun-drying** helps clothes dry quickly and kills many germs. But in much of Nigeria, **tumbu flies** can lay eggs on clothes drying outdoors, especially on the ground, bushes or fences. The larvae can burrow into skin and cause painful boil-like lumps.'],
      list: ['**Iron everything that dried outdoors**, including underwear, towels, baby clothes and bedding, on both sides, especially seams and folds.', 'Don’t dry clothes on the ground or on bushes. Use a line or rack.', 'On rainy days, iron clothes dry before wearing, especially underwear.', 'Never fold or store clothes that are still damp.'],
      tip: 'This is also one of the best rainy-season habits. Ironing is a hygiene step, not just a neatness one.' },
    { h: 'Storage: keep it dry and separate',
      list: ['Store only **fully dry** clothes. Damp ones turn mouldy and smelly.', 'Let your wardrobe air out, and don’t cram it.', 'Keep worn and clean clothes apart, and use a ventilated laundry basket.', 'A musty smell means damp. Re-wash and dry before wearing.', 'Air your shoes and bags regularly.'] },
    { h: 'Second-hand clothes (okrika)',
      p: ['Second-hand clothes can be great value and perfectly safe if you treat them properly. They can also carry fungus, scabies mites and tumbu fly eggs.'],
      list: ['**Wash everything before wearing**, in hot water if the fabric allows, and **iron** it.', '**Don’t buy used underwear or swimwear.**', 'Be cautious with second-hand shoes. Clean and dry them well, and wear socks.'] },
    { h: 'Head wraps, scarves, hijabs and bedding',
      list: ['Head wraps, gele, scarves and hijabs absorb sweat and scalp oils. **Wash them regularly**, and wear a clean, breathable cotton layer underneath.', 'Wash pillowcases weekly if you can, and bed sheets every 1 to 2 weeks.', 'Let your mattress and pillows air in the sun occasionally.'] }
  ],
  myths: [
    { myth: 'Ironing is only for looking neat.', truth: 'Heat kills tumbu fly eggs and many germs. It’s a hygiene step for anything dried outdoors, and for damp-dried clothes on rainy days.' },
    { myth: 'It’s fine to wash underwear together with towels and everything else.', truth: 'Underwear should be washed separately to avoid spreading bacteria to and from other items.' },
    { myth: 'Second-hand clothes only need washing if they look dirty.', truth: 'Fungus, mites and eggs aren’t visible. Always wash and iron them.' },
    { myth: 'Anything dried in the sun is automatically safe.', truth: 'Sun helps, but flies can lay eggs on outdoor washing. Iron it.' }
  ],
  redflags: [
    'A painful, boil-like lump with a small central hole, especially if something moves inside. This can be a tumbu fly larva. See a clinician.',
    'Intense itching, worse at night, with a rash between the fingers, on the wrists or the waist. This can be scabies, which is easily spread at home and needs treatment for everyone affected.',
    'Repeated yeast or fungal infections that keep coming back.',
    'A rash that appears after switching detergent or fabric and doesn’t settle.'
  ],
  takeaways: [
    'Choose breathable fabrics and change out of damp clothes quickly.',
    'Change underwear daily, wash it separately, dry fully, and iron.',
    'Iron anything that dried outdoors: tumbu flies are a real risk.',
    'Wash and iron second-hand clothes. Skip used underwear and swimwear.',
    'Store only fully dry clothes.'
  ],
  scenarios: [
    { q: 'It’s been raining for days and your underwear is still slightly damp. What do you do?',
      opts: [
        { t: 'Wear it. Body heat will dry it', p: 0, why: 'Damp underwear against the skin invites fungus, irritation and odour.' },
        { t: 'Iron it dry before wearing', p: 2, why: 'Ironing dries it completely and kills any eggs or germs.' },
        { t: 'Hang it by a fan and wear it when it’s nearly dry', p: 1, why: 'Better than wearing it damp, but it must be completely dry. Ironing finishes it off.' } ] },
    { q: 'You bought a second-hand dress and a swimsuit at the market. What’s the safest approach?',
      opts: [
        { t: 'Wear them straight away. They look clean', p: 0, why: 'Mites, fungus and eggs are invisible.' },
        { t: 'Wash the dress in hot water and iron it, and skip second-hand swimwear and underwear', p: 2, why: 'Clothing can be made safe by washing and ironing, but swimwear and underwear touch sensitive skin and are best bought new.' },
        { t: 'Wash and iron both, and wear the swimsuit', p: 1, why: 'Washing helps, but used swimwear still carries a higher risk for sensitive skin.' } ] },
    { q: 'It’s been a sweaty week and you own three bras. How often should you wash them?',
      opts: [
        { t: 'Once a month', p: 0, why: 'Sweat and bacteria build up against the skin under your breasts.' },
        { t: 'Once a week', p: 1, why: 'Better, but after 1 to 3 wears is better, and sooner when you sweat a lot.' },
        { t: 'After 1 to 3 wears, sooner after sweaty days, and rotate them', p: 2, why: 'Rotation lets each bra dry between wears.' } ] },
    { q: 'You washed your underwear in the same bucket and water as your towels and the kitchen cloths. What’s the better way?',
      opts: [
        { t: 'It’s fine. Soap kills everything', p: 0, why: 'Bacteria can transfer between items, especially with shared water.' },
        { t: 'Wash underwear separately in clean water with detergent, rinse well, dry fully and iron', p: 2, why: 'Separate washing prevents cross-contamination.' },
        { t: 'Wash them together but rinse well', p: 1, why: 'Rinsing helps, but separate washing is better.' } ] },
    { q: 'You left a load of wet laundry in the machine overnight and it smells sour. What next?',
      opts: [
        { t: 'Spray perfume and wear it anyway', p: 0, why: 'The smell is bacteria and mildew. Perfume only masks it.' },
        { t: 'Hang it up and wear it when it dries', p: 1, why: 'The bacteria are still there. Re-wash it.' },
        { t: 'Re-wash it, dry it fully, and clean the drum and seal', p: 2, why: 'This clears the sour smell and prevents it coming back.' } ] }
  ]
};
