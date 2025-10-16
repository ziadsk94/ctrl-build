'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import StartConversation from '@/components/StartConversation';

export default function StudioClient() {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-alabaster">
      {/* The Hero: The Premise */}
      <section className="relative h-screen bg-alabaster flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-12 h-full items-center">
            <div className="col-span-10 col-start-2 text-center">
              <div className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h1 className="font-tiempos text-charcoal text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-8">
                  A studio founded on a single belief.
                </h1>
                <p className="font-tiempos text-charcoal text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                  That structure creates freedom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Principles: The Core Beliefs */}
      <section ref={sectionRef} className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-32">
            <PrincipleSection
              number="01."
              title="Structure is the Strategy"
              content="We don't just design; we create systems. A well-defined brand and technical architecture is the only foundation for lasting digital work. Every decision we make serves the client's business goals and long-term vision."
              isVisible={isVisible}
            />
            <PrincipleSection
              number="02."
              title="Code is Craft"
              content="We treat code with the same reverence as a master carpenter treats wood. We write clean, performant, and accessible code not just because it works better, but because it's the right way to build. This is our craft, and we honor it."
              isVisible={isVisible}
            />
            <PrincipleSection
              number="03."
              title="Direct Partnership is Progress"
              content="Clients work directly with the principals—the designers and developers themselves. There are no account managers, no layers of bureaucracy. This ensures clarity, speed, and a better final product. Our size is our superpower."
              isVisible={isVisible}
            />
          </div>
        </div>
      </section>

      {/* The Toolkit: The Instruments of Precision */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
            <h2 className="font-tiempos text-charcoal text-5xl font-bold mb-16 text-center">
              Our Toolkit
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <ToolCategory
                title="Design"
                tools={[
                  { name: "Figma", rationale: "For collaborative design systems and prototyping" },
                  { name: "Adobe Creative Suite", rationale: "For advanced visual design and asset creation" }
                ]}
              />

              <ToolCategory
                title="Development"
                tools={[
                  { name: "Next.js", rationale: "For world-class performance and seamless deployment" },
                  { name: "Cloudflare", rationale: "For global CDN and edge computing performance" },
                  { name: "Sanity CMS", rationale: "For flexible, developer-friendly content management" },
                  { name: "Three.js", rationale: "For immersive 3D experiences and WebGL interactions" },
                  { name: "TypeScript", rationale: "For type-safe, maintainable code architecture" }
                ]}
              />

              <ToolCategory
                title="Strategy"
                tools={[
                  { name: "Notion", rationale: "For organized project documentation and collaboration" },
                  { name: "Miro", rationale: "For visual collaboration and workshop facilitation" }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Invitation: Join the Process */}
      <section className="py-24 bg-alabaster">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}>
            <h2 className="font-tiempos text-charcoal text-5xl font-bold mb-8">
              See our principles in practice.
            </h2>
            <Link
              href="/work"
              className="inline-block font-satoshi text-lg text-charcoal hover:text-studio-green transition-colors duration-300 relative group"
            >
              Explore Our Work
              <span className="absolute bottom-0 left-0 w-0 h-px bg-studio-green transition-all duration-250 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </section>

      {/* Start a Conversation / Footer */}
      <StartConversation />
    </div>
  );
}

function PrincipleSection({
  number,
  title,
  content,
  isVisible
}: {
  number: string;
  title: string;
  content: string;
  isVisible: boolean;
}) {
  return (
    <div className={`transition-all duration-800 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="flex items-start space-x-8">
        <div className="flex-shrink-0">
          <span className="font-satoshi text-6xl font-bold text-studio-green">
            {number}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-tiempos text-charcoal text-4xl font-bold mb-6">
            {title}
          </h3>
          <p className="font-satoshi text-charcoal text-lg leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

function ToolCategory({
  title,
  tools
}: {
  title: string;
  tools: Array<{ name: string; rationale: string }>;
}) {
  return (
    <div>
      <h3 className="font-satoshi text-charcoal text-xl font-bold mb-6">
        {title}
      </h3>
      <div className="space-y-4">
        {tools.map((tool, index) => (
          <ToolItem key={index} name={tool.name} rationale={tool.rationale} />
        ))}
      </div>
    </div>
  );
}

function ToolItem({ name, rationale }: { name: string; rationale: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="font-mono text-charcoal text-sm mb-1">
        {name}
      </div>
      <div className={`font-satoshi text-stone text-xs transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        {rationale}
      </div>
    </div>
  );
}
