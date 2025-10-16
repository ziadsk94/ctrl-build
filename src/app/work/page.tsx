import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import StartConversation from '@/components/StartConversation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Work - Digital Architecture Projects",
  description: "Explore CTRL+BUILD's portfolio of digital architecture projects. From web design to development, see how we create structured, performant digital experiences.",
  keywords: [
    "portfolio",
    "web design projects",
    "web development projects", 
    "digital architecture",
    "case studies",
    "iPower project",
    "electrical engineering website"
  ],
  openGraph: {
    title: "Our Work - Digital Architecture Projects | CTRL+BUILD",
    description: "Explore CTRL+BUILD's portfolio of digital architecture projects. From web design to development, see how we create structured, performant digital experiences.",
    url: "https://ctrlbuild.com/work",
    type: "website",
  },
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isVisible, setIsVisible] = useState(true); // Set to true initially for testing
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

  const filters = ['ALL', 'BRAND IDENTITY', 'WEB PLATFORM', 'DEVELOPMENT'];

  const projects = [
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
    <div className="flex space-x-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`font-satoshi text-sm font-medium tracking-blueprint uppercase transition-colors duration-300 ${
            activeFilter === filter ? 'text-charcoal' : 'text-stone'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

function ProjectGrid({ projects }: { projects: any[] }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="space-y-24">
      {projects.map((project, index) => (
        <ProjectEntry
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredProject === project.id}
          isSiblingHovered={hoveredProject !== null && hoveredProject !== project.id}
          onHover={() => setHoveredProject(project.id)}
          onLeave={() => setHoveredProject(null)}
        />
      ))}
    </div>
  );
}

function ProjectEntry({ 
  project, 
  index, 
  isHovered, 
  isSiblingHovered, 
  onHover, 
  onLeave 
}: {
  project: any;
  index: number;
  isHovered: boolean;
  isSiblingHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid grid-cols-12 gap-8 items-center ${
      isSiblingHovered ? 'opacity-50' : 'opacity-100'
    } transition-opacity duration-300`}>
      {/* Visual */}
      <div className={`${isEven ? 'col-span-7 col-start-1' : 'col-span-7 col-start-6'}`}>
        <Link href={`/work/${project.slug}`}>
          <div
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onMouseEnter={() => {
              onHover();
              document.dispatchEvent(new CustomEvent('project-hover'));
            }}
            onMouseLeave={() => {
              onLeave();
              document.dispatchEvent(new CustomEvent('project-leave'));
            }}
          >
            <div className={`transition-transform duration-300 ${
              isHovered ? 'scale-102' : 'scale-100'
            }`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Text Block */}
      <div className={`${isEven ? 'col-span-4 col-start-8' : 'col-span-4 col-start-1'}`}>
        <Link href={`/work/${project.slug}`}>
          <div
            className="cursor-pointer"
            onMouseEnter={() => {
              onHover();
              document.dispatchEvent(new CustomEvent('project-hover'));
            }}
            onMouseLeave={() => {
              onLeave();
              document.dispatchEvent(new CustomEvent('project-leave'));
            }}
          >
            <h3 className="font-tiempos text-charcoal text-4xl font-bold mb-4">
              {project.title}
            </h3>
            <p className="font-satoshi text-stone text-lg">
              {project.services}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
