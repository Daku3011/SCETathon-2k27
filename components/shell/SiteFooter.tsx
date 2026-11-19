"use client";

import React from "react";
import Link from "next/link";
import { event } from "@/data/event";
import { ArrowUpRight, ArrowUp } from "@/components/ui/Icons";
import { usePageTransition } from "@/components/transitions/PageTransitionContext";

const directory = [
  { label: "The Event", href: "/about" },
  { label: "Guidelines", href: "/guidelines" },
  { label: "Challenges", href: "/problems" },
  { label: "Evaluation", href: "/evaluation" },
  { label: "Schedule", href: "/timeline" },
  { label: "Gallery", href: "/gallery" },
];

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
    <footer className="relative overflow-hidden bg-ink text-paper border-t border-line-strong">
      {/* Oversized ghost wordmark — the edition's closing signature. */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[6vw] select-none text-center font-display uppercase leading-[0.8] tracking-tight text-paper/[0.035] text-[clamp(90px,18vw,300px)]"
        aria-hidden="true"
      >
        SCETATHON
      </div>

      <div className="relative w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto pt-14 pb-8 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-10 lg:gap-16 pb-12 border-b border-line">
          <div>
            <span className="kicker">Colophon / 01</span>
            <p className="mt-4 font-display text-[clamp(34px,4.5vw,62px)] uppercase leading-[0.92] tracking-tight">
              SCETATHON<span className="text-coral">.</span>
              <br />
              <span className="text-lime">2027</span>
            </p>
            <p className="mt-5 max-w-xs font-mono text-[10px] leading-relaxed uppercase tracking-wider text-muted">
              {event.college}
              <br />
              {event.university}
              <br />
              Surat, Gujarat, India
            </p>
          </div>

          <div>
            <span className="kicker">Directory / 02</span>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {directory.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(item.href, item.label, e)}
                  className="group inline-flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-paper hover:text-lime transition-colors"
                >
                  <span className="nav-label">{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-lime" strokeWidth={2.4} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="kicker">Inquiries / 03</span>
            <div className="mt-4 space-y-4 font-mono text-[11px] uppercase tracking-wider text-muted">
              <p>
                <span className="block text-paper">General &amp; sponsorship</span>
                <a
                  href={`mailto:${event.email}`}
                  className="mt-1 inline-block text-lime underline decoration-line underline-offset-4 hover:text-coral transition-colors"
                >
                  {event.email}
                </a>
              </p>
              <p>
                <span className="block text-paper">Campus phone</span>
                {event.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <p>© 2027 SCETATHON 2.0 — Organized at SCET, Surat.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-paper transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-paper transition-colors">Terms</Link>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 border border-line-strong px-3 py-2 text-paper hover:border-lime hover:text-lime transition-colors"
            >
              Back to top
              <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
