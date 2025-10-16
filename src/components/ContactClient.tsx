'use client';

import { useState, useEffect } from 'react';

export default function ContactClient() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Bucharest'
      });
      setCurrentTime(`${timeString} EEST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Check online status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Pane - The Invitation */}
            <div className={`col-span-12 md:col-span-6 md:col-start-2 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="space-y-6 md:space-y-8">
                <h1 className="font-tiempos text-charcoal text-5xl md:text-6xl lg:text-8xl font-bold leading-none">
                  Let's build together.
                </h1>
                <p className="font-satoshi text-charcoal text-base md:text-lg leading-relaxed">
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
                  <p className="font-mono text-sm text-charcoal">
                    {currentTime} — {isOnline ? 'CURRENTLY ONLINE' : 'CURRENTLY OFFLINE'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
