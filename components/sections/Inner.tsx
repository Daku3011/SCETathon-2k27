"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { event, copy } from "@/data/event";
import { ArrowUpRight } from "@/components/ui/Icons";

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
          className="lg:col-span-4 sticky top-28 p-6 bg-surface border border-line"
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
                    ? "bg-lime text-[#171915]"
                    : "text-muted hover:text-paper hover:bg-ink/5"
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
              className="rule-item p-6 sm:p-8 bg-surface border border-line scroll-mt-28"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
                <h3 className="font-display text-xl sm:text-2xl text-paper uppercase tracking-tight">
                  {title}
                </h3>
                <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-wider border border-lime/40 px-2 py-0.5">
                  ✓ VERIFIED
                </span>
              </div>
              <p className="text-base sm:text-lg text-muted leading-relaxed mb-6">
                {description}
              </p>
              <button
                type="button"
                className="px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-paper border border-line-strong hover:border-lime hover:text-lime transition-colors cursor-pointer"
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
                {copied === title ? (
                  "✓ Link copied to clipboard"
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <span>Copy section link</span>
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2.4} />
                  </span>
                )}
              </button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

import { EvaluationView } from "@/components/evaluation/EvaluationView";

/**
 * Evaluation Rubric Component
 */
export function Evaluation() {
  return <EvaluationView />;
}

/**
 * Archive Gallery Component
 */
export function Gallery() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <figure className="border border-line bg-surface overflow-hidden">
          <div className="relative w-full h-[340px]">
            <Image
              src="/archive/novex.jpeg"
              alt="SCETATHON 1.0 Team Novex"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="p-6 bg-surface border-t border-line">
            <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-wider block mb-1">
              HISTORICAL ARCHIVE · MARCH 2026
            </span>
            <h3 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
              Team Novex · First Place
            </h3>
            <p className="text-sm text-muted">
              Computer Engineering champions for Swach App at the inaugural SCETATHON 1.0.
            </p>
          </figcaption>
        </figure>

        <figure className="border border-line bg-surface overflow-hidden">
          <div className="relative w-full h-[340px]">
            <Image
              src="/archive/novex.jpeg"
              alt="SCETATHON 1.0 participant squads in the 24-hour build hall"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="p-6 bg-surface border-t border-line">
            <span className="font-mono text-[10px] text-coral font-bold uppercase tracking-wider block mb-1">
              HISTORICAL ARCHIVE · MARCH 2026
            </span>
            <h3 className="font-display text-xl text-paper uppercase tracking-tight mb-2">
              24-Hour Build Hall
            </h3>
            <p className="text-sm text-muted">
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
            className="w-full min-h-[44px] px-4 py-2.5 bg-surface border border-line text-paper focus:outline-none focus:border-lime"
          />
        </label>
        <label>
          <span className="font-mono text-[11px] text-paper/70 block mb-1 uppercase tracking-wider">
            {copy.textTrack}
          </span>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="min-h-[44px] px-4 py-2.5 bg-surface border border-line text-paper focus:outline-none focus:border-lime"
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
        <div className="border border-line overflow-hidden bg-surface">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line bg-ink/40">
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
                <tr key={t.name} className="border-b border-line hover:bg-ink/5">
                  <td className="p-4 font-bold text-paper">{t.name}</td>
                  <td className="p-4 font-mono text-xs text-muted">{t.track}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-mono text-sm text-muted">
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
        <div key={w.name} className="p-6 bg-surface border border-line">
          <span className="font-mono text-xs text-lime font-bold block mb-1">
            {copy.textPlace} {i + 1}
          </span>
          <h3 className="font-display text-xl text-paper uppercase">{w.name}</h3>
          <p className="text-sm text-muted mt-1">{w.project}</p>
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
    <div className="p-8 sm:p-12 text-center bg-surface border border-line max-w-xl mx-auto my-8 space-y-4">
      <div className="inline-block px-3 py-1 font-mono text-xs font-bold text-[#171915] bg-lime">
        OFFICIAL NOTICE
      </div>
      <h3 className="font-display text-2xl sm:text-3xl text-paper uppercase tracking-tight">
        AWAITING ANNOUNCEMENT
      </h3>
      <p className="text-base text-muted leading-relaxed">
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
      {/* College & Department Interdisciplinary Context */}
      <div className="max-w-3xl space-y-6">
        <p className="text-lg sm:text-xl text-muted leading-relaxed">
          Sarvajanik College of Engineering &amp; Technology (SCET), Surat is a constituent college of Sarvajanik University. Established in 1995, SCET stands at the heart of Gujarat's vibrant industrial and technological corridor.
        </p>
        <div className="p-5 sm:p-6 bg-surface border-l-2 border-lime border-y border-r border-line">
          <span className="font-mono text-[10px] text-lime font-bold uppercase tracking-wider block mb-2">
            INTERDISCIPLINARY CO-HOST INITIATIVE
          </span>
          <p className="text-base sm:text-lg text-paper leading-relaxed">
            {event.interdisciplinaryHighlight}
          </p>
        </div>
      </div>

      {/* Faculty Coordinators Box */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-lime">
            <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
            <span>Faculty Coordinators</span>
          </div>
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
            Academic Mentorship &amp; Governance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {event.facultyCoordinators.map((faculty, idx) => (
            <article
              key={faculty.name}
              className="relative p-6 sm:p-7 bg-surface border border-line hover:border-lime/70 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Corner accent glow on hover */}
              <div
                className="absolute top-0 right-0 w-24 h-24 bg-lime/5 -rotate-45 translate-x-12 -translate-y-12 pointer-events-none group-hover:bg-lime/10 transition-colors"
                aria-hidden="true"
              />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between font-mono text-[10px] text-lime uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 bg-lime rounded-full" aria-hidden="true" />
                    COORD // 0{idx + 1}
                  </span>
                  <span className="border border-lime/40 bg-lime/5 px-2 py-0.5 text-lime font-bold">
                    FACULTY
                  </span>
                </div>

                {/* Portrait Frame with Stitch Technical Accents */}
                <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 mb-6">
                  {/* Technical corner brackets */}
                  <div
                    className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-lime/50 group-hover:border-lime transition-colors z-20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-lime/50 group-hover:border-lime transition-colors z-20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-lime/50 group-hover:border-lime transition-colors z-20"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-lime/50 group-hover:border-lime transition-colors z-20"
                    aria-hidden="true"
                  />

                  <div className="relative w-full h-full overflow-hidden rounded-[2px] border border-line bg-ink/60 shadow-lg group-hover:border-lime/70 transition-colors">
                    {faculty.image ? (
                      <Image
                        src={faculty.image}
                        alt={`Portrait of ${faculty.name}`}
                        fill
                        sizes="(max-width: 640px) 128px, 144px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted">
                        FACULTY
                      </div>
                    )}
                    {/* Subtle bottom vignette */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Faculty Info */}
                <div className="text-center space-y-2">
                  <h3 className="font-display text-lg sm:text-xl text-paper uppercase tracking-tight group-hover:text-lime transition-colors">
                    {faculty.name}
                  </h3>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-ink/5 border border-line font-mono text-[11px] text-lime font-bold uppercase tracking-wider">
                      {faculty.role}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted leading-relaxed pt-1">
                    {faculty.dept || "SCET Surat"}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs text-muted">
                <span className="font-mono text-[11px] uppercase tracking-wider">SCET SURAT</span>
                <span className="font-mono text-[11px] text-lime font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>MENTOR</span>
                  <span className="text-lime" aria-hidden="true">✓</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Student Organizing Committee Box */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-coral">
            <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
            <span>Student Organizing Committee</span>
          </div>
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
            Core Committee Heads &amp; Operations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {event.studentTeam.map((lead, idx) => (
            <article
              key={lead.name}
              className="p-6 bg-surface border border-line hover:border-coral/60 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-coral uppercase tracking-widest mb-3">
                  <span>HEAD // SCET</span>
                  <span className="text-muted font-mono">[{lead.committee || "COMMITTEE"}]</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl text-paper uppercase tracking-tight group-hover:text-coral transition-colors">
                  {lead.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                  {lead.role}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-line flex items-center justify-between font-mono text-[10px] text-muted uppercase">
                <span>SCETATHON 2.0 SPRINT</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Institutional Patronage & Infrastructure */}
      {/* <div className="p-6 sm:p-8 bg-black/40 border border-white/[0.12] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <small className="font-mono text-[10px] uppercase text-lilac font-bold tracking-wider block mb-1">
            PATRONAGE &amp; INSTITUTIONAL LEADERSHIP
          </small>
          <h4 className="font-display text-base text-paper uppercase tracking-tight mb-2">
            Sarvajanik University &amp; SCET Administration
          </h4>
          <p className="text-xs text-[#93958E] leading-relaxed">
            Institutional guidance, venue facilities, and state-of-the-art campus computing and laboratory infrastructure provided by Sarvajanik University and Sarvajanik College of Engineering &amp; Technology.
          </p>
        </div>
        <div>
          <small className="font-mono text-[10px] uppercase text-lilac font-bold tracking-wider block mb-1">
            CAMPUS INFRASTRUCTURE &amp; LABS
          </small>
          <h4 className="font-display text-base text-paper uppercase tracking-tight mb-2">
            High-Performance Labs &amp; Network
          </h4>
          <p className="text-xs text-[#93958E] leading-relaxed">
            Equipped with uninterrupted Gigabit campus WiFi, high-power compute environments, hardware testing benches, and 24-hour campus security for all participant squads.
          </p>
        </div>
      </div> */}

      {/* Contact & Map Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-line">
        {/* Contact Form */}
        <div className="md:col-span-6 p-6 sm:p-8 bg-surface border border-line">
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
              <label className="font-mono text-xs text-muted block mb-1 uppercase">
                Your Name
              </label>
              <input
                name="name"
                required
                className="w-full min-h-[44px] px-3.5 py-2 bg-ink/50 border border-line text-paper focus:outline-none focus:border-lime"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted block mb-1 uppercase">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full min-h-[44px] px-3.5 py-2 bg-ink/50 border border-line text-paper focus:outline-none focus:border-lime"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted block mb-1 uppercase">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full p-3 bg-ink/50 border border-line text-paper focus:outline-none focus:border-lime"
              />
            </div>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-2.5 bg-lime text-[#171915] font-mono text-[11px] font-bold uppercase tracking-wider hover:brightness-105 transition-[filter] cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Open Email Draft</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
            </button>
          </form>
        </div>

        {/* Map & Address */}
        <div className="md:col-span-6 space-y-4">
          <div className="w-full h-72 border border-line overflow-hidden bg-ink/50">
            <iframe
              title={copy.textScetCampusMap}
              loading="lazy"
              src={event.map + "&output=embed"}
              className="w-full h-full border-0 grayscale contrast-125"
            />
          </div>
          <div className="p-6 bg-surface border border-line">
            <p className="font-display text-base text-paper uppercase tracking-tight">
              {event.college}
            </p>
            <p className="text-xs font-mono text-muted mt-1 leading-relaxed">
              {event.venue}
            </p>
            <a
              href={event.map}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 font-mono text-xs text-lime underline underline-offset-4 font-bold uppercase"
            >
              <span>Open campus location in Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
