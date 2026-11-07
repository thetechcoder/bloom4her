/* Product Finder: criteria first, examples second. Examples are NOT endorsements. */
(function () {
  var SKIN_STEPS = [
    { id: 'skin', profile: 'skin', q: 'An hour after washing your face and applying nothing, how does your skin feel?',
      opts: [ { t: 'Tight, rough or flaky', v: 'dry' }, { t: 'Comfortable, neither tight nor shiny', v: 'normal' },
              { t: 'Shiny on the forehead, nose and chin only', v: 'combo' }, { t: 'Shiny all over', v: 'oily' } ] },
    { id: 'sensitive', profile: 'sensitive', q: 'Does your skin sting, redden or itch when you try new products?',
      opts: [ { t: 'Often', v: 'yes' }, { t: 'Sometimes', v: 'yes' }, { t: 'Rarely or never', v: 'no' } ] }
  ];
  var SENS_ONLY = [SKIN_STEPS[1]];
  var YESNO = function (t) { return [ { t: 'No', v: 'no' }, { t: t || 'Yes', v: 'yes' } ]; };

  function base() { return { look: [], avoid: [], how: [], tiers: null, examples: [], safety: null, note: null, shelf: [], ranked: null }; }
  function sensYes(a) { return a.sensitive === 'yes'; }

  var cats = [

  /* ------------------------------------------------ BODY WASH */
  { id: 'wash', emoji: '🧼', title: 'Body wash & soap', blurb: 'For daily bathing',
    steps: SKIN_STEPS.concat([
      { id: 'concern', q: 'What matters most to you right now?',
        opts: [ { t: 'Everyday cleaning', v: 'none' }, { t: 'Dry or tight skin', v: 'dry' },
                { t: 'Razor bumps or body bumps', v: 'bumps' }, { t: 'Heavy sweating or odour', v: 'sweat' } ] },
      { id: 'flag', q: 'Do you have a rash, painful bumps, sores or intense itching on your body right now?', opts: YESNO('Yes') }
    ]),
    build: function (a, ctx) {
      var r = base(); r.shelf = ['sponge'];
      r.look.push('A mild body wash or soap that rinses off easily');
      if (a.skin === 'dry' || a.concern === 'dry' || ctx.season === 'harmattan') {
        r.look.push('A creamy, moisturising formula with glycerin, shea butter or similar');
        r.avoid.push('Strongly foaming or "deodorant" soaps, and very hot water');
      }
      if (a.skin === 'oily' || a.skin === 'combo') r.look.push('A light gel or foaming wash is fine. You don’t need to strip your skin to feel clean');
      if (sensYes(a)) r.look.push('Fragrance-free and dye-free');
      if (a.concern === 'bumps') {
        r.look.push('Gentle exfoliation once or twice a week with a soft washcloth, or an over-the-counter wash with salicylic acid, introduced slowly');
        r.how.push('Shave on wet, soapy skin with a clean, sharp razor, in the direction the hair grows');
      }
      if (a.concern === 'sweat') r.look.push('A mild wash is enough. Antibacterial soap isn’t needed: washing, drying and clean clothes handle sweat odour');
      r.avoid.push('Heavily perfumed products if your skin itches', 'Daily antiseptic in the bath water', 'Harsh scrubs and unregulated skin-lightening products');
      r.how.push('Lather with your hands or a clean washcloth and rinse well', 'Pat dry, and moisturise while your skin is still slightly damp');
      r.tiers = { budget: 'A plain, mild soap or basic body wash does the job.', mid: 'Adds moisturisers and gentler perfumes. Helpful for dry or sensitive skin.', premium: 'Mostly texture, scent and packaging. No extra hygiene benefit.' };
      r.examples = ['Dove (Deeply Nourishing, Sensitive Skin)', 'Cetaphil gentle cleansers', 'Nivea shower creams'];
      if (a.flag === 'yes') r.safety = 'A rash, painful bumps, sores or intense itching should be checked by a nurse, pharmacist or doctor before you try new products. Until then, use plain water or the mildest fragrance-free wash.';
      return r;
    } },

  /* ------------------------------------------------ DEODORANT */
  { id: 'deo', emoji: '🌸', title: 'Deodorant & antiperspirant', blurb: 'For sweat and odour',
    steps: [
      { id: 'sweat', q: 'How much do you sweat under your arms?',
        opts: [ { t: 'A little', v: 'light' }, { t: 'A fair amount, in hot weather', v: 'moderate' }, { t: 'A lot, I notice wet patches often', v: 'heavy' } ] },
      { id: 'shave', q: 'Do you shave or wax your underarms?',
        opts: [ { t: 'Yes, regularly', v: 'yes' }, { t: 'Sometimes', v: 'yes' }, { t: 'No', v: 'no' } ] },
      SENS_ONLY[0],
      { id: 'flag', q: 'Do you have an underarm rash or boils, or sweating that soaks your clothes even when it’s not hot?', opts: YESNO('Yes') }
    ],
    build: function (a) {
      var r = base(); r.shelf = ['deodorant'];
      if (a.sweat === 'heavy') r.look.push('An antiperspirant (aluminium-based), applied on dry skin at night as well as in the morning. A "clinical" strength if regular ones fail');
      else if (a.sweat === 'moderate') r.look.push('An antiperspirant-deodorant, applied on clean, dry skin');
      else r.look.push('A deodorant or a light antiperspirant is enough');
      r.look.push('Roll-on, stick or cream: they put the product exactly where you need it');
      if (sensYes(a)) r.look.push('Fragrance-free and alcohol-free. Creams and sticks are usually gentler than sprays');
      if (a.shave === 'yes') r.how.push('Wait a few hours after shaving before applying, or choose an alcohol-free formula, to avoid stinging');
      r.how.push('Apply to clean, completely dry skin', 'If you use a spray, hold it about 15 cm away, in a ventilated room, and let it dry');
      r.avoid.push('Applying on wet, sweaty or freshly shaved skin', 'Homemade mixes of lemon or baking soda', 'Perfume instead of deodorant');
      r.tiers = { budget: 'Basic roll-ons work well if they match your sweat level.', mid: 'Often gentler, with more skin-care ingredients.', premium: 'Clinical-strength versions can help heavy sweaters. Otherwise it’s mostly scent and packaging.' };
      r.examples = ['Rexona (for Women)', 'Nivea anti-perspirants', 'Dove deodorants and anti-perspirants'];
      r.note = 'Major cancer organisations have found no proven link between antiperspirants and breast cancer.';
      if (a.flag === 'yes') r.safety = 'An underarm rash or boils, or heavy sweating with no heat or exercise, deserves a check-up. Heavy sweating (hyperhidrosis) is common and has effective treatments.';
      return r;
    } },

  /* ------------------------------------------------ MOISTURISER */
  { id: 'moist', emoji: '🧴', title: 'Moisturiser', blurb: 'For face and body',
    steps: SKIN_STEPS.concat([
      { id: 'where', q: 'Where will you use it?', opts: [ { t: 'Body', v: 'body' }, { t: 'Face', v: 'face' }, { t: 'Both', v: 'both' } ] }
    ]),
    build: function (a, ctx) {
      var r = base(); r.shelf = ['skincare'];
      var dry = a.skin === 'dry' || ctx.season === 'harmattan';
      if (dry) r.look.push('A rich cream or ointment with shea butter, petrolatum, glycerin or ceramides');
      if (a.skin === 'oily' || a.skin === 'combo' || ctx.season === 'rainy' || ctx.season === 'hot') r.look.push('A lightweight lotion or gel, so it doesn’t feel heavy in the humidity');
      if (a.skin === 'normal' && !dry) r.look.push('A simple, basic lotion is all you need');
      if (sensYes(a)) r.look.push('Fragrance-free, with a short ingredient list');
      if (a.where !== 'body') r.look.push('For your face, look for "non-comedogenic" so it doesn’t clog pores');
      if (a.where !== 'body') r.avoid.push('Heavy body butters on the face if you break out');
      r.how.push('Apply within a few minutes of bathing, while your skin is slightly damp', 'Pay attention to elbows, knees, heels and hands');
      r.avoid.push('Very perfumed or alcohol-heavy lotions on dry skin', 'Sharing jars with other people');
      r.tiers = { budget: 'Petroleum jelly and plain shea butter are effective and cheap. Buy shea fresh, from a source you trust.', mid: 'Basic dermatology-style creams with ceramides and glycerin.', premium: 'Pleasant textures. Not necessarily more effective.' };
      r.examples = ['Cetaphil moisturising cream or lotion', 'CeraVe moisturisers', 'Nivea Soft or Creme', 'Vaseline petroleum jelly or lotion'];
      return r;
    } },

  /* ------------------------------------------------ SUNSCREEN */
  { id: 'sun', emoji: '☀️', title: 'Sunscreen', blurb: 'Skin protection in the sun',
    steps: SKIN_STEPS.concat([
      { id: 'where', q: 'Where will you use it?', opts: [ { t: 'Face', v: 'face' }, { t: 'Body', v: 'body' }, { t: 'Both', v: 'both' } ] },
      { id: 'activity', q: 'What does your day look like?',
        opts: [ { t: 'Mostly indoors, short commutes', v: 'light' }, { t: 'Lots of time outdoors or in traffic', v: 'long' }, { t: 'Sport or heavy sweating', v: 'sport' } ] }
    ]),
    build: function (a) {
      var r = base(); r.shelf = ['skincare'];
      r.look.push(a.activity === 'long' || a.activity === 'sport' ? 'SPF 50, broad-spectrum (UVA and UVB), with PA+++ or PA++++ on the label' : 'SPF 30 or higher, broad-spectrum (UVA and UVB), with PA+++ or PA++++ on the label');
      r.look.push('A sheer gel or fluid, or a tinted formula, so there’s no white cast on deeper skin tones');
      if (a.skin === 'oily' || a.skin === 'combo') r.look.push('Oil-free and non-comedogenic ("shine control") for the face');
      if (a.skin === 'dry') r.look.push('A creamy, moisturising SPF');
      if (a.activity === 'sport') r.look.push('Water-resistant, because sweat washes sunscreen off');
      if (sensYes(a)) r.look.push('Fragrance-free; mineral (zinc oxide) formulas are often gentler');
      r.how.push('Use about two finger-lengths for the face and neck', 'Put it on about 15 minutes before going out', 'Reapply every 2 hours outdoors and after heavy sweating');
      r.avoid.push('Suspiciously cheap "premium" sunscreen from unknown sellers: counterfeits are common', 'Expired or heat-damaged bottles (not on the dashboard of a hot car)', 'Spray sunscreen sprayed near the face or breathed in');
      r.tiers = { budget: 'A genuine SPF 30+ from a reputable seller beats a premium one you don’t use.', mid: 'Often lighter and nicer on the skin, which means you actually wear it.', premium: 'Mostly texture and finish. Check authenticity first.' };
      r.examples = ['Nivea Sun UV Face Shine Control SPF 50', 'Cetaphil DermaControl Oil Absorbing Moisturizer SPF 30', 'CeraVe Ultra-Light Moisturizing Lotion SPF 30'];
      r.note = 'Sunscreen protects all skin tones. Please have any mole that changes, or sore that won’t heal, checked by a doctor.';
      return r;
    } },

  /* ------------------------------------------------ PERIOD */
  { id: 'period', emoji: '🩸', title: 'Period products', blurb: 'Pads, tampons, cups and more',
    steps: [
      { id: 'flow', q: 'How is your flow on the heaviest days?', opts: [ { t: 'Light', v: 'light' }, { t: 'Medium', v: 'medium' }, { t: 'Heavy', v: 'heavy' }, { t: 'It varies a lot', v: 'varies' } ] },
      { id: 'water', q: 'Do you have clean running water and a private toilet when you need them?', opts: [ { t: 'Almost always', v: 'yes' }, { t: 'Sometimes', v: 'some' }, { t: 'Rarely', v: 'no' } ] },
      { id: 'budget', q: 'What’s your monthly budget for period care?', opts: [ { t: 'Very tight', v: 'tight' }, { t: 'Moderate', v: 'mod' }, { t: 'Flexible', v: 'flex' } ] },
      { id: 'activity', q: 'What are your days like?', opts: [ { t: 'Mostly seated (desk, school)', v: 'desk' }, { t: 'On my feet, commuting a lot', v: 'move' }, { t: 'Sport or swimming', v: 'sport' } ] },
      { id: 'insert', q: 'How do you feel about products that go inside the vagina (tampons, cups)?', opts: [ { t: 'Not for me', v: 'no' }, { t: 'Unsure', v: 'maybe' }, { t: 'Happy to try', v: 'yes' } ] },
      { id: 'flag', q: 'Do you soak a pad every hour for several hours, have pain that stops your day, or bleed for more than 7 days?', opts: YESNO('Yes') }
    ],
    build: function (a) {
      var r = base(), s = { pads: 2, tampon: 1, cup: 1, cloth: 0, undies: 0 }, why = { pads: [], tampon: [], cup: [], cloth: [], undies: [] }, bad = { pads: [], tampon: [], cup: [], cloth: [], undies: [] };
      function add(k, n, w) { s[k] += n; if (w && n > 0) why[k].push(w); if (w && n < 0) bad[k].push(w); }
      if (a.water === 'yes') { add('cup', 2, 'you have the clean water and privacy cups need'); add('cloth', 1, 'you can wash and dry them properly'); add('undies', 1, 'you can wash them easily'); }
      if (a.water === 'no') { add('cup', -4, 'it needs clean water and privacy'); add('cloth', -4, 'it needs washing and full drying'); add('undies', -2, 'it needs washing and drying'); add('pads', 2, 'they don’t depend on water or a private space'); }
      if (a.budget === 'tight') { add('pads', 1, 'budget brands are widely available'); add('cloth', a.water === 'no' ? 0 : 2, 'cheapest over time'); add('cup', 1, 'costs little over a year, though more upfront'); }
      if (a.budget === 'flex') { add('undies', 1, 'comfortable as a back-up or on light days'); add('cup', 1, 'fewer changes during the day'); }
      if (a.activity === 'sport') { add('tampon', 2, 'good for sport and swimming'); add('cup', 2, 'stays put during sport and swimming'); add('pads', -1); }
      if (a.activity === 'desk') add('pads', 1, 'easy to change at a desk or at school');
      if (a.activity === 'move') { add('cup', 1, 'lasts through a long commute'); add('tampon', 1, 'discreet when you’re out and about'); }
      if (a.insert === 'no') { add('tampon', -6, 'it goes inside the body, which you\u2019d rather avoid'); add('cup', -6, 'it goes inside the body, which you\u2019d rather avoid'); add('pads', 1, 'nothing inserted'); add('undies', 1, 'nothing inserted'); add('cloth', 1); }
      if (a.insert === 'maybe') { add('tampon', -1); add('cup', -1); }
      if (a.insert === 'yes') { add('tampon', 1); add('cup', 1); }
      if (a.flow === 'heavy') { add('pads', 1, 'overnight and extra-long pads hold more'); add('cup', 1, 'holds more than a pad'); add('tampon', -1); add('undies', -1); }
      if (a.flow === 'light') { add('undies', 1, 'enough for a light flow'); add('tampon', 1); }
      var names = { pads: 'Disposable pads', tampon: 'Tampons', cup: 'Menstrual cup', cloth: 'Reusable cloth pads', undies: 'Period underwear' };
      var order = Object.keys(s).sort(function (x, y) { return s[y] - s[x]; });
      r.ranked = order.map(function (k, i) {
        var w = s[k] < 0 ? 'Not a good fit right now' + (bad[k].length ? ': ' + bad[k][0] + '.' : '.') : (why[k].length ? 'Because ' + why[k].slice(0, 3).join(', ') + '.' : 'A workable option.');
        return { name: names[k], tag: i === 0 ? 'Best match' : i === 1 ? 'Runner-up' : (s[k] < 0 ? 'Not now' : 'Option'), why: w, key: k };
      });
      r.look.push('Pads: unscented, cotton-soft top layer, wings, and an overnight length for heavy days', 'Tampons: the lowest absorbency that works, changed every 4 to 8 hours', 'Cups: the right size for your body, medical-grade silicone, a clear cleaning guide');
      r.how.push('Change pads every 4 to 6 hours. Wrap and bin, never flush', 'Have a back-up product in your bag');
      r.avoid.push('Scented pads and liners', 'Leaving tampons in for more than 8 hours', 'Cloth that isn’t fully dried, or unknown pads from unregulated sellers');
      r.tiers = { budget: 'A reputable budget pad changed on time is far safer than a premium pad left on for 10 hours.', mid: 'Better absorbency and comfort, especially for heavy days or sport.', premium: 'Cups and period underwear cost more upfront but can be cheaper over a year or two.' };
      r.examples = ['Pads: Always, Molped, Kotex', 'Tampons: Kotex, Tampax', 'Cups: Ivy Cup (a Nigerian brand)'];
      r.shelf = ['cup'];
      if (a.flag === 'yes') r.safety = 'Very heavy bleeding, severe pain or bleeding for more than 7 days is not something to manage with products alone. Please see a doctor. Fibroids, PCOS and other treatable conditions are common causes.';
      return r;
    } },

  /* ------------------------------------------------ INTIMATE */
  { id: 'intimate', emoji: '🌺', title: 'Intimate care', blurb: 'The short, honest list',
    steps: [
      { id: 'flag', q: 'Do you have itching, burning, an unusual or smelly discharge, sores, or pain in your intimate area right now?', opts: YESNO('Yes') }
    ],
    build: function (a) {
      var r = base(); r.shelf = [];
      if (a.flag === 'yes') {
        r.safety = 'Itching, burning, an unusual or smelly discharge, sores or pain need a proper diagnosis from a nurse, pharmacist or doctor. Please don’t treat it with washes, herbs or leftover drugs first. Many causes look alike but need different treatment.';
      }
      r.look.push('Warm water for the outer vulva', 'Optional: a mild, unscented soap or cleanser on the outer skin only', 'Breathable cotton underwear, changed daily', 'Unscented liners, only when you really need them');
      r.avoid.push('"Feminine washes", wipes, sprays and powders', 'Anything inside the vagina: soap, antiseptic, herbs, steams, "tightening" products', 'Scented pads, liners and tampons', 'Talc or heavily perfumed soaps near the genital area');
      r.how.push('Wash the outside only, front to back', 'Pat dry, and change out of damp clothes quickly');
      r.tiers = { budget: 'Plain water is free, and it’s the best option.', mid: 'If you like a cleanser, a mild unscented one on the outer skin is enough.', premium: 'There’s no premium product that does more than warm water. "Feminine hygiene" products are mainly marketing.' };
      r.note = 'The best intimate care product is no product. The vagina cleans itself.';
      return r;
    } },

  /* ------------------------------------------------ SCALP */
  { id: 'scalp', emoji: '💆‍♀️', title: 'Scalp & hair cleanse', blurb: 'Natural hair, braids, weaves, wigs',
    steps: [
      { id: 'style', q: 'What’s your usual style?', opts: [ { t: 'Natural or open hair', v: 'open' }, { t: 'Braids, weaves or locs', v: 'braids' }, { t: 'Wigs', v: 'wig' } ] },
      { id: 'concern', q: 'What bothers you most?', opts: [ { t: 'Nothing, I just want to keep it clean', v: 'none' }, { t: 'Dry or itchy scalp', v: 'dry' }, { t: 'White flakes (dandruff)', v: 'flaky' }, { t: 'Oily or greasy scalp', v: 'oily' } ] },
      { id: 'flag', q: 'Do you have painful bumps, pus, sores or patchy hair loss on your scalp?', opts: YESNO('Yes') }
    ],
    build: function (a) {
      var r = base(); r.shelf = ['comb', 'wigcap'];
      r.look.push('A gentle shampoo or cleanser that you can dilute');
      if (a.style === 'braids') r.how.push('Use a nozzle bottle with diluted shampoo to cleanse your scalp without soaking every braid. Rinse well and dry fully before leaving it');
      if (a.style === 'wig') r.how.push('Wash wig caps and scarves weekly, and give your scalp a proper cleanse every week or two');
      if (a.style === 'open') r.how.push('Wash as often as your hair and scalp need, usually every 1 to 2 weeks');
      if (a.concern === 'flaky') {
        r.look.push('An anti-dandruff shampoo with zinc pyrithione, selenium sulfide or ketoconazole');
        r.how.push('Lather, leave it on for 3 to 5 minutes, then rinse. Use 2 to 3 times a week for 2 to 4 weeks, then as needed. If it isn’t better in a month, see a clinician');
      }
      if (a.concern === 'dry') { r.look.push('A light scalp moisturiser, or a few drops of light oil on the scalp after cleansing'); r.avoid.push('Scratching with your nails'); }
      if (a.concern === 'oily') r.look.push('A gentle clarifying shampoo, used regularly rather than a harsh one used occasionally');
      r.avoid.push('Styles so tight they hurt or cause bumps', 'Sharing combs, brushes and caps', 'Thick grease layered on a dirty scalp');
      r.tiers = { budget: 'A basic shampoo, diluted, does the cleaning.', mid: 'Targeted anti-dandruff or moisturising formulas.', premium: 'Mostly scent and branding. Gentle and regular beats expensive.' };
      r.examples = ['Head & Shoulders (zinc pyrithione)', 'Ketoconazole shampoo, such as Nizoral (ask a pharmacist)'];
      if (a.flag === 'yes') r.safety = 'Painful bumps, pus, sores or patches of hair loss need a check-up. They can be infections, or caused by styles that pull on the hair (traction). Loosen or remove tight styles in the meantime.';
      return r;
    } },

  /* ------------------------------------------------ ORAL */
  { id: 'oral', emoji: '🪥', title: 'Teeth & mouth', blurb: 'Toothpaste and brushes',
    steps: [
      { id: 'sens', q: 'Are your teeth sensitive to cold, hot or sweet things?', opts: YESNO('Yes') },
      { id: 'flag', q: 'Do you have bleeding gums, a toothache, swelling or a sore in your mouth that won’t heal?', opts: YESNO('Yes') }
    ],
    build: function (a) {
      var r = base(); r.shelf = ['toothbrush'];
      r.look.push('Fluoride toothpaste', 'A soft-bristled brush, replaced every 3 months', 'Floss or interdental brushes once a day');
      if (a.sens === 'yes') r.look.push('A toothpaste made for sensitive teeth (for example, with potassium nitrate), used twice a day');
      r.how.push('Brush for two minutes, morning and night', 'Spit, don’t rinse with water straight after, so the fluoride keeps working', 'Gently clean your tongue');
      r.avoid.push('Hard bristles and scrubbing', 'Charcoal and other abrasive "whitening" powders', 'Sharing toothbrushes');
      r.tiers = { budget: 'Any fluoride toothpaste and a soft brush do the job.', mid: 'Sensitivity formulas and interdental tools.', premium: 'Electric brushes can help some people, but technique matters more.' };
      r.examples = ['Colgate', 'Sensodyne (for sensitive teeth)', 'Oral-B brushes'];
      if (a.flag === 'yes') r.safety = 'Bleeding gums, tooth pain, swelling or a sore that won’t heal need a dentist. Please don’t wait. Gum problems and infections are easier to treat early.';
      return r;
    } },

  /* ------------------------------------------------ MY SKIN */
  { id: 'myskin', emoji: '🫞', title: 'Know my skin', blurb: 'Find your skin type once',
    steps: SKIN_STEPS,
    build: function (a) {
      var r = base();
      var map = { dry: 'Dry', normal: 'Normal', combo: 'Combination', oily: 'Oily' };
      r.look.push('Skin type: ' + map[a.skin] + (a.sensitive === 'yes' ? ', and sensitive' : ''));
      var tips = {
        dry: 'Needs richer creams and gentle, creamy cleansers. Harmattan is your hardest season.',
        normal: 'Keep it simple: a mild wash and a basic moisturiser.',
        combo: 'Use light textures overall, and a bit more cream on dry areas.',
        oily: 'Choose light, oil-free textures. Don’t over-cleanse, which can make oil worse.'
      };
      r.how.push(tips[a.skin]);
      if (a.sensitive === 'yes') r.how.push('Choose fragrance-free products with short ingredient lists, and patch test new products first');
      r.note = 'Bloom saves this and uses it in the other finders, so you won’t be asked again.';
      return r;
    } }
  ];

  window.BLOOM_FINDER = { cats: cats };
})();
