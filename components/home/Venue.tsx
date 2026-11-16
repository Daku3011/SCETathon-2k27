import React from "react";

export function Venue() {
  return (
    <section className="bg-[#262625] text-paper overflow-hidden select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[470px]">
        {/* Left: Venue Editorial Copy */}
        <div className="py-16 md:py-24 px-6 md:px-12 lg:pl-[max(40px,calc((100vw-1400px)/2))] lg:pr-[7vw] flex flex-col justify-between gap-9">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-lime mb-6">
              <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
              <span>05 / The venue</span>
            </div>

            <h2 className="font-display text-[clamp(43px,5.8vw,87px)] leading-[0.95] tracking-[-0.08em] uppercase my-6">
              NOT JUST
              <br />
              ANYWHERE.
              <br />
              <span className="text-lime">SCET.</span>
            </h2>

            <p className="text-base text-[#B8B9AF] max-w-[380px] leading-relaxed">
              Built in Surat. Built by the next generation. Join us at Sarvajanik College of Engineering &amp; Technology campus, Dr. R.K. Desai Marg, Athwalines.
            </p>
          </div>

          <div>
            <a
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-lime underline underline-offset-4 hover:text-white transition-colors"
              href="https://maps.google.com/?q=Sarvajanik+College+of+Engineering+and+Technology+Surat"
              target="_blank"
              rel="noopener noreferrer"
            >
              FIND THE CAMPUS ↗
            </a>
          </div>
        </div>

        {/* Right: Graphic Jaali Geometry Art */}
        <div
          className="relative min-h-[380px] md:min-h-[460px] bg-lilac flex items-center justify-center overflow-hidden"
          aria-label="Graphic illustration inspired by the geometry of Indian jaali architecture"
        >
          {/* Repeating concentric radial jaali rings */}
          <div
            className="absolute inset-0 opacity-65 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%, transparent 0 23px, #161715 24px 25px, transparent 26px 50px)",
            }}
          />

          {/* Heavy Coral Framing Ring */}
          <div
            className="absolute inset-[15%] md:inset-[19%] border-[28px] md:border-[36px] border-coral rounded-full pointer-events-none rotate-45"
            aria-hidden="true"
          />

          {/* Core Ink & Lime Rotating Stamp */}
          <div
            className="relative z-10 w-[180px] h-[180px] md:w-[210px] md:h-[210px] rounded-full bg-ink text-lime flex items-center justify-center text-center font-display text-2xl md:text-[30px] leading-[1.1] tracking-[-0.05em] -rotate-[10deg] shadow-[0_0_0_10px_#C9C5FD] md:shadow-[0_0_0_12px_#C9C5FD]"
            aria-hidden="true"
          >
            SURAT
            <br />
            INDIA
            <br />
            ✳
          </div>
        </div>
      </div>
    </section>
  );
}

export default Venue;
