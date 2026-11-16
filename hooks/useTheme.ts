"use client";

import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("scet_theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setThemeState(initial);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
  }, []);

  const toggleTheme = useCallback(
    (e?: React.MouseEvent) => {
      const nextTheme: Theme = theme === "dark" ? "light" : "dark";

      const applyTheme = () => {
        setThemeState(nextTheme);
        localStorage.setItem("scet_theme", nextTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
      };

      // Check for View Transitions API support and reduced motion preference
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = document as any;

      if (!doc.startViewTransition || isReduced) {
        applyTheme();
        return;
      }

      const x = e ? e.clientX : window.innerWidth / 2;
      const y = e ? e.clientY : 40;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        applyTheme();
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 450,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [theme]
  );

  return { theme, toggleTheme, mounted };
}
