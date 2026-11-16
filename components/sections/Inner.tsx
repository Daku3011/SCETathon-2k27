"use client";
import { matchesSearch } from "@/lib/search";
import { Announcement } from "../ui/Announcement";
import { copy } from "@/data/event";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { event } from "@/data/event";
const id = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
export function Guidelines() {
  const [active, set] = useState(id(event.rules[0][0])),
    [copied, setCopied] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) set(e.target.id);
      },
      { rootMargin: "-10% 0px -50%" },
    );
    document.querySelectorAll(".rule").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <>
      <p>{copy.textProposedGuidelinesFor2027OrganizersWillConfirm}</p>
      <div className="split">
        <nav className="toc" aria-label={copy.textRuleSections}>
          {event.rules.map(([n]) => (
            <a
              className={active === id(n) ? "active" : ""}
              key={n}
              href={"#" + id(n)}
            >
              {n}
            </a>
          ))}
        </nav>
        <div>
          {event.rules.map(([n, d]) => (
            <section className="card rule" key={n} id={id(n)}>
              <h3>{n}</h3>
              {d === "To be announced." ? (
                <Announcement label="Rounds" />
              ) : (
                <p>{d}</p>
              )}
              <button
                className="btn"
                onClick={async () => {
                  location.hash = id(n);
                  try {
                    await navigator.clipboard.writeText(location.href);
                    setCopied(n);
                  } catch {
                    setCopied("");
                  }
                }}
              >
                {copied === n ? "Link copied" : "Copy section link"}
              </button>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
export function Evaluation() {
  return (
    <div className="publication-note">
      <small>{copy.textProposedWEIGHTS}</small>
      <h2>Evaluation details are being prepared.</h2>
      <p>Judging criteria and any scoring weights will be published after organizer approval.</p>
    </div>
  );
}
export function Gallery() {
  return (
    <div className="grid gallery">
      {event.archive.map(([src, n, d]) => (
        <figure className="card" key={src}>
          <a href={"/archive/" + src}>
            <Image
              className="photo"
              src={"/archive/" + src}
              alt={n}
              width={600}
              height={400}
            />
          </a>
          <figcaption>
            <h3>{n}</h3>
            {d === "To be announced." ? (
              <Announcement label="Rounds" />
            ) : (
              <p>{d}</p>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
export function Results() {
  const [q, set] = useState(""),
    [cat, filter] = useState("All"),
    [loading, load] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => load(false), 240);
    return () => clearTimeout(t);
  }, []);
  if (!event.resultsOpen)
    return <Pending text={copy.textQualifiedTeamsWillAppearAfterRound1} />;
  const rows = event.teams.filter(
    (t) => (cat === "All" || t.track === cat) && matchesSearch(t.name, q),
  );
  return (
    <>
      <label>
        {copy.textFindATeam}
        <input value={q} onChange={(e) => set(e.target.value)} />
      </label>
      <label>
        {copy.textTrack}
        <select value={cat} onChange={(e) => filter(e.target.value)}>
          {["All", ...new Set(event.teams.map((t) => t.track))].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      {loading ? (
        <div className="card animate-pulse">{copy.textLoadingTeams}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{copy.textQualifiedTeam}</th>
              <th>{copy.textTrack}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.name}>
                <td>{t.name}</td>
                <td>{t.track}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !rows.length && <p>{copy.textNoMatchingTeams}</p>}
    </>
  );
}
function Pending({ text }: { text: string }) {
  return (
    <div className="card">
      <small>{copy.textComingSOON}</small>
      <Announcement label="publication" detail={text} />
    </div>
  );
}
export function Winners() {
  const reduced = useReducedMotion(),
    [celebrate, set] = useState(false);
  useEffect(() => {
    if (event.winnersOpen && !reduced && !sessionStorage.scetConfetti) {
      sessionStorage.scetConfetti = "1";
      set(true);
    }
  }, [reduced]);
  if (!event.winnersOpen)
    return <Pending text={copy.textThe2027PodiumAndTeamGalleryWill} />;
  return (
    <>
      <div className="podium relative">
        {celebrate &&
          Array.from({ length: 24 }, (_, i) => (
            <motion.i
              aria-hidden
              className="absolute active"
              key={i}
              style={{ left: ((i * 37) % 100) + "%" }}
              animate={{ y: [0, 160], rotate: [0, 120], opacity: [1, 0] }}
            >
              ▪
            </motion.i>
          ))}
        {event.winners.map((w, i) => (
          <motion.article
            key={w.name}
            className="card"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
          >
            <small>
              {copy.textPlace}
              {i + 1}
            </small>
            <h3>{w.name}</h3>
            <p>{w.project}</p>
            {w.photo && (
              <Image
                className="photo"
                src={w.photo}
                alt={w.name}
                width={460}
                height={300}
              />
            )}
          </motion.article>
        ))}
      </div>
    </>
  );
}
export function About() {
  return (
    <>
      <p className="lead">{event.intro}</p>
      <h2>{copy.textOrganizingTeam}</h2>
      <div className="grid">
        {event.crew.map(([n, d]) => (
          <article className="card crew" key={n}>
            <small>{copy.textOrganizingROLE}</small>
            <h3>{n}</h3>
            {d === "To be announced." ? (
              <Announcement label="Rounds" />
            ) : (
              <p>{d}</p>
            )}
          </article>
        ))}
      </div>
      <div className="split mt-10">
        <form
          className="card"
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
          <h3>{copy.textContactTheOrganizers}</h3>
          <label>
            {copy.textYourName}
            <input name="name" required />
          </label>
          <label>
            {copy.textEmail}
            <input type="email" name="email" required />
          </label>
          <label>
            {copy.textMessage}
            <textarea name="message" required />
          </label>
          <button className="btn">{copy.textOpenEmailDraft}</button>
        </form>
        <div>
          <iframe
            title={copy.textScetCampusMap}
            loading="lazy"
            src={event.map + "&output=embed"}
          />
          <a href={event.map}>{event.venue} ↗</a>
        </div>
      </div>
    </>
  );
}
