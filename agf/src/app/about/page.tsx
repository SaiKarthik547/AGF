import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/shared/CTASection';
import { Target, Shield, Award, Users, CheckCircle2 } from 'lucide-react';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Anytime Golden Fitness',
  description:
    'Learn about Anytime Golden Fitness (AGF) in Rajam, Andhra Pradesh. Our mission, commercial-grade equipment standards, and dedication to fitness results.',
};

const VALUES = [
  {
    icon: Target,
    title: 'BIOMECHANICAL PRECISION',
    desc: 'We prioritize machinery that aligns with human joint movement paths, reducing shear stress and maximizing muscle recruitment.',
  },
  {
    icon: Shield,
    title: 'COMMERCIAL RELIABILITY',
    desc: 'Solid steel construction, precision pulley systems, and maintained equipment that delivers smooth, reliable tension set after set.',
  },
  {
    icon: Award,
    title: 'UNCOMPROMISING CLEANLINESS',
    desc: 'A hygienic, spotless, and disciplined gym floor with organized weight storage, sanitized pads, and dedicated airflow.',
  },
  {
    icon: Users,
    title: 'LOCAL RAJAM COMMUNITY',
    desc: 'Proudly rooted in Rajam, Andhra Pradesh. We welcome beginners taking their first steps as warmly as seasoned lifters.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="ABOUT AGF"
        line1="ENGINEERED FOR PROGRESS."
        line2="COMMITTED TO RESULTS."
        accentWord="RESULTS."
        description="Anytime Golden Fitness is Rajam's dedicated commercial training facility, designed to empower every member with high-grade machinery, proper technique, and a focused gym culture."
        cta={{ label: 'EXPLORE OUR EQUIPMENT', href: '/equipment' }}
        secondaryCta={{ label: 'BOOK A VISIT', href: '/book-a-visit' }}
      />

      {/* Story & Purpose Section */}
      <section className={styles.section} aria-labelledby="story-title">
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <SectionLabel>OUR PURPOSE</SectionLabel>
              <SectionHeading accentWord="FITNESS EXPERIENCE">
                A BETTER FITNESS EXPERIENCE FOR RAJAM
              </SectionHeading>
              <p className={styles.paragraph}>
                At Anytime Golden Fitness (AGF), we believe that effective training requires more than just dumbbells in a room. It requires equipment engineered to keep joints safe, a focused atmosphere that fosters discipline, and guidance that helps people make consistent progress.
              </p>
              <p className={styles.paragraph}>
                Whether you are aiming to build functional strength, improve body composition, recover mobility, or simply develop healthy daily exercise habits, AGF provides the machines, structure, and environment to support your journey in Rajam.
              </p>
              <div className={styles.checklist}>
                <div className={styles.checkItem}>
                  <CheckCircle2 className={styles.checkIcon} size={18} />
                  <span>Commercial-grade resistance & cable stations</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 className={styles.checkIcon} size={18} />
                  <span>Individual training guidance & goal orientation</span>
                </div>
                <div className={styles.checkItem}>
                  <CheckCircle2 className={styles.checkIcon} size={18} />
                  <span>Spacious, clean, and well-ventilated floor layout</span>
                </div>
              </div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statTile}>
                <span className={styles.statNum}>25</span>
                <span className={styles.statLabel}>Commercial Stations</span>
                <p className={styles.statDetail}>Cardio, selectorized strength, and free weight zones.</p>
              </div>
              <div className={styles.statTile}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Focused Environment</span>
                <p className={styles.statDetail}>No gimmicks. Real training for real everyday people.</p>
              </div>
              <div className={styles.statTile}>
                <span className={styles.statNum}>AP</span>
                <span className={styles.statLabel}>Rajam, Andhra Pradesh</span>
                <p className={styles.statDetail}>Centrally situated for convenient morning and evening sessions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Standards */}
      <section className={styles.valuesSection} aria-labelledby="values-title">
        <div className={styles.container}>
          <div className={styles.valuesHeader}>
            <SectionLabel>OUR STANDARDS</SectionLabel>
            <SectionHeading accentWord="STANDARDS">
              WHAT SETS OUR FACILITY APART
            </SectionHeading>
          </div>

          <div className={styles.valuesGrid}>
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className={styles.valueCard}>
                  <div className={styles.valueIconWrap}>
                    <Icon size={24} className={styles.valueIcon} />
                  </div>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p className={styles.valueDesc}>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="EXPERIENCE ANYTIME GOLDEN FITNESS"
        subtext="Schedule a walk-through of our facility, view our machines in person, and discuss your fitness goals with our team in Rajam."
        buttonLabel="BOOK A VISIT NOW"
        buttonHref="/book-a-visit"
        secondButton={{ label: "View Equipment Directory", href: "/equipment" }}
      />
    </>
  );
}
