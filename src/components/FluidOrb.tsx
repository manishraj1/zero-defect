"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function FluidOrb() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large base atmosphere - fills screen */}
      <Sphere args={[18, 96, 96]} position={[0, 0, -8]}>
        <MeshDistortMaterial
          color="#a5f3fc"
          attach="material"
          distort={0.25}
          speed={0.6}
          roughness={0.1}
          metalness={0.05}
          emissive="#67e8f9"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Mid layer - cloudy movement */}
      <Sphere args={[14.5, 80, 80]} position={[2, 1, -6]}>
        <MeshDistortMaterial
          color="#67e8f9"
          attach="material"
          distort={0.4}
          speed={1.1}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Soft inner glow */}
      <Sphere args={[11, 64, 64]} position={[-1, -2, -5]}>
        <meshBasicMaterial 
          color="#bae6fd" 
          transparent 
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}
