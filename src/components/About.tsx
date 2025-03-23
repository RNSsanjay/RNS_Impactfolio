import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Brain, ChevronRight } from 'lucide-react';
import Chatbot from './Chatbot';
import Typewriter from 'typewriter-effect';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showHireModal, setShowHireModal] = useState(false);
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
  const experienceControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
    animate: (i:number) => ({
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

  return (
    <div className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">
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
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center py-20 md:py-32 w-full"
        >
          <motion.div
            className="space-y-8 max-w-xl text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-green-300"
              animate={{
                textShadow: ["0 0 8px rgba(16, 185, 129, 0.3)", "0 0 16px rgba(16, 185, 129, 0.5)", "0 0 8px rgba(16, 185, 129, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Hi, I'm <span className="text-green-400 relative">
                Sanjay N
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </span>
            </motion.h1>

            <h2 className="text-2xl md:text-3xl text-green-200 font-light">
              <Typewriter
                options={{
                  strings: ['Software Developer', 'Gen AI', 'Full-Stack Developer', 'Problem Solver', 'Machine Learning Engineer', 'Software Tester', 'Design Thinker','Proompt Engineer'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 80,
                  wrapperClassName: "text-2xl md:text-3xl text-green-200"
                }}
              />
            </h2>

            <motion.p
              className="text-green-400 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Passionate software developer with expertise in Software technologies,
              creating innovative solutions that bridge design and functionality.
              Currently available for hire and open to new opportunities.
            </motion.p>

            <motion.div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(16, 185, 129, 0.7)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-3 rounded-full transition-all duration-300 flex items-center"
                onClick={() => setShowHireModal(true)}
              >
                Hire Me <ChevronRight className="ml-2 w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 px-8 py-3 rounded-full transition-all duration-300"
                onClick={() => navigate('/projects')}
              >
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mt-12 md:mt-0 md:ml-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] mx-auto">
              {/* Rotating circles */}
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
                    width: `calc(100% + ${i * 30}px)`,
                    height: `calc(100% + ${i * 30}px)`,
                    top: `-${i * 15}px`,
                    left: `-${i * 15}px`
                  }}
                />
              ))}

              {/* Main image with glow effect */}
              <motion.div
                className="w-full h-full rounded-full overflow-hidden border-4 border-green-500 relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.3)",
                    "0 0 40px rgba(16, 185, 129, 0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQEpbf00UxcUmw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701405522937?e=2147483647&v=beta&t=IE0df32Yv3NQSJ1MFXquFcC1_vurhF-ltKqDlhpzTEc"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <Chatbot />
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Hire Modal */}
      {showHireModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-green-900/80 to-blue-900/80 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-green-500/30"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <h3 className="text-2xl font-bold text-green-300 mb-4">Let's Work Together</h3>
            <p className="text-white mb-6">
              Ready to discuss how my skills and experience can benefit your team?
              Fill out the form below and I'll get back to you within 24 hours.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-black/50 border border-green-500/50 text-white focus:border-green-400 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-black/50 border border-green-500/50 text-white focus:border-green-400 focus:outline-none"
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full p-3 rounded-lg bg-black/50 border border-green-500/50 text-white focus:border-green-400 focus:outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                className="w-full p-3 rounded-lg bg-black/50 border border-green-500/50 text-white focus:border-green-400 focus:outline-none"
              ></textarea>

              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-2 rounded-lg"
                  type="button"
                  onClick={handleMailClick}
                >
                  Send Message
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-green-300 hover:text-white"
                  onClick={() => setShowHireModal(false)}
                  type="button"
                >
                  Close
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default About;
