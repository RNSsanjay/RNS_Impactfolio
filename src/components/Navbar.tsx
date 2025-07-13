import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Book, Briefcase,
  Award, GraduationCap, PhoneCall, Brain, Menu, X, ChevronDown, ExternalLink, Github, Linkedin, FolderOpen, Info
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: User },
    { name: 'Skills', path: '/skills', icon: Book },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Internships Experience', path: '/experience', icon: Briefcase },
    { name: 'Certificates', path: '/certificate', icon: Award },
    { name: 'Education', path: '/education', icon: GraduationCap },
    { name: 'Contact', path: '/contact', icon: PhoneCall }
  ];

  // Hide navbar on scroll down, show on scroll up (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (window.innerWidth > 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
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
      // Don't auto-close mobile menu on click outside, let user close with button or nav
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <>
      {/* Desktop/Laptop Navbar (original design) */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
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

              <div className="hidden md:flex items-center space-x-6">
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
                      src="https://media.licdn.com/dms/image/v2/D5603AQEpbf00UxcUmw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701405522937?e=2147483647&v=beta&t=IE0df32Yv3NQSJ1MFXquFcC1_vurhF-ltKqDlhpzTEc"
                      alt="Profile"
                    />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-black/50 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50"
                      >
                        <Link to="https://github.com/RNSsanjay" target="_blank" className="block px-4 py-2 text-sm text-green-200 hover:bg-green-700/50 transition-colors">Github</Link>
                        <Link to="https://www.linkedin.com/in/sanjay--n/" target="_blank" className="block px-4 py-2 text-sm text-green-200 hover:bg-green-700/50 transition-colors">LinkedIn</Link>
                        <Link to="https://rns-1.github.io/RNS-GitProject/" className="block px-4 py-2 text-sm text-green-200 hover:bg-green-700/50 transition-colors">Projects</Link>
                        <Link to="https://rnssanjay.github.io/HostMyResume/" className="block px-4 py-2 text-sm text-green-200 hover:bg-green-700/50 transition-colors">Know More ...</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="text-green-200 hover:text-green-400 focus:outline-none"
                >
                  <Menu className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Sheet Menu (only for mobile) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] flex flex-col justify-end md:hidden"
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Bottom Sheet */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-3xl shadow-2xl px-6 pt-4 pb-8 min-h-[65vh] flex flex-col md:hidden border-t-2 border-green-500/30"
              initial={{ y: 100, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Handle Bar */}
              <div className="w-12 h-1 bg-green-400/60 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
                    <Brain className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white">Sanjay N</span>
                    <p className="text-green-400/80 text-sm">Portfolio</p>
                  </div>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-green-200 hover:text-white focus:outline-none p-3 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 backdrop-blur-sm"
                  aria-label="Close menu"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <div className="flex flex-col gap-3 mb-6 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
                {navItems.map((item, idx) => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + (0.05 * idx), type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm
                          ${isActive
                            ? 'text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25'
                            : 'text-green-200/90 hover:text-white hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 border border-slate-600/30'
                          }`}
                      >
                        <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20' : 'bg-green-500/10'}`}>
                          <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-green-400'}`} />
                        </div>
                        <span className="flex-1">{item.name}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* View More Section */}
              <div className="mt-auto border-t border-slate-600/40 pt-6">
                <motion.button
                  onClick={() => setIsViewMoreOpen(!isViewMoreOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/60 hover:to-slate-500/60 transition-all duration-300 backdrop-blur-sm border border-slate-500/30"
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                    View More
                  </span>
                  <motion.div
                    animate={{ rotate: isViewMoreOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isViewMoreOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -10 }}
                      animate={{ height: 'auto', opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {[
                          { name: 'Github', icon: Github, url: 'https://github.com/RNSsanjay', color: 'from-gray-700 to-gray-900', accent: 'from-gray-500 to-gray-700' },
                          { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sanjay--n/', color: 'from-blue-600 to-blue-800', accent: 'from-blue-400 to-blue-600' },
                          { name: 'Projects', icon: FolderOpen, url: 'https://rns-1.github.io/RNS-GitProject/', color: 'from-purple-600 to-purple-800', accent: 'from-purple-400 to-purple-600' },
                          { name: 'Know More', icon: Info, url: 'https://rnssanjay.github.io/HostMyResume/', color: 'from-emerald-600 to-emerald-800', accent: 'from-emerald-400 to-emerald-600' }
                        ].map((item, idx) => {
                          const IconComponent = item.icon;
                          return (
                            <motion.div
                              key={item.name}
                              initial={{ scale: 0.8, opacity: 0, y: 30 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * idx, type: 'spring', stiffness: 400, damping: 20 }}
                            >
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br ${item.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10 backdrop-blur-sm`}
                              >
                                <div className={`p-3 bg-gradient-to-br ${item.accent} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-white text-center group-hover:text-gray-100">{item.name}</span>
                              </a>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
