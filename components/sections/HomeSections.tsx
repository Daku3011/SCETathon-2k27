import Link from "next/link";
import * as A from "@radix-ui/react-accordion";
import { event } from "@/data/event";
import { Announcement } from "../ui/Announcement";

export function Sponsors() {
  return (
    <div className="publication-note">
      <small>{event.sponsorsPublished ? "PARTNERS" : "PARTNERSHIPS"}</small>
      <h2>{event.sponsorsPublished ? "Our event partners" : "Partner announcements are coming later."}</h2>
      <p>Confirmed sponsor names and marks will be shared here by the organizers.</p>
      <a className="text-link" href={`mailto:${event.email}?subject=SCETATHON%202.0%20partnership`}>Contact the organizers <span aria-hidden="true">↗</span></a>
    </div>
  );
}

export function Timeline() {
  const rows = [
    ["Event dates", event.displayDate],
    ["Venue", event.venue],
    ["Daily schedule", "To be announced"],
    ["Registration", "To be announced"],
  ];
  return <dl className="ledger">{rows.map(([label, value], index) => <div key={label}><dt><span className="index">0{index + 1}</span>{label}</dt><dd>{value === "To be announced" ? <Announcement label={label} /> : value}</dd></div>)}</dl>;
}

function Faq() {
  return <A.Root type="single" collapsible className="faq-list">{event.faq.map(([question, answer]) => <A.Item className="faq" value={question} key={question}><A.Header><A.Trigger>{question}<span aria-hidden="true">+</span></A.Trigger></A.Header><A.Content><p>{answer}</p></A.Content></A.Item>)}</A.Root>;
}

export default function HomeSections() {
  return <div className="wrap home-content">
    <section className="spread intro-spread" id="about">
      <div><p className="eyebrow">01 / THE GATHERING</p><h2>Ideas need<br /><em>makers.</em></h2></div>
      <div className="intro-copy"><p className="lead">SCETATHON is a student hackathon hosted by Sarvajanik College of Engineering &amp; Technology in Surat.</p><p>Across two days, students will come together to explore challenges and make prototypes. Challenge briefs, eligibility and the complete programme will be published once approved.</p><Link className="text-link" href="/about">More about the event <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className="spread challenge-callout" id="challenges">
      <div><p className="eyebrow">02 / OPEN BRIEFS</p><h2>Start with<br />a good question.</h2></div>
      <div><p className="lead">The 2027 challenge statements are being prepared.</p><p>We&apos;ll publish the official briefs here when they&apos;re ready. No sample or previous-edition problems are presented as current.</p><Link className="text-link" href="/problems">Challenge updates <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className="spread" id="programme"><div><p className="eyebrow">03 / THE PLAN</p><h2>Good things<br />take shape.</h2></div><div><Timeline /><Link className="text-link" href="/timeline">Full programme <span aria-hidden="true">↗</span></Link></div></section>
    <section className="spread participation"><div><p className="eyebrow">04 / TAKE PART</p><h2>Bring your<br /><em>curiosity.</em></h2></div><div className="participation-copy"><p className="lead">A shared space to make, test, and learn.</p>{event.features.map(([title, body], index) => <div className="feature-row" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}<Link className="text-link" href="/guidelines">Participation updates <span aria-hidden="true">↗</span></Link></div></section>
    <section className="spread" id="archive"><div><p className="eyebrow">05 / THE PLACE</p><h2>Made in<br />Surat.</h2></div><div className="archive-note"><p className="lead">Sarvajanik College of Engineering &amp; Technology</p><p>SCET is the host institution for SCETATHON 2.0. Find the campus in Surat, Gujarat.</p><a className="text-link" href={event.map} target="_blank" rel="noreferrer">Campus map <span aria-hidden="true">↗</span></a></div></section>
    <section className="spread faq-spread" id="faq"><div><p className="eyebrow">06 / QUICK ANSWERS</p><h2>Good to<br />know.</h2></div><div><Faq /></div></section>
    <section className="closing-band"><p className="eyebrow">28—29 JANUARY 2027 · SCET, SURAT</p><h2>See you at<br /><em>SCETATHON.</em></h2><Link className="button-link" href="/about">Get event updates <span aria-hidden="true">↗</span></Link></section>
  </div>;
}
