import React from "react";
import type { Metadata } from "next";
import { Results } from "@/components/sections/Inner";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Qualified Teams · Results",
  description:
    "Official shortlist and qualification results for SCETATHON 2.0 at SCET, Surat.",
};

export default function ResultsPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="08 / Squad Shortlist"
        title={
          <>
            QUALIFIED <span className="text-lime">SQUADS.</span>
          </>
        }
        subtitle="Official qualification lists and evaluation results. Published strictly upon jury signoff."
      />
      <Results />
    </div>
  );
}
