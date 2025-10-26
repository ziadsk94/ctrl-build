import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CTRL+BUILD | Bespoke Web Design & Headless Development Agency',
  description: 'CTRL+BUILD is a design studio in Romania creating high-performance, bespoke websites. We practice Digital Discipline to build platforms that drive results.',
  keywords: 'bespoke web design, headless development agency, custom website design, web design Romania, agentie web design, UI/UX Romania, developare web, web design Craiova, Awwwards-winning studio',
  authors: [{ name: 'CTRL+BUILD' }],
  creator: 'CTRL+BUILD',
  publisher: 'CTRL+BUILD',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ctrl-build.com',
    siteName: 'CTRL+BUILD',
    title: 'CTRL+BUILD | Bespoke Web Design & Headless Development Agency',
    description: 'CTRL+BUILD is a design studio in Romania creating high-performance, bespoke websites. We practice Digital Discipline to build platforms that drive results.',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CTRL+BUILD - Bespoke Web Design & Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CTRL+BUILD | Bespoke Web Design & Headless Development Agency',
    description: 'CTRL+BUILD is a design studio in Romania creating high-performance, bespoke websites. We practice Digital Discipline to build platforms that drive results.',
    images: ['/assets/images/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};
