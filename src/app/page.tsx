import { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import BrandStatement from '@/components/BrandStatement';
import CoreServices from '@/components/CoreServices';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { organizationSchema, serviceSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'CTRL+BUILD | Bespoke Web Design & Headless Development Agency',
  description: 'CTRL+BUILD is a design studio in Romania creating high-performance, bespoke websites. We practice Digital Discipline to build platforms that drive results.',
  keywords: 'bespoke web design, headless development agency, custom website design, web design Romania, agentie web design, UI/UX Romania, developare web, web design Craiova, Awwwards-winning studio',
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      
      <div className="min-h-screen bg-cream">
      <Header />
          <main>
            <Hero />
            <FeaturedWork />
            <BrandStatement />
            <CoreServices />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      </>
    );
  }
