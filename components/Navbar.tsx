
import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleScroll = () => {
    // Active section highlighting
    let currentSection = 'hero'; // Default to hero
    const sections = navItems.map(item => document.getElementById(item.href.substring(1))).filter(Boolean);

    // Navbar height is now fixed at 5.5rem (h-16 is 4rem, py-3 is 0.75rem top/bottom)
    const navbarHeight = 5.5 * 16; // 5.5rem in pixels
    const viewportCenter = window.innerHeight / 2;

    for (const section of sections) {
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top - navbarHeight < viewportCenter && rect.bottom > viewportCenter) {
                 currentSection = section.id;
                 break; 
            }
        }
    }
    
    if (window.scrollY <= 50) { 
        currentSection = 'hero';
    } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        const lastNavItem = navItems[navItems.length-1];
        if(lastNavItem && document.getElementById(lastNavItem.href.substring(1))) {
           const lastSection = document.getElementById(lastNavItem.href.substring(1));
           // Check if the top of the last section is within the viewport
           if(lastSection && lastSection.getBoundingClientRect().top < window.innerHeight) {
             // currentSection = lastSection.id; // This could be an option if strict last section activation is needed
           }
        }
    }
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check for active section
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems]);

  const scrollToSection = (sectionId: string, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const section = document.getElementById(sectionId.substring(1)); // remove #
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu on click
  };

  return (
    <nav className="fixed w-full z-50 bg-base-100 shadow-lg py-3 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#hero" onClick={(e) => scrollToSection('#hero', e)} className="text-2xl font-bold text-primary hover-lift interactive-element">
              MyPortfolio
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(item.href, e)}
                  className={`px-3 py-2 rounded-md text-sm font-medium nav-item-hover interactive-element
                    ${activeSection === item.href.substring(1)
                      ? 'text-white bg-primary' // Active item
                      : 'text-neutral hover:text-primary' // Inactive item
                    }`}
                  aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          {/* Dark Mode Toggle Button - Right Side */}
          <div className="hidden md:block">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-neutral hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 hover-lift interactive-element"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle Button for Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-neutral hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 hover-lift interactive-element"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary hover-lift interactive-element"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-base-100 shadow-lg transition-colors duration-300" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(item.href, e)}
                className={`block px-3 py-2 rounded-md text-base font-medium nav-item-hover interactive-element
                ${activeSection === item.href.substring(1) ? 'text-white bg-primary' : 'text-neutral hover:bg-primary hover:text-white'}`}
                aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
