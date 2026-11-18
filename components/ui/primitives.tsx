import React from "react";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  solid: "bg-coral text-ink hover:bg-lime",
  outline: "border border-line-strong text-paper hover:border-lime hover:text-lime",
  ghost: "text-muted hover:text-paper",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-[10px]",
  md: "min-h-12 px-5 text-[11px]",
};

const base =
  "inline-flex items-center justify-between gap-3 font-mono font-bold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

export function Button({
  variant = "solid",
  size = "md",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-line-strong px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionLabel({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 kicker", className)}>
      <span className="reg-mark" aria-hidden="true" />
      {index && <span className="text-coral">{index}</span>}
      <span>{children}</span>
    </div>
  );
}
