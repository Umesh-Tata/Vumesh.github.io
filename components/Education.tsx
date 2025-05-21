
import React from 'react';
import { TimelineEvent } from '../types';
import TimelineItem from './TimelineItem';
import Section from './Section';

interface EducationProps {
  id: string;
  educations: TimelineEvent[];
  icon?: React.ReactNode;
}

const Education: React.FC<EducationProps> = ({ id, educations, icon }) => {
  return (
    <Section 
      id={id} 
      title="Education" 
      subtitle="My academic background and qualifications that laid the foundation for my career in technology."
      titleIcon={icon}
      className="bg-white"
    >
      <div className="relative">
        {educations.map((edu, index) => (
          <div key={edu.id} className="animate-slide-in-left" style={{ animationDelay: `${index * 0.15}s` }}>
            <TimelineItem item={edu} isLast={index === educations.length - 1} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Education;
    