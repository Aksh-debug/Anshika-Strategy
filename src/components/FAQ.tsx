import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who do you usually work with?',
      answer:
        'Founders, students, senior ICs and leaders who want to speak with more clarity and confidence — in meetings, on stage or on camera.',
    },
    {
      question: 'How are sessions delivered?',
      answer:
        'Everything is 1:1 on Zoom or Google Meet, at times that work across USA and Canada time zones.',
    },
    {
      question: 'How long is a typical engagement?',
      answer:
        'Most clients work with me over 6–12 weeks. We can also design a shorter sprint if you have a specific event.',
    },
    {
      question: 'Do you work with teams?',
      answer:
        'Yes. I deliver bespoke corporate programs, pitch clinics, and team speaking workshops designed around specific leadership goals and room dynamics.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="snap-section w-full border-t border-[#DDD4C6] py-12 sm:py-14 lg:py-0 lg:h-[100dvh] flex flex-col justify-center px-5 sm:px-10 lg:px-20 xl:px-28 lg:pt-[76px] lg:pb-6 bg-[#EBE6DA] reveal-init"
    >
      <div className="w-full max-w-[1520px] mx-auto my-0 lg:my-auto flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-16 xl:gap-24 items-start py-0 lg:py-4">
        
        {/* Left Column (col-span-12 lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col self-start">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3.5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#AC4C30]" />
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
              COMMON QUESTIONS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl text-[#181818] tracking-tight leading-[1.08] mb-2 sm:mb-5 lg:mb-7">
            Questions, <span className="italic text-[#AC4C30]">answered</span>
          </h2>

          <p className="font-sans text-xs sm:text-base lg:text-lg text-[#4A423A] max-w-md leading-relaxed">
            Everything you need to know about coaching formats, scheduling, and outcomes before we begin.
          </p>
        </div>

        {/* Right Column: Accordion (col-span-12 lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col w-full min-h-0 lg:min-h-[500px]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`border-t border-[#DDD4C6] transition-colors ${
                  index === faqs.length - 1 ? 'border-b border-[#DDD4C6]' : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-3 sm:py-5 lg:py-7 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-2xl lg:text-[32px] text-[#181818] group-hover:text-[#AC4C30] transition-colors pr-4 sm:pr-6 leading-snug">
                    {faq.question}
                  </span>

                  {/* Circle Toggle Button */}
                  <span
                    className={`w-8 h-8 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#181818] text-white shadow-xs'
                        : 'border border-[#CFC6B8] text-[#181818] group-hover:border-[#AC4C30] group-hover:text-[#AC4C30] bg-[#FAF7EF]'
                    }`}
                  >
                    {isOpen ? <X size={16} className="sm:w-5 sm:h-5" /> : <Plus size={16} className="sm:w-5 sm:h-5" />}
                  </span>
                </button>

                {/* Animated Dropdown Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'max-h-48 sm:max-h-64 opacity-100 pb-3 sm:pb-7 lg:pb-8' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-sans text-xs sm:text-base lg:text-[17px] leading-relaxed text-[#4A423A] max-w-2xl pl-0.5 sm:pl-1">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
