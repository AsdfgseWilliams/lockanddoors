"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../shared/cta/Button";
import type { Locale } from "@/lib/types/i18n";
import { localePath } from "@/lib/types/i18n";

interface Contacto {
  telefono?: string;
  email?: string;
}

interface MenuItem {
  id: string;
  label: string;
  url: string;
}

interface HeaderProps {
  contacto: Contacto;
  menuItems: MenuItem[];
  lang: Locale;
}

export default function Header({ contacto, menuItems, lang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        <Link href={localePath(lang, '/')} className="text-2xl font-extrabold tracking-wide">
          Lock & Doors
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="hover:text-secondary font-medium transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contacto desktop */}
        {contacto.telefono && (
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {lang === 'es' ? 'Llámanos ahora' : 'Call us now'}
              </div>
              <div className="text-lg font-semibold">{contacto.telefono}</div>
            </div>
            <Button variant="primary">
              <a href={`tel:${contacto.telefono}`} className="inline-flex items-center gap-2">
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
                {lang === 'es' ? 'Llamar' : 'Call'}
              </a>
            </Button>
          </div>
        )}

        {/* Selector de idioma */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium">
          <Link
            href="/"
            className={lang === 'es' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'}
          >
            ES
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="/en"
            className={lang === 'en' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'}
          >
            EN
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú móvil"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden bg-surface shadow-lg transition-max-height duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="hover:text-secondary font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {contacto.telefono && (
            <Button variant="primary" className="w-full text-center">
              <a href={`tel:${contacto.telefono}`}>
                📞 {lang === 'es' ? 'Llamar' : 'Call'}
              </a>
            </Button>
          )}
          {contacto.email && (
            <a href={`mailto:${contacto.email}`} className="hover:text-secondary font-medium">
              ✉️ {contacto.email}
            </a>
          )}

          {/* Selector idioma mobile */}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Link href="/" className={lang === 'es' ? 'font-bold' : 'text-muted-foreground'}>
              ES
            </Link>
            <Link href="/en" className={lang === 'en' ? 'font-bold' : 'text-muted-foreground'}>
              EN
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}