"use client";

import { useState, useSyncExternalStore } from "react";
import { BASE } from "@/lib/data";

const KEY = "cookies-ok";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};
const readAccepted = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

export function CookieBanner() {
  // Server snapshot is "accepted" so the banner never appears in static HTML.
  const accepted = useSyncExternalStore(subscribe, readAccepted, () => true);
  const [dismissed, setDismissed] = useState(false);

  if (accepted || dismissed) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setDismissed(true);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[55] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md" role="region" aria-label="Уведомление о cookies">
      <div className="flex flex-col rounded-3xl border border-line-strong bg-[#0e0e1e] gap-4 rounded-3xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,.9)] sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-white/75">
          Сайт использует cookies для работы карты. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
          <a href={`${BASE}/privacy/`} className="text-white underline">
            политикой обработки данных
          </a>
          .
        </p>
        <button onClick={accept} className="btn btn-primary !h-11 shrink-0 !px-6 text-sm">
          Понятно
        </button>
      </div>
    </div>
  );
}
