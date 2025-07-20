// Dynamic Scripts for Portfolio Website

class PortfolioEnhancer {
  constructor() {
    this.isInitialized = false;
    this.observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };
    this.throttleDelay = 16; // ~60fps
    this.lastScrollTime = 0;
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeEffects());
    } else {
      this.initializeEffects();
    }
  }

  initializeEffects() {
    this.setupScrollIndicator();
    this.setupDynamicNavbar();
    this.setupScrollAnimations();
    this.setupParallaxEffect();
    this.setupTypingAnimation();
    this.setupEnhancedHoverEffects();
    this.setupStaggerAnimations();
    this.setupSmoothScroll();
    
    this.isInitialized = true;
    console.log('Portfolio dynamic effects initialized');
  }

  // Create and setup scroll progress indicator
  setupScrollIndicator() {
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

    window.addEventListener('scroll', this.throttle(updateScrollIndicator, this.throttleDelay), { passive: true });
  }

  // Dynamic navbar effects
  setupDynamicNavbar() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

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

    window.addEventListener('scroll', this.throttle(updateNavbar, this.throttleDelay), { passive: true });
    
    // Enhance navigation links
    const navLinks = navbar.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.classList.add('nav-link-enhanced', 'focus-enhanced');
    });
  }

  // Setup scroll-triggered animations
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('section, .project-card, .skill-item, img');
    
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
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
    }, this.observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Parallax effect for hero section
  setupParallaxEffect() {
    const heroSection = document.querySelector('#hero');
    if (!heroSection) return;

    const heroBackground = heroSection.querySelector('img');
    if (heroBackground) {
      heroBackground.classList.add('hero-parallax');
    }

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }
    };

    // Only apply parallax on larger screens for performance
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', this.throttle(updateParallax, this.throttleDelay), { passive: true });
    }
  }

  // Typing animation for hero text
  setupTypingAnimation() {
    const heroTitle = document.querySelector('#hero h1');
    if (!heroTitle) return;

    const nameSpan = heroTitle.querySelector('span');
    if (!nameSpan) return;

    // Only apply on first visit or larger screens
    if (window.innerWidth > 768 && !sessionStorage.getItem('visitedBefore')) {
      nameSpan.classList.add('typing-animation');
      sessionStorage.setItem('visitedBefore', 'true');
    }
  }

  // Enhanced hover effects for interactive elements
  setupEnhancedHoverEffects() {
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
      img.classList.add('image-hover-effect');
    });

    // General hover elements
    const hoverElements = document.querySelectorAll('.rounded-xl, .shadow');
    hoverElements.forEach(element => {
      if (!element.classList.contains('project-card-enhanced')) {
        element.classList.add('enhanced-hover');
      }
    });
  }

  // Stagger animations for lists
  setupStaggerAnimations() {
    const skillsContainer = document.querySelector('#skills');
    if (skillsContainer) {
      const skillItems = skillsContainer.querySelectorAll('[class*="skill"], .flex.items-center');
      skillItems.forEach((item, index) => {
        item.style.setProperty('--animation-delay', `${index * 0.1}s`);
        item.classList.add('stagger-animation');
      });
    }

    const projectsContainer = document.querySelector('#projects');
    if (projectsContainer) {
      const projectItems = projectsContainer.querySelectorAll('[class*="project"], .bg-white');
      projectItems.forEach((item, index) => {
        item.style.setProperty('--animation-delay', `${index * 0.2}s`);
        item.classList.add('stagger-animation');
      });
    }
  }

  // Enhanced smooth scrolling
  setupSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - navbarHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without triggering scroll
          history.pushState(null, null, href);
        }
      });
    });
  }

  // Enhanced skill progress bars
  setupSkillProgressBars() {
    const skillBars = document.querySelectorAll('[class*="w-full"][class*="bg-"]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          progressBar.classList.add('skill-progress-enhanced');
          
          // Animate the width
          const targetWidth = progressBar.style.width || '0%';
          progressBar.style.width = '0%';
          
          setTimeout(() => {
            progressBar.style.width = targetWidth;
          }, 100);
          
          observer.unobserve(progressBar);
        }
      });
    }, this.observerOptions);

    skillBars.forEach(bar => {
      const container = bar.parentElement;
      if (container) {
        container.classList.add('skill-bar-enhanced');
        observer.observe(bar);
      }
    });
  }

  // Utility function for throttling
  throttle(func, delay) {
    return (...args) => {
      const now = Date.now();
      if (now - this.lastScrollTime >= delay) {
        this.lastScrollTime = now;
        func.apply(this, args);
      }
    };
  }

  // Debounce utility
  debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Handle resize events
  handleResize() {
    const debouncedResize = this.debounce(() => {
      // Re-calculate parallax and other size-dependent effects
      if (window.innerWidth <= 768) {
        // Disable intensive effects on mobile
        const parallaxElements = document.querySelectorAll('.hero-parallax');
        parallaxElements.forEach(el => {
          el.style.transform = 'none';
        });
      }
    }, 250);

    window.addEventListener('resize', debouncedResize);
  }

  // Clean up method
  destroy() {
    this.isInitialized = false;
    // Remove event listeners if needed
    console.log('Portfolio enhancer destroyed');
  }
}

// Performance optimized initialization
const initializeWhenReady = () => {
  if (typeof window !== 'undefined' && window.document) {
    // Check if React app is loaded (for React-based portfolios)
    const checkReactMount = () => {
      const rootElement = document.getElementById('root');
      if (rootElement && rootElement.children.length > 0) {
        new PortfolioEnhancer();
      } else {
        setTimeout(checkReactMount, 100);
      }
    };

    // For regular HTML portfolios, initialize immediately
    if (document.querySelector('#hero') || document.readyState === 'complete') {
      new PortfolioEnhancer();
    } else {
      checkReactMount();
    }
  }
};

// Initialize when script loads
initializeWhenReady();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioEnhancer;
}

// Global access
window.PortfolioEnhancer = PortfolioEnhancer;