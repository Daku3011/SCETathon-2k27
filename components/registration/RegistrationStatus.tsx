"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { event } from "@/data/event";
import { isSupabaseConfigured } from "@/lib/supabase";

interface RegistrationStatusProps {
  label?: string;
  variant?: "primary" | "nav" | "link";
  className?: string;
}

export function RegistrationStatus({
  label = "REGISTRATION UPDATES",
  variant = "primary",
  className = "",
}: RegistrationStatusProps) {
  const [open, setOpen] = useState(false);
  const isActuallyLive = Boolean(event.form && event.registrationOpen && isSupabaseConfigured);

  if (isActuallyLive && event.form) {
    return (
      <a
        href={event.form}
        target="_blank"
        rel="noopener noreferrer"
        className={
          variant === "primary"
            ? `inline-flex items-center justify-between gap-4 bg-lime text-ink font-mono text-[11px] font-bold uppercase tracking-wide py-3.5 px-5 hover:bg-[#f0ffad] transition-all hover:-translate-y-0.5 active:translate-y-0 ${className}`
            : variant === "nav"
            ? `inline-flex items-center justify-between gap-3 bg-lime text-ink font-mono text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 hover:bg-[#f0ffad] transition-all ${className}`
            : `font-mono text-[11px] font-bold uppercase tracking-wider text-lime underline underline-offset-4 hover:text-white transition-colors ${className}`
        }
      >
        <span>{label}</span>
        <span aria-hidden="true" className="text-sm">↗</span>
      </a>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {variant === "primary" ? (
          <button
            type="button"
            className={`inline-flex items-center justify-between gap-4 bg-lime text-ink font-mono text-[11px] font-bold uppercase tracking-wide py-3.5 px-5 hover:bg-[#f0ffad] transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-coral focus-visible:outline-offset-4 cursor-pointer ${className}`}
          >
            <span>{label}</span>
            <span
              className="inline-flex items-center justify-center w-7 h-7 border border-current rounded-full text-[15px] transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </button>
        ) : variant === "nav" ? (
          <button
            type="button"
            className={`inline-flex items-center justify-between gap-3 bg-lime text-ink font-mono text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 hover:bg-[#f0ffad] transition-all focus-visible:outline focus-visible:outline-3 focus-visible:outline-coral cursor-pointer ${className}`}
          >
            <span>{label}</span>
            <span aria-hidden="true" className="text-xs">↗</span>
          </button>
        ) : (
          <button
            type="button"
            className={`font-mono text-[11px] font-bold uppercase tracking-wider text-lime underline underline-offset-4 hover:text-white transition-colors cursor-pointer ${className}`}
          >
            <span>{label}</span>
            <span aria-hidden="true" className="ml-1 text-xs">↗</span>
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#090909]/85 backdrop-blur-md animate-fade-in" />
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-[470px] bg-[#222320] text-paper border border-[#66696A] p-7 md:p-9 shadow-[0_25px_120px_rgba(0,0,0,0.7)] focus:outline-none"
          aria-describedby="status-dialog-description"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[11px] font-bold text-lime uppercase tracking-wider">
              SCETATHON 2.0 / STATUS
            </span>
            <Dialog.Close asChild>
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center text-paper/70 hover:text-paper font-mono text-xl transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
                aria-label="Close dialog"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Title className="font-display text-[32px] md:text-[44px] leading-[0.95] tracking-tight uppercase text-paper mb-4">
            REGISTRATION<br />IS NOT LIVE.
          </Dialog.Title>

          <div id="status-dialog-description" className="space-y-3 text-sm md:text-base text-[#BCBFB7] leading-relaxed">
            <p>
              The official 2027 registration portal has not been enabled in this prototype. No participant details are collected here.
            </p>
            <p>
              Check back for the organizers' published registration link and verified participation guidelines.
            </p>
          </div>

          <div className="mt-7 pt-4 border-t border-white/10 flex flex-col gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="w-full bg-lime text-ink font-mono text-[11px] font-bold uppercase tracking-wider py-3.5 px-5 flex items-center justify-between hover:bg-[#f0ffad] transition-all cursor-pointer focus-visible:outline focus-visible:outline-3 focus-visible:outline-coral"
              >
                <span>GOT IT</span>
                <span aria-hidden="true">↗</span>
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default RegistrationStatus;
