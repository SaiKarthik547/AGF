'use client';

import { useState } from 'react';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/shared/CTASection';
import FAQSection from '@/components/shared/FAQSection';
import { isValidIndianPhone } from '@/lib/booking/schema';
import { Calendar, Clock, CheckCircle2, User, Phone, Mail, Target, Sparkles, MapPin } from 'lucide-react';
import styles from './book-a-visit.module.css';

// Current date in YYYY-MM-DD format for the min attribute
const today = new Date().toISOString().split('T')[0];

export default function BookAVisitPage() {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: 'Morning (6:00 AM – 10:00 AM)',
    goal: 'Strength Training',
    notes: '',
    // Honeypot field — hidden from real users, filled by bots
    website_url: '',
  });
  const [confirmed, setConfirmed] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Client-side check for all mandatory fields (backend is authoritative).
    // If anything is missing we show the field error and do NOT call the API,
    // so Google Sheets never sees an incomplete request.
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number.';
    } else if (!isValidIndianPhone(formData.phone)) {
      errs.phone = 'Enter a valid 10-digit phone number (e.g. 98765 43210).';
    }
    if (!formData.date) errs.date = 'Please choose a visit date.';
    if (!formData.timeSlot) errs.timeSlot = 'Please select a time window.';
    if (!formData.goal) errs.goal = 'Please select a fitness interest.';
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setError('Please fill in all required fields marked with *.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || '',
          date: formData.date,
          timeSlot: formData.timeSlot,
          goal: formData.goal,
          notes: formData.notes || '',
          // Honeypot — should be empty for real users
          website_url: formData.website_url || '',
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setConfirmed(true);
        setReference(typeof data.reference === 'string' ? data.reference : null);
        setSubmitting(false);
        // Clear the form data on success
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          timeSlot: 'Morning (6:00 AM – 10:00 AM)',
          goal: 'Strength Training',
          notes: '',
          website_url: '',
        });
      } else if (data.error === 'validation') {
        // Show field-level errors if available
        setFieldErrors(data.fields || {});
        setError(data.message || 'Please check the form and try again.');
      } else if (data.error === 'rate_limited' || data.error === 'quota_exceeded' || data.error === 'cooldown') {
        // Server busy (rate limit), device cooldown, or today's slots are
        // full (quota) — the server message already explains what to do.
        setError(data.message || 'We are receiving high traffic right now. Please try again a little later.');
        setSubmitting(false);
      } else {
        // Service unavailable or other error
        setError(data.message || 'We could not process your request. Please try again in a few minutes.');
        setSubmitting(false);
      }
    } catch {
      setError('A network error occurred. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmed(false);
    setReference(null);
    setError(null);
    setFieldErrors({});
    setSubmitting(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      timeSlot: 'Morning (6:00 AM – 10:00 AM)',
      goal: 'Strength Training',
      notes: '',
      website_url: '',
    });
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
                    <h3 className={styles.successTitle}>REQUEST RECEIVED</h3>
                    <p className={styles.successDesc}>
                      Thank you. Your walkthrough request has been submitted and our team will contact you to confirm your arrival time.
                    </p>
                    <div className={styles.summaryBox}>
                      <div className={styles.summaryRow}>
                        <span>Reference:</span>
                        <strong>{reference ?? '—'}</strong>
                      </div>
                    </div>
                    <p className={styles.successNote}>
                      A team member will call or message your phone to confirm your arrival time.
                    </p>
                    <button
                      onClick={handleReset}
                      className={styles.resetBtn}
                    >
                      Book Another Slot
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    {/* Honeypot field — visually hidden, filled by bots */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-9999px',
                        top: '-9999px',
                        opacity: 0,
                        height: 0,
                        width: 0,
                        overflow: 'hidden',
                      }}
                      aria-hidden="true"
                    >
                      <label htmlFor="website-url">Website</label>
                      <input
                        type="text"
                        id="website-url"
                        name="website_url"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website_url}
                        onChange={(e) =>
                          setFormData({ ...formData, website_url: e.target.value })
                        }
                        placeholder="https://"
                      />
                    </div>

                    {error && (
                      <div className={styles.errorMessage} role="alert">
                        <span className={styles.errorIcon}>⚠</span>
                        {error}
                      </div>
                    )}

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
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      />
                      {fieldErrors.name && (
                        <span id="name-error" className={styles.fieldError}>
                          {fieldErrors.name}
                        </span>
                      )}
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
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={`${styles.input} ${fieldErrors.phone ? styles.inputError : ''}`}
                          aria-invalid={!!fieldErrors.phone}
                          aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                        />
                        {fieldErrors.phone && (
                          <span id="phone-error" className={styles.fieldError}>
                            {fieldErrors.phone}
                          </span>
                        )}
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
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
                          aria-invalid={!!fieldErrors.email}
                          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        />
                        {fieldErrors.email && (
                          <span id="email-error" className={styles.fieldError}>
                            {fieldErrors.email}
                          </span>
                        )}
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
                          min={today}
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className={`${styles.input} ${fieldErrors.date ? styles.inputError : ''}`}
                          aria-invalid={!!fieldErrors.date}
                          aria-describedby={fieldErrors.date ? 'date-error' : undefined}
                        />
                        {fieldErrors.date && (
                          <span id="date-error" className={styles.fieldError}>
                            {fieldErrors.date}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="timeSlot" className={styles.label}>
                          Preferred Time Window <span className={styles.required}>*</span>
                        </label>
                        <select
                          id="timeSlot"
                          value={formData.timeSlot}
                          onChange={(e) =>
                            setFormData({ ...formData, timeSlot: e.target.value })
                          }
                          className={`${styles.select} ${fieldErrors.timeSlot ? styles.inputError : ''}`}
                          aria-invalid={!!fieldErrors.timeSlot}
                        >
                          <option value="Morning (6:00 AM – 10:00 AM)">
                            Morning (6:00 AM – 10:00 AM)
                          </option>
                          <option value="Evening (4:00 PM – 9:00 PM)">
                            Evening (4:00 PM – 9:00 PM)
                          </option>
                        </select>
                        {fieldErrors.timeSlot && (
                          <span className={styles.fieldError}>
                            {fieldErrors.timeSlot}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="goal" className={styles.label}>
                        Primary Fitness Interest <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="goal"
                        value={formData.goal}
                        onChange={(e) =>
                          setFormData({ ...formData, goal: e.target.value })
                        }
                        className={`${styles.select} ${fieldErrors.goal ? styles.inputError : ''}`}
                        aria-invalid={!!fieldErrors.goal}
                      >
                        <option value="Strength Training">
                          Strength & Muscle Development
                        </option>
                        <option value="Fat Loss & Conditioning">
                          Fat Loss & Conditioning
                        </option>
                        <option value="Personal Training Guidance">
                          One-on-One Coaching Guidance
                        </option>
                        <option value="General Health & Fitness">
                          General Health & Routine Building
                        </option>
                      </select>
                      {fieldErrors.goal && (
                        <span className={styles.fieldError}>
                          {fieldErrors.goal}
                        </span>
                      )}
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
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className={styles.textarea}
                      />
                    </div>                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className={styles.spinner} aria-hidden="true" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar size={18} aria-hidden="true" />
                          Confirm Walkthrough Reservation
                        </>
                      )
                    }
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
