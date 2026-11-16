import Image from "next/image";
import Link from "next/link";
import { event } from "@/data/event";
import { Register } from "../ui/Register";
export default function Hero() {
  return (
    <header className="brand-stage">
      <div className="wrap brand-hero">
        <p className="university">Sarvajanik University</p>
        <p>{event.college}</p>
        <h1>
          <Image
            priority
            src="/brand/scetathon.webp"
            alt="SCETATHON 2.0 · Ideas, Innovation, Impact"
            width={1496}
            height={332}
            sizes="(max-width: 760px) 92vw, 900px"
          />
        </h1>
        <h2>
          The next 24 hours could
          <br />
          <em>change tomorrow.</em>
        </h2>
        <p className="when">
          {event.displayDate} <span>·</span> Surat, Gujarat
        </p>
        <div className="edition-actions">
          <Register />
          <Link href="/problems">Explore problem statements</Link>
        </div>
      </div>
      <div className="theme-strip wrap">
        {[
          "Smart & sustainable campus and cities",
          "AI for humanity: health, safety & accessibility",
          "Industry 5.0: intelligent manufacturing & resource innovation",
        ].map((s, i) => (
          <div key={s}>
            <small>Theme 0{i + 1}</small>
            <strong>{s}</strong>
          </div>
        ))}
      </div>
    </header>
  );
}
