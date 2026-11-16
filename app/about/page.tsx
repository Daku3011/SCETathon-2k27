import React from "react";
import type { Metadata } from "next";
import { About } from "@/components/sections/Inner";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "About SCETATHON 2.0",
  description:
    "SCETATHON 2.0 brings student squads from across India to Sarvajanik College of Engineering & Technology, Surat.",
};

export default function AboutPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="01 / The Organization"
        title={
          <>
            ABOUT SCET <span className="text-lime">&amp;</span> THE SPRINT.
          </>
        }
        // subtitle="Hosted at Sarvajanik College of Engineering & Technology, Surat."
      />
      <About />
    </div>
  );
}
