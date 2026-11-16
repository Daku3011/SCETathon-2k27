"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Technical Breadboard Illustration with Mandana nested chalk diamonds.
 * - Indigo ground #172C67
 * - Breadboard with two pin rails, terminal strip, center chip
 * - Chip surround: 4 nested chalk diamonds with doubled contours & comb strokes
 * - Jumper wire animated: traces once in 260ms (ease-out), shows immediately on reduced motion
 * - One conductor leaving the board, turning twice and joining the border at the bottom
 * - Free of lettering to survive cropping across viewports
 */
export function BreadboardIllustration({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-full min-h-[340px] md:min-h-[460px] lg:min-h-[580px] bg-[#172C67] flex items-center justify-center overflow-hidden select-none ${className}`}
      aria-label="Technical breadboard illustration with Mandana-inspired chalk linework"
      role="img"
    >
      {/* Background fine grid overlay for engineering precision */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(#F5EFE2 1px, transparent 1px), radial-gradient(#F5EFE2 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      <svg
        viewBox="0 0 640 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[620px] h-auto px-4 py-2 drop-shadow-2xl"
      >
        <defs>
          {/* Subtle drop shadows and chalk filters */}
          <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Main Breadboard Body */}
        <rect
          x="70"
          y="60"
          width="500"
          height="400"
          rx="6"
          fill="#1E387F"
          stroke="#F5EFE2"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Inner breadboard rim */}
        <rect
          x="82"
          y="72"
          width="476"
          height="376"
          rx="4"
          fill="#152759"
          stroke="#F5EFE2"
          strokeWidth="0.75"
          strokeOpacity="0.2"
        />

        {/* 2. Top Power Rails (+ and -) */}
        <line x1="96" y1="92" x2="544" y2="92" stroke="#E15B5B" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="96" y1="112" x2="544" y2="112" stroke="#5E8BFF" strokeWidth="1" strokeOpacity="0.7" />
        {/* Top power rail pin tie points */}
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={`rail-top-${i}`}>
            <circle cx={104 + i * 19} cy="92" r="2" fill="#F5EFE2" fillOpacity="0.5" />
            <circle cx={104 + i * 19} cy="112" r="2" fill="#F5EFE2" fillOpacity="0.5" />
          </g>
        ))}

        {/* 3. Bottom Power Rails (+ and -) */}
        <line x1="96" y1="408" x2="544" y2="408" stroke="#5E8BFF" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="96" y1="428" x2="544" y2="428" stroke="#E15B5B" strokeWidth="1" strokeOpacity="0.7" />
        {/* Bottom power rail pin tie points */}
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={`rail-bot-${i}`}>
            <circle cx={104 + i * 19} cy="408" r="2" fill="#F5EFE2" fillOpacity="0.5" />
            <circle cx={104 + i * 19} cy="428" r="2" fill="#F5EFE2" fillOpacity="0.5" />
          </g>
        ))}

        {/* 4. Center Divider Channel (Trough) */}
        <rect x="92" y="254" width="456" height="12" fill="#0E1B3D" stroke="#F5EFE2" strokeWidth="0.5" strokeOpacity="0.25" />

        {/* 5. Terminal Strip Grid Dots (Top & Bottom banks) */}
        {Array.from({ length: 22 }).map((_, col) => {
          const cx = 112 + col * 19.5;
          return (
            <g key={`terminal-col-${col}`}>
              {/* Bank A (rows 1-5 above trough) */}
              <circle cx={cx} cy="144" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
              <circle cx={cx} cy="166" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
              <circle cx={cx} cy="188" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
              <circle cx={cx} cy="210" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
              <circle cx={cx} cy="232" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />

              {/* Bank B (rows 6-10 below trough) */}
              <circle cx={cx} cy="288" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
              <circle cx={cx} cy="310" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
              <circle cx={cx} cy="332" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
              <circle cx={cx} cy="354" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
              <circle cx={cx} cy="376" r="1.75" fill="#F5EFE2" fillOpacity="0.3" />
            </g>
          );
        })}

        {/* 6. Mandana Nested Chalk Diamonds surrounding Central Chip */}
        {/* Diamond 4 (Outermost nested chalk diamond with fine comb hatching) */}
        <polygon
          points="320,130 450,260 320,390 190,260"
          stroke="#F5EFE2"
          strokeWidth="1.25"
          strokeDasharray="4 2"
          strokeOpacity="0.7"
          fill="none"
        />
        {/* Mandana Comb Strokes / Tooth Hatchings on Diamond 4 */}
        {[
          [320, 130, 320, 120],
          [450, 260, 460, 260],
          [320, 390, 320, 400],
          [190, 260, 180, 260],
          // intermediate teeth
          [385, 195, 392, 188],
          [385, 325, 392, 332],
          [255, 325, 248, 332],
          [255, 195, 248, 188],
        ].map(([x1, y1, x2, y2], idx) => (
          <line
            key={`comb-4-${idx}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F5EFE2"
            strokeWidth="1.25"
            strokeOpacity="0.8"
          />
        ))}

        {/* Diamond 3 (Doubled contour) */}
        <polygon
          points="320,150 430,260 320,370 210,260"
          stroke="#F5EFE2"
          strokeWidth="1.5"
          strokeOpacity="0.85"
          fill="none"
        />

        {/* Diamond 2 (Inner doubled contour) */}
        <polygon
          points="320,170 410,260 320,350 230,260"
          stroke="#F5EFE2"
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeOpacity="0.65"
          fill="none"
        />

        {/* Diamond 1 (Innermost diamond encircling the chip) */}
        <polygon
          points="320,192 388,260 320,328 252,260"
          stroke="#F5EFE2"
          strokeWidth="1.5"
          strokeOpacity="0.9"
          fill="none"
        />

        {/* 7. Central IC Chip (DIP-16 package straddling the trough) */}
        <rect
          x="280"
          y="230"
          width="80"
          height="60"
          rx="3"
          fill="#0C142A"
          stroke="#F5EFE2"
          strokeWidth="1.2"
        />
        {/* Chip orientation index notch */}
        <path d="M 280 254 A 6 6 0 0 1 280 266 Z" fill="#152759" stroke="#F5EFE2" strokeWidth="0.75" />
        {/* Chip Pins (8 top, 8 bottom) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <g key={`chip-pins-${i}`}>
            <rect x={290 + i * 16} y="222" width="6" height="8" rx="1" fill="#D3D9E6" />
            <rect x={290 + i * 16} y="290" width="6" height="8" rx="1" fill="#D3D9E6" />
          </g>
        ))}
        {/* Subtle chip center dot */}
        <circle cx="320" cy="260" r="4" fill="#F5EFE2" fillOpacity="0.4" />

        {/* 8. Jumper Wire across pins with Motion Reveal:
            Traces once in 260ms (ease-out) on entrance.
            Shows immediately when reduced-motion is preferred. */}
        <motion.path
          d="M 180 188 C 210 120, 290 130, 306 222"
          stroke="#F5EFE2"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
        />
        {/* Pin landing nodes for jumper wire */}
        <circle cx="180" cy="188" r="3.5" fill="#963E29" stroke="#F5EFE2" strokeWidth="1" />
        <circle cx="306" cy="222" r="3.5" fill="#963E29" stroke="#F5EFE2" strokeWidth="1" />

        {/* 9. The Outgoing Conductor:
            Leaves the board, turns twice (two 90-degree elbows)
            and joins the hand-drawn border at the bottom of the poster. */}
        <motion.path
          d="M 338 298 L 338 460 L 590 460 L 590 540"
          stroke="#F5EFE2"
          strokeWidth="2"
          strokeLinecap="square"
          fill="none"
          strokeDasharray="6 3"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.95 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        />
        {/* Terminal pin at chip */}
        <circle cx="338" cy="298" r="3.5" fill="#963E29" stroke="#F5EFE2" strokeWidth="1" />

        {/* Bottom poster join mark */}
        <rect x="584" y="534" width="12" height="6" fill="#F5EFE2" />
      </svg>
    </div>
  );
}

/**
 * Mandana Repeating Border Tile SVG.
 * Based on traditional Mandana geometry: doubled contours, diamonds, comb strokes,
 * and pale chalk lines (#F5EFE2).
 * Used only on the hero's lower edge and the footer band.
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
          {/* Top border fine rule */}
          <line x1="0" y1="2" x2="48" y2="2" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.7" />
          <line x1="0" y1="4.5" x2="48" y2="4.5" stroke={strokeColor} strokeWidth="0.5" strokeOpacity="0.4" />

          {/* Central Mandana Diamond with doubled contour */}
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

          {/* Short comb strokes along the corners */}
          <line x1="24" y1="4.5" x2="24" y2="6" stroke={strokeColor} strokeWidth="1" />
          <line x1="24" y1="22" x2="24" y2="23.5" stroke={strokeColor} strokeWidth="1" />
          <line x1="6.5" y1="14" x2="8" y2="14" stroke={strokeColor} strokeWidth="1" />
          <line x1="40" y1="14" x2="41.5" y2="14" stroke={strokeColor} strokeWidth="1" />

          {/* Bottom border fine rule */}
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
 * Used for published stops in the Programme timeline.
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
      {/* Outer Mandana diamond in Geru #963E29 */}
      <polygon
        points="12,2 22,12 12,22 2,12"
        stroke="#963E29"
        strokeWidth="1.5"
        fill="#F5EFE2"
      />
      {/* Inner doubled chalk contour */}
      <polygon
        points="12,5.5 18.5,12 12,18.5 5.5,12"
        stroke="#182239"
        strokeWidth="1"
        fill="none"
      />
      {/* Center Geru pip */}
      <circle cx="12" cy="12" r="2.5" fill="#963E29" />
    </svg>
  );
}
