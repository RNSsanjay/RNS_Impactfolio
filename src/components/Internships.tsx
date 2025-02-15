import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import {
  Briefcase,
  Calendar,
  MapPin,
  Globe,
} from 'lucide-react';

const Internships: React.FC = () => {
  const internships = [
    {
      title: 'Software Development Intern',
      company: 'Tech Innovators Inc.',
      location: 'Bangalore, India',
      duration: 'Jun 2022 - Aug 2022',
      description: 'Worked on developing web applications using React and Node.js. Contributed to code reviews and participated in agile development processes.',
    },
    {
      title: 'Data Science Intern',
      company: 'Data Insights Ltd.',
      location: 'Hyderabad, India',
      duration: 'Jan 2023 - Mar 2023',
      description: 'Analyzed large datasets using Python and machine learning algorithms. Created visualizations and reports to present findings to stakeholders.',
    },
    // Add more internships as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-950 to-green-900 py-20 px-4 relative overflow-hidden">
      <Navbar />

      <motion.div className="max-w-6xl mx-auto relative z-10" initial="hidden" animate="visible" variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}>
        <motion.div className="text-center mb-16" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <h1 className="text-5xl font-bold text-green-300 mb-4">Internships</h1>
          <p className="text-green-400 text-lg max-w-2xl mx-auto">
            Explore my journey through various internships where I gained hands-on experience and developed my skills.
          </p>
        </motion.div>

        <div className="space-y-8">
          {internships.map((internship, index) => (
            <motion.div
              key={index}
              className="bg-green-800/10 backdrop-blur-xl rounded-3xl p-8 border border-green-600"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <Briefcase className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-green-300">{internship.title}</h2>
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <MapPin className="w-5 h-5 text-green-400" />
                <p className="text-green-300">{internship.company} - {internship.location}</p>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <Calendar className="w-5 h-5 text-green-400" />
                <p className="text-green-300">{internship.duration}</p>
              </div>
              <p className="text-green-300">{internship.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Chatbot />
    </div>
  );
};

export default Internships;
