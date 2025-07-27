import { useEffect, useRef } from 'react';

/**
 * Hero Effects Hook - ENHANCED: Added prominent cursor glow, trail effects, and increased dynamic effects
 * This hook provides cursor-based parallax movement, glow effects, and trail effects for the hero section.
 * DISABLED on mobile devices to prevent conflicts with device orientation effects.
 */
export const useHeroEffects = () => {
  const heroRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const trailElementsRef = useRef<HTMLDivElement[]>([]);

  // Detect if device is mobile
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
           'ontouchstart' in window;
  };

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    // DISABLE mouse effects on mobile devices to prevent conflicts with device orientation
    if (isMobileDevice()) {
      heroElement.classList.add('touch-device');
      return; // Exit early on mobile devices
    }

    // Create cursor glow element if it doesn't exist
    if (!cursorGlowRef.current) {
      const glowElement = document.createElement('div');
      glowElement.className = 'cursor-glow';
      glowElement.style.cssText = `
        position: absolute;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.08) 25%, rgba(168, 85, 247, 0.05) 50%, rgba(139, 92, 246, 0.02) 75%, transparent 90%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 5;
        transform: translate3d(-50%, -50%, 0);
        transition: opacity 0.4s ease-out, transform 0.2s ease-out;
        opacity: 0;
        filter: blur(8px);
        box-shadow: 0 0 60px rgba(139, 92, 246, 0.08), 0 0 120px rgba(99, 102, 241, 0.04), 0 0 180px rgba(168, 85, 247, 0.02);
      `;
      heroElement.appendChild(glowElement);
      cursorGlowRef.current = glowElement;
    }

    // Create cursor trail elements
    const createTrailElement = () => {
      const trailElement = document.createElement('div');
      trailElement.className = 'cursor-trail';
      trailElement.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.15), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 4;
        animation: cursorTrail 1.2s ease-out forwards;
        filter: blur(2px);
      `;
      heroElement.appendChild(trailElement);
      
      // Remove trail element after animation
      setTimeout(() => {
        if (trailElement.parentNode) {
          trailElement.parentNode.removeChild(trailElement);
        }
        trailElementsRef.current = trailElementsRef.current.filter(el => el !== trailElement);
      }, 1200);
      
      return trailElement;
    };

    // Throttle function for performance
    const throttle = (func: Function, delay: number) => {
      let lastCall = 0;
      return (...args: any[]) => {
        const now = Date.now();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
      };
    };

    // Enhanced cursor position update with glow and trail effects
    const updateCursorPosition = throttle((e: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Update gradient position
      heroElement.style.setProperty('--mouse-x', `${x}%`);
      heroElement.style.setProperty('--mouse-y', `${y}%`);

      // Update cursor glow position and visibility with subtle opacity
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX - rect.left}px`;
        cursorGlowRef.current.style.top = `${e.clientY - rect.top}px`;
        cursorGlowRef.current.style.opacity = '0.7';
      }

      // Create trail effect (limit to 3 trail elements for performance)
      if (trailElementsRef.current.length < 3) {
        const trailElement = createTrailElement();
        trailElement.style.left = `${e.clientX - rect.left}px`;
        trailElement.style.top = `${e.clientY - rect.top}px`;
        trailElementsRef.current.push(trailElement);
      }

      // Store mouse position for enhanced parallax
      mousePositionRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePositionRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      isMovingRef.current = true;
    }, 16); // ~60fps

    // ENHANCED: More prominent parallax animation with increased visibility
    const animateParallax = () => {
      if (isMovingRef.current) {
        // Smooth interpolation with increased responsiveness
        currentPositionRef.current.x += (mousePositionRef.current.x - currentPositionRef.current.x) * 0.15;
        currentPositionRef.current.y += (mousePositionRef.current.y - currentPositionRef.current.y) * 0.15;

        // ENHANCED: Increased parallax movement for more visibility (50px max movement)
        const parallaxX = currentPositionRef.current.x * 50;
        const parallaxY = currentPositionRef.current.y * 50;

        heroElement.style.setProperty('--parallax-x', `${parallaxX}px`);
        heroElement.style.setProperty('--parallax-y', `${parallaxY}px`);

        // Check if animation should continue
        if (
          Math.abs(mousePositionRef.current.x - currentPositionRef.current.x) < 0.01 &&
          Math.abs(mousePositionRef.current.y - currentPositionRef.current.y) < 0.01
        ) {
          isMovingRef.current = false;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animateParallax);
    };

    // Enhanced mouse leave handling
    const handleMouseLeave = () => {
      heroElement.style.setProperty('--mouse-x', '50%');
      heroElement.style.setProperty('--mouse-y', '50%');
      
      // Hide cursor glow
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.opacity = '0';
      }
      
      // Clear trail elements
      trailElementsRef.current.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      trailElementsRef.current = [];
      
      mousePositionRef.current = { x: 0, y: 0 };
      isMovingRef.current = true;
    };

    // Event listeners
    heroElement.addEventListener('mousemove', updateCursorPosition);
    heroElement.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animateParallax();



    // Cleanup
    return () => {
      heroElement.removeEventListener('mousemove', updateCursorPosition);
      heroElement.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Remove cursor glow element
      if (cursorGlowRef.current) {
        cursorGlowRef.current.remove();
      }
      // Remove trail elements
      trailElementsRef.current.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, []);

  return heroRef;
};