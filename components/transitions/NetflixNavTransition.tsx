"use client";

import React, { useMemo } from "react";
import { usePageTransition } from "./PageTransitionContext";

export function NetflixNavTransition() {
  const { isTransitioning, targetWord, originRect, phase } =
    usePageTransition();

  // Compute position & target center delta with responsive, viewport-safe bounds
  const coords = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        x: 0,
        y: 0,
        w: 120,
        h: 36,
        deltaX: 0,
        deltaY: 0,
        scale: 2.5,
        startFontSize: 16,
      };
    }

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    const defaultX = winW / 2 - 60;
    const defaultY = 32;

    const x = originRect ? originRect.x : defaultX;
    const y = originRect ? originRect.y : defaultY;
    const w = originRect ? Math.max(originRect.width, 36) : 120;
    const h = originRect ? Math.max(originRect.height, 20) : 36;

    const centerX = winW / 2;
    const centerY = winH / 2;
    const currentCenterX = x + w / 2;
    const currentCenterY = y + h / 2;

    const deltaX = centerX - currentCenterX;
    const deltaY = centerY - currentCenterY;

    // Viewport-safe bounds
    const isMobile = winW < 640;
    const isTablet = winW < 1024;

    // Safe horizontal margin so the word never touches or overflows the viewport
    const horizontalMargin = isMobile ? 32 : isTablet ? 64 : 120;
    const maxSafeWidth = Math.max(winW - horizontalMargin * 2, 200);

    // Target font size:
    // Mobile: ~34px to 48px
    // Desktop: ~56px to 84px
    const initialTargetFontSize = isMobile
      ? Math.min(Math.max(Math.round(winW * 0.1), 32), 48)
      : Math.min(Math.max(Math.round(winW * 0.055), 56), 84);

    // Anton / Grotesk character width is ~0.62 of font size
    const charCount = Math.max(targetWord.length, 3);
    const estimatedWordWidth = charCount * (initialTargetFontSize * 0.62);

    // If estimated width exceeds maxSafeWidth, scale down targetFontSize to guarantee safe fit
    let targetFontSize = initialTargetFontSize;
    if (estimatedWordWidth > maxSafeWidth) {
      targetFontSize = Math.max(
        Math.floor(maxSafeWidth / (charCount * 0.62)),
        20
      );
    }

    // Starting font size inside the origin box
    const startFontSize = Math.max(Math.min(Math.round(h * 0.75), 32), 14);

    // Exact scale factor from startFontSize to targetFontSize
    const scale = Math.max(targetFontSize / startFontSize, 1.2);

    return {
      x,
      y,
      w,
      h,
      deltaX,
      deltaY,
      scale,
      startFontSize,
    };
  }, [originRect, targetWord]);

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
      className="fixed inset-0 z-[120] pointer-events-none select-none overflow-hidden w-screen h-screen max-w-full max-h-screen"
      style={{ contain: "strict" }}
    >
      {/* 
        Clean backdrop:
        Composite-only opacity transition on dedicated GPU layer.
        Starts 100% transparent and smoothly dims into the dark editorial surface.
      */}
      <div
        className="absolute inset-0 bg-ink/95 backdrop-blur-md will-change-[opacity]"
        style={{
          opacity: isGrowing ? (isFading ? 0 : 0.98) : 0,
          transition: isFading
            ? "opacity 160ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* 
        The Word:
        Enlarges directly from clicked navbar position into the screen.
        Hardware-accelerated with translate3d and scale only (no layout thrashing).
        Guaranteed to stay within the viewport bounds.
      */}
      <div
        className="absolute flex items-center justify-center font-display font-black text-lime uppercase tracking-tight will-change-transform"
        style={{
          left: coords.x,
          top: coords.y,
          width: coords.w,
          height: coords.h,
          fontSize: `${coords.startFontSize}px`,
          lineHeight: 1,
          transformOrigin: "center center",
          transform: isGrowing
            ? isFading
              ? `translate3d(${coords.deltaX}px, ${coords.deltaY}px, 0) scale(${coords.scale * 1.05})`
              : `translate3d(${coords.deltaX}px, ${coords.deltaY}px, 0) scale(${coords.scale})`
            : "translate3d(0, 0, 0) scale(1)",
          opacity: isGrowing ? (isFading ? 0 : 0.95) : 0.9,
          filter: isGrowing
            ? "drop-shadow(0 0 24px rgba(216, 255, 80, 0.45))"
            : "none",
          transition: isGrowing
            ? isFading
              ? "transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms ease-out"
              : "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms ease-out"
            : "none",
        }}
      >
        <span className="whitespace-nowrap select-none">{targetWord}</span>
      </div>
    </div>
  );
}

export default NetflixNavTransition;
