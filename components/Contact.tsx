
import React from 'react';
import Section from './Section';
import { EnvelopeIcon, LinkedInIcon, GitHubIcon } from '../constants';

interface ContactProps {
  id: string;
  icon?: React.ReactNode;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

const Contact: React.FC<ContactProps> = ({ id, icon, email, linkedinUrl, githubUrl }) => {
  return (
    <Section 
      id={id} 
      title="Get In Touch" 
      subtitle="I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate. Feel free to reach out!"
      titleIcon={icon}
      className="bg-slate-50 dark:bg-slate-800"
    >
      <div className="max-w-lg mx-auto text-center">
        <p className="text-lg text-neutral mb-8">
          Whether you have a question or just want to say hi, my inbox is always open.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-center w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg shadow-md text-lg font-medium contact-email-button hover-element"
          >
            <EnvelopeIcon className="w-5 h-5 mr-2" /> Email Me
          </a>
          <div className="flex space-x-4">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-neutral p-3 bg-base-100 rounded-full shadow-md border border-gray-200 dark:border-gray-700 social-link hover-element"
            >
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-neutral p-3 bg-base-100 rounded-full shadow-md border border-gray-200 dark:border-gray-700 social-link hover-element"
            >
              <GitHubIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;