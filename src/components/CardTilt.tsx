import React, { useRef, useState, useEffect } from 'react';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  isDark?: boolean;
}

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  className = '',
  maxTilt = 3.5,
  glowColor = 'rgba(255, 255, 255, 0.15)',
  isDark = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? '-4px' : '0px'})`,
          transition: isHovered
            ? 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease',
          boxShadow: isHovered
            ? `0 20px 40px -15px ${glowColor}, 0 0 20px 0 ${glowColor}`
            : isDark
            ? '0 10px 30px -10px rgba(0, 0, 0, 0.6)'
            : '0 10px 25px -10px rgba(0, 0, 0, 0.08)',
        }}
        className={`
          light-sweep-container relative rounded-2xl transition-all
          ${isDark ? 'glass-panel border-[#262629] hover:border-white/40' : 'glass-panel-light border-[#E2E8F0] hover:border-black/30'}
          ${className}
        `}
      >
        {/* Radial Glare overlay follow mouse */}
        {isHovered && !reducedMotion && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.1), transparent 80%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
};
