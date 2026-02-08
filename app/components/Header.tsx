// @components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";

interface Contacto {
  telefono?: string;
  email?: string;
}

interface HeaderProps {
  contacto: Contacto;
}

export default function Header({ contacto }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold text-primary">Lock & Doors</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-primary hover:text-secondary font-medium">Inicio</Link>
          <Link href="/servicios" className="text-primary hover:text-secondary font-medium">Servicios</Link>
          <Link href="/ubicaciones" className="text-primary hover:text-secondary font-medium">Ubicaciones</Link>
          <Link href="/contacto" className="text-primary hover:text-secondary font-medium">Contacto</Link>
        </nav>

        {/* Contacto desktop */}
        {contacto.telefono && (
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Llámanos ahora</div>
              <div className="text-lg font-semibold text-primary">{contacto.telefono}</div>
            </div>
            <Button variant="primary">
              <a
              href={`tel:${contacto.telefono}`}
              className="inline-flex items-center gap-2 bg-primary text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Llamar
            </a>
            </Button>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "Cerrar" : "Menu"}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="flex flex-col px-6 py-4 space-y-3">
            <Link href="/" className="text-primary hover:text-secondary font-medium" onClick={() => setMobileOpen(false)}>Inicio</Link>
            <Link href="/servicios" className="text-primary hover:text-secondary font-medium" onClick={() => setMobileOpen(false)}>Servicios</Link>
            <Link href="/ubicaciones" className="text-primary hover:text-secondary font-medium" onClick={() => setMobileOpen(false)}>Ubicaciones</Link>
            <Link href="/contacto" className="text-primary hover:text-secondary font-medium" onClick={() => setMobileOpen(false)}>Contacto</Link>

            {contacto.telefono && (
              <Button variant="primary">
                <a href={`tel:${contacto.telefono}`}>
                  📞 Llamar
                </a>
              </Button>
            )}
            {contacto.email && (
              <a href={`mailto:${contacto.email}`} className="text-primary hover:text-secondary font-medium">
                ✉️ {contacto.email}
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
