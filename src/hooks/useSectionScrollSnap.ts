import { useEffect, useRef } from 'react';

interface UseSectionScrollSnapProps {
  isModalOpen?: boolean;
}

export function useSectionScrollSnap({ isModalOpen = false }: UseSectionScrollSnapProps = {}) {
  const isTransitioning = useRef(false);

  useEffect(() => {
    // If a modal is open, let user scroll freely inside the modal
    if (isModalOpen) return;

    // Only apply section-by-section snap on desktop viewports where sections fit comfortably
    const isDesktopViewport = () => window.innerWidth >= 1024 && window.innerHeight >= 700;

    const getSections = (): HTMLElement[] => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));
      return sections.filter((sec) => sec.offsetParent !== null);
    };

    const getCurrentSectionIndex = (sections: HTMLElement[]): number => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const threshold = scrollY + windowHeight * 0.4;

      for (let i = sections.length - 1; i >= 0; i--) {
        const top = sections[i].offsetTop;
        if (threshold >= top) {
          return i;
        }
      }
      return 0;
    };

    const scrollToSection = (targetIndex: number, sections: HTMLElement[]) => {
      if (targetIndex < 0 || targetIndex >= sections.length) return;
      isTransitioning.current = true;
      const target = sections[targetIndex];

      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });

      // Update URL hash without jumping
      if (target.id) {
        history.replaceState(null, '', `#${target.id}`);
      }

      // Lock scroll transitions during animation to prevent skipping
      setTimeout(() => {
        isTransitioning.current = false;
      }, 750);
    };

    const handleWheel = (e: WheelEvent) => {
      // Do not snap on mobile/tablet viewports so users can scroll naturally through content
      if (!isDesktopViewport()) return;

      // Don't intercept if user is interacting with an input or textarea
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('[data-scroll-lock="true"]'))) {
        return;
      }

      // Filter micro-jitters
      if (Math.abs(e.deltaY) < 25) return;

      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      const sections = getSections();
      if (sections.length === 0) return;

      const currentIndex = getCurrentSectionIndex(sections);

      if (e.deltaY > 0) {
        // Scroll down to next section
        if (currentIndex < sections.length - 1) {
          e.preventDefault();
          scrollToSection(currentIndex + 1, sections);
        }
      } else {
        // Scroll up to previous section
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(currentIndex - 1, sections);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDesktopViewport()) return;

      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (isTransitioning.current) {
          e.preventDefault();
          return;
        }
        const sections = getSections();
        const currentIndex = getCurrentSectionIndex(sections);
        if (currentIndex < sections.length - 1) {
          e.preventDefault();
          scrollToSection(currentIndex + 1, sections);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (isTransitioning.current) {
          e.preventDefault();
          return;
        }
        const sections = getSections();
        const currentIndex = getCurrentSectionIndex(sections);
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(currentIndex - 1, sections);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);
}
