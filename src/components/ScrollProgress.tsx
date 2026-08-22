import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollPercentage((winScroll / height) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[999] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-zinc-500 via-zinc-200 to-white origin-left transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,255,255,0.6)]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};
