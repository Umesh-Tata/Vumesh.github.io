
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
            href={`mailto:${email}`