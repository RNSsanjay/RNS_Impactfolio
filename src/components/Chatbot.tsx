import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { chatbotData } from '../data/chatbotData';
import { Send, MessageCircle, X, Brain } from 'lucide-react';

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [chatMessages, setChatMessages] = useState<{ type: string; content: string; }[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const processMessage = (message: string): string => {
        const lowerMsg = message.toLowerCase();
        if (chatbotData.greetings.some(word => lowerMsg.includes(word))) {
            return chatbotData.responses.greetings;
        } else if (chatbotData.skills.some(word => lowerMsg.includes(word))) {
            return chatbotData.responses.skills;
        } else if (chatbotData.education.some(word => lowerMsg.includes(word))) {
            return chatbotData.responses.education;
        } else if (chatbotData.experience.some(word => lowerMsg.includes(word))) {
            return chatbotData.responses.experience;
        } else if (chatbotData.projects.some(word => lowerMsg.includes(word))) {
            return chatbotData.responses.projects;
        } else if (chatbotData.contact.some(word => lowerMsg.includes(word))) {
            return chatbotData.responses.contact;
        }
        return chatbotData.responses.default;
    };

    const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!userInput.trim()) return;
        const newUserMessage = { type: 'user', content: userInput };
        setChatMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsBotTyping(true);

        setTimeout(() => {
            const botResponse = { type: 'bot', content: processMessage(userInput) };
            setChatMessages(prev => [...prev, botResponse]);
            setIsBotTyping(false);
        }, 1500); // Simulated bot typing delay
    };

    const ChatBubble = ({ message }: { message: { type: string; content: string; } }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`max-w-[80%] p-3 rounded-lg mb-2 ${message.type === 'user'
                ? 'ml-auto bg-green-600 text-white rounded-br-none'
                : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}
        >
            {message.content}
        </motion.div>
    );

    return (
        <>
            {isChatOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-4 right-4 w-full md:w-80 h-[80vh] md:h-96 bg-gradient-to-r from-green-600 to-green-800 rounded-lg shadow-lg z-50 flex flex-col"
                >
                    <div className="p-4 bg-green-700 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Brain className="w-6 h-6 text-white" />
                            <span className="text-white font-medium">Portfolio Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {chatMessages.map((message, index) => (
                            <ChatBubble key={index} message={message} />
                        ))}
                        {isBotTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="bg-gray-800 text-gray-200 rounded-bl-none p-3 max-w-[80%]"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-bounce" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-bounce200" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-bounce400" />
                                </div>
                            </motion.div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-800">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
            >
                <MessageCircle className="w-6 h-6" />
            </motion.button>
        </>
    );
};

export default Chatbot;
