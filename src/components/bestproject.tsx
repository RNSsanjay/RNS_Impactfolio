import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, CheckCircle, Clock, Calendar, Zap, ArrowRight } from 'lucide-react';

const ProjectPresentation = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [playingVideo, setPlayingVideo] = useState(null);
  const [mutedVideos, setMutedVideos] = useState(new Set());

  const projects = [
    {
      id: 1,
      name: "EcoFlow Analytics",
      description: "Advanced environmental data processing platform that combines IoT sensors with machine learning algorithms to provide real-time insights into ecosystem health and carbon footprint optimization.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      status: "Completed",
      timeline: "Q1 2024",
      progress: 100
    },
    {
      id: 2,
      name: "GreenSync Platform",
      description: "Comprehensive sustainability management system that tracks renewable energy usage, waste reduction metrics, and environmental impact across enterprise operations with predictive analytics.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      status: "In Progress",
      timeline: "Q2 2024",
      progress: 75
    },
    {
      id: 3,
      name: "NatureNet Ecosystem",
      description: "Collaborative conservation platform connecting researchers, environmentalists, and communities through blockchain-verified environmental data sharing and impact measurement tools.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      status: "Planning",
      timeline: "Q3 2024",
      progress: 25
    },
    {
      id: 4,
      name: "EcoVault Carbon",
      description: "Next-generation carbon credit marketplace with smart contract automation, transparent verification processes, and AI-powered sustainability scoring for maximum environmental impact.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      status: "Future",
      timeline: "Q4 2024",
      progress: 10
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    projects.forEach(project => {
      const element = document.getElementById(`project-${project.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleVideo = (projectId) => {
    const video = document.getElementById(`video-${projectId}`);
    if (video) {
      if (playingVideo === projectId) {
        video.pause();
        setPlayingVideo(null);
      } else {
        if (playingVideo) {
          const currentVideo = document.getElementById(`video-${playingVideo}`);
          if (currentVideo) currentVideo.pause();
        }
        video.play();
        setPlayingVideo(projectId);
      }
    }
  };

  const toggleMute = (projectId) => {
    const video = document.getElementById(`video-${projectId}`);
    if (video) {
      video.muted = !video.muted;
      setMutedVideos(prev => {
        const newSet = new Set(prev);
        if (video.muted) {
          newSet.add(projectId);
        } else {
          newSet.delete(projectId);
        }
        return newSet;
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'from-emerald-500 to-green-400';
      case 'In Progress': return 'from-green-400 to-lime-400';
      case 'Planning': return 'from-yellow-400 to-green-400';
      case 'Future': return 'from-gray-500 to-gray-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'In Progress': return <Zap className="w-4 h-4" />;
      case 'Planning': return <Calendar className="w-4 h-4" />;
      case 'Future': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-black">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-green-950/30 to-black"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-full blur-3xl animate-float-slow-reverse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-green-400/10 to-lime-400/10 rounded-full blur-3xl animate-float-medium"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-scan-horizontal"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent animate-scan-vertical"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="py-20 text-center">
          <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent mb-6 tracking-tight">
            My Best Projects
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full shadow-lg shadow-green-500/20"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto px-4">
            Innovative solutions driving sustainable technology forward
          </p>
        </div>

        {/* Projects Roadmap */}
        <div className="relative py-12 px-4 max-w-7xl mx-auto">
          {/* Central roadmap line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-emerald-400 to-green-600 transform -translate-x-1/2 hidden lg:block shadow-lg shadow-green-500/20"></div>
          
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = visibleSections.has(`project-${project.id}`);
            
            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className="relative mb-24"
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 top-12 transform -translate-x-1/2 z-20 hidden lg:block">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-4 border-black shadow-lg shadow-green-500/30 animate-pulse-slow"></div>
                    <div className="absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full animate-ping-slow"></div>
                  </div>
                </div>
                
                {/* Project content */}
                <div className={`lg:w-5/12 ${isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}>
                  <div className={`transform transition-all duration-1000 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    
                    {/* Project card */}
                    <div className="relative group">
                      {/* Animated glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 animate-pulse-glow"></div>
                      
                      <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-green-500/20 overflow-hidden hover:border-green-500/40 transition-all duration-500 shadow-2xl shadow-black/50">
                        
                        {/* Status header */}
                        <div className="p-6 pb-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-black/50">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getStatusColor(project.status)} text-black shadow-lg`}>
                              {getStatusIcon(project.status)}
                              <span className="ml-2">{project.status}</span>
                            </div>
                            <span className="text-gray-400 text-sm font-medium bg-gray-800/50 px-3 py-1 rounded-full">{project.timeline}</span>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="relative">
                            <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-1500 ease-out shadow-lg shadow-green-500/30"
                                style={{ width: isVisible ? `${project.progress}%` : '0%' }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-2">
                              <span className="text-xs text-gray-500">Progress</span>
                              <span className="text-xs text-green-400 font-bold">{project.progress}%</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Video section */}
                        <div className="relative group/video">
                          <video
                            id={`video-${project.id}`}
                            className="w-full h-56 object-cover bg-black"
                            muted
                            loop
                            playsInline
                            onEnded={() => setPlayingVideo(null)}
                          >
                            <source src={project.videoUrl} type="video/mp4" />
                          </video>
                          
                          {/* Video overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                              <button
                                onClick={() => toggleVideo(project.id)}
                                className="p-3 bg-black/80 backdrop-blur-sm rounded-full hover:bg-green-900/80 transition-all duration-200 border border-green-500/30 shadow-lg"
                              >
                                {playingVideo === project.id ? 
                                  <Pause className="w-5 h-5 text-green-400" /> : 
                                  <Play className="w-5 h-5 text-green-400" />
                                }
                              </button>
                              
                              <button
                                onClick={() => toggleMute(project.id)}
                                className="p-3 bg-black/80 backdrop-blur-sm rounded-full hover:bg-green-900/80 transition-all duration-200 border border-green-500/30 shadow-lg"
                              >
                                {mutedVideos.has(project.id) ? 
                                  <VolumeX className="w-5 h-5 text-gray-400" /> : 
                                  <Volume2 className="w-5 h-5 text-green-400" />
                                }
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content section */}
                        <div className="p-6 bg-gradient-to-br from-gray-900/30 to-black/30">
                          <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-4">
                            {project.name}
                          </h3>
                          
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {project.description}
                          </p>
                          
                          <div className="flex gap-4">
                            <button className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-200 shadow-lg shadow-green-500/20 flex items-center justify-center group">
                              <span>View Details</span>
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex-1 py-3 border border-green-500/30 text-green-400 rounded-lg font-semibold hover:bg-green-900/20 hover:border-green-500/50 transition-all duration-200">
                              Live Demo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="relative py-20 bg-gradient-to-r from-black via-green-950/20 to-black border-t border-green-500/10">
          <div className="text-center px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mb-8 shadow-lg shadow-green-500/30 animate-pulse-slow">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-6">
              Need More Information about My Projects
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto text-lg">
              Join our mission to create revolutionary sustainable technology solutions
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold hover:from-green-500 hover:to-emerald-500 transition-all duration-200 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transform hover:scale-105">
              Scroll Down to View More ↡
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(30px) rotate(-180deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(90deg); }
        }
        
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.3; }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        
        .animate-scan-horizontal {
          animation: scan-horizontal 8s linear infinite;
        }
        
        .animate-scan-vertical {
          animation: scan-vertical 6s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProjectPresentation;