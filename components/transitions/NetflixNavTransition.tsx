"use client";

import React, { useMemo } from "react";
import { usePageTransition } from "./PageTransitionContext";

export function NetflixNavTransition() {
  const { isTransitioning, targetWord, originRect, phase } =
    usePageTransition();

  // Compute position & target center delta
  const coords = useMemo(() => {
    if (typeof window === "undefined") {
      return { x: 0, y: 0, w: 100, h: 32, deltaX: 0, deltaY: 0 };
    }
    const defaultX = window.innerWidth / 2 - 50;
    const defaultY = 32;
    const x = originRect ? originRect.x : defaultX;
    const y = originRect ? originRect.y : defaultY;
    const w = originRect ? originRect.width : 100;
    const h = originRect ? originRect.height : 32;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const currentCenterX = x + w / 2;
    const currentCenterY = y + h / 2;

    return {
      x,
      y,
      w,
      h,
      deltaX: centerX - currentCenterX,
      deltaY: centerY - currentCenterY,
    };
  }, [originRect]);

  if (!isTransitioning || phase === "idle") {
    return null;
  }

  const isGrowing = phase === "grow" || phase === "fade";
  const isFading = phase === "fade";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Navigating to ${targetWord}`}
      className="fixed inset-0 z-[120] pointer-events-none select-none overflow-hidden"
    >
      {/* 
        Clean backdrop:
        Composite-only opacity transition on dedicated GPU layer.
        Starts 100% transparent (no abrupt black flash).
      */}
      <div
        className="absolute inset-0 bg-surface will-change-[opacity]"
        style={{
          opacity: isGrowing ? (isFading ? 0 : 0.98) : 0,
          transition: isFading
            ? "opacity 160ms ease-out"
            : "opacity 220ms ease-in",
        }}
      />

      {/* 
        The Word:
        Enlarges directly from clicked navbar position into the screen.
        Hardware-accelerated with translate3d and scale only (no layout or filter thrashing).
      */}
      <div
        className="fixed flex items-center justify-center font-display font-black text-lime uppercase tracking-tight whitespace-nowrap will-change-transform"
        style={{
          left: coords.x,
          top: coords.y,
          width: coords.w,
          height: coords.h,
          fontSize: "14px",
          transformOrigin: "center center",
          transform: isGrowing
            ? `translate3d(${coords.deltaX}px, ${coords.deltaY}px, 0) scale(15)`
            : "translate3d(0, 0, 0) scale(1)",
          opacity: isGrowing ? (isFading ? 0 : 0.85) : 1,
          transition: isGrowing
            ? "transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms cubic-bezier(0.8, 0, 1, 1)"
            : "none",
        }}
      >
        {targetWord}
      </div>
    </div>
  );
}

export default NetflixNavTransition;
