"use client";

import Image from "next/image";
import { useState } from "react";
import { plans, prices, rub, waLink } from "@/lib/data";
import { Lightbox } from "./lightbox";
import { ArrowUpRight, WhatsApp } from "./icons";

const filters = [
  { key: 0, label: "Все" },
  { key: 1, label: "1-комнатные" },
  { key: 2, label: "2-комнатные" },
  { key: 3, label: "3-комнатные" },
] as const;

const fmtArea = (n: number) => n.toFixed(2).replace(".", ",");

export function Plans() {
  const [filter, setFilter] = useState<number>(0);
  const [zoom, setZoom] = useState<number | null>(null);

  const list = filter ? plans.filter((p) => p.rooms === filter) : plans;
  const zoomItems = list.map((p) => ({ src: p.image, alt: `Планировка: ${p.title}, ${fmtArea(p.area)} м²` }));

  return (
    <>
      <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 md:justify-center" role="tablist" aria-label="Фильтр по комнатам">
        {filters.map((f) => {
          const active = filter === f.key;
          const count = f.key ? plans.filter((p) => p.rooms === f.key).length : plans.length;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.key)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                active
                  ? "border-blue bg-blue text-white shadow-[0_8px_30px_-8px_rgba(51,70,255,.9)]"
                  : "border-line-strong bg-white/[.03] text-white/70 hover:text-white"
              }`}
            >
              {f.label}
              <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/20" : "bg-white/10"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {list.map((p, i) => (
          <article key={p.id} className="card group flex flex-col p-3 md:p-4">
            <button
              onClick={() => setZoom(i)}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-surface-2"
              aria-label={`Увеличить планировку: ${p.title}, ${fmtArea(p.area)} м²`}
            >
              <Image
                src={p.image}
                alt={`Планировка: ${p.title}, ${fmtArea(p.area)} м²`}
                fill
                sizes="(min-width: 768px) 600px, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold backdrop-blur">
                {p.rooms}-комн.
              </span>
              <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white text-bg opacity-0 transition group-hover:opacity-100">
                <ArrowUpRight className="size-4" />
              </span>
            </button>

            <div className="flex flex-1 flex-col px-2 pb-2 pt-5 md:px-3">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="font-display mt-1 text-4xl font-semibold">
                    {fmtArea(p.area)}
                    <span className="ml-1 text-lg text-muted">м²</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">от</p>
                  <p className="text-xl font-extrabold text-terra">{rub(p.area * prices.cash)}</p>
                </div>
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
                {p.parts.map((r, k) => (
                  <li key={k} className="flex justify-between gap-2">
                    <span className="text-muted">{r.name}</span>
                    {r.area !== undefined && <span className="font-semibold tabular-nums">{fmtArea(r.area)}</span>}
                  </li>
                ))}
              </ul>

              <a
                href={waLink(`Здравствуйте! Интересует ${p.title.toLowerCase()} квартира ${fmtArea(p.area)} м² в ЖК «Новый Терек». Есть ли в наличии и на каком этаже?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-6 w-full hover:!border-[#22c55e] hover:!bg-[#22c55e] hover:!text-[#04120a]"
              >
                <WhatsApp className="size-5" />
                Узнать наличие и этажи
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        Цена «от» — при оплате наличными по стартовой стоимости {rub(prices.cash)} за м². Итоговая цена зависит от этажа.
      </p>

      <Lightbox items={zoomItems} index={zoom} onChange={setZoom} onClose={() => setZoom(null)} />
    </>
  );
}
