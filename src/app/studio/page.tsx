import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import StartConversation from '@/components/StartConversation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Studio - Digital Architecture Philosophy",
  description: "Discover CTRL+BUILD's manifesto: structure creates freedom. Learn about our principles, toolkit, and approach to digital architecture and design.",
  keywords: [
    "digital architecture philosophy",
    "web design principles",
    "development approach",
    "design manifesto",
    "creative process",
    "digital strategy",
    "Next.js development",
    "Cloudflare deployment"
  ],
  openGraph: {
    title: "Our Studio - Digital Architecture Philosophy | CTRL+BUILD",
    description: "Discover CTRL+BUILD's manifesto: structure creates freedom. Learn about our principles, toolkit, and approach to digital architecture and design.",
    url: "https://ctrlbuild.com/studio",
    type: "website",
  },
  alternates: {
    canonical: "/studio",
  },
};

export default function StudioPage() {
  const [isVisible, setIsVisible] = useState(true);
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
            {/* Principle 01 */}
            <PrincipleSection
              number="01"
              title="Structure is the Strategy"
              content="We don't just design; we create systems. A well-defined brand and technical architecture is the only foundation for lasting digital work. Every decision we make serves the client's business goals and long-term vision."
              isVisible={isVisible}
            />

            {/* Principle 02 */}
            <PrincipleSection
              number="02"
              title="Code is Craft"
              content="We treat code with the same reverence as a master carpenter treats wood. We write clean, performant, and accessible code not just because it works better, but because it's the right way to build. This is our craft, and we honor it."
              isVisible={isVisible}
            />

            {/* Principle 03 */}
            <PrincipleSection
              number="03"
              title="Direct Partnership is Progress"
              content="Clients work directly with the principals—the designers and developers themselves. There are no account managers, no layers of bureaucracy. This ensures clarity, speed, and a better final product. Our size is our superpower."
              isVisible={isVisible}
            />
          </div>
        </div>
      </section>

      {/* The Founders: The Craftspeople - Hidden for now */}
      {/* <section className="py-24 bg-stone/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="font-tiempos text-charcoal text-5xl font-bold mb-16 text-center">
              The Craftspeople
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <FounderCard
                name="Alexandru Popescu"
                title="Founder & Creative Technologist"
                bio="I believe that the best digital experiences emerge from the intersection of thoughtful design and robust engineering. Every pixel, every line of code, every interaction should serve a purpose."
                image="/assets/images/founder-1.jpg"
              />
              
              <FounderCard
                name="Ziad L."
                title="Founder & Design Director"
                bio="I believe that structure liberates creativity. When we establish clear systems and principles, we create the freedom to focus on what truly matters—crafting meaningful experiences that resonate."
                image="/assets/images/founder-2.jpg"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* The Toolkit: The Instruments of Precision */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
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
                  { name: "Miro", rationale: "For visual strategy mapping and client workshops" }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Invitation: Join the Process */}
      <section className="py-24 bg-stone/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
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
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Sticky Number */}
        <div className="col-span-2 md:col-span-1">
          <div className="sticky top-24">
            <span className="font-tiempos text-studio-green text-6xl font-bold">
              {number}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="col-span-10 md:col-span-11">
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

function FounderCard({ 
  name, 
  title, 
  bio, 
  image 
}: {
  name: string;
  title: string;
  bio: string;
  image: string;
}) {
  return (
    <div className="space-y-6">
      {/* Image Placeholder */}
      <div className="w-full h-64 bg-stone/20 rounded-lg flex items-center justify-center">
        <span className="font-satoshi text-stone text-sm">Founder Photo</span>
      </div>
      
      {/* Content */}
      <div>
        <h3 className="font-tiempos text-charcoal text-2xl font-bold mb-2">
          {name}
        </h3>
        <p className="font-satoshi text-studio-green text-sm font-medium tracking-blueprint uppercase mb-4">
          {title}
        </p>
        <p className="font-satoshi text-charcoal text-base leading-relaxed">
          {bio}
        </p>
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
      <h3 className="font-tiempos text-charcoal text-2xl font-bold mb-6">
        {title}
      </h3>
      <div className="space-y-4">
        {tools.map((tool, index) => (
          <ToolItem key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
}

function ToolItem({ 
  tool 
}: {
  tool: { name: string; rationale: string };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`font-mono text-sm transition-colors duration-300 ${
        isHovered ? 'text-studio-green' : 'text-charcoal'
      }`}>
        {tool.name}
      </div>
      {isHovered && (
        <div className="font-satoshi text-stone text-xs mt-1 transition-opacity duration-300">
          {tool.rationale}
        </div>
      )}
    </div>
  );
}
