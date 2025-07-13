import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, School, Calendar, MapPin } from 'lucide-react';

const Education: React.FC = () => {
  const educationData = [
    {
      id: 1,
      level: "Bachelor's Degree",
      institution: "SNS College of Technology",
      organization: "SNS Institution",
      period: "Currently Pursuing",
      status: "Final Year",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Pursuing Bachelor's in Computer Science with specialization in AI & ML, expected graduation 2026. Current CGPA: 8.20",
      color: "emerald",
      year: "2022-2026",
      grade: "CGPA: 8.20"
    },
    {
      id: 2,
      level: "Senior Secondary (12th)",
      institution: "SRC Memorial Matric Higher Secondary School",
      period: "Higher Secondary Education",
      status: "Completed",
      icon: <Award className="w-6 h-6" />,
      description: "Completed higher secondary education with focus on science and mathematics, achieved 80% marks preparing for engineering",
      color: "green",
      year: "2020-2022",
      grade: "80%"
    },
    {
      id: 3,
      level: "Secondary (10th)",
      institution: "SRC Memorial Matric Higher Secondary School",
      period: "Secondary Education - Corona Batch",
      status: "Completed",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Completed secondary education during COVID-19 pandemic with strong foundation in mathematics and science, achieved 59.25%",
      color: "teal",
      year: "2018-2020",
      grade: "59.25%"
    },
    {
      id: 4,
      level: "Primary & Middle School",
      institution: "Bannari Amman Public School",
      period: "Elementary Education",
      status: "Completed",
      icon: <School className="w-6 h-6" />,
      description: "Foundational education covering core subjects and developing academic skills",
      color: "cyan",
      year: "2008-2018"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: {
        text: 'text-emerald-400',
        border: 'border-emerald-400',
        glow: 'shadow-emerald-500/50'
      },
      green: {
       text: 'text-green-400',
        border: 'border-green-400',
        glow: 'shadow-green-500/50'
      },
      teal: {
        text: 'text-teal-400',
        border: 'border-teal-400',
        glow: 'shadow-teal-500/50'
      },
      cyan: {
        text: 'text-cyan-400',
        border: 'border-cyan-400',
        glow: 'shadow-cyan-500/50'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <motion.section
      id="education"
      className="min-h-screen bg-gradient-to-br from-green-900 via-green-950 to-black relative overflow-hidden text-white py-10 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_50%)]"
          animate={{
            background: [
              'radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_50%)',
              'radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.3),transparent_60%)',
              'radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.2),transparent_50%)',
              'radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(5,46,22,0.3),transparent_50%)]"
          animate={{
            background: [
              'radial-gradient(circle_at_80%_20%,rgba(5,46,22,0.3),transparent_50%)',
              'radial-gradient(circle_at_20%_80%,rgba(5,46,22,0.4),transparent_60%)',
              'radial-gradient(circle_at_60%_40%,rgba(5,46,22,0.3),transparent_50%)',
              'radial-gradient(circle_at_80%_20%,rgba(5,46,22,0.3),transparent_50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,83,45,0.2),transparent_50%)]"
          animate={{
            background: [
              'radial-gradient(circle_at_20%_80%,rgba(20,83,45,0.2),transparent_50%)',
              'radial-gradient(circle_at_80%_20%,rgba(20,83,45,0.3),transparent_60%)',
              'radial-gradient(circle_at_50%_50%,rgba(20,83,45,0.2),transparent_50%)',
              'radial-gradient(circle_at_20%_80%,rgba(20,83,45,0.2),transparent_50%)',
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,0,0,0.4),transparent_60%)]"
          animate={{
            background: [
              'radial-gradient(circle_at_60%_40%,rgba(0,0,0,0.4),transparent_60%)',
              'radial-gradient(circle_at_40%_60%,rgba(0,0,0,0.5),transparent_70%)',
              'radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.4),transparent_60%)',
              'radial-gradient(circle_at_60%_40%,rgba(0,0,0,0.4),transparent_60%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-2 border-green-500/40 rotate-45"
        animate={{
          rotate: [45, 405],
          scale: [1, 1.3, 0.8, 1.1, 1],
          x: [0, 30, -20, 10, 0],
          y: [0, -15, 25, -10, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-16 h-16 bg-green-600/30 rounded-full"
        animate={{
          y: [0, -40, 20, -30, 0],
          scale: [1, 1.4, 0.7, 1.2, 1],
          x: [0, -25, 15, -10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-12 h-12 bg-green-700/20 transform rotate-45"
        animate={{
          rotate: [45, 405],
          y: [0, -25, 35, -15, 0],
          scale: [1, 0.6, 1.3, 0.9, 1],
          x: [0, 20, -30, 15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/4 left-1/4 w-8 h-8 bg-green-400/20 rounded-full"
        animate={{
          scale: [1, 1.5, 0.5, 1.2, 1],
          x: [0, 40, -30, 20, 0],
          y: [0, -20, 30, -10, 0],
          opacity: [0.2, 0.6, 0.1, 0.4, 0.2]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-14 h-14 border border-green-500/30 rounded-full"
        animate={{
          scale: [1, 0.7, 1.4, 0.9, 1],
          rotate: [0, 180, 360],
          x: [0, -35, 25, -15, 0],
          y: [0, 20, -25, 15, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-10 h-10 bg-green-600/25 transform rotate-45"
        animate={{
          rotate: [45, 225, 405],
          scale: [1, 1.3, 0.6, 1.1, 1],
          x: [0, 30, -40, 20, 0],
          y: [0, -30, 20, -15, 0]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px', '0px 0px']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Pulsing Rings */}
      <motion.div
        className="absolute top-1/3 left-1/5 w-32 h-32 border border-green-500/20 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.1, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/5 w-24 h-24 border border-green-400/15 rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.15, 0.05, 0.15]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-green-400 via-green-300 to-emerald-400 bg-clip-text text-transparent px-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            EDUCATION
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            A transformative academic journey leading to graduation in 2026
          </motion.p>
          <motion.div
            className="w-16 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto mt-4 sm:mt-6 md:mt-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '30%', maxWidth: '128px' }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on md screens and up */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-full shadow-lg shadow-green-500/30 hidden md:block"></div>

          {/* Mobile Timeline Line - Only visible on small screens */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-1 h-full bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-full shadow-lg shadow-green-500/30 md:hidden"></div>

          {/* Education Cards */}
          <div className="space-y-10 sm:space-y-12 md:space-y-16">
            {educationData.map((item, index) => {
              const colors = getColorClasses(item.color);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  className={`relative flex items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col pl-10 sm:pl-12 md:pl-0`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                >
                  {/* Timeline Dot - Mobile Position */}
                  <div className={`absolute left-4 sm:left-6 md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6  rounded-full border-2 sm:border-3 md:border-4 border-gray-900 z-10 shadow-lg ${colors.glow}`}>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}`}>
                    <motion.div
                      className="bg-black/60 backdrop-blur-lg border border-green-600/30 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 group hover:border-green-500/50"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12   rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg`}>
                          {item.icon}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {item.year}
                          </div>
                          <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${item.status === 'Final Year' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-600/20 text-gray-400'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div>
                        <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text} mb-1 sm:mb-2`}>
                          {item.level}
                        </h3>
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold text-green-50 mb-1 sm:mb-2">
                          {item.institution}
                        </h4>
                        {item.organization && (
                          <p className="text-xs sm:text-sm text-green-200 mb-2 sm:mb-3 font-medium">
                            {item.organization}
                          </p>
                        )}
                        {item.grade && (
                          <div className="mb-2 sm:mb-3">
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${colors.text} bg-gradient-to-r  /20 border border-current/30`}>
                              {item.grade}
                            </span>
                          </div>
                        )}
                        <p className="text-xs sm:text-sm text-green-300 mb-2 sm:mb-3 md:mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1 sm:gap-2 text-green-400 text-xs sm:text-sm">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          {item.period}
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className={`absolute inset-0   opacity-0 group-hover:opacity-5 rounded-lg sm:rounded-xl md:rounded-2xl transition-opacity duration-300`}
                        initial={false}
                      />
                    </motion.div>
                  </div>

                  {/* Year Badge */}
                  <div className={`absolute hidden md:block left-1/2 transform -translate-x-1/2 ${isEven ? '-translate-y-16' : 'translate-y-16'} z-20`}>
                    <div className={`px-3 py-1 sm:px-4 sm:py-2 bg-black/80 border ${colors.border} rounded-full text-xs sm:text-sm font-semibold ${colors.text} shadow-lg backdrop-blur-sm`}>
                      {item.year}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 sm:mt-24 md:mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400 mb-1 sm:mb-2">8.20</div>
              <div className="text-gray-400 text-xs sm:text-sm">Current CGPA</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-1 sm:mb-2">80%</div>
              <div className="text-gray-400 text-xs sm:text-sm">12th Grade</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-400 mb-1 sm:mb-2">2026</div>
              <div className="text-gray-400 text-xs sm:text-sm">Graduation Year</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">Corona</div>
              <div className="text-gray-400 text-xs sm:text-sm">10th Batch</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          /* Make sure floating elements don't cause horizontal overflow */
          .absolute {
            max-width: 80px;
            max-height: 80px;
            opacity: 0.5;
          }
          
          /* Reduce animation intensity on small screens */
          @media (prefers-reduced-motion: no-preference) {
            .animate-float {
              animation-duration: 8s;
            }
          }
        }
        
        /* Make sure timeline works with all screen sizes */
        @media (max-width: 768px) {
          /* Fixed position for timeline on smaller screens */
          .timeline-line {
            left: 15px;
          }
        }
        
        /* Support for very small devices */
        @media (max-width: 350px) {
          .text-xs {
            font-size: 0.65rem;
          }
          .text-sm {
            font-size: 0.75rem;
          }
          .p-3 {
            padding: 0.5rem;
          }
          .gap-3 {
            gap: 0.5rem;
          }
        }
        
        /* Improve landscape mode on mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          .min-h-screen {
            min-height: 130vh;
          }
          .py-10 {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          /* Better touch targets */
          .group:hover {
            transform: none !important;
          }
          
          /* Increase touch area */
          .group {
            min-height: 44px;
          }
          
          /* Disable certain hover effects on touch devices */
          .hover\:shadow-green-500\/20,
          .hover\:border-green-500\/50 {
            transition: none !important;
          }
        }
        
        /* Print styles */
        @media print {
          .min-h-screen {
            min-height: auto;
          }
          .bg-gradient-to-br {
            background: white;
            color: black;
          }
          .text-white,
          .text-green-100,
          .text-green-200,
          .text-green-300,
          .text-gray-400 {
            color: #333 !important;
          }
          .bg-gradient-to-r,
          .text-transparent {
            color: black !important;
            background: none !important;
          }
          .shadow-lg,
          .shadow-2xl,
          .backdrop-blur-lg {
            box-shadow: none !important;
            backdrop-filter: none !important;
          }
          .hidden {
            display: none !important;
          }
          .absolute {
            display: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Education;