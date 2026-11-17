"use client";

import React from "react";
import Link from "next/link";
import { event } from "@/data/event";
import { ArrowUpRight, ArrowUp } from "@/components/ui/Icons";
import { usePageTransition } from "@/components/transitions/PageTransitionContext";

export function SiteFooter() {
  const { triggerTransition } = usePageTransition();

  const handleLinkClick = (
    href: string,
    label: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (href.startsWith("http")) return;
    e.preventDefault();
    triggerTransition(href, label, e);
  };

  return (
    <footer className="bg-ink text-paper border-t border-white/[0.12] py-10 md:py-12">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto">
        {/* Top footer row: Host identity + Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/[0.12]">
          <div>
            <div className="font-display text-xl text-paper tracking-tight uppercase mb-2">
              SCETATHON<span className="text-lime">.</span>2027
            </div>
            <p className="font-mono text-[10px] leading-relaxed text-[#ADAEA7] uppercase">
              {event.college}
              <br />
              {event.university}
              <br />
              Surat, Gujarat, India
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-wider block mb-2.5">
              Platform Directory
            </span>
            <div className="grid grid-cols-2 gap-y-1.5 font-mono text-[10px] uppercase text-[#C6C8BE]">
              <Link
                href="/about"
                onClick={(e) => handleLinkClick("/about", "About", e)}
                className="inline-flex items-center gap-1 hover:text-lime transition-colors"
              >
                <span>The Event</span>
                <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.4} />
              </Link>
              <Link
                href="/guidelines"
                onClick={(e) => handleLinkClick("/guidelines", "Guidelines", e)}
                className="inline-flex items-center gap-1 hover:text-lime transition-colors"
              >
                <span>Guidelines</span>
                <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.4} />
              </Link>
              <Link
                href="/problems"
                onClick={(e) => handleLinkClick("/problems", "Challenges", e)}
                className="inline-flex items-center gap-1 hover:text-lime transition-colors"
              >
                <span>Challenges</span>
                <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.4} />
              </Link>
              <Link
                href="/evaluation"
                onClick={(e) => handleLinkClick("/evaluation", "Evaluation", e)}
                className="inline-flex items-center gap-1 hover:text-lime transition-colors"
              >
                <span>Evaluation</span>
                <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.4} />
              </Link>
              <Link
                href="/timeline"
                onClick={(e) => handleLinkClick("/timeline", "Timeline", e)}
                className="inline-flex items-center gap-1 hover:text-lime transition-colors"
              >
                <span>Schedule</span>
                <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.4} />
              </Link>
              <Link
                href="/gallery"
                onClick={(e) => handleLinkClick("/gallery", "Gallery", e)}
                className="inline-flex items-center gap-1 hover:text-lime transition-colors"
              >
                <span>Archive</span>
                <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] text-coral font-bold uppercase tracking-wider block mb-2.5">
              Direct Inquiries
            </span>
            <p className="font-mono text-[10px] leading-relaxed text-[#ADAEA7] uppercase mb-2">
              General &amp; Sponsorship:
              <br />
              <a
                href={`mailto:${event.email}`}
                className="text-paper underline underline-offset-4 hover:text-lime transition-colors"
              >
                {event.email}
              </a>
            </p>
            <p className="font-mono text-[10px] text-[#7A7C75] uppercase">
              Campus Phone: {event.phone}
            </p>
          </div>
        </div>

        {/* Bottom row: Legal & back to top */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[#93958E] font-mono text-[10px] uppercase tracking-wide">
          <p>© 2027 SCETATHON 2.0 · Organized at SCET, Surat.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="underline underline-offset-4 hover:text-paper">
              Privacy Notice
            </Link>
            <Link href="/terms" className="underline underline-offset-4 hover:text-paper">
              Terms &amp; Conduct
            </Link>
            <a href="#top" className="inline-flex items-center gap-1 underline underline-offset-4 text-lime hover:text-white">
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
