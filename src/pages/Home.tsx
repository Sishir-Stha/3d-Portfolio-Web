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

      {/* Scrollable content, full width with sections positioned opposite avatar. */}
      <main style={{ position: 'relative', zIndex: 5 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />

        <footer className="site-footer">
          <span>&copy; {new Date().getFullYear()} Sishir Shrestha</span>
          <span>Built with React + GSAP</span>
        </footer>
      </main>
    </>
  );
}
