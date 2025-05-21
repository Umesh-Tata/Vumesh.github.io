
import React from 'react';
import Section from './Section';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'; // Assuming you might want icons

// A simple PhoneIcon component if not using heroicons
const DefaultPhoneIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);


interface AboutProps {
  id: string;
  icon?: React.ReactNode;
  summary: string;
  profileImageUrl: string;
  phone?: string;
  email?: string;
}

const About: React.FC<AboutProps> = ({ id, icon, summary, profileImageUrl, phone, email }) => {
  return (
    <Section id={id} title="About Me" titleIcon={icon} className="bg-white">
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1 animate-slide-in-left">
          <img 
            src={profileImageUrl}
            alt="Jaya Vumesh T - Professional" 
            className="rounded-lg shadow-xl mx-auto w-full max-w-xs md:max-w-sm"
          />
        </div>
        <div className="md:col-span-2 space-y-4 text-lg text-neutral animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <p className="whitespace-pre-line">
            {summary}
          </p>
           <div className="mt-6 space-y-3">
            {email && (
              <div className="flex items-center text-neutral hover:text-primary transition-colors">
                <EnvelopeIcon className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                <a href={`mailto:${email}`} className="break-all">{email}</a>
              </div>
            )}
            {phone && (
              <div className="flex items-center text-neutral hover:text-primary transition-colors">
                {/* Using DefaultPhoneIcon if Heroicons not set up globally */}
                <DefaultPhoneIcon className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                <span>{phone}</span>
              </div>
            )}
          </div>
          <p>
            I thrive in collaborative environments, working closely with designers, backend developers, and product managers to bring visions to life. I'm a lifelong learner, constantly exploring new technologies and methodologies to stay at the forefront of web development.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default About;
