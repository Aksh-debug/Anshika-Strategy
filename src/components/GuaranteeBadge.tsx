import React from 'react';

interface GuaranteeBadgeProps {
  className?: string;
  size?: number | string;
  showShadow?: boolean;
}

export const GuaranteeBadge: React.FC<GuaranteeBadgeProps> = ({
  className = '',
  size = 110,
  showShadow = true,
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 hover:scale-105 ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
      aria-label="30-Day Money-Back Guarantee"
      title="30-Day Money-Back Guarantee: Coach with Confidence"
    >
      <img
        src="/images/guarantee-seal.svg"
        alt="30-Day Money-Back Guarantee Seal"
        className={`w-full h-full object-contain ${
          showShadow ? 'drop-shadow-[0_8px_20px_rgba(24,24,24,0.18)]' : ''
        }`}
        loading="eager"
        draggable={false}
      />
    </div>
  );
};
