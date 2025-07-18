import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Send, MessageCircle, X, Brain, Bot, User, AlertCircle,
    Minimize2, Maximize2, Copy, ThumbsUp, ThumbsDown, RefreshCw,
    Download, Share2, Sparkles, Settings, Moon, Sun, Volume2,
    VolumeX, Zap, Star, Clock, FileText, Search, Filter, Menu,
    ChevronDown, ChevronUp, Mic, MicOff, Image as ImageIcon, Link,
    Lightbulb, Home, ArrowLeft
} from 'lucide-react';

// If you don't use chatbotData, you can remove the import
import { profileData } from '../data/profileData';

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

interface ChatbotProps {
    embedMode?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ embedMode = false }) => {
    const navigate = useNavigate();
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

    useEffect(() => {
        if (chatEndRef.current && !showSearch) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, isBotTyping, showSearch]);

    useEffect(() => {
        if (isChatOpen && !isMinimized && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isChatOpen, isMinimized]);

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


    // Dummy searchKnowledgeBase and generateGreetingResponse to avoid errors
    const searchKnowledgeBase = (query: string): { response: string; category: string; tags: string[] } | null => {
        // You can implement your own logic here
        return null;
    };

    const generateGreetingResponse = (): string => {
        return `Hello! How can I help you today?`;
    };

    const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        setChatHistory(prev => [userInput, ...prev].slice(0, 50));
        setCurrentHistoryIndex(-1);
        setChatMessages(prev => [...prev, newUserMessage]);
        const currentInput = userInput;
        setUserInput('');
        setIsBotTyping(true);
        setIsConnecting(true);
        setApiError('');

        if (chatSettings.soundEnabled) {
            playNotificationSound('send');
        }

        try {
            let botResponse = '';
            let category = 'general';
            let tags: string[] = ['bot', 'response'];
            const knowledgeResult = searchKnowledgeBase(currentInput);

            if (knowledgeResult) {
                botResponse = knowledgeResult.response;
                category = knowledgeResult.category;
                tags = knowledgeResult.tags;
                await new Promise(resolve => setTimeout(resolve, 800));
            } else {
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

    const playNotificationSound = (type: 'send' | 'receive' | 'error') => {
        if (!chatSettings.soundEnabled) return;

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

    const callGeminiAPI = async (message: string): Promise<string> => {
        const startTime = Date.now();
        const enhancedContextData = `...`; // Your context data here

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
            `[${msg.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })}] ${msg.type.toUpperCase()}: ${msg.content}
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

    const getSmartSuggestions = () => {
        const baseSuggestions = [
            "Tell me about his skills",
            "Show me his projects",
            "How can I contact him?",
            "What's his experience?",
            "His educational background"
        ];
        const mobileSuggestions = [
            "His top skills",
            "Best projects"
        ];

        const recentMessages = chatMessages.slice(-5);
        const recentTopics = recentMessages.map(msg => msg.category).filter(Boolean);

        if (recentTopics.includes('skills')) {
            return window.innerWidth < 768 ?
                ["AI/ML projects", "His certifications"] :
                [
                    "What AI/ML projects has he worked on?",
                    "Tell me about his programming experience",
                    "Show me his GitHub contributions",
                    "What certifications does he have?",
                    "How can I collaborate with him?"
                ];
        }

        if (recentTopics.includes('projects')) {
            return window.innerWidth < 768 ?
                ["Technologies used", "Hire him"] :
                [
                    "What technologies did he use?",
                    "Tell me about his development process",
                    "Can I see the source code?",
                    "What challenges did he overcome?",
                    "How can I hire him for similar work?"
                ];
        }

        if (recentTopics.includes('contact')) {
            return window.innerWidth < 768 ?
                ["Best way to reach", "His availability"] :
                [
                    "What's the best way to reach him?",
                    "Does he freelance or consult?",
                    "What's his availability?",
                    "Can you share his resume?",
                    "What type of opportunities interest him?"
                ];
        }

        return window.innerWidth < 768 ? mobileSuggestions : baseSuggestions;
    };

    const NavigationBar = () => (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-10"
        >
            <div className="flex items-center space-x-3">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Back to Portfolio</span>
                </button>
            </div>
            <div className="flex items-center space-x-1">
                <div className="relative">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: [
                                '0 0 0 0 rgba(34, 197, 94, 0.4)',
                                '0 0 0 10px rgba(34, 197, 94, 0)',
                                '0 0 0 0 rgba(34, 197, 94, 0)'
                            ]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-3 h-3 bg-green-400 rounded-full"
                    />
                </div>
                <span className="text-sm text-gray-300 hidden xs:inline">AI Assistant Active</span>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                    title="Search chat"
                >
                    <Search className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                    title="Settings"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );

    const RecommendationChips = () => {
        const suggestions = getSmartSuggestions();
        const isMobile = window.innerWidth < 768;
        const displaySuggestions = isMobile ? suggestions.slice(0, 2) : suggestions.slice(0, 3);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-3 py-2 bg-gray-800/30 border-b border-gray-700/30"
            >
                <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">Quick suggestions:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {displaySuggestions.map((suggestion, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setUserInput(suggestion)}
                            className={`
                                ${isMobile ? 'text-xs px-3 py-2' : 'text-sm px-4 py-2'}
                                bg-gradient-to-r from-green-600/20 to-blue-600/20
                                text-green-300 rounded-full
                                hover:from-green-600/30 hover:to-blue-600/30
                                transition-all border border-green-500/30
                                backdrop-blur-sm
                                flex-1 min-w-0 truncate
                                ${isMobile ? 'max-w-[calc(50%-0.25rem)]' : 'max-w-fit'}
                            `}
                        >
                            {suggestion}
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        );
    };

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
                        <div className="pt-3 border-t border-gray-700">
                            <button
                                onClick={exportChat}
                                className="w-full flex items-center justify-center space-x-2 p-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                <span className="text-sm">Export Chat</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    const chatUI = (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="w-screen h-screen min-h-screen max-h-screen min-w-0 max-w-none bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-0 flex flex-col m-0 p-0 overflow-hidden rounded-none"
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 50 }}
        >
            <NavigationBar />
            {chatMessages.length <= 2 && <RecommendationChips />}
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
            <div className="flex-1 overflow-y-auto p-2 xs:p-4 space-y-2 bg-gradient-to-b from-gray-900/30 to-gray-800/30 custom-scrollbar">
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
            <form onSubmit={handleChatSubmit} className="flex items-center gap-2 p-2 xs:p-4 bg-gray-900/80 border-t border-gray-700">
                <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-base xs:text-lg"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled={isBotTyping || !userInput.trim()}
                >
                    Send
                </button>
            </form>
        </motion.div>
    );

    if (embedMode) {
        return chatUI;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-0 xs:px-2 py-0 xs:py-4"
        >
            {chatUI}
        </motion.div>
    );
};

export default Chatbot;
