import type { Metadata } from 'next';
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
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
