import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const SpeakWithAnshikaLogo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const [imgError, setImgError] = useState(false);
  const customLogo = typeof window !== 'undefined' ? localStorage.getItem('anshika_brand_logo') : null;

  const textColor = variant === 'light' ? '#F1EBE1' : '#181818';
  const lineColor = variant === 'light' ? 'rgba(241, 235, 225, 0.6)' : 'rgba(24, 24, 24, 0.7)';

  // If a custom image was saved or if the user uploaded logo image exists
  if (customLogo) {
    return (
      <img
        src={customLogo}
        alt="Speak with Anshika"
        className={`object-contain ${className || 'h-11 w-auto'}`}
      />
    );
  }

  // Attempt to load the exact SVG asset first
  if (!imgError) {
    return (
      <img
        src="/images/speak-with-anshika-logo.svg"
        alt="Speak with Anshika"
        onError={() => setImgError(true)}
        className={`object-contain transition-transform duration-300 hover:scale-[1.02] ${className || 'h-10 sm:h-12 w-auto'}`}
      />
    );
  }

  // Pure SVG fallback rendering
  return (
    <div className={`flex flex-col items-center select-none leading-none ${className}`}>
      {/* Top row: Speak + speech bubble */}
      <div className="flex items-center gap-1.5">
        <span 
          className="font-serif font-extrabold text-[24px] sm:text-[28px] tracking-tight leading-none"
          style={{ color: textColor }}
        >
          Speak
        </span>
        {/* Coral speech bubble badge */}
        <div className="w-4 h-4 rounded-full bg-[#DC725E] flex items-center justify-center -mt-2 shadow-xs relative">
          <div className="flex items-center gap-0.5">
            <span className="w-0.5 h-0.5 rounded-full bg-white block" />
            <span className="w-0.5 h-0.5 rounded-full bg-white block" />
            <span className="w-0.5 h-0.5 rounded-full bg-white block" />
          </div>
          {/* Bubble tail */}
          <div className="absolute -bottom-0.5 left-0.5 w-1 h-1 bg-[#DC725E] rotate-45 transform" />
        </div>
      </div>

      {/* Middle row: — with — */}
      <div className="flex items-center gap-2 my-0.5 w-full justify-center">
        <div className="h-[1px] w-4" style={{ backgroundColor: lineColor }} />
        <span 
          className="font-serif italic text-[11px] sm:text-[12px] font-normal"
          style={{ color: textColor }}
        >
          with
        </span>
        <div className="h-[1px] w-4" style={{ backgroundColor: lineColor }} />
      </div>

      {/* Bottom row: Anshika + terracotta curve */}
      <div className="relative flex flex-col items-center">
        <span 
          className="font-serif font-extrabold text-[26px] sm:text-[30px] tracking-tight leading-none"
          style={{ color: textColor }}
        >
          Anshika
        </span>
        {/* Curving terracotta underline */}
        <svg 
          viewBox="0 0 100 12" 
          className="w-full h-2 -mt-0.5" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M 5 4 C 30 1 70 0 95 3 C 70 2 30 3 5 4 Z" 
            fill="#DC725E" 
          />
          <path 
            d="M 5 4 C 35 1 65 1 95 3" 
            stroke="#DC725E" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
    </div>
  );
};
