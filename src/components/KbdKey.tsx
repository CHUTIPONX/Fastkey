import React, { useState } from 'react';

interface KbdKeyProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export const KbdKey: React.FC<KbdKeyProps> = ({
  children,
  size = 'md',
  active = false,
  className = '',
  onClick,
  title,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs min-w-[24px] h-[26px]',
    md: 'px-2.5 py-1 text-xs min-w-[32px] h-[32px]',
    lg: 'px-3.5 py-1.5 text-sm min-w-[40px] h-[40px]',
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <kbd
      title={title}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`
        kbd-cap inline-flex items-center justify-center font-mono-code font-semibold select-none rounded-lg cursor-pointer
        bg-gradient-to-b from-[#2A2B30] to-[#1A1A1E] text-[#E5E2E3] border border-[#3A3B42]
        dark:from-[#242428] dark:to-[#151518] dark:text-[#F3F4F6] dark:border-[#383842]
        ${sizeClasses[size]}
        ${isPressed || active ? 'active' : ''}
        ${className}
      `}
    >
      <span className="leading-none drop-shadow-sm">{children}</span>
    </kbd>
  );
};
