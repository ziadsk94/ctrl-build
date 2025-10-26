'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
      setIsTablet(width <= 1024 && width > 600);
    };

    // Initial check
    handleResize();
    handleScroll(); // Initial scroll check

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link: string) => {
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
          if (link === 'work') {
            router.push('/work');
          } else if (link === 'process') {
            router.push('/process');
          } else if (link === 'contact') {
            router.push('/contact');
          }
          setIsMenuOpen(false);
          document.body.removeChild(transition);
        }, 300);
  };

  return (
    <>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isMobile ? 'h-[70px]' : 'h-[90px]'
        }`}
        style={{
          backgroundColor: isScrolled ? '#fcfaf7' : 'transparent',
          borderBottom: isScrolled ? '1px solid #020202' : 'none',
          transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="flex items-center justify-between h-full px-6 relative">
          {/* Logo - Left */}
          <button
            onClick={() => router.push('/')}
            className="font-syne font-bold text-black text-lg flex-shrink-0 hover:text-[#3c8669] transition-colors duration-200"
          >
            CTRL+BUILD
          </button>

          {/* Center Keyword - Desktop only */}
          {!isTablet && !isMobile && (
            <div className="absolute left-1/2 transform -translate-x-1/2 font-syne font-bold text-[10px] uppercase text-black">
              RO—WEB DESIGN & DEV
            </div>
          )}

          {/* Menu Trigger - Right */}
          <button
            onClick={toggleMenu}
            onMouseEnter={() => setIsHoveringMenu(true)}
            onMouseLeave={() => setIsHoveringMenu(false)}
            onTouchStart={() => {
              // Haptic feedback for mobile
              if (navigator.vibrate) {
                navigator.vibrate(50);
              }
              setIsHoveringMenu(true);
            }}
            onTouchEnd={() => setIsHoveringMenu(false)}
            className="flex items-center gap-2 font-syne font-bold text-black hover:underline hover:decoration-[#3c8669] hover:decoration-1 transition-all duration-200 flex-shrink-0"
          >
            <span>MENU</span>
            <div className={`grid grid-cols-2 gap-0.5 w-2 h-2 transition-transform duration-200 ${
              isHoveringMenu ? 'animate-pinwheel' : ''
            }`}>
              <div className="w-0.5 h-0.5 bg-black" style={{ borderRadius: '1px' }}></div>
              <div className="w-0.5 h-0.5 bg-black" style={{ borderRadius: '1px' }}></div>
              <div className="w-0.5 h-0.5 bg-black" style={{ borderRadius: '1px' }}></div>
              <div className="w-0.5 h-0.5 bg-black" style={{ borderRadius: '1px' }}></div>
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 animate-slide-in menu-overlay" 
          style={{ 
            backgroundColor: '#fcfaf7',
            background: '#fcfaf7'
          }}
        >
          <div className="flex flex-col h-full w-full">
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 font-syne font-bold text-black"
              >
                <span>CLOSE</span>
                <div className="grid grid-cols-2 gap-0.5 w-2 h-2">
                  <div className="w-0.5 h-0.5 bg-black" style={{ borderRadius: '1px' }}></div>
                  <div className="w-0.5 h-0.5 bg-black" style={{ borderRadius: '1px' }}></div>
                  <div className="w-0.5 h-0.5 bg-black" style={{ borderRadius: '1px' }}></div>
                  <div className="w-0.5 h-0.5 bg-black" style={{ borderRadius: '1px' }}></div>
                </div>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex items-center justify-start pl-8">
              <nav className="space-y-12">
                <button
                  onClick={() => handleLinkClick('work')}
                  onMouseEnter={() => setHoveredLink('work')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onTouchStart={() => {
                    // Instant flash for mobile
                    setHoveredLink('work');
                    if (navigator.vibrate) {
                      navigator.vibrate(30);
                    }
                  }}
                  onTouchEnd={() => setHoveredLink(null)}
                  className="block text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-syne font-bold text-pink" style={{
                      fontSize: isMobile ? 'clamp(2.25rem, 4.5vw, 4.5vw)' : '4.5vw'
                    }}>01</span>
                    <span className={`font-syne font-bold text-black ${
                      hoveredLink === 'work' 
                        ? 'bg-[#3c8669] text-[#fcfaf7] px-4 py-2' 
                        : ''
                    }`} style={{
                      fontSize: isMobile ? 'clamp(2.25rem, 4.5vw, 4.5vw)' : '4.5vw'
                    }}>
                      WORK
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleLinkClick('process')}
                  onMouseEnter={() => setHoveredLink('process')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onTouchStart={() => {
                    setHoveredLink('process');
                    if (navigator.vibrate) {
                      navigator.vibrate(30);
                    }
                  }}
                  onTouchEnd={() => setHoveredLink(null)}
                  className="block text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-syne font-bold text-pink" style={{
                      fontSize: isMobile ? 'clamp(2.25rem, 4.5vw, 4.5vw)' : '4.5vw'
                    }}>02</span>
                    <span className={`font-syne font-bold text-black ${
                      hoveredLink === 'process' 
                        ? 'bg-[#3c8669] text-[#fcfaf7] px-4 py-2' 
                        : ''
                    }`} style={{
                      fontSize: isMobile ? 'clamp(2.25rem, 4.5vw, 4.5vw)' : '4.5vw'
                    }}>
                      PROCESS
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleLinkClick('contact')}
                  onMouseEnter={() => setHoveredLink('contact')}
                  onMouseLeave={() => setHoveredLink(null)}
                  onTouchStart={() => {
                    setHoveredLink('contact');
                    if (navigator.vibrate) {
                      navigator.vibrate(30);
                    }
                  }}
                  onTouchEnd={() => setHoveredLink(null)}
                  className="block text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-syne font-bold text-pink" style={{
                      fontSize: isMobile ? 'clamp(2.25rem, 4.5vw, 4.5vw)' : '4.5vw'
                    }}>03</span>
                    <span className={`font-syne font-bold text-black ${
                      hoveredLink === 'contact' 
                        ? 'bg-[#3c8669] text-[#fcfaf7] px-4 py-2' 
                        : ''
                    }`} style={{
                      fontSize: isMobile ? 'clamp(2.25rem, 4.5vw, 4.5vw)' : '4.5vw'
                    }}>
                      CONTACT
                    </span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
