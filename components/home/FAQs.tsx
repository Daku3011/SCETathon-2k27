"use client";

import React, { useState } from "react";

const faqData = [
  {
    q: "When is SCETATHON 2.0?",
    a: "The hackathon is scheduled for 28–29 January 2027 at SCET, Surat. The current event configuration lists kickoff at 11:00 AM IST on 28 January.",
  },
  {
    q: "How many people can be on a team?",
    a: "The current event configuration lists teams of three to five members. Cross-disciplinary teams bridging software and process/hardware engineering are encouraged.",
  },
  {
    q: "Who can participate?",
    a: "The current event guidelines describe eligibility for students enrolled in diploma, undergraduate or postgraduate engineering programmes across recognized universities. Check the published official guidelines for final eligibility.",
  },
  {
    q: "Where can I find the problem statements?",
    a: "Official 2027 problem statements have not yet been published in this prototype. The challenge board above is deliberately a placeholder awaiting verified organizer release.",
  },
  {
    q: "Is registration open?",
    a: "Not yet in this prototype. Registration will be linked when the official form and backend are ready and enabled by the organizing team.",
  },
  {
    q: "Who is organizing the event?",
    a: "Sarvajanik College of Engineering & Technology (SCET), Surat. The current event materials identify collaboration between the Departments of Computer Engineering and Chemical Engineering.",
  },
];

export function FAQs() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndices((current) =>
      current.includes(idx) ? current.filter((i) => i !== idx) : [...current, idx]
    );
  };

  return (
    <section id="faq" className="bg-paper text-ink py-20 md:py-32 select-none">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
        {/* Left Column */}
        <div>
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-ink mb-6">
            <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
            <span>06 / Need to know</span>
          </div>

          <h2 className="font-display text-[clamp(48px,7.5vw,120px)] leading-[0.88] tracking-[-0.092em] uppercase m-0">
            GOOD
            <br />
            QUESTIONS.
          </h2>

          <p className="text-base text-ink/75 max-w-[320px] mt-6 leading-relaxed">
            Answers for the 2027 edition. Details not yet confirmed by organizers are clearly identified.
          </p>
        </div>

        {/* Right Column: Accessible Accordion List */}
        <div className="border-t-2 border-ink">
          {faqData.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={item.q} className="border-b border-[#A8AAA1] py-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left font-bold text-lg md:text-xl text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral cursor-pointer"
                >
                  <span>{item.q}</span>
                  <span
                    className="font-sans text-2xl md:text-3xl leading-none shrink-0 transition-transform"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="text-base text-[#55584F] max-w-[590px] mt-3.5 mb-1 leading-relaxed animate-fade-in">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
