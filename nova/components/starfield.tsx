"use client";

import { useEffect, useRef } from "react";

/** Fixed background of softly twinkling, slowly drifting stars. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    type Star = { x: number; y: number; r: number; a: number; s: number; vy: number };
    let stars: Star[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.08 ? 1.6 + Math.random() * 1.2 : 0.4 + Math.random() * 0.9,
        a: Math.random() * Math.PI * 2,
        s: 0.004 + Math.random() * 0.012,
        vy: 0.03 + Math.random() * 0.08,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.a += st.s;
        st.y -= st.vy;
        if (st.y < -4) {
          st.y = h + 4;
          st.x = Math.random() * w;
        }
        const alpha = 0.25 + 0.75 * Math.abs(Math.sin(st.a));
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 216, 255, ${alpha * (st.r > 1.5 ? 0.9 : 0.6)})`;
        if (st.r > 1.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(160, 165, 255, 0.9)";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
