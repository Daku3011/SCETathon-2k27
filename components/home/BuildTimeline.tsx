import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/Icons";

const scheduleItems = [
  {
    id: "01",
    title: "Arrive & begin",
    meta: ["28 January 2027", "11:00 AM IST / SCET"],
  },
  {
    id: "02",
    title: "The 24h build",
    meta: ["28–29 January", "Create / test / iterate"],
  },
  {
    id: "03",
    title: "Present what you made",
    meta: ["29 January", "Detailed programme TBA"],
  },
];

export function BuildTimeline() {
  return (
    <section id="schedule" className="bg-lime text-ink py-20 md:py-28 select-none">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-ink mb-6">
          <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
          <span>03 / The countdown</span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-12">
          <h2 className="font-display text-[clamp(48px,7.5vw,120px)] leading-[0.88] tracking-[-0.092em] uppercase m-0">
            ONE DAY.
            <br />
            ALL IN.
          </h2>
          <div className="lg:justify-self-end max-w-[400px]">
            <p className="text-lg md:text-[21px] leading-snug font-normal text-ink/90">
              From first hello to final prototype: an intense 24-hour sprint built for ideas that refuse to wait.
            </p>
            <Link
              href="/timeline"
              className="inline-flex items-center gap-1.5 mt-4 font-mono text-[11px] font-bold uppercase tracking-wider text-ink underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              <span>Full 24-Hour Run-Sheet</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
            </Link>
          </div>
        </div>

        {/* Typographic Schedule Table */}
        <div className="border-t-2 border-ink">
          {scheduleItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[75px_1fr] md:grid-cols-[200px_1fr_250px] gap-4 md:gap-7 items-center py-6 md:py-7 border-b border-ink/30"
            >
              <div className="font-display text-2xl md:text-[40px] tracking-[-0.08em] flex items-center gap-1">
                <span>{item.id}</span>
                <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 opacity-60 shrink-0" strokeWidth={2.4} />
              </div>
              <div className="font-display text-2xl md:text-[clamp(24px,3.1vw,49px)] leading-tight tracking-[-0.07em] uppercase">
                {item.title}
              </div>
              <div className="col-start-2 md:col-start-3 font-mono text-[11px] leading-[1.7] font-bold uppercase tracking-wider text-ink/85">
                {item.meta[0]}
                <br />
                {item.meta[1]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BuildTimeline;
