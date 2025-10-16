import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CTRL+BUILD - Digital Architecture & Design Studio",
    template: "%s | CTRL+BUILD"
  },
  description: "CTRL+BUILD is a digital architecture and design studio specializing in web design, development, and SEO. We create structured, performant digital experiences built to last.",
  keywords: [
    "web design",
    "web development", 
    "digital architecture",
    "UI/UX design",
    "SEO optimization",
    "Next.js development",
    "brand identity",
    "digital strategy",
    "Romania web design",
    "Craiova web development"
  ],
  authors: [{ name: "CTRL+BUILD" }],
  creator: "CTRL+BUILD",
  publisher: "CTRL+BUILD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ctrlbuild.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ctrlbuild.com',
    title: 'CTRL+BUILD - Digital Architecture & Design Studio',
    description: 'CTRL+BUILD is a digital architecture and design studio specializing in web design, development, and SEO. We create structured, performant digital experiences built to last.',
    siteName: 'CTRL+BUILD',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CTRL+BUILD - Digital Architecture & Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CTRL+BUILD - Digital Architecture & Design Studio',
    description: 'CTRL+BUILD is a digital architecture and design studio specializing in web design, development, and SEO.',
    images: ['/assets/images/og-image.jpg'],
    creator: '@ctrlbuild',
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CTRL+BUILD",
    "description": "Digital architecture and design studio specializing in web design, development, and SEO",
    "url": "https://ctrlbuild.com",
    "logo": "https://ctrlbuild.com/assets/images/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Craiova",
      "addressRegion": "Dolj County",
      "addressCountry": "Romania"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+40-XXX-XXX-XXX",
      "contactType": "customer service",
      "email": "contact@ctrl-build.com"
    },
    "sameAs": [
      "https://linkedin.com/company/ctrlbuild",
      "https://behance.net/ctrlbuild",
      "https://instagram.com/buildwithctrl"
    ],
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Alexandru Popescu",
        "jobTitle": "Founder & Creative Technologist"
      },
      {
        "@type": "Person", 
        "name": "Ziad L.",
        "jobTitle": "Founder & Design Director"
      }
    ],
    "knowsAbout": [
      "Web Design",
      "Web Development", 
      "SEO Optimization",
      "Digital Strategy",
      "UI/UX Design",
      "Brand Identity"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <meta name="theme-color" content="#1E1E1E" />
        <meta name="msapplication-TileColor" content="#1E1E1E" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{ backgroundColor: '#F9F9F7' }}
      >
        <Header />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
