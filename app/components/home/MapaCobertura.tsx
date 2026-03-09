'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ZONAS = [
  { nombre: 'Castelldefels', lat: 41.2791, lng: 1.9757, zona: 'principal', color: '#FB8500', radio: 14 },
  { nombre: 'Les Botigues de Sitges', lat: 41.2558, lng: 1.9200, zona: 'principal', color: '#FB8500', radio: 10 },
  { nombre: 'Sitges', lat: 41.2369, lng: 1.8154, zona: 'garraf', color: '#366D9B', radio: 9 },
  { nombre: 'Sant Pere de Ribes', lat: 41.2467, lng: 1.7739, zona: 'garraf', color: '#366D9B', radio: 9 },
  { nombre: 'Vilanova i la Geltrú', lat: 41.2231, lng: 1.7258, zona: 'garraf', color: '#366D9B', radio: 9 },
  { nombre: 'Cubelles', lat: 41.1945, lng: 1.6726, zona: 'garraf', color: '#366D9B', radio: 9 },
  { nombre: 'Begues', lat: 41.3333, lng: 1.9167, zona: 'baix', color: '#0A2463', radio: 8 },
  { nombre: 'Gavà', lat: 41.3043, lng: 2.0032, zona: 'baix', color: '#0A2463', radio: 8 },
  { nombre: 'Viladecans', lat: 41.3167, lng: 2.0167, zona: 'baix', color: '#0A2463', radio: 8 },
  { nombre: 'Sant Climent de Llobregat', lat: 41.3450, lng: 2.0000, zona: 'baix', color: '#0A2463', radio: 8 },
  { nombre: 'Sant Boi de Llobregat', lat: 41.3453, lng: 2.0368, zona: 'baix', color: '#0A2463', radio: 8 },
  { nombre: 'El Prat de Llobregat', lat: 41.3264, lng: 2.0964, zona: 'baix', color: '#0A2463', radio: 8 },
];

export default function MapaCobertura() {
  // Guardia: Leaflet accede a window y falla en SSR/Strict Mode si no esperamos al mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-105 rounded-xl bg-[#F0F4F8] animate-pulse flex items-center justify-center">
        <span className="text-text-light text-sm">Cargando mapa...</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={[41.27, 1.88]}
      zoom={10}
      scrollWheelZoom={false}
      className="w-full h-full rounded-xl"
      style={{ minHeight: '420px', zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {ZONAS.map((zona) => (
        <CircleMarker
          key={zona.nombre}
          center={[zona.lat, zona.lng]}
          radius={zona.radio}
          pathOptions={{
            color: zona.color,
            fillColor: zona.color,
            fillOpacity: zona.zona === 'principal' ? 0.9 : 0.7,
            weight: zona.zona === 'principal' ? 3 : 2,
          }}
        >
          <Tooltip
            permanent={zona.zona === 'principal'}
            direction="top"
            offset={[0, -10]}
          >
            <span className="text-xs font-semibold">{zona.nombre}</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}