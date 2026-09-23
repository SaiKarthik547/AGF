'use client';

import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, staggerContainer, instantVariant } from '@/lib/animations';
import styles from './QuickStats.module.css';

const STATS = [
  { value: '12+', label: 'STATIONS', sub: 'Targeted machine zones' },
  { value: '100%', label: 'COMMERCIAL', sub: 'Biomechanical precision' },
  { value: 'RAJAM', label: 'ANDHRA PRADESH', sub: 'Prime central facility' },
  { value: 'ELITE', label: 'ENVIRONMENT', sub: 'Built for real results' },
];

export default function QuickStats() {
  const prefersReduced = useReducedMotion();
  const containerVariant = prefersReduced ? instantVariant : staggerContainer;
  const itemVariant = prefersReduced ? instantVariant : fadeUp;

  return (
    <section className={styles.section} aria-label="Gym Highlights">
      <div className={styles.container}>
        <motion.div
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
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
