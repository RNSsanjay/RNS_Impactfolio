import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skillanime from './Skillsanime';
import { Code, Users, Globe, Star, Zap, Award, Brain } from 'lucide-react';

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
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-green-200 font-medium text-sm">
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-green-300 font-bold text-sm">
            {skill.level}%
          </span>
          {skill.level >= 90 && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
        </div>
      </div>
      <div className="w-full bg-gray-800/60 rounded-full h-4 overflow-hidden shadow-inner border border-green-500/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">
      {/* Simple animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-green-300 mb-6 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Professional Skills
          <motion.span
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.h1>
        <motion.p
          className="text-xl text-green-200 max-w-3xl mx-auto px-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Expertise across multiple domains with continuous learning and innovation
        </motion.p>

        {/* Skills Overview Stats */}
        <motion.div
          className="flex justify-center gap-8 mt-8 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">18+</div>
            <div className="text-sm text-green-200">Core Skills</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">85%</div>
            <div className="text-sm text-green-200">Avg Proficiency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">3</div>
            <div className="text-sm text-green-200">Skill Categories</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Skills Navigation */}
      <motion.div
        className="relative z-10 flex justify-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex bg-gray-900/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-green-500/30 flex-wrap justify-center gap-2">
          {skillsData.map((section, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${activeSection === index
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'text-green-300 hover:bg-green-500/20 hover:text-white'
                }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              {section.icon}
              <span className="font-semibold text-sm sm:text-base">{section.title}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/30 overflow-hidden">
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-6 mb-10">
                  <div className={`p-5 rounded-2xl bg-gradient-to-r ${skillsData[activeSection].color} text-white shadow-xl`}>
                    {skillsData[activeSection].icon}
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-green-300 mb-2">{skillsData[activeSection].title}</h2>
                    <p className="text-green-200 text-lg">Expertise and proficiency levels</p>
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
            className="bg-gradient-to-r from-green-600/90 to-emerald-600/90 backdrop-blur-sm px-8 py-8 border-t border-green-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="flex justify-around items-center text-white flex-wrap gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-6 h-6" />
                  <span className="text-3xl font-bold">{skillsData[activeSection].skills.length}</span>
                </div>
                <p className="text-sm opacity-90 font-medium">Core Skills</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-6 h-6" />
                  <span className="text-3xl font-bold">
                    {Math.round(skillsData[activeSection].skills.reduce((acc, skill) => acc + skill.level, 0) / skillsData[activeSection].skills.length)}%
                  </span>
                </div>
                <p className="text-sm opacity-90 font-medium">Avg Proficiency</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Brain className="w-6 h-6" />
                  <span className="text-3xl font-bold">
                    {skillsData[activeSection].skills.filter(skill => skill.level >= 90).length}
                  </span>
                </div>
                <p className="text-sm opacity-90 font-medium">Expert Level</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Skillanime Integration */}
      <div className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-300 mb-4">
              Interactive Skills Visualization
            </h2>
            <p className="text-green-200 text-lg max-w-2xl mx-auto">
              Explore my technical skills through an interactive and engaging visual experience
            </p>
          </div>
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
