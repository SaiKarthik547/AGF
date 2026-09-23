'use client';

/**
 * SectionHeading — large Oswald display heading for section titles.
 * Supports an optional accentWord rendered in orange.
 */

import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, instantVariant } from '@/lib/animations';
import { cn } from '@/lib/utils';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  children: React.ReactNode;
  accentWord?: string;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'default' | 'lg';
  className?: string;
  animate?: boolean;
}

export default function SectionHeading({
  children,
  accentWord,
  as: Tag = 'h2',
  size = 'default',
  className,
  animate = true,
}: SectionHeadingProps) {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced || !animate ? instantVariant : fadeUp;

  const text = typeof children === 'string' ? children : null;

  const renderContent = () => {
    if (accentWord && text) {
      const parts = text.split(accentWord);
      return (
        <>
          {parts[0]}
          <span className={styles.accent}>{accentWord}</span>
          {parts[1]}
        </>
      );
    }
    return children;
  };

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(styles.wrapper, className)}
    >
      <Tag className={cn(styles.heading, size === 'lg' && styles.headingLg)}>
        {renderContent()}
      </Tag>
    </motion.div>
  );
}
