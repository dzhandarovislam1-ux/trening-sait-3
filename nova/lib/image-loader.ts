"use client";

// Static export has no image optimiser, so photos ship with pre-resized copies
// (public/images/<name>-<width>.webp); pick the smallest one that covers `width`.
const WIDTHS = [640, 960, 1280];
const RESIZED = /\/images\/(aerial|facade)-[a-z0-9]+\.webp$/;

export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!RESIZED.test(src)) return src;
  const w = WIDTHS.find((v) => v >= width);
  return w ? src.replace(/\.webp$/, `-${w}.webp`) : src;
}
