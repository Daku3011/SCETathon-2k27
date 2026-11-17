import React from "react";
import Link from "next/link";

interface WordmarkProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Wordmark({
  href = "/",
  size = "md",
  className = "",
  onClick,
}: WordmarkProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-[21px] md:text-[22px]",
    lg: "text-2xl md:text-3xl",
  }[size];

  const ringSizes = {
    sm: "w-[18px] h-[18px] border-[5px]",
    md: "w-[22px] h-[22px] border-[6px] md:w-[23px] md:h-[23px] md:border-[7px]",
    lg: "w-[28px] h-[28px] border-[8px]",
  }[size];

  const content = (
    <span
      className={`inline-flex items-center gap-2.5 font-display tracking-[-0.09em] leading-none whitespace-nowrap text-paper ${sizeClasses} ${className}`}
    >
      <span
        className={`inline-block rounded-full border-lime border-r-transparent -rotate-[35deg] shrink-0 ${ringSizes}`}
        aria-hidden="true"
      />
      <span className="flex items-start">
        SCETATHON
        <sup className="font-mono text-lime text-[9px] font-bold tracking-normal ml-0.5 mt-0.5">
          2.0
        </sup>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-4"
      aria-label="SCETATHON 2.0 home"
    >
      {content}
    </Link>
  );
}

export default Wordmark;
