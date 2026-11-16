"use client";
import { copy } from "@/data/event";

import Link from "next/link";
import Image from "next/image";
import * as D from "@radix-ui/react-dialog";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  MotionConfig,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { event, navigation } from "@/data/event";
import { Register } from "./ui/Register";
export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname(),
    reduce = useReducedMotion(),
    { scrollYProgress } = useScroll(),
    dot = useRef<HTMLDivElement>(null);
  const [open, menu] = useState(false),
    [hide, setHide] = useState(false),
    [far, setFar] = useState(false),
    [intro, setIntro] = useState(false);
  useEffect(() => {
    if (
      !sessionStorage.scetIntro &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sessionStorage.scetIntro = "1";
      setIntro(true);
      const t = setTimeout(() => setIntro(false), 850);
      return () => clearTimeout(t);
    }
  }, []);
  useEffect(() => {
    let last = scrollY;
    function scroll() {
      setHide(scrollY > 100 && scrollY > last);
      setFar(scrollY > innerHeight * 0.9);
      last = scrollY;
    }
    function pointer(e: PointerEvent) {
      if (dot.current && e.pointerType === "mouse") {
        dot.current.style.transform =
          "translate(" +
          e.clientX +
          "px," +
          e.clientY +
          "px) scale(" +
          ((e.target as Element).closest("a,button") ? 1.7 : 1) +
          ")";
        dot.current.style.opacity = ".7";
      }
    }
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointermove", pointer);
    console.info("// SCETATHON: hello, fellow source explorer.");
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", pointer);
    };
  }, []);
  useEffect(() => {
    if (reduce || !matchMedia("(pointer:fine)").matches || open) return;
    let closed = false;
    let stop = () => {};
    import("lenis").then(({ default: Lenis }) => {
      if (closed) return;
      const l = new Lenis({
        autoRaf: true,
        anchors: true,
        prevent: (el) => !!el.closest("[role=dialog]"),
      });
      stop = () => l.destroy();
    });
    return () => {
      closed = true;
      stop();
    };
  }, [reduce, open]);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip btn" href="#main">
        {copy.textSkipToContent}
      </a>
      <motion.div className="bar" style={{ scaleX: scrollYProgress }} />
      <header className={"top " + (hide && !open ? "hide" : "")}>
        <nav className="wrap nav">
          <Link className="brand" href="/">
            <Image
              src="/archive/scet.png"
              alt={copy.textScetCrest}
              width={38}
              height={38}
            />
            {copy.textScetathon}
            <span className="active">/27</span>
          </Link>
          <div className="navlinks">
            {navigation.slice(1, 5).map(([n, url]) => (
              <Link
                key={url}
                href={url}
                aria-current={path === url ? "page" : undefined}
              >
                {n}
              </Link>
            ))}
          </div>
          <D.Root open={open} onOpenChange={menu}>
            <D.Trigger className="menu-btn">{copy.textMenu}</D.Trigger>
            <D.Portal>
              <D.Overlay className="overlay" />
              <D.Content className="menu-sheet" aria-describedby={undefined}>
                <D.Title className="sr-only">{copy.textSiteNavigation}</D.Title>
                <D.Close className="btn">{copy.textClose}</D.Close>
                <motion.nav
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {navigation.map(([n, u]) => (
                    <Link onClick={() => menu(false)} key={u} href={u}>
                      {n}
                    </Link>
                  ))}
                </motion.nav>
              </D.Content>
            </D.Portal>
          </D.Root>
        </nav>
      </header>
      <main id="main">
        <motion.div
          key={path}
          initial={{ opacity: 0.95, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </main>
      <footer className="footer">
        <div className="wrap split">
          <div>
            <Link className="brand" href="/">
              {event.name}
            </Link>
            <p>
              {copy.textOrganizedBy}
              {event.college}
            </p>
            <a href={"mailto:" + event.email}>{event.email}</a> ·{" "}
            <a href={event.map}>{copy.textCampusMap}</a>
            {event.phone && <p>{event.phone}</p>}
            {event.socials.map((s) => (
              <a key={s.url} href={s.url}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="actions">
            {navigation.slice(1).map(([n, u]) => (
              <Link key={u} href={u}>
                {n}
              </Link>
            ))}
          </div>
        </div>
      </footer>
      {far && <Register pill text={copy.textRegister} />}
      <div ref={dot} className="dot" style={{ opacity: 0 }} />
      {intro && (
        <div className="intro">
          <strong className="brand">{event.name}</strong>
          <button onClick={() => setIntro(false)}>{copy.textSkipIntro}</button>
        </div>
      )}
    </MotionConfig>
  );
}
