import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', href: '#', color: 'hover:text-gray-300' },
    { name: 'LinkedIn', icon: '💼', href: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: '🐦', href: '#', color: 'hover:text-sky-400' },
    { name: 'Email', icon: '📧', href: '#', color: 'hover:text-red-400' }
  ];

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' }
  ];

  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 'Web Design'];

  return (
    <footer className="relative bg-gradient-to-br from-emerald-900 via-green-950 to-slate-900 text-emerald-100 overflow-hidden animate-fadeIn">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 xs:w-64 xs:h-64 sm:w-96 sm:h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 xs:w-64 xs:h-64 sm:w-96 sm:h-96 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Main Content Grid */}
        <div className="flex flex-col items-center justify-center gap-6 mb-8 animate-slideUp">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            Sanjay N.
          </h3>
          <p className="text-emerald-200 mb-6 leading-relaxed text-center max-w-2xl">
            Full-stack developer passionate about creating innovative solutions with modern technologies. Turning ideas into reality through code.
          </p>
          {/* AI Chatbot CTA */}
          <button
            onClick={() => handleNavigation('/chatbot')}
            className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>🤖</span>
              Chat with AI
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-emerald-900/60 text-emerald-200 rounded-full text-sm backdrop-blur-sm border border-emerald-400 hover:scale-110 hover:bg-emerald-800 transition-all duration-200 cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>



      {/* Scroll to Top Button */}
      <button
        className="absolute bottom-8 right-8 p-3 bg-gradient-to-r from-green-900 to-green-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="text-green-100 text-lg">↑</span>
      </button>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </footer>
  );
};

export default Footer;