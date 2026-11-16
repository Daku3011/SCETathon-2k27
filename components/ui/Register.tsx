"use client";
import { useState, useEffect } from "react";
import * as D from "@radix-ui/react-dialog";
import { event, copy } from "@/data/event";
export function Register({
  text = "Registration",
}: {
  text?: string;
  pill?: boolean;
}) {
  const [open, setOpen] = useState(false),
    [seconds, setSeconds] = useState(24 * 3600);
  useEffect(() => {
    if (!open) return;
    const key = "scet-registration-preview";
    let until = Number(sessionStorage.getItem(key));
    if (!until) {
      until = Date.now() + 86400000;
      sessionStorage.setItem(key, String(until));
    }
    const tick = () =>
      setSeconds(Math.max(0, Math.ceil((until - Date.now()) / 1000)));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [open]);
  if (event.form)
    return (
      <a className="btn" href={event.form}>
        {text}
      </a>
    );
  return (
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Trigger className="btn">{text}</D.Trigger>
      <D.Portal>
        <D.Overlay className="overlay" />
        <D.Content className="sheet">
          <D.Title asChild>
            <h2>Registration opens soon</h2>
          </D.Title>
          <D.Description>
            {copy.textTheOfficialFormAndDeadlineWillAppear}
          </D.Description>
          <div className="preview-clock">
            <small>Demo countdown · illustrative only</small>
            <strong role="timer">
              {[
                Math.floor(seconds / 3600),
                Math.floor(seconds / 60) % 60,
                seconds % 60,
              ]
                .map((n) => String(n).padStart(2, "0"))
                .join(" : ")}
            </strong>
            <p>Registration opens only after an organizer announcement.</p>
          </div>
          <D.Close className="btn">Close</D.Close>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
