import Image from "next/image";
import { Header, Logo } from "@/components/header";
import { RevealObserver } from "@/components/reveal-observer";
import { Starfield } from "@/components/starfield";
import { Plans } from "@/components/plans";
import { Calculator } from "@/components/calculator";
import { Gallery } from "@/components/gallery";
import { LeadForm } from "@/components/lead-form";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Calendar,
  Check,
  Clock,
  Coins,
  Door,
  Family,
  Home as HomeIcon,
  AtSign,
  Mosque,
  Phone,
  Pin,
  Plus,
  School,
  Tree,
  Wallet,
  WhatsApp,
} from "@/components/icons";
import { BASE, company, faq, permit, prices, waLink } from "@/lib/data";

// ул. Шаповалова, 15Б — coordinates from Yandex Maps (lon,lat).
// A plain placemark instead of a text search, so no organisation card pops up.
const HOUSE = "46.324359,43.507866";
const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${HOUSE}&z=16&pt=${HOUSE},pm2blm`;

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export default function Home() {
  return (
    <>
      <Starfield />
      <Header />
      <RevealObserver />
      <main id="top">
        <Hero />
        <Ticker />
        <About />
        <Stages />
        <section id="plans" className="relative py-24 md:py-32">
          <div className="container-x">
            <SectionHead
              eyebrow="Планировки"
              title={
                <>
                  Квартиры от <span className="text-gradient">44 до 72 м²</span>
                </>
              }
              text="Продуманные планировки с балконами и раздельными комнатами. Нажмите на план, чтобы рассмотреть его ближе."
            />
            <div data-reveal>
              <Plans />
            </div>
          </div>
        </section>
        <Prices />
        <section id="gallery" className="py-24 md:py-32">
          <div className="container-x">
            <SectionHead
              eyebrow="Галерея"
              title={
                <>
                  Как будет выглядеть <span className="text-gradient">квартал</span>
                </>
              }
              text="Кирпичные фасады, зелёные дворы, детские и спортивные площадки, парковки у каждого дома."
            />
            <div data-reveal>
              <Gallery />
            </div>
          </div>
        </section>
        <Location />
        <Faq />
        <Spotlight />
        <Contacts />
      </main>
      <Footer />
      <a
        href={waLink("Здравствуйте! Интересуют квартиры в ЖК «Новый Терек».")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#22c55e] text-[#04120a] shadow-[0_10px_40px_-6px_rgba(34,197,94,.9)] transition hover:scale-105 sm:hidden"
      >
        <WhatsApp className="size-7" />
      </a>
    </>
  );
}

/* ---------------------------------------------------------------- */

function SectionHead({
  eyebrow,
  title,
  text,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <div data-reveal className={`mb-12 md:mb-16 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display mt-6 text-[clamp(32px,5vw,58px)] font-medium leading-[1.08]">{title}</h2>
      {text && <p className={`mt-5 text-lg leading-relaxed text-muted ${center ? "mx-auto max-w-2xl" : ""}`}>{text}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- */

function Hero() {
  const flats = [
    { t: "1к · 44,1 м²", c: "bg-[#ec4899] text-white" },
    { t: "2к · 49,2 м²", c: "bg-white text-bg" },
    { t: "2к · 59,8 м²", c: "bg-white/15 text-white" },
    { t: "3к · 72,1 м²", c: "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.12)_0_4px,transparent_4px_8px)] text-white/80" },
  ];
  const stats = [
    { k: fmt(prices.cash), v: "₽/м² наличными", badge: "старт", tone: "bg-[#22c55e]" },
    { k: fmt(prices.installment), v: "₽/м² в рассрочку", badge: "72 мес", tone: "bg-[#22c55e]" },
    { k: "IV кв.", v: "сдача в 2026", badge: "скоро", tone: "bg-[#f43f5e]" },
  ];

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-36 md:pt-44">
      {/* Light beam + haze */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(68,70,245,.35),transparent_70%)]" />
        <div className="beam beam-sway absolute -top-[20%] left-[6%] h-[110%] w-[160px] origin-top md:left-[12%] md:w-[320px]" />
        <div className="beam beam-sway absolute -top-[20%] left-[8%] h-[110%] w-[40px] origin-top opacity-90 !blur-[6px] md:left-[16%]" />
        <div className="absolute left-[22%] top-[58%] size-40 rounded-full bg-[radial-gradient(circle,rgba(230,232,255,.9),rgba(120,125,255,.4)_30%,transparent_70%)] blur-xl max-md:hidden" />
      </div>

      <div className="container-x text-center">
        <div data-intro className="eyebrow">
          Шелковская · от застройщика {company.name}
        </div>
        <h1
          data-intro
          style={d(100)}
          className="font-display mx-auto mt-7 max-w-4xl text-[clamp(40px,7vw,84px)] font-medium leading-[1.04]"
        >
          <span className="text-gradient inline-block">Новый Терек</span>
          <span className="mt-3 block text-balance text-[0.6em] leading-[1.15]">Квартиры, в которых хочется жить</span>
        </h1>
        <p data-intro style={d(200)} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/75">
          Кирпичный дом рядом со школой, детским садом, мечетью и парком. Сдача — IV квартал 2026 года. Исламская рассрочка до{" "}
          {prices.months} месяцев.
        </p>
        <div data-intro style={d(300)} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#plans" className="btn btn-primary">
            Выбрать квартиру
          </a>
          <a href="#prices" className="btn btn-ghost">
            Рассчитать рассрочку
          </a>
        </div>
      </div>

      {/* Preview panel, styled like the dashboard in the reference */}
      <div className="container-x relative mt-16 md:mt-20">
        <div className="glow left-1/2 top-10 h-64 w-3/4 -translate-x-1/2 bg-blue/40" />
        <div
          data-intro
          style={d(400)}
          className="relative mx-auto max-w-[1080px] rounded-[32px] border border-line-strong bg-white/[.03] p-2 shadow-[0_40px_120px_-40px_rgba(68,70,245,.7)] md:backdrop-blur"
        >
          <div className="card rounded-[26px] p-4 md:p-6">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-lg font-medium">Новый Терек</p>
              <nav className="hidden items-center rounded-full border border-line bg-white/[.03] p-1 md:flex" aria-label="Быстрые ссылки">
                {[
                  ["Обзор", "#about"],
                  ["Планировки", "#plans"],
                  ["Цены", "#prices"],
                  ["Галерея", "#gallery"],
                  ["Контакты", "#contacts"],
                ].map(([l, h], i) => (
                  <a
                    key={h}
                    href={h}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      i === 0 ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {l}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <a href={company.phoneHref} aria-label="Позвонить" className="grid size-9 place-items-center rounded-full border border-line-strong hover:bg-white/10">
                  <Phone className="size-4" />
                </a>
                <a
                  href={company.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Наша страница в соцсети"
                  className="grid size-9 place-items-center rounded-full border border-line-strong hover:bg-white/10"
                >
                  <AtSign className="size-4" />
                </a>
              </div>
            </div>

            {/* Heading + stats */}
            <div className="mt-6 flex flex-col justify-between gap-6 text-left lg:flex-row lg:items-end">
              <div>
                <h2 className="font-display text-2xl font-medium md:text-[28px]">
                  Добро пожаловать в <span className="text-gradient">Новый Терек</span>
                </h2>
                <p className="mt-4 text-xs font-semibold text-muted">Планировки в продаже</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {flats.map((f) => (
                    <a href="#plans" key={f.t} className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${f.c}`}>
                      {f.t}
                    </a>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {stats.map((s) => (
                  <div key={s.v} className="text-center">
                    <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-2">
                      <span className={`whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white ${s.tone}`}>{s.badge}</span>
                      <span className="font-display whitespace-nowrap text-lg font-normal tabular-nums md:text-4xl">{s.k}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted md:text-xs">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image + blue card */}
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_260px]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line md:aspect-auto md:min-h-[300px]">
                <Image
                  src={`${BASE}/images/aerial-front.webp`}
                  alt="ЖК «Новый Терек» — вид на квартал с высоты"
                  fill
                  sizes="(min-width: 768px) 800px, 100vw"
                  className="object-cover"
                />
                <span className="glass absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-semibold">Генплан квартала</span>
              </div>
              <div className="card card-blue flex flex-col rounded-2xl p-5 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Исламская рассрочка</p>
                  <a href="#prices" aria-label="К ценам" className="grid size-8 place-items-center rounded-full bg-white/20 hover:bg-white/30">
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  До {prices.months} месяцев. Взнос от {fmt(prices.minDownPerM2)} ₽ за м² — или без взноса.
                </p>
                <div className="mt-auto space-y-2 pt-6">
                  {["Без процентов", "Маткапитал"].map((t, i) => (
                    <div
                      key={t}
                      className="flex items-center justify-between rounded-xl bg-white/90 px-3 py-2.5 text-sm font-semibold text-bg shadow-lg"
                      style={{ rotate: i ? "-2deg" : "2deg" }}
                    >
                      {t}
                      <span className="grid size-5 place-items-center rounded-full bg-bg text-white">
                        <Check className="size-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function Ticker() {
  const items = [
    "Исламская рассрочка на 72 месяца",
    "Материнский капитал",
    "Сдача — IV квартал 2026",
    "Черновая отделка с перегородками",
    "Окна ПВХ",
    "Рядом школа, детский сад, мечеть и парк",
    "От 50 000 ₽ за м²",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative mt-4 overflow-hidden border-y border-line bg-white/[.02] py-5" aria-hidden>
      <div className="marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 px-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
            {t}
            <span className="size-1.5 rounded-full bg-violet shadow-[0_0_10px_2px_rgba(124,127,255,.8)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function About() {
  const cards = [
    { icon: School, t: "Школа рядом", d: "Дети ходят на занятия без долгой дороги.", r: "-5deg" },
    { icon: Blocks, t: "Детский сад рядом", d: "Детей удобно отводить утром по пути на работу.", r: "0deg" },
    { icon: Mosque, t: "Мечеть рядом", d: "Молитва — в нескольких шагах от дома.", r: "4deg" },
    { icon: Door, t: "Черновая отделка", d: "Перегородки, окна ПВХ и железная дверь уже на месте.", r: "-4deg", blue: true },
    { icon: Tree, t: "Парк рядом", d: "Место для прогулок с семьёй и детьми.", r: "0deg" },
    { icon: HomeIcon, t: "Кирпичный дом", d: "Два блока на 7 и 9 этажей, 4 подъезда.", r: "5deg" },
  ];

  const Card = ({ c, i }: { c: (typeof cards)[number]; i: number }) => {
    const I = c.icon;
    return (
      <div
        data-reveal
        style={{ ...d(i * 90), ["--r" as string]: c.r, ["--rm" as string]: i % 2 ? "4deg" : "-4deg" }}
        className={`tilt card flex flex-col items-center px-6 py-8 text-center lg:w-[270px] ${c.blue ? "card-blue" : ""}`}
      >
        <span className={`tile3d ${c.blue ? "tile3d-dark" : ""}`}>
          <I className="size-7" />
        </span>
        <h3 className="font-display mt-6 text-xl font-medium">{c.t}</h3>
        <p className={`mt-3 text-sm leading-relaxed ${c.blue ? "text-white/85" : "text-muted"}`}>{c.d}</p>
      </div>
    );
  };

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="glow left-1/2 top-60 size-[520px] -translate-x-1/2 bg-blue/20" />
      <div className="container-x relative">
        <SectionHead
          eyebrow="О проекте"
          title={
            <>
              Всё для <span className="text-gradient">спокойной жизни</span>
            </>
          }
          text={`${company.project} — жилой комплекс от ${company.legal} на улице Шаповалова в Шелковской.`}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:flex lg:flex-col lg:items-center lg:gap-0">
          <div className="contents lg:flex lg:justify-center lg:gap-1">
            {cards.slice(0, 3).map((c, i) => (
              <Card key={c.t} c={c} i={i} />
            ))}
          </div>
          <div className="contents lg:-mt-3 lg:flex lg:justify-center lg:gap-1">
            {cards.slice(3).map((c, i) => (
              <Card key={c.t} c={c} i={i + 3} />
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-[1.6fr_1fr]">
          <div data-reveal className="card group min-h-[380px]">
            <Image
              src={`${BASE}/images/facade-2.webp`}
              alt="Фасад жилого дома ЖК «Новый Терек»"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover transition duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 p-3 sm:gap-4 sm:p-6">
              {[
                ["2", "блока в доме"],
                ["7 / 9", "этажей в блоках"],
                ["4", "подъезда"],
              ].map(([k, v]) => (
                <div key={v} className="glass rounded-2xl p-3 sm:p-4">
                  <p className="font-display text-xl font-medium sm:text-3xl">{k}</p>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal style={d(100)} className="card flex flex-col p-7 md:p-8">
            <span className="tile3d">
              <Coins className="size-7" />
            </span>
            <p className="mt-8 text-sm font-semibold text-muted">С начала продаж цена выросла на</p>
            <p className="font-display mt-3 text-5xl font-medium text-gradient">+{fmt(prices.growth)} ₽</p>
            <p className="mt-1 text-sm text-white/60">за каждый квадратный метр</p>
            <p className="mt-auto pt-6 text-sm leading-relaxed text-white/75">
              Чем ближе сдача, тем выше цена. Сейчас — хороший момент зафиксировать стоимость.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function Stages() {
  const steps = [
    { t: "Старт продаж", d: "Первые покупатели зафиксировали самую низкую цену", state: "done" },
    { t: "Возведение дома", d: "Два блока — на 7 и 9 этажей, 4 подъезда", state: "done" },
    { t: "Завершение строительства", d: "Финальный этап работ — мы здесь", state: "now" },
    { t: "Сдача дома", d: "IV квартал 2026 года", state: "next" },
  ] as const;

  return (
    <section className="relative overflow-hidden py-24 md:py-28">
      <div className="container-x relative">
        <SectionHead
          eyebrow="Ход строительства"
          title={
            <>
              Дом <span className="text-gradient">почти готов</span>
            </>
          }
        />
        <ol className="relative grid gap-4 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent md:block" />
          {steps.map((s, i) => (
            <li
              key={s.t}
              data-reveal
              style={d(i * 100)}
              className={`card relative p-6 ${s.state === "now" ? "card-blue" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-display text-sm font-medium ${s.state === "now" ? "text-white/70" : "text-muted"}`}>0{i + 1}</span>
                {s.state === "done" && (
                  <span className="grid size-7 place-items-center rounded-full bg-white/10">
                    <Check className="size-4" />
                  </span>
                )}
                {s.state === "now" && (
                  <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-bg">
                    <span className="pulse-dot size-1.5 rounded-full bg-blue" /> Сейчас
                  </span>
                )}
                {s.state === "next" && (
                  <span className="rounded-full border border-violet/50 px-3 py-1 text-xs font-bold text-blue-bright">Скоро</span>
                )}
              </div>
              <h3 className="font-display mt-8 text-lg font-medium">{s.t}</h3>
              <p className={`mt-2 text-sm ${s.state === "now" ? "text-white/80" : "text-muted"}`}>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

const buyWays = [
  { icon: Coins, t: "Наличный расчёт", v: `${fmt(prices.cash)} ₽/м²`, d: "Стартовая цена, зависит от этажа" },
  { icon: Calendar, t: "Исламская рассрочка", v: `${fmt(prices.installment)} ₽/м²`, d: `До ${prices.months} месяцев, без процентов` },
  { icon: Wallet, t: "Первый взнос", v: `от ${fmt(prices.minDownPerM2)} ₽/м²`, d: "Или вовсе без взноса" },
  { icon: Family, t: "Материнский капитал", v: "Принимаем", d: "Можно направить на покупку" },
];

function BuyCard({ w, i }: { w: (typeof buyWays)[number]; i: number }) {
  const I = w.icon;
  return (
    <div data-reveal style={d(i * 80)} className="card flex h-full flex-col items-center justify-center p-5 text-center">
      <I className="size-6 text-blue-bright" />
      <p className="mt-3 font-semibold">{w.t}</p>
      <p className="font-display mt-1 text-xl font-medium">{w.v}</p>
      <p className="mt-1 text-xs text-muted">{w.d}</p>
    </div>
  );
}

/** Decorative "circuit" lines radiating from the central tile. */
function Circuit() {
  const lines: React.ReactNode[] = [];
  const sides = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];
  sides.forEach((s, si) => {
    for (let k = 0; k < 7; k++) {
      const off = -72 + k * 24;
      const len = 30 + ((k * 37 + si * 13) % 50);
      const bend = k % 2 ? 14 : -14;
      const x0 = 200 + (s.dx ? s.dx * 110 : off);
      const y0 = 200 + (s.dy ? s.dy * 110 : off);
      const x1 = x0 + s.dx * len;
      const y1 = y0 + s.dy * len;
      const x2 = x1 + (s.dx ? s.dx * 18 : bend);
      const y2 = y1 + (s.dy ? s.dy * 18 : bend);
      lines.push(
        <g key={`${si}-${k}`}>
          <path d={`M${x0} ${y0} L${x1} ${y1} L${x2} ${y2}`} fill="none" stroke="rgba(143,146,255,.55)" strokeWidth="1.2" />
          <circle cx={x2} cy={y2} r="2.2" fill="#b4b6ff" />
        </g>,
      );
    }
  });
  return (
    <svg viewBox="0 0 400 400" className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2" aria-hidden>
      {lines}
    </svg>
  );
}

function Prices() {
  const connectors = [
    "M250 105 H290",
    "M250 335 H290",
    "M540 105 H600 Q620 105 620 125 V200 Q620 220 640 220 H780",
    "M540 335 H600 Q620 335 620 315 V240 Q620 220 640 220 H780",
  ];

  return (
    <section id="prices" className="relative py-24 md:py-32">
      <div className="glow -left-40 top-20 size-[480px] bg-blue/20" />
      <div className="container-x relative">
        <SectionHead
          eyebrow="Цены и рассрочка"
          title={
            <>
              Удобные <span className="text-gradient">способы покупки</span>
            </>
          }
          text="Покупайте за наличные по стартовой цене или в исламскую рассрочку на 6 лет. Цена за м² зависит от этажа."
        />

        {/* Desktop: cards connected to the central tile */}
        <div className="relative hidden h-[440px] lg:block">
          <svg viewBox="0 0 1000 440" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            {connectors.map((p) => (
              <g key={p}>
                <path d={p} fill="none" stroke="rgba(124,127,255,.18)" strokeWidth="12" vectorEffect="non-scaling-stroke" />
                <path d={p} fill="none" stroke="rgba(160,163,255,.45)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path d={p} fill="none" stroke="#e6e7ff" strokeWidth="2" strokeLinecap="round" className="flow" vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </svg>
          {buyWays.map((w, i) => (
            <div
              key={w.t}
              className="absolute h-[170px] w-[25%]"
              style={{ left: i % 2 ? "29%" : "0%", top: i < 2 ? 20 : 250 }}
            >
              <BuyCard w={w} i={i} />
            </div>
          ))}
          <div className="absolute left-[78%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Circuit />
            <div className="glow inset-0 bg-blue/60" />
            <div data-reveal className="relative rounded-[44px] border border-violet/40 bg-white/[.04] p-3 shadow-[0_0_80px_-10px_rgba(124,127,255,.8)]">
              <div className="tile3d !size-[180px] !rounded-[34px] flex-col gap-2">
                <HomeIcon className="size-16" />
                <span className="font-display text-sm font-medium">Ваша квартира</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: simple grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {buyWays.map((w, i) => (
            <BuyCard key={w.t} w={w} i={i} />
          ))}
        </div>

        <div className="mt-20" data-reveal>
          <h3 className="font-display mb-6 text-center text-2xl font-medium md:text-3xl">Калькулятор платежа</h3>
          <Calculator />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function Location() {
  return (
    <section id="location" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="Расположение"
          title={
            <>
              Всё нужное — <span className="text-gradient">рядом с домом</span>
            </>
          }
          text="Тихий район Шелковской: школа, детский сад, мечеть и парк в нескольких минутах пешком."
        />
        <div className="grid gap-5 lg:grid-cols-[400px_1fr]">
          <div data-reveal className="card flex flex-col gap-6 p-7 md:p-8">
            <InfoRow icon={<Pin />} label="Адрес дома" value={company.objectAddress} />
            <InfoRow icon={<Family />} label="Инфраструктура" value="Школа, детский сад, мечеть, парк, детские и спортивные площадки во дворах" />
            <InfoRow icon={<Pin />} label="Офис продаж" value={company.officeAddress} />
            <InfoRow icon={<Clock />} label="Часы работы" value={`${company.hours}. ${company.daysOff}`} />
            <a
              href={`https://yandex.ru/maps/?text=${encodeURIComponent(company.objectAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-auto"
            >
              Построить маршрут <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div data-reveal style={d(100)} className="card min-h-[420px] p-2">
            <iframe
              src={mapSrc}
              title="ЖК «Новый Терек» на карте"
              loading="lazy"
              className="h-full min-h-[420px] w-full rounded-[22px] border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue/15 text-blue-bright ring-1 ring-violet/30">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-muted">{label}</p>
        <p className="mt-1 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function Faq() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHead center={false} eyebrow="Вопросы" title="Частые вопросы покупателей" />
          <a
            data-reveal
            href={waLink("Здравствуйте! У меня вопрос по ЖК «Новый Терек».")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost -mt-4"
          >
            <WhatsApp /> Задать свой вопрос
          </a>
        </div>
        <div className="space-y-3">
          {faq.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              style={d(i * 60)}
              className="card group !rounded-3xl transition open:border-violet/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 text-lg font-semibold">
                {f.q}
                <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full bg-white/10 transition duration-300">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="-mt-1 px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function Spotlight() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-4">
      <div className="spotlight -z-10" aria-hidden />
      <div className="container-x pt-10 text-center">
        <a
          data-reveal
          href={waLink("Здравствуйте! Хочу подобрать квартиру в ЖК «Новый Терек».")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary !h-[72px] !px-10 !text-lg md:!h-[84px] md:!px-14 md:!text-2xl"
        >
          <WhatsApp className="size-6 md:size-7" /> Написать в WhatsApp
        </a>
        <h2 data-reveal style={d(100)} className="font-display mx-auto mt-24 max-w-3xl text-[clamp(30px,4.6vw,54px)] font-medium leading-[1.1]">
          Выберите квартиру, <span className="text-gradient">пока цена не выросла</span>
        </h2>
        <p data-reveal style={d(200)} className="mx-auto mt-5 max-w-xl text-lg text-muted">
          С начала продаж метр подорожал на {fmt(prices.growth)} ₽. Напишите нам — подберём квартиру и этаж под ваш бюджет.
        </p>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="pb-24 md:pb-32">
      <div className="container-x">
        <div data-reveal className="card relative !rounded-[36px] p-6 md:p-14">
          <div className="glow -right-24 -top-24 size-96 bg-blue/40" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Отдел продаж</span>
              <h2 className="font-display mt-6 text-[clamp(30px,4.2vw,50px)] font-medium leading-[1.08]">
                Подберём квартиру <span className="text-gradient">под ваш бюджет</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-white/70">
                Расскажем о свободных квартирах, этажах и условиях рассрочки. Удобнее всего — в WhatsApp.
              </p>

              <div className="mt-10 space-y-3">
                <a href={company.phoneHref} className="flex items-center gap-4 rounded-2xl border border-line bg-white/[.04] p-4 transition hover:bg-white/[.08]">
                  <span className="tile3d !size-11 !rounded-xl">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-white/60">Телефон</span>
                    <span className="text-lg font-bold">{company.phone}</span>
                  </span>
                </a>
                <a
                  href={company.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-line bg-white/[.04] p-4 transition hover:bg-white/[.08]"
                >
                  <span className="tile3d tile3d-dark !size-11 !rounded-xl">
                    <AtSign className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-white/60">Instagram*</span>
                    <span className="text-lg font-bold">@{company.instagram}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-white/[.04] p-4">
                  <span className="tile3d tile3d-dark !size-11 !rounded-xl">
                    <Clock className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-white/60">Работаем</span>
                    <span className="font-bold">{company.hours}</span>
                    <span className="block text-sm text-white/60">{company.daysOff}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="card card-blue rounded-3xl p-6 md:p-8">
              <h3 className="font-display text-2xl font-medium">Оставить заявку</h3>
              <p className="mb-8 mt-2 text-sm text-white/70">Ответим в рабочее время в течение дня.</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function Footer() {
  const links = [
    ["О проекте", "#about"],
    ["Планировки", "#plans"],
    ["Цены", "#prices"],
    ["Галерея", "#gallery"],
    ["Расположение", "#location"],
    ["Контакты", "#contacts"],
  ];
  return (
    <footer className="border-t border-line py-12">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Logo />
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60" aria-label="Ссылки в подвале">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="hover:text-white">
                {l}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 grid gap-8 text-sm md:grid-cols-3">
          <div>
            <p className="font-semibold">Застройщик</p>
            <p className="mt-2 leading-relaxed text-muted">
              {company.fullLegal}
              <br />
              ИНН {company.inn} · ОГРН {company.ogrn}
              <br />
              Юр. адрес: {company.legalAddress}
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              Разрешение на строительство <span className="whitespace-nowrap">№ {permit.number}</span> от {permit.date}
            </p>
          </div>
          <div>
            <p className="font-semibold">Адрес дома</p>
            <p className="mt-2 leading-relaxed text-muted">{company.objectAddress}</p>
          </div>
          <div>
            <p className="font-semibold">Офис продаж</p>
            <p className="mt-2 leading-relaxed text-muted">{company.officeAddress}</p>
            <a href={company.phoneHref} className="mt-3 inline-flex items-center gap-2 font-bold hover:text-blue-bright">
              {company.phone} <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-white/40 md:flex-row">
          <p>© 2026 {company.legal}. Все права защищены.</p>
          <p>Информация на сайте носит справочный характер и не является публичной офертой.</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40">
          <a href={`${BASE}/privacy/`} className="underline hover:text-white">
            Политика обработки персональных данных
          </a>
          <a href={`${BASE}/consent/`} className="underline hover:text-white">
            Согласие на обработку персональных данных
          </a>
          <a href={`mailto:${company.email}`} className="hover:text-white">
            {company.email}
          </a>
        </div>
        <p className="mt-3 text-xs text-white/40">
          * Instagram принадлежит компании Meta, признанной экстремистской организацией и запрещённой в РФ.
        </p>
      </div>
    </footer>
  );
}
