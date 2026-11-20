import React from "react";

export function Interlude() {
  return (
    <section className="bg-lilac text-[#171915] border-y-2 border-[#171915] py-7 md:py-8 select-none">
      <div className="w-[min(100%-34px,1400px)] md:w-[min(100%-80px,1400px)] mx-auto grid grid-cols-1 md:grid-cols-[2.5fr_1fr] gap-6 md:gap-10 items-center">
        <div className="font-display text-[clamp(22px,3.4vw,50px)] leading-[1.04] tracking-[-0.065em] uppercase">
          THE BEST IDEAS DON'T STAY IDEAS.
        </div>
        <div className="font-mono text-[11px] leading-[1.7] font-bold uppercase tracking-wider text-[#171915]/85 max-w-[280px]">
          THEY GET BUILT.
          <br />
          THEY GET TESTED.
          <br />
          THEY MAKE AN IMPACT.
        </div>
      </div>
    </section>
  );
}

export default Interlude;
