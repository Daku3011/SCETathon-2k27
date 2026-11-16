import React from "react";
import Link from "next/link";
import { event } from "@/data/event";

export function SiteFooter() {
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
              <Link href="/about" className="hover:text-lime transition-colors">
                The Event ↗
              </Link>
              <Link href="/guidelines" className="hover:text-lime transition-colors">
                Guidelines ↗
              </Link>
              <Link href="/problems" className="hover:text-lime transition-colors">
                Challenges ↗
              </Link>
              <Link href="/evaluation" className="hover:text-lime transition-colors">
                Evaluation ↗
              </Link>
              <Link href="/timeline" className="hover:text-lime transition-colors">
                Schedule ↗
              </Link>
              <Link href="/gallery" className="hover:text-lime transition-colors">
                Archive ↗
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
            <a href="#top" className="underline underline-offset-4 text-lime hover:text-white">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
