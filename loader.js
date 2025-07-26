/**
 * Page Loader Management
 * Handles the display and smooth fade-out of the page loader
 */

class PageLoader {
  constructor() {
    this.loader = document.getElementById('page-loader');
    this.isHidden = false;
    this.isRemoved = false;
    
    // Bind methods to preserve context
    this.hide = this.hide.bind(this);
    this.remove = this.remove.bind(this);
    
    // Initialize the loader
    this.init();
  }
  
  init() {
    if (!this.loader) {
      console.warn('Page loader element not found');
      return;
    }
    
    // Ensure loader is visible initially
    this.loader.classList.remove('loader-hidden', 'loader-removed');
    
    // Set up event listeners for different loading scenarios
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Use smart hide method for better detection
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.smartHide());
    } else {
      // DOM is already loaded, use smart hide
      this.smartHide();
    }
    
    // Also hide when window is fully loaded (images, stylesheets, etc.)
    window.addEventListener('load', () => this.smartHide());
    
    // Hide when React app is ready (if using React)
    if (typeof window !== 'undefined' && window.React) {
      // React is available, wait for app to be ready
      setTimeout(() => {
        if (!this.isHidden) {
          this.smartHide();
        }
      }, 1000);
    }
    
    // Fallback: hide after a maximum time to prevent infinite loading
    setTimeout(() => {
      if (!this.isHidden) {
        console.log('Page loader timeout - hiding loader');
        this.hide();
      }
    }, 5000); // 5 second timeout
  }
  
  hide() {
    if (this.isHidden || !this.loader) return;
    
    this.isHidden = true;
    this.loader.classList.add('loader-hidden');
    
    // Remove from DOM after fade-out animation completes
    setTimeout(this.remove, 800); // Match the CSS transition duration
  }
  
  remove() {
    if (this.isRemoved || !this.loader) return;
    
    this.isRemoved = true;
    this.loader.classList.add('loader-removed');
    
    // Clean up event listeners
    this.cleanup();
  }
  
  cleanup() {
    // Remove event listeners to prevent memory leaks
    document.removeEventListener('DOMContentLoaded', this.hide);
    window.removeEventListener('load', this.hide);
  }
  
  // Public method to manually hide loader (if needed)
  forceHide() {
    this.hide();
  }
  
  // Check if page is ready to hide loader
  isPageReady() {
    return (
      document.readyState === 'complete' &&
      typeof window !== 'undefined' &&
      window.pageYOffset !== undefined
    );
  }
  
  // Smart hide method that checks multiple conditions
  smartHide() {
    if (this.isPageReady()) {
      this.hide();
    } else {
      // Wait a bit more and try again
      setTimeout(() => {
        if (!this.isHidden) {
          this.smartHide();
        }
      }, 100);
    }
  }
}

// Initialize the page loader when the script loads
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure the loader element exists
  setTimeout(() => {
    window.pageLoader = new PageLoader();
  }, 10);
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PageLoader;
}