"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function VaporField() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.004;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Deep blue base - fills everything */}
      <Sphere args={[92, 256, 256]} position={[0, 0, -52]}>
        <MeshDistortMaterial
          color="#0ea5e9"
          distort={0.12}
          speed={0.35}
          roughness={0}
          metalness={0.05}
          emissive="#0284c8"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Dominant soft white clouds (exactly like the video) */}
      <Sphere args={[82, 256, 256]} position={[3, -4, -44]}>
        <MeshDistortMaterial
          color="#f8fafc"
          distort={0.18}
          speed={0.52}
          transparent
          opacity={0.78}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Gentle highlight pulse */}
      <Sphere args={[76, 256, 256]} position={[-6, 7, -48]}>
        <MeshDistortMaterial
          color="#e0f2fe"
          distort={0.14}
          speed={0.42}
          transparent
          opacity={0.62}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Cyan breathing accent */}
      <Sphere args={[71, 256, 256]} position={[0, 0, -40]}>
        <MeshDistortMaterial
          color="#67e8f9"
          distort={0.20}
          speed={0.68}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}

export default function EtherealVapor() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 62], fov: 22 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[40, 35, 45]} intensity={0.9} />
        <pointLight position={[-35, -30, -35]} intensity={0.55} color="#67e8f9" />
        <VaporField />
      </Canvas>
    </div>
  );
}
