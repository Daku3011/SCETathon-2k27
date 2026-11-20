"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { event } from "@/data/event";
import { isSupabaseConfigured } from "@/lib/supabase";
import { ArrowUpRight } from "@/components/ui/Icons";

interface RegistrationStatusProps {
  label?: string;
  variant?: "primary" | "nav" | "text";
  className?: string;
}

export function RegistrationStatus({
  label = "Register",
  variant = "primary",
  className = "",
}: RegistrationStatusProps) {
  const [open, setOpen] = useState(false);

  // If Supabase is configured AND registration is open, direct to form
  const isDirect = isSupabaseConfigured && event.registrationOpen && Boolean(event.form);

  if (isDirect) {
    return (
      <a
        href={event.form}
        target="_blank"
        rel="noopener noreferrer"
        className={
          variant === "primary"
            ? `inline-flex items-center justify-between gap-4 bg-lime text-[#171915] font-mono text-[11px] font-bold uppercase tracking-wide py-3.5 px-5 hover:brightness-105 transition-[filter,transform] hover:-translate-y-0.5 active:translate-y-0 ${className}`
            : variant === "nav"
            ? `inline-flex items-center justify-between gap-3 bg-lime text-[#171915] font-mono text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 hover:brightness-105 transition-[filter] ${className}`
            : `font-mono text-[11px] font-bold uppercase tracking-wider text-lime underline underline-offset-4 hover:text-paper transition-colors ${className}`
        }
      >
        <span>{label}</span>
        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
      </a>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {variant === "primary" ? (
          <button
            type="button"
            className={`inline-flex items-center justify-between gap-4 bg-lime text-[#171915] font-mono text-[11px] font-bold uppercase tracking-wide py-3.5 px-5 hover:brightness-105 transition-[filter,transform] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-coral focus-visible:outline-offset-4 cursor-pointer ${className}`}
          >
            <span>{label}</span>
            <span
              className="inline-flex items-center justify-center w-7 h-7 border border-current rounded-full transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
            </span>
          </button>
        ) : variant === "nav" ? (
          <button
            type="button"
            className={`inline-flex items-center justify-between gap-2.5 bg-lime text-[#171915] font-mono text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 hover:brightness-105 transition-[filter] focus-visible:outline focus-visible:outline-3 focus-visible:outline-coral cursor-pointer ${className}`}
          >
            <span>{label}</span>
            <ArrowUpRight className="w-3 h-3" strokeWidth={2.4} />
          </button>
        ) : (
          <button
            type="button"
            className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-lime underline underline-offset-4 hover:text-paper transition-colors cursor-pointer ${className}`}
          >
            <span>{label}</span>
            <ArrowUpRight className="w-3 h-3" strokeWidth={2.4} />
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-md animate-fade-in" />
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-[470px] bg-surface text-paper border border-line-strong p-7 md:p-9 shadow-[0_25px_120px_rgba(0,0,0,0.35)] focus:outline-none"
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

          <div id="status-dialog-description" className="space-y-3 text-sm md:text-base text-muted leading-relaxed">
            <p>
              The official 2027 registration portal has not been enabled in this prototype. No participant details are collected here.
            </p>
            <p>
              Check back for the organizers' published registration link and verified participation guidelines.
            </p>
          </div>

          <div className="mt-7 pt-4 border-t border-line flex flex-col gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="w-full bg-lime text-[#171915] font-mono text-[11px] font-bold uppercase tracking-wider py-3.5 px-5 flex items-center justify-between hover:brightness-105 transition-[filter] cursor-pointer focus-visible:outline focus-visible:outline-3 focus-visible:outline-coral"
              >
                <span>GOT IT</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default RegistrationStatus;
