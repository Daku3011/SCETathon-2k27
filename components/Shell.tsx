"use client";

import React from "react";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import SplashOverlay from "@/components/ui/SplashOverlay";
import { PageTransitionProvider } from "@/components/transitions/PageTransitionContext";
import { NetflixNavTransition } from "@/components/transitions/NetflixNavTransition";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionProvider>
      <div className="min-h-screen flex flex-col bg-ink text-paper antialiased">
        {/* Promotional Splash (shown once per session) */}
        <SplashOverlay />

        {/* Netflix-style Cinematic Navigation Transition */}
        <NetflixNavTransition />

        <a
          className="fixed left-3 -top-24 z-50 px-5 py-3 bg-lime text-[#171915] font-mono text-xs font-bold uppercase tracking-wider focus:top-3 transition-all outline-none focus:ring-4 focus:ring-coral"
          href="#main"
        >
          Skip to content
        </a>

        {/* Main Masthead Header */}
        <SiteHeader />

        {/* Page Content */}
        <main id="main" className="flex-1 w-full">
          {children}
        </main>

        {/* Site Footer */}
        <SiteFooter />
      </div>
    </PageTransitionProvider>
  );
}
