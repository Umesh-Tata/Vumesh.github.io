import { useEffect, useRef } from 'react';

interface MobileTiltEffectOptions {
  intensity?: number;
  smoothness?: number;
}

/**
 * Mobile Tilt Effect Hook
 * Provides 3D tilt effects for mobile devices using device orientation sensors
 * Only activates on mobile devices and handles iOS permission requirements
 */
export const useMobileTiltEffect = (options: MobileTiltEffectOptions = {}) => {
  const {
    intensity = 15, // Rotation intensity multiplier
    smoothness = 0.1 // Smoothing factor for animations
  } = options;

  const heroRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const permissionRequestedRef = useRef(false);
  const isActiveRef = useRef(false);

  // Detect if device is mobile
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
           'ontouchstart' in window;
  };

  // Handle iOS permission request
  const requestDeviceOrientationPermission = async (): Promise<boolean> => {
    if (!('DeviceOrientationEvent' in window)) {
      return false;
    }

    // Check if permission is already granted
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.warn('Device orientation permission denied:', error);
        return false;
      }
    }

    // For devices that don't require permission
    return true;
  };

  // Handle device orientation event
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (!isActiveRef.current || !heroRef.current) return;

    // Get beta (front-to-back tilt) and gamma (left-to-right tilt)
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;

    // Convert to rotation values with intensity multiplier
    // Beta controls X rotation (front-to-back tilt)
    // Gamma controls Y rotation (left-to-right tilt)
    // Normalize beta to -45 to 45 range for more natural feel
    targetRotationRef.current.x = (beta - 45) * (intensity / 90);
    // Normalize gamma to -90 to 90 range
    targetRotationRef.current.y = gamma * (intensity / 90);

    // Clamp values to prevent extreme rotations
    targetRotationRef.current.x = Math.max(-intensity, Math.min(intensity, targetRotationRef.current.x));
    targetRotationRef.current.y = Math.max(-intensity, Math.min(intensity, targetRotationRef.current.y));

    // Add some dead zone to prevent jitter when device is flat
    const deadZone = 2;
    if (Math.abs(targetRotationRef.current.x) < deadZone) targetRotationRef.current.x = 0;
    if (Math.abs(targetRotationRef.current.y) < deadZone) targetRotationRef.current.y = 0;
  };

  // Smooth animation loop
  const animateTilt = () => {
    if (!isActiveRef.current || !heroRef.current) return;

    // Smooth interpolation
    currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * smoothness;
    currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * smoothness;

    // Apply transforms to background elements
    const heroElement = heroRef.current;
    const parallaxElement = heroElement.querySelector('.hero-parallax') as HTMLElement;
    const particlesElement = heroElement.querySelector('.hero-particles') as HTMLElement;

    if (parallaxElement) {
      parallaxElement.style.transform = `
        translate(calc(var(--parallax-x, 0)), calc(var(--parallax-y, 0)))
        rotateX(${currentRotationRef.current.x}deg)
        rotateY(${currentRotationRef.current.y}deg)
      `;
    }

    if (particlesElement) {
      particlesElement.style.transform = `
        rotateX(${currentRotationRef.current.x * 0.7}deg)
        rotateY(${currentRotationRef.current.y * 0.7}deg)
      `;
    }

    animationFrameRef.current = requestAnimationFrame(animateTilt);
  };

  // Handle first user interaction for permission request
  const handleFirstInteraction = async () => {
    if (permissionRequestedRef.current || !isMobileDevice()) return;

    permissionRequestedRef.current = true;
    const permissionGranted = await requestDeviceOrientationPermission();

    if (permissionGranted) {
      // Add device orientation listener
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
      isActiveRef.current = true;
      animateTilt();
    }
  };

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement || !isMobileDevice()) return;

    // Add interaction listeners for permission request
    const interactionEvents = ['touchstart', 'mousedown', 'click'];
    
    const handleInteraction = () => {
      handleFirstInteraction();
      // Remove listeners after first interaction
      interactionEvents.forEach(event => {
        heroElement.removeEventListener(event, handleInteraction);
      });
    };

    interactionEvents.forEach(event => {
      heroElement.addEventListener(event, handleInteraction, { once: true });
    });

    // Cleanup
    return () => {
      interactionEvents.forEach(event => {
        heroElement.removeEventListener(event, handleInteraction);
      });
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      isActiveRef.current = false;
    };
  }, [intensity, smoothness]);

  return heroRef;
};