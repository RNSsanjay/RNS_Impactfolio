import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/profileData';
import Chatbot from './Chatbot';

const Certificate = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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
    visible: (i) => ({
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
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-green-300 via-lime-400 to-green-500 bg-clip-text text-transparent mb-4"
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
        />
        <motion.p
          className="text-green-200 text-lg mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Showcasing my professional achievements and continuous learning journey
        </motion.p>
      </motion.div>

      {/* Enhanced Certificates Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
      >
        {profileData.certificates.map((certificate, index) => (
          <motion.div
            key={certificate.title}
            className="group relative cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => setSelectedCertificate(certificate)}
            style={{ perspective: 1000 }}
          >
            {/* Card Container */}
            <div className="relative bg-gradient-to-br from-green-900/40 to-black/60 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20 overflow-hidden h-full">
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={hoveredCard === index ? {
                  background: [
                    'linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(163, 230, 53, 0.1))',
                    'linear-gradient(45deg, rgba(163, 230, 53, 0.1), rgba(34, 197, 94, 0.1))'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Certificate Badge */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-lime-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Certificate Title */}
              <motion.h3
                className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-green-300 to-lime-400 bg-clip-text mb-4 group-hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                {certificate.title}
              </motion.h3>

              {/* Certificate Details */}
              <div className="space-y-3 mb-4">
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
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
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
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
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-200 text-sm">
                    <span className="font-semibold text-lime-400">ID:</span> {certificate.credential}
                  </span>
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                className="text-green-300 text-sm mb-4 line-clamp-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              >
                {certificate.description}
              </motion.p>

              {/* Skills */}
              <motion.div
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
                  {certificate.skills.slice(0, 3).map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-gradient-to-r from-green-800/50 to-lime-800/50 text-green-300 rounded-full text-xs font-medium border border-green-600/30"
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
                      {skill}
                    </motion.span>
                  ))}
                  {certificate.skills.length > 3 && (
                    <motion.span
                      className="px-3 py-1 bg-gradient-to-r from-lime-800/50 to-green-800/50 text-lime-300 rounded-full text-xs font-medium border border-lime-600/30"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      +{certificate.skills.length - 3} more
                    </motion.span>
                  )}
                </div>
              </motion.div>

              {/* Hover Overlay */}
              <AnimatePresence>
                {hoveredCard === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-lime-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
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
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <motion.div
                          className="w-8 h-8 border-2 border-white rounded-full border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <p className="text-white font-semibold text-lg">View Details</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
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
              </div>
              
              <div className="mb-6">
                <h4 className="text-lime-400 font-semibold mb-3">All Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill, index) => (
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
              
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-lime-500 transition-all duration-300"
                onClick={() => setSelectedCertificate(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Chatbot />
    </motion.section>
  );
};

export default Certificate;