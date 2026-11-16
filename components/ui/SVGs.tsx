"use client";

import React, { useId, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * SCETATHON interdisciplinary art (v2: 3D + always alive)
 *
 * WHAT'S NEW
 * - Real CSS-3D: the board is built from stacked SVG layers (board slabs, traces,
 *   chemistry, components, 4 terraced Mandana diamonds, a 3-slab extruded chip,
 *   a floating jumper wire). Layers sit at different translateZ depths, so tilting
 *   reveals true parallax + thickness.
 * - Tilts toward the pointer (touch drag too) with spring physics, and keeps a slow
 *   idle sway so it still feels 3D when nobody is touching it.
 * - Everything loops forever (no more "plays once on refresh"):
 *   data packets run along every trace, fluid flows reactor-ward, LEDs chase,
 *   benzene rings spin, electrons orbit, bubbles rise, gauge needle swings,
 *   oscilloscope scrolls, diamonds breathe in a wave, chalk dashes march.
 * - Pauses all animation when scrolled off-screen, honours prefers-reduced-motion.
 *
 * Needs: framer-motion (v10+), React 18+. Tailwind classes are optional sugar.
 */

/* ───────────────────────────── palette ───────────────────────────── */
const C = {
  navy: "#172C67",
  board: "#1E387F",
  boardDeep: "#132454",
  chip: "#0C142A",
  chipTop: "#101B3D",
  ivory: "#F5EFE2",
  rust: "#963E29",
  blue: "#5E8BFF",
  ice: "#BBD0FF",
  red: "#E15B5B",
  ink: "#182239",
  pin: "#E2E7F5",
};
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const cssVars = (v: Record<string, string | number>) => v as React.CSSProperties;
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [+(cx + r * Math.sin(a)).toFixed(2), +(cy - r * Math.cos(a)).toFixed(2)] as const;
};

/* ───────────────────────────── geometry ───────────────────────────── */
const RAIL_X = Array.from({ length: 26 }, (_, i) => 94 + i * 19);
const COLS = Array.from({ length: 16 }, (_, i) => 110 + i * 18);
const ROWS = [150, 172, 194, 216, 238, 302, 324, 346, 368, 390];

const BUS = {
  t1: "M283 230 V212 L265 194 H200",
  t2: "M299 230 V198 L325 172 H380",
  t3: "M315 230 V212 L333 194 H362",
  b1: "M283 310 V328 L265 346 H200",
  b2: "M299 310 V350 L281 368 H236",
  out: "M331 310 V470 H600 V556",
  jumper: "M164 194 C190 120, 270 130, 296 230",
  // molecule -> valves -> reactor flask, one continuous conduit
  flow: "M510 240 V262 H400 V290 H450 V320 H420 V350 H460 V380 H490",
};
const PADS: [number, number][] = [
  [200, 194],
  [380, 172],
  [362, 194],
  [200, 346],
  [236, 368],
];
const FLASK =
  "M490 370 L490 380 L482 396 C480 400 482 404 488 404 H506 C512 404 514 400 512 396 L504 380 L504 370 Z";
const COMBS: [number, number, number, number][] = [
  [310, 135, 310, 122],
  [440, 270, 452, 270],
  [310, 405, 310, 418],
  [180, 270, 168, 270],
  [375, 202, 384, 194],
  [375, 338, 384, 346],
  [245, 338, 236, 346],
  [245, 202, 236, 194],
];

/* ───────────────────────────── styles ───────────────────────────── */
const CSS = `
.bb-root{--u:1px}
@media (max-width:640px){.bb-root{--u:.6px}}
.bb-stage{position:relative;width:min(100%,640px);aspect-ratio:660/560;margin:8px 16px;transform-style:preserve-3d}
.bb-layer{position:absolute;inset:0;pointer-events:none;transform:translateZ(calc(var(--z,0)*var(--u)))}
.bb-svg{display:block;width:100%;height:100%;overflow:visible}
.bb-drop{position:absolute;inset:6% 4% 2%;background:rgba(3,7,22,.6);filter:blur(26px);border-radius:24px;pointer-events:none;transform:translateZ(calc(-34*var(--u)))}

@keyframes bb-march{to{stroke-dashoffset:calc(var(--p,9)*-1px)}}
@keyframes bb-march-rev{to{stroke-dashoffset:calc(var(--p,9)*1px)}}
@keyframes bb-packet{from{stroke-dashoffset:6}to{stroke-dashoffset:-194}}
@keyframes bb-draw{0%{stroke-dashoffset:1;opacity:0}3%{stroke-dashoffset:1;opacity:1}42%,84%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
@keyframes bb-glow{0%,100%{opacity:.05}50%{opacity:.5}}
@keyframes bb-lens{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes bb-twinkle{0%,100%{opacity:.15}50%{opacity:1}}
@keyframes bb-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.028)}}
@keyframes bb-spin{to{transform:rotate(360deg)}}
@keyframes bb-spin-rev{to{transform:rotate(-360deg)}}
@keyframes bb-ping{0%{transform:scale(.35);opacity:.8}100%{transform:scale(2.3);opacity:0}}
@keyframes bb-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.7);opacity:.45}}
@keyframes bb-bubble{0%{transform:translateY(0);opacity:0}20%{opacity:.9}100%{transform:translateY(-24px);opacity:0}}
@keyframes bb-needle{from{transform:rotate(-68deg)}to{transform:rotate(58deg)}}
@keyframes bb-wave{to{transform:translateX(-48px)}}
@keyframes bb-liquid{to{transform:translateX(-24px)}}

.bb-march{animation:bb-march var(--d,1.4s) linear infinite}
.bb-march-rev{animation:bb-march-rev var(--d,1.4s) linear infinite}
.bb-run{animation:bb-packet var(--d,3s) linear var(--delay,0s) infinite}
.bb-draw{stroke-dasharray:1 1;animation:bb-draw var(--d,7s) ease-in-out var(--delay,0s) infinite}
.bb-glow{animation:bb-glow var(--d,2.1s) ease-in-out var(--delay,0s) infinite}
.bb-lens{animation:bb-lens var(--d,2.1s) ease-in-out var(--delay,0s) infinite}
.bb-twinkle{animation:bb-twinkle var(--d,3s) ease-in-out var(--delay,0s) infinite}
.bb-breathe{transform-box:view-box;transform-origin:310px 270px;animation:bb-breathe 5.5s ease-in-out var(--delay,0s) infinite}
.bb-fill{transform-box:fill-box;transform-origin:center}
.bb-vb{transform-box:view-box}
.bb-spin{animation:bb-spin var(--d,14s) linear infinite}
.bb-spin-rev{animation:bb-spin-rev var(--d,14s) linear infinite}
.bb-ping{animation:bb-ping var(--d,2.6s) ease-out var(--delay,0s) infinite}
.bb-pulse{animation:bb-pulse 2s ease-in-out infinite}
.bb-bubble{animation:bb-bubble 2.8s ease-in var(--delay,0s) infinite}
.bb-needle{transform-box:view-box;animation:bb-needle 4.6s cubic-bezier(.45,0,.2,1) infinite alternate}
.bb-wave{animation:bb-wave var(--d,1.6s) linear infinite}
.bb-liquid{animation:bb-liquid 2.4s linear infinite}

.bb-root[data-active="false"] *{animation-play-state:paused!important}
@media (prefers-reduced-motion:reduce){.bb-root *{animation:none!important}.bb-packet{display:none}}
`;

/* ───────────────────────────── small building blocks ───────────────────────────── */

/** One depth plane. All planes share the same 660x560 viewBox so they line up perfectly. */
function Layer({ z, children }: { z: number; children: React.ReactNode }) {
  return (
    <div className="bb-layer" style={cssVars({ "--z": z })} aria-hidden="true">
      <svg viewBox="0 0 660 560" className="bb-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
    </div>
  );
}

/** A glowing data packet that travels the full length of `d`, then rests, then repeats. */
function Packet({
  d,
  color = C.ivory,
  dur = 3,
  delay = 0,
  width = 2.2,
}: {
  d: string;
  color?: string;
  dur?: number;
  delay?: number;
  width?: number;
}) {
  return (
    <g className="bb-packet" style={cssVars({ "--d": `${dur}s`, "--delay": `${delay}s` })}>
      <path
        d={d}
        pathLength={100}
        className="bb-run"
        stroke={color}
        strokeOpacity={0.28}
        strokeWidth={width * 2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 194"
      />
      <path
        d={d}
        pathLength={100}
        className="bb-run"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 196"
      />
    </g>
  );
}

function Valve({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g>
      <polygon points={`${x - 6},${y - 6} ${x},${y} ${x - 6},${y + 6}`} fill={C.board} stroke={C.ivory} strokeWidth={1} />
      <polygon points={`${x + 6},${y - 6} ${x},${y} ${x + 6},${y + 6}`} fill={C.board} stroke={C.ivory} strokeWidth={1} />
      <line x1={x} y1={y} x2={x} y2={y - 10} stroke={C.ivory} strokeWidth={1} />
      <circle
        cx={x}
        cy={y - 12}
        r={2.4}
        fill={C.rust}
        stroke={C.ivory}
        strokeWidth={0.6}
        className="bb-lens"
        style={cssVars({ "--delay": `${delay}s`, "--d": "2.8s" })}
      />
    </g>
  );
}

function Resistor({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + 36} y2={y} stroke={C.ivory} strokeOpacity={0.7} strokeWidth={1.2} />
      <rect x={x + 6} y={y - 4} width={24} height={8} rx={3} fill="#D6C29A" stroke={C.ink} strokeWidth={0.6} />
      <rect x={x + 10} y={y - 4} width={2.2} height={8} fill="#B33A2B" />
      <rect x={x + 15} y={y - 4} width={2.2} height={8} fill="#5B3F8C" />
      <rect x={x + 20} y={y - 4} width={2.2} height={8} fill="#D9822B" />
      <rect x={x + 26} y={y - 4} width={2.2} height={8} fill="#C8A24A" />
      <circle cx={x} cy={y} r={2.4} fill={C.rust} stroke={C.ivory} strokeWidth={0.6} />
      <circle cx={x + 36} cy={y} r={2.4} fill={C.rust} stroke={C.ivory} strokeWidth={0.6} />
      <text x={x + 3} y={y - 8} fontSize={6} fontFamily={MONO} fill={C.ivory} fillOpacity={0.55}>
        {label}
      </text>
    </g>
  );
}

function Led({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  const v = cssVars({ "--delay": `${delay}s`, "--d": "2.1s" });
  return (
    <g>
      <circle cx={x} cy={y} r={9} fill={color} className="bb-glow" style={v} />
      <circle cx={x} cy={y} r={5} fill={C.chip} stroke={C.ivory} strokeOpacity={0.7} strokeWidth={0.8} />
      <circle cx={x} cy={y} r={3.2} fill={color} className="bb-lens" style={v} />
      <circle cx={x - 1} cy={y - 1.2} r={0.9} fill="#fff" fillOpacity={0.8} />
    </g>
  );
}

function Gauge({ cx, cy }: { cx: number; cy: number }) {
  const ticks = Array.from({ length: 9 }, (_, i) => -120 + i * 30);
  const [ax, ay] = polar(cx, cy, 18, 60);
  const [bx, by] = polar(cx, cy, 18, 120);
  return (
    <g>
      <circle cx={cx} cy={cy} r={22} fill={C.chip} stroke={C.ivory} strokeWidth={1.4} />
      <circle cx={cx} cy={cy} r={19.5} stroke={C.ivory} strokeOpacity={0.25} strokeWidth={0.6} />
      <path d={`M${ax} ${ay} A18 18 0 0 1 ${bx} ${by}`} stroke={C.red} strokeOpacity={0.9} strokeWidth={2.2} />
      {ticks.map((deg) => {
        const [x1, y1] = polar(cx, cy, 12.5, deg);
        const [x2, y2] = polar(cx, cy, 15.5, deg);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.ivory} strokeOpacity={0.8} strokeWidth={0.9} />;
      })}
      <g className="bb-needle" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <line x1={cx} y1={cy + 3} x2={cx} y2={cy - 15} stroke={C.rust} strokeWidth={1.6} strokeLinecap="round" />
      </g>
      <circle cx={cx} cy={cy} r={2.6} fill={C.ivory} stroke={C.rust} strokeWidth={1} />
      <text x={cx} y={cy + 34} textAnchor="middle" fontSize={5.5} fontFamily={MONO} fill={C.ivory} fillOpacity={0.55}>
        PT-101
      </text>
    </g>
  );
}

/* ───────────────────────────── main illustration ───────────────────────────── */

export function BreadboardIllustration({ className = "" }: { className?: string }) {
  const reduce = !!useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "120px" });

  // pointer -> spring-smoothed tilt, plus an idle sway that never stops
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 });
  const idleX = useMotionValue(0);
  const idleY = useMotionValue(0);

  useAnimationFrame((t) => {
    if (reduce || !inView) return;
    idleX.set(Math.sin(t / 2600));
    idleY.set(Math.cos(t / 3300));
  });

  const rotateX = useTransform([sy, idleY], ([a, b]: number[]) => 14 - a * 12 + b * 3);
  const rotateY = useTransform([sx, idleX], ([a, b]: number[]) => -10 + a * 16 + b * 4);
  const gx = useTransform(sx, (v) => 50 + v * 90);
  const gy = useTransform(sy, (v) => 40 + v * 90);
  const glare = useMotionTemplate`radial-gradient(480px circle at ${gx}% ${gy}%, rgba(245,239,226,0.16), rgba(245,239,226,0) 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const wavePath = (seg: string, n: number, start: string) => start + seg.repeat(n);
  const digital = wavePath(" h8 v-12 h8 v12 h8 v-12 h8 v12 h16", 7, "M0 22");
  const analog = wavePath(" t24 0", 11, "M0 15 q12 -10 24 0");
  const liquid = wavePath(" t12 0", 7, "M468 392 q6 -3 12 0") + " V412 H468 Z";

  return (
    <div
      ref={rootRef}
      data-active={inView ? "true" : "false"}
      className={`bb-root relative w-full h-full min-h-[380px] md:min-h-[480px] lg:min-h-[600px] bg-[#172C67] flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{ perspective: 1400, touchAction: "pan-y" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label="Interdisciplinary Computer and Chemical Engineering illustration with Mandana chalk linework, shown as a tilting 3D circuit board"
      role="img"
    >
      <style>{CSS}</style>

      {/* blueprint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(#F5EFE2 1px, transparent 1px), radial-gradient(#F5EFE2 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      <motion.div className="bb-stage" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <div className="bb-drop" />

        {/* ── PCB thickness (two darker slabs under the board) ── */}
        <Layer z={-8}>
          <rect x="60" y="50" width="540" height="440" rx="6" fill="#0F1D52" stroke={C.ivory} strokeOpacity="0.2" />
        </Layer>
        <Layer z={-4}>
          <rect x="60" y="50" width="540" height="440" rx="6" fill="#16286B" stroke={C.ivory} strokeOpacity="0.25" />
        </Layer>

        {/* ── BOARD: substrate, rails, terminal matrix, silkscreen, cast shadows (static = cheap) ── */}
        <Layer z={0}>
          <defs>
            <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <rect x="60" y="50" width="540" height="440" rx="6" fill={C.board} stroke={C.ivory} strokeWidth="1.5" strokeOpacity="0.45" />
          <rect x="72" y="62" width="516" height="416" rx="4" fill={C.boardDeep} stroke={C.ivory} strokeWidth="0.75" strokeOpacity="0.25" />

          {/* shadows cast by the chip and the lifted jumper wire */}
          <g filter={`url(#${uid}-blur)`} opacity="0.55">
            <rect x="274" y="248" width="82" height="66" rx="4" fill="#050A1A" />
            <path d="M170 208 C196 134, 276 144, 302 244" stroke="#050A1A" strokeWidth="5" fill="none" />
          </g>

          {/* power + reagent rails */}
          <line x1="86" y1="82" x2="574" y2="82" stroke={C.red} strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="86" y1="102" x2="574" y2="102" stroke={C.blue} strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="86" y1="440" x2="574" y2="440" stroke={C.blue} strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="86" y1="460" x2="574" y2="460" stroke={C.red} strokeWidth="1.2" strokeOpacity="0.75" />
          {RAIL_X.map((x) => (
            <g key={x}>
              {[82, 102, 440, 460].map((y) => (
                <circle key={y} cx={x} cy={y} r="2" fill={C.ivory} fillOpacity="0.5" />
              ))}
            </g>
          ))}
          <text x="76" y="85" fontSize="7" fontFamily={MONO} fill={C.red} fillOpacity="0.9">+</text>
          <text x="76" y="105" fontSize="7" fontFamily={MONO} fill={C.blue} fillOpacity="0.9">−</text>

          {/* terminal strip matrix */}
          {COLS.map((cx) => (
            <g key={cx}>
              {ROWS.map((cy) => (
                <circle key={cy} cx={cx} cy={cy} r="1.75" fill={C.ivory} fillOpacity="0.25" />
              ))}
            </g>
          ))}

          {/* centre trough */}
          <rect x="86" y="264" width="488" height="12" fill="#0A1226" stroke={C.ivory} strokeWidth="0.5" strokeOpacity="0.3" />

          {/* mounting holes */}
          {[
            [80, 70],
            [580, 70],
            [80, 470],
            [580, 470],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="5" fill="#0A1226" stroke={C.ivory} strokeOpacity="0.6" />
              <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke={C.ivory} strokeOpacity="0.5" />
              <line x1={x} y1={y - 3} x2={x} y2={y + 3} stroke={C.ivory} strokeOpacity="0.5" />
            </g>
          ))}

          {/* silkscreen */}
          <g fontFamily={MONO} fill={C.ivory} fillOpacity="0.5" fontSize="6.5" letterSpacing="1">
            <text x="96" y="74">CE × CHE · 28–29 JAN 2027</text>
            <text x="96" y="475">SCETATHON 2.0 · REV 2.7 · SCET SURAT</text>
            <text x="130" y="134" fontSize="6">Y1</text>
            <text x="200" y="113" fontSize="5.5">STATUS</text>
            <text x="352" y="236" fontSize="6">U1</text>
            <text x="110" y="398" fontSize="5.5">SCOPE</text>
          </g>
        </Layer>

        {/* ── TRACES: bus lines, via pads, flowing data packets, outgoing conductor ── */}
        <Layer z={14}>
          {[BUS.t1, BUS.t2, BUS.t3, BUS.b1, BUS.b2].map((d) => (
            <path key={d} d={d} stroke={C.ivory} strokeOpacity="0.5" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
          ))}
          {PADS.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={C.rust} stroke={C.ivory} strokeWidth="0.8" />
          ))}
          <Packet d={BUS.t1} dur={2.8} />
          <Packet d={BUS.t2} dur={3.4} delay={0.6} color={C.ice} />
          <Packet d={BUS.t3} dur={2.6} delay={1.2} />
          <Packet d={BUS.b1} dur={3.1} delay={0.3} color={C.ice} />
          <Packet d={BUS.b2} dur={3.7} delay={1.5} />

          {/* clock line from crystal */}
          <line x1="148" y1="160" x2="148" y2="190" stroke={C.ivory} strokeWidth="0.9" strokeDasharray="2 2" className="bb-march" style={cssVars({ "--p": 4, "--d": "0.8s" })} />

          {/* outgoing conductor (turns twice, joins the poster edge) */}
          <path d={BUS.out} stroke={C.ivory} strokeOpacity="0.18" strokeWidth="2.4" strokeLinejoin="round" />
          <path d={BUS.out} stroke={C.ivory} strokeOpacity="0.95" strokeWidth="2" strokeDasharray="6 3" className="bb-march" style={cssVars({ "--p": 9, "--d": "1.1s" })} />
          <Packet d={BUS.out} dur={4.4} delay={0.4} color={C.ice} width={2.6} />
          <circle cx="331" cy="310" r="3.5" fill={C.rust} stroke={C.ivory} strokeWidth="1" />
          <rect x="594" y="554" width="12" height="6" fill={C.ivory} />
        </Layer>

        {/* ── CHEMICAL ENGINEERING: benzene, valves, reactor conduit, gauge ── */}
        <Layer z={20}>
          <defs>
            <clipPath id={`${uid}-flask`}>
              <path d={FLASK} />
            </clipPath>
          </defs>

          {/* benzene ring 1 */}
          <polygon points="460,150 485,165 485,195 460,210 435,195 435,165" stroke={C.ivory} strokeOpacity="0.5" strokeWidth="1" />
          <circle cx="460" cy="180" r="14" stroke={C.ivory} strokeOpacity="0.35" strokeDasharray="3 2" className="bb-fill bb-spin" style={cssVars({ "--d": "16s" })} />
          {/* benzene ring 2 */}
          <polygon points="510,180 535,195 535,225 510,240 485,225 485,195" stroke={C.ivory} strokeOpacity="0.5" strokeWidth="1" />
          <circle cx="510" cy="210" r="14" stroke={C.ivory} strokeOpacity="0.35" strokeDasharray="3 2" className="bb-fill bb-spin-rev" style={cssVars({ "--d": "20s" })} />
          {/* atoms */}
          {[[460,150],[485,165],[485,195],[460,210],[435,195],[435,165],[510,180],[535,195],[535,225],[510,240],[485,225]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill={C.ivory} fillOpacity="0.75" />
          ))}
          <circle cx="460" cy="150" r="3" fill={C.rust} />
          <circle cx="485" cy="195" r="3" fill={C.blue} />
          <circle cx="535" cy="195" r="3" fill={C.blue} />
          {/* substituents */}
          <line x1="460" y1="150" x2="460" y2="137" stroke={C.ivory} strokeOpacity="0.6" />
          <text x="460" y="132" textAnchor="middle" fontSize="7" fontFamily={MONO} fill={C.ivory} fillOpacity="0.8">OH</text>
          <line x1="435" y1="180" x2="400" y2="180" stroke={C.ivory} strokeOpacity="0.6" strokeDasharray="2 2" />
          <text x="392" y="171" fontSize="7" fontFamily={MONO} fill={C.ivory} fillOpacity="0.8">CH₃</text>
          <line x1="535" y1="225" x2="548" y2="233" stroke={C.ivory} strokeOpacity="0.6" />
          <text x="562" y="237" textAnchor="middle" fontSize="7" fontFamily={MONO} fill={C.ivory} fillOpacity="0.8">NH₂</text>
          <text x="440" y="229" fontSize="6.5" fontFamily={MONO} fill={C.ivory} fillOpacity="0.5">C₆H₆</text>
          {/* orbiting electron */}
          <ellipse cx="460" cy="180" rx="26" ry="9" stroke={C.blue} strokeOpacity="0.25" strokeWidth="0.7" />
          <g className="bb-vb bb-spin" style={{ transformOrigin: "460px 180px", ...cssVars({ "--d": "5s" }) }}>
            <circle cx="486" cy="180" r="2" fill={C.blue} />
          </g>

          {/* reactor conduit: static bed + filling/draining flow + droplets */}
          <path d={BUS.flow} stroke={C.blue} strokeOpacity="0.28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={BUS.flow} pathLength={1} stroke={C.blue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="bb-draw" style={cssVars({ "--d": "8s" })} />
          <Packet d={BUS.flow} color={C.ice} dur={5.4} width={2} />
          <Packet d={BUS.flow} color={C.ice} dur={5.4} delay={2.7} width={2} />
          <Valve x={455} y={262} delay={0} />
          <Valve x={435} y={320} delay={0.7} />
          <Valve x={440} y={350} delay={1.4} />

          {/* reactor flask with sloshing liquid + bubbles */}
          <path d={FLASK} fill={C.board} />
          <g clipPath={`url(#${uid}-flask)`}>
            <g className="bb-liquid">
              <path d={liquid} fill={C.blue} fillOpacity="0.6" />
            </g>
          </g>
          <path d={FLASK} stroke={C.ivory} strokeWidth="1.2" />
          {[
            [495, 399, 0],
            [500, 400, 0.9],
            [498, 398, 1.7],
          ].map(([x, y, d]) => (
            <circle key={x} cx={x} cy={y} r="1.3" fill={C.ivory} fillOpacity="0.85" className="bb-bubble" style={cssVars({ "--delay": `${d}s` })} />
          ))}
          <text x="501" y="418" textAnchor="middle" fontSize="6" fontFamily={MONO} fill={C.ivory} fillOpacity="0.55">R-101</text>

          <Gauge cx={556} cy={336} />
        </Layer>

        {/* ── COMPUTER ENGINEERING: crystal, resistors, caps, LED chaser, scope ── */}
        <Layer z={30}>
          <defs>
            <clipPath id={`${uid}-scope`}>
              <rect x="0" y="0" width="190" height="30" rx="2" />
            </clipPath>
          </defs>

          {/* crystal + clock ping */}
          <circle cx="148" cy="150" r="14" stroke={C.blue} strokeWidth="0.8" className="bb-fill bb-ping" style={cssVars({ "--d": "2.4s" })} />
          <rect x="130" y="140" width="36" height="20" rx="3" fill={C.chip} stroke={C.ivory} strokeWidth="1" />
          <circle cx="140" cy="150" r="1.5" fill={C.ivory} />
          <circle cx="156" cy="150" r="1.5" fill={C.ivory} />

          {/* LED chaser */}
          {[C.red, C.blue, C.ivory, C.rust, C.blue].map((c, i) => (
            <Led key={i} x={200 + i * 22} y={124} color={c} delay={i * 0.35} />
          ))}

          {/* passives */}
          <Resistor x={110} y={324} label="R1" />
          <Resistor x={110} y={368} label="R2" />
          <circle cx="176" cy="332" r="11" fill={C.chip} stroke={C.ivory} strokeWidth="0.9" />
          <circle cx="176" cy="332" r="8" stroke={C.ivory} strokeOpacity="0.35" strokeWidth="0.6" />
          <path d="M168 324.45 A11 11 0 0 0 168 339.55 Z" fill={C.ivory} fillOpacity="0.5" />
          <text x="164" y="352" fontSize="5.5" fontFamily={MONO} fill={C.ivory} fillOpacity="0.55">C1</text>
          <rect x="170" y="364" width="12" height="14" rx="3" fill="#D59A3A" stroke={C.ink} strokeWidth="0.6" />
          <line x1="173" y1="378" x2="173" y2="384" stroke={C.ivory} strokeOpacity="0.7" />
          <line x1="179" y1="378" x2="179" y2="384" stroke={C.ivory} strokeOpacity="0.7" />

          {/* oscilloscope: forever-scrolling digital + analog waveforms */}
          <g transform="translate(110 402)">
            <rect x="0" y="0" width="190" height="30" rx="2" fill="#0A1226" stroke={C.ivory} strokeOpacity="0.45" strokeWidth="0.8" />
            <g clipPath={`url(#${uid}-scope)`}>
              {[10, 20].map((y) => (
                <line key={y} x1="0" y1={y} x2="190" y2={y} stroke={C.ivory} strokeOpacity="0.12" strokeDasharray="2 3" />
              ))}
              <g className="bb-wave" style={cssVars({ "--d": "1.5s" })}>
                <path d={digital} stroke={C.ice} strokeWidth="1.1" strokeLinejoin="round" />
              </g>
              <g className="bb-wave" style={cssVars({ "--d": "2.6s" })}>
                <path d={analog} stroke={C.rust} strokeWidth="1.1" strokeOpacity="0.95" />
              </g>
            </g>
            <text x="4" y="8" fontSize="4.5" fontFamily={MONO} fill={C.ivory} fillOpacity="0.5">CH1</text>
          </g>
        </Layer>

        {/* ── MANDANA: four terraced chalk diamonds, each a step higher, breathing in a wave ── */}
        <Layer z={26}>
          <g className="bb-breathe" style={cssVars({ "--delay": "0s" })}>
            <polygon points="310,135 440,270 310,405 180,270" stroke={C.ivory} strokeWidth="1.25" strokeDasharray="4 2" strokeOpacity="0.75" className="bb-march-rev" style={cssVars({ "--p": 6, "--d": "3s" })} />
            {COMBS.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.ivory} strokeWidth="1.2" strokeOpacity="0.85" />
            ))}
          </g>
        </Layer>
        <Layer z={32}>
          <g className="bb-breathe" style={cssVars({ "--delay": "0.35s" })}>
            <polygon points="310,155 420,270 310,385 200,270" stroke={C.ivory} strokeWidth="1.5" strokeOpacity="0.85" />
            <polygon points="310,160 414,270 310,380 206,270" stroke={C.ivory} strokeWidth="0.8" strokeOpacity="0.35" />
            {[[310,155],[420,270],[310,385],[200,270]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill={C.rust} stroke={C.ivory} strokeWidth="0.8" />
            ))}
          </g>
        </Layer>
        <Layer z={38}>
          <g className="bb-breathe" style={cssVars({ "--delay": "0.7s" })}>
            <polygon points="310,175 400,270 310,365 220,270" stroke={C.ivory} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.65" className="bb-march" style={cssVars({ "--p": 6, "--d": "2.4s" })} />
            {[[365,212.5],[365,327.5],[255,327.5],[255,212.5]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.7" fill={C.ivory} className="bb-twinkle" style={cssVars({ "--delay": `${i * 0.6}s`, "--d": "2.4s" })} />
            ))}
          </g>
        </Layer>
        <Layer z={44}>
          <g className="bb-breathe" style={cssVars({ "--delay": "1.05s" })}>
            <polygon points="310,198 378,270 310,342 242,270" stroke={C.ivory} strokeWidth="1.5" strokeOpacity="0.9" />
            <polygon points="310,205 371,270 310,335 249,270" stroke={C.ivory} strokeWidth="0.8" strokeOpacity="0.35" />
          </g>
        </Layer>

        {/* ── CENTRAL MCU: extruded body (3 slabs) → pins → lid with die, label, pulsing core ── */}
        {[
          [50, "#080E20", 0.3],
          [54, "#0A1228", 0.35],
          [58, "#0C142A", 0.45],
        ].map(([z, fill, so]) => (
          <Layer key={z as number} z={z as number}>
            <rect x="270" y="238" width="80" height="64" rx="3" fill={fill as string} stroke={C.ivory} strokeOpacity={so as number} strokeWidth="1" />
          </Layer>
        ))}
        <Layer z={56}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={280 + i * 16} y="230" width="6" height="8" rx="1" fill={C.pin} />
              <rect x={280 + i * 16} y="302" width="6" height="8" rx="1" fill={C.pin} />
              <rect x={281 + i * 16} y="231" width="1.4" height="6" fill="#fff" fillOpacity="0.55" />
              <rect x={281 + i * 16} y="303" width="1.4" height="6" fill="#fff" fillOpacity="0.55" />
            </g>
          ))}
        </Layer>
        <Layer z={62}>
          <rect x="270" y="238" width="80" height="64" rx="3" fill={C.chipTop} stroke={C.ivory} strokeWidth="1.5" />
          <path d="M270 264 A6 6 0 0 1 270 276 Z" fill="#152759" stroke={C.ivory} strokeWidth="0.75" />
          <circle cx="279" cy="246" r="1.4" fill={C.ivory} fillOpacity="0.8" />
          <path d="M270 238 L298 238 L270 268 Z" fill={C.ivory} fillOpacity="0.07" />
          {/* die window */}
          <rect x="298" y="258" width="24" height="24" rx="2" fill="#152759" stroke={C.ivory} strokeOpacity="0.5" />
          {[304, 310, 316].map((v) => (
            <g key={v}>
              <line x1={v} y1="258" x2={v} y2="282" stroke={C.ivory} strokeOpacity="0.18" />
              <line x1="298" y1={v + 8} x2="322" y2={v + 8} stroke={C.ivory} strokeOpacity="0.18" />
            </g>
          ))}
          <circle cx="310" cy="270" r="7" stroke={C.rust} strokeWidth="1" className="bb-fill bb-ping" style={cssVars({ "--d": "2s" })} />
          <circle cx="310" cy="270" r="3.5" fill={C.rust} className="bb-fill bb-pulse" />
          <text x="310" y="250" textAnchor="middle" fontSize="6.5" fontWeight="700" fontFamily={MONO} fill={C.ivory} fillOpacity="0.9" letterSpacing="0.8">SCET-27</text>
          <text x="310" y="296" textAnchor="middle" fontSize="5" fontFamily={MONO} fill={C.ivory} fillOpacity="0.6" letterSpacing="0.6">28–29 JAN</text>
        </Layer>

        {/* ── JUMPER WIRE: floats above everything, with a live signal running through it ── */}
        <Layer z={90}>
          <path d={BUS.jumper} stroke={C.chip} strokeOpacity="0.75" strokeWidth="5.5" strokeLinecap="round" />
          <path d={BUS.jumper} stroke={C.ivory} strokeWidth="2.6" strokeLinecap="round" />
          <Packet d={BUS.jumper} color={C.blue} dur={2.4} width={2.2} />
          <circle cx="164" cy="194" r="3.5" fill={C.rust} stroke={C.ivory} strokeWidth="1" />
          <circle cx="296" cy="230" r="3.5" fill={C.rust} stroke={C.ivory} strokeWidth="1" />
        </Layer>
      </motion.div>

      {/* specular glare that follows the pointer (not tilted, sits over the scene) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{ background: glare }}
      />
    </div>
  );
}

/* ───────────────────────────── Mandana border (scrolls forever) ───────────────────────────── */

/**
 * Repeating Mandana border. The tile slowly slides sideways and the diamond cores pulse, forever.
 * Tile width is 48, so the 48-unit slide loops seamlessly.
 */
export function MandanaBorderTile({
  className = "",
  inverted = false,
  animated = true,
}: {
  className?: string;
  inverted?: boolean;
  animated?: boolean;
}) {
  const reduce = !!useReducedMotion();
  const id = useId().replace(/:/g, "");
  const strokeColor = inverted ? C.ink : C.ivory;
  const live = animated && !reduce;
  const patId = `bb-tile-${id}`;

  return (
    <div className={`w-full overflow-hidden leading-none select-none ${className}`} aria-hidden="true" role="presentation">
      <svg viewBox="0 0 960 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-7 block" preserveAspectRatio="none">
        <pattern id={patId} width="48" height="28" patternUnits="userSpaceOnUse">
          {live && <animateTransform attributeName="patternTransform" type="translate" from="0 0" to="48 0" dur="14s" repeatCount="indefinite" />}
          <line x1="0" y1="2" x2="48" y2="2" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.7" />
          <line x1="0" y1="4.5" x2="48" y2="4.5" stroke={strokeColor} strokeWidth="0.5" strokeOpacity="0.4" />
          <polygon points="24,6 40,14 24,22 8,14" stroke={strokeColor} strokeWidth="1" fill="none" />
          <polygon points="24,9 34,14 24,19 14,14" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.6" fill="none" />
          <circle cx="24" cy="14" r="1.5" fill={strokeColor}>
            {live && <animate attributeName="r" values="1.2;2.3;1.2" dur="3s" repeatCount="indefinite" />}
          </circle>
          <line x1="24" y1="4.5" x2="24" y2="6" stroke={strokeColor} strokeWidth="1" />
          <line x1="24" y1="22" x2="24" y2="23.5" stroke={strokeColor} strokeWidth="1" />
          <line x1="6.5" y1="14" x2="8" y2="14" stroke={strokeColor} strokeWidth="1" />
          <line x1="40" y1="14" x2="41.5" y2="14" stroke={strokeColor} strokeWidth="1" />
          <line x1="0" y1="23.5" x2="48" y2="23.5" stroke={strokeColor} strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="0" y1="26" x2="48" y2="26" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.7" />
        </pattern>
        <rect width="960" height="28" fill={`url(#${patId})`} />
      </svg>
    </div>
  );
}

/* ───────────────────────────── Timeline diamond (always breathing) ───────────────────────────── */

export function MandanaDiamond({
  className = "",
  size = 20,
  animated = true,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
}) {
  const reduce = !!useReducedMotion();
  const live = animated && !reduce;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block shrink-0 overflow-visible ${className}`} aria-hidden="true">
      {live && (
        <polygon points="12,2 22,12 12,22 2,12" stroke={C.rust} strokeWidth="1" fill="none">
          <animateTransform attributeName="transform" type="scale" values="1;1.9;1.9" dur="2.8s" repeatCount="indefinite" additive="sum" />
          <animate attributeName="opacity" values="0.6;0;0" dur="2.8s" repeatCount="indefinite" />
        </polygon>
      )}
      <polygon points="12,2 22,12 12,22 2,12" stroke={C.rust} strokeWidth="1.5" fill={C.ivory} />
      <polygon points="12,5.5 18.5,12 12,18.5 5.5,12" stroke={C.ink} strokeWidth="1" fill="none">
        {live && <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="18s" repeatCount="indefinite" />}
      </polygon>
      <circle cx="12" cy="12" r="2.5" fill={C.rust}>
        {live && <animate attributeName="r" values="2.2;3;2.2" dur="2.4s" repeatCount="indefinite" />}
      </circle>
    </svg>
  );
}

/* ───────────────────────────── Page watermark (slowly turning mandala) ───────────────────────────── */

/**
 * Background watermark. Uses a fixed 1200x800 viewBox (the old version used percentages inside
 * polygon `points`, which SVG does not allow, so those shapes never rendered).
 * The medallion rotates, the grid drifts, the lattice floats, and the bonds flow, all slowly, all forever.
 */
export function MandanaBackgroundWatermark({ className = "" }: { className?: string }) {
  const reduce = !!useReducedMotion();
  const live = !reduce;
  const id = useId().replace(/:/g, "");
  const gridId = `bb-wm-${id}`;
  const spin = (dur: number, dir: 1 | -1 = 1) => (
    <animateTransform attributeName="transform" type="rotate" from={`0 980 240`} to={`${360 * dir} 980 240`} dur={`${dur}s`} repeatCount="indefinite" />
  );

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.06] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
            {live && <animateTransform attributeName="patternTransform" type="translate" from="0 0" to="40 40" dur="45s" repeatCount="indefinite" />}
            <circle cx="20" cy="20" r="1" fill={C.ink} />
            <line x1="0" y1="20" x2="40" y2="20" stroke={C.ink} strokeWidth="0.25" strokeDasharray="2 6" />
            <line x1="20" y1="0" x2="20" y2="40" stroke={C.ink} strokeWidth="0.25" strokeDasharray="2 6" />
          </pattern>
        </defs>

        <rect width="1200" height="800" fill={`url(#${gridId})`} />

        {/* medallion */}
        <g stroke={C.ink} strokeWidth="1.5" fill="none" opacity="0.7">
          <g>
            <circle cx="980" cy="240" r="220" strokeDasharray="4 6" />
            {live && spin(120)}
          </g>
          <circle cx="980" cy="240" r="180">
            {live && <animate attributeName="r" values="180;188;180" dur="8s" repeatCount="indefinite" />}
          </circle>
          <polygon points="980,70 1150,240 980,410 810,240" strokeWidth="2" />
          <polygon points="980,100 1120,240 980,380 840,240" strokeDasharray="3 3">
            {live && <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="3s" repeatCount="indefinite" />}
          </polygon>
          <g>
            <rect x="860" y="120" width="240" height="240" strokeWidth="1" strokeOpacity="0.6" />
            {live && spin(90, -1)}
          </g>
          <g transform="rotate(45 980 240)">
            <rect x="860" y="120" width="240" height="240" strokeWidth="1" strokeOpacity="0.6" />
          </g>
        </g>

        {/* chemical-computer lattice, bottom left */}
        <g stroke={C.ink} strokeWidth="1" fill="none" opacity="0.6">
          {live && <animateTransform attributeName="transform" type="translate" values="0 0; 0 -10; 0 0" dur="10s" repeatCount="indefinite" />}
          <polygon points="120,580 150,600 150,640 120,660 90,640 90,600" />
          <polygon points="180,620 210,640 210,680 180,700 150,680 150,640" />
          <line x1="120" y1="660" x2="120" y2="720" strokeDasharray="3 3">
            {live && <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite" />}
          </line>
          <line x1="180" y1="700" x2="240" y2="700" />
        </g>
      </svg>
    </div>
  );
}