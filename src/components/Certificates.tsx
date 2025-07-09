import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/profileData';
import Chatbot from './Chatbot';

const Certificate = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  const certificatesPerPage = 6;

  // Filter certificates based on search and category
  const filteredCertificates = profileData.certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' ||
      cert.skills.some(skill => skill.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);
  const currentCertificates = filteredCertificates.slice(
    currentPage * certificatesPerPage,
    (currentPage + 1) * certificatesPerPage
  );

  const categories = ['All', 'Software Testing', 'API', 'IoT', 'AI', 'Salesforce', 'Web Development', 'Data'];

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const startAutoScroll = () => {
    setIsAutoScrolling(true);
    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        const next = prev + 1;
        if (next >= totalPages) {
          setIsAutoScrolling(false);
          clearInterval(interval);
          return 0;
        }
        return next;
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };
  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(34, 197, 94, 0.3)",
        "0 0 40px rgba(34, 197, 94, 0.6)",
        "0 0 20px rgba(34, 197, 94, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shimmerVariants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-green-900 relative overflow-hidden min-h-screen"
    >
      {/* Enhanced Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(74, 222, 128, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Geometric Elements */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-32 h-32 border-2 border-green-400/30 rounded-full hidden lg:block"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/5 w-24 h-24 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-lg transform rotate-45 hidden lg:block"
        animate={{
          y: [0, -30, 0],
          rotate: [45, 225, 45],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-lime-400/20 to-green-500/20 rounded-full hidden md:block"
        animate={{
          x: [0, 40, -40, 0],
          scale: [1, 1.3, 0.8, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Particle Effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Enhanced Title */}
      <motion.div
        className="text-center mb-16 relative z-10  "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-green-300 via-lime-400 to-green-500 bg-clip-text text-transparent mb-4 rounded-[15px] pb-10 pt-10 flex justify-center items-center w-full mx-auto"
          variants={glowVariants}
          animate="animate"
        >
          My Certificates
        </motion.h2>
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-green-400 to-lime-500 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />        <motion.p
          className="text-green-200 text-lg mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Professional achievements spanning Software Testing, API Development, IoT, AI/ML, and Full-Stack Development
        </motion.p>        {/* Stats */}
        <motion.div
          className="flex justify-center items-center space-x-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div className="text-center" variants={pulseVariants} animate="animate">
            <div className="text-3xl font-bold text-lime-400">15+</div>
            <div className="text-green-300 text-sm">Certificates</div>
          </motion.div>
          <motion.div className="text-center" variants={pulseVariants} animate="animate">
            <div className="text-3xl font-bold text-green-400">8+</div>
            <div className="text-green-300 text-sm">Technologies</div>
          </motion.div>
          <motion.div className="text-center" variants={pulseVariants} animate="animate">
            <div className="text-3xl font-bold text-lime-400">3</div>
            <div className="text-green-300 text-sm">Internships</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Controls Section */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mb-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {/* Search and Filter Controls */}
        <div className="bg-gradient-to-r from-green-900/30 to-black/50 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <motion.input
                type="text"
                placeholder="Search certificates, skills, or issuers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-xl text-green-200 placeholder-green-400/60 focus:border-green-400 focus:outline-none transition-all duration-300"
                whileFocus={{ scale: 1.02, borderColor: "rgba(34, 197, 94, 0.8)" }}
              />
              
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(0);
                  }}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                      ? 'bg-gradient-to-r from-green-500 to-lime-500 text-black'
                      : 'bg-green-800/30 text-green-300 hover:bg-green-700/50'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Auto Scroll Button */}
            <motion.button
              onClick={startAutoScroll}
              disabled={isAutoScrolling}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${isAutoScrolling
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-lime-500 to-green-500 text-black hover:from-lime-400 hover:to-green-400'
                }`}
              whileHover={!isAutoScrolling ? { scale: 1.05 } : {}}
              whileTap={!isAutoScrolling ? { scale: 0.95 } : {}}
            >
              {isAutoScrolling ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Auto Scrolling...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  Auto Scroll
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Pagination Info */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <div className="text-green-300">
            Showing {currentPage * certificatesPerPage + 1}-{Math.min((currentPage + 1) * certificatesPerPage, filteredCertificates.length)} of {filteredCertificates.length} certificates
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-green-800/30 text-green-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
            <span className="text-green-300">
              {currentPage + 1} / {totalPages}
            </span>
            <motion.button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-green-800/30 text-green-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      </motion.div>      {/* Enhanced Certificates Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        key={currentPage} // Force re-animation on page change
      >
        <AnimatePresence mode="wait">
          {currentCertificates.map((certificate, index) => {
            const globalIndex = currentPage * certificatesPerPage + index;
            const isExpanded = expandedCards.has(globalIndex);

            return (
              <motion.div
                key={`${certificate.title}-${currentPage}`}
                className="group relative cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                onHoverStart={() => setHoveredCard(globalIndex)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{ perspective: 1000 }}
                layout
              >                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-green-900/40 to-black/60 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 overflow-hidden h-full flex flex-col">

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(34, 197, 94, 0.3), transparent)',
                      backgroundSize: '200% 200%'
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={hoveredCard === globalIndex ? {
                      background: [
                        'linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(163, 230, 53, 0.1))',
                        'linear-gradient(45deg, rgba(163, 230, 53, 0.1), rgba(34, 197, 94, 0.1))'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Floating Certificate Badge */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-lime-500 rounded-full flex items-center justify-center"
                    variants={floatingVariants}
                    animate="animate"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Certificate Title with Typewriter Effect */}
                  <motion.h3
                    className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-green-300 to-lime-400 bg-clip-text mb-4 group-hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  >
                    {certificate.title}
                  </motion.h3>

                  {/* Certificate Details with Staggered Animation */}
                  <div className="space-y-3 mb-4 flex-grow">
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <span className="text-green-200 text-sm">
                        <span className="font-semibold text-lime-400">Issuer:</span> {certificate.issuer}
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-lime-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 + 0.3 }}
                      />
                      <span className="text-green-200 text-sm">
                        <span className="font-semibold text-lime-400">Date:</span> {certificate.date}
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 + 0.6 }}
                      />
                      <span className="text-green-200 text-sm">
                        <span className="font-semibold text-lime-400">ID:</span> {certificate.credential}
                      </span>
                    </motion.div>
                  </div>

                  {/* Enhanced Description with Read More */}
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  >
                    <p className={`text-green-300 text-sm leading-relaxed transition-all duration-500 ${isExpanded ? '' : 'line-clamp-3'
                      }`}>
                      {certificate.description}
                    </p>
                    {certificate.description.length > 150 && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(globalIndex);
                        }}
                        className="text-lime-400 hover:text-lime-300 text-sm mt-2 flex items-center transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isExpanded ? (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Read Less
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Read More
                          </>
                        )}
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Enhanced Skills Section */}
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  >
                    <h4 className="text-lg font-semibold text-lime-400 mb-3 flex items-center">
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mr-2"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.slice(0, isExpanded ? certificate.skills.length : 3).map((skill: string, skillIndex: number) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-gradient-to-r from-green-800/50 to-lime-800/50 text-green-300 rounded-full text-xs font-medium border border-green-600/30 relative overflow-hidden"
                          variants={skillVariants}
                          initial="hidden"
                          animate="visible"
                          custom={skillIndex}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(34, 197, 94, 0.3)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: skillIndex * 0.2,
                              ease: "linear"
                            }}
                          />
                          {skill}
                        </motion.span>
                      ))}
                      {!isExpanded && certificate.skills.length > 3 && (
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(globalIndex);
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-lime-800/50 to-green-800/50 text-lime-300 rounded-full text-xs font-medium border border-lime-600/30 hover:bg-lime-700/50 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          +{certificate.skills.length - 3} more
                        </motion.button>
                      )}
                    </div>
                  </motion.div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <motion.button
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-lg font-semibold hover:from-green-500 hover:to-lime-500 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCertificate(certificate);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <svg className="w-4 h-4 mr-2 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="z-10">View Details</span>
                    </motion.button>
                    {certificate.linkedinUrl && (
                      <motion.a
                        href={certificate.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 border-2 border-green-500 text-green-400 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <svg className="w-4 h-4 mr-2 z-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="z-10">View Certificate</span>
                      </motion.a>
                    )}
                  </div>

                  {/* Enhanced Hover Overlay */}
                  {/* <AnimatePresence>
                    {hoveredCard === globalIndex && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-lime-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="text-center"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                          <motion.div
                            className="w-16 h-16 bg-gradient-to-r from-green-400 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-3"
                            animate={{
                              boxShadow: [
                                "0 0 20px rgba(34, 197, 94, 0.5)",
                                "0 0 40px rgba(34, 197, 94, 0.8)",
                                "0 0 20px rgba(34, 197, 94, 0.5)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <motion.div
                              className="w-8 h-8 border-2 border-white rounded-full border-t-transparent"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                          <motion.p
                            className="text-white font-semibold text-lg"
                            animate={{
                              textShadow: [
                                "0 0 10px rgba(255, 255, 255, 0.5)",
                                "0 0 20px rgba(255, 255, 255, 0.8)",
                                "0 0 10px rgba(255, 255, 255, 0.5)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Explore Certificate
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence> */}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-green-900 to-black rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-green-500/30"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h3
                className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-300 to-lime-400 bg-clip-text mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedCertificate.title}
              </motion.h3>

              <motion.p
                className="text-green-200 mb-6 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedCertificate.description}
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lime-400 font-semibold mb-2">Issuer</h4>
                  <p className="text-green-300">{selectedCertificate.issuer}</p>
                </div>
                <div>
                  <h4 className="text-lime-400 font-semibold mb-2">Date</h4>
                  <p className="text-green-300">{selectedCertificate.date}</p>
                </div>
                <div>
                  <h4 className="text-lime-400 font-semibold mb-2">Credential ID</h4>
                  <p className="text-green-300">{selectedCertificate.credential}</p>
                </div>
                {selectedCertificate.linkedinUrl && (
                  <div>
                    <h4 className="text-lime-400 font-semibold mb-2">Certificate Link</h4>
                    <motion.a
                      href={selectedCertificate.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-300 hover:text-lime-400 transition-colors duration-300 flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      View on LinkedIn
                    </motion.a>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-lime-400 font-semibold mb-3">All Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill: string, index: number) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-green-800/50 to-lime-800/50 text-green-300 rounded-full text-sm font-medium border border-green-600/30"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {selectedCertificate.linkedinUrl && (
                  <motion.a
                    href={selectedCertificate.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    View on LinkedIn
                  </motion.a>
                )}
                <motion.button
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-lime-500 transition-all duration-300"
                  onClick={() => setSelectedCertificate(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Chatbot />
    </motion.section>
  );
};

export default Certificate;