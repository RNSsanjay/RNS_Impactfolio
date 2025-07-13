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
      className="py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-black to-green-900 relative overflow-hidden min-h-screen"
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
      ))}      {/* Enhanced Title */}
      <motion.div
        className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 relative z-10 px-2 xs:px-4 sm:px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.h2
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-300 via-lime-400 to-green-500 bg-clip-text text-transparent mb-2 xs:mb-3 sm:mb-4 rounded-[15px] pb-4 xs:pb-6 sm:pb-8 lg:pb-10 pt-4 xs:pt-6 sm:pt-8 lg:pt-10 flex justify-center items-center w-full mx-auto"
          variants={glowVariants}
          animate="animate"
        >
          My Certificates
        </motion.h2>
        <motion.div
          className="w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-green-400 to-lime-500 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: window.innerWidth < 640 ? 80 : 128 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.p
          className="text-green-200 text-xs xs:text-sm sm:text-base md:text-lg mt-2 xs:mt-3 sm:mt-4 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto px-2 xs:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Professional achievements spanning Software Testing, API Development, IoT, AI/ML, and Full-Stack Development
        </motion.p>
        {/* Stats */}
        <motion.div
          className="flex flex-col xs:flex-row justify-center items-center space-y-3 xs:space-y-0 xs:space-x-4 sm:space-x-6 md:space-x-8 mt-4 xs:mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div className="text-center" variants={pulseVariants} animate="animate">
            <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-lime-400">15+</div>
            <div className="text-green-300 text-xs sm:text-sm">Certificates</div>
          </motion.div>
          <motion.div className="text-center" variants={pulseVariants} animate="animate">
            <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-green-400">8+</div>
            <div className="text-green-300 text-xs sm:text-sm">Technologies</div>
          </motion.div>
          <motion.div className="text-center" variants={pulseVariants} animate="animate">
            <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-lime-400">3</div>
            <div className="text-green-300 text-xs sm:text-sm">Internships</div>
          </motion.div>
        </motion.div>
      </motion.div>      {/* Enhanced Controls Section */}
      <motion.div
        className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 mb-6 xs:mb-8 sm:mb-10 md:mb-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >        {/* Search and Filter Controls */}
        <div className="bg-gradient-to-r from-green-900/30 to-black/50 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 border border-green-500/20 mb-4 xs:mb-6 sm:mb-8">
          <div className="flex flex-col gap-3 xs:gap-4 sm:gap-6">
            {/* Search Bar */}
            <div className="w-full">
              <motion.input
                type="text"
                placeholder="Search certificates, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 xs:px-4 py-2.5 xs:py-3 sm:py-3 bg-black/50 border border-green-500/30 rounded-lg xs:rounded-xl text-green-200 placeholder-green-400/60 focus:border-green-400 focus:outline-none transition-all duration-300 text-sm xs:text-sm sm:text-base"
                whileFocus={{ scale: 1.01, borderColor: "rgba(34, 197, 94, 0.8)" }}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-2 justify-center sm:justify-start">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(0);
                  }}
                  className={`px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs xs:text-sm whitespace-nowrap ${selectedCategory === category
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
            <div className="flex justify-center">
              <motion.button
                onClick={startAutoScroll}
                disabled={isAutoScrolling}
                className={`px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3 rounded-lg xs:rounded-xl font-semibold transition-all duration-300 flex items-center text-sm xs:text-sm sm:text-base min-w-[140px] xs:min-w-[160px] justify-center ${isAutoScrolling
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
                    <span className="hidden xs:inline">Auto Scrolling...</span>
                    <span className="xs:hidden">Scrolling...</span>
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
        </div>        {/* Pagination Info */}
        <motion.div
          className="flex flex-col xs:flex-row justify-between items-center mb-4 xs:mb-6 gap-2 xs:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <div className="text-green-300 text-xs xs:text-sm text-center xs:text-left order-2 xs:order-1">
            Showing {currentPage * certificatesPerPage + 1}-{Math.min((currentPage + 1) * certificatesPerPage, filteredCertificates.length)} of {filteredCertificates.length} certificates
          </div>          <div className="flex items-center space-x-1 xxs:space-x-2 xs:space-x-3 order-1 xs:order-2">
            <motion.button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-1 xxs:px-2 xs:px-4 py-1 xxs:py-1.5 xs:py-2 bg-green-800/30 text-green-300 rounded-md xxs:rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700/50 transition-all duration-300 text-[10px] xxs:text-xs xs:text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">←</span>
            </motion.button>
            <div className="flex items-center space-x-1 xxs:space-x-2 px-2 xxs:px-3 py-1 bg-green-900/30 rounded-md xxs:rounded-lg border border-green-500/20">
              <span className="text-green-300 text-[10px] xxs:text-xs xs:text-sm font-medium">
                {currentPage + 1} / {totalPages}
              </span>
            </div>
            <motion.button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-1 xxs:px-2 xs:px-4 py-1 xxs:py-1.5 xs:py-2 bg-green-800/30 text-green-300 rounded-md xxs:rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700/50 transition-all duration-300 text-[10px] xxs:text-xs xs:text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">→</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>      {/* Enhanced Certificates Grid */}
      <motion.div
        className="grid grid-cols-1 xxs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 xxs:gap-3 xs:gap-4 sm:gap-6 md:gap-8 px-1 xxs:px-2 xs:px-3 sm:px-4 md:px-6 max-w-7xl mx-auto relative z-10"
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
                <div className="relative bg-gradient-to-br from-green-900/40 to-black/60 backdrop-blur-lg rounded-lg xxs:rounded-xl sm:rounded-2xl p-2 xxs:p-3 xs:p-4 sm:p-6 border border-green-500/20 overflow-hidden h-full flex flex-col">

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg xxs:rounded-xl sm:rounded-2xl"
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
                    className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 bg-gradient-to-r from-green-400 to-lime-500 rounded-full flex items-center justify-center"
                    variants={floatingVariants}
                    animate="animate"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>                  {/* Certificate Title with Typewriter Effect */}
                  <motion.h3
                    className="text-xs xxs:text-sm xs:text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-green-300 to-lime-400 bg-clip-text mb-1 xxs:mb-2 xs:mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300 line-clamp-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  >
                    {certificate.title}
                  </motion.h3>                  {/* Certificate Details with Staggered Animation */}
                  <div className="space-y-1 xxs:space-y-1.5 xs:space-y-2.5 sm:space-y-3 mb-1 xxs:mb-2 xs:mb-3 sm:mb-4 flex-grow">
                    <motion.div
                      className="flex items-center space-x-1 xxs:space-x-1.5 xs:space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    >                      <motion.div
                        className="w-1 xxs:w-1.5 xs:w-2 h-1 xxs:h-1.5 xs:h-2 bg-green-400 rounded-full flex-shrink-0"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <span className="text-green-200 text-[10px] xxs:text-xs xs:text-sm line-clamp-1">
                        <span className="font-semibold text-lime-400">Issuer:</span> {certificate.issuer}
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-1.5 xs:space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    >
                      <motion.div
                        className="w-1.5 xs:w-2 h-1.5 xs:h-2 bg-lime-400 rounded-full flex-shrink-0"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 + 0.3 }}
                      />
                      <span className="text-green-200 text-xs xs:text-sm">
                        <span className="font-semibold text-lime-400">Date:</span> {certificate.date}
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-1.5 xs:space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    >
                      <motion.div
                        className="w-1.5 xs:w-2 h-1.5 xs:h-2 bg-green-500 rounded-full flex-shrink-0"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 + 0.6 }}
                      />
                      <span className="text-green-200 text-xs xs:text-sm line-clamp-1">
                        <span className="font-semibold text-lime-400">ID:</span> {certificate.credential}
                      </span>
                    </motion.div>
                  </div>                  {/* Enhanced Description with Read More */}
                  <motion.div
                    className="mb-2 xs:mb-3 sm:mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  >
                    <p className={`text-green-300 text-xs xs:text-sm leading-relaxed transition-all duration-500 ${isExpanded ? '' : 'line-clamp-2 xs:line-clamp-3'
                      }`}>
                      {certificate.description}
                    </p>
                    {certificate.description.length > 100 && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(globalIndex);
                        }}
                        className="text-lime-400 hover:text-lime-300 text-xs xs:text-sm mt-1 xs:mt-2 flex items-center transition-colors duration-300"
                        whileHover={{ scale: window.innerWidth < 640 ? 1.02 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isExpanded ? (
                          <>
                            <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            <span className="hidden xs:inline">Read Less</span>
                            <span className="xs:hidden">Less</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <span className="hidden xs:inline">Read More</span>
                            <span className="xs:hidden">More</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Enhanced Skills Section */}
                  <motion.div
                    className="mb-2 xs:mb-3 sm:mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  >
                    <h4 className="text-sm xs:text-base sm:text-lg font-semibold text-lime-400 mb-1.5 xs:mb-2 sm:mb-3 flex items-center">
                      <motion.div
                        className="w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mr-1 xs:mr-2"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      Skills
                    </h4>                    <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                      {certificate.skills.slice(0, isExpanded ? certificate.skills.length : 3).map((skill: string, skillIndex: number) => (
                        <motion.span
                          key={skill}
                          className="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1 bg-gradient-to-r from-green-800/50 to-lime-800/50 text-green-300 rounded-full text-xs font-medium border border-green-600/30 relative overflow-hidden flex-shrink-0"
                          variants={skillVariants}
                          initial="hidden"
                          animate="visible"
                          custom={skillIndex}
                          whileHover={{
                            scale: 1.05,
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
                          <span className="relative z-10 truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none">
                            {skill}
                          </span>
                        </motion.span>
                      ))}
                      {!isExpanded && certificate.skills.length > 3 && (
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(globalIndex);
                          }}
                          className="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1 bg-gradient-to-r from-lime-800/50 to-green-800/50 text-lime-300 rounded-full text-xs font-medium border border-lime-600/30 hover:bg-lime-700/50 transition-all duration-300 flex-shrink-0"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          +{certificate.skills.length - 3}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 mt-2 xs:mt-3 sm:mt-4">
                    <motion.button
                      className="flex-1 py-1.5 xs:py-2 px-2 xs:px-3 sm:px-4 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-lg font-semibold hover:from-green-500 hover:to-lime-500 transition-all duration-300 flex items-center justify-center relative overflow-hidden text-xs xs:text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCertificate(certificate);
                      }}
                      whileHover={{ scale: window.innerWidth < 640 ? 1.01 : 1.02 }}
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
                      <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="z-10">
                        <span className="hidden xs:inline">View Details</span>
                        <span className="xs:hidden">Details</span>
                      </span>
                    </motion.button>
                    {certificate.linkedinUrl && (
                      <motion.a
                        href={certificate.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 xs:py-2 px-2 xs:px-3 sm:px-4 border-2 border-green-500 text-green-400 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center relative overflow-hidden text-xs xs:text-sm"
                        whileHover={{ scale: window.innerWidth < 640 ? 1.01 : 1.02 }}
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
                        <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 z-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="z-10">
                          <span className="hidden xs:inline">View Certificate</span>
                          <span className="xs:hidden">Certificate</span>
                        </span>
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
      </motion.div>      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >            <motion.div
            className="bg-gradient-to-br from-green-900 to-black rounded-xl xxs:rounded-2xl xs:rounded-3xl p-3 xxs:p-4 xs:p-6 sm:p-8 w-full max-w-[calc(100vw-1rem)] xxs:max-w-[calc(100vw-1.5rem)] xs:max-w-md sm:max-w-xl md:max-w-2xl max-h-[85vh] xxs:max-h-[90vh] overflow-y-auto border border-green-500/30 relative"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Close button for mobile */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-3 right-3 xs:top-4 xs:right-4 w-8 h-8 xs:w-10 xs:h-10 bg-red-600/20 hover:bg-red-600/40 rounded-full flex items-center justify-center transition-all duration-300 sm:hidden"
              >
                <svg className="w-4 h-4 xs:w-5 xs:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <motion.h3
                className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-green-300 to-lime-400 bg-clip-text mb-3 xs:mb-4 sm:mb-6 pr-10 sm:pr-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedCertificate.title}
              </motion.h3>

              <motion.p
                className="text-green-200 mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedCertificate.description}
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 mb-4 xs:mb-5 sm:mb-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-lime-400 font-semibold mb-1 xs:mb-2 text-sm xs:text-base">Issuer</h4>
                    <p className="text-green-300 text-xs xs:text-sm break-words">{selectedCertificate.issuer}</p>
                  </div>
                  <div>
                    <h4 className="text-lime-400 font-semibold mb-1 xs:mb-2 text-sm xs:text-base">Date</h4>
                    <p className="text-green-300 text-xs xs:text-sm">{selectedCertificate.date}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-lime-400 font-semibold mb-1 xs:mb-2 text-sm xs:text-base">Credential ID</h4>
                    <p className="text-green-300 text-xs xs:text-sm break-all">{selectedCertificate.credential}</p>
                  </div>
                  {selectedCertificate.linkedinUrl && (
                    <div>
                      <h4 className="text-lime-400 font-semibold mb-1 xs:mb-2 text-sm xs:text-base">Certificate Link</h4>
                      <motion.a
                        href={selectedCertificate.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 hover:text-lime-400 transition-colors duration-300 flex items-center text-xs xs:text-sm break-all"
                        whileHover={{ scale: 1.02 }}
                      >
                        <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="truncate">View on LinkedIn</span>
                      </motion.a>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-5 xs:mb-6">
                <h4 className="text-lime-400 font-semibold mb-3 xs:mb-4 text-sm xs:text-base">All Skills</h4>
                <div className="flex flex-wrap gap-1.5 xs:gap-2">
                  {selectedCertificate.skills.map((skill: string, index: number) => (
                    <motion.span
                      key={skill}
                      className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-green-800/50 to-lime-800/50 text-green-300 rounded-full text-xs xs:text-sm font-medium border border-green-600/30"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
                {selectedCertificate.linkedinUrl && (
                  <motion.a
                    href={selectedCertificate.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 xs:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg xs:rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center text-sm xs:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 xs:w-5 xs:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="hidden xs:inline">View on LinkedIn</span>
                    <span className="xs:hidden">LinkedIn</span>
                  </motion.a>
                )}
                <motion.button
                  className="flex-1 py-3 xs:py-3.5 bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold rounded-lg xs:rounded-xl hover:from-green-500 hover:to-lime-500 transition-all duration-300 text-sm xs:text-base"
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
      </AnimatePresence><Chatbot />      {/* Custom responsive styles */}
      <style>{`
        /* XXS - Extra extra small devices (tiny phones) */
        @media (max-width: 340px) {
          .xxs\\:px-2 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          
          .xxs\\:p-3 {
            padding: 0.75rem;
          }
          
          .xxs\\:rounded-xl {
            border-radius: 0.75rem;
          }
          
          .xxs\\:text-xs {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          
          .xxs\\:text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          
          .xxs\\:w-1\\.5 {
            width: 0.375rem;
          }
          
          .xxs\\:h-1\\.5 {
            height: 0.375rem;
          }
          
          .xxs\\:mb-2 {
            margin-bottom: 0.5rem;
          }
          
          .xxs\\:space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
          }
          
          .xxs\\:space-x-1\\.5 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(0.375rem * var(--tw-space-x-reverse));
            margin-left: calc(0.375rem * calc(1 - var(--tw-space-x-reverse)));
          }
          
          .xxs\\:gap-3 {
            gap: 0.75rem;
          }
          
          .xxs\\:px-3 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .xxs\\:py-1\\.5 {
            padding-top: 0.375rem;
            padding-bottom: 0.375rem;
          }
          
          .xxs\\:rounded-lg {
            border-radius: 0.5rem;
          }
          
          .xxs\\:max-h-\\[90vh\\] {
            max-height: 90vh;
          }
          
          .xxs\\:max-w-\\[calc\\(100vw-1\\.5rem\\)\\] {
            max-width: calc(100vw - 1.5rem);
          }
          
          .xxs\\:p-4 {
            padding: 1rem;
          }
          
          /* Adjust line height for very small screens */
          p, h3, h4 {
            line-height: 1.4;
          }
          
          /* Reduce padding */
          .p-2, .p-3, .p-4 {
            padding: 0.5rem !important;
          }
          
          /* Center align all text on tiny screens */
          .text-left {
            text-align: center !important;
          }
        }
        
        /* Extra small devices (phones) */
        @media (max-width: 474px) {
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          /* Touch-friendly interaction */
          .group:hover {
            transform: none !important;
          }
          
          /* Reduce motion on very small screens */
          * {
            animation-duration: 0.5s !important;
          }
          
          /* Allow text to break into next line to avoid overflow */
          .text-\\[10px\\] {
            font-size: 10px;
            line-height: 1.2;
          }
        }
        
        /* Small devices (landscape phones) */
        @media (min-width: 475px) and (max-width: 639px) {
          .xs\\:line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        
        /* Touch devices optimization */
        @media (hover: none) and (pointer: coarse) {
          .group:hover {
            transform: none;
          }
          
          button:hover,
          a:hover {
            transform: scale(1.02) !important;
          }
          
          /* Increased touch targets */
          button, a {
            min-height: 36px;
          }
          
          /* Prevent hover-only animations from playing on touch */
          .hover\\:scale, .hover\\:bg-green-700\\/50 {
            transition: none !important;
          }
        }
        
        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .bg-gradient-to-r,
          .bg-gradient-to-br {
            background-attachment: fixed;
          }
        }
        
        /* Accessibility - Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Dark mode compatibility */
        @media (prefers-color-scheme: dark) {
          .backdrop-blur-lg {
            backdrop-filter: blur(16px) saturate(180%);
          }
        }
        
        /* Print styles */
        @media print {
          .absolute,
          .fixed {
            position: static !important;
          }
          
          .bg-gradient-to-r,
          .bg-gradient-to-br {
            background: #1f2937 !important;
            color: white !important;
          }
          
          /* Hide animations and floating elements */
          svg, button, .animate-*, .motion-* {
            display: none !important;
          }
          
          /* Ensure content fits on page */
          * {
            break-inside: avoid;
          }
          
          /* Restore visibility of critical content */
          .grid {
            display: block !important;
          }
          
          /* Improve certificate printing */
          .grid > div {
            page-break-inside: avoid;
            margin-bottom: 1rem;
            border: 1px solid #888 !important;
          }
        }
        
        /* Better height management for different screen sizes */
        @media (max-height: 700px) {
          .max-h-\\[90vh\\], .max-h-\\[85vh\\] {
            max-height: 80vh;
          }
        }
        
        /* Landscape orientation optimizations */
        @media (orientation: landscape) and (max-height: 500px) {
          .py-6, .py-8, .py-12 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          
          .mb-8, .mb-10, .mb-12 {
            margin-bottom: 1rem !important;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Certificate;