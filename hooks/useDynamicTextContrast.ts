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
      
      // Calculate animation progress (0 to 1) based on time
      const progress = (time % 8000) / 8000; // 8 second cycle
      
      // Create dynamic color variations based on animation progress
      const dynamicColors = {
        primary: [
          `hsl(${45 + progress * 30}, 100%, 60%)`,   // Dynamic gold
          `hsl(${35 + progress * 20}, 100%, 55%)`,   // Dynamic orange
          `hsl(${25 + progress * 15}, 100%, 50%)`,   // Dynamic red-orange
          `hsl(${340 + progress * 20}, 100%, 75%)`,  // Dynamic pink
          `hsl(${280 + progress * 30}, 100%, 75%)`,  // Dynamic purple
          `hsl(${260 + progress * 20}, 100%, 80%)`,  // Dynamic violet
          `hsl(${210 + progress * 30}, 100%, 80%)`,  // Dynamic blue
          `hsl(${45 + progress * 30}, 100%, 60%)`    // Back to dynamic gold
        ],
        shadow: [
          `hsla(${45 + progress * 30}, 100%, 60%, 0.8)`,   // Dynamic gold with opacity
          `hsla(${35 + progress * 20}, 100%, 55%, 0.8)`,   // Dynamic orange with opacity
          `hsla(${25 + progress * 15}, 100%, 50%, 0.8)`,   // Dynamic red-orange with opacity
          `hsla(${340 + progress * 20}, 100%, 75%, 0.8)`,  // Dynamic pink with opacity
          `hsla(${280 + progress * 30}, 100%, 75%, 0.8)`,  // Dynamic purple with opacity
          `hsla(${260 + progress * 20}, 100%, 80%, 0.8)`,  // Dynamic violet with opacity
          `hsla(${210 + progress * 30}, 100%, 80%, 0.8)`,  // Dynamic blue with opacity
          `hsla(${45 + progress * 30}, 100%, 60%, 0.8)`    // Back to dynamic gold with opacity
        ]
      };

      setGradientColors(dynamicColors);
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