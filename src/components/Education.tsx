import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, BookOpen, Award, School, Calendar, MapPin, Star, TrendingUp, ChevronRight } from 'lucide-react';

// Enhanced education data with better structure
const educationData = [
  {
    id: 1,
    level: "Bachelor's Degree",
    institution: "SNS College of Technology",
    details: "B.E. in Computer Science (AI & ML)",
    year: "2022 - 2026",
    status: "Final Year",
    grade: "CGPA: 8.20",
    location: "Coimbatore, TN",
    icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
    theme: {
      color: '#10b981', // emerald-500
      gradient: 'from-emerald-500 to-teal-400',
      bgGradient: 'from-emerald-500/10 to-teal-400/10',
      borderGradient: 'from-emerald-500/50 to-teal-400/50',
    },
    highlights: ["AI & Machine Learning", "Computer Science", "Final Year Project"]
  },
  {
    id: 2,
    level: "Senior Secondary (12th)",
    institution: "SRC Memorial Matric Higher Secondary School",
    details: "Science & Mathematics Stream",
    year: "2020 - 2022",
    status: "Completed",
    grade: "Percentage: 80%",
    location: "Erode, TN",
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
    theme: {
      color: '#22c55e', // green-500
      gradient: 'from-green-500 to-emerald-400',
      bgGradient: 'from-green-500/10 to-emerald-400/10',
      borderGradient: 'from-green-500/50 to-emerald-400/50',
    },
    highlights: ["Science Stream", "Mathematics", "College Preparation"]
  },
  {
    id: 3,
    level: "Secondary (10th)",
    institution: "SRC Memorial Matric Higher Secondary School",
    details: "SSLC - Corona Batch",
    year: "2018 - 2020",
    status: "Completed",
    grade: "Percentage: 59.25%",
    location: "Erode, TN",
    icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
    theme: {
      color: '#14b8a6', // teal-500
      gradient: 'from-teal-500 to-cyan-400',
      bgGradient: 'from-teal-500/10 to-cyan-400/10',
      borderGradient: 'from-teal-500/50 to-cyan-400/50',
    },
    highlights: ["SSLC Board", "Foundation Studies", "Academic Growth"]
  },
  {
    id: 4,
    level: "Primary & Middle School",
    institution: "Bannari Amman Public School",
    details: "Foundational Education",
    year: "2008 - 2018",
    status: "Completed",
    grade: null,
    location: "Sathyamangalam, TN",
    icon: <School className="w-5 h-5 sm:w-6 sm:h-6" />,
    theme: {
      color: '#06b6d4', // cyan-500
      gradient: 'from-cyan-500 to-blue-400',
      bgGradient: 'from-cyan-500/10 to-blue-400/10',
      borderGradient: 'from-cyan-500/50 to-blue-400/50',
    },
    highlights: ["Elementary Education", "Character Building", "Academic Foundation"]
  }
];

const Education: React.FC = () => {
  const timelineRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section
      id="education"
      className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-12 sm:py-16 md:py-20 lg:py-32 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      {/* Enhanced Aurora Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0], 
            scale: [1, 1.2, 1], 
            rotate: [0, 90, 0] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          style={{ opacity: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-l from-teal-500 to-cyan-400 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, -75, 0], 
            y: [0, -100, 0], 
            scale: [1, 1.1, 1], 
            rotate: [0, -90, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          style={{ opacity: 0.3 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -50, 0], 
            scale: [1, 1.3, 1] 
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
          style={{ opacity: 0.2 }}
        />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Responsive Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-28"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 mb-4 sm:mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-medium text-emerald-300">Academic Journey</span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-teal-200"
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 200%' }}
          >
            My Education
          </motion.h1>
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A comprehensive timeline of my academic journey, showcasing continuous growth and 
            building expertise in technology and innovation.
          </motion.p>
        </motion.div>

        {/* Fully Responsive Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Mobile Timeline Line (Left Side) */}
          <div className="absolute left-4 sm:left-6 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 rounded-full md:hidden">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 origin-top"
              style={{ scaleY, opacity }}
            />
          </div>

          {/* Desktop Timeline Line (Center) */}
          <div className="hidden md:block absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 transform -translate-x-1/2 rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 origin-top"
              style={{ scaleY, opacity }}
            />
          </div>

          <div className="relative space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24">
            {educationData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const delay = index * 0.2;
              
              return (
                <motion.div
                  key={item.id}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 100, 
                    damping: 25, 
                    delay: delay 
                  }}
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    {/* Mobile Timeline Dot */}
                    <div className="absolute left-4 sm:left-6 top-4 transform -translate-x-1/2 z-20">
                      <motion.div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-3 border-gray-800 bg-gray-900 flex items-center justify-center shadow-xl"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            `0 0 0 0 ${item.theme.color}00`,
                            `0 0 0 8px ${item.theme.color}20`,
                            `0 0 0 0 ${item.theme.color}00`
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: 'easeInOut',
                          delay: delay
                        }}
                      >
                        <div 
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: item.theme.color,
                            color: 'white'
                          }}
                        >
                          {item.icon}
                        </div>
                      </motion.div>
                    </div>

                    {/* Mobile Card */}
                    <div className="pl-12 sm:pl-16">
                      <motion.div
                        className="group relative w-full"
                        whileHover={{ scale: 1.02, y: -2 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {/* Mobile Glow Effect */}
                        <div 
                          className="absolute -inset-1 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"
                          style={{
                            background: `linear-gradient(45deg, ${item.theme.color}40, transparent, ${item.theme.color}40)`,
                            backgroundSize: '200% 200%',
                            animation: 'gradient-move 3s ease infinite'
                          }}
                        />
                        
                        {/* Mobile Card Content */}
                        <div 
                          className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border backdrop-blur-xl"
                          style={{
                            background: `linear-gradient(135deg, ${item.theme.bgGradient})`,
                            borderImage: `linear-gradient(135deg, ${item.theme.borderGradient}) 1`,
                            borderColor: 'transparent'
                          }}
                        >
                          {/* Mobile Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <motion.div
                              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gray-900/60 border border-gray-700 self-start"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div 
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                                style={{ backgroundColor: item.theme.color }}
                              />
                              {item.status}
                            </motion.div>
                            
                            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              {item.year}
                            </div>
                          </div>

                          {/* Mobile Content */}
                          <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div 
                                className="p-2 sm:p-3 rounded-xl shadow-lg flex-shrink-0"
                                style={{ 
                                  background: `linear-gradient(135deg, ${item.theme.gradient})`,
                                  color: 'white'
                                }}
                              >
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 
                                  className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 break-words"
                                  style={{ color: item.theme.color }}
                                >
                                  {item.level}
                                </h3>
                                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-100 mb-1 sm:mb-2 break-words">
                                  {item.institution}
                                </h4>
                              </div>
                            </div>
                            
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                              {item.details}
                            </p>
                            
                            {/* Mobile Highlights */}
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {item.highlights.map((highlight, i) => (
                                <motion.span
                                  key={i}
                                  className="px-2 py-1 text-xs rounded-full bg-gray-800/40 text-gray-300 border border-gray-700"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: delay + i * 0.1 }}
                                >
                                  {highlight}
                                </motion.span>
                              ))}
                            </div>
                            
                            {/* Mobile Grade and Location */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-700/50">
                              {item.grade && (
                                <span 
                                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm border self-start"
                                  style={{ 
                                    backgroundColor: `${item.theme.color}10`,
                                    borderColor: `${item.theme.color}30`,
                                    color: item.theme.color
                                  }}
                                >
                                  <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {item.grade}
                                </span>
                              )}
                              
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                {item.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center">
                    {/* Desktop Timeline Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <motion.div 
                        className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-4 border-gray-800 bg-gray-900 flex items-center justify-center shadow-2xl"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            `0 0 0 0 ${item.theme.color}00`,
                            `0 0 0 15px ${item.theme.color}20`,
                            `0 0 0 0 ${item.theme.color}00`
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: 'easeInOut',
                          delay: delay
                        }}
                      >
                        <div 
                          className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: item.theme.color,
                            color: 'white'
                          }}
                        >
                          {item.icon}
                        </div>
                      </motion.div>
                    </div>

                    {/* Desktop Card Container */}
                    <div className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                      <div className={`w-full max-w-sm lg:max-w-md xl:max-w-lg ${isLeft ? 'pr-8 lg:pr-12 xl:pr-16' : 'pl-8 lg:pl-12 xl:pl-16'}`}>
                        <motion.div
                          className="group relative"
                          whileHover={{ scale: 1.02, y: -5 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          {/* Desktop Glow Effect */}
                          <div 
                            className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"
                            style={{
                              background: `linear-gradient(45deg, ${item.theme.color}40, transparent, ${item.theme.color}40)`,
                              backgroundSize: '200% 200%',
                              animation: 'gradient-move 3s ease infinite'
                            }}
                          />
                          
                          {/* Desktop Direction Arrow */}
                          <div className={`absolute top-8 ${isLeft ? '-right-3' : '-left-3'} z-10`}>
                            <div 
                              className={`w-6 h-6 rotate-45 border-2 border-gray-800 ${isLeft ? 'border-l-transparent border-t-transparent' : 'border-r-transparent border-b-transparent'}`}
                              style={{ 
                                background: `linear-gradient(135deg, ${item.theme.bgGradient})`,
                                backdropFilter: 'blur(10px)'
                              }}
                            />
                          </div>
                          
                          {/* Desktop Card Content */}
                          <div 
                            className="relative rounded-3xl p-6 lg:p-8 shadow-2xl border backdrop-blur-xl"
                            style={{
                              background: `linear-gradient(135deg, ${item.theme.bgGradient})`,
                              borderImage: `linear-gradient(135deg, ${item.theme.borderGradient}) 1`,
                              borderColor: 'transparent'
                            }}
                          >
                            {/* Desktop Header */}
                            <div className="flex items-center justify-between mb-6">
                              <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-900/60 border border-gray-700"
                                whileHover={{ scale: 1.05 }}
                              >
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: item.theme.color }}
                                />
                                {item.status}
                              </motion.div>
                              
                              <div className="text-sm text-gray-400 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {item.year}
                              </div>
                            </div>

                            {/* Desktop Content */}
                            <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div 
                                  className="p-3 rounded-xl shadow-lg"
                                  style={{ 
                                    background: `linear-gradient(135deg, ${item.theme.gradient})`,
                                    color: 'white'
                                  }}
                                >
                                  {item.icon}
                                </div>
                                <div className="flex-1">
                                  <h3 
                                    className="text-xl lg:text-2xl font-bold mb-1"
                                    style={{ color: item.theme.color }}
                                  >
                                    {item.level}
                                  </h3>
                                  <h4 className="text-base lg:text-lg font-semibold text-gray-100 mb-2">
                                    {item.institution}
                                  </h4>
                                </div>
                              </div>
                              
                              <p className="text-gray-300 leading-relaxed">
                                {item.details}
                              </p>
                              
                              {/* Desktop Highlights */}
                              <div className="flex flex-wrap gap-2">
                                {item.highlights.map((highlight, i) => (
                                  <motion.span
                                    key={i}
                                    className="px-3 py-1 text-xs rounded-full bg-gray-800/40 text-gray-300 border border-gray-700"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: delay + i * 0.1 }}
                                  >
                                    {highlight}
                                  </motion.span>
                                ))}
                              </div>
                              
                              {/* Desktop Grade and Location */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                                {item.grade && (
                                  <span 
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm border"
                                    style={{ 
                                      backgroundColor: `${item.theme.color}10`,
                                      borderColor: `${item.theme.color}30`,
                                      color: item.theme.color
                                    }}
                                  >
                                    <Star className="w-4 h-4" />
                                    {item.grade}
                                  </span>
                                )}
                                
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <MapPin className="w-4 h-4" />
                                  {item.location}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      <style >{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </motion.section>
  );
};

export default Education;