import { useEffect, useRef } from 'react';
import styles from './Preloader.module.scss';

export default function Preloader({ onComplete }) {
  const barRef   = useRef();
  const textRef  = useRef();

  useEffect(() => {
    let start = null;
    const duration = 1800; // ms

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const pct = Math.min((timestamp - start) / duration, 1);

      if (barRef.current)  barRef.current.style.width = `${pct * 100}%`;
      if (textRef.current) textRef.current.textContent = `${Math.floor(pct * 100)}%`;

      if (pct < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => onComplete?.(), 300);
      }
    };

    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <div className={styles.preloader} id="preloader">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandPc}>PC</span>
          <span className={styles.brandDot}>.</span>
        </div>
        <div className={styles.scanline} />
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} ref={barRef} />
        </div>
        <div className={styles.meta}>
          <span className={styles.label}>Initializing Systems</span>
          <span className={styles.pct} ref={textRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
