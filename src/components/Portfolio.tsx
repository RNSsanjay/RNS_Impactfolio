import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Education from './Education';
import Projects from './Projects';
import Skills from './Skills';
import Certificates from './Certificates';
import Chatbot from './Chatbot';
import Contact from './contact';
import Navbar from './Navbar';
import { profileData } from '../data/profileData';
import {
  Brain,
  Code,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Star,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Youtube,
  Github,
  Linkedin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import About from './About';

const Portfolio = () => {
  // Profile section state
  const navigate = useNavigate();
  return (
    <div>
        <About/>
        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Certificates Section */}
        <Certificates />

        {/* Education Section */}
        <Education />

        {/* Contact Section */}
        <Contact />
    
      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default Portfolio;