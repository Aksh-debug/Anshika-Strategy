import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Praise } from './components/Praise';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { useSectionScrollSnap } from './hooks/useSectionScrollSnap';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('1-to-1 Coaching');

  // Intersection observer trigger for smooth scroll reveals
  useRevealOnScroll();

  // Section-by-section scroll snapping: stops cleanly upon next/previous section
  useSectionScrollSnap({ isModalOpen: isBookingOpen });

  const handleOpenBooking = (service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="relative w-full overflow-x-clip bg-[#EBE6DA] min-h-screen text-[#181818]">
      {/* Subtle Grain Overlay (fixed, pointer-events-none, ~3.5% opacity) */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.035]"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.75" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Fixed Navigation Bar (z-50) */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* Hero Section + Marquee (id="work", responsive snap-section) */}
        <div id="work" className="snap-section w-full min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-between pt-0 lg:pt-[76px] pb-0 overflow-x-clip bg-[#EBE6DA]">
          <Hero onOpenBooking={handleOpenBooking} />
          <Marquee />
        </div>

        {/* About Section (id="about") */}
        <About onOpenBooking={() => handleOpenBooking()} />

        {/* Services Section (id="services", bg #EAE2D5) */}
        <Services onSelectService={(title) => handleOpenBooking(title)} />

        {/* Process Section */}
        <Process />

        {/* Praise / Testimonials Section (id="praise", dark #181818) */}
        <Praise />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer (dark #181818) */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
      />
    </div>
  );
}
