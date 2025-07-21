import { useEffect } from 'react';

export const useAnimationInitializer = () => {
  useEffect(() => {
    // Initialize scroll-triggered animations
    const initializeAnimations = () => {
      // Create intersection observer for elements with data-animate attribute
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const animationType = element.dataset.animation || 'fade-in-up';
              const delay = element.dataset.delay || '0';
              
              // Apply animation with delay
              setTimeout(() => {
                element.classList.add(`animate-${animationType}`);
                element.style.opacity = '1';
                element.style.transform = 'none';
              }, parseFloat(delay) * 1000);
              
              // Unobserve after animation is triggered
              observer.unobserve(element);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observe all elements with data-animate attribute
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach((element) => {
        const el = element as HTMLElement;
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
      });

      return observer;
    };

    // Initialize section transitions
    const initializeSectionTransitions = () => {
      const sectionObserver = new IntersectionObserver(
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
        sectionObserver.observe(section);
      });

      return sectionObserver;
    };

    // Initialize staggered animations for child elements
    const initializeStaggeredAnimations = () => {
      const staggerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const container = entry.target as HTMLElement;
              const children = container.querySelectorAll('[data-animate-child]');
              
              children.forEach((child, index) => {
                const delay = index * 0.1;
                setTimeout(() => {
                  child.classList.add('animate-fade-in-up');
                }, delay * 1000);
              });
              
              staggerObserver.unobserve(container);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      const containers = document.querySelectorAll('[data-animate-child]');
      containers.forEach(container => staggerObserver.observe(container));

      return staggerObserver;
    };

    // Initialize all animations
    const animationObserver = initializeAnimations();
    const sectionObserver = initializeSectionTransitions();
    const staggerObserver = initializeStaggeredAnimations();

    // Cleanup function
    return () => {
      animationObserver?.disconnect();
      sectionObserver?.disconnect();
      staggerObserver?.disconnect();
    };
  }, []);

  // Initialize smooth scrolling for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hostname === window.location.hostname) {
        e.preventDefault();
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  // Initialize hover effects
  useEffect(() => {
    const initializeHoverEffects = () => {
      // Add hover effects to elements with hover classes
      const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-glow');
      
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          element.classList.add('hover-active');
        });
        
        element.addEventListener('mouseleave', () => {
          element.classList.remove('hover-active');
        });
      });
    };

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(initializeHoverEffects, 100);
    
    return () => clearTimeout(timer);
  }, []);
};