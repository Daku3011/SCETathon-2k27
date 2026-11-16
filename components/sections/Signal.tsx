"use client";
import { useEffect, useRef } from "react";
export default function Signal() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!,
      ctx = c.getContext("2d");
    if (!ctx) return;
    let frame = 0,
      x = 0,
      y = 0,
      visible = true;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    function move(e: PointerEvent) {
      const r = c.getBoundingClientRect();
      x = (e.clientX - r.left) / r.width - 0.5;
      y = (e.clientY - r.top) / r.height - 0.5;
    }
    function draw(ms: number) {
      if (!ctx) return;
      const w = c.clientWidth,
        h = c.clientHeight,
        d = Math.min(devicePixelRatio, 1.5);
      if (c.width !== Math.round(w * d) || c.height !== Math.round(h * d)) {
        c.width = Math.round(w * d);
        c.height = Math.round(h * d);
      }
      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const t = mq.matches ? 0 : ms * 0.00012;
      const scale = Math.min(w * 0.44, h * 0.47);
      for (let j = 0; j < 48; j++) {
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const a = (i * Math.PI) / 60,
            b = (j * Math.PI) / 24,
            rad = 0.67 + 0.18 * Math.cos(b + 3 * a + t),
            px = rad * Math.cos(a),
            py = rad * Math.sin(a),
            pz = 0.24 * Math.sin(b + 3 * a + t) + 0.18 * Math.sin(2 * a + t),
            u = px * 0.92 - py * 0.38,
            v = px * 0.38 + py * 0.92;
          const X = w / 2 + scale * (u + pz * (0.22 + x * 0.18)),
            Y = h / 2 + scale * (v * (-0.42 + y * 0.12) + pz * 1.38);
          if (i) ctx.lineTo(X, Y);
          else ctx.moveTo(X, Y);
        }
        ctx.strokeStyle =
          "rgba(188,255,86," +
          (0.23 + (0.4 * (1 + Math.sin(j * 0.13))) / 2) +
          ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (visible && !mq.matches) frame = requestAnimationFrame(draw);
    }
    function restart() {
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(draw);
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      restart();
    });
    io.observe(c);
    const ro = new ResizeObserver(restart);
    ro.observe(c);
    mq.addEventListener("change", restart);
    c.addEventListener("pointermove", move);
    return () => {
      visible = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", restart);
      c.removeEventListener("pointermove", move);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}
