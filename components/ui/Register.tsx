import { event } from "@/data/event";

export function Register({ text = "Registration opening soon" }: { text?: string; pill?: boolean }) {
  if (event.registrationOpen && event.form) {
    return <a className="btn" href={event.form} rel="noopener noreferrer">{text}</a>;
  }
  return <span className="register-pending" aria-label="Registration has not opened yet">{text}</span>;
}
