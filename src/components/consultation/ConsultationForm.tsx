import React, { useState, useEffect } from 'react';
import {
  initialFormData,
  ConsultationFormData,
  ProfileOption,
  CommitmentOption,
  ConfidenceLevel,
  BookingType,
} from './types';
import { ProgressBar } from './ProgressBar';
import { StepEntry } from './StepEntry';
import { StepAbout } from './StepAbout';
import { StepGoal } from './StepGoal';
import { StepDetails } from './StepDetails';
import { StepSchedule } from './StepSchedule';
import { Confirmation } from './Confirmation';

interface ConsultationFormProps {
  onComplete?: () => void;
  initialService?: string;
  isStandalone?: boolean;
  onStepChange?: (step: 0 | 1 | 2 | 3 | 4, isBooked?: boolean) => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  onComplete,
  initialService,
  isStandalone = false,
  onStepChange,
}) => {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2 | 3 | 4>(() => {
    // If a specific service was requested from a button, start directly on step 1 of that path
    if (initialService) {
      return 1;
    }
    // Default to Entry Screen
    return 0;
  });

  const [isBooked, setIsBooked] = useState(() => {
    try {
      return localStorage.getItem('anshika_consultation_booked') === 'true';
    } catch {
      return false;
    }
  });

  const [formData, setFormData] = useState<ConsultationFormData>(() => {
    const initial = { ...initialFormData };
    if (initialService) {
      const lower = initialService.toLowerCase();
      if (lower.includes('group') || lower.includes('cohort') || lower.includes('masterclass')) {
        initial.bookingType = 'group';
      } else {
        initial.bookingType = '1on1';
      }

      if (lower.includes('executive') || lower.includes('corporate')) {
        initial.profile = 'Working Professional';
        initial.speakingSituation = 'Leadership meetings and internal all-hands';
      } else if (lower.includes('pitch') || lower.includes('1-to-1')) {
        initial.profile = 'Founder';
        initial.speakingSituation = 'Sales calls and pitches';
      }
    }
    return initial;
  });

  // Sync step change and booked status to parent modal
  useEffect(() => {
    onStepChange?.(currentStep, isBooked);
  }, [currentStep, isBooked, onStepChange]);

  const handleSelectPath = (type: BookingType) => {
    setFormData((prev) => ({ ...prev, bookingType: type }));
    setCurrentStep(1);
  };

  const handleBack = () => {
    // User can't make any changes after step 4 submission
    if (isBooked) return;
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as 0 | 1 | 2 | 3 | 4);
    }
  };

  const handleNext = () => {
    if (isBooked) return;
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 0 | 1 | 2 | 3 | 4);
    }
  };

  const updateField = <K extends keyof ConsultationFormData>(
    field: K,
    value: ConsultationFormData[K]
  ) => {
    if (isBooked) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleScheduled = () => {
    setIsBooked(true);
    try {
      localStorage.setItem('anshika_consultation_booked', 'true');
    } catch {}
    onStepChange?.(4, true);
  };

  const handleBackToWebsite = () => {
    try {
      localStorage.removeItem('anshika_consultation_booked');
    } catch {}
    setIsBooked(false);
    setCurrentStep(0);
    setFormData(initialFormData);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div
      className={`w-full ${
        isStandalone
          ? 'max-w-2xl mx-auto bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#DDD4C6]'
          : 'flex flex-col h-full min-h-0'
      }`}
    >
      {/* Step Progress Bar (Hidden on Entry Screen and Confirmation) */}
      {!isBooked && currentStep >= 1 && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={4}
          onBack={handleBack}
          showBack={true}
        />
      )}

      <div className="flex-1 min-h-0 flex flex-col">
        {isBooked ? (
          <Confirmation formData={formData} onBackToWebsite={handleBackToWebsite} />
        ) : (
          <>
            {/* Entry Screen: Choose 1:1 or Group path */}
            {currentStep === 0 && (
              <StepEntry
                currentType={formData.bookingType}
                onSelectPath={handleSelectPath}
              />
            )}

            {/* Step 1: About You (1:1 or Group path) */}
            {currentStep === 1 && (
              <StepAbout
                bookingType={formData.bookingType}
                profile={formData.profile}
                commitment={formData.commitment}
                confidenceLevel={formData.confidenceLevel}
                onChangeProfile={(profile: ProfileOption) => updateField('profile', profile)}
                onChangeCommitment={(commitment: CommitmentOption) =>
                  updateField('commitment', commitment)
                }
                onChangeConfidenceLevel={(conf: ConfidenceLevel) =>
                  updateField('confidenceLevel', conf)
                }
                onNext={handleNext}
              />
            )}

            {/* Step 2: Your Goal */}
            {currentStep === 2 && (
              <StepGoal
                speakingSituation={formData.speakingSituation}
                otherSituationText={formData.otherSituationText}
                onChangeSituation={(situation: string) =>
                  updateField('speakingSituation', situation)
                }
                onChangeOtherText={(text: string) =>
                  updateField('otherSituationText', text)
                }
                onNext={handleNext}
              />
            )}

            {/* Step 3: Your Details */}
            {currentStep === 3 && (
              <StepDetails
                formData={formData}
                onChangeField={updateField}
                onNext={handleNext}
              />
            )}

            {/* Step 4: Pick a Time / Reserve Your Seat */}
            {currentStep === 4 && (
              <StepSchedule
                formData={formData}
                onScheduled={handleScheduled}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
