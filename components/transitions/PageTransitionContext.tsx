"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";

export interface NavOriginRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type TransitionPhase = "idle" | "start" | "grow" | "fade";

interface PageTransitionContextValue {
  isTransitioning: boolean;
  targetWord: string;
  originRect: NavOriginRect | null;
  phase: TransitionPhase;
  triggerTransition: (
    href: string,
    label: string,
    e?: React.MouseEvent<HTMLElement>
  ) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [originRect, setOriginRect] = useState<NavOriginRect | null>(null);
  const [phase, setPhase] = useState<TransitionPhase>("idle");

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const triggerTransition = useCallback(
    (href: string, label: string, e?: React.MouseEvent<HTMLElement>) => {
      // Ignore if external link
      if (href.startsWith("http://") || href.startsWith("https://")) {
        return;
      }

      // Handle pure hash scroll on the current page
      const [targetPath, targetHash] = href.split("#");
      const isCurrentPage =
        !targetPath || targetPath === pathname || targetPath === "";

      if (isCurrentPage && targetHash) {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      // Respect prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        router.push(href);
        return;
      }

      // Avoid double triggering
      if (isTransitioning) return;

      clearTimers();

      let rect: NavOriginRect | null = null;
      if (e && e.currentTarget) {
        const b = e.currentTarget.getBoundingClientRect();
        rect = {
          x: b.left,
          y: b.top,
          width: b.width,
          height: b.height,
        };
      }

      const cleanLabel = (label || "NAVIGATING").toUpperCase().trim();
      setTargetWord(cleanLabel);
      setOriginRect(rect);
      setIsTransitioning(true);
      setPhase("start");

      // Phase 1 -> Phase 2 (Enlarge immediately from clicked position)
      const t1 = setTimeout(() => {
        setPhase("grow");
        // Trigger Next.js route navigation in background
        router.push(href);
      }, 20);

      // Phase 2 -> Phase 3 (Fade curtain cleanly revealing new page)
      const t2 = setTimeout(() => {
        setPhase("fade");
      }, 300);

      // Phase 3 -> Finish & Reset (Total snappy duration: ~460ms)
      const t3 = setTimeout(() => {
        setPhase("idle");
        setIsTransitioning(false);
        setOriginRect(null);

        // If target had a hash, scroll to it smoothly; otherwise scroll to top
        if (targetHash) {
          const el = document.getElementById(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.scrollTo(0, 0);
        }
      }, 460);

      timersRef.current = [t1, t2, t3];
    },
    [router, pathname, isTransitioning, clearTimers]
  );

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        targetWord,
        originRect,
        phase,
        triggerTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  }
  return ctx;
}
