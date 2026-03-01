// app/components/servicios/ServicioGrid.tsx
// Grid de cards de servicio — reutilizable en home, /servicios y /ubicaciones/[slug]
// Es un Server Component: no necesita "use client"

import ServicioCard from "./ServicioCard";
import type { Servicio } from "@/lib/types/servicio";

interface ServicioGridProps {
  servicios: Servicio[];
  lang: string;
  // Permite forzar 2 columnas en contextos secundarios (ej: página de ubicación)
  cols?: 2 | 3;
}

export default function ServicioGrid({
  servicios,
  lang,
  cols = 3,
}: ServicioGridProps) {
  if (!servicios.length) return null;

  const gridClass =
    cols === 2
      ? "grid grid-cols-1 gap-5 sm:grid-cols-2"
      : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={gridClass} role="list">
      {servicios.map((servicio) => (
        <li key={servicio.slug}>
          <ServicioCard servicio={servicio} lang={lang} />
        </li>
      ))}
    </ul>
  );
}