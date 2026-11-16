import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { event } from "@/data/event";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(event.site),
  title: {
    default: `${event.name} · ${event.displayDate} · SCET Surat`,
    template: `%s | ${event.name}`,
  },
  description: `${event.name} (${event.displayDate}) is a 24-hour student hackathon at ${event.college}, Surat. Student squads build working prototypes for real-world challenge tracks.`,
  keywords: [
    "SCETATHON",
    "SCET Surat Hackathon",
    "Sarvajanik University",
    "24 hour hackathon",
    "student hackathon 2027",
    "Gujarat engineering hackathon",
    "SCET",
  ],
  authors: [{ name: event.college, url: "https://scet.ac.in" }],
  openGraph: {
    type: "website",
    title: `${event.name} · ${event.displayDate}`,
    description: event.hero,
    url: event.site,
    siteName: event.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${event.name} · ${event.displayDate}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${event.name} · ${event.displayDate}`,
    description: event.hero,
    images: ["/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Working tokens: Archivo Black for date numerals & short headings; Source Sans 3 for navigation & prose; IBM Plex Mono for time & problem IDs */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Source+Sans+3:ital,wght@0,300..800;1,300..800&display=swap"
        />
      </head>
      <body className="bg-[#F5EFE2] text-[#182239] antialiased selection:bg-[#172C67] selection:text-[#F5EFE2]">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
