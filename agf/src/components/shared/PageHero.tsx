'use client';

/**
 * PageHero — Reusable hero banner for all inner pages.
 * Used by /about, /equipment, /training, /facilities, /gallery, /contact
 *
 * Full-viewport cinematic hero with dark overlay, staggered text animation,
 * and an optional CTA button.
 */

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, heroContainer, heroWord, instantVariant } from '@/lib/animations';
import { PrimaryButton, SecondaryButton } from './Buttons';
import SectionLabel from './SectionLabel';
import styles from './PageHero.module.css';

interface PageHeroCTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface PageHeroProps {
  /** Orange uppercase overline label */
  label: string;
  /** Main heading — two lines */
  line1: string;
  line2: string;
  /** Optional word in line2 to render in orange */
  accentWord?: string;
  description?: string;
  backgroundImage?: string;
  cta?: PageHeroCTA;
  secondaryCta?: PageHeroCTA;
  /** Minimum height — defaults to 60vh for inner pages */
  minHeight?: string;
}

export default function PageHero({
  label,
  line1,
  line2,
  accentWord,
  description,
  backgroundImage,
  cta,
  secondaryCta,
  minHeight = '60vh',
}: PageHeroProps) {
  const prefersReduced = useReducedMotion();

  const containerVariant = prefersReduced ? instantVariant : heroContainer;
  const wordVariant      = prefersReduced ? instantVariant : heroWord;
  const bodyVariant      = prefersReduced ? instantVariant : fadeUp;

  const renderLine2 = () => {
    if (!accentWord || !line2.includes(accentWord)) return line2;
    const parts = line2.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className={styles.accent}>{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className={styles.hero} style={{ minHeight }} aria-label={`${label} — ${line1} ${line2}`}>
      {/* Background image */}
      {backgroundImage ? (
        <div className={styles.bg}>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div className={styles.bgFallback} aria-hidden="true" />
      )}

      {/* Dark overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <SectionLabel animate={!prefersReduced}>{label}</SectionLabel>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className={styles.headingGroup}
        >
          <motion.h1 variants={wordVariant} className={styles.heading}>
            {line1}
          </motion.h1>
          <motion.p variants={wordVariant} className={styles.headingLine2}>
            {renderLine2()}
          </motion.p>
        </motion.div>

        {description && (
          <motion.p
            variants={bodyVariant}
            initial="hidden"
            animate="visible"
            className={styles.description}
          >
            {description}
          </motion.p>
        )}

        {(cta || secondaryCta) && (
          <motion.div
            variants={bodyVariant}
            initial="hidden"
            animate="visible"
            className={styles.ctaGroup}
          >
            {cta && (
              cta.variant === 'secondary'
                ? <SecondaryButton href={cta.href} size="lg">{cta.label}</SecondaryButton>
                : <PrimaryButton href={cta.href} size="lg">{cta.label}</PrimaryButton>
            )}
            {secondaryCta && (
              <SecondaryButton href={secondaryCta.href} size="lg">{secondaryCta.label}</SecondaryButton>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
