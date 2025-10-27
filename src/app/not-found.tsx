'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [errorCode, setErrorCode] = useState('39&');
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200);
    setTimeout(() => setShowContent(true), 400);

    const glitchCharacters = ['39&', '5#1', '2@8', '7$3', '1!9', '6%4', '404'];
    let glitchIndex = 0;
    
    const glitchInterval = setInterval(() => {
      setErrorCode(glitchCharacters[glitchIndex]);
      glitchIndex++;
      
      if (glitchIndex >= glitchCharacters.length) {
        clearInterval(glitchInterval);
        setIsGlitching(false);
        setErrorCode('404');
      }
    }, 100);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 
          className={`font-syne font-bold mb-8 transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            fontSize: 'clamp(8rem, 20vw, 20rem)',
            WebkitTextStroke: '1px #020202',
            color: 'transparent',
            fontFamily: 'Syne, sans-serif'
          }}
        >
          {errorCode}
        </h1>

        <h2 
          className={`font-syne font-bold text-black mb-6 transition-all duration-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          PAGE NOT FOUND
        </h2>

        <p 
          className={`font-fraunces text-black mb-12 transition-all duration-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            transitionDelay: '200ms'
          }}
        >
          The link is broken or the page has been removed. We suggest returning to the homepage.
        </p>

        <div 
          className={`transition-all duration-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <Link href="/">
            <button className="bg-[#3c8669] hover:bg-transparent hover:border-2 hover:border-[#3c8669] px-12 py-4 font-syne font-bold text-black transition-all duration-300 text-lg">
              RETURN HOME
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
