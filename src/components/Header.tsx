'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header on mobile/tablet
      if (window.innerWidth <= 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      // Background blur effect
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 md:h-[60px] ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-alabaster/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
      style={{
        boxShadow: isScrolled 
          ? '0px 2px 20px rgba(30, 30, 30, 0.05)' 
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logotype */}
          <div className="flex-shrink-0">
            <Logotype />
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/work" label="WORK" />
            <NavLink href="/studio" label="STUDIO" />
            <NavLink href="/contact" label="CONTACT" />
          </nav>
          
          {/* Navigation - Mobile */}
          <nav className="flex md:hidden items-center gap-6">
            <NavLink href="/work" label="WORK" />
            <NavLink href="/studio" label="STUDIO" />
            <NavLink href="/contact" label="CONTACT" />
          </nav>
        </div>
      </div>
    </header>
  );
}

function Logotype() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/" className="cursor-pointer">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={`font-satoshi text-base font-medium tracking-architectural transition-colors duration-300 ${
            isHovered ? 'text-stone' : 'text-charcoal'
          }`}
        >
          CTRL
          <span
            className={`inline-block transition-transform duration-300 ${
              isHovered ? 'rotate-45 text-charcoal' : 'rotate-0'
            }`}
          >
            +
          </span>
          BUILD
        </span>
      </div>
    </Link>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`relative cursor-pointer font-satoshi text-sm font-medium tracking-blueprint uppercase transition-colors duration-300 ${
        isActive || isHovered ? 'text-charcoal' : 'text-stone'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-px bg-studio-green transition-transform duration-250 origin-center ${
          isActive || isHovered ? 'scale-x-100' : 'scale-x-0'
        }`}
        style={{ width: '100%' }}
      />
    </a>
  );
}
