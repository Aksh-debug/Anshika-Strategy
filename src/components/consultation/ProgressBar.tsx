import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  onBack?: () => void;
  showBack?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 4,
  onBack,
  showBack = false,
}) => {
  const percentage = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className="w-full mb-4 sm:mb-5 select-none shrink-0" role="region" aria-label="Form Progress">
      <div className="flex items-center justify-between gap-3 mb-2 pr-10 sm:pr-12">
        <div className="flex items-center gap-2">
          {showBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back to previous step"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#7A7165] hover:text-[#181818] py-1 px-2.5 -ml-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#AC4C30]/20"
            >
              <ArrowLeft size={13} strokeWidth={2.4} />
              <span>Back</span>
            </button>
          ) : (
            <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#AC4C30] font-semibold">
              Anshika Sharma Coaching
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-sans">
          <span className="text-[#181818] font-semibold tracking-tight">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-[#8F8578] text-[11px]">
            ({percentage}%)
          </span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div
        className="w-full h-1.5 bg-[#EAE2D5] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-[#AC4C30] to-[#C1583C] rounded-full transition-all duration-400 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
