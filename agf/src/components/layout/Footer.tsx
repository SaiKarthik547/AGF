import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/data/nav';
import { SITE_LOCATION, CONTACT_PLACEHOLDERS } from '@/lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>

        {/* -- Column 1: Brand -------------------------------- */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="AGF — Anytime Golden Fitness — Home">
            <div className={styles.logoBadgeWrap}>
              <Image
                src="/agf-badge.svg"
                alt="AGF Emblem"
                width={44}
                height={44}
                className={styles.logoBadgeImg}
              />
            </div>
            <div className={styles.logoTextWrap}>
              <span className={styles.logoMark}>AGF</span>
              <span className={styles.logoFull}>ANYTIME GOLDEN FITNESS</span>
            </div>
          </Link>
          {/* Tagline intentionally omitted — awaiting client confirmation */}
          <p className={styles.brandNote}>
            {/* [Brand tagline — to be confirmed] */}
            A modern, fully-equipped gym in {SITE_LOCATION}.
          </p>
        </div>

        {/* -- Column 2: Navigation --------------------------- */}
        <nav className={styles.navColumn} aria-label="Footer navigation">
          <h3 className={styles.colHeading}>Navigate</h3>
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book-a-visit" className={styles.navLinkCTA}>
                Book a Visit
              </Link>
            </li>
          </ul>
        </nav>

        {/* -- Column 3: Social ------------------------------- */}
        <div className={styles.socialColumn}>
          <h3 className={styles.colHeading}>Follow Us</h3>
          <div className={styles.socialLinks} aria-label="Social media links">
            <a href="#" className={styles.socialItem} target="_blank" rel="noopener noreferrer" aria-label="AGF on Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span>Instagram</span>
            </a>
            <a href="#" className={styles.socialItem} target="_blank" rel="noopener noreferrer" aria-label="AGF on Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              <span>Facebook</span>
            </a>
            <a href="#" className={styles.socialItem} target="_blank" rel="noopener noreferrer" aria-label="AGF on YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              <span>YouTube</span>
            </a>
          </div>
        </div>

        {/* -- Column 4: Contact / Location ------------------- */}
        <address className={styles.contactColumn}>
          <h3 className={styles.colHeading}>Find Us</h3>
          <ul className={styles.contactList} role="list">
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>Location</span>
              <span className={styles.contactValue}>{SITE_LOCATION}</span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>Phone</span>
              <span className={`${styles.contactValue} ${styles.placeholder}`}>
                {CONTACT_PLACEHOLDERS.phone}
              </span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <span className={`${styles.contactValue} ${styles.placeholder}`}>
                {CONTACT_PLACEHOLDERS.email}
              </span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>Hours</span>
              <span className={`${styles.contactValue} ${styles.placeholder}`}>
                {CONTACT_PLACEHOLDERS.hours}
              </span>
            </li>
          </ul>
        </address>

      </div>

      {/* -- Bottom bar ----------------------------------------- */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            &copy; {year} Anytime Golden Fitness. All rights reserved.
          </p>
          <p className={styles.location}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {SITE_LOCATION}
          </p>
        </div>
      </div>
    </footer>
  );
}
