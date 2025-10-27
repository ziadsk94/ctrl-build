'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
    };

    handleResize();
    
    setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => setIsVisible(true), 100);
    }, 500);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    setTimeout(() => setIsLoaded(false), 600);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    setTimeout(() => setIsLoaded(false), 600);
  };

  if (!isLoaded) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-cream border-t border-black z-50 transition-all duration-600 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ 
        height: isMobile ? '140px' : '100px',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: '#fcfaf7',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -4px 20px rgba(2, 2, 2, 0.1)'
      }}
    >
      <div className="h-full px-6 md:px-16 flex items-center">
        {!isMobile && (
          <>
            <div className="flex-1 pr-8" style={{ flex: '0 0 70%' }}>
              <h4 className="font-syne font-bold text-black text-lg mb-2">
                OUR USE OF COOKIES
              </h4>
              <p className="font-fraunces text-black text-sm leading-relaxed">
                We use essential performance and analytics cookies to run our site and understand our traffic. We do not use them for advertising. You can review our{' '}
                <Link href="/privacy" className="text-[#3c8669] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex gap-4" style={{ flex: '0 0 30%' }}>
              <button
                onClick={handleDecline}
                className="border border-black bg-transparent hover:bg-black hover:text-cream px-6 py-3 font-syne font-bold text-black transition-all duration-300 text-sm"
              >
                DECLINE
              </button>
              <button
                onClick={handleAccept}
                className="bg-[#3c8669] hover:bg-transparent hover:border-2 hover:border-[#3c8669] px-6 py-3 font-syne font-bold text-black transition-all duration-300 text-sm"
              >
                ACCEPT
              </button>
            </div>
          </>
        )}

        {isMobile && (
          <div className="w-full">
            <div className="mb-4">
              <h4 className="font-syne font-bold text-black text-base mb-2">
                OUR USE OF COOKIES
              </h4>
              <p className="font-fraunces text-black text-sm leading-relaxed">
                We use essential performance and analytics cookies to run our site and understand our traffic. We do not use them for advertising. You can review our{' '}
                <Link href="/privacy" className="text-[#3c8669] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="flex-1 border border-black bg-transparent hover:bg-black hover:text-cream py-3 font-syne font-bold text-black transition-all duration-300 text-sm"
              >
                DECLINE
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 bg-[#3c8669] hover:bg-transparent hover:border-2 hover:border-[#3c8669] py-3 font-syne font-bold text-black transition-all duration-300 text-sm"
              >
                ACCEPT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
