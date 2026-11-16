import Image from "next/image";
import Link from "next/link";
import { event } from "@/data/event";
import { Register } from "../ui/Register";

export default function Hero() {
  return (
    <header className="wrap masthead">
      <div className="dateline">
        <span>{event.college}</span>
        <span>Surat, Gujarat</span>
      </div>
      <h1>
        SCETATHON <em>2027</em>
      </h1>
      <div className="cover">
        <div className="cover-copy">
          <p className="kicker">College hackathon</p>
          <h2>{event.displayDate}</h2>
          <p className="lead">{event.hero}</p>
          <Register text="Registration" />
          <Link href="/problems">Browse problem statements</Link>
        </div>
        <figure>
          <Image
            priority
            src="/archive/scet_bg.jpg"
            alt="Sarvajanik College of Engineering & Technology campus in Surat"
            width={1200}
            height={450}
            sizes="(max-width: 760px) 90vw, 60vw"
          />
          <figcaption>SCET campus, Surat</figcaption>
        </figure>
      </div>
    </header>
  );
}
