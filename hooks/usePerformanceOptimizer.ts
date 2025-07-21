import { useEffect } from 'react';

export const usePerformanceOptimizer = () => {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.classList.add('reduced-motion');
      return;
    }

    // Optimize scroll performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update scroll-based animations here if needed
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttle scroll events for better performance
    let scrollTimeout: number;
    const throttledScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Optimize animation performance
    const optimizeAnimations = () => {
      // Use transform and opacity for better performance
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach(element => {
        const el = element as HTMLElement;
        el.style.willChange = 'transform, opacity';
      });

      // Clean up will-change after animations complete
      const cleanupWillChange = () => {
        animatedElements.forEach(element => {
          const el = element as HTMLElement;
          setTimeout(() => {
            el.style.willChange = 'auto';
          }, 1000); // Clean up after animation duration
        });
      };

      // Listen for animation end events
      const handleAnimationEnd = (e: AnimationEvent) => {
        const target = e.target as HTMLElement;
        target.style.willChange = 'auto';
      };

      animatedElements.forEach(element => {
        element.addEventListener('animationend', handleAnimationEnd);
      });

      return () => {
        animatedElements.forEach(element => {
          element.removeEventListener('animationend', handleAnimationEnd);
        });
      };
    };

    const cleanupAnimations = optimizeAnimations();

    // Detect device capabilities
    const isLowEndDevice = () => {
      // Check for low-end devices based on hardware concurrency and memory
      const cores = navigator.hardwareConcurrency || 1;
      const memory = (navigator as any).deviceMemory || 4; // GB
      
      return cores <= 2 || memory <= 2;
    };

    if (isLowEndDevice()) {
      // Reduce animation complexity for low-end devices
      document.documentElement.classList.add('low-end-device');
    }

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      cleanupAnimations();
    };
  }, []);

  // Optimize image loading for better performance
  useEffect(() => {
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        // Add loading="lazy" for images below the fold
        if (!img.loading) {
          img.loading = 'lazy';
        }
        
        // Add error handling
        img.addEventListener('error', () => {
          img.style.display = 'none';
        });
      });
    };

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
      optimizeImages();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', optimizeImages);
    };
  }, []);

  // Optimize CSS animations
  useEffect(() => {
    const optimizeCSSAnimations = () => {
      // Force hardware acceleration for smooth animations
      const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-down, .animate-slide-in-left, .animate-slide-in-right');
      
      animatedElements.forEach(element => {
        const el = element as HTMLElement;
        el.style.transform = 'translateZ(0)'; // Force hardware acceleration
      });
    };

    // Run optimization after a short delay to ensure all elements are rendered
    const timer = setTimeout(optimizeCSSAnimations, 100);
    
    return () => clearTimeout(timer);
  }, []);
};