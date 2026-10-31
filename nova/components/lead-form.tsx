"use client";

import { useState } from "react";
import { BASE, waLink } from "@/lib/data";
import { Check, WhatsApp } from "./icons";

const options = ["1-комнатная", "2-комнатная", "3-комнатная", "Пока не решил(а)"];
const payments = ["Наличный расчёт", "Исламская рассрочка", "Материнский капитал"];

export function LeadForm() {
  const [name, setName] = useState("");
  const [flat, setFlat] = useState(options[1]);
  const [pay, setPay] = useState(payments[0]);
  const [agree, setAgree] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    const text = [
      `Здравствуйте! ${name ? `Меня зовут ${name.trim()}. ` : ""}Интересует квартира в ЖК «Новый Терек».`,
      `Квартира: ${flat}`,
      `Оплата: ${pay}`,
    ].join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white/70">
          Как к вам обращаться
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          autoComplete="given-name"
          className="h-14 w-full rounded-2xl border border-line-strong bg-white/[.04] px-5 text-base outline-none transition placeholder:text-white/30 focus:border-blue-bright focus:bg-white/[.07]"
        />
      </div>

      <Chips label="Какая квартира интересует" items={options} value={flat} onChange={setFlat} />
      <Chips label="Способ оплаты" items={payments} value={pay} onChange={setPay} />

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/70">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          required
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition peer-focus-visible:ring-2 peer-focus-visible:ring-blue-bright ${
            agree ? "border-white bg-white text-bg" : "border-white/40 bg-white/[.06]"
          }`}
        >
          {agree && <Check className="size-3.5" />}
        </span>
        <span>
          Я даю{" "}
          <a href={`${BASE}/consent/`} target="_blank" className="text-white underline">
            согласие на обработку персональных данных
          </a>{" "}
          и ознакомлен(а) с{" "}
          <a href={`${BASE}/privacy/`} target="_blank" className="text-white underline">
            политикой обработки данных
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={!agree}
        className="btn btn-wa h-14 w-full text-base disabled:cursor-not-allowed disabled:opacity-40"
      >
        <WhatsApp /> Отправить заявку в WhatsApp
      </button>
      <p className="text-center text-xs text-white/40">Откроется WhatsApp с готовым сообщением — останется нажать «Отправить».</p>
    </form>
  );
}

function Chips({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold text-white/70">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <button
            type="button"
            key={it}
            onClick={() => onChange(it)}
            aria-pressed={value === it}
            className={`rounded-full border px-4 py-2.5 text-sm font-bold transition ${
              value === it
                ? "border-white bg-white text-bg"
                : "border-line-strong bg-white/[.03] text-white/70 hover:text-white"
            }`}
          >
            {it}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
