import React from 'react';

export const Marquee: React.FC = () => {
  const content = (
    <div className="flex items-center shrink-0">
      <span className="font-serif text-[19px] sm:text-[22px] leading-none text-[#181818] tracking-tight whitespace-nowrap">
        Fear · Clarity · Presence
      </span>
      <span className="text-[#B84E33] ml-[32px] mr-[60px] text-base select-none">★</span>

      <span className="font-serif text-[19px] sm:text-[22px] leading-none text-[#181818] tracking-tight whitespace-nowrap">
        500+ people coached
      </span>
      <span className="text-[#B84E33] ml-[32px] mr-[60px] text-base select-none">★</span>
      
      <span className="font-serif text-[19px] sm:text-[22px] leading-none text-[#181818] tracking-tight whitespace-nowrap">
        Featured in leadership circles
      </span>
      <span className="text-[#B84E33] ml-[32px] mr-[60px] text-base select-none">★</span>
      
      <span className="font-serif text-[19px] sm:text-[22px] leading-none text-[#181818] tracking-tight whitespace-nowrap">
        1:1 · Group · Corporate
      </span>
      <span className="text-[#B84E33] ml-[32px] mr-[60px] text-base select-none">★</span>
    </div>
  );

  return (
    <div 
      className="w-full max-w-[1403px] mx-auto h-[52px] flex items-center overflow-hidden bg-[#EBE6DA] select-none border-t border-dashed border-[#D2C8B8]"
    >
      <div className="animate-marquee flex items-center">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
};
