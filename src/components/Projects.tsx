import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profileData';

const Projects = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-black relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-green-900 opacity-30"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          background: [
            'linear-gradient(135deg, #10b981, #000000)',
            'linear-gradient(135deg, #000000, #10b981)',
            'linear-gradient(135deg, #10b981, #000000)',
            'linear-gradient(135deg, #000000, #10b981)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-56 h-56 bg-green-400 rounded-full opacity-30"
        animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-48 h-48 bg-green-500 rounded-full opacity-20"
        animate={{ x: [0, -50, 50, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <h2 className="text-4xl font-extrabold text-center text-green-300 mb-12 relative z-10">
        Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-8 px-6 relative z-10">
        {profileData.projects.map((project) => (
          <motion.div
            key={project.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-green-800/60 rounded-xl p-6 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="mt-4">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold text-green-300 mb-2"
              >
                {project.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-green-200 mb-4"
              >
                {project.description}
              </motion.p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="flex space-x-4">
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-green-500 hover:text-green-400 transition-colors"
                  >
                    <span className="material-icons">launch</span> Live Demo
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-green-500 hover:text-green-400 transition-colors"
                  >
                    <span className="material-icons">code</span> Code
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
