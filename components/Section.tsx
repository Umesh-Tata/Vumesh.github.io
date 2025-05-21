
import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleIcon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '', titleIcon }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 flex items-center justify-center">
              {titleIcon && <span className="mr-3">{titleIcon}</span>}
              {title}
            </h2>
            {subtitle && <p className="text-lg md:text-xl text-neutral max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
    