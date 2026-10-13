'use client';

import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import styles from './QuickStats.module.css';

const STATS = [
  { value: '25', label: 'COMMERCIAL STATIONS', sub: 'Cardio, strength & free weights' },
  { value: '100%', label: 'COMMERCIAL', sub: 'Biomechanical precision' },
  { value: 'RAJAM', label: 'ANDHRA PRADESH', sub: 'Prime central facility' },
  { value: 'ELITE', label: 'ENVIRONMENT', sub: 'Built for real results' },
];

export default function QuickStats() {
  // Global <MotionConfig reducedMotion="user"> handles reduced motion.
  const containerVariant = staggerContainer;
  const itemVariant = fadeUp;

  return (
    <section className={styles.section} aria-label="Gym Highlights">
      <div className={styles.container}>
        <motion.div
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {STATS.map((stat, i) => (
            <motion.div key={i} className={styles.statCard} variants={itemVariant}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
              <span className={styles.sub}>{stat.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
