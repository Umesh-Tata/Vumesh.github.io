import { useEffect, useRef, useState } from 'react';

interface MobileTiltConfig {
  maxTiltAngle?: number;
  sensitivity?: number;
  enableOnMobile?: boolean;
}

/**
 * Mobile 3D Tilt Effect Hook
 * Provides device motion-based 3D tilt effects for mobile devices only
 * Handles iOS Safari permission requirements and graceful fallbacks
 */
export const useMobileTilt = (config: MobileTiltConfig = {}) => {
  const {
    maxTiltAngle = 15,
    sensitivity = 1.0,
    enableOnMobile = true
  } = config;

  const [isMobile, setIsMobile] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const permissionRequestedRef = useRef(false);
  const deviceOrientationListenerRef = useRef<((event: DeviceOrientationEvent) => void) | null>(null);

  // Detect mobile device
  const detectMobileDevice = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isMobileWidth = window.innerWidth <= 768;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return isMobileUA || (isMobileWidth && hasTouchScreen);
  };

  // Request device orientation permission (iOS 13+ Safari)
  const requestDeviceOrientationPermission = async (): Promise<boolean> => {
    if (!('DeviceOrientationEvent' in window)) {
      return false;
    }

    // Check if permission API is available (iOS 13+ Safari)
    if ('requestPermission' in (DeviceOrientationEvent as any)) {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.warn('Device orientation permission request failed:', error);
        return false;
      }
    }

    // For other browsers, permission is often implicit over HTTPS
    return true;
  };

  // Handle device orientation event
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (!heroRef.current || !isActive) return;

    // Get beta (front-to-back tilt) and gamma (left-to-right tilt)
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;

    // Apply sensitivity and clamp values
    const tiltX = Math.max(-maxTiltAngle, Math.min(maxTiltAngle, (beta - 45) * sensitivity * 0.5));
    const tiltY = Math.max(-maxTiltAngle, Math.min(maxTiltAngle, gamma * sensitivity * 0.5));

    // Apply 3D transform to hero background elements
    const heroElement = heroRef.current;
    
    // Transform the main hero gradient background
    heroElement.style.setProperty('--tilt-x', `${tiltX}deg`);
    heroElement.style.setProperty('--tilt-y', `${tiltY}deg`);
    
    // Apply transform to parallax layer and particles
    const parallaxLayer = heroElement.querySelector('.hero-parallax') as HTMLElement;
    const particlesContainer = heroElement.querySelector('.hero-particles') as HTMLElement;
    
    if (parallaxLayer) {
      parallaxLayer.style.transform = `translate(calc(var(--parallax-x, 0)), calc(var(--parallax-y, 0))) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
    
    if (particlesContainer) {
      particlesContainer.style.transform = `rotateX(${tiltX * 0.7}deg) rotateY(${tiltY * 0.7}deg)`;
    }
  };

  // Initialize mobile tilt effect
  const initializeMobileTilt = async () => {
    if (!enableOnMobile || !isMobile) return;

    const heroElement = heroRef.current;
    if (!heroElement) return;

    // Add mobile-specific CSS class
    heroElement.classList.add('mobile-tilt-enabled');

    // Check if we need to request permission
    if ('requestPermission' in (DeviceOrientationEvent as any)) {
      // For iOS Safari, we need user interaction to request permission
      const handleFirstTap = async (event: Event) => {
        if (permissionRequestedRef.current) return;
        
        event.preventDefault();
        event.stopPropagation();
        
        permissionRequestedRef.current = true;
        heroElement.removeEventListener('touchstart', handleFirstTap);
        heroElement.removeEventListener('click', handleFirstTap);

        const permissionGranted = await requestDeviceOrientationPermission();
        setHasPermission(permissionGranted);
        
        if (permissionGranted) {
          setupDeviceOrientationListener();
        }
      };

      // Add passive event listeners for the first tap
      heroElement.addEventListener('touchstart', handleFirstTap, { passive: false });
      heroElement.addEventListener('click', handleFirstTap, { passive: false });
    } else {
      // For other browsers, try to set up immediately
      const permissionGranted = await requestDeviceOrientationPermission();
      setHasPermission(permissionGranted);
      
      if (permissionGranted) {
        setupDeviceOrientationListener();
      }
    }
  };

  // Set up device orientation listener
  const setupDeviceOrientationListener = () => {
    if (!('DeviceOrientationEvent' in window)) return;

    const listener = (event: DeviceOrientationEvent) => {
      handleDeviceOrientation(event);
    };

    deviceOrientationListenerRef.current = listener;
    window.addEventListener('deviceorientation', listener, { passive: true });
    setIsActive(true);
  };

  // Clean up device orientation listener
  const cleanupDeviceOrientationListener = () => {
    if (deviceOrientationListenerRef.current) {
      window.removeEventListener('deviceorientation', deviceOrientationListenerRef.current);
      deviceOrientationListenerRef.current = null;
    }
    setIsActive(false);
  };

  // Initialize on mount
  useEffect(() => {
    const mobileDetected = detectMobileDevice();
    setIsMobile(mobileDetected);

    if (mobileDetected) {
      initializeMobileTilt();
    }

    // Cleanup on unmount
    return () => {
      cleanupDeviceOrientationListener();
      if (heroRef.current) {
        heroRef.current.classList.remove('mobile-tilt-enabled');
      }
    };
  }, []);

  // Reset tilt when component unmounts or mobile detection changes
  useEffect(() => {
    if (!isMobile && heroRef.current) {
      // Reset any applied transforms
      heroRef.current.style.removeProperty('--tilt-x');
      heroRef.current.style.removeProperty('--tilt-y');
      
      const parallaxLayer = heroRef.current.querySelector('.hero-parallax') as HTMLElement;
      const particlesContainer = heroRef.current.querySelector('.hero-particles') as HTMLElement;
      
      if (parallaxLayer) {
        parallaxLayer.style.transform = 'translate(calc(var(--parallax-x, 0)), calc(var(--parallax-y, 0)))';
      }
      
      if (particlesContainer) {
        particlesContainer.style.transform = '';
      }
    }
  }, [isMobile]);

  return {
    heroRef,
    isMobile,
    hasPermission,
    isActive
  };
};