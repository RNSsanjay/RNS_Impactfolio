import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Calendar, Award, Code, Users, Rocket, Star,
    TrendingUp, ChevronRight, ExternalLink, Briefcase,
    Trophy, Target, Zap, Coffee, Heart, Globe
} from 'lucide-react';

const InternshipExperience = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []); const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
    const observerRef = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.1 }
        );

        return () => observerRef.current?.disconnect();
    }, []);

    const internships = [
        {
            id: 1,
            title: "Full Stack Development Intern",
            company: "TechVision Labs",
            duration: "6 months",
            period: "Jan 2024 - Jun 2024",
            location: "San Francisco, CA",
            description: "Developed responsive web applications using modern frameworks and contributed to microservices architecture.",
            skills: ["React", "Node.js", "MongoDB", "Docker", "AWS"],
            achievements: [
                "Built 5 production-ready features",
                "Reduced API response time by 40%",
                "Collaborated with 12-member team",
                "Mentored 3 junior interns"
            ],
            projects: [
                { name: "E-commerce Dashboard", tech: "React + Redux" },
                { name: "Real-time Chat System", tech: "Socket.io + Node.js" },
                { name: "Payment Integration", tech: "Stripe API" }
            ],
            rating: 4.9,
            recommendation: "Outstanding performance and exceptional problem-solving skills.",
            color: "from-emerald-500 to-green-600"
        },
        {
            id: 2,
            title: "Frontend Development Intern",
            company: "Digital Innovations Hub",
            duration: "4 months",
            period: "Sep 2023 - Dec 2023",
            location: "New York, NY",
            description: "Specialized in creating interactive user interfaces and optimizing web performance for high-traffic applications.",
            skills: ["Vue.js", "TypeScript", "Tailwind CSS", "Figma", "Jest"],
            achievements: [
                "Improved UI performance by 60%",
                "Created 25+ reusable components",
                "Increased user engagement by 45%",
                "Led 2 design sprint sessions"
            ],
            projects: [
                { name: "Component Library", tech: "Vue.js + Storybook" },
                { name: "Analytics Dashboard", tech: "Chart.js + Vue" },
                { name: "Mobile App UI", tech: "React Native" }
            ],
            rating: 4.8,
            recommendation: "Exceptional design sense and technical expertise.",
            color: "from-green-500 to-emerald-600"
        },
        {
            id: 3,
            title: "Backend Development Intern",
            company: "CloudScale Solutions",
            duration: "5 months",
            period: "Mar 2023 - Jul 2023",
            location: "Austin, TX",
            description: "Focused on server-side development, database optimization, and API design for scalable cloud applications.",
            skills: ["Python", "Django", "PostgreSQL", "Redis", "Kubernetes"],
            achievements: [
                "Optimized database queries by 70%",
                "Built 15+ REST APIs",
                "Reduced server costs by 30%",
                "Automated deployment pipeline"
            ],
            projects: [
                { name: "Microservices Architecture", tech: "Python + Docker" },
                { name: "Data Pipeline", tech: "Apache Kafka" },
                { name: "API Gateway", tech: "Kong + Nginx" }
            ],
            rating: 4.7,
            recommendation: "Strong technical foundation and innovative approach.",
            color: "from-green-600 to-emerald-700"
        },
        {
            id: 4,
            title: "DevOps Intern",
            company: "InfraCloud Systems",
            duration: "3 months",
            period: "Nov 2022 - Jan 2023",
            location: "Seattle, WA",
            description: "Worked on CI/CD pipelines, infrastructure automation, and cloud deployment strategies.",
            skills: ["Docker", "Jenkins", "Terraform", "AWS", "Ansible"],
            achievements: [
                "Automated 80% of deployment tasks",
                "Reduced deployment time by 65%",
                "Improved system reliability to 99.9%",
                "Created monitoring dashboards"
            ],
            projects: [
                { name: "CI/CD Pipeline", tech: "Jenkins + Docker" },
                { name: "Infrastructure as Code", tech: "Terraform + AWS" },
                { name: "Monitoring System", tech: "Prometheus + Grafana" }
            ],
            rating: 4.6,
            recommendation: "Excellent understanding of DevOps practices.",
            color: "from-emerald-600 to-green-700"
        }
    ];

    const stats = [
        { icon: <Briefcase className="w-6 h-6" />, value: "4", label: "Internships", color: "text-emerald-400" },
        { icon: <Calendar className="w-6 h-6" />, value: "18", label: "Months", color: "text-green-400" },
        { icon: <Code className="w-6 h-6" />, value: "25+", label: "Projects", color: "text-emerald-400" },
        { icon: <Trophy className="w-6 h-6" />, value: "4.8", label: "Avg Rating", color: "text-green-400" },
        { icon: <Users className="w-6 h-6" />, value: "50+", label: "Colleagues", color: "text-emerald-400" },
        { icon: <Award className="w-6 h-6" />, value: "15+", label: "Skills", color: "text-green-400" }
    ];

    const floatingElements = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10
    }));

    const renderCurvedPath = (index: number, total: number, isMobile = false) => {
        if (isMobile) {
            // Simplified vertical path for mobile
            const startY = 20 + (index * 300);
            const endY = startY + 200;
            return `M 50 ${startY} L 50 ${endY}`;
        }

        const startX = 50;
        const startY = 20 + (index * 250);
        const endX = index % 2 === 0 ? 75 : 25;
        const endY = startY + 180;
        const controlX = index % 2 === 0 ? 85 : 15;
        const controlY = startY + 90;

        return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-emerald-900/20">
                {/* Floating Elements */}
                {floatingElements.map((el) => (
                    <div
                        key={el.id}
                        className="absolute rounded-full bg-emerald-500/10 animate-float"
                        style={{
                            left: `${el.x}%`,
                            top: `${el.y}%`,
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            animationDelay: `${el.delay}s`,
                            animationDuration: `${el.duration}s`
                        }}
                    />
                ))}

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-12 grid-rows-12 h-full">
                        {Array.from({ length: 144 }).map((_, i) => (
                            <div key={i} className="border border-emerald-500/20"></div>
                        ))}
                    </div>
                </div>

                {/* Animated Gradient Orbs */}
                <div
                    className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-3xl animate-pulse"
                    style={{
                        left: `${mousePos.x * 0.02}%`,
                        top: `${mousePos.y * 0.02}%`,
                        transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0001})`
                    }}
                />
                <div
                    className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 blur-2xl animate-pulse"
                    style={{
                        right: `${mousePos.x * 0.01}%`,
                        bottom: `${mousePos.y * 0.01}%`,
                        transform: `translate(50%, 50%) scale(${1 + scrollY * 0.0002})`
                    }}
                />
            </div>

            {/* Hero Section */}
            <div className="relative z-10">
                <div
                    className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                >
                    <div className="inline-block p-3 sm:p-4 bg-emerald-500/20 rounded-full mb-6 sm:mb-8 animate-bounce-slow">
                        <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400 animate-spin-slow" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent animate-text-shimmer">
                        Internship Journey
                    </h1>

                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 animate-fade-in-up px-4">
                        A comprehensive roadmap of my professional growth through diverse internship experiences
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up">
                        <button className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 w-full sm:w-auto">
                            <span className="flex items-center justify-center">
                                Explore Journey
                                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <button className="group border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-400/25 w-full sm:w-auto">
                            <span className="flex items-center justify-center">
                                <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                                View Portfolio
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group bg-gradient-to-br from-gray-900/50 to-emerald-900/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`${stat.color} mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-1 sm:mb-2 group-hover:text-emerald-200 transition-colors">
                                {stat.value}
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Curved Road Timeline */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-20 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent px-4">
                    Professional Timeline
                </h2>

                <div className="relative">
                    {/* SVG Curved Path */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ height: `${internships.length * (isMobile ? 300 : isTablet ? 220 : 250) + 100}px` }}
                    >
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                                <stop offset="50%" stopColor="#059669" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {internships.map((_, index) => (
                            <g key={index}>
                                <path
                                    d={renderCurvedPath(index, internships.length, isMobile)}
                                    stroke="url(#pathGradient)"
                                    strokeWidth={isMobile ? "2" : "3"}
                                    fill="none"
                                    filter="url(#glow)"
                                    className="animate-draw-path"
                                    style={{ animationDelay: `${index * 0.5}s` }}
                                />

                                {/* Animated Dots */}
                                <circle
                                    cx={isMobile ? 50 : (index % 2 === 0 ? 75 : 25)}
                                    cy={20 + (index * (isMobile ? 300 : isTablet ? 220 : 250)) + (isMobile ? 200 : 180)}
                                    r={isMobile ? "6" : "8"}
                                    fill="#10b981"
                                    className="animate-pulse"
                                >
                                    <animate
                                        attributeName="r"
                                        values={isMobile ? "6;10;6" : "8;12;8"}
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </g>
                        ))}
                    </svg>

                    {/* Internship Cards */}
                    <div className={`relative ${isMobile ? 'space-y-20' : 'space-y-32 sm:space-y-40'}`}>
                        {internships.map((internship, index) => (
                            <div
                                key={internship.id}
                                id={`internship-${index}`}
                                className={`flex ${isMobile ? 'justify-center' : (index % 2 === 0 ? 'justify-start' : 'justify-end')}`}
                                ref={(el) => {
                                    if (el && observerRef.current) {
                                        observerRef.current.observe(el);
                                    }
                                }}
                            >                <div
                                className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md lg:max-w-lg'} group cursor-pointer transition-all duration-500 transform hover:scale-105 ${isVisible[`internship-${index}`] ? 'animate-slide-up opacity-100' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                    <div className={`bg-gradient-to-br ${internship.color} p-1 rounded-2xl sm:rounded-3xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300`}>
                                        <div className="bg-black/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                                            {/* Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                                                <div className="mb-4 sm:mb-0">
                                                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-300 mb-2 group-hover:text-emerald-200 transition-colors">
                                                        {internship.title}
                                                    </h3>
                                                    <p className="text-lg sm:text-xl text-gray-300 mb-1">{internship.company}</p>
                                                    <div className="flex items-center text-emerald-400 text-sm">
                                                        <Calendar className="w-4 h-4 mr-2" />
                                                        {internship.period}
                                                    </div>
                                                </div>
                                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                                                    <div className="flex items-center mb-0 sm:mb-2">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="text-yellow-400 ml-1 font-semibold">{internship.rating}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <MapPin className="w-4 h-4 mr-1" />
                                                        <span className="hidden sm:inline">{internship.location}</span>
                                                        <span className="sm:hidden">{internship.location.split(',')[0]}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                                {internship.description}
                                            </p>

                                            {/* Skills */}
                                            <div className="mb-4 sm:mb-6">
                                                <h4 className="text-emerald-300 font-semibold mb-3 flex items-center text-sm sm:text-base">
                                                    <Code className="w-4 h-4 mr-2" />
                                                    Technical Skills
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {internship.skills.map((skill, skillIndex) => (
                                                        <span
                                                            key={skillIndex}
                                                            className="bg-emerald-500/20 text-emerald-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-emerald-500/30 hover:bg-emerald-500/30 transition-all duration-200 animate-fade-in"
                                                            style={{ animationDelay: `${skillIndex * 0.1}s` }}
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Achievements */}
                                            <div className="mb-4 sm:mb-6">
                                                <h4 className="text-emerald-300 font-semibold mb-3 flex items-center text-sm sm:text-base">
                                                    <Target className="w-4 h-4 mr-2" />
                                                    Key Achievements
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {internship.achievements.map((achievement, achIndex) => (
                                                        <div
                                                            key={achIndex}
                                                            className="flex items-start text-gray-300 text-xs sm:text-sm hover:text-emerald-300 transition-colors duration-200"
                                                        >
                                                            <Zap className="w-3 h-3 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                                                            <span>{achievement}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Projects */}
                                            <div className="mb-4 sm:mb-6">
                                                <h4 className="text-emerald-300 font-semibold mb-3 flex items-center text-sm sm:text-base">
                                                    <Briefcase className="w-4 h-4 mr-2" />
                                                    Featured Projects
                                                </h4>
                                                <div className="space-y-2">
                                                    {internship.projects.map((project, projectIndex) => (
                                                        <div
                                                            key={projectIndex}
                                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-900/50 rounded-lg p-3 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-200"
                                                        >
                                                            <span className="text-gray-300 font-medium text-sm sm:text-base mb-1 sm:mb-0">{project.name}</span>
                                                            <span className="text-emerald-400 text-xs sm:text-sm">{project.tech}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Recommendation */}
                                            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-lg p-3 sm:p-4 border border-emerald-500/20 mb-4 sm:mb-6">
                                                <div className="flex items-center mb-2">
                                                    <Heart className="w-4 h-4 text-red-400 mr-2" />
                                                    <span className="text-emerald-300 font-semibold text-sm sm:text-base">Recommendation</span>
                                                </div>
                                                <p className="text-gray-300 text-xs sm:text-sm italic">"{internship.recommendation}"</p>
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex justify-center">
                                                <button className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base">
                                                    <span className="flex items-center">
                                                        View Details
                                                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}          </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black py-16 border-t border-emerald-500/20">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-8">
                        <div className="inline-block p-4 bg-emerald-500/20 rounded-full mb-6 animate-pulse">
                            <Coffee className="w-12 h-12 text-emerald-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-emerald-300 mb-4">Ready for the Next Adventure?</h3>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Each internship has been a stepping stone in my journey. Let's connect and create something amazing together!
                        </p>
                    </div>

                    <div className="flex justify-center space-x-6">
                        <button className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
                            <span className="flex items-center">
                                <TrendingUp className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                                Get In Touch
                            </span>
                        </button>
                        <button className="group border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-400/25">
                            <span className="flex items-center">
                                <Award className="w-5 h-5 mr-2 group-hover:bounce transition-transform" />
                                Download CV
                            </span>
                        </button>
                    </div>        </div>
            </footer>      {/* Custom Styles */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes draw-path {
          0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-draw-path {
          animation: draw-path 2s ease-out;
        }
      `}</style>
        </div>
    );

};

export default InternshipExperience;