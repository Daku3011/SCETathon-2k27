import React from "react";

interface PageHeaderProps {
  tag: string;
  title: string | React.ReactNode;
  subtitle?: string;
}

export function PageHeader({ tag, title, subtitle }: PageHeaderProps) {
  return (
    <div className="border-b border-white/[0.19] pb-12 mb-12 select-none">
      <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-lime mb-6">
        <span className="w-2.5 h-2.5 bg-current rotate-45 inline-block" aria-hidden="true" />
        <span>{tag}</span>
      </div>

      <h1 className="font-display text-[clamp(44px,7.2vw,96px)] leading-[0.92] tracking-[-0.09em] uppercase m-0 text-paper">
        {title}
      </h1>

      {subtitle && (
        <p className="max-w-2xl text-base md:text-lg text-[#C6C8BE] leading-relaxed mt-6">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
