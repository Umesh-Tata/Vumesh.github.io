import { useEffect, useRef } from 'react';

interface DeviceMotionEvent extends Event {
  beta: number | null;
  gamma: number | null;
  alpha: number | null;
}

interface DeviceOrientationEvent extends Event {
  beta: number | null;
  gamma: number | null;
  alpha: number | null;
}

/**
 * Mobile Tilt Effect Hook - Implements prominent 3D tilt effect using device motion sensors
 * This hook provides device orientation-based 3D transforms for mobile devices only.
 */
export const useMobileTiltEffect = (heroRef: React.RefObject<HTMLElement>) => {
  const animationFrameRef = useRef<number>();
  const currentTiltRef = useRef({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(false);
  const permissionGrantedRef = useRef(false);

  // Detect if device is mobile
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  };

  // Request device orientation permission (iOS 13+)
  const requestDeviceOrientationPermission = async (): Promise<boolean> => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.warn('Device orientation permission denied:', error);
        return false;
      }
    }
    return true; // Permission not required on other devices
  };

  // Initialize tilt effect on user interaction
  const initializeTiltEffect = async () => {
    if (!isMobileDevice() || isActiveRef.current) return;

    const permissionGranted = await requestDeviceOrientationPermission();
    if (!permissionGranted) return;

    permissionGrantedRef.current = true;
    isActiveRef.current = true;
    
    // Add visual indicator that tilt is active
    if (heroRef.current) {
      heroRef.current.classList.add('tilt-active');
    }
    
    // Start the animation loop
    animateTilt();
  };

  // Smooth animation loop for tilt effect
  const animateTilt = () => {
    if (!isActiveRef.current) return;

    // Smooth interpolation for natural movement
    currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * 0.08;
    currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * 0.08;

    // Apply 3D transform to hero elements
    if (heroRef.current) {
      const heroElement = heroRef.current;
      
      // Apply tilt to parallax background
      const parallaxElement = heroElement.querySelector('.hero-parallax') as HTMLElement;
      if (parallaxElement) {
        parallaxElement.style.transform = `
          translate(calc(var(--parallax-x, 0)), calc(var(--parallax-y, 0)))
          rotateX(${currentTiltRef.current.y}deg) 
          rotateY(${currentTiltRef.current.x}deg)
        `;
      }

      // Apply tilt to particles container
      const particlesElement = heroElement.querySelector('.hero-particles') as HTMLElement;
      if (particlesElement) {
        particlesElement.style.transform = `
          rotateX(${currentTiltRef.current.y * 0.5}deg) 
          rotateY(${currentTiltRef.current.x * 0.5}deg)
        `;
      }

      // Apply tilt to gradient overlay
      heroElement.style.setProperty('--tilt-x', `${currentTiltRef.current.x}deg`);
      heroElement.style.setProperty('--tilt-y', `${currentTiltRef.current.y}deg`);
    }

    animationFrameRef.current = requestAnimationFrame(animateTilt);
  };

  // Handle device orientation changes
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (!permissionGrantedRef.current || !isActiveRef.current) return;

    const beta = event.beta; // Front-to-back tilt (-180 to 180)
    const gamma = event.gamma; // Left-to-right tilt (-90 to 90)

    if (beta !== null && gamma !== null) {
      // Convert device orientation to tilt values
      // Multiply by significant factor (10) for very noticeable effect
      const tiltX = (gamma / 90) * 10; // Left-right tilt
      const tiltY = ((beta - 45) / 135) * 10; // Front-back tilt (adjusted for natural device orientation)

      // Clamp values to prevent extreme tilts but allow for prominent effect
      targetTiltRef.current.x = Math.max(-12, Math.min(12, tiltX));
      targetTiltRef.current.y = Math.max(-12, Math.min(12, tiltY));
    }
  };

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement || !isMobileDevice()) return;

    // Add mobile-specific CSS class
    heroElement.classList.add('mobile-tilt-enabled');

    // Initialize tilt effect on first touch/tap
    const handleFirstInteraction = () => {
      initializeTiltEffect();
      // Remove listeners after first interaction
      heroElement.removeEventListener('touchstart', handleFirstInteraction);
      heroElement.removeEventListener('click', handleFirstInteraction);
    };

    // Add event listeners for user interaction
    heroElement.addEventListener('touchstart', handleFirstInteraction);
    heroElement.addEventListener('click', handleFirstInteraction);

    // Add device orientation listener
    const handleOrientation = (event: Event) => {
      handleDeviceOrientation(event as DeviceOrientationEvent);
    };

    window.addEventListener('deviceorientation', handleOrientation);

    // Cleanup
    return () => {
      heroElement.removeEventListener('touchstart', handleFirstInteraction);
      heroElement.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('deviceorientation', handleOrientation);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Reset transforms
      if (heroElement) {
        const parallaxElement = heroElement.querySelector('.hero-parallax') as HTMLElement;
        if (parallaxElement) {
          parallaxElement.style.transform = '';
        }
        
        const particlesElement = heroElement.querySelector('.hero-particles') as HTMLElement;
        if (particlesElement) {
          particlesElement.style.transform = '';
        }
      }
    };
  }, []);

  // This hook doesn't return a ref, it uses the one passed to it
};