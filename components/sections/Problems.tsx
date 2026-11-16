"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { problems } from "@/data/problems";
import { RegistrationStatus } from "@/components/registration/RegistrationStatus";

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
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.19]">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <label htmlFor="problem-search" className="sr-only">
            Search challenge statements
          </label>
          <input
            id="problem-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, domain, or keyword…"
            className="w-full min-h-[44px] px-4 py-2.5 text-base bg-[#191A18] text-paper placeholder-[#93958E] border border-white/20 focus:outline-none focus:border-lime"
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
                className={`min-h-[40px] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-lime text-ink"
                    : "bg-[#191A18] text-[#C6C8BE] border border-white/20 hover:border-lime hover:text-white"
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
        <div className="p-12 text-center border border-white/20 bg-[#191A18]" role="status">
          <p className="text-lg font-medium text-paper mb-4">
            No challenge statements match those filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="px-6 py-2 bg-lime text-ink font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#f0ffad] transition-colors cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        /* Split Master-Detail Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Index Column */}
          <div
            className="lg:col-span-5 space-y-2"
            role="list"
            aria-label="Challenge statements index"
          >
            {matchingProblems.map((problem) => {
              const isCurrent = selected?.slug === problem.slug;
              return (
                <div key={problem.slug} className="border border-white/20 bg-[#191A18] overflow-hidden">
                  <button
                    type="button"
                    role="listitem"
                    aria-expanded={isCurrent}
                    aria-controls={`detail-${problem.slug}`}
                    onClick={() => setSelectedSlug(problem.slug)}
                    className={`w-full min-h-[52px] p-4 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-lime text-ink"
                        : "text-paper hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 ${
                        isCurrent ? "bg-ink text-lime" : "bg-black/50 text-lime"
                      }`}>
                        PS-{problem.id}
                      </span>
                      <span className="font-bold text-base sm:text-lg">
                        {problem.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 uppercase ${
                        isCurrent ? "text-ink font-bold border border-ink/30" : "text-[#C6C8BE] border border-white/20"
                      }`}>
                        {problem.category}
                      </span>
                      <span className="font-mono text-xs" aria-hidden="true">
                        {isCurrent ? "●" : "→"}
                      </span>
                    </div>
                  </button>

                  {/* Narrow-screen inline accordion detail */}
                  {isCurrent && (
                    <div className="block lg:hidden p-5 bg-[#232422] border-t border-white/20">
                      <ProblemDetailBody problem={problem} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Detail Column */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28">
            {selected && (
              <div
                id={`detail-${selected.slug}`}
                className="p-8 bg-[#191A18] border border-white/20"
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[10px] text-lime uppercase tracking-wider font-bold block mb-1">
            PROBLEM PS-{problem.id} // {problem.category}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-paper uppercase tracking-tight">
            {problem.title}
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase border border-coral text-coral px-2.5 py-1">
          Level: {problem.difficulty}
        </span>
      </div>

      <p className="text-base sm:text-lg text-[#C6C8BE] leading-relaxed">
        {problem.description}
      </p>

      <div className="space-y-4 pt-2">
        <div className="bg-black/40 p-4 border-l-2 border-lime">
          <h4 className="font-mono text-[11px] uppercase tracking-wider text-lime font-bold mb-1">
            Expected Outcome
          </h4>
          <p className="text-sm sm:text-base text-paper">
            {problem.outcome}
          </p>
        </div>

        <div className="bg-black/40 p-4 border-l-2 border-coral">
          <h4 className="font-mono text-[11px] uppercase tracking-wider text-coral font-bold mb-1">
            Constraints &amp; Boundaries
          </h4>
          <p className="text-sm sm:text-base text-paper">
            {problem.constraint}
          </p>
        </div>

        <div className="bg-black/40 p-4 border-l-2 border-lilac">
          <h4 className="font-mono text-[11px] uppercase tracking-wider text-lilac font-bold mb-1">
            Suggested Technology Stack
          </h4>
          <p className="font-mono text-xs sm:text-sm text-paper">
            {problem.tech}
          </p>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <RegistrationStatus label="PROTOTYPE FOR THIS TRACK" variant="primary" />
        <span className="font-mono text-xs text-[#93958E] uppercase">
          Teams: 3–5 innovators
        </span>
      </div>
    </article>
  );
}
