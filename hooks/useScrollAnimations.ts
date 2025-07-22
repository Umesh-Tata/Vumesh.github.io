import { useEffect, useState } from 'react';

// No-op hooks for scroll animations and section transitions
export const useScrollAnimations = () => ({ elementRef: null, isVisible: true });
export const useMultiScrollAnimations = () => ({ animatedElements: new Set() });
export const useSectionTransitions = () => {};
export const useParallaxScroll = () => null;

// Keep scroll progress bar logic only
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollProgress;
};