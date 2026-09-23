'use client';

import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { fadeUp, staggerContainer, instantVariant } from '@/lib/animations';
import { SITE_LOCATION, CONTACT_PLACEHOLDERS } from '@/lib/constants';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import { PrimaryButton } from '@/components/shared/Buttons';
import styles from './LocationSection.module.css';

export default function LocationSection() {
  const prefersReduced = useReducedMotion();
  const containerVariant = prefersReduced ? instantVariant : staggerContainer;
  const itemVariant = prefersReduced ? instantVariant : fadeUp;

  return (
    <section className={styles.section} aria-labelledby="location-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.grid}
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Info column */}
          <motion.div className={styles.infoCol} variants={itemVariant}>
            <SectionLabel>VISIT US</SectionLabel>
            <SectionHeading accentWord="RAJAM, AP">
              LOCATED IN RAJAM, AP
            </SectionHeading>
            <p className={styles.subtext}>
              Anytime Golden Fitness is centrally situated in Rajam, Andhra Pradesh,
              offering modern facilities, clean training zones, and full fitness coaching.
            </p>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <div className={styles.iconCircle}>
                  <MapPin size={20} className={styles.icon} />
                </div>
                <div>
                  <h4 className={styles.detailTitle}>Location</h4>
                  <p className={styles.detailVal}>{SITE_LOCATION}</p>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.iconCircle}>
                  <Clock size={20} className={styles.icon} />
                </div>
                <div>
                  <h4 className={styles.detailTitle}>Gym Hours</h4>
                  <p className={styles.detailVal}>Morning & Evening Sessions Available</p>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.iconCircle}>
                  <Phone size={20} className={styles.icon} />
                </div>
                <div>
                  <h4 className={styles.detailTitle}>Contact</h4>
                  <p className={styles.detailVal}>
                    {CONTACT_PLACEHOLDERS.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.btnWrap}>
              <PrimaryButton href="/contact" size="default">
                GET DIRECTIONS & CONTACT
              </PrimaryButton>
            </div>
          </motion.div>

          {/* Visual Map/Gym Card */}
          <motion.div className={styles.mapCard} variants={itemVariant}>
            <div className={styles.mapGraphic}>
              <div className={styles.pinMarker}>
                <MapPin size={28} className={styles.pinIcon} />
                <span className={styles.pinPulse} />
              </div>
              <div className={styles.mapText}>
                <h3 className={styles.mapTitle}>ANYTIME GOLDEN FITNESS</h3>
                <p className={styles.mapAddress}>Rajam, Andhra Pradesh, India</p>
                <div className={styles.mapBadge}>COMMERCIAL FITNESS CENTER</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
