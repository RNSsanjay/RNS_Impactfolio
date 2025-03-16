import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import './index.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <Router>
      <Navbar/>
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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;