import { useEffect } from 'react';
import styles from './ProjectModal.module.scss';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const accent = project.accentColor === 'violet' ? styles.violet : styles.cyan;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      id="project-modal"
    >
      <div
        className={`${styles.modal} ${accent}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.headerMeta}>
              <span className={`chip ${project.accentColor === 'violet' ? 'violet' : ''}`}>{project.type}</span>
              <span className={styles.role}>{project.role}</span>
              <span className={styles.period}>{project.period}</span>
            </div>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.subtitle}>{project.subtitle}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Body */}
        <div className={styles.body}>
          {/* Description */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>// Overview</h3>
            <p className={styles.desc}>{project.description}</p>
          </section>

          {/* Key Highlights */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>// Key Highlights</h3>
            <ul className={styles.highlights}>
              {project.highlights.map((h) => (
                <li key={h} className={styles.highlight}>
                  <span className={styles.hlBullet}>▹</span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>// Tech Stack</h3>
            <div className={styles.chips}>
              {project.stack.map((tech) => (
                <span key={tech} className={`chip ${project.accentColor === 'violet' ? 'violet' : ''}`}>{tech}</span>
              ))}
            </div>
          </section>

          {/* AI Tools (if any) */}
          {project.aiTools?.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>// AI Tools Used</h3>
              <div className={styles.chips}>
                {project.aiTools.map((tool) => (
                  <span key={tool} className="chip">{tool}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer CTAs */}
        <div className={styles.footer}>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id={`modal-github-${project.id}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              View on GitHub
            </a>
          )}
          <button className="btn-secondary" onClick={onClose} id={`modal-close-${project.id}`}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
