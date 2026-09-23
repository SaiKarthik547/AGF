import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/shared/CTASection';
import { TRAINING_PROGRAMS } from '@/data/training';
import { CheckCircle2, UserCheck, ArrowRight, Calendar, Target, Zap } from 'lucide-react';
import styles from './training.module.css';

export const metadata: Metadata = {
  title: 'Training Programs | Anytime Golden Fitness Rajam',
  description:
    'Explore structured training programs at Anytime Golden Fitness in Rajam. Personal training, strength development, hypertrophy, and functional fitness.',
};

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'GOAL ASSESSMENT',
    desc: 'We start by understanding your current fitness background, daily schedule, and what you aim to achieve.',
  },
  {
    step: '02',
    title: 'EQUIPMENT ONBOARDING',
    desc: 'Learn proper seat adjustments, grip widths, and motion arcs across our commercial stations with zero guesswork.',
  },
  {
    step: '03',
    title: 'PROGRESSIVE OVERLOAD',
    desc: 'Structured routines designed to increase strength gradually without unnecessary joint wear or overtraining.',
  },
  {
    step: '04',
    title: 'REGULAR REFINEMENT',
    desc: 'Periodic check-ins to evaluate stamina, technique consistency, and adjust weights and volume as you progress.',
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        label="TRAINING METHODOLOGY"
        line1="STRUCTURED COACHING."
        line2="SUSTAINABLE PROGRESS."
        accentWord="PROGRESS."
        description="Whether you are picking up weights for the first time or breaking through an established plateau, our training programs provide the structure, accountability, and technique coaching you need in Rajam."
        cta={{ label: 'BOOK A VISIT FOR TRAINING', href: '/book-a-visit' }}
      />

      {/* Programs List */}
      <section className={styles.programsSection} aria-label="Available Training Programs">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <SectionLabel>OUR PROGRAMS</SectionLabel>
            <SectionHeading accentWord="PROGRAMS">
              CHOOSE YOUR TRAINING PATH
            </SectionHeading>
            <p className={styles.headerSub}>
              Every program leverages our commercial equipment inventory and biomechanical setups to maximize muscle engagement while prioritizing injury prevention.
            </p>
          </div>

          <div className={styles.programsList}>
            {TRAINING_PROGRAMS.map((prog, index) => (
              <div key={prog.id} className={styles.programCard}>
                <div className={styles.programMain}>
                  <div className={styles.tagline}>{prog.tagline}</div>
                  <h2 className={styles.programName}>{prog.name}</h2>
                  <p className={styles.programDesc}>{prog.description}</p>

                  <div className={styles.suitableForBox}>
                    <UserCheck size={16} className={styles.suitableIcon} />
                    <span><strong>Ideal for:</strong> {prog.suitableFor}</span>
                  </div>
                </div>

                <div className={styles.programSide}>
                  <h3 className={styles.benefitsTitle}>Key Benefits:</h3>
                  <ul className={styles.benefitsList}>
                    {prog.benefits.map((benefit, i) => (
                      <li key={i} className={styles.benefitItem}>
                        <CheckCircle2 size={16} className={styles.checkIcon} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.cardAction}>
                    <Link href="/book-a-visit" className={styles.actionBtn}>
                      Book a Visit for This Program <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / The Coaching Process */}
      <section className={styles.processSection} aria-labelledby="process-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <SectionLabel>THE PROCESS</SectionLabel>
            <SectionHeading accentWord="PROGRESS">
              HOW WE GUIDE YOUR PROGRESS
            </SectionHeading>
            <p className={styles.headerSub}>
              A clear, 4-stage system to ensure you train with confidence from your very first session.
            </p>
          </div>

          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className={styles.processCard}>
                <span className={styles.stepNum}>{step.step}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="READY TO DISCUSS YOUR FITNESS PLAN?"
        subtext="Come in for a walkthrough in Rajam, tour our stations, and discuss your workout plan with our trainers."
        buttonLabel="BOOK A VISIT NOW"
        buttonHref="/book-a-visit"
        secondButton={{ label: "View Equipment Directory", href: "/equipment" }}
      />
    </>
  );
}
