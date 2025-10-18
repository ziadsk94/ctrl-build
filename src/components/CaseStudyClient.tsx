'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import StartConversation from '@/components/StartConversation';

export default function CaseStudyClient({ slug }: { slug: string }) {
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

  // Get project data based on slug prop
  const getProjectData = () => {
    if (slug === 'aetier') {
      return {
        title: 'AETIER',
        client: 'AETIER',
        services: 'Brand Strategy, Digital Experience, Web Development',
        year: '2025',
        liveUrl: 'https://aetier.pages.dev',
        challenge: 'AETIER needed to establish a distinctive brand identity in the competitive brand strategy space. The challenge was to create a digital experience that would communicate their philosophy of "Signal Over Noise" - distilling complexity into clarity for leaders of category-defining companies. The website needed to reflect their refined, minimalist approach while showcasing their expertise in brand strategy, digital experience, and content creation.',
        colorPalette: [
          { name: 'Cream', hex: '#F8F7F5', color: '#F8F7F5' },
          { name: 'Charcoal', hex: '#1A1A1A', color: '#1A1A1A' },
          { name: 'Light Gray', hex: '#EAEAEA', color: '#EAEAEA' },
          { name: 'Medium Gray', hex: '#A3A3A3', color: '#A3A3A3' },
          { name: 'Terracotta', hex: '#B5654A', color: '#B5654A' }
        ],
        typography: [
          { name: 'H1', font: 'Canela Deck', size: '80px', weight: 'Bold' },
          { name: 'H2', font: 'Canela Deck', size: '64px', weight: 'Bold' },
          { name: 'Body', font: 'Satoshi', size: '18px', weight: 'Regular' },
          { name: 'Caption', font: 'Satoshi', size: '14px', weight: 'Medium' },
          { name: 'Code', font: 'IBM Plex Mono', size: '14px', weight: 'Regular' }
        ],
        wireframes: [
          '/assets/images/wireframe-1.png', // Placeholder
          '/assets/images/wireframe-2.png', // Placeholder
        ],
        buildImages: [
          { src: '/assets/images/aetier-mockup-iphone.png', alt: 'AETIER Website Mobile View', caption: 'High-resolution device mockup showcasing responsive design' },
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
    
    if (slug === 'gaplens') {
      return {
        title: 'GapLens',
        client: 'GapLens',
        services: 'Web Design, Development, Brand Identity',
        year: '2025',
        liveUrl: 'https://gaplens.com',
        challenge: 'GapLens needed to establish a distinctive digital presence that would capture the essence of their photographic philosophy - "capturing the space between the light and the shadow." The challenge was to create a website that would reflect their minimalist, contemplative approach to photography while showcasing their archive of work. The site needed to embody their philosophy of finding depth in silence and structure, creating an immersive experience that would allow visitors to explore their photographic journey.',
        colorPalette: [
          { name: 'Gallery White', hex: '#F9F9F9', color: '#F9F9F9' },
          { name: 'Signature Ink', hex: '#1C1C1C', color: '#1C1C1C' },
          { name: 'Whisper Grey', hex: '#C7C7C7', color: '#C7C7C7' },
          { name: 'Archive Sepia', hex: '#B8B0A8', color: '#B8B0A8' }
        ],
        typography: [
          { name: 'H1', font: 'Garamond Premier Pro', size: '72px', weight: 'Bold' },
          { name: 'H2', font: 'Garamond Premier Pro', size: '64px', weight: 'Bold' },
          { name: 'Body', font: 'Suisse Int\'l', size: '18px', weight: 'Regular' },
          { name: 'Caption', font: 'Suisse Int\'l', size: '14px', weight: 'Medium' },
          { name: 'Navigation', font: 'Suisse Int\'l', size: '16px', weight: 'Medium' }
        ],
        wireframes: [
          '/assets/images/wireframe-1.png', // Placeholder
          '/assets/images/wireframe-2.png', // Placeholder
        ],
        buildImages: [
          { src: '/assets/images/featured-5.png', alt: 'GapLens Website Desktop View', caption: 'High-resolution desktop mockup showcasing the minimalist design' },
          { src: '/assets/images/Screenshot (24).png', alt: 'GapLens Website Interaction Demo', caption: 'Smooth animations and contemplative user experience' },
        ],
        metrics: [
          { value: '100+', label: 'Photographic Works Archived' },
          { value: '95%', label: 'User Engagement Rate' },
          { value: '2.5x', label: 'Time Spent on Site' }
        ],
        testimonial: '"The new website perfectly captures our philosophy of finding depth in silence. CTRL+BUILD understood our vision of creating a space where visitors can truly contemplate our work. The design allows the photographs to speak for themselves while providing an elegant framework for exploration."',
        testimonialAuthor: 'GapLens Studio Team'
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
      <BuildSection project={project} />

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
  buildImages: Array<{ src: string; alt: string; caption: string }>;
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
            src={
              project.title === 'AETIER' ? '/assets/images/featured-4.png' :
              project.title === 'GapLens' ? '/assets/images/featured-5.png' :
              '/assets/images/featured-2.png'
            }
            alt={`${project.title} Project Hero`}
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

function BuildSection({ project }: { project: Project }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleEntries, setVisibleEntries] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = sectionRef.current.offsetHeight;
        
        // Calculate scroll progress (0 to 1)
        const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
        setScrollProgress(progress);
        
        // Determine visible entries based on scroll progress
        const entries = getProjectLogEntries(project);
        const visible = [];
        for (let i = 0; i < entries.length; i++) {
          const entryThreshold = (i + 1) / entries.length;
          if (progress >= entryThreshold - 0.3) {
            visible.push(i);
          }
        }
        setVisibleEntries(visible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [project]);

  const getProjectLogEntries = (project: Project) => {
    if (project.title === 'GapLens') {
      return [
        {
          phase: 'PHASE 01: THE FOUNDATION',
          content: 'The client&apos;s core challenge was creating a digital space that would embody their photographic philosophy of "capturing the space between the light and the shadow." Our first move wasn&apos;t design; it was understanding their contemplative approach to photography. We selected a minimalist architecture using Next.js for its performance and SEO capabilities, ensuring the photographs would load instantly and be discoverable.',
          technical: ['Next.js', 'SEO optimization', 'performance-first']
        },
        {
          phase: 'PHASE 02: THE VISUAL LANGUAGE',
          content: 'Typography became the primary design element. We chose Garamond Premier Pro for its classical elegance and Suisse Int&apos;l for its modern clarity. The color palette was deliberately restrained: Gallery White, Signature Ink, Whisper Grey, and Archive Sepia. This monochromatic approach would let the photographs speak without visual interference.',
          technical: ['Garamond Premier Pro', 'Suisse Int\'l', 'monochromatic palette']
        },
        {
          phase: 'PHASE 03: THE EXPERIENCE',
          content: 'The final challenge was creating an interface that would encourage contemplation. We implemented smooth scroll animations and carefully orchestrated reveal sequences. Every interaction was designed to feel intentional and unhurried, mirroring the studio&apos;s approach to photography. The result was a digital space that felt as thoughtful as the work it showcased.',
          technical: ['scroll animations', 'reveal sequences', 'contemplative UX']
        }
      ];
    }
    
    if (project.title === 'AETIER') {
      return [
        {
          phase: 'PHASE 01: THE FOUNDATION',
          content: 'The client\'s core challenge was establishing a distinctive brand identity in the competitive brand strategy space. Our first move wasn\'t design; it was strategy. We unified their "Signal Over Noise" philosophy into a cohesive digital experience that would communicate their expertise to leaders of category-defining companies.',
          technical: ['brand strategy', 'digital experience', 'content architecture']
        },
        {
          phase: 'PHASE 02: THE VISUAL SYSTEM',
          content: 'We developed a sophisticated typographic system using Canela Deck for its editorial authority and Satoshi for its technical precision. The color palette reflected their refined approach: Cream, Charcoal, and Terracotta accents. Every element was designed to convey expertise and trust.',
          technical: ['Canela Deck', 'Satoshi', 'editorial typography']
        },
        {
          phase: 'PHASE 03: THE EXECUTION',
          content: 'The technical implementation focused on performance and accessibility. We achieved a Lighthouse score of 99 and ensured every interaction felt premium. The site became a testament to their philosophy: clarity through structure, elegance through restraint.',
          technical: ['Lighthouse 99', 'accessibility', 'premium interactions']
        }
      ];
    }
    
    // Default to iPower
    return [
      {
        phase: 'PHASE 01: THE FOUNDATION',
          content: 'The client&apos;s core challenge was establishing a strong digital presence in Lebanon&apos;s electrical engineering market. Our first move wasn&apos;t design; it was understanding their 15+ years of experience across residential, commercial, and industrial sectors. We built a comprehensive content strategy that would showcase their expertise and attract clients across Lebanon&apos;s diverse industries.',
        technical: ['content strategy', 'market research', 'Lebanon focus']
      },
      {
        phase: 'PHASE 02: THE TECHNICAL FRAME',
        content: 'We chose a robust architecture using Next.js for its SEO capabilities and performance. The primary technical challenge was creating an intuitive navigation system that would help clients find relevant services quickly. We implemented a service-based information architecture with clear calls-to-action.',
        technical: ['Next.js', 'SEO optimization', 'information architecture']
      },
      {
        phase: 'PHASE 03: THE FINAL TOUCHES',
        content: 'Accessibility was non-negotiable for a professional services website. Every component was built to be fully keyboard-navigable and WCAG 2.1 AA compliant. We spent significant time on performance tuning and mobile optimization, ensuring the site would perform flawlessly across all devices in Lebanon&apos;s diverse digital landscape.',
        technical: ['WCAG 2.1 AA', 'mobile optimization', 'performance tuning']
      }
    ];
  };

  const logEntries = getProjectLogEntries(project);

  return (
    <section ref={sectionRef} className="relative py-24 bg-alabaster">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="font-tiempos text-charcoal text-4xl font-bold mb-24 text-center">
          The Architect's Log
        </h3>

        <div className="grid grid-cols-12 gap-8">
          {/* Timeline */}
          <div className="col-span-2 relative">
            <div 
              className="absolute left-1/2 top-0 w-px bg-stone transition-all duration-1000"
              style={{ 
                height: `${scrollProgress * 100}%`,
                transform: 'translateX(-50%)'
              }}
            />
          </div>

          {/* Content */}
          <div className="col-span-8 col-start-3">
            <div className="space-y-32">
              {logEntries.map((entry, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    visibleEntries.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 200}ms` 
                  }}
                >
                  {/* Phase Header */}
                  <div className="sticky top-8 mb-8">
                    <h4 className="font-satoshi text-stone text-xs font-medium tracking-widest uppercase">
                      {entry.phase}
                    </h4>
                  </div>

                  {/* Entry Content */}
                  <div className="max-w-4xl">
                    <p className="font-satoshi text-charcoal text-lg italic leading-relaxed">
                      {entry.content.split(' ').map((word, wordIndex) => {
                        const isTechnical = entry.technical.some(term => 
                          word.toLowerCase().includes(term.toLowerCase())
                        );
                        
                        return isTechnical ? (
                          <span key={wordIndex} className="font-mono text-studio-green font-medium">
                            {word}{' '}
                          </span>
                        ) : (
                          <span key={wordIndex}>
                            {word}{' '}
                          </span>
                        );
                      })}
                    </p>
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
