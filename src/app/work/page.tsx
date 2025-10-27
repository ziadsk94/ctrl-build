'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Work() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([]);
  
  const projectsRef = useRef<HTMLElement>(null);

  const projects = [
    {
      slug: 'ipower',
      name: 'IPOWER',
      services: 'UI/UX DESIGN, HEADLESS DEV',
      image: '/assets/images/projects/ipower/featured.png'
    },
    {
      slug: 'gaplens',
      name: 'GAPLENS',
      services: 'UI/UX DESIGN, HEADLESS DEV, PHOTOGRAPHIC ARCHIVE',
      image: '/assets/images/projects/gaplens/featured.png'
    },
    {
      slug: 'aetier',
      name: 'AETIER',
      services: 'BRAND STRATEGY, DIGITAL EXPERIENCE, UI/UX DESIGN',
      image: '/assets/images/projects/aetier/featured.png'
    }
  ];

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 600);
      setIsTablet(width <= 1024 && width > 600);
    };

    const handleScroll = () => {
      if (projectsRef.current) {
        const rect = projectsRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          projects.forEach((_, index) => {
            setTimeout(() => {
              setVisibleProjects(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 100);
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      });
    };

    setVisibleProjects(new Array(projects.length).fill(false));

    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleProjectClick = (slug: string) => {
    const transition = document.createElement('div');
    transition.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #3c8669;
      z-index: 9999;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(transition);
    
    requestAnimationFrame(() => {
      transition.style.transform = 'scaleX(1)';
    });
    
    setTimeout(() => {
      window.location.href = `/work/${slug}`;
      document.body.removeChild(transition);
    }, 300);
  };

  return (
    <>
      {!isMobile && (
        <div 
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorPosition.x - (hoveredProject ? 150 : 6),
            top: cursorPosition.y - (hoveredProject ? 150 : 6),
            width: hoveredProject ? '300px' : '12px',
            height: hoveredProject ? '300px' : '12px',
            borderRadius: hoveredProject ? '8px' : '50%',
            backgroundColor: hoveredProject ? 'transparent' : '#020202',
            border: hoveredProject ? 'none' : 'none',
            display: hoveredProject ? 'flex' : 'block',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease-out',
            transform: 'translateZ(0)',
            willChange: 'width, height, border-radius, background-color'
          }}
        >
          {hoveredProject && (
            <img
              src={projects.find(p => p.slug === hoveredProject)?.image}
              alt={projects.find(p => p.slug === hoveredProject)?.name}
              className="w-full h-full object-cover"
              style={{ borderRadius: '8px' }}
            />
          )}
        </div>
      )}

      <div className="min-h-screen bg-cream overflow-x-hidden">
        <Header />
        
        <main>
          <section className={`${isMobile ? 'h-[60vh]' : 'h-[70vh]'} bg-cream flex items-center justify-center px-6 md:px-16`}>
            <div className="max-w-7xl mx-auto text-center">
              <h1 
                className={`font-syne font-bold text-black mb-8 transition-all duration-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
              >
                SELECTED WORK
              </h1>
              
              <div 
                className={`${isMobile ? 'max-w-[90%]' : 'max-w-[60%]'} mx-auto transition-all duration-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <p className="font-fraunces text-black text-lg leading-relaxed">
                  We build bespoke platforms for ambitious brands. Our work is our argument. Below is a selection of our case studies, each built with technical precision.
                </p>
              </div>
            </div>
          </section>

          <section ref={projectsRef} className="bg-cream">
            <div className="max-w-7xl mx-auto">
              {!isTablet && !isMobile && (
                <div className="space-y-0">
                  {projects.map((project, index) => (
                    <div key={project.slug}>
                      <a
                        href={`/work/${project.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleProjectClick(project.slug);
                        }}
                        onMouseEnter={() => setHoveredProject(project.slug)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className={`block w-full py-8 px-6 md:px-16 transition-all duration-500 ${
                          visibleProjects[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="grid grid-cols-3 gap-8 items-center">
                          <div className="text-left">
                            <h3 className="font-syne font-bold text-black text-xl md:text-2xl">
                              {project.name}
                            </h3>
                          </div>

                          <div className="text-center">
                            <p className="font-syne font-bold text-black text-sm md:text-base">
                              {project.services}
                            </p>
                          </div>

                          <div className="text-right">
                            <span 
                              className={`font-syne font-bold text-sm md:text-base transition-colors duration-200 ${
                                hoveredProject === project.slug ? 'text-[#3c8669]' : 'text-black'
                              }`}
                            >
                              [VIEW]
                            </span>
                          </div>
                        </div>
                      </a>

                      {index < projects.length - 1 && (
                        <div className="w-full h-px bg-black mx-6 md:mx-16"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {isTablet && !isMobile && (
                <div className="space-y-0">
                  {projects.map((project, index) => (
                    <div key={project.slug}>
                      <a
                        href={`/work/${project.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleProjectClick(project.slug);
                        }}
                        onTouchStart={() => {
                          setActiveProject(project.slug);
                          if (navigator.vibrate) {
                            navigator.vibrate(30);
                          }
                        }}
                        onTouchEnd={() => setActiveProject(null)}
                        className={`block w-full py-8 px-6 md:px-16 transition-all duration-500 ${
                          visibleProjects[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="grid grid-cols-2 gap-8 items-center">
                          <div className="text-left">
                            <h3 className={`font-syne font-bold text-xl md:text-2xl transition-colors duration-200 ${
                              activeProject === project.slug ? 'text-[#3c8669]' : 'text-black'
                            }`}>
                              {project.name}
                            </h3>
                          </div>

                          <div className="text-right">
                            <p className={`font-syne font-bold text-sm md:text-base transition-colors duration-200 ${
                              activeProject === project.slug ? 'text-[#3c8669]' : 'text-black'
                            }`}>
                              {project.services}
                            </p>
                          </div>
                        </div>
                      </a>

                      {index < projects.length - 1 && (
                        <div className="w-full h-px bg-black mx-6 md:mx-16"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {isMobile && (
                <div className="space-y-0">
                  {projects.map((project, index) => (
                    <div key={project.slug}>
                      <a
                        href={`/work/${project.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleProjectClick(project.slug);
                        }}
                        onTouchStart={() => {
                          setActiveProject(project.slug);
                          if (navigator.vibrate) {
                            navigator.vibrate(30);
                          }
                        }}
                        onTouchEnd={() => setActiveProject(null)}
                        className={`block w-full py-6 px-6 transition-all duration-500 ${
                          visibleProjects[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="text-left space-y-2">
                          <h3 className={`font-syne font-bold text-lg transition-colors duration-200 ${
                            activeProject === project.slug ? 'text-[#3c8669]' : 'text-black'
                          }`}>
                            {project.name}
                          </h3>

                          <p className={`font-syne font-bold text-sm transition-colors duration-200 ${
                            activeProject === project.slug ? 'text-[#3c8669]' : 'text-black'
                          }`}>
                            {project.services}
                          </p>
                        </div>
                      </a>

                      {index < projects.length - 1 && (
                        <div className="w-full h-px bg-black mx-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <FinalCTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
