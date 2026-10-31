import type { Metadata, Viewport } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { BASE } from "@/lib/data";
import { CookieBanner } from "@/components/cookie-banner";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ЖК «Новый Терек» — квартиры в Шелковской от застройщика СК «Терек»",
  description:
    "Квартиры от застройщика в ЖК «Новый Терек», г. Шелковская. Сдача IV квартал 2026. От 50 000 ₽/м², исламская рассрочка на 72 месяца, материнский капитал.",
  openGraph: {
    title: "ЖК «Новый Терек» — квартиры от застройщика",
    description: "Сдача IV квартал 2026. От 50 000 ₽/м². Исламская рассрочка на 72 месяца.",
    images: [`${BASE}/images/aerial-front.webp`],
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
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
