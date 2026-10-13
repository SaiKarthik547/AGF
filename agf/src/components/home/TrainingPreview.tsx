'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { TRAINING_PROGRAMS } from '@/data/training';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import styles from './TrainingPreview.module.css';

export default function TrainingPreview() {
  // Global <MotionConfig reducedMotion="user"> handles reduced motion.
  const containerVariant = staggerContainer;
  const itemVariant = fadeUp;

  // Show top 3 training programs
  const programs = TRAINING_PROGRAMS.slice(0, 3);

  return (
    <section className={styles.section} aria-labelledby="training-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <SectionLabel>STRUCTURED PROGRAMS</SectionLabel>
            <SectionHeading accentWord="GOALS">
              TRAINING BUILT AROUND YOUR GOALS
            </SectionHeading>
          </div>
          <Link href="/training" className={styles.viewAll}>
            View All Programs <ArrowRight size={18} />
          </Link>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {programs.map((prog) => (
            <motion.div key={prog.id} className={styles.card} variants={itemVariant}>
              <div className={styles.cardTop}>
                <span className={styles.tagline}>{prog.tagline}</span>
                <h3 className={styles.title}>{prog.name}</h3>
                <p className={styles.desc}>{prog.description}</p>
              </div>

              <div className={styles.benefits}>
                <h4 className={styles.benefitsTitle}>Key Benefits:</h4>
                <ul className={styles.benefitList}>
                  {prog.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className={styles.benefitItem}>
                      <CheckCircle2 size={14} className={styles.checkIcon} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardBottom}>
                <Link href="/book-visit" className={styles.cardCta}>
                  Book a Visit For This Program →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
