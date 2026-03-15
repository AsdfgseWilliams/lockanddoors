// app/components/home/PorQueElegirnos.tsx
// Sección "Por qué elegirnos" de la home
// Renderiza título, subtítulo, grid de hasta 6 ventajas (icono + título + texto) y botones de CTA
// Server Component — misma convención que ServiciosDestacados y UrgenciasSection
import Link from "next/link";
import type { VentajaItem } from "@/lib/types/wordpress";
import NextImage from "next/image";

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface BotonResuelto {
  href: string;
  label: string;
}

interface PorQueElegirnosProps {
  titulo: string;
  subtitulo: string;
  ventajas: VentajaItem[];
  boton1?: BotonResuelto | null;
  boton2?: BotonResuelto | null;
}

// ── Icono ─────────────────────────────────────────────────────────────────────
// src es el sourceUrl del MediaItem subido en ACF
// Los SVGs deben subirse con el color #0A2463 ya aplicado (no heredan currentColor via <img>)

function Icono({ src }: { src: string }) {
  if (!src) return null;
  return (
    <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-xl bg-primary/8">
      <NextImage
        src={src}
        alt=""
        width={24}
        height={24}
        className="h-6 w-6"
        aria-hidden="true"
        unoptimized
      />
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function PorQueElegirnos({
  titulo,
  subtitulo,
  ventajas,
  boton1,
  boton2,
}: PorQueElegirnosProps) {
  if (!ventajas?.length) return null;

  const cols =
    ventajas.length === 2 || ventajas.length === 4
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  return (
    <section
      className="bg-surface py-16 md:py-24"
      aria-labelledby="pqe-titulo"
    >
      <div className="mx-auto max-w-270 px-5 md:px-8">

        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-secondary before:block before:h-px before:w-7 before:bg-secondary before:opacity-50 after:block after:h-px after:w-7 after:bg-secondary after:opacity-50">
            Por qué elegirnos
          </span>
          <h2
            id="pqe-titulo"
            className="text-h2 font-extrabold tracking-tight text-primary"
          >
            {titulo}
          </h2>
          <p className="mx-auto mt-3 max-w-135 text-base leading-relaxed text-text-light">
            {subtitulo}
          </p>
        </div>

        {/* ── Grid de ventajas ── */}
        <ul className={`grid grid-cols-1 gap-6 ${cols} list-none p-0`} role="list">
          {ventajas.map((v, i) => (
            <li
              key={i}
              className="rounded-2xl border border-primary/10 bg-white p-7 transition-shadow duration-200 hover:shadow-md"
            >
              <Icono src={v.icono} />
              <h3 className="mb-2 text-[1.05rem] font-bold leading-snug text-primary">
                {v.titulo}
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-text-light">
                {v.texto}
              </p>
            </li>
          ))}
        </ul>

        {/* ── Botones CTA ── */}
        {(boton1 || boton2) && (
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            {boton1 && (
              <Link
                href={boton1.href}
                className="inline-flex items-center gap-[0.65rem] rounded-lg bg-secondary px-8 py-[0.8em] text-[0.9rem] font-bold text-white no-underline transition-all duration-200 hover:bg-secondary/90 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-3"
              >
                {boton1.label}
              </Link>
            )}
            {boton2 && (
              <Link
                href={boton2.href}
                className="inline-flex items-center gap-[0.65rem] rounded-lg border-2 border-primary px-8 py-[0.8em] text-[0.9rem] font-bold text-primary no-underline transition-all duration-200 hover:bg-primary hover:text-white hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-3"
              >
                {boton2.label}
              </Link>
            )}
          </div>
        )}

      </div>
    </section>
  );
}