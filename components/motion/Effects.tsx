"use client";
import { motion, useReducedMotion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reduce ? {} : { opacity: [0.85, 1], y: [12, 0] }}
      viewport={{ once: true, amount: 0.08 }}
    >
      {children}
    </motion.div>
  );
}
export function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null),
    seen = useInView(ref, { once: true }),
    reduce = useReducedMotion();
  const [n, set] = useState(value);
  useEffect(() => {
    if (seen && !reduce) {
      const a = animate(0, value, {
        duration: 0.7,
        onUpdate: (v) => set(Math.round(v)),
      });
      return () => a.stop();
    }
  }, [seen, value, reduce]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}</span>;
}
