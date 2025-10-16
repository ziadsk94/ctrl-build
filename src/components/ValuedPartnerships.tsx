'use client';

import { useState, useEffect, useRef } from 'react';

export default function ValuedPartnerships() {
  const [isVisible, setIsVisible] = useState(false);
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

  const partners = [
    { name: "Aether Acoustics", logo: "AA" },
    { name: "Studio North", logo: "SN" },
    { name: "Digital Foundry", logo: "DF" },
    { name: "Urban Planning Co.", logo: "UP" },
    { name: "Tech Innovations", logo: "TI" },
    { name: "Creative Collective", logo: "CC" },
    { name: "Design Systems", logo: "DS" },
    { name: "Future Builders", logo: "FB" },
    { name: "Architectural Studio", logo: "AS" },
    { name: "Innovation Labs", logo: "IL" },
    { name: "Creative Partners", logo: "CP" },
    { name: "Design Alliance", logo: "DA" }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-alabaster">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className={`transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-tiempos text-charcoal text-6xl font-bold mb-6">
            Valued Partnerships
          </h2>
          
          {/* Introductory Statement */}
          <p className="font-satoshi text-charcoal text-lg leading-relaxed mb-16">
            We build lasting relationships with organizations that value craft, clarity, and commitment.
          </p>
        </div>

        {/* The Ledger Layout */}
        <div className={`transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
          <PartnershipLedger partners={partners} />
        </div>
      </div>
    </section>
  );
}

function PartnershipLedger({ partners }: { partners: Array<{ name: string; logo: string }> }) {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-10 col-start-2">
        <div className="grid grid-cols-2 gap-x-20 gap-y-12">
          {partners.map((partner, index) => (
            <PartnershipEntry
              key={partner.name}
              partner={partner}
              index={index}
              isHovered={hoveredPartner === partner.name}
              isSiblingHovered={hoveredPartner !== null && hoveredPartner !== partner.name}
              onHover={() => setHoveredPartner(partner.name)}
              onLeave={() => setHoveredPartner(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PartnershipEntry({ 
  partner, 
  index, 
  isHovered, 
  isSiblingHovered, 
  onHover, 
  onLeave 
}: {
  partner: { name: string; logo: string };
  index: number;
  isHovered: boolean;
  isSiblingHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div 
      className={`relative transition-all duration-300 ease-out ${
        isSiblingHovered ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div
        className="flex items-center justify-between cursor-pointer group"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Partner Name */}
        <span className={`font-satoshi text-2xl font-medium transition-colors duration-300 ${
          isHovered ? 'text-charcoal' : 'text-stone'
        }`}>
          {partner.name}
        </span>

        {/* Logo Reveal */}
        <div className={`transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center">
            <span className="text-alabaster font-satoshi font-bold text-sm">
              {partner.logo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
