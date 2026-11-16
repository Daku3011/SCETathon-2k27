"use client";
import * as D from "@radix-ui/react-dialog";
import { event, copy } from "@/data/event";
export function Register({
  text = "Registration",
}: {
  text?: string;
  pill?: boolean;
}) {
  if (event.form)
    return (
      <a className="btn" href={event.form}>
        {text}
      </a>
    );
  return (
    <D.Root>
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
          <D.Close className="btn">Close</D.Close>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
