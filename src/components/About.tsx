import React from 'react';
import { AboutArmchairGraphic } from './EditorialImages';

interface AboutProps {
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="snap-section w-full border-t border-[#DDD4C6] py-12 sm:py-14 lg:py-0 lg:h-[100dvh] flex flex-col justify-center px-5 sm:px-10 lg:px-20 xl:px-28 lg:pt-[76px] lg:pb-6 bg-[#EBE6DA] reveal-init">
      <div className="w-full max-w-[1400px] mx-auto my-0 lg:my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Desktop Left Column: Portrait photo + caption row (col-span-5, hidden on mobile) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col">
          <div className="w-full max-w-sm mx-auto lg:max-w-none">
            <AboutArmchairGraphic />

            {/* Caption Row */}
            <div className="mt-5 flex items-center justify-between text-[#5A524A] px-1">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#5A524A]">
                EST. 2019 — TORONTO
              </span>
              <a
                href="#contact"
                className="text-sm font-sans text-[#181818] hover:text-[#AC4C30] transition-colors flex items-center gap-1 group relative"
              >
                <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[1.5px] after:bg-[#AC4C30] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                  Say hello ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Narrative & Stats Column (col-span-12 lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Heading: Meet Anshika */}
          <h2 className="font-serif font-normal text-5xl sm:text-6xl lg:text-7xl leading-none tracking-[-0.02em] text-[#181818]">
            Meet{' '}
            <span className="relative inline-block italic text-[#AC4C30]">
              Anshika
              <svg
                viewBox="0 0 200 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-[11px] sm:h-[14px] text-[#AC4C30] pointer-events-none overflow-visible"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Organic curved raw underline with natural tapered brush flow */}
                <path
                  d="M3 12.5C38 5.2 96 3.8 160 7.8C178 9 191 10.8 197 12.2C168 15.2 104 16 3 12.5Z"
                  fill="currentColor"
                />
                <path
                  d="M6 14C42 8.5 105 7.8 174 11C188 11.8 195 12.8 197 13.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
            </span>
          </h2>

          {/* Mobile Image Placement: Appears right after Meet Anshika Headline on mobile */}
          <div className="block lg:hidden mt-6 mb-2">
            <div className="w-full max-w-sm mx-auto">
              <AboutArmchairGraphic />

              {/* Caption Row */}
              <div className="mt-4 flex items-center justify-between text-[#5A524A] px-1">
                <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[#5A524A]">
                  EST. 2019 — TORONTO
                </span>
                <a
                  href="#contact"
                  className="text-xs font-sans text-[#181818] hover:text-[#AC4C30] transition-colors flex items-center gap-1 group relative"
                >
                  <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[1.5px] after:bg-[#AC4C30] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                    Say hello ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Paragraph 1: Instrument Serif ~26px */}
          <p className="font-serif text-[20px] sm:text-[25px] leading-[1.28] text-[#181818] max-w-[600px] mt-6">
            I help people overcome fear, hesitation and self-doubt in the way they communicate. Through calm, honest and personalised coaching, I focus on building confidence, clarity and speaking habits that create real-world results.
          </p>

          {/* Paragraph 2: Inter 17px */}
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-[#4A423A] max-w-[660px] mt-4 sm:mt-5">
            Over the last few years, I have worked with more than 500 individuals across different stages of their personal and professional journeys — students preparing for interviews, founders pitching investors, and leaders speaking to hundreds.
          </p>

          {/* Stats Row */}
          <div className="mt-8 border-t border-[#DDD4C6] pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center text-center">
              <span className="font-serif text-[52px] leading-none text-[#181818] block">
                500+
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-[#5A524A] mt-2 block">
                PEOPLE COACHED
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="font-serif text-[52px] leading-none text-[#181818] block">
                5.0
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-[#5A524A] mt-2 block">
                AVERAGE RATING
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="font-serif text-[52px] leading-none text-[#181818] block">
                6 yrs
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-[#5A524A] mt-2 block leading-snug">
                COACHING<br />EXPERIENCE
              </span>
            </div>

            <div className="relative flex flex-col items-center text-center pt-[10px] sm:pt-0">
              <span className="font-serif text-[42px] sm:text-[52px] leading-none text-[#181818] flex items-baseline justify-center gap-1.5 whitespace-nowrap">
                2 <span className="text-[26px] sm:text-[31px] font-serif text-[#181818] tracking-normal font-bold">Countries</span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] font-sans font-medium text-[#5A524A] mt-2 block whitespace-nowrap">
                USA & CANADA
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
