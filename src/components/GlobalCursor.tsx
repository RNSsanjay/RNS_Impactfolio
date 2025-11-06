import React, { useState, useEffect, useRef } from 'react';

interface TrailPoint {
    x: number;
    y: number;
    id: number;
    timestamp: number;
}

const GlobalCursor: React.FC = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const rafRef = useRef<number>();
    const lastUpdateTime = useRef<number>(0);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            const currentTime = Date.now();
            const newPos = { x: e.clientX, y: e.clientY };

            setPos(newPos);
            setVisible(true);

            // Add trail point with timestamp for smooth animation
            if (currentTime - lastUpdateTime.current > 12) { // ~80fps for smoother trail
                setTrail(prev => {
                    const newTrail = [
                        {
                            x: e.clientX,
                            y: e.clientY,
                            id: currentTime + Math.random(),
                            timestamp: currentTime
                        },
                        ...prev.slice(0, 24) // Longer trail for better snake effect
                    ];
                    return newTrail;
                });
                lastUpdateTime.current = currentTime;
            }
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if target is an Element and has the matches method
            const isInteractive = (target && typeof target.matches === 'function' &&
                target.matches('a, button, [role="button"], .cursor-pointer, input, textarea, select')) ||
                (target && target.closest && target.closest('a, button, [role="button"], .cursor-pointer'));

            if (isInteractive) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if target is an Element and has the matches method
            const isInteractive = (target && typeof target.matches === 'function' &&
                target.matches('a, button, [role="button"], .cursor-pointer, input, textarea, select')) ||
                (target && target.closest && target.closest('a, button, [role="button"], .cursor-pointer'));

            if (isInteractive) {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleWindowLeave = () => {
            setVisible(false);
            setTrail([]);
        };

        const handleWindowEnter = () => {
            setVisible(true);
        };

        document.addEventListener('mousemove', move, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleWindowLeave);
        document.addEventListener('mouseenter', handleWindowEnter);

        return () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleWindowLeave);
            document.removeEventListener('mouseenter', handleWindowEnter);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    // Animation loop for smooth trail movement
    useEffect(() => {
        const animate = () => {
            const currentTime = Date.now();

            setTrail(prev => prev.filter(point =>
                currentTime - point.timestamp < 1200 // Longer trail duration
            ));

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    if (!visible) return null;

    return (
        <>
            {/* Enhanced Snake-like Trail */}
            {trail.map((point, i) => {
                const currentTime = Date.now();
                const age = currentTime - point.timestamp;
                const maxAge = 1000;
                const ageRatio = Math.min(age / maxAge, 1);

                // Dynamic size with more variation
                const baseSize = 22;
                const size = Math.max(2, baseSize - (i * 0.7) - (ageRatio * 8));

                // Enhanced opacity curve
                const baseOpacity = 0.95;
                const opacity = Math.max(0.03, baseOpacity - (i * 0.035) - (ageRatio * 0.4));

                // Progressive blur for depth
                const blur = (i * 0.12) + (ageRatio * 0.3);

                // Enhanced color progression with more vibrant colors
                let color = '#6ee7b7'; // Brightest green
                let shadowColor = '#10b981';
                let glowColor = '#34d399';

                if (i >= 2) {
                    color = '#34d399'; // Bright green
                    shadowColor = '#059669';
                    glowColor = '#10b981';
                }
                if (i >= 5) {
                    color = '#10b981'; // Medium green
                    shadowColor = '#047857';
                    glowColor = '#059669';
                }
                if (i >= 8) {
                    color = '#059669'; // Dark green
                    shadowColor = '#065f46';
                    glowColor = '#047857';
                }
                if (i >= 12) {
                    color = '#047857'; // Darker green
                    shadowColor = '#064e3b';
                    glowColor = '#065f46';
                }
                if (i >= 16) {
                    color = '#065f46'; // Darkest green
                    shadowColor = '#052e16';
                    glowColor = '#064e3b';
                }

                return (
                    <div
                        key={point.id}
                        style={{
                            position: 'fixed',
                            left: point.x,
                            top: point.y,
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${color} 0%, ${shadowColor} 70%, transparent 100%)`,
                            opacity: opacity,
                            pointerEvents: 'none',
                            zIndex: 9999 - i,
                            transform: 'translate(-50%, -50%)',
                            filter: `blur(${blur}px)`,
                            boxShadow: `
                0 0 ${size * 0.6}px ${glowColor}, 
                0 0 ${size * 1.2}px ${color}60,
                0 0 ${size * 1.8}px ${shadowColor}30
              `,
                            animation: i < 5 ? `trailPulse ${0.8 + (i * 0.1)}s ease-in-out infinite alternate` : 'none',
                        }}
                    />
                );
            })}

            {/* Main Cursor Core */}
            <div
                style={{
                    position: 'fixed',
                    left: pos.x,
                    top: pos.y,
                    width: isClicking ? '8px' : isHovering ? '16px' : '12px',
                    height: isClicking ? '8px' : isHovering ? '16px' : '12px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, 
            #ffffff 0%, 
            #6ee7b7 30%, 
            #34d399 60%, 
            #10b981 100%)`,
                    pointerEvents: 'none',
                    zIndex: 10000,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `
            0 0 20px #10b981, 
            0 0 40px rgba(16, 185, 129, 0.7), 
            0 0 60px rgba(16, 185, 129, 0.4),
            inset 0 0 8px rgba(255, 255, 255, 0.3)
          `,
                    border: '2px solid rgba(255, 255, 255, 0.9)',
                    animation: isHovering ? 'mainCursorHover 0.6s ease-in-out infinite alternate' : 'mainCursorDefault 2s ease-in-out infinite',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />

            {/* Interactive Outer Ring */}
            <div
                style={{
                    position: 'fixed',
                    left: pos.x,
                    top: pos.y,
                    width: isClicking ? '25px' : isHovering ? '45px' : '35px',
                    height: isClicking ? '25px' : isHovering ? '45px' : '35px',
                    borderRadius: '50%',
                    border: `2px solid rgba(16, 185, 129, ${isHovering ? 0.6 : 0.4})`,
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                    animation: isHovering ? 'outerRingHover 0.8s ease-in-out infinite' : 'outerRingDefault 3s ease-in-out infinite reverse',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 0 15px rgba(16, 185, 129, ${isHovering ? 0.4 : 0.2})`,
                }}
            />

            {/* Click Ripple Effect */}
            {isClicking && (
                <div
                    style={{
                        position: 'fixed',
                        left: pos.x,
                        top: pos.y,
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        border: '3px solid rgba(16, 185, 129, 0.8)',
                        pointerEvents: 'none',
                        zIndex: 9997,
                        transform: 'translate(-50%, -50%)',
                        animation: 'clickRipple 0.6s ease-out',
                        background: 'radial-gradient(circle, transparent 60%, rgba(16, 185, 129, 0.1) 70%, transparent 80%)',
                    }}
                />
            )}

            {/* Hover Sparkles */}
            {isHovering && Array.from({ length: 6 }, (_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'fixed',
                        left: pos.x + Math.cos((i * Math.PI * 2) / 6) * (25 + i * 3),
                        top: pos.y + Math.sin((i * Math.PI * 2) / 6) * (25 + i * 3),
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#6ee7b7',
                        pointerEvents: 'none',
                        zIndex: 9996,
                        transform: 'translate(-50%, -50%)',
                        animation: `sparkle ${0.8 + (i * 0.1)}s ease-in-out infinite alternate`,
                        boxShadow: '0 0 8px #10b981',
                    }}
                />
            ))}
        </>
    );
};

export default GlobalCursor;
