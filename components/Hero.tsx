import React from 'react';
import { useHeroEffects } from '../hooks/useHeroEffects';
import { useDynamicTextContrast } from '../hooks/useDynamicTextContrast';

interface HeroProps {
  id: string;
  name: string;
  tagline: string;
  profileImageUrl: string; // This prop should now be for the circular profile image
  heroBgImageUrl?: string; // Optional: For the background image if you decide to use one
}

const Hero: React.FC<HeroProps> = ({ id, name, tagline, profileImageUrl, heroBgImageUrl }) => {
  const heroRef = useHeroEffects();
  const { getGradientCSS } = useDynamicTextContrast();
  
  const scrollToProjects = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} id={id} className="relative h-screen flex items-center justify-center text-center hero-gradient text-white overflow-hidden">
      {/* CRITICAL: Parallax background layer - DO NOT REMOVE! This enables cursor-following movement */}
      <div className="hero-parallax"></div>
      
      {/* Enhanced: Floating particles for dynamic effect */}
      <div className="hero-particles">
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
        <div className="hero-particle"></div>
      </div>
      
      {/* Optional: Background image for the hero section */}
      {/* {heroBgImageUrl && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={heroBgImageUrl}
            alt={`${name} hero background`}
            className="w-full h-full object-cover object-center opacity-20"
          />
        </div>
      )} */}

      <div className="hero-content relative z-10 p-4">
        {/* The circular profile image with object-cover */}
        {/* <img 
          src={profileImageUrl}
          alt={name}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover hover-scale"
        /> */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Hello, I'm <span className="hero-name-dynamic" data-text={name} style={getDynamicTextCSS()}>{name}</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light mb-8 max-w-3xl mx-auto">
          {tagline}
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="bg-accent text-black font-semibold py-3 px-8 rounded-lg shadow-md w-full sm:w-auto !text-neutral hero-button hero-button-primary hover-element"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg shadow-md w-full sm:w-auto hero-button hero-button-secondary hover-element"
          >
            Get In Touch
          </a>
        </div>
      </div>
       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
         <svg className="w-8 h-8 text-white opacity-70 scroll-indicator hover-element" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
           <path d="M19 9l-7 7-7-7"></path>
         </svg>
       </div>
    </section>
  );
};

export default Hero;
