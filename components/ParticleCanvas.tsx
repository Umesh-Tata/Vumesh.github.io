import React, { useEffect, useRef } from 'react';

// Declare the ParticleSystem class from particles.js
declare global {
  interface Window {
    ParticleSystem: any;
  }
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Wait for ParticleSystem to be available
    const initParticles = () => {
      if (window.ParticleSystem && canvasRef.current) {
        console.log('Initializing ParticleSystem from React component');
        particleSystemRef.current = new window.ParticleSystem(canvasRef.current);
      } else {
        setTimeout(initParticles, 100);
      }
    };

    initParticles();

    // Cleanup
    return () => {
      if (particleSystemRef.current && particleSystemRef.current.destroy) {
        particleSystemRef.current.destroy();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

export default ParticleCanvas;