'use client';

import { useState } from 'react';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/shared/CTASection';
import FAQSection from '@/components/shared/FAQSection';
import { Calendar, Clock, CheckCircle2, User, Phone, Mail, Target, Sparkles, MapPin } from 'lucide-react';
import styles from './book-a-visit.module.css';

export default function BookAVisitPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: 'Morning (6:00 AM – 10:00 AM)',
    goal: 'Strength Training',
    notes: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) return;
    setConfirmed(true);
  };

  return (
    <>
      <PageHero
        label="SCHEDULE A VISIT"
        line1="EXPERIENCE AGF."
        line2="BOOK YOUR WALKTHROUGH."
        accentWord="WALKTHROUGH."
        description="Schedule an in-person facility walkthrough at Anytime Golden Fitness in Rajam. Inspect our equipment, ask questions, and plan your training with our team."
      />

      <section className={styles.section} aria-label="Book a Visit Form">
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* What to Expect & Information */}
            <div className={styles.infoCol}>
              <SectionLabel>WHAT TO EXPECT</SectionLabel>
              <SectionHeading accentWord="VISIT">
                YOUR FIRST VISIT TO AGF
              </SectionHeading>
              <p className={styles.subtext}>
                We believe in straightforward, transparent fitness. When you come in for a walkthrough in Rajam, there is no high-pressure sales pitch — just a clear introduction to how our gym works.
              </p>

              <div className={styles.expectList}>
                <div className={styles.expectItem}>
                  <div className={styles.iconCircle}>
                    <CheckCircle2 size={20} className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.expectTitle}>Guided Machine Walkthrough</h3>
                    <p className={styles.expectDesc}>
                      See our 25 commercial stations up close and learn how the biomechanical adjustments fit your body.
                    </p>
                  </div>
                </div>

                <div className={styles.expectItem}>
                  <div className={styles.iconCircle}>
                    <Target size={20} className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.expectTitle}>Goal Consultation</h3>
                    <p className={styles.expectDesc}>
                      Discuss what you want to achieve — whether building strength, burning fat, or learning proper technique.
                    </p>
                  </div>
                </div>

                <div className={styles.expectItem}>
                  <div className={styles.iconCircle}>
                    <Clock size={20} className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.expectTitle}>Flexible Timing</h3>
                    <p className={styles.expectDesc}>
                      Choose a convenient morning or evening slot that fits into your daily routine in Rajam.
                    </p>
                  </div>
                </div>
              </div>

              {/* What to bring box */}
              <div className={styles.checklistCard}>
                <h4 className={styles.checklistTitle}>
                  <Sparkles size={16} className={styles.checkIcon} /> What to Bring
                </h4>
                <ul className={styles.checklist}>
                  <li>Comfortable athletic clothing & clean training footwear</li>
                  <li>A personal water bottle</li>
                  <li>Any questions regarding your workout routine or injuries</li>
                </ul>
              </div>
            </div>

            {/* Booking Form Card */}
            <div className={styles.formCol}>
              <div className={styles.bookingCard}>
                <div className={styles.cardHeader}>
                  <Calendar size={22} className={styles.headerIcon} />
                  <div>
                    <h2 className={styles.cardTitle}>Reserve Your Walkthrough</h2>
                    <p className={styles.cardSub}>Zero commitment required</p>
                  </div>
                </div>

                {confirmed ? (
                  <div className={styles.successState}>
                    <div className={styles.successBadge}>
                      <CheckCircle2 size={52} className={styles.successIcon} />
                    </div>
                    <h3 className={styles.successTitle}>VISIT RESERVED!</h3>
                    <p className={styles.successDesc}>
                      Thank you, <strong>{formData.name}</strong>. Your walkthrough request for{' '}
                      <strong>{formData.date}</strong> during the{' '}
                      <strong>{formData.timeSlot}</strong> has been received.
                    </p>
                    <div className={styles.summaryBox}>
                      <div className={styles.summaryRow}>
                        <span>Primary Goal:</span>
                        <strong>{formData.goal}</strong>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Contact Number:</span>
                        <strong>{formData.phone}</strong>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Location:</span>
                        <strong>Beside Apsara Theatre, Rajam</strong>
                      </div>
                    </div>
                    <p className={styles.successNote}>
                      Our team will call or message your phone to confirm your arrival time.
                    </p>
                    <button
                      onClick={() => {
                        setConfirmed(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          date: '',
                          timeSlot: 'Morning (6:00 AM – 10:00 AM)',
                          goal: 'Strength Training',
                          notes: '',
                        });
                      }}
                      className={styles.resetBtn}
                    >
                      Book Another Slot
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>
                        Full Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="e.g. Suresh Varma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>
                          Phone Number <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="e.g. suresh@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="date" className={styles.label}>
                          Preferred Date <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="date"
                          id="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="timeSlot" className={styles.label}>
                          Preferred Time Window
                        </label>
                        <select
                          id="timeSlot"
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className={styles.select}
                        >
                          <option value="Morning (6:00 AM – 10:00 AM)">Morning (6:00 AM – 10:00 AM)</option>
                          <option value="Evening (4:00 PM – 9:00 PM)">Evening (4:00 PM – 9:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="goal" className={styles.label}>
                        Primary Fitness Interest
                      </label>
                      <select
                        id="goal"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className={styles.select}
                      >
                        <option value="Strength Training">Strength & Muscle Development</option>
                        <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                        <option value="Personal Training Guidance">One-on-One Coaching Guidance</option>
                        <option value="General Health & Fitness">General Health & Routine Building</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="notes" className={styles.label}>
                        Notes or Specific Questions (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Any prior gym experience or specific equipment you want to try..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className={styles.textarea}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <Calendar size={18} /> Confirm Walkthrough Reservation
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection />

      <CTASection
        heading="EXPLORE OUR COMPLETE MACHINE LINEUP"
        subtext="Browse all 25 commercial stations across Cardio, Strength, and Free Weights before arriving for your walkthrough."
        buttonLabel="VIEW EQUIPMENT DIRECTORY"
        buttonHref="/equipment"
      />
    </>
  );
}
