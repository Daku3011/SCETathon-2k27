"use client";

import React from "react";
import Link from "next/link";
import { SignalWheel } from "@/components/identity/SignalWheel";
import { RegistrationStatus } from "@/components/registration/RegistrationStatus";

export function Hero() {
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
        {/* Left: Huge Editorial Headline */}
        <div className="relative z-10 pt-2 md:pt-10">
          <div className="text-lime flex items-center gap-4 font-mono text-[11px] leading-relaxed uppercase tracking-[0.14em] font-bold mb-6 md:mb-7">
            <span className="w-8 h-[1px] bg-current inline-block" aria-hidden="true" />
            <span>28–29 January 2027 / SCET, Surat</span>
          </div>

          <h1
            id="hero-title"
            className="font-display text-[clamp(65px,11.5vw,167px)] tracking-[-0.105em] leading-[0.82] uppercase m-0 max-w-[1000px] select-none"
          >
            <span className="block whitespace-nowrap text-paper">MAKE</span>
            <span
              className="block text-transparent"
              style={{
                WebkitTextStroke: "1.5px #F2F0E8",
              }}
            >
              WHAT'S
            </span>
            <span className="block text-lime">
              NEXT<span className="text-coral">.</span>
            </span>
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
