'use client';

import { motion } from 'motion/react';
import { Target, Zap, Shield, Users } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import styles from './WhyAGF.module.css';

const PILLARS = [
  {
    icon: Target,
    title: 'BIOMECHANICAL ACCURACY',
    desc: 'Every station is engineered to isolate targeted muscle groups with proper resistance curves and joint protection.',
  },
  {
    icon: Zap,
    title: 'COMMERCIAL-GRADE STATIONS',
    desc: 'Heavy-duty steel construction, ultra-smooth pulley bearings, and reliable weight stacks built for serious lifters.',
  },
  {
    icon: Shield,
    title: 'CLEAN & MAINTAINED ZONES',
    desc: 'Spotless training environment with organized weight plates, hygienic equipment, and spacious floor layouts.',
  },
  {
    icon: Users,
    title: 'CENTRAL RAJAM COMMUNITY',
    desc: 'Convenient location in Rajam, Andhra Pradesh, welcoming both first-time gym-goers and dedicated athletes.',
  },
];

export default function WhyAGF() {
  // Global <MotionConfig reducedMotion="user"> handles reduced motion.
  const containerVariant = staggerContainer;
  const itemVariant = fadeUp;

  return (
    <section className={styles.section} aria-labelledby="why-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>THE AGF ADVANTAGE</SectionLabel>
          <SectionHeading accentWord="PERFORMANCE">
            ENGINEERED FOR PERFORMANCE
          </SectionHeading>
          <p className={styles.subtext}>
            We combine high-caliber equipment with an environment designed to keep you focused and making steady progress.
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={i} className={styles.card} variants={itemVariant}>
                <div className={styles.iconWrap}>
                  <Icon size={24} className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardDesc}>{pillar.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
