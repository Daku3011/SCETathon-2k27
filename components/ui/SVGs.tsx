"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Interdisciplinary Engineering Art:
 * - Computer Engineering: Microcontroller silicon core, clock crystal, logic signal bus, digital pin headers.
 * - Chemical Engineering: Hexagonal molecular benzene lattice, microfluidic channels, catalytic reaction node.
 * - Mandana geometric linework: Four nested chalk diamonds with doubled contours, comb strokes & auspicious terminal ticks.
 * - Tracing animations: Jumper wire (digital) and fluidic conduit (chemical) trace smoothly on entry.
 */
export function BreadboardIllustration({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-full min-h-[380px] md:min-h-[480px] lg:min-h-[600px] bg-[#172C67] flex items-center justify-center overflow-hidden select-none ${className}`}
      aria-label="Interdisciplinary Computer and Chemical Engineering technical illustration with Mandana chalk linework"
      role="img"
    >
      {/* Background fine grid overlay for engineering precision */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(#F5EFE2 1px, transparent 1px), radial-gradient(#F5EFE2 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      {/* Subtle department indicator labels overlaid in corners */}
      <div className="absolute top-4 left-6 flex items-center gap-2 text-[10px] font-mono text-[#F5EFE2]/60 tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#963E29]" />
        <span>DEPT. OF COMPUTER ENGINEERING // MCU ARCHITECTURE</span>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-mono text-[#F5EFE2]/60 tracking-wider">
        <span>DEPT. OF CHEMICAL ENGINEERING // PROCESS &amp; MOLECULAR SYNTHESIS</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#5E8BFF]" />
      </div>

      <svg
        viewBox="0 0 660 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[640px] h-auto px-4 py-2 drop-shadow-2xl"
      >
        <defs>
          <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Main Interdisciplinary Circuit & Process Substrate */}
        <rect
          x="60"
          y="50"
          width="540"
          height="440"
          rx="6"
          fill="#1E387F"
          stroke="#F5EFE2"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
        {/* Inner board rim */}
        <rect
          x="72"
          y="62"
          width="516"
          height="416"
          rx="4"
          fill="#132454"
          stroke="#F5EFE2"
          strokeWidth="0.75"
          strokeOpacity="0.25"
        />

        {/* 2. Top Power & Reagent Rails */}
        <line x1="86" y1="82" x2="574" y2="82" stroke="#E15B5B" strokeWidth="1.2" strokeOpacity="0.75" />
        <line x1="86" y1="102" x2="574" y2="102" stroke="#5E8BFF" strokeWidth="1.2" strokeOpacity="0.75" />
        {Array.from({ length: 26 }).map((_, i) => (
          <g key={`rail-top-${i}`}>
            <circle cx={94 + i * 19} cy="82" r="2" fill="#F5EFE2" fillOpacity="0.5" />
            <circle cx={94 + i * 19} cy="102" r="2" fill="#F5EFE2" fillOpacity="0.5" />
          </g>
        ))}

        {/* 3. Bottom Power & Effluent Rails */}
        <line x1="86" y1="440" x2="574" y2="440" stroke="#5E8BFF" strokeWidth="1.2" strokeOpacity="0.75" />
        <line x1="86" y1="460" x2="574" y2="460" stroke="#E15B5B" strokeWidth="1.2" strokeOpacity="0.75" />
        {Array.from({ length: 26 }).map((_, i) => (
          <g key={`rail-bot-${i}`}>
            <circle cx={94 + i * 19} cy="440" r="2" fill="#F5EFE2" fillOpacity="0.5" />
            <circle cx={94 + i * 19} cy="460" r="2" fill="#F5EFE2" fillOpacity="0.5" />
          </g>
        ))}

        {/* 4. Chemical Engineering: Molecular Benzene Lattice (Hexagonal Covalent Bonds) */}
        <g stroke="#F5EFE2" strokeOpacity="0.4" strokeWidth="1" fill="none">
          {/* Benzene Ring 1 */}
          <polygon points="460,150 485,165 485,195 460,210 435,195 435,165" />
          <circle cx="460" cy="180" r="14" stroke="#F5EFE2" strokeOpacity="0.25" strokeDasharray="3 2" />
          {/* Benzene Ring 2 (linked) */}
          <polygon points="510,180 535,195 535,225 510,240 485,225 485,195" />
          {/* Molecular bonds to process line */}
          <line x1="435" y1="180" x2="400" y2="180" strokeDasharray="2 2" />
          <line x1="485" y1="240" x2="485" y2="280" />
          {/* Reaction Nodes */}
          <circle cx="460" cy="150" r="3" fill="#963E29" />
          <circle cx="485" cy="195" r="3" fill="#5E8BFF" />
          <circle cx="435" cy="195" r="3" fill="#F5EFE2" />
        </g>

        {/* 5. Chemical Engineering: Serpentine Microfluidic Channel */}
        <motion.path
          d="M 400 290 H 450 V 320 H 420 V 350 H 460 V 380 H 490"
          stroke="#5E8BFF"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        />
        {/* Catalyst reaction flask symbol */}
        <path
          d="M 490 370 L 490 380 L 482 396 C 480 400 482 404 488 404 H 506 C 512 404 514 400 512 396 L 504 380 L 504 370 Z"
          stroke="#F5EFE2"
          strokeWidth="1.2"
          fill="#1E387F"
        />
        <line x1="488" y1="394" x2="506" y2="394" stroke="#963E29" strokeWidth="1" />

        {/* 6. Computer Engineering: Oscillator Crystal & Digital Bus */}
        <rect x="130" y="140" width="36" height="20" rx="3" fill="#0C142A" stroke="#F5EFE2" strokeWidth="1" />
        <circle cx="140" cy="150" r="1.5" fill="#F5EFE2" />
        <circle cx="156" cy="150" r="1.5" fill="#F5EFE2" />
        {/* Clock signal lines */}
        <line x1="148" y1="160" x2="148" y2="190" stroke="#F5EFE2" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* 7. Center Divider Channel (Trough) */}
        <rect x="86" y="264" width="488" height="12" fill="#0A1226" stroke="#F5EFE2" strokeWidth="0.5" strokeOpacity="0.3" />

        {/* 8. Terminal Strip Grid Dots (Computer breadboard matrix) */}
        {Array.from({ length: 16 }).map((_, col) => {
          const cx = 110 + col * 18;
          return (
            <g key={`comp-matrix-${col}`}>
              <circle cx={cx} cy="150" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
              <circle cx={cx} cy="172" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
              <circle cx={cx} cy="194" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
              <circle cx={cx} cy="216" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
              <circle cx={cx} cy="238" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />

              <circle cx={cx} cy="302" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
              <circle cx={cx} cy="324" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
              <circle cx={cx} cy="346" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
              <circle cx={cx} cy="368" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
              <circle cx={cx} cy="390" r="1.75" fill="#F5EFE2" fillOpacity="0.25" />
            </g>
          );
        })}

        {/* 9. Mandana Nested Chalk Diamonds surrounding Central Chip */}
        {/* Diamond 4 (Outer chalk diamond with Mandana comb hatchings) */}
        <polygon
          points="310,135 440,270 310,405 180,270"
          stroke="#F5EFE2"
          strokeWidth="1.25"
          strokeDasharray="4 2"
          strokeOpacity="0.75"
          fill="none"
        />
        {/* Mandana Comb Strokes / Tooth Hatchings */}
        {[
          [310, 135, 310, 122],
          [440, 270, 452, 270],
          [310, 405, 310, 418],
          [180, 270, 168, 270],
          [375, 202, 384, 194],
          [375, 338, 384, 346],
          [245, 338, 236, 346],
          [245, 202, 236, 194],
        ].map(([x1, y1, x2, y2], idx) => (
          <line
            key={`mandana-tooth-${idx}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F5EFE2"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />
        ))}

        {/* Diamond 3 (Doubled contour) */}
        <polygon
          points="310,155 420,270 310,385 200,270"
          stroke="#F5EFE2"
          strokeWidth="1.5"
          strokeOpacity="0.85"
          fill="none"
        />

        {/* Diamond 2 (Inner dashed diamond) */}
        <polygon
          points="310,175 400,270 310,365 220,270"
          stroke="#F5EFE2"
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeOpacity="0.65"
          fill="none"
        />

        {/* Diamond 1 (Innermost diamond encircling the chip) */}
        <polygon
          points="310,198 378,270 310,342 242,270"
          stroke="#F5EFE2"
          strokeWidth="1.5"
          strokeOpacity="0.9"
          fill="none"
        />

        {/* 10. Central Computer Engineering MCU (Integrated Circuit Chip) */}
        <rect
          x="270"
          y="238"
          width="80"
          height="64"
          rx="3"
          fill="#0C142A"
          stroke="#F5EFE2"
          strokeWidth="1.5"
        />
        {/* Orientation index notch */}
        <path d="M 270 264 A 6 6 0 0 1 270 276 Z" fill="#152759" stroke="#F5EFE2" strokeWidth="0.75" />
        {/* Chip Pins (8 top, 8 bottom) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <g key={`pins-${i}`}>
            <rect x={280 + i * 16} y="230" width="6" height="8" rx="1" fill="#E2E7F5" />
            <rect x={280 + i * 16} y="302" width="6" height="8" rx="1" fill="#E2E7F5" />
          </g>
        ))}
        {/* Silicon Core Marking */}
        <circle cx="310" cy="270" r="4" fill="#963E29" />

        {/* 11. Computer Jumper Wire (Animated with 260ms reveal) */}
        <motion.path
          d="M 164 194 C 190 120, 270 130, 296 230"
          stroke="#F5EFE2"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
        />
        <circle cx="164" cy="194" r="3.5" fill="#963E29" stroke="#F5EFE2" strokeWidth="1" />
        <circle cx="296" cy="230" r="3.5" fill="#963E29" stroke="#F5EFE2" strokeWidth="1" />

        {/* 12. Outgoing Conductor: Turns twice, connects to bottom poster join */}
        <motion.path
          d="M 326 310 L 326 470 L 600 470 L 600 560"
          stroke="#F5EFE2"
          strokeWidth="2"
          strokeLinecap="square"
          fill="none"
          strokeDasharray="6 3"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.95 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        />
        <circle cx="326" cy="310" r="3.5" fill="#963E29" stroke="#F5EFE2" strokeWidth="1" />
        <rect x="594" y="554" width="12" height="6" fill="#F5EFE2" />
      </svg>
    </div>
  );
}

/**
 * Mandana Repeating Border Tile SVG.
 */
export function MandanaBorderTile({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const strokeColor = inverted ? "#182239" : "#F5EFE2";

  return (
    <div
      className={`w-full overflow-hidden leading-none select-none ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        viewBox="0 0 960 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-7 block"
        preserveAspectRatio="none"
      >
        <pattern
          id={`mandana-tile-pat-${inverted ? "inv" : "def"}`}
          width="48"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="2" x2="48" y2="2" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.7" />
          <line x1="0" y1="4.5" x2="48" y2="4.5" stroke={strokeColor} strokeWidth="0.5" strokeOpacity="0.4" />

          <polygon
            points="24,6 40,14 24,22 8,14"
            stroke={strokeColor}
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="24,9 34,14 24,19 14,14"
            stroke={strokeColor}
            strokeWidth="0.75"
            strokeOpacity="0.6"
            fill="none"
          />
          <circle cx="24" cy="14" r="1.5" fill={strokeColor} />

          <line x1="24" y1="4.5" x2="24" y2="6" stroke={strokeColor} strokeWidth="1" />
          <line x1="24" y1="22" x2="24" y2="23.5" stroke={strokeColor} strokeWidth="1" />
          <line x1="6.5" y1="14" x2="8" y2="14" stroke={strokeColor} strokeWidth="1" />
          <line x1="40" y1="14" x2="41.5" y2="14" stroke={strokeColor} strokeWidth="1" />

          <line x1="0" y1="23.5" x2="48" y2="23.5" stroke={strokeColor} strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="0" y1="26" x2="48" y2="26" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.7" />
        </pattern>
        <rect width="960" height="28" fill={`url(#mandana-tile-pat-${inverted ? "inv" : "def"})`} />
      </svg>
    </div>
  );
}

/**
 * Mandana Terminal Diamond for timeline nodes.
 */
export function MandanaDiamond({
  className = "",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      <polygon
        points="12,2 22,12 12,22 2,12"
        stroke="#963E29"
        strokeWidth="1.5"
        fill="#F5EFE2"
      />
      <polygon
        points="12,5.5 18.5,12 12,18.5 5.5,12"
        stroke="#182239"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="12" cy="12" r="2.5" fill="#963E29" />
    </svg>
  );
}

/**
 * Mandana Decorative Floor/Wall Art Watermark for Page Backgrounds:
 * Auspicious geometric chalk mandala with concentric diamonds, doubled lines,
 * comb strokes, and fine blueprint coordinate grid.
 */
export function MandanaBackgroundWatermark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.06] ${className}`}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle blueprint dot grid pattern */}
          <pattern id="mandana-grid-pat" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#182239" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="#182239" strokeWidth="0.25" strokeDasharray="2 6" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="#182239" strokeWidth="0.25" strokeDasharray="2 6" />
          </pattern>
        </defs>

        {/* Base Grid */}
        <rect width="100%" height="100%" fill="url(#mandana-grid-pat)" />

        {/* Large Geometric Mandana Watermark Medallion */}
        <g stroke="#182239" strokeWidth="1.5" fill="none" opacity="0.7">
          <circle cx="85%" cy="30%" r="220" strokeDasharray="4 6" />
          <circle cx="85%" cy="30%" r="180" />
          <polygon points="85%,120 95%,30% 85%,480 75%,30%" strokeWidth="2" />
          <polygon points="85%,140 93%,30% 85%,460 77%,30%" strokeDasharray="3 3" />
        </g>

        {/* Secondary Chemical-Computer Lattice Watermark (Bottom Left) */}
        <g stroke="#182239" strokeWidth="1" fill="none" opacity="0.6">
          <polygon points="120,680 150,700 150,740 120,760 90,740 90,700" />
          <polygon points="180,720 210,740 210,780 180,800 150,780 150,740" />
          <line x1="120" y1="760" x2="120" y2="820" strokeDasharray="3 3" />
          <line x1="180" y1="800" x2="240" y2="800" />
        </g>
      </svg>
    </div>
  );
}
