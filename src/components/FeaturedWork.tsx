'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function FeaturedWork() {
  const [isVisible, setIsVisible] = useState(false);
  const [showProject1, setShowProject1] = useState(false);
  const [showProject2, setShowProject2] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
        
        if (isInView) {
          // Staggered reveals
          setTimeout(() => setShowProject1(true), 200);
          setTimeout(() => setShowProject2(true), 800);
        }
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
      setIsTablet(width <= 1024 && width > 600);
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

  const handleCaseStudyClick = (project: string) => {
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
          window.location.href = `/work/${project}`;
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
            left: cursorPosition.x - (isHoveringImage ? 30 : 6),
            top: cursorPosition.y - (isHoveringImage ? 30 : 6),
            width: isHoveringImage ? '60px' : '12px',
            height: isHoveringImage ? '60px' : '12px',
            borderRadius: '50%',
            backgroundColor: isHoveringImage ? 'transparent' : '#020202',
            border: isHoveringImage ? '2px solid #020202' : 'none',
            display: isHoveringImage ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
            fontFamily: 'Syne, sans-serif',
            color: '#020202'
          }}
        >
          {isHoveringImage && 'EXPLORE'}
        </div>
      )}

      <section ref={sectionRef} className="bg-cream py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Desktop/Tablet Layout */}
          {!isMobile && (
            <>
              {/* Project One: iPower - The Anchor */}
              <div className={`grid grid-cols-1 gap-12 mb-32 ${
                isTablet ? 'lg:grid-cols-2' : 'lg:grid-cols-4'
              }`}>
                {/* Text - Left */}
                <div className={`flex flex-col justify-center ${
                  isTablet ? 'lg:col-span-1' : 'lg:col-span-2'
                }`}>
              <div className={`transition-all duration-500 ${
                showProject1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="font-syne font-bold text-pink text-6xl mb-4">01</div>
                <h3 className="font-syne font-bold text-black text-3xl md:text-4xl mb-6">
                  IPOWER
                </h3>
                <p className="font-fraunces text-black text-lg leading-relaxed mb-8">
                  Lebanon's trusted electrical engineering partner,<br />
                  delivering reliable electrical systems across industries.
                </p>
                <button
                  onClick={() => handleCaseStudyClick('ipower')}
                  onMouseEnter={() => setHoveredLink('ipower')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onTouchStart={() => {
                    setHoveredLink('ipower');
                    if (navigator.vibrate) {
                      navigator.vibrate(30);
                    }
                  }}
                  onTouchEnd={() => setHoveredLink(null)}
                  className="font-syne font-bold text-black text-lg flex items-center gap-2 group relative"
                >
                  VIEW CASE STUDY
                  <div className={`transition-transform duration-200 ${
                    hoveredLink === 'ipower' ? 'translate-x-2' : ''
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="#3c8669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-px bg-[#3c8669] transition-all duration-300 ${
                    hoveredLink === 'ipower' ? 'w-full' : 'w-0'
                  }`}></div>
                </button>
              </div>
            </div>

                {/* Visual - Right */}
                <div className={`relative overflow-hidden ${
                  isTablet ? 'lg:col-span-1' : 'lg:col-span-2'
                }`}>
              <div 
                className="relative cursor-pointer"
                onMouseEnter={() => setIsHoveringImage('ipower')}
                onMouseLeave={() => setIsHoveringImage(null)}
                onClick={() => handleCaseStudyClick('ipower')}
              >
                {/* Curtain Reveal */}
                <div className={`absolute inset-0 bg-pink z-10 transition-transform duration-400 ${
                  showProject1 ? '-translate-x-full' : 'translate-x-0'
                }`}></div>
                
                {/* Image */}
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/assets/images/projects/ipower/featured.png"
                    alt="iPower - Lebanon's electrical engineering solutions"
                    fill
                    className="object-cover"
                    priority
                    style={{
                      transform: isMobile ? 'none' : 'translateY(0px)',
                      transition: 'transform 0.1s ease-out'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

              {/* Large Whitespace Block */}
              <div className="h-24"></div>

              {/* Project Two: GapLens - The Reversal */}
              <div className={`grid grid-cols-1 gap-12 mb-16 ${
                isTablet ? 'lg:grid-cols-2' : 'lg:grid-cols-4'
              }`}>
                {/* Visual - Left */}
                <div className={`relative overflow-hidden ${
                  isTablet ? 'lg:col-span-1 lg:col-start-1' : 'lg:col-span-2 lg:col-start-1'
                }`}>
              <div 
                className="relative cursor-pointer"
                onMouseEnter={() => setIsHoveringImage('gaplens')}
                onMouseLeave={() => setIsHoveringImage(null)}
                onClick={() => handleCaseStudyClick('gaplens')}
              >
                {/* Curtain Reveal */}
                <div className={`absolute inset-0 bg-pink z-10 transition-transform duration-400 ${
                  showProject2 ? 'translate-x-full' : 'translate-x-0'
                }`}></div>
                
                {/* Image */}
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/assets/images/projects/gaplens/featured.png"
                    alt="GapLens - Visual arts photography studio"
                    fill
                    className="object-cover"
                    style={{
                      transform: isMobile ? 'none' : 'translateY(0px)',
                      transition: 'transform 0.1s ease-out'
                    }}
                  />
                </div>
              </div>
            </div>

                {/* Text - Right */}
                <div className={`flex flex-col justify-center ${
                  isTablet ? 'lg:col-span-1 lg:col-start-2' : 'lg:col-span-2 lg:col-start-3'
                }`}>
              <div className={`transition-all duration-500 ${
                showProject2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="font-syne font-bold text-pink text-6xl mb-4">02</div>
                <h3 className="font-syne font-bold text-black text-3xl md:text-4xl mb-6">
                  GAPLENS
                </h3>
                <p className="font-fraunces text-black text-lg leading-relaxed mb-8">
                  A visual arts studio that captures the space<br />
                  between light and shadow through photography.
                </p>
                <button
                  onClick={() => handleCaseStudyClick('gaplens')}
                  onMouseEnter={() => setHoveredLink('gaplens')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onTouchStart={() => {
                    setHoveredLink('gaplens');
                    if (navigator.vibrate) {
                      navigator.vibrate(30);
                    }
                  }}
                  onTouchEnd={() => setHoveredLink(null)}
                  className="font-syne font-bold text-black text-lg flex items-center gap-2 group relative"
                >
                  VIEW CASE STUDY
                  <div className={`transition-transform duration-200 ${
                    hoveredLink === 'gaplens' ? 'translate-x-2' : ''
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="#3c8669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-px bg-[#3c8669] transition-all duration-300 ${
                    hoveredLink === 'gaplens' ? 'w-full' : 'w-0'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Section CTA */}
          <div className="text-center">
                  <button 
                    onClick={() => window.location.href = '/work'}
                    className={`transition-all duration-500 ${
                      showProject2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    } bg-[#3c8669] hover:bg-transparent hover:border-2 hover:border-[#3c8669] px-12 py-4 font-syne font-bold text-black transition-colors duration-300 text-lg`}
                  >
                    EXPLORE ALL WORK
                  </button>
          </div>
            </>
          )}

          {/* Mobile Layout - Single Column Stack */}
          {isMobile && (
            <div className="space-y-16">
              {/* Project One: iPower */}
              <div className="space-y-6">
                {/* Image - Top */}
                <div className="relative overflow-hidden">
                  <div 
                    className="relative cursor-pointer"
                    onTouchStart={() => {
                      if (navigator.vibrate) {
                        navigator.vibrate(30);
                      }
                    }}
                    onClick={() => handleCaseStudyClick('ipower')}
                  >
                    {/* Curtain Reveal */}
                    <div className={`absolute inset-0 bg-pink z-10 transition-transform duration-400 ${
                      showProject1 ? '-translate-x-full' : 'translate-x-0'
                    }`}></div>
                    
                    {/* Image */}
                    <div className="aspect-[3/4] relative">
                      <Image
                        src="/assets/images/projects/ipower/featured.png"
                        alt="iPower - Lebanon's electrical engineering solutions"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Text Block - Bottom */}
                <div className={`transition-all duration-500 ${
                  showProject1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <div className="font-syne font-bold text-pink text-6xl mb-4">01</div>
                  <h3 className="font-syne font-bold text-black text-3xl mb-6">
                    IPOWER
                  </h3>
                  <p className="font-fraunces text-black text-lg leading-relaxed mb-8">
                    Lebanon's trusted electrical engineering partner,<br />
                    delivering reliable electrical systems across industries.
                  </p>
                  <button
                    onClick={() => handleCaseStudyClick('ipower')}
                    onTouchStart={() => {
                      setHoveredLink('ipower');
                      if (navigator.vibrate) {
                        navigator.vibrate(30);
                      }
                    }}
                    onTouchEnd={() => setHoveredLink(null)}
                    className="font-syne font-bold text-black text-lg flex items-center gap-2 group relative"
                  >
                    VIEW CASE STUDY
                    <div className={`transition-transform duration-200 ${
                      hoveredLink === 'ipower' ? 'translate-x-2' : ''
                    }`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4L10 8L6 12" stroke="#3c8669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={`absolute bottom-0 left-0 h-px bg-[#3c8669] transition-all duration-300 ${
                      hoveredLink === 'ipower' ? 'w-full' : 'w-0'
                    }`}></div>
                  </button>
                </div>
              </div>

              {/* Project Two: GapLens */}
              <div className="space-y-6">
                {/* Image - Top */}
                <div className="relative overflow-hidden">
                  <div 
                    className="relative cursor-pointer"
                    onTouchStart={() => {
                      if (navigator.vibrate) {
                        navigator.vibrate(30);
                      }
                    }}
                    onClick={() => handleCaseStudyClick('gaplens')}
                  >
                    {/* Curtain Reveal */}
                    <div className={`absolute inset-0 bg-pink z-10 transition-transform duration-400 ${
                      showProject2 ? 'translate-x-full' : 'translate-x-0'
                    }`}></div>
                    
                    {/* Image */}
                    <div className="aspect-[4/3] relative">
                      <Image
                        src="/assets/images/projects/gaplens/featured.png"
                        alt="GapLens - Visual arts photography studio"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Block - Bottom */}
                <div className={`transition-all duration-500 ${
                  showProject2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <div className="font-syne font-bold text-pink text-6xl mb-4">02</div>
                  <h3 className="font-syne font-bold text-black text-3xl mb-6">
                    GAPLENS
                  </h3>
                  <p className="font-fraunces text-black text-lg leading-relaxed mb-8">
                    A visual arts studio that captures the space<br />
                    between light and shadow through photography.
                  </p>
                  <button
                    onClick={() => handleCaseStudyClick('gaplens')}
                    onTouchStart={() => {
                      setHoveredLink('gaplens');
                      if (navigator.vibrate) {
                        navigator.vibrate(30);
                      }
                    }}
                    onTouchEnd={() => setHoveredLink(null)}
                    className="font-syne font-bold text-black text-lg flex items-center gap-2 group relative"
                  >
                    VIEW CASE STUDY
                    <div className={`transition-transform duration-200 ${
                      hoveredLink === 'gaplens' ? 'translate-x-2' : ''
                    }`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4L10 8L6 12" stroke="#3c8669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={`absolute bottom-0 left-0 h-px bg-[#3c8669] transition-all duration-300 ${
                      hoveredLink === 'gaplens' ? 'w-full' : 'w-0'
                    }`}></div>
                  </button>
                </div>
              </div>

              {/* Section CTA - Mobile */}
              <div className="text-center">
                <button 
                  onClick={() => window.location.href = '/work'}
                  className={`transition-all duration-500 ${
                    showProject2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } bg-[#3c8669] hover:bg-transparent hover:border-2 hover:border-[#3c8669] w-[90%] py-4 font-syne font-bold text-black transition-colors duration-300 text-lg`}
                >
                  EXPLORE ALL WORK
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}