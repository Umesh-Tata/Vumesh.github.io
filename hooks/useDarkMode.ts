import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first for user's previous choice
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // If no saved preference, default to light mode instead of system preference
    return false; // Default to light mode on first load
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Update CSS variables and document class
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.setProperty('--color-primary', '14 165 233'); // sky-500
      root.style.setProperty('--color-secondary', '147 197 253'); // blue-300
      root.style.setProperty('--color-accent', '251 191 36'); // amber-400
      root.style.setProperty('--color-neutral', '148 163 184'); // slate-400
      root.style.setProperty('--color-base-100', '15 23 42'); // slate-900
      root.style.setProperty('--color-base-content', '248 250 252'); // slate-50
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--color-primary', '2 132 199'); // sky-600
      root.style.setProperty('--color-secondary', '129 140 248'); // indigo-400
      root.style.setProperty('--color-accent', '234 179 8'); // yellow-500
      root.style.setProperty('--color-neutral', '51 65 85'); // slate-700
      root.style.setProperty('--color-base-100', '248 250 252'); // slate-50
      root.style.setProperty('--color-base-content', '15 23 42'); // slate-900
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
};