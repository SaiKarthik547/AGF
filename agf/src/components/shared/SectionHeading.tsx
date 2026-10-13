'use client';

/**
 * SectionHeading — large Oswald display heading for section titles.
 * Supports an optional accentWord rendered in orange.
 */

import { motion } from 'motion/react';
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
  // Deterministic prop branch only (reduced motion is global via MotionConfig)
  // — must not depend on hooks, or server and client could render differently.
  const variant = animate ? fadeUp : instantVariant;

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
      animate="visible"
      className={cn(styles.wrapper, className)}
    >
      <Tag className={cn(styles.heading, size === 'lg' && styles.headingLg)}>
        {renderContent()}
      </Tag>
    </motion.div>
  );
}
