'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Global cleanup function to ensure no scroll prevention is active
const globalScrollCleanup = () => {
  // Reset any body styles that might be preventing scrolling
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  
  // Remove ALL touch event listeners (more aggressive approach)
  const preventScroll = (e: TouchEvent) => {
    e.preventDefault();
  };
  
  // Remove with different options to catch all instances
  document.removeEventListener('touchmove', preventScroll as EventListener, false);
  document.removeEventListener('touchmove', preventScroll as EventListener, true);
  document.removeEventListener('touchmove', preventScroll as EventListener);
  
  // Ensure the page can scroll
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  
  // Force a reflow to ensure styles are applied
  document.body.offsetHeight;
};

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Run immediately on mount
    globalScrollCleanup();

    // Also run when the page becomes visible (in case of navigation)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        globalScrollCleanup();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Run restoration on every pathname change
  useEffect(() => {
    // Small delay to ensure navigation is complete
    const timeoutId = setTimeout(globalScrollCleanup, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
