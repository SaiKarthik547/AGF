/**
 * AGF — Site Constants
 * Single source of truth for site-wide values.
 */

export const SITE_NAME = 'Anytime Golden Fitness';
export const SITE_SHORT_NAME = 'AGF';
export const SITE_URL = 'https://anytimegoldenfitness.in'; // placeholder until domain is live
export const SITE_LOCATION = 'Rajam, Andhra Pradesh, India';

export const SITE_DESCRIPTION =
  'Anytime Golden Fitness (AGF) is a modern, fully-equipped gym in Rajam, Andhra Pradesh. Train smarter with premium equipment, expert guidance, and a supportive community.';

/** Navbar height in px — must match --navbar-height CSS token */
export const NAVBAR_HEIGHT = 72;

/** Scroll threshold (px) at which navbar transitions from transparent → solid */
export const NAVBAR_SCROLL_THRESHOLD = 80;

/** Equipment categories in display order */
export const EQUIPMENT_CATEGORIES = [
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Cardio',
  'Functional',
] as const;

/** Gallery categories in display order */
export const GALLERY_CATEGORIES = [
  { value: 'gym-floor',  label: 'Gym Floor' },
  { value: 'equipment',  label: 'Equipment' },
  { value: 'training',   label: 'Training' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'people',     label: 'People' },
] as const;

/** Social media placeholder links — replace with actual URLs after client confirmation */
export const SOCIAL_LINKS = {
  instagram: '#',
  facebook:  '#',
  youtube:   '#',
} as const;

/** Contact placeholders — replace after client confirmation */
export const CONTACT_PLACEHOLDERS = {
  phone:   '[Phone — to be confirmed]',
  email:   '[Email — to be confirmed]',
  hours:   '[Opening hours — to be confirmed]',
  address: 'Rajam, Andhra Pradesh, India',
} as const;

/** Homepage highlight tiles (non-numerical — no unverified stats) */
export const HIGHLIGHT_TILES = [
  { id: 'equipment', icon: 'Dumbbell',   label: 'Modern Equipment' },
  { id: 'training',  icon: 'Users',      label: 'Training Support' },
  { id: 'community', icon: 'Heart',      label: 'Fitness Community' },
] as const;
