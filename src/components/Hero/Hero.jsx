import { useEffect, useRef, lazy, Suspense } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Hero.module.scss';
import { personal } from '../../data/content';
import { useScrollProgress } from '../../hooks/useScrollProgress';

// Lazy-load the heavy 3D canvas
const Scene3D = lazy(() => import('../Scene3D/Scene3D'));

export default function Hero({ onSceneReady }) {
  const scrollProgress = useScrollProgress();
  const headingRef = useRef();
  const titleRef   = useRef();
  const tagRef     = useRef();
  const ctaRef     = useRef();
  const badgeRef   = useRef();

  // GSAP text reveal on mount
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo(headingRef.current,
      { opacity: 0, y: 40, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(tagRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(ctaRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
      '-=0.3'
    );
  }, []);

  return (
    <section className={styles.hero} id="hero" name="hero">
      {/* ── 3D CANVAS (behind everything) ─────────────── */}
      <Suspense fallback={null}>
        <Scene3D scrollProgress={scrollProgress} onCreated={onSceneReady} />
      </Suspense>

      {/* ── RADIAL VIGNETTE ───────────────────────────── */}
      <div className={styles.vignette} />

      {/* ── GRID OVERLAY ──────────────────────────────── */}
      <div className={styles.grid} aria-hidden="true" />

      {/* ── CONTENT ───────────────────────────────────── */}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          {/* HUD status badge */}
          <div className={styles.statusBadge} ref={badgeRef}>
            <span className={styles.statusDot} />
            <span>Available for opportunities</span>
          </div>

          {/* Name */}
          <h1 className={styles.name} ref={headingRef}>
            {personal.name.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? styles.nameAccent : ''}>{word} </span>
            ))}
          </h1>

          {/* Title */}
          <p className={styles.title} ref={titleRef}>
            <span className={styles.titleLine}>&gt;&nbsp;</span>
            {personal.title}
          </p>

          {/* Tagline */}
          <p className={styles.tagline} ref={tagRef}>
            {personal.tagline}
          </p>

          {/* CTAs */}
          <div className={styles.ctas} ref={ctaRef}>
            <ScrollLink to="projects" smooth duration={800} offset={-80}>
              <button className="btn-primary" id="hero-view-projects">
                <span>View Projects</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </ScrollLink>

            <a
              href={personal.resumeUrl}
              download
              className="btn-secondary"
              id="hero-download-resume"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v9M4 8l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Download Resume
            </a>

            <ScrollLink to="contact" smooth duration={800} offset={-80}>
              <button className="btn-cta" id="hero-contact">
                Contact Me
              </button>
            </ScrollLink>
          </div>

          {/* Social quick links */}
          <div className={styles.socials}>
            <a href={personal.links.github}  target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href={personal.links.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <LeetcodeIcon />
            </a>
          </div>
        </div>

        {/* ── SCROLL HINT ──────────────────────────────── */}
        <div className={styles.scrollHint} aria-hidden="true">
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </div>
    </section>
  );
}

// ─── INLINE SVG ICONS ─────────────────────────────────────
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LeetcodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 00 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/>
  </svg>
);
