import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const syne = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Syne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Syne-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Syne-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Syne-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Syne-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-syne',
});

const fraunces = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Fraunces_72pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Fraunces_72pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ctrl-build.com'),
  title: 'CTRL+BUILD | Bespoke Web Design & Development Agency',
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
  alternates: {
    canonical: 'https://ctrl-build.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ctrl-build.com',
    siteName: 'CTRL+BUILD',
    title: 'CTRL+BUILD | Bespoke Web Design & Development Agency',
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
    title: 'CTRL+BUILD | Bespoke Web Design & Development Agency',
    description: 'CTRL+BUILD is a design studio in Romania creating high-performance, bespoke websites. We practice Digital Discipline to build platforms that drive results.',
    images: ['/assets/images/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Google Analytics - Load with defer to prevent render blocking */}
        <script 
          src="https://www.googletagmanager.com/gtag/js?id=G-RWE7TFWDRQ"
          defer
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RWE7TFWDRQ', { 'anonymize_ip': true });
            `,
          }}
        />
        
        {/* Preload critical fonts for LCP optimization */}
        <link
          rel="preload"
          href="/assets/fonts/Syne-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/Fraunces_72pt-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* Preload hero images for LCP */}
        <link
          rel="preload"
          href="/assets/images/projects/ipower/featured.png"
          as="image"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body
        className={`${syne.variable} ${fraunces.variable} font-syne antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
