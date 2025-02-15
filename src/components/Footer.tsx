import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-green-700 to-green-900 text-white text-center p-6"
    >
      <p>&copy; 2023 Sanjay N. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
