"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(36, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(3.8, 1.8, 7.5); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Anchors the network to spin strictly in its own dedicated space
    const localNetworkAnchor = new THREE.Group();
    localNetworkAnchor.position.set(1.2, -0.2, 0.0); // Framed perfectly in the right empty space
    scene.add(localNetworkAnchor);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(4, 6, 4);
    scene.add(directionalLight);

    // --- 2. HIGH-DENSITY 16x16 DIGIT BITMAPS ---
    const gridResolution = 16;

    // Helper to generate a sharp 16x16 matrix representation of digits
    const getDigitPattern = (digit: number): number[][] => {
      const matrix = Array(16).fill(0).map(() => Array(16).fill(0));
      
      if (digit === 6) {
        // Draw a high-definition '6'
        for (let r = 2; r < 14; r++) matrix[r][3] = 1; // Left wall
        for (let c = 3; c < 12; c++) {
          matrix[2][c] = 1;  // Top roof
          matrix[8][c] = 1;  // Middle bar
          matrix[13][c] = 1; // Bottom floor
        }
        for (let r = 8; r < 14; r++) matrix[r][11] = 1; // Lower right loop closure
      } else if (digit === 7) {
        // Draw a high-definition '7'
        for (let c = 2; c < 13; c++) matrix[2][c] = 1; // Top bar
        for (let r = 2; r < 14; r++) {
          const c = Math.floor(12 - (r - 2) * 0.7);
          if (c >= 0 && c < 16) matrix[r][c] = 1; // Elegant diagonal slash
        }
      }
      return matrix;
    };

    const digitsList = [6, 7];
    let activeDigitIdx = 0;
    let switchTimer = 0;

    // --- 3. NEURON ARCHITECTURE STORAGE ---
    interface Neuron {
      mesh: THREE.Mesh;
      type: "input" | "hidden" | "output";
      layerIdx: number;
      gridPos?: { r: number; c: number };
      outputVal?: number;
      baseColor: THREE.Color;
      activeColor: THREE.Color;
      targetIntensity: number;
      currentIntensity: number;
    }

    const neurons: Neuron[] = [];

    // Dense, compact geometry sizes to prevent huge gaps
    const pixelGeo = new THREE.BoxGeometry(0.07, 0.07, 0.07); 
    const hiddenGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const outputGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);

    const colorTheme = {
      inactiveInput: new THREE.Color(0xd2d6dc),  // Soft visible gray for resting pixel grid
      inactiveHidden: new THREE.Color(0xa0aec0), // Readable structural hidden nodes
      inactiveOutput: new THREE.Color(0x718096), // Subdued resting output blocks
      activePulse: new THREE.Color(0x0066ff),    // Vivid high-energy digital blue
      activeOutput: new THREE.Color(0x00bfff)    // Deep crisp electric cyan
    };

    // LAYER 0: The High-Density Input Voxel Screen (Far Left)
    const spacing = 0.11; // Compact spacing to close gaps completely
    for (let r = 0; r < gridResolution; r++) {
      for (let c = 0; c < gridResolution; c++) {
        const mat = new THREE.MeshStandardMaterial({
          color: colorTheme.inactiveInput.clone(),
          roughness: 0.2
        });
        const mesh = new THREE.Mesh(pixelGeo, mat);
        
        // Positioned symmetrically on the left boundary plane
        mesh.position.set(
          -2.5, 
          (gridResolution / 2 - r) * spacing, 
          (c - gridResolution / 2) * spacing
        );
        localNetworkAnchor.add(mesh);

        neurons.push({
          mesh,
          type: "input",
          layerIdx: 0,
          gridPos: { r, c },
          baseColor: colorTheme.inactiveInput,
          activeColor: colorTheme.activePulse,
          targetIntensity: 0,
          currentIntensity: 0
        });
      }
    }

    // LAYERS 1 & 2: Volumetric Center Hidden Clusters
    const numHiddenLayers = 2;
    const neuronsPerHidden = 35;
    const xSpacing = 1.6;

    for (let l = 0; l < numHiddenLayers; l++) {
      const xPos = -2.5 + xSpacing + (l * xSpacing);
      for (let n = 0; n < neuronsPerHidden; n++) {
        const mat = new THREE.MeshStandardMaterial({
          color: colorTheme.inactiveHidden.clone(),
          roughness: 0.3
        });
        const mesh = new THREE.Mesh(hiddenGeo, mat);
        
        // Form clusters corresponding perfectly to the display scale height
        const y = (Math.random() - 0.5) * 1.8;
        const z = (Math.random() - 0.5) * 1.8;
        mesh.position.set(xPos, y, z);
        localNetworkAnchor.add(mesh);

        neurons.push({
          mesh,
          type: "hidden",
          layerIdx: l + 1,
          baseColor: colorTheme.inactiveHidden,
          activeColor: colorTheme.activePulse,
          targetIntensity: 0,
          currentIntensity: 0
        });
      }
    }

    // LAYER 3: Output Classification Array (Far Right)
    const numOutputs = 10;
    for (let i = 0; i < numOutputs; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: colorTheme.inactiveOutput.clone(),
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(outputGeo, mat);
      mesh.position.set(2.0, (numOutputs / 2 - i) * 0.26, 0);
      localNetworkAnchor.add(mesh);

      neurons.push({
        mesh,
        type: "output",
        outputVal: i,
        layerIdx: 3,
        baseColor: colorTheme.inactiveOutput,
        activeColor: colorTheme.activeOutput,
        targetIntensity: 0,
        currentIntensity: 0
      });
    }

    // --- 4. DATA LINE PATHWAY CONNECTION LATICE ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xa0aec0, 
      transparent: true,
      opacity: 0.16,
      blending: THREE.NormalBlending
    });

    const linesGroup = new THREE.Group();
    localNetworkAnchor.add(linesGroup);

    // Form logic links extending naturally across sequential forward layers
    for (let i = 0; i < neurons.length; i++) {
      // Stochastic sampling to keep performance flawless with the higher voxel density
      if (neurons[i].type === "input" && Math.random() > 0.15) continue; 

      for (let j = i + 1; j < neurons.length; j++) {
        const nA = neurons[i];
        const nB = neurons[j];

        if (nB.layerIdx === nA.layerIdx + 1) {
          const dist = nA.mesh.position.distanceTo(nB.mesh.position);
          if (nA.type === "input" && dist < 2.0 || nA.type === "hidden" && dist < 1.6) {
            if (Math.random() > 0.6) {
              const geo = new THREE.BufferGeometry().setFromPoints([nA.mesh.position, nB.mesh.position]);
              const line = new THREE.Line(geo, lineMaterial);
              linesGroup.add(line);
            }
          }
        }
      }
    }

    // --- 5. NETWORK COMPUTATION ENGINE ---
    const computeInferencePass = (digit: number) => {
      const blueprint = getDigitPattern(digit);

      neurons.forEach((neuron) => {
        if (neuron.type === "input" && neuron.gridPos) {
          const isActive = blueprint[neuron.gridPos.r][neuron.gridPos.c] === 1;
          neuron.targetIntensity = isActive ? 1.0 : 0.0;
        } 
        else if (neuron.type === "hidden") {
          // Dynamic cascade activation flaring
          const cascadeFactor = (digit === 6) ? 0.6 : 0.4;
          neuron.targetIntensity = Math.random() < cascadeFactor ? Math.random() * 0.8 + 0.2 : 0.02;
        } 
        else if (neuron.type === "output") {
          neuron.targetIntensity = (neuron.outputVal === digit) ? 1.0 : 0.0;
        }
      });
    };

    computeInferencePass(digitsList[activeDigitIdx]);

    // --- 6. PARALLAX AND LOCAL ROTATION ANIMATION ---
    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener("mousemove", onMouseMove);

    let animId: number;

    const renderTick = () => {
      const delta = clock.getDelta();
      switchTimer += delta;

      // Cycle digits cleanly every 2.5 seconds
      if (switchTimer > 2.5) {
        activeDigitIdx = (activeDigitIdx + 1) % digitsList.length;
        computeInferencePass(digitsList[activeDigitIdx]);
        switchTimer = 0;
      }

      // Smooth structural node flaring cycles
      neurons.forEach((neuron) => {
        neuron.currentIntensity = THREE.MathUtils.lerp(neuron.currentIntensity, neuron.targetIntensity, delta * 7.0);

        const mat = neuron.mesh.material as THREE.MeshStandardMaterial;
        
        if (neuron.currentIntensity > 0.02) {
          mat.color.copy(neuron.baseColor).lerp(neuron.activeColor, neuron.currentIntensity);
          mat.emissive.copy(neuron.activeColor).multiplyScalar(neuron.currentIntensity * 0.7);
        } else {
          mat.color.lerp(neuron.baseColor, delta * 8.0);
          mat.emissive.setRGB(0, 0, 0);
        }
      });

      // Rigid fixed spot rotation behavior
      localNetworkAnchor.rotation.y = clock.getElapsedTime() * 0.12 - 0.4;
      
      // Fine-tuned responsive mouse look boundaries
      localNetworkAnchor.rotation.x = THREE.MathUtils.lerp(localNetworkAnchor.rotation.x, mouseY * 0.12, 0.05);
      localNetworkAnchor.rotation.z = THREE.MathUtils.lerp(localNetworkAnchor.rotation.z, mouseX * 0.06, 0.05);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderTick);
    };

    renderTick();

    // --- 7. CLEANUP LIFECYCLES ---
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pixelGeo.dispose();
      hiddenGeo.dispose();
      outputGeo.dispose();
      lineMaterial.dispose();
      neurons.forEach(n => (n.mesh.material as THREE.MeshStandardMaterial).dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] md:min-h-[540px] bg-transparent overflow-hidden flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0 opacity-100" />
    </div>
  );
}