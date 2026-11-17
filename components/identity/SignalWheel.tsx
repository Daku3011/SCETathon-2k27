"use client";

import React from "react";

export function SignalWheel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-w-[750px] aspect-square flex items-center justify-center select-none group/wheel cursor-pointer ${className}`}
      title="SCETATHON 2.0 Live Signal Reactor"
    >
      {/* Radial soft acid-lime & lilac multi-spectrum aura */}
      <div
        className="absolute inset-[4%] rounded-full pointer-events-none transition-opacity duration-700 opacity-60 group-hover/wheel:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(216, 255, 80, 0.12) 0%, rgba(201, 197, 253, 0.08) 45%, transparent 72%)",
        }}
        aria-hidden="true"
      />

      <svg
        className="w-full h-full overflow-visible drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out group-hover/wheel:scale-[1.02]"
        viewBox="0 0 680 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SCETATHON 2.0 Signal Wheel: Kinetic geometric identity blending Indian jaali symmetry with technological live telemetry"
      >
        <defs>
          <pattern id="signal-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2" fill="#13b6f1" opacity=".45" />
          </pattern>

          {/* Outer text orbit path: Radius 288, Circumference ~1809px */}
          <path
            id="orbit-path-outer"
            d="M 340, 340 m -288, 0 a 288,288 0 1,1 576,0 a 288,288 0 1,1 -576,0"
          />

          {/* Inner telemetry orbit path: Radius 152, Circumference ~955px */}
          <path
            id="orbit-path-inner"
            d="M 340, 340 m -152, 0 a 152,152 0 1,0 304,0 a 152,152 0 1,0 -304,0"
          />

          {/* Core radial glow filter */}
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#13b6f1" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#111210" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#111210" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* ── Outer Static Orbit Track Rings & Compass Azimuth ── */}
        <circle
          cx="340"
          cy="340"
          r="326"
          stroke="#13b6f1"
          strokeWidth="1"
          strokeDasharray="2 16"
          opacity=".45"
        />
        <circle
          cx="340"
          cy="340"
          r="308"
          stroke="#C9C5FD"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity=".5"
        />
        <circle
          cx="340"
          cy="340"
          r="268"
          stroke="#13b6f1"
          strokeWidth="1.2"
          opacity=".55"
        />
        <circle
          cx="340"
          cy="340"
          r="216"
          stroke="#C9C5FD"
          strokeWidth="1.5"
          opacity=".45"
        />
        <circle
          cx="340"
          cy="340"
          r="176"
          stroke="#FF7358"
          strokeWidth="2"
          strokeDasharray="14 8"
          opacity=".85"
        />

        {/* ── Kinetic Clockwise Orbiting Text Track: SCETATHON 2.0 ── */}
        <g className="wheel-text-clockwise origin-center">
          <text
            fill="#13b6f1"
            className="font-mono text-[10.5px] tracking-[0.26em] uppercase font-bold"
            opacity="0.9"
            style={{ textShadow: "0 0 10px rgba(216,255,80,0.5)" }}
          >
            <textPath href="#orbit-path-outer" startOffset="0%">
              ✦ SCETATHON 2.0 ✦ 24-HOUR NATIONAL HACKATHON ✦ SCET SURAT ✦ 28–29 JAN 2027 ✦ IDEAS · INNOVATION · IMPACT ✦
            </textPath>
          </text>
        </g>

        {/* ── Outer Kinetic Petals / Jaali points (Rotates forward 60s) ── */}
        <g className="radial-rotator origin-center">
          {/* 4 cardinal points (Acid Lime) */}
          <path d="M340 32L384 180L340 249L296 180L340 32Z" fill="#13b6f1" />
          <path d="M648 340L500 384L431 340L500 296L648 340Z" fill="#13b6f1" />
          <path d="M340 648L296 500L340 431L384 500L340 648Z" fill="#13b6f1" />
          <path d="M32 340L180 296L249 340L180 384L32 340Z" fill="#13b6f1" />

          {/* 4 diagonal diamond planes (Lilac) */}
          <path d="M122 122L280 206L300 300L206 280L122 122Z" fill="#C9C5FD" />
          <path d="M558 122L474 280L380 300L400 206L558 122Z" fill="#C9C5FD" />
          <path d="M558 558L400 474L380 380L474 400L558 558Z" fill="#C9C5FD" />
          <path d="M122 558L206 400L300 380L280 474L122 558Z" fill="#C9C5FD" />
        </g>

        {/* ── Dual Rotating Square Frames (Coral) (Rotates reverse 39s) ── */}
        <g className="inner-rotator origin-center" stroke="#FF7358" strokeWidth="5.5">
          <rect
            x="226"
            y="226"
            width="228"
            height="228"
            rx="8"
            transform="rotate(45 340 340)"
          />
          <rect x="258" y="258" width="164" height="164" rx="6" />
        </g>

        {/* ── Counter-Rotating Engineering Telemetry Orbit (42s reverse) ── */}
        <g className="wheel-text-counter origin-center">
          <text
            fill="#C9C5FD"
            className="font-mono text-[9px] tracking-[0.24em] uppercase font-bold"
            opacity="0.8"
          >
            <textPath href="#orbit-path-inner" startOffset="0%">
              ❖ INTERDISCIPLINARY ENGINEERING ❖ ATOMS MEET BITS ❖ 24H LIVE SPRINT ❖
            </textPath>
          </text>
        </g>

        {/* ── Radial cross hairs / stripes (Rotates 18s) ── */}
        <g className="wheel-stripe origin-center" opacity=".8">
          <path
            d="M340 50V250M340 430V630M50 340H250M430 340H630"
            stroke="#F2F0E8"
            strokeWidth="1.8"
            strokeDasharray="2 13"
          />
        </g>

        {/* ── Central High-Tech Reactor Hub (SCETATHON Core Lockup) ── */}
        {/* Hub backdrop circle */}
        <circle
          cx="340"
          cy="340"
          r="92"
          fill="url(#core-glow)"
          stroke="#13b6f1"
          strokeWidth="3.5"
          className="group-hover/wheel:stroke-coral transition-colors duration-500"
        />

        {/* Hub telemetry dashed ring */}
        <circle
          cx="340"
          cy="340"
          r="84"
          stroke="#C9C5FD"
          strokeWidth="1"
          strokeDasharray="3 7"
          opacity="0.65"
        />

        {/* Pulsing signal field aura */}
        <circle
          cx="340"
          cy="340"
          r="72"
          fill="rgba(216, 255, 80, 0.08)"
          className="animate-signal-pulse"
        />

        {/* Apex alignment diamond marker in Coral */}
        <polygon points="340,265 344,273 340,281 336,273" fill="#FF7358" />

        {/* Top telemetry tag */}
        <text
          x="340"
          y="298"
          textAnchor="middle"
          fill="#C9C5FD"
          className="font-mono text-[7px] uppercase tracking-[0.26em] font-bold select-none"
        >
          National Hackathon
        </text>

        {/* ── Hero SCETATHON Wordmark (Display Font) ── */}
        <text
          x="340"
          y="327"
          textAnchor="middle"
          fill="#F2F0E8"
          className="font-display text-[25px] tracking-[-0.035em] uppercase font-bold select-none"
          style={{
            filter: "drop-shadow(0 2px 14px rgba(216, 255, 80, 0.45))",
          }}
        >
          SCETATHON
        </text>

        {/* Edition 2.0 Acid Lime Pill Badge */}
        <rect
          x="286"
          y="336"
          width="108"
          height="19"
          rx="9.5"
          fill="#13b6f1"
          className="group-hover/wheel:fill-coral transition-colors duration-300"
        />
        <text
          x="340"
          y="349.5"
          textAnchor="middle"
          fill="#111210"
          className="font-mono text-[10px] uppercase tracking-[0.16em] font-bold select-none"
        >
          EDITION 2.0
        </text>

        {/* Sub-label: SURAT · 2027 */}
        <text
          x="340"
          y="372"
          textAnchor="middle"
          fill="#93958E"
          className="font-mono text-[8.5px] uppercase tracking-[0.22em] font-medium select-none"
        >
          SURAT · 2027
        </text>

        {/* Bottom Live Beacon Pulse Blip */}
        <circle cx="340" cy="392" r="3" fill="#FF7358" />
        <circle
          cx="340"
          cy="392"
          r="7"
          stroke="#FF7358"
          strokeWidth="1.2"
          opacity="0.6"
          className="animate-ping"
          style={{ transformOrigin: "340px 392px" }}
        />

        {/* ── Satellite Planetary Signal Nodes ── */}
        <circle cx="75" cy="168" r="9" fill="#FF7358" />
        <circle cx="566" cy="530" r="11" fill="#C9C5FD" />
        <circle cx="585" cy="167" r="6" fill="#13b6f1" />
      </svg>

      {/* Floating circular stamp badge: SCETATHON 2.0 / LIVE SPRINT */}
      <div
        className="absolute right-[5%] md:right-[9%] bottom-[6%] md:bottom-[12%] w-[120px] h-[120px] md:w-[155px] md:h-[155px] bg-coral rounded-full flex items-center justify-center font-mono font-bold text-[10px] md:text-[11px] text-ink uppercase tracking-wider text-center shadow-[0_0_0_8px_#111210] md:shadow-[0_0_0_10px_#111210] select-none rotate-[10deg] group-hover/wheel:rotate-[18deg] group-hover/wheel:scale-105 transition-all duration-500"
        aria-hidden="true"
      >
        <div className="absolute inset-1.5 border border-dashed border-ink/40 rounded-full animate-spin [animation-duration:30s]" />
        <span className="-rotate-[10deg] leading-tight">
          <strong className="block text-sm tracking-tight mb-0.5">BUILD * WIN</strong>
        </span>
      </div>
    </div>
  );
}

export default SignalWheel;
