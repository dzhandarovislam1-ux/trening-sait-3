"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [zoom, setZoom] = useState(false);
  const [canZoom, setCanZoom] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setZoom(false);
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

  useEffect(() => {
    const s = scroller.current;
    if (zoom && s) s.scrollLeft = (s.scrollWidth - s.clientWidth) / 2;
  }, [zoom]);

  if (!open) return null;
  const item = items[index];
  const many = items.length > 1;

  // Zoom only helps when a wide photo is letterboxed on a tall (phone) screen.
  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const box = scroller.current;
    if (!box) return;
    const shownH = Math.min(box.clientHeight, (box.clientWidth / img.naturalWidth) * img.naturalHeight);
    setCanZoom(shownH < box.clientHeight * 0.75);
  };

  // Portal: [data-reveal] ancestors set `translate`, which would trap `position: fixed` inside them.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center justify-between p-3 md:p-4">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold tabular-nums">
          {many ? `${index + 1} / ${items.length}` : ""}
        </span>
        <button
          onClick={onClose}
          className="grid size-12 place-items-center rounded-full border border-line-strong bg-white/10 hover:bg-white/20"
          aria-label="Закрыть"
        >
          <Close />
        </button>
      </div>

      <div
        ref={scroller}
        className={`relative min-h-0 flex-1 ${
          zoom ? "overflow-x-auto overflow-y-hidden" : "flex items-center justify-center md:px-24"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (zoom || touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt}
          width={1600}
          height={1000}
          sizes="100vw"
          onLoad={onLoad}
          onClick={() => canZoom && setZoom((z) => !z)}
          className={
            zoom
              ? "h-full w-auto max-w-none cursor-zoom-out"
              : `h-auto max-h-full w-full max-w-6xl object-contain md:w-auto ${canZoom ? "cursor-zoom-in" : ""}`
          }
        />
      </div>

      <div className="flex shrink-0 flex-col items-center gap-3 p-4 pb-6" onClick={(e) => e.stopPropagation()}>
        {canZoom && (
          <p className="text-xs text-white/50">
            {zoom ? "Листайте фото пальцем · нажмите, чтобы уменьшить" : "Нажмите на фото, чтобы увеличить"}
          </p>
        )}
        {many && (
          <div className="flex gap-3 md:hidden">
            <button
              onClick={() => go(-1)}
              className="grid size-12 place-items-center rounded-full border border-line-strong bg-white/10"
              aria-label="Предыдущее фото"
            >
              <ArrowRight className="size-5 rotate-180" />
            </button>
            <button
              onClick={() => go(1)}
              className="grid size-12 place-items-center rounded-full border border-line-strong bg-white/10"
              aria-label="Следующее фото"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        )}
      </div>

      {many && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-6 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-white/10 hover:bg-white/20 md:grid"
            aria-label="Предыдущее фото"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-6 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-white/10 hover:bg-white/20 md:grid"
            aria-label="Следующее фото"
          >
            <ArrowRight className="size-5" />
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
