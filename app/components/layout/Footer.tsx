// app/components/layout/Footer.tsx
import Link from "next/link";
import type { Locale } from "@/lib/types/i18n";
import { localePath } from "@/lib/types/i18n";

interface FooterProps {
  lang: Locale;
}

const navLinks = {
  es: [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/ubicaciones', label: 'Ubicaciones' },
    { href: '/contacto', label: 'Contacto' },
  ],
  en: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/locations', label: 'Locations' },
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer({ lang }: FooterProps) {
  const links = navLinks[lang] ?? navLinks['es']

  return (
    <footer className="bg-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="font-bold text-xl">Lock & Doors</div>

        <nav className="flex flex-col sm:flex-row gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={localePath(lang, link.href)}
              className="hover:text-secondary transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm">
          © {new Date().getFullYear()} Lock & Doors.{' '}
          {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}