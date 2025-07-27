import { useState, useEffect, useRef, useCallback } from 'react';

interface TextContrastState {
  textColor: string;
  shadowColor: string;
  isLight: boolean;
}

export const useDynamicTextContrast = () => {
  const [textContrast, setTextContrast] = useState<TextContrastState>({
    textColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    isLight: false
  });

  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  // Function to calculate relative luminance of a color
  const getLuminance = useCallback((r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r / 255, g / 255, b / 255].map(c => {
      if (c <= 0.03928) return c / 12.92;
      return Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }, []);

  // Function to get background color at a specific position
  const getBackgroundColorAtPosition = useCallback((progress: number): { r: number, g: number, b: number } => {
    // Define the background gradient colors (matching the hero-gradient in index.css)
    const gradientColors = [
      { r: 59, g: 130, b: 246 },   // #3b82f6 - blue
      { r: 99, g: 102, b: 241 },   // #6366f1 - indigo
      { r: 139, g: 92, b: 246 },   // #8b5cf6 - violet
      { r: 168, g: 85, b: 247 },   // #a855f7 - purple
      { r: 236, g: 72, b: 153 },   // #ec4899 - pink
      { r: 139, g: 92, b: 246 },   // #8b5cf6 - violet
      { r: 99, g: 102, b: 241 },   // #6366f1 - indigo
      { r: 59, g: 130, b: 246 }    // #3b82f6 - blue
    ];

    // Calculate which colors to interpolate between
    const totalColors = gradientColors.length;
    const colorIndex = (progress * totalColors) % totalColors;
    const currentIndex = Math.floor(colorIndex);
    const nextIndex = (currentIndex + 1) % totalColors;
    const interpolationFactor = colorIndex - currentIndex;

    const currentColor = gradientColors[currentIndex];
    const nextColor = gradientColors[nextIndex];

    // Interpolate between the two colors
    const r = Math.round(currentColor.r + (nextColor.r - currentColor.r) * interpolationFactor);
    const g = Math.round(currentColor.g + (nextColor.g - currentColor.g) * interpolationFactor);
    const b = Math.round(currentColor.b + (nextColor.b - currentColor.b) * interpolationFactor);

    return { r, g, b };
  }, []);

  // Function to determine optimal text color based on background
  const getOptimalTextColor = useCallback((backgroundColor: { r: number, g: number, b: number }): TextContrastState => {
    const luminance = getLuminance(backgroundColor.r, backgroundColor.g, backgroundColor.b);
    
    // Calculate HSL values for more sophisticated color adaptation
    const max = Math.max(backgroundColor.r, backgroundColor.g, backgroundColor.b);
    const min = Math.min(backgroundColor.r, backgroundColor.g, backgroundColor.b);
    const delta = max - min;
    
    let hue = 0;
    if (delta !== 0) {
      if (max === backgroundColor.r) {
        hue = ((backgroundColor.g - backgroundColor.b) / delta) % 6;
      } else if (max === backgroundColor.g) {
        hue = (backgroundColor.b - backgroundColor.r) / delta + 2;
      } else {
        hue = (backgroundColor.r - backgroundColor.g) / delta + 4;
      }
      hue = Math.round(hue * 60);
      if (hue < 0) hue += 360;
    }
    
    // Determine if background is light or dark
    const isLight = luminance > 0.5;
    
    if (isLight) {
      // For light backgrounds, use dark text with subtle color tinting
      let textColor = '#1a1a1a'; // Default dark gray
      
      // Add subtle color tinting based on background hue
      if (hue >= 0 && hue < 60) { // Red to yellow
        textColor = '#2d1b0e'; // Warm dark brown
      } else if (hue >= 60 && hue < 120) { // Yellow to green
        textColor = '#1b2d1b'; // Dark green-tinted
      } else if (hue >= 120 && hue < 180) { // Green to cyan
        textColor = '#1b2d2d'; // Dark cyan-tinted
      } else if (hue >= 180 && hue < 240) { // Cyan to blue
        textColor = '#1b1b2d'; // Dark blue-tinted
      } else if (hue >= 240 && hue < 300) { // Blue to magenta
        textColor = '#2d1b2d'; // Dark purple-tinted
      } else { // Magenta to red
        textColor = '#2d1b1b'; // Dark red-tinted
      }
      
      return {
        textColor,
        shadowColor: `rgba(${255 - backgroundColor.r}, ${255 - backgroundColor.g}, ${255 - backgroundColor.b}, 0.8)`, // Inverted background color shadow
        isLight: true
      };
    } else {
      // For dark backgrounds, use light text with subtle color tinting
      let textColor = '#ffffff'; // Default white
      
      // Add subtle color tinting based on background hue
      if (hue >= 0 && hue < 60) { // Red to yellow
        textColor = '#fff8f0'; // Warm white
      } else if (hue >= 60 && hue < 120) { // Yellow to green
        textColor = '#f0fff0'; // Cool white with green tint
      } else if (hue >= 120 && hue < 180) { // Green to cyan
        textColor = '#f0ffff'; // Cyan-tinted white
      } else if (hue >= 180 && hue < 240) { // Cyan to blue
        textColor = '#f0f0ff'; // Blue-tinted white
      } else if (hue >= 240 && hue < 300) { // Blue to magenta
        textColor = '#fff0ff'; // Purple-tinted white
      } else { // Magenta to red
        textColor = '#fff0f0'; // Pink-tinted white
      }
      
      return {
        textColor,
        shadowColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, 0.8)`, // Background color shadow
        isLight: false
      };
    }
  }, [getLuminance]);

  useEffect(() => {
    const updateTextContrast = (time: number) => {
      timeRef.current = time;
      
      // Calculate animation progress (0 to 1) based on time
      // Match the 12-second cycle from the hero gradient animation
      const progress = (time % 12000) / 12000;
      
      // Get the current background color at this animation point
      const backgroundColor = getBackgroundColorAtPosition(progress);
      
      // Determine optimal text color
      const optimalColors = getOptimalTextColor(backgroundColor);
      
      setTextContrast(optimalColors);
      
      animationRef.current = requestAnimationFrame(updateTextContrast);
    };

    animationRef.current = requestAnimationFrame(updateTextContrast);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [getBackgroundColorAtPosition, getOptimalTextColor]);

  // Function to get CSS custom properties for the dynamic text color
  const getDynamicTextCSS = useCallback(() => {
    return {
      '--dynamic-text-color': textContrast.textColor,
      '--dynamic-shadow-color': textContrast.shadowColor,
      '--dynamic-text-is-light': textContrast.isLight ? '1' : '0',
    } as React.CSSProperties;
  }, [textContrast]);

  return {
    textContrast,
    getDynamicTextCSS,
  };
};