import { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Navbar.module.scss';
import { personal } from '../../data/content';

const NAV_LINKS = [
  { label: 'About',    to: 'about' },
  { label: 'Skills',   to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact',  to: 'contact' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeSection, setActive]   = useState('');
  const navRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      ref={navRef}
      id="navbar"
    >
      <div className={styles.inner}>
        {/* Brand */}
        <ScrollLink
          to="hero"
          smooth
          duration={600}
          className={styles.brand}
          tabIndex={0}
        >
          <span className={styles.brandPc}>PC</span>
          <span className={styles.brandDot}>.</span>
        </ScrollLink>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <ScrollLink
                to={to}
                smooth
                duration={700}
                offset={-80}
                spy
                onSetActive={() => setActive(to)}
                className={`${styles.link} ${activeSection === to ? styles.active : ''}`}
              >
                <span className={styles.linkIndex}>
                  {String(NAV_LINKS.indexOf({ label, to }) + 1).padStart(2, '0')}.
                </span>
                {label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <a
          href={personal.resumeUrl}
          download
          className={`${styles.resumeBtn} btn-primary`}
          aria-label="Download Resume"
        >
          Resume
        </a>

        {/* Mobile burger */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <ScrollLink
                to={to}
                smooth
                duration={700}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className={styles.drawerLink}
              >
                {label}
              </ScrollLink>
            </li>
          ))}
          <li>
            <a
              href={personal.resumeUrl}
              download
              className={styles.drawerLink}
              onClick={() => setMenuOpen(false)}
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
