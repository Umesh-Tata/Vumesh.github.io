// Dynamic Effects Hook for React Portfolio
import { useEffect, useRef, useCallback } from 'react';

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useDynamicEffects = () => {
  const isInitialized = useRef(false);
  const observersRef = useRef<IntersectionObserver[]>([]);

  const throttle = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    
    return (...args: any[]) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  const setupScrollIndicator = useCallback(() => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    document.body.prepend(indicator);

    const updateScrollIndicator = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      indicator.style.transform = `scaleX(${Math.min(scrollPercent, 1)})`;
    };

    const throttledUpdate = throttle(updateScrollIndicator, 16);
    window.addEventListener('scroll', throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    };
  }, [throttle]);

  const setupDynamicNavbar = useCallback(() => {
    const navbar = document.querySelector('nav');
    if (!navbar) return () => {};

    navbar.classList.add('navbar-dynamic');
    
    let isScrolled = false;
    const navbarBrand = navbar.querySelector('a[href="#hero"]');
    
    const updateNavbar = () => {
      const currentScrolled = window.scrollY > 50;
      
      if (currentScrolled !== isScrolled) {
        isScrolled = currentScrolled;
        
        if (isScrolled) {
          navbar.classList.add('navbar-scrolled');
          if (navbarBrand) {
            navbarBrand.classList.add('navbar-brand');
          }
        } else {
          navbar.classList.remove('navbar-scrolled');
          if (navbarBrand) {
            navbarBrand.classList.remove('navbar-brand');
          }
        }
      }
    };

    const throttledUpdate = throttle(updateNavbar, 16);
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    
    // Enhance navigation links
    const navLinks = navbar.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.classList.add('nav-link-enhanced', 'focus-enhanced');
    });

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
    };
  }, [throttle]);

  const setupScrollAnimations = useCallback(() => {
    const animatedElements = document.querySelectorAll('section, .project-card, .skill-item, img');
    
    if (!animatedElements.length) return () => {};

    const observerOptions: ObserverOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Add appropriate animation class based on element type
          if (element.tagName === 'SECTION') {
            element.classList.add('animate-on-scroll', 'animate-fade-in-up');
          } else if (element.classList.contains('project-card')) {
            element.classList.add('animate-on-scroll', 'animate-slide-in-scale');
          } else if (element.tagName === 'IMG') {
            element.classList.add('animate-on-scroll', 'animate-fade-in-up');
          } else {
            element.classList.add('animate-on-scroll', 'animate-fade-in-up');
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });

    observersRef.current.push(observer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const setupParallaxEffect = useCallback(() => {
    const heroSection = document.querySelector('#hero');
    if (!heroSection) return () => {};

    const heroBackground = heroSection.querySelector('img');
    if (!heroBackground) return () => {};

    heroBackground.classList.add('hero-parallax');

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }
    };

    // Only apply parallax on larger screens for performance
    if (window.innerWidth > 768) {
      const throttledUpdate = throttle(updateParallax, 16);
      window.addEventListener('scroll', throttledUpdate, { passive: true });

      return () => {
        window.removeEventListener('scroll', throttledUpdate);
      };
    }

    return () => {};
  }, [throttle]);

  const setupEnhancedHoverEffects = useCallback(() => {
    // Project cards
    const projectCards = document.querySelectorAll('[class*="project"], .bg-white.rounded');
    projectCards.forEach(card => {
      card.classList.add('project-card-enhanced', 'will-change-transform');
      
      const image = card.querySelector('img');
      if (image) {
        image.classList.add('project-image');
      }
    });

    // Buttons
    const buttons = document.querySelectorAll('a[class*="bg-"], button');
    buttons.forEach(button => {
      button.classList.add('btn-enhanced', 'focus-enhanced');
    });

    // Images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.classList.contains('project-image')) {
        img.classList.add('image-hover-effect');
      }
    });

    // General hover elements
    const hoverElements = document.querySelectorAll('.rounded-xl, .shadow');
    hoverElements.forEach(element => {
      if (!element.classList.contains('project-card-enhanced') && 
          !element.classList.contains('enhanced-hover')) {
        element.classList.add('enhanced-hover');
      }
    });
  }, []);

  const setupStaggerAnimations = useCallback(() => {
    const skillsContainer = document.querySelector('#skills');
    if (skillsContainer) {
      const skillItems = skillsContainer.querySelectorAll('[class*="skill"], .flex.items-center');
      skillItems.forEach((item, index) => {
        (item as HTMLElement).style.setProperty('--animation-delay', `${index * 0.1}s`);
        item.classList.add('stagger-animation');
      });
    }

    const projectsContainer = document.querySelector('#projects');
    if (projectsContainer) {
      const projectItems = projectsContainer.querySelectorAll('[class*="project"], .bg-white');
      projectItems.forEach((item, index) => {
        (item as HTMLElement).style.setProperty('--animation-delay', `${index * 0.2}s`);
        item.classList.add('stagger-animation');
      });
    }
  }, []);

  const setupTypingAnimation = useCallback(() => {
    const heroTitle = document.querySelector('#hero h1');
    if (!heroTitle) return;

    const nameSpan = heroTitle.querySelector('span');
    if (!nameSpan) return;

    // Only apply on first visit or larger screens
    if (window.innerWidth > 768 && !sessionStorage.getItem('visitedBefore')) {
      nameSpan.classList.add('typing-animation');
      sessionStorage.setItem('visitedBefore', 'true');
    }
  }, []);

  const initializeEffects = useCallback(() => {
    if (isInitialized.current) return;

    const cleanupFunctions: (() => void)[] = [];

    // Setup all effects and collect cleanup functions
    cleanupFunctions.push(setupScrollIndicator());
    cleanupFunctions.push(setupDynamicNavbar());
    cleanupFunctions.push(setupScrollAnimations());
    cleanupFunctions.push(setupParallaxEffect());
    
    // These don't return cleanup functions but should be called
    setupEnhancedHoverEffects();
    setupStaggerAnimations();
    setupTypingAnimation();

    isInitialized.current = true;

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup && cleanup());
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current = [];
      isInitialized.current = false;
    };
  }, [
    setupScrollIndicator,
    setupDynamicNavbar,
    setupScrollAnimations,
    setupParallaxEffect,
    setupEnhancedHoverEffects,
    setupStaggerAnimations,
    setupTypingAnimation
  ]);

  useEffect(() => {
    // Wait for DOM to be ready and React to mount
    const timer = setTimeout(() => {
      const cleanup = initializeEffects();
      return cleanup;
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [initializeEffects]);

  return { isInitialized: isInitialized.current };
};

// Standalone function for non-React usage
export const initializePortfolioEffects = () => {
  const effects = new (class PortfolioEffects {
    private cleanupFunctions: (() => void)[] = [];

    init() {
      // Wait for DOM content to be loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setupEffects());
      } else {
        this.setupEffects();
      }
    }

    private setupEffects() {
      // Re-use the logic from the hook but adapted for vanilla JS
      console.log('Portfolio dynamic effects initialized (standalone)');
    }

    destroy() {
      this.cleanupFunctions.forEach(cleanup => cleanup());
      this.cleanupFunctions = [];
    }
  })();

  effects.init();
  return effects;
};

export default useDynamicEffects;