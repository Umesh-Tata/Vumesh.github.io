// Dynamic Scripts - Portfolio Enhancement
(function() {
  'use strict';

  // ========================================
  // 1. INTERSECTION OBSERVER FOR ANIMATIONS
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Fade-in animation observer
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add section visible class for section animations
        if (entry.target.tagName === 'SECTION') {
          entry.target.classList.add('section-visible');
        }
      }
    });
  }, observerOptions);

  // ========================================
  // 2. DYNAMIC NAVBAR
  // ========================================
  let lastScroll = 0;
  const navbar = document.querySelector('nav');
  
  function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add navbar-dynamic class if not present
    if (navbar && !navbar.classList.contains('navbar-dynamic')) {
      navbar.classList.add('navbar-dynamic');
    }
    
    // Add scrolled class when scrolling down
    if (currentScroll > 100) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }
    
    lastScroll = currentScroll;
  }

  // ========================================
  // 3. SMOOTH SCROLL FOR NAVIGATION LINKS
  // ========================================
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // ========================================
  // 4. PARALLAX EFFECT
  // ========================================
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallaxSpeed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick);
  }

  // ========================================
  // 5. HERO TEXT ANIMATION
  // ========================================
  function initHeroTextAnimation() {
    const heroTitle = document.querySelector('#hero h1');
    const heroTagline = document.querySelector('#hero .tagline');
    
    if (heroTitle) {
      // Split text into words for animation
      const words = heroTitle.textContent.trim().split(' ');
      heroTitle.innerHTML = words.map(word => 
        `<span class="word-animate">${word}</span>`
      ).join(' ');
    }
    
    if (heroTagline) {
      heroTagline.classList.add('text-animate');
      heroTagline.style.animationDelay = '0.6s';
    }
  }

  // ========================================
  // 6. SKILL BAR ANIMATIONS
  // ========================================
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector('.skill-progress');
          if (bar) {
            const level = bar.dataset.level || bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.transition = 'width 1.5s ease-out';
              bar.style.width = level;
            }, 100);
          }
          skillObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // ========================================
  // 7. PROJECT CARD HOVER EFFECTS
  // ========================================
  function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card, [class*="card"]');
    
    projectCards.forEach(card => {
      // Add class if not present
      if (!card.classList.contains('project-card')) {
        card.classList.add('project-card');
      }
      
      // Mouse move effect for 3D tilt
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ========================================
  // 8. SCROLL TO TOP BUTTON
  // ========================================
  function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    
    if (!scrollButton) {
      // Create scroll to top button if it doesn't exist
      const button = document.createElement('button');
      button.innerHTML = '↑';
      button.className = 'scroll-to-top fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-primary-dark z-50';
      button.setAttribute('aria-label', 'Scroll to top');
      document.body.appendChild(button);
      
      button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // Show/hide based on scroll position
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          button.classList.remove('opacity-0', 'invisible');
          button.classList.add('opacity-100', 'visible');
        } else {
          button.classList.add('opacity-0', 'invisible');
          button.classList.remove('opacity-100', 'visible');
        }
      });
    }
  }

  // ========================================
  // 9. INITIALIZE ALL FEATURES
  // ========================================
  function init() {
    // Add fade-in classes to elements
    const fadeElements = document.querySelectorAll('section, .container > *, img, .card, [class*="card"]');
    fadeElements.forEach((element, index) => {
      if (element.tagName === 'IMG') {
        element.classList.add('fade-in-image');
      } else if (element.parentElement?.classList.contains('grid') || 
                 element.parentElement?.classList.contains('flex')) {
        element.classList.add('fade-in-stagger');
      } else {
        element.classList.add('fade-in');
      }
      fadeInObserver.observe(element);
    });
    
    // Initialize features
    initSmoothScroll();
    initParallax();
    initHeroTextAnimation();
    animateSkillBars();
    enhanceProjectCards();
    initScrollToTop();
    
    // Add navbar scroll listener
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initial navbar check
    handleNavbarScroll();
    
    // Add parallax class to hero background
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
      const heroBackground = heroSection.querySelector('.absolute.inset-0');
      if (heroBackground) {
        heroBackground.classList.add('parallax-element');
        heroBackground.dataset.parallaxSpeed = '0.5';
      }
    }
  }

  // ========================================
  // 10. PERFORMANCE OPTIMIZATION
  // ========================================
  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Use debounced scroll handler
  const debouncedNavbarScroll = debounce(handleNavbarScroll, 10);
  window.addEventListener('scroll', debouncedNavbarScroll);

  // ========================================
  // 11. WAIT FOR DOM AND REACT
  // ========================================
  // Wait for DOM content and React to render
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(init, 100); // Small delay to ensure React components are rendered
    });
  } else {
    setTimeout(init, 100);
  }
  
  // Re-initialize when new content is added (for React)
  const appObserver = new MutationObserver((mutations) => {
    const hasNewContent = mutations.some(mutation => 
      mutation.addedNodes.length > 0
    );
    
    if (hasNewContent) {
      setTimeout(init, 100);
      appObserver.disconnect(); // Disconnect after first major update
    }
  });
  
  const root = document.getElementById('root');
  if (root) {
    appObserver.observe(root, {
      childList: true,
      subtree: true
    });
  }
})();