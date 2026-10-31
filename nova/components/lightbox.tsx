"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ArrowRight, Close } from "./icons";

type Item = { src: string; alt: string };

export function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: {
  items: Item[];
  index: number | null;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  if (!open) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
    >
      <div className="relative h-[80vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
      </div>

      <button
        onClick={onClose}
        className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border border-line-strong bg-white/10 hover:bg-white/20"
        aria-label="Закрыть"
      >
        <Close />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-white/10 hover:bg-white/20 md:left-6"
            aria-label="Предыдущее фото"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-white/10 hover:bg-white/20 md:right-6"
            aria-label="Следующее фото"
          >
            <ArrowRight className="size-5" />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold tabular-nums">
            {index + 1} / {items.length}
          </div>
        </>
      )}
    </div>
  );
}
