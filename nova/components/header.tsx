"use client";

import { useEffect, useState } from "react";
import { company, waLink } from "@/lib/data";
import { Close, Menu, Phone, WhatsApp } from "./icons";
import { TerekLogo } from "./brand";

const nav = [
  { href: "#about", label: "О проекте" },
  { href: "#plans", label: "Планировки" },
  { href: "#prices", label: "Цены и рассрочка" },
  { href: "#gallery", label: "Галерея" },
  { href: "#location", label: "Расположение" },
  { href: "#contacts", label: "Контакты" },
];

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="ЖК «Новый Терек» — наверх">
      <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-[#0a1aff] shadow-[inset_0_1px_1px_rgba(255,255,255,.35),0_0_24px_-4px_rgba(20,40,255,.9)]">
        <TerekLogo className="w-[30px] text-white" />
      </span>
      <span className="leading-tight">
        <span className="font-display block text-[15px] font-semibold">Новый Терек</span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{company.name}</span>
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <div
        className={`glass mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-full py-2 pl-3 pr-2 transition-all duration-500 md:pl-4 ${
          scrolled ? "shadow-[0_20px_60px_-20px_rgba(0,0,0,.9)]" : "!bg-white/[.03]"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основное меню">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={company.phoneHref} className="hidden items-center gap-2 px-3 text-sm font-bold xl:flex">
            <Phone className="size-4 text-blue-bright" />
            {company.phone}
          </a>
          <a
            href={waLink("Здравствуйте! Интересуют квартиры в ЖК «Новый Терек».")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !h-11 !px-5 text-sm max-sm:hidden"
          >
            <WhatsApp className="size-5" />
            Написать
          </a>
          <button
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-full border border-line-strong bg-white/5 lg:hidden"
            aria-label="Открыть меню"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-bg/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-7 pt-6">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-full border border-line-strong bg-white/5"
            aria-label="Закрыть меню"
            tabIndex={open ? 0 : -1}
          >
            <Close />
          </button>
        </div>
        <nav className="mt-10 flex flex-col px-7" aria-label="Мобильное меню">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="font-display border-b border-line py-4 text-2xl font-medium transition-all duration-500"
              style={{
                transform: open ? "none" : "translateY(16px)",
                opacity: open ? 1 : 0,
                transitionDelay: `${open ? 80 + i * 50 : 0}ms`,
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-10 flex flex-col gap-3 px-7">
          <a href={company.phoneHref} className="btn btn-ghost" tabIndex={open ? 0 : -1}>
            <Phone className="size-4" /> {company.phone}
          </a>
          <a
            href={waLink("Здравствуйте! Интересуют квартиры в ЖК «Новый Терек».")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa"
            tabIndex={open ? 0 : -1}
          >
            <WhatsApp /> Написать в WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
