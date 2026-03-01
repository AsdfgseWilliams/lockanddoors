import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/shared/cta/Button";
import { localePath } from "@/lib/types/i18n";
import type { Locale } from "@/lib/types/i18n";

interface MediaItem { node: { sourceUrl: string; altText: string } }
interface HeroProps {
  hero: {
    titulo: string
    subtitulo: string
    fondo: MediaItem
    textoBoton1: string
    enlaceBoton1: string
    textoBoton2: string
    enlaceBoton2: string
  }
  lang: Locale
}

export default function Hero({ hero, lang }: HeroProps) {
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
          <Button variant="primary">
            {hero.textoBoton1 && hero.enlaceBoton1 && (
              <Link href={localePath(lang, hero.enlaceBoton1)}>{hero.textoBoton1}</Link>
            )}
          </Button>
          <Button variant="secondary">
            {hero.textoBoton2 && hero.enlaceBoton2 && (
              <Link href={localePath(lang, hero.enlaceBoton2)}>{hero.textoBoton2}</Link>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}