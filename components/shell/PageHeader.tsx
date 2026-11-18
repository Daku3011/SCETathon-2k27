import React from "react";
import { SectionLabel } from "@/components/ui/primitives";

interface PageHeaderProps {
  tag: string;
  title: string | React.ReactNode;
  subtitle?: string;
}

export function PageHeader({ tag, title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-line pb-10 mb-10 select-none">
      <div className="sheet-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative">
        <SectionLabel>{tag}</SectionLabel>
        <h1 className="font-display text-[clamp(52px,8.5vw,124px)] leading-[0.86] tracking-tight uppercase m-0 mt-5 text-paper">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-[62ch] mt-6 text-base md:text-lg text-muted leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
