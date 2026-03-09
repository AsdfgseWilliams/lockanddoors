// app/components/home/ServiciosDestacados.tsx
// Sección "Servicios Destacados" de la home
// Orquesta: header de sección + ServicioGrid + CTA al listado completo
// Server Component — la animación de reveal la gestiona useScrollReveal del hook existente

import Link from "next/link";
import ServicioGrid from "@/app/components/servicios/ServicioGrid";
import type { Servicio } from "@/lib/types/servicio";

interface ServiciosDestacadosProps {
  lang: string;
  servicios: Servicio[];
  titulo: string;
  subtitulo: string;
  ctaTexto?: string;
}

export default function ServiciosDestacados({
  lang,
  servicios,
  titulo,
  subtitulo,
  ctaTexto,
}: ServiciosDestacadosProps) {
  const items = servicios;

  if (!items.length) return null; 
  return (
    <section
      className="bg-white py-16 md:py-24"
      aria-labelledby="sd-titulo"
    >
      <div className="mx-auto max-w-270 px-5 md:px-8">

        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-secondary before:block before:h-px before:w-7 before:bg-secondary before:opacity-50 after:block after:h-px after:w-7 after:bg-secondary after:opacity-50">
            Nuestros servicios
          </span>
          <h2
            id="sd-titulo"
            className="text-h2 font-extrabold tracking-tight text-primary"
          >
            {titulo}
          </h2>
          <p className="mx-auto mt-3 max-w-135 text-base leading-relaxed text-text-light">
            {subtitulo}
          </p>
        </div>

        {/* ── Grid ── */}
        <ServicioGrid servicios={items} lang={lang} cols={3} />

        {/* ── Footer CTA ── */}
        <div className="mt-11 flex justify-center">
          <Link
            href={`/${lang}/servicios`}
            className="inline-flex items-center gap-[0.65rem] rounded-lg border-2 border-primary px-8 py-[0.8em] text-[0.9rem] font-bold text-primary no-underline transition-all duration-200 hover:bg-primary hover:text-white hover:gap-4 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-3"
          >
            {ctaTexto}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M2 7.5h11M9 3l4.5 4.5L9 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}