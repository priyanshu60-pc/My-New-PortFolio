import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import NeuralMesh from './NeuralMesh';
import StarField from './StarField';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getSafePixelRatio, isMobileDevice } from '../../utils/mobileDetect';
import styles from './Scene3D.module.scss';

/**
 * Scene3D — The R3F Canvas wrapper.
 * Lazy-loaded via React.lazy in App.jsx to not block initial paint.
 * Handles mobile degradation and reduced-motion fallbacks.
 */
export default function Scene3D({ scrollProgress = 0, onCreated }) {
  const reducedMotion = useReducedMotion();
  const mobile = isMobileDevice();

  return (
    <div className={styles.canvasWrapper}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        gl={{
          antialias: !mobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={getSafePixelRatio()}
        onCreated={onCreated}
        style={{ background: 'transparent' }}
      >
        {/* Adaptive performance — drops DPR if FPS falls below 45 */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Ambient fill */}
        <ambientLight intensity={0.15} color="#0A0C20" />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#E8F0FF" />

        <Suspense fallback={null}>
          <StarField />
          <NeuralMesh scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
