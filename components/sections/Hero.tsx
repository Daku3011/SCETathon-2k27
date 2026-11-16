"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { event } from "@/data/event";
import { Register } from "../ui/Register";
import { BreadboardIllustration, MandanaBorderTile, MandanaBackgroundWatermark } from "../ui/SVGs";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#F5EFE2] overflow-hidden border-b border-[#182239]/20 select-none">
      {/* Subtle traditional Mandana chalk & engineering watermark in background */}
      <MandanaBackgroundWatermark />

      {/* 4K container centering with extended colour fields */}
      <div className="relative max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] lg:min-h-[700px]">
        {/* Left Field (7 Desktop Columns): Warm Paper Field with High-Impact Brand Lockup */}
        <div className="lg:col-span-7 px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* National Hackathon & Campus Header Badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#172C67] text-[#F5EFE2] font-mono text-xs font-bold tracking-wider rounded-[2px] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#963E29] animate-pulse" />
                24-HOUR NATIONAL-LEVEL HACKATHON
              </span>
              <span className="font-mono text-xs text-[#182239]/70 font-semibold border border-[#182239]/25 px-2.5 py-1 rounded-[2px]">
                SURAT · GUJARAT
              </span>
            </div>

            {/* Official SCETATHON Wordmark */}
            <div className="mb-4 max-w-[340px] sm:max-w-[420px]">
              <Image
                src="/brand/scetathon.webp"
                alt="SCETATHON 2.0 · Ideas, Innovation, Impact"
                width={1496}
                height={332}
                priority
                className="w-full h-auto object-contain"
              />
            </div>

            {/* HERO BRAND TITLE: SCETATHON 2.0 Commanding Headline */}
            <h1 className="font-display font-black text-[clamp(3.5rem,9.5vw,7.5rem)] leading-[0.88] tracking-tighter text-[#182239] mb-4">
              SCETATHON<span className="text-[#963E29]">.</span>
              <span className="text-[#172C67] block text-[clamp(2rem,5vw,4.25rem)] tracking-tight font-extrabold">
                2.0 // CAMPUS FINALE
              </span>
            </h1>

            {/* College Name in Prominent Focus */}
            <div className="mb-6 pb-6 border-b border-[#182239]/15">
              <p className="font-display text-xl sm:text-2xl text-[#182239] font-bold leading-snug">
                Sarvajanik College of Engineering &amp; Technology (SCET)
              </p>
              <p className="text-sm sm:text-base text-[#182239]/80 font-medium">
                A premier constituent college of Sarvajanik University · Surat, Gujarat
              </p>
            </div>

            {/* Interdisciplinary Branches Spotlight: Computer Engineering & Chemical Engineering */}
            <div className="mb-6 p-4 sm:p-5 bg-[#ECE5D6] border-l-4 border-[#172C67] rounded-[2px] shadow-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-[#963E29] font-bold block mb-2">
                INTERDISCIPLINARY CO-ORGANIZERS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg" aria-hidden="true">💻</span>
                  <div>
                    <strong className="block text-[#182239] font-bold">
                      Dept. of Computer Engineering
                    </strong>
                    <span className="text-xs text-[#182239]/70">
                      Intelligent Systems, AI, IoT &amp; Rapid Code Prototyping
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-lg" aria-hidden="true">🧪</span>
                  <div>
                    <strong className="block text-[#182239] font-bold">
                      Dept. of Chemical Engineering
                    </strong>
                    <span className="text-xs text-[#182239]/70">
                      Process Optimization, Green Chemistry, Clean Tech &amp; Sensors
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmed Dates Block */}
            <div className="flex flex-wrap items-baseline gap-3 mb-8">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#963E29]">
                28–29 January 2027
              </span>
              <span className="font-mono text-xs font-semibold text-[#182239]/70 px-2 py-0.5 border border-[#182239]/30 rounded-[2px]">
                Kickoff: 11:00 AM IST · 24 Continuous Hours
              </span>
            </div>

            {/* Actions: Solid Register button + Underlined Explore problems link */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-1">
              <Register text="Register for SCETATHON" />
              <Link
                href="#problems"
                className="text-base sm:text-lg font-semibold text-[#182239] underline underline-offset-8 decoration-[#963E29] hover:text-[#963E29] transition-colors focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] rounded-[2px]"
              >
                Explore problem statements →
              </Link>
            </div>
          </motion.div>

          {/* Quick campus metadata ribbon */}
          <div className="pt-6 mt-8 border-t border-[#182239]/15 flex flex-wrap items-center justify-between gap-y-2 text-xs font-mono text-[#182239]/75">
            <span className="font-semibold">VENUE: SCET CAMPUS · ATHWALINES · SURAT</span>
            <span>TEAM FORMAT: 3–5 INNOVATORS</span>
            <span className="text-[#963E29] font-bold">ENTRY: FREE FOR SHORTLISTED SQUADS</span>
          </div>
        </div>

        {/* Right Field (5 Desktop Columns): Indigo Field with Interdisciplinary PCB + Chemical Illustration */}
        <div className="lg:col-span-5 bg-[#172C67] flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[#182239]/20">
          <BreadboardIllustration />
        </div>
      </div>

      {/* Repeating Mandana border tile along hero lower edge */}
      <MandanaBorderTile />
    </section>
  );
}
