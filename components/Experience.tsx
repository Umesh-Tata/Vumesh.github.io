
import React from 'react';
import { TimelineEvent } from '../types';
import TimelineItem from './TimelineItem';
import Section from './Section';

interface ExperienceProps {
  id: string;
  experiences: TimelineEvent[];
  icon?: React.ReactNode;
}

const Experience: React.FC<ExperienceProps> = ({ id, experiences, icon }) => {
  return (
    <Section 
      id={id} 
      title="Work Experience" 
      subtitle="My professional journey, highlighting key roles and accomplishments that have shaped my expertise."
      titleIcon={icon}
      className="bg-slate-50"
    >
      <div className="relative">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="animate-slide-in-left" style={{ animationDelay: `${index * 0.15}s` }}>
            <TimelineItem item={exp} isLast={index === experiences.length - 1} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
    