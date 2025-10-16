'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function FeaturedWork() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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

  const projects = [
    {
      id: 1,
      title: "iPower",
      services: "Web Design, Development, SEO",
      image: "/assets/images/featured-2.png",
      video: "/assets/images/Screenshot%20(15).png", // URL encoded spaces
      gridClass: "col-span-10 col-start-2",
      textPosition: "below",
      slug: "ipower"
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
            Selected Works
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-12 gap-8">
          {projects.map((project, index) => (
            <ProjectModule
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
              isHovered={hoveredProject === project.id}
              isSiblingHovered={hoveredProject !== null && hoveredProject !== project.id}
              onHover={() => {
                setHoveredProject(project.id);
                document.dispatchEvent(new CustomEvent('project-hover'));
              }}
              onLeave={() => {
                setHoveredProject(null);
                document.dispatchEvent(new CustomEvent('project-leave'));
              }}
            />
          ))}
        </div>

        {/* Section Call-to-Action */}
        <div className={`mt-24 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}>
          <div className="flex justify-end">
            <CallToAction />
          </div>
        </div>
      </div>
    </section>
  );
}

interface Project {
  id: number;
  title: string;
  services: string;
  image: string;
  video: string;
  gridClass: string;
  textPosition: string;
  slug: string;
}

function ProjectModule({
  project,
  index,
  isVisible,
  isHovered,
  isSiblingHovered,
  onHover,
  onLeave
}: {
  project: Project;
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  isSiblingHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => setShowVideo(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowVideo(false);
    }
  }, [isHovered]);

  return (
    <div 
      className={`${project.gridClass} transition-all duration-400 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${
        isSiblingHovered ? 'opacity-50 scale-98' : 'opacity-100 scale-100'
      }`}
      style={{ 
        transitionDelay: isVisible ? `${200 + index * 150}ms` : '0ms' 
      }}
    >
      <Link href={`/work/${project.slug}`}>
        <div
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          {/* Visual Container */}
          <div className={`relative overflow-hidden rounded-lg mb-6 group cursor-pointer transition-transform duration-400 ${
            isHovered ? 'scale-102' : 'scale-100'
          }`}>
            <div className="relative aspect-video">
              {/* Still Image */}
              <div 
                className={`absolute inset-0 transition-opacity duration-400 ${
                  showVideo ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Hover Image */}
              <div 
                className={`absolute inset-0 transition-opacity duration-400 ${
                  showVideo ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={project.video}
                  alt={`${project.title} - detailed view`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Block */}
          <div className="space-y-2">
            <h3 className={`font-tiempos text-3xl font-bold transition-colors duration-400 ${
              isHovered ? 'text-studio-green' : 'text-charcoal'
            }`}>
              {project.title}
            </h3>
            <p className="font-satoshi text-sm text-stone">
              {project.services}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function CallToAction() {
  const [isHovered, setIsHovered] = useState(false);

  return (
        <Link
          href="/work"
          className="relative cursor-pointer font-satoshi text-sm font-medium tracking-blueprint uppercase transition-colors duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
      Explore All Works
      <span
        className={`absolute bottom-0 left-0 h-px bg-studio-green transition-transform duration-250 origin-center ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`}
        style={{ width: '100%' }}
      />
        </Link>
  );
}
