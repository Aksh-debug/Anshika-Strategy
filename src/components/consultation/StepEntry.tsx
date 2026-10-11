import React from 'react';
import { User, Users, ArrowRight, Sparkles } from 'lucide-react';
import { BookingType } from './types';

interface StepEntryProps {
  currentType: BookingType;
  onSelectPath: (type: BookingType) => void;
}

export const StepEntry: React.FC<StepEntryProps> = ({
  currentType,
  onSelectPath,
}) => {
  return (
    <div className="flex flex-col space-y-6 sm:space-y-7 animate-fade-rise py-2 sm:py-4" role="region" aria-label="Choose Coaching Format">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 mb-2 text-[#AC4C30]">
          <Sparkles size={14} />
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold">
            Select Your Format
          </span>
        </div>
        <h2 className="font-sans font-bold text-[24px] sm:text-[30px] leading-[1.18] text-[#181818] tracking-tight">
          How would you like to work with Anshika?
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#5A524A] mt-2 leading-relaxed max-w-lg">
          Choose between private one-on-one executive mentorship or an interactive small-group public speaking cohort.
        </p>
      </div>

      {/* Two Large Selectable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
        {/* Card 1: 1:1 Consultation */}
        <button
          type="button"
          onClick={() => onSelectPath('1on1')}
          className={`group p-6 sm:p-7 rounded-2xl sm:rounded-3xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative shadow-xs hover:shadow-md ${
            currentType === '1on1'
              ? 'bg-[#181818] border-[#181818] text-white ring-2 ring-[#AC4C30]/20'
              : 'bg-white hover:bg-[#FAF7F0] border-[#DDD4C6] text-[#181818]'
          }`}
        >
          <div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
              currentType === '1on1' ? 'bg-[#AC4C30] text-white' : 'bg-[#FAF8F5] text-[#AC4C30] border border-[#DDD4C6]'
            }`}>
              <User size={22} strokeWidth={2.2} />
            </div>

            <h3 className={`font-sans font-bold text-xl sm:text-[22px] tracking-tight ${
              currentType === '1on1' ? 'text-white' : 'text-[#181818]'
            }`}>
              1:1 Consultation
            </h3>

            <p className={`font-sans text-xs uppercase tracking-[0.14em] font-semibold mt-1 ${
              currentType === '1on1' ? 'text-[#D0C7BC]' : 'text-[#857B6F]'
            }`}>
              Personal Coaching
            </p>

            <p className={`font-sans text-xs sm:text-sm mt-3.5 leading-relaxed ${
              currentType === '1on1' ? 'text-[#B8AFA4]' : 'text-[#5A524A]'
            }`}>
              Custom, confidential guidance tailored to your high-stakes presentations, executive presence, and career goals.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              currentType === '1on1' ? 'text-white' : 'text-[#AC4C30]'
            }`}>
              Start 1:1 Flow
            </span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${
              currentType === '1on1' ? 'bg-white/10 text-white' : 'bg-[#FAF8F5] text-[#181818] border border-[#DDD4C6]'
            }`}>
              <ArrowRight size={15} />
            </div>
          </div>
        </button>

        {/* Card 2: Group Session */}
        <button
          type="button"
          onClick={() => onSelectPath('group')}
          className={`group p-6 sm:p-7 rounded-2xl sm:rounded-3xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative shadow-xs hover:shadow-md ${
            currentType === 'group'
              ? 'bg-[#181818] border-[#181818] text-white ring-2 ring-[#AC4C30]/20'
              : 'bg-white hover:bg-[#FAF7F0] border-[#DDD4C6] text-[#181818]'
          }`}
        >
          <div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
              currentType === 'group' ? 'bg-[#AC4C30] text-white' : 'bg-[#FAF8F5] text-[#AC4C30] border border-[#DDD4C6]'
            }`}>
              <Users size={22} strokeWidth={2.2} />
            </div>

            <h3 className={`font-sans font-bold text-xl sm:text-[22px] tracking-tight ${
              currentType === 'group' ? 'text-white' : 'text-[#181818]'
            }`}>
              Group Session
            </h3>

            <p className={`font-sans text-xs uppercase tracking-[0.14em] font-semibold mt-1 ${
              currentType === 'group' ? 'text-[#D0C7BC]' : 'text-[#857B6F]'
            }`}>
              60 Mins · 6 Seats
            </p>

            <p className={`font-sans text-xs sm:text-sm mt-3.5 leading-relaxed ${
              currentType === 'group' ? 'text-[#B8AFA4]' : 'text-[#5A524A]'
            }`}>
              High-impact, intimate peer practice. Learn in real time with live feedback alongside other ambitious speakers.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              currentType === 'group' ? 'text-white' : 'text-[#AC4C30]'
            }`}>
              Start Group Flow
            </span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${
              currentType === 'group' ? 'bg-white/10 text-white' : 'bg-[#FAF8F5] text-[#181818] border border-[#DDD4C6]'
            }`}>
              <ArrowRight size={15} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
