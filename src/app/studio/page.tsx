import StudioClient from '@/components/StudioClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Studio - Digital Architecture Philosophy",
  description: "Discover CTRL+BUILD's manifesto: structure creates freedom. Learn about our principles, toolkit, and approach to digital architecture and design.",
  keywords: [
    "digital architecture philosophy",
    "web design principles",
    "development approach",
    "design manifesto",
    "creative process",
    "digital strategy",
    "Next.js development",
    "Cloudflare deployment"
  ],
  openGraph: {
    title: "Our Studio - Digital Architecture Philosophy | CTRL+BUILD",
    description: "Discover CTRL+BUILD's manifesto: structure creates freedom. Learn about our principles, toolkit, and approach to digital architecture and design.",
    url: "https://ctrlbuild.com/studio",
    type: "website",
  },
  alternates: {
    canonical: "/studio",
  },
};

export default function StudioPage() {
  return <StudioClient />;
}