"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { evaluationCriteria, Criterion } from "./evaluationData";
import { EvaluationDoughnutChart } from "./EvaluationDoughnutChart";
import { CriterionControls } from "./CriterionControls";
import { CriterionDetailPanel } from "./CriterionDetailPanel";
import { JudgingProcessSection } from "./JudgingProcessSection";

export function EvaluationView() {
  // Initially select Innovation & Originality as requested
  const [selectedId, setSelectedId] = useState<string>("innovation");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedCriterion: Criterion =
    evaluationCriteria.find((c) => c.id === selectedId) || evaluationCriteria[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleHover = (id: string | null) => {
    setHoveredId(id);
  };

  return (
    <div className="w-full space-y-12 md:space-y-16">
      {/* Screen Reader Summary Table / Text Equivalent of All 5 Weights */}
      <div className="sr-only">
        <h2>Judging Criteria Weights Summary</h2>
        <table>
          <caption>Five proposed criteria weights totaling 100 percent</caption>
          <thead>
            <tr>
              <th scope="col">Criterion</th>
              <th scope="col">Weight</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {evaluationCriteria.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.weight}%</td>
                <td>{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main Interactive Judging Rubric Infographic */}
      {/* Animated into view once with subtle fade and max 8px rise over 240ms */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="motion-reduce:transform-none motion-reduce:transition-none"
      >
        <section
          aria-label="Interactive Judging Rubric Composition"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
        >
          {/* Left Column (~60% desktop width): Chart & Controls */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-6">
            {/* Proposed Rubric Label */}
            <div className="w-full flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full bg-lime animate-pulse"
                  aria-hidden="true"
                />
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-lime">
                  PROPOSED RUBRIC
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                100% Total Allocations
              </span>
            </div>

            {/* Centered Doughnut Chart */}
            <div className="w-full flex justify-center py-2 sm:py-4">
              <EvaluationDoughnutChart
                criteria={evaluationCriteria}
                selectedId={selectedId}
                onSelect={handleSelect}
                hoveredId={hoveredId}
                onHover={handleHover}
              />
            </div>

            {/* Five Compact Criterion Selection Rows (With >= 44px touch targets) */}
            <div className="w-full pt-4 border-t border-line">
              <CriterionControls
                criteria={evaluationCriteria}
                selectedId={selectedId}
                onSelect={handleSelect}
                hoveredId={hoveredId}
                onHover={handleHover}
              />
            </div>
          </div>

          {/* Right Column (~40% desktop width): Selected Criterion Detail Panel */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-24">
            <CriterionDetailPanel criterion={selectedCriterion} />
          </div>
        </section>
      </motion.div>

      {/* Judging Process Section */}
      <JudgingProcessSection />
    </div>
  );
}

export default EvaluationView;
