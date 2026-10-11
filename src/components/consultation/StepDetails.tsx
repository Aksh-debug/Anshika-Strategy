import React, { useState, useEffect } from 'react';
import { ArrowRight, UserCheck, ShieldCheck, ChevronDown } from 'lucide-react';
import { ConsultationFormData } from './types';

interface StepDetailsProps {
  formData: ConsultationFormData;
  onChangeField: <K extends keyof ConsultationFormData>(field: K, value: ConsultationFormData[K]) => void;
  onNext: () => void;
}

export const StepDetails: React.FC<StepDetailsProps> = ({
  formData,
  onChangeField,
  onNext,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryOptions = [
    { code: '+1', flag: '🇺🇸', label: 'United States (+1)' },
    { code: '+1', flag: '🇨🇦', label: 'Canada (+1)' },
    { code: '+44', flag: '🇬🇧', label: 'United Kingdom (+44)' },
    { code: '+91', flag: '🇮🇳', label: 'India (+91)' },
    { code: '+61', flag: '🇦🇺', label: 'Australia (+61)' },
    { code: '+971', flag: '🇦🇪', label: 'UAE (+971)' },
    { code: '+65', flag: '🇸🇬', label: 'Singapore (+65)' },
    { code: '+49', flag: '🇩🇪', label: 'Germany (+49)' },
  ];

  // Auto-detect user country on mount based on browser timezone, locale, and geo IP
  useEffect(() => {
    // Only detect if user hasn't typed a phone number yet
    if (formData.phone) return;

    let detected = false;
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const lang = (navigator.language || '').toUpperCase();

      if (timeZone.includes('Calcutta') || timeZone.includes('Kolkata') || lang.endsWith('IN')) {
        onChangeField('countryCode', '+91');
        detected = true;
      } else if (timeZone.includes('London') || lang.endsWith('GB') || lang.endsWith('UK')) {
        onChangeField('countryCode', '+44');
        detected = true;
      } else if (
        timeZone.includes('Sydney') ||
        timeZone.includes('Melbourne') ||
        timeZone.includes('Brisbane') ||
        timeZone.includes('Perth') ||
        lang.endsWith('AU')
      ) {
        onChangeField('countryCode', '+61');
        detected = true;
      } else if (timeZone.includes('Dubai') || lang.endsWith('AE')) {
        onChangeField('countryCode', '+971');
        detected = true;
      } else if (timeZone.includes('Singapore') || lang.endsWith('SG')) {
        onChangeField('countryCode', '+65');
        detected = true;
      } else if (timeZone.includes('Berlin') || lang.endsWith('DE')) {
        onChangeField('countryCode', '+49');
        detected = true;
      } else if (
        timeZone.includes('Toronto') ||
        timeZone.includes('Vancouver') ||
        timeZone.includes('Edmonton') ||
        lang.endsWith('CA')
      ) {
        onChangeField('countryCode', '+1');
        detected = true;
      } else if (
        timeZone.includes('New_York') ||
        timeZone.includes('Chicago') ||
        timeZone.includes('Denver') ||
        timeZone.includes('Los_Angeles') ||
        lang.endsWith('US')
      ) {
        onChangeField('countryCode', '+1');
        detected = true;
      }
    } catch {}

    if (!detected) {
      try {
        fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout ? AbortSignal.timeout(2000) : undefined })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data && data.country_calling_code) {
              const code = data.country_calling_code.startsWith('+')
                ? data.country_calling_code
                : `+${data.country_calling_code}`;
              if (countryOptions.some((c) => c.code === code)) {
                onChangeField('countryCode', code);
              }
            }
          })
          .catch(() => {});
      } catch {}
    }
  }, []);

  const formatPhoneNumber = (val: string, countryCode: string): string => {
    let digits = val.replace(/\D/g, '');

    // Strip leading trunk zero for countries like UK/Australia if user types it
    if ((countryCode === '+44' || countryCode === '+61' || countryCode === '+49') && digits.startsWith('0')) {
      digits = digits.slice(1);
    }

    if (countryCode === '+1') {
      const trimmed = digits.slice(0, 10);
      if (trimmed.length <= 3) return trimmed;
      if (trimmed.length <= 6) return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
      return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
    }

    if (countryCode === '+91') {
      const trimmed = digits.slice(0, 10);
      if (trimmed.length <= 5) return trimmed;
      return `${trimmed.slice(0, 5)} ${trimmed.slice(5)}`;
    }

    if (countryCode === '+44') {
      const trimmed = digits.slice(0, 11);
      if (trimmed.length <= 5) return trimmed;
      return `${trimmed.slice(0, 5)} ${trimmed.slice(5)}`;
    }

    if (countryCode === '+61') {
      const trimmed = digits.slice(0, 9);
      if (trimmed.length <= 3) return trimmed;
      if (trimmed.length <= 6) return `${trimmed.slice(0, 3)} ${trimmed.slice(3)}`;
      return `${trimmed.slice(0, 3)} ${trimmed.slice(3, 6)} ${trimmed.slice(6)}`;
    }

    if (countryCode === '+971') {
      const trimmed = digits.slice(0, 9);
      if (trimmed.length <= 2) return trimmed;
      if (trimmed.length <= 5) return `${trimmed.slice(0, 2)} ${trimmed.slice(2)}`;
      return `${trimmed.slice(0, 2)} ${trimmed.slice(2, 5)} ${trimmed.slice(5)}`;
    }

    if (countryCode === '+65') {
      const trimmed = digits.slice(0, 8);
      if (trimmed.length <= 4) return trimmed;
      return `${trimmed.slice(0, 4)} ${trimmed.slice(4)}`;
    }

    return val;
  };

  const validatePhoneForCountry = (phone: string, countryCode: string): string | null => {
    const raw = phone.trim();
    if (!raw) return 'Phone number is required';

    let digits = raw.replace(/\D/g, '');

    // Strip optional leading trunk zero (e.g. 07... in UK)
    if ((countryCode === '+44' || countryCode === '+61' || countryCode === '+49') && digits.startsWith('0')) {
      digits = digits.slice(1);
    }

    if (countryCode === '+1') {
      if (digits.length !== 10) {
        return 'Please enter a valid 10-digit US/Canada phone number';
      }
      if (digits[0] === '0' || digits[0] === '1') {
        return 'US/Canada area codes cannot start with 0 or 1';
      }
      return null;
    }

    if (countryCode === '+91') {
      if (digits.length !== 10) {
        return 'Please enter a complete 10-digit Indian phone number';
      }
      if (!/^[6-9]/.test(digits)) {
        return 'Indian mobile numbers must start with 6, 7, 8, or 9';
      }
      return null;
    }

    if (countryCode === '+44') {
      if (digits.length < 10 || digits.length > 11) {
        return 'Please enter a valid 10 or 11-digit UK phone number';
      }
      return null;
    }

    if (countryCode === '+61') {
      if (digits.length !== 9) {
        return 'Please enter a valid 9-digit Australian phone number (e.g. 412 345 678)';
      }
      return null;
    }

    if (countryCode === '+971') {
      if (digits.length !== 9) {
        return 'Please enter a valid 9-digit UAE phone number (e.g. 50 123 4567)';
      }
      return null;
    }

    if (countryCode === '+65') {
      if (digits.length !== 8) {
        return 'Please enter a valid 8-digit Singapore phone number';
      }
      return null;
    }

    if (countryCode === '+49') {
      if (digits.length < 9 || digits.length > 12) {
        return 'Please enter a valid German phone number (9–12 digits)';
      }
      return null;
    }

    // Default ITU E.164
    if (digits.length < 7 || digits.length > 15) {
      return 'Please enter a valid international phone number (7–15 digits)';
    }

    return null;
  };

  const getPhonePlaceholder = (countryCode: string): string => {
    switch (countryCode) {
      case '+1':
        return '(415) 555-0192';
      case '+91':
        return '98765 43210';
      case '+44':
        return '7911 123456';
      case '+61':
        return '412 345 678';
      case '+971':
        return '50 123 4567';
      case '+65':
        return '9123 4567';
      case '+49':
        return '170 1234567';
      default:
        return 'Phone number';
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneError = validatePhoneForCountry(formData.phone, formData.countryCode);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // POST lead data to VITE_LEAD_WEBHOOK_URL if provided
    try {
      const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;
      if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim() !== '') {
        await fetch(webhookUrl.trim(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingType: formData.bookingType,
            profile: formData.profile,
            commitment: formData.commitment,
            confidenceLevel: formData.confidenceLevel,
            speakingSituation:
              formData.speakingSituation === 'Other'
                ? formData.otherSituationText
                : formData.speakingSituation,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: `${formData.countryCode} ${formData.phone}`,
            consent: formData.consent,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch {
      // Silently continue if webhook fails or is unavailable
    } finally {
      setIsSubmitting(false);
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5 animate-fade-rise" noValidate>
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5 text-[#AC4C30]">
          <UserCheck size={14} />
          <span className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold">
            Contact Information
          </span>
        </div>
        <h2 className="font-sans font-bold text-[24px] sm:text-[28px] leading-[1.2] text-[#181818] tracking-tight">
          Where should we send your session invite?
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#5A524A] mt-2 leading-relaxed">
          We use your details to pre-populate your private consultation link and send your preparation checklist.
        </p>
      </div>

      {/* Name Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label htmlFor="firstName" className="font-sans text-xs font-semibold text-[#3A342C] block mb-1.5">
            First Name <span className="text-[#AC4C30]">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={(e) => {
              onChangeField('firstName', e.target.value);
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
            }}
            placeholder="e.g. Rachel"
            className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm text-[#181818] placeholder-[#9E958A] focus:outline-none transition-all ${
              errors.firstName
                ? 'border-red-400 focus:border-red-500 ring-2 ring-red-100'
                : 'border-[#DDD4C6] focus:border-[#AC4C30] focus:ring-2 focus:ring-[#AC4C30]/15'
            }`}
          />
          {errors.firstName && (
            <p className="font-sans text-xs text-red-500 mt-1" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="font-sans text-xs font-semibold text-[#3A342C] block mb-1.5">
            Last Name <span className="text-[#AC4C30]">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={(e) => {
              onChangeField('lastName', e.target.value);
              if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: '' }));
            }}
            placeholder="e.g. Adams"
            className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm text-[#181818] placeholder-[#9E958A] focus:outline-none transition-all ${
              errors.lastName
                ? 'border-red-400 focus:border-red-500 ring-2 ring-red-100'
                : 'border-[#DDD4C6] focus:border-[#AC4C30] focus:ring-2 focus:ring-[#AC4C30]/15'
            }`}
          />
          {errors.lastName && (
            <p className="font-sans text-xs text-red-500 mt-1" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="font-sans text-xs font-semibold text-[#3A342C] block mb-1.5">
          Email Address <span className="text-[#AC4C30]">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => {
            onChangeField('email', e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          placeholder="rachel@company.com"
          className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm text-[#181818] placeholder-[#9E958A] focus:outline-none transition-all ${
            errors.email
              ? 'border-red-400 focus:border-red-500 ring-2 ring-red-100'
              : 'border-[#DDD4C6] focus:border-[#AC4C30] focus:ring-2 focus:ring-[#AC4C30]/15'
          }`}
        />
        {errors.email && (
          <p className="font-sans text-xs text-red-500 mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Number with Country Selector */}
      <div>
        <label htmlFor="phone" className="font-sans text-xs font-semibold text-[#3A342C] block mb-1.5">
          Phone Number <span className="text-[#AC4C30]">*</span>
        </label>
        <div className="flex gap-2.5 sm:gap-3 items-stretch">
          {/* Country Selector */}
          <div className="relative shrink-0 flex items-stretch">
            <select
              aria-label="Country Code"
              value={formData.countryCode}
              onChange={(e) => {
                const newCode = e.target.value;
                onChangeField('countryCode', newCode);
                const reformatted = formatPhoneNumber(formData.phone, newCode);
                onChangeField('phone', reformatted);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              className="h-full bg-[#FAF8F5] border border-[#DDD4C6] rounded-xl pl-3.5 pr-8 py-3 text-xs sm:text-sm font-sans font-medium text-[#181818] focus:outline-none focus:border-[#AC4C30] focus:ring-2 focus:ring-[#AC4C30]/15 cursor-pointer appearance-none transition-all select-none"
            >
              {countryOptions.map((c, i) => (
                <option key={`${c.label}-${i}`} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            {/* Custom SVG Chevron Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#7A7165]">
              <ChevronDown size={14} strokeWidth={2.2} />
            </div>
          </div>

          {/* Phone Input */}
          <div className="flex-1 min-w-0">
            <input
              id="phone"
              type="tel"
              autoComplete="tel-national"
              value={formData.phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value, formData.countryCode);
                onChangeField('phone', formatted);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              placeholder={getPhonePlaceholder(formData.countryCode)}
              className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 text-sm text-[#181818] placeholder-[#9E958A] focus:outline-none transition-all ${
                errors.phone
                  ? 'border-red-400 focus:border-red-500 ring-2 ring-red-100'
                  : 'border-[#DDD4C6] focus:border-[#AC4C30] focus:ring-2 focus:ring-[#AC4C30]/15'
              }`}
            />
          </div>
        </div>
        {errors.phone ? (
          <p className="font-sans text-xs text-red-500 mt-1.5" role="alert">
            {errors.phone}
          </p>
        ) : (
          <span className="font-sans text-[11px] text-[#7A7165] mt-1.5 block">
            {formData.countryCode === '+1' && '10-digit number e.g. (415) 555-0192'}
            {formData.countryCode === '+91' && '10-digit mobile number e.g. 98765 43210'}
            {formData.countryCode === '+44' && '10–11 digit UK number e.g. 7911 123456'}
            {formData.countryCode === '+61' && '9-digit Australian number e.g. 412 345 678'}
            {formData.countryCode === '+971' && '9-digit UAE mobile e.g. 50 123 4567'}
            {formData.countryCode === '+65' && '8-digit Singapore number e.g. 9123 4567'}
            {formData.countryCode === '+49' && 'German number e.g. 170 1234567'}
          </span>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-3 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => onChangeField('consent', e.target.checked)}
            className="mt-1 w-4 h-4 rounded text-[#AC4C30] border-[#DDD4C6] focus:ring-[#AC4C30] cursor-pointer accent-[#AC4C30]"
          />
          <span className="font-sans text-[11px] sm:text-xs text-[#685F54] leading-relaxed group-hover:text-[#3A342C] transition-colors">
            By submitting this form, you agree to receive emails and text messages from{' '}
            <strong className="text-[#181818] font-medium">Anshika Sharma Coaching</strong> about coaching programs, workshops, session reminders, and offers. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe at any time.
          </span>
        </label>
      </div>

      {/* Confidentiality Pill */}
      <div className="flex items-center gap-2 text-[#7A7165] text-xs pt-1">
        <ShieldCheck size={14} className="text-[#AC4C30] shrink-0" />
        <span className="font-sans text-[11.5px]">Your contact details are encrypted and kept strictly confidential.</span>
      </div>

      {/* Submit / Proceed Button */}
      <div className="pt-2 sm:pt-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-full font-sans text-xs sm:text-sm uppercase tracking-[0.08em] font-semibold bg-[#AC4C30] hover:bg-[#973F28] text-white hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99] disabled:opacity-75"
        >
          <span>{isSubmitting ? 'Saving details...' : 'Continue to Scheduling'}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </form>
  );
};
