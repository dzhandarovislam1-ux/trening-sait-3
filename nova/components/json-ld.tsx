import { company, faq } from "@/lib/data";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ApartmentComplex",
        "@id": "https://novyterek.ru/#complex",
        "name": "ЖК «Новый Терек»",
        "alternateName": [
          "Жилой комплекс «Новый Терек»",
          "ЖК Новый Терек Шелковская",
          "Квартиры в Шелковской",
          "СК Терек",
        ],
        "description":
          "Купить квартиру в г. Шелковская от застройщика СК «Терек». 1-, 2-, 3-комнатные квартиры от 44 до 72 м², кирпичный дом на 7 и 9 этажей, сдача — IV квартал 2026. Стартовая цена от 50 000 ₽/м², беспроцентная исламская рассрочка на 72 месяца, материнский капитал.",
        "url": "https://novyterek.ru/",
        "telephone": company.phone,
        "priceRange": "от 50 000 ₽ за м²",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Шаповалова, д. 15 Б",
          "addressLocality": "г. Шелковская",
          "addressRegion": "Чеченская Республика",
          "postalCode": "366100",
          "addressCountry": "RU",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.507866,
          "longitude": 46.324359,
        },
        "image": [
          "https://novyterek.ru/images/og.jpg",
          "https://novyterek.ru/images/aerial-front.webp",
          "https://novyterek.ru/images/aerial-top.webp",
          "https://novyterek.ru/images/facade-2.webp",
        ],
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Школа рядом", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Детский сад рядом", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Мечеть рядом", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Парк рядом", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Черновая отделка с перегородками", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Окна ПВХ и железная дверь", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Исламская рассрочка до 72 месяцев", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Материнский капитал", "value": true },
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": "https://novyterek.ru/#organization",
        "name": company.name,
        "legalName": company.fullLegal,
        "url": "https://novyterek.ru/",
        "logo": "https://novyterek.ru/icon.svg",
        "telephone": company.phone,
        "email": company.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Грейдерная, д. 20, корп. 2, помещ. 1",
          "addressLocality": "г. Шелковская",
          "addressRegion": "Чеченская Республика",
          "postalCode": "366108",
          "addressCountry": "RU",
        },
        "openingHours": "Mo-Fr 09:00-18:00",
      },
      {
        "@type": "FAQPage",
        "@id": "https://novyterek.ru/#faq",
        "mainEntity": faq.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

