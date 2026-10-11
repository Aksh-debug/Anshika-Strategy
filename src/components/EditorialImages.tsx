import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import aboutArmchairImg from '../assets/images/regenerated_image_1790936880411.avif';
import onlineCourseServiceImg from '../assets/images/regenerated_image_1791088900738.png';
import oneOnOneCoachingImg from '../assets/images/regenerated_image_1791387286221.png';
import groupDebatesImg from '../assets/images/regenerated_image_1791388363907.png';

/**
 * Hero Arch Portrait Graphic
 * - 520px wide, aspect-[4/5]
 * - Arch shape: fully rounded top (rounded-t-full) and ~40px bottom radius (rounded-b-[40px])
 * - Outer ring: absolutely positioned -inset-6, bg #E8DED2, same arch shape (rounded-b-[56px])
 * - Floating badge: -left-10 bottom-10, card #F9F7EB, 1px border #E4DCCB, 3 avatars + 200+ COACHED, float anim
 */
export const HeroStageGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative aspect-[4/5] bg-[#E8DED2] rounded-t-[180px] rounded-b-[48px] p-2 sm:p-2.5 flex items-center justify-center group select-none shadow-sm transition-all duration-500 ${className || 'w-full max-w-[560px]'}`}>
      {/* Inner Arch Window matching exact screenshot geometry */}
      <div className="relative w-full h-full rounded-t-[172px] rounded-b-[42px] overflow-hidden bg-[#181818] shadow-md">
        {!imgError ? (
          <img
            src="/images/anshika-hero-portrait.png"
            alt="Anshika Sharma speaking on stage"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-[#181818] flex flex-col items-center justify-center p-6 text-center text-[#F1EBE1]">
            <span className="font-serif text-3xl">Anshika Sharma</span>
            <span className="text-xs uppercase tracking-widest text-[#AC4C30] mt-2 font-sans">
              Public Speaking Coach
            </span>
          </div>
        )}
      </div>

      {/* Floating Badge (anchored in bottom-left overlapping border exactly as in screenshot) */}
      <div className="absolute -left-3 sm:-left-6 bottom-12 sm:bottom-14 bg-[#F9F7EB] rounded-2xl px-4 py-2.5 sm:px-4.5 sm:py-3 shadow-lg border border-[#E4DCCB] flex items-center gap-3.5 z-20 animate-float pointer-events-none">
        {/* Three Overlapping Circular Avatars */}
        <div className="flex -space-x-2.5">
          <img 
            src="/images/anshika-coaching-1.jpeg" 
            alt="Client avatar" 
            className="w-7 h-7 rounded-full border-2 border-[#F9F7EB] object-cover shadow-xs" 
          />
          <img 
            src="/images/anshika-coaching-2.jpeg" 
            alt="Client avatar" 
            className="w-7 h-7 rounded-full border-2 border-[#F9F7EB] object-cover shadow-xs" 
          />
          <img 
            src="/images/anshika-coaching-3.jpeg" 
            alt="Client avatar" 
            className="w-7 h-7 rounded-full border-2 border-[#F9F7EB] object-cover shadow-xs" 
          />
        </div>

        {/* Text Details: 200+ stacked above COACHED */}
        <div className="flex flex-col leading-tight">
          <span className="font-serif font-semibold text-[20px] text-[#181818] leading-none">
            500+
          </span>
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-[#5A524A] mt-1">
            COACHED
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * About Section Portrait Graphic (Photo with live upload & styled frame)
 */
export const AboutArmchairGraphic: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    return localStorage.getItem('anshika_about_photo') || '/WhatsApp Image 2026-09-27 at 12.15.32 PM.jpeg';
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageError = () => {
    if (photoSrc !== aboutArmchairImg) {
      setPhotoSrc(aboutArmchairImg);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoSrc(result);
        try {
          localStorage.setItem('anshika_about_photo', result);
        } catch {
          // ignore localStorage quota limit
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-[#EAE2D5] shadow-[0_20px_40px_-15px_rgba(24,24,24,0.14)] ring-1 ring-[#181818]/10 group">
      <img
        src={photoSrc}
        alt="Anshika Sharma"
        referrerPolicy="no-referrer"
        onError={handleImageError}
        className="w-full h-full object-cover object-top sm:object-center group-hover:scale-102 transition-transform duration-700 ease-out"
      />

      {/* Hidden file input for uploading the provided photo or changing anytime */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Subtle update photo control on hover / focus */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        title="Upload or change portrait photo"
        className="absolute bottom-4 right-4 bg-[#181818]/80 hover:bg-[#181818] text-[#F1EBE1] backdrop-blur-md px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-sans tracking-wider uppercase opacity-85 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md cursor-pointer"
      >
        <Camera size={14} className="text-[#C4705A]" />
        <span>Change photo</span>
      </button>
    </div>
  );
};

/**
 * Services Graphic with Crossfade and Counter Pill
 */
interface ServiceGraphicProps {
  activeIndex: number;
  className?: string;
}

export const ServiceGraphic: React.FC<ServiceGraphicProps> = ({ activeIndex, className = '' }) => {
  const serviceImages = [
    { src: oneOnOneCoachingImg, alt: '1-to-1 Coaching session' },
    { src: onlineCourseServiceImg, alt: 'Online Courses student practicing' },
    { src: groupDebatesImg, alt: 'Group Debates and Workshops' },
    { src: '/images/anshika-hero-portrait.png', alt: 'Corporate Programs presentation' },
  ];

  return (
    <div className={`relative w-full h-[440px] sm:h-[480px] lg:h-[510px] rounded-[28px] overflow-hidden bg-[#DDD4C6] shadow-md shrink-0 ${className}`}>
      {serviceImages.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out will-change-[opacity] ${
            activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        />
      ))}

      {/* Pill Counter inside at bottom-4 left-4 */}
      <div className="absolute bottom-4 left-4 z-10 font-sans text-xs uppercase tracking-[0.2em] bg-[#F3EFE6]/90 backdrop-blur-xs rounded-full px-4 py-2 text-[#181818] border border-[#DDD4C6] shadow-xs">
        {`0${activeIndex + 1} / 04`}
      </div>
    </div>
  );
};
