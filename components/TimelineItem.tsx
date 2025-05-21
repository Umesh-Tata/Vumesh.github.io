
import React from 'react';
import { TimelineEvent } from '../types';

interface TimelineItemProps {
  item: TimelineEvent;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  return (
    <div className="relative pl-10 md:pl-12 pb-8">
      {/* Vertical line */}
      {!isLast && <div className="absolute left-4 md:left-5 top-1 bottom-0 w-0.5 bg-slate-300"></div>}
      
      {/* Dot / Icon */}
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white shadow-md">
        {item.logoUrl ? (
          <img src={item.logoUrl} alt={`${item.institution} logo`} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-sm font-bold">{item.institution.charAt(0)}</span>
        )}
      </div>

      <div className="ml-4">
        <h3 className="text-lg md:text-xl font-semibold text-primary">{item.title}</h3>
        <p className="text-md text-secondary font-medium">{item.institution}</p>
        <p className="text-sm text-slate-500 mb-2">{item.period}</p>
        {typeof item.description === 'string' ? (
          <p className="text-neutral text-sm md:text-base">{item.description}</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-neutral text-sm md:text-base">
            {item.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
    