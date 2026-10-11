import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { ConsultationForm } from './consultation/ConsultationForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isBooked, setIsBooked] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleCloseAndReset = () => {
    try {
      localStorage.removeItem('anshika_consultation_booked');
    } catch {}
    setCurrentStep(0);
    setIsBooked(false);
    setShowExitConfirm(false);
    setSessionKey((prev) => prev + 1);
    onClose();
  };

  const handleAttemptClose = () => {
    if (isBooked) {
      handleCloseAndReset();
    } else {
      setShowExitConfirm(true);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (showExitConfirm) {
          setShowExitConfirm(false);
        } else {
          handleAttemptClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showExitConfirm, isBooked]);

  // Lock background scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const origBody = document.body.style.overflow;
    const origHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origBody;
      document.documentElement.style.overflow = origHtml;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/60 backdrop-blur-xs animate-fade-rise"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (showExitConfirm) {
            setShowExitConfirm(false);
          } else {
            handleAttemptClose();
          }
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Book a 1:1 Consultation with Anshika Sharma"
    >
      {/* Modal Dialog Card */}
      <div
        className={`relative w-full ${
          currentStep === 4 && !isBooked
            ? 'max-w-4xl xl:max-w-5xl h-[97vh] sm:h-[95vh] max-h-[98vh] p-4 sm:p-5 md:p-6'
            : 'max-w-2xl lg:max-w-3xl h-auto p-5 sm:p-7 md:p-8'
        } overflow-hidden bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#DDD4C6] flex flex-col text-[#181818] font-sans transition-all duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={handleAttemptClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-[#EFE8DC] hover:bg-[#E2D8C8] text-[#554E46] hover:text-[#181818] flex items-center justify-center transition-all cursor-pointer z-30 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#AC4C30]/20"
          aria-label="Close modal"
        >
          <X size={17} strokeWidth={2.2} />
        </button>

        {/* Exit Confirmation Dialog */}
        {showExitConfirm && (
          <div
            className="absolute inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="discard-title"
            aria-describedby="discard-desc"
          >
            <div className="w-full max-w-sm bg-[#FAF8F5] border border-[#DDD4C6] rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#AC4C30]/10 text-[#AC4C30] flex items-center justify-center mb-3 shadow-xs">
                <AlertCircle size={24} strokeWidth={2.2} />
              </div>

              <h3 id="discard-title" className="font-sans font-bold text-lg text-[#181818] tracking-tight">
                Discard Changes & Exit?
              </h3>

              <p id="discard-desc" className="font-sans text-xs sm:text-sm text-[#5A524A] mt-1.5 leading-normal">
                Are you sure? Your progress will be lost.
              </p>

              <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
                <button
                  type="button"
                  onClick={() => setShowExitConfirm(false)}
                  className="py-2.5 px-4 rounded-full font-sans text-xs uppercase tracking-[0.08em] font-semibold border border-[#DDD4C6] bg-white hover:bg-[#F2ECE1] text-[#3A342C] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowExitConfirm(false);
                    handleCloseAndReset();
                  }}
                  className="py-2.5 px-4 rounded-full font-sans text-xs uppercase tracking-[0.08em] font-semibold bg-[#AC4C30] hover:bg-[#973F28] text-white transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  Exit & Discard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4-Step Consultation Form */}
        <ConsultationForm
          key={sessionKey}
          initialService={initialService}
          onComplete={handleCloseAndReset}
          onStepChange={(step, booked) => {
            setCurrentStep(step);
            setIsBooked(Boolean(booked));
          }}
        />
      </div>
    </div>
  );
};
