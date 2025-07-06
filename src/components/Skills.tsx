import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skillanime from './Skillsanime';
import { Code, Users, Globe, ChevronRight, Star, Zap, Award, Brain } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

const SkillsShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for sparkle effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add sparkles at mouse position with probability
      if (Math.random() < 0.3) {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          delay: Math.random() * 0.5
        };

        setSparkles(prev => [...prev.slice(-20), newSparkle]);

        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skillsData: SkillCategory[] = [
    {
      title: "Soft Skills",
      icon: <Users className="w-8 h-8" />,
      color: "from-emerald-400 to-teal-500",
      skills: [
        { name: "Leadership", level: 80 },
        { name: "Communication", level: 60 },
        { name: "Problem Solving", level: 88 },
        { name: "Team Collaboration", level: 92 },
        { name: "Adaptability", level: 90 },
        { name: "Critical Thinking", level: 75 }
      ]
    },
    {
      title: "Technical Skills",
      icon: <Code className="w-8 h-8" />,
      color: "from-green-400 to-emerald-500",
      skills: [
        { name: "Agentic AI [ N8N , Langchain , Langgraph , Crew AI , AutoGen , etc ..]", level: 90 },
        { name: "Gen AI", level: 92 },
        { name: "AI & ML", level: 88 },
        { name: "JavaScript/TypeScript", level: 94 },
        { name: "React/Next.js", level: 91 },
        { name: "Python [ Django, Flask , Fast API , Streamlit ,etc.. ]", level: 86 },
        { name: "Node.js", level: 88 },
        { name: "Database Management [Mongo DB , MySQL , SQL , etc ..]", level: 83 },
        { name: "Proompt Engineering", level: 95 },
        { name: "Software Testing [ Manual Testing , Automated Testing ]", level: 85 }

      ]
    },
    {
      title: "Professional Skills",
      icon: <Globe className="w-8 h-8" />,
      color: "from-lime-400 to-green-500",
      skills: [
        { name: "Digital Marketing", level: 85 },
        { name: "Project Management", level: 89 },
        { name: "Client Relations", level: 92 },
        { name: "Business Development", level: 78 },
        { name: "Content Creation", level: 84 },
        { name: "Strategic Planning", level: 81 }
      ]
    }
  ];

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

  // Generate particles matching About page style
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

  // Enhanced Sparkle System - matching About page
  const SparkleEffect = () => (
    <>
      {/* Custom cursor */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Star className="w-4 h-4 text-green-400 fill-current" />
      </motion.div>

      {/* Mouse-following glow */}
      <motion.div
        className="fixed w-32 h-32 pointer-events-none z-40 rounded-full"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Dynamic sparkles following mouse */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: sparkle.x - 6,
            top: sparkle.y - 6,
          }}
          initial={{
            scale: 0,
            opacity: 0,
            rotate: 0
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
            y: [0, -30, -60],
            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            ease: "easeOut"
          }}
        >
          <Star className="w-3 h-3 text-green-300 fill-current" />
        </motion.div>
      ))}
    </>
  );

  const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => (
    <motion.div
      className="mb-4 transform transition-all duration-500 hover:scale-105 group relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        filter: "drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))"
      }}
      onHoverStart={() => {
        // Add extra sparkles on hover
        const rect = document.elementFromPoint(mousePosition.x, mousePosition.y)?.getBoundingClientRect();
        if (rect) {
          for (let i = 0; i < 3; i++) {
            const newSparkle = {
              id: Date.now() + Math.random() + i,
              x: mousePosition.x + (Math.random() - 0.5) * 100,
              y: mousePosition.y + (Math.random() - 0.5) * 100,
              delay: i * 0.1
            };

            setSparkles(prev => [...prev.slice(-20), newSparkle]);
            setTimeout(() => {
              setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
            }, 2000);
          }
        }
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-green-200 font-medium text-sm group-hover:text-green-100 transition-colors">
          {skill.name}
        </span>
        <span className="text-green-300 font-bold text-sm group-hover:text-green-200 transition-colors">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-800/60 rounded-full h-3 overflow-hidden shadow-inner border border-green-500/20 group-hover:border-green-400/40 transition-colors">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.level}%` : '0%' }}
          transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full relative overflow-hidden group-hover:from-green-300 group-hover:to-emerald-400 transition-colors"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{ x: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Extra glow effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            animate={{
              opacity: [0, 0.5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black py-20 px-4 relative overflow-hidden cursor-none">
      {/* Mouse-following sparkle system */}
      <SparkleEffect />

      {/* Animated Background - matching About page */}
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

      {/* Loading Animation - matching About page */}
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
              Loading Skills...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-green-300 mb-4"
          animate={{
            textShadow: ["0 0 8px rgba(16, 185, 129, 0.3)", "0 0 16px rgba(16, 185, 129, 0.5)", "0 0 8px rgba(16, 185, 129, 0.3)"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Professional Skills
          <motion.span
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-green-400"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.h1>
        <motion.p
          className="text-xl text-green-200 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Showcasing expertise across multiple domains with passion and precision
        </motion.p>
        <motion.div
          className="flex justify-center items-center gap-2 mt-6"
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
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Skills Navigation */}
      <motion.div
        className="relative z-10 flex justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="flex bg-gray-900/70 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-green-500/30">
          {skillsData.map((section, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${activeSection === index
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                : 'text-green-300 hover:bg-green-500/20 hover:text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {section.icon}
              <span className="font-semibold hidden sm:block">{section.title}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-500/30 overflow-hidden">
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${skillsData[activeSection].color} text-white shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skillsData[activeSection].icon}
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-green-300">{skillsData[activeSection].title}</h2>
                    <p className="text-green-200">Expertise and proficiency levels</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {skillsData[activeSection].skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Stats */}
          <motion.div
            className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-sm px-8 py-6 border-t border-green-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex justify-around items-center text-white">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-bold">6+</span>
                </div>
                <p className="text-sm opacity-90">Core Skills</p>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="w-5 h-5" />
                  <span className="text-2xl font-bold">90%</span>
                </div>
                <p className="text-sm opacity-90">Avg Proficiency</p>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ChevronRight className="w-5 h-5" />
                  <span className="text-2xl font-bold">3</span>
                </div>
                <p className="text-sm opacity-90">Skill Categories</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Gap before Skillanime */}
      <div className="relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-6xl mx-auto px-4"
        >
          <Skillanime />
        </motion.div>
      </div>

      {/* Custom styles */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default SkillsShowcase;
