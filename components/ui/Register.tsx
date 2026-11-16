"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { event } from "@/data/event";
import { isSupabaseConfigured } from "@/lib/supabase";

type RegisterProps = {
  text?: string;
  className?: string;
};

export function Register({ text = "Register", className = "" }: RegisterProps) {
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [completionMessage, setCompletionMessage] = useState("");
  const canRegister = Boolean(event.form && event.registrationOpen && isSupabaseConfigured);

  useEffect(() => {
    if (!open) return;

    setSeconds(5);
    setCompletionMessage("");
    const timeout = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timeout);
          setCompletionMessage("Registration preview complete.");
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timeout);
  }, [open]);

  if (canRegister) {
    return (
      <a className={`register-button ${className}`} href={event.form} target="_blank" rel="noreferrer">
        {text}
      </a>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className={`register-button ${className}`}>
          {text}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="registration-dialog" aria-describedby="registration-description">
          <div className="dialog-topline">
            <span>SCETATHON 2.0</span>
            <Dialog.Close className="dialog-close" aria-label="Close registration preview">
              Close <span aria-hidden="true">×</span>
            </Dialog.Close>
          </div>
          <Dialog.Title>Registration preview</Dialog.Title>
          <p id="registration-description">
            Registration details will be announced here.
          </p>

          <div className="preview-countdown" aria-label={`Five-second demo countdown: ${seconds} seconds remaining`}>
            <span>Five-second demo countdown</span>
            <strong>{seconds}</strong>
            <small>{seconds === 0 ? "Preview complete" : "seconds"}</small>
          </div>
          <p className="preview-note">No participant information is collected in this preview.</p>
          <p className="sr-only" aria-live="polite" aria-atomic="true">{completionMessage}</p>

          <Dialog.Close className="dialog-confirm">Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Register;
