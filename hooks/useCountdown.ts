"use client";

import { useEffect, useState } from "react";
import { event } from "@/data/event";

export function useCountdown() {
  const [now, setNow] = useState(0);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return "Kickoff: 28 Jan 2027 · 11:00 AM IST";

  const kickoffTime = new Date(event.kickoff).getTime();
  const diff = kickoffTime - now;

  if (diff > 0) {
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `Kickoff in ${days}d ${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  const endTime = new Date(event.end).getTime() + 86400000;
  if (now < endTime) {
    return "LIVE NOW · SCET CAMPUS SURAT";
  }

  return "Edition Complete · 28–29 Jan 2027";
}
