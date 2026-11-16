import React from "react";
import Link from "next/link";

const challengeSlots = [
  { id: "01", code: "PS / 01", status: "Brief pending" },
  { id: "02", code: "PS / 02", status: "Brief pending" },
  { id: "03", code: "PS / 03", status: "Brief pending" },
  { id: "04", code: "PS / 04", status: "Brief pending" },
  { id: "05", code: "PS / 05", status: "Brief pending" },
  { id: "06", code: "PS / 06", status: "Brief pending" },
  { id: "07", code: "PS / 07", status: "Brief pending" },
  { id: "08", code: "PS / 08", status: "Brief pending" },
];

export function ChallengeBoard() {
  return (
    <section id="challenges" className="bg-[#191A18] text-paper py-20 md:py-32 relative">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-lime mb-6">
          <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
          <span>02 / Challenge board</span>
        </div>

        {/* Heading & Intro */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <h2 className="font-display text-[clamp(48px,7.5vw,120px)] leading-[0.88] tracking-[-0.092em] uppercase m-0">
            REAL
            <br />
            PROBLEMS.
            <br />
            <em className="text-lime not-italic">OPEN MINDS.</em>
          </h2>

          <div className="max-w-[360px] space-y-4">
            <p className="text-[#ADAEA7] text-base md:text-[17px] leading-relaxed">
              Eight challenge slots. Endless directions to explore. Official 2027 problem briefs will appear here once the organizers release them.
            </p>
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-lime underline underline-offset-4 hover:text-white transition-colors"
            >
              Open Challenge Terminal ↗
            </Link>
          </div>
        </div>

        {/* 8-slot Industrial Rail */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#50514B] border border-[#50514B]"
          role="list"
          aria-label="Eight challenge slots awaiting official briefs"
        >
          {challengeSlots.map((slot) => (
            <Link
              key={slot.id}
              href="/problems"
              role="listitem"
              className="bg-[#191A18] hover:bg-[#282a24] min-h-[190px] md:min-h-[260px] p-4 md:p-5 flex flex-col justify-between transition-colors relative overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between font-mono text-[10px] text-[#B0B4A7] uppercase tracking-[0.12em]">
                <span>{slot.code}</span>
                <span className="text-paper/40 font-mono">◌</span>
              </div>

              {/* Center giant numeral */}
              <div className="font-display text-[clamp(65px,8.5vw,142px)] leading-[0.9] tracking-[-0.08em] text-[#353831] group-hover:text-[#454940] transition-colors">
                {slot.id}
              </div>

              {/* Status & arrow */}
              <div className="flex items-baseline justify-between z-10">
                <span className="font-mono text-[10px] uppercase font-bold tracking-[0.08em] text-lime">
                  {slot.status}
                </span>
                <span
                  className="font-sans text-3xl md:text-4xl text-[#9B9D8F] group-hover:text-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>        
      </div>
    </section>
  );
}

export default ChallengeBoard;
