import Image from "next/image";
import Link from "next/link";
import { event } from "@/data/event";
import { Register } from "../ui/Register";

export default function Hero() {
  return <header className="wrap edition">
    <div className="edition-layout"><div className="edition-copy">
      <p className="edition-label">SCET, Surat <span/> 24-hour college hackathon</p>
      <h1 aria-label={event.name}><span className="word-mask"><strong>SCETATHON</strong></span><span className="edition-year">2027</span></h1>
      <p className="edition-date">{event.displayDate}</p>
      <p className="edition-college">{event.college}</p>
      <div className="edition-actions"><Register text="Registration"/><Link href="/problems">Explore problem statements</Link></div>
    </div><div className="poster" aria-hidden="true"><Image src="/edition-wave.svg" alt="" fill priority unoptimized/><span>27</span></div></div>
    <figure className="campus-band"><Image priority src="/archive/scet_bg.jpg" width={1200} height={450} sizes="90vw" alt="The SCET campus in Surat"/><figcaption>Venue <b>SCET Campus</b> Surat, Gujarat</figcaption></figure>
  </header>
}
