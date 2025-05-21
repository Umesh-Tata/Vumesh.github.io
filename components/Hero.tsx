
import React from 'react';

interface HeroProps {
  id: string;
  name: string;
  tagline: string;
  profileImageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ id, name, tagline, profileImageUrl }) => {
  const scrollToProjects = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id={id} className="relative h-screen flex items-center justify-center text-center bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {/* Subtle background pattern or image could go here */}
      </div>
      <div className="relative z-10 p-4 animate-fade-in-up">
        <img 
          src={profileImageUrl}
          alt={name}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Hello, I'm <span className="text-accent">{name}</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light mb-8 max-w-3xl mx-auto">
          {tagline}
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="bg-accent text-neutral hover:bg-yellow-400 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-neutral font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
          >
            Get In Touch
          </a>
        </div>
      </div>
       {/* Optional: Animated chevron to indicate scrollability */}
       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white opacity-70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
