"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { event, copy } from "@/data/event";
import { TbaReveal } from "../ui/TbaReveal";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");

/**
 * Guidelines & Rules Component
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
      { rootMargin: "-10% 0px -50%" },
    );
    document.querySelectorAll(".rule-item").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="space-y-8">
      <p className="text-lg text-[#182239]/90 max-w-2xl leading-relaxed">
        {copy.textProposedGuidelinesFor2027OrganizersWillConfirm}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Table of contents sidebar */}
        <nav
          className="md:col-span-4 sticky top-28 p-5 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px]"
          aria-label={copy.textRuleSections}
        >
          <span className="font-mono text-xs uppercase tracking-wider text-[#963E29] font-bold block mb-3">
            Table of Contents
          </span>
          <div className="flex flex-col gap-2">
            {event.rules.map(([n]) => (
              <a
                key={n}
                href={"#" + slugify(n)}
                className={`text-sm font-semibold py-1.5 px-2.5 rounded-[2px] transition-colors focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] ${
                  active === slugify(n)
                    ? "bg-[#172C67] text-[#F5EFE2]"
                    : "text-[#182239] hover:bg-[#182239]/10"
                }`}
              >
                {n}
              </a>
            ))}
          </div>
        </nav>

        {/* Rule descriptions */}
        <div className="md:col-span-8 space-y-6">
          {event.rules.map(([title, description]) => (
            <section
              key={title}
              id={slugify(title)}
              className="rule-item p-6 sm:p-8 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px] scroll-mt-28"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#182239]/15">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#182239]">
                  {title}
                </h3>
                <span className="font-mono text-xs text-[#963E29] font-bold">
                  ✓ VERIFIED
                </span>
              </div>
              <p className="text-base sm:text-lg text-[#182239]/85 leading-relaxed mb-6">
                {description}
              </p>
              <button
                type="button"
                className="min-h-[40px] px-4 py-1.5 text-xs font-mono font-semibold text-[#182239] border border-[#182239]/30 bg-[#F5EFE2] rounded-[2px] hover:bg-[#182239]/10 transition-colors focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
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
      <p className="text-lg text-[#182239]/90 max-w-2xl leading-relaxed">
        Projects at SCETATHON are reviewed through a transparent, weighted rubric emphasizing working code, engineering depth, and regional applicability.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Weighted Criteria Bars */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px] space-y-6">
          <span className="font-mono text-xs uppercase tracking-wider text-[#963E29] font-bold block mb-2">
            {copy.textProposedWEIGHTS}
          </span>

          {event.criteria.map(([name, weight]) => (
            <div key={name} className="space-y-2">
              <div className="flex justify-between items-center text-sm sm:text-base font-semibold text-[#182239]">
                <span>{name}</span>
                <span className="font-mono">{weight}%</span>
              </div>
              <div className="w-full h-3 bg-[#F5EFE2] border border-[#182239]/20 rounded-[2px] overflow-hidden">
                <motion.div
                  className="h-full bg-[#172C67]"
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
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px] space-y-6">
          <span className="font-mono text-xs uppercase tracking-wider text-[#963E29] font-bold block mb-2">
            JUDGING STAGES
          </span>
          <ol className="space-y-4">
            {event.judging.map((step, idx) => (
              <li
                key={step}
                className="p-4 bg-[#F5EFE2] border-l-2 border-[#172C67] rounded-[2px]"
              >
                <small className="font-mono text-xs text-[#172C67] font-bold block mb-1">
                  PHASE 0{idx + 1}
                </small>
                <h4 className="font-semibold text-base text-[#182239]">
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
      <p className="text-lg text-[#182239]/90 max-w-2xl leading-relaxed">
        Verified photographic record from the inaugural SCETATHON held at Sarvajanik College of Engineering &amp; Technology, Surat.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <figure className="border border-[#182239]/20 rounded-[2px] bg-[#ECE5D6] overflow-hidden">
          <div className="relative w-full h-[320px]">
            <Image
              src="/archive/novex.jpeg"
              alt="SCETATHON 1.0 Team Novex"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="p-5 bg-[#ECE5D6] border-t border-[#182239]/15">
            <h3 className="font-display text-xl font-bold text-[#182239] mb-1">
              Team Novex · First Place
            </h3>
            <p className="text-sm text-[#182239]/80">
              Computer Engineering champions for Swach App at SCETATHON 1.0 (March 2026).
            </p>
          </figcaption>
        </figure>

        <figure className="border border-[#182239]/20 rounded-[2px] bg-[#ECE5D6] overflow-hidden">
          <div className="relative w-full h-[320px]">
            <Image
              src="/archive/novex.jpeg"
              alt="SCETATHON 1.0 participant squads in the 24-hour build hall"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="p-5 bg-[#ECE5D6] border-t border-[#182239]/15">
            <h3 className="font-display text-xl font-bold text-[#182239] mb-1">
              24-Hour Build Hall
            </h3>
            <p className="text-sm text-[#182239]/80">
              Student engineering squads collaborating through the night in the SCET labs.
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

/**
 * Qualified Teams (Results) Component
 * Controlled by showResults / resultsOpen flags
 */
export function Results() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  if (!event.showResults && !event.resultsOpen) {
    return <Pending text={copy.textQualifiedTeamsWillAppearAfterRound1} />;
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
          <span className="font-mono text-xs text-[#182239]/70 block mb-1">
            {copy.textFindATeam}
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search team name…"
            className="w-full min-h-[44px] px-3.5 py-2 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px] text-[#182239] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
          />
        </label>
        <label>
          <span className="font-mono text-xs text-[#182239]/70 block mb-1">
            {copy.textTrack}
          </span>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="min-h-[44px] px-3.5 py-2 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px] text-[#182239] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
          >
            {["All", ...new Set(event.teams.map((t) => t.track))].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <div className="p-8 text-center bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px] font-mono text-sm">
          {copy.textLoadingTeams}
        </div>
      ) : rows.length > 0 ? (
        <div className="border border-[#182239]/20 rounded-[2px] overflow-hidden bg-[#ECE5D6]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#182239]/20 bg-[#F5EFE2]">
                <th className="p-3.5 font-mono text-xs text-[#182239]">
                  {copy.textQualifiedTeam}
                </th>
                <th className="p-3.5 font-mono text-xs text-[#182239]">
                  {copy.textTrack}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.name} className="border-b border-[#182239]/10">
                  <td className="p-3.5 font-semibold text-[#182239]">{t.name}</td>
                  <td className="p-3.5 font-mono text-xs text-[#182239]/80">{t.track}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-mono text-sm text-[#182239]/70">
          {copy.textNoMatchingTeams}
        </p>
      )}
    </div>
  );
}

/**
 * Winners Component
 * Controlled by showWinners / winnersOpen flags
 */
export function Winners() {
  if (!event.showWinners && !event.winnersOpen) {
    return <Pending text={copy.textThe2027PodiumAndTeamGalleryWill} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {event.winners.map((w, i) => (
        <div key={w.name} className="p-6 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px]">
          <span className="font-mono text-xs text-[#963E29] font-bold block mb-1">
            {copy.textPlace} {i + 1}
          </span>
          <h3 className="font-display text-xl font-bold text-[#182239]">{w.name}</h3>
          <p className="text-sm text-[#182239]/80 mt-1">{w.project}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Pending "Coming Soon" card
 */
function Pending({ text }: { text: string }) {
  return (
    <div className="p-8 sm:p-12 text-center bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px] space-y-4 max-w-xl mx-auto my-8">
      <div className="inline-block px-3 py-1 font-mono text-xs font-bold text-[#F5EFE2] bg-[#172C67] rounded-[2px]">
        🔒 {copy.textComingSOON}
      </div>
      <h3 className="font-display text-2xl font-bold text-[#182239]">
        {copy.textAwaitingAnnouncement}
      </h3>
      <p className="text-base text-[#182239]/85 leading-relaxed">
        {text}
      </p>
      <div className="pt-2">
        <TbaReveal
          label="Round details · To be announced"
          revealedText="The organizers will publish round dates and submission deadlines here."
        />
      </div>
    </div>
  );
}

/**
 * About SCET & Organizing Committee Component
 */
export function About() {
  return (
    <div className="space-y-12">
      <p className="text-lg sm:text-xl text-[#182239]/90 max-w-3xl leading-relaxed">
        {event.college}
        {copy.textIsAConstituentCollegeOfSarvajanikUniversity}
        {event.intro}
      </p>

      {/* Organizing Team Grid */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#182239] mb-6">
          {copy.textOrganizingTeam}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {event.crew.map(([role, responsibility]) => (
            <article
              key={role}
              className="p-5 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px]"
            >
              <small className="font-mono text-xs uppercase text-[#963E29] font-bold block mb-1">
                {copy.textOrganizingROLE}
              </small>
              <h3 className="font-semibold text-base text-[#182239] mb-1">
                {role}
              </h3>
              <p className="text-sm text-[#182239]/75">
                {responsibility}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Contact & Map Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-6 border-t border-[#182239]/15">
        {/* Contact Form */}
        <div className="md:col-span-6 p-6 sm:p-8 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px]">
          <h3 className="font-display text-xl font-bold text-[#182239] mb-4">
            {copy.textContactTheOrganizers}
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
                  String(fd.get("message")) + "\n\n" + fd.get("email"),
                );
            }}
          >
            <div>
              <label className="font-mono text-xs text-[#182239]/70 block mb-1">
                {copy.textYourName}
              </label>
              <input
                name="name"
                required
                className="w-full min-h-[44px] px-3.5 py-2 bg-[#F5EFE2] border border-[#182239]/20 rounded-[2px] text-[#182239] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-[#182239]/70 block mb-1">
                {copy.textEmail}
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full min-h-[44px] px-3.5 py-2 bg-[#F5EFE2] border border-[#182239]/20 rounded-[2px] text-[#182239] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-[#182239]/70 block mb-1">
                {copy.textMessage}
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full p-3 bg-[#F5EFE2] border border-[#182239]/20 rounded-[2px] text-[#182239] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
              />
            </div>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-2.5 bg-[#172C67] text-[#F5EFE2] font-semibold text-sm rounded-[2px] hover:bg-[#172C67]/90 transition-colors focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
            >
              {copy.textOpenEmailDraft}
            </button>
          </form>
        </div>

        {/* Map & Address */}
        <div className="md:col-span-6 space-y-4">
          <div className="w-full h-72 border border-[#182239]/20 rounded-[2px] overflow-hidden bg-[#ECE5D6]">
            <iframe
              title={copy.textScetCampusMap}
              loading="lazy"
              src={event.map + "&output=embed"}
              className="w-full h-full border-0"
            />
          </div>
          <div className="p-4 bg-[#ECE5D6] border border-[#182239]/15 rounded-[2px]">
            <p className="font-semibold text-sm text-[#182239]">
              {event.college}
            </p>
            <p className="text-xs text-[#182239]/70 mt-0.5">
              {event.venue}
            </p>
            <a
              href={event.map}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 font-mono text-xs text-[#172C67] underline underline-offset-4 font-semibold"
            >
              Open campus location in Google Maps ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
