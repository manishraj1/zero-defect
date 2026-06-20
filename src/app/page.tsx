"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// --- Neural torus logo (animated lattice + signal tracks) ---
function TorusLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

// --- Ambient blue vapor background shader ---
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

const REPO_URL = "https://github.com/manishraj1/HILSA";
const PAPER_URL = "https://www.researchgate.net/publication/407307300_The_Verification_Ceiling_and_the_Gating_Frontier_Inference-Time_Selection_and_Adaptive_Compute_on_a_15B_Model";

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
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
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

      {/* LAYER 1: Ambient canvas background */}
      <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      {/* LAYER 2: Floating navigation */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-12 py-6 select-none bg-transparent">
        <button onClick={() => navigateWithVaporTransition(0)} className="flex items-center gap-2 group bg-transparent border-0 cursor-pointer shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center transition-transform duration-500 group-hover:rotate-1 group-hover:scale-105">
            <TorusLogo />
          </div>
          <span className="text-base font-bold tracking-tighter text-[#0B0B0B]">HILSA</span>
        </button>

        <div className="grow flex justify-center pr-16 hidden md:flex">
          <nav className="flex items-center space-x-14 text-base font-semibold tracking-tight">
            {[
              { label: "Overview", idx: 0 },
              { label: "Findings", idx: 1 },
              { label: "What's Next", idx: 2 }
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

      {/* LAYER 3: Content stage */}
      <div
        className={`h-full w-full flex flex-col justify-center items-center px-12 sm:px-24 md:px-32 relative z-10 transition-all duration-500 ${
          isVaporDissolving
            ? "opacity-0 -translate-y-3 blur-sm pointer-events-none"
            : "opacity-100 translate-y-0 blur-none pointer-events-auto"
        }`}
      >

        {/* VIEW 0: OVERVIEW */}
        {displaySection === 0 && (
          <div className="max-w-4xl mx-auto w-full flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 text-center max-w-3xl mb-6 leading-tight">
              The Verification Ceiling and the Gating Frontier:<br />
              <span className="font-medium text-neutral-600 text-xl sm:text-2xl block mt-2">Inference-Time Selection and Adaptive Compute on a 1.5B Model</span>
            </h1>

            <div className="w-full max-w-3xl bg-white/70 backdrop-blur-md border border-neutral-200/80 rounded-xl p-6 shadow-sm mb-8 text-left max-h-[42vh] overflow-y-auto custom-scrollbar">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-3">Abstract</span>
              <p className="text-sm font-normal text-neutral-700 leading-relaxed font-serif">
                We present an empirical evaluation of inference-time answer selection and adaptive compute scaling on a sub-2B parameter model (Qwen2.5-1.5B-Instruct), evaluated on the GSM8K mathematical reasoning benchmark under a strict, pre-registered design.
                <br /><br />
                First, can cheap inference-time verifiers select a better answer across K sampled chains than majority vote? Across six verification frameworks — token-confidence signals and cross-validated classifiers over hidden states — we report a clear negative result: no verifier outperforms majority voting, consistent with a structural verification ceiling (ROC-AUC ≈ 0.71–0.74).
                <br /><br />
                Second, can we recover full ensemble accuracy with less compute via adaptive sampling? An agreement-margin stopping rule recovers majority@6 accuracy using 4.12 samples on average — a ~31% compute reduction at statistically indistinguishable accuracy. We position both results against existing test-time-scaling work and release all code and data for reproduction.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noreferrer"
                className="px-10 py-4 bg-neutral-900 text-white font-mono font-bold text-xs rounded-full hover:bg-black transition-all duration-300 no-underline text-center shadow-md tracking-wider uppercase"
              >
                Read the Paper &rarr;
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="px-10 py-4 bg-white/40 text-neutral-900 border border-neutral-300 font-mono font-bold text-xs rounded-full hover:bg-white/70 transition-all duration-300 no-underline text-center tracking-wider uppercase"
              >
                View Code &amp; Data
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-3 bg-white/35 backdrop-blur-2xl border border-white/50 rounded-full py-2.5 px-5 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-xs font-mono font-bold tracking-tight text-neutral-500 uppercase">
                Submitted to TMLR · Under Review
              </span>
            </div>
          </div>
        )}

        {/* VIEW 1: FINDINGS */}
        {displaySection === 1 && (
          <div className="w-full max-w-4xl text-left animate-[fadeIn_0.5s_ease-out]">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-2">Results</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B0B0B] mb-6 leading-tight">
              Two findings, one negative and one positive
            </h2>

            <div className="space-y-6 text-neutral-600 font-medium text-base leading-relaxed max-w-3xl mb-8">
              <p>
                Both results are pre-registered, with bootstrap confidence intervals on every estimate and a paired bootstrap for each comparison against the baseline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
              <div className="p-6 rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-md shadow-sm">
                <h3 className="font-bold text-neutral-800 mb-3 text-base tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-500" /> Finding 1 — The verification ceiling
                </h3>
                <p className="text-neutral-500 font-normal leading-relaxed mb-4">
                  Six inference-time verifiers — token log-probability signals and cross-validated classifiers over hidden states — carry real discriminative signal but none beats plain majority vote for selection. When the model produces a correct chain, it usually already forms the plurality, leaving little room for a verifier to help.
                </p>
                <div className="border-t border-neutral-100 pt-3 text-xs font-mono text-neutral-400 leading-normal">
                  • Random single sample: 50.2% [44.3, 56.0]<br />
                  • Majority vote: 68.7% [60.7, 76.0]<br />
                  • Oracle pass@K (ceiling): 83.3% [77.3, 89.3]<br />
                  • Verifier ROC-AUC: 0.71 – 0.74 (none beats majority)
                </div>
              </div>

              <div className="p-6 rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-md shadow-sm">
                <h3 className="font-bold text-emerald-600 mb-3 text-base tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Finding 2 — The gating frontier
                </h3>
                <p className="text-neutral-500 font-normal leading-relaxed mb-4">
                  A training-free agreement-margin stopping rule (stop once the lead reaches 2) reaches full majority@6 accuracy while sampling fewer chains. Easy prompts reach consensus and stop early; hard prompts use the full budget. This reproduces, on a 1.5B model, the efficiency reported for adaptive self-consistency.
                </p>
                <div className="border-t border-neutral-100 pt-3 text-xs font-mono text-emerald-600 leading-normal font-bold">
                  • Accuracy: 66.7% vs 66.8% majority@6 (−0.1 pp, within CI)<br />
                  • Average samples: 4.12 (of 6)<br />
                  • Compute reduction: ~31%
                </div>
              </div>
            </div>

            <div className="w-full bg-white/20 backdrop-blur-sm rounded-xl py-3 px-4 border border-neutral-200/50 flex items-center space-x-3 text-xs font-mono text-neutral-400">
              <span className="font-bold text-neutral-500">Scope</span>
              <span>One model, one benchmark, arithmetic reasoning, K ≤ 6. Not claimed to generalize; full limitations in the paper.</span>
            </div>
          </div>
        )}

        {/* VIEW 2: WHAT'S NEXT */}
        {displaySection === 2 && (
          <div className="w-full max-w-4xl text-left animate-[fadeIn_0.5s_ease-out]">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-2">Direction</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B0B0B] mb-5 leading-tight">
              Where this goes next
            </h2>

            <div className="space-y-6 text-neutral-700 font-normal text-base leading-relaxed max-w-3xl mb-8">
              <p>
                This study is a foundation: a careful, reproducible measurement of where a small model&apos;s inference-time compute helps and where it doesn&apos;t. The approach throughout is to pre-register claims, accept kill conditions, and report negative results as readily as positive ones.
              </p>
              <p className="text-neutral-500">
                The current line of work asks a deployment question that offline scaling studies set aside: how should a system allocate test-time compute per prompt under a hard latency deadline, when queries arrive as a live stream and share a GPU? The compute spent on one prompt is latency paid by the next — a coupling that per-prompt allocation typically ignores.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-neutral-200 bg-white/50 backdrop-blur-md mb-8 max-w-3xl">
              <h4 className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">In development</h4>
              <p className="text-neutral-500 text-sm font-normal leading-relaxed">
                A follow-up study on latency-aware test-time compute allocation in streaming serving is in progress, alongside an open-source harness. Data and code will be released here as milestones land.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-medium text-neutral-400 font-mono">
              <div>
                Independent research by <span className="text-[#0B0B0B] font-bold font-sans text-sm">Manish Raj Vangari</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-[#0B0B0B] transition-colors no-underline">GitHub</a>
                <a href={PAPER_URL} target="_blank" rel="noreferrer" className="hover:text-[#0B0B0B] transition-colors no-underline">Preprint</a>
              </div>
            </div>
          </div>
        )}

      </div>

    </main>
  );
}