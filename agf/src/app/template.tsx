'use client';

/**
 * template.tsx — Page entrance animation wrapper.
 *
 * Next.js re-mounts template.tsx on every navigation (unlike layout.tsx),
 * making it the correct place for per-page entrance animations.
 * Layout.tsx is used for persistent elements (Navbar, Footer).
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in layout.tsx — do NOT branch on useReducedMotion() here: the hook returns
 * null on the server but a real value on a reduced-motion client, which
 * rendered a different variant on each side and caused a hydration mismatch.
 */

import { motion } from 'motion/react';
import { pageEntrance } from '@/lib/animations';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageEntrance}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
