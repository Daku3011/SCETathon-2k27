"use client";
import { useState } from "react";
export function Announcement({
  label,
  detail,
}: {
  label: string;
  detail?: string;
}) {
  const [open, set] = useState(false);
  const info =
    detail ??
    (label === "Registration"
      ? "The registration link and eligibility details will appear here once confirmed."
      : label.includes("partner")
        ? "The organizer has not confirmed this partnership yet."
        : "The round format and schedule will be published here once confirmed. The hackathon is on 28–29 January 2027.");
  return (
    <div className="announcement">
      <button
        type="button"
        aria-expanded={open}
        aria-label={(open ? "Hide " : "Reveal ") + label + " update"}
        onClick={() => set(!open)}
      >
        <span aria-hidden="true" className={open ? "" : "obscured"}>
          To be announced
        </span>
        <b>{open ? "Hide" : "Reveal"}</b>
      </button>
      {open && <p>{info}</p>}
    </div>
  );
}
