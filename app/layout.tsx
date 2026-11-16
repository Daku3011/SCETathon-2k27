import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { event } from "@/data/event";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(event.site),
  title: {
    default: `${event.name} · Make What's Next · 28–29 January 2027`,
    template: `%s | ${event.name}`,
  },
  description: `${event.name} (${event.displayDate}) is a 24-hour engineering hackathon at ${event.college}, Surat. Student squads build working prototypes for real-world challenge tracks.`,
  keywords: [
    "SCETATHON",
    "SCETATHON 2.0",
    "SCET Surat Hackathon",
    "Sarvajanik University",
    "24 hour hackathon",
    "student hackathon 2027",
    "Gujarat engineering hackathon",
    "SCET",
    "Computer Engineering",
    "Chemical Engineering",
  ],
  authors: [{ name: event.college, url: "https://scet.ac.in" }],
  openGraph: {
    type: "website",
    title: `${event.name} · Make What's Next · ${event.displayDate}`,
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
    title: `${event.name} · Make What's Next · ${event.displayDate}`,
    description: event.hero,
    images: ["/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#111210" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-paper font-body antialiased selection:bg-lime selection:text-ink">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
