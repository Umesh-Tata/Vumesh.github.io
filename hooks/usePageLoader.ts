import { useEffect, useCallback } from 'react';

/**
 * Custom hook to manage the page loader
 * Provides methods to control the loader from React components
 */
export const usePageLoader = () => {
  const hideLoader = useCallback(() => {
    if (typeof window !== 'undefined' && window.pageLoader) {
      window.pageLoader.forceHide();
    }
  }, []);

  const showLoader = useCallback(() => {
    if (typeof window !== 'undefined' && window.pageLoader) {
      // Reset the loader to visible state
      const loader = document.getElementById('page-loader');
      if (loader) {
        loader.classList.remove('loader-hidden', 'loader-removed');
        window.pageLoader.isHidden = false;
        window.pageLoader.isRemoved = false;
      }
    }
  }, []);

  // Auto-hide loader when component mounts (if not already hidden)
  useEffect(() => {
    // Small delay to ensure the loader has had time to initialize
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.pageLoader && !window.pageLoader.isHidden) {
        hideLoader();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hideLoader]);

  return {
    hideLoader,
    showLoader,
    isLoaderVisible: typeof window !== 'undefined' && window.pageLoader ? !window.pageLoader.isHidden : false
  };
};

// Type declaration for the global pageLoader
declare global {
  interface Window {
    pageLoader?: {
      isHidden: boolean;
      isRemoved: boolean;
      forceHide: () => void;
    };
  }
}