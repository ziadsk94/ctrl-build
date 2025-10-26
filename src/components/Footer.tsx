'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showColumn1, setShowColumn1] = useState(false);
  const [showColumn2, setShowColumn2] = useState(false);
  const [showColumn3, setShowColumn3] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
        
        if (isInView) {
          // Staggered from left to right with 0.1s delay
          setTimeout(() => setShowColumn1(true), 200);
          setTimeout(() => setShowColumn2(true), 300); // 0.1s delay
          setTimeout(() => setShowColumn3(true), 400); // 0.1s delay
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

      const handleLinkClick = (link: string) => {
        if (link === 'work') {
          router.push('/work');
        } else if (link === 'process') {
          router.push('/process');
        } else if (link === 'contact') {
          router.push('/contact');
        } else if (link === 'privacy') {
          router.push('/privacy');
        }
      };

  return (
    <footer ref={sectionRef} className="bg-pink">
      {/* Main Footer Content */}
      <div className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            
            {/* Column 01: Brand & Contact */}
            <div className={`transition-all duration-500 ${
              showColumn1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <h4 className="font-syne font-bold text-black text-xl mb-4">
                CTRL+BUILD
              </h4>
              <p className="font-fraunces text-black text-base leading-relaxed mb-4">
                A digital studio, based in Romania, building definitive global platforms.
              </p>
              <a
                href="mailto:contact@ctrl-build.com"
                onClick={() => handleLinkClick('email')}
                onMouseEnter={() => setHoveredLink('email')}
                onMouseLeave={() => setHoveredLink(null)}
                className={`font-fraunces text-base transition-colors duration-200 ${
                  hoveredLink === 'email' ? 'text-[#3c8669]' : 'text-black'
                }`}
              >
                contact@ctrl-build.com
              </a>
            </div>

            {/* Column 02: Menu */}
            <div className={`transition-all duration-500 ${
              showColumn2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <h4 className="font-syne font-bold text-black text-xl mb-4">
                EXPLORE
              </h4>
              <nav className="space-y-2">
                <a
                  href="/work"
                  onClick={() => handleLinkClick('work')}
                  onMouseEnter={() => setHoveredLink('work')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`block font-fraunces text-base transition-colors duration-200 ${
                    hoveredLink === 'work' ? 'text-[#3c8669]' : 'text-black'
                  }`}
                >
                  Work
                </a>
                <a
                  href="/process"
                  onClick={() => handleLinkClick('process')}
                  onMouseEnter={() => setHoveredLink('process')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`block font-fraunces text-base transition-colors duration-200 ${
                    hoveredLink === 'process' ? 'text-[#3c8669]' : 'text-black'
                  }`}
                >
                  Process
                </a>
                <a
                  href="/contact"
                  onClick={() => handleLinkClick('contact')}
                  onMouseEnter={() => setHoveredLink('contact')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`block font-fraunces text-base transition-colors duration-200 ${
                    hoveredLink === 'contact' ? 'text-[#3c8669]' : 'text-black'
                  }`}
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Column 03: Social */}
            <div className={`transition-all duration-500 ${
              showColumn3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <h4 className="font-syne font-bold text-black text-xl mb-4">
                SOCIAL
              </h4>
              <nav className="space-y-2">
                <a
                  href="https://instagram.com/buildwithctrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick('instagram')}
                  onMouseEnter={() => setHoveredLink('instagram')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`block font-fraunces text-base transition-colors duration-200 ${
                    hoveredLink === 'instagram' ? 'text-[#3c8669]' : 'text-black'
                  }`}
                >
                  Instagram
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Separator */}
      <div className="w-full h-px bg-black"></div>

      {/* Sub-Footer */}
      <div className="py-6 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-fraunces text-black text-sm">
              © CTRL+BUILD 2025
            </div>
            <a
              href="/privacy"
              onClick={() => handleLinkClick('privacy')}
              onMouseEnter={() => setHoveredLink('privacy')}
              onMouseLeave={() => setHoveredLink(null)}
              className={`font-fraunces text-sm transition-colors duration-200 ${
                hoveredLink === 'privacy' ? 'text-[#3c8669]' : 'text-black'
              }`}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
