import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import Chatbot from './Chatbot';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-green-900 opacity-30"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          background: [
            'linear-gradient(135deg, #000000, #10b981)',
            'linear-gradient(135deg, #10b981, #000000)',
            'linear-gradient(135deg, #000000, #10b981)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-56 h-56 bg-green-400 rounded-full opacity-30"
        animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-48 h-48 bg-green-500 rounded-full opacity-20"
        animate={{ x: [0, -50, 50, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Loading Animation */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <Brain className="w-20 h-20 text-green-500" />
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10 flex flex-row items-center justify-center min-h-screen">
        <Navbar />
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-row items-center justify-center w-full"
        >
          <motion.div className="space-y-8 max-w-xl text-left">
            <h1 className="text-6xl font-bold text-green-300">
              Hi, I'm <span className="text-green-400">Sanjay N</span>
            </h1>
            <h2 className="text-3xl text-green-200">Software Developer</h2>
            <p className="text-green-400 leading-relaxed">
              Passionate software developer with expertise in web technologies,
              creating innovative solutions that bridge design and functionality.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <button
                className="bg-green-700 text-white px-10 py-4 rounded-full hover:bg-green-600 transition-colors"
                onClick={() => navigate('/')}
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
          <motion.div className="relative ml-16">
            <div className="relative w-[450px] h-[450px] mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-green-500/30"
              />
              <img
                src="src/asserts/Cropped.jpg"
                alt="Profile"
                className="rounded-full w-full h-full object-cover border-4 border-green-500 shadow-2xl shadow-green-700"
              />
            </div>
            <Chatbot />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
