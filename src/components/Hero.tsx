import React, { useState } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { HeroStageGraphic } from './EditorialImages';

interface HeroProps {
  onOpenBooking: (service?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [activeOffering, setActiveOffering] = useState<number>(0);

  const whatsappUrl = `https://wa.me/14374996646?text=${encodeURIComponent(
    "Hi Anshika, I'm interested in learning more about your public speaking coaching."
  )}`;

  return (
    <div className="w-full flex flex-col bg-[#EBE6DA]">
      
      {/* =========================================================================
          MOBILE VIEW: Photo First (Full Hero Scroll) - Matching Reference Screenshot
          ========================================================================= */}
      <div className="lg:hidden w-full flex flex-col bg-[#EBE6DA]">
        
        {/* 1. Full-Width Stage Portrait Photo at Top (Sticky so sheet scrolls up and covers it) */}
        <div className="sticky top-0 z-0 w-full h-[52vh] sm:h-[56vh] md:h-[62vh] md:max-h-[660px] overflow-hidden select-none bg-[#181818] will-change-transform">
          <img
            src="/images/anshika-hero-portrait.png"
            alt="Anshika Sharma coaching on stage"
            className="w-full h-[calc(100%+60px)] md:h-auto object-cover object-[center_12%] sm:object-[center_12%] md:w-full md:aspect-[2/3] md:object-cover md:object-top transition-all duration-300 -mt-[40px] md:-mt-[250px] pl-0 md:pl-[1px] mb-0"
          />

          {/* Floating Badge in bottom-right corner of photo */}
          <div className="absolute right-4 sm:right-6 md:right-8 bottom-10 sm:bottom-12 md:bottom-14 bg-[#FAF6ED] rounded-[22px] px-5 py-3 shadow-md z-10 border border-black/5 select-none">
            <div className="font-serif text-[28px] leading-none text-[#181818]">
              500+
            </div>
            <div className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-[#554E46] mt-1.5">
              PEOPLE COACHED
            </div>
          </div>
        </div>

        {/* 2. Overlapping Curved Cream Content Sheet (Visible in initial render, scrolls over photo) */}
        <div className="-mt-8 sm:-mt-10 md:-mt-16 relative z-10 bg-[#EBE6DA] rounded-t-[34px] sm:rounded-t-[38px] md:rounded-t-[44px] px-5 sm:px-8 md:px-12 pt-7 sm:pt-9 md:pt-11 pb-8 sm:pb-12 md:pb-16 flex flex-col md:max-w-3xl md:mx-auto md:w-full shadow-[0_-16px_40px_rgba(0,0,0,0.18)]">
          
          {/* Eyebrow Pill */}
          <div className="inline-block self-start rounded-full border border-[#D5CAB9] bg-[#EAE2D4]/50 px-4 py-1.5 mb-4">
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold text-[#3A342E]">
              PUBLIC SPEAKING COACH
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-normal text-[44px] sm:text-[52px] leading-[0.98] tracking-[-0.02em] text-[#181818]">
            <span className="block">Speak with</span>
            <span className="block italic text-[#B84E33]">Confidence</span>
          </h1>

          {/* Description */}
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.5] text-[#3D3730] mt-4">
            Personalised coaching to express yourself clearly, calmly and powerfully — in meetings, on stage and on camera.
          </p>

          {/* Action Row: Book a Free Call + WhatsApp */}
          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="flex-1 h-[52px] rounded-full bg-[#B84E33] hover:bg-[#A3432B] active:scale-[0.98] text-white font-sans font-semibold text-[13.5px] uppercase tracking-[0.12em] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>BOOK A FREE CALL</span>
              <ArrowUpRight size={17} strokeWidth={2.4} />
            </button>

            <a
              id="hero-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Anshika on WhatsApp"
              className="w-[52px] h-[52px] rounded-full border border-[#D5CAB9] bg-[#FAF7F0] hover:bg-white active:scale-95 flex items-center justify-center text-[#181818] shadow-xs transition-all cursor-pointer shrink-0"
            >
              {/* Official WhatsApp Vector Icon */}
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>

          {/* EXPLORE OFFERINGS Header */}
          <div className="mt-8 mb-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6E665C]">
              EXPLORE OFFERINGS
            </span>
          </div>

          {/* 3 Offerings Cards Stacked Vertically */}
          <div className="flex flex-col gap-2.5">
            {/* 1:1 Coaching */}
            <button
              type="button"
              onClick={() => {
                setActiveOffering(0);
                onOpenBooking('1-to-1 Coaching');
              }}
              className={`w-full rounded-[20px] p-4.5 px-5 flex items-center justify-between text-left transition-all cursor-pointer ${
                activeOffering === 0
                  ? 'bg-[#1E1E1E] text-white shadow-md'
                  : 'bg-[#FAF7EF] border border-[#DDD4C6] text-[#181818]'
              }`}
            >
              <div>
                <div className={`font-sans font-bold text-[16px] ${activeOffering === 0 ? 'text-white' : 'text-[#181818]'}`}>
                  1:1 Coaching
                </div>
                <div className={`font-sans text-[13px] mt-0.5 ${activeOffering === 0 ? 'text-[#A8A196]' : 'text-[#787166]'}`}>
                  Executive voice
                </div>
              </div>
              {activeOffering === 0 ? (
                <span className="w-9 h-9 rounded-full bg-[#B84E33] flex items-center justify-center text-white shrink-0">
                  <ArrowUpRight size={17} strokeWidth={2.4} />
                </span>
              ) : (
                <ArrowUpRight size={18} strokeWidth={2} className="text-[#181818] shrink-0" />
              )}
            </button>

            {/* Online Classes */}
            <button
              type="button"
              onClick={() => {
                setActiveOffering(1);
                onOpenBooking('Online Courses');
              }}
              className={`w-full rounded-[20px] p-4.5 px-5 flex items-center justify-between text-left transition-all cursor-pointer ${
                activeOffering === 1
                  ? 'bg-[#1E1E1E] text-white shadow-md'
                  : 'bg-[#FAF7EF] border border-[#DDD4C6] text-[#181818]'
              }`}
            >
              <div>
                <div className={`font-sans font-bold text-[16px] ${activeOffering === 1 ? 'text-white' : 'text-[#181818]'}`}>
                  Online Classes
                </div>
                <div className={`font-sans text-[13px] mt-0.5 ${activeOffering === 1 ? 'text-[#A8A196]' : 'text-[#787166]'}`}>
                  Cohort learning
                </div>
              </div>
              {activeOffering === 1 ? (
                <span className="w-9 h-9 rounded-full bg-[#B84E33] flex items-center justify-center text-white shrink-0">
                  <ArrowUpRight size={17} strokeWidth={2.4} />
                </span>
              ) : (
                <ArrowUpRight size={18} strokeWidth={2} className="text-[#181818] shrink-0" />
              )}
            </button>

            {/* Keynotes */}
            <button
              type="button"
              onClick={() => {
                setActiveOffering(2);
                onOpenBooking('Corporate Programs');
              }}
              className={`w-full rounded-[20px] p-4.5 px-5 flex items-center justify-between text-left transition-all cursor-pointer ${
                activeOffering === 2
                  ? 'bg-[#1E1E1E] text-white shadow-md'
                  : 'bg-[#FAF7EF] border border-[#DDD4C6] text-[#181818]'
              }`}
            >
              <div>
                <div className={`font-sans font-bold text-[16px] ${activeOffering === 2 ? 'text-white' : 'text-[#181818]'}`}>
                  Keynotes
                </div>
                <div className={`font-sans text-[13px] mt-0.5 ${activeOffering === 2 ? 'text-[#A8A196]' : 'text-[#787166]'}`}>
                  Events & summits
                </div>
              </div>
              {activeOffering === 2 ? (
                <span className="w-9 h-9 rounded-full bg-[#B84E33] flex items-center justify-center text-white shrink-0">
                  <ArrowUpRight size={17} strokeWidth={2.4} />
                </span>
              ) : (
                <ArrowUpRight size={18} strokeWidth={2} className="text-[#181818] shrink-0" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* =========================================================================
          DESKTOP VIEW: Signature Side-by-Side Editorial Layout
          ========================================================================= */}
      <section className="hidden lg:flex relative w-full px-10 lg:px-20 xl:px-28 my-auto flex-1 flex-col justify-center bg-[#EBE6DA] py-0">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Explore Offerings Container */}
          <div className="col-span-7 flex flex-col justify-start relative">
            <div className="flex flex-col justify-start">
              
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={15} className="text-[#AC4C30]" />
                <span className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-[#5A524A]">
                  PUBLIC SPEAKING COACH — USA · CANADA
                </span>
              </div>

              {/* Headline */}
              <h1 
                className="font-serif font-normal text-[clamp(3.5rem,6.5vw,6.4rem)] leading-[0.96] tracking-[-0.03em] text-[#181818] animate-fade-rise"
                style={{ textWrap: 'balance' }}
              >
                <span className="block">
                  Speak with
                </span>
                <span className="block italic text-[#AC4C30]">
                  Confidence
                </span>
              </h1>

              {/* Description */}
              <p className="font-sans text-lg lg:text-xl leading-[1.5] max-w-[34rem] mt-7 text-[#403830] animate-fade-rise-delay">
                Personalised coaching that helps you express yourself clearly, calmly and powerfully — in meetings, on stage, and on camera.
              </p>

              {/* Offerings Buttons */}
              <div className="mt-12 animate-fade-rise-delay-2 w-full max-w-[640px]">
                {/* Header with hairline rule */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#736A60]">
                    EXPLORE OFFERINGS
                  </span>
                  <div className="h-[1px] w-36 bg-[#D5CAB9]" />
                </div>

                {/* Outer Framed Container */}
                <div className="w-full border border-[#DDD4C6] rounded-[24px] p-2.5 bg-[#ECE5D9]/40">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Card 1: 1:1 Coaching */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveOffering(0);
                        onOpenBooking('1-to-1 Coaching');
                      }}
                      className={`rounded-[18px] p-4 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                        activeOffering === 0
                          ? 'bg-[#181818] text-white shadow-md'
                          : 'bg-[#FAF7EF] border border-[#E8E1D3] text-[#181818] hover:bg-white hover:border-[#181818]/30 shadow-xs'
                      }`}
                    >
                      <div className="pr-1">
                        <span className={`font-sans font-semibold text-[15.5px] block ${
                          activeOffering === 0 ? 'text-white' : 'text-[#181818]'
                        }`}>
                          1:1 Coaching
                        </span>
                        <span className={`font-sans text-xs mt-0.5 block whitespace-nowrap ${
                          activeOffering === 0 ? 'text-[#8E867D]' : 'text-[#7A7167]'
                        }`}>
                          Executive Voice
                        </span>
                      </div>
                      {activeOffering === 0 ? (
                        <span className="w-8 h-8 rounded-full bg-[#B86246] flex items-center justify-center text-white flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <ArrowUpRight size={15} strokeWidth={2.4} />
                        </span>
                      ) : (
                        <ArrowUpRight size={17} strokeWidth={1.8} className="text-[#6B6358] flex-shrink-0" />
                      )}
                    </button>

                    {/* Card 2: Online Classes */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveOffering(1);
                        onOpenBooking('Online Courses');
                      }}
                      className={`rounded-[18px] p-4 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                        activeOffering === 1
                          ? 'bg-[#181818] text-white shadow-md'
                          : 'bg-[#FAF7EF] border border-[#E8E1D3] text-[#181818] hover:bg-white hover:border-[#181818]/30 shadow-xs'
                      }`}
                    >
                      <div className="pr-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" />
                          <span className={`font-sans font-semibold text-[15.5px] whitespace-nowrap ${
                            activeOffering === 1 ? 'text-white' : 'text-[#181818]'
                          }`}>
                            Online Classes
                          </span>
                        </div>
                        <span className={`font-sans text-xs mt-0.5 block pl-3.5 whitespace-nowrap ${
                          activeOffering === 1 ? 'text-[#8E867D]' : 'text-[#7A7167]'
                        }`}>
                          Cohort Learning
                        </span>
                      </div>
                      {activeOffering === 1 ? (
                        <span className="w-8 h-8 rounded-full bg-[#B86246] flex items-center justify-center text-white flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <ArrowUpRight size={15} strokeWidth={2.4} />
                        </span>
                      ) : (
                        <ArrowUpRight size={17} strokeWidth={1.8} className="text-[#6B6358] flex-shrink-0" />
                      )}
                    </button>

                    {/* Card 3: Keynotes */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveOffering(2);
                        onOpenBooking('Corporate Programs');
                      }}
                      className={`rounded-[18px] p-4 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                        activeOffering === 2
                          ? 'bg-[#181818] text-white shadow-md'
                          : 'bg-[#FAF7EF] border border-[#E8E1D3] text-[#181818] hover:bg-white hover:border-[#181818]/30 shadow-xs'
                      }`}
                    >
                      <div className="pr-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#B86246] flex-shrink-0" />
                          <span className={`font-sans font-semibold text-[15.5px] ${
                            activeOffering === 2 ? 'text-white' : 'text-[#181818]'
                          }`}>
                            Keynotes
                          </span>
                        </div>
                        <span className={`font-sans text-xs mt-0.5 block pl-3.5 whitespace-nowrap ${
                          activeOffering === 2 ? 'text-[#8E867D]' : 'text-[#7A7167]'
                        }`}>
                          Events & Summits
                        </span>
                      </div>
                      {activeOffering === 2 ? (
                        <span className="w-8 h-8 rounded-full bg-[#B86246] flex items-center justify-center text-white flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <ArrowUpRight size={15} strokeWidth={2.4} />
                        </span>
                      ) : (
                        <ArrowUpRight size={17} strokeWidth={1.8} className="text-[#6B6358] flex-shrink-0" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Stage Image */}
          <div className="col-span-5 flex justify-end items-end">
            <HeroStageGraphic className="w-full max-w-[430px] xl:max-w-[470px]" />
          </div>

        </div>
      </section>

    </div>
  );
};
