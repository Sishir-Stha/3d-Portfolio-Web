import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}

export function SectionWrapper({
  id,
  children,
  className = '',
  minHeight = '100vh',
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Animate children with class .animate-in on scroll
    const animatable = el.querySelectorAll('.animate-in');
    if (animatable.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      animatable,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={className}
      style={{ minHeight, scrollMarginTop: '0px' }}
    >
      {children}
    </section>
  );
}
