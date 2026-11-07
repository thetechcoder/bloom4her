window.BLOOM_LESSONS = window.BLOOM_LESSONS || {};
window.BLOOM_LESSONS.m9 = {
  mins: 11,
  intro: 'A clean body lives in a clean home. This module covers safe drinking water, storing and cleaning water containers, bathrooms and kitchens, pests and waste, and cleaning products you can use safely.',
  cards: [
    { h: 'Safe drinking water',
      p: ['Water that looks clear can still carry germs. In many homes, boreholes, wells, tanks and buckets all need a little care before the water is safe to drink.'],
      list: ['**Boil it:** bring water to a full rolling boil for at least 1 minute, then let it cool in a clean, covered container.', '**Chlorine tablets or drops:** follow the packet instructions exactly and wait the stated time before drinking. If the water is cloudy, filter it through a clean cloth first.', '**Filters:** a good ceramic or carbon filter helps, but follow the maker’s cleaning schedule or it becomes a germ trap.', '**Sunlight (SODIS):** clear plastic bottles left in full sun for about 6 hours on a bright day can help when nothing else is available.', 'Water for **brushing teeth, washing fruit and making baby feeds** should be treated too.'],
      tip: 'Treated water gets contaminated again by dirty hands or cups. Pour it, don’t dip into it.' },
    { h: 'Sachet and bottled water',
      list: ['Check the **seal, the date and the NAFDAC number**.', 'Don’t buy sachets that have been lying in the sun or in dirty water.', 'Never reuse a sachet or a bottle to store anything else, then drink from it.', 'If a sachet tastes or smells odd, throw it out.'] },
    { h: 'Storing water safely',
      p: ['Stored water becomes unsafe fast when containers are open or dirty. Mosquitoes also breed in open water, which matters for malaria and dengue.'],
      list: ['Use containers with **tight lids** and a tap, or a clean ladle kept only for that container.', 'Keep them **off the floor** and away from drains and animals.', 'Scrub buckets, drums and jerrycans with soap and a brush **at least every week**, then rinse well.', 'Overhead tanks and underground tanks need cleaning at least **twice a year**, and after any flood.', 'Never put your hands or a used cup into drinking water.', 'Change stored water often. Water sitting for days is more likely to go bad.'],
      try: 'Mark a day this week to scrub your water containers, and set a repeating reminder.' },
    { h: 'The bathroom',
      list: ['Clean the toilet, sink and shower **at least once a week**, more often if many people share them.', 'Keep the bathroom **dry and ventilated**. Open a window or door after use to cut mould.', 'Hang towels to dry fully. Don’t leave them in a heap on the floor.', 'Keep **toothbrushes** upright, apart, and away from the toilet. Close the lid before flushing if you have one.', 'Use your own slippers in the bathroom, and wash them regularly.', 'Replace sponges and scrubs often (see your Shelf), and never use the same cloth on the toilet and anywhere else.'] },
    { h: 'The kitchen',
      list: ['Wash hands before touching food and after handling raw meat, fish or eggs.', 'Keep **raw and cooked food apart**, with separate boards and knives if you can.', 'Cook meat and fish thoroughly. Reheat leftovers until **steaming hot**.', 'Don’t leave cooked food sitting out for more than about 2 hours in the heat. Cover it and refrigerate, or reheat well before eating.', 'Wash dish cloths and replace sponges often. They hold more germs than most things in the house.', 'Let dishes **air dry** if you can, instead of wiping with a damp cloth.'] },
    { h: 'Waste, pests and flies',
      list: ['Use a **covered bin** and empty it often. Wash it from time to time.', 'Keep food covered and sealed so flies, cockroaches and rats stay away.', 'Fix leaks, and clear stagnant water around the house, in gutters and in old tyres or tins where mosquitoes breed.', 'Use mosquito nets, window screens and repellents that are safe for your skin.', 'Don’t burn rubbish indoors, and keep waste away from your water source.'] },
    { h: 'Cleaning products: use them safely',
      p: ['More is not better with cleaning products. Some combinations create toxic fumes.'],
      list: ['**Never mix bleach with ammonia, vinegar, toilet cleaner or other acids.** The gas can seriously harm your lungs.', 'Use one product at a time, with the window open, and rinse before using another.', '**Don’t add Dettol, bleach or other disinfectants to drinking water** or to your bath water “to be extra clean”. They can burn skin and harm your body.', 'Keep all cleaning products in their original bottles, labelled, and **out of reach of children**.', 'Wear gloves for strong products, and wash your hands afterwards.'],
      tip: 'Soap, water and effort clean most things. Disinfectant is for specific jobs like the toilet, not for every surface.' },
    { h: 'A simple cleaning rhythm',
      list: ['**Daily:** wash dishes, wipe the kitchen counters, take out the rubbish, air the bathroom.', '**Weekly:** clean the toilet and sink, scrub water containers, wash towels and bedding (see module 7), mop floors.', '**Monthly:** wipe the fridge, clean drains, check for leaks and pests, wash the bin.', '**Twice a year:** clean water tanks and deep clean the house.'],
      try: 'Pick one weekly job you tend to skip and attach it to a fixed day.' }
  ],
  myths: [
    { myth: 'If water is clear, it’s safe to drink.', truth: 'Many germs are invisible. Clear water can still carry bacteria, viruses and parasites. Boil, treat or filter it.' },
    { myth: 'Adding a little Dettol or bleach to your drinking water makes it safer.', truth: 'Household disinfectants are not made for drinking. Use chlorine tablets made for water, and follow the instructions.' },
    { myth: 'Mixing cleaning products makes them stronger.', truth: 'Some mixtures create poisonous gases. Use one product at a time.' },
    { myth: 'Borehole water is always clean.', truth: 'Boreholes can be contaminated by nearby latrines, drains or poor casing. Test it if you can, and treat it for drinking if unsure.' }
  ],
  redflags: [
    'Diarrhoea lasting more than 2 days, or with blood, fever, vomiting or signs of dehydration (dizziness, very dark urine, dry mouth).',
    'Several people in your household with stomach illness at the same time, which may point to your water or food.',
    'Yellow eyes or skin, dark urine and pale stools.',
    'Coughing, burning eyes or trouble breathing after using cleaning products. Go into fresh air straight away, and get medical help if it doesn’t pass.',
    'Fever with chills or headache in a malaria area. Get tested and treated early.'
  ],
  takeaways: [
    'Boil water for at least a minute, or use proper chlorine tablets, and store it in clean, covered containers.',
    'Scrub water containers every week and tanks twice a year.',
    'Keep raw and cooked food apart and reheat leftovers until steaming hot.',
    'Never mix bleach with other products, and never add disinfectant to drinking water.',
    'A simple daily, weekly and monthly rhythm keeps your home healthy without exhausting you.'
  ],
  scenarios: [
    { q: 'Your borehole water looks clear. You want to use it for drinking. What’s the safest choice?',
      opts: [
        { t: 'Drink it. It looks clean', p: 0, why: 'Clear water can still carry germs.' },
        { t: 'Boil it for at least a minute (or treat it with proper tablets) and keep it in a covered container', p: 2, why: 'Treatment plus clean storage makes it much safer.' },
        { t: 'Add a splash of Dettol', p: 0, why: 'Household disinfectant is not safe to drink.' } ] },
    { q: 'You want your toilet extra clean, so you’re thinking of mixing bleach and toilet cleaner. What do you do?',
      opts: [
        { t: 'Mix them. Double the power', p: 0, why: 'Mixing can release toxic fumes that damage the lungs.' },
        { t: 'Use one product, rinse well, and keep the window open', p: 2, why: 'One product at a time is safe and works well.' },
        { t: 'Mix them but quickly leave the room', p: 0, why: 'The fumes can still spread and harm you and others.' } ] },
    { q: 'Cooked soup has been sitting uncovered on the counter all afternoon. What now?',
      opts: [
        { t: 'Eat it. You’ll just warm it a little', p: 0, why: 'Food left out in the heat can grow bacteria that reheating doesn’t fully remove.' },
        { t: 'Throw it out or, if it was only a short time, reheat it until steaming hot', p: 2, why: 'Longer than about 2 hours in the heat is risky. Throw it out if in doubt.' },
        { t: 'Sniff it. If it smells fine, eat it', p: 1, why: 'Dangerous bacteria often have no smell.' } ] },
    { q: 'Your water drum has been in the corner for three weeks with a loose lid. What’s the best step?',
      opts: [
        { t: 'Top it up with fresh water', p: 0, why: 'Old film and germs stay in the drum and mosquitoes may be breeding.' },
        { t: 'Empty it, scrub it with soap and a brush, rinse, fill, and close it tightly', p: 2, why: 'Scrubbing removes the film that holds germs.' },
        { t: 'Just rinse it with water', p: 1, why: 'Rinsing alone won’t remove biofilm.' } ] },
    { q: 'You use one cloth to wipe the toilet seat, the sink and the kitchen counter. What’s wrong?',
      opts: [
        { t: 'Nothing, as long as you rinse it', p: 0, why: 'Rinsing doesn’t remove the germs and spreads them.' },
        { t: 'Use separate cloths for the toilet and for everything else, and wash or replace them often', p: 2, why: 'Keeping toilet germs away from food areas matters.' },
        { t: 'Use the same cloth but wash it monthly', p: 1, why: 'Too infrequent, and still cross-contaminates.' } ] }
  ]
};
