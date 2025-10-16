'use client';

import { useState, useEffect, useRef } from 'react';

export default function StartConversation() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Live time element
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Bucharest',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(`CRAIOVA, RO. ${timeString} EEST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-alabaster">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Pane - The Invitation */}
          <div className={`col-span-12 md:col-span-6 md:col-start-2 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="space-y-6 md:space-y-8">
              {/* Primary Headline */}
              <h2 className="font-tiempos text-charcoal text-5xl md:text-6xl lg:text-8xl font-bold leading-none">
                Start a Conversation.
              </h2>
              
              {/* Supporting Statement */}
              <p className="font-satoshi text-charcoal text-base md:text-lg leading-relaxed">
                Have a challenge in mind or a project on the horizon? We&apos;re ready to listen.
              </p>
              
              {/* Call-to-Action */}
              <div className="pt-4">
                <CTAButton />
              </div>
            </div>
          </div>

          {/* Right Pane - The Ledger */}
          <div className={`col-span-12 md:col-span-4 md:col-start-9 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
            <ContactLedger currentTime={currentTime} />
          </div>
        </div>
      </div>
      
      {/* The Plinth - Integrated Footer */}
      <ThePlinth />
    </section>
  );
}

function CTAButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="mailto:contact@ctrl-build.com?subject=Project Inquiry from ctrlbuild.com"
      className="inline-block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Animated border */}
        <div className={`absolute inset-0 transition-all duration-400 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-full h-full border border-studio-green">
            <div className={`absolute top-0 left-0 h-px bg-studio-green transition-all duration-100 ${
              isHovered ? 'w-full' : 'w-0'
            }`} style={{ transitionDelay: isHovered ? '0ms' : '300ms' }} />
            <div className={`absolute top-0 right-0 w-px bg-studio-green transition-all duration-100 ${
              isHovered ? 'h-full' : 'h-0'
            }`} style={{ transitionDelay: isHovered ? '100ms' : '200ms' }} />
            <div className={`absolute bottom-0 right-0 h-px bg-studio-green transition-all duration-100 ${
              isHovered ? 'w-full' : 'w-0'
            }`} style={{ transitionDelay: isHovered ? '200ms' : '100ms' }} />
            <div className={`absolute bottom-0 left-0 w-px bg-studio-green transition-all duration-100 ${
              isHovered ? 'h-full' : 'h-0'
            }`} style={{ transitionDelay: isHovered ? '300ms' : '0ms' }} />
          </div>
        </div>
        
        {/* Text */}
        <span className={`font-satoshi text-sm font-medium tracking-blueprint uppercase transition-colors duration-300 ${
          isHovered ? 'text-studio-green' : 'text-charcoal'
        }`}>
          SEND AN INQUIRY
        </span>
      </div>
    </a>
  );
}

function ContactLedger({ currentTime }: { currentTime: string }) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact@ctrl-build.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* General Inquiries */}
      <div>
        <h3 className="font-satoshi text-xs font-medium tracking-blueprint uppercase text-stone mb-3">
          GENERAL INQUIRIES
        </h3>
        <div
          className="font-satoshi text-sm text-charcoal cursor-pointer transition-colors duration-300"
          onMouseEnter={() => setIsEmailHovered(true)}
          onMouseLeave={() => setIsEmailHovered(false)}
          onClick={copyEmail}
        >
          {emailCopied ? (
            <span className="text-studio-green">COPIED</span>
          ) : isEmailHovered ? (
            <span>COPY TO CLIPBOARD</span>
          ) : (
            <span>contact@ctrl-build.com</span>
          )}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-satoshi text-xs font-medium tracking-blueprint uppercase text-stone mb-3">
          LOCATION
        </h3>
        <p className="font-satoshi text-sm text-charcoal">
          Craiova, Dolj County, Romania
        </p>
      </div>

      {/* Connect */}
      <div>
        <h3 className="font-satoshi text-xs font-medium tracking-blueprint uppercase text-stone mb-3">
          CONNECT
        </h3>
        <div className="space-y-2">
          <div>
              <a 
                href="https://instagram.com/buildwithctrl" 
                className="inline-block font-satoshi text-sm text-charcoal hover:text-studio-green transition-colors duration-300 relative group"
              >
                Instagram
                <span className="absolute bottom-0 left-0 w-0 h-px bg-studio-green transition-all duration-250 group-hover:w-full" />
              </a>
          </div>
          <div>
            <a 
              href="https://behance.net/ctrlbuild" 
              className="inline-block font-satoshi text-sm text-charcoal hover:text-studio-green transition-colors duration-300 relative group"
            >
              Behance
              <span className="absolute bottom-0 left-0 w-0 h-px bg-studio-green transition-all duration-250 group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>

      {/* Live Element */}
      <div className="pt-8">
        <p className="font-mono text-xs text-stone tracking-blueprint uppercase">
          {currentTime}
        </p>
      </div>
    </div>
  );
}

// The Plinth - Integrated Footer
function ThePlinth() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-stone/20">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Left-Aligned Component - Legal Notice */}
            <div className="font-mono text-xs text-stone">
              © CTRL+BUILD {currentYear}
            </div>
            
            {/* Right-Aligned Component - Credit and Versioning */}
            <div className="font-mono text-xs text-stone">
              DESIGN & BUILD: IN-HOUSE. V.1.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
