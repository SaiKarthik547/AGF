'use client';

/**
 * SectionLabel — orange uppercase overline label above section headings.
 * e.g. "OUR EQUIPMENT", "ABOUT AGF"
 */

import { motion } from 'motion/react';
import { fadeUp, instantVariant } from '@/lib/animations';
import { cn } from '@/lib/utils';
import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function SectionLabel({
  children,
  className,
  animate = true,
}: SectionLabelProps) {
  // Deterministic prop branch only (reduced motion is global via MotionConfig).
  const variant = animate ? fadeUp : instantVariant;

  return (
    <motion.p
      className={cn(styles.label, className)}
      variants={variant}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.p>
  );
}
