"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as D from "@radix-ui/react-dialog";
import { event, navigation } from "@/data/event";
export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="top">
        <nav className="wrap nav">
          <Link className="brand" href="/">
            <Image
              src="/archive/scet.png"
              alt="SCET crest"
              width={40}
              height={40}
            />
            SCET · Surat
          </Link>
          <div className="navlinks">
            {navigation.slice(1, 5).map(([n, u]) => (
              <Link key={u} href={u}>
                {n}
              </Link>
            ))}
          </div>
          <D.Root open={open} onOpenChange={setOpen}>
            <D.Trigger className="menu-btn">Menu</D.Trigger>
            <D.Portal>
              <D.Overlay className="overlay" />
              <D.Content className="sheet" aria-describedby={undefined}>
                <D.Title asChild>
                  <h2>Contents</h2>
                </D.Title>
                <nav className="contents">
                  {navigation.map(([n, u]) => (
                    <Link key={u} href={u} onClick={() => setOpen(false)}>
                      {n}
                    </Link>
                  ))}
                </nav>
                <D.Close className="btn">Close</D.Close>
              </D.Content>
            </D.Portal>
          </D.Root>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="footer">
        <div className="wrap split">
          <div>
            <strong>{event.name}</strong>
            <p>
              {event.college}
              <br />
              {event.venue}
            </p>
            <a href={"mailto:" + event.email}>{event.email}</a>
          </div>
          <nav className="contents">
            {navigation.slice(1).map(([n, u]) => (
              <Link key={u} href={u}>
                {n}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
