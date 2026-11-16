import React from "react";
import type { Metadata } from "next";
import { event } from "@/data/event";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Sponsors & Industry Partners",
  description:
    "Community and industry partners backing the student innovators at SCETATHON 2.0 at SCET, Surat.",
};

const partnershipTiers = [
  { tier: "Title Partner", status: "Awaiting confirmation", note: "Leading industry patronage for student engineering sprint." },
  { tier: "Track / Challenge Partners", status: "Awaiting confirmation", note: "Domain challenges across computational and chemical process tracks." },
  { tier: "Platform & Cloud Sponsors", status: "Awaiting confirmation", note: "Developer tools, computing credits, and deployment infrastructure." },
  { tier: "Community & Ecosystem", status: "Awaiting confirmation", note: "Regional tech ecosystems, student developer clubs, and research hubs." },
];

export default function SponsorsPage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="07 / Partners & Patrons"
        title={
          <>
            BACKING THE <span className="text-lime">BUILD.</span>
          </>
        }
        subtitle="Empowering student engineering squads at SCET, Surat. Official industry and community partners are announced only upon confirmed partnership agreements."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {partnershipTiers.map((p) => (
          <div
            key={p.tier}
            className="p-8 bg-[#191A18] border border-white/[0.19] flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[10px] text-coral font-bold uppercase tracking-wider block mb-2">
                TIER // {p.tier}
              </span>
              <h3 className="font-display text-2xl text-paper uppercase tracking-tight mb-2">
                {p.tier}
              </h3>
              <p className="text-sm text-[#C6C8BE] leading-relaxed">
                {p.note}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-[11px] text-lime font-bold uppercase">
                {p.status}
              </span>
              <span className="font-mono text-xs text-[#93958E]">
                2027 ROSTER
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Partnership Inquiries Panel */}
      <div className="p-8 md:p-12 bg-coral text-ink select-none flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider block mb-2 text-ink/80">
            PARTNER WITH SCETATHON 2.0
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-ink uppercase tracking-tight">
            SUPPORT NEXT-GEN INNOVATORS.
          </h3>
          <p className="text-base text-ink/90 mt-2 max-w-xl">
            Engage with top engineering talent from across the country. Mentor squads, propose challenge statements, and showcase your technology stack.
          </p>
        </div>
        <a
          href={`mailto:${event.email}?subject=${encodeURIComponent("SCETATHON 2.0 Sponsorship Inquiry")}`}
          className="inline-flex items-center gap-3 px-6 py-4 bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#2E3029] transition-colors"
        >
          <span>Request Partner Deck</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
