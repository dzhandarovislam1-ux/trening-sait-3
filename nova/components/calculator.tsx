"use client";

import { useState } from "react";
import { plans, prices, rub, waLink } from "@/lib/data";
import { WhatsApp } from "./icons";

type Mode = "cash" | "installment";

const MIN_AREA = 30;
const MAX_AREA = 100;
const MAX_DOWN = 20000;

const pct = (v: number, min: number, max: number) => `${((v - min) / (max - min)) * 100}%`;

export function Calculator() {
  const [mode, setMode] = useState<Mode>("installment");
  const [area, setArea] = useState(49.2);
  const [down, setDown] = useState(prices.minDownPerM2);

  const pricePerM2 = mode === "cash" ? prices.cash : prices.installment;
  const total = area * pricePerM2;
  const downTotal = mode === "installment" ? area * down : 0;
  const monthly = (total - downTotal) / prices.months;

  const areaText = area.toFixed(1).replace(".", ",");
  const message =
    mode === "cash"
      ? `Здравствуйте! Рассчитал на сайте покупку за наличные: ${areaText} м², около ${rub(total)}. Подскажите, какие квартиры есть в наличии?`
      : `Здравствуйте! Рассчитал на сайте исламскую рассрочку: ${areaText} м², взнос ${down ? rub(downTotal) : "без взноса"}, платёж около ${rub(monthly)} в месяц на ${prices.months} мес. Подскажите условия и наличие.`;

  return (
    <div className="card grid gap-0 lg:grid-cols-[1.15fr_1fr]">
      {/* Controls */}
      <div className="p-6 md:p-10">
        <div className="inline-flex rounded-full border border-line-strong bg-white/[.03] p-1" role="tablist" aria-label="Способ оплаты">
          {(
            [
              ["installment", "Исламская рассрочка"],
              ["cash", "Наличный расчёт"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={mode === k}
              onClick={() => setMode(k)}
              className={`rounded-full px-4 py-2.5 text-sm font-bold transition md:px-5 ${
                mode === k ? "bg-white text-bg" : "text-white/70 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-baseline justify-between">
            <label htmlFor="area" className="text-sm font-semibold text-muted">
              Площадь квартиры
            </label>
            <span className="font-display text-2xl font-semibold tabular-nums">
              {areaText} <span className="text-base text-muted">м²</span>
            </span>
          </div>
          <input
            id="area"
            type="range"
            min={MIN_AREA}
            max={MAX_AREA}
            step={0.1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="mt-4"
            style={{ ["--p" as string]: pct(area, MIN_AREA, MAX_AREA) }}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {plans.map((p) => (
              <button
                key={p.id}
                onClick={() => setArea(p.area)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  Math.abs(area - p.area) < 0.05
                    ? "border-blue-bright bg-blue/20 text-white"
                    : "border-line-strong text-white/60 hover:text-white"
                }`}
              >
                {p.rooms}к · {p.area.toFixed(1).replace(".", ",")} м²
              </button>
            ))}
          </div>
        </div>

        {mode === "installment" ? (
          <div className="mt-10">
            <div className="flex items-baseline justify-between">
              <label htmlFor="down" className="text-sm font-semibold text-muted">
                Первоначальный взнос за м²
              </label>
              <span className="font-display text-2xl font-semibold tabular-nums">
                {down ? rub(down) : "Без взноса"}
              </span>
            </div>
            <input
              id="down"
              type="range"
              min={0}
              max={MAX_DOWN}
              step={1000}
              value={down}
              onChange={(e) => setDown(Number(e.target.value))}
              className="mt-4"
              style={{ ["--p" as string]: pct(down, 0, MAX_DOWN) }}
            />
            <div className="mt-2 flex justify-between text-xs text-muted">
              <span>Без взноса</span>
              <span>{rub(MAX_DOWN)}</span>
            </div>
          </div>
        ) : (
          <p className="mt-10 rounded-2xl border border-line bg-white/[.02] p-5 text-sm leading-relaxed text-muted">
            В доме со сдачей в IV квартале 2026 года остались квартиры только за наличный расчёт. Цена за м² зависит
            от этажа.
          </p>
        )}
      </div>

      {/* Result */}
      <div className="relative overflow-hidden border-t border-line bg-gradient-to-br from-[#4a4cf8] via-[#2a2bb8] to-[#0b0b18] p-6 md:p-10 lg:border-l lg:border-t-0">
        <div className="glow -right-20 -top-20 size-72 bg-blue-bright/40" />
        <div className="relative">
          {mode === "installment" ? (
            <>
              <p className="text-sm font-semibold text-white/70">Ежемесячный платёж</p>
              <p className="font-display mt-2 text-4xl font-semibold tabular-nums md:text-5xl">{rub(monthly)}</p>
              <p className="mt-1 text-sm text-white/60">{prices.months} месяцев</p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-white/70">Стоимость квартиры</p>
              <p className="font-display mt-2 text-4xl font-semibold tabular-nums md:text-5xl">{rub(total)}</p>
              <p className="mt-1 text-sm text-white/60">по стартовой цене</p>
            </>
          )}

          <dl className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm">
            <Row label="Цена за м²" value={rub(pricePerM2)} />
            <Row label="Стоимость квартиры" value={rub(total)} />
            {mode === "installment" && (
              <>
                <Row label="Первоначальный взнос" value={down ? rub(downTotal) : "0 ₽"} />
                <Row label="Остаток в рассрочку" value={rub(total - downTotal)} />
              </>
            )}
          </dl>

          <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-8 w-full">
            <WhatsApp /> Отправить расчёт менеджеру
          </a>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            Расчёт предварительный. Точная цена зависит от этажа и выбранной квартиры, её подтвердит отдел продаж.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/60">{label}</dt>
      <dd className="font-bold tabular-nums">{value}</dd>
    </div>
  );
}
