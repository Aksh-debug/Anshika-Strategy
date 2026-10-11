import React from 'react';
import { Check, ArrowRight, Target } from 'lucide-react';

interface StepGoalProps {
  speakingSituation: string;
  otherSituationText: string;
  onChangeSituation: (situation: string) => void;
  onChangeOtherText: (text: string) => void;
  onNext: () => void;
}

const situations = [
  'An upcoming presentation or speaking engagement',
  'Leadership meetings and internal all-hands',
  'Investor, board, or fundraising conversations',
  'Sales calls and pitches',
  'One-on-ones and team meetings',
  'Camera, media, and podcasts',
  'Other',
];

export const StepGoal: React.FC<StepGoalProps> = ({
  speakingSituation,
  otherSituationText,
  onChangeSituation,
  onChangeOtherText,
  onNext,
}) => {
  const isOther = speakingSituation === 'Other';
  const isComplete = Boolean(
    speakingSituation && (!isOther || (isOther && otherSituationText.trim().length > 0))
  );

  return (
    <div className="flex flex-col space-y-3.5 sm:space-y-4 animate-fade-rise" role="form" aria-label="Step 2: Your Goal">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-1.5 mb-1 text-[#AC4C30]">
          <Target size={13} />
          <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold">
            Speaking Focus
          </span>
        </div>
        <h2 className="font-sans font-bold text-[24px] sm:text-[28px] leading-[1.2] text-[#181818] tracking-tight">
          What speaking situation do you need help with?
        </h2>
        <p className="font-sans text-xs sm:text-[13px] text-[#5A524A] mt-1 leading-relaxed">
          Select the primary room, audience, or high-stakes moment where you want to show up with natural executive presence.
        </p>
      </div>

      {/* Option Cards */}
      <fieldset className="space-y-1.5">
        <legend className="sr-only">Speaking situation options</legend>
        <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="Speaking situation options">
          {situations.map((item) => {
            const isSelected = speakingSituation === item;
            return (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChangeSituation(item)}
                className={`w-full py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-[#AC4C30]/25 select-none ${
                  isSelected
                    ? 'bg-[#181818] text-[#FAF8F5] border-[#181818] shadow-md -translate-y-0.5'
                    : 'bg-[#FAF8F5] text-[#181818] border-[#DDD4C6] hover:border-[#AC4C30]/60 hover:bg-[#F5EFE6]'
                }`}
              >
                <span className={`font-sans text-xs sm:text-[13.5px] font-medium leading-snug pr-3 ${isSelected ? 'text-[#FAF8F5]' : 'text-[#181818]'}`}>
                  {item}
                </span>

                <div
                  className={`w-4.5 h-4.5 rounded-full shrink-0 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#AC4C30] text-white shadow-2xs'
                      : 'border border-[#DDD4C6] group-hover:border-[#AC4C30]/60'
                  }`}
                >
                  {isSelected && <Check size={11} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Conditional Textarea for "Other" */}
      {isOther && (
        <div className="pt-0.5 animate-fade-rise">
          <label
            htmlFor="otherSituation"
            className="font-sans text-xs font-semibold text-[#3A342C] block mb-1"
          >
            Tell us briefly <span className="text-[#AC4C30]">*</span>
          </label>
          <input
            id="otherSituation"
            type="text"
            autoFocus
            value={otherSituationText}
            onChange={(e) => onChangeOtherText(e.target.value)}
            placeholder="e.g. TedX talk, panel moderation, international keynote"
            className="w-full bg-[#FAF8F5] border border-[#DDD4C6] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#181818] placeholder-[#9E958A] focus:outline-none focus:border-[#AC4C30] focus:ring-2 focus:ring-[#AC4C30]/15 transition-all"
          />
        </div>
      )}

      {/* Submit / Continue Button */}
      <div className="pt-2 sm:pt-3">
        <button
          type="button"
          onClick={onNext}
          disabled={!isComplete}
          aria-disabled={!isComplete}
          className={`w-full py-3.5 px-6 rounded-full font-sans text-xs sm:text-sm uppercase tracking-[0.08em] font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
            isComplete
              ? 'bg-[#AC4C30] hover:bg-[#973F28] text-white hover:shadow-lg cursor-pointer active:scale-[0.99]'
              : 'bg-[#DDD4C6] text-[#7A7165] cursor-not-allowed opacity-75'
          }`}
        >
          <span>Continue to Your Details</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
