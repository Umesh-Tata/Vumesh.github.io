
import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import Section from './Section';

interface ProjectsProps {
  id: string;
  projects: Project[];
  icon?: React.ReactNode;
}

const Projects: React.FC<ProjectsProps> = ({ id, projects, icon }) => {
  return (
    <Section 
        id={id} 
        title="My Recent Work" 
        subtitle="Here's a selection of projects I've recently worked on. Each showcases my commitment to quality, innovation, and user-centric design."
        titleIcon={icon}
        className="bg-slate-50"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, index) => (
          <div key={project.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
    