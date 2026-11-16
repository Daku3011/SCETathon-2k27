"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { event, copy } from "@/data/event";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");

/**
 * Guidelines & Field Manual Component
 */
export function Guidelines() {
  const [active, setActive] = useState(slugify(event.rules[0][0]));
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-10% 0px -50%" }
    );
    document.querySelectorAll(".rule-item").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table of contents sidebar */}
        <nav
          className="lg:col-span-4 sticky top-28 p-6 bg-[#191A18] border border-white/[0.19]"
          aria-label={copy.textRuleSections}
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-lime font-bold block mb-4">
            FIELD MANUAL INDEX
          </span>
          <div className="flex flex-col gap-2">
            {event.rules.map(([n]) => (
              <a
                key={n}
                href={"#" + slugify(n)}
                className={`font-mono text-xs font-bold uppercase tracking-wider py-2 px-3 transition-colors ${
                  active === slugify(n)
                    ? "bg-lime text-ink"
                    : "text-[#C6C8BE] hover:text-white hover:bg-white/5"
                }`}
              >
                {n}
              </a>
            ))}
          </div>
        </nav>

        {/* Rule descriptions */}
        <div className="lg:col-span-8 space-y-6">
          {event.rules.map(([title, description]) => (
            <section
              key={title}
              id={slugify(title)}
              className="rule-item p-6 sm:p-8 bg-[#191A18] border border-white/[0.19] scroll-mt-28"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <h3 className="font-display text-xl sm:text-2xl text-paper uppercase tracking-tight">
                  {title}
                </h3>
                <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-wider border border-lime/40 px-2 py-0.5">
                  ✓ VERIFIED
                </span>
              </div>
              <p className="text-base sm:text-lg text-[#C6C8BE] leading-relaxed mb-6">
                {description}
              </p>
              <button
                type="button"
                className="px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-paper border border-white/30 hover:border-lime hover:text-lime transition-colors cursor-pointer"
                onClick={async () => {
                  location.hash = slugify(title);
                  try {
                    await navigator.clipboard.writeText(location.href);
                    setCopied(title);
                  } catch {
                    setCopied("");
                  }
                }}
              >
                {copied === title ? "✓ Link copied to clipboard" : "Copy section link ↗"}
              </button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Evaluation Rubric Component
 */
export function Evaluation() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Weighted Criteria Bars */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#191A18] border border-white/[0.19] space-y-6">
          <span className="font-mono text-[11px] uppercase tracking-wider text-lime font-bold block mb-2">
            CRITERIA WEIGHTING (PROPOSED)
          </span>

          {event.criteria.map(([name, weight]) => (
            <div key={name} className="space-y-2">
              <div className="flex justify-between items-center text-sm sm:text-base font-bold text-paper">
                <span>{name}</span>
                <span className="font-mono text-lime">{weight}%</span>
              </div>
              <div className="w-full h-3 bg-black/50 border border-white/20 overflow-hidden">
                <motion.div
                  className="h-full bg-lime"
                  style={{ width: `${weight}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Judging Stages */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#191A18] border border-white/[0.19] space-y-6">
          <span className="font-mono text-[11px] uppercase tracking-wider text-coral font-bold block mb-2">
            JUDGING PHASES
          </span>
          <ol className="space-y-4">
            {event.judging.map((step, idx) => (
              <li
                key={step}
                className="p-4 bg-black/40 border-l-2 border-lime"
              >
                <small className="font-mono text-[10px] text-lime font-bold block mb-1">
                  PHASE 0{idx + 1}
                </small>
                <h4 className="font-bold text-base text-paper">
                  {step}
                </h4>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/**
 * Archive Gallery Component
 */
export function Gallery() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <figure className="border border-white/[0.19] bg-[#191A18] overflow-hidden">
          <div className="relative w-full h-[340px]">
            <Image
              src="/archive/novex.jpeg"
              alt="SCETATHON 1.0 Team Novex"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="p-6 bg-[#191A18] border-t border-white/10">
            <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-wider block mb-1">
              HISTORICAL ARCHIVE · MARCH 2026
            </span>
            <h3 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
              Team Novex · First Place
            </h3>
            <p className="text-sm text-[#C6C8BE]">
              Computer Engineering champions for Swach App at the inaugural SCETATHON 1.0.
            </p>
          </figcaption>
        </figure>

        <figure className="border border-white/[0.19] bg-[#191A18] overflow-hidden">
          <div className="relative w-full h-[340px]">
            <Image
              src="/archive/novex.jpeg"
              alt="SCETATHON 1.0 participant squads in the 24-hour build hall"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="p-6 bg-[#191A18] border-t border-white/10">
            <span className="font-mono text-[10px] text-coral font-bold uppercase tracking-wider block mb-1">
              HISTORICAL ARCHIVE · MARCH 2026
            </span>
            <h3 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
              24-Hour Build Hall
            </h3>
            <p className="text-sm text-[#C6C8BE]">
              Student engineering squads collaborating through the night in the SCET campus labs.
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

/**
 * Qualified Teams (Results) Component
 */
export function Results() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  if (!event.showResults && !event.resultsOpen) {
    return <Pending text="Qualification outcomes for SCETATHON 2.0 will be published here upon jury evaluation." />;
  }

  const rows = event.teams.filter(
    (t) =>
      (cat === "All" || t.track === cat) &&
      t.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex-1">
          <span className="font-mono text-[11px] text-paper/70 block mb-1 uppercase tracking-wider">
            {copy.textFindATeam}
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search team name…"
            className="w-full min-h-[44px] px-4 py-2.5 bg-[#191A18] border border-white/20 text-paper focus:outline-none focus:border-lime"
          />
        </label>
        <label>
          <span className="font-mono text-[11px] text-paper/70 block mb-1 uppercase tracking-wider">
            {copy.textTrack}
          </span>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="min-h-[44px] px-4 py-2.5 bg-[#191A18] border border-white/20 text-paper focus:outline-none focus:border-lime"
          >
            {["All", ...new Set(event.teams.map((t) => t.track))].map((t) => (
              <option key={t} value={t} className="bg-ink text-paper">
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      {rows.length > 0 ? (
        <div className="border border-white/20 overflow-hidden bg-[#191A18]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20 bg-black/40">
                <th className="p-4 font-mono text-xs uppercase text-lime">
                  {copy.textQualifiedTeam}
                </th>
                <th className="p-4 font-mono text-xs uppercase text-lime">
                  {copy.textTrack}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.name} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-4 font-bold text-paper">{t.name}</td>
                  <td className="p-4 font-mono text-xs text-[#C6C8BE]">{t.track}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-mono text-sm text-[#93958E]">
          {copy.textNoMatchingTeams}
        </p>
      )}
    </div>
  );
}

/**
 * Winners Component
 */
export function Winners() {
  if (!event.showWinners && !event.winnersOpen) {
    return <Pending text="Final podium standings and winning squad projects will be officially announced after final presentations on 29 January 2027." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {event.winners.map((w, i) => (
        <div key={w.name} className="p-6 bg-[#191A18] border border-white/20">
          <span className="font-mono text-xs text-lime font-bold block mb-1">
            {copy.textPlace} {i + 1}
          </span>
          <h3 className="font-display text-xl text-paper uppercase">{w.name}</h3>
          <p className="text-sm text-[#C6C8BE] mt-1">{w.project}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Pending "Awaiting Official Announcement" card (Truthful, non-deceptive)
 */
function Pending({ text }: { text: string }) {
  return (
    <div className="p-8 sm:p-12 text-center bg-[#191A18] border border-white/20 max-w-xl mx-auto my-8 space-y-4">
      <div className="inline-block px-3 py-1 font-mono text-xs font-bold text-ink bg-lime">
        OFFICIAL NOTICE
      </div>
      <h3 className="font-display text-2xl sm:text-3xl text-paper uppercase tracking-tight">
        AWAITING ANNOUNCEMENT
      </h3>
      <p className="text-base text-[#C6C8BE] leading-relaxed">
        {text}
      </p>
    </div>
  );
}

/**
 * About SCET & Organizing Committee Component
 */
export function About() {
  return (
    <div className="space-y-16">
      <div className="max-w-3xl space-y-6">
        <p className="text-lg sm:text-xl text-[#C6C8BE] leading-relaxed">
          Sarvajanik College of Engineering &amp; Technology (SCET), Surat is a constituent college of Sarvajanik University. Established in 1995, SCET stands at the heart of Gujarat's vibrant industrial and technological corridor.
        </p>
        <p className="text-base sm:text-lg text-[#C6C8BE] leading-relaxed">
          {event.interdisciplinaryHighlight}
        </p>
      </div>

      {/* Organizing Team Grid */}
      <div>
        <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-lime mb-6">
          <span className="w-2 h-2 bg-current rotate-45 inline-block" aria-hidden="true" />
          <span>Core Organizing Leads</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {event.crew.map(([role, responsibility]) => (
            <article
              key={role}
              className="p-6 bg-[#191A18] border border-white/[0.19] flex flex-col justify-between"
            >
              <div>
                <small className="font-mono text-[10px] uppercase text-lime font-bold block mb-1">
                  ROLE
                </small>
                <h3 className="font-display text-base text-paper uppercase tracking-tight mb-2">
                  {role}
                </h3>
              </div>
              <p className="text-xs text-[#93958E] leading-relaxed mt-4 pt-3 border-t border-white/10">
                {responsibility}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Contact & Map Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-white/[0.19]">
        {/* Contact Form */}
        <div className="md:col-span-6 p-6 sm:p-8 bg-[#191A18] border border-white/[0.19]">
          <h3 className="font-display text-xl text-paper uppercase mb-4 tracking-tight">
            Direct Inquiries
          </h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              location.href =
                "mailto:" +
                event.email +
                "?subject=" +
                encodeURIComponent("SCETATHON enquiry from " + fd.get("name")) +
                "&body=" +
                encodeURIComponent(
                  String(fd.get("message")) + "\n\n" + fd.get("email")
                );
            }}
          >
            <div>
              <label className="font-mono text-xs text-[#C6C8BE] block mb-1 uppercase">
                Your Name
              </label>
              <input
                name="name"
                required
                className="w-full min-h-[44px] px-3.5 py-2 bg-black/50 border border-white/20 text-paper focus:outline-none focus:border-lime"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-[#C6C8BE] block mb-1 uppercase">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full min-h-[44px] px-3.5 py-2 bg-black/50 border border-white/20 text-paper focus:outline-none focus:border-lime"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-[#C6C8BE] block mb-1 uppercase">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full p-3 bg-black/50 border border-white/20 text-paper focus:outline-none focus:border-lime"
              />
            </div>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-2.5 bg-lime text-ink font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-[#f0ffad] transition-colors cursor-pointer"
            >
              Open Email Draft ↗
            </button>
          </form>
        </div>

        {/* Map & Address */}
        <div className="md:col-span-6 space-y-4">
          <div className="w-full h-72 border border-white/[0.19] overflow-hidden bg-black/50">
            <iframe
              title={copy.textScetCampusMap}
              loading="lazy"
              src={event.map + "&output=embed"}
              className="w-full h-full border-0 grayscale contrast-125"
            />
          </div>
          <div className="p-6 bg-[#191A18] border border-white/[0.19]">
            <p className="font-display text-base text-paper uppercase tracking-tight">
              {event.college}
            </p>
            <p className="text-xs font-mono text-[#93958E] mt-1 leading-relaxed">
              {event.venue}
            </p>
            <a
              href={event.map}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 font-mono text-xs text-lime underline underline-offset-4 font-bold uppercase"
            >
              Open campus location in Google Maps ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
