"use client";

import { useEffect, useRef } from "react";

export default function Signal() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let visible = true;

    const mq = matchMedia("(prefers-reduced-motion: reduce)");

    function move(e: PointerEvent) {
      const r = c!.getBoundingClientRect();
      targetX = (e.clientX - r.left) / r.width - 0.5;
      targetY = (e.clientY - r.top) / r.height - 0.5;
    }

    function draw(ms: number) {
      if (!ctx || !c) return;
      const w = c.clientWidth;
      const h = c.clientHeight;
      const d = Math.min(devicePixelRatio || 1, 2);

      if (c.width !== Math.round(w * d) || c.height !== Math.round(h * d)) {
        c.width = Math.round(w * d);
        c.height = Math.round(h * d);
      }

      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Smooth cursor lerp
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Extract current theme accent RGB from computed CSS variables
      const isDark = document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      const rgb = isDark ? "127, 160, 255" : "47, 91, 255";

      const t = mq.matches ? 0 : ms * 0.00018;
      const scale = Math.min(w * 0.44, h * 0.47);

      for (let j = 0; j < 48; j++) {
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const a = (i * Math.PI) / 60;
          const b = (j * Math.PI) / 24;
          const rad = 0.67 + 0.18 * Math.cos(b + 3 * a + t);
          const px = rad * Math.cos(a);
          const py = rad * Math.sin(a);
          const pz = 0.24 * Math.sin(b + 3 * a + t) + 0.18 * Math.sin(2 * a + t);

          const u = px * 0.92 - py * 0.38;
          const v = px * 0.38 + py * 0.92;

          const X = w / 2 + scale * (u + pz * (0.22 + currentX * 0.22));
          const Y = h / 2 + scale * (v * (-0.42 + currentY * 0.16) + pz * 1.38);

          if (i) ctx.lineTo(X, Y);
          else ctx.moveTo(X, Y);
        }

        const opacity = 0.18 + (0.42 * (1 + Math.sin(j * 0.13 + t))) / 2;
        ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
        ctx.lineWidth = 1.15;
        ctx.stroke();
      }

      if (visible && !mq.matches) {
        frame = requestAnimationFrame(draw);
      }
    }

    function restart() {
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    io.observe(c);

    const ro = new ResizeObserver(restart);
    ro.observe(c);

    mq.addEventListener("change", restart);
    c.addEventListener("pointermove", move);

    // Initial draw
    frame = requestAnimationFrame(draw);

    return () => {
      visible = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", restart);
      c.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} className="signal-canvas" aria-hidden="true" />;
}
