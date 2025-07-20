// Interactive Particle System for Hero Background
class ParticleSystem {
  constructor(canvas) {
    console.log('ParticleSystem constructor called');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) {
      console.error('Failed to get canvas context');
      return;
    }
    this.particles = [];
    this.mousePosition = { x: 0, y: 0 };
    this.isMouseInCanvas = false;
    this.animationFrameId = null;
    
    // Performance settings
    this.maxParticles = 50; // Limit for performance
    this.particleConfig = {
      baseSpeed: 0.2,
      baseSize: 2.5, // Increased for visibility
      baseOpacity: 0.6, // Increased for visibility
      glowRadius: 150,
      repelRadius: 100,
      repelStrength: 0.3,
      connectionDistance: 150,
      connectionOpacity: 0.25 // Increased for visibility
    };
    
    // Device-specific adjustments
    this.isTouch = 'ontouchstart' in window;
    this.isMobile = window.innerWidth <= 768;
    
    if (this.isMobile) {
      this.maxParticles = 30;
      this.particleConfig.connectionDistance = 100;
    }
    
    this.init();
  }
  
  init() {
    this.resizeCanvas();
    this.createParticles();
    this.setupEventListeners();
    this.animate();
  }
  
  resizeCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    console.log('Canvas resized to:', this.canvas.width, 'x', this.canvas.height);
  }
  
  createParticles() {
    this.particles = [];
    const colors = [
      { r: 59, g: 130, b: 246 },   // blue-500
      { r: 99, g: 102, b: 241 },   // indigo-500
      { r: 139, g: 92, b: 246 },   // violet-500
      { r: 255, g: 255, b: 255 }   // white
    ];
    
    for (let i = 0; i < this.maxParticles; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.particleConfig.baseSpeed,
        vy: (Math.random() - 0.5) * this.particleConfig.baseSpeed,
        size: Math.random() * 2 + this.particleConfig.baseSize,
        opacity: Math.random() * 0.3 + this.particleConfig.baseOpacity,
        pulsePhase: Math.random() * Math.PI * 2,
        color: color
      });
    }
  }
  
  setupEventListeners() {
    // Listen to hero section mouse events for better integration
    const heroSection = this.canvas.parentElement;
    
    // Custom event from useHeroEffects
    heroSection.addEventListener('heroMouseMove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosition.x = e.detail.x - rect.left;
      this.mousePosition.y = e.detail.y - rect.top;
      this.isMouseInCanvas = true;
    });
    
    // Mouse movement fallback
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosition.x = e.clientX - rect.left;
      this.mousePosition.y = e.clientY - rect.top;
      this.isMouseInCanvas = true;
    });
    
    this.canvas.addEventListener('mouseleave', () => {
      this.isMouseInCanvas = false;
    });
    
    // Touch support
    if (this.isTouch) {
      this.canvas.addEventListener('touchmove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        this.mousePosition.x = touch.clientX - rect.left;
        this.mousePosition.y = touch.clientY - rect.top;
        this.isMouseInCanvas = true;
      });
      
      this.canvas.addEventListener('touchend', () => {
        this.isMouseInCanvas = false;
      });
    }
    
    // Resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
        this.createParticles();
      }, 250);
    });
  }
  
  updateParticle(particle) {
    // Base movement
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Cursor interaction
    if (this.isMouseInCanvas && !this.isTouch) {
      const dx = particle.x - this.mousePosition.x;
      const dy = particle.y - this.mousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.particleConfig.repelRadius) {
        const force = (1 - distance / this.particleConfig.repelRadius) * this.particleConfig.repelStrength;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      }
    }
    
    // Apply friction
    particle.vx *= 0.99;
    particle.vy *= 0.99;
    
    // Restore base velocity
    if (Math.abs(particle.vx) < 0.1) {
      particle.vx = (Math.random() - 0.5) * this.particleConfig.baseSpeed;
    }
    if (Math.abs(particle.vy) < 0.1) {
      particle.vy = (Math.random() - 0.5) * this.particleConfig.baseSpeed;
    }
    
    // Wrap around edges
    if (particle.x < -10) particle.x = this.canvas.width + 10;
    if (particle.x > this.canvas.width + 10) particle.x = -10;
    if (particle.y < -10) particle.y = this.canvas.height + 10;
    if (particle.y > this.canvas.height + 10) particle.y = -10;
    
    // Pulse effect
    particle.pulsePhase += 0.02;
  }
  
  drawParticle(particle) {
    const ctx = this.ctx;
    
    // Calculate dynamic opacity based on cursor proximity
    let dynamicOpacity = particle.opacity;
    if (this.isMouseInCanvas && !this.isTouch) {
      const dx = particle.x - this.mousePosition.x;
      const dy = particle.y - this.mousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.particleConfig.glowRadius) {
        const glowFactor = 1 - distance / this.particleConfig.glowRadius;
        dynamicOpacity = Math.min(particle.opacity + glowFactor * 0.3, 0.8);
      }
    }
    
    // Pulse effect
    const pulseSize = particle.size + Math.sin(particle.pulsePhase) * 0.3;
    
    // Draw particle with glow
    ctx.save();
    ctx.globalAlpha = dynamicOpacity;
    
    // Outer glow
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, pulseSize * 3
    );
    gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.3)`);
    gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, pulseSize * 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner particle
    ctx.globalAlpha = dynamicOpacity * 1.5;
    ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.8)`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
  
  drawConnections() {
    if (this.isMobile) return; // Skip connections on mobile for performance
    
    const ctx = this.ctx;
    ctx.save();
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.particleConfig.connectionDistance) {
          const opacity = (1 - distance / this.particleConfig.connectionDistance) * this.particleConfig.connectionOpacity;
          
          // Use average color of connected particles
          const avgR = (p1.color.r + p2.color.r) / 2;
          const avgG = (p1.color.g + p2.color.g) / 2;
          const avgB = (p1.color.b + p2.color.b) / 2;
          
          ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    ctx.restore();
  }
  
  animate() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });
    
    // Draw connections
    this.drawConnections();
    
    // Continue animation
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.particles = [];
  }
}

// Expose ParticleSystem globally for React integration
window.ParticleSystem = ParticleSystem;

console.log('ParticleSystem loaded and available globally');