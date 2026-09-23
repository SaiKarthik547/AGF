'use client';

/**
 * SectionLabel — orange uppercase overline label above section headings.
 * e.g. "OUR EQUIPMENT", "ABOUT AGF"
 */

import { motion, useReducedMotion } from 'motion/react';
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
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced || !animate ? instantVariant : fadeUp;

  return (
    <motion.p
      className={cn(styles.label, className)}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.p>
  );
}
