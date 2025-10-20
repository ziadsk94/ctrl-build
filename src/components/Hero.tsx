'use client';

import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Bucharest'
      });
      setCurrentTime(`CRAIOVA, RO. ${timeString} EEST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Trigger page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen bg-alabaster flex items-center justify-center overflow-hidden"
    >
      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-12 h-full items-center">
          
          {/* Primary Headline - Columns 2-11 */}
          <div className="col-span-10 col-start-2">
            <div className="relative">
              {/* Parallax shadow layer */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                {/* Decorative duplicate rendered as non-heading to avoid multiple H1s */}
                <div className="font-tiempos text-charcoal leading-none whitespace-nowrap" aria-hidden={true}>
                  {"Digital Structures.".split('').map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-300 ${
                        isLoaded 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-5'
                      }`}
                      style={{
                        transitionDelay: isLoaded ? `${index * 30}ms` : '0ms',
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        fontWeight: 700
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Main text layer */}
              <div 
                className="relative"
                style={{
                  transform: `translate(${mousePosition.x * 1}px, ${mousePosition.y * 1}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <PrimaryHeadline isLoaded={isLoaded} />
              </div>
              
              {/* Secondary Headline */}
              <SecondaryHeadline isLoaded={isLoaded} />
            </div>
          </div>
        </div>
      </div>

      {/* Live Element - Bottom Right */}
      <div className={`absolute bottom-8 transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`} style={{ 
        right: 'calc(50% - 42rem + 1.5rem)',
        transitionDelay: isLoaded ? '1300ms' : '0ms'
      }}>
        <div className="font-mono text-xs text-stone uppercase tracking-blueprint" style={{ fontSize: '12px' }}>
          {currentTime}
        </div>
      </div>

      {/* Scroll Affordance - Bottom Center */}
      <ScrollAffordance isLoaded={isLoaded} />
    </section>
  );
}

function PrimaryHeadline({ isLoaded }: { isLoaded: boolean }) {
  const text = "Digital Structures.";
  const characters = text.split('');

  return (
    <h1 className="font-tiempos text-charcoal leading-none whitespace-nowrap">
      {characters.map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ${
            isLoaded 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-5'
          }`}
          style={{
            transitionDelay: isLoaded ? `${index * 30}ms` : '0ms',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 700
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
}

function SecondaryHeadline({ isLoaded }: { isLoaded: boolean }) {
  return (
    <h2 
      className={`font-tiempos text-charcoal mt-4 transition-all duration-500 ${
        isLoaded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
        fontWeight: 400,
        transitionDelay: isLoaded ? '800ms' : '0ms'
      }}
    >
      Built to last.
    </h2>
  );
}

function ScrollAffordance({ isLoaded }: { isLoaded: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const startAnimation = () => {
      setIsAnimating(true);
      // Reset after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    };

    // Initial animation after a delay
    const timer = setTimeout(startAnimation, 1000);
    
    // Repeat every 3 seconds
    const interval = setInterval(startAnimation, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isLoaded]);

  return (
    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`} style={{ transitionDelay: isLoaded ? '1300ms' : '0ms' }}>
      <div className="flex flex-col items-center">
        <div className="font-satoshi text-xs text-stone uppercase tracking-blueprint mb-2">
          EXPLORE
        </div>
        <div className="relative w-px h-16 bg-stone">
          <div 
            className={`absolute w-2 h-2 bg-studio-green rounded-full -left-1 transition-all duration-2000 ease-out ${
              isAnimating ? 'animate-dot-down' : ''
            }`}
            style={{
              top: isAnimating ? '100%' : '0%',
              opacity: isAnimating ? 0 : 1
            }}
          />
        </div>
      </div>
    </div>
  );
}
