import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isMobileDevice } from '../../utils/mobileDetect';

/**
 * NeuralMesh — The hero centerpiece.
 * An animated wireframe icosahedron with glowing edges + orbiting particles.
 * Represents the AI/ML neural-network theme.
 */
export default function NeuralMesh({ scrollProgress = 0, reducedMotion = false }) {
  const groupRef   = useRef();
  const innerRef   = useRef();
  const outerRef   = useRef();
  const pointsRef  = useRef();
  const edgesRef   = useRef();

  const isMobile = isMobileDevice();

  // ── ORBIT PARTICLES ─────────────────────────────────────
  const orbitParticles = useMemo(() => {
    const count = isMobile ? 30 : 80;
    const positions = new Float32Array(count * 3);
    const radii = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const layer = Math.floor(i / (count / 3));
      const r = 1.8 + layer * 0.4 + Math.random() * 0.3;
      const elevation = (Math.random() - 0.5) * 0.8;

      positions[i * 3]     = r * Math.cos(angle);
      positions[i * 3 + 1] = elevation;
      positions[i * 3 + 2] = r * Math.sin(angle);
      radii.push({ r, angle, elevation, speed: 0.3 + Math.random() * 0.5, layer });
    }
    return { positions, count, radii };
  }, [isMobile]);

  // ── ANIMATION LOOP ──────────────────────────────────────
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Main group: breathe + scroll parallax
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.05; // float

      // Camera-scroll offset: pull back as user scrolls
      groupRef.current.position.z = -scrollProgress * 3;
      groupRef.current.scale.setScalar(1 - scrollProgress * 0.3);

      // Inner mesh: counter-rotate
      if (innerRef.current) {
        innerRef.current.rotation.x = -t * 0.08;
        innerRef.current.rotation.z = t * 0.05;
      }

      // Outer mesh: opposite drift
      if (outerRef.current) {
        outerRef.current.rotation.y = -t * 0.06;
        outerRef.current.rotation.z = t * 0.03;
      }

      // Animate orbit particles
      if (pointsRef.current) {
        const positions = pointsRef.current.geometry.attributes.position;
        const radii = orbitParticles.radii;
        for (let i = 0; i < radii.length; i++) {
          const { r, elevation, speed, layer } = radii[i];
          const angle = (orbitParticles.radii[i].angle += delta * speed * (layer % 2 === 0 ? 1 : -1));
          positions.array[i * 3]     = r * Math.cos(angle);
          positions.array[i * 3 + 1] = elevation + Math.sin(t + i) * 0.1;
          positions.array[i * 3 + 2] = r * Math.sin(angle);
        }
        positions.needsUpdate = true;
      }
    }
  });

  // ── ICOSAHEDRON EDGES ───────────────────────────────────
  const edgeGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.0, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  const outerEdgeGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.45, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── INNER ICOSAHEDRON WIREFRAME (cyan) ──────────── */}
      <group ref={innerRef}>
        <lineSegments ref={edgesRef} geometry={edgeGeometry}>
          <lineBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.85}
            linewidth={1}
          />
        </lineSegments>

        {/* Solid inner fill — very transparent */}
        <mesh>
          <icosahedronGeometry args={[0.98, 1]} />
          <meshPhongMaterial
            color="#00F0FF"
            transparent
            opacity={0.04}
            wireframe={false}
            emissive="#00F0FF"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>

      {/* ── OUTER ICOSAHEDRON WIREFRAME (violet) ────────── */}
      <group ref={outerRef}>
        <lineSegments geometry={outerEdgeGeo}>
          <lineBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.5}
            linewidth={1}
          />
        </lineSegments>
      </group>

      {/* ── CORE SPHERE ─────────────────────────────────── */}
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshPhongMaterial
          color="#FF2D9B"
          emissive="#FF2D9B"
          emissiveIntensity={2.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* ── ORBIT PARTICLES ─────────────────────────────── */}
      {!reducedMotion && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[orbitParticles.positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#00F0FF"
            size={0.045}
            transparent
            opacity={0.9}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      )}

      {/* ── LIGHTS ──────────────────────────────────────── */}
      <pointLight color="#00F0FF" intensity={3} distance={6} decay={2} />
      <pointLight color="#8B5CF6" intensity={2} distance={8} decay={2} position={[2, 1, 2]} />
      <pointLight color="#FF2D9B" intensity={1.5} distance={4} decay={2} position={[-1, -1, 1]} />
    </group>
  );
}
