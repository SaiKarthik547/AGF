/**
 * AGF — Equipment Data
 *
 * ⚠️  PROTOTYPE DATA ONLY
 * These 12 machines are demonstration entries to drive the UI architecture.
 * They are NOT confirmed AGF inventory. Replace entirely after client approval.
 *
 * Image paths assume files exist at:
 *   /public/images/equipment/[slug]/[view].webp
 * Missing views are gracefully omitted by the EquipmentViewer component.
 *
 * Hotspot x/y values are percentages of the RENDERED image area
 * (after object-fit: contain letterboxing). Update after actual images are placed.
 */

import type { Equipment } from '@/types';

export const EQUIPMENT: Equipment[] = [
  /* --- 1. CHEST PRESS -------------------------------------- */
  {
    id: 'chest-press',
    slug: 'chest-press',
    name: 'Chest Press Machine',
    category: 'Chest',
    shortDescription:
      'Build a stronger chest with a smooth and controlled pushing movement. Great for all fitness levels.',
    description:
      'The Chest Press Machine is designed to target your chest muscles (pectorals) with a safe, guided motion. Unlike free weights, the machine keeps the movement path consistent, making it easier to focus on the muscle being worked.\n\nIt is a great starting point for beginners learning upper body pressing movements, and equally useful for more experienced gym users looking to add volume to their chest training with controlled form.\n\nThe adjustable seat ensures the handles are at the right height for your body, and the weight stack lets you choose a resistance that matches your current strength level.',
    muscles: [
      { name: 'pectorals',  label: 'Pectorals (chest muscles)',   isPrimary: true },
      { name: 'shoulders',  label: 'Anterior deltoids (shoulders)', isPrimary: false },
      { name: 'triceps',    label: 'Triceps (back of the arm)',     isPrimary: false },
    ],
    benefits: [
      'Targets the chest muscles effectively',
      'Safe, guided movement — suitable for beginners',
      'Adjustable seat fits different body heights',
      'Weight stack allows gradual progression',
      'Builds upper body pushing strength',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust the seat', detail: 'Set the seat height so the handles are level with your mid-chest.' },
      { step: 2, instruction: 'Select a weight', detail: 'Choose a weight you can push for 10–12 repetitions with good form.' },
      { step: 3, instruction: 'Grip the handles', detail: 'Hold both handles firmly with a neutral overhand grip.' },
      { step: 4, instruction: 'Push forward', detail: 'Press the handles forward until your arms are almost fully extended. Do not lock your elbows.' },
      { step: 5, instruction: 'Return slowly', detail: 'Bring the handles back in a controlled manner until you feel a gentle stretch in your chest.' },
    ],
    beginnerTip:
      'Start with a lighter weight than you think you need. Focus on feeling the chest muscles working rather than simply moving the weight.',
    safetyNote:
      'Keep your back flat against the pad throughout the movement. Avoid arching your lower back. If you feel shoulder discomfort, reduce the weight or check your seat height.',
    specifications: [
      { label: 'Machine Type',    value: '[Placeholder — to be confirmed]' },
      { label: 'Resistance',      value: '[Placeholder — to be confirmed]' },
      { label: 'Adjustments',     value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',     value: 'Beginner to Advanced' },
    ],
    images: [
      { view: 'front',  label: 'Front / Hotspots View',  src: '/images/equipment/chest-press/front.webp',  alt: 'Chest Press Machine — front view' },
      { view: 'side',   label: 'Hero 3/4 View',          src: '/images/equipment/chest-press/hero.webp',   alt: 'Chest Press Machine — hero angle' },
    ],
    hotspots: [
      { id: 'cp-handles',  label: 'Ergonomic Handles',        description: 'Dual grip options allow neutral or wide grip to target mid and outer chest.', x: 35, y: 41, imageView: 'front' },
      { id: 'cp-seat',     label: 'Seat Height Pin',         description: 'Pull pin to adjust seat height so handles align with mid-chest level.',       x: 50, y: 68, imageView: 'front' },
      { id: 'cp-back-pad', label: 'Contoured Backrest',      description: 'Provides stable spinal support and encourages proper chest expansion.',       x: 50, y: 44, imageView: 'front' },
      { id: 'cp-pulley',   label: 'Dual Pulley Pivot',       description: 'Smooth bearing pivot tracks the natural converging pressing arc.',             x: 50, y: 16, imageView: 'front' },
      { id: 'cp-weight',   label: 'Selectorized Weight Stack', description: 'Pin-loaded magnetic stack for quick, incremental resistance changes.',        x: 43, y: 64, imageView: 'side' },
      { id: 'cp-arm-side', label: 'Converging Press Arm',    description: 'Biomechanical arc matches the pectoral contraction line.',                    x: 58, y: 40, imageView: 'side' },
    ],
    relatedEquipment: ['incline-chest-press', 'pec-deck-fly', 'functional-trainer'],
    featured: true,
  },

  /* --- 2. INCLINE CHEST PRESS ------------------------------ */
  {
    id: 'incline-chest-press',
    slug: 'incline-chest-press',
    name: 'Incline Chest Press',
    category: 'Chest',
    shortDescription:
      'Target the upper chest with an angled pressing movement. Builds definition and fullness in the top portion of the chest.',
    description:
      'The Incline Chest Press works your upper chest muscles (upper pectorals) by pressing at an upward angle. This variation adds shape and fullness to the upper portion of the chest, an area that flat pressing movements can sometimes miss.\n\nThe incline angle also places more emphasis on the front of the shoulders as a secondary muscle. The guided movement path makes it safe and easy to focus on proper form.',
    muscles: [
      { name: 'upper-pectorals', label: 'Upper pectorals (upper chest)',      isPrimary: true },
      { name: 'anterior-delt',   label: 'Anterior deltoids (front shoulder)', isPrimary: false },
      { name: 'triceps',         label: 'Triceps (back of the arm)',           isPrimary: false },
    ],
    benefits: [
      'Targets the upper chest specifically',
      'Adds definition and fullness to the chest',
      'Safe, angled pressing path',
      'Good complement to flat chest press work',
    ],
    usageSteps: [
      { step: 1, instruction: 'Set the seat height', detail: 'The handles should line up with your upper chest / shoulder level.' },
      { step: 2, instruction: 'Choose a weight', detail: 'Select a manageable resistance. Upper chest is typically a bit weaker than middle chest.' },
      { step: 3, instruction: 'Hold the handles', detail: 'Grip firmly and plant your feet flat on the floor.' },
      { step: 4, instruction: 'Press upward at an angle', detail: 'Push the handles forward and slightly upward. Do not lock the elbows at the top.' },
      { step: 5, instruction: 'Return slowly', detail: 'Lower the handles back in a controlled movement, feeling the upper chest stretch.' },
    ],
    beginnerTip:
      'The incline press often requires less weight than a flat press. That is normal — the upper chest is a smaller muscle group. Focus on the squeeze at the top.',
    safetyNote:
      'Do not flare your elbows out too widely. Keep a slight bend in the elbows at the top of the movement.',
    specifications: [
      { label: 'Machine Type', value: '[Placeholder — to be confirmed]' },
      { label: 'Incline Angle', value: '[Placeholder — to be confirmed]' },
      { label: 'Adjustments',  value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',  value: 'Beginner to Advanced' },
    ],
    images: [],
    hotspots: [
      { id: 'icp-handles', label: 'Handles',         description: 'Press forward and upward in one smooth movement.',                         x: 60, y: 30, imageView: 'front' },
      { id: 'icp-seat',    label: 'Adjustable Seat', description: 'Set so handles align with your upper chest at the start position.',       x: 40, y: 68, imageView: 'front' },
      { id: 'icp-weight',  label: 'Weight Stack',    description: 'Select your working weight here. Start conservatively on the incline.',   x: 70, y: 70, imageView: 'side' },
    ],
    relatedEquipment: ['chest-press', 'pec-deck-fly'],
    featured: false,
  },

  /* --- 3. PEC DECK FLY ------------------------------------- */
  {
    id: 'pec-deck-fly',
    slug: 'pec-deck-fly',
    name: 'Pec Deck Fly',
    category: 'Chest',
    shortDescription:
      'Isolate the chest muscles with a wide, hugging movement. Great for adding shape and definition to the chest.',
    description:
      'The Pec Deck Fly isolates the pectoral (chest) muscles by bringing the arms together in a wide arc — similar to wrapping your arms around a large barrel. Unlike press movements, there is no bending of the elbow, keeping the chest muscles under constant tension throughout the movement.\n\nThis makes it an excellent finishing exercise after pressing movements, or a good introduction to chest training for those who find pressing movements uncomfortable.',
    muscles: [
      { name: 'pectorals',     label: 'Pectorals (chest muscles)',      isPrimary: true },
      { name: 'anterior-delt', label: 'Anterior deltoids (front of shoulder)', isPrimary: false },
    ],
    benefits: [
      'Isolates the chest muscles directly',
      'No pressing joint stress — gentler on the shoulders for many people',
      'Constant tension through the full range of motion',
      'Excellent chest shaping and definition exercise',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust the arm pads', detail: 'Set so your upper arms are roughly horizontal when you grip the handles or pads.' },
      { step: 2, instruction: 'Sit upright', detail: 'Keep your back flat against the pad and feet planted.' },
      { step: 3, instruction: 'Bring arms together', detail: 'In a wide, controlled arc, bring the pads or handles to meet in front of your chest.' },
      { step: 4, instruction: 'Hold briefly', detail: 'Squeeze the chest muscles gently at the point where the arms meet.' },
      { step: 5, instruction: 'Return slowly', detail: 'Allow the arms to open back out under control. Do not let the weight stack slam.' },
    ],
    beginnerTip:
      'Think of the movement as hugging a large tree. Keep a slight bend in the elbows and do not let your arms travel behind your shoulders.',
    safetyNote:
      'Do not overstretch at the back of the movement. Stop when you feel a comfortable stretch in the chest — going too far back can strain the shoulder joint.',
    specifications: [
      { label: 'Machine Type', value: '[Placeholder — to be confirmed]' },
      { label: 'Resistance',   value: '[Placeholder — to be confirmed]' },
      { label: 'Adjustments',  value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',  value: 'Beginner to Advanced' },
    ],
    images: [
      { view: 'front',  label: 'Front / Hotspots View',  src: '/images/equipment/pec-deck-fly/front.webp',  alt: 'Pec Deck Fly machine — front view' },
      { view: 'side',   label: 'Hero 3/4 View',          src: '/images/equipment/pec-deck-fly/hero.webp',   alt: 'Pec Deck Fly machine — hero angle' },
    ],
    hotspots: [
      { id: 'pdf-pads-l',   label: 'Left Arm Pad & Grip',      description: 'Dual swivel arms with ergonomic contact pads for chest isolation.',        x: 26, y: 44, imageView: 'front' },
      { id: 'pdf-pads-r',   label: 'Right Arm Pad & Grip',     description: 'Synchronized movement arc maintains constant tension on pectorals.',       x: 74, y: 44, imageView: 'front' },
      { id: 'pdf-backrest', label: 'Contoured Backrest',       description: 'Align your spine vertically against this back support.',                   x: 50, y: 52, imageView: 'front' },
      { id: 'pdf-seat',     label: 'Adjustable Seat Pin',      description: 'Adjust height so elbows align with mid-chest height.',                     x: 50, y: 79, imageView: 'front' },
      { id: 'pdf-swivel',   label: 'Dual Swivel Brackets',     description: 'Independent pivot joints allow natural arm sweep angles.',                 x: 37, y: 30, imageView: 'front' },
      { id: 'pdf-weight',   label: 'Selectorized Weight Stack', description: 'Pin-loaded weight stack positioned inside the central column.',           x: 53, y: 68, imageView: 'side' },
      { id: 'pdf-arm-side', label: 'Curved Swivel Arm',        description: 'Padded arm contact plate maintains 90-degree elbow bend.',                 x: 28, y: 45, imageView: 'side' },
    ],
    relatedEquipment: ['chest-press', 'incline-chest-press', 'functional-trainer'],
    featured: false,
  },

  /* --- 4. LAT PULLDOWN ------------------------------------- */
  {
    id: 'lat-pulldown',
    slug: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Back',
    shortDescription:
      'Strengthen your upper back and improve posture with this classic pulling movement.',
    description:
      'The Lat Pulldown targets the latissimus dorsi — the large, flat muscles of the upper back that give the back its width. It is one of the most effective exercises for building back strength and improving posture.\n\nThe movement mimics pulling yourself up from a hanging position (like a pull-up), but in a seated, assisted format that is accessible to a much wider range of fitness levels. The wide grip bar allows you to vary your grip width and angle for different muscle emphases.\n\nThe adjustable knee pad holds you securely in place so you can focus entirely on pulling the bar down with your back muscles rather than lifting your body.',
    muscles: [
      { name: 'latissimus-dorsi', label: 'Latissimus dorsi (upper back — the "lats")', isPrimary: true },
      { name: 'biceps',           label: 'Biceps (front of the arm)',                   isPrimary: false },
      { name: 'rear-delt',        label: 'Rear deltoids (back of the shoulder)',        isPrimary: false },
    ],
    benefits: [
      'Builds upper back width and strength',
      'Improves posture and shoulder stability',
      'Great alternative to pull-ups for beginners',
      'Multiple grip options for variety',
      'Adjustable to suit different body sizes',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust the knee pad', detail: 'The pad should sit firmly on top of your thighs when seated, keeping you anchored.' },
      { step: 2, instruction: 'Grip the bar', detail: 'Hold the bar just outside shoulder width with a slightly wider than shoulder-width overhand grip.' },
      { step: 3, instruction: 'Sit tall and lean slightly back', detail: 'Keep your chest up and lean back just a few degrees — avoid excessive leaning.' },
      { step: 4, instruction: 'Pull the bar down', detail: 'Drive your elbows down and back, bringing the bar toward your upper chest or chin.' },
      { step: 5, instruction: 'Return slowly', detail: 'Extend your arms back up in a controlled manner until they are nearly straight. Feel the lats stretching.' },
    ],
    beginnerTip:
      'Focus on leading the movement with your elbows, not your hands. Think of your hands as hooks — let the back do the pulling.',
    safetyNote:
      'Avoid pulling the bar behind your neck. This places unnecessary stress on the cervical spine. Always pull to the front, toward your upper chest.',
    specifications: [
      { label: 'Machine Type',    value: '[Placeholder — to be confirmed]' },
      { label: 'Bar Type',        value: '[Placeholder — to be confirmed]' },
      { label: 'Adjustments',     value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',     value: 'Beginner to Advanced' },
    ],
    images: [
      { view: 'front',  label: 'Front / Hotspots View',  src: '/images/equipment/lat-pulldown/front.webp',  alt: 'Lat Pulldown machine — front view' },
      { view: 'side',   label: 'Hero 3/4 View',          src: '/images/equipment/lat-pulldown/hero.webp',   alt: 'Lat Pulldown machine — hero angle' },
    ],
    hotspots: [
      { id: 'ld-bar',        label: 'Wide Grip Lat Bar',        description: 'Wide knurled handles designed for vertical pulling and lat contraction.',     x: 50, y: 24, imageView: 'front' },
      { id: 'ld-pulley',     label: 'Overhead Pulley',          description: 'Precision bearing wheel tracks smooth vertical cable travel.',                 x: 50, y: 15, imageView: 'front' },
      { id: 'ld-thigh-pads', label: 'Adjustable Thigh Rollers', description: 'Dual foam rollers lock legs firmly to prevent lifting during heavy pulls.',    x: 50, y: 65, imageView: 'front' },
      { id: 'ld-seat',       label: 'Padded Bench Seat',        description: 'Durable charcoal leather seat ensures a stable base.',                         x: 50, y: 76, imageView: 'front' },
      { id: 'ld-weight',     label: 'Enclosed Weight Stack',    description: 'Smooth guide rods with selector pin for incremental load progression.',        x: 63, y: 52, imageView: 'front' },
      { id: 'ld-pulley-side', label: 'Cable Routing & Pulley',  description: 'Aircraft-grade cable smoothly drives the overhead weight resistance.',         x: 45, y: 8,  imageView: 'side' },
      { id: 'ld-stack-side', label: 'Selectorized Weight Stack', description: 'Easily accessible from seated position for fast weight changes.',            x: 59, y: 66, imageView: 'side' },
    ],
    relatedEquipment: ['seated-cable-row', 'functional-trainer'],
    featured: true,
  },

  /* --- 5. SEATED CABLE ROW --------------------------------- */
  {
    id: 'seated-cable-row',
    slug: 'seated-cable-row',
    name: 'Seated Cable Row',
    category: 'Back',
    shortDescription:
      'Build mid-back thickness and improve posture by pulling the cable toward your torso from a seated position.',
    description:
      'The Seated Cable Row targets the middle portion of the back — the rhomboids, middle trapezius, and latissimus dorsi. The horizontal pulling angle emphasises the mid-back, which is important for posture and shoulder health.\n\nBecause the cable provides constant tension throughout the movement (unlike free weights), the muscles are working through the full range of motion. This makes it particularly effective for building back thickness and improving the quality of the contraction.',
    muscles: [
      { name: 'rhomboids',  label: 'Rhomboids (mid-back)',                   isPrimary: true },
      { name: 'lats',       label: 'Latissimus dorsi (upper back)',           isPrimary: true },
      { name: 'traps',      label: 'Middle trapezius (upper-mid back)',       isPrimary: false },
      { name: 'biceps',     label: 'Biceps (front of the arm)',               isPrimary: false },
    ],
    benefits: [
      'Builds mid-back thickness',
      'Constant cable tension for full-range muscle activation',
      'Excellent for posture improvement',
      'Multiple attachment options for variety',
    ],
    usageSteps: [
      { step: 1, instruction: 'Sit at the cable station', detail: 'Place your feet on the footrests and keep a slight bend in your knees.' },
      { step: 2, instruction: 'Grip the attachment', detail: 'Hold the handle with both hands. Sit upright with a neutral spine — not hunched.' },
      { step: 3, instruction: 'Pull toward your torso', detail: 'Row the handle toward your lower chest or abdomen, leading with your elbows.' },
      { step: 4, instruction: 'Squeeze your shoulder blades', detail: 'At the end of the pull, briefly squeeze the shoulder blades together.' },
      { step: 5, instruction: 'Return under control', detail: 'Extend your arms back slowly. Let the back muscles stretch before the next rep.' },
    ],
    beginnerTip:
      'Keep your torso upright and avoid rocking back and forth. The power should come from your back and arms, not momentum.',
    safetyNote:
      'Do not round your lower back at any point. If you find yourself leaning too far forward or back, reduce the weight.',
    specifications: [
      { label: 'Machine Type', value: '[Placeholder — to be confirmed]' },
      { label: 'Cable Type',   value: '[Placeholder — to be confirmed]' },
      { label: 'Adjustments',  value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',  value: 'Beginner to Advanced' },
    ],
    images: [
      { view: 'front',  label: 'Front / Hotspots View',  src: '/images/equipment/seated-cable-row/front.webp',  alt: 'Seated Cable Row machine — front view' },
      { view: 'side',   label: 'Hero 3/4 View',          src: '/images/equipment/seated-cable-row/hero.webp',   alt: 'Seated Cable Row machine — hero view' },
    ],
    hotspots: [
      { id: 'scr-handle',   label: 'Cable Row Handle',    description: 'Ergonomic low-row double-D handle attached to heavy-duty aircraft steel cable.',  x: 50, y: 53, imageView: 'front' },
      { id: 'scr-footrest', label: 'Diamond Footplate',   description: 'Solid steel footplate with textured diamond grip ensures solid foot planting.',    x: 50, y: 66, imageView: 'front' },
      { id: 'scr-bench',    label: 'Charcoal Bench Seat',  description: 'Extended padded bench allows comfortable reach for lifters of any height.',        x: 50, y: 80, imageView: 'front' },
      { id: 'scr-pulley',   label: 'Top Guide Pulley',    description: 'Precision bearing pulley smoothly directs tension from the weight stack.',         x: 50, y: 13, imageView: 'front' },
      { id: 'scr-stack',    label: 'Pin-Loaded Stack',    description: 'Selectorized resistance stack enclosed in heavy-duty protective housing.',          x: 50, y: 37, imageView: 'front' },
      { id: 'scr-stack-s',  label: 'Weight Stack Column', description: 'Quick-adjust magnetic selector pin for rapid, safe weight changes.',                x: 70, y: 65, imageView: 'side' },
      { id: 'scr-handle-s', label: 'Low Row Attachment',  description: 'Row handle positioned for straight-line pulling into lower chest or abdomen.',     x: 48, y: 53, imageView: 'side' },
    ],
    relatedEquipment: ['lat-pulldown', 'functional-trainer'],
    featured: false,
  },

  /* --- 6. LEG PRESS ---------------------------------------- */
  {
    id: 'leg-press',
    slug: 'leg-press',
    name: 'Leg Press',
    category: 'Legs',
    shortDescription:
      'Build lower body strength with a powerful, supported pressing movement. Works the quads, hamstrings, and glutes.',
    description:
      'The Leg Press is one of the most effective exercises for building lower body strength. You push a weighted platform away from you with your legs while seated in a reclined position — your back and hips are fully supported, allowing you to focus entirely on your leg muscles.\n\nThe foot position on the platform can be varied to emphasise different parts of the legs: higher foot placement targets the hamstrings and glutes more; lower placement emphasises the quadriceps.\n\nThe leg press allows you to safely lift heavy loads, making it a staple exercise for building leg muscle and strength for gym users of all levels.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (front thigh muscles)', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back of the thigh)',   isPrimary: true },
      { name: 'glutes',     label: 'Glutes (buttocks)',                isPrimary: false },
      { name: 'calves',     label: 'Calves (lower leg)',               isPrimary: false },
    ],
    benefits: [
      'Builds overall lower body strength',
      'Supported position reduces lower back strain',
      'Foot position can be varied to target different muscles',
      'Allows heavy loading safely',
      'Suitable for all fitness levels',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust the seat', detail: 'Position the seat so your knees form roughly a 90-degree angle when feet are on the platform.' },
      { step: 2, instruction: 'Position your feet', detail: 'Place feet shoulder-width apart, flat on the platform. Toes can point slightly outward.' },
      { step: 3, instruction: 'Release the safety handles', detail: 'Push the platform up slightly, then release the safety stops on both sides.' },
      { step: 4, instruction: 'Lower under control', detail: 'Bend your knees slowly until your thighs are roughly parallel to the platform (or as low as comfortable).' },
      { step: 5, instruction: 'Press back up', detail: 'Drive through your feet to press the platform back to the starting position. Do not lock your knees at the top.' },
    ],
    beginnerTip:
      'Do not let your lower back lift off the seat pad as you lower the weight. Keep your back flat and in full contact with the support.',
    safetyNote:
      'Always engage the safety stops before getting on or off the machine. Do not lock out your knees at the top of the movement, and never allow your knees to cave inward during the press.',
    specifications: [
      { label: 'Machine Type',       value: '[Placeholder — to be confirmed]' },
      { label: 'Platform Type',      value: '[Placeholder — to be confirmed]' },
      { label: 'Seat Adjustments',   value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',        value: 'Beginner to Advanced' },
    ],
    images: [
      { view: 'side',   label: 'Side / Hotspots View',  src: '/images/equipment/leg-press/side.webp',   alt: '45-Degree Leg Press machine — side elevation view' },
      { view: 'front',  label: 'Hero 3/4 View',         src: '/images/equipment/leg-press/hero.webp',   alt: '45-Degree Leg Press machine — hero angle' },
    ],
    hotspots: [
      { id: 'lp-platform',   label: '45° Diamond Footplate',   description: 'High-tensile diamond plate steel platform. Stance width alters quadricep vs hamstring focus.', x: 20, y: 60, imageView: 'side' },
      { id: 'lp-seat',       label: 'Reclined Backrest & Seat', description: 'Ergonomic high-density padded backrest maintains spinal stability during heavy leg presses.',  x: 56, y: 47, imageView: 'side' },
      { id: 'lp-safety',     label: 'Safety Lockout Handle',   description: 'Dual side-mounted safety catches. Disengage to start movement, re-lock safely before exiting.', x: 63, y: 49, imageView: 'side' },
      { id: 'lp-rails',      label: 'Linear Guide Rails',      description: 'Precision chromed solid steel guide rods provide a silky-smooth frictionless travel arc.',      x: 53, y: 58, imageView: 'side' },
      { id: 'lp-horns',      label: 'Weight Plate Horns',      description: 'Heavy-duty Olympic plate carriage pegs with rubber bumper plate capacity.',                    x: 87, y: 55, imageView: 'side' },
      { id: 'lp-platform-h', label: 'Wide Foot Platform',      description: 'Generous platform dimensions accommodate narrow, shoulder, and wide sumo stances.',            x: 24, y: 58, imageView: 'front' },
      { id: 'lp-sled-h',     label: 'Carriage Sled System',    description: 'Rugged linear bearing carriage engineered for maximum stability under heavy loads.',           x: 62, y: 46, imageView: 'front' },
    ],
    relatedEquipment: ['leg-extension', 'functional-trainer'],
    featured: true,
  },

  /* --- 7. LEG EXTENSION ------------------------------------ */
  {
    id: 'leg-extension',
    slug: 'leg-extension',
    name: 'Leg Extension',
    category: 'Legs',
    shortDescription:
      'Isolate and strengthen the quadriceps (front thigh muscles) with this focused extension movement.',
    description:
      'The Leg Extension machine isolates the quadriceps — the group of four muscles at the front of your thigh — by extending the lower leg against resistance from a seated position.\n\nUnlike compound movements such as the leg press or squat, the leg extension targets the quadriceps in isolation. This makes it an excellent exercise for developing quadricep strength and definition, and for rehabilitation from knee-related injuries when prescribed by a professional.\n\nThe padded roller rests on the shin just above the ankle, and the adjustable back support and shin pad ensure the machine fits your body proportions.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (all four front thigh muscles)', isPrimary: true },
    ],
    benefits: [
      'Directly isolates the quadriceps',
      'Adjustable to fit different leg lengths',
      'Good for building quad definition',
      'Useful for knee strengthening (consult a professional if recovering from injury)',
    ],
    usageSteps: [
      { step: 1, instruction: 'Set the back pad', detail: 'Adjust so your knees align with the pivot point of the machine.' },
      { step: 2, instruction: 'Position the shin pad', detail: 'The roller pad should sit on your shin, just above the ankle.' },
      { step: 3, instruction: 'Hold the handles', detail: 'Grip the side handles to stabilise your upper body throughout the movement.' },
      { step: 4, instruction: 'Extend your legs', detail: 'Straighten your legs until nearly fully extended. Squeeze the quads at the top.' },
      { step: 5, instruction: 'Lower slowly', detail: 'Bring the legs back down under control. Do not let the weight slam down.' },
    ],
    beginnerTip:
      'Use a light weight and focus on a slow, controlled lowering phase. The return (eccentric) part of the movement builds as much strength as the lifting phase.',
    safetyNote:
      'If you have a history of knee pain or injury, consult a qualified professional before using the leg extension machine. Keep the movement smooth — avoid jerking the weight up.',
    specifications: [
      { label: 'Machine Type',      value: '[Placeholder — to be confirmed]' },
      { label: 'Resistance',        value: '[Placeholder — to be confirmed]' },
      { label: 'Leg Pad Position',  value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',       value: 'Beginner to Advanced' },
    ],
    images: [],
    hotspots: [
      { id: 'le-shin-pad', label: 'Shin Pad',     description: 'Rests on your shin above the ankle. Adjust for your leg length.',           x: 52, y: 72, imageView: 'front' },
      { id: 'le-back-pad', label: 'Back Support', description: 'Sit back fully against this pad. Adjust it so your knee aligns with the pivot.', x: 30, y: 45, imageView: 'side' },
      { id: 'le-weight',   label: 'Weight Stack', description: 'Select a weight you can extend smoothly without momentum.',                  x: 75, y: 55, imageView: 'side' },
    ],
    relatedEquipment: ['leg-press'],
    featured: false,
  },

  /* --- 8. SHOULDER PRESS ----------------------------------- */
  {
    id: 'shoulder-press',
    slug: 'shoulder-press',
    name: 'Shoulder Press Machine',
    category: 'Shoulders',
    shortDescription:
      'Develop stronger, more defined shoulders by pressing weight overhead in a stable, guided position.',
    description:
      'The Shoulder Press Machine works the deltoid muscles (shoulders) through an overhead pressing movement. The guided range of motion makes it safer and more accessible than overhead pressing with free weights, particularly for beginners.\n\nThe machine keeps the movement path stable and consistent, allowing you to focus on the shoulder muscles without worrying about balance or stability. The adjustable seat ensures you press from the right starting position for your height.',
    muscles: [
      { name: 'anterior-delt', label: 'Anterior deltoids (front of shoulder)',  isPrimary: true },
      { name: 'lateral-delt',  label: 'Lateral deltoids (side of shoulder)',    isPrimary: true },
      { name: 'triceps',       label: 'Triceps (back of the arm)',              isPrimary: false },
      { name: 'upper-traps',   label: 'Upper trapezius (upper back/neck area)', isPrimary: false },
    ],
    benefits: [
      'Builds shoulder strength and size',
      'Stable guided pressing path — safer than free-weight overhead press',
      'Adjustable seat for different heights',
      'Works both the front and side portions of the shoulder',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust the seat', detail: 'The handles should be at roughly shoulder height when seated.' },
      { step: 2, instruction: 'Grip the handles', detail: 'Hold firmly with hands just outside shoulder width.' },
      { step: 3, instruction: 'Press overhead', detail: 'Push the handles upward until your arms are nearly fully extended. Do not lock the elbows.' },
      { step: 4, instruction: 'Lower slowly', detail: 'Bring the handles back down to the starting position in a controlled manner.' },
    ],
    beginnerTip:
      'Shoulders can be a sensitive joint. Begin with a lighter weight than you expect to manage, and increase gradually over several sessions.',
    safetyNote:
      'Do not fully lock out your elbows at the top of the movement. Keep a slight bend to protect the joint. If you feel any sharp pain in the shoulder, stop and seek guidance.',
    specifications: [
      { label: 'Machine Type', value: '[Placeholder — to be confirmed]' },
      { label: 'Resistance',   value: '[Placeholder — to be confirmed]' },
      { label: 'Adjustments',  value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',  value: 'Beginner to Advanced' },
    ],
    images: [],
    hotspots: [
      { id: 'sp-handles',  label: 'Handles',         description: 'Press upward. Stop just short of full elbow extension.',                x: 50, y: 30, imageView: 'front' },
      { id: 'sp-backrest', label: 'Back Support',    description: 'Keep your back flat against this pad throughout the movement.',        x: 35, y: 55, imageView: 'side' },
      { id: 'sp-weight',   label: 'Weight Stack',    description: 'Start with a manageable weight. Shoulders are often weaker than chest.', x: 72, y: 65, imageView: 'side' },
    ],
    relatedEquipment: ['chest-press', 'functional-trainer'],
    featured: true,
  },

  /* --- 9. BICEP CURL --------------------------------------- */
  {
    id: 'bicep-curl',
    slug: 'bicep-curl',
    name: 'Bicep Curl Machine',
    category: 'Arms',
    shortDescription:
      'Isolate the biceps (front of the arm) for better arm strength and definition.',
    description:
      'The Bicep Curl Machine isolates the bicep muscles — the muscles at the front of the upper arm responsible for bending the elbow. By keeping the upper arms stable and supported on a pad, the machine ensures that the biceps do all of the work, with minimal help from the shoulders or back.\n\nThis makes it a highly effective tool for building arm strength and definition, and is particularly useful for beginners who are still developing the coordination needed for free-weight curls.',
    muscles: [
      { name: 'biceps',   label: 'Biceps (front of the upper arm)',            isPrimary: true },
      { name: 'brachialis', label: 'Brachialis (deep arm muscle beneath biceps)', isPrimary: false },
    ],
    benefits: [
      'Directly isolates the bicep muscles',
      'Upper arm pad prevents cheating the movement',
      'Builds arm strength and definition',
      'Good starting point for arm training',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust the arm pad', detail: 'The pad should rest comfortably against your upper arms when seated.' },
      { step: 2, instruction: 'Grip the handles', detail: 'Hold with an underhand (palms-up) grip.' },
      { step: 3, instruction: 'Curl upward', detail: 'Bend your elbows to lift the weight, keeping your upper arms still on the pad.' },
      { step: 4, instruction: 'Squeeze at the top', detail: 'Hold briefly at the top of the curl to maximise muscle engagement.' },
      { step: 5, instruction: 'Lower slowly', detail: 'Extend your arms back down in a controlled manner. Do not let the weight drop.' },
    ],
    beginnerTip:
      'The movement is small and precise. If you find yourself rocking your upper arms off the pad, the weight is too heavy.',
    safetyNote:
      'Do not fully straighten the elbows at the bottom with heavy weight — keep a slight bend to protect the elbow joint.',
    specifications: [
      { label: 'Machine Type',   value: '[Placeholder — to be confirmed]' },
      { label: 'Resistance',     value: '[Placeholder — to be confirmed]' },
      { label: 'Adjustments',    value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',    value: 'Beginner to Advanced' },
    ],
    images: [],
    hotspots: [
      { id: 'bc-handles', label: 'Handles',    description: 'Grip with palms facing up. Curl upward smoothly without lifting the upper arms.', x: 50, y: 55, imageView: 'front' },
      { id: 'bc-arm-pad', label: 'Arm Pad',    description: 'Upper arms rest here. This prevents shoulders from helping the movement.',         x: 50, y: 45, imageView: 'side' },
      { id: 'bc-weight',  label: 'Weight Stack', description: 'Use a weight you can curl with strict form for 10–15 reps.',                    x: 75, y: 62, imageView: 'side' },
    ],
    relatedEquipment: ['tricep-pushdown', 'functional-trainer'],
    featured: false,
  },

  /* --- 10. TRICEP PUSHDOWN --------------------------------- */
  {
    id: 'tricep-pushdown',
    slug: 'tricep-pushdown',
    name: 'Tricep Pushdown',
    category: 'Arms',
    shortDescription:
      'Strengthen and define the triceps (back of the arm) with this cable-based pushing movement.',
    description:
      'The Tricep Pushdown is a cable exercise that targets the tricep muscles — the three-headed muscle group at the back of the upper arm. Strong triceps are important not only for arm appearance but also for pressing strength in exercises like the chest press and shoulder press.\n\nThe cable attachment can be swapped for a rope, straight bar, or V-bar to vary the angle and feel of the exercise. The cable machine provides constant tension throughout the movement, keeping the triceps working from start to finish.',
    muscles: [
      { name: 'triceps', label: 'Triceps (all three heads — back of the arm)', isPrimary: true },
    ],
    benefits: [
      'Directly targets all three heads of the tricep',
      'Constant cable tension for full-range activation',
      'Useful for improving pressing strength in other exercises',
      'Multiple attachment options for variety',
    ],
    usageSteps: [
      { step: 1, instruction: 'Attach the cable accessory', detail: 'Choose a rope, straight bar, or V-bar attachment and clip it to the high cable.' },
      { step: 2, instruction: 'Stand close to the cable', detail: 'Stand with a slight forward lean. Keep your upper arms pinned to your sides throughout.' },
      { step: 3, instruction: 'Push downward', detail: 'Extend your forearms downward until your arms are fully straight.' },
      { step: 4, instruction: 'Squeeze at the bottom', detail: 'Hold briefly with arms extended to feel the tricep fully contract.' },
      { step: 5, instruction: 'Return slowly', detail: 'Allow the forearms to rise back up under control. Keep upper arms still.' },
    ],
    beginnerTip:
      'The key to effective tricep pushdowns is keeping your elbows fixed at your sides. If they flare out or travel forward, reduce the weight.',
    safetyNote:
      'Avoid shrugging the shoulders or leaning excessively. Keep the movement isolated to the elbow joint.',
    specifications: [
      { label: 'Machine Type',       value: '[Placeholder — to be confirmed]' },
      { label: 'Cable Attachment',   value: '[Placeholder — to be confirmed]' },
      { label: 'Adjustments',        value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',        value: 'Beginner to Advanced' },
    ],
    images: [],
    hotspots: [
      { id: 'tp-cable',      label: 'Cable & Attachment', description: 'Multiple attachments available — rope, bar, or V-bar. Each emphasises the tricep slightly differently.', x: 50, y: 18, imageView: 'front' },
      { id: 'tp-weight',     label: 'Weight Stack',       description: 'Select a weight you can push down with elbows pinned — not too heavy.',                                x: 78, y: 55, imageView: 'side' },
    ],
    relatedEquipment: ['bicep-curl', 'functional-trainer', 'chest-press'],
    featured: false,
  },

  /* --- 11. TREADMILL --------------------------------------- */
  {
    id: 'treadmill',
    slug: 'treadmill',
    name: 'Treadmill',
    category: 'Cardio',
    shortDescription:
      'Improve cardiovascular fitness, burn calories, and build endurance at your own pace on a commercial-grade treadmill.',
    description:
      'The treadmill is the most widely used piece of cardio equipment in any gym. It allows you to walk, jog, or run in a safe, controlled indoor environment. The speed and incline are fully adjustable, making it suitable for a gentle warm-up walk or an intense interval training session.\n\nBuilt-in tracking displays your speed, distance, time, and calorie estimate, helping you monitor your effort and progress over time. Many programmes, from weight management to endurance building, involve treadmill training as a foundational element.',
    muscles: [
      { name: 'quads',      label: 'Quadriceps (front thigh)',      isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back of the thigh)', isPrimary: true },
      { name: 'calves',     label: 'Calves (lower leg)',             isPrimary: true },
      { name: 'glutes',     label: 'Glutes (buttocks)',              isPrimary: false },
      { name: 'core',       label: 'Core (stabilising)',             isPrimary: false },
    ],
    benefits: [
      'Improves cardiovascular health and endurance',
      'Burns calories effectively',
      'Speed and incline adjustable to any fitness level',
      'Built-in display tracks time, distance, and effort',
      'Suitable for walking, jogging, and running',
    ],
    usageSteps: [
      { step: 1, instruction: 'Step onto the treadmill', detail: 'Stand on the side rails, not the belt, before starting.' },
      { step: 2, instruction: 'Set your speed', detail: 'Begin at a low speed (e.g. 4–5 km/h for a walk) and increase gradually.' },
      { step: 3, instruction: 'Adjust the incline if desired', detail: 'Incline makes the workout more challenging and reduces impact on joints compared to higher speeds.' },
      { step: 4, instruction: 'Walk, jog, or run', detail: 'Maintain a comfortable, natural stride. Do not hold the handrails unnecessarily as this reduces the workout\'s effectiveness.' },
      { step: 5, instruction: 'Cool down', detail: 'Reduce speed gradually before stopping. Never step off a moving belt.' },
    ],
    beginnerTip:
      'If you are new to treadmill training, start with a brisk walk and a slight incline rather than running. This is easier on the joints and still an effective workout.',
    safetyNote:
      'Always attach the safety clip to your clothing before starting. This will stop the treadmill automatically if you step too far back. Never step off the treadmill while the belt is still moving.',
    specifications: [
      { label: 'Speed Range', value: '[Placeholder — to be confirmed]' },
      { label: 'Incline',     value: '[Placeholder — to be confirmed]' },
      { label: 'Display',     value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level', value: 'All Levels' },
    ],
    images: [],
    hotspots: [
      { id: 'tm-console',    label: 'Control Console', description: 'Adjust speed, incline, and view your workout stats here.',                          x: 50, y: 22, imageView: 'front' },
      { id: 'tm-belt',       label: 'Running Belt',    description: 'The moving surface. The belt speed matches the speed you set on the console.',      x: 50, y: 72, imageView: 'side' },
      { id: 'tm-handrails',  label: 'Handrails',       description: 'Use for balance when getting on or off. Try not to hold them during your workout.', x: 22, y: 45, imageView: 'front' },
      { id: 'tm-safety-key', label: 'Safety Clip',     description: 'Attach to your clothing. If you step back too far, the belt stops automatically.',  x: 50, y: 32, imageView: 'detail' },
    ],
    relatedEquipment: ['functional-trainer'],
    featured: true,
  },

  /* --- 12. FUNCTIONAL TRAINER ------------------------------ */
  {
    id: 'functional-trainer',
    slug: 'functional-trainer',
    name: 'Functional Trainer',
    category: 'Functional',
    shortDescription:
      'A versatile cable machine for full-body functional exercises. Adjust the cable height to target virtually any muscle group.',
    description:
      'The Functional Trainer is one of the most versatile pieces of equipment in the gym. It features two independently adjustable cable columns — each can be set to any height — allowing you to perform an enormous variety of exercises for the chest, back, shoulders, arms, core, and legs.\n\nUnlike machines that restrict you to a single movement pattern, the functional trainer allows natural, multi-directional movements that train the muscles in the way they actually function in everyday life and sports. This is what makes it "functional".\n\nWith the right attachments (handles, ropes, bars, ankle straps), one functional trainer can replace dozens of individual machines.',
    muscles: [
      { name: 'full-body', label: 'Full body — depends on the exercise selected', isPrimary: true },
    ],
    benefits: [
      'Extremely versatile — hundreds of possible exercises',
      'Independent cable columns for unilateral training',
      'Adjustable cable height for any movement angle',
      'Trains muscles through natural, real-life movement patterns',
      'Suitable for strength, rehabilitation, and sports conditioning',
    ],
    usageSteps: [
      { step: 1, instruction: 'Choose an exercise', detail: 'The functional trainer supports cable flys, rows, curls, tricep pushdowns, woodchops, core rotations, and many more.' },
      { step: 2, instruction: 'Set the cable height', detail: 'Adjust each column to the correct height for the exercise you have chosen.' },
      { step: 3, instruction: 'Attach the appropriate handle', detail: 'Use a D-handle, rope, bar, or ankle strap depending on your exercise.' },
      { step: 4, instruction: 'Select your weight', detail: 'Each column has its own weight stack. Start light until you are comfortable with the movement.' },
      { step: 5, instruction: 'Perform the exercise', detail: 'Move through the full range of motion in a controlled manner, keeping tension on the cable throughout.' },
    ],
    beginnerTip:
      'If you are new to functional training, ask for a demonstration of 2–3 starter exercises (e.g. a cable fly, a row, and a core rotation) to get familiar with the range of motion.',
    safetyNote:
      'Always check that the cable attachment is securely clipped before starting. Keep a firm stance and never let the cable go slack suddenly under heavy load.',
    specifications: [
      { label: 'Machine Type',      value: '[Placeholder — to be confirmed]' },
      { label: 'Cable Columns',     value: '[Placeholder — to be confirmed]' },
      { label: 'Attachments',       value: '[Placeholder — to be confirmed]' },
      { label: 'Usage Level',       value: 'All Levels' },
    ],
    images: [],
    hotspots: [
      { id: 'ft-pulleys',  label: 'Adjustable Pulleys', description: 'Set each column to any height to change the angle of the cable force.',        x: 30, y: 30, imageView: 'front' },
      { id: 'ft-handles',  label: 'Cable Handles',      description: 'Multiple attachment options — handles, ropes, bars, ankle straps.',            x: 50, y: 45, imageView: 'front' },
      { id: 'ft-weight-l', label: 'Left Weight Stack',  description: 'Controls resistance for the left cable. Each column is independently set.',    x: 18, y: 65, imageView: 'front' },
      { id: 'ft-weight-r', label: 'Right Weight Stack', description: 'Controls resistance for the right cable. Set the same as left for symmetry.', x: 82, y: 65, imageView: 'front' },
    ],
    relatedEquipment: ['lat-pulldown', 'seated-cable-row', 'tricep-pushdown'],
    featured: true,
  },
];

/* -- Helper Functions ---------------------------------------- */

/** Returns all equipment items */
export function getAllEquipment(): Equipment[] {
  return EQUIPMENT;
}

/** Returns equipment filtered by category */
export function getEquipmentByCategory(category: string): Equipment[] {
  if (category === 'All') return EQUIPMENT;
  return EQUIPMENT.filter((e) => e.category === category);
}

/** Returns a single equipment item by slug. Returns undefined if not found. */
export function getEquipmentBySlug(slug: string): Equipment | undefined {
  return EQUIPMENT.find((e) => e.slug === slug);
}

/** Returns all equipment slugs (used by generateStaticParams) */
export function getAllEquipmentSlugs(): string[] {
  return EQUIPMENT.map((e) => e.slug);
}

/** Returns featured equipment for homepage preview */
export function getFeaturedEquipment(): Equipment[] {
  return EQUIPMENT.filter((e) => e.featured);
}

/** Returns equipment related to a given slug */
export function getRelatedEquipment(slug: string): Equipment[] {
  const item = getEquipmentBySlug(slug);
  if (!item) return [];
  return item.relatedEquipment
    .map((s) => getEquipmentBySlug(s))
    .filter((e): e is Equipment => e !== undefined);
}

/** Returns the previous and next equipment items for navigation */
export function getEquipmentNavigation(slug: string): {
  prev: Equipment | undefined;
  next: Equipment | undefined;
} {
  const index = EQUIPMENT.findIndex((e) => e.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? EQUIPMENT[index - 1] : undefined,
    next: index < EQUIPMENT.length - 1 ? EQUIPMENT[index + 1] : undefined,
  };
}
