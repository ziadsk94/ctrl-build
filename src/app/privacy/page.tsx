'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200);
    setTimeout(() => setShowHeroContent(true), 400);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
    };

    const handleScroll = () => {
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            setVisibleSections(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        }
      });
    };

    setVisibleSections(new Array(6).fill(false));

    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sections = [
    {
      title: "1. DATA WE COLLECT",
      content: "We collect only the data necessary to provide our services and improve your experience. This includes:\n\n• Contact information you provide when reaching out to us\n• Website usage data through analytics tools\n• Communication records when you contact us\n\nWe do not collect sensitive personal information unless explicitly provided by you for project purposes."
    },
    {
      title: "2. HOW WE USE YOUR DATA",
      content: "Your data is used exclusively for:\n\n• Responding to your inquiries and project requests\n• Providing our web design and development services\n• Improving our website and services\n• Complying with legal obligations\n\nWe never sell, rent, or share your personal information with third parties for marketing purposes."
    },
    {
      title: "3. DATA STORAGE & SECURITY",
      content: "We implement appropriate technical and organizational measures to protect your data:\n\n• Secure data transmission using HTTPS encryption\n• Regular security updates and monitoring\n• Limited access to personal data on a need-to-know basis\n• Secure backup systems with encryption\n\nData is stored only as long as necessary for the purposes outlined in this policy."
    },
    {
      title: "4. YOUR RIGHTS",
      content: "You have the right to:\n\n• Access your personal data we hold\n• Request correction of inaccurate data\n• Request deletion of your data\n• Object to processing of your data\n• Data portability where applicable\n\nTo exercise these rights, contact us at contact@ctrl-build.com. We will respond within 30 days."
    },
    {
      title: "5. COOKIES & ANALYTICS",
      content: "Our website uses essential cookies for functionality and analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings.\n\nWe use Google Analytics to understand how visitors interact with our site. This data is anonymized and used solely to improve our services."
    },
    {
      title: "6. CONTACT & UPDATES",
      content: "This privacy policy may be updated periodically. We will notify you of significant changes via email or website notice.\n\nFor questions about this policy or your data, contact us at contact@ctrl-build.com.\n\nLast updated: January 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main>
        <section className={`${isMobile ? 'h-[40vh]' : 'h-[50vh]'} bg-cream flex items-center justify-center px-6 md:px-16`}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 
              className={`font-syne font-bold text-black mb-8 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              PRIVACY POLICY
            </h1>
            
            <div 
              className={`${isMobile ? 'max-w-[90%]' : 'max-w-[60%]'} mx-auto transition-all duration-500 ${
                showHeroContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="font-fraunces text-black text-lg leading-relaxed">
                We believe in transparency. Our policy is written in plain English to be as clear as our code. We respect your data and are committed to protecting it.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream py-24 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <div key={index}>
                <div 
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className={`transition-all duration-700 ${
                    visibleSections[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{                     transitionDelay: `${index * 100}ms` }}
                  >
                  <h2 className="font-syne font-bold text-black text-xl md:text-2xl mb-6 text-left">
                    {section.title}
                  </h2>
                  
                  <div className="mb-8">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="font-fraunces text-black text-lg leading-relaxed mb-4">
                        {paragraph.split('\n').map((line, lIndex) => {
                          if (line.startsWith('•')) {
                            return (
                              <span key={lIndex} className="block ml-4">
                                {line}
                              </span>
                            );
                          }
                          return line;
                        })}
                      </p>
                    ))}
                  </div>
                </div>

                {index < sections.length - 1 && (
                  <div className="w-full h-px bg-black mb-12"></div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
