import styles from './Skills.module.scss';
import { skills } from '../../data/content';

export default function Skills() {
  return (
    <section
      className={`section ${styles.skills}`}
      id="skills"
      name="skills"
      style={{ background: 'linear-gradient(180deg, #05060A 0%, #070A12 100%)' }}
    >
      <div className="container">
        <p className="section-label">Capabilities</p>
        <h2 className="section-title">Technical Arsenal</h2>
        <p className={styles.intro}>
          A curated stack built for building intelligent systems — from data pipelines to full-stack applications.
        </p>

        <div className={styles.grid}>
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`${styles.card} ${styles[group.color]}`}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              data-aos-duration="600"
            >
              {/* Card header */}
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon} aria-hidden="true">{group.icon}</span>
                <h3 className={styles.cardTitle}>{group.category}</h3>
                <div className={styles.headerLine} />
              </div>

              {/* Skill chips */}
              <div className={styles.chips}>
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className={`chip ${group.color === 'violet' ? 'violet' : ''} ${styles.skillChip}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Decorative corner */}
              <div className={styles.cardCorner} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
