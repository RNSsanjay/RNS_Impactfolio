import React from 'react';
import { motion } from 'framer-motion';

const Education: React.FC = () => {
  return (
    <motion.section
      id="education"
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden text-white py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <motion.h1
          className="text-5xl font-extrabold mb-10 text-green-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Education
        </motion.h1>

        <motion.ul
          className="space-y-6 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.li
            className="relative bg-green-800/60 hover:bg-green-700 transition-colors duration-300 p-6 rounded-lg shadow-xl transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-green-300">Bachelor of Engineering in Computer Science</h3>
            <p className="text-sm mt-2 text-green-200">XYZ University (2020-2024)</p>
            <motion.div
              className="absolute inset-0 w-full h-full bg-green-500/60 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: `url('/path/to/your/certificate-image.jpg')`, // Replace with your certificate image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <p className="text-white font-semibold text-lg">View Certificate</p>
            </motion.div>
          </motion.li>

          <motion.li
            className="relative bg-green-800/60 hover:bg-green-700 transition-colors duration-300 p-6 rounded-lg shadow-xl transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-green-300">High School</h3>
            <p className="text-sm mt-2 text-green-200">ABC School (2018-2020)</p>
            <motion.div
              className="absolute inset-0 w-full h-full bg-green-500/60 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: `url('/path/to/your/certificate-image.jpg')`, // Replace with your certificate image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <p className="text-white font-semibold text-lg">View Certificate</p>
            </motion.div>
          </motion.li>
        </motion.ul>
      </div>
    </motion.section>
  );
};

export default Education;
