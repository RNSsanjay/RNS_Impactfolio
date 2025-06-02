import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiExternalLink, FiCode, FiInfo, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Define types for our project data
interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  details: string;
  date: string;
  featured: boolean;
  category: string;
}

const Projects: React.FC = () => {
  // Project data with additional fields
  const projectData = [
    {
      title: 'PS-2',
      description: 'A project description for PS-2.',
      technologies: ['Python', 'Data Analysis'],
      image: '/images/ps-2.png',
      githubUrl: 'https://github.com/RNSsanjay/PS-2',
      demoUrl: '',
      details: 'This project involves advanced data analysis techniques to derive insights from complex datasets.'
    },
    {
      title: 'Broken-Patterns-PS',
      description: 'A project description for Broken Patterns PS.',
      technologies: ['JavaScript', 'CSS'],
      image: '/images/broken-patterns-ps.png',
      githubUrl: 'https://github.com/RNSsanjay/Broken-Patterns-PS',
      demoUrl: '',
      details: 'A creative web design project focusing on unique CSS patterns and animations.'
    },
    {
      title: 'Linked-List-Addition-java',
      description: 'A Java project for linked list addition.',
      technologies: ['Java'],
      image: '/images/linked-list-addition-java.png',
      githubUrl: 'https://github.com/RNSsanjay/Linked-List-Addition-java',
      demoUrl: '',
      details: 'Implements efficient algorithms for linked list operations in Java.'
    },
    {
      title: 'RNS-Voice-Notes-Taker',
      description: 'An application to take notes using voice commands.',
      technologies: ['Python', 'Speech Recognition'],
      image: '/images/rns-voice-notes-taker.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Voice-Notes-Taker',
      demoUrl: '',
      details: 'Utilizes speech-to-text technology for seamless note-taking.'
    },
    {
      title: 'RNS_Impactfolio',
      description: 'A portfolio website with impactful design.',
      technologies: ['React', 'CSS', 'JavaScript'],
      image: '/images/rns-impactfolio.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS_Impactfolio',
      demoUrl: '',
      details: 'A visually stunning portfolio built with modern web technologies.'
    },
    {
      title: 'RNS-Text-Pack',
      description: 'A collection of text processing utilities.',
      technologies: ['Python', 'NLP'],
      image: '/images/rns-text-pack.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Text-Pack',
      demoUrl: '',
      details: 'A suite of NLP tools for text analysis and processing.'
    },
    {
      title: 'RNS-Voice-Web',
      description: 'A web application for voice processing.',
      technologies: ['JavaScript', 'Web Audio API'],
      image: '/images/rns-voice-web.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Voice-Web',
      demoUrl: '',
      details: 'Processes audio input in real-time using browser APIs.'
    },
    {
      title: 'RNS-Excel-Sheets',
      description: 'A tool for managing Excel sheets.',
      technologies: ['Python', 'Pandas'],
      image: '/images/rns-excel-sheets.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Excel-Sheets',
      demoUrl: '',
      details: 'Automates Excel data manipulation with Pandas.'
    },
    {
      title: 'RNS-Car-Racing',
      description: 'A car racing game.',
      technologies: ['Unity', 'C#'],
      image: '/images/rns-car-racing.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Car-Racing',
      demoUrl: '',
      details: 'A 3D racing game built with Unity engine.'
    },
    {
      title: 'RNS-Voice-Assistant',
      description: 'A voice-activated assistant.',
      technologies: ['Python', 'AI'],
      image: '/images/rns-voice-assistant.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Voice-Assistant',
      demoUrl: '',
      details: 'An AI-powered assistant with voice command capabilities.'
    },
    {
      title: 'Job-Seeker-Portal-v1',
      description: 'A portal for job seekers.',
      technologies: ['React', 'Node.js'],
      image: '/images/job-seeker-portal-v1.png',
      githubUrl: 'https://github.com/RNSsanjay/Job-Seeker-Portal-v1',
      demoUrl: '',
      details: 'A full-stack job search platform with user authentication.'
    },
    {
      title: 'GPS-Tracker',
      description: 'A GPS tracking application.',
      technologies: ['JavaScript', 'Maps API'],
      image: '/images/gps-tracker.png',
      githubUrl: 'https://github.com/RNSsanjay/GPS-Tracker',
      demoUrl: '',
      details: 'Real-time location tracking with interactive maps.'
    },
    {
      title: 'AI-Language-Trainer',
      description: 'An AI-based language learning tool.',
      technologies: ['Python', 'AI'],
      image: '/images/ai-language-trainer.png',
      githubUrl: 'https://github.com/RNSsanjay/AI-Language-Trainer',
      demoUrl: '',
      details: 'An AI-driven tool for language practice and improvement.'
    },
    {
      title: 'QR-Code-Generator',
      description: 'A tool to generate QR codes.',
      technologies: ['JavaScript', 'QR Code Library'],
      image: '/images/qr-code-generator.png',
      githubUrl: 'https://github.com/RNSsanjay/QR-Code-Generator',
      demoUrl: '',
      details: 'Generates customizable QR codes for various use cases.'
    },
    {
      title: 'TTS-Streamlit',
      description: 'A text-to-speech application using Streamlit.',
      technologies: ['Python', 'Streamlit'],
      image: '/images/tts-streamlit.png',
      githubUrl: 'https://github.com/RNSsanjay/TTS-Streamlit',
      demoUrl: '',
      details: 'Converts text to speech with a user-friendly Streamlit interface.'
    },
    {
      title: 'RNS-Drawing-Application',
      description: 'A web-based drawing application.',
      technologies: ['JavaScript', 'HTML Canvas'],
      image: '/images/rns-drawing-application.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Drawing-Application',
      demoUrl: '',
      details: 'A creative tool for drawing and sketching in the browser.'
    },
    {
      title: 'RNS-Chatbot-python',
      description: 'A chatbot built with Python.',
      technologies: ['Python', 'NLP'],
      image: '/images/rns-chatbot-python.png',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Chatbot-python',
      demoUrl: '',
      details: 'A conversational AI chatbot using NLP techniques.'
    },
    {
      title: 'AR-Filter-Application',
      description: 'An AR filter application.',
      technologies: ['Unity', 'ARKit'],
      image: '/images/ar-filter-application.png',
      githubUrl: 'https://github.com/RNSsanjay/AR-Filter-Application',
      demoUrl: '',
      details: 'Augmented reality filters for mobile applications.'
    },
    {
      title: 'E-Commerce-React',
      description: 'An e-commerce platform built with React.',
      technologies: ['React', 'Node.js'],
      image: '/images/e-commerce-react.png',
      githubUrl: 'https://github.com/RNSsanjay/E-Commerce-React',
      demoUrl: '',
      details: 'A fully functional e-commerce site with cart and payment features.'
    },
    {
      title: 'Django-ChatBot',
      description: 'A chatbot built with Django.',
      technologies: ['Python', 'Django'],
      image: '/images/django-chatbot.png',
      githubUrl: 'https://github.com/RNSsanjay/Django-ChatBot',
      demoUrl: '',
      details: 'A web-based chatbot integrated with Django framework.'
    },
    {
      title: 'LandBerg-Pvt-Ltd-Web-Intern',
      description: 'Web development internship projects.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/landberg-pvt-ltd-web-intern.png',
      githubUrl: 'https://github.com/RNSsanjay/LandBerg-Pvt-Ltd-Web-Intern',
      demoUrl: '',
      details: 'A collection of web projects developed during an internship.'
    },
    {
      title: 'AI-Text-to-Speech',
      description: 'An AI-based text-to-speech tool.',
      technologies: ['Python', 'AI'],
      image: '/images/ai-text-to-speech.png',
      githubUrl: 'https://github.com/RNSsanjay/AI-Text-to-Speech',
      demoUrl: '',
      details: 'Advanced text-to-speech conversion using AI models.'
    },
    {
      title: 'Image-to-Text-Generation-AI',
      description: 'An AI tool to convert images to text.',
      technologies: ['Python', 'OCR'],
      image: '/images/image-to-text-generation-ai.png',
      githubUrl: 'https://github.com/RNSsanjay/Image-to-Text-Generation-Ai',
      demoUrl: '',
      details: 'Extracts text from images using optical character recognition.'
    },
    {
      title: 'Tracker-Intern',
      description: 'An internship project for tracking applications.',
      technologies: ['JavaScript', 'React'],
      image: '/images/tracker-intern.png',
      githubUrl: 'https://github.com/RNSsanjay/Tracker-Intern',
      demoUrl: '',
      details: 'A tracking tool developed during a front-end internship.'
    },
    {
      title: 'HostMyResume',
      description: 'A platform to host resumes.',
      technologies: ['React', 'Firebase'],
      image: '/images/hostmyresume.png',
      githubUrl: 'https://github.com/RNSsanjay/HostMyResume',
      demoUrl: '',
      details: 'A cloud-based platform for hosting and sharing resumes.'
    },
    {
      title: 'Software-Development',
      description: 'Various software development projects.',
      technologies: ['Java', 'C++'],
      image: '/images/software-development.png',
      githubUrl: 'https://github.com/RNSsanjay/Software-Development',
      demoUrl: '',
      details: 'A collection of software projects in multiple languages.'
    },
    {
      title: 'My-Resume',
      description: 'My personal resume website.',
      technologies: ['HTML', 'CSS'],
      image: '/images/my-resume.png',
      githubUrl: 'https://github.com/RNSsanjay/My-Resume',
      demoUrl: '',
      details: 'A static website showcasing personal resume details.'
    },
    {
      title: 'Web-Projects',
      description: 'A collection of web development projects.',
      technologies: ['JavaScript', 'React'],
      image: '/images/web-projects.png',
      githubUrl: 'https://github.com/RNSsanjay/Web-Projects',
      demoUrl: '',
      details: 'A portfolio of various web applications.'
    },
    {
      title: 'Android-Development-Internship-CodeAlpha',
      description: 'Android development projects during an internship.',
      technologies: ['Kotlin', 'Android'],
      image: '/images/android-development-internship-codealpha.png',
      githubUrl: 'https://github.com/RNSsanjay/Android-Development-Internship-CodeAlpha',
      demoUrl: '',
      details: 'Mobile apps developed during an Android internship.'
    },
    {
      title: 'Front-End-Development-Internship-CodeAlpha',
      description: 'Front-end development projects during an internship.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/front-end-development-internship-codealpha.png',
      githubUrl: 'https://github.com/RNSsanjay/Front-End-Development-Internship-CodeAlpha',
      demoUrl: '',
      details: 'Front-end projects showcasing responsive design skills.'
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [showDetails, setShowDetails] = useState<Project | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Filter and sort projects
  const filteredProjects = useCallback(() => {
    return projectData
      .filter(project => {
        const matchesSearchTerm = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech);
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        return matchesSearchTerm && matchesTech && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [searchTerm, selectedTech, selectedCategory, sortBy, projectData]);

  // Memoize filtered projects to avoid recalculating on every render
  const memoizedFilteredProjects = filteredProjects();

  // Randomly select featured projects
  useEffect(() => {
    const shuffled = [...projectData].sort(() => 0.5 - Math.random());
    setFeaturedProjects(shuffled.slice(0, 10));
  }, []);

  // Handle scroll to load more projects
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 200) {
        setShowScrollTop(document.documentElement.scrollTop > 300);
      }

      if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 200 &&
          visibleProjects < memoizedFilteredProjects.length) {
        setVisibleProjects(prev => Math.min(prev + 6, memoizedFilteredProjects.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleProjects, memoizedFilteredProjects.length]);

  // Extract unique technologies and categories for filter options
  const allTechnologies = ['All', ...Array.from(new Set(projectData.flatMap(project => project.technologies)))];
  const allCategories = ['All', ...Array.from(new Set(projectData.map(project => project.category)))];

  // Animation variants
  const bannerVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        },
      },
    },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.4, 0, 0.2, 1]
      },
    }),
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleProjectClick = (project: Project) => {
    setShowDetails(project);
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    setShowDetails(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden min-h-screen"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-emerald-400 rounded-full opacity-20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() > 0.5 ? 20 : -20, 0],
              rotate: [0, Math.random() * 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>

      {/* Picture Banner */}
      <div className="relative h-96 mb-16 overflow-hidden px-4">
        <motion.div
          className="absolute inset-0 flex space-x-8"
          variants={bannerVariants}
          animate="animate"
        >
          {[...featuredProjects, ...featuredProjects].map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              whileHover={{ scale: 1.05, y: -10, zIndex: 10, transition: { duration: 0.3 } }}
              className="flex-none w-80 h-full relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/placeholder.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-emerald-300 mb-2">{project.title}</h3>
                <p className="text-gray-200 line-clamp-2 text-sm mb-4">{project.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#10b981' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium"
                  onClick={() => handleProjectClick(project)}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Header and Filter Controls */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-300 mb-2">My Projects</h2>
            <p className="text-gray-400 max-w-md">Explore my collection of creative and technical projects</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-full font-medium space-x-2"
              onClick={() => setShowFilter(true)}
            >
              <FiFilter />
              <span>Filter</span>
            </motion.button>

            <div className="relative">
              <select
                className="px-6 py-3 bg-gray-800 text-white rounded-full font-medium appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                value={sortBy}
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <FiChevronDown />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 relative z-10"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search projects by title or description..."
              className="w-full px-6 py-4 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pl-14"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-6 text-gray-400">
              <FiSearch size={20} />
            </div>
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-6 text-gray-400"
                onClick={() => setSearchTerm('')}
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          <AnimatePresence>
            {memoizedFilteredProjects.slice(0, visibleProjects).map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={index}
                layout
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/placeholder.png';
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium"
                      onClick={() => handleProjectClick(project)}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-emerald-300">{project.title}</h3>
                    {project.category && (
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-3 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-teal-500/20 text-teal-400 rounded-full hover:bg-teal-500/30 transition-colors"
                        title="Live Demo"
                      >
                        <FiExternalLink size={18} />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-gray-700/50 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
                        title="View Code"
                      >
                        <FiCode size={18} />
                      </motion.a>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-emerald-500/20 text-emerald-400 rounded-full hover:bg-emerald-500/30 transition-colors ml-auto"
                      onClick={() => handleProjectClick(project)}
                      title="More Details"
                    >
                      <FiInfo size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        {visibleProjects < memoizedFilteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-16 relative z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold flex items-center space-x-2"
              onClick={() => setVisibleProjects(prev => Math.min(prev + 6, memoizedFilteredProjects.length))}
            >
              <span>Load More</span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FiChevronDown />
              </motion.span>
            </motion.button>
          </motion.div>
        )}

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 p-4 bg-emerald-600 text-white rounded-full shadow-lg z-50"
              onClick={scrollToTop}
              title="Scroll to top"
            >
              <FiChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Pop-up */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setShowFilter(false)}
          >
            <motion.div
              className="bg-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
              variants={popupVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-emerald-300">Filter Projects</h3>
                <button
                  onClick={() => setShowFilter(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by title or description..."
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pl-10"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Technology</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={(e) => setSelectedTech(e.target.value)}
                    value={selectedTech}
                  >
                    {allTechnologies.map(tech => (
                      <option key={tech} value={tech} className="bg-gray-800">
                        {tech}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                  >
                    {allCategories.map(category => (
                      <option key={category} value={category} className="bg-gray-800">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                    value={sortBy}
                  >
                    <option value="date" className="bg-gray-800">Date (Newest First)</option>
                    <option value="title" className="bg-gray-800">Title (A-Z)</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg mt-8 font-medium"
                onClick={() => setShowFilter(false)}
              >
                Apply Filters
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Pop-up */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && closeDetails()}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-2xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
              variants={popupVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-800 pt-4 pb-2 z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-3xl font-bold text-emerald-300">{showDetails.title}</h3>
                  <button
                    onClick={closeDetails}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {showDetails.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative h-80 mb-6 rounded-xl overflow-hidden">
                <img
                  src={showDetails.image}
                  alt={showDetails.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/placeholder.png';
                  }}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Description</h4>
                  <p className="text-gray-300">{showDetails.description}</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Details</h4>
                  <p className="text-gray-300 whitespace-pre-line">{showDetails.details}</p>
                </div>

                {showDetails.date && (
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Date</h4>
                    <p className="text-gray-300">
                      {new Date(showDetails.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {showDetails.category && (
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Category</h4>
                    <p className="text-gray-300">{showDetails.category}</p>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  {showDetails.demoUrl && (
                    <motion.a
                      href={showDetails.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-lg flex items-center justify-center space-x-2"
                    >
                      <FiExternalLink />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  {showDetails.githubUrl && (
                    <motion.a
                      href={showDetails.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg flex items-center justify-center space-x-2"
                    >
                      <FiCode />
                      <span>View Code</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects;
