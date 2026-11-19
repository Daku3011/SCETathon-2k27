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
    sm: "text-[19px]",
    md: "text-[24px] md:text-[28px]",
    lg: "text-3xl md:text-5xl",
  }[size];

  const markSizes = {
    sm: "size-3.5",
    md: "size-4 md:size-[18px]",
    lg: "size-6",
  }[size];

  const content = (
    <span
      className={`inline-flex items-center gap-2.5 font-display tracking-tight leading-none whitespace-nowrap text-paper ${sizeClasses} ${className}`}
    >
      {/* <span className={`relative ${markSizes} shrink-0`} aria-hidden="true">
        <span className="absolute inset-0 border-2 border-coral" />
        <span className="absolute -bottom-1 -right-1 size-1.5 bg-lime" />
      </span> */}
      <span className="flex items-start">
        SCETATHON
        <sup className="font-mono text-lime text-[12px] font-bold tracking-normal ml-1 mt-0.5">
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
