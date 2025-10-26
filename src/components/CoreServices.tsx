'use client';

import { useState, useEffect, useRef } from 'react';

export default function CoreServices() {
  const [isVisible, setIsVisible] = useState(false);
  const [showColumn1, setShowColumn1] = useState(false);
  const [showColumn2, setShowColumn2] = useState(false);
  const [showColumn3, setShowColumn3] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
        
        if (isInView) {
          if (isMobile) {
            // Vertical cascade for mobile
            setTimeout(() => setShowColumn1(true), 200);
            setTimeout(() => setShowColumn2(true), 400);
            setTimeout(() => setShowColumn3(true), 600);
          } else {
            // Staggered sequence from left to right for desktop/tablet
            setTimeout(() => setShowColumn1(true), 200);
            setTimeout(() => setShowColumn2(true), 350); // 0.15s delay
            setTimeout(() => setShowColumn3(true), 500); // 0.15s delay
          }
        }
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
    };

    // Initial checks
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const services = [
    {
      number: "01",
      title: "BESPOKE UI/UX DESIGN",
      description: "We design pixel-perfect interfaces built on strategic user experience, ensuring your platform is beautiful, intuitive, and drives results."
    },
    {
      number: "02", 
      title: "HEADLESS DEVELOPMENT",
      description: "We build high-performance websites using modern headless architecture. This means unparalleled speed, security, and scalability."
    },
    {
      number: "03",
      title: "TECHNICAL SEO STRATEGY", 
      description: "Our design and development process is built on a foundation of technical SEO, ensuring you are visible to the right audience from day one."
    }
  ];

  return (
    <section ref={sectionRef} className="bg-cream py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-syne font-bold text-black text-3xl md:text-4xl">
            Core Capabilities
          </h2>
        </div>

        {/* Desktop/Tablet: 3-Column Grid */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {services.map((service, index) => {
              const isColumnVisible = index === 0 ? showColumn1 : index === 1 ? showColumn2 : showColumn3;
              const isHovered = hoveredColumn === index;
              
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredColumn(index)}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  {/* Hover Outline */}
                  <div 
                    className={`absolute inset-0 border border-[#3c8669] transition-all duration-200 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      borderWidth: '1px',
                      borderRadius: '0px'
                    }}
                  />
                  
                  {/* Content */}
                  <div className={`transition-all duration-500 ${
                    isColumnVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    {/* Number */}
                    <div 
                      className={`font-syne font-bold text-6xl mb-4 transition-colors duration-200 ${
                        isHovered ? 'text-[#3c8669]' : 'text-pink'
                      }`}
                    >
                      {service.number}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-syne font-bold text-black text-xl md:text-2xl mb-6">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-fraunces text-black text-base md:text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile: Vertical Stack */}
        {isMobile && (
          <div className="space-y-0">
            {services.map((service, index) => {
              const isColumnVisible = index === 0 ? showColumn1 : index === 1 ? showColumn2 : showColumn3;
              
              return (
                <div key={index}>
                  {/* Service Block */}
                  <div className={`transition-all duration-500 ${
                    isColumnVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    {/* Number */}
                    <div className="font-syne font-bold text-6xl mb-4 text-pink">
                      {service.number}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-syne font-bold text-black text-xl mb-6">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-fraunces text-black text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Separator Line (except for last item) */}
                  {index < services.length - 1 && (
                    <div className="w-full h-px bg-black my-12"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
