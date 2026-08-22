import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, Check, Loader2, Sparkles } from 'lucide-react';

interface MagneticButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'glass';
  isDownload?: boolean;
  downloadFileName?: string;
  isDark?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'primary',
  isDownload = false,
  downloadFileName = 'FastKey-v2.4.0-Setup.exe',
  isDark = true,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'downloaded'>('idle');
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle magnetic strength (max 8px movement)
    setPos({
      x: x * 0.22,
      y: y * 0.22,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPos({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add ripple
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const rippleX = e.clientX - rect.left;
      const rippleY = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x: rippleX, y: rippleY, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    }

    if (onClick) {
      onClick();
    }

    if (isDownload && downloadState === 'idle') {
      setDownloadState('preparing');

      setTimeout(() => {
        // Trigger simulated file download
        const blob = new Blob([
          `FastKey Developer Tool v2.4.0\n-----------------------------\n` +
          `Execution Time: ${new Date().toISOString()}\n` +
          `Status: Verified SHA-256 binary package\n` +
          `Architecture: x86_64 / ARM64\n\n` +
          `To run FastKey:\n1. Launch FastKey executable\n2. Press Ctrl+Space to summon the global launcher\n3. Enjoy frictionless developer speed!\n`
        ], { type: 'application/octet-stream' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setDownloadState('downloaded');

        // Trigger confetti celebration in monochrome/silver
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#FFFFFF', '#D4D4D8', '#A1A1AA', '#71717A', '#27272A'],
          });
        } catch {
          // ignore
        }

        setTimeout(() => {
          setDownloadState('idle');
        }, 4000);
      }, 1200);
    }
  };

  const getVariantStyles = () => {
    if (variant === 'primary') {
      return isDark
        ? `
          bg-white text-black hover:bg-zinc-200
          shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_0_25px_rgba(255,255,255,0.25)]
          hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_35px_rgba(255,255,255,0.45)]
          border border-white/80 font-bold
        `
        : `
          bg-black text-white hover:bg-zinc-800
          shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_15px_rgba(0,0,0,0.25)]
          hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_25px_rgba(0,0,0,0.35)]
          border border-black font-bold
        `;
    }
    if (variant === 'secondary') {
      return `
        ${isDark ? 'bg-[#18181B] text-[#EDEDED] border-[#2E2E33] hover:bg-[#27272A] hover:border-white/30' : 'bg-white text-[#18181B] border-[#E2E8F0] hover:bg-[#F4F4F5] hover:border-black/30'}
        shadow-sm
      `;
    }
    return `
      ${isDark ? 'glass-panel text-white hover:bg-white/10 hover:border-white/30' : 'glass-panel-light text-black hover:bg-black/5 hover:border-black/30'}
      border border-white/10
    `;
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: reducedMotion ? 'none' : `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`
        relative overflow-hidden font-semibold rounded-xl select-none inline-flex items-center justify-center gap-2 cursor-pointer
        transition-all duration-300 active:scale-[0.98]
        ${getVariantStyles()}
        ${className}
      `}
    >
      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
          style={{
            left: r.x,
            top: r.y,
            width: '120px',
            height: '120px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 font-display">
        {isDownload ? (
          <>
            {downloadState === 'idle' && (
              <>
                <span>{children || 'Download FastKey'}</span>
                <Download
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isHovered ? 'translate-y-0.5 scale-110' : ''
                  }`}
                />
              </>
            )}
            {downloadState === 'preparing' && (
              <>
                <Loader2 className={`w-4 h-4 animate-spin ${variant === 'primary' && isDark ? 'text-black' : 'text-white'}`} />
                <span>Preparing Download...</span>
              </>
            )}
            {downloadState === 'downloaded' && (
              <>
                <Check className={`w-4 h-4 ${variant === 'primary' && isDark ? 'text-black' : 'text-white'}`} />
                <span>Downloading FastKey!</span>
              </>
            )}
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
};
