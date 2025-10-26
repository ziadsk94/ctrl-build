'use client';

import { useState, useEffect, useRef } from 'react';

export default function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
        
        if (isInView) {
          // Mirror hero's reveal sequence
          setTimeout(() => setShowHeadline(true), 200);
          setTimeout(() => setShowPeriod(true), 400); // 0.2s after headline
          setTimeout(() => setShowButton(true), 500); // 0.1s after period
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProjectStart = () => {
    // Create expanding green transition
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
      window.location.href = '/contact';
      document.body.removeChild(transition);
    }, 300);
  };

  return (
    <section ref={sectionRef} className="bg-cream py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Headline */}
          <div className="mb-12">
            <h2 
              className={`font-syne font-bold text-black transition-all duration-500 ${
                showHeadline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 6rem)'
              }}
            >
              LET'S BUILD
              <span 
                className={`transition-opacity duration-300 ${
                  showPeriod ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ color: '#3c8669' }}
              >
                .
              </span>
            </h2>
          </div>

          {/* Primary CTA Button */}
          <div>
            <button 
              onClick={handleProjectStart}
              className={`transition-all duration-500 ${
                showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } bg-[#3c8669] hover:bg-transparent hover:border-2 hover:border-[#3c8669] px-12 py-4 font-syne font-bold text-black transition-colors duration-300 text-lg`}
            >
              START YOUR PROJECT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
