"use client";
import { copy } from "@/data/event";

import { useEffect, useRef, useState } from "react";
import * as A from "@radix-ui/react-accordion";
import { event } from "@/data/event";
import { Count, Reveal } from "../motion/Effects";
import Problems from "./Problems";
import { Register } from "../ui/Register";
const date = (s: string) =>
  s
    ? new Date(s).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Date pending";
export function Section({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section wrap">
      <Reveal>
        <small>
          // {tag}
          {copy.textInit}
        </small>
        <h2>{title}</h2>
        {children}
      </Reveal>
    </section>
  );
}
export function Timeline() {
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let clean = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !rail.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
            gsap.fromTo(
              ".rail-line",
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: rail.current,
                  start: "top 80%",
                  end: "bottom 60%",
                  scrub: true,
                },
              },
            );
          rail
            .current!.querySelectorAll("article")
            .forEach((el) =>
              ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                onEnter: () => el.classList.add("lit"),
              }),
            );
        }, rail);
        clean = () => ctx.revert();
      },
    );
    return () => {
      disposed = true;
      clean();
    };
  }, []);
  return (
    <div className="split">
      <div ref={rail} className="rail mobile-rail">
        <i className="rail-line" />
        {event.milestones.map(([n, d], i) => (
          <article key={n}>
            <small>{date(["", event.round1, "", event.start][i])}</small>
            <h3>{n}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <aside className="card agenda">
        <small>{copy.textRound02PROPOSEDRUNOFSHOW}</small>
        <h3>{copy.text24HoursAtSCET}</h3>
        <p>
          {event.start ? date(event.start) : "Start date pending · 11 am IST"} →{" "}
          {event.end ? date(event.end) : "Next day · 11 am IST"}
        </p>
        <ol>
          {event.agenda.map(([t, n]) => (
            <li key={t + n}>
              <time>{t}</time>
              {n}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
export function Sponsors() {
  return (
    <>
      <p>
        {copy.textIllustrativeSponsorIdentitiesPartnershipsAwaitConfirmation}
      </p>
      <div className="grid">
        {event.sponsors.map(([tier, name], i) => (
          <article className="card sponsor" key={tier}>
            <small>
              {tier.toUpperCase()}
              {copy.textPartner}
            </small>
            <svg viewBox="0 0 48 48" aria-hidden>
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                transform={"rotate(" + i * 25 + " 24 24)"}
              >
                <ellipse cx="24" cy="24" rx="20" ry="9" />
                <ellipse cx="24" cy="24" rx="9" ry="20" />
              </g>
            </svg>
            <h3>{name}</h3>
          </article>
        ))}
      </div>
      <a
        className="btn mt-4"
        href={
          "mailto:" + event.email + "?subject=SCETATHON%202027%20sponsorship"
        }
      >
        {copy.textBecomeASponsor}
      </a>
    </>
  );
}
function About() {
  const code = JSON.stringify(
      {
        edition: event.name,
        venue: event.venue,
        team: event.team,
        rounds: event.rounds,
        buildHours: event.hours,
      },
      null,
      2,
    ),
    [typed, set] = useState(code);
  const ref = useRef<HTMLPreElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setInterval>;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let i = 0;
      t = setInterval(() => {
        i += 6;
        set(code.slice(0, i));
        if (i >= code.length) clearInterval(t);
      }, 20);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(t);
    };
  }, [code]);
  return (
    <div className="split">
      <p className="lead">{event.intro}</p>
      <div className="card">
        <small>{copy.textHackathonConfigTs}</small>
        <pre ref={ref} className="code" aria-label={code}>
          {typed}
        </pre>
      </div>
    </div>
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
              <p>{d}</p>
            </A.Content>
          </A.Item>
        ))}
      </A.Root>
      {!matches.length && <p>{copy.textNoMatchingQuestions}</p>}
    </>
  );
}
export default function HomeSections() {
  const ticker =
    "BUILD • BREAK • SHIP • REPEAT   /   TOP THREE PRIZES · AMOUNTS TBA";
  return (
    <>
      <div aria-label={ticker} className="ticker">
        <div aria-hidden className="track">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{ticker}</span>
          ))}
        </div>
      </div>
      <Section title={copy.textFromIdeaToPrototype} tag={copy.textAbout}>
        <About />
      </Section>
      <Section title={copy.textWhyJoin} tag={copy.textExperience}>
        <div className="grid">
          {event.features.map(([n, d], i) => (
            <article
              key={n}
              className="card spot"
              onPointerMove={(e) => {
                if (
                  e.pointerType !== "mouse" ||
                  matchMedia("(prefers-reduced-motion: reduce)").matches
                )
                  return;
                const r = e.currentTarget.getBoundingClientRect(),
                  x = (e.clientX - r.left) / r.width,
                  y = (e.clientY - r.top) / r.height;
                e.currentTarget.style.setProperty("--x", x * 100 + "%");
                e.currentTarget.style.setProperty("--y", y * 100 + "%");
                e.currentTarget.style.transform =
                  "perspective(700px) rotateY(" +
                  (x - 0.5) * 6 +
                  "deg) rotateX(" +
                  (0.5 - y) * 6 +
                  "deg)";
              }}
              onPointerLeave={(e) => (e.currentTarget.style.transform = "")}
            >
              <small>{["✳", "⌘", "✦", "◇"][i]}</small>
              <h3>{n}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title={copy.textTheBuildSchedule} tag={copy.textTimeline}>
        <Timeline />
      </Section>
      <Section title={copy.textPickYourProblem} tag={copy.textChallenges}>
        <Problems preview />
      </Section>
      <Section title={copy.textOnThePodium} tag={copy.textPrizes}>
        <div className="podium">
          {event.prizes.map((p) => (
            <article className="card" key={p.place}>
              <small>{copy.textPrize}</small>
              <h2>{p.place}</h2>
              {p.amount !== null ? (
                <strong>
                  ₹<Count value={p.amount} />
                </strong>
              ) : (
                <p>{copy.textAmountToBeAnnounced}</p>
              )}
            </article>
          ))}
        </div>
      </Section>
      <Section title={copy.textEventPartnersAlt} tag={copy.textSponsors}>
        <Sponsors />
      </Section>
      <Section title={copy.textQuestionsFromBuilders} tag={copy.textFaq}>
        <Faq />
      </Section>
      <div className="wrap cta">
        <small>{copy.textRound01ONLINE}</small>
        <h2>{copy.textBringYourTeam}</h2>
        <p>
          {event.round1
            ? "Register before " + date(event.round1)
            : "Registration deadline to be announced."}
        </p>
        <Register />
      </div>
    </>
  );
}
