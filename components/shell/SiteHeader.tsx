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

    // If clicking a hash on the current page, let default smooth scroll handle it
    if (isSamePage && targetHash) {
      return;
    }

    e.preventDefault();
    triggerTransition(href, label, e);
  };

  return (
    <>
      {/* Sticky Masthead Header */}
      <header className="sticky top-0 z-30 bg-ink/95 border-b border-line backdrop-blur-md">
        <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto min-h-[68px] md:min-h-[74px] flex items-center justify-between gap-4.5">
          {/* Brand mark */}
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

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, item.label, e)}
                  className={`font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition-colors py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral ${
                    isActive
                      ? "text-lime border-b border-lime"
                      : "text-paper hover:text-lime"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Registration status button, Theme toggle & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <RegistrationStatus label="REGISTRATION STATUS" variant="nav" />
            </div>

            <ThemeToggle />

            <button
              type="button"
              id="menuBtn"
              aria-expanded={mobileOpen}
              aria-controls="mobileMenu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden border border-line bg-transparent text-paper px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider hover:border-lime hover:text-lime transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral cursor-pointer"
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
            className="lg:hidden absolute top-full left-0 right-0 bg-ink border-b border-line px-6 py-6 pb-8 flex flex-col gap-5 shadow-2xl animate-fade-in"
          >
            <div className="flex flex-col gap-3.5 pb-4 border-b border-line">
              <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-widest">
                Main Sections
              </span>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      closeMenu();
                      handleNavClick(item.href, item.label, e);
                    }}
                    className={`font-mono text-xs font-bold uppercase tracking-wider py-1 flex items-center justify-between ${
                      isActive ? "text-lime" : "text-paper hover:text-lime"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="font-mono text-[9px] text-lime font-bold">
                        ● CURRENT
                      </span>
                    )}
                  </Link>
                );
              })}
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
                    onClick={(e) => {
                      closeMenu();
                      handleNavClick(item.href, item.label, e);
                    }}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-lime py-1 uppercase"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.4} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <RegistrationStatus
                label="Registration status"
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
