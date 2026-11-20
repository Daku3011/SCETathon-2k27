"use client";

import React from "react";
import { Criterion } from "./evaluationData";

interface CriterionControlsProps {
  criteria: Criterion[];
  selectedId: string;
  onSelect: (id: string) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  className?: string;
}

/**
 * Five clearly labelled native buttons for criterion selection.
 * Fully keyboard accessible, exposes selected state, and offers >= 44px touch targets.
 */
export function CriterionControls({
  criteria,
  selectedId,
  onSelect,
  hoveredId,
  onHover,
  className = "",
}: CriterionControlsProps) {
  return (
    <div
      role="group"
      aria-label="Criteria Quick Selection"
      className={`w-full flex flex-col gap-2.5 ${className}`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-muted px-1 pb-1">
        <span>Criteria Breakdown</span>
        <span>Weight</span>
      </div>

      {criteria.map((c) => {
        const isSelected = selectedId === c.id;
        const isHovered = hoveredId === c.id;

        return (
          <button
            key={c.id}
            type="button"
            role="button"
            aria-pressed={isSelected}
            aria-label={`${c.title}: ${c.weight}% weight. ${isSelected ? "Currently selected" : "Click to select"}`}
            onClick={() => onSelect(c.id)}
            onMouseEnter={() => onHover(c.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(c.id)}
            onBlur={() => onHover(null)}
            className={`group w-full min-h-[44px] px-4 py-3 flex items-center justify-between gap-3 text-left transition-all duration-200 border outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink cursor-pointer ${
              isSelected
                ? "bg-lime/10 border-lime shadow-[0_0_15px_rgba(215,255,84,0.12)]"
                : isHovered
                ? "bg-surface/80 border-line-strong"
                : "bg-surface/40 border-line hover:border-line-strong hover:bg-surface/70"
            }`}
          >
            {/* Color Marker & Criterion Name */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/40 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: c.color }}
                aria-hidden="true"
              />
              <span
                className={`text-xs sm:text-sm font-bold uppercase tracking-tight transition-colors leading-snug break-words ${
                  isSelected ? "text-paper" : "text-muted group-hover:text-paper"
                }`}
              >
                {c.title}
              </span>
            </div>

            {/* Percentage & Active Indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`font-mono font-bold text-xs sm:text-sm transition-colors ${
                  isSelected ? "text-lime" : "text-muted group-hover:text-paper"
                }`}
              >
                {c.weight}%
              </span>
              <span
                className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border transition-opacity duration-160 ${
                  isSelected
                    ? "border-lime text-lime bg-lime/10 opacity-100"
                    : "border-transparent text-transparent opacity-0 pointer-events-none"
                }`}
                aria-hidden="true"
              >
                ACTIVE
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default CriterionControls;
