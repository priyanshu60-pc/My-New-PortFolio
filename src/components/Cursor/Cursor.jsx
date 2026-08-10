import { useEffect, useRef } from 'react';
import styles from './Cursor.module.scss';

/**
 * Custom magnetic cursor — outer ring + inner dot.
 * Hidden on touch/mobile devices (body cursor: auto override in global.scss).
 */
export default function Cursor() {
  const outerRef = useRef();
  const innerRef = useRef();
  const pos = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });
  const raf = useRef();

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      outer.current.x = lerp(outer.current.x, pos.current.x, 0.12);
      outer.current.y = lerp(outer.current.y, pos.current.y, 0.12);
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${outer.current.x}px, ${outer.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove);

    // Grow on hover over interactive elements
    const onEnter = () => outerRef.current?.classList.add(styles.hover);
    const onLeave = () => outerRef.current?.classList.remove(styles.hover);
    const onDown  = () => outerRef.current?.classList.add(styles.click);
    const onUp    = () => outerRef.current?.classList.remove(styles.click);

    document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div className={styles.outer} ref={outerRef} />
      <div className={styles.inner} ref={innerRef} />
    </>
  );
}
