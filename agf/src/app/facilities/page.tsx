import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/shared/CTASection';
import { FACILITIES } from '@/data/facilities';
import { CheckCircle2, Wind, ShieldCheck, Sparkles, Layers, Zap } from 'lucide-react';
import styles from './facilities.module.css';

export const metadata: Metadata = {
  title: 'Facilities & Zones | Anytime Golden Fitness Rajam',
  description:
    'Explore the training zones and amenities at Anytime Golden Fitness in Rajam, Andhra Pradesh. Strength zone, free weights, cardio deck, and functional training areas.',
};

const AMENITIES = [
  {
    icon: Wind,
    title: 'VENTILATION & AIRFLOW',
    desc: 'Maintained air circulation to keep you cool and energized through strenuous training sessions.',
  },
  {
    icon: Sparkles,
    title: 'HYGIENE PROTOCOLS',
    desc: 'Regular floor sanitation, wiped machine touchpoints, and clean locker and changing facilities.',
  },
  {
    icon: Layers,
    title: 'ORGANIZED LAYOUT',
    desc: 'Designated stations grouped logically by muscle category to minimize wait times and floor clutter.',
  },
  {
    icon: ShieldCheck,
    title: 'SAFETY & MAINTENANCE',
    desc: 'Routine hardware inspections on all cables, weight stacks, and upholstery for dependable performance.',
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        label="GYM FACILITIES"
        line1="PURPOSE-BUILT ZONES."
        line2="MODERN ENVIRONMENT."
        accentWord="ENVIRONMENT."
        description="Discover our carefully organized training zones designed for safe movement, clear lines of sight, and optimal workout flow in Rajam, Andhra Pradesh."
        cta={{ label: 'BOOK A FACILITY TOUR', href: '/book-a-visit' }}
      />

      {/* Main Zones Section */}
      <section className={styles.section} aria-label="Gym Training Zones">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <SectionLabel>TRAINING FLOORS</SectionLabel>
            <SectionHeading accentWord="ZONES">
              EXPLORE OUR TRAINING ZONES
            </SectionHeading>
            <p className={styles.headerSub}>
              Each zone is engineered for a specific training modality, offering dedicated equipment and unhindered movement space.
            </p>
          </div>

          <div className={styles.zonesGrid}>
            {FACILITIES.map((zone) => (
              <div key={zone.id} className={styles.zoneCard}>
                <div className={styles.zoneVisual}>
                  <div className={styles.zoneGlow} />
                  <Zap size={36} className={styles.zoneIcon} />
                  <span className={styles.zoneBadge}>{zone.name}</span>
                </div>

                <div className={styles.zoneBody}>
                  <h2 className={styles.zoneTitle}>{zone.name}</h2>
                  <p className={styles.zoneDesc}>{zone.description}</p>

                  <h3 className={styles.featuresHeading}>Zone Features:</h3>
                  <ul className={styles.featuresList}>
                    {zone.features.map((feature, i) => (
                      <li key={i} className={styles.featureItem}>
                        <CheckCircle2 size={16} className={styles.checkIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className={styles.amenitiesSection} aria-labelledby="amenities-title">
        <div className={styles.container}>
          <div className={styles.amenitiesHeader}>
            <SectionLabel>STANDARDS</SectionLabel>
            <SectionHeading accentWord="AMENITIES">
              CLEANLINESS & AMENITIES
            </SectionHeading>
            <p className={styles.headerSub}>
              We prioritize an environment where you can focus solely on your training without distraction.
            </p>
          </div>

          <div className={styles.amenitiesGrid}>
            {AMENITIES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={styles.amenityCard}>
                  <div className={styles.amenityIconWrap}>
                    <Icon size={24} className={styles.amenityIcon} />
                  </div>
                  <h3 className={styles.amenityTitle}>{item.title}</h3>
                  <p className={styles.amenityDesc}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="SEE THE FACILITY IN PERSON"
        subtext="Take a walk through Anytime Golden Fitness in Rajam. Experience the equipment, ventilation, and atmosphere firsthand."
        buttonLabel="BOOK A VISIT NOW"
        buttonHref="/book-a-visit"
        secondButton={{ label: "View Equipment Directory", href: "/equipment" }}
      />
    </>
  );
}
