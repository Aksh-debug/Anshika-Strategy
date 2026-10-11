import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      numStr: '01',
      tag: 'STEP 01 · 30 MIN',
      title: 'Discovery call',
      description: 'A calm conversation to understand your goals and blockers.',
    },
    {
      numStr: '02',
      tag: 'STEP 02 · ROADMAP',
      title: 'Personal plan',
      description: 'A coaching plan mapped to the room you want to own next.',
    },
    {
      numStr: '03',
      tag: 'STEP 03 · WEEKLY 1:1',
      title: 'Live sessions',
      description: 'Real practice, feedback and rewiring of habits.',
    },
    {
      numStr: '04',
      tag: 'STEP 04 · OUTCOME',
      title: 'Real results',
      description: 'You walk into your next meeting, stage or camera — grounded.',
    },
  ];

  return (
    <section id="process" className="snap-section w-full border-t border-[#DDD4C6] py-12 sm:py-14 lg:py-0 lg:h-[100dvh] flex flex-col justify-center px-5 sm:px-10 lg:px-20 xl:px-28 lg:pt-[76px] lg:pb-6 bg-[#EBE6DA] reveal-init">
      <div className="w-full max-w-[1400px] mx-auto my-0 lg:my-auto flex flex-col justify-center">
        
        {/* Section Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 mb-4 sm:mb-6">
          <div>
            {/* Main Headline */}
            <h2 className="font-serif font-normal text-4xl sm:text-5xl lg:text-[62px] text-[#181818] tracking-tight leading-[1.05]">
              How we <span className="italic text-[#AC4C30]">work</span>
            </h2>
          </div>

          {/* Right Explanatory Paragraph */}
          <p className="font-sans text-[15px] sm:text-[16px] text-[#4A423A] max-w-sm sm:max-w-md leading-relaxed self-start lg:self-end">
            A simple four-step rhythm that turns nervous energy into grounded, repeatable confidence.
          </p>
        </div>

        {/* Timeline Stepper Row */}
        <div className="relative mb-6 sm:mb-8">
          {/* Connecting line running through the centers of all 4 node circles */}
          <div 
            aria-hidden="true" 
            className="hidden sm:block absolute top-1/2 left-7 right-7 h-[1px] bg-[#DDD4C6] -translate-y-1/2" 
          />

          {/* 4 Step Circles with directional arrows on mobile view */}
          <div className="flex items-center justify-between sm:grid sm:grid-cols-4 sm:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;
              const hasNext = idx < steps.length - 1;

              return (
                <div 
                  key={step.numStr} 
                  className={`flex items-center ${hasNext ? 'flex-1 sm:flex-initial' : ''} justify-between sm:justify-start`}
                >
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-serif text-base sm:text-xl transition-all duration-300 cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#181818] text-[#F1EBE1] shadow-md scale-105 ring-2 ring-[#181818]/10'
                        : isPast
                        ? 'bg-[#E5DDCF] border border-[#C5BBAE] text-[#181818] font-medium'
                        : 'bg-[#EBE6DA] border border-[#DDD4C6] text-[#2A2420] hover:border-[#AC4C30] hover:scale-105'
                    }`}
                    aria-label={`Step ${step.numStr}: ${step.title}`}
                  >
                    {step.numStr}
                  </button>

                  {/* Directional arrow between sequence steps on mobile view */}
                  {hasNext && (
                    <div 
                      className="sm:hidden flex-1 flex items-center justify-center px-1.5 text-[#AC4C30]"
                      aria-hidden="true"
                    >
                      <ArrowRight size={16} strokeWidth={2.4} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Cards: In mobile view, only the active step card is shown (defaults to Step 1). On desktop, all 4 cards show in grid. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.numStr}
                onClick={() => setActiveStep(idx)}
                className={`rounded-[24px] p-6 sm:p-7 min-h-[190px] flex-col justify-start transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'flex bg-[#181818] text-[#F1EBE1] shadow-xl ring-1 ring-[#181818] -translate-y-1'
                    : 'hidden sm:flex bg-[#F7F2E7]/80 border border-[#DDD4C6] text-[#181818] hover:border-[#AC4C30]/50 hover:bg-[#F7F2E7] hover:-translate-y-0.5'
                }`}
              >
                {/* Step Subtitle / Tag */}
                <span
                  className={`text-[11px] font-sans font-medium uppercase tracking-[0.16em] mb-3 block ${
                    isActive ? 'text-[#C4705A]' : 'text-[#AC4C30]'
                  }`}
                >
                  {step.tag}
                </span>

                {/* Card Title */}
                <h3
                  className={`font-serif text-[28px] sm:text-[32px] leading-tight mb-2.5 ${
                    isActive ? 'text-[#F1EBE1]' : 'text-[#181818]'
                  }`}
                >
                  {step.title}
                </h3>

                {/* Card Description */}
                <p
                  className={`font-sans text-sm sm:text-[15px] leading-relaxed ${
                    isActive ? 'text-[#C4BEB4]' : 'text-[#4A423A]'
                  }`}
                >
                  {step.description}
                </p>

                {/* Mobile Next/Previous Quick Navigation */}
                <div className="sm:hidden mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans tracking-wide">
                  {idx > 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(idx - 1);
                      }}
                      className="text-[#C4BEB4] hover:text-white flex items-center gap-1 py-1 cursor-pointer"
                    >
                      ← Step {steps[idx - 1].numStr}
                    </button>
                  ) : <span />}

                  {idx < steps.length - 1 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(idx + 1);
                      }}
                      className="text-[#C4705A] font-medium hover:text-[#E8927C] flex items-center gap-1 py-1 ml-auto cursor-pointer"
                    >
                      Step {steps[idx + 1].numStr} →
                    </button>
                  ) : (
                    <span className="text-[#C4BEB4]/60 italic text-[11px] ml-auto">Ready to speak</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
