import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { SpeakWithAnshikaLogo } from './SpeakWithAnshikaLogo';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [manualActive, setManualActive] = useState<string | null>(null);

  // Monitor DOM sections in physical layout order for accurate active section highlight
  const activeSection = useScrollSpy(['work', 'about', 'services', 'praise', 'contact'], 140);

  // Automatically reset manual active state after smooth scroll completes
  useEffect(() => {
    if (!manualActive) return;
    const timer = setTimeout(() => {
      setManualActive(null);
    }, 1100);
    return () => clearTimeout(timer);
  }, [manualActive]);

  const effectiveActive = manualActive || activeSection;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#work', id: 'work' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'TESTIMONIALS', href: '#praise', id: 'praise' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Blur active element to prevent mobile browsers from resetting scroll to top (0, 0) upon drawer unmount
    if (e.currentTarget) {
      e.currentTarget.blur();
    }

    setManualActive(id);
    setMobileMenuOpen(false);

    const target = document.getElementById(id);
    if (target) {
      const navHeight = 72;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });

      history.replaceState(null, '', href);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 z-50 w-full h-[72px] flex items-center transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-[#EBE6DA]/90 backdrop-blur-md border-b border-[#DDD4C6]/80 shadow-xs' 
          : 'bg-transparent md:bg-[#EBE6DA]/90 md:backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-8 md:px-6 lg:px-16 xl:px-28 flex items-center justify-between md:gap-4 lg:gap-8">
        {/* Mobile View Top Bar (Matches shared reference screenshot) */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Left: Pill with Speak with Anshika */}
          <a 
            href="#work" 
            onClick={(e) => handleNavClick(e, '#work', 'work')}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#FAF6ED] text-[#181818] border border-black/5 shadow-sm active:scale-95 transition-all"
            aria-label="Speak with Anshika"
          >
            <span className="font-serif text-[15px] font-semibold tracking-tight text-[#181818]">
              Speak <span className="italic font-serif text-[#AC4C30]">with</span> Anshika
            </span>
          </a>

          {/* Right: Circular Menu Hamburger (=) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 rounded-full bg-[#FAF6ED] border border-black/5 shadow-sm flex items-center justify-center text-[#181818] active:scale-95 transition-all focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X size={20} strokeWidth={2} />
            ) : (
              <div className="flex flex-col gap-1.5 items-center justify-center">
                <span className="w-4 h-[2px] bg-[#181818] rounded-full" />
                <span className="w-4 h-[2px] bg-[#181818] rounded-full" />
              </div>
            )}
          </button>
        </div>

        {/* Desktop View Brand Logo */}
        <a 
          href="#work" 
          onClick={(e) => handleNavClick(e, '#work', 'work')}
          className="hidden md:flex hover:opacity-90 transition-all duration-300 items-center select-none py-1 group shrink-0"
          aria-label="Speak with Anshika"
        >
          <SpeakWithAnshikaLogo className="h-8 md:h-8.5 lg:h-11 w-auto" />
        </a>

        {/* Centered Desktop Menu */}
        <nav className="hidden md:flex items-center md:gap-4.5 lg:gap-8 xl:gap-9">
          {navLinks.map((link) => {
            const isActive = effectiveActive === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`font-sans text-[12px] lg:text-[13px] uppercase tracking-[0.04em] transition-colors relative py-1.5 cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'text-[#181818] font-semibold' 
                    : 'text-[#3A342C] hover:text-[#AC4C30] font-normal'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span 
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#181818] rounded-full transition-all duration-200" 
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="rounded-full h-8 lg:h-9 px-3.5 lg:px-[18px] text-[11.5px] lg:text-[13px] uppercase tracking-[0.04em] font-sans font-medium bg-gradient-to-r from-[#AC4C30] via-[#BA5436] to-[#8A3622] text-[#F1EBE1] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_14px_rgba(172,76,48,0.25)] hover:shadow-[0_6px_20px_rgba(172,76,48,0.35)] flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>BOOK A CALL</span>
            <ArrowUpRight size={13} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full border-t border-[#DDD4C6] bg-[#EBE6DA] px-[44px] py-6 shadow-xl animate-fade-rise overscroll-contain touch-pan-y">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = effectiveActive === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`group font-sans text-sm uppercase tracking-[0.04em] py-1.5 flex items-center justify-between transition-colors cursor-pointer select-none active:opacity-75 ${
                    isActive ? 'text-[#AC4C30] font-semibold' : 'text-[#3A342C] hover:text-[#AC4C30]'
                  }`}
                >
                  <span className="relative inline-block py-0.5">
                    {link.label}
                    <span 
                      className={`absolute left-0 -bottom-0.5 h-[2px] bg-[#AC4C30] rounded-full transition-all duration-300 ease-out pointer-events-none ${
                        isActive 
                          ? 'w-full opacity-100' 
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100 group-active:w-full group-active:opacity-100'
                      }`}
                    />
                  </span>
                  {isActive && <span className="text-xs text-[#AC4C30]">●</span>}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
