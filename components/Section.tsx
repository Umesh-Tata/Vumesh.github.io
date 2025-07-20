
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  titleIcon, 
  children, 
  className = '',
  containerClassName = ''
}) => {
  return (
    <section 
      id={id} 
      className={`relative py-20 md:py-32 overflow-hidden ${className}`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/5 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-indigo-500/5 rotate-45 animate-pulse-slow" />
      </div>

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 ${containerClassName}`}>
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          {/* Title with Icon */}
          <div className="flex items-center justify-center mb-6">
            {titleIcon && (
              <div className="mr-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white animate-pulse-slow">
                {titleIcon}
              </div>
            )}
            <h2 className="section-title relative">
              {title}
              {/* Decorative underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h2>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p className="section-subtitle animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}

          {/* Decorative Divider */}
          <div className="flex items-center justify-center mt-8 animate-on-scroll" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <div className="mx-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>

        {/* Section Content */}
        <div className="animate-on-scroll" style={{ animationDelay: '0.6s' }}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
    