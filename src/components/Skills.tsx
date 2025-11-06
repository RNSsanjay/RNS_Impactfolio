import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Code, Users, Globe, Star, Zap, Award, Brain,
  ChevronRight, TrendingUp, Target, Layers,
  BookOpen, Settings, Database, Smartphone,
  Cloud, Shield, Palette, Cpu
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  years?: number;
  projects?: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  skills: Skill[];
  description: string;
}

const SkillsShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-based animations for overlay effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yTransform = useTransform(scrollYProgress, [0, 0.3, 1], ["100vh", "0vh", "-20vh"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.9]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const skillsData: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Smartphone className="w-7 h-7" />,
      color: "#10b981",
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      description: "Modern UI/UX development with cutting-edge technologies",
      skills: [
        { name: "React & Next.js", level: 95, years: 4, projects: 25 },
        { name: "TypeScript/JavaScript", level: 94, years: 5, projects: 30 },
        { name: "Tailwind CSS", level: 92, years: 3, projects: 20 },
        { name: "HTML5 & CSS3", level: 96, years: 6, projects: 35 },
        { name: "Responsive Design", level: 94, years: 4, projects: 28 },
        { name: "State Management", level: 90, years: 3, projects: 18 }
      ]
    },
    {
      title: "Backend & APIs",
      icon: <Database className="w-7 h-7" />,
      color: "#059669",
      gradient: "from-green-600 via-emerald-600 to-green-500",
      description: "Scalable server-side solutions and database management",
      skills: [
        { name: "Node.js & Express", level: 88, years: 3, projects: 15 },
        { name: "Python (Django/Flask)", level: 86, years: 4, projects: 12 },
        { name: "RESTful APIs", level: 92, years: 4, projects: 22 },
        { name: "MongoDB & MySQL", level: 85, years: 3, projects: 18 },
        { name: "GraphQL", level: 78, years: 2, projects: 8 },
        { name: "Microservices", level: 82, years: 2, projects: 6 }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="w-7 h-7" />,
      color: "#34d399",
      gradient: "from-emerald-400 via-green-400 to-emerald-500",
      description: "Artificial Intelligence and intelligent automation solutions",
      skills: [
        { name: "Generative AI & LLMs", level: 95, years: 2, projects: 14 },
        { name: "Prompt Engineering", level: 96, years: 2, projects: 20 },
        { name: "LangChain & AI Agents", level: 88, years: 1, projects: 8 },
        { name: "Machine Learning", level: 85, years: 3, projects: 10 },
        { name: "Natural Language Processing", level: 82, years: 2, projects: 7 },
        { name: "Computer Vision", level: 75, years: 1, projects: 4 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-7 h-7" />,
      color: "#6ee7b7",
      gradient: "from-green-300 via-emerald-300 to-teal-400",
      description: "Modern deployment and infrastructure management",
      skills: [
        { name: "AWS & Azure", level: 82, years: 2, projects: 12 },
        { name: "Docker & Containers", level: 85, years: 2, projects: 10 },
        { name: "CI/CD Pipelines", level: 80, years: 2, projects: 8 },
        { name: "Git & Version Control", level: 94, years: 5, projects: 40 },
        { name: "Linux Administration", level: 78, years: 3, projects: 6 },
        { name: "Monitoring & Logging", level: 75, years: 1, projects: 5 }
      ]
    },
    {
      title: "Professional Skills",
      icon: <Users className="w-7 h-7" />,
      color: "#047857",
      gradient: "from-green-700 via-emerald-700 to-green-600",
      description: "Leadership and project management capabilities",
      skills: [
        { name: "Project Management", level: 92, years: 4, projects: 15 },
        { name: "Team Leadership", level: 88, years: 3, projects: 8 },
        { name: "Client Communication", level: 94, years: 5, projects: 25 },
        { name: "Agile/Scrum", level: 90, years: 3, projects: 12 },
        { name: "Technical Writing", level: 86, years: 4, projects: 20 },
        { name: "Mentoring", level: 84, years: 2, projects: 6 }
      ]
    }
  ];

  const SkillCard: React.FC<{ skill: Skill; index: number; categoryColor: string }> = ({
    skill, index, categoryColor
  }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isCardInView = useInView(cardRef, { once: true, margin: '-50px' });

    return (
      <motion.div
        ref={cardRef}
        className="group relative"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={isCardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl group-hover:border-emerald-500/50 transition-all duration-300">
          {/* Animated background gradient */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}20, transparent 50%, ${categoryColor}10)`
            }}
          />

          {/* Skill header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                {skill.name}
              </h3>
              <div className="flex gap-4 text-sm text-gray-400">
                {skill.years && (
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {skill.years}y exp
                  </span>
                )}
                {skill.projects && (
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    {skill.projects} projects
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isCardInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}CC, ${categoryColor})`
                }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2,
                    delay: index * 0.1 + 0.5,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>

            {/* Skill level labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Beginner</span>
              <span>Advanced</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 relative overflow-hidden z-10"
      initial={{
        y: "100vh",
      }}
      animate={{
        y: "0vh",
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/15 to-green-500/15 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            x: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-400/12 to-teal-500/12 blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            x: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
          style={{ top: '60%', right: '15%' }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Header Section with enhanced entrance */}
      <motion.div
        className="relative z-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="inline-flex items-center gap-3 px-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-full mt-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <Code className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 font-medium">Professional Portfolio</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 mb-6"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          Professional
          <br />
          <motion.span
            className="text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Skills
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          Comprehensive expertise across modern technologies and methodologies,
          backed by real-world experience and continuous learning
        </motion.p>

        {/* Enhanced Achievement stats with staggered entrance */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 1.9,
                staggerChildren: 0.2
              }
            }
          }}
        >
          {[
            { label: "Technologies", value: "25+", icon: <Code className="w-6 h-6" /> },
            { label: "Projects", value: "150+", icon: <Award className="w-6 h-6" /> },
            { label: "Experience", value: "5+ Years", icon: <TrendingUp className="w-6 h-6" /> },
            { label: "Certifications", value: "12+", icon: <BookOpen className="w-6 h-6" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }
                }
              }}
              className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="text-emerald-400">{stat.icon}</div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="relative z-10 flex justify-center px-4 mb-16 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <div className="flex flex-wrap justify-center gap-3 bg-gray-900/80 backdrop-blur-xl rounded-2xl p-3 border border-gray-700/50">
          {skillsData.map((section, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl transition-all duration-300 group ${activeSection === index
                ? `bg-gradient-to-r ${section.gradient} text-white shadow-lg shadow-emerald-500/25`
                : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`${activeSection === index ? 'text-white' : 'text-emerald-400'}`}>
                {section.icon}
              </div>
              <span className="font-semibold text-sm md:text-base hidden sm:block">
                {section.title}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Section header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${skillsData[activeSection].gradient} text-white shadow-xl`}
                >
                  {skillsData[activeSection].icon}
                </div>
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {skillsData[activeSection].title}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {skillsData[activeSection].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData[activeSection].skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={index}
                  categoryColor={skillsData[activeSection].color}
                />
              ))}
            </div>

            {/* Section footer stats */}
            <motion.div
              className="mt-16 bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Award className="w-6 h-6 text-emerald-400" />
                    <span className="text-3xl font-bold text-white">
                      {skillsData[activeSection].skills.length}
                    </span>
                  </div>
                  <p className="text-gray-400 font-medium">Core Skills</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Zap className="w-6 h-6 text-emerald-400" />
                    <span className="text-3xl font-bold text-white">
                      {Math.round(
                        skillsData[activeSection].skills.reduce((acc, skill) => acc + skill.level, 0) /
                        skillsData[activeSection].skills.length
                      )}%
                    </span>
                  </div>
                  <p className="text-gray-400 font-medium">Avg Proficiency</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Brain className="w-6 h-6 text-emerald-400" />
                    <span className="text-3xl font-bold text-white">
                      {skillsData[activeSection].skills.filter(skill => skill.level >= 90).length}
                    </span>
                  </div>
                  <p className="text-gray-400 font-medium">Expert Level</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom CTA section */}
      <motion.div
        className="relative z-10 py-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Let's collaborate and bring your ideas to life with cutting-edge technology
          </p>
          <motion.button
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get In Touch</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Custom styles */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @media (max-width: 768px) {
          .bg-grid-pattern {
            background-size: 30px 30px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default SkillsShowcase;
