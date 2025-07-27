import { useEffect, useRef, useState } from 'react';

interface DeviceOrientationEvent extends Event {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

interface DeviceOrientationEventConstructor {
  requestPermission?: () => Promise<PermissionState>;
}

declare global {
  interface WindowEventMap {
    deviceorientation: DeviceOrientationEvent;
  }
  
  interface Window {
    DeviceOrientationEvent: DeviceOrientationEventConstructor;
  }
}

/**
 * Mobile 3D Tilt Effect Hook
 * Implements a highly noticeable 3D tilt effect for mobile devices only
 * Features:
 * - Robust mobile device detection
 * - iOS Safari permission handling
 * - Conditional activation (mobile only)
 * - Highly pronounced 3D transforms
 * - Performance optimized
 */
export const useMobileTilt = (heroRef: React.RefObject<HTMLElement>) => {
  const [isMobile, setIsMobile] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [tiltActive, setTiltActive] = useState(false);
  const animationFrameRef = useRef<number>();
  const tiltValuesRef = useRef({ beta: 0, gamma: 0 });
  const currentTiltRef = useRef({ x: 0, y: 0 });
  const permissionRequestedRef = useRef(false);

  // Robust mobile device detection
  const detectMobileDevice = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone',
      'mobile', 'tablet', 'phone'
    ];
    
    // Check user agent
    const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
    
    // Check screen size and touch capability
    const isSmallScreen = window.innerWidth <= 768;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check if device orientation is supported
    const hasDeviceOrientation = 'DeviceOrientationEvent' in window;
    
    // Additional checks for mobile characteristics
    const isMobileViewport = window.innerWidth < window.innerHeight && window.innerWidth <= 768;
    
    return (isMobileUA || (isSmallScreen && hasTouch)) && hasDeviceOrientation;
  };

  // Request permission for iOS Safari
  const requestOrientationPermission = async (): Promise<boolean> => {
    if (!window.DeviceOrientationEvent?.requestPermission) {
      return true; // Permission not required (Android, etc.)
    }

    try {
      const permission = await window.DeviceOrientationEvent.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.warn('Device orientation permission denied:', error);
      return false;
    }
  };

  // Handle the first tap on hero section for permission request
  const handleFirstTap = async (event: Event) => {
    if (permissionRequestedRef.current) return;
    
    permissionRequestedRef.current = true;
    event.preventDefault();
    event.stopPropagation();
    
    const granted = await requestOrientationPermission();
    setPermissionGranted(granted);
    
    if (granted) {
      setTiltActive(true);
      // Remove the tap listener since permission is granted
      const heroElement = heroRef.current;
      if (heroElement) {
        heroElement.removeEventListener('touchstart', handleFirstTap, { passive: false });
      }
    }
  };

  // Apply 3D transforms with highly noticeable effect
  const applyTiltTransform = () => {
    const heroElement = heroRef.current;
    if (!heroElement || !tiltActive) return;

    // Smooth interpolation for fluid movement
    currentTiltRef.current.x += (tiltValuesRef.current.gamma - currentTiltRef.current.x) * 0.1;
    currentTiltRef.current.y += (tiltValuesRef.current.beta - currentTiltRef.current.y) * 0.1;

    // HIGHLY NOTICEABLE: Large multiplication factors for pronounced effect
    const tiltMultiplier = 15; // Very aggressive tilt effect
    const rotateX = currentTiltRef.current.y * tiltMultiplier;
    const rotateY = currentTiltRef.current.x * tiltMultiplier;

    // Apply transforms to background elements
    const parallaxElement = heroElement.querySelector('.hero-parallax') as HTMLElement;
    const particlesElement = heroElement.querySelector('.hero-particles') as HTMLElement;

    if (parallaxElement) {
      parallaxElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    if (particlesElement) {
      particlesElement.style.transform = `rotateX(${rotateX * 0.8}deg) rotateY(${rotateY * 0.8}deg)`;
    }

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(applyTiltTransform);
  };

  // Handle device orientation events
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (!tiltActive) return;

    // Normalize and store tilt values
    const beta = event.beta !== null ? Math.max(-45, Math.min(45, event.beta)) : 0;
    const gamma = event.gamma !== null ? Math.max(-45, Math.min(45, event.gamma)) : 0;

    tiltValuesRef.current = { beta, gamma };
  };

  useEffect(() => {
    // Detect mobile device on mount
    const mobileDetected = detectMobileDevice();
    setIsMobile(mobileDetected);

    if (!mobileDetected) {
      return; // Exit early for desktop devices
    }

    const heroElement = heroRef.current;
    if (!heroElement) return;

    // Check if permission is already available (Android, etc.)
    if (!window.DeviceOrientationEvent?.requestPermission) {
      setPermissionGranted(true);
      setTiltActive(true);
    } else {
      // iOS Safari: Add tap listener for permission request
      heroElement.addEventListener('touchstart', handleFirstTap, { passive: false });
    }

    // Add device orientation listener
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    // Start animation loop when tilt is active
    if (tiltActive) {
      applyTiltTransform();
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      
      const heroElement = heroRef.current;
      if (heroElement) {
        heroElement.removeEventListener('touchstart', handleFirstTap, { passive: false });
      }

      // Reset transforms on cleanup
      const parallaxElement = heroElement?.querySelector('.hero-parallax') as HTMLElement;
      const particlesElement = heroElement?.querySelector('.hero-particles') as HTMLElement;

      if (parallaxElement) {
        parallaxElement.style.transform = '';
      }
      if (particlesElement) {
        particlesElement.style.transform = '';
      }
    };
  }, [tiltActive]);

  // Start animation when tilt becomes active
  useEffect(() => {
    if (tiltActive && isMobile) {
      applyTiltTransform();
    }
  }, [tiltActive, isMobile]);

  return {
    isMobile,
    permissionGranted,
    tiltActive,
    permissionRequested: permissionRequestedRef.current
  };
};