'use client';

import { useState } from 'react';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import SectionHeading from '@/components/shared/SectionHeading';
import CTASection from '@/components/shared/CTASection';
import MapSection from '@/components/shared/MapSection';
import FAQSection from '@/components/shared/FAQSection';
import { SITE_LOCATION, CONTACT_PLACEHOLDERS } from '@/lib/constants';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
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
            {/* Contact Information & Location Cards */}
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

            {/* Interactive Message Form */}
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
                      Thank you, <strong>{formData.name}</strong>. We have received your inquiry regarding &quot;{formData.topic}&quot;. Our team will be in touch with you shortly at <strong>{formData.phone}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', topic: 'General Inquiry', message: '' });
                      }}
                      className={styles.resetBtn}
                    >
                      Send Another Message
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
                        placeholder="e.g. Ramesh Kumar"
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
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="e.g. ramesh@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="topic" className={styles.label}>
                        Inquiry Topic
                      </label>
                      <select
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className={styles.select}
                      >
                        <option value="General Inquiry">General Facility Inquiry</option>
                        <option value="Equipment & Machines">Equipment & Machines</option>
                        <option value="Personal Training">Personal Training Programs</option>
                        <option value="Walkthrough Schedule">Facility Walkthrough</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={styles.label}>
                        Message / Questions
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us what you would like to know or discuss..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={styles.textarea}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <Send size={18} /> Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Google Map with precise Rajam coordinates */}
      <MapSection showHeading={true} />

      {/* Frequently Asked Questions */}
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
