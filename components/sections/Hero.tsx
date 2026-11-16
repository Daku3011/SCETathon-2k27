"use client";

import Image from "next/image";
import Link from "next/link";
import { Register } from "../ui/Register";
import { BreadboardIllustration, MandanaBorderTile } from "../ui/SVGs";

/**
 * SCETATHON 2.0 First Screen (Hero Section)
 * - Two-ink campus poster aesthetic unfolding into an event programme
 * - Left 7 columns: Warm paper field (#F5EFE2)
 *   - Supplied SCETATHON 2.0 wordmark preserving colours and aspect ratio
 *   - Headline date: "28–29" on line 1, "January 2027" directly beneath in Archivo Black
 *   - Subheading: "A 24-hour student hackathon at SCET, Surat."
 *   - Solid Register button and underlined Explore problems link
 * - Right 5 columns: Indigo field (#172C67)
 *   - Technical breadboard illustration with 4 nested chalk diamonds and animated jumper wire
 * - Bottom edge: Repeating Mandana border tile
 */
export default function Hero() {
  return (
    <section className="relative w-full bg-[#F5EFE2] overflow-hidden border-b border-[#182239]/15 select-none">
      {/* 4K container centering with extended colour fields */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] lg:min-h-[640px]">
        {/* Left Field (7 Desktop Columns): Warm Paper Field */}
        <div className="lg:col-span-7 px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20 flex flex-col justify-between">
          <div>
            {/* Supplied SCETATHON 2.0 Wordmark preserving original colors and aspect ratio */}
            <div className="mb-6 sm:mb-8 max-w-[320px] sm:max-w-[420px]">
              <Image
                src="/brand/scetathon.webp"
                alt="SCETATHON 2.0 · Ideas, Innovation, Impact"
                width={1496}
                height={332}
                priority
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Headline Date: 28–29 on line 1, January 2027 directly beneath in Archivo Black */}
            <div className="tracking-tight leading-none text-[#182239] mb-6 sm:mb-8">
              <h1 className="font-display font-black text-[clamp(4.25rem,11.5vw,10.5rem)] leading-[0.9] block text-[#182239]">
                28–29
              </h1>
              <span className="font-display font-black text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] block text-[#182239] mt-1 sm:mt-2">
                January 2027
              </span>
            </div>

            {/* Event descriptor */}
            <p className="text-xl sm:text-2xl text-[#182239]/90 font-medium mb-8 max-w-xl leading-snug">
              A 24-hour student hackathon at SCET, Surat.
            </p>

            {/* Action Group: Solid Register button + Underlined Explore problems link */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
              <Register text="Register" />
              <Link
                href="#problems"
                className="text-base sm:text-lg font-semibold text-[#182239] underline underline-offset-8 decoration-[#182239]/50 hover:decoration-[#963E29] hover:text-[#963E29] transition-colors focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] rounded-[2px]"
              >
                Explore problems
              </Link>
            </div>
          </div>

          {/* Quick campus metadata badge at bottom left */}
          <div className="pt-8 mt-8 border-t border-[#182239]/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#182239]/70">
            <span>// VENUE: SCET CAMPUS · SURAT</span>
            <span>// TEAMS: 3–5 INNOVATORS</span>
            <span>// 24 HOURS CONTINUOUS</span>
          </div>
        </div>

        {/* Right Field (5 Desktop Columns): Indigo Field with Technical Breadboard Illustration */}
        <div className="lg:col-span-5 bg-[#172C67] flex items-center justify-center relative min-h-[320px] sm:min-h-[420px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[#182239]/15">
          <BreadboardIllustration />
        </div>
      </div>

      {/* Mandana repeating border tile along the hero's lower edge */}
      <MandanaBorderTile />
    </section>
  );
}
