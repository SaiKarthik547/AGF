'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Activity, Dumbbell } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { EQUIPMENT } from '@/data/equipment';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import { PrimaryButton } from '@/components/shared/Buttons';
import styles from './FeaturedEquipment.module.css';

export default function FeaturedEquipment() {
  // Global <MotionConfig reducedMotion="user"> handles reduced motion.
  const containerVariant = staggerContainer;
  const itemVariant = fadeUp;

  // Category breakdown reflecting owner inventory
  const categorySummary = [
    { name: 'CARDIO', count: EQUIPMENT.filter(e => e.category === 'Cardio').length, href: '/equipment' },
    { name: 'STRENGTH', count: EQUIPMENT.filter(e => e.category === 'Strength').length, href: '/equipment' },
    { name: 'FREE WEIGHT', count: EQUIPMENT.filter(e => e.category === 'Free Weight').length, href: '/equipment' },
  ];

  // Pick 4 standout machines across owner categories
  const featured = [
    EQUIPMENT.find(e => e.slug === 'vertical-chest-press') || EQUIPMENT[6],
    EQUIPMENT.find(e => e.slug === 'pec-fly') || EQUIPMENT[7],
    EQUIPMENT.find(e => e.slug === 'lat-pulldown') || EQUIPMENT[13],
    EQUIPMENT.find(e => e.slug === '45-degree-leg-press') || EQUIPMENT[5],
  ];

  return (
    <section className={styles.section} aria-labelledby="featured-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <SectionLabel>OUR EQUIPMENT</SectionLabel>
            <SectionHeading accentWord="INVENTORY">
              COMMERCIAL-GRADE INVENTORY
            </SectionHeading>
            <p className={styles.headerSub}>
              Designed for optimal biomechanics, maximum muscle tension, and joint safety.
              Explore our owner-verified selection across Cardio, Strength, and Free Weights.
            </p>
          </div>
          <Link href="/equipment" className={styles.viewAllDesktop}>
            View Full Equipment Inventory <ArrowRight size={18} />
          </Link>
        </div>

        {/* Category Breakdown Tiles */}
        <div className={styles.categoryTiles}>
          {categorySummary.map((cat) => (
            <Link key={cat.name} href={cat.href} className={styles.categoryTile}>
              <span className={styles.categoryTileTitle}>{cat.name}</span>
              <span className={styles.categoryTileCount}>{cat.count} equipment</span>
            </Link>
          ))}
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          animate="visible"
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
            EXPLORE ALL EQUIPMENT <ArrowRight size={18} />
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
