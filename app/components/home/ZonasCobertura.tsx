'use client';

import dynamic from 'next/dynamic';
import { BotonesData, OpcionesData, ZonaNode } from '@/lib/types/wordpress';
import { resolveBotonUrl, resolveBotonTexto } from '@/lib/utils/whatsapp';


const MapaCobertura = dynamic(() => import('./MapaCobertura'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-105 rounded-xl bg-slate-100 animate-pulse flex items-center justify-center">
      <span className="text-text-light text-sm">Cargando mapa...</span>
    </div>
  ),
});

// Colores por zona (estáticos — decisión visual, no del CMS)
const ZONA_COLORS: Record<string, { color: string; label: string }> = {
  castelldefels:               { color: '#FB8500', label: 'Zona Principal' },
  'les-botigues-de-sitges':    { color: '#FB8500', label: 'Zona Principal' },
  sitges:                      { color: '#366D9B', label: 'Zona Garraf' },
  'sant-pere-de-ribes':        { color: '#366D9B', label: 'Zona Garraf' },
  'vilanova-i-la-geltru':      { color: '#366D9B', label: 'Zona Garraf' },
  cubelles:                    { color: '#366D9B', label: 'Zona Garraf' },
  begues:                      { color: '#0A2463', label: 'Zona Baix Llobregat' },
  gava:                        { color: '#0A2463', label: 'Zona Baix Llobregat' },
  viladecans:                  { color: '#0A2463', label: 'Zona Baix Llobregat' },
  'sant-climent-de-llobregat': { color: '#0A2463', label: 'Zona Baix Llobregat' },
  'sant-boi-de-llobregat':     { color: '#0A2463', label: 'Zona Baix Llobregat' },
  'el-prat-de-llobregat':      { color: '#0A2463', label: 'Zona Baix Llobregat' },
};

interface ZonasCoberturaProps {
  titulo?: string;
  subtitulo?: string;
  ctaTitulo?: string;
  ctaSubtitulo?: string;
  zonas?: { nodes: ZonaNode[] };
  botones?: BotonesData;
  opciones?: OpcionesData;
}

export default function ZonasCobertura({ titulo, subtitulo, ctaTitulo, ctaSubtitulo, zonas, botones, opciones }: ZonasCoberturaProps) {
  const nodos: ZonaNode[] = zonas?.nodes ?? [];

  // Agrupar municipios por zona visual
  const gruposMap = new Map<string, { color: string; label: string; municipios: string[] }>();
  for (const nodo of nodos) {
    const meta = ZONA_COLORS[nodo.slug] ?? { color: '#0A2463', label: 'Otras zonas' };
    const key = meta.label;
    if (!gruposMap.has(key)) {
      gruposMap.set(key, { ...meta, municipios: [] });
    }
    gruposMap.get(key)!.municipios.push(nodo.title);
  }
  const grupos = Array.from(gruposMap.values());

  const tipo1 = botones ? (Array.isArray(botones.boton_1) ? botones.boton_1[0] : botones.boton_1) : null;
  const tipo2 = botones ? (Array.isArray(botones.boton2) ? botones.boton2[0] : botones.boton2) : null;

  const url1 = tipo1 && opciones ? resolveBotonUrl(tipo1, opciones, botones?.enlaceBoton1) : null;
  const txt1 = tipo1 ? resolveBotonTexto(tipo1, botones?.textoBoton1) : '';
  const url2 = tipo2 && opciones ? resolveBotonUrl(tipo2, opciones, botones?.enlaceBoton2) : null;
  const txt2 = tipo2 ? resolveBotonTexto(tipo2, botones?.textoBoton2) : '';

  return (
    <section
      id="zonas-cobertura"
      aria-labelledby="zonas-titulo"
      className="py-16 md:py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-secondary mb-3">
            Zonas de cobertura
          </span>
          <h2 id="zonas-titulo" className="text-h2 font-bold text-primary mb-4">
            {titulo ?? 'Dónde Trabajamos'}
          </h2>
          <p className="text-text-light text-base max-w-xl mx-auto">
            {subtitulo ?? 'Ofrecemos servicio de cerrajería en Castelldefels y alrededores.'}
          </p>
        </div>

        {/* Grid: mapa + leyenda */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div
            className="lg:col-span-2 h-full rounded-xl overflow-hidden shadow-md border border-slate-200"
            style={{ minHeight: '420px' }}
          >
            <MapaCobertura />
          </div>

          <div className="flex flex-col gap-6">
            {grupos.map((grupo) => (
              <div key={grupo.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-block w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: grupo.color }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold uppercase tracking-wide" style={{ color: grupo.color }}>
                    {grupo.label}
                  </span>
                </div>
                <ul className="space-y-1">
                  {grupo.municipios.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-text">
                      <svg className="w-3.5 h-3.5 shrink-0" style={{ color: grupo.color }} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-primary rounded-2xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="text-white text-lg font-bold mb-1">{ctaTitulo ?? '¿Estás en nuestra zona?'}</p>
            <p className="text-blue-300 text-sm">{ctaSubtitulo ?? 'Solicita presupuesto sin compromiso. Respondemos en minutos.'}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {url1 && (
              <a
                href={url1}
                target={botones?.boton_1 === 'Whatsapp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                {txt1}
              </a>
            )}
            {url2 && (
              <a
                href={url2}
                target={botones?.boton2 === 'Whatsapp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-white/80 text-primary font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                {txt2}
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}