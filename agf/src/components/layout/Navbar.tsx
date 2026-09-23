'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X, Calendar } from 'lucide-react';
import { NAV_LINKS } from '@/data/nav';
import { NAVBAR_SCROLL_THRESHOLD } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  mobileNavOverlay,
  mobileNavContainer,
  mobileNavLinks,
  mobileNavLink,
  instantVariant,
} from '@/lib/animations';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* -- Scroll handler ---------------------------------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAVBAR_SCROLL_THRESHOLD);
    onScroll(); // check on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* -- Lock body scroll when menu is open ------------------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* -- Close menu on route change --------------------------- */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* -- Keyboard: Escape closes menu ------------------------- */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const overlayVariant  = prefersReduced ? instantVariant : mobileNavOverlay;
  const containerVariant = prefersReduced ? instantVariant : mobileNavContainer;
  const linksVariant    = prefersReduced ? instantVariant : mobileNavLinks;
  const linkVariant     = prefersReduced ? instantVariant : mobileNavLink;

  return (
    <>
      <header
        className={cn(styles.navbar, scrolled && styles.navbarScrolled)}
        role="banner"
      >
        <div className={styles.inner}>
          {/* -- Logo ----------------------------------------- */}
          <Link href="/" className={styles.logo} aria-label="AGF — Anytime Golden Fitness — Home">
            <div className={styles.logoBadgeWrap}>
              <Image
                src="/agf-badge.svg"
                alt="AGF Emblem"
                width={36}
                height={36}
                className={styles.logoBadgeImg}
                priority
              />
            </div>
            <div className={styles.logoTextWrap}>
              <span className={styles.logoMark}>AGF</span>
              <span className={styles.logoFull}>ANYTIME GOLDEN FITNESS</span>
            </div>
          </Link>

          {/* -- Desktop Navigation --------------------------- */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList} role="list">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(styles.navLink, isActive && styles.navLinkActive)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                      {isActive && (
                        <span className={styles.activeIndicator} aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* -- Desktop CTA + Social Icons ------------------- */}
          <div className={styles.actions}>
            <div className={styles.socialLinks} aria-label="Social media">
              <a href="#" aria-label="AGF on Instagram" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="AGF on Facebook" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="AGF on YouTube" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>

            <Link href="/book-a-visit" className={styles.ctaButton}>
              <Calendar size={16} aria-hidden="true" />
              <span>Book a Visit</span>
            </Link>

            {/* -- Hamburger (mobile only) ------------------- */}
            <button
              ref={menuButtonRef}
              className={styles.hamburger}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* -- Mobile Navigation Overlay ------------------------ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.mobileBackdrop}
              variants={overlayVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-nav"
              className={styles.mobileNav}
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-label="Mobile navigation"
            >
              <motion.ul
                className={styles.mobileNavList}
                variants={linksVariant}
                initial="hidden"
                animate="visible"
                role="list"
              >
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(link.href);
                  return (
                    <motion.li key={link.href} variants={linkVariant}>
                      <Link
                        href={link.href}
                        className={cn(
                          styles.mobileNavLink,
                          isActive && styles.mobileNavLinkActive,
                        )}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Mobile CTA */}
              <motion.div
                className={styles.mobileCTA}
                variants={linkVariant}
              >
                <Link
                  href="/book-a-visit"
                  className={styles.mobileCTAButton}
                  onClick={() => setMenuOpen(false)}
                >
                  <Calendar size={18} aria-hidden="true" />
                  <span>Book a Visit</span>
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
