"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/identity/Wordmark";
import { RegistrationStatus } from "@/components/registration/RegistrationStatus";

const navItems = [
  { label: "The idea", hash: "#about", fallbackHref: "/about" },
  { label: "Challenges", hash: "#challenges", fallbackHref: "/problems" },
  { label: "The 24h", hash: "#schedule", fallbackHref: "/timeline" },
  { label: "Experience", hash: "#experience", fallbackHref: "/about" },
  { label: "FAQ", hash: "#faq", fallbackHref: "/#faq" },
];

const secondaryNav = [
  { label: "Guidelines", href: "/guidelines" },
  { label: "Evaluation", href: "/evaluation" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getHref = (hash: string, fallback: string) => {
    if (pathname === "/") return hash;
    return fallback;
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      {/* 1. Acid-Lime Campaign Topline */}
      {/* <div className="bg-lime text-ink h-8 flex items-center justify-between gap-4 px-4 md:px-10 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider select-none z-40 relative">
        <span className="flex items-center gap-2">
          <span>SCETATHON 2.0</span>
          <span aria-hidden="true">✳</span>
          <span className="hidden sm:inline">THE NEXT GENERATION BUILDS HERE</span>
        </span>
        <span className="text-right">SURAT, INDIA / JAN 28–29, 2027</span>
      </div> */}

      {/* 2. Sticky Masthead */}
      <header className="sticky top-0 z-30 bg-[#111210]/95 border-b border-white/[0.19] backdrop-blur-md">
        <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto min-h-[68px] md:min-h-[74px] flex items-center justify-between gap-4.5">
          {/* Brand mark */}
          <Wordmark href="/" size="md" />

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={getHref(item.hash, item.fallbackHref)}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#E4E5DE] hover:text-lime transition-colors py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Registration status button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <RegistrationStatus label="REGISTRATION STATUS" variant="nav" />
            </div>

            <button
              type="button"
              id="menuBtn"
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden border border-white/[0.19] bg-transparent text-paper px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider hover:border-lime hover:text-lime transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral cursor-pointer"
            >
              {mobileOpen ? "CLOSE ×" : "MENU ☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <nav
            id="mobileMenu"
            aria-label="Mobile navigation"
            className="lg:hidden absolute top-full left-0 right-0 bg-[#111210] border-b border-white/[0.19] px-6 py-6 pb-8 flex flex-col gap-5 shadow-2xl animate-fade-in"
          >
            <div className="flex flex-col gap-3.5 pb-4 border-b border-white/10">
              <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-widest">
                Main Sections
              </span>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={getHref(item.hash, item.fallbackHref)}
                  onClick={closeMenu}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-paper hover:text-lime py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 pb-2">
              <span className="font-mono text-[10px] text-muted font-bold uppercase tracking-widest">
                Information &amp; Rules
              </span>
              <div className="grid grid-cols-2 gap-2">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="font-mono text-[11px] text-[#C6C8BE] hover:text-lime py-1 uppercase"
                  >
                    {item.label} ↗
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <RegistrationStatus
                label="Registration status ↗"
                variant="primary"
                className="w-full justify-center"
              />
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export default SiteHeader;
