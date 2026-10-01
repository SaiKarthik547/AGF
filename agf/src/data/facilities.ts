/**
 * AGF — Facilities Data
 *
 * ⚠️  PLACEHOLDER DATA
 * These facility descriptions are provisional.
 * Replace with confirmed AGF facility information after client approval.
 */

import type { Facility } from '@/types';

export const FACILITIES: Facility[] = [
  {
    id: 'strength-zone',
    name: 'Strength Zone',
    description:
      'The Strength Zone houses AGF\'s full range of strength machines and free weights. Whether you are working through a structured programme or exploring different exercises, the Strength Zone gives you everything you need to build muscle, improve posture, and develop real functional strength.',
    features: [
      'Full range of selectorized strength machines',
      'Free weight area with dumbbells and barbells',
      'Ample space to move and train comfortably',
      'Equipment organised by muscle group for easy navigation',
    ],
    image: '/images/facilities/strength-zone.webp',
    imageAlt: 'AGF Strength Zone — rows of strength machines',
    imagePosition: 'right',
  },
  {
    id: 'cardio-zone',
    name: 'Cardio Zone',
    description:
      'The Cardio Zone is where you improve your cardiovascular fitness, endurance, and burn calories in a comfortable, well-ventilated space. AGF\'s cardio equipment covers all the major categories, from treadmills to stationary bikes, so you can choose the style of cardio that works best for you.',
    features: [
      'Commercial-grade treadmills',
      'Stationary cycles and upright bikes',
      'Cross-trainers and elliptical machines',
      'Built-in display tracking on all cardio equipment',
    ],
    image: '/images/facilities/cardio-zone.webp',
    imageAlt: 'AGF Cardio Zone — rows of treadmills and cardio machines',
    imagePosition: 'left',
  },
  {
    id: 'free-weights',
    name: 'Free Weights Area',
    description:
      'The Free Weights Area provides access to dumbbells, barbells, and benches for compound and isolation exercises. Free weight training offers the greatest range of movement and muscle activation, making it valuable for intermediate and advanced gym users — as well as beginners learning foundational exercises.',
    features: [
      'Full dumbbell rack from light to heavy',
      'Adjustable benches for pressing and incline work',
      'Barbell stations with collars and clips',
      'Dedicated floor space for safe movement',
    ],
    image: '/images/facilities/free-weights.webp',
    imageAlt: 'AGF Free Weights Area — dumbbells and barbells',
    imagePosition: 'right',
  },
  {
    id: 'functional-area',
    name: 'Functional Training Area',
    description:
      'The Functional Training Area is designed for dynamic, varied exercise. Featuring functional trainers, resistance bands, medicine balls, and open floor space, this area supports training that goes beyond machines — building the kind of strength and movement quality that carries over into sport and everyday life.',
    features: [
      'Functional trainer cable stations',
      'Open floor space for bodyweight and movement work',
      'Resistance bands and suspension equipment',
      'Medicine balls and functional accessories',
    ],
    image: '/images/facilities/functional-area.webp',
    imageAlt: 'AGF Functional Training Area — open space with functional equipment',
    imagePosition: 'left',
  },
  {
    id: 'changing-facilities',
    name: 'Changing Facilities',
    description:
      'AGF provides clean, comfortable changing facilities so you can arrive ready to train or freshen up after your workout. The changing area is maintained to a high standard to ensure a positive experience every time you visit.',
    features: [
      'Separate male and female changing areas',
      'Lockers for securing personal belongings',
      'Clean and well-maintained environment',
      'Hydration station & sanitization dispensers',
    ],
    image: '/images/facilities/changing-facilities.webp',
    imageAlt: 'AGF changing facilities',
    imagePosition: 'right',
  },
];

export function getAllFacilities(): Facility[] {
  return FACILITIES;
}
