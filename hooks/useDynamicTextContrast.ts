import { useState, useEffect, useRef } from 'react';

interface GradientColors {
  primary: string[];
  shadow: string[];
}

export const useDynamicTextContrast = () => {
  const [gradientColors, setGradientColors] = useState<GradientColors>({
    primary: [
      '#e0e7ff',  // very light indigo
      '#f3e8ff',  // very light purple
      '#fef3c7',  // very light amber
      '#dbeafe',  // very light blue
      '#f0f9ff',  // very light sky
      '#f5f3ff',  // very light violet
      '#fdf2f8',  // very light pink
      '#e0e7ff'   // back to very light indigo
    ],
    shadow: [
      'rgba(224, 231, 255, 0.9)',  // very light indigo with opacity
      'rgba(243, 232, 255, 0.9)',  // very light purple with opacity
      'rgba(254, 243, 199, 0.9)',  // very light amber with opacity
      'rgba(219, 234, 254, 0.9)',  // very light blue with opacity
      'rgba(240, 249, 255, 0.9)',  // very light sky with opacity
      'rgba(245, 243, 255, 0.9)',  // very light violet with opacity
      'rgba(253, 242, 248, 0.9)',  // very light pink with opacity
      'rgba(224, 231, 255, 0.9)'   // back to very light indigo with opacity
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
          `hsl(${230 + progress * 20}, 100%, 95%)`,   // Dynamic very light indigo
          `hsl(${270 + progress * 15}, 100%, 96%)`,   // Dynamic very light purple
          `hsl(${45 + progress * 10}, 100%, 97%)`,    // Dynamic very light amber
          `hsl(${210 + progress * 25}, 100%, 96%)`,   // Dynamic very light blue
          `hsl(${200 + progress * 20}, 100%, 98%)`,   // Dynamic very light sky
          `hsl(${250 + progress * 15}, 100%, 97%)`,   // Dynamic very light violet
          `hsl(${330 + progress * 20}, 100%, 98%)`,   // Dynamic very light pink
          `hsl(${230 + progress * 20}, 100%, 95%)`    // Back to dynamic very light indigo
        ],
        shadow: [
          `hsla(${230 + progress * 20}, 100%, 95%, 0.9)`,   // Dynamic very light indigo with opacity
          `hsla(${270 + progress * 15}, 100%, 96%, 0.9)`,   // Dynamic very light purple with opacity
          `hsla(${45 + progress * 10}, 100%, 97%, 0.9)`,    // Dynamic very light amber with opacity
          `hsla(${210 + progress * 25}, 100%, 96%, 0.9)`,   // Dynamic very light blue with opacity
          `hsla(${200 + progress * 20}, 100%, 98%, 0.9)`,   // Dynamic very light sky with opacity
          `hsla(${250 + progress * 15}, 100%, 97%, 0.9)`,   // Dynamic very light violet with opacity
          `hsla(${330 + progress * 20}, 100%, 98%, 0.9)`,   // Dynamic very light pink with opacity
          `hsla(${230 + progress * 20}, 100%, 95%, 0.9)`    // Back to dynamic very light indigo with opacity
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