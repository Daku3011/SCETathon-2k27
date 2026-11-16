"use client";
import { matchesSearch } from "@/lib/search";
import { copy } from "@/data/event";

import { useState, useRef } from "react";
import * as D from "@radix-ui/react-dialog";
import { motion, LayoutGroup, MotionConfig } from "framer-motion";
import { problems } from "@/data/problems";
import { Register } from "../ui/Register";
import Link from "next/link";
export default function Problems({ preview = false }: { preview?: boolean }) {
  const [q, search] = useState(""),
    [cat, filter] = useState("All"),
    [picked, pick] = useState<(typeof problems)[number] | null>(null),
    row = useRef<HTMLDivElement>(null),
    drag = useRef<number | null>(null),
    moved = useRef(false);
  const list = problems.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      matchesSearch(
        [p.title, p.description, p.category, p.tech, p.difficulty].join(" "),
        q,
      ),
  );
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <LayoutGroup>
        <p>{copy.textIllustrativeChallengesForThe2027EditionFinal}</p>
        {!preview && (
          <label>
            {copy.textSearchProblemStatements}
            <input
              type="search"
              value={q}
              onChange={(e) => search(e.target.value)}
              placeholder={copy.textSearchByTitleTopicOrKeyword}
            />
          </label>
        )}
        <div className="chips">
          {["All", ...new Set(problems.map((p) => p.category))].map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => filter(c)}>
              {c}
            </button>
          ))}
        </div>
        <D.Root
          open={!!picked}
          onOpenChange={(v) => {
            if (!v) pick(null);
          }}
        >
          <div
            ref={row}
            className={preview ? "carousel" : "grid"}
            onPointerDown={(e) => {
              moved.current = false;
              if (preview && e.pointerType === "mouse")
                drag.current = e.clientX;
            }}
            onPointerMove={(e) => {
              if (drag.current !== null && e.buttons && row.current) {
                const d = drag.current - e.clientX;
                if (Math.abs(d) > 3) {
                  row.current.scrollLeft += d;
                  drag.current = e.clientX;
                  moved.current = true;
                }
              }
            }}
            onPointerUp={() => (drag.current = null)}
          >
            {list.map((p) => (
              <D.Trigger asChild key={p.slug}>
                <motion.button
                  layout
                  layoutId={"problem-" + p.slug}
                  className="card problem"
                  onClick={(e) => {
                    if (moved.current) {
                      e.preventDefault();
                      return;
                    }
                    pick(p);
                  }}
                >
                  <small>
                    {copy.textPs}
                    {p.id} · {p.category}
                  </small>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="mono">{p.difficulty} ↗</span>
                </motion.button>
              </D.Trigger>
            ))}
          </div>
          {!list.length && (
            <p role="status">
              {copy.textNoMatchingChallengesTryAnotherKeywordOr}
            </p>
          )}
          {picked && (
            <D.Portal>
              <D.Overlay className="overlay" />
              <D.Content className="sheet">
                <motion.div layoutId={"problem-" + picked.slug}>
                  <small>
                    {picked.category} / {picked.difficulty}
                  </small>
                  <D.Title asChild>
                    <h2>{picked.title}</h2>
                  </D.Title>
                  <D.Description>{picked.description}</D.Description>
                  {[
                    ["Expected outcome", picked.outcome],
                    ["Suggested tech", picked.tech],
                    ["Constraints", picked.constraint],
                  ].map(([n, v]) => (
                    <p key={n}>
                      <strong>{n}</strong>
                      <br />
                      {v}
                    </p>
                  ))}
                  <div className="actions">
                    <Register text={copy.textChooseThisProblem} />
                    <D.Close className="btn">{copy.textCloseAlt}</D.Close>
                  </div>
                </motion.div>
              </D.Content>
            </D.Portal>
          )}
        </D.Root>
        {preview && (
          <div className="actions mt-4">
            <button
              aria-label={copy.textPreviousProblems}
              className="btn"
              onClick={() => row.current?.scrollBy({ left: -340 })}
            >
              ←
            </button>
            <button
              aria-label={copy.textNextProblems}
              className="btn"
              onClick={() => row.current?.scrollBy({ left: 340 })}
            >
              →
            </button>
            <Link href="/problems">{copy.textViewAllProblems}</Link>
          </div>
        )}
      </LayoutGroup>
    </MotionConfig>
  );
}
