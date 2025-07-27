import { useEffect, useState, useRef, useCallback } from 'react';

// Enhanced scroll animations with Intersection Observer - Optimized for instant reveal
export const useScrollAnimations = () => {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList.add('section-visible');
        }
      },
      {
        threshold: 0.05,
        rootMargin: '-20px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { elementRef, isVisible };
};

// Multi-element scroll animations - Optimized for instant reveal
export const useMultiScrollAnimations = () => {
  const [animatedElements, setAnimatedElements] = useState<Set<Element>>(new Set());

  const observeElements = useCallback((elements: Element[]) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            setAnimatedElements(prev => new Set(prev).add(entry.target));
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '-10px 0px'
      }
    );

    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return { animatedElements, observeElements };
};

// Section transitions with fade-in effect - Optimized for instant reveal
export const useSectionTransitions = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], .section-transition');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-enter');
          } else {
            // Optional: reset animation when section is out of view
            // entry.target.classList.remove('section-visible');
            // entry.target.classList.add('section-enter');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '-30px 0px -30px 0px'
      }
    );

    sections.forEach(section => {
      section.classList.add('section-transition', 'section-enter');
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);
};

// Parallax scroll effect
export const useParallaxScroll = () => {
  const parallaxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return parallaxRef;
};

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