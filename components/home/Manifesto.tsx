import React from "react";

export function Manifesto() {
  return (
    <section
      id="about"
      className="bg-paper text-ink py-20 md:py-32 relative overflow-hidden select-none"
    >
      {/* Subtle giant background asterisk graphic */}
      <div
        className="absolute -right-10 top-6 font-display text-[200px] md:text-[260px] text-ink/[0.04] pointer-events-none rotate-[13deg] leading-none select-none"
        aria-hidden="true"
      >
        ✳
      </div>

      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto grid grid-cols-1 lg:grid-cols-[1.38fr_0.62fr] gap-12 lg:gap-20 items-end">
        {/* Left: Giant Display Typography */}
        <div>
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-ink mb-6">
            <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
            <span>01 / The idea</span>
          </div>

          <h2 className="font-display text-[clamp(50px,7.8vw,118px)] leading-[0.91] tracking-[-0.09em] uppercase m-0">
            LESS
            <br />
            TALK.
            <br />
            <span className="text-coral italic font-normal">MORE</span>
            <br />
            MAKING.
          </h2>
        </div>

        {/* Right: Editorial Narrative Aside */}
        <div className="border-t-2 border-ink pt-6 max-w-[420px] lg:mb-3">
          <p className="text-lg md:text-xl leading-relaxed text-ink/90 font-normal mb-8">
            Forget the ordinary. This is 24 hours of sketching, breaking, fixing, prototyping, and discovering what happens when different minds build together.
          </p>

          <div className="font-mono text-[11px] leading-relaxed uppercase tracking-[0.12em] font-bold text-ink/75">
            Computer Engineering × Chemical Engineering
            <br />
            Sarvajanik College of Engineering &amp; Technology
          </div>
        </div>
      </div>
    </section>
  );
}

export default Manifesto;
