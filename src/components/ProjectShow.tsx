import React, { useState, useEffect } from 'react';
import { Code, Database, Server, Globe, Figma, Terminal } from 'lucide-react';

const AnimatedSkillsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Define your skills with their icons, names and proficiency level
  const skills = [
    { icon: <Code size={48} />, name: 'React', level: 85 },
    { icon: <Database size={48} />, name: 'MongoDB', level: 80 },
    { icon: <Server size={48} />, name: 'Node.js', level: 75 },
    { icon: <Globe size={48} />, name: 'HTML/CSS', level: 95 },
    { icon: <Figma size={48} />, name: 'Figma', level: 70 },
    { icon: <Terminal size={48} />, name: 'TypeScript', level: 82 },
  ];

  // Automatic rotation through skills
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % skills.length);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isHovering, skills.length]);

  // Calculate previous and next indices
  const prevIndex = (activeIndex - 1 + skills.length) % skills.length;
  const nextIndex = (activeIndex + 1) % skills.length;
  const nextNextIndex = (activeIndex + 2) % skills.length;

  return (
    <div className="w-full py-16 bg-gray-50 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-800">My Technical Skills</h2>
      
      {/* Main skills carousel */}
      <div 
        className="relative w-full max-w-4xl h-64 flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Previous skill (smaller) */}
        <div className="absolute left-4 opacity-50 transform scale-75 transition-all duration-500 hover:scale-90 hover:opacity-80">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            {skills[prevIndex].icon}
            <span className="mt-2 font-medium">{skills[prevIndex].name}</span>
          </div>
        </div>
        
        {/* Featured skill (center, larger) */}
        <div className="z-10 transform transition-all duration-700 scale-110 hover:scale-125">
          <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg">
            <div className="text-blue-600 mb-2 animate-bounce">
              {skills[activeIndex].icon}
            </div>
            <span className="text-xl font-bold">{skills[activeIndex].name}</span>
            
            {/* Skill level indicator */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skills[activeIndex].level}%` }}
              />
            </div>
            <span className="mt-1 text-sm text-gray-600">{skills[activeIndex].level}%</span>
          </div>
        </div>
        
        {/* Next skill (smaller) */}
        <div className="absolute right-4 opacity-50 transform scale-75 transition-all duration-500 hover:scale-90 hover:opacity-80">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            {skills[nextIndex].icon}
            <span className="mt-2 font-medium">{skills[nextIndex].name}</span>
          </div>
        </div>
        
        {/* Far next skill (smallest, only visible on wider screens) */}
        <div className="absolute right-0 mr-24 opacity-30 transform scale-50 transition-all duration-500 hidden lg:block">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            {skills[nextNextIndex].icon}
            <span className="mt-2 font-medium">{skills[nextNextIndex].name}</span>
          </div>
        </div>
      </div>
      
      {/* Skills navigation dots */}
      <div className="flex mt-8 space-x-2">
        {skills.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedSkillsShowcase;