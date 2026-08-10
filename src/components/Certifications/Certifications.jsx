import styles from './Certifications.module.scss';
import { certifications } from '../../data/content';

export default function Certifications() {
  return (
    <section className={`section ${styles.certs}`} id="certifications" name="certifications">
      <div className="container">
        <p className="section-label">Credentials</p>
        <h2 className="section-title">Certifications & Achievements</h2>

        <div className={styles.row}>
          {certifications.map((cert, i) => (
            <a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.badge} ${styles[cert.color]}`}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
              data-aos-duration="500"
              id={`cert-${cert.id}`}
              aria-label={`${cert.title} — ${cert.issuer}`}
            >
              <span className={styles.badgeIcon}>{cert.badge}</span>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>{cert.title}</span>
                <span className={styles.badgeIssuer}>{cert.issuer} · {cert.type}</span>
              </div>
              <span className={styles.arrow}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
