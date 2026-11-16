import React from "react";
import type { Metadata } from "next";
import { Evaluation } from "@/components/sections/Inner";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Evaluation Rubric",
  description:
    "How ideas are judged at SCETATHON 2.0: criteria weighting, prototyping depth, and jury evaluation phases.",
};

export default function EvaluationPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="03 / Assessment Rubric"
        title={
          <>
            HOW IDEAS ARE <span className="text-coral">JUDGED.</span>
          </>
        }
        subtitle="Transparent weighting emphasizing working prototypes, technical rigor, and practical industrial applicability."
      />
      <Evaluation />
    </div>
  );
}
