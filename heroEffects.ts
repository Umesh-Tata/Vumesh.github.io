// Hero Background Effects - Cursor Interaction and Parallax
export class HeroEffects {
  private heroElement: HTMLElement | null = null;
  private cursorGlow: HTMLElement | null = null;
  private parallaxLayers: NodeListOf<HTMLElement> | null = null;
  private isInitialized = false;
  private rafId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  constructor() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.animate = this.animate.bind(this);
  }

  public init(): void {
    if (this.isInitialized) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupElements());
    } else {
      this.setupElements();
    }
  }

  private setupElements(): void {
    this.heroElement = document.querySelector('#hero');
    if (!this.heroElement) {
      // Retry after a short delay if hero element is not found
      setTimeout(() => this.setupElements(), 100);
      return;
    }

    this.cursorGlow = this.heroElement.querySelector('.cursor-glow');
    this.parallaxLayers = this.heroElement.querySelectorAll('.parallax-layer');

    // Check if device supports hover (not a touch device)
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    if (supportsHover && (this.cursorGlow || this.parallaxLayers.length > 0)) {
      this.attachEventListeners();
      this.isInitialized = true;
      this.startAnimation();
    } else {
      // On touch devices, just mark as initialized without effects
      this.isInitialized = true;
    }
  }

  private attachEventListeners(): void {
    if (!this.heroElement) return;

    // Mouse events for cursor interaction
    this.heroElement.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    this.heroElement.addEventListener('mouseenter', this.handleMouseEnter, { passive: true });
    this.heroElement.addEventListener('mouseleave', this.handleMouseLeave, { passive: true });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => this.destroy());
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!this.heroElement) return;

    const rect = this.heroElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Normalize coordinates to -1 to 1 range
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    // Update target positions
    this.targetX = x;
    this.targetY = y;

    // Update parallax layers immediately for responsiveness
    this.updateParallaxLayers(normalizedX, normalizedY);
  }

  private handleMouseEnter(): void {
    if (this.cursorGlow) {
      this.cursorGlow.classList.add('active');
    }
  }

  private handleMouseLeave(): void {
    if (this.cursorGlow) {
      this.cursorGlow.classList.remove('active');
    }

    // Reset parallax layers
    if (this.parallaxLayers) {
      this.parallaxLayers.forEach((layer) => {
        layer.style.transform = 'translate3d(0, 0, 0)';
      });
    }
  }

  private updateParallaxLayers(normalizedX: number, normalizedY: number): void {
    if (!this.parallaxLayers) return;

    this.parallaxLayers.forEach((layer, index) => {
      const intensity = (index + 1) * 0.5; // Different intensities for each layer
      const moveX = normalizedX * intensity * -1; // Opposite direction for parallax
      const moveY = normalizedY * intensity * -1;
      
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  }

  private startAnimation(): void {
    this.animate();
  }

  private animate(): void {
    // Smooth cursor glow movement
    if (this.cursorGlow && this.heroElement) {
      // Lerp for smooth movement
      this.mouseX += (this.targetX - this.mouseX) * 0.15;
      this.mouseY += (this.targetY - this.mouseY) * 0.15;

      // Get hero element dimensions for percentage calculation
      const rect = this.heroElement.getBoundingClientRect();
      const percentX = (this.mouseX / rect.width) * 100;
      const percentY = (this.mouseY / rect.height) * 100;

      // Update the background position using percentage
      this.cursorGlow.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 70%)`;
    }

    // Continue animation
    this.rafId = requestAnimationFrame(this.animate);
  }

  public destroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.heroElement) {
      this.heroElement.removeEventListener('mousemove', this.handleMouseMove);
      this.heroElement.removeEventListener('mouseenter', this.handleMouseEnter);
      this.heroElement.removeEventListener('mouseleave', this.handleMouseLeave);
    }

    this.isInitialized = false;
  }

  // Public method to reinitialize if needed
  public reinit(): void {
    this.destroy();
    this.isInitialized = false;
    this.init();
  }
}

// Auto-initialize when module is imported
export const heroEffects = new HeroEffects();

// Initialize immediately if document is ready, otherwise wait
if (typeof window !== 'undefined') {
  heroEffects.init();
}