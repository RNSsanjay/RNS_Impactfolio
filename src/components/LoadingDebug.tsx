import React from 'react';

// Debug utility for loading animation
interface LoadingDebugProps {
    progress: number;
    currentText: string;
    hasCompleted: boolean;
    isLoading: boolean;
}

const LoadingDebug: React.FC<LoadingDebugProps> = ({ progress, currentText, hasCompleted, isLoading }) => {
    if (process.env.NODE_ENV !== 'development') return null;

    return (
        <div className="fixed top-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
            <div>Loading: {isLoading ? 'true' : 'false'}</div>
            <div>Progress: {progress}%</div>
            <div>Text: {currentText}</div>
            <div>Completed: {hasCompleted ? 'true' : 'false'}</div>
            <div>Time: {new Date().toLocaleTimeString()}</div>
        </div>
    );
};

export default LoadingDebug;