'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { PrimaryButton, SecondaryButton } from '@/components/shared/Buttons';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  // Reduced motion is handled globally by <MotionConfig reducedMotion="user">
  // in layout.tsx — no per-component branching (that caused hydration
  // mismatches: server rendered one variant, reduced-motion client another).
  const containerVariant = staggerContainer;
  const itemVariant = fadeUp;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* Background Image & Ambient overlays */}
      <div className={styles.bgImageWrap} aria-hidden="true">
        <Image
          src="/images/hero/home-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.bgImageOverlay} />
      </div>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Status pill */}
          <motion.div className={styles.badge} variants={itemVariant}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>PREMIER GYM IN RAJAM, AP</span>
            <span className={styles.badgeDivider}>•</span>
            <span className={styles.badgeSub}>ANYTIME GOLDEN FITNESS</span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1 id="hero-title" className={styles.title} variants={itemVariant}>
            FORGE YOUR <span className={styles.accent}>STRENGTH.</span>
            <br />
            ELEVATE YOUR <span className={styles.accentOutline}>POTENTIAL.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p className={styles.subtitle} variants={itemVariant}>
            Anytime Golden Fitness brings commercial-grade biomechanical equipment,
            structured training programs, and a dedicated results-driven atmosphere
            to Rajam, Andhra Pradesh.
          </motion.p>

          {/* Action buttons */}
          <motion.div className={styles.actions} variants={itemVariant}>
            <PrimaryButton href="/equipment" size="lg">
              EXPLORE EQUIPMENT <ChevronRight size={18} />
            </PrimaryButton>
            <SecondaryButton href="/book-visit" size="lg">
              BOOK A VISIT
            </SecondaryButton>
          </motion.div>

          {/* Feature highlights */}
          <motion.div className={styles.quickFeatures} variants={itemVariant}>
            <div className={styles.quickFeatureItem}>
              <ShieldCheck className={styles.featureIcon} size={18} />
              <span>Commercial Grade Machines</span>
            </div>
            <div className={styles.featureSeparator} />
            <div className={styles.quickFeatureItem}>
              <MapPin className={styles.featureIcon} size={18} />
              <span>Prime Location in Rajam</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
