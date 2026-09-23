/**
 * AGF — Shared Animation Variants
 * All motion/react animation variants defined once and reused across every page.
 *
 * Usage:
 *   import { fadeUp, staggerContainer } from '@/lib/animations';
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} />
 *
 * All animations are automatically disabled when prefers-reduced-motion is set —
 * enforce this via the useReducedMotion hook in components, or use the
 * reducedMotionVariant() helper below.
 */

import type { Variants } from 'motion/react';

/* ------------------------------------------------------------
   EASING CURVES (mirrors CSS tokens)
   ------------------------------------------------------------ */
const EASE_OUT    = [0.16, 1, 0.3, 1]   as const;
const EASE_IN_OUT = [0.4, 0, 0.2, 1]    as const;

/* ------------------------------------------------------------
   ENTRANCE ANIMATIONS
   ------------------------------------------------------------ */

/** Fade + rise — headings, paragraphs, general content */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Fade + descend — for elements above their rest position */
export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/** Fade only — subtle reveals with no movement */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/** Fade + scale — image reveals, hero imagery */
export const imageReveal: Variants = {
  hidden:  { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

/** Slide from left */
export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Slide from right */
export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/* ------------------------------------------------------------
   STAGGER CONTAINERS
   ------------------------------------------------------------ */

/** Stagger container — wrap a grid/list for stagger effect on children */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Slower stagger for fewer, larger items */
export const staggerContainerSlow: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

/** Card child — used inside staggerContainer */
export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/* ------------------------------------------------------------
   PAGE TRANSITIONS
   Used in src/app/template.tsx
   ------------------------------------------------------------ */

export const pageEntrance: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: EASE_IN_OUT },
  },
};

/* ------------------------------------------------------------
   HERO TEXT STAGGER
   ------------------------------------------------------------ */

export const heroContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

export const heroWord: Variants = {
  hidden:  { opacity: 0, y: 40, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/* ------------------------------------------------------------
   EQUIPMENT HOTSPOT
   ------------------------------------------------------------ */

export const hotspotRing: Variants = {
  idle:   { scale: 1,    opacity: 0.7 },
  active: { scale: 1.25, opacity: 1,  transition: { duration: 0.2, ease: EASE_OUT } },
  pulse: {
    scale: [1, 1.4, 1],
    opacity: [0.7, 0.3, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: EASE_IN_OUT },
  },
};

export const hotspotPanel: Variants = {
  hidden:  { opacity: 0, y: 8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
};

/* ------------------------------------------------------------
   EQUIPMENT IMAGE VIEWER
   ------------------------------------------------------------ */

/** Crossfade between equipment views */
export const viewerCrossfade: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_IN_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

/* ------------------------------------------------------------
   LIGHTBOX
   ------------------------------------------------------------ */

export const lightboxBackdrop: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

export const lightboxImage: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

/* ------------------------------------------------------------
   MOBILE NAVIGATION
   ------------------------------------------------------------ */

export const mobileNavOverlay: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

export const mobileNavContainer: Variants = {
  hidden:  { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  },
};

export const mobileNavLinks: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const mobileNavLink: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

/* ------------------------------------------------------------
   FORM SUCCESS MODAL
   ------------------------------------------------------------ */

export const successModal: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

/* ------------------------------------------------------------
   REDUCED MOTION HELPER
   Returns an instant no-op variant when reduced motion is preferred.
   Usage: const variant = reducedMotionVariant(prefersReduced, fadeUp);
   ------------------------------------------------------------ */

export const instantVariant: Variants = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1 },
  exit:    { opacity: 1 },
};

export function reducedMotionVariant(
  prefersReduced: boolean,
  variant: Variants,
): Variants {
  return prefersReduced ? instantVariant : variant;
}
