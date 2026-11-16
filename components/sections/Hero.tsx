import Image from "next/image";
import Link from "next/link";
import { event } from "@/data/event";
import { Register } from "../ui/Register";

function SignalArtwork() {
  return (
    <div className="signal-art" role="img" aria-label="Original line artwork combining a hand-drawn geometric diamond and circuit paths">
      <svg viewBox="0 0 560 500" fill="none" aria-hidden="true">
        <path className="art-grid" d="M0 50H560M0 150H560M0 250H560M0 350H560M0 450H560M60 0V500M160 0V500M260 0V500M360 0V500M460 0V500" />
        <path className="mandana" d="M280 38 492 250 280 462 68 250 280 38Z M280 82 448 250 280 418 112 250 280 82Z M280 126 404 250 280 374 156 250 280 126Z" />
        <path className="circuit" d="M280 126V67H374V28M404 250H500V176H540M280 374V432H194V472M156 250H62V322H22M280 82V150L344 214V250H404M112 250H194L246 302V374" />
        <rect className="chip" x="225" y="195" width="110" height="110" rx="2" />
        <path className="pin" d="M246 178V195M268 178V195M290 178V195M312 178V195M246 305V322M268 305V322M290 305V322M312 305V322M208 216H225M208 238H225M208 260H225M208 282H225M335 216H352M335 238H352M335 260H352M335 282H352" />
        <circle className="node" cx="374" cy="28" r="6" /><circle className="node" cx="540" cy="176" r="6" /><circle className="node" cx="22" cy="322" r="6" /><circle className="node" cx="194" cy="472" r="6" />
        <path className="flower" d="M482 90c0 22-15 37-37 37 22 0 37 15 37 37 0-22 15-37 37-37-22 0-37-15-37-37Zm-404 248c0 17-12 29-29 29 17 0 29 12 29 29 0-17 12-29 29-29-17 0-29-12-29-29Z" />
      </svg>
      <span className="art-caption">FIG. 01 <i /> SIGNAL / FORM</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-topline"><span>SCET · SURAT</span><span>EST. FOR THE NEXT</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">A student innovation gathering</p>
          <h1 id="hero-title">BUILD<br /><em>WHAT&apos;S</em><br />NEXT<span className="hero-period">.</span></h1>
          <p className="hero-intro">A place for ambitious ideas, thoughtful engineering, and the people ready to make something real.</p>
          <p className="hero-date">{event.displayDate}<span> / </span>Surat, Gujarat</p>
          <p className="hero-host">Hosted by {event.college}</p>
          <div className="edition-actions"><Register /><Link className="text-link" href="/problems">Explore challenges <span aria-hidden="true">↗</span></Link></div>
        </div>
        <SignalArtwork />
      </div>
      <div className="hero-wordmark"><Image src="/brand/scetathon.webp" alt="SCETATHON 2.0" width={1496} height={332} priority sizes="(max-width: 760px) 88vw, 600px" /></div>
      <div className="facts-strip" aria-label="Event facts">
        <div><span>WHEN</span><strong>{event.displayDate}</strong></div>
        <div><span>WHERE</span><strong>SCET · Surat, Gujarat</strong></div>
        <div><span>REGISTRATION</span><strong>Opening soon</strong></div>
      </div>
    </section>
  );
}
