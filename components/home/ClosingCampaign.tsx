"use client";

import React from "react";
import { RegistrationStatus } from "@/components/registration/RegistrationStatus";

export function ClosingCampaign() {
  return (
    <section className="bg-coral text-ink pt-20 md:pt-28 pb-0 relative overflow-hidden select-none">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto">
        {/* Top Campaign Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
            <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
            <span>SCETATHON 2.0 / 2027</span>
          </div>

          <div className="hidden sm:block border-2 border-ink py-3 px-4 font-mono text-[11px] leading-[1.7] font-bold uppercase rotate-6 max-w-[210px] text-ink shadow-[3px_3px_0px_#111210]">
            28 — 29 JAN
            <br />
            SURAT, INDIA
            <br />
            24 HOURS TO BUILD
          </div>
        </div>

        {/* Giant Manifesto Headline */}
        <h2 className="font-display text-[clamp(64px,11.5vw,165px)] leading-[0.83] tracking-[-0.105em] uppercase my-8 md:my-14">
          COME
          <br />
          CURIOUS.
          <br />
          <span
            className="text-paper inline-block"
            style={{
              WebkitTextStroke: "2px #111210",
              textShadow: "5px 6px 0px #111210",
            }}
          >
            LEAVE
          </span>
          <br />
          CHANGED.
        </h2>

        {/* CTA Button */}
        <div className="mb-14">
          <RegistrationStatus
            label="CHECK REGISTRATION"
            variant="primary"
            className="!bg-ink !text-paper hover:!bg-[#2E3029]"
          />
        </div>
      </div>

      {/* Giant Cropped Baseline Wordmark */}
      <div
        className="font-display text-[clamp(85px,15.5vw,247px)] leading-[0.8] whitespace-nowrap tracking-[-0.125em] text-center text-ink/90 mx-auto -mb-4 md:-mb-8 select-none pointer-events-none -translate-x-[1%]"
        aria-hidden="true"
      >
        SCETATHON
      </div>
    </section>
  );
}

export default ClosingCampaign;
