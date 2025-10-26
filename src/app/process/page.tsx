'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Process() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPhase1, setShowPhase1] = useState(false);
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [showPhase2, setShowPhase2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [showStep4, setShowStep4] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const phase1Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page load animation
    setTimeout(() => setIsLoaded(true), 200);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
    };

    const handleScroll = () => {
      // Phase I: Control
      if (phase1Ref.current) {
        const rect = phase1Ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowPhase1(true);
        }
      }

      // Step 01
      if (step1Ref.current) {
        const rect = step1Ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowStep1(true);
        }
      }

      // Step 02
      if (step2Ref.current) {
        const rect = step2Ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowStep2(true);
        }
      }

      // Phase II: Build
      if (phase2Ref.current) {
        const rect = phase2Ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowPhase2(true);
        }
      }

      // Step 03
      if (step3Ref.current) {
        const rect = step3Ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowStep3(true);
        }
      }

      // Step 04
      if (step4Ref.current) {
        const rect = step4Ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowStep4(true);
        }
      }
    };

    // Initial checks
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ProcessStep = ({ 
    stepNumber, 
    title, 
    description, 
    isVisible, 
    stepRef,
    isLast = false
  }: {
    stepNumber: string;
    title: string;
    description: string;
    isVisible: boolean;
    stepRef: React.RefObject<HTMLDivElement>;
    isLast?: boolean;
  }) => (
    <div ref={stepRef} className="py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Desktop/Tablet: Asymmetrical Grid */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
            {/* Left Column - Number (30%) */}
            <div className="md:col-span-3 flex items-start justify-center md:justify-start">
              <div className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div 
                  className="font-syne font-bold text-pink"
                  style={{ fontSize: 'clamp(100px, 12vw, 150px)', lineHeight: '1' }}
                >
                  {stepNumber}
                </div>
              </div>
            </div>

            {/* Right Column - Content (70%) */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="font-syne font-bold text-black text-2xl md:text-3xl mb-6">
                  {title}
                </h3>
                <p className="font-fraunces text-black text-lg leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile: Single Column Stack */}
        {isMobile && (
          <div>
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Number */}
              <div 
                className="font-syne font-bold text-pink mb-4"
                style={{ fontSize: '80px', lineHeight: '1' }}
              >
                {stepNumber}
              </div>
              
              {/* Title */}
              <h3 className="font-syne font-bold text-black text-xl mb-4">
                {title}
              </h3>
              
              {/* Description */}
              <p className="font-fraunces text-black text-base leading-relaxed">
                {description}
              </p>
            </div>
            
            {/* Separator Line (except for last item) */}
            {!isLast && (
              <div className="w-full h-px bg-black mt-12"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const PhaseHeading = ({ 
    text, 
    isVisible, 
    phaseRef 
  }: {
    text: string;
    isVisible: boolean;
    phaseRef: React.RefObject<HTMLDivElement>;
  }) => (
    <div ref={phaseRef} className="py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Ghosted Background Element - All Devices */}
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          <h2 
            className="font-syne font-bold text-left"
            style={{
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              WebkitTextStroke: '1px #020202',
              color: 'transparent',
              lineHeight: '0.8'
            }}
          >
            {text}
          </h2>
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main>
        {/* Page Hero & Introduction */}
        <section className={`${isMobile ? 'h-[80vh]' : 'h-screen'} bg-cream flex items-center justify-center px-6 md:px-16`}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 
              className={`font-syne font-bold text-black mb-8 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
            >
              OUR PROCESS
            </h1>
            
            <div 
              className={`${isMobile ? 'max-w-[90%]' : 'max-w-[60%]'} mx-auto transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="font-fraunces text-black text-lg leading-relaxed">
                Discipline is the foundation of creativity. Our process is transparent, structured, and designed to eliminate guesswork. We take control of the objective, then build the definitive solution. This is how.
              </p>
            </div>
          </div>
        </section>

        {/* Phase I: Control */}
        <PhaseHeading 
          text="PHASE I: CONTROL" 
          isVisible={showPhase1} 
          phaseRef={phase1Ref} 
        />

        {/* Step 01: Discovery & Strategy */}
        <ProcessStep
          stepNumber="01"
          title="DISCOVERY & STRATEGY"
          description="We begin with a deep dive into your objective. We analyze your market, define your audience, and establish the core metrics for success. This is the blueprint."
          isVisible={showStep1}
          stepRef={step1Ref}
          isLast={false}
        />

        {/* Step 02: Architecture & UX */}
        <ProcessStep
          stepNumber="02"
          title="ARCHITECTURE & UX"
          description="With a clear strategy, we build the wireframes and user flows. Every interaction is mapped, and the site's structure is finalized before a single pixel of design is applied."
          isVisible={showStep2}
          stepRef={step2Ref}
          isLast={false}
        />

        {/* Phase II: Build */}
        <PhaseHeading 
          text="PHASE II: BUILD" 
          isVisible={showPhase2} 
          phaseRef={phase2Ref} 
        />

        {/* Step 03: Bespoke Design & Dev */}
        <ProcessStep
          stepNumber="03"
          title="BESPOKE DESIGN & DEV"
          description="This is the execution. Our designers craft the pixel-perfect UI, and our developers bring it to life with clean, high-performance, headless code. We build it from the ground up."
          isVisible={showStep3}
          stepRef={step3Ref}
          isLast={false}
        />

        {/* Step 04: Deployment & Optimization */}
        <ProcessStep
          stepNumber="04"
          title="DEPLOYMENT & OPTIMIZATION"
          description="We manage the launch, optimize for all devices, and ensure your site's technical SEO is flawless. Your platform is now live, performant, and ready to compete."
          isVisible={showStep4}
          stepRef={step4Ref}
          isLast={true}
        />

        {/* Final CTA */}
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
}
