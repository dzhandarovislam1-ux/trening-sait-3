import Link from "next/link";
import { company, legalUpdated } from "@/lib/data";
import { ArrowRight } from "./icons";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="container-x max-w-3xl py-10 md:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white">
        <ArrowRight className="size-4 rotate-180" /> На главную
      </Link>
      <h1 className="font-display mt-8 text-3xl font-medium leading-tight md:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">Редакция от {legalUpdated}</p>
      <div className="legal mt-10 space-y-8 text-[15px] leading-relaxed text-white/80">{children}</div>
      <p className="mt-14 border-t border-line pt-6 text-xs text-white/40">
        © 2026 {company.legal}. ИНН {company.inn}, ОГРН {company.ogrn}.
      </p>
    </main>
  );
}

export function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-medium text-white">
        {n}. {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function Operator() {
  return (
    <ul className="list-disc space-y-1 pl-5">
      <li>{company.fullLegal} ({company.legal})</li>
      <li>ИНН {company.inn}, ОГРН {company.ogrn}</li>
      <li>Юридический адрес: {company.legalAddress}</li>
      <li>
        Email:{" "}
        <a href={`mailto:${company.email}`} className="text-blue-bright underline">
          {company.email}
        </a>
      </li>
      <li>Телефон: {company.phone}</li>
    </ul>
  );
}
