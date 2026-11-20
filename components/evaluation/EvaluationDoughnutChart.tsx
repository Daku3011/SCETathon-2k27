"use client";

import React, { useState, useEffect } from "react";
import { Criterion } from "./evaluationData";

interface EvaluationDoughnutChartProps {
  criteria: Criterion[];
  selectedId: string;
  onSelect: (id: string) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  className?: string;
}

/**
 * Helper to compute an SVG annular wedge (doughnut segment) path string.
 * Angles in degrees clockwise from 12 o'clock.
 */
function describeArc(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const aStart = toRad(startAngleDeg);
  const aEnd = toRad(endAngleDeg);

  const xOs = cx + rOuter * Math.cos(aStart);
  const yOs = cy + rOuter * Math.sin(aStart);
  const xOe = cx + rOuter * Math.cos(aEnd);
  const yOe = cy + rOuter * Math.sin(aEnd);

  const xIe = cx + rInner * Math.cos(aEnd);
  const yIe = cy + rInner * Math.sin(aEnd);
  const xIs = cx + rInner * Math.cos(aStart);
  const yIs = cy + rInner * Math.sin(aStart);

  const sweep = endAngleDeg - startAngleDeg;
  const largeArc = sweep > 180 ? 1 : 0;

  return (
    `M ${xOs.toFixed(2)} ${yOs.toFixed(2)} ` +
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${xOe.toFixed(2)} ${yOe.toFixed(2)} ` +
    `L ${xIe.toFixed(2)} ${yIe.toFixed(2)} ` +
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${xIs.toFixed(2)} ${yIs.toFixed(2)} Z`
  );
}

export function EvaluationDoughnutChart({
  criteria,
  selectedId,
  onSelect,
  hoveredId,
  onHover,
  className = "",
}: EvaluationDoughnutChartProps) {
  // Client-side detection for responsive viewBox
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Doughnut Geometry
  // Desktop outer diameter: 460px (rOuter = 230), Center (490, 330)
  // Central opening: 52% of outer diameter (rInner = 230 * 0.52 = 119.6)
  const cx = 490;
  const cy = 330;
  const rOuter = 230;
  const rInner = 119.6;

  // Compute angles and anchor coordinates for all 5 criteria
  let accumulatedAngle = 0;
  const segments = criteria.map((c) => {
    const startAngle = accumulatedAngle;
    const sweepAngle = (c.weight / 100) * 360;
    const endAngle = startAngle + sweepAngle;
    const midAngle = startAngle + sweepAngle / 2;
    accumulatedAngle = endAngle;

    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const midRad = toRad(midAngle);
    const anchorX = cx + rOuter * Math.cos(midRad);
    const anchorY = cy + rOuter * Math.sin(midRad);

    const pathData = describeArc(cx, cy, rInner, rOuter, startAngle, endAngle);

    return {
      criterion: c,
      startAngle,
      endAngle,
      midAngle,
      anchorX,
      anchorY,
      pathData,
    };
  });

  // Coordinated leader line endpoints for outside labels
  // Right side labels (X > cx)
  // 1. Innovation (mid 45°): anchor (652.6, 167.4)
  // 2. Technical Depth (mid 135°): anchor (652.6, 492.6)
  // Left side labels (X < cx)
  // 3. Pitch Clarity (mid 342°): anchor (418.9, 111.3)
  // 4. Working Prototype (mid 288°): anchor (271.3, 258.9)
  // 5. Practical Impact (mid 216°): anchor (354.8, 516.1)
  const leaderLines: Record<
    string,
    {
      elbowX: number;
      elbowY: number;
      endX: number;
      endY: number;
      textX: number;
      textY: number;
      align: "start" | "end";
    }
  > = {
    innovation: {
      elbowX: 715,
      elbowY: 150,
      endX: 760,
      endY: 150,
      textX: 772,
      textY: 155,
      align: "start",
    },
    technical: {
      elbowX: 715,
      elbowY: 510,
      endX: 760,
      endY: 510,
      textX: 772,
      textY: 515,
      align: "start",
    },
    pitch: {
      elbowX: 320,
      elbowY: 80,
      endX: 230,
      endY: 80,
      textX: 218,
      textY: 85,
      align: "end",
    },
    prototype: {
      elbowX: 230,
      elbowY: 305,
      endX: 230,
      endY: 305,
      textX: 218,
      textY: 310,
      align: "end",
    },
    impact: {
      elbowX: 315,
      elbowY: 540,
      endX: 230,
      endY: 540,
      textX: 218,
      textY: 545,
      align: "end",
    },
  };

  return (
    <div className={`relative flex items-center justify-center w-full ${className}`}>
      <svg
        viewBox={isMobile ? "230 70 520 520" : "0 0 980 660"}
        className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-none h-auto mx-auto select-none overflow-visible"
        role="img"
        aria-label="Interactive Doughnut Chart: Five Judging Criteria Weighting"
      >
        <desc>
          A five-segment doughnut chart illustrating the SCETATHON proposed judging rubric:
          Innovation 25%, Technical Depth 25%, Practical Impact 20%, Working Prototype 20%, and
          Pitch Clarity 10%.
        </desc>

        {/* Outer subtle guide ring */}
        <circle
          cx={cx}
          cy={cy}
          r={rOuter + 1}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.08"
          strokeWidth="1"
        />

        {/* Five Doughnut Segments */}
        <g role="group" aria-label="Judging Criteria Segments">
          {segments.map(({ criterion, pathData }) => {
            const isSelected = selectedId === criterion.id;
            const isHovered = hoveredId === criterion.id;

            return (
              <g
                key={criterion.id}
                role="button"
                tabIndex={0}
                aria-label={`${criterion.title}: ${criterion.weight}% weight. Click to view rubric details.`}
                aria-pressed={isSelected}
                onClick={() => onSelect(criterion.id)}
                onMouseEnter={() => onHover(criterion.id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(criterion.id)}
                onBlur={() => onHover(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(criterion.id);
                  }
                }}
                className="cursor-pointer outline-none focus-visible:outline-none"
              >
                {/* Main Segment Path with Dark Separator Stroke */}
                <path
                  d={pathData}
                  fill={criterion.color}
                  stroke="var(--ink)"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  style={{
                    opacity: isSelected ? 1 : isHovered ? 0.95 : 0.84,
                    transition: "opacity 180ms ease, stroke 180ms ease, filter 180ms ease",
                    filter: isHovered
                      ? "brightness(1.1) drop-shadow(0 0 8px rgba(215,255,84,0.25))"
                      : "none",
                  }}
                />

                {/* Selection Outline Overlay (Keeps segment position fixed, highlights boundary) */}
                {isSelected && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke="var(--paper)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    pointerEvents="none"
                    className="transition-all duration-200"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Center Opening & 100% / TOTAL WEIGHT Display */}
        <circle cx={cx} cy={cy} r={rInner} fill="var(--ink)" stroke="var(--ink)" strokeWidth="2" />
        <circle
          cx={cx}
          cy={cy}
          r={rInner}
          fill="none"
          stroke="var(--paper)"
          strokeOpacity="0.12"
          strokeWidth="1"
        />

        {/* Center Typography */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="fill-paper font-display text-5xl md:text-6xl font-black tracking-tight select-none pointer-events-none"
        >
          100%
        </text>
        <text
          x={cx}
          y={cy + 24}
          textAnchor="middle"
          className="fill-muted font-mono text-xs md:text-sm font-bold tracking-[0.24em] uppercase select-none pointer-events-none"
        >
          TOTAL WEIGHT
        </text>

        {/* Outside Leader Lines & Ivory Labels (Rendered on md+ screens) */}
        {!isMobile && (
          <g role="group" aria-label="Outside Criteria Labels" className="hidden md:block">
            {segments.map(({ criterion, anchorX, anchorY }) => {
              const line = leaderLines[criterion.id];
              if (!line) return null;

              const isSelected = selectedId === criterion.id;
              const isHovered = hoveredId === criterion.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <g
                  key={`label-${criterion.id}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${criterion.title}: ${criterion.weight} percent`}
                  aria-pressed={isSelected}
                  onClick={() => onSelect(criterion.id)}
                  onMouseEnter={() => onHover(criterion.id)}
                  onMouseLeave={() => onHover(null)}
                  onFocus={() => onHover(criterion.id)}
                  onBlur={() => onHover(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(criterion.id);
                    }
                  }}
                  className="cursor-pointer outline-none focus-visible:outline-none"
                >
                  {/* Anchor Terminal Dot on Ring */}
                  <circle
                    cx={anchorX}
                    cy={anchorY}
                    r="3.5"
                    fill={criterion.color}
                    stroke="var(--ink)"
                    strokeWidth="1"
                  />

                  {/* Leader Line Path */}
                  <path
                    d={`M ${anchorX.toFixed(1)} ${anchorY.toFixed(1)} L ${line.elbowX} ${line.elbowY} L ${line.endX} ${line.endY}`}
                    fill="none"
                    stroke={isHighlighted ? "var(--paper)" : "var(--muted)"}
                    strokeWidth={isHighlighted ? "1.8" : "1"}
                    strokeOpacity={isHighlighted ? "1" : "0.75"}
                    style={{ transition: "stroke 180ms ease, stroke-width 180ms ease" }}
                  />

                  {/* Terminal Dot at Line End */}
                  <circle
                    cx={line.endX}
                    cy={line.endY}
                    r="2.5"
                    fill={isHighlighted ? "var(--lime)" : "var(--paper)"}
                    stroke="var(--ink)"
                    strokeWidth="0.8"
                  />

                  {/* Label Text Group: Bold Percentage & Short Name */}
                  <text
                    x={line.textX}
                    y={line.textY}
                    textAnchor={line.align}
                    className="select-none"
                  >
                    {line.align === "start" ? (
                      <>
                        <tspan
                          className="font-mono font-bold text-base md:text-lg"
                          fill={isHighlighted ? "var(--lime)" : criterion.color}
                        >
                          {criterion.weight}%
                        </tspan>
                        <tspan
                          dx="10"
                          className="font-display uppercase tracking-tight text-xs md:text-sm font-bold"
                          fill="var(--paper)"
                        >
                          {criterion.shortLabel}
                        </tspan>
                      </>
                    ) : (
                      <>
                        <tspan
                          className="font-display uppercase tracking-tight text-xs md:text-sm font-bold"
                          fill="var(--paper)"
                        >
                          {criterion.shortLabel}
                        </tspan>
                        <tspan
                          dx="10"
                          className="font-mono font-bold text-base md:text-lg"
                          fill={isHighlighted ? "var(--lime)" : criterion.color}
                        >
                          {criterion.weight}%
                        </tspan>
                      </>
                    )}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}

export default EvaluationDoughnutChart;
