/**
 * AGF — Training Programs Data
 *
 * ⚠️  PLACEHOLDER DATA
 * These 5 training categories are provisional.
 * Replace with confirmed AGF services after client approval.
 */

import type { TrainingProgram } from '@/types';

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'personal-training',
    slug: 'personal-training',
    name: 'Personal Training',
    tagline: 'One-on-one guidance for faster progress.',
    description:
      'Work directly with a trainer who builds a plan around your specific goals, schedule, and fitness level. Personal training is the fastest way to learn correct technique, stay accountable, and make consistent progress — whether you are brand new to the gym or looking to break through a plateau.',
    benefits: [
      'Customised programme designed for you',
      'Direct coaching on technique and form',
      'Consistent accountability and motivation',
      'Faster progress than training alone',
    ],
    suitableFor: 'Anyone — especially those new to the gym or with specific goals.',
    image: '/images/training/personal-training.webp',
    imageAlt: 'Trainer working one-on-one with a client',
    ctaLabel: 'Book a Visit',
  },
  {
    id: 'strength-training',
    slug: 'strength-training',
    name: 'Strength Training',
    tagline: 'Build real, functional strength.',
    description:
      'Strength training involves progressively increasing the resistance you work against over time. The result is stronger muscles, denser bones, better posture, and improved performance in everyday activities. AGF has a full range of equipment — from machines to free weights — to support structured strength development.',
    benefits: [
      'Increases muscle strength and size',
      'Improves bone density',
      'Better posture and joint stability',
      'Helps with weight management long term',
    ],
    suitableFor: 'All levels — from first-time lifters to experienced strength athletes.',
    image: '/images/training/strength-training.webp',
    imageAlt: 'Person training with weights in the gym',
    ctaLabel: 'Book a Visit',
  },
  {
    id: 'functional-training',
    slug: 'functional-training',
    name: 'Functional Training',
    tagline: 'Move better. Live stronger.',
    description:
      'Functional training uses exercises that mimic real-life movements — pushing, pulling, rotating, and carrying. The goal is to build strength and mobility that translates directly into everyday tasks, sports, and activities. It is highly varied, engaging, and suitable for all fitness levels.',
    benefits: [
      'Improves real-world movement quality',
      'Builds core strength and stability',
      'Reduces risk of everyday injury',
      'Highly adaptable to any fitness level',
    ],
    suitableFor: 'Everyone — particularly those who want fitness to carry over into daily life and sports.',
    image: '/images/training/functional-training.webp',
    imageAlt: 'Person doing functional training exercises',
    ctaLabel: 'Book a Visit',
  },
  {
    id: 'weight-management',
    slug: 'weight-management',
    name: 'Weight Management',
    tagline: 'Support your fitness goals the right way.',
    description:
      'Weight management training combines cardiovascular exercise, strength work, and sustainable habits to help you achieve and maintain a healthy body composition. Rather than quick fixes, the focus is on steady, consistent progress through proper training and lifestyle support.',
    benefits: [
      'Structured approach to managing body composition',
      'Combines cardio and strength for best results',
      'Builds healthy, long-term fitness habits',
      'No extreme methods — sustainable and safe',
    ],
    suitableFor: 'Those looking to manage their weight as part of an overall healthy lifestyle.',
    image: '/images/training/weight-management.webp',
    imageAlt: 'Person doing cardio training on a treadmill',
    ctaLabel: 'Book a Visit',
  },
  {
    id: 'general-fitness',
    slug: 'general-fitness',
    name: 'General Fitness',
    tagline: 'A stronger, healthier you — no complicated plan needed.',
    description:
      'General fitness training is for anyone who wants to feel healthier, move better, and have more energy — without following a highly specific programme. Using AGF\'s wide range of equipment, you can build a balanced routine covering cardio, strength, and flexibility at your own pace.',
    benefits: [
      'Improves overall health and energy levels',
      'Flexible and adaptable to any schedule',
      'Great introduction to regular gym training',
      'Access to the full range of AGF equipment',
    ],
    suitableFor: 'Beginners and anyone who wants a balanced, general approach to fitness.',
    image: '/images/training/general-fitness.webp',
    imageAlt: 'Person working out in a well-equipped gym',
    ctaLabel: 'Book a Visit',
  },
];

export function getAllTrainingPrograms(): TrainingProgram[] {
  return TRAINING_PROGRAMS;
}

export function getFeaturedTrainingPrograms(count = 3): TrainingProgram[] {
  return TRAINING_PROGRAMS.slice(0, count);
}
