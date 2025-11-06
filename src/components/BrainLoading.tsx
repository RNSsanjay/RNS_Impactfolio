import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface BrainLoadingProps {
    text?: string;
    className?: string;
}

const BrainLoading: React.FC<BrainLoadingProps> = ({
    text = "Loading...",
    className = "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
        >
            {/* Brain icon with animations */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: [0, 360],
                    filter: [
                        "drop-shadow(0 0 8px #10b981)",
                        "drop-shadow(0 0 16px #10b981)",
                        "drop-shadow(0 0 8px #10b981)"
                    ]
                }}
                transition={{
                    scale: { duration: 0.3, ease: "easeOut" },
                    opacity: { duration: 0.3, ease: "easeOut" },
                    rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    filter: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="relative"
            >
                <Brain className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-500" />

                {/* Pulsing rings around brain */}
                {[1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-green-500/40"
                        animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </motion.div>

            {/* Loading text */}
            <motion.div
                className="mt-8 sm:mt-10 md:mt-12 text-green-400 font-mono text-base sm:text-lg md:text-xl text-center px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                {text}
            </motion.div>

            {/* Loading dots */}
            <motion.div
                className="mt-4 sm:mt-6 flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default BrainLoading;
