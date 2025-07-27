# Dynamic Text Contrast Implementation

## Overview

This implementation provides dynamic text color adaptation for the `name` variable within the `PersonalInfo` component (rendered in the Hero section). The text color automatically adjusts to maintain optimal visibility and visual harmony with the changing background gradient.

## Key Features

### 1. Synchronized Color Adaptation
- The name text's color dynamically reacts to the background gradient's current state
- Color changes are perfectly synchronized with the background animation (12-second cycle)
- No independent text animation - purely reactive to background changes

### 2. Sophisticated Color Analysis
- **Luminance Calculation**: Uses WCAG-compliant relative luminance formula
- **HSL Analysis**: Calculates background hue for nuanced color adaptation
- **Color Interpolation**: Smoothly interpolates between gradient colors for precise timing

### 3. Adaptive Color Selection
- **Light Backgrounds**: Uses dark text with subtle color tinting based on background hue
- **Dark Backgrounds**: Uses light text with complementary color tinting
- **Dynamic Shadows**: Shadow colors adapt to background colors for enhanced readability

### 4. Performance Optimized
- Uses `requestAnimationFrame` for smooth 60fps updates
- Efficient color calculations with minimal computational overhead
- Proper cleanup of animation frames

## Technical Implementation

### Hook: `useDynamicTextContrast`

**Location**: `hooks/useDynamicTextContrast.ts`

**Key Functions**:
- `getLuminance()`: Calculates relative luminance using WCAG formula
- `getBackgroundColorAtPosition()`: Interpolates background gradient colors
- `getOptimalTextColor()`: Determines optimal text color based on background analysis
- `getDynamicTextCSS()`: Returns CSS custom properties for styling

### CSS Classes

**Primary Class**: `.hero-name-dynamic`

**Features**:
- Dynamic color using CSS custom properties
- Smooth transitions (0.3s ease)
- Multi-layer text shadows for readability
- Hover effects with scale and brightness adjustments
- Pseudo-elements for enhanced visual effects

### Background Gradient Synchronization

The implementation perfectly matches the hero background gradient defined in `index.css`:
```css
.hero-gradient {
  background: linear-gradient(-45deg, 
    #3b82f6, #6366f1, #8b5cf6, #a855f7, 
    #ec4899, #8b5cf6, #6366f1, #3b82f6
  );
  background-size: 300% 300%;
  animation: gradientAnimation 12s ease infinite;
}
```

## Color Adaptation Logic

### Light Background Detection
- Luminance > 0.5 triggers light background mode
- Uses dark text colors with subtle hue-based tinting
- Shadow colors are inverted background colors

### Dark Background Detection
- Luminance ≤ 0.5 triggers dark background mode
- Uses light text colors with complementary tinting
- Shadow colors match background colors

### Hue-Based Color Tinting

**Light Backgrounds**:
- Red-Yellow (0-60°): Warm dark brown (#2d1b0e)
- Yellow-Green (60-120°): Dark green-tinted (#1b2d1b)
- Green-Cyan (120-180°): Dark cyan-tinted (#1b2d2d)
- Cyan-Blue (180-240°): Dark blue-tinted (#1b1b2d)
- Blue-Magenta (240-300°): Dark purple-tinted (#2d1b2d)
- Magenta-Red (300-360°): Dark red-tinted (#2d1b1b)

**Dark Backgrounds**:
- Red-Yellow (0-60°): Warm white (#fff8f0)
- Yellow-Green (60-120°): Cool white with green tint (#f0fff0)
- Green-Cyan (120-180°): Cyan-tinted white (#f0ffff)
- Cyan-Blue (180-240°): Blue-tinted white (#f0f0ff)
- Blue-Magenta (240-300°): Purple-tinted white (#fff0ff)
- Magenta-Red (300-360°): Pink-tinted white (#fff0f0)

## Accessibility Features

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .hero-name-dynamic,
  .hero-name-dynamic::before,
  .hero-name-dynamic::after {
    transition: none !important;
  }
}
```

### Mobile Optimizations
- Faster transitions on mobile (0.2s vs 0.3s)
- Reduced blur effects for better performance
- Optimized shadow rendering

### Fallback Support
- Graceful degradation if JavaScript is disabled
- Default white text color as fallback
- Maintains readability in all scenarios

## Usage

### In Hero Component
```tsx
import { useDynamicTextContrast } from '../hooks/useDynamicTextContrast';

const Hero: React.FC<HeroProps> = ({ name, ... }) => {
  const { getDynamicTextCSS } = useDynamicTextContrast();
  
  return (
    <h1>
      Hello, I'm <span 
        className="hero-name-dynamic" 
        data-text={name} 
        style={getDynamicTextCSS()}
      >
        {name}
      </span>
    </h1>
  );
};
```

### CSS Custom Properties
The hook provides these CSS custom properties:
- `--dynamic-text-color`: The calculated optimal text color
- `--dynamic-shadow-color`: The calculated shadow color
- `--dynamic-text-is-light`: Boolean flag (1 for light, 0 for dark)

## Performance Considerations

### Animation Frame Management
- Uses `requestAnimationFrame` for smooth 60fps updates
- Proper cleanup with `cancelAnimationFrame`
- Efficient color calculations with minimal re-renders

### Memory Management
- Callback functions are memoized with `useCallback`
- State updates are batched efficiently
- No memory leaks from animation frames

### Mobile Performance
- Reduced animation complexity on mobile devices
- Optimized blur and shadow effects
- Faster transition times for better responsiveness

## Browser Compatibility

### Supported Features
- CSS Custom Properties (CSS Variables)
- `requestAnimationFrame`
- Modern CSS features (filters, transforms, etc.)

### Fallbacks
- Graceful degradation for older browsers
- Default color values for unsupported features
- Progressive enhancement approach

## Testing

### Visual Testing
1. Observe text color changes during background gradient animation
2. Verify smooth transitions between color states
3. Check readability against all background colors
4. Test hover effects and interactions

### Performance Testing
1. Monitor frame rate during animation
2. Check memory usage over time
3. Test on mobile devices for performance
4. Verify reduced motion preferences

### Accessibility Testing
1. Test with screen readers
2. Verify color contrast ratios
3. Check reduced motion support
4. Test keyboard navigation

## Future Enhancements

### Potential Improvements
1. **Mouse Position Integration**: Adapt text color based on cursor position
2. **Scroll-Based Adaptation**: Adjust color based on scroll position
3. **Theme Integration**: Coordinate with light/dark mode preferences
4. **Advanced Color Algorithms**: Implement more sophisticated color theory

### Performance Optimizations
1. **Web Workers**: Move color calculations to background threads
2. **GPU Acceleration**: Utilize CSS transforms for better performance
3. **Caching**: Cache calculated colors for repeated states
4. **Throttling**: Implement frame rate limiting for low-end devices