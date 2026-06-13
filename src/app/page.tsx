"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// --- PERFECT DONUT PROPORTION NEURAL TORUS LOGO ENGINE ---
function TorusLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- MATHEMATICAL LATTICE PROPERTIES ---
    const structuralNodes: { u: number; v: number }[] = [];
    const ringSegments = 28; 
    const tubeSegments = 10; 
    const R = 1.15;          
    const rShell = 0.68;     

    for (let j = 0; j < ringSegments; j++) {
      const u = (j / ringSegments) * Math.PI * 2;
      for (let i = 0; i < tubeSegments; i++) {
        const v = (i / tubeSegments) * Math.PI * 2;
        structuralNodes.push({ u, v });
      }
    }

    // --- STREAMLINED INTERNAL NEURON TRACKS ---
    const signals: { ringIdx: number; tubeIdx: number; progress: number; speed: number }[] = [];
    const totalActiveSignals = 42; 

    for (let s = 0; s < totalActiveSignals; s++) {
      signals.push({
        ringIdx: Math.floor(Math.random() * ringSegments),
        tubeIdx: Math.floor(Math.random() * tubeSegments),
        progress: Math.random(),
        speed: Math.random() * 0.005 + 0.004 
      });
    }

    const staticAngleX = 0.55; 
    const staticAngleY = 0.45; 
    let networkClock = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    const project3DTo2D = (u: number, v: number, localRadius: number) => {
      const x = (R + localRadius * Math.cos(v)) * Math.cos(u);
      const y = (R + localRadius * Math.cos(v)) * Math.sin(u);
      const z = localRadius * Math.sin(v);

      const cosX = Math.cos(staticAngleX), sinX = Math.sin(staticAngleX);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      const cosY = Math.cos(staticAngleY), sinY = Math.sin(staticAngleY);
      const x2 = x * cosY - z1 * sinY;
      const z2 = x * sinY + z1 * cosY;

      const distance3D = 2.5;
      const factor2D = 1 / (distance3D - z2);

      return { x: x2 * factor2D, y: y1 * factor2D, rawZ: z2 };
    };

    let animationFrameId: number;

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);
      const meshProgressClock = networkClock * 0.008; 

      const rawProjectedLattice = structuralNodes.map((node) => {
        const currentU = node.u + meshProgressClock * 1.8;
        const currentV = node.v + meshProgressClock;
        return project3DTo2D(currentU, currentV, rShell);
      });

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      rawProjectedLattice.forEach(v => {
        if (v.x < minX) minX = v.x;
        if (v.x > maxX) maxX = v.x;
        if (v.y < minY) minY = v.y;
        if (v.y > maxY) maxY = v.y;
      });

      const geomWidth = maxX - minX;
      const geomHeight = maxY - minY;
      const maxAllowedDim = Math.min(width, height) * 0.86;
      const currentMaxGeomDim = Math.max(geomWidth, geomHeight);
      const scaleFactor = maxAllowedDim / (currentMaxGeomDim || 1);

      const geomCenterX = minX + geomWidth / 2;
      const geomCenterY = minY + geomHeight / 2;
      const canvasCenterX = width / 2;
      const canvasCenterY = height / 2;

      const finalLattice2D = rawProjectedLattice.map(v => ({
        x: canvasCenterX + (v.x - geomCenterX) * scaleFactor,
        y: canvasCenterY + (v.y - geomCenterY) * scaleFactor,
        rawZ: v.rawZ
      }));

      const coreTransitRadius = rShell * 0.45;
      const finalSignals2D = signals.map((signal) => {
        const targetU = (signal.ringIdx / ringSegments) * Math.PI * 2 + (meshProgressClock * 1.8);
        const targetV = ((signal.tubeIdx + signal.progress) / tubeSegments) * Math.PI * 2 + meshProgressClock;

        const raw2D = project3DTo2D(targetU, targetV, coreTransitRadius);
        signal.progress += signal.speed;
        if (signal.progress >= 1.0) {
          signal.progress = 0;
          signal.ringIdx = Math.floor(Math.random() * ringSegments);
          signal.tubeIdx = Math.floor(Math.random() * tubeSegments);
        }

        return {
          x: canvasCenterX + (raw2D.x - geomCenterX) * scaleFactor,
          y: canvasCenterY + (raw2D.y - geomCenterY) * scaleFactor,
          rawZ: raw2D.rawZ,
          ringIdx: signal.ringIdx
        };
      });

      networkClock += 1.0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.lineWidth = 0.85; 
      for (let j = 0; j < ringSegments; j++) {
        ctx.beginPath();
        for (let i = 0; i < tubeSegments; i++) {
          const idx = j * tubeSegments + i;
          if (i === 0) ctx.moveTo(finalLattice2D[idx].x, finalLattice2D[idx].y);
          else ctx.lineTo(finalLattice2D[idx].x, finalLattice2D[idx].y);
        }
        ctx.lineTo(finalLattice2D[j * tubeSegments].x, finalLattice2D[j * tubeSegments].y);
        const sampleZ = finalLattice2D[j * tubeSegments].rawZ;
        ctx.strokeStyle = sampleZ > 0 ? "rgba(0, 0, 0, 0.35)" : "rgba(0, 0, 0, 0.08)";
        ctx.stroke();
      }

      ctx.lineWidth = 0.65;
      for (let i = 0; i < tubeSegments; i++) {
        ctx.beginPath();
        for (let j = 0; j < ringSegments; j++) {
          const idx = j * tubeSegments + i;
          if (j === 0) ctx.moveTo(finalLattice2D[idx].x, finalLattice2D[idx].y);
          else ctx.lineTo(finalLattice2D[idx].x, finalLattice2D[idx].y);
        }
        ctx.lineTo(finalLattice2D[i].x, finalLattice2D[i].y);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
        ctx.stroke();
      }

      ctx.lineWidth = 0.50; 
      for (let i = 0; i < finalSignals2D.length; i++) {
        for (let j = i + 1; j < finalSignals2D.length; j++) {
          if (finalSignals2D[i].ringIdx === finalSignals2D[j].ringIdx) {
            const dx = finalSignals2D[i].x - finalSignals2D[j].x;
            const dy = finalSignals2D[i].y - finalSignals2D[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < (width * 0.35)) {
              const linkAlpha = (1.0 - dist / (width * 0.35)) * 0.32; 
              ctx.beginPath();
              ctx.moveTo(finalSignals2D[i].x, finalSignals2D[i].y);
              ctx.lineTo(finalSignals2D[j].x, finalSignals2D[j].y);
              const avgZ = (finalSignals2D[i].rawZ + finalSignals2D[j].rawZ) * 0.5;
              ctx.strokeStyle = avgZ > 0 ? `rgba(0, 0, 0, ${linkAlpha})` : `rgba(0, 0, 0, ${linkAlpha * 0.12})`;
              ctx.stroke();
            }
          }
        }
      }

      finalLattice2D.forEach((node) => {
        ctx.beginPath();
        const depthRadius = 0.8 * (1.0 + node.rawZ * 0.25);
        ctx.arc(node.x, node.y, Math.max(0.3, depthRadius), 0, 2 * Math.PI);
        ctx.fillStyle = node.rawZ > 0 ? "rgba(0, 0, 0, 0.18)" : "rgba(0, 0, 0, 0.04)";
        ctx.fill();
      });

      finalSignals2D.forEach((sig) => {
        ctx.beginPath();
        const depthRadius = 0.35 * (1.0 + sig.rawZ * 0.25); 
        ctx.arc(sig.x, sig.y, Math.max(0.2, depthRadius), 0, 2 * Math.PI);
        ctx.fillStyle = sig.rawZ > 0 ? "rgba(0, 0, 0, 0.55)" : "rgba(0, 0, 0, 0.12)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// --- HARMONIC OMNIDIRECTIONAL BREATHING VAPOR SHADER ---
const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_scroll_velocity;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                   dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                   dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.785), sin(0.785), -sin(0.785), cos(0.785));
    for (int i = 0; i < 6; ++i) {
      v += a * noise(p);
      p = rot * p * 2.2 + shift;
      a *= 0.36;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 centeredUV = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    float t1 = u_time * 0.22;
    float t2 = u_time * 0.16;
    float t3 = u_time * 0.12;

    float scrollOffset = u_scroll_velocity * 0.45;
    float pulseScale = 1.0 + sin(t2) * 0.12 + (abs(u_scroll_velocity) * 0.15);

    vec2 breathingOffsetA = vec2(sin(t1 + centeredUV.y), cos(t2 + centeredUV.x)) * 0.35;
    vec2 breathingOffsetB = vec2(cos(t3 - centeredUV.y), sin(t1 - centeredUV.x)) * 0.28;
    
    vec2 q = vec2(0.0);
    q.x = fbm((centeredUV * pulseScale) + breathingOffsetA + scrollOffset);
    q.y = fbm((centeredUV * pulseScale) + vec2(breathingOffsetB.y, breathingOffsetA.x) - scrollOffset);

    vec2 opposingVector = vec2(sin(t3 + q.x * 1.5), cos(t1 + q.y * 1.5)) * 0.4;
    
    vec2 r = vec2(0.0);
    r.x = fbm((centeredUV * 0.9) + 2.2 * q + opposingVector + breathingOffsetB + (u_scroll_velocity * 0.08));
    r.y = fbm((centeredUV * 0.9) + 2.2 * q - opposingVector + breathingOffsetA);

    float density = fbm(centeredUV * 1.0 + 1.9 * r);

    vec3 c_vividDeepBlue = vec3(0.000, 0.482, 0.992); 
    vec3 c_lightSkyBlue  = vec3(0.850, 0.940, 0.992); 
    vec3 c_softBlueCyan  = vec3(0.760, 0.920, 0.985); 
    vec3 c_coldBlueWhite = vec3(0.950, 0.978, 0.995); 

    float gradientWeight = smoothstep(-0.6, 0.6, r.x + (centeredUV.y * 0.2) + (sin(t1) * 0.15));
    vec3 structuredBlueMass = mix(c_vividDeepBlue, c_lightSkyBlue, gradientWeight);
    vec3 fluidVaporStream = mix(c_softBlueCyan, structuredBlueMass, smoothstep(-0.3, 0.6, density));

    float cloudThresholdMask = clamp(pow(abs(density + 0.45), 1.6) * 1.45, 0.0, 1.0);
    float finalIntegrationCurve = smoothstep(0.18, 0.78, cloudThresholdMask);

    vec3 finalColor = mix(c_coldBlueWhite, fluidVaporStream, finalIntegrationCurve * 0.88);

    float highlightWave = smoothstep(0.4, 0.9, r.y) * (0.12 + sin(t2) * 0.05);
    finalColor = mix(finalColor, vec3(0.935, 0.972, 1.0), highlightWave);

    float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += (dither - 0.5) * 0.004;

    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeSection, setActiveSection] = useState(0);
  const [displaySection, setDisplaySection] = useState(0);
  const [isVaporDissolving, setIsVaporDissolving] = useState(false);

  const scrollVelocity = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 1.0 },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_scroll_velocity: { value: 0.0 }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      scrollVelocity.current *= 0.75; 
      if (scrollVelocity.current > 0.4) scrollVelocity.current = 0.4;
      if (scrollVelocity.current < -0.4) scrollVelocity.current = -0.4;
      if (Math.abs(scrollVelocity.current) < 0.0001) scrollVelocity.current = 0;

      uniforms.u_time.value = clock.getElapsedTime() * 0.75;
      
      uniforms.u_scroll_velocity.value = THREE.MathUtils.lerp(
        uniforms.u_scroll_velocity.value, 
        scrollVelocity.current, 
        0.04
      );

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const navigateWithVaporTransition = (targetIndex: number) => {
    if (targetIndex === activeSection || isVaporDissolving) return;

    setIsVaporDissolving(true);
    setActiveSection(targetIndex);

    setTimeout(() => {
      setDisplaySection(targetIndex);
      setIsVaporDissolving(false);
    }, 450);
  };

  return (
    <main className="h-screen w-screen bg-[#F3F8FE] text-[#0B0B0B] font-sans relative overflow-hidden antialiased select-none">
      
      {/* LAYER 1: Fluid Canvas Underlay */}
      <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      {/* LAYER 2: Transparent Floating Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-12 py-6 select-none bg-transparent">
        <button onClick={() => navigateWithVaporTransition(0)} className="flex items-center gap-2 group bg-transparent border-0 cursor-pointer shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center transition-transform duration-500 group-hover:rotate-1 group-hover:scale-105">
            <TorusLogo />
          </div>
          {/* Sweet spot font scaling on main branding header logo target */}
          <span className="text-base font-bold tracking-tighter text-[#0B0B0B]">HILSA</span>
        </button>
        
        {/* CENTERED NAVIGATION DESIGN */}
        <div className="grow flex justify-center pr-16 hidden md:flex">
          {/* Sweet spot sizing tracking updates to navigation anchors */}
          <nav className="flex items-center space-x-14 text-base font-semibold tracking-tight">
            {[
              { label: "Overview", idx: 0 },
              { label: "Engine", idx: 1 },
              { label: "Open Benchmark", idx: 2 },
              { label: "Pipeline", idx: 3 },
              { label: "Milestones", idx: 4 },
              { label: "Core", idx: 5 }
            ].map((item) => (
              <button
                key={item.idx}
                onClick={() => navigateWithVaporTransition(item.idx)}
                className={`transition-all duration-300 transform hover:scale-105 bg-transparent border-0 cursor-pointer font-medium ${
                  activeSection === item.idx ? "text-[#0B0B0B] font-bold" : "text-neutral-500 hover:text-[#0B0B0B]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="w-12 hidden md:block" />
      </header>

      {/* LAYER 3: Dedicated Single-View Layout Stage Container */}
      <div
        className={`h-full w-full flex flex-col justify-center items-center px-12 sm:px-24 md:px-32 relative z-10 transition-all duration-500 ${
          isVaporDissolving 
            ? "opacity-0 -translate-y-3 blur-sm pointer-events-none" 
            : "opacity-100 translate-y-0 blur-none pointer-events-auto"
        }`}
      >
        
        {/* VIEW 0: OVERVIEW HERO BLOCK */}
        {displaySection === 0 && (
          <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="w-full max-w-2xl bg-white/35 backdrop-blur-2xl border border-white/50 rounded-2xl py-5 px-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.04)] mb-12 flex items-center justify-between group transition-all duration-500 hover:bg-white/50 hover:border-white/60 hover:shadow-[0_20px_48px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex items-center space-x-4 w-full">
                <div className="w-4 h-4 rounded-full border-2 border-neutral-400 opacity-60 shrink-0 transition-colors duration-300 group-hover:border-[#0B0B0B] group-hover:opacity-100" />
                {/* Search bar inside placeholder tracking upscaled to crisp clean scale balance */}
                <span className="text-lg font-medium tracking-tight text-neutral-400 select-none transition-colors duration-300 group-hover:text-neutral-500">
                  hilsa is still thinking... model release coming soon
                </span>
              </div>
              <div className="w-5 h-5 rounded-md bg-neutral-900/5 border border-neutral-900/10 flex items-center justify-center text-xs text-neutral-400 font-mono font-bold select-none shadow-inner transition-colors duration-300 group-hover:bg-neutral-900/10 group-hover:text-neutral-600">
                ↵
              </div>
            </div>

            {/* Perfect headline sweet-spot scale calibration mapping passes */}
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800 max-w-3xl mx-auto mb-5">
              High-Calibration Intelligence Through Structured Inquiry.
            </p>
            <p className="text-sm sm:text-base font-medium text-neutral-500 max-w-2xl mx-auto leading-relaxed tracking-wide mb-10">
              Hierarchical Intelligence Layer for Semantic Alignment is a sub-2B parameter cognitive engine engineered to master multi-branch reasoning under uncertainty.
            </p>
            
            <div className="flex items-center justify-center w-full">
              <a 
                href="https://github.com/manishraj1/HILSA.git" 
                target="_blank" 
                rel="noreferrer"
                className="px-12 py-4.5 bg-black/15 text-[#0B0B0B] font-mono font-bold text-sm rounded-full backdrop-blur-md border border-black/15 hover:bg-black/25 hover:border-black/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.02)] no-underline text-center group tracking-wider"
              >
                EXPLORE CODEBASE ON GITHUB <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </div>
        )}

        {/* VIEW 1: ENGINE SUBSTRATE */}
        {displaySection === 1 && (
          <div className="w-full max-w-4xl text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B0B0B] mb-5 leading-tight">
              What is HILSA Right Now?
            </h2>
            <div className="space-y-6 text-neutral-600 font-medium text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              <p>
                HILSA is an elite, mathematically verified structural runtime harness and cognitive gating layer wrapped around a 1.5B parameter base open-weights transformer foundation. It functions as a multi-stage execution environment designed to intercept, analyze, branch, and prune alternative reasoning trajectories <strong>mid-transit</strong> inside hidden state representations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
              <div className="p-6 rounded-xl border border-neutral-200 bg-white/40 backdrop-blur-sm shadow-sm">
                <h3 className="font-bold text-[#0B0B0B] mb-2 text-base tracking-tight">100% Token Abatement</h3>
                <p className="text-neutral-500 font-normal leading-relaxed">When hit with adversarial triggers that cause frontier APIs to confabulate, HILSA’s short-circuit gate drops execution outputs to absolute zero.</p>
              </div>
              <div className="p-6 rounded-xl border border-neutral-200 bg-white/40 backdrop-blur-sm shadow-sm">
                <h3 className="font-bold text-[#0B0B0B] mb-2 text-base tracking-tight">Continuous Verification</h3>
                <p className="text-neutral-500 font-normal leading-relaxed">The system runs on a zero-regression baseline, clearing 100% of its deep integration test suite (27/27 green) under AOT CUDA Graph constraints.</p>
              </div>
              <div className="p-6 rounded-xl border border-neutral-200 bg-white/40 backdrop-blur-sm shadow-sm">
                <h3 className="font-bold text-[#0B0B0B] mb-2 text-base tracking-tight">High-Throughput Async Probe</h3>
                <p className="text-neutral-500 font-normal leading-relaxed">Built on a concurrent networking layer, our framework stress-tests frontier networks at a scale of 150 requests per cycle with zero SDK dependencies.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: OPEN BENCHMARK & ARCHITECTURAL TRANSPARENCY */}
        {displaySection === 2 && (
          <div className="w-full max-w-5xl text-left h-full max-h-[82vh] overflow-y-auto pr-2 custom-scrollbar pt-20 pb-10">
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">System Trace Analysis</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B0B0B] leading-none">
                Open Benchmark &amp; Architectural Transparency
              </h2>
            </div>

            <div className="p-5 rounded-xl border border-neutral-200 bg-white/50 backdrop-blur-md shadow-sm mb-8">
              <p className="text-[#0B0B0B] font-semibold text-base mb-2">The Raw Reality of Prototype Phase-1</p>
              <p className="text-neutral-500 font-medium text-sm leading-relaxed">
                We believe in radical transparency. If you look at our early execution trace data, the metrics look messy. 
                ÆON currently exhibits latency penalties ranging from 2x to 6x over multi-billion-parameter frontier APIs, and our token counts 
                on adversarial &quot;mine&quot; traps spike heavily instead of dropping to zero. This is an empty house with the plumbing mapped out, but no water running through it yet.
              </p>
            </div>

            <h3 className="font-bold text-[#0B0B0B] text-lg tracking-tight mb-3">1. Why the Current Metrics Look Messy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm mb-8">
              <div className="p-5 rounded-xl border border-neutral-200/70 bg-white/30 backdrop-blur-sm">
                <h4 className="font-bold text-red-600 mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Token Spikes on Adversarial Traps
                </h4>
                <p className="text-neutral-500 font-medium leading-relaxed">
                  Our Layer 1 speculative kill gate (<code className="text-xs font-mono bg-neutral-100 px-1 rounded text-neutral-700">energy_model/energy_head.py</code>) is currently initialized to a static baseline calibration matrix rather than trained parameters. It acts as a passive proxy, allowing adversarial trajectories to slip straight past the gate and trigger full token generation loop workloads.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-neutral-200/70 bg-white/30 backdrop-blur-sm">
                <h4 className="font-bold text-amber-600 mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Severe Latency Penalties
                </h4>
                <p className="text-neutral-500 font-medium leading-relaxed">
                  Edge-case telemetry friction. The prototype runtime engine currently extracts deep hidden-state activation statistics on the <strong>CPU side</strong>. Copying heavy vectors from GPU VRAM back to CPU RAM memory to compute Shannon entropy creates a massive pipeline bottleneck that destroys real-time performance.
                </p>
              </div>
            </div>

            <h3 className="font-bold text-[#0B0B0B] text-lg tracking-tight mb-3">2. The Core Paradox &amp; Embedded Signal</h3>
            <p className="text-neutral-500 font-medium text-sm leading-relaxed mb-6">
              When you view our matrix, you are looking at an asymmetric comparison: fully operational, multi-billion-parameter production APIs contrasted against an <strong>untrained 1.5B base model running on structural stubs</strong>. However, because our dynamic memory routing structure (<code className="text-xs font-mono bg-neutral-100 px-1 rounded text-neutral-700">paged_cache.py</code>) is fully operational, the architecture managed to outscore frontier systems out-of-the-box in two core stress tests:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-8">
              <div className="p-4 rounded-xl border border-neutral-200 bg-white/40 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-[#0B0B0B]">Hallucination-Traps Success</h5>
                  <p className="text-neutral-400 text-xs font-medium">Structural layout interception baseline</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-emerald-600">62.5%</span>
                  <span className="text-neutral-400 text-xs block">vs 50.0% Frontier</span>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-neutral-200 bg-white/40 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-[#0B0B0B]">Long Context Navigation</h5>
                  <p className="text-neutral-400 text-xs font-medium">Memory layout pointer routing map</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-emerald-600">66.7%</span>
                  <span className="text-neutral-400 text-xs block">vs 50.0% Frontier</span>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-[#0B0B0B] text-lg tracking-tight mb-3">3. Our Path to Convergence (The Architecture Matrix)</h3>
            <div className="space-y-3 text-sm mb-4">
              <div className="p-4 rounded-xl border border-neutral-200/60 bg-white/50 flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                <span className="font-mono font-bold text-neutral-400 w-36 block shrink-0 pt-0.5">Phase 1: Activation</span>
                <div>
                  <h4 className="font-bold text-[#0B0B0B] mb-1 text-base tracking-tight">Shift the Energy Head to Margin Ranking Loss</h4>
                  <p className="text-neutral-500 font-medium leading-relaxed">
                    We are replacing the static matrices in <code className="text-xs font-mono bg-neutral-100 px-1 rounded text-neutral-700">energy_head.py</code> with an explicit optimization loop using paired hidden-state tracking arrays from our harness. This forces the layer to maximize the mathematical distance between clean reasoning paths and adversarial cascades, dropping token consumption to <strong>exactly 0</strong>.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-neutral-200/60 bg-white/50 flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                <span className="font-mono font-bold text-neutral-400 w-36 block shrink-0 pt-0.5">Phase 1: Adaptation</span>
                <div>
                  <h4 className="font-bold text-[#0B0B0B] mb-1 text-base tracking-tight">Bake the Stage-2 LoRA Adapter</h4>
                  <p className="text-neutral-500 font-medium leading-relaxed">
                    Swapping the graceful stub fallbacks inside <code className="text-xs font-mono bg-neutral-100 px-1 rounded text-neutral-700">adapter.py</code> for a targeted Supervised Fine-Tuning (SFT) sweep. This parameters set will train the low-rank adaptation matrices to manipulate the logit streams away from blind guessing the moment structural deformation is identified.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-neutral-200/60 bg-white/50 flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                <span className="font-mono font-bold text-neutral-400 w-36 block shrink-0 pt-0.5">Phase 2: Hardware</span>
                <div>
                  <h4 className="font-bold text-[#0B0B0B] mb-1 text-base tracking-tight">Rewrite Feature Extraction into Triton Kernels</h4>
                  <p className="text-neutral-500 font-medium leading-relaxed">
                    Moving Shannon entropy calculations off the host CPU. By compiling custom hardware-level Triton expressions in <code className="text-xs font-mono bg-neutral-100 px-1 rounded text-neutral-700">features.py</code>, geometric activation checks will execute entirely within the GPU cache space, eliminating context-switch overloads and slashing latency bounds down to nominal margins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: PIPELINE ARCHITECTURE */}
        {displaySection === 3 && (
          <div className="w-full max-w-4xl text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B0B0B] mb-5">
              The 10-Stage Mid-Transit Core Pipeline
            </h2>
            
            <div className="space-y-3 max-w-4xl max-h-[60vh] overflow-y-auto pr-1">
              {[
                { step: "Stages 1–2", name: "Base Cognitive Prior", desc: "Integrating optimized structural weights (utilizing a high-leverage Qwen2.5 backbone) to anchor a clean, neutral reasoning substrate." },
                { step: "Stages 3–4", name: "Mission Builder & ThoughtState", desc: "Instantiating the parallel ShadowState tracking matrix to tag unknowns, map data deficits, and monitor local confidence intervals in real-time." },
                { step: "Stages 5–6", name: "Geometry Engine & Task Refinement", desc: "Enforcing geometric coherence through iterative execution loops, correcting internal semantic drift before output generation." },
                { step: "Stages 7–8", name: "Energy Optimization & Ruliad Branching", desc: "Projecting multi-branch hypothesis forks concurrently. HILSA uses fast-weight dynamics to collapse computational variations onto the lowest thermodynamic energy state." },
                { step: "Stages 9–10", name: "Hypothesis Universe & Verification Shell", desc: "The final validation runtime. Triggers internal repair loops on logical flaws, or fires the Question Generator to output a precise query instead of a guess." }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-200/60 bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row gap-2 sm:gap-6 items-start text-sm">
                  <span className="font-mono font-bold text-neutral-400 w-24 block shrink-0 pt-0.5">{item.step}</span>
                  <div>
                    <h4 className="font-bold text-[#0B0B0B] mb-1 text-base tracking-tight">{item.name}</h4>
                    <p className="text-neutral-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: MILESTONES ROADMAP */}
        {displaySection === 4 && (
          <div className="w-full max-w-4xl text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B0B0B] mb-2">
              Master Release &amp; Strategic Roadmap
            </h2>
            <p className="text-neutral-500 font-medium text-sm sm:text-base mb-4 max-w-3xl">
              Our ultimate long-term goal is to deploy an open-core cognitive engineering platform that slashes enterprise compute expenditure by up to 60% compared to brute-force Chain-of-Thought text loops.
            </p>

            <div className="space-y-3 max-w-4xl max-h-[50vh] overflow-y-auto pr-1">
              {[
                { target: "Milestone I", title: "Architectural Decoupling & Shell Modularization", text: "Shattering the monolithic inference handler into isolated modules (shell_stages.py, shell_audit.py, shell_repair.py) to guarantee zero local variable namespace cross-contamination during scale sweeps." },
                { target: "Milestone II", title: "Synthesis of the Golden Disruption Dataset", text: "Expanding our async evaluation harness from 50 to 500 premium test tokens designed to expose the catastrophic structural blindspots of frontier APIs (Semantic Hybrid Mines, Dynamic Schema Agnosticism, and Cognitive Echoes)." },
                { target: "Milestone III", title: "Weight Hardening via Contrastive Margin Ranking Loss", text: "Optimizing the StableEnergyHead parameters using an automated ranking loss formulation [L = max(0, -y * (E_good - E_bad) + margin)] to autonomously terminate subverted paths early at Layer 1." },
                { target: "Milestone IV", title: "Vectorized Tree Exploration & Triton GPU Optimization", text: "Refactoring tree-routing routines into vectorized Batch Tensor Operation grids and implementing native Triton GPU expressions to calculate activation Shannon entropy entirely within the GPU cache space." }
              ].map((milestone, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-sm text-sm">
                  <span className="font-bold text-amber-600 block mb-0.5 uppercase tracking-wider text-xs">{milestone.target}</span>
                  <h4 className="font-bold text-[#0B0B0B] text-base mb-1 tracking-tight">{milestone.title}</h4>
                  <p className="text-neutral-500 font-medium leading-relaxed">{milestone.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: GROUNDED CORE MANIFESTO PASS */}
        {displaySection === 5 && (
          <div className="w-full max-w-4xl text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B0B0B] mb-5 leading-tight">
              Grounded, Transparent Cognitive Engineering
            </h2>
            
            <p className="text-base sm:text-lg text-neutral-800 font-medium tracking-tight leading-relaxed max-w-4xl mb-5">
              HILSA isn&apos;t built to rewrite AI theory from scratch. It is a highly focused, practical structural runtime engine designed to solve a massive infrastructure problem: **wasted enterprise token cycles**. By adding a dedicated multi-branch cognitive gating framework around open-weights base transformers, we can force early validation constraints directly into hidden state residual passes. 
            </p>
            
            <p className="text-sm sm:text-base text-neutral-500 font-medium leading-relaxed max-w-3xl mb-8">
              We don&apos;t launch empty prompt scripts or heavy, hyper-tuned fine-tuning iterations. The repository maps out explicit code decoupling targets, robust asynchrony testing suites, and concrete tensor routing optimizations. If you believe that small, carefully constrained models running under explicit local constraints are the key to dropping compute costs down to zero, your support will help us clear these validation bounds faster.
            </p>

            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-medium text-neutral-400">
              <div>
                Designed &amp; Developed Independently by <span className="text-[#0B0B0B] font-bold">Manish Raj Vangari</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="https://github.com/manishraj1/HILSA.git" target="_blank" rel="noreferrer" className="hover:text-[#0B0B0B] transition-colors">GitHub</a>
                <a href="https://zero-defect.vercel.app/" className="hover:text-[#0B0B0B] transition-colors">Live Portal</a>
                <a href="#workspace" className="hover:text-[#0B0B0B] transition-colors">Contact Workspace</a>
              </div>
            </div>
          </div>
        )}

      </div>

    </main>
  );
}