"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { event } from "@/data/event";
import Problems from "./Problems";
import { TbaReveal } from "../ui/TbaReveal";
import { Register } from "../ui/Register";

export function Timeline() {
  return (
    <div className="programme-card">
      <div className="programme-rule" aria-hidden="true">
        <span className="programme-node"><Image src="/ornaments/terminal-diamond.svg" alt="" width={42} height={42} /></span>
        <span className="programme-line" />
        <span className="programme-node"><Image src="/ornaments/terminal-diamond.svg" alt="" width={42} height={42} /></span>
      </div>
      <div className="programme-content">
        <div className="programme-date-wrap">
          <span className="programme-echo" aria-hidden="true">28–29 January 2027</span>
          <p className="programme-date">28–29 January 2027</p>
          <p className="programme-note">Confirmed event dates</p>
        </div>
        <TbaReveal />
      </div>
    </div>
  );
}

export function Sponsors() {
  return (
    <div className="announcements-section">
      <div className="partner-row">
        <p className="section-label">Partners</p>
        <p>Confirmed sponsor marks and actual tiers will appear here after publication.</p>
        <a href={`mailto:${event.email}`} className="text-sm underline">
          Contact organizers about sponsorship ↗
        </a>
      </div>
    </div>
  );
}

function EventIntroduction() {
  return (
    <section className="intro-section site-shell" id="about" aria-labelledby="intro-title">
      <p className="section-label">01 · Event introduction</p>
      <div className="intro-grid">
        <h2 id="intro-title">A campus programme for ideas that need a first working form.</h2>
        <div>
          <p>
            SCETATHON brings student teams to SCET, Surat for one concentrated build: choose a brief, make a prototype and share what it can do.
          </p>
          <p className="facts-line"><span>24 hours</span><span>Teams of 3–5</span><span>Eight problem statements</span></p>
        </div>
      </div>
    </section>
  );
}

function ArchiveGallery() {
  const strip = useRef<HTMLDivElement>(null);
  const scrollStrip = (direction: number) => {
    strip.current?.scrollBy({ left: direction * Math.max(strip.current.clientWidth * 0.82, 260), behavior: "smooth" });
  };

  return (
    <section className="gallery-section site-shell" id="gallery" aria-labelledby="gallery-title">
      <div className="section-heading">
        <p className="section-label">04 · Past editions</p>
        <h2 id="gallery-title">The room, in progress.</h2>
        <p>Moments from the previous edition’s archive.</p>
      </div>
      <div className="archive-gallery">
        <figure className="archive-lead">
          <Image
            src="/archive/novex.jpeg"
            alt="Participants presenting at a previous SCETATHON edition"
            width={675}
            height={900}
            sizes="(max-width: 767px) 100vw, 58vw"
            priority={false}
          />
          <figcaption>SCETATHON 1.0 · participant presentation</figcaption>
        </figure>
        <div className="archive-strip-wrap">
          <div className="archive-strip" ref={strip}>
            <figure className="archive-detail archive-detail-one">
              <Image
                src="/archive/novex.jpeg"
                alt="Documentary crop of SCETATHON participants at a presentation"
                width={675}
                height={900}
                sizes="(max-width: 767px) 80vw, 22vw"
                loading="lazy"
              />
              <figcaption>SCETATHON 1.0 · documentary detail</figcaption>
            </figure>
            <figure className="archive-detail archive-detail-two">
              <Image
                src="/archive/novex.jpeg"
                alt="Documentary crop of a previous SCETATHON presentation"
                width={675}
                height={900}
                sizes="(max-width: 767px) 80vw, 22vw"
                loading="lazy"
              />
              <figcaption>SCETATHON 1.0 · presentation detail</figcaption>
            </figure>
          </div>
          <div className="strip-controls">
            <button type="button" onClick={() => scrollStrip(-1)} aria-label="Show previous archive image">← Previous</button>
            <button type="button" onClick={() => scrollStrip(1)} aria-label="Show next archive image">Next →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [query, setQuery] = useState("");
  const answers = [
    ["Who can join?", "Registration eligibility will be published with the official registration details."],
    ["How large can a team be?", "Teams of 3–5 are planned for SCETATHON 2.0."],
    ["When are round details released?", "The organizers will publish round dates and submission deadlines here."],
    ["How do I register?", "Open the registration preview for the current announcement status. No information is collected before the real flow is enabled."],
  ];
  const matches = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value ? answers.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(value)) : answers;
  }, [query]);

  return (
    <section className="faq-section site-shell" id="faq" aria-labelledby="faq-title">
      <div className="section-heading">
        <p className="section-label">06 · FAQ</p>
        <h2 id="faq-title">Questions, plainly answered.</h2>
      </div>
      <label className="faq-search">
        <span>Search FAQ</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions" />
      </label>
      <div className="faq-list">
        {matches.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
        {!matches.length && <p className="faq-empty" role="status">No matching questions. Try another search.</p>}
      </div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <>
      <EventIntroduction />

      <section className="programme-section" id="programme" aria-labelledby="programme-title">
        <div className="site-shell">
          <div className="section-heading section-heading-on-indigo">
            <p className="section-label">02 · Programme</p>
            <h2 id="programme-title">The confirmed dates, and room for what follows.</h2>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="problems-section site-shell" id="problems" aria-labelledby="problems-title">
        <div className="section-heading">
          <p className="section-label">03 · Problems</p>
          <h2 id="problems-title">Pick a challenge.</h2>
          <p>Browse the index by domain or search by title. Open a row to read its outcome, constraints and suggested technology.</p>
        </div>
        <Problems />
      </section>

      <ArchiveGallery />

      <section className="announcements-section site-shell" aria-label="Awards and partners">
        <div className="announcement-row">
          <div>
            <p className="section-label">05 · Awards</p>
            <h2>Awards announcement</h2>
          </div>
          <p>Rank and amount will be announced once published.</p>
        </div>
        <div className="partner-row">
          <p className="section-label">Partners</p>
          <p>Confirmed sponsor marks and actual tiers will appear here after publication.</p>
          <Register text="Register" />
        </div>
      </section>

      <Faq />
    </>
  );
}
