import localFont from "next/font/local";
import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { event } from "@/data/event";
import "@/styles/globals.css";

const mono = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--mono",
  weight: "100 800",
});
export const metadata: Metadata = {
  metadataBase: new URL(event.site),
  title: { default: event.name, template: "%s | " + event.name },
  description: event.hero,
  openGraph: {
    type: "website",
    title: event.name,
    description: event.hero,
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
