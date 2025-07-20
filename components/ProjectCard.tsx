
import React, { useState } from 'react';
import { Project } from '../types';
import { GitHubIcon, ExternalLinkIcon } from '../constants';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container with 3D Transform */}
      <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 hover:rotate-1 card-hover animate-on-scroll">
        {/* Gradient Border Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image Container with Overlay Effects */}
        <div className="relative overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          
          {/* Animated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Floating Year Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            {project.year}
          </div>

          {/* Project Links Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-blue-500 hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label={`Live demo of ${project.title}`}
              >
                <ExternalLinkIcon className="w-6 h-6 group-hover/btn:rotate-12 transition-transform duration-300" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-purple-500 hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <GitHubIcon className="w-6 h-6 group-hover/btn:rotate-12 transition-transform duration-300" />
              </a>
            )}
          </div>
        </div>

        {/* Content Section with Enhanced Typography */}
        <div className="p-8 relative">
          {/* Decorative Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-gradient-to-br from-blue-500 to-purple-600" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
          }} />
          
          <div className="relative z-10">
            {/* Project Title with Gradient */}
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
              {project.title}
            </h3>

            {/* Description with Enhanced Styling */}
            <p className="text-gray-700 text-base mb-6 leading-relaxed whitespace-pre-line group-hover:text-gray-800 transition-colors duration-300">
              {project.description}
            </p>

            {/* Technology Tags with Animation */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full hover:from-blue-100 hover:to-purple-100 hover:scale-105 transition-all duration-300 cursor-default"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isHovered ? 'fadeInUp 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Links with Enhanced Styling */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
              <div className="flex space-x-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-all duration-300"
                    aria-label={`Live demo of ${project.title}`}
                  >
                    <ExternalLinkIcon className="w-4 h-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300" />
                    <span className="group-hover/link:underline">Live Demo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-all duration-300"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GitHubIcon className="w-4 h-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300" />
                    <span className="group-hover/link:underline">Source Code</span>
                  </a>
                )}
              </div>

              {/* Interactive Learn More Button */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <div className="flex items-center text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-300">
                  <span className="text-sm font-medium mr-1">Explore</span>
                  <svg className="w-4 h-4 transition-transform duration-300 hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transform translate-y-2 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 -z-10" />
    </div>
  );
};

export default ProjectCard;
