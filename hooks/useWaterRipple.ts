import { useCallback } from 'react';

interface RippleOptions {
  duration?: number;
  color?: string;
  opacity?: number;
  scale?: number;
}

export const useWaterRipple = (options: RippleOptions = {}) => {
  const {
    duration = 800,
    color = 'rgba(255, 255, 255, 0.3)',
    opacity = 0.6,
    scale = 1.5
  } = options;

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    // Prevent multiple ripples from being created simultaneously
    const existingRipples = document.querySelectorAll('.water-ripple');
    if (existingRipples.length > 0) {
      return;
    }

    // Get click coordinates relative to viewport
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create ripple container
    const rippleContainer = document.createElement('div');
    rippleContainer.className = 'water-ripple-container';
    rippleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9998;
      overflow: hidden;
    `;

    // Create ripple element
    const ripple = document.createElement('div');
    ripple.className = 'water-ripple';
    ripple.style.cssText = `
      position: absolute;
      top: ${centerY}px;
      left: ${centerX}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      transform: translate(-50%, -50%);
      opacity: ${opacity};
      pointer-events: none;
      transition: all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;

    // Add ripple to container
    rippleContainer.appendChild(ripple);
    document.body.appendChild(rippleContainer);

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      const maxSize = Math.max(window.innerWidth, window.innerHeight) * scale;
      ripple.style.width = `${maxSize}px`;
      ripple.style.height = `${maxSize}px`;
      ripple.style.opacity = '0';
    });

    // Cleanup after animation
    setTimeout(() => {
      if (rippleContainer.parentNode) {
        rippleContainer.parentNode.removeChild(rippleContainer);
      }
    }, duration + 100);
  }, [duration, color, opacity, scale]);

  return { createRipple };
};