"use client";
import { Announcement } from "../ui/Announcement";
import { useState } from "react";
import * as A from "@radix-ui/react-accordion";
import Link from "next/link";
import { event, copy } from "@/data/event";

export function Timeline() {
  return (
    <dl className="ledger">
      {[
        ["Hackathon", event.displayDate],
        ["Venue", event.venue],
        ["Rounds", event.rounds],
        ["Registration", "To be announced"],
      ].map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>
            {value === "To be announced" ? (
              <Announcement label={label} />
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
export function Sponsors() {
  return (
    <>
      <p>Partner announcements for the January edition will appear here.</p>
      <dl className="ledger">
        {event.sponsors.map(([tier, name]) => (
          <div key={tier}>
            <dt>{tier} partner</dt>
            <dd>
              {name === "To be announced" ? (
                <Announcement label={tier + " partner"} />
              ) : (
                name
              )}
            </dd>
          </div>
        ))}
      </dl>
      <a href={"mailto:" + event.email}>
        Contact the organizers about sponsorship
      </a>
    </>
  );
}
function Faq() {
  const [q, set] = useState("");
  const matches = event.faq.filter((items) =>
    items.join(" ").toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <label>
        {copy.textSearchQuestions}
        <input type="search" value={q} onChange={(e) => set(e.target.value)} />
      </label>
      <A.Root type="single" collapsible>
        {matches.map(([n, d]) => (
          <A.Item className="faq" value={n} key={n}>
            <A.Header>
              <A.Trigger>
                {n}
                <span aria-hidden>＋</span>
              </A.Trigger>
            </A.Header>
            <A.Content>
              {d === "To be announced." ? (
                <Announcement label="Rounds" />
              ) : (
                <p>{d}</p>
              )}
            </A.Content>
          </A.Item>
        ))}
      </A.Root>
      {!matches.length && <p>{copy.textNoMatchingQuestions}</p>}
    </>
  );
}

export default function HomeSections() {
  const [reserved, setReserved] = useState(false);
  return (
    <div className="wrap">
      <section className="spread">
        <h2>Event programme</h2>
        <Timeline />
      </section>
      <section className="spread">
        <div>
          <p className="kicker">From the problem briefs</p>
          <h2>Lab Ledger</h2>
          <p>
            How do two teams avoid booking the same instrument? Try this local
            prototype of the equipment reservation brief.
          </p>
          <Link href="/problems">Read all eight sample briefs</Link>
        </div>
        <div className="bench">
          <small>Interactive sample · no real reservation</small>
          <h3>Digital oscilloscope</h3>
          <p>Electronics lab · Bench 04</p>
          <dl className="ledger">
            <div>
              <dt>Sample slot</dt>
              <dd>14:00–15:00</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd role="status">
                {reserved ? "Reserved by your team" : "Available"}
              </dd>
            </div>
          </dl>
          <button className="btn" onClick={() => setReserved(!reserved)}>
            {reserved ? "Release sample slot" : "Reserve sample slot"}
          </button>
        </div>
      </section>
      <section className="spread">
        <h2>2026 archive</h2>
        <div>
          <h3>Team Novex · Swach App</h3>
          <p>First place in Computer Engineering at the previous edition.</p>
          <Link href="/gallery">View the team photograph</Link>
        </div>
      </section>
      <section className="spread">
        <h2>Prizes & partners</h2>
        <div>
          <p>
            Prize amounts and sponsor names for 2027 will be announced by the
            organizers.
          </p>
          <Link href="/sponsors">Sponsorship enquiries</Link>
        </div>
      </section>
      <section className="spread">
        <h2>Participant questions</h2>
        <div>
          <Faq />
        </div>
      </section>
    </div>
  );
}
