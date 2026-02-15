// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Logo / Nombre */}
        <div className="font-bold text-xl">
          Lock & Doors
        </div>

        {/* Enlaces */}
        <nav className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="hover:text-secondary transition">
            Inicio
          </Link>
          <Link href="/servicios" className="hover:text-secondary transition">
            Servicios
          </Link>
          <Link href="/ubicaciones" className="hover:text-secondary transition">
            Ubicaciones
          </Link>
          <Link href="/contacto" className="hover:text-secondary transition">
            Contacto
          </Link>
        </nav>

        {/* Derechos */}
        <div className="text-sm">
          © {new Date().getFullYear()} Lock & Doors. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
