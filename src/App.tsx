import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/contact';
import Footer from './components/Footer';
import Internship from './components/Internships';
import Certificate from './components/Certificates';
import About from './components/About';
import Chatbot from './components/Chatbot';
import Experience from './components/Experience';
import GlobalCursor from './components/GlobalCursor';
import LoadingScreen from './components/LoadingScreen';
import BrainLoading from './components/BrainLoading';
import './index.css';

const AppContent = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(() => {
    // Check if the app has been loaded before in this session
    const hasLoadedBefore = sessionStorage.getItem('rns-app-loaded');
    return !hasLoadedBefore;
  });
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const [showContent, setShowContent] = useState(() => {
    // If already loaded before, show content immediately
    const hasLoadedBefore = sessionStorage.getItem('rns-app-loaded');
    return !!hasLoadedBefore;
  });
  const [currentPath, setCurrentPath] = useState('');
  const [hasInitialized, setHasInitialized] = useState(false);
  const location = useLocation();

  // Initialize current path on first load
  useEffect(() => {
    if (!hasInitialized) {
      setCurrentPath(location.pathname);
      setHasInitialized(true);
    }
  }, [location.pathname, hasInitialized]);

  // Handle initial app loading completion
  const handleInitialLoadingComplete = useCallback(() => {
    setIsInitialLoading(false);
    setShowContent(true);
    // Mark that the app has been loaded in this session
    sessionStorage.setItem('rns-app-loaded', 'true');
  }, []);

  // Handle navigation changes with brain loading
  useEffect(() => {
    if (showContent && hasInitialized && location.pathname !== currentPath) {
      setIsNavigationLoading(true);

      // Show brain loading for 600ms on navigation (shorter than initial load)
      const timer = setTimeout(() => {
        setIsNavigationLoading(false);
        setCurrentPath(location.pathname);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentPath, showContent, hasInitialized]);

  // Get page name for brain loading text
  const getPageLoadingText = () => {
    const path = location.pathname;
    switch (path) {
      case '/about': return 'Loading About...';
      case '/education': return 'Loading Education...';
      case '/skills': return 'Loading Skills...';
      case '/projects': return 'Loading Projects...';
      case '/contact': return 'Loading Contact...';
      case '/certificate': return 'Loading Certificates...';
      case '/internship': return 'Loading Internships...';
      case '/experience': return 'Loading Experience...';
      case '/skillsanime': return 'Loading Skills Animation...';
      case '/chatbot': return 'Loading Chatbot...';
      default: return 'Loading Portfolio...';
    }
  };

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: -30,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: 30,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: "spring",
    stiffness: 130,
    damping: 25,
    duration: 0.5
  };

  // Staggered animation variants
  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const staggerItem = {
    initial: {
      y: 20,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div style={{ cursor: 'none' }}>
      <GlobalCursor />

      {/* Initial RNS Loading Screen - Only on first app load */}
      {isInitialLoading && (
        <LoadingScreen
          isLoading={isInitialLoading}
          onLoadingComplete={handleInitialLoadingComplete}
        />
      )}

      {/* Brain Loading for Navigation - After initial load */}
      <AnimatePresence>
        {isNavigationLoading && showContent && (
          <BrainLoading text={getPageLoadingText()} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={`content-${currentPath}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={isNavigationLoading ? "opacity-0" : "opacity-100"}
          >
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Navbar */}
              <motion.div variants={staggerItem}>
                <Navbar />
              </motion.div>

              {/* Routes */}
              <motion.div variants={staggerItem}>
                <Routes>
                  <Route path="/" element={<Portfolio />} />
                  <Route path="/RNS_Impactfolio" element={<Portfolio />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/certificate" element={<Certificate />} />
                  <Route path="/internship" element={<Internship />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/experience" element={<Experience />} />
                </Routes>
              </motion.div>

              {/* Footer */}
              {location.pathname !== '/chatbot' && (
                <motion.div variants={staggerItem}>
                  <Footer />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;