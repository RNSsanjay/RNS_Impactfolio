// src/components/Background.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  // Particle Variants for random movement and opacity
  const particleVariants = {
    animate: (i: number) => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      transition: {
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        delay: i * 0.2,
      },
    }),
  };

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => (
    <motion.div
      key={i}
      custom={i}
      variants={particleVariants}
      animate="animate"
      className="absolute w-2 h-2 rounded-full bg-green-500"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0,
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-green-900 opacity-30"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          background: [
            'linear-gradient(135deg, #000000, #10b981)',
            'linear-gradient(135deg, #10b981, #3b82f6)',
            'linear-gradient(135deg, #3b82f6, #000000)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated Particles */}
      {particles}

      {/* 3D Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    </div>
  );
};

export default Background;
