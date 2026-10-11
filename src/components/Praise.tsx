import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Praise: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const testimonials = [
    {
      id: '01',
      name: 'Mark Lee',
      role: 'PRODUCT LEAD · NEW YORK, USA',
      country: 'USA',
      photo: '/images/testimonials/mark-lee.jpg',
      quote: "Anshika's coaching transformed my confidence. I now speak with clarity and impact in every meeting — even the hard ones.",
    },
    {
      id: '02',
      name: 'Vamshika R.',
      role: 'FOUNDER · TORONTO, CANADA',
      country: 'CANADA',
      photo: '/images/testimonials/vamshika.jpg',
      quote: "I finally stopped freezing on stage. Anshika helped me lead a room of 300 with ease and authenticity.",
    },
    {
      id: '03',
      name: 'Priya Menon',
      role: 'SENIOR CONSULTANT · BENGALURU, INDIA',
      country: 'INDIA',
      photo: '/images/testimonials/priya-menon.jpg',
      quote: "The clarity of her feedback is unmatched. Every session felt like an unlock — practical, kind, powerful.",
    },
    {
      id: '04',
      name: 'Daniel Rowe',
      role: 'ENGINEERING MANAGER · SAN FRANCISCO, USA',
      country: 'USA',
      photo: '/images/testimonials/daniel-rowe.jpg',
      quote: "From nervous interviewee to confident storyteller. My promotion cycle went differently this year — thank you.",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="praise" className="snap-section w-full bg-[#181818] text-[#F1EBE1] py-12 sm:py-14 lg:py-0 lg:h-[100dvh] flex flex-col justify-center px-5 sm:px-10 lg:px-20 xl:px-28 lg:pt-[76px] lg:pb-6 reveal-init">
      <div className="w-full max-w-[1400px] mx-auto my-0 lg:my-auto flex flex-col justify-center">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 sm:pb-6 border-b border-[rgba(255,255,255,0.12)]">
          <div>
            <h2 className="font-serif font-normal text-4xl sm:text-6xl lg:text-7xl leading-none tracking-[-0.02em] text-[#F1EBE1]">
              Words from <span className="italic text-[#C4705A]">people who spoke up</span>
            </h2>
          </div>

          {/* Circular Arrow Buttons & Mobile Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="lg:hidden font-sans text-xs uppercase tracking-[0.2em] text-[#9A948A]">
              {`0${currentIndex + 1} / 04`}
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[rgba(241,235,225,0.25)] flex items-center justify-center text-[#F1EBE1] hover:bg-[#F1EBE1] hover:text-[#181818] active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[rgba(241,235,225,0.25)] flex items-center justify-center text-[#F1EBE1] hover:bg-[#F1EBE1] hover:text-[#181818] active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Body Row */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Single Active Testimonial Quote & Author (col-span-8 on desktop, full-width on mobile) */}
          <div 
            className="lg:col-span-8 flex flex-col justify-between touch-pan-y select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div>
              {/* Accent-colored quote mark icon (~36px) */}
              <svg 
                className="w-8 h-8 text-[#C4705A] fill-current opacity-90"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote text with smooth key transition */}
              <p 
                key={currentIndex}
                className="mt-6 font-serif text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.18] text-[#F1EBE1] max-w-[780px] transition-all duration-300"
                style={{ textWrap: 'balance' }}
              >
                "{current.quote}"
              </p>
            </div>

            {/* Author Attribution */}
            <div className="mt-8 flex items-center gap-4">
              <img
                src={current.photo}
                alt={current.name}
                referrerPolicy="no-referrer"
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-white/20 object-cover ring-2 ring-[#C4705A]/30 shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-serif text-[20px] sm:text-[22px] text-[#F1EBE1] leading-tight">
                  {current.name}
                </span>
                <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.15em] text-[#8A857B] mt-1">
                  {current.role}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clickable List + Counter (Desktop only, hidden on mobile view) */}
          <div className="hidden lg:flex lg:col-span-4 border-l border-[rgba(255,255,255,0.15)] pl-10 flex-col">
            {/* Counter */}
            <div className="font-sans text-xs uppercase tracking-[0.2em] text-[#9A948A] mb-4">
              {`0${currentIndex + 1} / 04`}
            </div>

            {/* 4 Clickable Rows */}
            <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.12)]">
              {testimonials.map((t, idx) => {
                const isActive = currentIndex === idx;

                return (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    className="py-5 text-left flex items-center justify-between group cursor-pointer transition-colors duration-200"
                  >
                    <span 
                      className={`font-serif text-[24px] transition-colors duration-200 ${
                        isActive ? 'text-[#F1EBE1]' : 'text-[#8A857B] group-hover:text-[#F1EBE1]'
                      }`}
                    >
                      {t.name}
                    </span>
                    <span 
                      className={`font-sans text-[11px] uppercase tracking-wider transition-colors duration-200 ${
                        isActive ? 'text-[#F1EBE1]' : 'text-[#8A857B] group-hover:text-[#F1EBE1]'
                      }`}
                    >
                      {t.country}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
