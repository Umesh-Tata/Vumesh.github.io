
import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    // Handle scroll background change
    setScrolled(window.scrollY > 50);

    // Active section highlighting
    let currentSection = 'hero';
    const sections = navItems.map(item => document.getElementById(item.href.substring(1))).filter(Boolean);
    const navbarHeight = 5.5 * 16;
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
           if(lastSection && lastSection.getBoundingClientRect().top < window.innerHeight) {
             // currentSection = lastSection.id;
           }
        }
    }
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, '#hero')}
              className="text-2xl font-black text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-gradient-animate bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                VUMESH
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.href.substring(1)
                      ? 'text-white bg-white/20 shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.href.substring(1) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full animate-pulse" />
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative group p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-6 relative">
                <span 
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isOpen ? 'rotate-45 top-3' : 'top-1'
                  }`} 
                />
                <span 
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`} 
                />
                <span 
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isOpen ? '-rotate-45 top-3' : 'top-5'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'max-h-96 opacity-100 pb-6' 
              : 'max-h-0 opacity-0 pb-0'
          } overflow-hidden`}
        >
          <div className="glass rounded-2xl p-6 mt-2 border border-white/20">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.href.substring(1)
                      ? 'text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {activeSection === item.href.substring(1) && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background overlay for mobile menu */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
