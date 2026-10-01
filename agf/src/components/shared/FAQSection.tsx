'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import styles from './FAQSection.module.css';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'hours',
    question: 'What are the gym operating hours in Rajam?',
    answer:
      'Anytime Golden Fitness operates two dedicated training shifts from Monday through Saturday: Morning sessions (5:30 AM – 10:30 AM) and Evening sessions (4:30 PM – 9:30 PM) to comfortably fit college, business, and working professional schedules. Sunday hours are reserved for facility sanitization, equipment maintenance, and rest.',
  },
  {
    id: 'beginner-support',
    question: 'I am a beginner. Will someone show me how to use the machines?',
    answer:
      'Absolutely. Every newcomer receives an orientation walkthrough with our certified gym trainers. We introduce you to proper seat and pad adjustments, safe weight pin selection, correct range of motion, and breathing mechanics on all our commercial machines.',
  },
  {
    id: 'equipment-inventory',
    question: 'What types of equipment does Anytime Golden Fitness offer?',
    answer:
      'Our facility features a 25-station owner-verified inventory divided into Cardio (motorized treadmills, cross trainers, upright and recumbent cycles, stair steppers), Strength (45° leg press, vertical chest press, pec fly, pullover machine, cable crossover, Smith machine, Graviton Plus, wrist curl), and Free Weights (complete dumbbell sets from 2.5 lb to 80 lb, commercial squat rack, compound row, and preacher curl stations).',
  },
  {
    id: 'book-visit',
    question: 'How do I book a complimentary facility walkthrough?',
    answer:
      'You can schedule an in-person visit through our "Book a Visit" page or send an inquiry directly through our Contact form. We will show you our training zones, demonstrate the machines, and answer any membership questions with zero pressure.',
  },
  {
    id: 'personal-training',
    question: 'Are 1-on-1 personal training and workout plans available?',
    answer:
      'Yes. We offer customized personal coaching packages tailored to your individual goals—whether you want muscle hypertrophy, fat loss, athletic conditioning, or rehabilitation. Our trainers create structured weekly routines and coach you through progressive overload safely.',
  },
  {
    id: 'what-to-bring',
    question: 'What should I bring for my first workout session?',
    answer:
      'Please wear clean indoor sports footwear, comfortable athletic apparel, a personal sweat towel, and a water bottle. We provide clean locker storage and fresh filtered water dispensers on-site.',
  },
];

interface Props {
  title?: string;
  accentWord?: string;
  label?: string;
  subtext?: string;
  items?: FAQItem[];
}

export default function FAQSection({
  title = 'FREQUENTLY ASKED QUESTIONS',
  accentWord = 'QUESTIONS',
  label = 'COMMON INQUIRIES',
  subtext = 'Clear answers to common questions about membership, training shifts, equipment setup, and facility visits at Anytime Golden Fitness.',
  items = DEFAULT_FAQS,
}: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>{label}</SectionLabel>
          <SectionHeading accentWord={accentWord}>
            {title}
          </SectionHeading>
          <p className={styles.subtext}>{subtext}</p>
        </div>

        <div className={styles.accordionList} role="region" aria-label="FAQ accordion">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  className={styles.trigger}
                  onClick={() => toggleItem(item.id)}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.chevronCircle} aria-hidden="true">
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    className={styles.content}
                  >
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.footerHelp}>
          <p className={styles.footerHelpText}>
            Have a question that is not covered above? We are here to help.
          </p>
          <Link href="/contact" className={styles.footerHelpLink}>
            Send us a direct message or visit us in Rajam →
          </Link>
        </div>
      </div>
    </section>
  );
}
