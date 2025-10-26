'use client';

import { useEffect } from 'react';

export default function ScrollRestoration() {
  useEffect(() => {
    // Ensure scroll restoration on every page load
    const restoreScroll = () => {
      // Reset any body styles that might be preventing scrolling
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Remove any touch event listeners that might be preventing scroll
      const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
      };
      document.removeEventListener('touchmove', preventScroll);
      
      // Ensure the page can scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };

    // Run immediately
    restoreScroll();

    // Also run when the page becomes visible (in case of navigation)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        restoreScroll();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
