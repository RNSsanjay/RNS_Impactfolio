import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Star, Play, Pause, Volume2, VolumeX, CheckCircle, Clock, Calendar, Zap, ArrowRight, Award, Target, Rocket, Search, X, ExternalLink, Code, Info, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import ProjectPresentation from './bestproject';

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
  // State declarations
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [showDetails, setShowDetails] = useState<Project | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Project data with additional fields
  const projectData: Project[] = [
    {
      title: 'PS-2',
      description: 'A project description for PS-2.',
      technologies: ['Python', 'Data Analysis'],
      image: 'https://www.innovationtraining.org/wp-content/uploads/2022/05/Creative-Problem-Solving-Process.jpeg',
      githubUrl: 'https://github.com/RNSsanjay/PS-2',
      demoUrl: '',
      details: 'This project involves advanced data analysis techniques to derive insights from complex datasets.',
      date: '2023-01-01',
      featured: true,
      category: 'Data Analysis'
    },
    {
      title: 'Broken-Patterns-PS',
      description: 'A project description for Broken Patterns PS.',
      technologies: ['JavaScript', 'CSS'],
      image: 'https://img.freepik.com/premium-vector/problem-solving-planning-man-solving-problems-business-concept-vector-illustration_143808-124.jpg?w=2000',
      githubUrl: 'https://github.com/RNSsanjay/Broken-Patterns-PS',
      demoUrl: '',
      details: 'A creative web design project focusing on unique CSS patterns and animations.',
      date: '2023-02-01',
      featured: true,
      category: 'Web Design'
    },
    {
      title: 'Linked-List-Addition-java',
      description: 'A Java project for linked list addition.',
      technologies: ['Java'],
      image: 'https://www.codekru.com/wp-content/uploads/2022/06/adding-an-element-to-list-using-add-method-1.jpg',
      githubUrl: 'https://github.com/RNSsanjay/Linked-List-Addition-java',
      demoUrl: '',
      details: 'Implements efficient algorithms for linked list operations in Java.',
      date: '2023-03-01',
      featured: false,
      category: 'Algorithms'
    },
    {
      title: 'RNS-Voice-Notes-Taker',
      description: 'An application to take notes using voice commands.',
      technologies: ['Python', 'Speech Recognition'],
      image: 'https://wave.co/opengraph-image.png?f33cc093092c98bd',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Voice-Notes-Taker',
      demoUrl: '',
      details: 'Utilizes speech-to-text technology for seamless note-taking.',
      date: '2023-04-01',
      featured: true,
      category: 'Voice Recognition'
    },
    {
      title: 'RNS_Impactfolio',
      description: 'A portfolio website with impactful design.',
      technologies: ['React', 'CSS', 'JavaScript'],
      image: 'https://www.wiseradvisor.com/blog/wp-content/uploads/2022/02/Portfolio-manager-1.webp',
      githubUrl: 'https://github.com/RNSsanjay/RNS_Impactfolio',
      demoUrl: '',
      details: 'A visually stunning portfolio built with modern web technologies.',
      date: '2023-05-01',
      featured: true,
      category: 'Web Development'
    },
    {
      title: 'RNS-Text-Pack',
      description: 'A collection of text processing utilities.',
      technologies: ['Python', 'NLP'],
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240123110132/10-Free-Text-to-Speech-Generator-with-Realistic-AI-Voices.webp',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Text-Pack',
      demoUrl: '',
      details: 'A suite of NLP tools for text analysis and processing.',
      date: '2023-06-01',
      featured: false,
      category: 'NLP'
    },
    {
      title: 'RNS-Voice-Web',
      description: 'A web application for voice processing.',
      technologies: ['JavaScript', 'Web Audio API'],
      image: 'https://tse1.mm.bing.net/th/id/OIP.W8vf4ysgqzZ4HQjA2Jw-9AHaFb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Voice-Web',
      demoUrl: '',
      details: 'Processes audio input in real-time using browser APIs.',
      date: '2023-07-01',
      featured: false,
      category: 'Web Development'
    },
    {
      title: 'RNS-Excel-Sheets',
      description: 'A tool for managing Excel sheets.',
      technologies: ['Python', 'Pandas'],
      image: 'https://tse4.mm.bing.net/th/id/OIP.AkcrIyCyz-LIVFHhLc07lAHaDt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Excel-Sheets',
      demoUrl: '',
      details: 'Automates Excel data manipulation with Pandas.',
      date: '2023-08-01',
      featured: false,
      category: 'Data Analysis'
    },
    {
      title: 'RNS-Car-Racing',
      description: 'A car racing game.',
      technologies: ['Unity', 'C#'],
      image: 'https://tse3.mm.bing.net/th/id/OIP.utU7ukxU_HQ6bFuy7aATxAHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Car-Racing',
      demoUrl: '',
      details: 'A 3D racing game built with Unity engine.',
      date: '2023-09-01',
      featured: true,
      category: 'Game Development'
    },
    {
      title: 'RNS-Voice-Assistant',
      description: 'A voice-activated assistant.',
      technologies: ['Python', 'AI'],
      image: 'https://user-images.githubusercontent.com/92905626/155858792-9a217c3c-09dd-45ba-a952-f5799c0219d3.jpeg',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Voice-Assistant',
      demoUrl: '',
      details: 'An AI-powered assistant with voice command capabilities.',
      date: '2023-10-01',
      featured: true,
      category: 'AI'
    },
    {
      title: 'Job-Seeker-Portal-v1',
      description: 'A portal for job seekers.',
      technologies: ['React', 'Node.js'],
      image: 'https://miro.medium.com/v2/resize:fit:848/0*7i7iiORy489H2X3Y.png',
      githubUrl: 'https://github.com/RNSsanjay/Job-Seeker-Portal-v1',
      demoUrl: '',
      details: 'A full-stack job search platform with user authentication.',
      date: '2023-11-01',
      featured: false,
      category: 'Web Development'
    },
    {
      title: 'GPS-Tracker',
      description: 'A GPS tracking application.',
      technologies: ['JavaScript', 'Maps API'],
      image: 'https://brilliantmaps.com/wp-content/uploads/81izSt8aGZL.jpg',
      githubUrl: 'https://github.com/RNSsanjay/GPS-Tracker',
      demoUrl: '',
      details: 'Real-time location tracking with interactive maps.',
      date: '2023-12-01',
      featured: false,
      category: 'Web Development'
    },
    {
      title: 'AI-Language-Trainer',
      description: 'An AI-based language learning tool.',
      technologies: ['Python', 'AI'],
      image: 'https://d17ocfn2f5o4rl.cloudfront.net/wp-content/uploads/2020/08/BP-AI-for-language-learning_body-3.jpg',
      githubUrl: 'https://github.com/RNSsanjay/AI-Language-Trainer',
      demoUrl: '',
      details: 'An AI-driven tool for language practice and improvement.',
      date: '2024-01-01',
      featured: true,
      category: 'AI'
    },
    {
      title: 'QR-Code-Generator',
      description: 'A tool to generate QR codes.',
      technologies: ['JavaScript', 'QR Code Library'],
      image: 'https://tse4.mm.bing.net/th/id/OIP.veqrQBgEsRboP2eZKDrnQwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/QR-Code-Generator',
      demoUrl: '',
      details: 'Generates customizable QR codes for various use cases.',
      date: '2024-02-01',
      featured: false,
      category: 'Web Development'
    },
    {
      title: 'TTS-Streamlit',
      description: 'A text-to-speech application using Streamlit.',
      technologies: ['Python', 'Streamlit'],
      image: 'https://tse1.mm.bing.net/th/id/OIP.Fz79TE-4vvk6RP3TmDOWmwHaEU?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/TTS-Streamlit',
      demoUrl: '',
      details: 'Converts text to speech with a user-friendly Streamlit interface.',
      date: '2024-03-01',
      featured: false,
      category: 'AI'
    },
    {
      title: 'RNS-Drawing-Application',
      description: 'A web-based drawing application.',
      technologies: ['JavaScript', 'HTML Canvas'],
      image: 'https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/02/Best-drawing-apps-for-Android-1.jpg',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Drawing-Application',
      demoUrl: '',
      details: 'A creative tool for drawing and sketching in the browser.',
      date: '2024-04-01',
      featured: true,
      category: 'Web Development'
    },
    {
      title: 'RNS-Chatbot-python',
      description: 'A chatbot built with Python.',
      technologies: ['Python', 'NLP'],
      image: 'https://th.bing.com/th?id=OIF.w%2btAnI15P%2fOwyK8KVt6QWg&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/RNS-Chatbot-python',
      demoUrl: '',
      details: 'A conversational AI chatbot using NLP techniques.',
      date: '2024-05-01',
      featured: false,
      category: 'AI'
    },
    {
      title: 'AR-Filter-Application',
      description: 'An AR filter application.',
      technologies: ['Unity', 'ARKit'],
      image: 'https://www.cnet.com/a/img/resize/1ec1dc4fbe208285acf7f37e064bfbfebdacad22/hub/2021/07/15/20210ea1-7556-4eef-9ade-f9369805d5fe/sparkar-2-checker-nic.jpg?auto=webp&width=1200',
      githubUrl: 'https://github.com/RNSsanjay/AR-Filter-Application',
      demoUrl: '',
      details: 'Augmented reality filters for mobile applications.',
      date: '2024-06-01',
      featured: true,
      category: 'AR'
    },
    {
      title: 'E-Commerce-React',
      description: 'An e-commerce platform built with React.',
      technologies: ['React', 'Node.js'],
      image: 'https://phuongnamvina.com/img_data/images/ecommerce.jpeg',
      githubUrl: 'https://github.com/RNSsanjay/E-Commerce-React',
      demoUrl: '',
      details: 'A fully functional e-commerce site with cart and payment features.',
      date: '2024-07-01',
      featured: false,
      category: 'Web Development'
    },
    {
      title: 'Django-ChatBot',
      description: 'A chatbot built with Django.',
      technologies: ['Python', 'Django'],
      image: 'https://oursaferschools.co.uk/wp-content/uploads/2023/03/chatGPT.png',
      githubUrl: 'https://github.com/RNSsanjay/Django-ChatBot',
      demoUrl: '',
      details: 'A web-based chatbot integrated with Django framework.',
      date: '2024-08-01',
      featured: false,
      category: 'AI'
    },
    {
      title: 'LandBerg-Pvt-Ltd-Web-Intern',
      description: 'Web development internship projects.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://play-lh.googleusercontent.com/tXJYDeL7LT2LAV6SCGHzUwHKOCR8Qtk1VbfqEIl8bWDPm93NJrsAHHmoLhtTX_al5bA',
      githubUrl: 'https://github.com/RNSsanjay/LandBerg-Pvt-Ltd-Web-Intern',
      demoUrl: '',
      details: 'A collection of web projects developed during an internship.',
      date: '2024-09-01',
      featured: false,
      category: 'Web Development'
    },
    {
      title: 'AI-Text-to-Speech',
      description: 'An AI-based text-to-speech tool.',
      technologies: ['Python', 'AI'],
      image: 'https://www.comparebiztech.com/wp-content/uploads/2023/07/AI-Text-To-Speech-Tools.jpg',
      githubUrl: 'https://github.com/RNSsanjay/AI-Text-to-Speech',
      demoUrl: '',
      details: 'Advanced text-to-speech conversion using AI models.',
      date: '2024-10-01',
      featured: true,
      category: 'AI'
    },
    {
      title: 'Image-to-Text-Generation-AI',
      description: 'An AI tool to convert images to text.',
      technologies: ['Python', 'OCR'],
      image: 'https://tse2.mm.bing.net/th/id/OIP.0Zf6L1dqv59Rc0YJMmjGtgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/Image-to-Text-Generation-Ai',
      demoUrl: '',
      details: 'Extracts text from images using optical character recognition.',
      date: '2024-11-01',
      featured: false,
      category: 'AI'
    },
    {
      title: 'Tracker-Intern',
      description: 'An internship project for tracking applications.',
      technologies: ['JavaScript', 'React'],
      image: 'https://v3smarttech.com/wp-content/uploads/2022/11/How-AI-in-GPS-tracking-systems-improves-fleet-efficiency.png',
      githubUrl: 'https://github.com/RNSsanjay/Tracker-Intern',
      demoUrl: '',
      details: 'A tracking tool developed during a front-end internship.',
      date: '2024-12-01',
      featured: false,
      category: 'Web Development'
    },
    {
      title: 'HostMyResume',
      description: 'A platform to host resumes.',
      technologies: ['React', 'Firebase'],
      image: 'https://tse1.mm.bing.net/th/id/OIP.R1lY2p2PRbd5Ih9GO1IxiAHaKI?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/HostMyResume',
      demoUrl: '',
      details: 'A cloud-based platform for hosting and sharing resumes.',
      date: '2025-01-01',
      featured: true,
      category: 'Web Development'
    },
    {
      title: 'Software-Development',
      description: 'Various software development projects.',
      technologies: ['Java', 'C++'],
      image: 'https://tse4.mm.bing.net/th/id/OIP.3Z3JXdYIU9sys8HL1eXc6QAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      githubUrl: 'https://github.com/RNSsanjay/Software-Development',
      demoUrl: '',
      details: 'A collection of software projects in multiple languages.',
      date: '2025-02-01',
      featured: false,
      category: 'Software Development'
    },
    {
      title: 'My-Resume',
      description: 'My personal resume website.',
      technologies: ['HTML', 'CSS'],
      image: 'https://marketplace.canva.com/EAFIydcQw8g/1/0/1131w/canva-student-resume-in-green-white-lined-style-d-cjvH0BT58.jpg',
      githubUrl: 'https://github.com/RNSsanjay/My-Resume',
      demoUrl: '',
      details: 'A static website showcasing personal resume details.',
      date: '2025-03-01',
      featured: false,
      category: 'Web Development'
    },
    {
      title: 'Web-Projects',
      description: 'A collection of web development projects.',
      technologies: ['JavaScript', 'React'],
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20220325175226/WebDevelopmentProjects2.png',
      githubUrl: 'https://github.com/RNSsanjay/Web-Projects',
      demoUrl: '',
      details: 'A portfolio of various web applications.',
      date: '2025-04-01',
      featured: true,
      category: 'Web Development'
    },
    {
      title: 'Android-Development-Internship-CodeAlpha',
      description: 'Android development projects during an internship.',
      technologies: ['Kotlin', 'Android'],
      image: 'https://sdreatech.com/storage/images/Android-App-Development-services.jpg',
      githubUrl: 'https://github.com/RNSsanjay/Android-Development-Internship-CodeAlpha',
      demoUrl: '',
      details: 'Mobile apps developed during an Android internship.',
      date: '2025-05-01',
      featured: false,
      category: 'Mobile Development'
    },
    {
      title: 'Front-End-Development-Internship-CodeAlpha',
      description: 'Front-end development projects during an internship.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://img.freepik.com/premium-vector/frontend-development-web-banner-concept-website-interface-improvement-illustration_277904-4428.jpg?w=2000',
      githubUrl: 'https://github.com/RNSsanjay/Front-End-Development-Internship-CodeAlpha',
      demoUrl: '',
      details: 'Front-end projects showcasing responsive design skills.',
      date: '2025-06-01',
      featured: false,
      category: 'Web Development'
    },
  ];

  // Particles animation matching Skills.tsx
  const particleVariants = {
    animate: (i: number) => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      transition: {
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        delay: i * 0.2
      }
    })
  };

  // Generate particles matching Skills page style
  const particles = Array.from({ length: 30 }, (_, i) => (
    <motion.div
      key={i}
      custom={i}
      variants={particleVariants}
      animate="animate"
      className="absolute w-2 h-2 rounded-full bg-green-500"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0
      }}
    />
  ));

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles}
    </div>
  );

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
    <>
      {/* Project Roadmap Section - from bestproject.tsx */}
      <ProjectPresentation />

      <div className="min-h-screen bg-black py-6 xs:py-8 sm:py-10 md:py-16 lg:py-20 px-1 xs:px-2 sm:px-4 lg:px-6 relative overflow-hidden">
        {/* Animated Background - matching Skills page */}
        <motion.div
          className="absolute inset-0 bg-green-900 opacity-30"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            background: [
              'linear-gradient(135deg, #000000, #10b981)',
              'linear-gradient(135deg, #10b981, #3b82f6)',
              'linear-gradient(135deg, #3b82f6, #000000)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated Particles */}
        <FloatingParticles />

        {/* 3D Grid Lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Loading Animation - matching Skills page */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  filter: ["drop-shadow(0 0 8px #10b981)", "drop-shadow(0 0 16px #10b981)", "drop-shadow(0 0 8px #10b981)"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Brain className="w-24 h-24 text-green-500" />
              </motion.div>
              <motion.div
                className="absolute mt-32 text-green-400 font-mono text-lg"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading Projects...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Picture Banner */}
        <div className="relative h-48 xs:h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 overflow-hidden px-1 xs:px-2 sm:px-4 z-10">
          <motion.div
            className="absolute inset-0 flex space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8"
            variants={bannerVariants}
            animate="animate"
          >
            {[...featuredProjects, ...featuredProjects].map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                whileHover={{
                  scale: window.innerWidth < 768 ? 1.02 : 1.05,
                  y: window.innerWidth < 768 ? -5 : -10,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                className="flex-none w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 h-full relative rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gray-900/80 backdrop-blur-lg border border-green-500/30"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-300 mb-1 xs:mb-1.5 sm:mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-green-200 line-clamp-2 text-xs xs:text-xs sm:text-sm md:text-base mb-1.5 xs:mb-2 sm:mb-3 md:mb-4">{project.description}</p>
                  <motion.button
                    whileHover={{ scale: window.innerWidth < 768 ? 1.02 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg touch-manipulation"
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
        <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16"
          >
            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-300 mb-2 xs:mb-3 sm:mb-4 relative px-2"
              animate={{
                textShadow: ["0 0 8px rgba(16, 185, 129, 0.3)", "0 0 16px rgba(16, 185, 129, 0.5)", "0 0 8px rgba(16, 185, 129, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              My Projects
              <motion.span
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32 h-0.5 sm:h-1 bg-green-400"
                initial={{ width: 0 }}
                animate={{ width: window.innerWidth < 640 ? "4rem" : "8rem" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.h1>
            <motion.p
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-green-200 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-3 xs:px-4 sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Explore my collection of creative and technical projects
            </motion.p>
            <motion.div
              className="flex justify-center items-center gap-1 xs:gap-1.5 sm:gap-2 mt-3 xs:mt-4 sm:mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: i * 0.1, duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Star className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500 fill-current" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-3 xs:gap-4 sm:gap-0"
          >
            <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: window.innerWidth < 640 ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium space-x-2 shadow-lg text-xs xs:text-sm sm:text-base touch-manipulation min-h-[44px]"
                onClick={() => setShowFilter(true)}
              >
                <Filter className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span>Filter</span>
              </motion.button>

              <div className="relative">
                <select
                  className="w-full xs:w-auto px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-gray-900/70 backdrop-blur-lg border border-green-500/30 text-green-200 rounded-full font-medium appearance-none pr-6 xs:pr-8 sm:pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 text-xs xs:text-sm sm:text-base min-h-[44px]"
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                  value={sortBy}
                >
                  <option value="date" className="bg-gray-900">Sort by Date</option>
                  <option value="title" className="bg-gray-900">Sort by Title</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-200">
                  <ChevronDown className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 relative z-10"
          >
            <div className="relative max-w-full xs:max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-4 rounded-full bg-gray-900/70 backdrop-blur-lg border border-green-500/30 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 pl-8 xs:pl-10 sm:pl-14 text-xs xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 xs:pl-3 sm:pl-6 text-green-400">
                <Search className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              </div>
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-2 xs:pr-3 sm:pr-6 text-green-400 min-h-[44px] min-w-[44px] touch-manipulation"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 relative z-10">
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
                  className="bg-gray-900/80 backdrop-blur-lg rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-green-500/30 group hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
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
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2 xs:p-3 sm:p-4"
                    >
                      <motion.button
                        whileHover={{ scale: window.innerWidth < 640 ? 1.02 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg touch-manipulation min-h-[36px]"
                        onClick={() => handleProjectClick(project)}
                      >
                        View Details
                      </motion.button>
                    </motion.div>
                  </div>

                  <div className="p-2 xs:p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2 xs:mb-2.5 sm:mb-3 gap-2 sm:gap-0">
                      <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-green-300 line-clamp-2 sm:line-clamp-1">{project.title}</h3>
                      {project.category && (
                        <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30 flex-shrink-0 max-w-full truncate">
                          {project.category}
                        </span>
                      )}
                    </div>

                    <p className="text-green-200 mb-2 xs:mb-3 sm:mb-4 line-clamp-2 xs:line-clamp-3 text-xs xs:text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 mb-2 xs:mb-3 sm:mb-4">
                      {project.technologies.slice(0, window.innerWidth < 640 ? 2 : 3).map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: window.innerWidth < 640 ? 1.02 : 1.1 }}
                          className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30 max-w-full truncate"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > (window.innerWidth < 640 ? 2 : 3) && (
                        <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs">
                          +{project.technologies.length - (window.innerWidth < 640 ? 2 : 3)}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-1.5 xs:space-x-2 sm:space-x-3">
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: window.innerWidth < 640 ? 1.05 : 1.1 }}
                          className="p-1.5 xs:p-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors border border-green-500/30 touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: window.innerWidth < 640 ? 1.05 : 1.1 }}
                          className="p-1.5 xs:p-2 bg-gray-700/50 text-green-300 rounded-full hover:bg-gray-700 transition-colors border border-gray-600/30 touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="View Code"
                        >
                          <Code className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        </motion.a>
                      )}
                      <motion.button
                        whileHover={{ scale: window.innerWidth < 640 ? 1.05 : 1.1 }}
                        className="p-1.5 xs:p-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors ml-auto border border-green-500/30 touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
                        onClick={() => handleProjectClick(project)}
                        title="More Details"
                      >
                        <Info className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
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
              className="flex justify-center mt-6 xs:mt-8 sm:mt-10 md:mt-12 lg:mt-16 relative z-10"
            >
              <motion.button
                whileHover={{ scale: window.innerWidth < 640 ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold flex items-center space-x-2 shadow-lg text-sm xs:text-base touch-manipulation min-h-[44px]"
                onClick={() => setVisibleProjects(prev => Math.min(prev + 6, memoizedFilteredProjects.length))}
              >
                <span>Load More</span>
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ChevronDown className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
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
                whileHover={{ scale: window.innerWidth < 640 ? 1.05 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-3 xs:bottom-4 sm:bottom-6 lg:bottom-8 right-3 xs:right-4 sm:right-6 lg:right-8 p-2.5 xs:p-3 sm:p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg z-50 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={scrollToTop}
                title="Scroll to top"
              >
                <ChevronUp className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 xs:p-3 sm:p-4"
              onClick={(e) => e.target === e.currentTarget && setShowFilter(false)}
            >
              <motion.div
                className="bg-gray-900/90 backdrop-blur-lg border border-green-500/30 p-3 xs:p-4 sm:p-6 lg:p-8 rounded-lg xs:rounded-xl sm:rounded-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
                variants={popupVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-3 xs:mb-4 sm:mb-6">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-green-300">Filter Projects</h3>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="text-green-400 hover:text-green-200 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-green-300 mb-1.5 xs:mb-2">Search</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-gray-800/70 border border-green-500/30 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 pl-7 xs:pl-8 sm:pl-10 text-sm xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                      />
                      <Search className="absolute left-2 xs:left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-300 mb-1.5 xs:mb-2">Technology</label>
                    <select
                      className="w-full px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-gray-800/70 border border-green-500/30 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
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
                    <label className="block text-sm font-medium text-green-300 mb-1.5 xs:mb-2">Category</label>
                    <select
                      className="w-full px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-gray-800/70 border border-green-500/30 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
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
                    <label className="block text-sm font-medium text-green-300 mb-1.5 xs:mb-2">Sort By</label>
                    <select
                      className="w-full px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg bg-gray-800/70 border border-green-500/30 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                      value={sortBy}
                    >
                      <option value="date" className="bg-gray-800">Date (Newest First)</option>
                      <option value="title" className="bg-gray-800">Title (A-Z)</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: window.innerWidth < 640 ? 1.01 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg mt-4 xs:mt-6 sm:mt-8 font-medium shadow-lg text-sm xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
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
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-2 xs:p-3 sm:p-4 overflow-y-auto"
              onClick={(e) => e.target === e.currentTarget && closeDetails()}
            >
              <motion.div
                className="bg-gray-900/90 backdrop-blur-lg border border-green-500/30 p-3 xs:p-4 sm:p-6 rounded-lg xs:rounded-xl sm:rounded-2xl w-full max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl shadow-2xl max-h-[95vh] overflow-y-auto"
                variants={popupVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gray-900/90 backdrop-blur-lg pt-1 xs:pt-2 sm:pt-4 pb-1 xs:pb-2 z-10">
                  <div className="flex justify-between items-start mb-2 xs:mb-3 sm:mb-4 gap-3">
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-300 line-clamp-2 flex-1">{showDetails.title}</h3>
                    <button
                      onClick={closeDetails}
                      className="text-green-400 hover:text-green-200 transition-colors flex-shrink-0 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <X className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 mb-2 xs:mb-3 sm:mb-4">
                    {showDetails.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-green-500/20 text-green-400 rounded-full text-xs xs:text-xs sm:text-sm border border-green-500/30 max-w-full truncate"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative h-36 xs:h-40 sm:h-48 md:h-64 lg:h-80 mb-3 xs:mb-4 sm:mb-6 rounded-md xs:rounded-lg sm:rounded-xl overflow-hidden">
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

                <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-green-300 mb-1.5 xs:mb-2">Description</h4>
                    <p className="text-green-200 text-xs xs:text-sm sm:text-base">{showDetails.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-green-300 mb-1.5 xs:mb-2">Details</h4>
                    <p className="text-green-200 whitespace-pre-line text-xs xs:text-sm sm:text-base">{showDetails.details}</p>
                  </div>

                  {showDetails.date && (
                    <div>
                      <h4 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-green-300 mb-1.5 xs:mb-2">Date</h4>
                      <p className="text-green-200 text-xs xs:text-sm sm:text-base">
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
                      <h4 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-green-300 mb-1.5 xs:mb-2">Category</h4>
                      <p className="text-green-200 text-xs xs:text-sm sm:text-base">{showDetails.category}</p>
                    </div>
                  )}

                  <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-4 pt-2 xs:pt-3 sm:pt-4">
                    {showDetails.demoUrl && (
                      <motion.a
                        href={showDetails.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: window.innerWidth < 640 ? 1.02 : 1.05 }}
                        className="flex-1 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center justify-center space-x-2 shadow-lg text-xs xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
                      >
                        <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    {showDetails.githubUrl && (
                      <motion.a
                        href={showDetails.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: window.innerWidth < 640 ? 1.02 : 1.05 }}
                        className="flex-1 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 bg-gray-700/70 border border-green-500/30 text-green-200 rounded-lg flex items-center justify-center space-x-2 text-xs xs:text-sm sm:text-base min-h-[44px] touch-manipulation"
                      >
                        <Code className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        <span>View Code</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom styles */}
        <style>{`
        @media (max-width: 475px) {
          .xs\\:text-xs { font-size: 0.75rem; line-height: 1rem; }
          .xs\\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
          .xs\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .xs\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .xs\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .xs\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .xs\\:w-3\\.5 { width: 0.875rem; }
          .xs\\:h-3\\.5 { height: 0.875rem; }
          .xs\\:w-4 { width: 1rem; }
          .xs\\:h-4 { height: 1rem; }
          .xs\\:w-5 { width: 1.25rem; }
          .xs\\:h-5 { height: 1.25rem; }
          .xs\\:p-2 { padding: 0.5rem; }
          .xs\\:p-3 { padding: 0.75rem; }
          .xs\\:p-4 { padding: 1rem; }
          .xs\\:px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
          .xs\\:px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
          .xs\\:px-4 { padding-left: 1rem; padding-right: 1rem; }
          .xs\\:py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
          .xs\\:py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
          .xs\\:py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
          .xs\\:py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
          .xs\\:py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
          .xs\\:mb-1 { margin-bottom: 0.25rem; }
          .xs\\:mb-1\\.5 { margin-bottom: 0.375rem; }
          .xs\\:mb-2 { margin-bottom: 0.5rem; }
          .xs\\:mb-2\\.5 { margin-bottom: 0.625rem; }
          .xs\\:mb-3 { margin-bottom: 0.75rem; }
          .xs\\:mb-4 { margin-bottom: 1rem; }
          .xs\\:mb-6 { margin-bottom: 1.5rem; }
          .xs\\:mb-8 { margin-bottom: 2rem; }
          .xs\\:mt-3 { margin-top: 0.75rem; }
          .xs\\:mt-4 { margin-top: 1rem; }
          .xs\\:mt-6 { margin-top: 1.5rem; }
          .xs\\:mt-8 { margin-top: 2rem; }
          .xs\\:gap-1 { gap: 0.25rem; }
          .xs\\:gap-1\\.5 { gap: 0.375rem; }
          .xs\\:gap-2 { gap: 0.5rem; }
          .xs\\:gap-3 { gap: 0.75rem; }
          .xs\\:gap-4 { gap: 1rem; }
          .xs\\:space-x-2 > * + * { margin-left: 0.5rem; }
          .xs\\:space-x-3 > * + * { margin-left: 0.75rem; }
          .xs\\:space-y-0 > * + * { margin-top: 0px; }
          .xs\\:space-y-2 > * + * { margin-top: 0.5rem; }
          .xs\\:space-y-4 > * + * { margin-top: 1rem; }
          .xs\\:rounded-lg { border-radius: 0.5rem; }
          .xs\\:rounded-xl { border-radius: 0.75rem; }
          .xs\\:h-36 { height: 9rem; }
          .xs\\:h-40 { height: 10rem; }
          .xs\\:h-56 { height: 14rem; }
          .xs\\:w-56 { width: 14rem; }
          .xs\\:max-w-sm { max-width: 24rem; }
          .xs\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .xs\\:flex-row { flex-direction: row; }
          .xs\\:bottom-4 { bottom: 1rem; }
          .xs\\:right-4 { right: 1rem; }
          .xs\\:pt-2 { padding-top: 0.5rem; }
          .xs\\:pt-3 { padding-top: 0.75rem; }
          .xs\\:pb-2 { padding-bottom: 0.5rem; }
          .xs\\:pl-8 { padding-left: 2rem; }
          .xs\\:pl-10 { padding-left: 2.5rem; }
          .xs\\:pr-8 { padding-right: 2rem; }
          .xs\\:left-2\\.5 { left: 0.625rem; }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .touch-manipulation {
          touch-action: manipulation;
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        /* Improve performance for animations on mobile */
        @media (max-width: 768px) {
          * {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
        }

        /* Reduce animations for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      </div>
    </>
  );
};

export default Projects;
