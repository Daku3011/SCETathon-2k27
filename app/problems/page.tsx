import React from "react";
import type { Metadata } from "next";
import Problems from "@/components/sections/Problems";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Challenge Terminal",
  description:
    "Explore the challenge tracks and real-world problem statements for SCETATHON 2.0 at SCET, Surat.",
};

export default function ProblemsPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="04 / Challenge Terminal"
        title={
          <>
            CHALLENGE <span className="text-lime">TRACKS.</span>
          </>
        }
        subtitle="Search, filter, and review approved problem briefs across computational intelligence and sustainable process engineering."
      />
      <Problems />
    </div>
  );
}
