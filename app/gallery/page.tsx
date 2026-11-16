import React from "react";
import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Inner";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Historical Archive · Gallery",
  description:
    "Verified photographic record and highlights from the inaugural SCETATHON held at Sarvajanik College of Engineering & Technology, Surat.",
};

export default function GalleryPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="06 / The Archive"
        title={
          <>
            THE HISTORICAL <span className="text-lime">ARCHIVE.</span>
          </>
        }
        subtitle="Verified photography from SCETATHON 1.0 (March 2026). Retained as an authentic historical record of student innovation at SCET, Surat."
      />
      <Gallery />
    </div>
  );
}
