import { useState, useEffect } from 'react';

/**
 * Custom hook for smooth, subtle mouse parallax effect.
 * Max translation: ~2-8px, max rotation: ~1-3deg.
 * Automatically disabled if user has prefers-reduced-motion.
 */
export function useMouseParallax(intensity = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setEnabled(false);
        return;
      }
      const listener = (e) => setEnabled(!e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        // Normalize between -1 and 1
        const normX = (e.clientX / innerWidth) * 2 - 1;
        const normY = (e.clientY / innerHeight) * 2 - 1;

        // Subtle clamp: 2-6px translation, 1-2.5deg rotation
        const moveX = Math.round(normX * 6 * intensity * 10) / 10;
        const moveY = Math.round(normY * 6 * intensity * 10) / 10;
        const rotY = Math.round(normX * 2.5 * intensity * 10) / 10;
        const rotX = Math.round(-normY * 2.5 * intensity * 10) / 10;

        setOffset({ x: moveX, y: moveY, rotateX: rotX, rotateY: rotY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, intensity]);

  return offset;
}
