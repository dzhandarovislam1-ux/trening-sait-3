"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cookies-ok";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(localStorage.getItem(KEY) !== "1");
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setShow(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[55] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md" role="region" aria-label="Уведомление о cookies">
      <div className="glass flex flex-col gap-4 rounded-3xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,.9)] sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-white/75">
          Сайт использует cookies для работы карты. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
          <Link href="/privacy/" className="text-white underline">
            политикой обработки данных
          </Link>
          .
        </p>
        <button onClick={accept} className="btn btn-primary !h-11 shrink-0 !px-6 text-sm">
          Понятно
        </button>
      </div>
    </div>
  );
}
