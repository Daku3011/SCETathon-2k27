import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "The 24-Hour Run-Sheet",
  description:
    "Official schedule and timeline for SCETATHON 2.0 at SCET, Surat. Kickoff 11:00 AM IST on 28 January 2027.",
};

const runSheet = [
  {
    phase: "PHASE 01",
    time: "28 JAN · 09:30 – 10:45 AM",
    title: "Squad Check-in & Hardware Setup",
    description: "Team badges issued, workspace allocation in SCET labs, power/network verification.",
    status: "CONFIRMED",
    statusColor: "text-lime border-lime",
  },
  {
    phase: "PHASE 02",
    time: "28 JAN · 11:00 AM",
    title: "Official Kickoff & 24h Clock Starts",
    description: "Problem statement lock-in, mentor desk activation, and commencement of the 24-hour build.",
    status: "CONFIRMED",
    statusColor: "text-lime border-lime",
  },
  {
    phase: "PHASE 03",
    time: "28 JAN · 04:00 PM",
    title: "Checkpoint 1: Architecture Review",
    description: "Faculty and industry mentors review squad system diagrams, circuit designs, and tech choices.",
    status: "PROVISIONAL",
    statusColor: "text-coral border-coral",
  },
  {
    phase: "PHASE 04",
    time: "28–29 JAN · 12:00 AM MIDNIGHT",
    title: "Checkpoint 2: Midnight Core Progress",
    description: "Squads demonstrate working core data pipelines, sensor integrations, or baseline functional code.",
    status: "PROVISIONAL",
    statusColor: "text-coral border-coral",
  },
  {
    phase: "PHASE 05",
    time: "29 JAN · 08:00 AM",
    title: "Morning Sprint & Code Freeze Prep",
    description: "Breakfast served, final bug fixes, testing, deployment to preview environments.",
    status: "PROVISIONAL",
    statusColor: "text-coral border-coral",
  },
  {
    phase: "PHASE 06",
    time: "29 JAN · 11:00 AM",
    title: "Code Freeze & Submission Lock",
    description: "The 24-hour continuous build concludes. Git repositories locked and demonstration signups.",
    status: "CONFIRMED",
    statusColor: "text-lime border-lime",
  },
  {
    phase: "PHASE 07",
    time: "29 JAN · 12:00 PM – 03:00 PM",
    title: "Jury Demonstrations & Project Showcase",
    description: "Live prototype presentations before interdisciplinary panels of academic faculty and senior practitioners.",
    status: "PROVISIONAL",
    statusColor: "text-coral border-coral",
  },
  {
    phase: "PHASE 08",
    time: "29 JAN · 04:30 PM",
    title: "Valedictory & Awards Ceremony",
    description: "Announcement of category winners, champion squads, certificates, and closing address.",
    status: "PROVISIONAL",
    statusColor: "text-coral border-coral",
  },
];

export default function TimelinePage() {
  return (
    <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20">
      <PageHeader
        tag="05 / The Schedule"
        title={
          <>
            THE 24-HOUR <span className="text-lime">RUN-SHEET.</span>
          </>
        }
        subtitle="28–29 January 2027 · SCET Campus, Surat. All timestamps formatted in Indian Standard Time (IST, UTC+5:30)."
      />

      <div className="border border-line bg-surface p-6 sm:p-10 mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-8 border-b border-line">
          <div>
            <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-wider block mb-1">
              CAMPUS SPRINT TIMELINE
            </span>
            <div className="font-display text-2xl sm:text-3xl text-paper uppercase">
              28–29 January 2027
            </div>
          </div>
          <div className="font-mono text-xs px-3 py-1 bg-lime text-[#171915] font-bold uppercase tracking-wider">
            ALL TIMES IST (UTC+5:30)
          </div>
        </div>

        <div className="space-y-6">
          {runSheet.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 bg-ink/40 border border-line flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-line-strong transition-colors"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-lime font-bold">
                    {item.phase}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    //
                  </span>
                  <span className="font-mono text-xs text-paper font-semibold tracking-wider">
                    {item.time}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-paper uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0">
                <span
                  className={`font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 border ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
