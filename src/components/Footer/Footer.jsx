import { Link as ScrollLink } from 'react-scroll';
import styles from './Footer.module.scss';
import { personal } from '../../data/content';

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.inner}>
          {/* Brand */}
          <ScrollLink to="hero" smooth duration={600} className={styles.brand}>
            <span className={styles.brandPc}>PC</span>
            <span className={styles.brandDot}>.</span>
          </ScrollLink>

          {/* Nav links */}
          <nav className={styles.nav} aria-label="Footer navigation">
            {['About', 'Skills', 'Projects', 'Contact'].map((label) => (
              <ScrollLink
                key={label}
                to={label.toLowerCase()}
                smooth
                duration={700}
                offset={-80}
                className={styles.navLink}
              >
                {label}
              </ScrollLink>
            ))}
          </nav>

          {/* Socials */}
          <div className={styles.socials}>
            <a href={personal.links.github}   target="_blank" rel="noopener noreferrer" aria-label="GitHub" id="footer-github">GitHub</a>
            <a href={personal.links.linkedin}  target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" id="footer-linkedin">LinkedIn</a>
            <a href={personal.links.leetcode}  target="_blank" rel="noopener noreferrer" aria-label="LeetCode" id="footer-leetcode">LeetCode</a>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {personal.name}. Built with React + Three.js.
          </p>
          <a href={`mailto:${personal.email}`} className={styles.emailLink} id="footer-email">
            {personal.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
