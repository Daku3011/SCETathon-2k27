"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { problems } from "@/data/problems";
import { Register } from "../ui/Register";

type Problem = (typeof problems)[number];
type SavedFilters = { query: string; domain: string; selected: string };

const filterStorageKey = "scetathon-problem-filters";

export default function Problems({ preview = false }: { preview?: boolean }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState(problems[0]?.slug ?? "");
  const restored = useRef(false);
  const domains = useMemo(() => ["All", ...new Set(problems.map((p) => p.category))], []);

  useEffect(() => {
    if (preview) return;
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(filterStorageKey) ?? "null") as SavedFilters | null;
      if (saved && typeof saved.query === "string" && domains.includes(saved.domain)) {
        setQuery(saved.query);
        setDomain(saved.domain);
        if (problems.some((p) => p.slug === saved.selected)) setSelectedSlug(saved.selected);
      }
    } catch {
      // Graceful fallback if sessionStorage is blocked
    } finally {
      restored.current = true;
    }
  }, [domains, preview]);

  useEffect(() => {
    if (preview || !restored.current) return;
    try {
      window.sessionStorage.setItem(
        filterStorageKey,
        JSON.stringify({ query, domain, selected: selectedSlug })
      );
    } catch {
      // Ignore
    }
  }, [domain, preview, query, selectedSlug]);

  const matchingProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesDomain = domain === "All" || problem.category === domain;
      const haystack = `${problem.title} ${problem.category} ${problem.description} ${problem.tech}`.toLowerCase();
      return matchesDomain && haystack.includes(query.trim().toLowerCase());
    });
  }, [domain, query]);

  const selected = matchingProblems.find((p) => p.slug === selectedSlug) ?? matchingProblems[0];

  const clearFilters = () => {
    setQuery("");
    setDomain("All");
  };

  return (
    <div className="w-full">
      {/* Search & Domain Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#182239]/15">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <label htmlFor="problem-search" className="sr-only">
            Search problem statements
          </label>
          <input
            id="problem-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, domain, or keyword…"
            className="w-full min-h-[44px] px-4 py-2.5 text-base bg-[#ECE5D6] text-[#182239] placeholder-[#182239]/50 border border-[#182239]/20 rounded-[2px] focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
          />
        </div>

        {/* Domain Chips */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by domain">
          {domains.map((cat) => {
            const isSelected = domain === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setDomain(cat)}
                className={`min-h-[40px] px-4 py-1.5 text-sm font-semibold rounded-[2px] border transition-colors focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] ${
                  isSelected
                    ? "bg-[#172C67] text-[#F5EFE2] border-[#172C67]"
                    : "bg-transparent text-[#182239] border-[#182239]/25 hover:border-[#182239]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {!matchingProblems.length ? (
        <div className="p-12 text-center border border-[#182239]/20 bg-[#ECE5D6] rounded-[2px]" role="status">
          <p className="text-lg font-medium text-[#182239] mb-4">
            No problem statements match those filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-[44px] px-6 py-2 bg-[#172C67] text-[#F5EFE2] font-semibold text-sm rounded-[2px] hover:bg-[#172C67]/90 focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        /* Split Accordion Layout (Master-Detail on wide screens, Inline on narrow screens) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Index Column (5 cols on wide screens) */}
          <div
            className="lg:col-span-5 space-y-2"
            role="list"
            aria-label="Problem statements index"
          >
            {matchingProblems.map((problem) => {
              const isCurrent = selected?.slug === problem.slug;
              return (
                <div key={problem.slug} className="border border-[#182239]/20 rounded-[2px] bg-[#ECE5D6] overflow-hidden">
                  <button
                    type="button"
                    role="listitem"
                    aria-expanded={isCurrent}
                    aria-controls={`detail-${problem.slug}`}
                    onClick={() => setSelectedSlug(problem.slug)}
                    className={`w-full min-h-[52px] p-4 flex items-center justify-between text-left transition-colors focus:outline focus:outline-[3px] focus:outline-[#172C67] focus:outline-offset-[3px] ${
                      isCurrent
                        ? "bg-[#172C67] text-[#F5EFE2]"
                        : "text-[#182239] hover:bg-[#182239]/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] ${
                        isCurrent ? "bg-[#F5EFE2] text-[#172C67]" : "bg-[#182239]/10 text-[#182239]"
                      }`}>
                        PS-{problem.id}
                      </span>
                      <span className="font-semibold text-base sm:text-lg">
                        {problem.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-[2px] ${
                        isCurrent ? "text-[#F5EFE2]/80 border border-[#F5EFE2]/30" : "text-[#182239]/70 border border-[#182239]/20"
                      }`}>
                        {problem.category}
                      </span>
                      <span className="font-mono text-xs opacity-60" aria-hidden="true">
                        {isCurrent ? "●" : "→"}
                      </span>
                    </div>
                  </button>

                  {/* Narrow-screen inline accordion detail */}
                  {isCurrent && (
                    <div className="block lg:hidden p-5 bg-[#F5EFE2] border-t border-[#182239]/15">
                      <ProblemDetailBody problem={problem} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Detail Column (7 cols on wide screens) */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28">
            {selected && (
              <div
                id={`detail-${selected.slug}`}
                className="p-8 bg-[#ECE5D6] border border-[#182239]/20 rounded-[2px] shadow-sm"
                aria-live="polite"
              >
                <ProblemDetailBody problem={selected} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProblemDetailBody({ problem }: { problem: Problem }) {
  return (
    <article className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#182239]/15 pb-4">
        <div>
          <span className="font-mono text-xs text-[#963E29] uppercase tracking-wider font-semibold block mb-1">
            PROBLEM PS-{problem.id} // {problem.category}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#182239]">
            {problem.title}
          </h3>
        </div>
        <span className="font-mono text-xs border border-[#182239]/30 text-[#182239] px-2.5 py-1 rounded-[2px]">
          Level: {problem.difficulty}
        </span>
      </div>

      <p className="text-base sm:text-lg text-[#182239]/90 leading-relaxed">
        {problem.description}
      </p>

      <div className="space-y-4 pt-2">
        <div className="bg-[#F5EFE2] p-4 border-l-2 border-[#172C67] rounded-[2px]">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[#172C67] font-bold mb-1">
            Expected Outcome
          </h4>
          <p className="text-sm sm:text-base text-[#182239]">
            {problem.outcome}
          </p>
        </div>

        <div className="bg-[#F5EFE2] p-4 border-l-2 border-[#963E29] rounded-[2px]">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[#963E29] font-bold mb-1">
            Constraints &amp; Boundaries
          </h4>
          <p className="text-sm sm:text-base text-[#182239]">
            {problem.constraint}
          </p>
        </div>

        <div className="bg-[#F5EFE2] p-4 border-l-2 border-[#182239]/40 rounded-[2px]">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[#182239]/70 font-bold mb-1">
            Suggested Technology Stack
          </h4>
          <p className="font-mono text-xs sm:text-sm text-[#182239]">
            {problem.tech}
          </p>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-[#182239]/15">
        <Register text="Choose this problem" />
        <span className="font-mono text-xs text-[#182239]/60">
          Teams: 3–5 innovators
        </span>
      </div>
    </article>
  );
}
