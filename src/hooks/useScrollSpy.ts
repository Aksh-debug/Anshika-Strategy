import { useState, useEffect } from 'react';

function getSynchronousActiveSection(sectionIds: string[], offset = 120): string {
  if (typeof window === 'undefined') return sectionIds[0] || '';

  const hash = window.location.hash.replace('#', '');
  if (hash && sectionIds.includes(hash)) {
    return hash;
  }

  const scrollY = window.scrollY || window.pageYOffset || 0;
  if (scrollY < 60) {
    return sectionIds[0] || '';
  }

  const sections = sectionIds
    .map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const top = rect.top + scrollY;
      return { id, el, rect, top };
    })
    .filter((item): item is { id: string; el: HTMLElement; rect: DOMRect; top: number } => item !== null)
    .sort((a, b) => a.top - b.top);

  if (sections.length === 0) return sectionIds[0] || '';

  // Bottom of page check
  if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
    return sections[sections.length - 1].id;
  }

  // Find the deepest section whose top edge has reached or passed the offset line
  for (let i = sections.length - 1; i >= 0; i--) {
    if (sections[i].rect.top <= offset) {
      return sections[i].id;
    }
  }

  return sections[0].id;
}

export function useScrollSpy(sectionIds: string[], offset = 120): string {
  // Synchronous initialization prevents flashing Home on initial mount or page refresh
  const [activeSection, setActiveSection] = useState<string>(() =>
    getSynchronousActiveSection(sectionIds, offset)
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      
      // If at the very top, activate home
      if (scrollY < 60) {
        setActiveSection(sectionIds[0]);
        return;
      }

      // Check bottom of page
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      const sections = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          return { id, el, rect, top };
        })
        .filter((item): item is { id: string; el: HTMLElement; rect: DOMRect; top: number } => item !== null)
        .sort((a, b) => a.top - b.top);

      if (sections.length === 0) return;

      // Find the deepest section whose top edge has passed the offset line
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].rect.top <= offset) {
          setActiveSection(sections[i].id);
          return;
        }
      }

      setActiveSection(sections[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
