import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/global.scss';

import Preloader    from './components/Preloader/Preloader';
import Cursor       from './components/Cursor/Cursor';
import Navbar       from './components/Navbar/Navbar';
import Hero         from './components/Hero/Hero';
import About        from './components/About/About';
import Skills       from './components/Skills/Skills';
import Projects     from './components/Projects/Projects';
import Certifications from './components/Certifications/Certifications';
import Contact      from './components/Contact/Contact';
import Footer       from './components/Footer/Footer';
import AiChat      from './components/AiChat/AiChat';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Init AOS once preloader dismisses
  useEffect(() => {
    if (!loading) {
      AOS.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
    }
  }, [loading]);

  return (
    <>
      {/* Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Main site */}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
        <AiChat />
      </div>
    </>
  );
}
