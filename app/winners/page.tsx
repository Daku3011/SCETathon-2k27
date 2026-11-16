import React from "react";
import type { Metadata } from "next";
import { Winners } from "@/components/sections/Inner";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Podium & Winners",
  description:
    "Official championship awards and category podium winners for SCETATHON 2.0 at SCET, Surat.",
};

export default function WinnersPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="09 / The Podium"
        title={
          <>
            FINAL <span className="text-lime">CHAMPIONS.</span>
          </>
        }
        subtitle="Celebrating outstanding student engineering solutions from SCETATHON 2.0."
      />
      <Winners />
    </div>
  );
}
