import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skillanime from './Skillsanime';
import { Code, Users, Globe, Star, Zap, Award, ChevronRight, Brain } from 'lucide-react';

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

  useEffect(() => {
    setIsVisible(true);
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
        { name: "Gen AI & LLMs", level: 92 },
        { name: "AI & Machine Learning", level: 88 },
        { name: "JavaScript/TypeScript", level: 94 },
        { name: "React/Next.js", level: 91 },
        { name: "Python (Django, Flask, FastAPI)", level: 86 },
        { name: "Node.js & Express", level: 88 },
        { name: "Database Management (MongoDB, MySQL)", level: 83 },
        { name: "Prompt Engineering", level: 95 },
        { name: "Software Testing (Manual & Automated)", level: 85 },
        { name: "Cloud Platforms (AWS, Azure)", level: 78 }

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

  const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => (
    <motion.div
      className="mb-6 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-green-200 font-medium text-sm group-hover:text-green-100 transition-colors">
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-green-300 font-bold text-sm group-hover:text-green-200 transition-colors">
            {skill.level}%
          </span>
          {skill.level >= 90 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5, type: "spring" }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </motion.div>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-800/60 rounded-full h-4 overflow-hidden shadow-inner border border-green-500/20 group-hover:border-green-400/40 transition-colors">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.level}%` : '0%' }}
          transition={{
            delay: index * 0.1,
            duration: 1,
            ease: "easeOut"
          }}
          className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
            animate={{ x: [-100, 200] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #000000, #065f46)',
            'linear-gradient(135deg, #065f46, #10b981)',
            'linear-gradient(135deg, #10b981, #000000)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-green-300 mb-4 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Professional Skills
          <motion.span
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-2"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.h1>
        <motion.p
          className="text-xl text-green-200 max-w-3xl mx-auto px-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Expertise across multiple domains with continuous learning and innovation
        </motion.p>
        <motion.div
          className="flex justify-center items-center gap-2 mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                repeatDelay: 3
              }}
            >
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Overview Stats */}
        <motion.div
          className="flex justify-center gap-8 mt-8 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <div className="text-3xl font-bold text-green-400">22+</div>
            <div className="text-sm text-green-200">Core Skills</div>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <div className="text-3xl font-bold text-green-400">88%</div>
            <div className="text-sm text-green-200">Avg Proficiency</div>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <div className="text-3xl font-bold text-green-400">3</div>
            <div className="text-sm text-green-200">Categories</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Skills Navigation */}
      <div className="relative z-10 flex justify-center mb-12">
        <div className="flex bg-gray-900/70 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-green-500/30">
          {skillsData.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${activeSection === index
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                : 'text-green-300 hover:bg-green-500/20 hover:text-white'
                }`}
            >
              {section.icon}
              <span className="font-semibold hidden sm:block">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Skills Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-500/30 overflow-hidden">
          <div className="p-8 md:p-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${skillsData[activeSection].color} text-white shadow-lg`}>
                  {skillsData[activeSection].icon}
                </div>
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
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-sm px-8 py-6 border-t border-green-500/30">
            <div className="flex justify-around items-center text-white">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-bold">6+</span>
                </div>
                <p className="text-sm opacity-90">Core Skills</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="w-5 h-5" />
                  <span className="text-2xl font-bold">90%</span>
                </div>
                <p className="text-sm opacity-90">Avg Proficiency</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ChevronRight className="w-5 h-5" />
                  <span className="text-2xl font-bold">3</span>
                </div>
                <p className="text-sm opacity-90">Skill Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gap before Skillanime */}
      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Skillanime />
        </div>
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
