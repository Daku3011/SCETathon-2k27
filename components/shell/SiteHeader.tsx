"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/identity/Wordmark";
import { RegistrationStatus } from "@/components/registration/RegistrationStatus";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ArrowUpRight } from "@/components/ui/Icons";
import { usePageTransition } from "@/components/transitions/PageTransitionContext";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Challenges", href: "/problems" },
  { label: "Timeline", href: "/timeline" },
  { label: "Guidelines", href: "/guidelines" },
  { label: "FAQ", href: "/#faq" },
];

const secondaryNav = [
  { label: "Evaluation", href: "/evaluation" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/about#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { triggerTransition } = usePageTransition();

  const closeMenu = () => setMobileOpen(false);

  const handleNavClick = (
    href: string,
    label: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (href.startsWith("http")) return;

    const [targetPath, targetHash] = href.split("#");
    const isSamePage =
      !targetPath || targetPath === pathname || targetPath === "";

    if (isSamePage && targetHash) return;

    e.preventDefault();
    triggerTransition(href, label, e);
  };

  return (
    <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur-md border-b border-line">
      {/* Edition strip */}
      {/* <div className="hidden md:flex w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto h-9 items-center justify-between border-b border-line font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
        <div className="flex items-center gap-4">
          <span className="text-coral">SC / 27</span>
          <span className="h-3 w-px bg-line" aria-hidden="true" />
          <span>24-hour national hackathon</span>
          <span className="text-line-strong">/</span>
          <span>Surat, Gujarat</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-paper">Vol. 02 — 28 · 29 · 01 / 27</span>
          <ThemeToggle />
        </div>
      </div> */}

      {/* Masthead */}
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto min-h-[72px] md:min-h-[82px] flex items-center justify-between gap-5">
        <Wordmark
          href="/"
          size="md"
          onClick={(e) => {
            if (pathname !== "/") {
              e.preventDefault();
              triggerTransition("/", "SCETATHON", e);
            }
          }}
        />

        <nav
          className="hidden lg:flex items-center h-full gap-0 self-stretch"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, item.label, e)}
                className={`group relative flex items-center px-4 font-mono text-[11px] font-bold uppercase tracking-[0.13em] transition-colors p-8 ${
                  isActive ? "text-lime" : "text-muted hover:text-paper"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`mr-2 size-1.5 rotate-45 border transition-colors ${
                    isActive ? "border-lime bg-lime" : "border-line-strong group-hover:border-coral"
                  }`}
                  aria-hidden="true"
                />
                <span className="nav-label">{item.label}</span>
                {isActive && <span className="absolute bottom-0 left-4 right-4 h-px bg-lime" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <RegistrationStatus label="Registration" variant="nav" />
          </div>
          <button
            type="button"
            id="menuBtn"
            aria-expanded={mobileOpen}
            aria-controls="mobileMenu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden border border-line-strong size-11 flex items-center justify-center font-mono text-[15px] text-paper hover:border-lime hover:text-lime transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? "×" : "≡"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobileMenu"
          aria-label="Mobile navigation"
          className="lg:hidden absolute top-full inset-x-0 bg-ink border-b border-line px-[17px] md:px-[40px] py-8 animate-fade-in max-h-[calc(100dvh-80px)] overflow-y-auto"
        >
          <div className="grid grid-cols-1 gap-1 pb-6 border-b border-line">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(item.href, item.label, e);
                    closeMenu();
                  }}
                  className={`flex items-baseline gap-4 py-2 font-display text-[clamp(34px,10vw,56px)] uppercase leading-none tracking-tight ${
                    isActive ? "text-lime" : "text-paper hover:text-coral"
                  }`}
                >
                  <span className="font-mono text-[10px] text-muted tracking-widest shrink-0">
                    0{i + 1}
                  </span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 py-6">
            {secondaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(item.href, item.label, e);
                  closeMenu();
                }}
                className="inline-flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-lime py-1"
              >
                <span className="nav-label">{item.label}</span>
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.4} />
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-line">
            <RegistrationStatus
              label="Registration status"
              variant="primary"
              className="w-full justify-center"
            />
          </div>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;
