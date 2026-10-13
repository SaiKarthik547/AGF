import type { Metadata } from 'next';
import { MotionConfig } from 'motion/react';
import { oswald, inter } from './fonts';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Premium Gym in Rajam, Andhra Pradesh`,
    template: `%s | Anytime Golden Fitness`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['gym', 'fitness', 'Rajam', 'Andhra Pradesh', 'AGF', 'Anytime Golden Fitness', 'workout', 'equipment'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Gym in Rajam, Andhra Pradesh`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/agf-badge.svg', type: 'image/svg+xml' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable}`}
    >
      <body>
        {/*
          MotionConfig reducedMotion="user" lets motion itself honour the
          OS-level prefers-reduced-motion setting. This replaces per-component
          useReducedMotion() branching, which rendered a DIFFERENT variant on
          the server (opacity 0) vs the client (opacity 1) for reduced-motion
          users and caused a hydration mismatch on every page.
        */}
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
