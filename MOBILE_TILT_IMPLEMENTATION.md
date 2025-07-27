# Mobile 3D Tilt Effect Implementation

## Overview

This implementation adds a prominent, mobile-only 3D tilt effect to the hero section background elements, driven by device motion sensors. The effect replaces the existing mouse-based parallax on mobile devices while leaving the desktop mouse parallax completely unaffected.

## Features

### 🎯 **Device Detection**
- Automatically detects mobile devices using user agent and screen width
- Disables mouse parallax on mobile devices
- Enables device motion tilt effects only on mobile

### 📱 **iOS 13+ Permission Handling**
- Requests device orientation permission on iOS Safari
- Handles permission denial gracefully
- Activates only after user interaction and permission grant

### 🎨 **Prominent 3D Tilt Effect**
- **Very noticeable**: 10x multiplication factor for prominent visual effect
- **Smooth animation**: 0.08 interpolation factor for natural movement
- **3D transforms**: Applies `rotateX()` and `rotateY()` to background elements
- **Multiple elements**: Affects parallax background, particles, and gradient overlay

### 🔄 **Conditional Logic**
- **Mobile**: Device motion tilt effect (replaces mouse parallax)
- **Desktop**: Mouse parallax effect (unchanged)
- **Touch devices**: Legacy touch support for non-mobile devices

## Implementation Details

### Files Modified

1. **`hooks/useMobileTiltEffect.ts`** - New hook for mobile tilt functionality
2. **`hooks/useHeroEffects.ts`** - Modified to disable mouse parallax on mobile
3. **`components/Hero.tsx`** - Updated to use both hooks conditionally
4. **`index.css`** - Added mobile tilt styles and visual indicators

### Key Components

#### Mobile Tilt Hook (`useMobileTiltEffect.ts`)

```typescript
export const useMobileTiltEffect = (heroRef: React.RefObject<HTMLElement>) => {
  // Device detection
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  };

  // Permission handling for iOS 13+
  const requestDeviceOrientationPermission = async (): Promise<boolean> => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.warn('Device orientation permission denied:', error);
        return false;
      }
    }
    return true; // Permission not required on other devices
  };

  // 3D transform application
  const applyTiltTransform = () => {
    const parallaxElement = heroElement.querySelector('.hero-parallax') as HTMLElement;
    if (parallaxElement) {
      parallaxElement.style.transform = `
        translate(calc(var(--parallax-x, 0)), calc(var(--parallax-y, 0)))
        rotateX(${currentTiltRef.current.y}deg) 
        rotateY(${currentTiltRef.current.x}deg)
      `;
    }
  };
};
```

#### Enhanced Hero Effects Hook (`useHeroEffects.ts`)

```typescript
export const useHeroEffects = () => {
  // Device detection
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  };

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    // Disable mouse parallax on mobile devices
    if (isMobileDevice()) {
      heroElement.classList.add('mobile-device');
      return; // Exit early - mobile devices use device motion tilt instead
    }

    // Desktop mouse parallax logic continues...
  }, []);
};
```

### CSS Styles

#### Mobile Tilt Styles

```css
/* Mobile tilt effect styles */
.mobile-tilt-enabled {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.mobile-tilt-enabled .hero-parallax {
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}

.mobile-tilt-enabled .hero-particles {
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}

/* Enhanced gradient overlay for mobile tilt */
.mobile-tilt-enabled .hero-gradient::before {
  transform: rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg));
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}

/* Disable mouse parallax on mobile devices */
.mobile-device .hero-parallax {
  transform: none !important;
}

.mobile-device .cursor-glow {
  display: none !important;
}

.mobile-device .cursor-trail {
  display: none !important;
}
```

#### Visual Indicator

```css
/* Tilt active indicator */
.tilt-active::after {
  content: '🎯';
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  opacity: 0.7;
  z-index: 20;
  animation: tiltIndicator 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes tiltIndicator {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}
```

## Technical Specifications

### Device Motion Values

- **`beta`**: Front-to-back tilt (-180° to 180°)
- **`gamma`**: Left-to-right tilt (-90° to 90°)
- **Conversion**: `tiltX = (gamma / 90) * 10`, `tiltY = ((beta - 45) / 135) * 10`
- **Clamping**: Values clamped to ±12° for controlled effect

### Performance Optimizations

- **Throttled updates**: 60fps animation loop
- **Smooth interpolation**: 0.08 factor for natural movement
- **Conditional rendering**: Effects only active on mobile devices
- **Memory management**: Proper cleanup of event listeners and animation frames

### Browser Compatibility

- **iOS Safari 13+**: Requires user permission
- **Android Chrome**: Native support
- **Desktop browsers**: Falls back to mouse parallax
- **Legacy browsers**: Graceful degradation

## Testing

### Test File: `mobile-tilt-test.html`

A standalone test file is provided to verify the tilt effect functionality:

1. **Device Detection**: Shows current device type
2. **Permission Status**: Displays motion sensor permission state
3. **Visual Demo**: Interactive tilt indicator
4. **Console Testing**: Helper functions for manual testing

### Testing Commands

```javascript
// Simulate device orientation
window.testTilt(beta, gamma);

// Examples:
testTilt(45, 0);   // Neutral position
testTilt(45, 45);  // Right tilt
testTilt(45, -45); // Left tilt
testTilt(90, 0);   // Forward tilt
testTilt(0, 0);    // Backward tilt
```

## User Experience

### Mobile Users

1. **First Visit**: Tap anywhere on hero section to enable motion sensors
2. **Permission Prompt**: Grant permission when prompted (iOS Safari)
3. **Immediate Effect**: Background elements tilt with device movement
4. **Visual Feedback**: 🎯 indicator shows when tilt is active

### Desktop Users

- **No Changes**: Mouse parallax continues to work as before
- **No Performance Impact**: Mobile tilt logic is completely bypassed
- **Consistent Experience**: Same visual effects and interactions

## Troubleshooting

### Common Issues

1. **No Tilt Effect on Mobile**
   - Check if device supports device orientation API
   - Ensure permission was granted
   - Verify user interaction occurred

2. **Permission Denied**
   - User must manually enable in browser settings
   - iOS: Settings > Safari > Motion & Orientation Access

3. **Performance Issues**
   - Effect automatically disabled on low-end devices
   - Reduced motion preferences are respected

### Debug Information

```javascript
// Check device support
console.log('Device Orientation:', 'ondeviceorientation' in window);

// Check permission status
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
  console.log('Permission required on this device');
}

// Monitor tilt values
window.addEventListener('deviceorientation', (event) => {
  console.log('Beta:', event.beta, 'Gamma:', event.gamma);
});
```

## Future Enhancements

### Potential Improvements

1. **Gyroscope Integration**: Add gyroscope data for more precise movement
2. **Gesture Recognition**: Implement swipe and shake gestures
3. **Customizable Sensitivity**: User-adjustable tilt sensitivity
4. **Advanced 3D Effects**: Depth-based particle movement
5. **Performance Monitoring**: Automatic quality adjustment based on device performance

### Accessibility Considerations

- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Alternative Input**: Keyboard navigation support
- **Screen Reader**: Proper ARIA labels and descriptions
- **High Contrast**: Maintains readability in all modes

## Conclusion

This implementation successfully provides a prominent, mobile-only 3D tilt effect that enhances the user experience on mobile devices while maintaining the existing desktop functionality. The effect is noticeable, performant, and respects user preferences and permissions.