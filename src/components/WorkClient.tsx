'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import StartConversation from '@/components/StartConversation';

export default function WorkClient() {
  const [activeFilter, setActiveFilter] = useState('ALL');
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

  const filters = ['ALL', 'BRAND IDENTITY', 'WEB PLATFORM', 'DEVELOPMENT'];

  const projects = [
    {
      id: 'aetier',
      title: 'AETIER',
      services: 'Brand Strategy, Digital Experience, Web Development',
      category: 'BRAND IDENTITY',
      image: '/assets/images/featured-4.png',
      slug: 'aetier'
    },
    {
      id: 'ipower',
      title: 'iPower',
      services: 'Web Design, Development, SEO',
      category: 'WEB PLATFORM',
      image: '/assets/images/featured-2.png',
      slug: 'ipower'
    }
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-alabaster">
      <section ref={sectionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Title */}
          <div className={`transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="font-tiempos text-charcoal text-6xl font-bold mb-16">
              All Works
            </h1>
          </div>

          {/* Filter System */}
          <div className={`mb-16 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
            <FilterSystem
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          {/* Project Grid */}
          <div className={`transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}>
            <ProjectGrid projects={filteredProjects} />
          </div>
        </div>
      </section>

      {/* Start a Conversation / Footer */}
      <StartConversation />
    </div>
  );
}

function FilterSystem({
  filters,
  activeFilter,
  onFilterChange
}: {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`relative font-satoshi text-sm font-medium tracking-blueprint uppercase transition-colors duration-300 ${
            activeFilter === filter ? 'text-charcoal' : 'text-stone hover:text-charcoal'
          }`}
        >
          {filter}
          <span
            className={`absolute bottom-0 left-0 h-px bg-studio-green transition-transform duration-250 origin-center ${
              activeFilter === filter ? 'scale-x-100' : 'scale-x-0'
            }`}
            style={{ width: '100%' }}
          />
        </button>
      ))}
    </div>
  );
}

interface Project {
  id: string;
  title: string;
  services: string;
  category: string;
  image: string;
  slug: string;
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectEntry key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {

  return (
    <Link href={`/work/${project.slug}`}>
      <div className="group cursor-pointer">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-lg mb-6">
          <div className="aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-2">
          <h3 className="font-tiempos text-charcoal text-2xl font-bold transition-colors duration-300 group-hover:text-studio-green">
            {project.title}
          </h3>
          <p className="font-satoshi text-stone text-sm">
            {project.services}
          </p>
        </div>
      </div>
    </Link>
  );
}
