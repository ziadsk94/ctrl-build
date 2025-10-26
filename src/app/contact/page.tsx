'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trackEmailClick } from '@/lib/analytics';

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const emailRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page load animation
    setTimeout(() => setIsLoaded(true), 200);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
      setIsTablet(width <= 1024 && width > 600);
    };

    const handleScroll = () => {
      // Email link reveal
      if (emailRef.current) {
        const rect = emailRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowEmail(true);
        }
      }

      // Secondary info reveal
      if (secondaryRef.current) {
        const rect = secondaryRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowSecondary(true);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Initial checks
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleEmailClick = () => {
    // Create the expanding green transition
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
    
    // Trigger the expansion
    requestAnimationFrame(() => {
      transition.style.transform = 'scaleX(1)';
    });
    
    // Navigate after animation
    setTimeout(() => {
      trackEmailClick(); // Track the email click
      window.location.href = 'mailto:contact@ctrl-build.com';
      document.body.removeChild(transition);
    }, 300);
  };

  return (
    <>
      {/* Custom Cursor - Desktop/Tablet Only */}
      {!isMobile && (
        <div 
          className="fixed pointer-events-none z-50 transition-all duration-200"
          style={{
            left: cursorPosition.x - (isHoveringEmail ? 30 : 6),
            top: cursorPosition.y - (isHoveringEmail ? 30 : 6),
            width: isHoveringEmail ? '60px' : '12px',
            height: isHoveringEmail ? '60px' : '12px',
            borderRadius: '50%',
            backgroundColor: isHoveringEmail ? 'transparent' : '#020202',
            border: isHoveringEmail ? '2px solid #020202' : 'none',
            display: isHoveringEmail ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
            fontFamily: 'Syne, sans-serif',
            color: '#020202'
          }}
        >
          {isHoveringEmail && 'MAIL'}
        </div>
      )}

      <div className="min-h-screen bg-cream">
        <Header />
        
        <main>
          {/* Page Hero & Introduction */}
          <section className={`${isMobile ? 'h-[70vh]' : 'h-[80vh]'} bg-cream flex items-center justify-center px-6 md:px-16`}>
            <div className="max-w-7xl mx-auto text-center">
              {/* H1 Headline */}
              <h1 
                className={`font-syne font-bold text-black mb-8 transition-all duration-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
              >
                LET'S BUILD
                <span 
                  className={`transition-opacity duration-300 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ color: '#3c8669' }}
                >
                  .
                </span>
              </h1>
              
              {/* Introduction Text */}
              <div 
                className={`${isMobile ? 'max-w-[90%]' : 'max-w-[60%]'} mx-auto transition-all duration-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <p className="font-fraunces text-black text-lg leading-relaxed">
                  We partner with a select group of clients. If you have a project and are ready to build something definitive, we are ready to listen.
                  <br /><br />
                  Send us an email with the details.
                </p>
              </div>
            </div>
          </section>

          {/* Primary Email CTA */}
          <section className="py-24 px-6 md:px-16 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
              <div 
                ref={emailRef}
                className={`transition-all duration-700 ${
                  showEmail ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
                }`}
              >
                <a
                  href="mailto:contact@ctrl-build.com"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEmailClick();
                  }}
                  onMouseEnter={() => {
                    setHoveredEmail(true);
                    setIsHoveringEmail(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredEmail(false);
                    setIsHoveringEmail(false);
                  }}
                  onTouchStart={() => {
                    setHoveredEmail(true);
                    if (navigator.vibrate) {
                      navigator.vibrate(30);
                    }
                  }}
                  onTouchEnd={() => setHoveredEmail(false)}
                  className="inline-block font-syne font-bold transition-colors duration-200 relative whitespace-nowrap"
                  style={{
                    fontSize: isMobile ? 'clamp(1.5rem, 4vw, 3rem)' : 'clamp(2.5rem, 6vw, 6rem)',
                    color: hoveredEmail ? '#3c8669' : '#020202'
                  }}
                >
                  contact@ctrl-build.com
                  {/* Animated underline */}
                  <div 
                    className={`absolute bottom-0 left-0 h-px bg-[#3c8669] transition-all duration-300 ${
                      hoveredEmail ? 'w-full' : 'w-0'
                    }`}
                    style={{ height: '2px' }}
                  />
                </a>
              </div>
            </div>
          </section>

          {/* Secondary Information */}
          <section ref={secondaryRef} className="py-16 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
              {/* Desktop/Tablet: 2-Column Grid */}
              {!isMobile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {/* Column 01: Social */}
                  <div className={`transition-all duration-500 ${
                    showSecondary ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <h4 className="font-syne font-bold text-black text-lg mb-6">SOCIAL</h4>
                    <nav className="flex flex-col space-y-3">
                      <a 
                        href="https://instagram.com/buildwithctrl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-fraunces text-black text-lg hover:text-green transition-colors duration-200"
                      >
                        Instagram
                      </a>
                    </nav>
                  </div>

                  {/* Column 02: Studio */}
                  <div className={`transition-all duration-500 ${
                    showSecondary ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`} style={{ transitionDelay: '150ms' }}>
                    <h4 className="font-syne font-bold text-black text-lg mb-6">STUDIO</h4>
                    <div className="flex flex-col space-y-3">
                      <p className="font-fraunces text-black text-lg">Craiova, Romania</p>
                      <p className="font-fraunces text-black text-lg">Available Worldwide</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile: Single Column Stack - Left Aligned */}
              {isMobile && (
                <div className="text-left space-y-8">
                  {/* Social */}
                  <div className={`transition-all duration-500 ${
                    showSecondary ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <h4 className="font-syne font-bold text-black text-lg mb-6">SOCIAL</h4>
                    <nav className="flex flex-col space-y-3">
                      <a 
                        href="https://instagram.com/buildwithctrl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-fraunces text-black text-lg hover:text-green transition-colors duration-200"
                      >
                        Instagram
                      </a>
                    </nav>
                  </div>

                  {/* Studio */}
                  <div className={`transition-all duration-500 ${
                    showSecondary ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`} style={{ transitionDelay: '150ms' }}>
                    <h4 className="font-syne font-bold text-black text-lg mb-6 mt-12">STUDIO</h4>
                    <div className="flex flex-col space-y-3">
                      <p className="font-fraunces text-black text-lg">Craiova, Romania</p>
                      <p className="font-fraunces text-black text-lg">Available Worldwide</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
