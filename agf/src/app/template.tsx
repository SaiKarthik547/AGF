'use client';

/**
 * template.tsx — Page entrance animation wrapper.
 *
 * Next.js re-mounts template.tsx on every navigation (unlike layout.tsx),
 * making it the correct place for per-page entrance animations.
 * Layout.tsx is used for persistent elements (Navbar, Footer).
 */

import { motion, useReducedMotion } from 'motion/react';
import { pageEntrance, instantVariant } from '@/lib/animations';

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced ? instantVariant : pageEntrance;

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
