
import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import { Skill } from '../types';

interface SkillsProps {
  id: string;
  skills: Skill[];
  icon?: React.ReactNode;
}

const SkillBar: React.FC<{ skill: Skill; index: number; isVisible: boolean }> = ({ skill, index, isVisible }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, index]);

  return (
    <div className="group animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
        {/* Skill Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {skill.name}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {animatedLevel}%
            </span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
              style={{ width: `${animatedLevel}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          
          {/* Glow effect */}
          <div 
            className="absolute top-0 h-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-full filter blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ width: `${animatedLevel}%` }}
          />
        </div>

        {/* Skill Level Indicator */}
        <div className="mt-3 flex justify-between text-sm text-gray-600">
          <span className="opacity-60">Proficiency</span>
          <span className="font-medium">
            {animatedLevel >= 90 ? 'Expert' : 
             animatedLevel >= 75 ? 'Advanced' : 
             animatedLevel >= 60 ? 'Intermediate' : 
             'Beginner'}
          </span>
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ id, skills, icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Group skills by category for better organization
  const skillCategories = skills.reduce((acc, skill) => {
    const category = skill.name.includes('Java') || skill.name.includes('Spring') || skill.name.includes('Python') ? 'Backend' :
                     skill.name.includes('React') || skill.name.includes('JavaScript') || skill.name.includes('HTML') || skill.name.includes('CSS') ? 'Frontend' :
                     skill.name.includes('AWS') || skill.name.includes('Docker') || skill.name.includes('Jenkins') ? 'DevOps' :
                     skill.name.includes('SQL') || skill.name.includes('MongoDB') ? 'Database' : 'Other';
    
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div ref={sectionRef}>
      <Section 
        id={id} 
        title="Technical Skills" 
        titleIcon={icon}
        subtitle="Technologies and tools I work with to build amazing applications"
        className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10">
          {/* Skills Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-on-scroll">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <div key={category} className="text-center group">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {categorySkills.length}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{category}</div>
                  <div className="text-xs text-gray-500 mt-1">Technologies</div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillBar 
                key={skill.id} 
                skill={skill} 
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Additional Skills Note */}
          <div className="mt-16 text-center animate-on-scroll" style={{ animationDelay: '0.8s' }}>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200/50 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Continuous Learning</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                I'm always expanding my skill set and staying up-to-date with the latest technologies. 
                Currently exploring microservices architecture, cloud-native development, and advanced React patterns.
              </p>
              <div className="flex justify-center mt-6 space-x-4">
                <div className="flex items-center text-blue-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
                  <span className="text-sm font-medium">Learning GraphQL</span>
                </div>
                <div className="flex items-center text-purple-600">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
                  <span className="text-sm font-medium">Exploring Kubernetes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Skills;
