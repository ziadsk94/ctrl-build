'use client';

import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover (non-touch device)
    const checkTouchDevice = () => {
      return !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    };

    setIsTouchDevice(checkTouchDevice());

    // Don't initialize cursor on touch devices
    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      const diffX = mouseX - cursorX;
      const diffY = mouseY - cursorY;
      
      cursorX += diffX * 0.1;
      cursorY += diffY * 0.1;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = cursorX + 'px';
        cursorRef.current.style.top = cursorY + 'px';
      }
      
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleProjectHover = () => setIsHovering(true);
    const handleProjectLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('project-hover', handleProjectHover);
    document.addEventListener('project-leave', handleProjectLeave);

    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('project-hover', handleProjectHover);
      document.removeEventListener('project-leave', handleProjectLeave);
    };
  }, [isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 w-2 h-2 bg-charcoal rounded-full transform -translate-x-1/2 -translate-y-1/2"
      style={{
        transition: 'width 0.2s ease, height 0.2s ease',
      }}
    >
      {isHovering && (
        <div className="absolute inset-0 w-16 h-16 bg-charcoal rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-alabaster text-xs font-satoshi font-medium tracking-blueprint uppercase">
            View
          </span>
        </div>
      )}
    </div>
  );
}
