import React, { useState, useEffect, useCallback, useMemo } from 'react';

const EnhancedSkillsAnimation = () => {
  const skills = useMemo(() => [
    { name: 'Full Stack Development', color: '#00FF7F', icon: '🌐', category: 'Development', level: 95, description: 'Proficient in both frontend and backend development.' },
    { name: 'React', color: '#90EE90', icon: '⚛️', category: 'Frontend', level: 95, description: 'Advanced knowledge in building React applications.' },
    { name: 'Next.js', color: '#98FB98', icon: '▲', category: 'Frontend', level: 90, description: 'Experience with Next.js for server-side rendering.' },
    { name: 'TypeScript', color: '#32CD32', icon: 'TS', category: 'Language', level: 90, description: 'Strong typing skills with TypeScript.' },
    { name: 'JavaScript', color: '#7FFF00', icon: 'JS', category: 'Language', level: 95, description: 'Expert in JavaScript programming.' },
    { name: 'TSX/JSX', color: '#ADFF2F', icon: '⚡', category: 'Frontend', level: 92, description: 'Skilled in using TSX/JSX for React components.' },
    { name: 'HTML', color: '#00FF00', icon: '🏗️', category: 'Frontend', level: 95, description: 'Proficient in HTML markup.' },
    { name: 'CSS', color: '#40E0D0', icon: '🎨', category: 'Styling', level: 90, description: 'Advanced CSS styling techniques.' },
    { name: 'Tailwind', color: '#00CED1', icon: '💨', category: 'Styling', level: 88, description: 'Experience with Tailwind CSS for rapid UI development.' },
    { name: 'Wix Studio', color: '#20B2AA', icon: '🎯', category: 'Platform', level: 85, description: 'Proficient in using Wix Studio for web design.' },
    { name: 'Python', color: '#3CB371', icon: '🐍', category: 'Language', level: 90, description: 'Strong Python programming skills.' },
    { name: 'Django', color: '#228B22', icon: '🎸', category: 'Backend', level: 85, description: 'Experience with Django framework.' },
    { name: 'Flask', color: '#008B00', icon: '🌶️', category: 'Backend', level: 80, description: 'Skilled in Flask for lightweight backend services.' },
    { name: 'Node.js', color: '#006400', icon: '🟢', category: 'Backend', level: 88, description: 'Proficient in Node.js for server-side development.' },
    { name: 'C', color: '#9ACD32', icon: 'C', category: 'Language', level: 75, description: 'Knowledgeable in C programming.' },
    { name: 'C++', color: '#8FBC8F', icon: 'C++', category: 'Language', level: 78, description: 'Experience with C++ programming.' },
    { name: 'Java', color: '#66CDAA', icon: '☕', category: 'Language', level: 80, description: 'Skilled in Java development.' },
    { name: 'Three.js', color: '#00FA9A', icon: '🔺', category: 'Graphics', level: 82, description: 'Experience with Three.js for 3D graphics.' },
    { name: 'Streamlit', color: '#48D1CC', icon: '📊', category: 'Tool', level: 85, description: 'Proficient in Streamlit for data applications.' },
    { name: 'MongoDB', color: '#2E8B57', icon: '🍃', category: 'Database', level: 88, description: 'Skilled in MongoDB for NoSQL databases.' },
    { name: 'SQL', color: '#3CB371', icon: '💾', category: 'Database', level: 85, description: 'Strong SQL database skills.' },
    { name: 'MySQL', color: '#228B22', icon: '🗄️', category: 'Database', level: 82, description: 'Experience with MySQL databases.' },
    { name: 'Gen AI', color: '#00FF7F', icon: '🤖', category: 'AI', level: 90, description: 'Knowledgeable in Generative AI techniques.' },
    { name: 'Agentic AI', color: '#32CD32', icon: '🧠', category: 'AI', level: 88, description: 'Experience with Agentic AI systems.' },
    { name: 'n8n', color: '#7FFF00', icon: '🔗', category: 'Automation', level: 80, description: 'Proficient in n8n for workflow automation.' },
    { name: 'LangChain', color: '#ADFF2F', icon: '⛓️', category: 'AI', level: 85, description: 'Experience with LangChain for AI applications.' },
    { name: 'Crew AI', color: '#98FB98', icon: '👥', category: 'AI', level: 82, description: 'Skilled in Crew AI for collaborative AI systems.' },
    { name: 'Groq AI', color: '#90EE90', icon: '⚡', category: 'AI', level: 78, description: 'Knowledgeable in Groq AI technologies.' },
    { name: 'Prompt Engineering', color: '#00CED1', icon: '💭', category: 'AI', level: 92, description: 'Expert in prompt engineering for AI models.' },
    { name: 'Business Analysis', color: '#20B2AA', icon: '📈', category: 'Management', level: 85, description: 'Skilled in business analysis techniques.' },
    { name: 'Scrum Master', color: '#48D1CC', icon: '🏃', category: 'Management', level: 80, description: 'Experience as a Scrum Master in Agile teams.' },
    { name: 'Manual Testing', color: '#40E0D0', icon: '🔍', category: 'Testing', level: 88, description: 'Proficient in manual testing techniques.' },
    { name: 'Automated Testing', color: '#00FFFF', icon: '🤖', category: 'Testing', level: 82, description: 'Skilled in automated testing frameworks.' },
    { name: 'GitHub', color: '#2E8B57', icon: '🐙', category: 'Tool', level: 90, description: 'Experience with GitHub for version control.' }
  ], []);

  const [activeSkills, setActiveSkills] = useState([]);
  const [animationPhase, setAnimationPhase] = useState('loading');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [error, setError] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categories = useMemo(() => {
    try {
      return ['all', ...new Set(skills.map(skill => skill.category))];
    } catch (err) {
      console.error(err);
      return ['all'];
    }
  }, [skills]);

  const filteredSkills = useMemo(() => {
    try {
      return skills
        .filter(skill => selectedCategory === 'all' || skill.category === selectedCategory)
        .filter(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
          if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
          } else if (sortOption === 'level') {
            return b.level - a.level;
          }
          return 0;
        });
    } catch (err) {
      console.error(err);
      return skills;
    }
  }, [skills, selectedCategory, searchTerm, sortOption]);

  const animateSkills = useCallback(async () => {
    try {
      setAnimationPhase('loading');
      setActiveSkills([]);

      for (let i = 0; i < filteredSkills.length; i++) {
        await new Promise(resolve => {
          setTimeout(() => {
            setActiveSkills(prev => {
              if (prev.includes(i)) return prev;
              return [...prev, i];
            });
            resolve();
          }, 150 + Math.random() * 100);
        });
      }

      setAnimationPhase('showing');
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnimationPhase('floating');
      await new Promise(resolve => setTimeout(resolve, 5000));
      setAnimationPhase('resetting');
      setTimeout(() => animateSkills(), 1000);
    } catch (err) {
      setError('Animation failed: ' + err.message);
      console.error('Animation error:', err);
    }
  }, [filteredSkills]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      animateSkills();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [animateSkills]);

  const getBrightness = useCallback((hexColor) => {
    try {
      const color = hexColor.replace('#', '');
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);
      return (r * 299 + g * 587 + b * 114) / 1000;
    } catch (err) {
      return 128;
    }
  }, []);

  if (error) {
    return (
      <div className="w-full p-8 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-900 border border-red-600 rounded-lg p-6 max-w-md">
          <h3 className="text-red-400 text-xl font-bold mb-2">⚠️ Error</h3>
          <p className="text-red-200">{error}</p>
          <button
            onClick={() => {
              setError(null);
              animateSkills();
            }}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white min-h-screen relative overflow-hidden rounded-[40px]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-600 to-emerald-600 transform -skew-y-6 animate-pulse"></div>
        <div className="absolute top-20 left-0 w-full h-full bg-gradient-to-r from-emerald-600 to-teal-600 transform skew-y-3 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 animate-pulse">
            Technical Expertise
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my technical skills with interactive animations and detailed insights
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4 justify-center items-center w-full max-w-4xl">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search skills by name..."
              className="w-full px-6 py-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full justify-center">
            <span className="text-gray-300">Sort by:</span>
            <select
              className="px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="level">Proficiency Level</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            animationPhase === 'loading' ? 'bg-yellow-400 animate-pulse' :
            animationPhase === 'showing' ? 'bg-green-400' :
            animationPhase === 'floating' ? 'bg-emerald-400 animate-bounce' :
            'bg-teal-400'
          }`}></div>
          <span className="text-sm text-gray-400 capitalize">{animationPhase}</span>
        </div>

        <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
            {filteredSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className={`transform transition-all duration-700 ease-out cursor-pointer ${
                  activeSkills.includes(index) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                } ${animationPhase === 'floating' ? 'hover:scale-110' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: animationPhase === 'floating'
                    ? `translateY(${Math.sin((Date.now() / 1000 + index) * 0.5) * 10}px)`
                    : undefined
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => setSelectedSkill(skill)}
              >
                <div
                  className="relative h-32 rounded-xl p-4 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}22, ${skill.color}11)`,
                    border: `2px solid ${skill.color}`,
                    boxShadow: hoveredSkill === index
                      ? `0 20px 40px ${skill.color}44, 0 0 20px ${skill.color}66`
                      : `0 8px 16px ${skill.color}22`,
                  }}
                >
                  <div className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full"
                       style={{
                         backgroundColor: `${skill.color}33`,
                         color: skill.color
                       }}>
                    {skill.level}%
                  </div>

                  <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-black bg-opacity-30">
                    {skill.category}
                  </div>

                  <div
                    className="absolute w-20 h-20 rounded-full opacity-20"
                    style={{
                      background: `conic-gradient(from 0deg, ${skill.color}, transparent, ${skill.color})`,
                      animation: animationPhase === 'floating' ? 'spin 8s infinite linear' : 'none',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className="text-2xl mb-2 font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${skill.color}, ${skill.color}CC)`,
                        color: getBrightness(skill.color) > 160 ? '#000' : '#fff',
                        animation: hoveredSkill === index ? 'bounce 0.6s ease-in-out' : 'none',
                      }}
                    >
                      {skill.icon}
                    </div>
                    <span
                      className="font-semibold text-center text-sm"
                      style={{
                        color: skill.color,
                        textShadow: `0 0 10px ${skill.color}44`,
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 h-1 bg-black bg-opacity-30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        backgroundColor: skill.color,
                        width: activeSkills.includes(index) ? `${skill.level}%` : '0%',
                        boxShadow: `0 0 8px ${skill.color}`,
                      }}
                    />
                  </div>

                  {hoveredSkill === index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-xl" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>Showing {filteredSkills.length} skills • {activeSkills.length} loaded • Phase: {animationPhase}</p>
        </div>

        {selectedSkill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">{selectedSkill.name}</h2>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="text-4xl mb-4 font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${selectedSkill.color}, ${selectedSkill.color}CC)`,
                    color: getBrightness(selectedSkill.color) > 160 ? '#000' : '#fff',
                  }}
                >
                  {selectedSkill.icon}
                </div>
                <p className="text-gray-300 mb-2">{selectedSkill.description}</p>
                <div className="text-sm font-bold px-2 py-1 rounded-full mt-2"
                     style={{
                       backgroundColor: `${selectedSkill.color}33`,
                       color: selectedSkill.color
                     }}>
                  Level: {selectedSkill.level}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes enhancedFloat {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(-15px, -15px) rotate(90deg) scale(1.1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-30px, 15px) rotate(180deg) scale(0.9);
            opacity: 0.8;
          }
          75% {
            transform: translate(15px, -10px) rotate(270deg) scale(1.05);
            opacity: 0.4;
          }
        }

        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0) scale(1); }
          40%, 43% { transform: translate3d(0,-8px,0) scale(1.1); }
          70% { transform: translate3d(0,-4px,0) scale(1.05); }
          90% { transform: translate3d(0,-1px,0) scale(1.02); }
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedSkillsAnimation;
