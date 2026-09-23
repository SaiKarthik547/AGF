/**
 * AGF — Anytime Golden Fitness
 * Global TypeScript Type System
 *
 * All domain interfaces live here.
 * No business types should be defined inline in components.
 */

/* ------------------------------------------------------------
   EQUIPMENT
   ------------------------------------------------------------ */

export type EquipmentCategory =
  | 'Chest'
  | 'Back'
  | 'Legs'
  | 'Shoulders'
  | 'Arms'
  | 'Cardio'
  | 'Functional';

/** The view identifier used to key images and hotspots */
export type EquipmentView = 'front' | 'side' | 'rear' | 'detail' | 'in-use';

export interface EquipmentImage {
  view: EquipmentView;
  label: string;   // e.g. "Front View"
  src: string;     // path relative to /public, e.g. "/images/equipment/chest-press/front.webp"
  alt: string;
}

/**
 * Interactive hotspot marker on equipment image.
 * x and y are percentage (0–100) of the *rendered* image
 * area after object-fit:contain letterboxing is applied.
 * imageView specifies which view this hotspot belongs to.
 */
export interface Hotspot {
  id: string;
  label: string;       // e.g. "Adjustable Seat"
  description: string; // plain-language explanation
  x: number;           // % from left (0–100)
  y: number;           // % from top  (0–100)
  imageView: EquipmentView;
}

export interface MuscleGroup {
  name: string;        // internal identifier, e.g. "pectorals"
  label: string;       // display label, e.g. "Pectorals (chest muscles)"
  isPrimary: boolean;
}

export interface UsageStep {
  step: number;
  instruction: string; // Short imperative: "Adjust the seat height"
  detail?: string;     // Optional elaboration
}

export interface Specification {
  label: string;       // e.g. "Machine Type"
  value: string;       // e.g. "Selectorized" — use "Placeholder" until confirmed
}

export interface Equipment {
  id: string;
  slug: string;
  name: string;
  category: EquipmentCategory;
  shortDescription: string;  // 1–2 sentences for cards and meta descriptions
  description: string;       // 2–4 paragraphs for the detail page
  muscles: MuscleGroup[];
  benefits: string[];        // Simple bullet points
  usageSteps: UsageStep[];
  beginnerTip: string;
  safetyNote: string;
  specifications: Specification[];
  images: EquipmentImage[];  // At least one image required; optional views omitted gracefully
  hotspots: Hotspot[];
  relatedEquipment: string[]; // slugs of related equipment
  featured?: boolean;         // Show on homepage equipment preview section
}

/* ------------------------------------------------------------
   TRAINING
   ------------------------------------------------------------ */

export interface TrainingProgram {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  suitableFor: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
}

/* ------------------------------------------------------------
   FACILITIES
   ------------------------------------------------------------ */

export interface Facility {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  /** Alternate layout — image left or right of text */
  imagePosition?: 'left' | 'right';
}

/* ------------------------------------------------------------
   GALLERY
   ------------------------------------------------------------ */

export type GalleryCategory =
  | 'gym-floor'
  | 'equipment'
  | 'training'
  | 'facilities'
  | 'people';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  featured?: boolean;
  /** Controls masonry grid span — larger values create feature images */
  span?: 1 | 2;
}

/* ------------------------------------------------------------
   NAVIGATION
   ------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}

/* ------------------------------------------------------------
   CONTACT
   ------------------------------------------------------------ */

export interface ContactItem {
  id: string;
  label: string;
  value: string;
  isPlaceholder: boolean;
  icon: string; // Lucide icon name
}

/* ------------------------------------------------------------
   SHARED UI
   ------------------------------------------------------------ */

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit for the current (last) crumb
}

export interface CTAConfig {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

/** Used by the highlights strip on the homepage (non-numerical) */
export interface HighlightTile {
  id: string;
  icon: string; // Lucide icon name
  label: string;
}
