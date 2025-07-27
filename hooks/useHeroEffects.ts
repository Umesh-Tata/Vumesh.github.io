import { useEffect, useRef } from 'react';

/**
 * Hero Effects Hook - IMPORTANT: Keep parallax effect active!
 * This hook provides cursor-based parallax movement for the hero section.
 * DO NOT disable or remove this effect without explicit user request.
 */
export const useHeroEffects = () => {
  const heroRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

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

    // Update cursor position for gradient effect
    const updateCursorPosition = throttle((e: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      heroElement.style.setProperty('--mouse-x', `${x}%`);
      heroElement.style.setProperty('--mouse-y', `${y}%`);

      // Store mouse position for parallax
      mousePositionRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePositionRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      isMovingRef.current = true;
    }, 16); // ~60fps

    // CRITICAL: Smooth parallax animation - Keep this effect active!
    const animateParallax = () => {
      if (isMovingRef.current) {
        // Smooth interpolation
        currentPositionRef.current.x += (mousePositionRef.current.x - currentPositionRef.current.x) * 0.1;
        currentPositionRef.current.y += (mousePositionRef.current.y - currentPositionRef.current.y) * 0.1;

        // CRITICAL: Apply parallax transform - This creates the cursor-following effect
        const parallaxX = currentPositionRef.current.x * 30; // Increased to 30px max movement for more visibility
        const parallaxY = currentPositionRef.current.y * 30;

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

    // Reset on mouse leave
    const handleMouseLeave = () => {
      heroElement.style.setProperty('--mouse-x', '50%');
      heroElement.style.setProperty('--mouse-y', '50%');
      mousePositionRef.current = { x: 0, y: 0 };
      isMovingRef.current = true;
    };

    // Event listeners
    heroElement.addEventListener('mousemove', updateCursorPosition);
    heroElement.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animateParallax();

    // Handle touch devices
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      heroElement.classList.add('touch-device');
    }

    // Cleanup
    return () => {
      heroElement.removeEventListener('mousemove', updateCursorPosition);
      heroElement.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return heroRef;
};