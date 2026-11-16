import React from "react";
import Link from "next/link";
import { themes, problems } from "@/data/problems";
import {
  ArrowUpRight,
  ArrowRight,
  SmartCampusIcon,
  HumanityIcon,
  IndustryIcon,
} from "@/components/ui/Icons";

export function ChallengeBoard() {
  return (
    <section id="challenges" className="bg-[#191A18] text-paper py-20 md:py-32 relative">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-lime mb-6">
          <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
          <span>02 / Challenge board · 3 National Themes</span>
        </div>

        {/* Heading & Intro */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <h2 className="font-display text-[clamp(44px,7vw,110px)] leading-[0.9] tracking-[-0.09em] uppercase m-0">
            REAL
            <br />
            PROBLEMS.
            <br />
            <span className="text-lime">3 IMPACT</span>
            <br />
            TRACKS<span className="text-coral">.</span>
          </h2>

          <div className="max-w-[420px] space-y-4">
            <p className="text-[#ADAEA7] text-base md:text-[17px] leading-relaxed">
              Spearheaded jointly by all departments at SCET Surat. Explore 3 foundational tracks spanning 9 real-world challenge statements.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/problems"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 bg-lime text-ink hover:bg-[#f0ffad] transition-colors"
              >
                <span>Open Challenge Terminal</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Core Impact Tracks Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {themes.map((track) => {
            const isLime = track.color === "lime";
            const isCoral = track.color === "coral";
            const tagColor = isLime ? "text-lime" : isCoral ? "text-coral" : "text-lilac";

            return (
              <div
                key={track.id}
                className="bg-[#232422] border border-white/[0.18] p-6 sm:p-8 flex flex-col justify-between transition-colors relative overflow-hidden group hover:border-white/40"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-widest ${tagColor}`}>
                      TRACK // {track.id}
                    </span>
                    <div className={tagColor} aria-hidden="true">
                      {track.id === "01" ? (
                        <SmartCampusIcon className="w-6 h-6" />
                      ) : track.id === "02" ? (
                        <HumanityIcon className="w-6 h-6" />
                      ) : (
                        <IndustryIcon className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  {/* Track Title */}
                  <h3 className="font-display text-xl sm:text-2xl text-paper uppercase tracking-tight leading-snug mb-3">
                    {track.name}
                  </h3>

                  <p className="text-sm text-[#C6C8BE] leading-relaxed mb-6">
                    {track.description}
                  </p>

                  {/* Domain Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {track.domains.map((d) => (
                      <span
                        key={d}
                        className="font-mono text-[10px] uppercase px-2 py-0.5 bg-black/40 border border-white/15 text-[#C6C8BE]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/problems?domain=${encodeURIComponent(track.name)}`}
                    className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider ${tagColor} hover:underline underline-offset-4 group/tracklink`}
                  >
                    <span>View Track Problems</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/tracklink:translate-x-1" strokeWidth={2.4} />
                  </Link>
                  <span className="font-mono text-[10px] text-[#93958E]">
                    3 STATEMENTS
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 9-Slot Problem Briefs Rail */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-[#93958E]">
            EXPLORE ALL 9 CHALLENGE STATEMENTS // PS-01 TO PS-09
          </span>
          <Link
            href="/problems"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-lime uppercase font-bold hover:underline"
          >
            <span>Launch Terminal</span>
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.2} />
          </Link>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#50514B] border border-[#50514B]"
          role="list"
          aria-label="Nine challenge statements across 3 official tracks"
        >
          {problems.map((problem) => {
            const isTrackA = problem.category.includes("CAMPUS");
            const isTrackB = problem.category.includes("HUMANITY");
            const badgeColor = isTrackA
              ? "text-lime border-lime/40"
              : isTrackB
              ? "text-coral border-coral/40"
              : "text-lilac border-lilac/40";

            return (
              <Link
                key={problem.id}
                href={`/problems`}
                role="listitem"
                className="bg-[#191A18] hover:bg-[#282a24] p-5 sm:p-6 flex flex-col justify-between transition-colors relative overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
              >
                {/* Top metadata */}
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] mb-3">
                    <span className="font-bold text-paper/80">PS-{problem.id}</span>
                    <span className={`border px-2 py-0.5 text-[9px] font-mono font-bold ${badgeColor}`}>
                      {isTrackA ? "TRACK 01" : isTrackB ? "TRACK 02" : "TRACK 03"}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-lg text-paper uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                    {problem.title}
                  </h4>

                  <p className="text-xs text-[#ADAEA7] line-clamp-2 leading-relaxed mb-4">
                    {problem.description}
                  </p>
                </div>

                {/* Footer info */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#93958E] uppercase">
                    Level: {problem.difficulty}
                  </span>
                  <span className="text-lime inline-flex items-center gap-1 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2.4} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ChallengeBoard;
