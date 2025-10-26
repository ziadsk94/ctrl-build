'use client';

import { useState, useEffect, useRef } from 'react';

const statementText = "The digital landscape is ready for a new standard. We are tired of the template. Based in Romania, CTRL+BUILD was founded on 'Digital Discipline'— creating bespoke web design, high-performance platforms that are engineered for results.";
const words = statementText.split(' ');

export default function BrandStatement() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
        
        if (isInView) {
          // Start line drawing animation
          setTimeout(() => setShowLine(true), 200);
          
          // Start word-by-word animation after line completes
          setTimeout(() => {
            words.forEach((_, index) => {
              setTimeout(() => {
                setVisibleWords(prev => [...prev, index]);
              }, index * 50); // 0.05s delay between words
            });
          }, 700); // Start after line animation (0.5s) + small delay
        }
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
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

  return (
    <section ref={sectionRef} className="bg-cream py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Accent Marker - Green Line */}
          <div className="mb-12">
            <div 
              className="h-px bg-[#3c8669] transition-all duration-500 ease-out"
              style={{
                width: showLine ? '40px' : '0px',
                transformOrigin: 'center'
              }}
            />
          </div>

          {/* Statement Text */}
          <div className={`text-center ${
            isMobile ? 'max-w-[90%]' : 'max-w-[60%]'
          }`}>
            <p 
              className="font-fraunces text-black leading-relaxed"
              style={{
                fontSize: 'clamp(24px, 2.5vw, 48px)'
              }}
            >
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`transition-opacity duration-300 ${
                    visibleWords.includes(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {word}
                  {index < words.length - 1 && ' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
