"use client";

import React, { useMemo } from "react";
import { usePageTransition } from "./PageTransitionContext";

/**
 * Measure text width accurately using offscreen canvas to avoid synchronous DOM reflows.
 * Fallbacks to proportional uppercase character measurement for heavyweight display typography.
 */
function measureTextMetrics(
  text: string,
  fontSize: number = 14
): { width: number; height: number } {
  if (typeof window === "undefined" || !text) {
    return {
      width: Math.ceil((text?.length || 10) * (fontSize * 0.76)),
      height: Math.ceil(fontSize * 1.3),
    };
  }

  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Matches Tailwind font-display: Archivo Black, Arial Black, Impact, sans-serif
      ctx.font = `900 ${fontSize}px "Archivo Black", "Arial Black", Impact, sans-serif`;
      const metrics = ctx.measureText(text);
      if (metrics && metrics.width > 0) {
        return {
          width: Math.ceil(metrics.width),
          height: Math.ceil(fontSize * 1.3),
        };
      }
    }
  } catch {
    // fallback below
  }

  return {
    width: Math.ceil(text.length * (fontSize * 0.76)),
    height: Math.ceil(fontSize * 1.3),
  };
}

export function NetflixNavTransition() {
  const { isTransitioning, targetWord, originRect, phase } =
    usePageTransition();

  // Compute position & target center delta with viewport-bounded responsive scale
  const coords = useMemo(() => {
    if (typeof window === "undefined" || !targetWord) {
      return {
        initialLeft: 0,
        initialTop: 0,
        width: 100,
        height: 20,
        deltaX: 0,
        deltaY: 0,
        targetScale: 1,
      };
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const baseFontSize = 14;

    const metrics = measureTextMetrics(targetWord, baseFontSize);
    const textWidth = Math.max(metrics.width, 24);
    const textHeight = Math.max(metrics.height, 16);

    // Determine origin center
    const hasValidOrigin =
      originRect &&
      originRect.width > 0 &&
      originRect.height > 0 &&
      originRect.y >= -100 &&
      originRect.y <= vh + 100;

    const originCenterX = hasValidOrigin
      ? originRect.x + originRect.width / 2
      : vw / 2;
    const originCenterY = hasValidOrigin
      ? originRect.y + originRect.height / 2
      : 36;

    // Viewport center
    const screenCenterX = vw / 2;
    const screenCenterY = vh / 2;

    // Translation delta to animate center directly to viewport center
    const deltaX = screenCenterX - originCenterX;
    const deltaY = screenCenterY - originCenterY;

    // Viewport responsive constraints
    const isMobile = vw < 640;
    const isTablet = vw >= 640 && vw < 1024;

    // Safe horizontal padding so text never touches or bleeds off-screen
    const paddingX = isMobile ? (vw < 360 ? 16 : 22) : isTablet ? 36 : 48;
    const maxVisualWidth = isMobile
      ? vw - paddingX * 2
      : isTablet
      ? Math.min(vw - paddingX * 2, vw * 0.8, 640)
      : Math.min(vw - paddingX * 2, vw * 0.72, 880);

    const scaleFromWidth = maxVisualWidth / textWidth;

    // Safe vertical height constraint (never exceeds 22% of mobile screen height or 35% on desktop)
    const maxVisualHeight = isMobile ? vh * 0.22 : vh * 0.35;
    const scaleFromHeight = maxVisualHeight / textHeight;

    // Maximum font size cap to prevent short words from ballooning
    const maxFontSize = isMobile
      ? Math.min(42, Math.max(28, Math.round(vw * 0.09)))
      : isTablet
      ? Math.min(60, Math.max(44, Math.round(vw * 0.07)))
      : Math.min(84, Math.max(64, Math.round(vw * 0.055)));

    const maxScaleCap = maxFontSize / baseFontSize;

    // Final target scale: guaranteed to fit within viewport width and height
    const targetScale = Math.max(
      1.15,
      Math.min(scaleFromWidth, scaleFromHeight, maxScaleCap)
    );

    // Initial position centered on origin
    const initialLeft = originCenterX - textWidth / 2;
    const initialTop = originCenterY - textHeight / 2;

    return {
      initialLeft,
      initialTop,
      width: textWidth,
      height: textHeight,
      deltaX,
      deltaY,
      targetScale,
    };
  }, [targetWord, originRect]);

  if (!isTransitioning || phase === "idle" || !targetWord) {
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
        className="absolute inset-0 bg-ink will-change-[opacity]"
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
        Bounded by viewport dimensions to never bleed off-screen on mobile or desktop.
      */}
      <div
        className="fixed flex items-center justify-center font-display font-black text-lime uppercase tracking-tight whitespace-nowrap will-change-transform select-none"
        style={{
          left: coords.initialLeft,
          top: coords.initialTop,
          width: coords.width,
          height: coords.height,
          fontSize: "14px",
          lineHeight: 1,
          transformOrigin: "center center",
          transform: isGrowing
            ? `translate3d(${coords.deltaX}px, ${coords.deltaY}px, 0) scale(${coords.targetScale})`
            : "translate3d(0, 0, 0) scale(1)",
          opacity: isGrowing ? (isFading ? 0 : 0.92) : 1,
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
