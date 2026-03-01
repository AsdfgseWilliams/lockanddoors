// lib/types/servicio.ts
// Tipos del dominio Servicio — usados en componentes, transformers y services

// ── Tipo base para componentes UI ─────────────────────────────────────────────
export interface Servicio {
  slug: string;
  titulo: string;
  icono: string;
  descripcionCorta: string;
  urgente?: boolean;
}

// ── Tipo raw que llega de GraphQL (CPT servicio) ───────────────────────────────
export interface ServicioRaw {
  slug: string;
  title: string;
  excerpt?: string;
}