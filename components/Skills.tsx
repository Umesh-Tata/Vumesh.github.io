
import React from 'react';
import { Skill } from '../types';
import Section from './Section';

interface SkillsProps {
  id: string;
  skills: Skill[];
  icon?: React.ReactNode;
}

const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
    {/* Fix: Ensure skill.icon is a valid React element and cast to a specific type for cloneElement.
        This resolves a TypeScript error where 'className' was not recognized on 'Partial<unknown> & Attributes'. */}
    {skill.icon && React.isValidElement(skill.icon) && (
      <div className="mb-3 text-primary">
        {React.cloneElement(skill.icon as React.ReactElement<{ className?: string }>, { className: 'w-10 h-10' })}
      </div>
    )}
    <h4 className="text-md font-semibold text-neutral mb-2">{skill.name}</h4>
    <div className="w-full bg-slate-200 rounded-full h-2.5">
      <div
        className="bg-gradient-to-r from-secondary to-primary h-2.5 rounded-full"
        style={{ width: `${skill.level}%` }}
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
    <p className="text-xs text-slate-500 mt-1">{skill.level}% Proficient</p>
  </div>
);

const Skills: React.FC<SkillsProps> = ({ id, skills, icon }) => {
  return (
    <Section 
      id={id} 
      title="Technical Skills"
      subtitle="A glimpse into my technical toolkit. I'm always eager to learn and adapt to new technologies to build cutting-edge solutions."
      titleIcon={icon}
      className="bg-white"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div key={skill.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
             <SkillItem skill={skill} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
