"use client";

import React, { useState } from "react";
import { event } from "@/data/event";

/**
 * Editorial Judging Process Section.
 * Replaces the previous stack of dark boxes with colored left borders.
 * Dynamically checks round visibility in event config:
 * - If unpublished: displays an editorial disclosure "Judging process · To be announced",
 *   which reveals: "The organizers will publish the round-wise evaluation process here."
 * - If confirmed: renders an editorial list separated by thin horizontal rules.
 */
export function JudgingProcessSection() {
  // Check if round-wise details are confirmed in the event data
  const roundMilestone = event.milestones.find((m) =>
    m.name.toLowerCase().includes("round")
  );
  const isRoundDetailsPublished = roundMilestone ? !roundMilestone.tba : false;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      aria-labelledby="judging-process-heading"
      className="mt-16 sm:mt-20 pt-10 border-t border-line space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-widest block mb-1">
            EVALUATION PHASES
          </span>
          <h2
            id="judging-process-heading"
            className="font-display text-2xl sm:text-3xl text-paper uppercase tracking-tight"
          >
            JUDGING <span className="text-coral">PROCESS.</span>
          </h2>
        </div>
        <span className="font-mono text-xs text-muted uppercase tracking-wider">
          Evaluation Milestones &amp; Jury Review
        </span>
      </div>

      {!isRoundDetailsPublished ? (
        /* Unpublished State: Editorial "To be announced" Disclosure */
        <div className="border border-line bg-surface transition-colors">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="judging-tba-content"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full min-h-[52px] p-5 sm:p-6 flex items-center justify-between gap-4 text-left font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-paper hover:text-lime transition-colors outline-none focus-visible:ring-2 focus-visible:ring-lime cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" aria-hidden="true" />
              <span>Judging process · To be announced</span>
            </div>
            <span
              className={`transform transition-transform duration-200 text-lg font-mono ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </button>

          {isOpen && (
            <div
              id="judging-tba-content"
              className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-line text-sm text-paper/80 leading-relaxed animate-fade-in"
            >
              <p>The organizers will publish the round-wise evaluation process here.</p>
            </div>
          )}
        </div>
      ) : (
        /* Published State: Editorial list separated by thin horizontal rules */
        <div className="divide-y divide-line border-y border-line">
          <div className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-widest">
                Round 01
              </span>
              <h3 className="font-display text-lg sm:text-xl text-paper uppercase">
                Abstract &amp; Feasibility Screening
              </h3>
              <p className="text-xs sm:text-sm text-paper/80 max-w-2xl">
                Initial evaluation of problem formulation, architectural design, and implementation viability.
              </p>
            </div>
            <span className="font-mono text-[10px] text-muted uppercase tracking-wider px-2 py-1 border border-line shrink-0 self-start sm:self-auto">
              Confirmed
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default JudgingProcessSection;
