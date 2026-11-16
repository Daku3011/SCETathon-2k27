"use client";

import React from "react";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-ink text-paper antialiased">
      <a
        className="fixed left-3 -top-24 z-50 px-5 py-3 bg-lime text-ink font-mono text-xs font-bold uppercase tracking-wider focus:top-3 transition-all outline-none focus:ring-4 focus:ring-coral"
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
  );
}
