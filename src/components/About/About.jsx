import styles from './About.module.scss';
import { personal, about } from '../../data/content';

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about" name="about">
      <div className="container">
        <p className="section-label">About Me</p>
        <h2 className="section-title">The Developer Behind the Code</h2>

        <div className={styles.grid}>
          {/* ── PROFILE CARD ──────────────────────────── */}
          <div className={styles.profileCard} data-aos="fade-right" data-aos-duration="700">
            <div className={styles.imageWrapper}>
              <img
                src="/profile.jpg"
                alt="Priyanshu Chakraborty — AI/ML Engineer"
                className={styles.photo}
                width="300"
                height="300"
              />
              <div className={styles.imageGlow} />
              <div className={styles.imageBorder} />
              {/* HUD corner marks */}
              <span className={`${styles.corner} ${styles.tl}`} />
              <span className={`${styles.corner} ${styles.tr}`} />
              <span className={`${styles.corner} ${styles.bl}`} />
              <span className={`${styles.corner} ${styles.br}`} />
            </div>

            {/* Stats row */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>8.01</span>
                <span className={styles.statLabel}>CGPA / 10</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>120+</span>
                <span className={styles.statLabel}>LeetCode</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>3+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
            </div>
          </div>

          {/* ── BIO ─────────────────────────────────── */}
          <div className={styles.bio} data-aos="fade-left" data-aos-duration="700" data-aos-delay="100">
            {/* Education card */}
            <div className={styles.eduCard}>
              <div className={styles.eduIcon}>🎓</div>
              <div>
                <div className={styles.eduDegree}>{about.education.degree}</div>
                <div className={styles.eduSpec}>{about.education.specialization}</div>
                <div className={styles.eduMeta}>
                  <span>{about.education.institution}, {about.education.location}</span>
                  <span className={styles.eduPeriod}>{about.education.period}</span>
                  <span className={styles.eduCgpa}>CGPA {about.education.cgpa}</span>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <p className={styles.bioText}>{about.bio}</p>

            {/* Interests */}
            <div className={styles.interests}>
              <p className={styles.interestsLabel}>// Core Interests</p>
              <div className={styles.interestChips}>
                {about.interests.map((item) => (
                  <span key={item} className="chip violet">{item}</span>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className={styles.quickLinks}>
              <a
                href={personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                id="about-github-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub Profile
              </a>
              <a
                href={personal.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                id="about-leetcode-link"
              >
                LeetCode Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
