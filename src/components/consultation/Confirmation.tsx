import React from 'react';
import { Check, ArrowRight, Video, Mail, Users } from 'lucide-react';
import { ConsultationFormData } from './types';

interface ConfirmationProps {
  formData: ConsultationFormData;
  onBackToWebsite: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
  formData,
  onBackToWebsite,
}) => {
  const isGroup = formData.bookingType === 'group';
  const firstName = formData.firstName?.trim() || 'there';

  return (
    <div className="py-6 sm:py-8 flex flex-col items-center text-center animate-fade-rise" role="status" aria-live="polite">
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-[#AC4C30] text-white flex items-center justify-center mb-5 shadow-lg shadow-[#AC4C30]/25">
        <Check size={32} strokeWidth={2.5} />
      </div>

      <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-[#AC4C30] mb-2">
        {isGroup ? 'Group Seat Reserved' : 'Consultation Confirmed'}
      </span>

      <h2 className="font-sans font-bold text-[24px] sm:text-[30px] leading-[1.2] text-[#181818] tracking-tight mb-3">
        {isGroup
          ? `Your seat is reserved, ${firstName}! 🎉`
          : formData.firstName
          ? `Thanks ${formData.firstName}${formData.lastName ? ` ${formData.lastName}` : ''}, Your 1:1 Consultation has been booked 🎉`
          : 'Your 1:1 Consultation has been booked 🎉'}
      </h2>

      <p className="font-sans text-sm sm:text-base text-[#5A524A] max-w-md mx-auto leading-relaxed mb-6">
        {isGroup ? (
          <>
            Check <strong className="text-[#181818] font-semibold">{formData.email || 'your email'}</strong> for your confirmation and calendar invite. You&apos;ll be joining up to 5 other speakers in this session.
          </>
        ) : (
          <>
            A confirmation with your meeting details has been sent to{' '}
            <strong className="text-[#181818] font-semibold">{formData.email || 'your email'}</strong>. Check your inbox (and spam folder) for the calendar invite.
          </>
        )}
      </p>

      {/* Meeting Details Card */}
      <div className="w-full max-w-md bg-white rounded-2xl p-5 mb-6 border border-[#DDD4C6] shadow-xs text-left space-y-3 font-sans">
        <div className="flex items-center gap-3 pb-3 border-b border-[#EAE2D5]">
          <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] text-[#AC4C30] flex items-center justify-center shrink-0 border border-[#DDD4C6]">
            {isGroup ? <Users size={18} /> : <Video size={18} />}
          </div>
          <div>
            <span className="text-xs text-[#7A7165] block font-medium">Platform</span>
            <span className="text-sm font-semibold text-[#181818]">
              {isGroup ? '60-Min Group Masterclass (Max 6 Seats)' : '1:1 Video Call'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] text-[#AC4C30] flex items-center justify-center shrink-0 border border-[#DDD4C6]">
            <Mail size={18} />
          </div>
          <div>
            <span className="text-xs text-[#7A7165] block font-medium">Calendar Invite</span>
            <span className="text-sm font-semibold text-[#181818]">Google Calendar / Outlook</span>
          </div>
        </div>
      </div>

      {/* Back to Website Button */}
      <button
        type="button"
        onClick={onBackToWebsite}
        className="w-full max-w-md py-3.5 px-6 rounded-full font-sans text-xs sm:text-sm uppercase tracking-[0.08em] font-semibold bg-[#181818] hover:bg-[#AC4C30] text-white hover:shadow-lg transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
      >
        <span>Back to website</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
};
