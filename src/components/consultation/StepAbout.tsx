import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, AlertCircle, X, Compass, ExternalLink } from 'lucide-react';
import { ProfileOption, CommitmentOption, ConfidenceLevel, BookingType } from './types';

interface StepAboutProps {
  bookingType: BookingType;
  profile: ProfileOption;
  commitment: CommitmentOption;
  confidenceLevel: ConfidenceLevel;
  onChangeProfile: (profile: ProfileOption) => void;
  onChangeCommitment: (commitment: CommitmentOption) => void;
  onChangeConfidenceLevel: (confidence: ConfidenceLevel) => void;
  onNext: () => void;
}

const profileOptions: { id: ProfileOption; label: string }[] = [
  { id: 'Working Professional', label: 'Working Professional' },
  { id: 'Founder', label: 'Founder' },
  { id: 'Student', label: 'Student' },
  { id: 'Other', label: 'Other' },
];

const confidenceOptions: { id: ConfidenceLevel; label: string; desc: string }[] = [
  {
    id: 'Just starting out',
    label: 'Just starting out',
    desc: 'Feel nervous or avoid speaking opportunities.',
  },
  {
    id: 'Somewhat confident',
    label: 'Somewhat confident',
    desc: 'Speak when needed, but want more polish and calm.',
  },
  {
    id: 'Confident, want to level up',
    label: 'Confident, want to level up',
    desc: 'Ready for commanding authority and executive poise.',
  },
];

export const StepAbout: React.FC<StepAboutProps> = ({
  bookingType,
  profile,
  commitment,
  confidenceLevel,
  onChangeProfile,
  onChangeCommitment,
  onChangeConfidenceLevel,
  onNext,
}) => {
  const isComplete =
    bookingType === 'group'
      ? Boolean(profile && confidenceLevel)
      : Boolean(profile && commitment);

  const [showIneligiblePopup, setShowIneligiblePopup] = useState(false);

  const handleContinue = () => {
    // If user is on 1:1 path and selected "Not right now" (No), they are not eligible for the intensive consultation
    if (bookingType === '1on1' && commitment === 'No') {
      setShowIneligiblePopup(true);
      return;
    }
    onNext();
  };

  return (
    <div
      className="flex flex-col space-y-5 sm:space-y-6 animate-fade-rise relative"
      role="form"
      aria-label="Step 1: About You"
    >
      {/* Polite Ineligibility Modal */}
      {showIneligiblePopup && (
        <div
          className="absolute -inset-4 sm:-inset-6 md:-inset-8 z-40 bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between animate-fade-in text-left border border-[#DDD4C6]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ineligible-title"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setShowIneligiblePopup(false)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-[#EFE8DC] hover:bg-[#E2D8C8] text-[#554E46] hover:text-[#181818] border border-[#DDD4C6] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close message"
          >
            <X size={17} strokeWidth={2.2} />
          </button>

          <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full py-4 sm:py-6">
            {/* Header with Icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4EBE2] border border-[#E0D2C2] text-[#AC4C30] flex items-center justify-center shrink-0 shadow-2xs">
                <Compass size={24} />
              </div>
              <div>
                <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold text-[#AC4C30] block">
                  Eligibility Notice
                </span>
                <h3
                  id="ineligible-title"
                  className="font-sans font-bold text-2xl sm:text-[26px] text-[#181818] tracking-tight leading-snug"
                >
                  Thank You for Your Interest
                </h3>
              </div>
            </div>

            {/* Short & readable content */}
            <p className="font-sans text-sm sm:text-[15px] text-[#5A524A] leading-relaxed mb-4">
              Our 1:1 coaching requires <strong>2–3 hours of weekly practice</strong> to guarantee meaningful progress.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-[#DDD4C6] text-xs sm:text-[13px] text-[#6E6458] leading-relaxed mb-6">
              Because you cannot commit right now, you are currently not eligible for this consultation. We'd love to work together once your schedule allows!
            </div>
          </div>

          {/* Action buttons */}
          <div className="max-w-xl mx-auto w-full pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowIneligiblePopup(false);
                  onChangeCommitment('Yes');
                }}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#181818] hover:bg-[#AC4C30] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] text-center transition-all cursor-pointer shadow-xs active:scale-98"
              >
                I can commit 2–3 hrs/wk
              </button>
              <button
                type="button"
                onClick={() => setShowIneligiblePopup(false)}
                className="py-3.5 px-6 rounded-full bg-white hover:bg-[#FAF8F5] text-[#5A524A] border border-[#DDD4C6] font-sans text-xs sm:text-sm font-medium text-center transition-colors cursor-pointer"
              >
                Review answers
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5 text-[#AC4C30]">
          <Sparkles size={13} />
          <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold">
            {bookingType === 'group' ? 'Group Cohort Intake' : 'Program Matching'}
          </span>
        </div>
        <h2 className="font-sans font-bold text-[24px] sm:text-[28px] leading-[1.2] text-[#181818] tracking-tight">
          {bookingType === 'group'
            ? 'Tell us about your background'
            : "Let's find the right program for you"}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#5A524A] mt-1.5 leading-relaxed">
          {bookingType === 'group'
            ? 'This helps us group you with peers at a similar speaking stage for optimal practice and growth.'
            : 'Tell us about your current role and weekly availability so Anshika can tailor the roadmap to your schedule.'}
        </p>
      </div>

      {/* Question 1: Profile */}
      <fieldset>
        <legend className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.06em] text-[#3A342C] mb-2.5 block">
          Which best describes you? <span className="text-[#AC4C30]">*</span>
        </legend>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          role="radiogroup"
          aria-label="Which best describes you?"
        >
          {profileOptions.map((opt) => {
            const isSelected = profile === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChangeProfile(opt.id)}
                className={`py-3 px-4 rounded-xl border font-sans text-xs sm:text-sm font-medium text-left transition-all duration-200 cursor-pointer flex items-center justify-between shadow-2xs ${
                  isSelected
                    ? 'border-[#AC4C30] bg-[#FAF2EE] text-[#AC4C30] font-semibold shadow-xs ring-1 ring-[#AC4C30]/20'
                    : 'border-[#DDD4C6] bg-white text-[#181818] hover:border-[#B5A898] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-[#AC4C30] text-white flex items-center justify-center shrink-0">
                    <Check size={11} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Question 2: Branch based on bookingType */}
      {bookingType === 'group' ? (
        <fieldset>
          <legend className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.06em] text-[#3A342C] mb-2.5 block">
            How confident do you feel speaking in front of others? <span className="text-[#AC4C30]">*</span>
          </legend>
          <div
            className="grid grid-cols-1 gap-2.5"
            role="radiogroup"
            aria-label="Confidence level"
          >
            {confidenceOptions.map((opt) => {
              const isSelected = confidenceLevel === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onChangeConfidenceLevel(opt.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 shadow-2xs ${
                    isSelected
                      ? 'border-[#AC4C30] bg-[#FAF2EE] text-[#AC4C30] shadow-xs ring-1 ring-[#AC4C30]/20'
                      : 'border-[#DDD4C6] bg-white text-[#181818] hover:border-[#B5A898] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="pr-2">
                    <span className="font-sans font-semibold text-xs sm:text-sm block">
                      {opt.label}
                    </span>
                    <span className="font-sans text-[11px] sm:text-xs text-[#7A7165] mt-0.5 block">
                      {opt.desc}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-[#AC4C30] text-white flex items-center justify-center shrink-0">
                      <Check size={11} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <fieldset>
          <legend className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.06em] text-[#3A342C] mb-2.5 block">
            Can you dedicate 2–3 hours per week to practice? <span className="text-[#AC4C30]">*</span>
          </legend>
          <div
            className="grid grid-cols-2 gap-2.5 sm:gap-3"
            role="radiogroup"
            aria-label="Commitment availability"
          >
            {(['Yes', 'No'] as CommitmentOption[]).map((opt) => {
              const isSelected = commitment === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onChangeCommitment(opt)}
                  className={`py-3.5 px-4 rounded-xl border font-sans text-xs sm:text-sm font-medium text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-2xs ${
                    isSelected
                      ? 'border-[#AC4C30] bg-[#FAF2EE] text-[#AC4C30] font-semibold shadow-xs ring-1 ring-[#AC4C30]/20'
                      : 'border-[#DDD4C6] bg-white text-[#181818] hover:border-[#B5A898] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span>{opt === 'Yes' ? 'Yes, I can' : 'Not right now'}</span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-[#AC4C30] text-white flex items-center justify-center shrink-0">
                      <Check size={11} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Submit / Continue Button */}
      <div className="pt-2 sm:pt-3">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!isComplete}
          className={`w-full py-3.5 px-6 rounded-full font-sans text-xs sm:text-sm uppercase tracking-[0.08em] font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
            isComplete
              ? 'bg-[#181818] hover:bg-[#AC4C30] text-white hover:shadow-md cursor-pointer'
              : 'bg-[#DDD4C6] text-[#8F8578] cursor-not-allowed opacity-75'
          }`}
        >
          <span>Continue</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
