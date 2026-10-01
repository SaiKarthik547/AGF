'use client';

import { MapPin, Navigation, Car, ShieldCheck, Clock } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import styles from './MapSection.module.css';

interface Props {
  showHeading?: boolean;
}

export default function MapSection({ showHeading = true }: Props) {
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.6934!2d83.6616645!3d18.4526244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c77002c797813%3A0x9034dd07f820dd09!2sANYTIME%20GOLDEN%20FITNESS!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  const directionsUrl = 'https://maps.app.goo.gl/xvAwfrAEFHrf1ZDH6';

  return (
    <section className={styles.section} aria-label="Gym Location in Rajam">
      <div className={styles.container}>
        {showHeading && (
          <div className={styles.header}>
            <SectionLabel>OUR LOCATION</SectionLabel>
            <SectionHeading accentWord="APSARA THEATRE">
              FIND US BESIDE APSARA THEATRE
            </SectionHeading>
            <p className={styles.subtext}>
              Conveniently situated right beside Apsara Theatre on Palakonda Road in Rajam, with direct road access, dedicated vehicle parking, and secure facility check-in.
            </p>
          </div>
        )}

        <div className={styles.mapWrapper}>
          <iframe
            src={mapEmbedUrl}
            title="Anytime Golden Fitness beside Apsara Theatre Rajam Map"
            className={styles.mapFrame}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className={styles.infoOverlay}>
            <div className={styles.overlayBadge}>
              <span className={styles.overlayDot} />
              Beside Apsara Theatre
            </div>
            <h3 className={styles.overlayTitle}>ANYTIME GOLDEN FITNESS</h3>
            <p className={styles.overlayAddress}>
              Beside Apsara Theatre, Palakonda Road, Rajam, Andhra Pradesh — 532127
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionBtn}
            >
              <Navigation size={14} /> Open in Google Maps
            </a>
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <MapPin size={22} className={styles.featureIcon} />
            <div>
              <h4 className={styles.featureTitle}>Apsara Theatre Landmark</h4>
              <p className={styles.featureDesc}>Located right beside Apsara Theatre on Palakonda Road</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <Car size={22} className={styles.featureIcon} />
            <div>
              <h4 className={styles.featureTitle}>Parking Access</h4>
              <p className={styles.featureDesc}>Ample two-wheeler & designated car parking slots</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <Clock size={22} className={styles.featureIcon} />
            <div>
              <h4 className={styles.featureTitle}>Training Shifts</h4>
              <p className={styles.featureDesc}>Morning (5:30–10:30 AM) & Evening (4:30–9:30 PM)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
