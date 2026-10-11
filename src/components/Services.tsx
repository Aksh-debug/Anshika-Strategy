import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceGraphic } from './EditorialImages';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      index: '01',
      title: '1-to-1 Coaching',
      description: 'Deeply personalised sessions built around your voice, your goals and the room you need to own next.',
      tags: ['VOCAL PRESENCE', 'STORY STRUCTURE', 'ON-CAMERA COACHING'],
    },
    {
      index: '02',
      title: 'Online Courses',
      description: 'Flexible, self-paced programs designed to build lasting habits — practice on your schedule, at your pace.',
      tags: ['WEEKLY FRAMEWORKS', 'PRACTICE PROMPTS', 'PRIVATE COMMUNITY'],
    },
    {
      index: '03',
      title: 'Group Debates & Workshops',
      description: 'Interactive workshops where you sharpen your thinking, argue with warmth, and speak with real conviction.',
      tags: ['LIVE PRACTICE', 'PEER FEEDBACK', 'SPEAKING LABS'],
    },
    {
      index: '04',
      title: 'Corporate Programs',
      description: 'Custom-built communication programs for teams — from leadership presence to investor storytelling.',
      tags: ['TEAM ASSESSMENTS', 'LEADERSHIP SPRINTS', 'PITCH COACHING'],
    },
  ];

  return (
    <section id="services" className="snap-section w-full border-t border-[#DDD4C6] py-12 sm:py-14 lg:py-0 lg:h-[100dvh] flex flex-col justify-center px-5 sm:px-10 lg:px-20 xl:px-28 lg:pt-[76px] lg:pb-6 bg-[#EAE2D5] reveal-init">
      <div className="w-full max-w-[1400px] mx-auto my-0 lg:my-auto flex flex-col justify-center">
        
        {/* Section Body: 12-column layout with expanded left image and right header + accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* Left Column: Expanded Visual Showcase (hidden on mobile, visible on desktop) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 w-full items-start justify-center">
            <ServiceGraphic activeIndex={activeIndex} className="w-full h-[510px]" />
          </div>

          {/* Right Column: Heading + Accordion */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-start min-h-0 lg:min-h-[510px]">
            {/* Fixed Section Header */}
            <div className="mb-4 lg:mb-6 shrink-0">
              <h2 className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-[#181818]">
                What we <span className="italic text-[#AC4C30]">Offer</span>
              </h2>
            </div>

            {/* Clean, snug accordion with grid-template-rows animation for silky smooth transitions */}
            <div className="flex flex-col border-t border-b border-[#DDD4C6]">
            {services.map((service, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={service.index}
                  className={`group relative transition-colors ${
                    idx !== 0 ? 'border-t border-[#DDD4C6]' : ''
                  }`}
                >
                  {/* Header Row: Stable hover & click target */}
                  <div
                    onClick={() => {
                      if (isActive) {
                        onSelectService(service.title);
                      } else {
                        setActiveIndex(idx);
                      }
                    }}
                    className="w-full py-4 sm:py-4.5 flex items-center justify-between text-left cursor-pointer transition-colors select-none"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span 
                        className={`font-serif text-base font-medium transition-colors duration-200 ${
                          isActive ? 'text-[#AC4C30]' : 'text-[#6A6258]'
                        }`}
                      >
                        {service.index}
                      </span>
                      <h3 
                        className={`font-serif text-2xl sm:text-3xl tracking-tight transition-colors duration-200 ${
                          isActive ? 'text-[#AC4C30]' : 'text-[#181818] group-hover:text-[#AC4C30]'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service.title);
                      }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive 
                          ? 'bg-[#181818] text-[#F1EBE1] shadow-xs hover:bg-[#AC4C30] hover:scale-105' 
                          : 'border border-[#CFC6B8] text-[#181818] group-hover:border-[#AC4C30] group-hover:text-[#AC4C30]'
                      }`}
                      aria-label={`Book ${service.title}`}
                    >
                      <ArrowUpRight size={16} strokeWidth={2} />
                    </button>
                  </div>

                  {/* Silky-smooth CSS Grid row height animation with zero delay & zero jitter */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-8 sm:pl-12 pr-4 pb-4">
                        <p className="font-sans text-base leading-relaxed text-[#4A423A] max-w-xl">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      </div>
    </section>
  );
};
