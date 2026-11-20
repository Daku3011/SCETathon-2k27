import React from "react";

export function Experience() {
  return (
    <section id="experience" className="bg-surface2 text-paper py-20 md:py-32 select-none">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-paper mb-6">
          <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
          <span>04 / Why be here</span>
        </div>

        {/* Heading & Note */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12">
          <h2 className="font-display text-[clamp(48px,7.5vw,120px)] leading-[0.88] tracking-[-0.092em] uppercase m-0 max-w-[850px]">
            THE MAGIC
            <br />
            IS IN THE <span className="text-coral">MAKING.</span>
          </h2>
          <p className="text-base md:text-[17px] text-muted max-w-[280px] leading-relaxed">
            A different kind of classroom. A different kind of challenge. Real people, real constraints, real progress.
          </p>
        </div>

        {/* Asymmetric 4-Card Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4.5">
          {/* Card 1: Dark Lead Card */}
          <article className="bg-ink text-paper p-7 md:p-9 relative overflow-hidden flex flex-col justify-between min-h-[340px] md:min-h-[460px] group">
            <span
              className="absolute -right-3 top-0 text-[170px] text-white/10 font-sans pointer-events-none leading-none select-none"
              aria-hidden="true"
            >
              ✳
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-paper/70">
              01 — people
            </span>
            <div className="relative z-10 my-6">
              <h3 className="font-display text-[clamp(32px,4.5vw,65px)] leading-[0.98] tracking-[-0.07em] uppercase m-0 max-w-[610px]">
                DIFFERENT MINDS.
                <br />
                ONE TEAM.
              </h3>
            </div>
            <p className="text-sm md:text-base text-paper/80 max-w-[420px] m-0 leading-relaxed relative z-10">
              Where software thinkers and engineering problem-solvers meet in the middle and create something better together.
            </p>
          </article>

          {/* Card 2: Coral Card */}
          <article className="bg-coral text-[#171915] p-7 md:p-9 relative overflow-hidden flex flex-col justify-between min-h-[290px] md:min-h-[310px] group">
            <span
              className="absolute -right-3 top-0 text-[170px] text-[#171915]/10 font-sans pointer-events-none leading-none select-none"
              aria-hidden="true"
            >
              ✳
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#171915]/75">
              02 — momentum
            </span>
            <div className="relative z-10 my-6">
              <h3 className="font-display text-[clamp(30px,4.2vw,56px)] leading-[0.98] tracking-[-0.07em] uppercase m-0">
                LEARN BY
                <br />
                DOING.
              </h3>
            </div>
            <p className="text-sm md:text-base text-[#171915]/85 max-w-[380px] m-0 leading-relaxed relative z-10">
              Trade theory for experiments and turn ideas into testable prototypes.
            </p>
          </article>

          {/* Card 3: Lilac Card */}
          <article className="bg-lilac text-[#171915] p-7 md:p-9 relative overflow-hidden flex flex-col justify-between min-h-[290px] md:min-h-[310px] group">
            <span
              className="absolute -right-3 top-0 text-[170px] text-[#171915]/10 font-sans pointer-events-none leading-none select-none"
              aria-hidden="true"
            >
              ✳
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#171915]/75">
              03 — possibility
            </span>
            <div className="relative z-10 my-6">
              <h3 className="font-display text-[clamp(30px,4.2vw,56px)] leading-[0.98] tracking-[-0.07em] uppercase m-0">
                FIND A NEW
                <br />
                ANGLE.
              </h3>
            </div>
            <p className="text-sm md:text-base text-[#171915]/85 max-w-[380px] m-0 leading-relaxed relative z-10">
              Try something unfamiliar, challenge assumptions, and see where your curiosity takes you.
            </p>
          </article>

          {/* Card 4: Lime Pattern Card */}
          <article className="bg-lime text-[#171915] p-7 md:p-9 relative overflow-hidden flex flex-col justify-between min-h-[290px] md:min-h-[310px] group">
            <span
              className="absolute -right-2 -top-5 text-[240px] text-[#171915]/10 font-sans pointer-events-none leading-none select-none"
              aria-hidden="true"
            >
              ⌗
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#171915]/75">
              04 — impact
            </span>
            <div className="relative z-10 my-6">
              <h3 className="font-display text-[clamp(30px,4.2vw,56px)] leading-[0.98] tracking-[-0.07em] uppercase m-0">
                BUILD TO
                <br />
                MATTER.
              </h3>
            </div>
            <p className="text-sm md:text-base text-[#171915]/85 max-w-[380px] m-0 leading-relaxed relative z-10">
              Take on meaningful problems and discover how ambitious engineering can improve everyday life.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Experience;
