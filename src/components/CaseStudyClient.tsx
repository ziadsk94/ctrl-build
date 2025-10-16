'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import StartConversation from '@/components/StartConversation';

export default function CaseStudyClient() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Observer logic if needed
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Get project data based on URL slug
  const getProjectData = () => {
    const pathname = window.location.pathname;
    const slug = pathname.split('/').pop();
    
    if (slug === 'aetier') {
      return {
        title: 'AETIER',
        client: 'AETIER',
        services: 'Brand Strategy, Digital Experience, Web Development',
        year: '2025',
        liveUrl: 'https://aetier.pages.dev',
        challenge: 'AETIER needed to establish a distinctive brand identity in the competitive brand strategy space. The challenge was to create a digital experience that would communicate their philosophy of "Signal Over Noise" - distilling complexity into clarity for leaders of category-defining companies. The website needed to reflect their refined, minimalist approach while showcasing their expertise in brand strategy, digital experience, and content creation.',
        colorPalette: [
          { name: 'Charcoal', hex: '#1E1E1E', color: '#1E1E1E' },
          { name: 'Stone', hex: '#A1A1A5', color: '#A1A1A5' },
          { name: 'Alabaster', hex: '#F9F9F7', color: '#F9F9F7' },
          { name: 'Accent', hex: '#3A4B40', color: '#3A4B40' }
        ],
        typography: [
          { name: 'H1', font: 'Tiempos Headline', size: '80px', weight: 'Bold' },
          { name: 'H2', font: 'Tiempos Headline', size: '64px', weight: 'Bold' },
          { name: 'Body', font: 'Satoshi', size: '18px', weight: 'Regular' },
          { name: 'Caption', font: 'Satoshi', size: '14px', weight: 'Medium' }
        ],
        wireframes: [
          '/assets/images/wireframe-1.png', // Placeholder
          '/assets/images/wireframe-2.png', // Placeholder
        ],
        buildImages: [
          { src: '/assets/images/featured-4.png', alt: 'AETIER Website Desktop View', caption: 'Clean, minimalist design showcasing brand strategy expertise' },
          { src: '/assets/images/Screenshot (17).png', alt: 'AETIER Website Interaction Demo', caption: 'Smooth animations and refined user experience' },
        ],
        metrics: [
          { value: '50+', label: 'Brand Strategies Delivered' },
          { value: '100%', label: 'Client Retention Rate' },
          { value: '3x', label: 'Brand Recognition Growth' }
        ],
        testimonial: '"AETIER has a unique ability to distill complexity into its most elegant and effective form. They didn\'t just give us a new website; they gave us a language and a platform that finally articulated our true value in the market. The clarity they provided has been foundational to our growth."',
        testimonialAuthor: 'Julian Hayes, Founder & CEO, Arcsecond'
      };
    }
    
    // Default to iPower project
    return {
      title: 'iPower',
      client: 'iPower',
      services: 'Web Design, Development, SEO',
      year: '2025',
      liveUrl: 'https://ipower-9xk.pages.dev',
      challenge: 'iPower needed to establish a strong digital presence in Lebanon\'s electrical engineering solutions market. The challenge was to create a professional web platform that would showcase their 15+ years of experience, attract clients across Lebanon\'s diverse industries (residential, commercial, and industrial), and demonstrate their expertise in electrical systems, solar solutions, and automation.',
      colorPalette: [
        { name: 'Primary', hex: '#007577', color: '#007577' },
        { name: 'Secondary', hex: '#E68E27', color: '#E68E27' },
        { name: 'Accent', hex: '#939C98', color: '#939C98' },
        { name: 'Background', hex: '#FFFFFF', color: '#FFFFFF' }
      ],
      typography: [
        { name: 'H1', font: 'Polly Rounded', size: '64px', weight: 'Bold' },
        { name: 'H2', font: 'Polly Rounded', size: '48px', weight: 'Regular' },
        { name: 'Body', font: 'Polly Rounded', size: '16px', weight: 'Light' },
        { name: 'Caption', font: 'Polly Rounded', size: '14px', weight: 'Thin' }
      ],
      wireframes: [
        '/assets/images/wireframe-1.png', // Placeholder
        '/assets/images/wireframe-2.png', // Placeholder
      ],
      buildImages: [
        { src: '/assets/images/featured-2.png', alt: 'iPower Website Desktop Mockup', caption: 'High-resolution device mockup showcasing responsive design' },
        { src: '/assets/images/Screenshot (15).png', alt: 'iPower Website Interaction Demo', caption: 'Screen recording demonstrating key animations and features' },
      ],
      metrics: [
        { value: '100+', label: 'Electrical Projects Completed' },
        { value: '15+', label: 'Years of Experience' },
        { value: '98%', label: 'Client Satisfaction Score' }
      ],
      testimonial: '"The new website perfectly showcases our electrical engineering expertise across Lebanon and has significantly improved our online visibility. CTRL+BUILD understood our mission to empower Lebanon with reliable electrical systems."',
      testimonialAuthor: 'iPower Team, Lebanon'
    };
  };

  const project = getProjectData();

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-alabaster">
      {/* Hero Section */}
      <HeroSection
        project={project}
        scrollY={scrollY}
        heroRef={heroRef}
      />

      {/* The Brief */}
      <BriefSection project={project} />

      {/* The Blueprint */}
      <BlueprintSection project={project} />

      {/* The Build */}
      <BuildSection />

      {/* The Impact */}
      <ImpactSection project={project} />

      {/* Start a Conversation / Footer */}
      <StartConversationSection />
    </div>
  );
}

interface Project {
  title: string;
  client: string;
  services: string;
  year: string;
  liveUrl: string;
  challenge: string;
  colorPalette: Array<{ name: string; hex: string; color: string }>;
  typography: Array<{ name: string; font: string; size: string; weight: string }>;
  metrics: Array<{ value: string; label: string }>;
  testimonial: string;
  testimonialAuthor: string;
}

function HeroSection({
  project,
  scrollY,
  heroRef
}: {
  project: Project;
  scrollY: number;
  heroRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Hero Video */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="w-full h-full bg-studio-green flex items-center justify-center">
          <img
            src="/assets/images/featured-2.png"
            alt="iPower Project Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Title Reveal */}
      <div
        className={`absolute inset-0 bg-alabaster transition-opacity duration-1000 ${
          scrollY > 200 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-tiempos text-charcoal text-8xl md:text-9xl font-bold mb-8">
              {project.title}
            </h1>
            <div className="space-y-4">
              <p className="font-satoshi text-charcoal text-lg">
                <span className="font-medium">Client:</span> {project.client}
              </p>
              <p className="font-satoshi text-charcoal text-lg">
                <span className="font-medium">Services:</span> {project.services}
              </p>
              <p className="font-satoshi text-charcoal text-lg">
                <span className="font-medium">Year:</span> {project.year}
              </p>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-satoshi text-sm text-charcoal hover:text-studio-green transition-colors duration-300 relative group mt-4"
              >
                VISIT LIVE SITE
                <span className="absolute bottom-0 left-0 w-0 h-px bg-studio-green transition-all duration-250 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BriefSection({ project }: { project: Project }) {
  return (
    <section className="py-24 bg-alabaster">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <h2 className="font-tiempos text-charcoal text-5xl font-bold mb-8">
              The Brief
            </h2>
            <p className="font-satoshi text-charcoal text-lg leading-relaxed">
              {project.challenge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlueprintSection({ project }: { project: Project }) {
  return (
    <section className="py-24 bg-stone/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Color Palette */}
          <div className="md:col-span-6">
            <h3 className="font-tiempos text-charcoal text-3xl font-bold mb-8">
              Color Palette
            </h3>
            <div className="space-y-4">
              {project.colorPalette.map((color: { name: string; hex: string; color: string }, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 rounded-lg border border-stone/20"
                    style={{ backgroundColor: color.color }}
                  />
                  <div>
                    <div className="font-satoshi text-charcoal font-medium">{color.name}</div>
                    <div className="font-mono text-stone text-sm">{color.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="md:col-span-6">
            <h3 className="font-tiempos text-charcoal text-3xl font-bold mb-8">
              Typography
            </h3>
            <div className="space-y-6">
              {project.typography.map((type: { name: string; font: string; size: string; weight: string }, index: number) => (
                <div key={index} className="border-b border-stone/20 pb-4">
                  <div className="font-satoshi text-stone text-sm mb-2">{type.name}</div>
                  <div
                    className="font-tiempos text-charcoal"
                    style={{
                      fontSize: type.size.replace('px', 'px'),
                      fontWeight: type.weight.toLowerCase()
                    }}
                  >
                    {type.font} {type.size} {type.weight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildSection() {
  return (
    <section className="py-24 bg-alabaster">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="font-tiempos text-charcoal text-3xl font-bold mb-16 text-center">
          The Build
        </h3>

        <div className="space-y-24">
          {/* Featured Image */}
          <div className="relative">
            <img
              src="/assets/images/featured-2.png"
              alt="iPower Website Desktop Mockup"
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-alabaster/90 px-4 py-2 rounded">
              <p className="font-satoshi text-stone italic text-sm">High-resolution device mockup showcasing responsive design</p>
            </div>
          </div>

          {/* Interaction Demo */}
          <div className="relative">
            <img
              src="/assets/images/Screenshot (15).png"
              alt="iPower Website Interaction Demo"
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-alabaster/90 px-4 py-2 rounded">
              <p className="font-satoshi text-stone italic text-sm">Screen recording demonstrating key animations and features</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection({ project }: { project: Project }) {
  return (
    <section className="py-24 bg-stone/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <h3 className="font-tiempos text-charcoal text-3xl font-bold mb-8">
              The Impact
            </h3>
            
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {project.metrics.map((metric: { value: string; label: string }, index: number) => (
                <div key={index} className="text-center">
                  <div className="font-tiempos text-charcoal text-4xl font-bold mb-2">
                    {metric.value}
                  </div>
                  <div className="font-satoshi text-stone text-sm">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-alabaster p-8 rounded-lg">
              <blockquote className="font-satoshi text-charcoal text-lg italic mb-4">
                {project.testimonial}
              </blockquote>
              <cite className="font-satoshi text-stone text-sm">
                — {project.testimonialAuthor}
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StartConversationSection() {
  return <StartConversation />;
}
