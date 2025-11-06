import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ExternalLink, Github, Star, Search, Filter, Grid, List,
  Calendar, Code2, Eye, Rocket, Zap,
  ChevronRight, X, Clock, Users,
  Cpu, Layers, ArrowUp
} from 'lucide-react';

// Enhanced project interface with more details
interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  date: string;
  featured: boolean;
  category: string;
  status: 'completed' | 'in-progress' | 'planning';
  teamSize?: number;
  duration?: string;
  highlights: string[];
}

// Enhanced project data - including all original projects
const projectData: Project[] = [
  {
    id: '1',
    title: 'RNS Voice Assistant',
    description: 'Advanced AI-powered voice assistant with natural language processing capabilities',
    fullDescription: 'A sophisticated AI-powered voice assistant built with cutting-edge machine learning technologies. Features include voice recognition, natural language understanding, task automation, and smart home integration.',
    technologies: ['Python', 'TensorFlow', 'Speech Recognition', 'NLP', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/RNS-Voice-Assistant',
    demoUrl: '',
    date: '2024-10-15',
    featured: true,
    category: 'AI/ML',
    status: 'completed',
    teamSize: 1,
    duration: '3 months',
    highlights: ['Voice Recognition', 'NLP Integration', 'Smart Automation', 'Multi-language Support']
  },
  {
    id: '2',
    title: 'E-Commerce React Platform',
    description: 'Full-stack e-commerce solution built with React and modern web technologies',
    fullDescription: 'A complete e-commerce platform featuring user authentication, product management, shopping cart, payment processing, order tracking, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/E-Commerce-React',
    demoUrl: '',
    date: '2024-08-20',
    featured: true,
    category: 'Web Development',
    status: 'completed',
    teamSize: 1,
    duration: '4 months',
    highlights: ['Payment Integration', 'Real-time Updates', 'Admin Dashboard', 'Mobile Responsive']
  },
  {
    id: '3',
    title: 'AR Filter Application',
    description: 'Augmented reality filters for mobile applications with face detection',
    fullDescription: 'An innovative AR application that provides real-time face filters and effects using advanced computer vision and augmented reality technologies.',
    technologies: ['Unity', 'ARKit', 'C#', 'Computer Vision', 'OpenCV'],
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/AR-Filter-Application',
    demoUrl: '',
    date: '2024-06-10',
    featured: true,
    category: 'AR/VR',
    status: 'completed',
    teamSize: 1,
    duration: '2 months',
    highlights: ['Real-time Processing', 'Face Detection', 'Custom Filters', 'Cross-platform']
  },
  {
    id: '4',
    title: 'RNS Drawing Application',
    description: 'Web-based drawing application with AI assistance and creative tools',
    fullDescription: 'A creative drawing tool that combines traditional digital art features with AI-powered assistance for sketch completion and style suggestions.',
    technologies: ['JavaScript', 'HTML Canvas', 'WebGL', 'TensorFlow.js'],
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/RNS-Drawing-Application',
    demoUrl: '',
    date: '2024-04-15',
    featured: false,
    category: 'Web Development',
    status: 'completed',
    teamSize: 1,
    duration: '6 weeks',
    highlights: ['AI Assistance', 'Vector Graphics', 'Layer Support', 'Export Options']
  },
  {
    id: '5',
    title: 'AI Language Trainer',
    description: 'AI-powered language learning platform with adaptive teaching methods',
    fullDescription: 'An intelligent language learning platform that adapts to individual learning styles and progress, featuring speech recognition, pronunciation feedback, and personalized lesson plans.',
    technologies: ['Python', 'Django', 'React', 'Speech API', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/AI-Language-Trainer',
    demoUrl: '',
    date: '2024-02-28',
    featured: true,
    category: 'AI/ML',
    status: 'completed',
    teamSize: 1,
    duration: '5 months',
    highlights: ['Adaptive Learning', 'Speech Recognition', 'Progress Tracking', 'Multi-language']
  },
  {
    id: '6',
    title: 'RNS Car Racing Game',
    description: '3D racing game with realistic physics simulation and multiplayer support',
    fullDescription: 'A high-performance 3D racing game featuring realistic physics simulation, multiple game modes, car customization, and online multiplayer capabilities.',
    technologies: ['Unity', 'C#', 'Photon', '3D Modeling', 'Physics'],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/RNS-Car-Racing',
    demoUrl: '',
    date: '2023-12-10',
    featured: false,
    category: 'Game Development',
    status: 'completed',
    teamSize: 1,
    duration: '4 months',
    highlights: ['Realistic Physics', 'Multiplayer', 'Car Customization', '3D Graphics']
  },
  {
    id: '7',
    title: 'RNS Impactfolio',
    description: 'Modern responsive portfolio website with advanced animations',
    fullDescription: 'A cutting-edge portfolio website featuring advanced animations, responsive design, dark/light themes, and interactive elements to showcase projects and skills.',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/RNS_Impactfolio',
    demoUrl: '',
    date: '2024-11-01',
    featured: true,
    category: 'Web Development',
    status: 'in-progress',
    teamSize: 1,
    duration: 'Ongoing',
    highlights: ['Modern Design', 'Advanced Animations', 'Responsive', 'Performance Optimized']
  },
  {
    id: '8',
    title: 'Job Seeker Portal v1',
    description: 'Comprehensive job search and recruitment platform for job seekers',
    fullDescription: 'A full-featured job portal connecting job seekers with employers, featuring advanced search filters, application tracking, and recruitment management tools.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/Job-Seeker-Portal-v1',
    demoUrl: '',
    date: '2023-11-20',
    featured: false,
    category: 'Web Development',
    status: 'completed',
    teamSize: 1,
    duration: '3 months',
    highlights: ['Advanced Search', 'Real-time Chat', 'Application Tracking', 'Analytics Dashboard']
  },
  {
    id: '9',
    title: 'QR Code Generator',
    description: 'Advanced QR code generator with customization and batch processing',
    fullDescription: 'A versatile QR code generation tool with extensive customization options, batch processing, analytics tracking, and multiple export formats.',
    technologies: ['JavaScript', 'QR Library', 'Canvas API', 'PDF.js'],
    image: 'https://images.unsplash.com/photo-1606103834627-4dcb7c7e8d9a?w=800&q=80',
    githubUrl: 'https://github.com/RNSsanjay/QR-Code-Generator',
    demoUrl: '',
    date: '2024-03-05',
    featured: false,
    category: 'Web Development',
    status: 'completed',
    teamSize: 1,
    duration: '2 weeks',
    highlights: ['Custom Styling', 'Batch Processing', 'Multiple Formats', 'Analytics']
  },
  {
    id: '10',
    title: 'Web Development Projects',
    description: 'A collection of comprehensive web development projects and demos',
    fullDescription: 'A portfolio of various web applications showcasing different aspects of modern web development including responsive design, interactive features, and modern frameworks.',
    technologies: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Bootstrap'],
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20220325175226/WebDevelopmentProjects2.png',
    githubUrl: 'https://github.com/RNSsanjay/Web-Projects',
    demoUrl: '',
    date: '2025-04-01',
    featured: false,
    category: 'Web Development',
    status: 'completed',
    teamSize: 1,
    duration: '2 months',
    highlights: ['Responsive Design', 'Interactive Features', 'Modern Frameworks', 'Best Practices']
  },
  {
    id: '11',
    title: 'Android Development Internship',
    description: 'Android development projects completed during CodeAlpha internship',
    fullDescription: 'Mobile applications developed during an Android development internship, showcasing modern Android development practices and various app functionalities.',
    technologies: ['Kotlin', 'Android', 'Java', 'XML', 'SQLite'],
    image: 'https://sdreatech.com/storage/images/Android-App-Development-services.jpg',
    githubUrl: 'https://github.com/RNSsanjay/Android-Development-Internship-CodeAlpha',
    demoUrl: '',
    date: '2025-05-01',
    featured: false,
    category: 'Mobile Development',
    status: 'completed',
    teamSize: 1,
    duration: '3 months',
    highlights: ['Native Android', 'Modern UI', 'Database Integration', 'Performance Optimization']
  },
  {
    id: '12',
    title: 'Front-End Development Internship',
    description: 'Front-end development projects showcasing modern UI/UX practices',
    fullDescription: 'Front-end projects developed during an internship, demonstrating responsive design skills, modern JavaScript frameworks, and user interface best practices.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap'],
    image: 'https://img.freepik.com/premium-vector/frontend-development-web-banner-concept-website-interface-improvement-illustration_277904-4428.jpg?w=2000',
    githubUrl: 'https://github.com/RNSsanjay/Front-End-Development-Internship-CodeAlpha',
    demoUrl: '',
    date: '2025-06-01',
    featured: false,
    category: 'Web Development',
    status: 'completed',
    teamSize: 1,
    duration: '3 months',
    highlights: ['Responsive Design', 'Modern CSS', 'JavaScript ES6+', 'React Components']
  }
];

const Projects: React.FC = () => {
  // Enhanced state management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'featured'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '-20%' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Enhanced scroll-based animation transforms
  const leftPanelX = useTransform(scrollYProgress, [0, 0.4], ["0%", "-110%"]);
  const rightPanelX = useTransform(scrollYProgress, [0, 0.4], ["0%", "110%"]);

  // Panel rotation for dynamic effect
  const leftPanelRotate = useTransform(scrollYProgress, [0, 0.4], [0, -5]);
  const rightPanelRotate = useTransform(scrollYProgress, [0, 0.4], [0, 5]);

  // Panel opacity for smooth fade
  const panelOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  // Content slides up from bottom (outer to inner) with enhanced timing
  const contentY = useTransform(scrollYProgress, [0.15, 0.6], ["120vh", "0vh"]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.25, 0.5], [0.8, 1]);
  const contentRotateX = useTransform(scrollYProgress, [0.25, 0.5], [15, 0]);

  // Split line effect
  const splitLineHeight = useTransform(scrollYProgress, [0, 0.2], ["0%", "100%"]);
  const splitLineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 0]);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  // Loading effect and scroll to top
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort logic
  const filteredProjects = useCallback(() => {
    return projectData
      .filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech);
        return matchesSearch && matchesCategory && matchesTech;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case 'title':
            return a.title.localeCompare(b.title);
          case 'featured':
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedCategory, selectedTech, sortBy]);

  const memoizedFilteredProjects = filteredProjects();

  // Extract unique values for filters
  const categories = ['All', ...Array.from(new Set(projectData.map(p => p.category)))];
  const technologies = ['All', ...Array.from(new Set(projectData.flatMap(p => p.technologies)))];

  // Project card component
  const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isCardInView = useInView(cardRef, { once: true, margin: '-100px' });

    // Determine if this card should come from left or right
    const isFromLeft = index % 2 === 0;

    // Split animation variants
    const splitVariants = {
      hidden: {
        opacity: 0,
        x: isFromLeft ? -200 : 200,
        scale: 0.8,
        rotateY: isFromLeft ? -15 : 15,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.15,
          duration: 0.8,
        }
      },
      hover: {
        y: -12,
        scale: 1.03,
        rotateY: isFromLeft ? 2 : -2,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }
    };

    return (
      <motion.div
        ref={cardRef}
        className="group relative"
        variants={splitVariants}
        initial="hidden"
        animate={isCardInView ? "visible" : "hidden"}
        whileHover="hover"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl group-hover:border-emerald-500/50 transition-all duration-300">
          {/* Project status badge */}
          <div className="absolute left-4 z-10 flex gap-2">
            {project.featured && (
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
              project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
              {project.status.replace('-', ' ')}
            </span>
          </div>

          {/* Project image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Quick action buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Project content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                {project.title}
              </h3>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                {project.category}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Project metadata */}
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(project.date).toLocaleDateString()}
              </span>
              {project.teamSize && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
                </span>
              )}
              {project.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {project.duration}
                </span>
              )}
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600/50"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Action button */}
            <motion.button
              onClick={() => setSelectedProject(project)}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 relative overflow-hidden">
      {/* Enhanced Split Entry Animation */}
      {isInView && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          {/* Split Line Effect */}
          <motion.div
            className="absolute top-0 left-1/2 w-1 bg-gradient-to-b from-emerald-400 via-green-500 to-emerald-400 transform -translate-x-1/2 shadow-lg shadow-emerald-500/50"
            style={{
              height: splitLineHeight,
              opacity: splitLineOpacity
            }}
          />

          {/* Left Panel with Enhanced Effects */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full origin-right"
            style={{
              x: leftPanelX,
              rotateY: leftPanelRotate,
              opacity: panelOpacity
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 shadow-2xl">
              {/* Panel edge glow */}
              <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-500/50 via-green-500/30 to-emerald-500/50" />
            </div>
          </motion.div>

          {/* Right Panel with Enhanced Effects */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full origin-left"
            style={{
              x: rightPanelX,
              rotateY: rightPanelRotate,
              opacity: panelOpacity
            }}
          >
            <div className="w-full h-full bg-gradient-to-l from-gray-950 via-gray-900 to-gray-800 shadow-2xl">
              {/* Panel edge glow */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-500/50 via-green-500/30 to-emerald-500/50" />
            </div>
          </motion.div>

          {/* Particle effects */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 20}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Page Content */}
      <motion.div
        className="relative z-10"
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
          rotateX: contentRotateX
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-400/10 to-teal-500/10 blur-2xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
            style={{ top: '60%', right: '15%' }}
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        {/* Loading animation */}
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
                <Rocket className="w-24 h-24 text-emerald-500" />
              </motion.div>
              <motion.div
                className="absolute mt-32 text-emerald-400 font-mono text-lg"
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

        {/* Header Section */}
        <motion.div
          className="relative z-10 pt-20 px-4"
          style={{ y: headerY }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Rocket className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 font-medium">My Projects</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Creative
              <br />
              <span className="text-white">Projects</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Showcasing innovation, creativity, and technical excellence through
              diverse projects spanning multiple technologies and domains
            </motion.p>

            {/* Achievement stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {[
                { label: "Total Projects", value: projectData.length.toString(), icon: <Code2 className="w-6 h-6" /> },
                { label: "Featured", value: projectData.filter(p => p.featured).length.toString(), icon: <Star className="w-6 h-6" /> },
                { label: "Categories", value: categories.length.toString(), icon: <Layers className="w-6 h-6" /> },
                { label: "Technologies", value: "25+", icon: <Cpu className="w-6 h-6" /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center mb-3 text-emerald-400">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            {/* Search and view controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              {/* Search bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* View mode and filters */}
              <div className="flex items-center gap-3">
                {/* View mode toggle */}
                <div className="flex bg-gray-800/60 rounded-lg p-1 border border-gray-600/50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter button */}
                <motion.button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </motion.button>
              </div>
            </div>

            {/* Quick filters */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {/* Split reveal container */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            {/* Left reveal curtain */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-gray-950 to-transparent z-10"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
            />

            {/* Right reveal curtain */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-gray-950 to-transparent z-10"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
            />

            <div className={`grid gap-8 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
              }`}>
              <AnimatePresence>
                {memoizedFilteredProjects.slice(0, visibleProjects).map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Load more button */}
          {visibleProjects < memoizedFilteredProjects.length && (
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => setVisibleProjects(prev => Math.min(prev + 6, memoizedFilteredProjects.length))}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Load More Projects</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Filter Modal */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            >
              <motion.div
                className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-gray-700/50 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Filter Projects</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Technology</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      value={selectedTech}
                      onChange={(e) => setSelectedTech(e.target.value)}
                    >
                      {technologies.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'featured')}
                    >
                      <option value="date">Date (Newest First)</option>
                      <option value="title">Title (A-Z)</option>
                      <option value="featured">Featured First</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 px-4 rounded-xl mt-6 font-medium hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Filters
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl p-6 border-b border-gray-700/50 z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full border border-emerald-500/30">
                          {selectedProject.category}
                        </span>
                        <span className={`px-3 py-1 text-sm rounded-full ${selectedProject.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          selectedProject.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                          {selectedProject.status.replace('-', ' ')}
                        </span>
                        {selectedProject.featured && (
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Project image */}
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Project details */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {selectedProject.fullDescription}
                      </p>

                      <h3 className="text-xl font-semibold text-white mb-4">Key Highlights</h3>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Project Info</h3>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{new Date(selectedProject.date).toLocaleDateString()}</span>
                        </div>
                        {selectedProject.teamSize && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Team Size:</span>
                            <span className="text-white">{selectedProject.teamSize} {selectedProject.teamSize === 1 ? 'person' : 'people'}</span>
                          </div>
                        )}
                        {selectedProject.duration && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="text-white">{selectedProject.duration}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-4">Technologies</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded border border-gray-600/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        {selectedProject.demoUrl && (
                          <motion.a
                            href={selectedProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </motion.a>
                        )}
                        {selectedProject.githubUrl && (
                          <motion.a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-600 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Custom styles */}
        <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        @media (max-width: 768px) {
          .bg-grid-pattern {
            background-size: 30px 30px;
          }
        }
      `}</style>
      </motion.div>
    </div>
  );
};

export default Projects;