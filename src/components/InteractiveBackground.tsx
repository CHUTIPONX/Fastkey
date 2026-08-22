import React, { useEffect, useRef, useState } from 'react';

interface InteractiveBackgroundProps {
  isDark: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  baseOpacity: number;
  phase: number;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [targetMousePos, setTargetMousePos] = useState({ x: -1000, y: -1000 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track mouse with smooth interpolation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp mouse pos
  useEffect(() => {
    let animFrame: number;
    const lerpFactor = 0.08;

    const updateMouse = () => {
      setMousePos((prev) => {
        const dx = targetMousePos.x - prev.x;
        const dy = targetMousePos.y - prev.y;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return targetMousePos;
        }
        return {
          x: prev.x + dx * lerpFactor,
          y: prev.y + dy * lerpFactor,
        };
      });
      animFrame = requestAnimationFrame(updateMouse);
    };

    animFrame = requestAnimationFrame(updateMouse);
    return () => cancelAnimationFrame(animFrame);
  }, [targetMousePos]);

  // Canvas particle & subtle ambient background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Generate 16 gentle floating particles
    const particles: Particle[] = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1.2,
      speedY: (Math.random() * 0.25 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
      speedX: (Math.random() * 0.2 - 0.1),
      baseOpacity: Math.random() * 0.35 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isReducedMotion) {
        time += 0.015;

        // Render particles
        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.phase += 0.02;

          // Wrap edges
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          const currentOpacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(p.phase));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          if (isDark) {
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.75})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          } else {
            ctx.fillStyle = `rgba(0, 0, 0, ${currentOpacity * 0.4})`;
            ctx.shadowBlur = 3;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
          }
          ctx.fill();
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark, isReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Moving Grid Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark ? 'opacity-30' : 'opacity-20'
        }`}
        style={{
          backgroundImage: isDark
            ? `
                linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
              `
            : `
                linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
              `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at 50% 35%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 35%, black 40%, transparent 85%)',
          transform: isReducedMotion ? 'none' : 'translate3d(0, 0, 0)',
        }}
      />

      {/* 2. Soft Ambient Cursor Glow */}
      <div
        className="absolute rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          width: '500px',
          height: '500px',
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          background: isDark
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.02) 40%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: mousePos.x === -1000 ? 0 : 1,
          transform: 'translateZ(0)',
        }}
      />

      {/* 3. Top Hero Radial Light Cone */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-[110px] pointer-events-none ${
          isDark ? 'bg-gradient-to-b from-white/10 via-white/05 to-transparent' : 'bg-gradient-to-b from-black/05 via-black/02 to-transparent'
        }`}
      />

      {/* 3.5 Lightning Bolt Silhouette Motif */}
      <div
        className={`absolute top-24 left-1/2 -translate-x-1/2 w-[420px] sm:w-[560px] md:w-[720px] aspect-square pointer-events-none transition-opacity duration-700 flex items-center justify-center ${
          isDark ? 'opacity-[0.04]' : 'opacity-[0.03]'
        }`}
        style={{
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-current filter drop-shadow-[0_0_80px_rgba(255,255,255,0.2)]"
          fill="currentColor"
        >
          {/* Sharp lightning bolt icon silhouette */}
          <polygon
            points="58,10 32,50 48,50 42,90 68,48 52,48"
            className={isDark ? 'text-white' : 'text-black'}
          />
        </svg>
      </div>

      {/* 4. Canvas for Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
