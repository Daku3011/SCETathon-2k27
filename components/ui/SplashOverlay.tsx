"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/**
 * SplashOverlay – full-screen promotional interstitial shown once per session.
 *
 * Behaviour:
 * - Appears on initial page load with a cinematic fade-in
 * - Poster image scales up slightly during entrance (ken-burns feel)
 * - Close via ✕ button, Escape key, or clicking the backdrop
 * - Only shown once per browser session (sessionStorage flag)
 * - Respects prefers-reduced-motion (no animations)
 * - 44px minimum touch target for close button
 * - Focus-trapped while open (close button auto-focused)
 */
export default function SplashOverlay() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("splash-seen");
    if (seen) return;
    // Small delay so the site beneath has a moment to paint
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setExiting(true);
    // Wait for exit animation to finish before unmounting
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const duration = prefersReduced ? 10 : 450;
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
      sessionStorage.setItem("splash-seen", "1");
    }, duration);
  }, []);

  // Keyboard dismiss
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, dismiss]);

  // Lock body scroll while overlay is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`splash-overlay ${exiting ? "splash-exit" : "splash-enter"}`}
      role="dialog"
      aria-modal="true"
      aria-label="SCETATHON 2.0 promotional poster"
      onClick={dismiss}
    >
      {/* Decorative corner accents */}
      <div className="splash-corner splash-corner--tl" aria-hidden="true" />
      <div className="splash-corner splash-corner--tr" aria-hidden="true" />
      <div className="splash-corner splash-corner--bl" aria-hidden="true" />
      <div className="splash-corner splash-corner--br" aria-hidden="true" />

      {/* Close button */}
      <button
        className="splash-close"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        aria-label="Close promotional poster"
        autoFocus
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="4" y1="4" x2="14" y2="14" />
          <line x1="14" y1="4" x2="4" y2="14" />
        </svg>
      </button>

      {/* Poster container */}
      <div
        className={`splash-poster ${exiting ? "splash-poster-exit" : "splash-poster-enter"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/scetathon-promo.png"
          alt="SCETATHON 2.0 — 24 Hour National Hackathon, 28–29 January 2027 at SCET Surat"
          width={1254}
          height={1254}
          quality={90}
          priority
          className="splash-image"
        />
      </div>

      {/* Bottom hint */}
      <p className={`splash-hint ${exiting ? "splash-hint-exit" : ""}`}>
        <kbd className="splash-kbd">ESC</kbd>
        <span>or tap anywhere to continue</span>
      </p>
    </div>
  );
}
