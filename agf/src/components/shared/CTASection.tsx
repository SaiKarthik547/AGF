'use client';

/**
 * CTASection — Orange-tinted final CTA used at the bottom of most pages.
 * "READY TO START YOUR FITNESS JOURNEY? / Book a Visit"
 */

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, staggerContainer, instantVariant } from '@/lib/animations';
import { PrimaryButton } from './Buttons';
import styles from './CTASection.module.css';

interface CTASectionProps {
  heading: string;
  subtext?: string;
  buttonLabel: string;
  buttonHref: string;
  backgroundImage?: string;
  /** Optional second CTA */
  secondButton?: { label: string; href: string };
}

export default function CTASection({
  heading,
  subtext,
  buttonLabel,
  buttonHref,
  backgroundImage,
  secondButton,
}: CTASectionProps) {
  const prefersReduced = useReducedMotion();
  const containerVariant = prefersReduced ? instantVariant : staggerContainer;
  const itemVariant      = prefersReduced ? instantVariant : fadeUp;

  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      {backgroundImage && (
        <div className={styles.bg}>
          <Image src={backgroundImage} alt="" fill priority={false} sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      )}
      <div className={styles.overlay} aria-hidden="true" />

      <motion.div
        className={styles.content}
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2
          id="cta-heading"
          className={styles.heading}
          variants={itemVariant}
        >
          {heading}
        </motion.h2>

        {subtext && (
          <motion.p className={styles.subtext} variants={itemVariant}>
            {subtext}
          </motion.p>
        )}

        <motion.div className={styles.buttons} variants={itemVariant}>
          <PrimaryButton href={buttonHref} size="lg">
            {buttonLabel}
          </PrimaryButton>
          {secondButton && (
            <a href={secondButton.href} className={styles.secondLink}>
              {secondButton.label} →
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
