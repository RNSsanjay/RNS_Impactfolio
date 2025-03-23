import React, { useState, useEffect } from 'react';

const InfiniteLoopSkillsAnimation = () => {
  // Define skills with appropriate colors and names
  const skills = [
    { name: 'React', color: '#61DAFB', icon: '⚛️' },
    { name: 'JavaScript', color: '#F7DF1E', icon: '𝐉𝐒' },
    { name: 'TypeScript', color: '#3178C6', icon: '𝐓𝐒' },
    { name: 'Node.js', color: '#339933', icon: '🟢' },
    { name: 'HTML5', color: '#E34F26', icon: '🌐' },
    { name: 'CSS3', color: '#1572B6', icon: '🎨' },
    { name: 'Git', color: '#F05032', icon: '⎇' },
    { name: 'GitHub', color: '#181717', icon: '🐙' },
    { name: 'MongoDB', color: '#47A248', icon: '🍃' },
    { name: 'AWS', color: '#FF9900', icon: '☁️' },
  ];

  // Animation states
  const [activeSkills, setActiveSkills] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Function to animate skills onto the grid
  useEffect(() => {
    let timeout;
    let index = 0;
    
    const animateSkills = () => {
      timeout = setTimeout(() => {
        if (index < skills.length) {
          setActiveSkills(prev => [...prev, index]);
          index++;
          animateSkills();
        } else {
          setAnimationComplete(true);
        }
      }, 200);
    };
    
    animateSkills();
    
    return () => clearTimeout(timeout);
  }, []);

  // After all skills are shown, start the floating animation
  useEffect(() => {
    if (animationComplete) {
      const interval = setInterval(() => {
        // Reset animation after a complete cycle
        setActiveSkills([]);
        setAnimationComplete(false);
        
        // Start new animation cycle after a short delay
        setTimeout(() => {
          let index = 0;
          const timeout = setInterval(() => {
            if (index < skills.length) {
              setActiveSkills(prev => [...prev, index]);
              index++;
            } else {
              clearInterval(timeout);
              setAnimationComplete(true);
            }
          }, 200);
        }, 500);
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [animationComplete]);

  return (
    <div className="w-full p-8 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Technical Skills
      </h2>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-green-900 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-blue-900 opacity-30 animate-pulse"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-20"
            style={{
              width: `${Math.random() * 60 + 10}px`,
              height: `${Math.random() * 60 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite linear`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-4xl h-96">
        {/* Skills grid */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`
                transform transition-all duration-700 ease-out 
                ${activeSkills.includes(index) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
                className="h-full rounded-lg p-4 flex flex-col items-center justify-center overflow-hidden relative"
                style={{
                  backgroundColor: `${skill.color}22`, // Using hex opacity
                  border: `2px solid ${skill.color}`,
                }}
              >
                {/* Rotating background effect */}
                <div
                  className="absolute w-40 h-40 rounded-full opacity-30"
                  style={{
                    backgroundColor: skill.color,
                    animation: 'spin 8s infinite linear',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Skill content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="text-2xl md:text-3xl mb-2 font-bold rounded-full w-12 h-12 flex items-center justify-center"
                    style={{
                      backgroundColor: skill.color,
                      color: getBrightness(skill.color) > 160 ? '#000' : '#fff',
                      animation: 'pulse 2s infinite ease-in-out',
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <span
                    className="font-medium text-center whitespace-nowrap"
                    style={{
                      color: skill.color,
                      animation: 'fadeInOut 3s infinite ease-in-out',
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    {skill.name}
                  </span>
                </div>

                {/* Pulsing dot in corner */}
                <div
                  className="absolute top-2 right-2 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: skill.color,
                    animation: 'pingPong 1.5s infinite ease-in-out',
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes fadeInOut {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }

        @keyframes pingPong {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// Helper function to determine if text should be dark or light based on background color
function getBrightness(hexColor) {
  // Remove # if present
  hexColor = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  
  // Calculate brightness (YIQ formula)
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export default InfiniteLoopSkillsAnimation;
