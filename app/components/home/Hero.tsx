import Image from "next/image";
import type { Locale } from "@/lib/types/i18n";

interface MediaItem { node: { sourceUrl: string; altText: string } }

interface BotonResuelto {
  href: string;
  label: string;
}

interface HeroProps {
  hero?: {
    titulo: string
    subtitulo: string
    fondo: MediaItem
  }
  boton1?: BotonResuelto | null
  boton2?: BotonResuelto | null
  lang: Locale
}

export default function Hero({ hero, boton1, boton2 }: HeroProps) {
  if (!hero) return null

  return (
    <section className="-mt-16 relative h-screen flex items-center justify-center">
      {hero.fondo?.node && (
        <Image
          src={hero.fondo.node.sourceUrl}
          alt={hero.fondo.node.altText}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <h1 className="text-h1 md:text-7xl font-bold mb-6">{hero.titulo}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{hero.subtitulo}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {boton1 && (
  
              <a href={boton1.href}
              target={boton1.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              {boton1.label}
            </a>
          )}
          {boton2 && (
            
              <a href={boton2.href}
              target={boton2.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              {boton2.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}