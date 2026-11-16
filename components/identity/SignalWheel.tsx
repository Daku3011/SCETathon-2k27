"use client";

import React from "react";

export function SignalWheel({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full max-w-[750px] aspect-square flex items-center justify-center select-none ${className}`}>
      {/* Radial soft lilac aura */}
      <div
        className="absolute inset-[6%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201, 197, 253, 0.12) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      <svg
        className="w-full h-full overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)]"
        viewBox="0 0 680 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Signal Wheel: Kinetic geometric identity blending Indian jaali symmetry with technology"
      >
        <defs>
          <pattern id="signal-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2" fill="#D8FF50" opacity=".45" />
          </pattern>
          <clipPath id="clipcircle">
            <circle cx="340" cy="340" r="305" />
          </clipPath>
        </defs>

        {/* Orbit track rings */}
        <circle
          cx="340"
          cy="340"
          r="310"
          stroke="#D8FF50"
          strokeWidth="1"
          strokeDasharray="3 12"
          opacity=".7"
        />
        <circle cx="340" cy="340" r="267" stroke="#C9C5FD" opacity=".6" />
        <circle cx="340" cy="340" r="220" stroke="#C9C5FD" strokeWidth="1.5" />
        <circle
          cx="340"
          cy="340"
          r="180"
          stroke="#FF7358"
          strokeWidth="2"
          strokeDasharray="14 8"
        />

        {/* Outer Kinetic Petals / Jaali points (Rotates forward 60s) */}
        <g className="radial-rotator origin-center">
          {/* 4 cardinal points (Acid Lime) */}
          <path d="M340 32L384 180L340 249L296 180L340 32Z" fill="#D8FF50" />
          <path d="M648 340L500 384L431 340L500 296L648 340Z" fill="#D8FF50" />
          <path d="M340 648L296 500L340 431L384 500L340 648Z" fill="#D8FF50" />
          <path d="M32 340L180 296L249 340L180 384L32 340Z" fill="#D8FF50" />

          {/* 4 diagonal diamond planes (Lilac) */}
          <path d="M122 122L280 206L300 300L206 280L122 122Z" fill="#C9C5FD" />
          <path d="M558 122L474 280L380 300L400 206L558 122Z" fill="#C9C5FD" />
          <path d="M558 558L400 474L380 380L474 400L558 558Z" fill="#C9C5FD" />
          <path d="M122 558L206 400L300 380L280 474L122 558Z" fill="#C9C5FD" />
        </g>

        {/* Dual Rotating Square Frames (Coral) (Rotates reverse 39s) */}
        <g className="inner-rotator origin-center" stroke="#FF7358" strokeWidth="6">
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

        {/* Radial cross hairs / stripes (Rotates 18s) */}
        <g className="wheel-stripe origin-center" opacity=".8">
          <path
            d="M340 50V260M340 420V630M50 340H260M420 340H630"
            stroke="#F2F0E8"
            strokeWidth="2"
            strokeDasharray="2 13"
          />
        </g>

        {/* Core concentric hub */}
        <circle cx="340" cy="340" r="79" fill="#111210" stroke="#D8FF50" strokeWidth="13" />
        <circle cx="340" cy="340" r="45" fill="#FF7358" />
        {/* Core 8-point star cutout */}
        <path
          d="M340 308L348 332L373 340L348 348L340 373L332 348L308 340L332 332Z"
          fill="#111210"
        />

        {/* Satellite planetary signal nodes */}
        <circle cx="75" cy="168" r="10" fill="#FF7358" />
        <circle cx="566" cy="530" r="12" fill="#C9C5FD" />
        <circle cx="585" cy="167" r="6" fill="#D8FF50" />
      </svg>

      {/* Floating circular stamp badge: FUTURE MEETS FOLK */}
      <div
        className="absolute right-[6%] md:right-[11%] bottom-[8%] md:bottom-[15%] w-[110px] h-[110px] md:w-[150px] md:h-[150px] bg-coral rounded-full flex items-center justify-center font-mono font-bold text-[10px] md:text-[11px] text-ink uppercase tracking-wider text-center shadow-[0_0_0_8px_#111210] md:shadow-[0_0_0_10px_#111210] select-none rotate-[11deg]"
        aria-hidden="true"
      >
        <span className="-rotate-[11deg] leading-tight">
          FUTURE
          <br />
          MEETS
          <br />
          FOLK ✳
        </span>
      </div>
    </div>
  );
}

export default SignalWheel;
