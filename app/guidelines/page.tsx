import React from "react";
import type { Metadata } from "next";
import { Guidelines } from "@/components/sections/Inner";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Guidelines & Field Manual",
  description:
    "Official participation manual, team formation rules, submission boundaries, and safety conduct for SCETATHON 2.0.",
};

export default function GuidelinesPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="02 / Participation Manual"
        title={
          <>
            THE FIELD <span className="text-lime">MANUAL.</span>
          </>
        }
        subtitle="Clear rules, real constraints, and safety guidelines for the 2027 edition at SCET, Surat."
      />
      <Guidelines />
    </div>
  );
}
