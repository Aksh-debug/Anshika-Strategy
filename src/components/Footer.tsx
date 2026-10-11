import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { StagePublicSpeakingBackground } from './StagePublicSpeakingBackground';

interface FooterProps {
  onOpenBooking?: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer 
      id="contact"
      className="snap-section w-full py-12 sm:py-14 lg:py-10 lg:h-[100dvh] flex flex-col justify-between px-5 sm:px-10 lg:px-20 xl:px-28 select-none relative overflow-hidden bg-[#1c0d08]"
    >
      {/* Animated Public Speaking Stage Background with lights, audience, speaker, and dust */}
      <StagePublicSpeakingBackground />

      {/* Main Container - Centered arrangement floating cleanly above the stage scene */}
      <div className="w-full max-w-[980px] mx-auto flex flex-col justify-between h-full relative z-10 my-0 lg:my-auto">
        

        {/* Centered Hero Section */}
        <div className="w-full flex flex-col items-center text-center my-auto py-3 sm:py-6">
          
          {/* Centered Big Headline */}
          <h2 className="font-serif font-normal text-[clamp(2.35rem,6.8vw,4.5rem)] text-[#181818] tracking-tight leading-[1.02] max-w-3xl drop-shadow-xs">
            Where will your voice <span className="italic text-[#AC4C30]">go next?</span>
          </h2>

          {/* Centered Subtitle */}
          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#403830] max-w-xl mt-3 sm:mt-4 leading-relaxed font-normal">
            Every speaking journey begins with an honest, personalized conversation.
            Step into the light and command the room with confidence.
          </p>

          {/* Clean Call To Action Pill Button */}
          {onOpenBooking && (
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#181818] text-[#F1EBE1] hover:bg-[#AC4C30] hover:text-white transition-all text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold cursor-pointer shadow-xl hover:shadow-2xl flex items-center gap-2.5 group"
              >
                <span>BOOK A CONSULTATION</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}

        </div>

        {/* Minimal Bottom Bar: Positioned in front of the stage floor / audience with high contrast */}
        <div className="w-full flex flex-col gap-2.5 pt-4 border-t border-white/20 text-xs font-sans text-[#F1EBE1]">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 text-center md:text-left w-full pb-[10px]">
            
            {/* Direct Contact info (center-aligned on mobile, left-aligned on desktop) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6 text-[#F1EBE1] text-center md:text-left">
              <a 
                href="mailto:anshikasharmaca0998@gmail.com" 
                className="hover:text-[#AC4C30] transition-colors font-medium text-center md:text-left"
              >
                anshikasharmaca0998@gmail.com
              </a>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
              
              {/* Both phone links grouped in a single div */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                <a 
                  href="https://wa.me/14374996646?text=Hi%20Anshika%2C%20I'm%20interested%20in%20learning%20more%20about%20your%20public%20speaking%20coaching."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#AC4C30] transition-colors inline-flex items-center gap-1.5 font-medium text-center md:text-left"
                >
                  <span className="text-center md:text-left">+1 (437) 499-6646</span>
                  <span className="hidden sm:inline-flex text-[10px] text-[#4ade80] font-semibold bg-black/40 px-1.5 py-0.5 rounded-full border border-[#4ade80]/30">(WhatsApp)</span>
                </a>
                <span className="text-white/40">/</span>
                <a 
                  href="tel:+917988311966"
                  className="hover:text-[#AC4C30] transition-colors font-medium text-center md:text-left"
                >
                  +91 79883 11966
                </a>
              </div>
            </div>

            {/* Social Links & Location (center-aligned on mobile, left-aligned on desktop) */}
            <div className="flex items-center justify-center md:justify-start gap-5 text-[#E6DEC8] text-center md:text-left">
              <span className="text-[#FFB59B] font-medium text-center md:text-left">Toronto · Global</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#AC4C30] transition-colors"
              >
                LinkedIn ↗
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#AC4C30] transition-colors"
              >
                Instagram ↗
              </a>
            </div>

          </div>

          <div className="flex items-center justify-between text-[11px] text-[#D1C7BA]/80 pt-1">
            <p className="whitespace-nowrap text-[9.5px] sm:text-[11px] tracking-tight">
              © 2026 Anshika Sharma · Public Speaking Coach. All rights reserved.
            </p>
            <p className="hidden sm:block text-[#D1C7BA]/70">Step into the room with confidence</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
