// lib/transformers/servicio.transformer.ts
// Normaliza datos crudos de GraphQL al tipo Servicio usado en los componentes

import type { Servicio, ServicioRaw } from "@/lib/types/servicio";

// Mapa de iconos por slug — se amplía según se creen los posts en WP
const ICONOS: Record<string, string> = {
  "apertura-de-puertas-urgentes-24h":          "🚨",
  "instalacion-de-nuevas-cerraduras":           "🔐",
  "reparaciones-de-cerraduras":                 "🔧",
  "instalacion-de-bombines-de-alta-seguridad":  "🛡️",
  "servicio-de-cerrajeria-a-comunidades":       "🏢",
  "motorizacion-de-persianas":                  "⚙️",
  "lanzamientos-judiciales":                    "⚖️",
  "instalacion-de-rejas":                       "🪟",
  "apertura-y-reparacion-de-cajas-fuertes":     "🔒",
  "sistemas-de-alarma-sin-cuotas":              "🔔",
  "instalacion-de-cerraduras-inteligentes":     "📱",
};

const URGENTES = new Set(["apertura-de-puertas-urgentes-24h"]);

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