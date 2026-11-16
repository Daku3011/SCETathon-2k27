import Hero from "@/components/sections/Hero";
import HomeSections from "@/components/sections/HomeSections";
import { event } from "@/data/event";
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.name,
            description: event.hero,
            url: event.site,
            startDate: event.start || undefined,
            endDate: event.end || undefined,
            location: {
              "@type": "Place",
              name: event.college,
              address: event.venue,
            },
            organizer: {
              "@type": "CollegeOrUniversity",
              name: event.college,
              url: "https://scet.ac.in",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <HomeSections />
    </>
  );
}
