
import React from 'react';
import { Project } from '../types';
import { GitHubIcon, ExternalLinkIcon } from '../constants';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 flex flex-col h-full">
      <div className="relative">
        <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
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
              className="inline-block bg-secondary/20 text-secondary text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex justify-start space-x-3 pt-2 border-t border-slate-200">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-sky-700 transition-colors duration-300 flex items-center text-sm"
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
              className="text-neutral hover:text-primary transition-colors duration-300 flex items-center text-sm"
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
