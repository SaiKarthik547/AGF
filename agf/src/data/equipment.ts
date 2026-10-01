/**
 * AGF — Anytime Golden Fitness
 * Equipment Inventory Dataset (Plan v1.2)
 *
 * Definitive 25-item catalogue verified by the gym owner across 3 sections:
 *  - CARDIO (5): Treadmills, Cross Trainer, Upright Cycle, Recumbent Cycle, Stepper
 *  - STRENGTH (13): 45° Leg Press, Leg Extension, Leg Curl, Calf Raise, Hip Abduction,
 *                   Pin-Loaded Leg Press, Vertical Chest Press, Pec Fly, Pullover Machine,
 *                   Cable Crossover, Smith Machine, Graviton Plus, Wrist Curl
 *  - FREE WEIGHT (7): Lat Pulldown, Compound Row, Squat Rack, Overhead Press,
 *                     Preacher Curl Bench, Preacher Curl Machine, Dumbbells (2.5 lb to 80 lb)
 *
 * Images: Existing matching assets are linked directly. All remaining equipment
 * entries have images: [] to trigger the interactive blueprint fallback until
 * real gym photographs arrive.
 */

import type { Equipment } from '@/types';

export const EQUIPMENT: Equipment[] = [
  /* ============================================================
     1. CARDIO (5 entries)
     ============================================================ */

  /* --- C01: Treadmills ---------------------------------------- */
  {
    id: 'eq-c01',
    slug: 'treadmills',
    name: 'Treadmills',
    category: 'Cardio',
    shortDescription:
      'Commercial-grade motorized treadmills featuring responsive shock-absorbing decks, electronic incline, and real-time biometric tracking.',
    description:
      'The commercial treadmills at Anytime Golden Fitness deliver a versatile walking, jogging, and sprinting platform engineered to minimize impact shock on knees, ankles, and hips. Equipped with powerful continuous-duty motors, the deck provides uniform belt speed across all paces.\n\nIntegrated console options let you toggle between fat-burning interval regimens, steady-state endurance training, and calorie-burning incline climbs. Real-time telemetry tracks heart rate, elapsed time, distance covered, and speed to measure cardiovascular progress.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (front thighs)', isPrimary: true },
      { name: 'calves', label: 'Calves (gastrocnemius & soleus)', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back thighs)', isPrimary: false },
      { name: 'glutes', label: 'Gluteus maximus', isPrimary: false },
      { name: 'cardiovascular', label: 'Cardiovascular system & lungs', isPrimary: true },
    ],
    benefits: [
      'Multi-layer elastomer deck absorbs repetitive landing impact',
      'Electronic incline mimics uphill runs for amplified calorie burn',
      'Emergency pull-clip instantly stops the motor if balance is lost',
      'Wide running surface accommodates varied stride lengths',
      'Strengthens heart, lungs, and lower-body muscular stamina',
    ],
    usageSteps: [
      { step: 1, instruction: 'Step onto side rails', detail: 'Straddle the belt on the side platforms before starting the motor.' },
      { step: 2, instruction: 'Attach safety clip', detail: 'Fasten the emergency cord to your waistband.' },
      { step: 3, instruction: 'Start at low speed', detail: 'Press Quick Start, allow belt to move at 1.5–2.0 km/h, then step on smoothly.' },
      { step: 4, instruction: 'Set pace and incline', detail: 'Gradually raise speed and incline to match your workout target.' },
      { step: 5, instruction: 'Cool down', detail: 'Taper speed over the final 3–5 minutes before hitting Stop.' },
    ],
    beginnerTip:
      'Keep your eyes looking forward rather than down at your feet. Avoid gripping the handrails tightly during fast walking or running, which alters natural pelvic alignment.',
    safetyNote:
      'Always connect the red emergency safety tether to your clothing. Never attempt to step onto a belt moving at high speed.',
    specifications: [
      { label: 'Equipment Type', value: 'Commercial Motorized Treadmill' },
      { label: 'Speed Range', value: 'To be confirmed' },
      { label: 'Incline Range', value: 'To be confirmed' },
      { label: 'Deck Cushioning', value: 'Multi-point shock absorption elastomer' },
    ],
    images: [
      { view: 'front', label: 'Front View', src: '/images/equipment/treadmills/front.webp', alt: 'Commercial Treadmill — Front View' },
      { view: 'side', label: 'Hero Angle', src: '/images/equipment/treadmills/hero.webp', alt: 'Commercial Treadmill — Hero 3/4 View' },
      { view: 'detail', label: 'Console & Controls', src: '/images/equipment/treadmills/detail.webp', alt: 'Commercial Treadmill — Console and Deck Detail' },
    ],
    hotspots: [
      { id: 'tm-console', label: 'Digital Metrics Console', description: 'Displays speed, pace, distance, incline percentage, heart rate, and estimated calorie burn.', x: 50, y: 22, imageView: 'front' },
      { id: 'tm-clip', label: 'Magnetic Safety Tether', description: 'Stops the motor instantly if detached from the console during use.', x: 50, y: 30, imageView: 'front' },
      { id: 'tm-sensors', label: 'Pulse Grip Handrails', description: 'Dual contact sensors measure your heart rate when gripped with both palms.', x: 36, y: 33, imageView: 'front' },
      { id: 'tm-deck', label: 'Cushioned Running Deck', description: 'Multi-layer composite running belt with elastomer shock dampers to reduce joint strain.', x: 50, y: 72, imageView: 'front' },
      { id: 'tm-hero-console', label: 'Digital Metrics Console', description: 'Displays speed, pace, distance, incline percentage, heart rate, and estimated calorie burn.', x: 62, y: 22, imageView: 'side' },
      { id: 'tm-hero-clip', label: 'Magnetic Safety Tether', description: 'Stops the motor instantly if detached from the console during use.', x: 58, y: 30, imageView: 'side' },
      { id: 'tm-hero-sensors', label: 'Pulse Grip Handrails', description: 'Dual contact sensors measure your heart rate when gripped with both palms.', x: 44, y: 34, imageView: 'side' },
      { id: 'tm-hero-deck', label: 'Cushioned Running Deck', description: 'Multi-layer composite running belt with elastomer shock dampers to reduce joint strain.', x: 42, y: 72, imageView: 'side' },
      { id: 'tm-detail-console', label: 'Touch Metrics Display', description: 'Real-time telemetry showing speed, incline %, workout duration, and telemetry.', x: 42, y: 22, imageView: 'detail' },
      { id: 'tm-detail-clip', label: 'Emergency Stop Tether', description: 'Magnetic disconnect lanyard triggers immediate failsafe belt stop.', x: 54, y: 54, imageView: 'detail' },
      { id: 'tm-detail-sensors', label: 'Ergonomic Pulse Handrails', description: 'Integrated heart-rate contact sensors and quick-toggle speed adjustment buttons.', x: 38, y: 53, imageView: 'detail' },
      { id: 'tm-detail-deck', label: 'Shock-Absorbing Deck', description: 'High-density running belt with elastomer cushion zone for joint-friendly foot-strikes.', x: 54, y: 92, imageView: 'detail' },
    ],
    relatedEquipment: ['cross-trainer', 'upright-cycle', 'recumbent-cycle', 'stepper'],
    featured: true,
  },

  /* --- C02: Cross Trainer ------------------------------------- */
  {
    id: 'eq-c02',
    slug: 'cross-trainer',
    name: 'Cross Trainer',
    category: 'Cardio',
    shortDescription:
      'Low-impact total-body elliptical combining synchronized upper-body handles with smooth footplates for joint-friendly aerobic conditioning.',
    description:
      'The Cross Trainer provides a complete aerobic workout that engages both the upper and lower body simultaneously. By following a guided elliptical motion, your feet remain in continuous contact with the pedals, eliminating foot-strike impact on knees, hips, and lower back.\n\nDual-action moving handlebars allow you to actively push and pull with your chest, back, and arms while your quadriceps, hamstrings, and glutes drive the pedals. Adjusting magnetic resistance and stride cadence makes it adaptable for light warm-ups or high-intensity interval sessions.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (front thighs)', isPrimary: true },
      { name: 'glutes', label: 'Gluteus maximus', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back thighs)', isPrimary: false },
      { name: 'chest-back', label: 'Chest & upper back (push-pull handles)', isPrimary: false },
      { name: 'calves', label: 'Calves (soleus & gastrocnemius)', isPrimary: false },
    ],
    benefits: [
      'Near-zero impact on knees and ankles compared to outdoor running',
      'Dual-action handles engage upper-body musculature simultaneously',
      'Forward and reverse pedaling options target different muscle groups',
      'Smooth magnetic resistance for whisper-quiet, fluid movement',
    ],
    usageSteps: [
      { step: 1, instruction: 'Mount the pedals', detail: 'Hold the stationary handles and step onto the lower pedal first, then the upper.' },
      { step: 2, instruction: 'Take the moving handles', detail: 'Grasp the moving arm levers with a relaxed, firm grip.' },
      { step: 3, instruction: 'Begin rhythmic striding', detail: 'Push forward through the balls of your feet in a smooth, continuous oval path.' },
      { step: 4, instruction: 'Synchronize push and pull', detail: 'Push with one arm while pulling with the other in rhythm with your leg drive.' },
      { step: 5, instruction: 'Adjust resistance', detail: 'Select a resistance level that allows 60–80 RPM without bouncing your torso.' },
    ],
    beginnerTip:
      'Distribute your weight evenly across the entire surface of each footplate instead of standing solely on your toes to avoid calf cramping.',
    safetyNote:
      'Hold the stationary center handles when mounting or dismounting until the flywheel has come to a complete stop.',
    specifications: [
      { label: 'Equipment Type', value: 'Elliptical Cross Trainer' },
      { label: 'Resistance Mechanism', value: 'Electromagnetic flywheel' },
      { label: 'Stride Length', value: 'To be confirmed' },
      { label: 'Pedal Design', value: 'Oversized non-slip footplates' },
    ],
    images: [
      { view: 'front', label: 'Front View', src: '/images/equipment/cross-trainer/front.webp', alt: 'Commercial Elliptical Cross Trainer — Front Elevation' },
      { view: 'side', label: 'Hero Angle', src: '/images/equipment/cross-trainer/hero.webp', alt: 'Commercial Elliptical Cross Trainer — 3/4 Hero View' },
      { view: 'detail', label: 'Console & Grips', src: '/images/equipment/cross-trainer/detail.webp', alt: 'Commercial Cross Trainer — Console and Handles Detail' },
    ],
    hotspots: [
      { id: 'xt-console', label: 'Central Metrics Console', description: 'Real-time telemetry tracking RPM, watts, speed, elapsed time, and heart rate.', x: 50, y: 20, imageView: 'front' },
      { id: 'xt-handles', label: 'Synchronized Upper Arms', description: 'Ergonomic dual-action levers provide upper-body push and pull conditioning.', x: 39, y: 22, imageView: 'front' },
      { id: 'xt-stationary', label: 'Stationary Pulse Grips', description: 'Dual contact pulse sensors enable heart-rate monitoring during lower-body isolation.', x: 46, y: 24, imageView: 'front' },
      { id: 'xt-pedals', label: 'Articulating Footplates', description: 'Oversized non-slip pedals promote natural ankle articulation and zero-impact stride.', x: 55, y: 74, imageView: 'front' },
      { id: 'xt-flywheel', label: 'Enclosed Magnetic Flywheel', description: 'Precision-balanced internal flywheel delivers smooth, whisper-quiet resistance.', x: 50, y: 62, imageView: 'front' },
      { id: 'xt-hero-console', label: 'Central Metrics Console', description: 'Monitors RPM, watts, speed, elapsed time, and heart rate.', x: 55, y: 21, imageView: 'side' },
      { id: 'xt-hero-handles', label: 'Synchronized Upper Arms', description: 'Ergonomic dual-action levers provide upper-body push and pull conditioning.', x: 44, y: 24, imageView: 'side' },
      { id: 'xt-hero-pedals', label: 'Articulating Footplates', description: 'Oversized non-slip pedals promote natural ankle articulation.', x: 45, y: 74, imageView: 'side' },
      { id: 'xt-detail-console', label: 'Digital Metrics Console', description: 'Backlit multi-function digital display for cadence, calories, and interval targets.', x: 55, y: 22, imageView: 'detail' },
      { id: 'xt-detail-pulse', label: 'Stationary Pulse Sensors', description: 'Chrome contact plates continuously transmit heart rate telemetry to the display.', x: 48, y: 40, imageView: 'detail' },
      { id: 'xt-detail-bottle', label: 'Integrated Bottle Holder', description: 'Convenient hydration cradle mounted directly on the central support column.', x: 49, y: 66, imageView: 'detail' },
      { id: 'xt-detail-pivot', label: 'Heavy-Duty Upper Pivot', description: 'Industrial sealed bearings ensure frictionless arm movement under high resistance.', x: 73, y: 83, imageView: 'detail' },
    ],
    relatedEquipment: ['treadmills', 'upright-cycle', 'recumbent-cycle', 'stepper'],
    featured: false,
  },

  /* --- C03: Upright Cycle ------------------------------------- */
  {
    id: 'eq-c03',
    slug: 'upright-cycle',
    name: 'Upright Cycle',
    category: 'Cardio',
    shortDescription:
      'Stationary upright cycle replicating standard outdoor cycling posture for focused leg endurance, quad recruitment, and cardio fitness.',
    description:
      'The Upright Cycle mimics the geometry and biomechanics of standard road cycling. It positions your hips directly above the pedal cranks, requiring active core engagement and encouraging intense quadricep and calf recruitment.\n\nFeaturing an ergonomically contoured saddle with vertical and horizontal adjustments, this bike accommodates exercisers of varying heights. Adjustable toe straps keep feet locked securely to the pedals, enabling smooth power transfer through every rotation.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (front thighs)', isPrimary: true },
      { name: 'calves', label: 'Calves (gastrocnemius & soleus)', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back thighs)', isPrimary: false },
      { name: 'glutes', label: 'Gluteus muscles', isPrimary: false },
    ],
    benefits: [
      'Compact footprint with athletic upright cycling ergonomics',
      'Strengthens lower-body muscles while elevating aerobic capacity',
      'Adjustable seat height and reach prevents knee hyperextension',
      'Weighted pedals with quick-lock straps maximize pedal stroke efficiency',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust saddle height', detail: 'Set seat level with your hip bone when standing next to the bike.' },
      { step: 2, instruction: 'Mount the cycle', detail: 'Step over the frame, sit squarely, and slip feet into pedal straps.' },
      { step: 3, instruction: 'Verify knee extension', detail: 'At the bottom of the pedal stroke, your knee should have a slight 25° bend.' },
      { step: 4, instruction: 'Select resistance', detail: 'Start at moderate tension and maintain a consistent cadence between 70–90 RPM.' },
      { step: 5, instruction: 'Breathe steadily', detail: 'Keep shoulders relaxed and avoid leaning all upper-body weight onto handlebars.' },
    ],
    beginnerTip:
      'A seat that is set too low puts unnecessary stress on the front of your knees. Adjust the saddle height so your leg is almost straight (with a slight soft bend) at the bottom.',
    safetyNote:
      'Ensure the saddle pin is completely locked into a numbered hole before sitting down.',
    specifications: [
      { label: 'Equipment Type', value: 'Stationary Upright Exercise Bike' },
      { label: 'Saddle Adjustment', value: 'Vertical & horizontal fore/aft' },
      { label: 'Resistance Mechanism', value: 'Magnetic resistance' },
      { label: 'Drive System', value: 'To be confirmed' },
    ],
    images: [
      { view: 'front', label: 'Front View', src: '/images/equipment/upright-cycle/front.webp', alt: 'Commercial Upright Exercise Cycle — Front Elevation' },
      { view: 'side', label: 'Hero Angle', src: '/images/equipment/upright-cycle/hero.webp', alt: 'Commercial Upright Exercise Cycle — 3/4 Hero View' },
      { view: 'detail', label: 'Console & Dial', src: '/images/equipment/upright-cycle/detail.webp', alt: 'Commercial Upright Cycle — Console and Handlebar Detail' },
    ],
    hotspots: [
      { id: 'uc-console', label: 'Digital Metrics Console', description: 'Tracks RPM, distance, watts, heart rate, and cadence on an anti-glare screen.', x: 50, y: 15, imageView: 'front' },
      { id: 'uc-handlebar', label: 'Multi-Grip Handlebars', description: 'Supports upright cruising, forward sprint, and aerodynamic drop grips.', x: 41, y: 20, imageView: 'front' },
      { id: 'uc-saddle', label: 'Anatomic Comfort Saddle', description: 'Contoured gel-cushioned saddle designed for pelvic support during endurance rides.', x: 50, y: 31, imageView: 'front' },
      { id: 'uc-pedals', label: 'Weighted Pedals with Straps', description: 'Balanced pedals with quick-cinch straps for smooth circular stroke efficiency.', x: 42, y: 58, imageView: 'front' },
      { id: 'uc-flywheel', label: 'Enclosed Magnetic Flywheel', description: 'Heavy internal flywheel provides fluid, uniform pedaling inertia.', x: 50, y: 68, imageView: 'front' },
      { id: 'uc-hero-console', label: 'Digital Metrics Console', description: 'Monitors workout parameters in real time.', x: 64, y: 14, imageView: 'side' },
      { id: 'uc-hero-saddle', label: 'Adjustable Saddle Post', description: 'Vertical and fore/aft quick-release pins customize hip alignment.', x: 33, y: 30, imageView: 'side' },
      { id: 'uc-hero-pedal', label: 'Weighted Pedal Assembly', description: 'Heavy-duty crank arm and strapped pedal for intense spin intervals.', x: 50, y: 77, imageView: 'side' },
      { id: 'uc-detail-console', label: 'Touch Metrics Display', description: 'Displays cadence (RPM), heart rate, speed, power in watts, and elapsed time.', x: 65, y: 22, imageView: 'detail' },
      { id: 'uc-detail-grips', label: 'Textured Aero Handlebars', description: 'Slip-resistant textured rubber coating for maximum grip control during hard efforts.', x: 44, y: 42, imageView: 'detail' },
      { id: 'uc-detail-dial', label: 'Micro-Resistance Adjustment', description: 'Precision dial knob allows instant millimeter resistance fine-tuning.', x: 40, y: 80, imageView: 'detail' },
      { id: 'uc-detail-quick', label: 'Stem Height Quick-Release', description: 'Spring-loaded pin locks handlebar stem securely at your chosen height.', x: 57, y: 72, imageView: 'detail' },
    ],
    relatedEquipment: ['recumbent-cycle', 'treadmills', 'cross-trainer', 'stepper'],
    featured: false,
  },

  /* --- C04: Recumbent Cycle ----------------------------------- */
  {
    id: 'eq-c04',
    slug: 'recumbent-cycle',
    name: 'Recumbent Cycle',
    category: 'Cardio',
    shortDescription:
      'Ergonomic seated stationary cycle with supportive lumbar backrest, ideal for joint-friendly cardiovascular conditioning and rehabilitation.',
    description:
      'The Recumbent Cycle is built for low-stress, spine-supported cardiovascular training. Featuring an open step-through frame, a wide bucket seat, and a contoured backrest, it supports your lumbar spine while positioning your legs out in front rather than underneath you.\n\nThis reclined configuration significantly reduces pressure on knees, hips, and lower back, making it accessible to beginners, seniors, or anyone recovering from joint discomfort while still providing an effective aerobic calorie burn.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (front thighs)', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back thighs)', isPrimary: true },
      { name: 'glutes', label: 'Gluteus maximus', isPrimary: false },
      { name: 'calves', label: 'Calves (gastrocnemius)', isPrimary: false },
    ],
    benefits: [
      'Full back and lumbar support minimizes lower-spine fatigue',
      'Step-through frame allows effortless, low-risk mounting and dismounting',
      'Horizontal pedaling axis reduces peak knee flexion load',
      'Seat-mounted grip handles include pulse sensors for continuous heart monitoring',
    ],
    usageSteps: [
      { step: 1, instruction: 'Step through frame', detail: 'Walk through the open center and sit down into the wide bucket seat.' },
      { step: 2, instruction: 'Adjust seat distance', detail: 'Lift the lever under the seat and slide forward or backward until your knees have a slight bend at furthest pedal reach.' },
      { step: 3, instruction: 'Fasten pedal straps', detail: 'Secure feet into pedals to ensure smooth push-and-pull strokes.' },
      { step: 4, instruction: 'Engage backrest', detail: 'Rest your back fully against the lumbar support pad throughout the session.' },
      { step: 5, instruction: 'Begin pedaling', detail: 'Start pedaling smoothly and choose your target resistance on the console.' },
    ],
    beginnerTip:
      'Avoid sliding the seat so far forward that your knees bend past 90 degrees on the return stroke. Keep a comfortable, natural leg extension.',
    safetyNote:
      'Make sure the seat adjustment lever firmly clicks into place before you apply hard pedaling pressure.',
    specifications: [
      { label: 'Equipment Type', value: 'Commercial Recumbent Cycle' },
      { label: 'Seat Design', value: 'Ergonomic bucket seat with lumbar backrest' },
      { label: 'Frame Design', value: 'Walk-through / step-through accessible' },
      { label: 'Resistance Mechanism', value: 'Quiet magnetic flywheel' },
    ],
    images: [
      { view: 'front', label: 'Front View', src: '/images/equipment/recumbent-cycle/front.webp', alt: 'Commercial Recumbent Cycle — Front Elevation' },
      { view: 'side', label: 'Hero Angle', src: '/images/equipment/recumbent-cycle/hero.webp', alt: 'Commercial Recumbent Cycle — 3/4 Hero View' },
      { view: 'detail', label: 'Seat & Rail', src: '/images/equipment/recumbent-cycle/detail.webp', alt: 'Commercial Recumbent Cycle — Seat and Slider Rail Detail' },
    ],
    hotspots: [
      { id: 'rc-console', label: 'Front Digital Console', description: 'Central telemetry screen for speed, distance, heart rate, and caloric metrics.', x: 50, y: 20, imageView: 'front' },
      { id: 'rc-handles', label: 'Stationary Front Grips', description: 'Ergonomic bullhorn handlebars for stability during mounting and high-cadence pushes.', x: 41, y: 26, imageView: 'front' },
      { id: 'rc-pedals', label: 'Forward Crank Pedals', description: 'Heavy strapped pedals positioned forward to reduce knee compressive forces.', x: 42, y: 72, imageView: 'front' },
      { id: 'rc-backrest', label: 'Lumbar Support Backrest', description: 'High-density contoured backrest aligns the spine and eliminates lower-back fatigue.', x: 50, y: 40, imageView: 'front' },
      { id: 'rc-hero-console', label: 'Front Digital Console', description: 'Central telemetry screen displaying live performance data.', x: 61, y: 23, imageView: 'side' },
      { id: 'rc-hero-backrest', label: 'Lumbar Support Backrest', description: 'Ergonomic bucket seat supports the lower back during aerobic sessions.', x: 34, y: 34, imageView: 'side' },
      { id: 'rc-hero-lever', label: 'Fore/Aft Seat Slider Rail', description: 'Smooth aluminum track allows customized leg reach adjustment.', x: 41, y: 59, imageView: 'side' },
      { id: 'rc-hero-pedals', label: 'Forward Crank Pedals', description: 'Forward-extended pedals minimize hip flexion compression.', x: 68, y: 64, imageView: 'side' },
      { id: 'rc-detail-backrest', label: 'Lumbar Ergonomic Backrest', description: 'Thick contoured foam backrest maintains natural lordotic lumbar curve.', x: 37, y: 18, imageView: 'detail' },
      { id: 'rc-detail-rail', label: 'Extruded Aluminum Slider', description: 'Low-friction seat rail with precision locking pin for solid seat stability.', x: 54, y: 59, imageView: 'detail' },
      { id: 'rc-detail-lever', label: 'Quick-Release Lever', description: 'Spring-assisted lever disengages the track for effortless one-handed seat adjustment.', x: 54, y: 52, imageView: 'detail' },
      { id: 'rc-detail-pulse', label: 'Seat-Side Pulse Handles', description: 'Integrated pulse sensor handles with adjacent hydration bottle cage.', x: 46, y: 34, imageView: 'detail' },
    ],
    relatedEquipment: ['upright-cycle', 'treadmills', 'cross-trainer', 'stepper'],
    featured: false,
  },

  /* --- C05: Stepper ------------------------------------------- */
  {
    id: 'eq-c05',
    slug: 'stepper',
    name: 'Stepper',
    category: 'Cardio',
    shortDescription:
      'Stair-climbing cardiovascular station with independent pedals to develop glute power, calf stamina, and high-intensity caloric burn.',
    description:
      'The Stepper simulates continuous stair climbing, one of the most effective aerobic exercises for strengthening the glutes, thighs, and calves. By utilizing independent stepping pedals with hydraulic or magnetic resistance, each leg must drive down through its own force.\n\nErgonomic handrails keep you steady while encouraging upright posture. Because the feet never leave the pedals, it provides the conditioning benefits of hill climbing and stair runs without the harsh joint impact of descending stairs.',
    muscles: [
      { name: 'glutes', label: 'Gluteus maximus (glutes)', isPrimary: true },
      { name: 'quadriceps', label: 'Quadriceps (front thighs)', isPrimary: true },
      { name: 'calves', label: 'Calves (gastrocnemius & soleus)', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back thighs)', isPrimary: false },
      { name: 'core', label: 'Core stabilizers', isPrimary: false },
    ],
    benefits: [
      'Intense lower-body toning targeting glutes and calf muscles',
      'High calorie-burn rate through vertical resistance climbing',
      'Impact-free foot contact protects knees compared to running stairs',
      'Padded multi-grip handrails support varied climbing postures',
    ],
    usageSteps: [
      { step: 1, instruction: 'Mount the pedals', detail: 'Place one foot on the lower pedal, then step onto the higher pedal while grasping handrails.' },
      { step: 2, instruction: 'Maintain upright posture', detail: 'Keep chest tall, shoulders back, and avoid leaning heavily forward on the rails.' },
      { step: 3, instruction: 'Begin rhythmic stepping', detail: 'Drive through your heels in deep, controlled 6 to 10-inch downward steps.' },
      { step: 4, instruction: 'Avoid bottoming out', detail: 'Reverse step direction before the pedal impacts the bottom frame bumper.' },
      { step: 5, instruction: 'Cool down', detail: 'Reduce resistance and step slowly before bringing pedals to a complete stop.' },
    ],
    beginnerTip:
      'Resist the temptation to support your body weight with your arms on the handrails. Let your legs carry your weight to maximize muscle activation and calorie burn.',
    safetyNote:
      'Do not take shallow, rapid flutter steps. Full, measured steps engage the glutes properly and prevent loss of balance.',
    specifications: [
      { label: 'Equipment Type', value: 'Commercial Stair Stepper' },
      { label: 'Step Action', value: 'Independent pedal mechanism' },
      { label: 'Resistance Mechanism', value: 'To be confirmed' },
      { label: 'Console Features', value: 'Floors climbed, SPM, time, calories' },
    ],
    images: [],
    hotspots: [
      { id: 'st-rails', label: 'Support Handrails', description: 'Provides balance and stability without taking weight off the lower-body musculature.', x: 35, y: 32, imageView: 'front' },
      { id: 'st-console', label: 'Metrics Display', description: 'Tracks steps per minute, floors climbed, workout duration, and heart rate.', x: 50, y: 20, imageView: 'front' },
      { id: 'st-pedals', label: 'Independent Foot Pedals', description: 'Heavy-duty non-slip pedals provide smooth hydraulic or magnetic descent.', x: 48, y: 70, imageView: 'front' },
      { id: 'st-speed', label: 'Cadence / Resistance Buttons', description: 'Allows instant adjustment of step resistance and speed during workouts.', x: 50, y: 38, imageView: 'front' },
    ],
    relatedEquipment: ['treadmills', 'cross-trainer', 'upright-cycle', 'recumbent-cycle'],
    featured: false,
  },

  /* ============================================================
     2. STRENGTH (13 entries)
     ============================================================ */

  /* --- S01: 45° Leg Press ------------------------------------- */
  {
    id: 'eq-s01',
    slug: '45-degree-leg-press',
    name: '45° Leg Press',
    category: 'Strength',
    shortDescription:
      'Heavy-duty plate-loaded 45-degree linear leg press delivering massive quad and glute overload with complete lumbar spine support.',
    description:
      'The 45° Leg Press is a foundational lower-body compound station at Anytime Golden Fitness. Moving along a 45-degree incline on industrial linear bearings, the sled allows you to safely overload the quadriceps, glutes, and hamstrings without loading weight directly onto your cervical or lumbar spine.\n\nAn oversized, angled footplate lets you adjust foot stance width and vertical positioning to emphasize specific leg zones—wider and higher for glutes and hamstrings, narrower and lower for quadricep sweep. Dual safety lockout stops give lifters confidence when handling heavy working sets.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (front thighs)', isPrimary: true },
      { name: 'glutes', label: 'Gluteus maximus (glutes)', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back thighs)', isPrimary: false },
      { name: 'calves', label: 'Calves & stabilizers', isPrimary: false },
    ],
    benefits: [
      'Massive lower-body overload capacity without axial spinal compression',
      'Oversized footplate supports wide, narrow, high, and low foot stances',
      'Dual safety lockout levers allow independent, secure set termination',
      'Precision linear bearings ensure a frictionless, fluid carriage slide',
    ],
    usageSteps: [
      { step: 1, instruction: 'Load Olympic plates', detail: 'Distribute weight plates evenly across both sides of the sled horns.' },
      { step: 2, instruction: 'Position yourself on backrest', detail: 'Sit with your lower back and glutes pressed firmly into the contoured pads.' },
      { step: 3, instruction: 'Set foot placement', detail: 'Place feet shoulder-width apart in the center of the footplate with toes angled slightly out.' },
      { step: 4, instruction: 'Release safety stops', detail: 'Press the sled up slightly, rotate the side safety lockout handles outward, and grasp the side grips.' },
      { step: 5, instruction: 'Lower and press', detail: 'Lower the sled until knees form a 90° angle, then drive through mid-foot and heels to return without locking knees.' },
    ],
    beginnerTip:
      'Never allow your lower back or pelvis to curl off the bottom pad at the bottom of the movement. Maintain constant contact to safeguard your lumbar spine.',
    safetyNote:
      'Never lock your knees out straight under heavy load. Keep a soft, active bend at the top of every rep to protect your knee joints.',
    specifications: [
      { label: 'Equipment Type', value: 'Plate-Loaded 45° Linear Sled' },
      { label: 'Incline Angle', value: '45 Degrees' },
      { label: 'Plate Horns', value: 'Standard Olympic 50mm weight horns' },
      { label: 'Safety Stops', value: 'Multi-position mechanical safety catches' },
    ],
    images: [
      { view: 'side', label: 'Side Profile', src: '/images/equipment/45-degree-leg-press/side.webp', alt: '45° Leg Press Machine — Side Angle' },
      { view: 'front', label: 'Hero View', src: '/images/equipment/45-degree-leg-press/hero.webp', alt: '45° Leg Press Machine — Hero View' },
    ],
    hotspots: [
      { id: 'lp-plate', label: 'Oversized Footplate', description: 'Diamond-tread steel footplate supports variable stance widths to target quads or glutes.', x: 45, y: 30, imageView: 'side' },
      { id: 'lp-safety', label: 'Safety Lockout Handles', description: 'Rotate outward to release the sled; rotate inward at any point to lock the sled safely.', x: 30, y: 60, imageView: 'side' },
      { id: 'lp-backrest', label: 'Contoured Lumbar Backrest', description: 'Angled high-density pad anchors pelvis and spine in neutral alignment under load.', x: 22, y: 50, imageView: 'side' },
      { id: 'lp-horns', label: 'Olympic Weight Horns', description: 'Extended weight posts hold multiple Olympic plates for progressive overload.', x: 65, y: 40, imageView: 'side' },
      { id: 'lp-front-plate', label: 'Oversized Footplate', description: 'Supports narrow, wide, and staggered stance variations.', x: 48, y: 32, imageView: 'front' },
      { id: 'lp-front-safety', label: 'Dual Safety Catches', description: 'Heavy-duty lockout handles for solo lifting security.', x: 34, y: 58, imageView: 'front' },
      { id: 'lp-front-backrest', label: 'Lumbar Support Cushion', description: 'Protects the lower spine and pelvis during full depth presses.', x: 52, y: 52, imageView: 'front' },
      { id: 'lp-front-horns', label: 'Weight Plate Horns', description: 'Dual Olympic plate horns for massive progressive overload.', x: 75, y: 44, imageView: 'front' },
    ],
    relatedEquipment: ['pin-loaded-leg-press', 'leg-extension', 'leg-curl', 'calf-raise'],
    featured: true,
  },

  /* --- S02: Leg Extension ------------------------------------- */
  {
    id: 'eq-s02',
    slug: 'leg-extension',
    name: 'Leg Extension',
    category: 'Strength',
    shortDescription:
      'Isolated quadriceps machine engineered with an anatomical cam profile to load the knee extensors through a complete range of motion.',
    description:
      'The Leg Extension machine isolates the four heads of the quadriceps muscle group through pure knee extension. By keeping the hip joint fixed and stabilizing the torso against a padded backrest, it removes assistance from the glutes and lower back to deliver direct tension to the thighs.\n\nThe anatomical cam mechanism optimizes resistance throughout the arc, keeping tension consistent from deep flexion to peak terminal contraction. Side handles provide leverage to anchor your pelvis firmly into the seat.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (rectus femoris & vasti)', isPrimary: true },
    ],
    benefits: [
      'Complete isolation of all four quadriceps heads',
      'Anatomical cam profile provides matched resistance through the entire extension',
      'Adjustable shin roller and backrest fit different femur lengths',
      'Side grip handles keep pelvis firmly locked into the seat',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust backrest', detail: 'Set back pad so the axis of rotation aligns with your knee joint center.' },
      { step: 2, instruction: 'Adjust shin pad', detail: 'Position the lower roller pad directly above your ankle joint on the lower shins.' },
      { step: 3, instruction: 'Select weight pin', detail: 'Choose a controlled weight suitable for 10–15 strict repetitions.' },
      { step: 4, instruction: 'Extend legs upward', detail: 'Smoothly straighten legs until fully extended, pausing briefly for a peak quadricep contraction.' },
      { step: 5, instruction: 'Control descent', detail: 'Lower the weight stack under control over 2–3 seconds without slamming the plates.' },
    ],
    beginnerTip:
      'Ensure the machine pivot point aligns directly with your knee joints before lifting. Misalignment places unwanted sheer forces on the kneecap.',
    safetyNote:
      'Avoid swinging or kicking the weight up explosively. Maintain smooth, controlled tempo to protect the patellar tendon.',
    specifications: [
      { label: 'Equipment Type', value: 'Selectorized Pin-Loaded Leg Extension' },
      { label: 'Pivot Alignment', value: 'Coaxial with anatomical knee joint' },
      { label: 'Shin Roller Adjustment', value: 'Multi-stop radial lever' },
      { label: 'Weight Stack', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'le-roller', label: 'Padded Shin Roller', description: 'Contoured foam roller rests comfortably against the lower shin above the ankle joint.', x: 48, y: 72, imageView: 'front' },
      { id: 'le-backrest', label: 'Adjustable Backrest Pin', description: 'Sets seat depth so the user’s knees align precisely with the machine pivot axis.', x: 32, y: 45, imageView: 'front' },
      { id: 'le-cam', label: 'Variable Resistance Cam', description: 'Smooth bearing cam matches the natural strength curve of the quadriceps muscle.', x: 55, y: 52, imageView: 'front' },
      { id: 'le-pin', label: 'Magnetic Weight Stack Pin', description: 'Quick-selector magnetic pin for instant, secure weight changes.', x: 68, y: 55, imageView: 'front' },
    ],
    relatedEquipment: ['leg-curl', '45-degree-leg-press', 'pin-loaded-leg-press'],
    featured: false,
  },

  /* --- S03: Leg Curl ----------------------------------------- */
  {
    id: 'eq-s03',
    slug: 'leg-curl',
    name: 'Leg Curl',
    category: 'Strength',
    shortDescription:
      'Direct hamstring isolation station utilizing targeted knee flexion to build posterior chain balance, knee stability, and muscle mass.',
    description:
      'The Leg Curl machine targets the three hamstring muscles—biceps femoris, semitendinosus, and semimembranosus—through direct knee flexion. Balanced hamstring strength is critical for knee joint integrity, athletic sprinting power, and preventing hamstring tears.\n\nWhether seated or prone, the machine features an adjustable ankle pad and ergonomic thigh support that prevents hip elevation during contraction. This keeps focus purely on the hamstrings from full stretch to maximum knee bend.',
    muscles: [
      { name: 'hamstrings', label: 'Hamstrings (biceps femoris, semitendinosus)', isPrimary: true },
      { name: 'calves', label: 'Gastrocnemius (upper calf)', isPrimary: false },
    ],
    benefits: [
      'Isolates the hamstring group through full knee flexion',
      'Essential for knee joint balance opposite strong quadriceps',
      'Adjustable roller pad fits varying leg and shin lengths',
      'Provides safe, guided resistance without lower-back strain',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust thigh / ankle pads', detail: 'Position ankle roller behind your Achilles tendon and lock thigh pad in place.' },
      { step: 2, instruction: 'Select resistance', detail: 'Insert weight pin for a weight you can curl through full range with good form.' },
      { step: 3, instruction: 'Grip stabilization handles', detail: 'Grip side handles firmly to keep your hips pressed against the seat.' },
      { step: 4, instruction: 'Curl heels backward', detail: 'Flex knees smoothly, pulling your heels toward your glutes as far as comfortably possible.' },
      { step: 5, instruction: 'Slow eccentric return', detail: 'Return the weight slowly over 3 seconds to feel a deep hamstring stretch.' },
    ],
    beginnerTip:
      'Keep your toes pointed slightly toward your shins (dorsiflexion) to maximize hamstring tension and reduce calf cramping.',
    safetyNote:
      'Do not let the weight stack touch down between reps. Maintain continuous tension on the hamstrings throughout the set.',
    specifications: [
      { label: 'Equipment Type', value: 'Selectorized Leg Curl Station' },
      { label: 'Ankle Pad Adjustment', value: 'Multi-position indexing pin' },
      { label: 'Upholstery', value: 'High-density commercial vinyl' },
      { label: 'Weight Stack', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'lc-roller', label: 'Achilles Roller Pad', description: 'Cushioned pad rests against the lower calf and Achilles tendon for smooth knee flexion.', x: 55, y: 68, imageView: 'front' },
      { id: 'lc-thigh', label: 'Thigh Hold-Down Pad', description: 'Stabilizes upper thighs to prevent hip lifting during peak hamstring contractions.', x: 45, y: 50, imageView: 'front' },
      { id: 'lc-grips', label: 'Stabilizing Handles', description: 'Ergonomic side grips allow the user to brace their upper body and anchor the pelvis.', x: 30, y: 48, imageView: 'front' },
      { id: 'lc-stack', label: 'Selectorized Weight Stack', description: 'Enclosed commercial stack allows quick increments with magnetic safety pin.', x: 70, y: 58, imageView: 'front' },
    ],
    relatedEquipment: ['leg-extension', '45-degree-leg-press', 'calf-raise'],
    featured: false,
  },

  /* --- S04: Calf Raise ---------------------------------------- */
  {
    id: 'eq-s04',
    slug: 'calf-raise',
    name: 'Calf Raise',
    category: 'Strength',
    shortDescription:
      'Dedicated calf machine designed for full ankle plantarflexion, achieving deep heel stretch and powerful contraction of the gastrocnemius.',
    description:
      'The Calf Raise station isolates the lower leg muscles through vertical plantarflexion. The foot block is engineered with a rounded, non-slip textured edge, allowing your heels to drop below the platform for a deep pre-stretch that triggers maximum muscle fiber recruitment.\n\nPadded shoulder or thigh pads distribute the load comfortably across the frame, while multi-position safety release levers allow you to start and end sets safely at the top of the movement.',
    muscles: [
      { name: 'gastrocnemius', label: 'Gastrocnemius (upper calf)', isPrimary: true },
      { name: 'soleus', label: 'Soleus (deep calf)', isPrimary: true },
      { name: 'foot-flexors', label: 'Plantar flexors of the foot', isPrimary: false },
    ],
    benefits: [
      'Elevated foot block provides deep ankle dorsiflexion for a full pre-stretch',
      'Thick ergonomic padding distributes heavy loads without pressure points',
      'Safety catch levers allow immediate, secure set termination',
      'Builds explosive lower-leg drive and ankle joint stability',
    ],
    usageSteps: [
      { step: 1, instruction: 'Step onto foot block', detail: 'Place the balls of your feet on the textured edge with heels hanging off freely.' },
      { step: 2, instruction: 'Set shoulder pads', detail: 'Position pads comfortably over shoulders with knees softly unlocked.' },
      { step: 3, instruction: 'Disengage safety catch', detail: 'Raise up onto your toes slightly to release the safety lever.' },
      { step: 4, instruction: 'Lower heels deeply', detail: 'Slowly drop heels below the step until you feel a complete stretch in the calf muscles.' },
      { step: 5, instruction: 'Drive onto toes', detail: 'Press forcefully through the balls of your feet to reach full plantarflexion, pausing for 1 second.' },
    ],
    beginnerTip:
      'Pause for a full second at the bottom of the stretch. Bouncing at the bottom relies on Achilles tendon elasticity rather than forcing the calf muscles to do the work.',
    safetyNote:
      'Maintain a slight, soft bend in the knees throughout the standing calf movement. Never hyper-extend or lock knees backward.',
    specifications: [
      { label: 'Equipment Type', value: 'Commercial Calf Raise Station' },
      { label: 'Foot Platform', value: 'Heavy-gauge non-slip diamond plate' },
      { label: 'Shoulder / Thigh Padding', value: 'Contoured high-density foam' },
      { label: 'Weight Loading', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'cr-block', label: 'Textured Foot Block', description: 'Angled, non-slip foot ledge allows full heel drop for deep gastrocnemius stretch.', x: 50, y: 78, imageView: 'front' },
      { id: 'cr-pads', label: 'Contoured Shoulder Pads', description: 'Padded support rests on the shoulders, transferring load directly through the spine.', x: 50, y: 32, imageView: 'front' },
      { id: 'cr-lever', label: 'Safety Release Lever', description: 'Engages and disengages the carriage lock at the top of the movement.', x: 38, y: 55, imageView: 'front' },
      { id: 'cr-stack', label: 'Weight Assembly', description: 'Pin-loaded or plate-loaded resistance assembly for progressive calf overloading.', x: 65, y: 50, imageView: 'front' },
    ],
    relatedEquipment: ['45-degree-leg-press', 'leg-extension', 'leg-curl'],
    featured: false,
  },

  /* --- S05: Hip Abduction ------------------------------------- */
  {
    id: 'eq-s05',
    slug: 'hip-abduction',
    name: 'Hip Abduction',
    category: 'Strength',
    shortDescription:
      'Specialized seated machine targeting the gluteus medius and tensor fasciae latae to enhance lateral hip strength and pelvic stability.',
    description:
      'The Hip Abduction machine strengthens the lateral hip musculature—specifically the gluteus medius, gluteus minimus, and tensor fasciae latae. These muscles are essential for stabilizing the pelvis during walking, running, and heavy bilateral squats.\n\nFeaturing pivoting thigh pads and a range-of-motion adjustment selector, users can customize the starting width to match individual hip mobility. Seated back support keeps the spine supported so resistance directly challenges hip abduction.',
    muscles: [
      { name: 'glute-med', label: 'Gluteus medius (outer hip)', isPrimary: true },
      { name: 'glute-min', label: 'Gluteus minimus', isPrimary: true },
      { name: 'tfl', label: 'Tensor fasciae latae (TFL)', isPrimary: false },
    ],
    benefits: [
      'Directly isolates outer glutes to eliminate hip drop and knee valgus in squats',
      'Improves balance, athletic lateral agility, and single-leg stability',
      'Adjustable starting angle accommodates all flexibility levels',
      'Pivoting pads maintain comfortable pressure along the outer knees and thighs',
    ],
    usageSteps: [
      { step: 1, instruction: 'Set starting width', detail: 'Pull the range pin to set the knee pads inward to your comfortable starting stretch.' },
      { step: 2, instruction: 'Sit back firmly', detail: 'Plant your lower back and glutes flat against the backrest.' },
      { step: 3, instruction: 'Position outer knees', detail: 'Rest the outside of your knees and thighs securely against the padded arms.' },
      { step: 4, instruction: 'Push outward', detail: 'Smoothly drive your knees outward against the resistance, opening your legs wide.' },
      { step: 5, instruction: 'Return under control', detail: 'Pause for 1 second at peak opening, then slowly allow pads to return inward.' },
    ],
    beginnerTip:
      'Keep your back against the pad rather than leaning forward. Leaning forward shifts the tension away from the gluteus medius and onto the hip flexors.',
    safetyNote:
      'Do not allow the weight stack to slam at the center between repetitions. Control both the outward drive and the inward return.',
    specifications: [
      { label: 'Equipment Type', value: 'Selectorized Hip Abduction Machine' },
      { label: 'Range Adjustment', value: 'Multi-hole indexing cam' },
      { label: 'Pivoting Pads', value: 'Self-aligning outer thigh pads' },
      { label: 'Weight Stack', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'ha-pads', label: 'Pivoting Outer Thigh Pads', description: 'Self-adjusting pads rest against the lateral knees for even pressure distribution.', x: 40, y: 52, imageView: 'front' },
      { id: 'ha-range', label: 'Range-of-Motion Pin', description: 'Allows users to adjust the starting knee width for comfort and flexibility.', x: 50, y: 62, imageView: 'front' },
      { id: 'ha-backrest', label: 'Supported Backrest', description: 'Maintains neutral pelvis and spine alignment throughout hip abduction.', x: 50, y: 40, imageView: 'front' },
      { id: 'ha-stack', label: 'Selectorized Weight Stack', description: 'Smooth pin-loaded weight stack with quick magnetic selection.', x: 68, y: 48, imageView: 'front' },
    ],
    relatedEquipment: ['45-degree-leg-press', 'pin-loaded-leg-press', 'leg-curl'],
    featured: false,
  },

  /* --- S06: Pin-Loaded Leg Press ------------------------------ */
  {
    id: 'eq-s06',
    slug: 'pin-loaded-leg-press',
    name: 'Pin-Loaded Leg Press',
    category: 'Strength',
    shortDescription:
      'Selectorized horizontal leg press providing fast weight stack adjustments, ideal for circuit training, high-volume reps, and joint safety.',
    description:
      'The Pin-Loaded Leg Press offers a user-friendly, selectorized alternative to heavy plate-loaded sleds. Operating on a horizontal or slight incline track, users can select their desired resistance simply by inserting a magnetic pin into the weight stack—no plate loading required.\n\nAn adjustable seat carriage accommodates varying leg lengths, ensuring that the knees can reach a 90-degree flexion angle without compromising pelvic alignment. It is ideal for warming up, drop-sets, and rapid strength progressions.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (front thighs)', isPrimary: true },
      { name: 'glutes', label: 'Gluteus maximus (glutes)', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings (back thighs)', isPrimary: false },
    ],
    benefits: [
      'Instant weight adjustments via selector pin—ideal for drop-sets and circuits',
      'Horizontal sled path reduces spinal shear forces',
      'Large footplate allows varied stance widths to emphasize quads or glutes',
      'Adjustable back angle optimizes hip flexion comfort',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust seat position', detail: 'Slide the seat so your knees bend to approximately 90° when feet are on the plate.' },
      { step: 2, instruction: 'Select stack pin', detail: 'Insert the magnetic weight pin into your target resistance plate.' },
      { step: 3, instruction: 'Place feet on plate', detail: 'Position feet shoulder-width apart in the center of the plate.' },
      { step: 4, instruction: 'Press sled away', detail: 'Grasp the side handles and press through your heels and mid-foot until legs are extended.' },
      { step: 5, instruction: 'Control return', detail: 'Slowly bend knees back to the start position without allowing weight stack to crash.' },
    ],
    beginnerTip:
      'Keep your heels firmly pressed into the footplate throughout the movement. Lifting your heels shifts excessive stress onto the patellar tendons.',
    safetyNote:
      'Never lock your knees out straight under load. Always stop just short of full lockout to keep the tension on the muscle fibers.',
    specifications: [
      { label: 'Equipment Type', value: 'Selectorized Horizontal Leg Press' },
      { label: 'Adjustment', value: 'Continuous seat carriage slide mechanism' },
      { label: 'Footplate', value: 'Wide angled non-slip steel platform' },
      { label: 'Stack Weight', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'plp-carriage', label: 'Sliding Seat Carriage', description: 'Smooth linear bearing track adjusts seat distance to fit different leg lengths.', x: 45, y: 55, imageView: 'front' },
      { id: 'plp-footplate', label: 'Articulating Footplate', description: 'Wide non-slip footplate supports wide, narrow, and staggered stance variations.', x: 65, y: 45, imageView: 'front' },
      { id: 'plp-lever', label: 'Seat Release Lever', description: 'Convenient handle lets you reposition the seat while remaining seated.', x: 30, y: 62, imageView: 'front' },
      { id: 'plp-stack', label: 'Selectorized Weight Stack', description: 'Precision-ground weight stack with incremental magnetic selector pin.', x: 20, y: 45, imageView: 'front' },
    ],
    relatedEquipment: ['45-degree-leg-press', 'leg-extension', 'calf-raise'],
    featured: false,
  },

  /* --- S07: Vertical Chest Press ------------------------------ */
  {
    id: 'eq-s07',
    slug: 'vertical-chest-press',
    name: 'Vertical Chest Press',
    category: 'Strength',
    shortDescription:
      'Upright selectorized chest press with converging movement arms that match natural pectoral contraction arcs for powerful upper-body strength.',
    description:
      'The Vertical Chest Press machine provides a biomechanically guided pressing motion that mirrors the converging contraction arc of the human chest muscles. By pressing from an upright seated position, users maintain stable spinal alignment against the backrest while driving handles forward.\n\nDual grip orientations—horizontal and neutral—allow you to target different areas of the pectorals while accommodating individual shoulder mobility. The selectorized pin-loaded stack makes resistance changes seamless between sets.',
    muscles: [
      { name: 'pectorals', label: 'Pectoralis Major (chest muscles)', isPrimary: true },
      { name: 'anterior-delts', label: 'Anterior Deltoids (front shoulders)', isPrimary: false },
      { name: 'triceps', label: 'Triceps Brachii (back of arms)', isPrimary: false },
    ],
    benefits: [
      'Converging pressing path matches natural pectoral contraction mechanics',
      'Dual grip options accommodate shoulder comfort and target varied chest fibers',
      'Upright seated position supports safe spinal posture with minimal lower-back arch',
      'Quick-adjust seat height aligns handles precisely with mid-chest level',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust seat height', detail: 'Raise or lower seat so the main handles align directly with your mid-chest line.' },
      { step: 2, instruction: 'Select weight', detail: 'Choose a weight you can push for 10–12 controlled repetitions.' },
      { step: 3, instruction: 'Position hands and back', detail: 'Plant feet flat, grip handles firmly, and press your shoulder blades firmly into backrest.' },
      { step: 4, instruction: 'Press forward', detail: 'Exhale and drive handles forward until arms are almost fully extended without locking elbows.' },
      { step: 5, instruction: 'Return with control', detail: 'Inhale and bring handles back slowly until you feel a comfortable pectoral stretch.' },
    ],
    beginnerTip:
      'Keep your shoulder blades retracted (pinched together) and down against the pad throughout the press to maximize chest engagement and protect the rotator cuff.',
    safetyNote:
      'Do not let elbows flare straight out at 90 degrees to the shoulders. Tuck elbows slightly inward to preserve shoulder joint health.',
    specifications: [
      { label: 'Equipment Type', value: 'Selectorized Converging Chest Press' },
      { label: 'Movement Path', value: 'Converging biomechanical arc' },
      { label: 'Grip Variations', value: 'Dual-position horizontal & neutral' },
      { label: 'Weight Stack', value: 'To be confirmed' },
    ],
    images: [
      { view: 'front', label: 'Front View', src: '/images/equipment/vertical-chest-press/front.webp', alt: 'Vertical Chest Press — Front View' },
      { view: 'side', label: 'Hero Angle', src: '/images/equipment/vertical-chest-press/hero.webp', alt: 'Vertical Chest Press — Hero View' },
    ],
    hotspots: [
      { id: 'vcp-handles', label: 'Ergonomic Dual Grips', description: 'Offers horizontal overhand grip and neutral vertical grip to suit shoulder biomechanics.', x: 35, y: 41, imageView: 'front' },
      { id: 'vcp-seat', label: 'Gas-Assist Seat Pin', description: 'Sets seat height so the handles align directly with the sternum and mid-chest.', x: 50, y: 68, imageView: 'front' },
      { id: 'vcp-backpad', label: 'Contoured Backrest', description: 'Supports spinal alignment and allows full scapular retraction during the press.', x: 50, y: 44, imageView: 'front' },
      { id: 'vcp-pivot', label: 'Converging Overhead Pivot', description: 'Engineered pivot arc brings handles slightly inward as you extend.', x: 50, y: 16, imageView: 'front' },
      { id: 'vcp-side-handles', label: 'Ergonomic Dual Grips', description: 'Dual grip options to match individual shoulder mobility.', x: 42, y: 42, imageView: 'side' },
      { id: 'vcp-side-seat', label: 'Seat Height Pin', description: 'Adjusts seat level so handles match mid-chest line.', x: 48, y: 65, imageView: 'side' },
      { id: 'vcp-side-backpad', label: 'Contoured Backrest', description: 'Maintains neutral spine support under heavy pressing.', x: 45, y: 46, imageView: 'side' },
      { id: 'vcp-side-stack', label: 'Selectorized Weight Stack', description: 'Pin-loaded magnetic stack for rapid load progression.', x: 30, y: 52, imageView: 'side' },
    ],
    relatedEquipment: ['pec-fly', 'cable-crossover', 'smith-machine'],
    featured: true,
  },

  /* --- S08: Pec Fly ------------------------------------------- */
  {
    id: 'eq-s08',
    slug: 'pec-fly',
    name: 'Pec Fly',
    category: 'Strength',
    shortDescription:
      'Dual-arm fly station delivering continuous tension across the chest through deep lateral stretch and peak sternal contraction.',
    description:
      'The Pec Fly machine isolates the pectoralis major through horizontal adduction of the arms. Unlike free weight dumbbell flyes, which lose tension at the top of the movement, the cam-driven cable mechanism maintains uniform mechanical tension from maximum stretch to full peak contraction.\n\nAdjustable starting range cams allow users to tailor the stretch depth to individual shoulder mobility, making it a safe and highly effective chest hypertrophy tool for all lifters.',
    muscles: [
      { name: 'pectoralis-major', label: 'Pectoralis Major (sternal and clavicular)', isPrimary: true },
      { name: 'anterior-delt', label: 'Anterior Deltoid (front shoulder)', isPrimary: false },
    ],
    benefits: [
      'Maintains peak tension at the top of the fly where dumbbells lose resistance',
      'Adjustable starting arm angle prevents over-stretching the anterior shoulder',
      'Articulating arm pads accommodate varied forearm lengths',
      'Directly targets inner and outer chest definition with minimal tricep involvement',
    ],
    usageSteps: [
      { step: 1, instruction: 'Set starting arm angle', detail: 'Pull the overhead pin to set the arms to a comfortable lateral stretch position.' },
      { step: 2, instruction: 'Adjust seat height', detail: 'Position seat so handles or elbow pads line up with your mid-chest.' },
      { step: 3, instruction: 'Establish arm position', detail: 'Keep a slight, rigid bend in your elbows and open your chest wide.' },
      { step: 4, instruction: 'Squeeze handles together', detail: 'Bring both handles together in a hugging motion until they touch in front of your chest.' },
      { step: 5, instruction: 'Control open stretch', detail: 'Slowly allow arms to open outward over 3 seconds until you feel a deep pectoral stretch.' },
    ],
    beginnerTip:
      'Imagine hugging a large tree trunk. Keep the bend in your elbows locked in place so the movement comes exclusively from the shoulder and chest joints.',
    safetyNote:
      'Do not set the starting arms too far backward behind your body line. Extreme backward stretch can overstrain the anterior shoulder capsule.',
    specifications: [
      { label: 'Equipment Type', value: 'Selectorized Pec Fly Machine' },
      { label: 'Range Limiter', value: 'Multi-stop overhead adjustment cam' },
      { label: 'Arm Design', value: 'Dual articulating independent handles' },
      { label: 'Weight Stack', value: 'To be confirmed' },
    ],
    images: [
      { view: 'front', label: 'Front View', src: '/images/equipment/pec-fly/front.webp', alt: 'Pec Fly Machine — Front View' },
      { view: 'side', label: 'Hero Angle', src: '/images/equipment/pec-fly/hero.webp', alt: 'Pec Fly Machine — Hero View' },
    ],
    hotspots: [
      { id: 'pf-handles', label: 'Articulating Arm Grips', description: 'Dual independent handles swivel to follow the natural arm path during the fly.', x: 35, y: 38, imageView: 'front' },
      { id: 'pf-overhead', label: 'Range-of-Motion Selector', description: 'Sets the starting lateral opening angle to protect shoulder flexibility.', x: 50, y: 18, imageView: 'front' },
      { id: 'pf-seat', label: 'Seat Height Adjuster', description: 'Aligns chest level with handle midpoint for optimal pectoral fiber recruitment.', x: 50, y: 66, imageView: 'front' },
      { id: 'pf-stack', label: 'Enclosed Weight Stack', description: 'Commercial weight stack with pin selector for quick micro-load progression.', x: 72, y: 55, imageView: 'front' },
      { id: 'pf-side-handles', label: 'Articulating Arm Grips', description: 'Swiveling handles provide seamless arm tracking.', x: 42, y: 38, imageView: 'side' },
      { id: 'pf-side-overhead', label: 'Overhead Cam Selector', description: 'Controls pre-stretch depth for safe shoulder articulation.', x: 52, y: 18, imageView: 'side' },
      { id: 'pf-side-seat', label: 'Seat Height Adjustment', description: 'Pneumatic assist seat pin locks firmly at desired height.', x: 48, y: 65, imageView: 'side' },
      { id: 'pf-side-stack', label: 'Enclosed Weight Stack', description: 'Heavy shrouded selectorized weight stack.', x: 65, y: 52, imageView: 'side' },
    ],
    relatedEquipment: ['vertical-chest-press', 'cable-crossover', 'pullover-machine'],
    featured: true,
  },

  /* --- S09: Pullover Machine ---------------------------------- */
  {
    id: 'eq-s09',
    slug: 'pullover-machine',
    name: 'Pullover Machine',
    category: 'Strength',
    shortDescription:
      'Iconic upper-body developer isolating the latissimus dorsi, serratus anterior, and ribcage without bicep or grip fatigue.',
    description:
      'The Pullover Machine is famously regarded as one of the ultimate upper-body mass builders. By driving through padded elbow rests rather than pulling with the hands, it completely bypasses the biceps and forearms, transferring 100% of the resistance directly onto the latissimus dorsi and serratus anterior.\n\nThe rotary cam delivers continuous tension throughout a huge 240-degree arc of motion. A foot-pedal assist lever lets users comfortably bring the heavy arm bar into starting position before beginning the set.',
    muscles: [
      { name: 'lats', label: 'Latissimus Dorsi (back width)', isPrimary: true },
      { name: 'serratus', label: 'Serratus Anterior (boxer’s muscle)', isPrimary: true },
      { name: 'pecs', label: 'Pectoralis Minor & Lower Chest', isPrimary: false },
      { name: 'triceps-long', label: 'Triceps Long Head', isPrimary: false },
    ],
    benefits: [
      'Isolates the lats without grip or bicep fatigue limiting set completion',
      'Provides a massive rotary range of motion from overhead stretch to hip flexion',
      'Strengthens the serratus anterior and expands ribcage mobility',
      'Foot-pedal starter lever makes entering and exiting heavy sets safe',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust seat height', detail: 'Set seat so the machine rotary axis aligns with your shoulder joints.' },
      { step: 2, instruction: 'Use foot-assist pedal', detail: 'Depress the foot pedal to bring the elbow bar forward into reach.' },
      { step: 3, instruction: 'Position elbows', detail: 'Rest your triceps/elbows firmly into the padded cradles and lightly hold the crossbar.' },
      { step: 4, instruction: 'Drive down to hips', detail: 'Release the foot pedal and drive elbows downward and forward until the bar reaches your lap.' },
      { step: 5, instruction: 'Return into stretch', detail: 'Allow the bar to rise back smoothly overhead to feel a deep stretch in the lats and ribcage.' },
    ],
    beginnerTip:
      'Focus on driving down with your elbows rather than pulling with your hands. Your hands should only lightly guide the bar while your elbows produce all the downward force.',
    safetyNote:
      'Always use the foot-assist starter pedal to enter and exit the movement. Pulling the bar down from a deep cold stretch without the pedal can strain shoulder ligaments.',
    specifications: [
      { label: 'Equipment Type', value: 'Rotary Cam Pullover Machine' },
      { label: 'Entry Mechanism', value: 'Foot-assist starter engagement pedal' },
      { label: 'Cam Profile', value: 'Full 240° continuous rotary cam' },
      { label: 'Weight Stack', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'po-elbows', label: 'Padded Elbow Cradles', description: 'Transfers resistance directly to the elbows, eliminating bicep and forearm failure.', x: 50, y: 28, imageView: 'front' },
      { id: 'po-pedal', label: 'Foot-Assist Starter Pedal', description: 'Depressing pedal brings the heavy overhead bar forward to safely begin the set.', x: 50, y: 78, imageView: 'front' },
      { id: 'po-seat', label: 'Vertical Seat Adjustment', description: 'Aligns the user’s shoulder axis of rotation with the machine’s central cam.', x: 50, y: 58, imageView: 'front' },
      { id: 'po-cam', label: 'Biomechanical Rotary Cam', description: 'Ensures even resistance throughout the huge arc from overhead to mid-torso.', x: 50, y: 36, imageView: 'front' },
    ],
    relatedEquipment: ['lat-pulldown', 'compound-row', 'pec-fly'],
    featured: false,
  },

  /* --- S10: Cable Crossover ----------------------------------- */
  {
    id: 'eq-s10',
    slug: 'cable-crossover',
    name: 'Cable Crossover',
    category: 'Strength',
    shortDescription:
      'Dual-tower adjustable cable station offering infinite resistance angles for chest flyes, arm curls, tricep extensions, and functional pulls.',
    description:
      'The Cable Crossover is the centerpiece of functional resistance training at Anytime Golden Fitness. Featuring two independent weight towers connected by high-tensile aircraft cables, each column incorporates a smooth sliding pulley carriage with multi-hole height indexing.\n\nFrom standing cable chest flyes and lateral raises to high-to-low woodchoppers and tricep pressdowns, the cable crossover provides constant fluid tension along any kinetic plane. A multi-grip pull-up crossbar connects the towers overhead.',
    muscles: [
      { name: 'pectorals', label: 'Pectoralis Major (flyes & presses)', isPrimary: true },
      { name: 'deltoids', label: 'Deltoids (lateral & front raises)', isPrimary: true },
      { name: 'arms', label: 'Biceps & Triceps', isPrimary: false },
      { name: 'core', label: 'Core stabilizers & obliques', isPrimary: false },
    ],
    benefits: [
      'Infinite movement angles with full-height adjustable pulley columns',
      'Dual independent weight stacks allow unilateral or bilateral training',
      'Integrated overhead multi-grip chin-up station',
      'Constant cable tension eliminates dead spots found in free-weight flyes',
    ],
    usageSteps: [
      { step: 1, instruction: 'Set pulley height', detail: 'Pull the carriage pin and slide each pulley to the desired height (high, mid, or low).' },
      { step: 2, instruction: 'Attach accessories', detail: 'Clip on D-handles, rope attachments, or straight bars with heavy carabiners.' },
      { step: 3, instruction: 'Select stack weights', detail: 'Set identical weights on both left and right stacks for bilateral exercises.' },
      { step: 4, instruction: 'Establish stable base', detail: 'Step forward into a staggered stance with knees slightly bent and core braced.' },
      { step: 5, instruction: 'Execute movement', detail: 'Draw handles through your chosen arc with smooth, controlled cadence.' },
    ],
    beginnerTip:
      'Use a staggered foot stance (one foot forward, one back) during standing chest flyes to prevent the weight stack from pulling your torso off balance.',
    safetyNote:
      'Verify that the sliding pulley lock pin is completely seated into a numbered hole before pulling on the cable.',
    specifications: [
      { label: 'Equipment Type', value: 'Dual Adjustable Cable Crossover System' },
      { label: 'Pulley Adjustment', value: 'Multi-hole vertical column indexing' },
      { label: 'Cables', value: 'Nylon-coated high-tensile aircraft cable' },
      { label: 'Weight Stacks', value: 'Dual independent stacks (To be confirmed)' },
    ],
    images: [],
    hotspots: [
      { id: 'cc-carriage', label: 'Adjustable Pulley Carriage', description: 'Slides along the full vertical height of the column to set high, mid, or low angles.', x: 25, y: 30, imageView: 'front' },
      { id: 'cc-cables', label: 'Aircraft Steel Cable', description: 'Smooth, flexible nylon-coated cable provides frictionless travel over deep pulleys.', x: 50, y: 45, imageView: 'front' },
      { id: 'cc-stacks', label: 'Dual Independent Stacks', description: 'Each side operates independently, allowing unilateral or bilateral exercises.', x: 20, y: 60, imageView: 'front' },
      { id: 'cc-chin', label: 'Multi-Grip Chin-Up Bar', description: 'Overhead crossmember with wide, narrow, and neutral grip handles.', x: 50, y: 12, imageView: 'front' },
    ],
    relatedEquipment: ['vertical-chest-press', 'pec-fly', 'smith-machine'],
    featured: false,
  },

  /* --- S11: Smith Machine ------------------------------------- */
  {
    id: 'eq-s11',
    slug: 'smith-machine',
    name: 'Smith Machine',
    category: 'Strength',
    shortDescription:
      'Guided barbell station with vertical linear bearings and safety lockout hooks, ideal for controlled squats, bench presses, and shoulder presses.',
    description:
      'The Smith Machine combines the compound strength-building power of barbell training with the security of a fixed linear guide track. The Olympic bar moves smoothly on precision case-hardened steel guide rods, eliminating side-to-side drift so you can focus entirely on vertical force production.\n\nRotating the bar locks safety hooks into laser-cut catch slots at any height. Adjustable bottom safety stop blocks guarantee that the bar will never descend below your set safety floor, providing solo lifters with absolute confidence.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (squats & lunges)', isPrimary: true },
      { name: 'pectorals', label: 'Pectoralis Major (bench presses)', isPrimary: true },
      { name: 'glutes', label: 'Gluteus maximus', isPrimary: false },
      { name: 'deltoids', label: 'Deltoids & Triceps', isPrimary: false },
    ],
    benefits: [
      'Fixed vertical bar track eliminates balancing demands for solo training',
      'Dual adjustable safety stop blocks protect lifters at bottom of reps',
      'Multiple catch pegs allow instant bar lockout with a simple wrist twist',
      'Integrated plate storage horns keep Olympic discs organized and accessible',
    ],
    usageSteps: [
      { step: 1, instruction: 'Set safety stops', detail: 'Position bottom safety stop blocks just below your lowest planned repetition depth.' },
      { step: 2, instruction: 'Load Olympic plates', detail: 'Slide weight plates onto bar ends and secure them firmly.' },
      { step: 3, instruction: 'Position yourself', detail: 'Step beneath the bar, grip with hands evenly spaced, and set your stance.' },
      { step: 4, instruction: 'Unhook bar', detail: 'Lift slightly and rotate your wrists to unhook the bar catches from the upright pegs.' },
      { step: 5, instruction: 'Execute and re-rack', detail: 'Perform reps with strict form; rotate wrists back at any moment to re-engage catches.' },
    ],
    beginnerTip:
      'Because the bar path is fixed vertically, position your feet slightly out in front of your hips during squats to maintain natural back alignment.',
    safetyNote:
      'Always set both bottom mechanical safety stop collars to equal heights before loading the bar. Never lift without them.',
    specifications: [
      { label: 'Equipment Type', value: 'Commercial Guided Barbell Smith Machine' },
      { label: 'Guide Rods', value: 'Precision case-hardened linear bearing rods' },
      { label: 'Starting Bar Weight', value: 'To be confirmed' },
      { label: 'Safety Stops', value: 'Dual multi-position adjustable safety catches' },
    ],
    images: [],
    hotspots: [
      { id: 'sm-bar', label: 'Guided Olympic Barbell', description: 'Knurled steel bar rotates on bearings to engage or disengage catch hooks at any point.', x: 50, y: 40, imageView: 'front' },
      { id: 'sm-stops', label: 'Mechanical Safety Blocks', description: 'Adjustable bottom stop collars catch the bar if a repetition cannot be finished.', x: 50, y: 65, imageView: 'front' },
      { id: 'sm-bearings', label: 'Linear Guide Bearings', description: 'Enclosed bearings glide smoothly along polished solid-steel upright rods.', x: 30, y: 40, imageView: 'front' },
      { id: 'sm-storage', label: 'Olympic Weight Horns', description: 'Rear frame horns store Olympic weight plates right at the station.', x: 20, y: 55, imageView: 'front' },
    ],
    relatedEquipment: ['squat-rack', '45-degree-leg-press', 'vertical-chest-press'],
    featured: false,
  },

  /* --- S12: Graviton Plus ------------------------------------- */
  {
    id: 'eq-s12',
    slug: 'graviton-plus',
    name: 'Graviton Plus',
    category: 'Strength',
    shortDescription:
      'Counterbalanced assisted pull-up and dip station enabling lifters of any strength level to master foundational bodyweight movements.',
    description:
      'The Graviton Plus is an assisted bodyweight training station engineered to make pull-ups, chin-ups, and dips accessible to everyone. By utilizing an inverse counterbalancing weight stack, the machine pushes upward against a padded kneeling platform, effectively subtracting weight from your body.\n\nAs you grow stronger, simply reduce the counterweight on the stack until you can perform unassisted pull-ups and dips with perfect form. The kneeling pad can also fold away completely for unassisted bodyweight sets.',
    muscles: [
      { name: 'lats', label: 'Latissimus Dorsi (pull-ups)', isPrimary: true },
      { name: 'pecs', label: 'Pectoralis Major (dips)', isPrimary: true },
      { name: 'triceps', label: 'Triceps Brachii (dips)', isPrimary: true },
      { name: 'biceps', label: 'Biceps & Forearms (chin-ups)', isPrimary: false },
    ],
    benefits: [
      'Allows beginners to master proper pull-up and dip mechanics safely',
      'Inverse counterweight stack subtracts weight to match individual strength',
      'Multi-grip pull-up handles include wide, narrow, and neutral orientations',
      'Foldaway kneeling platform allows quick transition to unassisted sets',
    ],
    usageSteps: [
      { step: 1, instruction: 'Select assistance weight', detail: 'Insert pin into stack—the heavier the weight selected, the more assistance you receive.' },
      { step: 2, instruction: 'Grip pull-up or dip handles', detail: 'Take a secure hold of your desired handles while standing on the steps.' },
      { step: 3, instruction: 'Place knees on platform', detail: 'Place one knee on the padded platform, lower down smoothly, then place the other knee.' },
      { step: 4, instruction: 'Perform exercise', detail: 'Lower your body under control, then pull up or press up until arms reach full contraction.' },
      { step: 5, instruction: 'Dismount with care', detail: 'Step one foot back onto the side footpeg, allow platform to rise slowly, and step off.' },
    ],
    beginnerTip:
      'Remember that counterweight works in reverse: selecting MORE weight makes the exercise EASIER; selecting LESS weight makes it HARDER.',
    safetyNote:
      'Always step off one foot at a time onto the footpegs and guide the kneeling pad to the top. Never let the pad slam up unloaded.',
    specifications: [
      { label: 'Equipment Type', value: 'Assisted Chin / Dip Station' },
      { label: 'Platform Type', value: 'Foldaway high-density kneeling platform' },
      { label: 'Assistance Mechanism', value: 'Inverse selectorized weight stack' },
      { label: 'Stack Weight', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'gp-platform', label: 'Foldaway Kneeling Pad', description: 'Counterbalanced platform supports knees; folds away for unassisted bodyweight sets.', x: 50, y: 58, imageView: 'front' },
      { id: 'gp-pullup', label: 'Multi-Grip Chin-Up Handles', description: 'Provides wide-grip, pronated, and neutral grip angles for lat development.', x: 50, y: 15, imageView: 'front' },
      { id: 'gp-dip', label: 'Dual-Width Dip Bars', description: 'Comfortable angled handles allow narrow or wide dip stances for chest and triceps.', x: 40, y: 42, imageView: 'front' },
      { id: 'gp-stack', label: 'Assistance Weight Stack', description: 'Pin-loaded stack counterbalances bodyweight for scalable progressive overload.', x: 68, y: 52, imageView: 'front' },
    ],
    relatedEquipment: ['lat-pulldown', 'cable-crossover', 'compound-row'],
    featured: false,
  },

  /* --- S13: Wrist Curl ---------------------------------------- */
  {
    id: 'eq-s13',
    slug: 'wrist-curl',
    name: 'Wrist Curl',
    category: 'Strength',
    shortDescription:
      'Dedicated forearm machine designed for wrist flexion and extension to develop crushing grip strength and thick forearm muscle mass.',
    description:
      'The Wrist Curl station provides direct, targeted overload for the flexors and extensors of the forearm. Strong forearms and resilient wrists are crucial for heavy deadlifts, pull-ups, pressing stability, and daily manual tasks.\n\nFeaturing an ergonomically padded forearm cradle, the machine firmly immobilizes the elbow and ulna so that movement occurs purely through the wrist joint. The dual-direction resistance handle accommodates both palm-up wrist curls and palm-down reverse curls.',
    muscles: [
      { name: 'forearm-flexors', label: 'Forearm Flexors (inner forearm)', isPrimary: true },
      { name: 'forearm-extensors', label: 'Forearm Extensors (outer forearm)', isPrimary: true },
      { name: 'brachioradialis', label: 'Brachioradialis & grip stabilizers', isPrimary: false },
    ],
    benefits: [
      'Direct forearm isolation without awkward bench balancing',
      'Immobilizes the forearms to eliminate cheating and bicep takeover',
      'Develops iron grip strength for deadlifts and pull-ups',
      'Supports wrist joint stability and protects against carpal strain',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust seat and arm rest', detail: 'Position your forearms flat against the horizontal support pad with wrists hanging over.' },
      { step: 2, instruction: 'Select light resistance', detail: 'Choose a modest weight—forearms respond best to higher, controlled repetitions.' },
      { step: 3, instruction: 'Grip rotating handle', detail: 'Hold the roller bar with an underhand grip (flexion) or overhand grip (extension).' },
      { step: 4, instruction: 'Curl wrists upward', detail: 'Curl your wrists upward as high as possible, squeezing the forearm muscles at the top.' },
      { step: 5, instruction: 'Lower slowly', detail: 'Lower the bar slowly into a full downward wrist stretch before beginning the next repetition.' },
    ],
    beginnerTip:
      'Do not go too heavy. The wrist is a delicate joint; focus on high-rep, strict contractions (15–20 reps) with controlled tempo.',
    safetyNote:
      'Keep your forearms glued to the pad. If your elbows lift off the pad, reduce the weight immediately.',
    specifications: [
      { label: 'Equipment Type', value: 'Specialized Forearm & Wrist Curl Station' },
      { label: 'Movement Types', value: 'Wrist flexion & wrist extension' },
      { label: 'Arm Cradle', value: 'High-density contoured support pad' },
      { label: 'Resistance Mechanism', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'wc-pad', label: 'Forearm Support Pad', description: 'Locks the forearms into place to prevent elbow lifting and bicep recruitment.', x: 50, y: 45, imageView: 'front' },
      { id: 'wc-handle', label: 'Rotating Grip Roller', description: 'Revolving bar turns smoothly in the hands through full wrist flexion and extension.', x: 50, y: 60, imageView: 'front' },
      { id: 'wc-seat', label: 'Seat Height Adjuster', description: 'Ensures torso is positioned at the correct angle over the forearm cradle.', x: 50, y: 75, imageView: 'front' },
      { id: 'wc-stack', label: 'Resistance Assembly', description: 'Provides smooth, incremental resistance tailored to wrist joint capacity.', x: 65, y: 55, imageView: 'front' },
    ],
    relatedEquipment: ['dumbbells', 'preacher-curl-bench', 'preacher-curl-machine'],
    featured: false,
  },

  /* ============================================================
     3. FREE WEIGHT (7 entries)
     ============================================================ */

  /* --- F01: Lat Pulldown -------------------------------------- */
  {
    id: 'eq-f01',
    slug: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Free Weight',
    shortDescription:
      'Classic vertical pulling station designed to build a wide V-taper back with smooth overhead cable resistance and adjustable thigh rollers.',
    description:
      'The Lat Pulldown is the premier upper-back builder for developing back width and a strong V-taper physique. Moving smoothly via an overhead cable and low-friction pulleys, it allows you to simulate vertical pull-up mechanics while selecting exact resistance increments.\n\nAdjustable cushioned thigh rollers lock your lower body firmly to the seat, preventing heavy weight stacks from lifting you off the bench. Multiple interchangeable cable attachments—wide knurled bars, close-grip triangles, and neutral handles—let you emphasize different regions of the latissimus dorsi.',
    muscles: [
      { name: 'lats', label: 'Latissimus Dorsi (back width)', isPrimary: true },
      { name: 'biceps', label: 'Biceps Brachii', isPrimary: false },
      { name: 'rhomboids', label: 'Rhomboids & Mid Trapezius', isPrimary: false },
      { name: 'rear-delts', label: 'Posterior Deltoids', isPrimary: false },
    ],
    benefits: [
      'Builds upper-back width and creates the classic athletic V-taper silhouette',
      'Adjustable thigh roller pads securely anchor your pelvis during heavy pulls',
      'Interchangeable carabiner accepts wide bars, V-bars, and parallel grips',
      'Smooth overhead cable eliminates momentum and joint jarring',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust thigh rollers', detail: 'Set thigh pads so your thighs fit snugly beneath with feet flat on the floor.' },
      { step: 2, instruction: 'Grip the bar', detail: 'Stand up and grasp the wide bar with an overhand grip slightly wider than shoulder width.' },
      { step: 3, instruction: 'Sit and lock in', detail: 'Sit down, slide thighs under the pads, and lift your chest with a slight 10° backward lean.' },
      { step: 4, instruction: 'Pull to upper chest', detail: 'Drive elbows down and back toward your ribs, pulling the bar smoothly to your clavicle.' },
      { step: 5, instruction: 'Extend fully upward', detail: 'Control the bar upward over 2–3 seconds until your arms and lats are fully stretched.' },
    ],
    beginnerTip:
      'Pull with your elbows, not your hands. Focus on driving your elbows down toward your back pockets to activate your lats rather than your biceps.',
    safetyNote:
      'Always pull the bar down to the front of your chest. Never pull the bar behind your neck, which places excessive stress on the cervical spine and rotator cuff.',
    specifications: [
      { label: 'Equipment Type', value: 'High-Cable Lat Pulldown Station' },
      { label: 'Cable System', value: 'Aircraft-grade nylon-coated steel cable' },
      { label: 'Thigh Hold-Down', value: 'Multi-stop pull-pin adjustable foam rollers' },
      { label: 'Weight Stack', value: 'To be confirmed' },
    ],
    images: [
      { view: 'front', label: 'Front View', src: '/images/equipment/lat-pulldown/front.webp', alt: 'Lat Pulldown Machine — Front View' },
      { view: 'side', label: 'Hero Angle', src: '/images/equipment/lat-pulldown/hero.webp', alt: 'Lat Pulldown Machine — Hero View' },
    ],
    hotspots: [
      { id: 'lp-bar', label: 'Revolving Wide-Grip Bar', description: 'Ergonomically angled knurled bar swivels smoothly on a central carabiner ring.', x: 50, y: 18, imageView: 'front' },
      { id: 'lp-thigh', label: 'Adjustable Thigh Rollers', description: 'Lock your thighs down securely so heavy weights do not lift you off the seat.', x: 50, y: 52, imageView: 'front' },
      { id: 'lp-cable', label: 'Aircraft Steel Cable', description: 'Nylon-coated cable glides over sealed-bearing pulleys for smooth vertical travel.', x: 50, y: 30, imageView: 'front' },
      { id: 'lp-stack', label: 'Selectorized Weight Stack', description: 'Precision weight stack with magnetic selector pin for micro-load progression.', x: 68, y: 55, imageView: 'front' },
      { id: 'lp-side-bar', label: 'Revolving Lat Bar', description: 'High-strength steel bar provides wide and narrow grip options.', x: 48, y: 16, imageView: 'side' },
      { id: 'lp-side-thigh', label: 'Adjustable Thigh Pad', description: 'Prevents vertical lift during heavy working sets.', x: 52, y: 50, imageView: 'side' },
      { id: 'lp-side-stack', label: 'Precision Weight Stack', description: 'Selector pin adjusts resistance in exact increments.', x: 70, y: 52, imageView: 'side' },
    ],
    relatedEquipment: ['compound-row', 'graviton-plus', 'pullover-machine'],
    featured: true,
  },

  /* --- F02: Compound Row -------------------------------------- */
  {
    id: 'eq-f02',
    slug: 'compound-row',
    name: 'Compound Row',
    category: 'Free Weight',
    shortDescription:
      'Seated horizontal rowing station targeting mid-back thickness, rhomboids, and lower lats with chest-supported spinal stability.',
    description:
      'The Compound Row is designed to forge dense mid-back thickness and postural strength. By pulling horizontally against resistance, the movement heavily engages the rhomboids, middle and lower trapezius, latissimus dorsi, and posterior deltoids.\n\nFeaturing an adjustable chest support pad and elevated foot braces, the station immobilizes the lower back, preventing unwanted momentum and allowing you to load the mid-back with maximum safety and isolation.',
    muscles: [
      { name: 'rhomboids', label: 'Rhomboids & Mid Trapezius (back thickness)', isPrimary: true },
      { name: 'lats', label: 'Latissimus Dorsi', isPrimary: true },
      { name: 'rear-delts', label: 'Posterior Deltoids (rear shoulders)', isPrimary: false },
      { name: 'biceps', label: 'Biceps Brachii & Forearms', isPrimary: false },
    ],
    benefits: [
      'Builds dense mid-back thickness and corrects rounded-shoulder posture',
      'Chest-supported pad eliminates lower-back sway and spinal fatigue',
      'Dual grip handles allow horizontal overhand or vertical neutral rowing',
      'Heavy-duty foot braces provide a solid base for heavy horizontal pulling',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust chest pad depth', detail: 'Set chest pad so your arms can reach the handles with a full forward stretch.' },
      { step: 2, instruction: 'Brace your feet', detail: 'Place feet firmly on the steel foot plates with knees comfortably bent.' },
      { step: 3, instruction: 'Grip the handles', detail: 'Grasp handles with either a neutral or overhand grip and sit tall with chest braced.' },
      { step: 4, instruction: 'Row backward', detail: 'Exhale and pull your elbows back past your torso, squeezing your shoulder blades together.' },
      { step: 5, instruction: 'Return to full stretch', detail: 'Slowly extend arms forward over 2–3 seconds to feel a deep stretch across the mid-back.' },
    ],
    beginnerTip:
      'Do not lean back away from the chest pad as you pull. Keep your sternum in constant contact with the pad to ensure the mid-back does the work.',
    safetyNote:
      'Avoid jerking the weight with your lower back. Maintain a stationary torso and let your scapulae and arms drive the row.',
    specifications: [
      { label: 'Equipment Type', value: 'Chest-Supported Seated Compound Row' },
      { label: 'Chest Pad', value: 'Multi-position horizontal depth adjust' },
      { label: 'Grip Configurations', value: 'Pronated wide and neutral close handles' },
      { label: 'Resistance Mechanism', value: 'To be confirmed' },
    ],
    images: [
      { view: 'front', label: 'Front View', src: '/images/equipment/compound-row/front.webp', alt: 'Compound Row Machine — Front View' },
      { view: 'side', label: 'Hero Angle', src: '/images/equipment/compound-row/hero.webp', alt: 'Compound Row Machine — Hero View' },
    ],
    hotspots: [
      { id: 'cr-grips', label: 'Multi-Position Row Grips', description: 'Offers horizontal and neutral handle angles for targeted back recruitment.', x: 42, y: 45, imageView: 'front' },
      { id: 'cr-chestpad', label: 'Adjustable Chest Support Pad', description: 'Prevents spinal hyperextension and anchors the torso during heavy pulls.', x: 50, y: 48, imageView: 'front' },
      { id: 'cr-footbraces', label: 'Heavy-Duty Foot Braces', description: 'Textured steel foot plates give a secure anchor point for full leg drive.', x: 50, y: 76, imageView: 'front' },
      { id: 'cr-pulley', label: 'Low-Friction Bearing Pulley', description: 'Ensures a smooth, uniform resistance curve throughout the rowing stroke.', x: 50, y: 30, imageView: 'front' },
      { id: 'cr-side-grips', label: 'Multi-Position Row Handles', description: 'Allows wide or close-grip rowing biomechanics.', x: 45, y: 42, imageView: 'side' },
      { id: 'cr-side-chestpad', label: 'Contoured Chest Support', description: 'High-density pad eliminates lumbar spine fatigue.', x: 48, y: 46, imageView: 'side' },
      { id: 'cr-side-footbraces', label: 'Textured Steel Foot Braces', description: 'Provides firm heel drive during maximum pull efforts.', x: 52, y: 74, imageView: 'side' },
    ],
    relatedEquipment: ['lat-pulldown', 'dumbbells', 'preacher-curl-bench'],
    featured: true,
  },

  /* --- F03: Squat Rack ---------------------------------------- */
  {
    id: 'eq-f03',
    slug: 'squat-rack',
    name: 'Squat Rack',
    category: 'Free Weight',
    shortDescription:
      'Commercial heavy-duty power cage with laser-cut J-hooks, reinforced safety spotter arms, and multi-grip chin-up crossmembers.',
    description:
      'The Squat Rack is the ultimate bedrock of athletic strength training at Anytime Golden Fitness. Built from heavy-gauge structural steel tubing, it provides a safe, solid environment for executing compound barbell lifts including back squats, front squats, overhead presses, barbell shrugs, and lunges.\n\nLaser-cut upright holes with precision numbering allow rapid adjustment of J-hooks and heavy-gauge safety spotter arms. Whether you are attempting a new personal record or performing volume squats, the safety spotter arms protect you completely without requiring a human spotter.',
    muscles: [
      { name: 'quadriceps', label: 'Quadriceps (front thighs)', isPrimary: true },
      { name: 'glutes', label: 'Gluteus maximus (glutes)', isPrimary: true },
      { name: 'hamstrings', label: 'Hamstrings & Adductors', isPrimary: false },
      { name: 'erectors', label: 'Spinal Erectors & Core', isPrimary: true },
    ],
    benefits: [
      'Heavy-gauge commercial steel construction supports maximum barbell loads',
      'Reinforced safety spotter arms protect lifters during failed reps',
      'Laser-cut numbered uprights allow fast, symmetrical J-hook positioning',
      'Integrated pull-up crossmembers and weight plate storage pins',
    ],
    usageSteps: [
      { step: 1, instruction: 'Set J-hook height', detail: 'Position J-hooks at mid-chest height so you can unrack without going onto your toes.' },
      { step: 2, instruction: 'Set safety spotter arms', detail: 'Adjust spotter arms just below your lowest squat depth (below thighs parallel).' },
      { step: 3, instruction: 'Load Olympic barbell', detail: 'Place bar in J-hooks, load plates equally on both sides, and fasten spring collars.' },
      { step: 4, instruction: 'Step under and unrack', detail: 'Position bar across upper traps, brace core, stand up to unrack, and take 2 steps back.' },
      { step: 5, instruction: 'Squat and re-rack', detail: 'Squat with hips back and knees tracking toes; walk forward into uprights to re-rack.' },
    ],
    beginnerTip:
      'Never skip the safety spotter arms. Test your squat depth with an empty bar first to ensure the spotter arms are at the right height to catch the bar if you get stuck.',
    safetyNote:
      'Always clamp weight plates with barbell collars before lifting. Unsecured plates can slide during heavy reps, causing dangerous weight imbalance.',
    specifications: [
      { label: 'Equipment Type', value: 'Commercial Power Cage / Squat Rack' },
      { label: 'Steel Gauge', value: 'Heavy structural commercial tubing' },
      { label: 'Safety Spotter Arms', value: 'Reinforced dual steel spotter bars' },
      { label: 'Weight Capacity', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'sr-jhooks', label: 'Laser-Cut J-Hooks', description: 'Urethane-lined J-hooks protect barbell knurling and hold heavy loaded bars securely.', x: 35, y: 40, imageView: 'front' },
      { id: 'sr-spotters', label: 'Heavy Safety Spotter Arms', description: 'Catches the barbell securely if a rep cannot be completed, ensuring solo lifter safety.', x: 35, y: 62, imageView: 'front' },
      { id: 'sr-pullup', label: 'Multi-Grip Pull-Up Bar', description: 'Overhead crossmember with knurled grips for wide, close, and neutral pull-ups.', x: 50, y: 10, imageView: 'front' },
      { id: 'sr-horns', label: 'Integrated Plate Storage', description: 'Heavy storage pegs keep Olympic weight plates organized and easily accessible.', x: 22, y: 65, imageView: 'front' },
    ],
    relatedEquipment: ['smith-machine', '45-degree-leg-press', 'overhead-press'],
    featured: false,
  },

  /* --- F04: Overhead Press ------------------------------------ */
  {
    id: 'eq-f04',
    slug: 'overhead-press',
    name: 'Overhead Press',
    category: 'Free Weight',
    shortDescription:
      'Dedicated seated military shoulder press station with multi-tier bar catches, ergonomic backrest, and integrated spotter platform.',
    description:
      'The Overhead Press station is engineered for heavy, strict barbell shoulder pressing. Featuring an upright backrest angled at approximately 80 to 85 degrees, it supports the spine while keeping anterior deltoids and triceps in direct line with the vertical pressing vector.\n\nDual-tier bar racking hooks allow lifters of all arm lengths to unrack comfortably without over-stretching the shoulders. An integrated diamond-plate spotter stand behind the seat allows a training partner or trainer to assist safely with unracking and forced reps.',
    muscles: [
      { name: 'anterior-delts', label: 'Anterior Deltoids (front shoulders)', isPrimary: true },
      { name: 'lateral-delts', label: 'Lateral Deltoids (side shoulders)', isPrimary: true },
      { name: 'triceps', label: 'Triceps Brachii', isPrimary: false },
      { name: 'upper-chest', label: 'Upper Pectorals (clavicular head)', isPrimary: false },
    ],
    benefits: [
      'Near-vertical backrest isolates the shoulders without lumbar hyperextension',
      'Dual-tier bar catches provide comfortable unracking for different arm reaches',
      'Diamond-plate spotter platform gives trainers a stable base to assist',
      'Builds foundational overhead pressing power and boulder shoulders',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust seat height', detail: 'Set seat so the barbell rests on the racking hooks at eye-to-chin level.' },
      { step: 2, instruction: 'Sit back firmly', detail: 'Plant feet flat, engage glutes, and brace your upper back against the upright pad.' },
      { step: 3, instruction: 'Grip the barbell', detail: 'Take an overhand grip slightly wider than shoulder width with wrists stacked over elbows.' },
      { step: 4, instruction: 'Unrack and press overhead', detail: 'Lift bar off hooks, bring it to upper chest level, then press vertically overhead.' },
      { step: 5, instruction: 'Lower and re-rack', detail: 'Lower bar with control to chin level before driving back up; walk bar into hooks to re-rack.' },
    ],
    beginnerTip:
      'Keep your core braced tightly and resist arching your lower back away from the pad to prevent turning the shoulder press into an incline chest press.',
    safetyNote:
      'Never press directly behind the neck on this station. Always lower the bar in front of your face to protect the rotator cuff.',
    specifications: [
      { label: 'Equipment Type', value: 'Olympic Seated Overhead Press Station' },
      { label: 'Backrest Angle', value: '80°–85° near-vertical shoulder support' },
      { label: 'Spotter Stand', value: 'Heavy-gauge diamond-plate elevated platform' },
      { label: 'Racking Tiers', value: 'Dual-height welded barbell catch hooks' },
    ],
    images: [],
    hotspots: [
      { id: 'op-hooks', label: 'Dual-Tier Bar Catches', description: 'Positioned at two heights for safe, effortless racking and unracking.', x: 50, y: 35, imageView: 'front' },
      { id: 'op-backrest', label: 'Ergonomic Upright Backrest', description: 'Supports the spine in an upright pressing posture to isolate deltoid heads.', x: 50, y: 55, imageView: 'front' },
      { id: 'op-spotter', label: 'Elevated Spotter Platform', description: 'Non-slip steel platform provides elevated leverage for a partner to assist.', x: 50, y: 22, imageView: 'front' },
      { id: 'op-seat', label: 'Adjustable Seat Cushion', description: 'Quick-release pin sets seat height to match user torso length.', x: 50, y: 72, imageView: 'front' },
    ],
    relatedEquipment: ['dumbbells', 'smith-machine', 'squat-rack'],
    featured: false,
  },

  /* --- F05: Preacher Curl Bench ------------------------------- */
  {
    id: 'eq-f05',
    slug: 'preacher-curl-bench',
    name: 'Preacher Curl Bench',
    category: 'Free Weight',
    shortDescription:
      'Angled arm-support bench immobilizing the upper arms to deliver complete bicep isolation with EZ-bars or dumbbells.',
    description:
      'The Preacher Curl Bench is designed to eliminate momentum and body sway during arm curling movements. By anchoring your triceps and upper arms against a dense, angled pad (typically 45–55 degrees), the shoulder joint is completely immobilized, preventing shoulder flexion from assisting the lift.\n\nThis isolates the biceps brachii—particularly the short inner head—and the brachialis muscle beneath it, forcing the biceps to pull the entire load from full extension to peak contraction. Integrated bar cradles allow safe resting of EZ-curl or straight barbells.',
    muscles: [
      { name: 'biceps', label: 'Biceps Brachii (short and long heads)', isPrimary: true },
      { name: 'brachialis', label: 'Brachialis (arm thickness)', isPrimary: true },
      { name: 'brachioradialis', label: 'Brachioradialis (forearms)', isPrimary: false },
    ],
    benefits: [
      'Eliminates back sway and shoulder cheating for pure bicep isolation',
      'Emphasizes the lower portion and peak of the bicep contraction',
      'Protective urethane-lined bar cradles protect knurled barbells',
      'Adjustable seat height accommodates all torso lengths comfortably',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust seat height', detail: 'Set seat so the top of the angled pad sits comfortably under your armpits.' },
      { step: 2, instruction: 'Position triceps', detail: 'Rest the backs of your upper arms flat against the pad with chest lightly against the rim.' },
      { step: 3, instruction: 'Grip the barbell', detail: 'Grasp an EZ-curl bar or dumbbells with an underhand grip.' },
      { step: 4, instruction: 'Curl upward', detail: 'Flex your elbows and curl the bar toward your chin, pausing for a peak contraction.' },
      { step: 5, instruction: 'Lower slowly', detail: 'Lower the bar under strict control, stopping just before elbows completely lock straight.' },
    ],
    beginnerTip:
      'Do not aggressively snap or hyperextend your elbows at the bottom of the curl. Keep a soft micro-bend in the elbows at full stretch to protect the bicep tendon.',
    safetyNote:
      'Start with a lighter weight than normal standing curls. The preacher bench eliminates body english, making the movement significantly harder.',
    specifications: [
      { label: 'Equipment Type', value: 'Olympic Preacher Curl Bench' },
      { label: 'Pad Angle', value: '45°–55° biomechanical arm support' },
      { label: 'Bar Cradles', value: 'Heavy-duty urethane-lined gunrack catches' },
      { label: 'Frame', value: 'Commercial heavy-gauge steel' },
    ],
    images: [],
    hotspots: [
      { id: 'pcb-pad', label: 'Angled Arm Support Pad', description: 'High-density contoured pad immobilizes upper arms to eliminate cheating.', x: 50, y: 42, imageView: 'front' },
      { id: 'pcb-cradles', label: 'Barbell Rest Racks', description: 'Urethane-lined catches safely hold loaded EZ-bars between working sets.', x: 50, y: 58, imageView: 'front' },
      { id: 'pcb-seat', label: 'Quick-Release Seat Adjuster', description: 'Sets seat height so the armpit sits flush against the top of the pad.', x: 50, y: 72, imageView: 'front' },
      { id: 'pcb-feet', label: 'Heavy Rubber Feet', description: 'Absorbs vibration and prevents frame movement during intense sets.', x: 50, y: 88, imageView: 'front' },
    ],
    relatedEquipment: ['preacher-curl-machine', 'dumbbells', 'wrist-curl'],
    featured: false,
  },

  /* --- F06: Preacher Curl Machine ----------------------------- */
  {
    id: 'eq-f06',
    slug: 'preacher-curl-machine',
    name: 'Preacher Curl Machine',
    category: 'Free Weight',
    shortDescription:
      'Cam-driven selectorized bicep station delivering smooth variable resistance matching the strength curve from bottom to peak curl.',
    description:
      'The Preacher Curl Machine combines the strict arm isolation of a preacher bench with the uniform tension profile of a selectorized cam system. In standard barbell preacher curls, tension drops off sharply at the top of the movement; this machine uses a precision-engineered cam to maintain peak resistance throughout the entire range.\n\nRevolving multi-angle handles self-align with your wrists during the curl, preventing wrist strain. With pin-loaded weight selection, drop-sets and incremental overload are effortless.',
    muscles: [
      { name: 'biceps', label: 'Biceps Brachii (peak and fullness)', isPrimary: true },
      { name: 'brachialis', label: 'Brachialis', isPrimary: true },
      { name: 'forearms', label: 'Forearm flexors', isPrimary: false },
    ],
    benefits: [
      'Variable-resistance cam maintains peak bicep tension even at top lockout',
      'Revolving self-aligning handles eliminate wrist joint twisting',
      'Quick pin-loaded weight stack enables rapid drop-sets',
      'Strict preacher pad locks triceps in place for total isolation',
    ],
    usageSteps: [
      { step: 1, instruction: 'Adjust seat height', detail: 'Position seat so your armpits rest comfortably over the top edge of the pad.' },
      { step: 2, instruction: 'Select stack weight', detail: 'Insert weight pin for an isolated set of 10–12 strict repetitions.' },
      { step: 3, instruction: 'Grip rotating handles', detail: 'Rest triceps flat against the pad and take hold of the revolving handles.' },
      { step: 4, instruction: 'Curl toward shoulders', detail: 'Smoothly pull the handles upward toward your chin, squeezing your biceps tightly at the top.' },
      { step: 5, instruction: 'Control descent', detail: 'Lower the weight slowly over 3 seconds until arms are nearly straight before initiating the next rep.' },
    ],
    beginnerTip:
      'Keep your wrists neutral or slightly curled forward. Do not let your wrists bend backward under load, which puts excessive pressure on the wrist tendons.',
    safetyNote:
      'Maintain continuous contact between your upper arms and the pad. If your elbows lift off, reduce the weight immediately.',
    specifications: [
      { label: 'Equipment Type', value: 'Selectorized Preacher Curl Machine' },
      { label: 'Cam Profile', value: 'Torque-matched biomechanical bicep cam' },
      { label: 'Handle Design', value: 'Independent rotating swivel handles' },
      { label: 'Weight Stack', value: 'To be confirmed' },
    ],
    images: [],
    hotspots: [
      { id: 'pcm-handles', label: 'Revolving Swivel Handles', description: 'Self-aligning handles rotate freely to accommodate natural wrist angles.', x: 50, y: 40, imageView: 'front' },
      { id: 'pcm-pad', label: 'Biomechanical Arm Pad', description: 'Angled foam pad supports triceps and eliminates shoulder involvement.', x: 50, y: 48, imageView: 'front' },
      { id: 'pcm-cam', label: 'Variable Resistance Cam', description: 'Delivers balanced resistance that matches the muscle’s strength curve throughout.', x: 58, y: 42, imageView: 'front' },
      { id: 'pcm-stack', label: 'Selectorized Weight Stack', description: 'Pin-loaded stack allows instant resistance changes between sets.', x: 68, y: 55, imageView: 'front' },
    ],
    relatedEquipment: ['preacher-curl-bench', 'dumbbells', 'wrist-curl'],
    featured: false,
  },

  /* --- F07: Dumbbells ----------------------------------------- */
  {
    id: 'eq-f07',
    slug: 'dumbbells',
    name: 'Dumbbells',
    category: 'Free Weight',
    shortDescription:
      'Comprehensive dumbbell inventory spanning 2.5 lb to 80 lb on tiered heavy-duty racks, supporting unilateral balance and full-body hypertrophy.',
    description:
      'The Dumbbell collection at Anytime Golden Fitness is the most versatile strength training asset on the gym floor. Spanning a complete weight range from 2.5 lb up to 80 lb in progressive increments, it accommodates everything from delicate rotator cuff rehabilitation to heavy unilateral dumbbell presses, rows, and lunges.\n\nFeaturing ergonomic knurled steel handles and durable rubber-encased heads, these dumbbells protect gym flooring and reduce noise while providing maximum grip security. Stored across angled multi-tier saddle racks, every pair is easily accessible and clearly labeled.',
    muscles: [
      { name: 'full-body', label: 'Full Body (Chest, Shoulders, Back, Arms, Legs, Core)', isPrimary: true },
      { name: 'stabilizers', label: 'Stabilizing & Core Musculature', isPrimary: true },
    ],
    benefits: [
      'Comprehensive weight spectrum from 2.5 lb to 80 lb for all fitness levels',
      'Unilateral training corrects side-to-side muscular imbalances',
      'Allows natural wrist rotation during presses, curls, and lateral raises',
      'Rubber-encased heads protect equipment and floor surfaces',
    ],
    usageSteps: [
      { step: 1, instruction: 'Select appropriate pair', detail: 'Choose a matching pair of dumbbells from the clearly labeled rack shelves.' },
      { step: 2, instruction: 'Lift with your legs', detail: 'Squat down to lift the weights off the rack rather than rounding your lower back.' },
      { step: 3, instruction: 'Assume starting stance', detail: 'Establish a stable, balanced base whether standing or seated on an adjustable bench.' },
      { step: 4, instruction: 'Execute with control', detail: 'Move the dumbbells through your desired movement plane with strict, deliberate form.' },
      { step: 5, instruction: 'Return to rack', detail: 'Carefully return both dumbbells to their designated numbered rack slots after finishing your set.' },
    ],
    beginnerTip:
      'Master the movement pattern with lighter dumbbells first. Dumbbells require significant stabilization from smaller supporting muscles compared to fixed machines.',
    safetyNote:
      'Never drop dumbbells onto the gym floor or bench from standing height. Always lower them under control to your knees or place them on the floor.',
    specifications: [
      { label: 'Weight Spectrum', value: '2.5 lb to 80 lb in progressive increments' },
      { label: 'Head Construction', value: 'Heavy-duty rubber-encased steel heads' },
      { label: 'Handle Design', value: 'Ergonomic contoured knurled chrome grip' },
      { label: 'Storage', value: 'Heavy-duty 3-tier angled saddle rack' },
    ],
    images: [],
    hotspots: [
      { id: 'db-handles', label: 'Contoured Knurled Grips', description: 'Diamond knurling provides maximum grip security even during high-rep sweat sessions.', x: 50, y: 50, imageView: 'front' },
      { id: 'db-heads', label: 'Rubber-Encased Heads', description: 'Protects floor surfaces, deadens impact noise, and prevents plate chipping.', x: 35, y: 50, imageView: 'front' },
      { id: 'db-rack', label: 'Tiered Heavy-Duty Storage', description: 'Angled individual saddles keep all pairs from 2.5 lb to 80 lb organized and accessible.', x: 50, y: 75, imageView: 'front' },
      { id: 'db-labels', label: 'Clear Weight Markings', description: 'High-contrast weight indicators on both ends allow instant weight identification.', x: 65, y: 50, imageView: 'front' },
    ],
    relatedEquipment: ['squat-rack', 'overhead-press', 'preacher-curl-bench', 'compound-row'],
    featured: true,
  },
];
