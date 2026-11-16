"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { problems, themes } from "@/data/problems";
import { RegistrationStatus } from "@/components/registration/RegistrationStatus";

type Problem = (typeof problems)[number];
type SavedFilters = { query: string; domain: string; selected: string };

const filterStorageKey = "scetathon-problem-filters";

export default function Problems({ preview = false }: { preview?: boolean }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState(problems[0]?.slug ?? "");
  const restored = useRef(false);

  const domains = useMemo(() => ["All", ...themes.map((t) => t.name)], []);

  useEffect(() => {
    if (preview) return;
    try {
      // Check query parameter ?domain= first
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : null;
      const urlDomain = searchParams?.get("domain");

      if (urlDomain && domains.includes(urlDomain)) {
        setDomain(urlDomain);
        const firstInDomain = problems.find((p) => p.category === urlDomain);
        if (firstInDomain) setSelectedSlug(firstInDomain.slug);
      } else {
        const saved = JSON.parse(
          window.sessionStorage.getItem(filterStorageKey) ?? "null"
        ) as SavedFilters | null;
        if (saved && typeof saved.query === "string" && domains.includes(saved.domain)) {
          setQuery(saved.query);
          setDomain(saved.domain);
          if (problems.some((p) => p.slug === saved.selected)) setSelectedSlug(saved.selected);
        }
      }
    } catch {
      // Graceful fallback
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
      const haystack =
        `${problem.title} ${problem.category} ${problem.description} ${problem.tech}`.toLowerCase();
      return matchesDomain && haystack.includes(query.trim().toLowerCase());
    });
  }, [domain, query]);

  const selected = matchingProblems.find((p) => p.slug === selectedSlug) ?? matchingProblems[0];

  const clearFilters = () => {
    setQuery("");
    setDomain("All");
  };

  const getThemeInfo = (category: string) => {
    return themes.find((t) => t.name === category);
  };

  return (
    <div className="w-full space-y-8">
      {/* 3 Tracks Overview Header Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((t) => {
          const isActive = domain === t.name;
          const isLime = t.color === "lime";
          const isCoral = t.color === "coral";
          const borderClass = isActive
            ? isLime
              ? "border-lime bg-lime/10"
              : isCoral
              ? "border-coral bg-coral/10"
              : "border-lilac bg-lilac/10"
            : "border-white/15 bg-[#191A18] hover:border-white/30";

          const tagColor = isLime ? "text-lime" : isCoral ? "text-coral" : "text-lilac";

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setDomain(isActive ? "All" : t.name);
                const first = problems.find((p) => p.category === t.name);
                if (first) setSelectedSlug(first.slug);
              }}
              className={`p-4 sm:p-5 text-left border transition-all cursor-pointer flex flex-col justify-between ${borderClass}`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider mb-2">
                  <span className={`font-bold ${tagColor}`}>TRACK // {t.id}</span>
                  <span className="text-xl">{t.icon}</span>
                </div>
                <h4 className="font-display text-sm sm:text-base text-paper uppercase tracking-tight leading-snug mb-1">
                  {t.name}
                </h4>
                <p className="text-xs text-[#93958E] line-clamp-2 leading-relaxed">
                  {t.tagline}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px]">
                <span className={isActive ? tagColor : "text-[#93958E]"}>
                  {isActive ? "● FILTER ACTIVE" : "CLICK TO FILTER"}
                </span>
                <span className="text-[#93958E]">3 PROBLEMS</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search & Track Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-white/[0.19]">
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
            placeholder="Search by title, technology, or keywords…"
            className="w-full min-h-[44px] px-4 py-2.5 text-base bg-[#191A18] text-paper placeholder-[#93958E] border border-white/20 focus:outline-none focus:border-lime"
          />
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by theme">
          <button
            type="button"
            aria-pressed={domain === "All"}
            onClick={() => setDomain("All")}
            className={`min-h-[40px] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              domain === "All"
                ? "bg-lime text-ink"
                : "bg-[#191A18] text-[#C6C8BE] border border-white/20 hover:border-lime hover:text-white"
            }`}
          >
            All Tracks ({problems.length})
          </button>

          {themes.map((t) => {
            const isSelected = domain === t.name;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setDomain(t.name)}
                className={`min-h-[40px] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-lime text-ink"
                    : "bg-[#191A18] text-[#C6C8BE] border border-white/20 hover:border-lime hover:text-white"
                }`}
              >
                <span>{t.short}</span>
                <span className="opacity-70 font-mono text-[10px]">
                  ({problems.filter((p) => p.category === t.name).length})
                </span>
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
              const theme = getThemeInfo(problem.category);
              const isTrackA = problem.category.includes("CAMPUS");
              const isTrackB = problem.category.includes("HUMANITY");
              const trackTag = isTrackA ? "TRK-01" : isTrackB ? "TRK-02" : "TRK-03";

              return (
                <div key={problem.slug} className="border border-white/20 bg-[#191A18] overflow-hidden">
                  <button
                    type="button"
                    role="listitem"
                    aria-expanded={isCurrent}
                    aria-controls={`detail-${problem.slug}`}
                    onClick={() => setSelectedSlug(problem.slug)}
                    className={`w-full min-h-[56px] p-4 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-lime text-ink"
                        : "text-paper hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 shrink-0 ${
                          isCurrent ? "bg-ink text-lime" : "bg-black/50 text-lime"
                        }`}
                      >
                        PS-{problem.id}
                      </span>
                      <span className="font-bold text-sm sm:text-base truncate">
                        {problem.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 uppercase ${
                          isCurrent
                            ? "text-ink font-bold border border-ink/40"
                            : "text-[#C6C8BE] border border-white/20"
                        }`}
                      >
                        {trackTag}
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
  const isTrackA = problem.category.includes("CAMPUS");
  const isTrackB = problem.category.includes("HUMANITY");
  const trackName = isTrackA ? "TRACK 01" : isTrackB ? "TRACK 02" : "TRACK 03";
  const badgeColor = isTrackA
    ? "text-lime border-lime/40"
    : isTrackB
    ? "text-coral border-coral/40"
    : "text-lilac border-lilac/40";

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-mono text-[10px] uppercase font-bold border px-2 py-0.5 ${badgeColor}`}>
              {trackName}
            </span>
            <span className="font-mono text-[10px] text-lime uppercase tracking-wider font-bold">
              PS-{problem.id}
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-paper uppercase tracking-tight">
            {problem.title}
          </h3>
          <p className="font-mono text-[11px] text-[#93958E] mt-1">
            THEME: {problem.category}
          </p>
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
            Expected Deliverable &amp; Outcome
          </h4>
          <p className="text-sm sm:text-base text-paper">
            {problem.outcome}
          </p>
        </div>

        <div className="bg-black/40 p-4 border-l-2 border-coral">
          <h4 className="font-mono text-[11px] uppercase tracking-wider text-coral font-bold mb-1">
            Engineering Constraints &amp; Guardrails
          </h4>
          <p className="text-sm sm:text-base text-paper">
            {problem.constraint}
          </p>
        </div>

        <div className="bg-black/40 p-4 border-l-2 border-lilac">
          <h4 className="font-mono text-[11px] uppercase tracking-wider text-lilac font-bold mb-1">
            Suggested Technology &amp; Tooling Stack
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
