import React from "react";
import type { Metadata } from "next";
import { event } from "@/data/event";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Privacy statement and data handling principles for SCETATHON 2.0 at SCET, Surat.",
};

export default function PrivacyPage() {
  return (
    <article className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto py-12 md:py-20 max-w-4xl">
      <PageHeader
        tag="10 / Legal & Privacy"
        title={
          <>
            PRIVACY <span className="text-lime">NOTICE.</span>
          </>
        }
        subtitle="Transparent data collection, hosting privacy, and retention policies for SCETATHON 2.0."
      />

      <div className="p-8 md:p-12 bg-surface border border-line space-y-8 text-base md:text-lg text-muted leading-relaxed">
        <div>
          <h2 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
            No Tracking &amp; Minimal Data
          </h2>
          <p>
            You can browse this official SCETATHON 2.0 platform without creating an account or submitting personal credentials. Search terms and challenge filters stay in your local browser session and are not uploaded to analytics tracking servers.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
            Hosting &amp; Embedded Maps
          </h2>
          <p>
            This event website is hosted securely. Campus location maps load directly from Google Maps, subject to Google's standard privacy terms. No personal telemetry or user credentials are transmitted without explicit consent.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
            Secretariat Contact
          </h2>
          <p>
            For privacy inquiries regarding SCETATHON 2.0, contact the organizing team at:{" "}
            <a
              href={`mailto:${event.email}`}
              className="text-lime underline underline-offset-4 font-mono font-bold"
            >
              {event.email}
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}
