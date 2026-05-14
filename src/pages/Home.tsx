import { Navbar } from '@/components/layout/Navbar';
import { AvatarStage } from '@/components/layout/AvatarStage';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

export function Home() {
  return (
    <>
      <Navbar />

      {/* Fixed full-viewport avatar layer */}
      <AvatarStage />

      {/* Scrollable content — full width, sections positioned opposite avatar */}
      <main style={{ position: 'relative', zIndex: 5 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />

        {/* Footer */}
        <footer style={{
          padding: '32px 48px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Sishir Shrestha
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Built with React + GSAP
          </span>
        </footer>
      </main>
    </>
  );
}
