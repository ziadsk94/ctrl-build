'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);
  const [showManifesto, setShowManifesto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Responsive detection
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
      setIsTablet(width <= 1024 && width > 600);
    };

    // Initial check
    handleResize();

    // Staggered animation sequence
    const timer1 = setTimeout(() => setIsLoaded(true), 100);
    const timer2 = setTimeout(() => setShowPeriod(true), 800); // 0.1s * 3 lines + 0.2s delay
    const timer3 = setTimeout(() => setShowManifesto(true), 1000); // 0.1s after period

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="h-screen bg-cream relative overflow-hidden">
      {/* Desktop/Tablet Layout */}
      {!isMobile && (
        <>
          {/* H1 - Top-Left */}
          <div className="absolute top-[20vh] left-8 md:left-16">
            <h1 className="font-syne font-bold text-black leading-tight" style={{
              fontSize: isTablet ? 'clamp(2rem, 4vw, 4rem)' : 'clamp(3rem, 6vw, 7rem)'
            }}>
              <div 
                className={`transition-all duration-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '0ms' }}
              >
                DEFINITIVE
              </div>
              <div 
                className={`transition-all duration-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                DIGITAL
              </div>
              <div 
                className={`transition-all duration-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                EXPERIENCES
                <span 
                  className={`transition-opacity duration-300 ${
                    showPeriod ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ color: '#3c8669' }}
                >
                  .
                </span>
              </div>
            </h1>
          </div>

          {/* Brand Manifesto - Mid-Right */}
          <div className={`absolute transform -translate-y-1/2 right-8 md:right-16 ${
            isTablet ? 'top-[60%]' : 'top-1/2'
          }`}>
            <div 
              className={`transition-all duration-500 ${
                showManifesto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="font-fraunces text-black text-right leading-relaxed max-w-xs text-sm md:text-base">
                CTRL+BUILD is a design & development<br />
                studio in Romania. We use technical<br />
                precision to build bespoke digital platforms.
              </p>
            </div>
          </div>

          {/* Primary CTA - Bottom-Left */}
          <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16">
            <button 
              className={`transition-all duration-500 ${
                showManifesto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } bg-[#3c8669] hover:bg-transparent hover:border-2 hover:border-[#3c8669] px-6 py-3 md:px-8 md:py-4 font-syne font-bold text-black transition-colors duration-300 text-sm md:text-base`}
            >
              VIEW OUR WORK
            </button>
          </div>
        </>
      )}

      {/* Mobile Layout - Single Column Centered */}
      {isMobile && (
        <div className="flex flex-col items-center justify-center h-full px-6 text-center">
          {/* H1 - Top/Center */}
          <div className="mb-8">
            <h1 className="font-syne font-bold text-black leading-tight text-4xl md:text-5xl">
              <div 
                className={`transition-all duration-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '0ms' }}
              >
                DEFINITIVE
              </div>
              <div 
                className={`transition-all duration-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                DIGITAL
              </div>
              <div 
                className={`transition-all duration-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                EXPERIENCES
                <span 
                  className={`transition-opacity duration-300 ${
                    showPeriod ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ color: '#3c8669' }}
                >
                  .
                </span>
              </div>
            </h1>
          </div>

          {/* Manifesto - Middle/Center */}
          <div className="mb-12">
            <div 
              className={`transition-all duration-500 ${
                showManifesto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="font-fraunces text-black leading-relaxed text-base">
                We use technical precision to<br />
                build bespoke digital platforms<br />
                that drive results.
              </p>
            </div>
          </div>

          {/* CTA - Bottom/Center */}
          <div className="absolute bottom-[50px] left-6 right-6">
            <button 
              className={`transition-all duration-500 ${
                showManifesto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } bg-[#3c8669] hover:bg-transparent hover:border-2 hover:border-[#3c8669] w-full py-4 font-syne font-bold text-black transition-colors duration-300 text-base`}
            >
              VIEW OUR WORK
            </button>
          </div>
        </div>
      )}

      {/* Scroll Indicator - Bottom-Center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-10 bg-black relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full bg-black scroll-indicator"
            style={{ height: '40px' }}
          />
        </div>
      </div>
    </section>
  );
}