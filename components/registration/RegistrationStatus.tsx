"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { event } from "@/data/event";
import { isSupabaseConfigured } from "@/lib/supabase";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/components/ui/primitives";

interface RegistrationStatusProps {
  label?: string;
  variant?: "primary" | "nav" | "text";
  className?: string;
}

const triggerBase =
  "inline-flex min-h-11 items-center justify-between gap-3 border border-coral bg-coral px-4 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-lime hover:bg-lime";

export function RegistrationStatus({
  label = "Register",
  variant = "primary",
  className = "",
}: RegistrationStatusProps) {
  const [open, setOpen] = useState(false);

  const isDirect =
    isSupabaseConfigured && event.registrationOpen && Boolean(event.form);

  if (isDirect) {
    return (
      <a
        href={event.form}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          triggerBase,
          variant === "nav" && "min-h-9 px-3",
          variant === "text" && "border-0 bg-transparent p-0 text-coral hover:bg-transparent hover:text-lime underline underline-offset-4",
          className
        )}
      >
        <span>{label}</span>
        <ArrowUpRight strokeWidth={2.4} className="w-3.5 h-3.5" />
      </a>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            triggerBase,
            variant === "nav" && "min-h-9 px-3",
            variant === "text" && "border-0 bg-transparent p-0 text-coral hover:bg-transparent hover:text-lime underline underline-offset-4",
            className
          )}
        >
          <span className="size-1.5 rotate-45 bg-ink" aria-hidden="true" />
          <span>{label}</span>
          <ArrowUpRight strokeWidth={2.4} className="w-3.5 h-3.5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 w-[calc(100%-32px)] max-w-[500px] -translate-x-1/2 -translate-y-1/2 border border-line-strong bg-surface p-7 md:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.7)] focus:outline-none"
          aria-describedby="status-dialog-description"
        >
          <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
            <span>SCETATHON / NOTICE 01</span>
            <Dialog.Close
              className="flex size-8 items-center justify-center border border-line-strong text-paper hover:border-coral hover:text-coral"
              aria-label="Close dialog"
            >
              ×
            </Dialog.Close>
          </div>

          <Dialog.Title className="mt-6 font-display text-[clamp(38px,7vw,60px)] uppercase leading-[0.9] tracking-tight text-paper">
            Registration
            <br />
            <span className="text-coral">is not live.</span>
          </Dialog.Title>

          <div id="status-dialog-description" className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
            <p>
              The official 2027 registration portal has not been enabled in this prototype. No participant details are collected here.
            </p>
            <p>Check back for the organizers' published registration link and verified participation guidelines.</p>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <Dialog.Close className="flex w-full min-h-12 items-center justify-between border border-coral bg-coral px-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-lime hover:bg-lime">
              Understood
              <ArrowUpRight strokeWidth={2.4} className="w-3.5 h-3.5" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default RegistrationStatus;
