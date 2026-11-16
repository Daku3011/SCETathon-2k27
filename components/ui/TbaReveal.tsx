"use client";

import { useId, useState } from "react";

type TbaRevealProps = {
  label?: string;
  revealedText?: string;
  className?: string;
  inline?: boolean;
};

/**
 * Keeps unannounced schedule information out of accessible names until a
 * visitor requests the generic publication note.
 */
export function TbaReveal({
  label = "Round details · To be announced",
  revealedText = "The organizers will publish round dates and submission deadlines here.",
  className = "",
  inline = false,
}: TbaRevealProps) {
  const [open, setOpen] = useState(false);
  const messageId = useId();

  return (
    <div className={`tba-reveal ${inline ? "tba-inline" : ""} ${className}`}>
      <button
        type="button"
        className="tba-button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={messageId}
      >
        {label}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p id={messageId} className="tba-message" role="status">
          {revealedText}
        </p>
      )}
    </div>
  );
}

export default TbaReveal;
