
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
  "Built and maintained backend APIs using Java, Spring Boot, and Spring Cloud for microservices-based applications.",
  "Developed and supported internal web tools using .NET Framework, integrating with existing enterprise systems.",
  "Developed frontend integration using HTML, CSS, and JavaScript, and handled minor UI updates using ReactJS.",
  "Optimized SQL queries and collaborated with DB teams on schema design and indexing strategies.",
  "Configured CI/CD pipelines using Jenkins, Maven, and deployed applications on AWS EC2.",
  "Implemented role-based access and token-based security using JWT and RBAC models.",
  "Participated in Agile development cycles, peer reviews, and production release planning in a collaborative environment.",
  "Participated in troubleshooting sessions and log analysis to resolve performance and integration issues across backend and frontend systems.",
  "Assisted cross-functional teams by documenting API contracts, data flows, and deployment procedures to streamline knowledge transfer and reduce onboarding time.",
  "Supported integration testing and validation efforts by creating test cases, mocking API responses, and collaborating with QA teams.",
  "Analyzed system performance metrics and contributed to backend optimization by identifying bottlenecks and refactoring code for better scalability.",
  "Led migration efforts from legacy monolithic architecture to microservices, improving system modularity and enabling faster deployment cycles."
],
    logoUrl: 'https://picsum.photos/seed/tcs-logo/40/40'
  },
  {
    id: 'exp-phoenix',
    title: 'Software Developer',
    institution: 'Corefront Technologies Pvt Ltd',
    period: '06/2019 - 04/2021',
    description: [
  "Built and maintained RESTful endpoints in Node.js to fetch, filter, and relay sensor data efficiently.",
  "Developed and trained simple ML models using TensorFlow and scikit-learn to identify trends and anomalies in engineering test data.",
  "Designed and developed modern UI components using ReactJS, HTML, and CSS for internal research dashboards.",
  "Designed and normalized SQL schemas to store structured research data and maintain relational integrity.",
  "Implemented responsive design to ensure cross-device compatibility for desktop and tablets.",
  "Built complex SQL queries for data retrieval, reporting, and dashboard population.",
  "Used Node.js as middleware to connect frontend components to backend services and APIs.",
  "Built real-time data visualizations by integrating live test data into ReactJS charts and tables.",
  "Wrote Python scripts for preprocessing, filtering, and transforming raw experimental data from CSV and sensor logs.",
  "Optimized Python data pipelines for speed and scalability, especially for large datasets.",
  "Ensured code modularity and component reusability by following clean architecture and DRY principles.",
  "Worked closely with material engineers to convert domain-specific workflows into usable UI and backend logic.",
  "Documented system design, API flow, and data architecture for internal handoffs and faster onboarding.",
  "Conducted weekly code reviews and mentored junior developers on best practices in ReactJS and data handling.",
  "Managed version control using Git and Bitbucket and collaborated with team members through feature branching and pull request reviews.",
  "Integrated third-party libraries (e.g., Chart.js, Axios) to improve user experience and simplify HTTP communication.",
  "Participated in Agile sprint planning, standups, and demos with engineers and stakeholders.",
  "Continuously monitored performance bottlenecks in frontend rendering and backend API calls and implemented fixes."
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
