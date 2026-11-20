"use client";

import React, { useEffect, useState } from "react";
import { Criterion } from "./evaluationData";

interface CriterionDetailPanelProps {
  criterion: Criterion;
}

/**
 * Detailed rubric panel for the active selected criterion.
 * Includes large percentage, full title, description, judge checklist, and guidance note.
 */
export function CriterionDetailPanel({ criterion }: CriterionDetailPanelProps) {
  // Polite screen reader live region announcement
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setAnnouncement(
      `Criterion selected: ${criterion.title}, ${criterion.weight} percent total weight.`
    );
  }, [criterion.id, criterion.title, criterion.weight]);

  return (
    <article
      aria-label={`Detailed judging rubric for ${criterion.title}`}
      className="p-6 sm:p-8 bg-surface border-t-2 border-line-strong border-x border-b border-line transition-opacity duration-200"
    >
      {/* Screen Reader Announcement Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Header: Weight percentage and active state badge */}
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-line">
        <div>
          <div className="flex items-baseline gap-3">
            <span
              className="font-mono text-5xl sm:text-6xl font-black tracking-tight"
              style={{
                // Guarantee high contrast: for darker moss olive (#43531E), use variable paper text
                color: criterion.id === "pitch" ? "var(--paper)" : criterion.color,
              }}
            >
              {criterion.weight}%
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold">
              WEIGHT
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2.5">
            <span
              className="w-3 h-3 rounded-full shrink-0 border border-black/40"
              style={{ backgroundColor: criterion.color }}
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted font-bold">
              Proposed Judging Dimension
            </span>
          </div>
        </div>

        <span className="font-mono text-[10px] text-muted uppercase tracking-widest px-2.5 py-1 bg-ink/40 border border-line select-none">
          PROPOSED
        </span>
      </div>

      {/* Full Criterion Title & Explanation */}
      <div className="py-6 space-y-3">
        <h3 className="font-display text-2xl sm:text-3xl text-paper uppercase tracking-tight">
          {criterion.title}
        </h3>
        <p className="text-sm sm:text-base text-paper/80 leading-relaxed">
          {criterion.description}
        </p>
      </div>

      {/* What Judges Look For Section */}
      <div className="py-6 border-t border-line space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-lime rounded-full" aria-hidden="true" />
          <h4 className="font-mono text-xs uppercase tracking-wider text-lime font-bold">
            WHAT JUDGES LOOK FOR
          </h4>
        </div>

        <ul className="space-y-3" role="list">
          {criterion.guidance.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs sm:text-sm text-paper/90 leading-relaxed"
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 bg-lime/60 shrink-0 rotate-45"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Proposed Criterion Guidance Note */}
      <div className="pt-5 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-muted">
        <span>Proposed criterion guidance</span>
        <span className="text-muted/70">Draft copy subject to jury consensus</span>
      </div>
    </article>
  );
}

export default CriterionDetailPanel;
