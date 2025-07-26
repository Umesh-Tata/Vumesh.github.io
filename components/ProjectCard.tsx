
import React from 'react';
import { Project } from '../types';
import { GitHubIcon, ExternalLinkIcon } from '../constants';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-base-100 rounded-xl shadow-2xl overflow-hidden project-card-hover interactive-element flex flex-col h-full border border-gray-200 dark:border-gray-700">
      <div className="relative overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-56 object-cover hover-scale" 
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded hover-scale">
            {project.year}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
        <p className="text-neutral text-sm mb-4 flex-grow whitespace-pre-line">{project.description}</p>
        <div className="mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-secondary/20 text-secondary text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full hover-scale interactive-element"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex justify-start space-x-3 pt-2 border-t border-slate-200 dark:border-slate-700">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-sky-700 transition-colors duration-300 flex items-center text-sm hover-lift interactive-element"
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLinkIcon className="w-5 h-5 mr-1" /> Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral hover:text-primary transition-colors duration-300 flex items-center text-sm hover-lift interactive-element"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <GitHubIcon className="w-5 h-5 mr-1" /> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
