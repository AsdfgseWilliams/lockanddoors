"use client";

import { useRef, useEffect, useState } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Resena {
  nombre: string;
  iniciales: string;
  fecha: string;
  texto: string;
  servicio: string;
  estrellas: number;
}

interface Props {
  /** Título de la sección (viene del CMS / diccionario) */
  titulo?: string;
  /** Subtítulo de la sección */
  subtitulo?: string;
  /** URL del perfil de Google Maps del negocio */
  googleMapsUrl?: string;
  /** Puntuación media */
  puntuacion?: number;
  /** Número total de reseñas */
  totalResenas?: number;
}

// ─── Datos de reseñas reales ───────────────────────────────────────────────────
// Extraídas del perfil de Google Business de Locks & Doors Castelldefels
const RESENAS: Resena[] = [
  {
    nombre: "Raquel Rojas Avira",
    iniciales: "RA",
    fecha: "Hace 2 semanas",
    texto:
      "Yo a fue porque me dejé las llaves en casa y no podía entrar. Llegaron en menos de 20 minutos, abrieron sin romper nada y el precio fue muy razonable. Muy profesionales y amables. Sin duda los llamaré si vuelvo a necesitarlo.",
    servicio: "Apertura urgente",
    estrellas: 5,
  },
  {
    nombre: "Carla Aguilera Flores",
    iniciales: "CF",
    fecha: "Hace 1 mes",
    texto:
      "Los llamé para instalar un bombín de alta seguridad en la puerta de casa. Me explicaron todo perfectamente, trajeron varias opciones y el trabajo quedó impecable. Muy recomendables, sin duda son los cerrajeros de confianza de Castelldefels.",
    servicio: "Instalación bombín",
    estrellas: 5,
  },
  {
    nombre: "Marc Vidal",
    iniciales: "MV",
    fecha: "Hace 3 semanas",
    texto:
      "Rapidísimos. Llamé a las 11 de la noche porque se me quedaron las llaves dentro y en menos de 25 minutos ya estaban aquí. Resolvieron el problema sin dañar la cerradura. Precio justo para una urgencia nocturna. 100% recomendados.",
    servicio: "Urgencia nocturna",
    estrellas: 5,
  },
  {
    nombre: "Sandra López",
    iniciales: "SL",
    fecha: "Hace 2 meses",
    texto:
      "Contraté el servicio de motorización de la persiana del local. Todo perfecto: puntualidad, calidad del material instalado y precio ajustado. Además dejaron todo recogido. Profesionalidad total.",
    servicio: "Motorización persiana",
    estrellas: 5,
  },
];

// ─── Subcomponentes ────────────────────────────────────────────────────────────

function Estrella({ llena }: { llena: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={llena ? "#FB8500" : "#E2E8F0"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 1.333l1.96 3.974 4.373.636-3.167 3.085.748 4.355L8 11.067l-3.914 2.316.748-4.355L1.667 5.943l4.373-.636L8 1.333z" />
    </svg>
  );
}

function Estrellas({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Estrella key={i} llena={i < n} />
      ))}
    </div>
  );
}

function Avatar({ iniciales, color }: { iniciales: string; color: string }) {
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {iniciales}
    </div>
  );
}

// Colores para los avatares — rotan por índice
const AVATAR_COLORS = ["#0A2463", "#366D9B", "#1D4ED8", "#0369A1"];

function TarjetaResena({
  resena,
  index,
  visible,
}: {
  resena: Resena;
  index: number;
  visible: boolean;
}) {
  return (
    <article
      className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col gap-4 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 80}ms`,
      }}
      aria-label={`Reseña de ${resena.nombre}`}
    >
      {/* Cabecera: avatar + nombre + fecha */}
      <div className="flex items-center gap-3">
        <Avatar
          iniciales={resena.iniciales}
          color={AVATAR_COLORS[index % AVATAR_COLORS.length]}
        />
        <div className="min-w-0">
          <p className="font-semibold text-text text-sm leading-tight truncate">
            {resena.nombre}
          </p>
          <p className="text-xs text-text-light mt-0.5">{resena.fecha}</p>
        </div>
        {/* Logo Google — derecha */}
        <div className="ml-auto shrink-0">
          <GoogleIcon />
        </div>
      </div>

      {/* Estrellas */}
      <Estrellas n={resena.estrellas} />

      {/* Texto */}
      <blockquote className="text-sm text-gray-700 leading-relaxed flex-1">
        &ldquo;{resena.texto}&rdquo;
      </blockquote>

      {/* Etiqueta de servicio */}
      <div className="mt-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-blue-50 px-3 py-1 rounded-full">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="5" stroke="#0A2463" strokeWidth="1.5" />
            <path
              d="M4 6l1.5 1.5L8 4"
              stroke="#0A2463"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {resena.servicio}
        </span>
      </div>
    </article>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.46 3.07 29.5 1 24 1 14.82 1 7.07 6.49 3.64 14.27l7.08 5.5C12.36 13.77 17.71 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.1 24.55c0-1.64-.15-3.22-.42-4.73H24v8.95h12.42c-.54 2.9-2.17 5.36-4.62 7.01l7.19 5.59C43.18 37.57 46.1 31.5 46.1 24.55z"
      />
      <path
        fill="#FBBC05"
        d="M10.72 28.57A14.56 14.56 0 0 1 9.5 24c0-1.6.27-3.14.72-4.57l-7.08-5.5A23.9 23.9 0 0 0 .1 24c0 3.88.93 7.55 2.56 10.79l8.06-6.22z"
      />
      <path
        fill="#34A853"
        d="M24 47c5.5 0 10.12-1.82 13.49-4.94l-7.19-5.59c-1.99 1.33-4.54 2.13-6.3 2.13-6.29 0-11.64-4.27-13.28-9.97l-8.06 6.22C7.07 41.51 14.82 47 24 47z"
      />
    </svg>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────

export default function TestimonialsSection({
  titulo = "Lo que dicen nuestros clientes",
  subtitulo = "La satisfacción de nuestros clientes es nuestra mejor carta de presentación. Lee las experiencias reales de quienes nos han confiado su seguridad.",
  googleMapsUrl = "https://www.google.com/maps/place/Locks+%26+Doors+Cerrajeros+24H/@41.2791699,1.9757467,17z",
  puntuacion = 5.0,
  totalResenas = 20,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      aria-labelledby="testimonios-titulo"
      className="bg-surface py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Etiqueta de sección */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-light uppercase tracking-widest bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 1l1.6 3.24L12 4.77l-2.5 2.43.59 3.43L7 9.01 4.91 10.63l.59-3.43L3 4.77l3.4-.53L7 1z"
                fill="#FB8500"
              />
            </svg>
            Testimonios
          </span>
        </div>

        {/* Encabezado */}
        <div
          className="text-center mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2
            id="testimonios-titulo"
            className="text-h2 font-bold text-primary mb-4"
          >
            {titulo}
          </h2>
          <p className="text-text-light text-base max-w-2xl mx-auto leading-relaxed">
            {subtitulo}
          </p>
        </div>

        {/* Badge de Google — resumen de puntuación */}
        <div
          className="flex justify-center mb-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "100ms",
          }}
        >
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow duration-200 group"
            aria-label={`Ver todas las reseñas en Google. Puntuación: ${puntuacion} de 5`}
          >
            <GoogleIcon />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-text">
                  {puntuacion.toFixed(1)}
                </span>
                <Estrellas n={Math.round(puntuacion)} />
              </div>
              <span className="text-xs text-text-light">
                {totalResenas}+ reseñas en Google
              </span>
            </div>
            <span className="ml-2 text-xs font-semibold text-primary group-hover:text-secondary transition-colors duration-200">
              Ver todas →
            </span>
          </a>
        </div>

        {/* Grid de reseñas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESENAS.map((resena, i) => (
            <TarjetaResena
              key={resena.nombre}
              resena={resena}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* CTA final */}
        <div
          className="flex justify-center mt-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "400ms",
          }}
        >
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-light hover:text-primary transition-colors duration-200 underline underline-offset-4"
          >
            <GoogleIcon />
            Ver más reseñas en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}