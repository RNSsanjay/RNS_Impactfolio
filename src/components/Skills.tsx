import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { profileData } from '../data/profileData';
import Skillanime from './Skillsanime';

interface Skill {
  name: string;
  proficiency: number;
  icon?: string;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // Generate particles for background effect
  const particles = Array.from({ length: 30 }, (_, i) => (
    <motion.div
      key={i}
      custom={i}
      animate={{
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        delay: i * 0.2
      }}
      className="absolute w-2 h-2 rounded-full bg-green-500"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0
      }}
    />
  ));

  const skillIcons = {
    "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-black relative overflow-hidden min-h-screen"
    >
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
            <div className="w-24 h-24 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.2 8.4c.5.38.8.97.8 1.6 0 1.1-.9 2-2 2H10a2 2 0 1 1 0-4h10a2 2 0 0 0 0-4H4a2 2 0 1 0 0 4"></path>
                <path d="M10 20.4a2 2 0 1 1 0-4h10a2 2 0 1 0 0-4H4a2 2 0 0 1 0-4"></path>
              </svg>
            </div>
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

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h2 className="text-5xl font-extrabold text-center text-green-300 mb-4">
            Skills & Expertise
          </h2>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <p className="text-green-200 text-center max-w-2xl mx-auto mb-12 opacity-80">
            A showcase of my technical proficiencies and professional capabilities
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {profileData.skills.map((category, index) => (
            <motion.button
              key={category.category}
              onClick={() => handleCategoryClick(category.category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.category
                  ? 'bg-green-500 text-black shadow-lg shadow-green-500/30'
                  : 'bg-green-900/40 text-green-300 hover:bg-green-800/60'
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              {category.category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid with Glass Morphism */}
        <div className="grid md:grid-cols-2 gap-8 px-6 relative z-10 mb-16">
          {profileData.skills
            .filter(category => !selectedCategory || category.category === selectedCategory)
            .map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                className="bg-gradient-to-br from-green-900/40 to-blue-900/40 backdrop-blur-md rounded-xl p-6 shadow-xl border border-green-600/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * categoryIndex, duration: 0.5 }}
                whileHover={{ boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)" }}
              >
                <motion.h3
                  className="text-2xl font-semibold text-green-300 mb-6 border-b border-green-600/30 pb-2 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.span
                    animate={{ 
                      textShadow: ["0 0 8px rgba(16, 185, 129, 0.3)", "0 0 16px rgba(16, 185, 129, 0.5)", "0 0 8px rgba(16, 185, 129, 0.3)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {category.category}
                  </motion.span>
                </motion.h3>
                <div className="space-y-6">
                  {category.items.map((skill, index) => (
                    <motion.div 
                      key={skill.name} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between text-green-200 items-center">
                        <span className="font-medium flex items-center gap-2">
                          {skillIcons[skill.name as keyof typeof skillIcons] && (
                            <img 
                              src={skillIcons[skill.name as keyof typeof skillIcons]} 
                              alt={skill.name} 
                              className="w-5 h-5"
                            />
                          )}
                          {skill.name}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`font-bold ${
                            skill.proficiency > 80 
                              ? 'text-green-300' 
                              : skill.proficiency > 60 
                              ? 'text-green-400' 
                              : 'text-green-500'
                          }`}
                        >
                          {skill.proficiency}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-green-900/80 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.5, 
                            delay: 0.2, 
                            ease: "easeOut" 
                          }}
                        />
                      </div>
                      {hoveredSkill === skill.name && (
                        <motion.div 
                          className="text-xs text-green-400/80 mt-1 bg-black/30 p-2 rounded-md backdrop-blur-sm"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="flex flex-col">
                            <span>
                              {skill.proficiency >= 90 ? 'Expert Level' :
                               skill.proficiency >= 75 ? 'Advanced Proficiency' :
                               skill.proficiency >= 60 ? 'Intermediate Level' :
                               'Growing Knowledge'}
                            </span>
                            <span className="mt-1 text-green-300/70">
                              {skill.proficiency >= 90 ? 'Years of professional experience with complex projects' :
                               skill.proficiency >= 75 ? 'Confident in most scenarios, even challenging ones' :
                               skill.proficiency >= 60 ? 'Comfortable with standard implementations' :
                               'Currently expanding knowledge in this area'}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
        <Skillanime/>
      
          
        
        {/* Experience Bar */}
        
      </div>
    </motion.section>
  );
};

export default Skills;