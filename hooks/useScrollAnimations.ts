import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationsOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimations = (options: UseScrollAnimationsOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          element.classList.add('animate-fade-in-up');
          
          // Add staggered animation for child elements
          const children = element.querySelectorAll('[data-animate-child]');
          children.forEach((child, index) => {
            const delay = (index + 1) * 0.1;
            (child as HTMLElement).style.animationDelay = `${delay}s`;
            child.classList.add('animate-fade-in-up');
          });

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          element.classList.remove('animate-fade-in-up');
          
          const children = element.querySelectorAll('[data-animate-child]');
          children.forEach((child) => {
            child.classList.remove('animate-fade-in-up');
            (child as HTMLElement).style.animationDelay = '';
          });
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
};

// Hook for animating multiple elements with different animation types
export const useMultiScrollAnimations = () => {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const animationType = element.dataset.animation || 'fade-in-up';
            const delay = element.dataset.delay || '0';
            
            element.style.animationDelay = `${delay}s`;
            element.classList.add(`animate-${animationType}`);
            
            setAnimatedElements(prev => new Set(prev).add(element.id || ''));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with data-animate attribute
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return { animatedElements };
};

// Hook for section transition effects
export const useSectionTransitions = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          
          if (entry.isIntersecting) {
            section.classList.add('section-visible');
            section.classList.remove('section-enter');
            
            // Animate section title
            const title = section.querySelector('h2');
            if (title) {
              title.classList.add('animate-fade-in-down');
            }
            
            // Animate section content with stagger
            const contentElements = section.querySelectorAll('[data-section-content]');
            contentElements.forEach((element, index) => {
              const delay = index * 0.1;
              (element as HTMLElement).style.animationDelay = `${delay}s`;
              element.classList.add('animate-fade-in-up');
            });
          } else {
            section.classList.remove('section-visible');
            section.classList.add('section-enter');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      section.classList.add('section-transition', 'section-enter');
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);
};

// Hook for parallax scrolling effects
export const useParallaxScroll = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return elementRef;
};

// Hook for smooth scroll progress indicator
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Update CSS custom property for progress bar animation
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};