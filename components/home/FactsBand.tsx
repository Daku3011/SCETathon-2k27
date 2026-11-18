import React from "react";
import { ArrowUpRight } from "@/components/ui/Icons";

export function FactsBand() {
  return (
    <section className="bg-lime text-ink select-none" aria-label="Event at a glance">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto grid grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.55fr] min-h-[140px] md:min-h-[150px]">
        {/* Fact 1: 24 HR */}
        <div className="border-b lg:border-b-0 border-r border-ink/25 py-6 px-4 md:py-6 md:pr-7 md:pl-0 flex flex-col justify-between">
          <div className="font-display text-[clamp(42px,4.5vw,68px)] leading-[0.9] tracking-[-0.075em]">
            24<sup className="font-mono text-sm md:text-base font-bold align-top tracking-normal ml-1">HR</sup>
          </div>
          <div className="font-mono text-[10px] uppercase font-bold tracking-[0.12em] mt-3">
            One continuous build
          </div>
        </div>

        {/* Fact 2: 3–5 */}
        <div className="border-b lg:border-b-0 lg:border-r border-ink/25 py-6 px-4 md:py-6 md:px-7 flex flex-col justify-between">
          <div className="font-display text-[clamp(42px,4.5vw,68px)] leading-[0.9] tracking-[-0.075em]">
            3–5
          </div>
          <div className="font-mono text-[10px] uppercase font-bold tracking-[0.12em] mt-3">
            People per team
          </div>
        </div>

        {/* Fact 3: 28 JAN */}
        <div className="border-r border-ink/25 py-6 px-4 md:py-6 md:px-7 flex flex-col justify-between">
          <div className="font-display text-[clamp(42px,4.5vw,68px)] leading-[0.9] tracking-[-0.075em]">
            28<sup className="font-mono text-sm md:text-base font-bold align-top tracking-normal ml-1">JAN</sup>
          </div>
          <div className="font-mono text-[10px] uppercase font-bold tracking-[0.12em] mt-3">
            Start date / 2027
          </div>
        </div>

        {/* Fact 4: SURAT */}
        <div className="py-6 px-4 md:py-6 md:pl-7 flex flex-col justify-between">
          <div className="font-display text-[clamp(32px,3.5vw,52px)] leading-[0.9] tracking-[-0.075em] flex items-center">
            <span>SURAT</span>
            <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 ml-2 text-ink/75 shrink-0" strokeWidth={2.5} />
          </div>
          <div className="font-mono text-[10px] uppercase font-bold tracking-[0.12em] mt-3">
            SCET campus, Gujarat
          </div>
        </div>
      </div>
    </section>
  );
}

export default FactsBand;
