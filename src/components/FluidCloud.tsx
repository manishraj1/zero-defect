"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function FluidCloud() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.025;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large soft base atmosphere - full screen feel */}
      <Sphere args={[22, 128, 128]} position={[0, 0, -12]}>
        <MeshDistortMaterial
          color="#bae6fd"
          attach="material"
          distort={0.18}
          speed={0.4}
          roughness={0.1}
          metalness={0.05}
          emissive="#67e8f9"
          emissiveIntensity={0.25}
        />
      </Sphere>

      {/* Mid cloudy layer */}
      <Sphere args={[19, 96, 96]} position={[1, 2, -10]}>
        <MeshDistortMaterial
          color="#7dd3fc"
          attach="material"
          distort={0.32}
          speed={0.8}
          roughness={0.3}
          transparent
          opacity={0.75}
        />
      </Sphere>

      {/* Soft white cloud highlights */}
      <Sphere args={[16.5, 80, 80]} position={[-2, -1, -9]}>
        <meshBasicMaterial 
          color="#e0f2fe" 
          transparent 
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Deep inner blue glow */}
      <Sphere args={[13, 64, 64]} position={[0, 0, -8]}>
        <meshBasicMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}
