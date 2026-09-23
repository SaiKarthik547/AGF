import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { EQUIPMENT } from '@/data/equipment';
import { 
  Dumbbell, 
  Activity, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  ChevronRight, 
  ArrowLeft,
  Sliders
} from 'lucide-react';
import CTASection from '@/components/shared/CTASection';
import EquipmentViewer from './EquipmentViewer';
import styles from './equipment-detail.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EQUIPMENT.map((machine) => ({
    slug: machine.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = EQUIPMENT.find((m) => m.slug === slug);
  if (!machine) return { title: 'Machine Not Found' };

  return {
    title: `${machine.name} | Anytime Golden Fitness Equipment`,
    description: machine.shortDescription,
  };
}

export default async function EquipmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const machine = EQUIPMENT.find((m) => m.slug === slug);

  if (!machine) {
    notFound();
  }

  // Find related machines in same category
  const related = EQUIPMENT
    .filter((m) => m.category === machine.category && m.slug !== machine.slug)
    .slice(0, 3);

  return (
    <article className={styles.article}>
      {/* Breadcrumb & Navigation Bar */}
      <div className={styles.topNav}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.crumb}>Home</Link>
            <ChevronRight size={14} className={styles.crumbDivider} />
            <Link href="/equipment" className={styles.crumb}>Equipment</Link>
            <ChevronRight size={14} className={styles.crumbDivider} />
            <span className={styles.crumbActive}>{machine.name}</span>
          </div>
          <Link href="/equipment" className={styles.backBtn}>
            <ArrowLeft size={16} /> All Stations
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        {/* Header Block */}
        <header className={styles.header}>
          <span className={styles.categoryBadge}>{machine.category}</span>
          <h1 className={styles.title}>{machine.name}</h1>
          <p className={styles.subtitle}>{machine.shortDescription}</p>
        </header>

        {/* Main Grid: Machine Viewer & Specs */}
        <div className={styles.mainGrid}>
          {/* Left Column: Visual Station Viewer with Interactive Hotspots */}
          <div className={styles.viewerCol}>
            <EquipmentViewer machine={machine} />
          </div>

          {/* Right Column: Muscles & Specifications */}
          <div className={styles.specsCol}>
            {/* Targeted Muscles */}
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <Activity size={18} className={styles.panelIcon} />
                Target Muscles
              </h2>
              <div className={styles.muscleList}>
                {machine.muscles.map((muscle, idx) => (
                  <div key={idx} className={styles.muscleRow}>
                    <span className={muscle.isPrimary ? styles.primaryDot : styles.secondaryDot} />
                    <span className={styles.muscleName}>{muscle.label}</span>
                    <span className={muscle.isPrimary ? styles.primaryTag : styles.secondaryTag}>
                      {muscle.isPrimary ? 'Primary' : 'Secondary'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Specs */}
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <Sliders size={18} className={styles.panelIcon} />
                Specifications
              </h2>
              <dl className={styles.specList}>
                {machine.specifications.map((spec, idx) => (
                  <div key={idx} className={styles.specRow}>
                    <dt className={styles.specLabel}>{spec.label}</dt>
                    <dd className={styles.specValue}>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <section className={styles.detailsSection}>
          <h2 className={styles.sectionHeading}>About This Machine</h2>
          <div className={styles.descriptionText}>
            {machine.description.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Usage Steps Guide */}
        <section className={styles.stepsSection}>
          <h2 className={styles.sectionHeading}>How to Use This Station</h2>
          <div className={styles.stepsGrid}>
            {machine.usageSteps.map((s) => (
              <div key={s.step} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.step}</div>
                <h3 className={styles.stepTitle}>{s.instruction}</h3>
                <p className={styles.stepDetail}>{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips & Safety Alerts */}
        <section className={styles.alertsSection}>
          <div className={styles.tipBox}>
            <div className={styles.alertHeader}>
              <HelpCircle size={20} className={styles.tipIcon} />
              <h3 className={styles.alertTitle}>Beginner Form Tip</h3>
            </div>
            <p className={styles.alertText}>{machine.beginnerTip}</p>
          </div>

          <div className={styles.safetyBox}>
            <div className={styles.alertHeader}>
              <AlertTriangle size={20} className={styles.safetyIcon} />
              <h3 className={styles.alertTitle}>Safety & Alignment Note</h3>
            </div>
            <p className={styles.alertText}>{machine.safetyNote}</p>
          </div>
        </section>

        {/* Benefits List */}
        <section className={styles.benefitsSection}>
          <h2 className={styles.sectionHeading}>Performance Benefits</h2>
          <div className={styles.benefitsGrid}>
            {machine.benefits.map((benefit, i) => (
              <div key={i} className={styles.benefitItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Related Machines in same category */}
        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionHeading}>More {machine.category} Stations</h2>
            <div className={styles.relatedGrid}>
              {related.map((rel) => (
                <Link key={rel.id} href={`/equipment/${rel.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedIcon}>
                    <Dumbbell size={24} />
                  </div>
                  <div>
                    <h3 className={styles.relatedTitle}>{rel.name}</h3>
                    <span className={styles.relatedLinkText}>View Guide →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CTASection
        heading={`TRY THE ${machine.name.toUpperCase()} IN RAJAM`}
        subtext="Our trainers at Anytime Golden Fitness will guide you through proper seat positioning and execution."
        buttonLabel="BOOK A VISIT NOW"
        buttonHref="/book-a-visit"
        secondButton={{ label: "Back to All Equipment", href: "/equipment" }}
      />
    </article>
  );
}
