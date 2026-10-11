import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Calendar as CalendarIcon, Check, CheckCircle2, Users } from 'lucide-react';
import { ConsultationFormData } from './types';

interface StepScheduleProps {
  formData: ConsultationFormData;
  onScheduled: () => void;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement | null }) => void;
    };
  }
}

export const StepSchedule: React.FC<StepScheduleProps> = ({
  formData,
  onScheduled,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeLoadCountRef = useRef(0);
  const hasTriggeredRef = useRef(false);

  const [isScheduled, setIsScheduled] = useState(() => {
    return localStorage.getItem('anshika_consultation_booked') === 'true';
  });

  const isGroup = formData.bookingType === 'group';
  const displayName =
    formData.firstName?.trim()
      ? `${formData.firstName.trim()}${formData.lastName?.trim() ? ` ${formData.lastName.trim()}` : ''}`
      : 'there';

  // Construct official Calendly embed URL with pre-filled inputs & UTM qualification tags
  const calendlyUrl = useMemo(() => {
    const rawBaseUrl = isGroup
      ? import.meta.env.VITE_CALENDLY_GROUP_URL || import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/adityarajawat04/30min'
      : import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/adityarajawat04/30min';

    const baseUrl = rawBaseUrl.split('?')[0].replace(/\/$/, '');
    const situation =
      formData.speakingSituation === 'Other'
        ? formData.otherSituationText || 'Other'
        : formData.speakingSituation;

    const fullPhone = `${formData.countryCode} ${formData.phone}`.trim();

    const params = new URLSearchParams();
    params.set('hide_event_type_details', '1');
    params.set('hide_gdpr_banner', '1');
    params.set('primary_color', 'ac4c30');

    try {
      if (typeof window !== 'undefined' && window.location.host) {
        params.set('embed_domain', window.location.host);
      }
    } catch {}
    params.set('embed_type', 'Inline');

    if (formData.firstName) params.set('first_name', formData.firstName);
    if (formData.lastName) params.set('last_name', formData.lastName);
    if (formData.email) params.set('email', formData.email);
    if (fullPhone) params.set('a1', fullPhone);

    // UTM tracking
    params.set('utm_source', 'website');
    params.set('utm_medium', isGroup ? 'group_form' : 'consultation_form');
    if (formData.profile) params.set('utm_campaign', formData.profile);
    if (isGroup) {
      if (formData.confidenceLevel) params.set('utm_content', formData.confidenceLevel);
    } else {
      if (formData.commitment) params.set('utm_content', formData.commitment);
    }
    if (situation) params.set('utm_term', situation);

    return `${baseUrl}?${params.toString()}`;
  }, [formData, isGroup]);

  // Load official Calendly script
  useEffect(() => {
    const scriptSrc = 'https://assets.calendly.com/assets/external/widget.js';
    let scriptTag = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.src = scriptSrc;
      scriptTag.async = true;
      document.body.appendChild(scriptTag);
    }
  }, []);

  // Trigger confirmation modal automatically with a delay of 1.5 seconds (1-2 seconds)
  const triggerConfirmation = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsScheduled(true);
    try {
      localStorage.setItem('anshika_consultation_booked', 'true');
    } catch {}

    setTimeout(() => {
      onScheduled();
    }, 1500);
  };

  // Listen for Calendly event_scheduled postMessage across all possible structures
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data) return;
      let isCalendlyEvent = false;

      if (typeof e.data === 'object') {
        const evt = e.data.event || e.data.action || '';
        if (evt === 'calendly.event_scheduled' || (typeof evt === 'string' && evt.includes('scheduled'))) {
          isCalendlyEvent = true;
        }
      } else if (typeof e.data === 'string') {
        if (e.data.includes('calendly.event_scheduled') || e.data.includes('event_scheduled')) {
          isCalendlyEvent = true;
        }
      }

      if (isCalendlyEvent) {
        triggerConfirmation();
      }
    };

    window.addEventListener('message', handleMessage);
    document.addEventListener('message' as any, handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('message' as any, handleMessage);
    };
  }, [onScheduled]);

  // Handle iframe load detection (fires when Calendly finishes booking and redirects to its confirmation)
  const handleIFrameLoad = () => {
    iframeLoadCountRef.current += 1;
    if (iframeLoadCountRef.current >= 2) {
      triggerConfirmation();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 space-y-2.5 sm:space-y-3 animate-fade-rise" role="region" aria-label="Step 4: Pick a Time">
      {/* Step Header */}
      <div className="shrink-0">
        <div className="flex items-center gap-1.5 mb-1 text-[#AC4C30]">
          {isScheduled ? (
            <CheckCircle2 size={14} className="text-emerald-600" />
          ) : isGroup ? (
            <Users size={13} />
          ) : (
            <CalendarIcon size={13} />
          )}
          <span className={`font-sans text-[11px] uppercase tracking-[0.16em] font-semibold ${isScheduled ? 'text-emerald-700' : 'text-[#AC4C30]'}`}>
            {isScheduled
              ? isGroup
                ? 'Seat Reserved'
                : 'Consultation Confirmed'
              : isGroup
              ? 'Limited Cohort (6 Seats)'
              : 'Real-Time Availability'}
          </span>
        </div>

        {/* Dynamic Headline */}
        <h2 className="font-sans font-bold text-[22px] sm:text-[26px] leading-[1.2] text-[#181818] tracking-tight">
          {isScheduled
            ? isGroup
              ? `Your seat is reserved, ${displayName}! 🎉`
              : `Thanks ${displayName}, Your 1:1 Consultation has been booked`
            : isGroup
            ? 'Pick a group session (only 6 seats each)'
            : formData.firstName
            ? `${formData.firstName}, choose a time for your 1:1 consultation`
            : 'Choose a time for your free consultation'}
        </h2>

        <p className="font-sans text-xs sm:text-[13px] text-[#5A524A] mt-1 leading-relaxed">
          {isScheduled
            ? isGroup
              ? `Check ${formData.email || 'your email'} for your confirmation and calendar invite. You'll be joining up to 5 other speakers in this session.`
              : `A confirmation email with calendar invites and Google Meet details has been sent to ${formData.email || 'your email'}. Check your inbox!`
            : isGroup
            ? 'Select a 60-minute cohort date that works for you in the calendar below to reserve your seat.'
            : 'Select a 30-minute window that works for you in the calendar below, then schedule your session.'}
        </p>

        {isScheduled && (
          <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900 animate-fade-rise">
            <Check size={14} className="text-emerald-600 shrink-0 stroke-[3]" />
            <span>Meeting scheduled! Opening your confirmation...</span>
          </div>
        )}
      </div>

      {/* Calendly Inline Widget Container */}
      <div
        ref={containerRef}
        className="w-full flex-1 min-h-[480px] sm:min-h-0 rounded-2xl overflow-hidden border border-[#DDD4C6] bg-white shadow-xs relative"
      >
        <iframe
          src={calendlyUrl}
          width="100%"
          height="100%"
          onLoad={handleIFrameLoad}
          className="absolute inset-0 w-full h-full border-0"
          title={isGroup ? 'Reserve Group Speaking Session' : 'Schedule Free Consultation with Anshika Sharma'}
        />
      </div>

      {/* Subtle confirmation link fallback */}
      <div className="shrink-0 flex items-center justify-between text-[11.5px] text-[#7A7165] px-1 -mt-1">
        <span>Confirmation will appear automatically once scheduled.</span>
        <button
          type="button"
          onClick={triggerConfirmation}
          className="text-[#AC4C30] hover:underline font-medium cursor-pointer"
        >
          View confirmation →
        </button>
      </div>
    </div>
  );
};
