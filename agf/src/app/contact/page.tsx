'use client';

import { useState } from 'react';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/shared/CTASection';
import MapSection from '@/components/shared/MapSection';
import FAQSection from '@/components/shared/FAQSection';
import { SITE_LOCATION, CONTACT_PLACEHOLDERS } from '@/lib/constants';
import { isValidIndianPhone } from '@/lib/booking/schema';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    phone: '',
    email: '',
    topic: 'General Inquiry',
    message: '',
    website_url: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Mandatory: name, phone, topic. Optional: email, message.
    // If anything required is missing we show the field error and do NOT
    // call the API, so Google Sheets never sees an incomplete request.
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number.';
    } else if (!isValidIndianPhone(formData.phone)) {
      errs.phone = 'Enter a valid 10-digit phone number (e.g. 98765 43210).';
    }
    if (!formData.topic) errs.topic = 'Please select an inquiry topic.';
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setError('Please fill in all required fields marked with *.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || '',
          topic: formData.topic,
          message: formData.message,
          website_url: formData.website_url || '',
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSubmitted(true);
        setSubmitting(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          topic: 'General Inquiry',
          message: '',
          website_url: '',
        });
      } else if (data.error === 'validation') {
        setFieldErrors(data.fields || {});
        setError(data.message || 'Please check the form and try again.');
      } else if (data.error === 'rate_limited' || data.error === 'quota_exceeded' || data.error === 'cooldown') {
        // Server busy (rate limit), device cooldown, or today's message limit
        // reached (quota) — the server message already explains what to do.
        setError(data.message || 'We are receiving high traffic right now. Please try again a little later.');
        setSubmitting(false);
      } else {
        setError(data.message || 'We could not process your request. Please try again in a few minutes.');
        setSubmitting(false);
      }
    } catch {
      setError('A network error occurred. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setFieldErrors({});
    setSubmitting(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      topic: 'General Inquiry',
      message: '',
      website_url: '',
    });
  };

  return (
    <>
      <PageHero
        label="CONTACT & LOCATION"
        line1="GET IN TOUCH."
        line2="FIND US IN RAJAM."
        accentWord="RAJAM."
        description="Have questions regarding our commercial machines, personal coaching, or booking a visit? Reach out directly or visit our facility in Rajam, Andhra Pradesh."
      />

      <section className={styles.section} aria-label="Contact Anytime Golden Fitness">
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.infoCol}>
              <SectionLabel>DIRECT CONTACT</SectionLabel>
              <SectionHeading accentWord="INFORMATION">
                FACILITY DETAILS
              </SectionHeading>
              <p className={styles.subtext}>
                We are conveniently located beside Apsara Theatre on Palakonda Road in Rajam for easy daily access.
              </p>

              <div className={styles.cardsList}>
                <div className={styles.card}>
                  <div className={styles.iconCircle}>
                    <MapPin size={22} className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>Location</h3>
                    <p className={styles.cardValue}>{SITE_LOCATION}</p>
                    <span className={styles.cardNote}>Beside Apsara Theatre, Palakonda Road</span>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.iconCircle}>
                    <Clock size={22} className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>Gym Hours</h3>
                    <p className={styles.cardValue}>Morning & Evening Sessions</p>
                    <span className={styles.cardNote}>Monday through Saturday</span>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.iconCircle}>
                    <Phone size={22} className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>Telephone</h3>
                    <p className={styles.cardValue}>{CONTACT_PLACEHOLDERS.phone}</p>
                    <span className={styles.cardNote}>Direct line for inquiries</span>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.iconCircle}>
                    <Mail size={22} className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>Email Support</h3>
                    <p className={styles.cardValue}>{CONTACT_PLACEHOLDERS.email}</p>
                    <span className={styles.cardNote}>Electronic correspondence</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <MessageSquare size={20} className={styles.formHeaderIcon} />
                  <h2 className={styles.formTitle}>Send a Message</h2>
                </div>

                {submitted ? (
                  <div className={styles.successState}>
                    <CheckCircle2 size={48} className={styles.successIcon} />
                    <h3 className={styles.successTitle}>MESSAGE RECEIVED</h3>
                    <p className={styles.successDesc}>
                      Thank you. Your inquiry has been submitted and our team will be in touch with you shortly.
                    </p>
                    <button
                      onClick={handleReset}
                      className={styles.resetBtn}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
                      <label htmlFor="website-url-contact">Website</label>
                      <input
                        type="text"
                        id="website-url-contact"
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
                        <span className={styles.errorIcon}>!</span>
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
                        placeholder="e.g. Ramesh Kumar"
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
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="e.g. ramesh@example.com"
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

                    <div className={styles.formGroup}>
                      <label htmlFor="topic" className={styles.label}>
                        Inquiry Topic <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="topic"
                        value={formData.topic}
                        onChange={(e) =>
                          setFormData({ ...formData, topic: e.target.value })
                        }
                        className={styles.select}
                      >
                        <option value="General Inquiry">General Facility Inquiry</option>
                        <option value="Equipment & Machines">Equipment & Machines</option>
                        <option value="Personal Training">Personal Training Programs</option>
                        <option value="Walkthrough Schedule">Facility Walkthrough</option>
                      </select>
                      {fieldErrors.topic && (
                        <span className={styles.fieldError}>
                          {fieldErrors.topic}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={styles.label}>
                        Message / Questions (Optional)
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us what you would like to know or discuss..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`${styles.textarea} ${fieldErrors.message ? styles.inputError : ''}`}
                        aria-invalid={!!fieldErrors.message}
                        aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      />
                      {fieldErrors.message && (
                        <span id="message-error" className={styles.fieldError}>
                          {fieldErrors.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className={styles.spinner} aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} aria-hidden="true" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapSection showHeading={true} />

      <FAQSection />

      <CTASection
        heading="WANT A PERSONAL TOUR OF THE GYM?"
        subtext="Schedule an in-person walkthrough and our team in Rajam will introduce you to our equipment."
        buttonLabel="BOOK A VISIT NOW"
        buttonHref="/book-a-visit"
      />
    </>
  );
}
