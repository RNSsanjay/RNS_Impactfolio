import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profileData';
import Chatbot from './Chatbot';

const Certificate = () => {
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

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center text-green-300 mb-12 relative z-10">
        My Certificates
      </h2>

      {/* Certificates Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 relative z-10">
        {profileData.certificates.map((certificate) => (
          <motion.div
            key={certificate.title}
            className="relative bg-green-800/60 rounded-xl p-6 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {/* Certificate Name */}
            <motion.h3
              className="text-2xl font-semibold text-green-300 mb-4 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              {certificate.title}
            </motion.h3>

            {/* Certificate Image on Hover */}
            <motion.div
              className="absolute inset-0 w-full h-full bg-gray-800/80 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: `url(${certificate.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <p className="text-white font-semibold text-lg">View Certificate</p>
            </motion.div>

            {/* Certificate Details */}
            <motion.p
              className="text-green-200 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="font-semibold text-blue-400">Issuer:</span> {certificate.issuer}
            </motion.p>
            <motion.p
              className="text-green-200 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="font-semibold text-blue-400">Date:</span> {certificate.date}
            </motion.p>
            <motion.p
              className="text-green-200 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="font-semibold text-blue-400">Credential ID:</span> {certificate.credential}
            </motion.p>
            <motion.p
              className="text-green-200 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {certificate.description}
            </motion.p>
            <motion.h4
              className="text-lg font-semibold text-green-200 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Skills:
            </motion.h4>
            <ul className="list-disc list-inside text-green-400 text-sm">
              {certificate.skills.map((skill) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9,
                  }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <Chatbot />
    </motion.section>
  );
};

export default Certificate;
