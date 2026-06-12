"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function EtherealBackground() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow, organic breathing and swirling
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.018;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large base vibrant blue energy field - full screen feel */}
      <Sphere args={[45, 128, 128]} position={[0, 0, -28]}>
        <MeshDistortMaterial
          color="#0ea5e9"
          distort={0.32}
          speed={0.6}
          roughness={0.25}
          metalness={0.1}
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Soft white cloudy vapor layer (exactly like video) */}
      <Sphere args={[38, 112, 112]} position={[2, 3, -24]}>
        <MeshDistortMaterial
          color="#f0f9ff"
          distort={0.48}
          speed={0.85}
          roughness={0.4}
          transparent
          opacity={0.82}
        />
      </Sphere>

      {/* Bright white cloud highlights that drift and fade */}
      <Sphere args={[33, 96, 96]} position={[-3, -2, -21]}>
        <meshBasicMaterial 
          color="#e0f2fe" 
          transparent 
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Cyan glow accents for vibrancy */}
      <Sphere args={[27, 80, 80]} position={[1, 1, -18]}>
        <meshBasicMaterial 
          color="#67e8f9" 
          transparent 
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}
