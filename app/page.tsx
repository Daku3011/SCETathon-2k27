import React from "react";
import type { Metadata } from "next";
import { event } from "@/data/event";
import { Hero } from "@/components/home/Hero";
import { FactsBand } from "@/components/home/FactsBand";
import { Manifesto } from "@/components/home/Manifesto";
import { Interlude } from "@/components/home/Interlude";
import { ChallengeBoard } from "@/components/home/ChallengeBoard";
import { BuildTimeline } from "@/components/home/BuildTimeline";
import { Experience } from "@/components/home/Experience";
import { Venue } from "@/components/home/Venue";
import { FAQs } from "@/components/home/FAQs";
import { ClosingCampaign } from "@/components/home/ClosingCampaign";

export const metadata: Metadata = {
  title: "SCETATHON 2.0 · Make What's Next · 28–29 January 2027",
  description:
    "An unapologetically hands-on 24-hour engineering hackathon at SCET, Surat. Where code meets chemistry, ambitious ideas become real prototypes, and the next generation gets to build.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description:
      "A 24-hour national student hackathon at SCET, Surat, bridging computer engineering and chemical process innovations into functional prototypes.",
    url: event.site,
    startDate: event.start || undefined,
    endDate: event.end || undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.college,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dr. R.K. Desai Marg, Athwalines",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        postalCode: "395001",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "EducationalOrganization",
      name: event.college,
      url: "https://scet.ac.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. Hero: MAKE WHAT'S NEXT + Signal Wheel */}
      <Hero />

      {/* 2. Facts Band: 24h, 3–5 team, 28 Jan, Surat */}
      <FactsBand />

      {/* 3. Section 01 / The Idea: LESS TALK. MORE MAKING. */}
      <Manifesto />

      {/* 4. Billboard Interlude: THE BEST IDEAS DON'T STAY IDEAS. */}
      <Interlude />

      {/* 5. Section 02 / Challenge Board: REAL PROBLEMS. OPEN MINDS. */}
      <ChallengeBoard />

      {/* 6. Section 03 / The Countdown: ONE DAY. ALL IN. */}
      <BuildTimeline />

      {/* 7. Section 04 / Experience: THE MAGIC IS IN THE MAKING. */}
      <Experience />

      {/* 8. Section 05 / Venue: NOT JUST ANYWHERE. SCET. */}
      <Venue />

      {/* 9. Section 06 / Need to Know: GOOD QUESTIONS. */}
      <FAQs />

      {/* 10. Closing Campaign: COME CURIOUS. LEAVE CHANGED. */}
      <ClosingCampaign />
    </>
  );
}
