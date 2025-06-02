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
  const projectData: Project[] = [
    {
      title: 'PS-2',
      description: 'A project description for PS-2.',
      technologies: ['Python', 'Data Analysis'],
      image: '/images/ps-2.png',
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
      image: '/images/broken-patterns-ps.png',
      githubUrl: 'https://github.com/RNSsanjay/Broken-Patterns-PS',
      demoUrl: '',
      details: 'A creative web design project focusing on unique CSS patterns and animations.',
      date: '2023-02-01',
      featured: true,
      category: 'Web Design'
    },
    // Add other projects similarly with the required fields
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
