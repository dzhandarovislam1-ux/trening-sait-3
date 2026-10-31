"use client";

import Image from "next/image";
import { useState } from "react";
import { gallery } from "@/lib/data";
import { Lightbox } from "./lightbox";
import { Plus } from "./icons";

// Bento layout spans for 9 images on desktop
const spans = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-3",
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[240px] md:grid-cols-6 md:gap-4">
        {gallery.map((g, i) => (
          <button
            key={g.src}
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-3xl border border-line bg-surface ${spans[i]}`}
            aria-label={`Открыть: ${g.alt}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 right-16 translate-y-2 text-left text-sm font-semibold opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {g.alt}
            </span>
            <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white text-bg opacity-0 transition duration-500 group-hover:opacity-100">
              <Plus className="size-4" />
            </span>
          </button>
        ))}
      </div>
      <Lightbox items={gallery} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
