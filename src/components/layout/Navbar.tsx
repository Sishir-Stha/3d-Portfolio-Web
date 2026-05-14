import { useState, useEffect } from 'react';
import { profile } from '@/data/profile';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 32px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(14,19,34,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.05)'
          : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        style={{
          fontFamily: 'var(--font-headline)',
          fontWeight: 700,
          fontSize: '18px',
          color: 'var(--color-primary)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}
      >
        SS<span style={{ color: 'var(--color-secondary)' }}>.</span>
      </a>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {navLinks.map((link) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? 'var(--color-primary)'
                  : 'var(--color-text-secondary)',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'rgba(245,158,11,0.08)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.target as HTMLElement).style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.target as HTMLElement).style.color = 'var(--color-text-secondary)';
              }}
            >
              {link.label}
            </a>
          );
        })}
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ padding: '6px 16px', fontSize: '13px', marginLeft: '8px' }}
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  );
}
