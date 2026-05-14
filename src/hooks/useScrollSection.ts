import { useEffect, useState } from 'react';
import type { SectionId } from '@/data/avatarSequences';

/**
 * Track which section is currently active based on scroll position.
 * Uses Intersection Observer for efficiency.
 */
export function useScrollSection(sectionIds: readonly SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: [0.3, 0.5],
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
