
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Project, Skill, TimelineEvent, NavItem } from './types';
import {
  CodeBracketIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  ArrowUpIcon
} from './constants';

// Portfolio Data based on Resume
const personalInfo = {
  name: "VUMESH T",
  tagline: "Full-Stack Developer | Java, Spring Boot, React",
  email: "jayavumesh1@gmail.com",
  phone: "(316) 461-1206",
  linkedin: "https://www.linkedin.com/in/jaya-vumesh/", // Placeholder, update with actual URL
  github: "https://github.com/Umesh-Tata", // Placeholder, update with actual URL
  profileImageHero: "https://firebasestorage.googleapis.com/v0/b/img-storage-ef182.firebasestorage.app/o/portofolio%20images%2Fimage%20hero.jpg?alt=media&token=1c05337f-39c1-43c9-9110-61dacbf1e218",
  profileImageAbout: "https://firebasestorage.googleapis.com/v0/b/img-storage-ef182.firebasestorage.app/o/portofolio%20images%2Fimage%20about.jpg?alt=media&token=5e242e8f-82e2-4c02-b2a9-0d8751fc3158",
  summary: "Full-stack developer with 2+ years of experience in building scalable web applications using Java, Spring Boot, and React. Skilled in designing RESTful APIs, working with MySQL and MongoDB, and deploying services on AWS. Experienced in CI/CD automation with Jenkins and Maven, and committed to writing clean, testable code in Agile environments. Known for delivering reliable solutions through strong collaboration and attention to detail."
};

const navItemsData: NavItem[] = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const projectsData: Project[] = [
  {
    id: 'project-android-converter',
    title: 'Unit Converter App',
    description: "• Developed a responsive and intuitive web application for converting values between units such as Celsius/Fahrenheit and kilograms/pounds.\n• Designed the user interface using React components and declarative styling, implementing robust conversion logic in TypeScript and focusing on an efficient user experience.",
    imageUrl: 'https://picsum.photos/seed/android-converter-jaya/600/400',
    tags: ['React', 'TypeScript', 'Web Development'],
    liveUrl: 'https://unit-converter-50d.pages.dev/',
    repoUrl: 'https://github.com/Umesh-Tata/unit-converter',
    year: 'Recent'
  },
  {
    id: 'project-ecommerce',
    title: 'E-commerce Website',
    description: "Built a dynamic e-commerce application featuring real-time inventory management, personalized product recommendations, and secure checkout via third-party payment APIs. Enhanced mobile responsiveness, increasing user engagement by 40%. Included integration with RESTful APIs and deployed components on AWS for scalability.",
    imageUrl: 'https://picsum.photos/seed/ecommerce-jaya/600/400',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS', 'RESTful API'],
    //liveUrl: '#', // Placeholder
    //repoUrl: '#', // Placeholder
    year: 'Recent'
  }
];

const skillsData: Skill[] = [
  // Programming Languages
  { id: 'skill-java', name: 'Java', level: 95, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-red-500" /> },
  { id: 'skill-js', name: 'JavaScript', level: 85, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-yellow-500" /> },
  { id: 'skill-ts', name: 'TypeScript', level: 80, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-blue-500" /> },
  { id: 'skill-sql', name: 'SQL', level: 80, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-cyan-500" /> },
  { id: 'skill-python', name: 'Python', level: 80, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-green-500" /> },
  // Web & Mobile Technologies
  { id: 'skill-html', name: 'HTML5', level: 90, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-orange-500" /> },
  { id: 'skill-css', name: 'CSS3', level: 85, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-blue-600" /> },
  { id: 'skill-react', name: 'React', level: 90, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-sky-500" /> },
  //{ id: 'skill-android-sdk', name: 'Android SDK', level: 75, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-green-500" /> },
  { id: 'skill-bootstrap', name: 'Bootstrap', level: 70, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-purple-500" /> },
  // Frameworks & Libraries
  { id: 'skill-spring-boot', name: 'Spring Boot', level: 90, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-green-600" /> },
  { id: 'skill-spring-mvc', name: 'Spring MVC', level: 85, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-lime-500" /> },
  { id: 'skill-spring-cloud', name: 'Spring Cloud', level: 80, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-teal-500" /> },
  { id: 'skill-dotnet', name: '.NET Core', level: 75, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-indigo-600" /> },
  { id: 'skill-node', name: 'Node.js', level: 70, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-green-400" /> },
  // Databases
  { id: 'skill-mysql', name: 'MySQL', level: 85, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-blue-700" /> },
  { id: 'skill-mongodb', name: 'MongoDB', level: 80, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-green-700" /> },
  { id: 'skill-postgresql', name: 'PostgreSQL', level: 75, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-blue-800" /> },
  // Cloud & DevOps
  { id: 'skill-aws', name: 'AWS (EC2, S3)', level: 75, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-yellow-600" /> },
  { id: 'skill-azure', name: 'Azure', level: 70, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-blue-600" /> },
  { id: 'skill-bitbucket', name: 'Bitbucket', level: 80, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-gray-600" /> },
  { id: 'skill-gcp', name: 'Google Cloud', level: 70, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-red-500" /> },
  { id: 'skill-jenkins', name: 'Jenkins', level: 80, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-gray-500" /> },
  { id: 'skill-maven', name: 'Maven', level: 80, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-red-600" /> },
  { id: 'skill-docker', name: 'Docker', level: 70, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-blue-400" /> },
  { id: 'skill-git', name: 'Git & Bitbucket', level: 90, icon: <CodeBracketIcon className="w-5 h-5 mr-2 text-orange-600" /> },
  // Authentication & Security
  { id: 'skill-jwt', name: 'JWT', level: 75, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-rose-500" /> },
  { id: 'skill-oauth', name: 'OAuth 2.0', level: 70, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-pink-500" /> },
  { id: 'skill-rbac', name: 'RBAC', level: 70, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-fuchsia-500" /> },
  // Testing & QA Tools
  { id: 'skill-junit', name: 'JUnit', level: 85, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-lime-600" /> },
  { id: 'skill-mockito', name: 'Mockito', level: 80, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-green-600" /> },
  { id: 'skill-selenium', name: 'Selenium', level: 65, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-teal-600" /> },
  { id: 'skill-cypress', name: 'Cypress', level: 70, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-emerald-500" /> },
  { id: 'skill-postman', name: 'Postman', level: 85, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-orange-400" /> },
  // Development Tools
  { id: 'skill-jira', name: 'Jira', level: 80, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-indigo-600" /> },
  { id: 'skill-intellij', name: 'IntelliJ IDEA', level: 90, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-purple-600" /> },
  { id: 'skill-vscode', name: 'VS Code', level: 85, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-blue-500" /> },
  { id: 'skill-eclipse', name: 'Eclipse', level: 75, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-indigo-500" /> },
  // Methodologies
  { id: 'skill-agile', name: 'Agile', level: 90, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-sky-400" /> },
  { id: 'skill-scrum', name: 'Scrum', level: 90, icon: <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-cyan-400" /> },
];


const experienceData: TimelineEvent[] = [
  {
    id: 'exp-tcs',
    title: 'Assistant System Engineer',
    institution: 'Tata Consultancy Services',
    period: '05/2021 - 06/2022',
    description: [
      'Developed scalable RESTful APIs using Java, Spring Boot, and Spring Cloud, improving response time and system resilience with load balancing and fallback strategies.',
      'Enhanced MySQL performance by tuning queries, adding indexes, and implementing basic caching strategies, resulting in a 30% improvement in data retrieval.',
      'Contributed to CI/CD automation using Jenkins and Maven, streamlining the build and deployment process and reducing manual effort.',
      'Implemented secure user authentication using JWT and RBAC, strengthening API security and aligning with client security policies.',
      'Deployed applications using Docker containers on AWS EC2 instances and collaborated with DevOps teams for environment setup and monitoring.',
      'Conducted unit testing with JUnit and API testing with Postman; participated in code reviews to maintain code quality and minimize bugs.',
      'Assisted in front-end integration with React components, improving UI responsiveness and enhancing overall user experience.',
      'Refactored legacy codebases to follow modern Java best practices, improving maintainability and reducing technical debt.',
    ],
    logoUrl: 'https://picsum.photos/seed/tcs-logo/40/40'
  },
  {
    id: 'exp-phoenix',
    title: 'Software Developer',
    institution: 'Corefront Technologies Pvt Ltd',
    period: '06/2019 - 04/2021',
    description: [
      'Developed interactive research dashboards using React, JavaScript, HTML, and CSS, enabling engineers to visualize and interpret test data more effectively.',
      'Connected frontend components to backend APIs using Node.js, integrating real-time data updates and enhancing user interactivity for research workflows.',
      'Built Python scripts and trained basic machine learning models using TensorFlow and scikit-learn, automating the analysis of material behavior from experimental datasets.',
      'Designed and maintained SQL database structures, ensuring reliable storage, indexing, and access to structured testing and simulation data.',
      'Created modular, reusable frontend components, applying best practices for clean code architecture and improved maintainability across projects.',
      'Optimized Python-based data pipelines, reducing script execution time and increasing model accuracy through better preprocessing and tuning.',
      'Collaborated closely with materials engineers, gathering domain-specific requirements and translating them into functional UI features and backend logic.',
      'Documented internal workflows and system structure, supporting team onboarding and reducing ramp-up time for new developers.'
    ],
    logoUrl: 'https://picsum.photos/seed/phoenix-logo/40/40'
  },
];

const educationData: TimelineEvent[] = [
  {
    id: 'edu-wsu',
    title: 'Master of Science (MS) in Computer Science',
    institution: 'Wichita State University (WSU)',
    period: 'Graduated: Dec 2024',
    description: 'Master of Science (MS) in Computer Science program at Wichita State University, KS.',
    logoUrl: 'https://picsum.photos/seed/wsu-logo/40/40'
  },
];

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400) {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollTop]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-base-100 text-base-content antialiased">
      <Navbar navItems={navItemsData} />
      <main className="pt-[5.5rem]"> {/* Add padding-top to offset fixed navbar */}
        <Hero 
            id="hero" 
            name={personalInfo.name} 
            tagline={personalInfo.tagline} 
            profileImageUrl={personalInfo.profileImageHero}
        />
        <About 
            id="about" 
            icon={<UserCircleIcon className="w-8 h-8 inline-block mr-2" />} 
            summary={personalInfo.summary}
            profileImageUrl={personalInfo.profileImageAbout}
            phone={personalInfo.phone}
            email={personalInfo.email}
        />
        <Projects 
            id="projects" 
            projects={projectsData} 
            icon={<CodeBracketIcon className="w-8 h-8 inline-block mr-2" />} 
        />
        <Skills 
            id="skills" 
            skills={skillsData} 
            icon={<WrenchScrewdriverIcon className="w-8 h-8 inline-block mr-2" />} 
        />
        <Experience 
            id="experience" 
            experiences={experienceData} 
            icon={<BriefcaseIcon className="w-8 h-8 inline-block mr-2" />} 
        />
        <Education 
            id="education" 
            educations={educationData} 
            icon={<AcademicCapIcon className="w-8 h-8 inline-block mr-2" />} 
        />
        <Contact 
            id="contact" 
            icon={<EnvelopeIcon className="w-8 h-8 inline-block mr-2" />} 
            email={personalInfo.email}
            linkedinUrl={personalInfo.linkedin}
            githubUrl={personalInfo.github}
        />
      </main>
      <Footer 
        name={personalInfo.name}
        email={personalInfo.email}
        linkedinUrl={personalInfo.linkedin}
        githubUrl={personalInfo.github}
      />
      {showScrollTop && (
        <button
          onClick={scrollTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-sky-700 transition-colors duration-300 z-50 animate-fade-in-up"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;
