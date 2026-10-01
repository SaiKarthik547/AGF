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

          {/* Interactive Google Map Card */}
          <motion.div className={styles.mapCard} variants={itemVariant}>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.6934!2d83.6616645!3d18.4526244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c77002c797813%3A0x9034dd07f820dd09!2sANYTIME%20GOLDEN%20FITNESS!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                title="Anytime Golden Fitness Beside Apsara Theatre Rajam Map"
                className={styles.mapIframe}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className={styles.mapOverlay}>
                <div className={styles.mapBadge}>BESIDE APSARA THEATRE</div>
                <h3 className={styles.mapTitle}>ANYTIME GOLDEN FITNESS</h3>
                <p className={styles.mapAddress}>Beside Apsara Theatre, Palakonda Road, Rajam, AP — 532127</p>
                <a
                  href="https://maps.app.goo.gl/xvAwfrAEFHrf1ZDH6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                >
                  <MapPin size={14} /> Open in Google Maps →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
