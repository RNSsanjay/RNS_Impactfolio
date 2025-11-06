import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, RotateCcw, Zap, Star, Award } from 'lucide-react';

interface Skill {
  name: string;
  color: string;
  icon: string;
  category: string;
  level: number;
  description: string;
  experience: string;
  projects: number;
}

const EnhancedSkillsAnimation = () => {
  const skills = useMemo(() => [
    { name: 'React & Next.js', color: '#10b981', icon: '⚛️', category: 'Frontend', level: 95, description: 'Advanced React development with Next.js for production applications.', experience: '4+ years', projects: 25 },
    { name: 'TypeScript', color: '#059669', icon: 'TS', category: 'Language', level: 94, description: 'Strong typing and advanced TypeScript patterns for scalable applications.', experience: '3+ years', projects: 30 },
    { name: 'JavaScript ES6+', color: '#34d399', icon: 'JS', category: 'Language', level: 96, description: 'Modern JavaScript with advanced concepts and best practices.', experience: '5+ years', projects: 40 },
    { name: 'Python', color: '#6ee7b7', icon: '🐍', category: 'Language', level: 90, description: 'Backend development with Django, Flask, and data science libraries.', experience: '4+ years', projects: 20 },
    { name: 'Node.js', color: '#047857', icon: '�', category: 'Backend', level: 88, description: 'Server-side development with Express and microservices architecture.', experience: '3+ years', projects: 15 },
    { name: 'MongoDB', color: '#065f46', icon: '🍃', category: 'Database', level: 85, description: 'NoSQL database design and optimization for modern applications.', experience: '3+ years', projects: 18 },
    { name: 'MySQL/PostgreSQL', color: '#10b981', icon: '🗄️', category: 'Database', level: 82, description: 'Relational database design, optimization, and complex queries.', experience: '4+ years', projects: 22 },
    { name: 'Generative AI', color: '#059669', icon: '🤖', category: 'AI/ML', level: 95, description: 'Large Language Models, prompt engineering, and AI application development.', experience: '2+ years', projects: 14 },
    { name: 'LangChain', color: '#34d399', icon: '⛓️', category: 'AI/ML', level: 88, description: 'Building AI-powered applications with LangChain framework.', experience: '1+ years', projects: 8 },
    { name: 'Machine Learning', color: '#6ee7b7', icon: '🧠', category: 'AI/ML', level: 85, description: 'ML algorithms, model training, and deployment with Python.', experience: '3+ years', projects: 10 },
    { name: 'AWS & Azure', color: '#047857', icon: '☁️', category: 'Cloud', level: 82, description: 'Cloud infrastructure, serverless computing, and DevOps practices.', experience: '2+ years', projects: 12 },
    { name: 'Docker', color: '#065f46', icon: '�', category: 'DevOps', level: 85, description: 'Containerization and orchestration for scalable deployments.', experience: '2+ years', projects: 10 },
    { name: 'Git & GitHub', color: '#10b981', icon: '🐙', category: 'Tools', level: 94, description: 'Version control, collaboration, and CI/CD pipeline management.', experience: '5+ years', projects: 50 },
    { name: 'Tailwind CSS', color: '#059669', icon: '�', category: 'Styling', level: 92, description: 'Utility-first CSS framework for rapid UI development.', experience: '3+ years', projects: 28 },
    { name: 'Three.js', color: '#34d399', icon: '🔺', category: 'Graphics', level: 78, description: '3D graphics and interactive visualizations for web applications.', experience: '2+ years', projects: 6 },
    { name: 'REST APIs', color: '#6ee7b7', icon: '�', category: 'Backend', level: 92, description: 'RESTful API design, development, and documentation.', experience: '4+ years', projects: 25 },
    { name: 'GraphQL', color: '#047857', icon: '📊', category: 'Backend', level: 80, description: 'Modern API development with GraphQL and Apollo.', experience: '2+ years', projects: 8 },
    { name: 'Testing', color: '#065f46', icon: '🧪', category: 'Quality', level: 85, description: 'Unit, integration, and E2E testing with modern frameworks.', experience: '3+ years', projects: 20 },
    { name: 'Agile/Scrum', color: '#10b981', icon: '🏃', category: 'Management', level: 90, description: 'Agile methodologies and project management best practices.', experience: '4+ years', projects: 15 },
    { name: 'UI/UX Design', color: '#059669', icon: '🎨', category: 'Design', level: 88, description: 'User-centered design principles and modern design systems.', experience: '3+ years', projects: 22 }
  ], []);

  const [filteredSkills, setFilteredSkills] = useState(skills);
  const [activeSkills, setActiveSkills] = useState<number[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('level');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [animationPhase, setAnimationPhase] = useState<string>('loading');
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  }, [skills]);

  const applyFilters = useCallback(() => {
    let filtered = skills.filter(skill =>
      (selectedCategory === 'All' || skill.category === selectedCategory) &&
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'name': return a.name.localeCompare(b.name);
        case 'level': return b.level - a.level;
        case 'category': return a.category.localeCompare(b.category);
        default: return 0;
      }
    });

    setFilteredSkills(filtered);
  }, [skills, selectedCategory, searchTerm, sortOption]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const startAnimation = useCallback(async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationPhase('loading');
    setActiveSkills([]);

    // Staggered skill appearance
    for (let i = 0; i < filteredSkills.length; i++) {
      await new Promise<void>(resolve => {
        setTimeout(() => {
          setActiveSkills(prev => [...prev, i]);
          resolve();
        }, 100 + Math.random() * 80);
      });
    }

    setAnimationPhase('interactive');
    setIsAnimating(false);
  }, [filteredSkills, isAnimating]);

  useEffect(() => {
    const timer = setTimeout(startAnimation, 500);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  const resetAnimation = () => {
    setActiveSkills([]);
    setAnimationPhase('loading');
    setTimeout(startAnimation, 300);
  };

  const getSkillColor = (level: number) => {
    if (level >= 90) return '#10b981'; // Expert - Bright green
    if (level >= 80) return '#059669'; // Advanced - Medium green  
    if (level >= 70) return '#047857'; // Intermediate - Dark green
    return '#065f46'; // Beginner - Darkest green
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-white min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-400/15 to-teal-500/15 blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
          style={{ bottom: '20%', right: '15%' }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative z-10 p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Interactive Skills
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore my technical expertise through an interactive and engaging experience
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { label: 'Total Skills', value: skills.length, icon: <Zap className="w-5 h-5" /> },
              { label: 'Expert Level', value: skills.filter(s => s.level >= 90).length, icon: <Star className="w-5 h-5" /> },
              { label: 'Categories', value: categories.length - 1, icon: <Filter className="w-5 h-5" /> },
              { label: 'Projects', value: skills.reduce((acc, s) => acc + s.projects, 0), icon: <Award className="w-5 h-5" /> }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center justify-center gap-2 mb-2 text-emerald-400">
                  {stat.icon}
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div
          className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort */}
            <select
              className="px-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="level">Sort by Level</option>
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
            </select>

            {/* Reset Button */}
            <motion.button
              onClick={resetAnimation}
              className="flex items-center gap-2 px-4 py-3 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAnimating}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </motion.button>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animation Status */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${animationPhase === 'loading' ? 'bg-yellow-400 animate-pulse' :
              animationPhase === 'interactive' ? 'bg-emerald-400' : 'bg-gray-400'
            }`} />
          <span className="text-sm text-gray-400 capitalize">
            {animationPhase === 'loading' ? 'Loading Skills...' :
              animationPhase === 'interactive' ? 'Interactive Mode' : animationPhase}
          </span>
          <span className="text-sm text-emerald-400">
            {activeSkills.length}/{filteredSkills.length} skills loaded
          </span>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const isActive = activeSkills.includes(index);
              const skillColor = getSkillColor(skill.level);

              return (
                <motion.div
                  key={`${skill.name}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={isActive ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { delay: index * 0.05, duration: 0.5 }
                  } : {}}
                  exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div
                    className="relative h-40 lg:h-44 rounded-2xl p-4 overflow-hidden backdrop-blur-sm border transition-all duration-300 group-hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${skillColor}15, ${skillColor}08)`,
                      borderColor: hoveredSkill === index ? skillColor : `${skillColor}40`,
                      boxShadow: hoveredSkill === index
                        ? `0 20px 40px ${skillColor}30, 0 0 30px ${skillColor}40`
                        : `0 8px 20px ${skillColor}20`,
                    }}
                  >
                    {/* Background pattern */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, ${skillColor} 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Level badge */}
                    <div
                      className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold"
                      style={{
                        backgroundColor: `${skillColor}20`,
                        color: skillColor,
                        border: `1px solid ${skillColor}40`
                      }}
                    >
                      {skill.level}%
                    </div>

                    {/* Category tag */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs bg-gray-900/60 text-gray-300 border border-gray-600/50">
                      {skill.category}
                    </div>

                    {/* Skill icon and content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                      <motion.div
                        className="text-3xl lg:text-4xl mb-3 font-bold rounded-full w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${skillColor}, ${skillColor}CC)`,
                          color: 'white',
                        }}
                        animate={hoveredSkill === index ? {
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {skill.icon}
                      </motion.div>

                      <h3
                        className="font-semibold text-sm lg:text-base mb-1 leading-tight"
                        style={{ color: skillColor }}
                      >
                        {skill.name}
                      </h3>

                      <p className="text-xs text-gray-400 mb-2">{skill.experience}</p>

                      <div className="text-xs text-gray-500">
                        {skill.projects} projects
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="absolute bottom-3 left-3 right-3 h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: skillColor,
                          boxShadow: `0 0 8px ${skillColor}80`,
                        }}
                        initial={{ width: 0 }}
                        animate={isActive ? {
                          width: `${skill.level}%`,
                          transition: { delay: index * 0.05 + 0.3, duration: 1 }
                        } : {}}
                      />
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-12 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-lg">
            Displaying <span className="text-emerald-400 font-semibold">{filteredSkills.length}</span> skills •
            <span className="text-emerald-400 font-semibold"> {activeSkills.length}</span> loaded •
            Phase: <span className="text-emerald-400 capitalize">{animationPhase}</span>
          </p>
        </motion.div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-gray-700/50 shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedSkill.name}</h2>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-gray-200 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col items-center mb-6">
                <div
                  className="text-5xl mb-4 font-bold rounded-full w-20 h-20 flex items-center justify-center shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${selectedSkill.color}, ${selectedSkill.color}CC)`,
                    color: 'white',
                  }}
                >
                  {selectedSkill.icon}
                </div>

                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400 mb-2">Category: {selectedSkill.category}</div>
                  <div className="text-sm text-gray-400 mb-2">Experience: {selectedSkill.experience}</div>
                  <div className="text-sm text-gray-400 mb-4">Projects: {selectedSkill.projects}</div>
                </div>

                <p className="text-gray-300 text-center leading-relaxed mb-4">
                  {selectedSkill.description}
                </p>

                <div
                  className="text-lg font-bold px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: `${selectedSkill.color}20`,
                    color: selectedSkill.color,
                    border: `1px solid ${selectedSkill.color}40`
                  }}
                >
                  Proficiency: {selectedSkill.level}%
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        @media (max-width: 768px) {
          .bg-grid-pattern {
            background-size: 20px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedSkillsAnimation;
