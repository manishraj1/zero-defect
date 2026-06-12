"use client";

import React from "react";

interface HilsaLogoProps {
  size?: number;
  className?: string;
}

export default function HilsaLogo({ size = 200, className = "" }: HilsaLogoProps) {
  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Precision Micro-animations for Organic Intelligence Motion */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbitTighten {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(4deg) scale(0.97); }
        }
        @keyframes pulseCore {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.08); }
        }
        .arc-system {
          transform-origin: 100px 100px;
          animation: orbitTighten 9s ease-in-out infinite;
        }
        .quantum-glow {
          transform-origin: 100px 100px;
          animation: pulseCore 6s ease-in-out infinite;
        }
      `}} />

      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Subtle Deep Semantic Alignment Glow */}
          <radialGradient id="coreConvergenceGlow" cx="100" cy="100" r="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#1E3A8A" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Premium Drop Shadow for Paper/Interface Elevation */}
          <filter id="researchElevation" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Ambient Cognitive Foundation Field */}
        <circle className="quantum-glow" cx="100" cy="100" r="60" fill="url(#coreConvergenceGlow)" />

        {/* MAIN CONVERGENCE EMBLEM */}
        <g className="arc-system" filter="url(#researchElevation)">
          
          {/* Branch 1: The Outer Bound Uncertainty Arc */}
          <path
            d="M 100,25 A 75,75 0 0,1 175,100 C 175,115 162,122 152,112 A 50,50 0 0,0 100,50 C 90,50 85,38 95,28 Z"
            fill="#F8FAFC"
            opacity="0.95"
          />

          {/* Branch 2: The Multi-Branch Reasoning Loop */}
          <path
            d="M 175,100 A 75,75 0 0,1 100,175 C 85,175 78,162 88,152 A 50,50 0 0,0 150,100 C 150,90 162,85 172,95 Z"
            fill="#E2E8F0"
            opacity="0.8"
          />

          {/* Branch 3: Self-Repair / Corrective Trajectory */}
          <path
            d="M 100,175 A 75,75 0 0,1 25,100 C 25,85 38,78 48,88 A 50,50 0 0,0 100,150 C 110,150 115,162 105,172 Z"
            fill="#94A3B8"
            opacity="0.65"
          />

          {/* Branch 4: Semantic Convergence Vector */}
          <path
            d="M 25,100 A 75,75 0 0,1 100,25 C 115,25 122,38 112,48 A 50,50 0 0,0 50,100 C 50,110 38,115 28,105 Z"
            fill="#64748B"
            opacity="0.5"
          />

          {/* THE MANDELBROT / OAN VOID CENTER COHERENCE */}
          {/* This negative space geometry naturally sharpens focus directly to the absolute center */}
          <polygon
            points="100,82 116,91 116,109 100,118 84,109 84,91"
            fill="#0B0B0C" 
            opacity="0.15"
          />
          
        </g>
      </svg>
    </div>
  );
}