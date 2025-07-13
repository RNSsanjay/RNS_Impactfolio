import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, ChevronRight, Download, X, Eye } from 'lucide-react';
import Chatbot from './Chatbot';
import Typewriter from 'typewriter-effect';
import photo from '../assets/Cropped.jpeg'; // Ensure you have a profile image in this path

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showHireModal, setShowHireModal] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [globalMousePosition, setGlobalMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  // References for scroll animations
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: false, amount: 0.3 });
  const experienceInView = useInView(experienceRef, { once: false, amount: 0.3 });

  const skillsControls = useAnimation();
  const experienceControls = useAnimation(); useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Global mouse tracking for entire page
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setGlobalMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (showPDFModal) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showPDFModal]);

  useEffect(() => {
    if (skillsInView) {
      skillsControls.start('visible');
    }
    if (experienceInView) {
      experienceControls.start('visible');
    }
  }, [skillsInView, experienceInView, skillsControls, experienceControls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

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

  // Generate particles
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };
  const handleMailClick = () => {
    if (!validateForm()) return;

    const { name, email, company, message } = formData;
    const mailBody = `${encodeURIComponent(
      message
    )}%0A%0A---%0AUser Details:%0AName: ${encodeURIComponent(
      name
    )}%0AEmail: ${encodeURIComponent(
      email
    )}%0ACompany: ${encodeURIComponent(company)}`;

    const mailtoUrl = `mailto:sanjay.n.aiml.2022@snsct.org?subject=Hire%20Request&body=${mailBody}`;
    window.location.href = mailtoUrl;

    setFormData({ name: "", email: "", company: "", message: "" });
    setShowHireModal(false);
  };

  const handleImageClick = () => {
    setShowPDFModal(true);
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1-CG08ad16thv0fccsRf4MrhXAV80zzUc/view?usp=sharing';
    link.download = 'Sanjay_N_Resume.pdf';
    link.click();
  };

  const handleDirectDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1p58rJp6QifDzD5awxii0OUyqwTJG1GO2/view?usp=sharing';
    link.download = 'Sanjay_N_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; return (
    <div
      className="min-h-screen bg-black py-12 md:py-20 px-2 sm:px-4 lg:px-6 relative overflow-hidden cursor-none"
      style={{ cursor: 'none' }}
    >
      {/* Custom Cursor with Sparkle Trail */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: globalMousePosition.x - 8,
          top: globalMousePosition.y - 8,
        }}
        animate={{
          x: globalMousePosition.x - 8,
          y: globalMousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        {/* Main cursor */}
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 2, repeat: Infinity, ease: "linear" }
          }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))'
          }}
        />
      </motion.div>

      {/* Global Sparkle Effects */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`global-sparkle-${i}`}
          className="fixed pointer-events-none z-40"
          animate={{
            x: globalMousePosition.x + Math.sin(Date.now() * 0.003 + i * 0.7) * (40 + i * 8),
            y: globalMousePosition.y + Math.cos(Date.now() * 0.003 + i * 0.7) * (40 + i * 8),
            rotate: [0, 360],
            scale: [0.3, 1, 0.3],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 20, mass: 0.1 },
            y: { type: "spring", stiffness: 50, damping: 20, mass: 0.1 },
            rotate: { duration: 4 + i * 0.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            width: '8px',
            height: '8px',
          }}
        >
          <motion.div
            className="w-full h-full relative"
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Star shape sparkle */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, 
                  ${i % 4 === 0 ? '#10b981' : i % 4 === 1 ? '#3b82f6' : i % 4 === 2 ? '#8b5cf6' : '#f59e0b'}, 
                  ${i % 4 === 0 ? '#34d399' : i % 4 === 1 ? '#60a5fa' : i % 4 === 2 ? '#a78bfa' : '#fbbf24'})`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                filter: `drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))`
              }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Trailing sparkles */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`global-trail-${i}`}
          className="fixed w-3 h-3 pointer-events-none z-30"
          animate={{
            x: globalMousePosition.x - (i + 1) * 20 + Math.sin(Date.now() * 0.004 + i) * 12,
            y: globalMousePosition.y - (i + 1) * 15 + Math.cos(Date.now() * 0.004 + i) * 12,
            scale: [1, 0.2, 1],
            opacity: [0.6 - i * 0.08, 0.2 - i * 0.03, 0.6 - i * 0.08],
          }}
          transition={{
            x: { type: "spring", stiffness: 30 - i * 3, damping: 25, mass: 0.3 },
            y: { type: "spring", stiffness: 30 - i * 3, damping: 25, mass: 0.3 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, 
                ${i % 3 === 0 ? 'rgba(16, 185, 129, 0.7)' : i % 3 === 1 ? 'rgba(59, 130, 246, 0.7)' : 'rgba(139, 92, 246, 0.7)'} 0%, 
                transparent 80%)`,
              filter: 'blur(1px)'
            }}
          />
        </motion.div>
      ))}

      {/* Gentle ambient glow */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`global-glow-${i}`}
          className="fixed pointer-events-none rounded-full z-20"
          style={{
            width: `${30 + i * 15}px`,
            height: `${30 + i * 15}px`,
            background: `radial-gradient(circle, 
              ${i === 0 ? 'rgba(16, 185, 129, 0.05)' : i === 1 ? 'rgba(59, 130, 246, 0.04)' : i === 2 ? 'rgba(139, 92, 246, 0.03)' : 'rgba(245, 158, 11, 0.02)'} 0%, 
              transparent 80%)`,
            filter: 'blur(2px)'
          }}
          animate={{
            x: globalMousePosition.x - (15 + i * 7.5),
            y: globalMousePosition.y - (15 + i * 7.5),
            scale: [0.6, 1.3, 0.6],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            x: { type: "spring", stiffness: 60 - i * 15, damping: 30, mass: 0.2 },
            y: { type: "spring", stiffness: 60 - i * 15, damping: 30, mass: 0.2 },
            scale: { duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3.5 + i * 1.2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}

      {/* Animated Background */}
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
      {particles}

      {/* 3D Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Loading Animation */}
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
            Loading Portfolio...
          </motion.div>
        </motion.div>
      )}      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative z-10 flex flex-col min-h-screen">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-center py-10 sm:py-16 md:py-20 lg:py-32 w-full gap-8 lg:gap-16"
        >
          {/* Text Content */}
          <motion.div
            className="space-y-6 sm:space-y-8 max-w-xl text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-300 leading-tight"
              animate={{
                textShadow: ["0 0 8px rgba(16, 185, 129, 0.3)", "0 0 16px rgba(16, 185, 129, 0.5)", "0 0 8px rgba(16, 185, 129, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Hi, I'm <span className="text-green-400 relative block sm:inline">
                Sanjay N
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </span>
            </motion.h1>

            <div className="text-xl sm:text-2xl md:text-3xl text-green-200 font-light min-h-[3rem] sm:min-h-[4rem]">
              <Typewriter
                options={{
                  strings: ['Software Developer', 'Gen AI', 'Full-Stack Developer', 'Problem Solver', 'Machine Learning Engineer', 'Software Tester', 'Design Thinker', 'Prompt Engineer'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 80,
                  wrapperClassName: "text-xl sm:text-2xl md:text-3xl text-green-200"
                }}
              />
            </div>

            <motion.p
              className="text-green-400 leading-relaxed text-base sm:text-lg px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Passionate software developer with expertise in Software technologies,
              creating innovative solutions that bridge design and functionality.
              Currently available for hire and open to new opportunities.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center lg:justify-start px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(16, 185, 129, 0.7)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 sm:px-8 py-3 rounded-full transition-all duration-300 flex items-center w-full sm:w-auto justify-center font-medium"
                onClick={() => setShowHireModal(true)}
              >
                Hire Me <ChevronRight className="ml-2 w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 px-6 sm:px-8 py-3 rounded-full transition-all duration-300 w-full sm:w-auto font-medium"
                onClick={() => navigate('/projects')}
              >
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile Image Section */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] mx-auto">
              {/* Rotating circles - responsive sizing */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className={`absolute inset-0 rounded-full border-2 border-green-500/30`}
                  style={{
                    width: `calc(100% + ${i * 20}px)`,
                    height: `calc(100% + ${i * 20}px)`,
                    top: `-${i * 10}px`,
                    left: `-${i * 10}px`
                  }}
                />
              ))}

              {/* Main image with glow effect */}
              <motion.div
                className="w-full h-full rounded-full overflow-hidden border-4 border-green-500 relative cursor-pointer group"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.3)",
                    "0 0 40px rgba(16, 185, 129, 0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.02 }}
                onClick={handleImageClick}
              >
                <img
                  src={photo}
                  alt="Sanjay N - Profile"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                />

                {/* Download overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="text-center text-white">
                    <Download className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm font-medium">Download Resume</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Quick Stats Section - Mobile Optimized */}
        
          

        {/* Chatbot positioned separately for better mobile experience */}
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <Chatbot />
        </motion.div>
      </div>      {/* Hire Modal - Enhanced for Mobile */}
      {showHireModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-green-900/90 to-blue-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-md w-full border border-green-500/30 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-green-300">Let's Work Together</h3>
              <motion.button
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10"
                onClick={() => setShowHireModal(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.p
              className="text-white mb-6 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ready to discuss how my skills and experience can benefit your team?
              Fill out the form below and I'll get back to you within 24 hours.
            </motion.p>

            <form className="space-y-4">
              {[
                { name: 'name', placeholder: 'Your Name', type: 'text' },
                { name: 'email', placeholder: 'Your Email', type: 'email' },
                { name: 'company', placeholder: 'Company', type: 'text' },
              ].map((field, index) => (
                <motion.input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-lg bg-black/50 border border-green-500/50 text-white focus:border-green-400 focus:outline-none transition-colors text-sm sm:text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                />
              ))}

              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className="w-full p-3 rounded-lg bg-black/50 border border-green-500/50 text-white focus:border-green-400 focus:outline-none transition-colors text-sm sm:text-base resize-none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              />

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg w-full sm:w-auto font-medium"
                  type="button"
                  onClick={handleMailClick}
                >
                  Send Message
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-green-300 hover:text-white px-6 py-3 rounded-lg border border-green-500/30 hover:bg-green-500/10 transition-colors w-full sm:w-auto"
                  onClick={() => setShowHireModal(false)}
                  type="button"
                >
                  Cancel
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}      {/* Download Modal - Enhanced Mobile Experience */}
      {showPDFModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePosition({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            });
          }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-md w-full border border-green-500/30 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.4
            }}
          >{/* Enhanced mouse-following glow effect */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '80px',
                height: '80px',
                background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 80%)",
                left: mousePosition.x - 40,
                top: mousePosition.y - 40,
                filter: 'blur(8px)'
              }}
              animate={{
                x: mousePosition.x - 40,
                y: mousePosition.y - 40,
                scale: [0.8, 1.1, 0.8],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                x: { type: "spring", stiffness: 120, damping: 20, mass: 0.1 },
                y: { type: "spring", stiffness: 120, damping: 20, mass: 0.1 },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />{/* Enhanced Sparkle Effects */}
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute pointer-events-none"
                animate={{
                  x: mousePosition.x + Math.sin(Date.now() * 0.002 + i * 0.8) * (30 + i * 5),
                  y: mousePosition.y + Math.cos(Date.now() * 0.002 + i * 0.8) * (30 + i * 5),
                  rotate: [0, 360],
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  x: { type: "spring", stiffness: 60, damping: 15, mass: 0.1 },
                  y: { type: "spring", stiffness: 60, damping: 15, mass: 0.1 },
                  rotate: { duration: 3 + i * 0.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  width: '6px',
                  height: '6px',
                  left: 0,
                  top: 0,
                }}
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* Star shape sparkle */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(45deg, 
                        ${i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6'}, 
                        ${i % 3 === 0 ? '#34d399' : i % 3 === 1 ? '#60a5fa' : '#a78bfa'})`,
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                      filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))'
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Trailing sparkles */}
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={`trail-${i}`}
                className="absolute w-2 h-2 pointer-events-none"
                animate={{
                  x: mousePosition.x - (i + 1) * 15 + Math.sin(Date.now() * 0.003 + i) * 8,
                  y: mousePosition.y - (i + 1) * 10 + Math.cos(Date.now() * 0.003 + i) * 8,
                  scale: [1, 0.3, 1],
                  opacity: [0.8 - i * 0.15, 0.3 - i * 0.05, 0.8 - i * 0.15],
                }}
                transition={{
                  x: { type: "spring", stiffness: 40 - i * 5, damping: 20, mass: 0.2 },
                  y: { type: "spring", stiffness: 40 - i * 5, damping: 20, mass: 0.2 },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                  opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle, 
                      ${i % 2 === 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(59, 130, 246, 0.8)'} 0%, 
                      transparent 70%)`,
                    filter: 'blur(0.5px)'
                  }}
                />
              </motion.div>
            ))}

            {/* Gentle glow particles */}
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={`glow-${i}`}
                className="absolute pointer-events-none rounded-full"
                style={{
                  width: `${20 + i * 10}px`,
                  height: `${20 + i * 10}px`,
                  background: `radial-gradient(circle, 
                    ${i === 0 ? 'rgba(16, 185, 129, 0.1)' : i === 1 ? 'rgba(59, 130, 246, 0.08)' : 'rgba(139, 92, 246, 0.06)'} 0%, 
                    transparent 70%)`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  x: mousePosition.x - (10 + i * 5),
                  y: mousePosition.y - (10 + i * 5),
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  x: { type: "spring", stiffness: 80 - i * 20, damping: 25, mass: 0.1 },
                  y: { type: "spring", stiffness: 80 - i * 20, damping: 25, mass: 0.1 },
                  scale: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 2.5 + i, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            ))}

            {/* Subtle Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)",
                backgroundSize: "24px 24px",
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              }}
            />

            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200"
              onClick={() => setShowPDFModal(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                rotate: mousePosition.x * 0.02,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <X className="w-5 h-5" />
            </motion.button>            {/* Header */}
            <motion.div
              className="text-center mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  rotateX: mousePosition.y * 0.05,
                  rotateY: mousePosition.x * 0.05,
                }}
                transition={{
                  scale: { delay: 0.2, type: "spring", stiffness: 300 },
                  rotateX: { type: "spring", stiffness: 100, damping: 10 },
                  rotateY: { type: "spring", stiffness: 100, damping: 10 }
                }}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                <Download className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Download Resume</h3>
              <p className="text-gray-400 text-sm">Choose your preferred format</p>
            </motion.div>            {/* Download Options */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {/* Professional Resume */}
              <motion.button
                className="w-full p-4 sm:p-5 bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl hover:border-green-400/50 transition-all duration-200 group relative"
                onClick={handleDownloadPDF}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotateY: mousePosition.x * 0.02,
                  rotateX: -mousePosition.y * 0.01,
                }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.3 },
                  x: { delay: 0.4, duration: 0.3 },
                  rotateY: { type: "spring", stiffness: 100, damping: 10 },
                  rotateX: { type: "spring", stiffness: 100, damping: 10 }
                }}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-400 transition-colors duration-200"
                    animate={{
                      rotateY: mousePosition.x * 0.03,
                      rotateX: -mousePosition.y * 0.02,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  >
                    <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 text-left">
                    <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-green-200 transition-colors duration-200">
                      Professional Resume
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Online PDF • Optimized for ATS</p>
                  </div>
                  <motion.div
                    animate={{
                      x: mousePosition.x * 0.01,
                      rotate: mousePosition.x * 0.05,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Detailed CV */}
              <motion.button
                className="w-full p-4 sm:p-5 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl hover:border-blue-400/50 transition-all duration-200 group relative"
                onClick={handleDirectDownload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotateY: -mousePosition.x * 0.02,
                  rotateX: mousePosition.y * 0.01,
                }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.3 },
                  x: { delay: 0.5, duration: 0.3 },
                  rotateY: { type: "spring", stiffness: 100, damping: 10 },
                  rotateX: { type: "spring", stiffness: 100, damping: 10 }
                }}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-400 transition-colors duration-200"
                    animate={{
                      rotateY: -mousePosition.x * 0.03,
                      rotateX: mousePosition.y * 0.02,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  >
                    <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 text-left">
                    <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-blue-200 transition-colors duration-200">
                      Detailed CV
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Complete document • Local download</p>
                  </div>
                  <motion.div
                    animate={{
                      x: -mousePosition.x * 0.01,
                      rotate: -mousePosition.x * 0.05,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>            {/* Info Section */}
            <motion.div
              className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800/40 rounded-lg border border-gray-700/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                x: mousePosition.x * 0.005,
              }}
              transition={{
                opacity: { delay: 0.6, duration: 0.3 },
                y: { delay: 0.6, duration: 0.3 },
                x: { type: "spring", stiffness: 100, damping: 10 }
              }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
                  animate={{
                    rotateZ: mousePosition.x * 0.1,
                    scale: 1 + mousePosition.y * 0.0001,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-300">
                    <span className="text-green-400 font-medium">Last Updated:</span> July 2025
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    File size: ~200KB • PDF format • Compatible with all devices
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default About;
