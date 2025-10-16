'use client';

import { useState, useEffect } from 'react';
import StartConversation from '@/components/StartConversation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - Let's Build Together",
  description: "Get in touch with CTRL+BUILD for your digital architecture needs. Direct contact, no forms - real conversations for real projects.",
  keywords: [
    "contact web design",
    "web development inquiry",
    "digital architecture consultation",
    "Romania web design",
    "Craiova web development",
    "direct contact",
    "project inquiry"
  ],
  openGraph: {
    title: "Contact Us - Let's Build Together | CTRL+BUILD",
    description: "Get in touch with CTRL+BUILD for your digital architecture needs. Direct contact, no forms - real conversations for real projects.",
    url: "https://ctrlbuild.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

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

    const sectionRef = document.querySelector('#contact-section');
    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  }, []);

  // Live time element
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: 'Europe/Bucharest', // Craiova, Romania timezone
      };
      const timeString = now.toLocaleTimeString('en-US', options);
      setCurrentTime(`CRAIOVA, RO. ${timeString} EEST`);
      
      // Determine if online (9 AM - 6 PM Romania time)
      const hour = now.getHours();
      setIsOnline(hour >= 9 && hour < 18);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@ctrlbuild.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="min-h-screen bg-alabaster">
      {/* The Direct Connection */}
      <section id="contact-section" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Pane - The Invitation */}
            <div className={`col-span-12 md:col-span-6 md:col-start-2 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="space-y-6">
                {/* Primary Headline */}
                <h1 className="font-tiempos text-charcoal text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
                  Let's build together.
                </h1>
                
                {/* Supporting Paragraph */}
                <p className="font-satoshi text-charcoal text-lg leading-relaxed">
                  We believe the best work begins with a real conversation. We've skipped the forms to connect with you directly. For new projects, collaborations, or inquiries, please use the channels provided.
                </p>
              </div>
            </div>

            {/* Right Pane - The Channels */}
            <div className={`col-span-12 md:col-span-4 md:col-start-9 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
              <div className="space-y-8">
                {/* Primary Contact */}
                <div>
                  <h3 className="font-satoshi text-xs font-medium tracking-blueprint uppercase text-stone mb-4">
                    PRIMARY CONTACT
                  </h3>
                  <div
                    className="font-satoshi text-lg text-charcoal cursor-pointer transition-colors duration-300"
                    onMouseEnter={() => setIsEmailHovered(true)}
                    onMouseLeave={() => setIsEmailHovered(false)}
                    onClick={copyEmail}
                  >
                    {emailCopied ? (
                      <span className="text-studio-green">COPIED</span>
                    ) : isEmailHovered ? (
                      <span>COPY TO CLIPBOARD</span>
                    ) : (
                      <span>hello@ctrlbuild.com</span>
                    )}
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h3 className="font-satoshi text-xs font-medium tracking-blueprint uppercase text-stone mb-4">
                    SOCIAL
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

                {/* Studio Status */}
                <div>
                  <h3 className="font-satoshi text-xs font-medium tracking-blueprint uppercase text-stone mb-4">
                    STUDIO STATUS
                  </h3>
                  <div className="space-y-2">
                    <p className="font-mono text-sm text-charcoal">
                      {currentTime}
                    </p>
                    <p className={`font-mono text-xs ${
                      isOnline ? 'text-studio-green' : 'text-stone'
                    }`}>
                      {isOnline ? 'CURRENTLY ONLINE' : 'CURRENTLY OFFLINE'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
