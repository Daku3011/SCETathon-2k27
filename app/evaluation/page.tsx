import React from "react";
import type { Metadata } from "next";
import { EvaluationView } from "@/components/evaluation/EvaluationView";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Evaluation Rubric",
  description:
    "How ideas are judged at SCETATHON 2.0: explore the proposed criteria weighting, prototyping depth, and jury evaluation phases.",
};

export default function EvaluationPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-10 md:py-16">
      <PageHeader
        tag="Assessment Rubric"
        title={
          <>
            HOW IDEAS ARE <span className="text-coral">JUDGED.</span>
          </>
        }
        // subtitle="Explore the proposed criteria and what judges will look for in your project."
      />
      <EvaluationView />
    </div>
  );
}
