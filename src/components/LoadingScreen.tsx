import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './loading-optimizations.css';

interface LoadingScreenProps {
    isLoading: boolean;
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState('Initializing...');
    const [hasCompleted, setHasCompleted] = useState(false);

    // Memoize loading texts to prevent re-renders
    const loadingTexts = React.useMemo(() => [
        'Initializing...',
        'Loading Assets...',
        'Preparing Experience...',
        'Almost Ready...',
        'Welcome!'
    ], []);

    const updateProgress = useCallback(() => {
        if (!isLoading || hasCompleted) return;

        let currentProgress = 0;
        const totalDuration = 3000; // Exactly 3 seconds
        const updateInterval = 25; // Update every 25ms for ultra-smooth animation
        const totalSteps = totalDuration / updateInterval; // 120 steps
        const incrementStep = 100 / totalSteps; // Each step increases progress

        const progressInterval = setInterval(() => {
            currentProgress += incrementStep;

            // Update text based on progress with smooth transitions
            if (currentProgress <= 20) setCurrentText(loadingTexts[0]);
            else if (currentProgress <= 40) setCurrentText(loadingTexts[1]);
            else if (currentProgress <= 65) setCurrentText(loadingTexts[2]);
            else if (currentProgress <= 90) setCurrentText(loadingTexts[3]);
            else setCurrentText(loadingTexts[4]);

            // Ensure we reach exactly 100%
            if (currentProgress >= 100) {
                setProgress(100);
                setHasCompleted(true);
                clearInterval(progressInterval);
                // Brief pause to show completion
                setTimeout(() => {
                    onLoadingComplete();
                }, 150);
            } else {
                setProgress(Math.floor(currentProgress));
            }
        }, updateInterval);

        return () => clearInterval(progressInterval);
    }, [isLoading, hasCompleted, onLoadingComplete, loadingTexts]);

    useEffect(() => {
        // Reset state when loading starts
        if (isLoading && !hasCompleted) {
            setProgress(0);
            setCurrentText('Initializing...');
            setHasCompleted(false);
        }

        if (isLoading) {
            const cleanup = updateProgress();

            // Backup timer to ensure loading completes within 3.2 seconds maximum
            const backupTimer = setTimeout(() => {
                if (!hasCompleted) {
                    setProgress(100);
                    setHasCompleted(true);
                    onLoadingComplete();
                }
            }, 3200);

            return () => {
                if (cleanup) cleanup();
                clearTimeout(backupTimer);
            };
        }
    }, [isLoading, updateProgress, hasCompleted, onLoadingComplete]);

    // Optimized self-drawing RNS logo animation
    const RNSLogoSVG = React.memo(() => (
        <svg
            width="200"
            height="120"
            viewBox="0 0 200 120"
            className="text-green-400 svg-optimized"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* R - Letter */}
            <motion.path
                d="M20 20 L20 85 M20 20 L40 20 L50 20 Q65 20 65 35 Q65 50 50 50 L40 50 M40 50 L65 85"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            />

            {/* N - Letter */}
            <motion.path
                d="M80 20 L80 85 M80 20 L115 85 M115 20 L115 85"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 1.2,
                    delay: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            />

            {/* S - Letter */}
            <motion.path
                d="M160 35 Q145 20 130 20 Q120 20 120 30 Q120 40 130 45 L150 50 Q160 55 160 65 Q160 85 145 85 Q130 85 125 70"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 1.2,
                    delay: 1.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            />

            {/* Decorative dot */}
            <motion.circle
                cx="100"
                cy="100"
                r="4"
                fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 2.0,
                    ease: "backOut"
                }}
            />

            {/* Underline */}
            <motion.line
                x1="20"
                y1="95"
                x2="160"
                y2="95"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 2.2,
                    ease: "easeOut"
                }}
            />
        </svg>
    ));

    // Optimized floating particles with better performance
    const FloatingParticles = React.memo(() => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-green-400 rounded-full opacity-60"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                        y: typeof window !== 'undefined' ? window.innerHeight + 10 : 1080,
                        opacity: 0
                    }}
                    animate={{
                        y: -10,
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 2,
                        delay: Math.random() * 3,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    ));

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black loading-optimized gpu-accelerated prevent-shift"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.03,
                        filter: "blur(3px)"
                    }}
                    transition={{
                        exit: {
                            duration: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }
                    }}
                >
                    {/* Optimized Background Animation */}
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                            background: [
                                'radial-gradient(circle at 30% 40%, #10b981 0%, transparent 60%)',
                                'radial-gradient(circle at 70% 60%, #3b82f6 0%, transparent 60%)',
                                'radial-gradient(circle at 50% 80%, #10b981 0%, transparent 60%)',
                                'radial-gradient(circle at 30% 40%, #10b981 0%, transparent 60%)'
                            ]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Floating Particles */}
                    <FloatingParticles />

                    {/* Main Loading Content */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center space-y-8 smooth-animation"
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 25,
                            delay: 0.1
                        }}
                    >
                        {/* Self-drawing RNS Logo */}
                        <motion.div
                            className="relative"
                            initial={{ scale: 0.9, rotateY: -8 }}
                            animate={{
                                scale: 1,
                                rotateY: 0
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.2
                            }}
                            style={{ perspective: 1000 }}
                        >
                            <RNSLogoSVG />

                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 blur-lg opacity-40"
                                animate={{
                                    scale: [1, 1.08, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <RNSLogoSVG />
                            </motion.div>
                        </motion.div>

                        {/* Loading Text */}
                        <motion.div
                            className="text-center space-y-4 text-optimized"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            <motion.h1
                                className="text-3xl md:text-4xl font-bold text-white mb-3"
                                animate={{
                                    textShadow: [
                                        "0 0 10px rgba(16, 185, 129, 0.5)",
                                        "0 0 18px rgba(16, 185, 129, 0.8)",
                                        "0 0 10px rgba(16, 185, 129, 0.5)"
                                    ],
                                    scale: progress >= 95 ? [1, 1.02, 1] : 1
                                }}
                                transition={{
                                    textShadow: {
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    scale: {
                                        duration: 0.6,
                                        repeat: progress >= 95 ? Infinity : 0,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                RNS IMPACTFOLIO
                            </motion.h1>

                            <motion.p
                                className="text-green-400 text-lg font-mono"
                                key={currentText}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {currentText}
                            </motion.p>
                        </motion.div>

                        {/* Enhanced Progress Bar */}
                        <motion.div
                            className="w-80 max-w-sm"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 320, opacity: 1 }}
                            transition={{ delay: 1.3, duration: 0.5 }}
                        >
                            <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 rounded-full transition-all duration-100 ease-out shadow-lg"
                                    style={{ width: `${progress}%` }}
                                />

                                {/* Progress glow effect */}
                                <div
                                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-60 blur-sm transition-all duration-100 ease-out"
                                    style={{ width: `${progress}%` }}
                                />

                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: [-100, 320] }}
                                    transition={{
                                        duration: 1.8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>

                            <div className="flex justify-between items-center mt-3 text-sm text-gray-300">
                                <motion.span
                                    key={currentText}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="font-medium"
                                >
                                    {currentText}
                                </motion.span>
                                <span className="font-mono tabular-nums text-green-400 font-bold">
                                    {progress}%
                                </span>
                            </div>
                        </motion.div>

                        {/* Loading Ring */}
                        <motion.div
                            className="relative w-14 h-14"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.0 }}
                        >
                            <motion.div
                                className="w-full h-full border-3 border-gray-800 border-t-green-500 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Completion Effects */}
                    {progress >= 100 && (
                        <>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/30 to-blue-500/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.8, 1.2, 1]
                                }}
                                transition={{
                                    duration: 0.7,
                                    ease: "easeInOut"
                                }}
                            />

                            <motion.div
                                className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-green-400 font-bold text-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                Loading Complete!
                            </motion.div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
