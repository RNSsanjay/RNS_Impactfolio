import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Skillanime from './Skillsanime';

interface Skill {
  name: string;
  proficiency: number;
  icon: string;
  category: string;
  description: string;
  experience: string;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const skillsData = useMemo(() => [
    {
      category: "Development",
      items: [
        { name: "Full Stack Development", proficiency: 95, icon: "🌐", description: "Proficient in both frontend and backend development.", experience: "1.5 years" }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React", proficiency: 95, icon: "⚛️", description: "Advanced knowledge in building React applications.", experience: "1.5 years" },
        { name: "Next.js", proficiency: 90, icon: "▲", description: "Experience with Next.js for server-side rendering.", experience: "1.5 years" },
        { name: "TypeScript", proficiency: 90, icon: "TS", description: "Strong typing skills with TypeScript.", experience: "1.5 years" },
        { name: "JavaScript", proficiency: 95, icon: "JS", description: "Expert in JavaScript programming.", experience: "1.5 years" },
        { name: "TSX/JSX", proficiency: 92, icon: "⚡", description: "Skilled in using TSX/JSX for React components.", experience: "1.5 years" },
        { name: "HTML", proficiency: 95, icon: "🏗️", description: "Proficient in HTML markup.", experience: "1.5 years" },
        { name: "CSS", proficiency: 90, icon: "🎨", description: "Advanced CSS styling techniques.", experience: "1.5 years" },
        { name: "Tailwind", proficiency: 88, icon: "💨", description: "Experience with Tailwind CSS for rapid UI development.", experience: "1.5 years" }
      ]
    },
    {
      category: "Platform",
      items: [
        { name: "Wix Studio", proficiency: 85, icon: "🎯", description: "Proficient in using Wix Studio for web design.", experience: "1.5 years" }
      ]
    },
    {
      category: "Language",
      items: [
        { name: "Python", proficiency: 90, icon: "🐍", description: "Strong Python programming skills.", experience: "1.5 years" },
        { name: "C", proficiency: 75, icon: "C", description: "Knowledgeable in C programming.", experience: "1.5 years" },
        { name: "C++", proficiency: 78, icon: "C++", description: "Experience with C++ programming.", experience: "1.5 years" },
        { name: "Java", proficiency: 80, icon: "☕", description: "Skilled in Java development.", experience: "1.5 years" }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Django", proficiency: 85, icon: "🎸", description: "Experience with Django framework.", experience: "1.5 years" },
        { name: "Flask", proficiency: 80, icon: "🌶️", description: "Skilled in Flask for lightweight backend services.", experience: "1.5 years" },
        { name: "Node.js", proficiency: 88, icon: "🟢", description: "Proficient in Node.js for server-side development.", experience: "1.5 years" }
      ]
    },
    {
      category: "Graphics",
      items: [
        { name: "Three.js", proficiency: 82, icon: "🔺", description: "Experience with Three.js for 3D graphics.", experience: "1.5 years" }
      ]
    },
    {
      category: "Tool",
      items: [
        { name: "Streamlit", proficiency: 85, icon: "📊", description: "Proficient in Streamlit for data applications.", experience: "1.5 years" }
      ]
    },
    {
      category: "Database",
      items: [
        { name: "MongoDB", proficiency: 88, icon: "🍃", description: "Skilled in MongoDB for NoSQL databases.", experience: "1.5 years" },
        { name: "SQL", proficiency: 85, icon: "💾", description: "Strong SQL database skills.", experience: "1.5 years" },
        { name: "MySQL", proficiency: 82, icon: "🗄️", description: "Experience with MySQL databases.", experience: "1.5 years" }
      ]
    },
    {
      category: "AI",
      items: [
        { name: "Gen AI", proficiency: 90, icon: "🤖", description: "Knowledgeable in Generative AI techniques.", experience: "1.5 years" },
        { name: "Agentic AI", proficiency: 88, icon: "🧠", description: "Experience with Agentic AI systems.", experience: "1.5 years" },
        { name: "LangChain", proficiency: 85, icon: "⛓️", description: "Experience with LangChain for AI applications.", experience: "1.5 years" },
        { name: "Crew AI", proficiency: 82, icon: "👥", description: "Skilled in Crew AI for collaborative AI systems.", experience: "1.5 years" },
        { name: "Groq AI", proficiency: 78, icon: "⚡", description: "Knowledgeable in Groq AI technologies.", experience: "1.5 years" },
        { name: "Prompt Engineering", proficiency: 92, icon: "💭", description: "Expert in prompt engineering for AI models.", experience: "1.5 years" }
      ]
    },
    {
      category: "Automation",
      items: [
        { name: "n8n", proficiency: 80, icon: "🔗", description: "Proficient in n8n for workflow automation.", experience: "1.5 years" }
      ]
    },
    {
      category: "Management",
      items: [
        { name: "Business Analysis", proficiency: 85, icon: "📈", description: "Skilled in business analysis techniques.", experience: "1.5 years" },
        { name: "Scrum Master", proficiency: 80, icon: "🏃", description: "Experience as a Scrum Master in Agile teams.", experience: "1.5 years" }
      ]
    },
    {
      category: "Testing",
      items: [
        { name: "Manual Testing", proficiency: 88, icon: "🔍", description: "Proficient in manual testing techniques.", experience: "1.5 years" },
        { name: "Automated Testing", proficiency: 82, icon: "🤖", description: "Skilled in automated testing frameworks.", experience: "1.5 years" }
      ]
    },
    {
      category: "Tool",
      items: [
        { name: "GitHub", proficiency: 90, icon: "🐙", description: "Experience with GitHub for version control.", experience: "1.5 years" }
      ]
    }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

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
      className="absolute w-2 h-2 rounded-full bg-white"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0
      }}
    />
  ));

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-black relative overflow-hidden min-h-screen text-white"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black opacity-30"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            background: [
              'linear-gradient(135deg, #000000, #000000)',
              'linear-gradient(135deg, #000000, #000000)',
              'linear-gradient(135deg, #000000, #000000)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {particles}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      </div>

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

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {skillsData.map((category, index) => (
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 relative z-10 mb-16">
          {skillsData
            .filter(category => !selectedCategory || category.category === selectedCategory)
            .map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                className="bg-gradient-to-br from-gray-800/50 to-green-900/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-green-600/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * categoryIndex, duration: 0.5 }}
                whileHover={{ boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)", scale: 1.02 }}
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
                      <div className="flex justify-between items-center text-green-200">
                        <span className="font-medium flex items-center gap-2">
                          <span className="text-xl">{skill.icon}</span>
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
                      <div className="h-2 bg-gray-700/80 rounded-full overflow-hidden">
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
                              {skill.description}
                            </span>
                            <span className="mt-1 text-green-300/70">
                              Experience: {skill.experience}
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
        <Skillanime />
      </div>
    </motion.section>
  );
};

export default Skills;
