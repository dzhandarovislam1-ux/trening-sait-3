import type { Metadata, Viewport } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { BASE } from "@/lib/data";
import { CookieBanner } from "@/components/cookie-banner";
import { JsonLd } from "@/components/json-ld";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://novyterek.ru"),
  title: "ЖК «Новый Терек» — купить квартиру в Шелковской от застройщика СК «Терек»",
  description:
    "Квартиры в г. Шелковская от застройщика ЖК «Новый Терек». 1-, 2-, 3-комнатные квартиры в кирпичном доме. Сдача — IV квартал 2026 г. От 50 000 ₽/м², исламская рассрочка на 72 месяца, материнский капитал.",
  keywords: [
    "квартиры в Шелковской",
    "купить квартиру в Шелковской",
    "квартиры Шелковская",
    "новостройки Шелковская",
    "ЖК Новый Терек",
    "Новый Терек Шелковская",
    "СК Терек",
    "квартиры от застройщика Шелковская",
    "исламская рассрочка Шелковская",
    "купить квартиру от застройщика Чечня",
  ],
  // iOS Safari/Yandex auto-link phone numbers, which breaks hydration and wipes <html> classes.
  formatDetection: { telephone: false, email: false, address: false, date: false },
  verification: {
    yandex: "90dbee2d22e9c702",
  },
  openGraph: {
    title: "ЖК «Новый Терек» — купить квартиру в Шелковской от застройщика",
    description: "Сдача IV квартал 2026. От 50 000 ₽/м². Исламская рассрочка на 72 месяца. Кирпичный дом у школы и парка.",
    images: [{ url: `${BASE}/images/og.jpg`, width: 1200, height: 630, alt: "ЖК «Новый Терек» — вид на квартал с высоты" }],
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#030309",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} antialiased`}
    >
      <head>
        {/* Hide reveal-on-scroll blocks only when JS is running */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');if('scrollRestoration' in history)history.scrollRestoration='manual'",
          }}
        />
      </head>
      <body>
        <JsonLd />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
