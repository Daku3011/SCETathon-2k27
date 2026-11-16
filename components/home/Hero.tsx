"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SignalWheel } from "@/components/identity/SignalWheel";
import { RegistrationStatus } from "@/components/registration/RegistrationStatus";

const typewriterPhrases = [
  "WHERE CODE MEETS REAL-WORLD ATOMS",
  "COMPUTER ENG. × CHEMICAL ENG.",
  "24 HOURS OF CONTINUOUS PROTOTYPING",
  "NO SLIDES. NO HYPE. BUILD SOMETHING REAL.",
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Typewriter ticker state
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = typewriterPhrases[phraseIdx];

    if (!isDeleting && currentText === currentPhrase) {
      // Pause at full phrase
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === "") {
      // Switch to next phrase
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % typewriterPhrases.length);
    } else {
      // Typing or deleting speed
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

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/[0.19] bg-ink"
      aria-labelledby="hero-title"
    >
      {/* Subtle coordinate grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "linear-gradient(to right, transparent, black)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black)",
        }}
        aria-hidden="true"
      />

      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto relative min-h-[min(790px,calc(100svh-106px))] grid grid-cols-1 lg:grid-cols-[55%_45%] items-center pt-10 md:pt-14 pb-20 md:pb-24">
        {/* Left: Huge Editorial Headline with Writing & Hover Effects */}
        <div className="relative z-10 pt-2 md:pt-10">
          {/* Live Date & Location Kicker */}
          <div className="text-lime flex items-center gap-4 font-mono text-[11px] leading-relaxed uppercase tracking-[0.14em] font-bold mb-5 md:mb-6">
            <span className="w-8 h-[1px] bg-current inline-block" aria-hidden="true" />
            <span>28–29 January 2027 / SCET, Surat</span>
          </div>

          {/* Interactive Live Typewriter Signal Ticker */}
          <div className="flex items-center gap-2 mb-6 font-mono text-[11px] text-[#A6A89F] uppercase tracking-wider h-5 select-none">
            <span className="text-coral font-bold">&gt;</span>
            <span className="text-paper/90 font-semibold">{currentText}</span>
            <span className="inline-block w-2 h-3.5 bg-lime animate-terminal-blink" aria-hidden="true" />
          </div>

          {/* Main 3-Row Headline with Interactive Hover & Kinetic Stagger */}
          <h1
            id="hero-title"
            className="font-display text-[clamp(65px,11.5vw,167px)] tracking-[-0.105em] leading-[0.82] uppercase m-0 max-w-[1000px] select-none"
          >
            {/* Row 1: MAKE */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group/make cursor-pointer flex items-baseline flex-wrap"
            >
              <span className="inline-block text-paper transition-all duration-300 group-hover/make:text-lilac group-hover/make:tracking-[-0.08em] group-hover/make:translate-x-1">
                MAKE
              </span>
              <span className="hidden md:inline-block opacity-0 group-hover/make:opacity-100 font-mono text-[11px] text-lilac uppercase tracking-[0.15em] font-bold transition-opacity duration-300 ml-4 pb-2">
                [01 // INVENT]
              </span>
            </motion.div>

            {/* Row 2: WHAT'S */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group/whats cursor-pointer flex items-baseline flex-wrap my-1"
            >
              <span className="inline-block stroke-reveal transition-all duration-300 group-hover/whats:translate-x-3">
                WHAT'S
              </span>
              <span className="hidden md:inline-block opacity-0 group-hover/whats:opacity-100 font-mono text-[11px] text-coral uppercase tracking-[0.15em] font-bold transition-opacity duration-300 ml-4 pb-2">
                [02 // QUESTION]
              </span>
            </motion.div>

            {/* Row 3: NEXT. */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group/next cursor-pointer flex items-baseline flex-wrap"
            >
              <span className="inline-block text-lime transition-all duration-300 group-hover/next:drop-shadow-[0_0_40px_rgba(216,255,80,0.65)] group-hover/next:translate-x-1">
                NEXT
                <span className="inline-block text-coral transition-transform duration-300 group-hover/next:scale-130 group-hover/next:rotate-45 group-hover/next:text-white ml-0.5">
                  .
                </span>
              </span>
              <span className="hidden md:inline-block opacity-0 group-hover/next:opacity-100 font-mono text-[11px] text-lime uppercase tracking-[0.15em] font-bold transition-opacity duration-300 ml-4 pb-2">
                [03 // BUILD]
              </span>
            </motion.div>
          </h1>

          <p className="max-w-[430px] my-7 md:my-8 text-[clamp(15px,1.45vw,18px)] text-[#C6C8BE] leading-relaxed">
            An unapologetically hands-on 24-hour hackathon. Where code meets chemistry, ambitious ideas become real prototypes, and the next generation gets to build.
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <RegistrationStatus label="REGISTRATION UPDATES" variant="primary" />
            <a
              href="#about"
              className="font-mono text-[11px] font-bold uppercase tracking-wider underline underline-offset-4 hover:text-lime transition-colors"
            >
              DISCOVER THE EVENT <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Right / Hero Art: The Signal Wheel */}
        <div
          className="relative lg:absolute lg:right-[-8%] lg:top-[4%] lg:h-[89%] lg:w-[58%] flex items-center justify-center mt-8 lg:mt-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          <SignalWheel />
        </div>

        {/* Bottom Prompts: Scroll Prompt & Side Note */}
        <div className="hidden lg:flex absolute left-0 bottom-10 items-center gap-3.5 text-[#91958B] font-mono text-[10px] font-bold uppercase tracking-[0.11em]">
          <span className="h-[1px] w-8 bg-lime inline-block" aria-hidden="true" />
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="hidden lg:block absolute right-2 bottom-12 font-mono text-[11px] font-bold tracking-[0.12em] text-right text-paper/65 uppercase leading-snug">
          NO SLIDES. NO HYPE.
          <br />
          BUILD SOMETHING REAL.
        </div>
      </div>
    </section>
  );
}

export default Hero;
