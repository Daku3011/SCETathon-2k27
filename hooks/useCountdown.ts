"use client";
import { useEffect, useState } from "react";
import { event } from "@/data/event";
export function useCountdown() {
  const [now, set] = useState(0);
  useEffect(() => {
    set(Date.now());
    if (!event.round1 && !event.start && !event.end) return;
    const t = setInterval(() => set(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const r = Date.parse(event.round1),
    s = Date.parse(event.start),
    e = Date.parse(event.end);
  if (!now) return "Schedule pending";
  const target = r > now ? r : s > now ? s : 0;
  if (target) {
    const d = Math.floor((target - now) / 1000);
    return (
      (target === r ? "Idea deadline" : "Campus kickoff") +
      " · " +
      Math.floor(d / 86400) +
      "d " +
      [Math.floor(d / 3600) % 24, Math.floor(d / 60) % 60, d % 60]
        .map((v) => String(v).padStart(2, "0"))
        .join(":")
    );
  }
  return s <= now && e > now
    ? "LIVE NOW"
    : e <= now
      ? "Edition complete"
      : "Dates to be announced";
}
