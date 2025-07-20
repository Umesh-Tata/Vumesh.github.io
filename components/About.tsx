
import React from 'react';
import Section from './Section';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

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
    <Section 
      id={id} 
      title="About Me" 
      titleIcon={icon} 
      subtitle="Passionate about creating innovative solutions and building amazing experiences"
      className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full filter blur-3xl" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Profile Image Section */}
        <div className="relative group animate-on-scroll">
          <div className="relative">
            {/* Floating background elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
            
            {/* Main image container */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-700 transform group-hover:scale-105">
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-1 rounded-3xl">
                <div className="bg-white rounded-3xl overflow-hidden">
                  <img 
                    src={profileImageUrl}
                    alt="Professional profile"
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            </div>

            {/* Floating skill badges */}
            <div className="absolute -top-4 -right-4 glass text-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce-slow">
              Full-Stack
            </div>
            <div className="absolute -bottom-4 -left-4 glass text-purple-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce-slow" style={{ animationDelay: '1s' }}>
              3+ Years
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8 animate-on-scroll" style={{ animationDelay: '0.3s' }}>
          {/* Main description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {summary}
            </p>
          </div>

          {/* Key highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 ml-4">Development</h3>
                </div>
                <p className="text-gray-600">Passionate about creating scalable web applications with modern technologies</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 ml-4">Innovation</h3>
                </div>
                <p className="text-gray-600">Always exploring new technologies and best practices in software development</p>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200/50 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Let's Connect</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="group flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-300">
                    <EnvelopeIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <span className="font-medium">{email}</span>
                </a>
              )}
              
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="group flex items-center text-purple-600 hover:text-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors duration-300">
                    <DefaultPhoneIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <span className="font-medium">{phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
