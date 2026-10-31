"use client";

import { useEffect, useRef } from "react";

const FRAME_MS = 1000 / 30;

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
    let last = 0;

    type Star = { x: number; y: number; r: number; a: number; s: number; vy: number };
    let stars: Star[] = [];

    const resize = () => {
      // Mobile browsers fire resize while the address bar hides on scroll; only the
      // width matters, and the canvas is already tall enough for either toolbar state.
      if (window.innerWidth === w) return;
      w = window.innerWidth;
      h = Math.max(window.innerHeight, window.screen.height);
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
        s: 0.008 + Math.random() * 0.024,
        vy: 0.06 + Math.random() * 0.16,
      }));
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.a += st.s;
        st.y -= st.vy;
        if (st.y < -6) {
          st.y = h + 6;
          st.x = Math.random() * w;
        }
        const alpha = 0.25 + 0.75 * Math.abs(Math.sin(st.a));
        const big = st.r > 1.5;
        if (big) {
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 165, 255, ${alpha * 0.12})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 216, 255, ${alpha * (big ? 0.9 : 0.6)})`;
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < FRAME_MS) return;
      last = t;
      paint();
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };

    resize();
    paint();
    if (!reduce) raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 -z-10" />;
}
