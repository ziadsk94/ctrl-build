'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the WebGL component to ensure it's client-side only
const AbstractVisual = dynamic(() => import('./AbstractVisual'), {
  ssr: false,
});

export default function OurApproach() {
  const [activePillar, setActivePillar] = useState(1);
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

  const pillars = [
    {
      id: 1,
      number: "01",
      title: "DISCOVER",
      content: {
        title: "Discover — Establishing the Foundation",
        narrative: "This phase is about strategic clarity. We don't write a line of code or draw a single pixel until we understand the core purpose. We define the problem, the audience, and the desired outcome to create a strategic bedrock.",
        deliverables: ["Brand Strategy", "Audience Research", "Information Architecture", "Content Strategy"]
      }
    },
    {
      id: 2,
      number: "02",
      title: "DESIGN",
      content: {
        title: "Design — Creating the System",
        narrative: "We design systems, not just pages. We build a comprehensive visual language—from typography and color to interaction and motion—that is both beautiful and functional. The result is a coherent, scalable design blueprint that solves problems with elegance.",
        deliverables: ["Visual Identity", "UI/UX Design", "Interaction Systems", "Prototyping"]
      }
    },
    {
      id: 3,
      number: "03",
      title: "BUILD",
      content: {
        title: "Build — Constructing with Precision",
        narrative: "This is where the blueprint becomes reality. Our development process is an act of digital craftsmanship. We write clean, efficient, and scalable code, ensuring the final product is not only true to the design but is also performant, accessible, and built to last.",
        deliverables: ["Front-End Development", "CMS Integration", "Performance Optimization", "QA Testing"]
      }
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-alabaster">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className={`transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-tiempos text-charcoal text-6xl font-bold mb-16 col-span-10 col-start-2">
            Our Approach
          </h2>
        </div>

        {/* Two-Part Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Pane - The Index */}
          <div className="col-span-3 col-start-2">
            <div className={`transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
              <PillarIndex 
                pillars={pillars}
                activePillar={activePillar}
                onPillarSelect={setActivePillar}
              />
            </div>
          </div>

          {/* Right Pane - The Exposition */}
          <div className="col-span-6 col-start-6">
            <div className={`transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}>
              <PillarExposition 
                pillar={pillars[activePillar - 1]}
                activePillar={activePillar}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarIndex({ 
  pillars, 
  activePillar, 
  onPillarSelect 
}: {
  pillars: any[];
  activePillar: number;
  onPillarSelect: (id: number) => void;
}) {
  return (
    <div className="space-y-8">
      {pillars.map((pillar, index) => (
        <PillarItem
          key={pillar.id}
          pillar={pillar}
          isActive={activePillar === pillar.id}
          onSelect={() => onPillarSelect(pillar.id)}
        />
      ))}
    </div>
  );
}

function PillarItem({ 
  pillar, 
  isActive, 
  onSelect 
}: {
  pillar: any;
  isActive: boolean;
  onSelect: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <button
        className={`font-satoshi text-base font-medium tracking-blueprint uppercase transition-colors duration-300 text-left ${
          isActive ? 'text-charcoal' : 'text-stone'
        } ${isHovered && !isActive ? 'text-charcoal' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
      >
        <span className="text-studio-green mr-4">{pillar.number}</span>
        {pillar.title}
      </button>
      
      {/* Studio Green Marker */}
      {isActive && (
        <div className="absolute -left-8 top-0.5 w-0.5 h-4 bg-studio-green transition-all duration-300 rounded-full" />
      )}
    </div>
  );
}

function PillarExposition({ 
  pillar, 
  activePillar 
}: {
  pillar: any;
  activePillar: number;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [activePillar]);

  return (
    <div className="space-y-8">
      {/* Text Content */}
      <div className={`transition-all duration-300 ${
        isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <h3 className="font-tiempos text-charcoal text-3xl font-bold mb-4">
          {pillar.content.title}
        </h3>
        
        <p className="font-satoshi text-charcoal text-lg leading-relaxed mb-6">
          {pillar.content.narrative}
        </p>
        
        <div className="space-y-2">
          <h4 className="font-satoshi text-charcoal text-sm font-medium tracking-blueprint uppercase mb-3">
            Deliverables:
          </h4>
          <ul className="space-y-1">
            {pillar.content.deliverables.map((deliverable: string, index: number) => (
              <li key={index} className="font-satoshi text-stone text-sm">
                • {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Abstract Visual */}
      <div className="mt-12">
        <AbstractVisual pillar={activePillar === 1 ? 'discover' : activePillar === 2 ? 'design' : 'build'} />
      </div>
    </div>
  );
}

