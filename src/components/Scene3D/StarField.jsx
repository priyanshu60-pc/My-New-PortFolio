import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getParticleCount } from '../../utils/mobileDetect';

/**
 * StarField — ambient point-cloud replacing tsParticles.
 * Renders directly in the R3F canvas for true 3D depth & camera parallax.
 */
export default function StarField() {
  const meshRef = useRef();
  const count = getParticleCount();

  // Generate random star positions once
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread across a sphere volume
      const r = 15 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Vary between cyan and violet hues
      const t = Math.random();
      if (t > 0.6) {
        // cyan
        col[i * 3]     = 0.0;
        col[i * 3 + 1] = t * 0.9 + 0.1;
        col[i * 3 + 2] = 1.0;
      } else if (t > 0.3) {
        // violet
        col[i * 3]     = 0.55 + t * 0.2;
        col[i * 3 + 1] = 0.36;
        col[i * 3 + 2] = 0.96;
      } else {
        // dim white
        col[i * 3]     = 0.9;
        col[i * 3 + 1] = 0.94;
        col[i * 3 + 2] = 1.0;
      }
    }
    return [pos, col];
  }, [count]);

  // Slow rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
      meshRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
