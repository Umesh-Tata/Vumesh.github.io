import { useEffect, useRef, useState } from 'react';

interface MobileTiltState {
  isMobile: boolean;
  showTiltPrompt: boolean;
  tiltEnabled: boolean;
  permissionDenied: boolean;
}

/**
 * Mobile Tilt Effect Hook
 * Implements robust mobile device detection and 3D tilt effects using device motion sensors
 */
export const useMobileTilt = () => {
  const [state, setState] = useState<MobileTiltState>({
    isMobile: false,
    showTiltPrompt: false,
    tiltEnabled: false,
    permissionDenied: false
  });
  
  const heroRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();
  const lastBeta = useRef<number>(0);
  const lastGamma = useRef<number>(0);

  // Robust mobile device detection
  const detectMobileDevice = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone',
      'mobile', 'tablet', 'phone'
    ];
    
    const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
    const isMobileScreen = window.innerWidth <= 768 || window.innerHeight <= 768;
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return isMobileUA && (isMobileScreen || hasTouchSupport);
  };

  // Handle tilt prompt click
  const handleTiltPromptClick = async () => {
    try {
      // Check if DeviceOrientationEvent.requestPermission is available (iOS 13+)
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        
        if (permission === 'granted') {
          setState(prev => ({
            ...prev,
            showTiltPrompt: false,
            tiltEnabled: true
          }));
        } else {
          setState(prev => ({
            ...prev,
            showTiltPrompt: false,
            permissionDenied: true
          }));
          // Show subtle message for 3 seconds
          setTimeout(() => {
            setState(prev => ({ ...prev, permissionDenied: false }));
          }, 3000);
        }
      } else {
        // For Android and other devices where permission is implicit
        setState(prev => ({
          ...prev,
          showTiltPrompt: false,
          tiltEnabled: true
        }));
      }
    } catch (error) {
      console.warn('Device orientation permission error:', error);
      setState(prev => ({
        ...prev,
        showTiltPrompt: false,
        permissionDenied: true
      }));
    }
  };

  // Attach device orientation listener
  const attachDeviceOrientationListener = () => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!heroRef.current) return;

      // Get beta (front-to-back tilt) and gamma (left-to-right tilt)
      const beta = event.beta || 0;
      const gamma = event.gamma || 0;

      // Apply smoothing to prevent jittery movement
      const smoothingFactor = 0.1;
      lastBeta.current += (beta - lastBeta.current) * smoothingFactor;
      lastGamma.current += (gamma - lastGamma.current) * smoothingFactor;

      // Apply 3D transforms with large multiplication factors for noticeable effect
      const rotateX = lastBeta.current * 0.8; // Front-to-back tilt
      const rotateY = lastGamma.current * 0.8; // Left-to-right tilt

      // Apply transforms to hero section and its background elements
      const heroElement = heroRef.current;
      const parallaxElement = heroElement.querySelector('.hero-parallax') as HTMLElement;
      const particlesElement = heroElement.querySelector('.hero-particles') as HTMLElement;

      if (parallaxElement) {
        parallaxElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      if (particlesElement) {
        particlesElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      // Also apply to the main hero element for comprehensive effect
      heroElement.style.transform = `rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg)`;
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    // Store the listener for cleanup
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  };

  useEffect(() => {
    // Detect mobile device on mount
    const isMobile = detectMobileDevice();
    
    if (isMobile) {
      setState(prev => ({
        ...prev,
        isMobile: true,
        showTiltPrompt: true
      }));
    }

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Cleanup device orientation listener when tilt is disabled
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (state.tiltEnabled) {
      cleanup = attachDeviceOrientationListener();
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [state.tiltEnabled]);

  return {
    heroRef,
    state,
    handleTiltPromptClick
  };
};