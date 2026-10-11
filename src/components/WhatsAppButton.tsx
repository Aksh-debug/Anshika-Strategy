import React, { useState, useEffect } from 'react';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOnMobile, setShowOnMobile] = useState(false);
  
  // Target phone number: +1 (437) 499-6646 -> international wa.me format: 14374996646
  const phoneNumber = '14374996646';
  const message = encodeURIComponent("Hi Anshika, I'm interested in learning more about your public speaking coaching.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    const handleScroll = () => {
      const heroBtn = document.getElementById('hero-whatsapp-btn');
      if (heroBtn) {
        const rect = heroBtn.getBoundingClientRect();
        // As soon as the hero button gets scrolled up out of view (its bottom edge passes near navbar/top)
        setShowOnMobile(rect.bottom < 80);
      } else {
        const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        setShowOnMobile(scrollY > 250);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside 
      aria-label="Contact options"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 items-center gap-3 select-none transition-all duration-300 ease-out ${
        showOnMobile
          ? 'flex opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'hidden sm:flex sm:opacity-100 sm:translate-y-0 sm:scale-100 sm:pointer-events-auto opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Anshika on WhatsApp (+1 437 499-6646)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.38)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.48)] hover:bg-[#20ba5a] active:scale-95 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Subtle Ping Animation Ring */}
        <span 
          className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* WhatsApp Official Vector Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>

        {/* Hover Tooltip Label */}
        <span 
          className={`absolute right-full mr-3.5 px-3.5 py-1.5 rounded-full bg-[#181818] text-[#F1EBE1] text-xs font-sans font-medium whitespace-nowrap shadow-xl border border-[#303030] pointer-events-none transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-2 scale-95'
          }`}
        >
          Chat with Anshika
        </span>
      </a>
    </aside>
  );
};
