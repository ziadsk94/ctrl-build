'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function GaplensCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showBrief, setShowBrief] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);
  const [visibleImages, setVisibleImages] = useState<boolean[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const briefRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const project = {
    name: 'GAPLENS',
    subtitle: 'A minimalist photographic archive exploring space between light and shadow.',
    objective: 'GapLens needed a digital platform that would serve as both an archive and editorial space for their photographic work. The challenge was to create a sophisticated, minimal website that honors the photographic medium while providing an immersive browsing experience. The platform captures the essence of their artistic vision—the space between the light and the shadow.',
    capabilities: [
      'Bespoke UI/UX Design',
      'Headless Development',
      'Technical SEO Strategy'
    ],
    heroImage: '/assets/images/projects/gaplens/featured.png',
    showcaseImages: [
      '/assets/images/projects/gaplens/homepage-screenshot.png'
    ],
    testimonial: 'CTRL+BUILD created a platform that perfectly captures the silence and structure of our photographic vision.',
    nextProject: 'AETIER',
    website: 'https://gaplens.com'
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200);
    setTimeout(() => setShowHeroContent(true), 800);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
      setIsTablet(width <= 1024 && width > 600);
    };

    const handleScroll = () => {
      if (briefRef.current) {
        const rect = briefRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          setShowBrief(true);
        }
      }

      if (showcaseRef.current) {
        const rect = showcaseRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          setShowShowcase(true);
          project.showcaseImages.slice(0, 1).forEach((_, index) => {
            setTimeout(() => {
              setVisibleImages(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 200);
          });
        }
      }
    };

    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [project.showcaseImages.length]);

  const handleNextProjectClick = (nextSlug: string) => {
    const transition = document.createElement('div');
    transition.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #3c8669;
      z-index: 9999;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(transition);
    
    requestAnimationFrame(() => {
      transition.style.transform = 'scaleX(1)';
    });
    
    setTimeout(() => {
      window.location.href = `/work/${nextSlug.toLowerCase()}`;
      document.body.removeChild(transition);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <Header />
      
      <main>
          <section className={`${isMobile ? 'h-[80vh]' : 'h-[90vh]'} relative overflow-hidden`}>
          <div className="absolute inset-0">
            <Image
              src={project.heroImage}
              alt={`${project.name} - Project Hero`}
              fill
              priority
              className="object-cover transform scale-105 transition-transform duration-[2000ms] ease-out"
              style={{
                transform: isLoaded ? 'scale(1)' : 'scale(1.05)'
              }}
            />
            <div className="absolute inset-0 bg-black opacity-15"></div>
          </div>

          <div className="relative z-10 flex items-center justify-center h-full text-center px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
              <h1
                className={`font-syne font-bold text-[#fcfaf7] mb-4 transition-all duration-1000 ${
                  showHeroContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
              >
                {project.name}
              </h1>
              
              <div 
                className={`${isMobile ? 'max-w-[90%]' : 'max-w-[60%]'} mx-auto transition-all duration-1000 ${
                  showHeroContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <p className="font-fraunces text-[#fcfaf7] text-lg leading-relaxed mb-8">
                  {project.subtitle}
                </p>
                
                {/* Website Link */}
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block font-syne font-bold text-[#fcfaf7] border border-[#fcfaf7] px-8 py-3 hover:bg-[#fcfaf7] hover:text-black transition-all duration-300 ${
                    showHeroContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: '500ms' }}
                >
                  VISIT WEBSITE
                </a>
              </div>
            </div>
          </div>
        </section>

        <section ref={briefRef} className="bg-cream py-24 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            {!isMobile && (
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 transition-all duration-700 ${
                showBrief ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div>
                  <h3 className="font-syne font-bold text-black text-2xl md:text-3xl mb-6">
                    THE OBJECTIVE
                  </h3>
                  <p className="font-fraunces text-black text-lg leading-relaxed">
                    {project.objective}
                  </p>
                </div>

                <div>
                  <h3 className="font-syne font-bold text-black text-2xl md:text-3xl mb-6">
                    CAPABILITIES
                  </h3>
                  <ul className="font-fraunces text-black text-lg leading-relaxed space-y-2">
                    {project.capabilities.map((capability, index) => (
                      <li key={index}>{capability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {isMobile && (
              <div className="text-left space-y-12">
                <div className={`transition-all duration-700 ${
                  showBrief ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h3 className="font-syne font-bold text-black text-xl mb-4">
                    THE OBJECTIVE
                  </h3>
                  <p className="font-fraunces text-black text-base leading-relaxed">
                    {project.objective}
                  </p>
                </div>

                <div className={`transition-all duration-700 ${
                  showBrief ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '150ms' }}>
                  <h3 className="font-syne font-bold text-black text-xl mb-4">
                    CAPABILITIES
                  </h3>
                  <ul className="font-fraunces text-black text-base leading-relaxed space-y-2">
                    {project.capabilities.map((capability, index) => (
                      <li key={index}>{capability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="w-full h-px bg-black max-w-7xl mx-auto px-6 md:px-16"></div>

        <section ref={showcaseRef} className="bg-cream py-24">
          <div className="max-w-7xl mx-auto">
            <div className={`relative overflow-hidden mb-24 ${
              isMobile ? 'px-6' : 'px-16'
            }`}>
              <div className={`absolute inset-0 bg-pink z-10 transition-transform duration-400 ${
                visibleImages[0] ? '-translate-x-full' : 'translate-x-0'
              }`}></div>
              <Image
                src={project.showcaseImages[0]}
                alt={`${project.name} Homepage Screenshot`}
                width={1920}
                height={1080}
                layout="responsive"
                className="object-cover"
              />
            </div>

            <div className="py-24 px-6 md:px-16 bg-pink">
              <div className="max-w-4xl mx-auto text-center">
                <blockquote className="font-fraunces text-black text-xl md:text-2xl leading-relaxed">
                  "{project.testimonial}"
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-16 bg-cream">
          <div className="max-w-7xl mx-auto text-center">
            <div className="w-full h-px bg-black mb-12"></div>

            <div className={`transition-all duration-700 ${
              showShowcase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <h4 className="font-fraunces text-black text-lg mb-4">NEXT PROJECT</h4>
              <a
                href="/work/aetier"
                onClick={(e) => {
                  e.preventDefault();
                  handleNextProjectClick('aetier');
                }}
                className="font-syne font-bold text-black hover:text-[#3c8669] transition-colors duration-200"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}
              >
                AETIER
              </a>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
}

