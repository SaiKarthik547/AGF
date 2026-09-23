/**
 * AGF — Gallery Data
 *
 * ⚠️  PLACEHOLDER DATA
 * Image paths are provisional — replace with actual AGF photos after client approval.
 * span: 2 creates a feature image that spans two grid columns/rows.
 */

import type { GalleryImage } from '@/types';

export const GALLERY_IMAGES: GalleryImage[] = [
  // Gym Floor
  { id: 'gf-01', src: '/images/gallery/gym-floor-01.webp', alt: 'AGF gym floor — strength zone overview', category: 'gym-floor', featured: true, span: 2 },
  { id: 'gf-02', src: '/images/gallery/gym-floor-02.webp', alt: 'AGF gym floor — cardio area', category: 'gym-floor', span: 1 },
  { id: 'gf-03', src: '/images/gallery/gym-floor-03.webp', alt: 'AGF gym floor — free weights section', category: 'gym-floor', span: 1 },
  { id: 'gf-04', src: '/images/gallery/gym-floor-04.webp', alt: 'AGF gym floor — functional training area', category: 'gym-floor', span: 1 },

  // Equipment
  { id: 'eq-01', src: '/images/gallery/equipment-01.webp', alt: 'Chest Press Machine at AGF', category: 'equipment', span: 1 },
  { id: 'eq-02', src: '/images/gallery/equipment-02.webp', alt: 'Lat Pulldown machine at AGF', category: 'equipment', featured: true, span: 2 },
  { id: 'eq-03', src: '/images/gallery/equipment-03.webp', alt: 'Leg Press machine at AGF', category: 'equipment', span: 1 },
  { id: 'eq-04', src: '/images/gallery/equipment-04.webp', alt: 'Treadmill row at AGF', category: 'equipment', span: 1 },

  // Training
  { id: 'tr-01', src: '/images/gallery/training-01.webp', alt: 'Personal training session at AGF', category: 'training', featured: true, span: 2 },
  { id: 'tr-02', src: '/images/gallery/training-02.webp', alt: 'Strength training at AGF', category: 'training', span: 1 },
  { id: 'tr-03', src: '/images/gallery/training-03.webp', alt: 'Functional training at AGF', category: 'training', span: 1 },

  // Facilities
  { id: 'fc-01', src: '/images/gallery/facilities-01.webp', alt: 'AGF gym interior — wide angle', category: 'facilities', span: 1 },
  { id: 'fc-02', src: '/images/gallery/facilities-02.webp', alt: 'AGF changing facilities', category: 'facilities', span: 1 },

  // People
  { id: 'pe-01', src: '/images/gallery/people-01.webp', alt: 'Member training at AGF', category: 'people', featured: true, span: 2 },
  { id: 'pe-02', src: '/images/gallery/people-02.webp', alt: 'Members working out together at AGF', category: 'people', span: 1 },
  { id: 'pe-03', src: '/images/gallery/people-03.webp', alt: 'Person finishing a workout at AGF', category: 'people', span: 1 },
];

export function getAllGalleryImages(): GalleryImage[] {
  return GALLERY_IMAGES;
}

export function getGalleryByCategory(category: string): GalleryImage[] {
  if (category === 'all') return GALLERY_IMAGES;
  return GALLERY_IMAGES.filter((img) => img.category === category);
}

export function getFeaturedGalleryImages(count = 6): GalleryImage[] {
  return GALLERY_IMAGES.slice(0, count);
}
