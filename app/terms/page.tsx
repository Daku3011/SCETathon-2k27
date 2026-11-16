import React from "react";
import type { Metadata } from "next";
import { event } from "@/data/event";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Participation",
  description: "Terms of use and participation principles for SCETATHON 2.0 at SCET, Surat.",
};

export default function TermsPage() {
  return (
    <article className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20 max-w-4xl">
      <PageHeader
        tag="11 / Terms of Use"
        title={
          <>
            TERMS <span className="text-lime">&amp;</span> CONDUCT.
          </>
        }
        subtitle="Operational terms, IP governance, and campus participation standards for SCETATHON 2.0."
      />

      <div className="p-8 md:p-12 bg-[#191A18] border border-white/[0.19] space-y-8 text-base md:text-lg text-[#C6C8BE] leading-relaxed">
        <div>
          <h2 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
            Event Information Only
          </h2>
          <p>
            This public platform provides event information, problem tracks, and schedule details for SCETATHON 2.0 (28–29 January 2027 at Sarvajanik College of Engineering &amp; Technology, Surat). Exploring a challenge or checking status does not constitute official squad enrollment until verified registration occurs.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
            Institutional Marks &amp; IP
          </h2>
          <p>
            The SCET college crest, event identity marks, and archive photography are the intellectual property of Sarvajanik University and SCET Surat. Reproduction or unauthorized commercial exploitation is prohibited.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
            Safety &amp; Lab Conduct
          </h2>
          <p>
            All shortlisted student squads are required to adhere to campus laboratory safety standards, respect intellectual property, and follow ethical engineering guidelines during the 24-hour sprint.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 font-mono text-sm text-[#93958E]">
          Official Inquiries:{" "}
          <a
            href={`mailto:${event.email}`}
            className="text-lime underline underline-offset-4 font-bold"
          >
            {event.email}
          </a>
        </div>
      </div>
    </article>
  );
}
