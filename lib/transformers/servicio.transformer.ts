// lib/transformers/servicio.transformer.ts
// Normaliza datos crudos de GraphQL al tipo Servicio usado en los componentes

import type { Servicio, ServicioRaw } from "@/lib/types/servicio";

// Mapa de iconos por slug — se amplía según se creen los posts en WP
const ICONOS: Record<string, string> = {
  "apertura-puertas-urgentes":  "🚨",
  "instalacion-cerraduras":     "🔐",
  "reparacion-cerraduras":      "🔧",
  "bombines-alta-seguridad":    "🛡️",
  "cerrajeria-comunidades":     "🏢",
  "motorizacion-persianas":     "⚙️",
  "lanzamientos-judiciales":    "⚖️",
  "instalacion-rejas":          "🪟",
  "cajas-fuertes":              "🔒",
  "sistemas-alarma":            "🔔",
  "cerraduras-inteligentes":    "📱",
};

// Slugs que muestran el badge 24h
const URGENTES = new Set(["apertura-puertas-urgentes"]);

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

export function transformServicio(raw: ServicioRaw): Servicio {
  return {
    slug:             raw.slug,
    titulo:           raw.title,
    icono:            ICONOS[raw.slug] ?? "🔑",
    descripcionCorta: raw.excerpt ? stripHtml(raw.excerpt) : "",
    urgente:          URGENTES.has(raw.slug),
  };
}

export function transformServiciosDestacados(nodes: ServicioRaw[]): Servicio[] {
  return nodes.map(transformServicio);
}

export function transformServiciosLista(nodes: ServicioRaw[]): Servicio[] {
  return nodes.map(transformServicio);
}