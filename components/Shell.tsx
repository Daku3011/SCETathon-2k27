"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as D from "@radix-ui/react-dialog";
import Link from "next/link";
import Image from "next/image";
import { event, navigation } from "@/data/event";
const groups = [
  {
    name: "Explore",
    items: [
      ...navigation.slice(0, 2),
      ["Programme", "/timeline"],
      navigation[5],
      navigation[6],
    ],
  },
  {
    name: "Participate",
    items: [navigation[2], navigation[3], navigation[7], navigation[8]],
  },
  {
    name: "Archive & information",
    items: [navigation[4], ...navigation.slice(9)],
  },
];
function Brand() {
  return (
    <Image
      className="brand-logo"
      src="/brand/scetathon.webp"
      alt="SCETATHON 2.0 home"
      width={1496}
      height={332}
    />
  );
}
export default function Shell({ children }: { children: React.ReactNode }) {
  const [open, set] = useState(false),
    path = usePathname();
  const seen = useRef(new Set<string>());
  const [openedBefore, setOpenedBefore] = useState(false);
  useEffect(() => {
    if (
      !window.IntersectionObserver ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          observer.unobserve(e.target);
          const key =
            path +
            "|" +
            e.target.tagName +
            "|" +
            (e.target.textContent ?? "").slice(0, 100);
          if (seen.current.has(key)) return;
          seen.current.add(key);
          e.target.animate(
            [
              { opacity: 0.55, transform: "translateY(16px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 225, easing: "cubic-bezier(.2,.75,.25,1)" },
          );
          observer.unobserve(e.target);
        }
      }),
    );
    document
      .querySelectorAll(".spread,.page .card,.theme-strip,.footer")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);
  const links = (close: boolean) =>
    groups.map((g) => (
      <section key={g.name}>
        <h3>{g.name}</h3>
        {g.items.map(([n, u]) => (
          <Link
            key={u}
            href={u}
            aria-current={path === u ? "page" : undefined}
            onClick={() => {
              if (close) {
                setOpenedBefore(true);
                set(false);
              }
            }}
          >
            {n}
          </Link>
        ))}
      </section>
    ));
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="top">
        <nav className="wrap nav">
          <Link href="/">
            <Brand />
          </Link>
          <div className="navlinks">
            <Link href="/timeline">Programme</Link>
            <Link href="/problems">Problems</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
          <D.Root
            open={open}
            onOpenChange={(value) => {
              if (!value) setOpenedBefore(true);
              set(value);
            }}
          >
            <D.Trigger className="menu-btn">
              <i aria-hidden="true" />
              Menu
            </D.Trigger>
            <D.Portal>
              <D.Overlay className="overlay" />
              <D.Content
                className="drawer"
                data-repeat={openedBefore}
                aria-describedby={undefined}
              >
                <div className="drawer-head">
                  <D.Title>Explore SCETATHON</D.Title>
                  <D.Close aria-label="Close menu">×</D.Close>
                </div>
                <nav className="linkgroups">{links(true)}</nav>
                <p>{event.displayDate} · Surat</p>
              </D.Content>
            </D.Portal>
          </D.Root>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-brand">
            <Link href="/">
              <Brand />
            </Link>
            <p>
              {event.displayDate}
              <br />
              {event.college}
            </p>
          </div>
          <nav className="linkgroups">{links(false)}</nav>
          <div className="footer-base">
            <a href={"mailto:" + event.email}>{event.email}</a>
            <a href={event.map}>Find SCET in Surat</a>
          </div>
        </div>
      </footer>
    </>
  );
}
