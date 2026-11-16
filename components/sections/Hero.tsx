"use client";
import { copy } from "@/data/event";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { event } from "@/data/event";
import { problems } from "@/data/problems";
import { Count } from "../motion/Effects";
import { Register } from "../ui/Register";
import { useCountdown } from "@/hooks/useCountdown";
const Signal = dynamic(() => import("./Signal"), {
  ssr: false,
  loading: () => <div className="fallback">/27</div>,
});
export default function Hero() {
  const countdown = useCountdown();
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div className="herobody">
          <div>
            <small>{copy.textScetSURATCAMPUSHACKATHON}</small>
            <h1 aria-label={event.name}>
              {event.name
                .split(" ")[0]
                .split("")
                .map((c, i) => (
                  <motion.span
                    aria-hidden
                    key={i}
                    initial={{ y: 12, opacity: 0.25 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.035 }}
                  >
                    {c}
                  </motion.span>
                ))}
              <b>{event.name.split(" ")[1]}</b>
            </h1>
            <h3>{event.tagline}</h3>
            <p className="lead">{event.hero}</p>
            <div className="actions">
              <Register />
              <Link className="btn" href="/problems">
                {copy.textViewProblemStatements}
              </Link>
            </div>
            <div className="count mono">{countdown}</div>
          </div>
          <figure
            className="visual"
            aria-label={copy.textAnimatedLimeWireframeKnot}
          >
            <Signal />
            <figcaption>{copy.textFig01SIGNALFIELD}</figcaption>
          </figure>
        </div>
        <div className="metrics">
          {[
            [event.hours, "Hours on campus"],
            [problems.length, "Problem statements"],
            [event.rounds, "Rounds"],
            [event.team[0], "Members per team"],
          ].map(([v, n], i) => (
            <div key={n}>
              <strong>
                <Count value={Number(v)} />
                {i === 3 ? "–" + event.team[1] : ""}
              </strong>
              <span>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
