
import React from 'react';
import { LinkedInIcon, GitHubIcon, EnvelopeIcon } from '../constants';

interface FooterProps {
  name: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

const Footer: React.FC<FooterProps> = ({ name, email, linkedinUrl, githubUrl }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-slate-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
            <LinkedInIcon className="w-7 h-7" />
          </a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
            <GitHubIcon className="w-7 h-7" />
          </a>
          <a href={`mailto:${email}`} aria-label="Email" className="hover:text-primary transition-colors">
            <EnvelopeIcon className="w-7 h-7" />
          </a>
        </div>
        <p className="text-sm">
          &copy; {currentYear} {name}. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with React & Tailwind CSS. Inspired by creativity.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
