// app/components/servicios/ServicioCard.tsx
// Card individual de servicio — se usa en ServicioGrid (home + listado + ubicaciones)

import Link from "next/link";
import type { Servicio } from "@/lib/types/servicio";

interface ServicioCardProps {
  servicio: Servicio;
  lang: string;
}

export default function ServicioCard({ servicio, lang }: ServicioCardProps) {
  const { slug, titulo, icono, descripcionCorta, urgente } = servicio;

    const newLocal = "absolute right-4 top-4 rounded-[5px] bg-red-500 px-2 py-0.75 text-[0.6rem] font-bold uppercase tracking-widest text-white";
  return (
    <Link
      href={`/${lang}/servicios/${slug}`}
      className="servicio-card group relative flex flex-col gap-3 rounded-[14px] border border-[#e8ecf2] bg-white p-8 no-underline transition-all duration-200 hover:-translate-y-0.75 hover:border-secondary hover:shadow-[0_8px_32px_rgba(10,36,99,0.09)] focus-visible:outline focus-visible:outline-secondary focus-visible:outline-offset-2"
      aria-label={`Ver servicio: ${titulo}`}
    >
      {/* Accent bar top — visible on hover via group */}
      <span
        className="pointer-events-none absolute inset-x-5 top-[-1.5px] h-0.75 rounded-b-[3px] bg-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Badge urgente */}
      {urgente && (
        <span className={newLocal}>
          24h
        </span>
      )}

      {/* Icono */}
      <div
        className="mb-1 flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-[#fde68a] bg-[#fffbeb] text-[1.55rem] leading-none transition-transform duration-200 group-hover:rotate-[-4deg] group-hover:scale-110 group-hover:bg-[#fef3c7]"
        aria-hidden="true"
      >
        {icono}
      </div>

      {/* Texto */}
      <h3 className="text-h6 font-bold text-primary leading-snug">
        {titulo}
      </h3>

      <p className="flex-1 text-sm leading-relaxed text-text-light">
        {descripcionCorta}
      </p>

      {/* CTA inline */}
      <span className="mt-1 inline-flex items-center gap-[0.35rem] text-[0.8rem] font-semibold text-primary transition-all duration-200 group-hover:gap-[0.6rem] group-hover:text-secondary">
        Más información
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path
            d="M1 7h12M8 2l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}