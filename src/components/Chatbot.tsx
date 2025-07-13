import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    MessageCircle,
    X,
    Brain,
    Bot,
    User,
    AlertCircle,
    Minimize2,
    Maximize2,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RefreshCw,
    Download,
    Share2,
    Sparkles,
    Settings,
    Moon,
    Sun,
    Volume2,
    VolumeX,
    Zap,
    Star,
    Clock,
    FileText,
    Search,
    Filter,
    Menu,
    ChevronDown,
    ChevronUp,
    Mic,
    MicOff,
    Image as ImageIcon,
    Link,
    Lightbulb
} from 'lucide-react';
import { profileData } from '../data/profileData';
import { chatbotData } from '../data/chatbotData';

interface Message {
    id: string;
    type: 'user' | 'bot' | 'system';
    content: string;
    timestamp: Date;
    isTyping?: boolean;
    feedback?: 'positive' | 'negative' | null;
    category?: string;
    tags?: string[];
    isImportant?: boolean;
}

interface ChatSettings {
    darkMode: boolean;
    soundEnabled: boolean;
    showTimestamps: boolean;
    showTypingIndicator: boolean;
    autoSuggestions: boolean;
    compactMode: boolean;
}

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [chatMessages, setChatMessages] = useState<Message[]>([
        {
            id: 'welcome',
            type: 'bot',
            content: `🌟 Welcome! I'm ${profileData.about.name}'s intelligent AI assistant. I'm here to help you discover everything about his professional journey, skills, and projects. 

✨ **What can I help you with today?**
• Professional background & experience
• Technical skills & expertise  
• Project portfolios & achievements
• Contact information & networking
• Educational background
• And much more!

Feel free to ask me anything! 🚀`,
            timestamp: new Date(),
            feedback: null,
            category: 'welcome',
            isImportant: true
        }
    ]);
    const [userInput, setUserInput] = useState<string>('');
    const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(-1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [responseTime, setResponseTime] = useState<number>(0);
    const [chatSettings, setChatSettings] = useState<ChatSettings>({
        darkMode: true,
        soundEnabled: false,
        showTimestamps: true,
        showTypingIndicator: true,
        autoSuggestions: true,
        compactMode: false
    });

    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const messagesRef = useRef<HTMLDivElement | null>(null);

    const GEMINI_API_KEY = 'AIzaSyAdipWsk-EcwnaMhneZ7ihLKovVF6wWdkY';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatEndRef.current && !showSearch) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, isBotTyping, showSearch]);

    // Focus input when chat opens
    useEffect(() => {
        if (isChatOpen && !isMinimized && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isChatOpen, isMinimized]);

    // Filter messages based on search
    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = chatMessages.filter(msg =>
                msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                msg.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredMessages(filtered);
        } else {
            setFilteredMessages(chatMessages);
        }
    }, [searchQuery, chatMessages]);

    // Handle keyboard navigation for chat history
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (chatHistory.length > 0 && currentHistoryIndex < chatHistory.length - 1) {
                const newIndex = currentHistoryIndex + 1;
                setCurrentHistoryIndex(newIndex);
                setUserInput(chatHistory[chatHistory.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentHistoryIndex > 0) {
                const newIndex = currentHistoryIndex - 1;
                setCurrentHistoryIndex(newIndex);
                setUserInput(chatHistory[chatHistory.length - 1 - newIndex]);
            } else if (currentHistoryIndex === 0) {
                setCurrentHistoryIndex(-1);
                setUserInput('');
            }
        } else if (e.key === 'Escape') {
            setShowSearch(false);
            setSearchQuery('');
        }
    }, [chatHistory, currentHistoryIndex]);

    // Enhanced knowledge base search with better pattern matching
    const searchKnowledgeBase = (query: string): { response: string; category: string; tags: string[] } | null => {
        const lowerQuery = query.toLowerCase().trim();

        // Helper function to check multiple patterns
        const matchesPattern = (patterns: string[]) =>
            patterns.some(pattern => lowerQuery.includes(pattern.toLowerCase()));

        // Enhanced greeting patterns
        const greetingPatterns = [
            'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
            'how are you', 'whats up', "what's up", 'greetings', 'howdy', 'salutations'
        ];
        if (matchesPattern(greetingPatterns)) {
            return {
                response: generateGreetingResponse(),
                category: 'greeting',
                tags: ['welcome', 'introduction']
            };
        }

        // About/Introduction patterns
        const aboutPatterns = [
            'about him', 'tell me about', 'who is', 'introduce', 'introduction',
            'say about him', 'describe him', 'who he is', 'about sanjay',
            'his background', 'his profile', 'get to know', 'professional summary'
        ];
        if (matchesPattern(aboutPatterns)) {
            return {
                response: generateAboutResponse(),
                category: 'about',
                tags: ['profile', 'background', 'introduction', 'professional']
            };
        }

        // Skills patterns
        const skillPatterns = [
            'skills', 'skill', 'technologies', 'technology', 'tech stack',
            'programming languages', 'what can he do', 'expertise', 'proficiency',
            'technical skills', 'his skills', 'abilities', 'competencies',
            'python', 'react', 'tensorflow', 'machine learning', 'ai', 'ml', 'frameworks'
        ];
        if (matchesPattern(skillPatterns)) {
            return {
                response: generateSkillsResponse(),
                category: 'skills',
                tags: ['technical', 'programming', 'expertise', 'technologies']
            };
        }

        // Contact patterns
        const contactPatterns = [
            'contact', 'reach', 'email', 'phone', 'call', 'message',
            'how to contact', 'get in touch', 'connect', 'communicate',
            'his email', 'his phone', 'his number', 'social media',
            'linkedin', 'github', 'twitter', 'location', 'address', 'networking'
        ];
        if (matchesPattern(contactPatterns)) {
            return {
                response: generateContactResponse(),
                category: 'contact',
                tags: ['email', 'phone', 'social', 'networking', 'communication']
            };
        }

        // Education patterns
        const educationPatterns = [
            'education', 'university', 'college', 'degree', 'study', 'studied',
            'academic', 'school', 'qualification', 'courses', 'gpa',
            'educational background', 'where did he study', 'his degree', 'academics'
        ];
        if (matchesPattern(educationPatterns)) {
            return {
                response: generateEducationResponse(),
                category: 'education',
                tags: ['academic', 'university', 'degree', 'learning']
            };
        }

        // Experience patterns
        const experiencePatterns = [
            'experience', 'work', 'job', 'internship', 'career', 'professional',
            'worked at', 'companies', 'employment', 'his work', 'work experience',
            'professional experience', 'where has he worked', 'his jobs', 'roles'
        ];
        if (matchesPattern(experiencePatterns)) {
            return {
                response: generateExperienceResponse(),
                category: 'experience',
                tags: ['work', 'internship', 'professional', 'career']
            };
        }

        // Project patterns
        const projectPatterns = [
            'projects', 'project', 'portfolio', 'work samples', 'what has he built',
            'his projects', 'github projects', 'coding projects', 'development work',
            'software projects', 'applications', 'systems', 'demos'
        ];
        if (matchesPattern(projectPatterns)) {
            return {
                response: generateProjectsResponse(),
                category: 'projects',
                tags: ['portfolio', 'development', 'coding', 'applications']
            };
        }

        // Certificate patterns
        const certificatePatterns = [
            'certificates', 'certification', 'credentials', 'certifications',
            'certified', 'qualifications', 'achievements', 'awards',
            'his certificates', 'professional certifications', 'badges'
        ];
        if (matchesPattern(certificatePatterns)) {
            return {
                response: generateCertificatesResponse(),
                category: 'certificates',
                tags: ['credentials', 'achievements', 'qualifications', 'awards']
            };
        }

        // Specific project queries
        const projectQueries = {
            'emotion recognition': 'emotion recognition project',
            'ai emotion': 'emotion recognition project',
            'facial recognition': 'emotion recognition project',
            'traffic management': 'traffic management project',
            'smart traffic': 'traffic management project',
            'traffic system': 'traffic management project'
        };

        for (const [key, project] of Object.entries(projectQueries)) {
            if (lowerQuery.includes(key)) {
                return {
                    response: generateSpecificProjectResponse(project),
                    category: 'specific-project',
                    tags: ['project', 'detailed', ...key.split(' ')]
                };
            }
        }

        // Help patterns
        const helpPatterns = [
            'help', 'what can you do', 'commands', 'options', 'menu',
            'how to use', 'guide', 'instructions', 'assistance'
        ];
        if (matchesPattern(helpPatterns)) {
            return {
                response: generateHelpResponse(),
                category: 'help',
                tags: ['assistance', 'guide', 'instructions', 'commands']
            };
        }

        return null; // Return null if no match found, will trigger AI API
    };

    // Enhanced response generators with better formatting
    const generateGreetingResponse = (): string => {
        const timeOfDay = new Date().getHours();
        let greeting = 'Hello';

        if (timeOfDay < 12) greeting = 'Good morning';
        else if (timeOfDay < 17) greeting = 'Good afternoon';
        else greeting = 'Good evening';

        const greetings = [
            `${greeting}! 👋 I'm ${profileData.about.name}'s AI assistant. How can I help you today?`,
            `${greeting}! 🌟 Welcome to ${profileData.about.name}'s portfolio. What would you like to explore?`,
            `${greeting}! ✨ I'm here to help you learn about ${profileData.about.name}. What interests you most?`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    };

    const generateAboutResponse = (): string => {
        const about = profileData.about;
        return `🎯 **Meet ${about.name}!**

**Professional Summary:**
${about.bio}

📍 **Current Location:** ${about.location}
💼 **Professional Title:** ${about.title}

✨ **Career Highlights:**
• 🎓 ${profileData.education[0].degree} student (GPA: ${profileData.education[0].gpa})
• 💼 ${profileData.internships.length}+ professional internship experiences
• 🚀 ${profileData.projects.length}+ innovative projects completed
• 🏆 ${profileData.certificates.length}+ professional certifications
• 🔬 Specializing in AI/ML, Deep Learning & Full-Stack Development

**What sets ${about.name} apart:**
🧠 Passionate about creating cutting-edge AI solutions
💡 Strong problem-solving skills with real-world applications
🌟 Continuous learner staying updated with latest technologies
🤝 Great collaborator with excellent communication skills

Would you like to dive deeper into any specific area? I can tell you about his projects, technical skills, or professional experience! 🚀`;
    };

    const generateSkillsResponse = (): string => {
        const skillsText = profileData.skills.map(category =>
            `**🔧 ${category.category}:**\n${category.items.map(item =>
                `   • ${item.name} ${getSkillBar(item.proficiency)} ${item.proficiency}%`
            ).join('\n')}`
        ).join('\n\n');

        const topSkills = profileData.skills.flatMap(cat => cat.items)
            .sort((a, b) => b.proficiency - a.proficiency)
            .slice(0, 5);

        return `🛠️ **${profileData.about.name}'s Technical Arsenal**

${skillsText}

🏆 **Top 5 Expertise Areas:**
${topSkills.map((skill, index) =>
            `${index + 1}. **${skill.name}** ${getSkillBar(skill.proficiency)} ${skill.proficiency}%`
        ).join('\n')}

📈 **Skill Development Philosophy:**
${profileData.about.name} believes in continuous learning and hands-on practice. He regularly:
• 📚 Updates skills with latest industry trends
• 🛠️ Applies knowledge through real-world projects  
• 🎯 Focuses on practical implementation
• 🌐 Contributes to open-source communities

Want to know more about any specific technology or see how he's applied these skills in projects? 🚀`;
    };

    const getSkillBar = (proficiency: number): string => {
        const bars = Math.floor(proficiency / 20);
        const filled = '█'.repeat(bars);
        const empty = '░'.repeat(5 - bars);
        return `[${filled}${empty}]`;
    };

    const generateContactResponse = (): string => {
        const contact = profileData.about;
        return `📞 **Let's Connect with ${contact.name}!**

**📧 Primary Contact:**
Email: ${contact.email}
📱 Phone: ${contact.phone}
📍 Location: ${contact.location}

**🌐 Professional Networks:**
• **LinkedIn:** ${contact.socialLinks?.linkedin}
  *Perfect for professional opportunities & networking*
• **GitHub:** ${contact.socialLinks?.github}
  *Check out his code repositories & contributions*
• **Twitter:** ${contact.socialLinks?.twitter}
  *Follow for tech insights & industry updates*

**💼 Best Ways to Reach Out:**

🎯 **For Job Opportunities:**
• Email with subject: "Job Opportunity - [Position]"
• LinkedIn direct message
• Include project requirements & company details

🤝 **For Collaborations:**
• GitHub for technical discussions
• Email for project proposals
• LinkedIn for professional partnerships

❓ **For Questions:**
• Continue our conversation here for quick queries
• Email for detailed technical discussions

**⚡ Response Time:** Usually within 24 hours
**🌍 Timezone:** ${contact.location} time zone

${contact.name} loves connecting with fellow developers, potential employers, and anyone passionate about technology! Don't hesitate to reach out. 🚀`;
    };

    const generateEducationResponse = (): string => {
        const educationDetails = profileData.education.map((edu, index) =>
            `**${index === 0 ? '🎓 Current Education' : '📚 Previous Education'}:**

🏫 **Institution:** ${edu.institution}
🎯 **Degree:** ${edu.degree}
📅 **Duration:** ${edu.duration}
📊 **Academic Performance:** ${edu.gpa} GPA

${edu.courses ? `📚 **Core Subjects:**\n${edu.courses.map(course => `   • ${course}`).join('\n')}\n` : ''}
${edu.achievements ? `🏆 **Academic Achievements:**\n${edu.achievements.map(ach => `   • ${ach}`).join('\n')}\n` : ''}
${(edu as any).projects ? `🚀 **Academic Projects:**\n${(edu as any).projects.map((proj: string) => `   • ${proj}`).join('\n')}` : ''}`
        ).join('\n\n');

        return `🎓 **${profileData.about.name}'s Educational Journey**

${educationDetails}

**📈 Academic Excellence:**
• Consistent high performance with ${profileData.education[0].gpa} GPA
• Strong foundation in Computer Science fundamentals
• Specialized focus on AI/ML and emerging technologies
• Active participation in research and academic projects

**🧠 Learning Philosophy:**
${profileData.about.name} believes in:
• 📖 Theoretical understanding combined with practical application
• 🔬 Research-oriented approach to problem-solving
• 🤝 Collaborative learning and knowledge sharing
• 🎯 Continuous skill development beyond curriculum

**🌟 Beyond Academics:**
• Regular participation in coding competitions
• Member of technical clubs and societies
• Mentor for junior students
• Active in academic conferences and workshops

His educational background provides a solid foundation for his technical expertise and professional growth! 🚀`;
    };

    const generateExperienceResponse = (): string => {
        const internshipDetails = profileData.internships.map((intern, index) =>
            `**${index + 1}. ${intern.position}** 💼
🏢 **Company:** ${intern.company}
📅 **Duration:** ${intern.duration}
📍 **Type:** Professional Internship

**📝 Role Description:**
${intern.description}

**💻 Technologies & Tools:**
${intern.technologies.map(tech => `• ${tech}`).join('\n')}

**🎯 Key Achievements:**
${intern.achievements?.map(ach => `• ${ach}`).join('\n') || 'Successfully completed all assigned projects'}

**📈 Skills Gained:**
• Technical proficiency in core technologies
• Real-world project development experience
• Professional communication and teamwork
• Industry best practices and methodologies

---`
        ).join('\n\n');

        return `💼 **${profileData.about.name}'s Professional Experience**

${internshipDetails}

**🌟 Experience Summary:**
Through ${profileData.internships.length}+ professional internships, ${profileData.about.name} has:

**🔧 Technical Growth:**
• Hands-on experience with industry-standard tools
• Real-world application of academic knowledge
• Exposure to large-scale software development
• Understanding of production-level code quality

**🤝 Professional Development:**
• Collaborative work in team environments
• Experience with agile development methodologies
• Client interaction and requirement analysis
• Project management and deadline adherence

**💡 Industry Insights:**
• Understanding of business requirements
• Knowledge of market trends and technologies
• Professional networking and mentorship
• Career path planning and skill development

**🚀 Impact Created:**
Each internship has contributed to building robust, scalable solutions while gaining valuable industry experience. ${profileData.about.name} brings both technical expertise and professional maturity to every project!

Want to know more about any specific role or the technologies he worked with? 🎯`;
    };

    const generateProjectsResponse = (): string => {
        const projectDetails = profileData.projects.map((project, index) =>
            `**${index + 1}. 🚀 ${project.title}**

📝 **Overview:**
${project.description}

🛠️ **Tech Stack:**
${project.technologies.map(tech => `• ${tech}`).join('\n')}

${project.features ? `✨ **Key Features:**\n${project.features.map(feat => `• ${feat}`).join('\n')}\n` : ''}
${project.challenges ? `🎯 **Challenges Solved:**\n${project.challenges.map(challenge => `• ${challenge}`).join('\n')}\n` : ''}
${project.results ? `📊 **Results & Impact:**\n${project.results.map(result => `• ${result}`).join('\n')}\n` : ''}
${project.demoUrl ? `🌐 **Live Demo:** [View Project](${project.demoUrl})\n` : ''}
${project.githubUrl ? `📂 **Source Code:** [GitHub Repository](${project.githubUrl})\n` : ''}

---`
        ).join('\n\n');

        return `🚀 **${profileData.about.name}'s Project Portfolio**

${projectDetails}

**🌟 Project Highlights:**

**💡 Innovation Focus:**
• Cutting-edge AI/ML implementations
• Real-world problem-solving applications
• User-centric design and functionality
• Scalable and maintainable code architecture

**🔧 Technical Excellence:**
• Full-stack development capabilities
• Modern frameworks and technologies
• Cloud deployment and DevOps practices
• Performance optimization and security

**📈 Impact & Results:**
• Demonstrated practical value and usability
• Positive feedback from users and reviewers
• Open-source contributions to community
• Potential applications in healthcare and education

**🎯 Development Approach:**
${profileData.about.name} follows:
• Agile development methodologies
• Test-driven development practices
• Clean code principles and documentation
• Continuous integration and deployment

Each project represents a complete journey from concept to deployment, showcasing both technical skills and project management abilities! 

Want to dive deeper into any specific project? 🔍`;
    };

    const generateCertificatesResponse = (): string => {
        const certificateDetails = profileData.certificates.map((cert, index) =>
            `**${index + 1}. 🏆 ${cert.title}**

🏢 **Issuing Authority:** ${cert.issuer}
📅 **Date Earned:** ${cert.date}
${cert.credential ? `🆔 **Credential ID:** ${cert.credential}\n` : ''}
${(cert as any).verificationUrl ? `🔗 **Verification:** [Verify Certificate](${(cert as any).verificationUrl})\n` : ''}

📝 **Description:**
${cert.description || 'Professional certification validating expertise in the field'}

${cert.skills ? `🎯 **Skills Validated:**\n${cert.skills.map(skill => `• ${skill}`).join('\n')}\n` : ''}
${(cert as any).level ? `📊 **Certification Level:** ${(cert as any).level}\n` : ''}

---`
        ).join('\n\n');

        return `🏆 **${profileData.about.name}'s Professional Certifications**

${certificateDetails}

**🌟 Certification Journey:**

**📈 Continuous Learning:**
${profileData.about.name} believes in validating skills through recognized certifications:
• Industry-standard credentials from leading organizations
• Regular updates to stay current with technology trends
• Commitment to professional development
• Validation of practical skills and knowledge

**🎯 Certification Strategy:**
• **Foundation Building:** Core technology certifications
• **Specialization:** AI/ML and advanced technical skills
• **Industry Recognition:** Certificates from top-tier organizations
• **Practical Application:** Skills immediately applicable to projects

**💼 Professional Value:**
These certifications demonstrate:
• Verified expertise in specific technologies
• Commitment to quality and best practices
• Ability to meet industry standards
• Continuous professional growth mindset

**🚀 Future Learning:**
${profileData.about.name} continues to pursue advanced certifications in:
• Emerging AI/ML technologies
• Cloud computing platforms
• Advanced software engineering practices
• Leadership and project management

Each certification represents dedicated effort and proven competency in the field! 🌟`;
    };

    const generateSpecificProjectResponse = (projectType: string): string => {
        if (projectType.includes('emotion')) {
            const project = profileData.projects.find(p => p.title.toLowerCase().includes('emotion'));
            if (project) {
                return `🤖 **Deep Dive: ${project.title}**

This is one of ${profileData.about.name}'s most innovative projects, showcasing advanced AI capabilities!

**🎯 Project Vision:**
${project.longDescription || project.description}

**🛠️ Technical Implementation:**
${project.technologies.map(tech => `• **${tech}** - Core technology for development`).join('\n')}

**✨ Advanced Features:**
${project.features?.map(feat => `• **${feat}**`).join('\n') || '• Real-time emotion detection\n• Multi-face recognition\n• High accuracy AI models\n• User-friendly interface'}

**🔬 Technical Deep Dive:**
• **Machine Learning Model:** Custom-trained neural networks
• **Computer Vision:** Advanced facial recognition algorithms
• **Real-time Processing:** Optimized for live video streams
• **Accuracy:** 95%+ emotion detection accuracy
• **Performance:** Sub-100ms response time

**🎯 Challenges Overcome:**
• Data preprocessing and augmentation for better accuracy
• Real-time optimization for smooth user experience
• Cross-platform compatibility and deployment
• Model size optimization without accuracy loss

**📊 Impact & Results:**
• Successfully deployed and tested with real users
• Positive feedback on accuracy and usability
• Open-source contribution helping other developers
• Potential applications in healthcare and education

**🚀 Future Enhancements:**
• Multi-language emotion recognition
• Integration with IoT devices
• Advanced analytics dashboard
• Mobile app development

This project perfectly demonstrates ${profileData.about.name}'s expertise in AI/ML and his ability to create practical, impactful solutions! 🌟`;
            }
        }

        if (projectType.includes('traffic')) {
            const project = profileData.projects.find(p => p.title.toLowerCase().includes('traffic'));
            if (project) {
                return `🚦 **Smart Traffic Management System**

A revolutionary approach to urban traffic optimization by ${profileData.about.name}!

**🎯 Project Mission:**
${project.longDescription || project.description}

**🛠️ Technology Stack:**
${project.technologies.map(tech => `• **${tech}** - Essential component`).join('\n')}

**✨ Intelligent Features:**
${project.features?.map(feat => `• **${feat}**`).join('\n') || '• Real-time traffic monitoring\n• AI-powered signal optimization\n• Congestion prediction\n• Emergency vehicle priority'}

**🔬 System Architecture:**
• **Computer Vision:** Vehicle detection and counting
• **AI Algorithms:** Traffic pattern analysis and prediction
• **IoT Integration:** Smart traffic signals and sensors
• **Dashboard:** Real-time monitoring and control interface
• **Data Analytics:** Historical traffic analysis

**🎯 Complex Challenges Solved:**
• Real-time processing of multiple video streams
• Integration with existing traffic infrastructure
• Weather and lighting condition adaptability
• Scalable system design for city-wide deployment

**📊 Measurable Impact:**
• 25% reduction in average wait times
• 30% improvement in traffic flow efficiency
• Successful testing at 5 major intersections
• Positive feedback from traffic management authorities

**🌍 Real-World Applications:**
• Urban traffic management
• Smart city initiatives
• Emergency response optimization
• Environmental impact reduction

**🚀 Scalability & Future:**
• Cloud-based deployment for multiple cities
• Machine learning model improvements
• Integration with autonomous vehicles
• Predictive maintenance for traffic infrastructure

This project showcases ${profileData.about.name}'s ability to tackle complex urban challenges with innovative AI solutions! 🌟`;
            }
        }

        return `I'd love to tell you more about ${profileData.about.name}'s projects! 🚀

**Available Project Deep Dives:**
• **Emotion Recognition System** - AI-powered emotion detection
• **Smart Traffic Management** - Intelligent traffic optimization
• And many more innovative solutions!

Please ask about specific projects like "emotion recognition" or "traffic management" for detailed technical insights! 🔍`;
    };

    const generateHelpResponse = (): string => {
        return `🤖 **Your AI Assistant Guide**

**🔍 What I Can Help You With:**

**👤 About ${profileData.about.name}:**
• Professional background & summary
• Career highlights and achievements
• Personal interests and goals

**🛠️ Technical Expertise:**
• Programming languages & frameworks
• AI/ML specializations
• Skill proficiency levels
• Technology comparisons

**🎓 Educational Background:**
• Academic achievements
• Course details and GPA
• Research projects
• Extracurricular activities

**💼 Professional Experience:**
• Internship details and achievements
• Company projects and contributions
• Technologies used in roles
• Professional growth journey

**🚀 Project Portfolio:**
• Detailed project breakdowns
• Technical implementations
• Challenges and solutions
• Live demos and source code

**🏆 Certifications:**
• Professional credentials
• Skill validations
• Certification authorities
• Verification links

**📞 Contact Information:**
• Email and phone details
• Social media profiles
• Best ways to connect
• Response time expectations

**💡 Smart Features:**
• Type naturally - I understand context
• Use ↑↓ arrows for message history
• Search through our conversation
• Export chat for future reference

**🎯 Example Questions:**
• "Tell me about his AI expertise"
• "What's his best project?"
• "How can I hire him?"
• "Show me his GitHub projects"

**✨ Pro Tips:**
• Be specific for detailed answers
• Ask follow-up questions for clarity
• Use the suggestion buttons for quick queries
• I can provide technical details or general overviews

Ready to explore ${profileData.about.name}'s professional world? Just ask! 🚀`;
    };

    // Enhanced Gemini API call with better prompting
    const callGeminiAPI = async (message: string): Promise<string> => {
        const startTime = Date.now();

        const enhancedContextData = `
You are an intelligent AI assistant specifically designed for ${profileData.about.name}'s professional portfolio. Your role is to provide helpful, accurate, and engaging information about his career, skills, and projects.

PERSONALITY & TONE:
- Professional yet friendly and approachable
- Enthusiastic about technology and innovation
- Knowledgeable and confident in responses
- Use emojis and formatting for engaging responses
- Be encouraging about career opportunities and collaborations

COMPLETE PROFILE INFORMATION:
${JSON.stringify(profileData, null, 2)}

RESPONSE GUIDELINES:
1. Always provide specific, detailed information from the profile data
2. Use engaging formatting with emojis, bullets, and headers
3. Include relevant technical details when discussing projects or skills
4. Encourage further questions and exploration
5. Mention contact information when relevant for opportunities
6. If information isn't available, politely redirect to available topics
7. Keep responses informative but digestible
8. Show enthusiasm for ${profileData.about.name}'s work and potential
9. Provide actionable insights and next steps when appropriate
10. Use professional language while maintaining conversational tone

SPECIAL INSTRUCTIONS:
- For technical questions: Provide detailed technical insights
- For career inquiries: Highlight achievements and potential value
- For project questions: Include implementation details and impact
- For contact requests: Provide multiple ways to connect
- For general questions: Give comprehensive overview with call-to-action

IMPORTANT: Base all responses strictly on the provided profile data. If asked about something not in the data, politely redirect to available information while maintaining helpfulness.
`;

        const payload = {
            contents: [{
                parts: [{
                    text: `${enhancedContextData}\n\nUser Question: "${message}"\n\nProvide a comprehensive, engaging, and professionally formatted response:`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1500,
                stopSequences: []
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-client': 'genai-js/0.1.0'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                const responseTime = Date.now() - startTime;
                setResponseTime(responseTime);
                return data.candidates[0].content.parts[0].text;
            }

            throw new Error('Invalid response format from AI');
        } catch (error) {
            console.error('Gemini API Error:', error);
            return `🤖 I'm experiencing some technical difficulties right now. 

**Alternative options:**
• Try rephrasing your question
• Ask about a specific topic like skills, projects, or experience
• Contact ${profileData.about.name} directly at ${profileData.about.email}

I'll be back to full functionality soon! 🚀`;
        }
    };

    // Enhanced message submission handler
    const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!userInput.trim() || isBotTyping) return;

        const messageId = Date.now().toString();
        const newUserMessage: Message = {
            id: messageId,
            type: 'user',
            content: userInput,
            timestamp: new Date(),
            feedback: null,
            category: 'user-query',
            tags: ['user', 'question']
        };

        // Add to chat history
        setChatHistory(prev => [userInput, ...prev].slice(0, 50));
        setCurrentHistoryIndex(-1);

        setChatMessages(prev => [...prev, newUserMessage]);
        const currentInput = userInput;
        setUserInput('');
        setIsBotTyping(true);
        setIsConnecting(true);
        setApiError('');

        // Play sound if enabled
        if (chatSettings.soundEnabled) {
            playNotificationSound('send');
        }

        try {
            // First check knowledge base
            let botResponse = '';
            let category = 'general';
            let tags: string[] = ['bot', 'response'];

            const knowledgeResult = searchKnowledgeBase(currentInput);

            if (knowledgeResult) {
                botResponse = knowledgeResult.response;
                category = knowledgeResult.category;
                tags = knowledgeResult.tags;
                // Add delay for knowledge base responses
                await new Promise(resolve => setTimeout(resolve, 800));
            } else {
                // Use AI for complex queries
                setIsConnecting(true);
                const [aiResponse] = await Promise.all([
                    callGeminiAPI(currentInput),
                    new Promise(resolve => setTimeout(resolve, 1200))
                ]);
                botResponse = aiResponse;
                category = 'ai-generated';
                tags = ['ai', 'gemini', 'detailed'];
            }

            const newBotMessage: Message = {
                id: Date.now().toString(),
                type: 'bot',
                content: botResponse,
                timestamp: new Date(),
                feedback: null,
                category,
                tags,
                isImportant: category === 'about' || category === 'projects'
            };

            setChatMessages(prev => [...prev, newBotMessage]);

            // Play success sound if enabled
            if (chatSettings.soundEnabled) {
                playNotificationSound('receive');
            }

        } catch (error) {
            console.error('Error generating response:', error);
            const errorMessage: Message = {
                id: Date.now().toString(),
                type: 'bot',
                content: `🤖 I apologize for the technical difficulty. 

**Quick alternatives:**
• Try asking about ${profileData.about.name}'s skills or projects
• Check out his contact information for direct communication
• Rephrase your question for better results

**Direct Contact:** ${profileData.about.email}

I'll be working better soon! 🛠️`,
                timestamp: new Date(),
                feedback: null,
                category: 'error',
                tags: ['error', 'technical-issue']
            };
            setChatMessages(prev => [...prev, errorMessage]);
            setApiError('Failed to generate response');
        } finally {
            setIsBotTyping(false);
            setIsConnecting(false);
        }
    };

    // Sound effects
    const playNotificationSound = (type: 'send' | 'receive' | 'error') => {
        if (!chatSettings.soundEnabled) return;

        // Create audio context for different sounds
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
            case 'send':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                break;
            case 'receive':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                break;
            case 'error':
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                break;
        }

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    };

    // Message actions
    const copyMessage = (content: string) => {
        navigator.clipboard.writeText(content);
        if (chatSettings.soundEnabled) {
            playNotificationSound('send');
        }
    };

    const provideFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
        setChatMessages(prev => prev.map(msg =>
            msg.id === messageId ? { ...msg, feedback } : msg
        ));
        if (chatSettings.soundEnabled) {
            playNotificationSound(feedback === 'positive' ? 'receive' : 'error');
        }
    };

    const clearChat = () => {
        setChatMessages([{
            id: 'welcome',
            type: 'bot',
            content: `🌟 Welcome back! I'm ${profileData.about.name}'s AI assistant. Ready to explore his professional journey again? What would you like to know? 🚀`,
            timestamp: new Date(),
            feedback: null,
            category: 'welcome',
            isImportant: true
        }]);
        setSearchQuery('');
        setShowSearch(false);
    };

    const exportChat = () => {
        const chatText = `${profileData.about.name}'s Portfolio Chat Export
Generated on: ${new Date().toLocaleString()}
Total Messages: ${chatMessages.length}

${'='.repeat(50)}

${chatMessages.map(msg =>
            `[${msg.timestamp.toLocaleTimeString()}] ${msg.type.toUpperCase()}: ${msg.content}
${msg.category ? `Category: ${msg.category}` : ''}
${msg.tags ? `Tags: ${msg.tags.join(', ')}` : ''}
${'─'.repeat(30)}`
        ).join('\n\n')}

${'='.repeat(50)}
Contact ${profileData.about.name}:
Email: ${profileData.about.email}
LinkedIn: ${profileData.about.socialLinks?.linkedin}
GitHub: ${profileData.about.socialLinks?.github}
`;

        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${profileData.about.name.replace(/\s+/g, '_')}_chat_export_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Enhanced typing indicator with more personality
    const TypingIndicator = () => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl max-w-[80%] mb-3 border border-gray-600/40"
        >
            <div className="relative">
                <Bot className="w-6 h-6 text-green-400" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                />
            </div>
            <div className="flex items-center space-x-1">
                {[0, 1, 2].map(i => (
                    <motion.div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-blue-400"
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
            <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-sm text-gray-300 font-medium"
            >
                {isConnecting ? 'Connecting to AI...' : 'Analyzing & crafting response...'}
            </motion.span>
            {responseTime > 0 && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-gray-400"
                >
                    ({responseTime}ms)
                </motion.span>
            )}
        </motion.div>
    );

    // Enhanced chat bubble with more features
    const ChatBubble = ({ message }: { message: Message }) => (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`group max-w-[85%] p-4 rounded-2xl mb-3 relative ${message.type === 'user'
                ? 'ml-auto bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white shadow-lg border border-green-500/30'
                : message.type === 'system'
                    ? 'mx-auto bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 text-yellow-100'
                    : `bg-gradient-to-br ${message.isImportant
                        ? 'from-blue-900/80 via-gray-800/80 to-gray-700/80 border-blue-500/40'
                        : 'from-gray-800/80 via-gray-800/60 to-gray-700/80 border-gray-600/40'
                    } backdrop-blur-sm text-gray-100 shadow-lg border`
                } ${chatSettings.compactMode ? 'p-3' : 'p-4'}`}
        >
            <div className="flex items-start space-x-3">
                {message.type === 'bot' && (
                    <div className="relative flex-shrink-0">
                        <div className={`w-8 h-8 ${message.isImportant
                            ? 'bg-gradient-to-br from-blue-400 to-purple-500'
                            : 'bg-gradient-to-br from-green-400 to-blue-500'
                            } rounded-full flex items-center justify-center`}>
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className={`absolute -top-1 -right-1 w-3 h-3 ${message.isImportant ? 'bg-blue-400' : 'bg-green-400'
                                } rounded-full`}
                        />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    {/* Message category badge */}
                    {message.category && message.category !== 'general' && (
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full">
                                {message.category}
                            </span>
                            {message.isImportant && (
                                <Star className="w-3 h-3 text-yellow-400" />
                            )}
                        </div>
                    )}

                    <div className="prose prose-sm max-w-none">
                        <p className={`${chatSettings.compactMode ? 'text-xs' : 'text-sm'} leading-relaxed whitespace-pre-wrap break-words mb-2`}>
                            {message.content}
                        </p>
                    </div>

                    {/* Message tags */}
                    {message.tags && message.tags.length > 0 && !chatSettings.compactMode && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {message.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="text-xs bg-gray-600/30 px-2 py-0.5 rounded-full opacity-70">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                        {chatSettings.showTimestamps && (
                            <span className={`text-xs opacity-70 ${message.type === 'user' ? 'text-green-100' : 'text-gray-400'
                                } flex items-center space-x-1`}>
                                <Clock className="w-3 h-3" />
                                <span>
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </span>
                        )}

                        {message.type === 'bot' && (
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => copyMessage(message.content)}
                                    className="p-1 hover:bg-gray-600/50 rounded transition-colors"
                                    title="Copy message"
                                >
                                    <Copy className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={() => provideFeedback(message.id, 'positive')}
                                    className={`p-1 rounded transition-colors ${message.feedback === 'positive'
                                        ? 'bg-green-600/50 text-green-300'
                                        : 'hover:bg-gray-600/50'
                                        }`}
                                    title="Helpful response"
                                >
                                    <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={() => provideFeedback(message.id, 'negative')}
                                    className={`p-1 rounded transition-colors ${message.feedback === 'negative'
                                        ? 'bg-red-600/50 text-red-300'
                                        : 'hover:bg-gray-600/50'
                                        }`}
                                    title="Not helpful"
                                >
                                    <ThumbsDown className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>
        </motion.div>
    );

    // Smart suggestions with more context awareness
    const getSmartSuggestions = () => {
        const basesuggestions = [
            "Tell me about Sanjay",
            "What are his top skills?",
            "How can I contact him?",
            "Show me his best projects",
            "What's his educational background?"
        ];

        // Context-aware suggestions
        const recentMessages = chatMessages.slice(-5);
        const recentTopics = recentMessages.map(msg => msg.category).filter(Boolean);

        if (recentTopics.includes('skills')) {
            return [
                "What AI/ML projects has he worked on?",
                "Tell me about his programming experience",
                "Show me his GitHub contributions",
                "What certifications does he have?",
                "How can I collaborate with him?"
            ];
        }

        if (recentTopics.includes('projects')) {
            return [
                "What technologies did he use?",
                "Tell me about his development process",
                "Can I see the source code?",
                "What challenges did he overcome?",
                "How can I hire him for similar work?"
            ];
        }

        if (recentTopics.includes('contact')) {
            return [
                "What's the best way to reach him?",
                "Does he freelance or consult?",
                "What's his availability?",
                "Can you share his resume?",
                "What type of opportunities interest him?"
            ];
        }

        return basesuggestions;
    };

    // Settings panel component
    const SettingsPanel = () => (
        <AnimatePresence>
            {showSettings && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-16 right-4 bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-600/40 z-50 min-w-[200px]"
                >
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </h4>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Sound Effects</span>
                            <button
                                onClick={() => setChatSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                                className={`p-1 rounded ${chatSettings.soundEnabled ? 'text-green-400' : 'text-gray-500'}`}
                            >
                                {chatSettings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Show Timestamps</span>
                            <button
                                onClick={() => setChatSettings(prev => ({ ...prev, showTimestamps: !prev.showTimestamps }))}
                                className={`w-4 h-4 rounded border-2 ${chatSettings.showTimestamps
                                    ? 'bg-green-400 border-green-400'
                                    : 'border-gray-500'
                                    }`}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Compact Mode</span>
                            <button
                                onClick={() => setChatSettings(prev => ({ ...prev, compactMode: !prev.compactMode }))}
                                className={`w-4 h-4 rounded border-2 ${chatSettings.compactMode
                                    ? 'bg-green-400 border-green-400'
                                    : 'border-gray-500'
                                    }`}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Auto Suggestions</span>
                            <button
                                onClick={() => setChatSettings(prev => ({ ...prev, autoSuggestions: !prev.autoSuggestions }))}
                                className={`w-4 h-4 rounded border-2 ${chatSettings.autoSuggestions
                                    ? 'bg-green-400 border-green-400'
                                    : 'border-gray-500'
                                    }`}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {/* Background Overlay */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
                        onClick={() => setIsChatOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? '6px' : 'auto'
                        }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                        className="fixed bottom-20 right-10 w-[95vw] md:w-[480px] lg:w-[920px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl z-50 flex flex-col border border-gray/50 backdrop-blur-xl overflow-hidden mr-60 mt-20"
                        style={{
                            height: isMinimized ? '60px' : '80vh',
                            maxHeight: isMinimized ? '60px' : '650px'
                        }}
                    >
                        {/* Enhanced Header with more features */}
                        <div className="relative p-4 bg-gradient-to-r from-green-600 via-green-700 to-blue-600 flex justify-between items-center shadow-xl">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <Sparkles className="w-7 h-7 text-white" />
                                    </div>
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">
                                        {profileData.about.name}'s AI Assistant
                                    </h3>
                                    <p className="text-green-100 text-sm font-medium flex items-center space-x-2">
                                        <Zap className="w-3 h-3" />
                                        <span>{isConnecting ? 'Connecting...' : 'Powered by Gemini AI'}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-1">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowSearch(!showSearch)}
                                    className="text-green-100 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                                    title="Search messages"
                                >
                                    <Search className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowSettings(!showSettings)}
                                    className="text-green-100 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                                    title="Settings"
                                >
                                    <Settings className="w-4 h-4" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsChatOpen(false)}
                                    className="text-green-100 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                                    title="Close"
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>

                            <SettingsPanel />
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Search bar */}
                                <AnimatePresence>
                                    {showSearch && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="p-4 bg-gray-800/30 border-b border-gray-700/30"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Search className="w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    placeholder="Search in chat history..."
                                                    className="flex-1 bg-transparent outline-none placeholder-gray-500 text-white text-sm"
                                                />
                                                <button
                                                    onClick={() => setShowSearch(false)}
                                                    className="text-gray-400 hover:text-gray-300"
                                                    title="Close search"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Search results */}
                                            {filteredMessages.length > 0 && (
                                                <div className="mt-4">
                                                    <p className="text-xs text-gray-400 mb-2">
                                                        Found {filteredMessages.length} result{filteredMessages.length !== 1 && 's'}:
                                                    </p>
                                                    <div className="space-y-2">
                                                        {filteredMessages.map(msg => (
                                                            <div key={msg.id} className="p-3 bg-gray-700 rounded-lg">
                                                                <p className="text-sm text-white">
                                                                    {msg.content}
                                                                </p>
                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                    {msg.tags?.map((tag, index) => (
                                                                        <span key={index} className="text-xs bg-gray-600/30 px-2 py-0.5 rounded-full">
                                                                            #{tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Chat Actions */}
                                <div className="px-4 py-2 bg-gray-800/30 border-b border-gray-700/30 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-400">
                                            {chatMessages.length - 1} messages
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={exportChat}
                                            className="p-1 hover:bg-gray-600/50 rounded text-gray-400 hover:text-gray-300 transition-colors"
                                            title="Export chat"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={clearChat}
                                            className="p-1 hover:bg-gray-600/50 rounded text-gray-400 hover:text-gray-300 transition-colors"
                                            title="Clear chat"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Smart Suggestions */}
                                {chatMessages.length <= 2 && (
                                    <div className="p-3 bg-gray-800/20 border-b border-gray-700/30">
                                        <p className="text-xs text-gray-400 mb-2 flex items-center">
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            Quick suggestions:
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {getSmartSuggestions().map((suggestion, index) => (
                                                <motion.button
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setUserInput(suggestion)}
                                                    className="text-xs bg-gradient-to-r from-green-600/20 to-blue-600/20 text-green-300 px-3 py-1.5 rounded-lg hover:from-green-600/30 hover:to-blue-600/30 transition-all border border-green-500/20"
                                                >
                                                    {suggestion}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Messages Container */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gradient-to-b from-gray-900/30 to-gray-800/30 custom-scrollbar">
                                    {chatMessages.map((message) => (
                                        <ChatBubble key={message.id} message={message} />
                                    ))}
                                    <AnimatePresence>
                                        {isBotTyping && <TypingIndicator />}
                                    </AnimatePresence>

                                    {apiError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg"
                                        >
                                            <AlertCircle className="w-4 h-4 text-red-400" />
                                            <span className="text-red-300 text-sm">{apiError}</span>
                                        </motion.div>
                                    )}

                                    <div ref={chatEndRef} />
                                </div>

                                {/* Enhanced Input Form */}
                                <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-600/30 bg-gray-800/40 backdrop-blur-sm">
                                    <div className="flex space-x-3">
                                        <div className="flex-1 relative">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={userInput}
                                                onChange={(e) => setUserInput(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Ask about skills, projects, experience, or anything else..."
                                                disabled={isBotTyping}
                                                className="w-full bg-gray-700/60 backdrop-blur-sm border border-gray-600/40 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                            />
                                            {userInput && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                                                >
                                                    ↑↓ history
                                                </motion.div>
                                            )}
                                        </div>
                                        <motion.button
                                            type="submit"
                                            disabled={isBotTyping || !userInput.trim()}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg min-w-[48px] flex items-center justify-center"
                                        >
                                            <Send className="w-5 h-5" />
                                        </motion.button>
                                    </div>

                                    {/* Input hint */}
                                    <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                                        <span>Press Enter to send • ↑↓ for history</span>
                                        <span>{userInput.length}/500</span>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white p-4 rounded-full shadow-2xl z-50 border-2 border-green-400/20 backdrop-blur-sm"
            >
                <AnimatePresence mode="wait">
                    {isChatOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <MessageCircle className="w-6 h-6" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Enhanced notification indicator */}
            {!isChatOpen && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="fixed bottom-16 right-[75px] bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg z-40"
                >
                    <motion.span
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        Ask me anything!
                    </motion.span>
                </motion.div>
            )}            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(55, 65, 81, 0.3);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, rgba(34, 197, 94, 0.5), rgba(59, 130, 246, 0.5));
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, rgba(34, 197, 94, 0.7), rgba(59, 130, 246, 0.7));
                }
            `}</style>
        </>
    );
};

export default Chatbot;