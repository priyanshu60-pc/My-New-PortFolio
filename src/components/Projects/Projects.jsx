import { useState, useRef } from 'react';
import styles from './Projects.module.scss';
import { projects } from '../../data/content';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section className={`section ${styles.projects}`} id="projects" name="projects">
      <div className="container">
        <p className="section-label">Portfolio</p>
        <h2 className="section-title">Featured Projects</h2>
        <p className={styles.intro}>
          Real-world applications spanning AI/ML, computer vision, and full-stack development.
        </p>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

// ─── TILT CARD ────────────────────────────────────────────
function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef();
  const glowRef = useRef();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.12) 0%, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
    if (glowRef.current) glowRef.current.style.background = '';
  };

  const accent = project.accentColor === 'violet' ? 'violet' : 'cyan';

  return (
    <article
      className={`${styles.card} ${styles[accent]}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="650"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      id={`project-card-${project.id}`}
    >
      {/* Mouse-tracked glow */}
      <div className={styles.cardGlow} ref={glowRef} />

      {/* Top bar */}
      <div className={styles.cardTop}>
        <div className={styles.badges}>
          <span className={`chip ${accent === 'violet' ? 'violet' : ''}`}>{project.type}</span>
          <span className={styles.period}>{project.period}</span>
        </div>
        <div className={styles.projectNum}>
          {String(project.id).padStart(2, '0')}
        </div>
      </div>

      {/* Title block */}
      <div className={styles.titleBlock}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardSubtitle}>{project.subtitle}</p>
      </div>

      {/* Description */}
      <p className={styles.cardDesc}>{project.description.slice(0, 140)}…</p>

      {/* Tech stack chips */}
      <div className={styles.stack}>
        {project.stack.slice(0, 5).map((tech) => (
          <span key={tech} className={`chip ${accent === 'violet' ? 'violet' : ''}`}>{tech}</span>
        ))}
        {project.stack.length > 5 && (
          <span className={`chip ${accent === 'violet' ? 'violet' : ''}`}>+{project.stack.length - 5}</span>
        )}
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.viewDetails}>View Details →</span>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghLink}
            onClick={(e) => e.stopPropagation()}
            aria-label="View GitHub repo"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </a>
        )}
      </div>

      {/* Corner marks */}
      <span className={`${styles.corner} ${styles.tl}`} />
      <span className={`${styles.corner} ${styles.br}`} />
    </article>
  );
}
