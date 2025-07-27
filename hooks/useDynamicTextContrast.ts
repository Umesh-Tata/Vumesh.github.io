import { useState, useEffect, useRef } from 'react';

interface GradientColors {
  primary: string[];
  shadow: string[];
}

export const useDynamicTextContrast = () => {
  const [gradientColors, setGradientColors] = useState<GradientColors>({
    primary: [
      '#fbbf24',  // amber-400 - light gold
      '#f59e0b',  // amber-500 - gold
      '#f97316',  // orange-500 - orange
      '#fb7185',  // rose-400 - soft pink
      '#e879f9',  // fuchsia-400 - light purple
      '#a78bfa',  // violet-400 - violet
      '#93c5fd',  // sky-300 - light blue
      '#fbbf24'   // back to amber-400
    ],
    shadow: [
      'rgba(251, 191, 36, 0.8)',  // amber-400 with opacity
      'rgba(245, 158, 11, 0.8)',  // amber-500 with opacity
      'rgba(249, 115, 22, 0.8)',  // orange-500 with opacity
      'rgba(251, 113, 133, 0.8)', // rose-400 with opacity
      'rgba(232, 121, 249, 0.8)', // fuchsia-400 with opacity
      'rgba(167, 139, 250, 0.8)', // violet-400 with opacity
      'rgba(147, 197, 253, 0.8)', // sky-300 with opacity
      'rgba(251, 191, 36, 0.8)'   // back to amber-400 with opacity
    ]
  });

  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const updateGradientColors = (time: number) => {
      timeRef.current = time;
      
      // Calculate background animation progress (0 to 1) based on 12-second cycle
      // This matches the hero background gradient animation duration
      const backgroundProgress = (time % 12000) / 12000; // 12 second cycle to match hero-gradient
      
      // Create reactive color variations that complement the background
      // Colors shift based on background gradient position
      const reactiveColors = {
        primary: [
          `hsl(${45 + backgroundProgress * 60}, 100%, 65%)`,   // Reactive gold
          `hsl(${35 + backgroundProgress * 40}, 100%, 60%)`,   // Reactive orange
          `hsl(${25 + backgroundProgress * 30}, 100%, 55%)`,   // Reactive red-orange
          `hsl(${340 + backgroundProgress * 40}, 100%, 80%)`,  // Reactive pink
          `hsl(${280 + backgroundProgress * 60}, 100%, 80%)`,  // Reactive purple
          `hsl(${260 + backgroundProgress * 40}, 100%, 85%)`,  // Reactive violet
          `hsl(${210 + backgroundProgress * 60}, 100%, 85%)`,  // Reactive blue
          `hsl(${45 + backgroundProgress * 60}, 100%, 65%)`    // Back to reactive gold
        ],
        shadow: [
          `hsla(${45 + backgroundProgress * 60}, 100%, 65%, 0.8)`,   // Reactive gold with opacity
          `hsla(${35 + backgroundProgress * 40}, 100%, 60%, 0.8)`,   // Reactive orange with opacity
          `hsla(${25 + backgroundProgress * 30}, 100%, 55%, 0.8)`,   // Reactive red-orange with opacity
          `hsla(${340 + backgroundProgress * 40}, 100%, 80%, 0.8)`,  // Reactive pink with opacity
          `hsla(${280 + backgroundProgress * 60}, 100%, 80%, 0.8)`,  // Reactive purple with opacity
          `hsla(${260 + backgroundProgress * 40}, 100%, 85%, 0.8)`,  // Reactive violet with opacity
          `hsla(${210 + backgroundProgress * 60}, 100%, 85%, 0.8)`,  // Reactive blue with opacity
          `hsla(${45 + backgroundProgress * 60}, 100%, 65%, 0.8)`    // Back to reactive gold with opacity
        ]
      };

      setGradientColors(reactiveColors);
      animationRef.current = requestAnimationFrame(updateGradientColors);
    };

    animationRef.current = requestAnimationFrame(updateGradientColors);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Function to get CSS custom properties for the gradient
  const getGradientCSS = () => {
    const primaryGradient = `linear-gradient(-45deg, ${gradientColors.primary.join(', ')})`;
    const shadowGradient = `linear-gradient(-45deg, ${gradientColors.shadow.join(', ')})`;
    
    return {
      '--hero-name-primary-gradient': primaryGradient,
      '--hero-name-shadow-gradient': shadowGradient,
    } as React.CSSProperties;
  };

  return {
    gradientColors,
    getGradientCSS,
  };
};