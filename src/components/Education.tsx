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
        bg: 'bg-emerald-500',
        text: 'text-emerald-400',
        border: 'border-emerald-400',
        glow: 'shadow-emerald-500/50'
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-400',
        border: 'border-green-400',
        glow: 'shadow-green-500/50'
      },
      teal: {
        bg: 'bg-teal-500',
        text: 'text-teal-400',
        border: 'border-teal-400',
        glow: 'shadow-teal-500/50'
      },
      cyan: {
        bg: 'bg-cyan-500',
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
      className="min-h-screen bg-gradient-to-br from-green-900 via-green-950 to-black relative overflow-hidden text-white py-20 px-6"
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
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h1
            className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-green-400 via-green-300 to-emerald-400 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            EDUCATION
          </motion.h1>
          <motion.p
            className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            A transformative academic journey leading to graduation in 2026
          </motion.p>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-full shadow-lg shadow-green-500/30"></div>

          {/* Education Cards */}
          <div className="space-y-16">
            {educationData.map((item, index) => {
              const colors = getColorClasses(item.color);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${colors.bg} rounded-full border-4 border-gray-900 z-10 shadow-lg ${colors.glow}`}>
                  </div>

                  {/* Content Card */}
                  <div className={`w-5/12 ${isEven ? 'pr-12' : 'pl-12'}`}>
                    <motion.div
                      className="bg-black/60 backdrop-blur-lg border border-green-600/30 rounded-2xl p-8 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 group hover:border-green-500/50"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                          {item.icon}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            {item.year}
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full ${item.status === 'Final Year' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-600/20 text-gray-400'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div>
                        <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
                          {item.level}
                        </h3>
                        <h4 className="text-xl font-semibold text-green-50 mb-2">
                          {item.institution}
                        </h4>
                        {item.organization && (
                          <p className="text-green-200 text-sm mb-3 font-medium">
                            {item.organization}
                          </p>
                        )}
                        {item.grade && (
                          <div className="mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.text} bg-gradient-to-r ${colors.bg}/20 border border-current/30`}>
                              {item.grade}
                            </span>
                          </div>
                        )}
                        <p className="text-green-300 text-sm mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <MapPin className="w-4 h-4" />
                          {item.period}
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                        initial={false}
                      />
                    </motion.div>
                  </div>

                  {/* Year Badge */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${isEven ? '-translate-y-16' : 'translate-y-16'} z-20`}>
                    <div className={`px-4 py-2 bg-black/80 border ${colors.border} rounded-full text-sm font-semibold ${colors.text} shadow-lg backdrop-blur-sm`}>
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
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="text-3xl font-bold text-emerald-400 mb-2">8.20</div>
              <div className="text-gray-400 text-sm">Current CGPA</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">80%</div>
              <div className="text-gray-400 text-sm">12th Grade</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="text-3xl font-bold text-teal-400 mb-2">2026</div>
              <div className="text-gray-400 text-sm">Graduation Year</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <div className="text-3xl font-bold text-cyan-400 mb-2">Corona</div>
              <div className="text-gray-400 text-sm">10th Batch</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;