import React from 'react';
import { motion } from 'framer-motion';
import About from './About';
import Skills from './Skills';

const AboutSkillsTransition: React.FC = () => {
    return (
        <div className="relative">
            {/* About Page - Fixed Background */}
            <div className="relative z-0">
                <About />
            </div>

            {/* Skills Page - Sliding Overlay */}
            <div className="relative z-10">
                <Skills />
            </div>
        </div>
    );
};

export default AboutSkillsTransition;