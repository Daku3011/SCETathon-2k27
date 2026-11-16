"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { event, isPublishedRoute } from "@/data/event";
import { Register } from "./ui/Register";
import { MandanaBorderTile } from "./ui/SVGs";

const desktopNavigation = [
  ["Programme", "#programme"],
  ["Problems", "#problems"],
  ["Gallery", "#gallery"],
] as const;

const drawerPrimaryNavigation = [
  ["Programme", "#programme"],
  ["Problems", "#problems"],
  ["Gallery", "#gallery"],
] as const;

const drawerSecondaryNavigation = [
  ["Rules", "/guidelines"],
  ["Evaluation", "/evaluation"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
] as const;

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const toDestination = (destination: string) =>
    destination.startsWith("#") && pathname !== "/"
      ? `/${destination}`
      : destination;

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#172C67] focus:text-[#F5EFE2] focus:outline focus:outline-[3px] focus:outline-[#F5EFE2] focus:outline-offset-[3px] focus:rounded-[2px]"
        href="#main"
      >
        Skip to content
      </a>

      {/* 1. Masthead and Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[#F5EFE2]/95 backdrop-blur-md border-b border-[#182239]/15 select-none" id="top">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand: SCET Crest + College Name */}
          <Link
            className="flex items-center gap-3.5 focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] rounded-[2px]"
            href="/"
            aria-label="SCETATHON 2.0 home"
          >
            <div className="w-10 h-10 shrink-0 relative">
              <Image
                src="/archive/scet.png"
                alt="Sarvajanik College of Engineering & Technology crest"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-[#182239] leading-tight">
                Sarvajanik College
              </span>
              <span className="text-xs text-[#182239]/70 leading-tight">
                of Engineering &amp; Technology · Surat
              </span>
            </div>
          </Link>

          {/* Desktop Navigation: Programme, Problems, Gallery, and Register */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Desktop primary navigation">
            {desktopNavigation.map(([label, href]) => (
              <Link
                key={href}
                href={toDestination(href)}
                className="text-base font-medium text-[#182239] hover:text-[#963E29] transition-colors focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] rounded-[2px]"
              >
                {label}
              </Link>
            ))}
            <Register text="Register" />
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center">
            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  ref={menuTriggerRef}
                  type="button"
                  aria-label="Menu"
                  className="min-h-[44px] min-w-[44px] px-3.5 py-2 flex items-center gap-2 border border-[#182239] text-[#182239] font-semibold text-sm bg-[#F5EFE2] rounded-[2px] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#172C67]" aria-hidden="true" />
                  Menu
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-[#182239]/50 backdrop-blur-sm menu-drawer-overlay" />
                <Dialog.Content
                  className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#F5EFE2] text-[#182239] p-6 flex flex-col justify-between shadow-2xl border-l border-[#182239]/20 focus:outline-none menu-drawer-content"
                  aria-describedby={undefined}
                  onEscapeKeyDown={() => menuTriggerRef.current?.focus()}
                >
                  <div>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#182239]/15">
                      <div className="flex items-center gap-2.5">
                        <Image
                          src="/archive/scet.png"
                          alt="SCET Crest"
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                        <Dialog.Title className="font-display text-lg font-bold text-[#182239]">
                          Navigation
                        </Dialog.Title>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center font-bold text-sm text-[#182239] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] rounded-[2px]"
                          aria-label="Close menu"
                        >
                          ✕
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Primary Destinations */}
                    <div className="py-6 border-b border-[#182239]/15">
                      <span className="block font-mono text-xs uppercase tracking-wider text-[#182239]/60 mb-3">
                        Event Programme
                      </span>
                      <nav className="flex flex-col gap-3" aria-label="Mobile primary destinations">
                        {drawerPrimaryNavigation.map(([label, href], idx) => (
                          <Link
                            key={href}
                            href={toDestination(href)}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-between py-2 text-xl font-display font-semibold text-[#182239] hover:text-[#963E29] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] rounded-[2px]"
                          >
                            <span>{label}</span>
                            <span className="font-mono text-xs text-[#182239]/40">
                              0{idx + 1}
                            </span>
                          </Link>
                        ))}
                      </nav>
                      <div className="mt-4 pt-2">
                        <Register text="Register" className="w-full" />
                      </div>
                    </div>

                    {/* Secondary Destinations */}
                    <div className="py-6">
                      <span className="block font-mono text-xs uppercase tracking-wider text-[#182239]/60 mb-3">
                        Reference & Details
                      </span>
                      <nav className="flex flex-col gap-2.5" aria-label="Mobile secondary destinations">
                        {drawerSecondaryNavigation.map(([label, href]) => (
                          <Link
                            key={href}
                            href={toDestination(href)}
                            onClick={() => setMenuOpen(false)}
                            className="py-1.5 text-base font-medium text-[#182239]/80 hover:text-[#182239] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] rounded-[2px]"
                          >
                            {label}
                          </Link>
                        ))}
                        {isPublishedRoute("/results") && (
                          <Link
                            href="/results"
                            onClick={() => setMenuOpen(false)}
                            className="py-1.5 text-base font-medium text-[#182239]/80 hover:text-[#182239]"
                          >
                            Results
                          </Link>
                        )}
                        {isPublishedRoute("/winners") && (
                          <Link
                            href="/winners"
                            onClick={() => setMenuOpen(false)}
                            className="py-1.5 text-base font-medium text-[#182239]/80 hover:text-[#182239]"
                          >
                            Winners
                          </Link>
                        )}
                      </nav>
                    </div>
                  </div>

                  {/* Drawer Footer info */}
                  <div className="pt-4 border-t border-[#182239]/15">
                    <p className="font-mono text-xs text-[#182239]/70">
                      28–29 January 2027 · SCET Surat
                    </p>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main">{children}</main>

      {/* 7. Footer */}
      <footer className="w-full bg-[#172C67] text-[#F5EFE2] pt-16 select-none" id="contact">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Top section: Wordmark + Date + Organiser */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#F5EFE2]/15">
            <div className="md:col-span-6 space-y-4">
              <Link href="/" aria-label="SCETATHON 2.0 home">
                <Image
                  src="/brand/scetathon.webp"
                  alt="SCETATHON 2.0 Wordmark"
                  width={340}
                  height={76}
                  className="h-auto max-w-[280px] sm:max-w-[340px]"
                />
              </Link>
              <p className="font-display text-xl sm:text-2xl text-[#F5EFE2] font-semibold">
                28–29 January 2027
              </p>
              <p className="text-sm sm:text-base text-[#F5EFE2]/80 max-w-md">
                Organised at Sarvajanik College of Engineering &amp; Technology, Surat, Gujarat.
              </p>
              <div className="pt-2">
                <Register
                  text="Register"
                  className="!bg-[#F5EFE2] !text-[#172C67] hover:!bg-[#F5EFE2]/90 focus:!outline-[#F5EFE2]"
                />
              </div>
            </div>

            {/* Quick Links & Verified Contact */}
            <div className="md:col-span-3 space-y-3 font-medium">
              <span className="block font-mono text-xs uppercase tracking-wider text-[#F5EFE2]/50 mb-2">
                Navigation & Maps
              </span>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={event.map}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F5EFE2] text-[#F5EFE2]/80 underline underline-offset-4 focus:outline focus:outline-[3px] focus:outline-[#F5EFE2] focus:outline-offset-[3px] rounded-[2px]"
                  >
                    SCET Campus, Surat ↗
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${event.email}`}
                    className="hover:text-[#F5EFE2] text-[#F5EFE2]/80 underline underline-offset-4 focus:outline focus:outline-[3px] focus:outline-[#F5EFE2] focus:outline-offset-[3px] rounded-[2px]"
                  >
                    {event.email}
                  </a>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-[#F5EFE2] text-[#F5EFE2]/80 underline underline-offset-4 focus:outline focus:outline-[3px] focus:outline-[#F5EFE2] focus:outline-offset-[3px] rounded-[2px]"
                  >
                    Privacy notice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-[#F5EFE2] text-[#F5EFE2]/80 underline underline-offset-4 focus:outline focus:outline-[3px] focus:outline-[#F5EFE2] focus:outline-offset-[3px] rounded-[2px]"
                  >
                    Terms of use
                  </Link>
                </li>
                <li>
                  <a
                    href="#top"
                    className="hover:text-[#F5EFE2] text-[#F5EFE2]/80 underline underline-offset-4 focus:outline focus:outline-[3px] focus:outline-[#F5EFE2] focus:outline-offset-[3px] rounded-[2px]"
                  >
                    Back to top ↑
                  </a>
                </li>
              </ul>
            </div>

            {/* Colophon & Artistic Influences */}
            <div className="md:col-span-3 space-y-3 text-xs text-[#F5EFE2]/70 leading-relaxed">
              <span className="block font-mono text-xs uppercase tracking-wider text-[#F5EFE2]/50 mb-2">
                Colophon & Art Direction
              </span>
              <p>
                Art directed as a campus poster unfolding into an event programme.
              </p>
              <p>
                Linework draws inspiration from the Mandana tradition of geometric floor and wall art (doubled contours, comb strokes and chalk diamonds on earth ground).
              </p>
              <p className="font-mono text-[11px] text-[#F5EFE2]/50">
                SCET is the Surat host. Original breadboard technical drawing and linework hand-authored for SCETATHON 2.0.
              </p>
            </div>
          </div>
        </div>

        {/* Textile-like Mandana Border beneath the information */}
        <MandanaBorderTile />

        {/* Traditional Red-Ochre (Geru #963E29) band with chalk linework */}
        <div className="w-full bg-[#963E29] py-3 text-center px-4 border-t border-[#F5EFE2]/20">
          <p className="font-mono text-[11px] text-[#F5EFE2]/90 tracking-wider">
            SCETATHON 2.0 · 28–29 JANUARY 2027 · SARVAJANIK COLLEGE OF ENGINEERING &amp; TECHNOLOGY, SURAT
          </p>
        </div>
      </footer>
    </>
  );
}
