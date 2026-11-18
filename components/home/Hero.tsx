"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SignalWheel } from "@/components/identity/SignalWheel";
import { RegistrationStatus } from "@/components/registration/RegistrationStatus";
import { ArrowDown } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/primitives";

const typewriterPhrases = [
  "WHERE CODE MEETS REAL-WORLD ATOMS",
  "24 HOURS OF CONTINUOUS PROTOTYPING",
  "NO SLIDES. NO HYPE. BUILD SOMETHING REAL.",
  "28–29 JANUARY 2027 · SCET, SURAT",
  "FROM IDEA TO WORKING PROTOTYPE",
  "ONE TEAM. ONE PROBLEM. ONE NIGHT.",
  "TEAMS OF 3 TO 5. BRING YOUR BEST MIX.",
  "SOLVE PROBLEMS YOU CAN SEE ON CAMPUS",
  "PITCH ONLINE. BUILD ON CAMPUS.",
  "SHIP BEFORE THE SUN COMES UP.",
  "BUILD. BREAK. SHIP. REPEAT.",
  "SCETATHON 2.0 · INNOVATE. CODE. CREATE.",
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = typewriterPhrases[phraseIdx];

    if (!isDeleting && currentText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % typewriterPhrases.length);
    } else {
      const speed = isDeleting ? 30 : 65;
      timeout = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIdx]);

  const rows = [
    { text: "MAKE", className: "text-paper" },
    { text: "WHAT'S", className: "stroke-reveal" },
    { text: "NEXT.", className: "text-lime" },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-ink"
      aria-labelledby="hero-title"
    >
      <div className="sheet-grid absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 h-px w-1/3 bg-coral" aria-hidden="true" />

      <div className="relative w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto pt-8 md:pt-10 pb-10 md:pb-14">
        {/* Running head */}
        <div className="flex items-center justify-between gap-4 border-b border-line pb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          <span className="flex items-center gap-3">
            <span className="text-coral">SCET / SURAT</span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span>Vol. 02 — 2027</span>
          </span>
          <span className="hidden sm:inline">24H · 3 TRACKS · 9 PROBLEMS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-6 items-center min-h-[min(760px,calc(100svh-170px))] pt-10 md:pt-14">
          {/* Lead */}
          <div className="relative z-10">
            <SectionLabel index="01">28–29 January 2027 / SCET, Surat</SectionLabel>

            <div className="mt-8 flex items-center gap-3 border-l-2 border-coral pl-3 font-mono text-[11px] uppercase tracking-wider text-muted h-5 select-none">
              <span className="text-coral font-bold">&gt;</span>
              <span className="text-paper font-semibold">{currentText}</span>
              <span className="inline-block w-2 h-3.5 bg-lime animate-terminal-blink" aria-hidden="true" />
            </div>

            <h1
              id="hero-title"
              className="font-display text-[clamp(76px,13.5vw,196px)] tracking-tight leading-[0.8] uppercase m-0 mt-4 select-none"
            >
              {rows.map((row, i) => (
                <motion.div
                  key={row.text}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className={`block ${row.className}`}
                >
                  {row.text}
                  {i === 2 && <span className="text-coral">.</span>}
                </motion.div>
              ))}
            </h1>

            <p className="max-w-[48ch] mt-7 md:mt-9 text-[15px] md:text-[17px] text-muted leading-relaxed">
              An unapologetically hands-on 24-hour hackathon. Where code meets chemistry, ambitious ideas become real prototypes, and the next generation gets to build.
            </p>

            <div className="mt-8 flex items-center gap-5 flex-wrap">
              <RegistrationStatus label="Registration updates" variant="primary" />
              <a
                href="#about"
                className="group inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-paper hover:text-lime transition-colors"
              >
                Read the brief
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.4} />
              </a>
            </div>
          </div>

          {/* Figure plate */}
          <div className="relative z-0 hidden lg:block self-stretch">
            <div className="sticky top-32 border border-line bg-surface/40 p-4">
              <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                <span>Fig. 01 — Signal wheel</span>
                <span className="text-lime">Live</span>
              </div>
              <div className="relative aspect-square w-full" aria-hidden="true">
                <SignalWheel />
              </div>
              <p className="border-t border-line pt-3 font-mono text-[10px] leading-relaxed uppercase tracking-wider text-muted">
                Three tracks. One clock. Build until it works.
              </p>
            </div>
          </div>
        </div>

        {/* Footline stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line mt-6">
          {[
            ["24", "Hours, non-stop"],
            ["3–5", "Per squad"],
            ["03", "Impact tracks"],
            ["09", "Open problems"],
          ].map(([value, label]) => (
            <div key={label} className="bg-ink px-4 py-5 md:px-6">
              <div className="font-display text-4xl md:text-5xl text-paper leading-none tnum">{value}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          <span className="h-px w-8 bg-lime" aria-hidden="true" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}

export default Hero;
