import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, User, Book, Briefcase,
  Award, GraduationCap, PhoneCall, Brain
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: User },
    { name: 'Skills', path: '/skills', icon: Book },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Certificates', path: '/certificate', icon: Award },
    { name: 'Education', path: '/education', icon: GraduationCap },
    { name: 'Contact', path: '/contact', icon: PhoneCall }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm py-3"
        >
          <div className="container mx-auto px-6 flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <Brain className="text-green-300 w-8 h-8" />
              <Link
                to="/"
                className="text-xl font-bold text-green-200 hover:text-green-400 transition-colors"
              >
                Sanjay N
              </Link>
            </motion.div>

            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    onHoverStart={() => setHoveredItem(item.path)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  >
                    <Link
                      to={item.path}
                      className={`relative flex items-center space-x-2 text-sm font-medium transition-colors
                        ${isActive ? 'text-green-200' : 'text-green-400/70 hover:text-green-200'}`}
                    >
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-green-300' : 'text-green-500/70'}`} />
                      <span>{item.name}</span>
                      {hoveredItem === item.path && (
                        <motion.div
                          layoutId="hover-indicator"
                          className="absolute -bottom-2 left-0 right-0 h-1 bg-green-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Dropdown Button */}
              <div className="relative dropdown-container">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-green-500/50 transition-all duration-300"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src="/src/asserts/Cropped.jpg"
                    alt="Profile"
                  />
                </motion.button>

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-black/50 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50"
                  >
                    <Link to="https://github.com/RNSsanjay" target="_blank" className="block px-4 py-2 text-sm text-green-200 hover:bg-green-700/50 transition-colors">Github</Link>
                    <Link to="https://www.linkedin.com/in/sanjay--n/" target="_blank" className="block px-4 py-2 text-sm text-green-200 hover:bg-green-700/50 transition-colors">LinkedIn</Link>
                    <Link to="/projects" className="block px-4 py-2 text-sm text-green-200 hover:bg-green-700/50 transition-colors">Projects</Link>
                    <Link to="/contact" className="block px-4 py-2 text-sm text-green-200 hover:bg-green-700/50 transition-colors">Contact</Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default Navbar;
