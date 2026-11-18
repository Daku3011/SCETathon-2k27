"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { event } from "@/data/event";
import Problems from "./Problems";
import { TbaReveal } from "../ui/TbaReveal";
import { Register } from "../ui/Register";
import { MandanaDiamond, MandanaBackgroundWatermark } from "../ui/SVGs";
import { ArrowUpRight, ArrowRight } from "../ui/Icons";

export function Timeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-4xl mx-auto" id="programme">
      <div className="p-6 sm:p-10 bg-paper border border-ink/20 rounded-[2px] shadow-sm relative overflow-hidden">
        {/* Subtle background watermark inside card */}
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border border-ink/10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Confirmed dates header */}
        <div className="mb-8 pb-6 border-b border-ink/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold block mb-1">
              CONFIRMED TIMELINE // SCET SURAT
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-ink font-bold">
              28–29 January 2027
            </h3>
            <p className="text-sm sm:text-base text-ink/80 mt-1">
              24 Hours Non-Stop On-Campus Engineering Sprint
            </p>
          </div>
          <span className="font-mono text-xs px-3 py-1 bg-surface text-paper rounded-[2px] font-semibold w-fit">
            ALL TIMES IST (UTC+5:30)
          </span>
        </div>

        {/* Vertical Rule with Mandana Diamond Milestone Nodes */}
        <div className="relative pl-8 sm:pl-12 border-l-2 border-ink/25 space-y-10 my-4">
          {/* Milestone 1: Kickoff */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -left-[41px] sm:-left-[57px] top-1 transition-transform group-hover:scale-110">
              <MandanaDiamond size={22} />
            </div>
            <div className="p-4 sm:p-5 bg-paper border border-ink/15 rounded-[2px] hover:border-ink transition-all">
              <span className="font-mono text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded-[2px]">
                28 Jan 2027 · 11:00 AM IST
              </span>
              <h4 className="font-display text-xl font-bold text-ink mt-2 mb-1">
                Campus Check-in &amp; Kickoff
              </h4>
              <p className="text-sm sm:text-base text-ink/85">
                Squads report to SCET Surat, complete credential check-in, set up hardware &amp; dev rigs, and commence the 24-hour sprint.
              </p>
            </div>
          </motion.div>

          {/* Milestone 2: TBA Round details */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: 0.08, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -left-[41px] sm:-left-[57px] top-1 transition-transform group-hover:scale-110">
              <MandanaDiamond size={22} />
            </div>
            <div className="p-4 sm:p-5 bg-paper border border-ink/15 rounded-[2px]">
              <span className="font-mono text-xs text-coral font-bold block mb-2">
                EVALUATION MILESTONES &amp; DEADLINES
              </span>
              <TbaReveal
                label="Round details · To be announced"
                revealedText="The organizers will publish round dates and submission deadlines here."
              />
            </div>
          </motion.div>

          {/* Milestone 3: 24h Build & Evaluation */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: 0.16, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -left-[41px] sm:-left-[57px] top-1 transition-transform group-hover:scale-110">
              <MandanaDiamond size={22} />
            </div>
            <div className="p-4 sm:p-5 bg-paper border border-ink/15 rounded-[2px] hover:border-ink transition-all">
              <span className="font-mono text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded-[2px]">
                28–29 Jan 2027 · Continuous
              </span>
              <h4 className="font-display text-xl font-bold text-ink mt-2 mb-1">
                24-Hour Prototype Build &amp; Live Jury Demos
              </h4>
              <p className="text-sm sm:text-base text-ink/85">
                Non-stop rapid prototyping, mentor reviews across software and chemical labs, project freeze at hour 24, and final podium presentations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Sponsors() {
  return (
    <div className="w-full space-y-6">
      <div className="p-6 sm:p-8 bg-paper border border-ink/20 rounded-[2px]">
        <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold block mb-2">
          PARTNERSHIP CONFIRMATION
        </span>
        <p className="text-base text-ink/90 mb-6 leading-relaxed">
          {event.sponsorsNotice}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {event.sponsors.map(([tier, name]) => (
            <div
              key={tier}
              className="p-4 bg-paper border border-ink/15 rounded-[2px] hover:border-coral transition-colors"
            >
              <span className="font-mono text-xs text-coral uppercase tracking-wider font-semibold block mb-1">
                {tier} Partner
              </span>
              <span className="text-sm font-bold text-ink">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-2">
        <a
          href={`mailto:${event.email}`}
          className="inline-flex items-center gap-1.5 font-bold text-sm text-ink underline underline-offset-4 hover:text-coral transition-colors focus:outline focus:outline-[3px] focus:outline-ink focus:outline-offset-[3px] rounded-[2px]"
        >
          <span>Contact organizers about sponsorship opportunities</span>
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
        </a>
      </div>
    </div>
  );
}

function EventIntroduction() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-ink/15">
      <MandanaBackgroundWatermark />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold">
            01 // EVENT INTRODUCTION
          </span>
          <span className="text-ink/40">·</span>
          <span className="font-mono text-xs text-ink/60">SCETATHON 2.0</span>
        </div>

        <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold text-ink leading-[1.05] tracking-tight mb-6">
          A 24-hour campus sprint where digital algorithms meet physical processes.
        </h2>

        <p className="text-lg sm:text-xl text-ink/90 leading-relaxed mb-6 max-w-[62ch]">
          {event.intro}
        </p>

        {/* Fact banner */}
        <div className="font-mono text-sm sm:text-base font-bold text-ink bg-paper border border-ink/20 px-4 py-2.5 rounded-[2px] inline-block mb-8 shadow-sm">
          {event.factsLine}
        </div>

        {/* Interdisciplinary Branches Spotlight Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-ink/15">
          <div className="p-6 bg-paper border border-ink/20 rounded-[2px] hover:border-ink transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl p-2 bg-paper rounded-[2px] border border-ink/15">💻</span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  Department of Computer Engineering
                </h3>
                <span className="font-mono text-xs text-ink font-semibold">
                  ESTD. 1995 · SCET SURAT
                </span>
              </div>
            </div>
            <p className="text-sm text-ink/80 leading-relaxed">
              Equipping builders with high-performance computing labs, AI/ML model inference setups, cloud infrastructure, and low-latency embedded IoT networks for real-time applications.
            </p>
          </div>

          <div className="p-6 bg-paper border border-ink/20 rounded-[2px] hover:border-coral transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl p-2 bg-paper rounded-[2px] border border-ink/15">🧪</span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  Department of Chemical Engineering
                </h3>
                <span className="font-mono text-xs text-coral font-semibold">
                  ESTD. 1995 · SCET SURAT
                </span>
              </div>
            </div>
            <p className="text-sm text-ink/80 leading-relaxed">
              Bringing domain expertise in green process optimization, environmental remediation, bio-chemical sensors, industrial recycling, and sustainable material synthesis.
            </p>
          </div>
        </div> */}
      </motion.div>
    </section>
  );
}

function ArchiveGallery() {
  const strip = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollStrip = (direction: number) => {
    strip.current?.scrollBy({
      left: direction * Math.max(strip.current.clientWidth * 0.82, 280),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-ink/15" id="gallery">
      <div className="max-w-3xl mb-10">
        <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold block mb-2">
          04 // ARCHIVE &amp; VERIFIED RECORDS
        </span>
        <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold text-ink leading-[1.05] tracking-tight mb-3">
          Past editions
        </h2>
        <p className="text-base sm:text-lg text-ink/80 max-w-[62ch]">
          Documentary evidence from the inaugural SCETATHON at Sarvajanik College of Engineering &amp; Technology, Surat.
        </p>
      </div>

      <div className="space-y-8">
        {/* Lead Landscape Photograph */}
        <motion.figure
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="relative w-full border border-ink/20 rounded-[2px] bg-paper overflow-hidden group shadow-sm hover:border-ink transition-all"
        >
          <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[500px] overflow-hidden">
            <Image
              src="/archive/novex.jpeg"
              alt="SCETATHON 1.0 participant squads collaborating in the 24-hour build hall"
              fill
              sizes="(max-width: 768px) 100vw, 1440px"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </div>
          <figcaption className="p-4 sm:p-5 bg-paper border-t border-ink/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-bold text-sm sm:text-base text-ink">
              SCETATHON 1.0 (March 2026) · Participant squads in the 24-hour build hall
            </span>
            <span className="font-mono text-xs text-ink/65">
              Verified campus archive // SCET Surat
            </span>
          </figcaption>
        </motion.figure>

        {/* Two smaller documentary crops */}
        <div className="space-y-4">
          <div className="flex md:hidden items-center justify-between">
            <span className="font-mono text-xs text-ink/70 font-semibold">
              SWIPE ARCHIVE PHOTOS
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollStrip(-1)}
                aria-label="Show previous archive image"
                className="min-h-[44px] min-w-[44px] px-3.5 py-1.5 text-sm font-bold border border-ink rounded-[2px] bg-paper text-ink active:bg-surface/10 inline-flex items-center justify-center"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollStrip(1)}
                aria-label="Show next archive image"
                className="min-h-[44px] min-w-[44px] px-3.5 py-1.5 text-sm font-bold border border-ink rounded-[2px] bg-paper text-ink active:bg-surface/10 inline-flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
              </button>
            </div>
          </div>

          <div
            ref={strip}
            className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scroll-smooth snap-x snap-mandatory"
          >
            {/* Documentary crop 1: Prototype review */}
            <figure className="min-w-[85vw] sm:min-w-[420px] md:min-w-0 snap-start border border-ink/20 rounded-[2px] bg-paper overflow-hidden flex flex-col justify-between group hover:border-ink transition-all">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src="/archive/novex.jpeg"
                  alt="SCETATHON 1.0 working prototype inspection and code review"
                  fill
                  sizes="(max-width: 768px) 85vw, 680px"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-4 bg-paper border-t border-ink/15">
                <p className="font-bold text-sm text-ink leading-snug">
                  SCETATHON 1.0 · Working prototype inspection &amp; code review
                </p>
                <span className="font-mono text-xs text-ink/65 block mt-1">
                  Technical faculty &amp; industry evaluator checkpoint
                </span>
              </figcaption>
            </figure>

            {/* Documentary crop 2: Presentation */}
            <figure className="min-w-[85vw] sm:min-w-[420px] md:min-w-0 snap-start border border-ink/20 rounded-[2px] bg-paper overflow-hidden flex flex-col justify-between group hover:border-ink transition-all">
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src="/archive/novex.jpeg"
                  alt="SCETATHON 1.0 final evaluation and podium presentation"
                  fill
                  sizes="(max-width: 768px) 85vw, 680px"
                  className="object-cover object-bottom group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-4 bg-paper border-t border-ink/15">
                <p className="font-bold text-sm text-ink leading-snug">
                  SCETATHON 1.0 · Final evaluation &amp; podium presentation
                </p>
                <span className="font-mono text-xs text-ink/65 block mt-1">
                  Team Novex · Awarded First Place in Computer Engineering
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value
      ? event.faq.filter(([question, answer]) =>
          `${question} ${answer}`.toLowerCase().includes(value)
        )
      : event.faq;
  }, [query]);

  return (
    <div className="w-full space-y-6" id="faq">
      {/* Search Input for FAQ */}
      <div className="relative">
        <label htmlFor="faq-search" className="sr-only">
          Search frequently asked questions
        </label>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter questions by keyword (e.g. eligibility, team size, free entry)…"
          className="w-full min-h-[44px] px-4 py-2.5 text-base bg-paper text-ink placeholder-ink/50 border border-ink/20 rounded-[2px] focus:outline focus:outline-[3px] focus:outline-ink focus:outline-offset-[3px]"
        />
      </div>

      {/* Accordion FAQ list */}
      <div className="space-y-3">
        {matches.map(([question, answer]) => (
          <details
            key={question}
            className="group border border-ink/20 rounded-[2px] bg-paper overflow-hidden transition-all"
          >
            <summary className="w-full min-h-[52px] p-4 text-left font-display text-lg font-bold text-ink hover:text-coral flex items-center justify-between gap-4 cursor-pointer select-none">
              <span>{question}</span>
              <span className="font-mono text-sm opacity-60 group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="px-4 pb-4 pt-1 text-base text-ink/85 leading-relaxed border-t border-ink/10">
              <p>{answer}</p>
            </div>
          </details>
        ))}
        {!matches.length && (
          <p className="p-6 bg-paper border border-ink/20 rounded-[2px] text-base text-ink/75 font-mono" role="status">
            No matching questions found for &ldquo;{query}&rdquo;. Try another keyword or email organizers directly.
          </p>
        )}
      </div>
    </div>
  );
}

export default function HomeSections() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full">
      {/* 1. Event Introduction */}
      <EventIntroduction />

      {/* 2. Programme (Timeline) */}
      <section className="relative py-14 sm:py-20 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-ink/15" id="programme">
        <MandanaBackgroundWatermark />
        <div className="max-w-3xl mb-10">
          <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold block mb-2">
            02 // TIMELINE &amp; RUN-OF-SHOW
          </span>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold text-ink leading-[1.05] tracking-tight">
            Programme
          </h2>
        </div>
        <Timeline />
      </section>

      {/* 3. Problems Explorer */}
      <section className="relative py-14 sm:py-20 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-ink/15" id="problems">
        <MandanaBackgroundWatermark />
        <div className="max-w-3xl mb-10">
          <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold block mb-2">
            03 // CHALLENGE TRACKS
          </span>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold text-ink leading-[1.05] tracking-tight mb-3">
            Problem statements
          </h2>
          <p className="text-base sm:text-lg text-ink/80 max-w-[62ch]">
            Eight curated challenge briefs across urban operations, climate resilience, and student community tooling. Select any row to inspect expected outcomes, constraints, and suggested technology.
          </p>
        </div>
        <Problems />
      </section>

      {/* 4. Past Editions Archive Gallery */}
      <ArchiveGallery />

      {/* 5. Prizes, Partners and FAQ */}
      <section className="relative py-14 sm:py-20 lg:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <MandanaBackgroundWatermark />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Awards & Partners */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold block mb-2">
                05 // RECOGNITION &amp; PODIUM
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                Prizes &amp; awards
              </h2>
              <div className="p-6 bg-paper border border-ink/20 rounded-[2px] shadow-sm">
                <p className="text-base font-bold text-ink leading-snug">
                  {event.prizesNotice}
                </p>
                <span className="font-mono text-xs text-ink/65 block mt-2">
                  // Cash prizes, winner trophies, and special category bounties will be unveiled upon jury ratification.
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold block mb-2">
                06 // ECOSYSTEM COLLABORATORS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                Event partners
              </h2>
              <Sponsors />
            </motion.div>
          </div>

          {/* Right Column: Searchable FAQ */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-coral font-bold block mb-2">
              07 // FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-6">
              FAQ
            </h2>
            <Faq />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
