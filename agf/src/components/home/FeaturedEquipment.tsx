'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronRight, Activity, Dumbbell } from 'lucide-react';
import { fadeUp, staggerContainer, instantVariant } from '@/lib/animations';
import { EQUIPMENT } from '@/data/equipment';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import { PrimaryButton } from '@/components/shared/Buttons';
import styles from './FeaturedEquipment.module.css';

export default function FeaturedEquipment() {
  const prefersReduced = useReducedMotion();
  const containerVariant = prefersReduced ? instantVariant : staggerContainer;
  const itemVariant = prefersReduced ? instantVariant : fadeUp;

  // Pick 4 standout machines across different categories
  const featured = [
    EQUIPMENT.find(e => e.slug === 'chest-press') || EQUIPMENT[0],
    EQUIPMENT.find(e => e.slug === 'pec-deck-fly') || EQUIPMENT[1],
    EQUIPMENT.find(e => e.slug === 'lat-pulldown') || EQUIPMENT[2],
    EQUIPMENT.find(e => e.slug === 'leg-press') || EQUIPMENT[3],
  ];

  return (
    <section className={styles.section} aria-labelledby="featured-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <SectionLabel>COMMERCIAL EQUIPMENT</SectionLabel>
            <SectionHeading accentWord="MACHINES">
              PRECISION-ENGINEERED MACHINES
            </SectionHeading>
            <p className={styles.headerSub}>
              Designed for optimal biomechanics, maximum muscle tension, and joint safety.
              Explore our full line of commercial stations.
            </p>
          </div>
          <Link href="/equipment" className={styles.viewAllDesktop}>
            View All 12 Stations <ArrowRight size={18} />
          </Link>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {featured.map((item) => {
            const displayImg = item.images.find(img => img.view === 'side') || item.images[0];
            return (
              <motion.div key={item.id} className={styles.card} variants={itemVariant}>
                {/* Graphic machine banner */}
                <div className={styles.cardVisual}>
                  <div className={styles.visualBadge}>{item.category}</div>
                  {displayImg ? (
                    <Image
                      src={displayImg.src}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className={styles.cardImage}
                    />
                  ) : (
                    <div className={styles.iconCircle}>
                      <Dumbbell size={32} className={styles.machineIcon} />
                    </div>
                  )}
                </div>

              <div className={styles.cardBody}>
                <h3 className={styles.machineName}>{item.name}</h3>
                <p className={styles.machineDesc}>{item.shortDescription}</p>

                {/* Target muscles */}
                <div className={styles.muscleWrap}>
                  <Activity size={14} className={styles.muscleIcon} />
                  <span className={styles.muscleLabel}>
                    {item.muscles
                      .filter(m => m.isPrimary)
                      .map(m => m.label)
                      .join(', ')}
                  </span>
                </div>

                <div className={styles.cardFooter}>
                  <Link href={`/equipment/${item.slug}`} className={styles.detailLink}>
                    View Machine Details <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
        </motion.div>

        <div className={styles.viewAllMobile}>
          <PrimaryButton href="/equipment" size="default">
            VIEW ALL 12 MACHINES <ArrowRight size={18} />
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
