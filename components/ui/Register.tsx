"use client";
import { copy } from "@/data/event";

import * as D from "@radix-ui/react-dialog";
import { event } from "@/data/event";
import { useState } from "react";
export function Register({
  text = "Register Now",
  pill = false,
}: {
  text?: string;
  pill?: boolean;
}) {
  const [shift, setShift] = useState("");
  const props = {
    className: pill ? "pill" : "btn primary",
    style: { transform: shift },
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      if (
        e.pointerType === "mouse" &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const r = e.currentTarget.getBoundingClientRect();
        setShift(
          "translate(" +
            (e.clientX - r.left - r.width / 2) * 0.08 +
            "px," +
            (e.clientY - r.top - r.height / 2) * 0.1 +
            "px)",
        );
      }
    },
    onPointerLeave: () => setShift(""),
  };
  if (event.form)
    return (
      <a {...props} href={event.form}>
        {text} ↗
      </a>
    );
  return (
    <D.Root>
      <D.Trigger {...props}>{text} ↗</D.Trigger>
      <D.Portal>
        <D.Overlay className="overlay" />
        <D.Content className="sheet">
          <small>{copy.textRegistration}</small>
          <D.Title asChild>
            <h3>{copy.textRegistrationOpensSoon}</h3>
          </D.Title>
          <D.Description>
            {copy.textTheOfficialFormAndDeadlineWillAppear}
          </D.Description>
          <D.Close className="btn">{copy.textGotIt}</D.Close>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
